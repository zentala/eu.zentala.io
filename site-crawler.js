// Site crawler to find broken links
import { spawn } from 'child_process';
import http from 'http';
import { URL } from 'url';

// Configuration
const BASE_URL = 'http://localhost:4333';
const START_URL = '/';
const IGNORE_PATTERNS = [
  /^mailto:/,
  /^tel:/,
  /^#/,
  /^https?:\/\/(?!localhost)/  // External links
];

// Track visited URLs and broken links
const visitedUrls = new Set();
const brokenLinks = new Map(); // URL -> referring pages
const queue = [];

// Start the development server
async function startServer() {
  console.log('Starting Astro development server...');
  const server = spawn('npm', ['run', 'dev'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true
  });

  // Wait for server to start
  return new Promise((resolve, reject) => {
    let output = '';
    server.stdout.on('data', (data) => {
      output += data.toString();
      console.log('Server output:', data.toString().trim());
      if (data.toString().includes('Local') && data.toString().includes('4333')) {
        console.log('Server started successfully');
        resolve(server);
      }
    });

    server.stderr.on('data', (data) => {
      console.error('Server error:', data.toString().trim());
    });

    server.on('error', (err) => {
      console.error('Failed to start server:', err);
      reject(err);
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      if (!output.includes('Local')) {
        reject(new Error('Server startup timed out'));
      }
    }, 30000);
  });
}

// Check if a URL should be crawled
function shouldCrawl(url) {
  // Skip external URLs and special protocols
  for (const pattern of IGNORE_PATTERNS) {
    if (pattern.test(url)) {
      return false;
    }
  }
  return true;
}

// Normalize URL
function normalizeUrl(url, baseUrl) {
  try {
    // Handle relative URLs
    const fullUrl = new URL(url, baseUrl);
    // Only keep the pathname and search parts for internal URLs
    if (fullUrl.hostname === 'localhost' || fullUrl.hostname === '') {
      return `${fullUrl.pathname}${fullUrl.search}`;
    }
    return fullUrl.href;
  } catch (error) {
    console.error(`Error normalizing URL: ${url}`, error);
    return url;
  }
}

// Fetch a URL and extract links
async function crawlPage(url, referrer) {
  const fullUrl = new URL(url, BASE_URL);
  
  console.log(`Crawling: ${url} (referred from: ${referrer || 'direct'})`);
  
  return new Promise((resolve) => {
    http.get(fullUrl, (response) => {
      let data = '';
      
      // Status codes other than 200 are considered broken links
      if (response.statusCode !== 200) {
        if (!brokenLinks.has(url)) {
          brokenLinks.set(url, []);
        }
        brokenLinks.get(url).push(referrer || 'direct');
        console.error(`Broken link: ${url} (${response.statusCode}) - referred from ${referrer || 'direct'}`);
        return resolve([]);
      }
      
      // Only process HTML pages
      const contentType = response.headers['content-type'] || '';
      if (!contentType.includes('text/html')) {
        return resolve([]);
      }
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        // Extract links from HTML content
        const links = extractLinks(data, url);
        resolve(links);
      });
    }).on('error', (error) => {
      console.error(`Error fetching ${url}: ${error.message}`);
      if (!brokenLinks.has(url)) {
        brokenLinks.set(url, []);
      }
      brokenLinks.get(url).push(referrer || 'direct');
      resolve([]);
    });
  });
}

// Extract links from HTML content
function extractLinks(html, baseUrl) {
  const links = [];
  
  // Very basic regex to extract href attributes
  // For production, use a proper HTML parser like cheerio
  const hrefRegex = /href\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    const url = match[1];
    const normalizedUrl = normalizeUrl(url, baseUrl);
    
    if (shouldCrawl(normalizedUrl) && !visitedUrls.has(normalizedUrl)) {
      links.push(normalizedUrl);
    }
  }
  
  return links;
}

// Main crawling function
async function crawlSite() {
  try {
    // Add the starting URL to the queue
    queue.push(START_URL);
    visitedUrls.add(START_URL);
    
    // Process the queue
    while (queue.length > 0) {
      const currentUrl = queue.shift();
      const links = await crawlPage(currentUrl, null);
      
      for (const link of links) {
        if (!visitedUrls.has(link)) {
          visitedUrls.add(link);
          queue.push(link);
        }
      }
    }
    
    // Report results
    console.log('\n--- Crawl Complete ---');
    console.log(`Total URLs checked: ${visitedUrls.size}`);
    console.log(`Broken links found: ${brokenLinks.size}`);
    
    if (brokenLinks.size > 0) {
      console.log('\n--- Broken Links ---');
      for (const [url, referrers] of brokenLinks.entries()) {
        console.log(`${url} - Referenced from:`);
        referrers.forEach(referrer => console.log(`  - ${referrer}`));
      }
    }
    
  } catch (error) {
    console.error('Error during crawl:', error);
  }
}

// Main execution
async function main() {
  let server;
  try {
    server = await startServer();
    
    // Wait a bit for the server to fully initialize
    console.log('Waiting for server to fully initialize...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Start crawling
    await crawlSite();
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Shut down the server
    if (server) {
      console.log('Shutting down server...');
      server.kill();
    }
  }
}

main();