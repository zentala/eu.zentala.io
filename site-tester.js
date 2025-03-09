const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:4333'; // Change to your dev server port
const RESULTS_FILE = 'test-results.md';
const ROUTES_TO_TEST = [
  '/',
  '/docs/all',
  '/docs/book',
  '/docs/book/principles',
  '/docs/book/language',
  '/docs/book/predictive-healthcare-system',
  '/docs/book/european-blockchain-archives',
  '/docs/book/european-elearning-system',
  '/docs/book/language-integration-administrative-implementation',
  '/docs/book/media-cultural-integration',
  '/docs/book/digital-receipts',
  '/docs/book/near-zero-transaction-costs',
  '/docs/book/unified-payment-zone',
  '/docs/book/economic-growth-language-unity',
  '/docs/why',
  '/docs/for-you',
  '/docs/articles',
  '/docs/articles/blockchain-state',
  '/docs/articles/learning-from-china',
  '/docs/ideas',
  '/docs/ideas/governance/blockchain-state',
  '/docs/ideas/finance/european-cryptocurrency',
  '/docs/ideas/education/european-proof-of-skill',
  '/docs/ideas/environment/environment',
  '/docs/ideas/governance/digital-democracy',
  '/docs/ideas/infrastructure/european-street-naming',
  '/docs/ideas/innovation/supporting-mid-sized-companies',
];

// Function to test a single route
async function testRoute(route) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${route}`;
    const startTime = Date.now();

    http.get(url, (res) => {
      const statusCode = res.statusCode;
      const responseTime = Date.now() - startTime;
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const hasError = data.includes('<title>Error</title>') || 
                         data.includes('<title>Invalid') || 
                         data.includes('<title>Not found</title>') ||
                         data.includes('<title>YAML');
        
        let title = 'Unknown';
        const titleMatch = data.match(/<title>(.*?)<\/title>/);
        if (titleMatch && titleMatch[1]) {
          title = titleMatch[1];
        }
        
        resolve({
          route,
          url,
          statusCode,
          responseTime,
          hasError,
          title
        });
      });
    }).on('error', (err) => {
      resolve({
        route,
        url,
        statusCode: 'Error',
        responseTime: Date.now() - startTime,
        hasError: true,
        title: err.message
      });
    });
  });
}

// Main function to run tests
async function runTests() {
  console.log(`Starting tests for ${ROUTES_TO_TEST.length} routes...`);
  
  const results = [];
  for (const route of ROUTES_TO_TEST) {
    const result = await testRoute(route);
    results.push(result);
    
    // Print progress
    const status = result.hasError ? '❌' : (result.statusCode === 200 ? '✅' : '⚠️');
    console.log(`${status} ${result.route} (${result.statusCode}, ${result.responseTime}ms)`);
  }
  
  // Generate report
  let report = '# Site Test Results\n\n';
  report += `Tests run on ${new Date().toLocaleString()}\n\n`;
  
  report += '## Summary\n\n';
  const successful = results.filter(r => r.statusCode === 200 && !r.hasError).length;
  report += `- Total Routes: ${ROUTES_TO_TEST.length}\n`;
  report += `- Successful: ${successful}\n`;
  report += `- Failed: ${ROUTES_TO_TEST.length - successful}\n\n`;
  
  report += '## Detailed Results\n\n';
  report += '| Route | Status | Response Time | Title | Result |\n';
  report += '|-------|--------|---------------|-------|--------|\n';
  
  for (const result of results) {
    const status = result.hasError ? '❌ Error' : (result.statusCode === 200 ? '✅ OK' : `⚠️ ${result.statusCode}`);
    report += `| ${result.route} | ${result.statusCode} | ${result.responseTime}ms | ${result.title} | ${status} |\n`;
  }
  
  // Write to file
  fs.writeFileSync(RESULTS_FILE, report);
  console.log(`\nTest completed. Results saved to ${RESULTS_FILE}`);
  
  return results;
}

// Run tests if executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  runTests
};