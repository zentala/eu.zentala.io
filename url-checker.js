// URL checker to test specific routes
import { spawn } from 'child_process';
import http from 'http';
import { URL } from 'url';

// Configuration
const BASE_URL = 'http://localhost:4333';

// List of URLs we expect to work
// Based on the site structure and content collections
const EXPECTED_URLS = [
  '/',
  '/docs',
  '/docs/all',
  '/docs/articles',
  '/docs/articles/blockchain-state',
  '/docs/articles/learning-from-china',
  '/docs/book',
  '/docs/book/digital-receipts',
  '/docs/book/economic-growth-language-unity',
  '/docs/book/european-blockchain-archives',
  '/docs/book/european-elearning-system',
  '/docs/book/language-integration-administrative-implementation',
  '/docs/book/media-cultural-integration',
  '/docs/book/near-zero-transaction-costs',
  '/docs/book/predictive-healthcare-system',
  '/docs/book/principles',
  '/docs/book/unified-payment-zone',
  '/docs/for-you',
  '/docs/ideas',
  '/docs/ideas/finance/european-cryptocurrency',
  '/docs/ideas/governance/blockchain-state',
  '/docs/reference',
  '/docs/why'
];

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
      if (data.toString().includes('Local') && data.toString().includes('4333')) {
        console.log('Server started successfully at http://localhost:4333');
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

// Check a single URL
async function checkUrl(url) {
  return new Promise((resolve) => {
    const fullUrl = new URL(url, BASE_URL);
    
    http.get(fullUrl, (response) => {
      const statusCode = response.statusCode;
      const success = statusCode === 200;
      
      console.log(`${success ? '✅' : '❌'} ${url} - ${statusCode}`);
      
      // Consume response data to free up memory
      response.resume();
      
      resolve({
        url,
        statusCode,
        success
      });
    }).on('error', (error) => {
      console.error(`❌ ${url} - Error: ${error.message}`);
      resolve({
        url,
        statusCode: null,
        success: false,
        error: error.message
      });
    });
  });
}

// Test all URLs
async function testUrls() {
  const results = [];
  
  console.log('Testing expected URLs...');
  
  // Check all URLs in parallel for faster execution
  const promises = EXPECTED_URLS.map(url => checkUrl(url));
  const testResults = await Promise.all(promises);
  
  results.push(...testResults);
  
  // Calculate statistics
  const totalUrls = results.length;
  const successfulUrls = results.filter(r => r.success).length;
  const failedUrls = results.filter(r => !r.success);
  
  // Print summary
  console.log('\n--- Test Results ---');
  console.log(`Total URLs tested: ${totalUrls}`);
  console.log(`Success: ${successfulUrls}`);
  console.log(`Failed: ${failedUrls.length}`);
  
  if (failedUrls.length > 0) {
    console.log('\n--- Failed URLs ---');
    failedUrls.forEach(result => {
      console.log(`${result.url} - ${result.statusCode || result.error}`);
    });
  }
  
  return failedUrls.length === 0;
}

// Main execution
async function main() {
  let server;
  try {
    server = await startServer();
    
    // Wait a bit for the server to fully initialize
    console.log('Waiting for server to fully initialize...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Test URLs
    const success = await testUrls();
    
    // Exit with correct code
    process.exitCode = success ? 0 : 1;
    
  } catch (error) {
    console.error('Error:', error);
    process.exitCode = 1;
  } finally {
    // Shut down the server
    if (server) {
      console.log('Shutting down server...');
      server.kill();
    }
  }
}

main();