// Check internal links on a website (requires a running server)
import http from 'http';
import https from 'https';
import { URL } from 'url';
import readline from 'readline';

// Configuration - edit these values as needed
const BASE_URL = 'http://localhost:4333'; // Change to your deployed URL if checking production
const START_URL = '/';
const IGNORE_PATTERNS = [
  /^mailto:/,
  /^tel:/,
  /^#/,
  // Uncomment below to ignore external links entirely
  // /^https?:\/\/(?!localhost)/
];
const MAX_CONNECTIONS = 5; // Limit concurrent connections

// Data structures for tracking
const visitedUrls = new Set();
const pendingUrls = new Set();
const brokenLinks = new Map(); // URL -> referring pages
const externalLinks = new Map(); // URL -> referring pages
const urlQueue = [];
let activeConnections = 0;
let isFinished = false;

// Show progress bar
function showProgress() {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  const total = visitedUrls.size + pendingUrls.size;
  const checked = visitedUrls.size;
  const percent = total ? Math.floor((checked / total) * 100) : 0;
  process.stdout.write(`Progress: ${checked}/${total} (${percent}%) - Queue: ${urlQueue.length} - Active: ${activeConnections}`);
}

// Function to determine if a URL should be crawled
function shouldCrawl(url) {
  // Skip URLs matching ignore patterns
  for (const pattern of IGNORE_PATTERNS) {
    if (pattern.test(url)) {
      return false;
    }
  }
  return true;
}

// Function to normalize URLs
function normalizeUrl(url, baseUrl) {
  try {
    // Handle relative URLs
    const fullUrl = new URL(url, baseUrl);
    
    // For internal URLs, just keep the path
    if (fullUrl.origin === new URL(BASE_URL).origin) {
      return `${fullUrl.pathname}${fullUrl.search}${fullUrl.hash}`;
    }
    
    // For external URLs, keep the full URL
    return fullUrl.href;
  } catch (error) {
    console.error(`Error normalizing URL: ${url}`, error);
    return url;
  }
}

// Function to check if a URL is external
function isExternalUrl(url) {
  try {
    return new URL(url, BASE_URL).origin !== new URL(BASE_URL).origin;
  } catch {
    return false;
  }
}

// Function to fetch a URL and extract links
async function checkUrl(url, referrer) {
  activeConnections++;
  showProgress();
  
  const fullUrl = new URL(url, BASE_URL);
  const isExternal = isExternalUrl(url);
  
  return new Promise((resolve) => {
    // Choose http or https based on the protocol
    const requester = fullUrl.protocol === 'https:' ? https : http;
    
    const req = requester.get(fullUrl, {
      timeout: 10000 // 10 second timeout
    }, (response) => {
      // Handle redirects (3xx status codes)
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        const redirectUrl = normalizeUrl(response.headers.location, fullUrl.href);
        console.log(`Redirect: ${url} -> ${redirectUrl}`);
        
        // Don't follow external redirects deeply
        if (!isExternal && !isExternalUrl(redirectUrl) && !visitedUrls.has(redirectUrl) && !pendingUrls.has(redirectUrl)) {
          pendingUrls.add(redirectUrl);
          urlQueue.push({
            url: redirectUrl,
            referrer: url
          });
        }
        
        resolve([]);
        activeConnections--;
        showProgress();
        return;
      }
      
      // Status codes other than 200-299 are considered broken links
      if (response.statusCode < 200 || response.statusCode >= 300) {
        if (!brokenLinks.has(url)) {
          brokenLinks.set(url, []);
        }
        brokenLinks.get(url).push(referrer || 'direct');
        console.log(`\n❌ Broken: ${url} (${response.statusCode}) - from ${referrer || 'direct'}`);
        
        resolve([]);
        activeConnections--;
        showProgress();
        return;
      }
      
      // For external links, don't extract content
      if (isExternal) {
        if (!externalLinks.has(url)) {
          externalLinks.set(url, []);
        }
        externalLinks.get(url).push(referrer || 'direct');
        
        resolve([]);
        activeConnections--;
        showProgress();
        return;
      }
      
      // Only process HTML pages
      const contentType = response.headers['content-type'] || '';
      if (!contentType.includes('text/html')) {
        resolve([]);
        activeConnections--;
        showProgress();
        return;
      }
      
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        // Extract links from HTML content
        const links = extractLinks(data, fullUrl.href);
        
        // Process found links
        const newLinks = [];
        for (const link of links) {
          // If we haven't seen this URL before, add it to the queue
          if (!visitedUrls.has(link) && !pendingUrls.has(link) && shouldCrawl(link)) {
            pendingUrls.add(link);
            urlQueue.push({
              url: link,
              referrer: url
            });
            newLinks.push(link);
          }
        }
        
        resolve(newLinks);
        activeConnections--;
        showProgress();
      });
    });
    
    req.on('error', (error) => {
      if (!brokenLinks.has(url)) {
        brokenLinks.set(url, []);
      }
      brokenLinks.get(url).push(referrer || 'direct');
      console.log(`\n❌ Error: ${url} (${error.message}) - from ${referrer || 'direct'}`);
      
      resolve([]);
      activeConnections--;
      showProgress();
    });
    
    req.on('timeout', () => {
      req.destroy();
      if (!brokenLinks.has(url)) {
        brokenLinks.set(url, []);
      }
      brokenLinks.get(url).push(referrer || 'direct');
      console.log(`\n❌ Timeout: ${url} - from ${referrer || 'direct'}`);
      
      resolve([]);
      activeConnections--;
      showProgress();
    });
  });
}

// Function to extract links from HTML content
function extractLinks(html, baseUrl) {
  const links = [];
  
  // Basic regex to extract href attributes
  // For production, use a proper HTML parser like cheerio
  const hrefRegex = /href\s*=\s*["']([^"']+)["']/gi;
  let match;
  
  while ((match = hrefRegex.exec(html)) !== null) {
    const url = match[1];
    const normalizedUrl = normalizeUrl(url, baseUrl);
    
    if (normalizedUrl && shouldCrawl(normalizedUrl)) {
      links.push(normalizedUrl);
    }
  }
  
  return links;
}

// Process the next URL in the queue
async function processNextUrl() {
  if (urlQueue.length === 0 || activeConnections >= MAX_CONNECTIONS) {
    return;
  }
  
  const { url, referrer } = urlQueue.shift();
  pendingUrls.delete(url);
  visitedUrls.add(url);
  
  checkUrl(url, referrer)
    .catch(error => {
      console.error(`\nError checking ${url}: ${error.message}`);
    })
    .finally(() => {
      // Process next URL when this one is done
      processNextUrl();
    });
}

// Process queue manager
function startQueueProcessing() {
  setInterval(() => {
    if (isFinished) return;
    
    // Start processing URLs up to the maximum concurrent connections
    while (activeConnections < MAX_CONNECTIONS && urlQueue.length > 0) {
      processNextUrl();
    }
    
    // Check if we're done
    if (urlQueue.length === 0 && activeConnections === 0 && !isFinished) {
      isFinished = true;
      printReport();
    }
  }, 100);
}

// Check if a server is already running
async function checkServerRunning() {
  return new Promise((resolve) => {
    const req = http.get(BASE_URL, () => {
      // Server is running
      console.log(`Server already running at ${BASE_URL}`);
      resolve(true);
    }).on('error', () => {
      // No server running
      resolve(false);
    });
    
    // Set a short timeout
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}


// Print final report
function printReport() {
  console.log('\n\n=== Link Checking Complete ===');
  console.log(`Total URLs checked: ${visitedUrls.size}`);
  console.log(`External links: ${externalLinks.size}`);
  console.log(`Broken links: ${brokenLinks.size}`);
  
  if (brokenLinks.size > 0) {
    console.log('\n--- Broken Links ---');
    for (const [url, referrers] of brokenLinks.entries()) {
      console.log(`\n${url}`);
      console.log('Referenced from:');
      referrers.forEach(referrer => console.log(`  - ${referrer}`));
    }
  }
  
  console.log('\nCheck complete!');
  
  process.exit(brokenLinks.size > 0 ? 1 : 0);
}

// Main function
async function main() {
  console.log(`Starting link checker for ${BASE_URL}`);
  console.log('Press Ctrl+C to stop at any time\n');
  
  // Check if server is running
  const serverRunning = await checkServerRunning();
  if (!serverRunning) {
    console.log('\n⚠️ ERROR: Server not running! ⚠️');
    console.log('Please start the server with:');
    console.log('  npm run dev -- --port 4333');
    console.log('\nThen run this check again once the server is ready.');
    process.exit(1);
  }
  
  // Add start URL to queue
  const startUrl = normalizeUrl(START_URL, BASE_URL);
  pendingUrls.add(startUrl);
  urlQueue.push({
    url: startUrl,
    referrer: null
  });
  
  // Start processing queue
  startQueueProcessing();
}

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('\n\nLink checking interrupted!');
  isFinished = true;
  printReport();
});

// Start the link checker
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});