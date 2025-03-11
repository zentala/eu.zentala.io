import algoliasearch from 'algoliasearch';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import { remark } from 'remark';
import strip from 'strip-markdown';
import grayMatter from 'gray-matter';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Set up Algolia client
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

// Check required environment variables
if (!ALGOLIA_APP_ID || !ALGOLIA_API_KEY || !ALGOLIA_INDEX_NAME) {
  console.error('Missing Algolia environment variables. Please check your .env file.');
  process.exit(1);
}

// Initialize Algolia client
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// Helper to convert markdown to plain text
async function markdownToPlainText(markdown) {
  const result = await remark()
    .use(strip)
    .process(markdown);
  return String(result).trim();
}

// Process a content file and extract searchable data
async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const { data: frontmatter, content: markdown } = grayMatter(content);
    
    // Skip draft content
    if (frontmatter.draft === true) {
      return null;
    }
    
    // Extract content for search
    const plainText = await markdownToPlainText(markdown);
    
    // Get slug (URL) from file path
    let slug = filePath
      .replace(/^.*\/content\//, '/') // Remove path before content/
      .replace(/\.(mdx?|astro)$/, '') // Remove file extension
      .replace(/\/index$/, ''); // Convert /index to root
    
    if (slug.includes('/docs/')) {
      slug = slug.replace('/docs/', '/docs/');
    }
    
    // Create search record
    return {
      objectID: slug,
      slug,
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      tags: frontmatter.tags || [],
      content: plainText,
      excerpt: plainText.slice(0, 300) + (plainText.length > 300 ? '...' : ''),
      lastUpdated: frontmatter.lastUpdated || new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return null;
  }
}

async function indexContent() {
  try {
    console.log('Starting Algolia indexing...');
    
    // Find all content files
    const contentFiles = await globby([
      'src/content/**/*.{md,mdx}',
      'src/pages/**/*.{md,mdx}',
      '!src/pages/**/_*.{md,mdx}', // Exclude files starting with _
      '!node_modules',
      '!.git',
    ]);
    
    console.log(`Found ${contentFiles.length} content files to index.`);
    
    // Process all files
    const records = [];
    for (const file of contentFiles) {
      const record = await processFile(file);
      if (record) {
        records.push(record);
      }
    }
    
    console.log(`Processed ${records.length} valid content records.`);
    
    if (records.length > 0) {
      // Clear the index
      await index.clearObjects();
      console.log('Cleared existing index.');
      
      // Add records to Algolia
      const indexingResult = await index.saveObjects(records);
      console.log(`Successfully indexed ${indexingResult.objectIDs.length} records.`);
      
      // Configure index settings (optional)
      await index.setSettings({
        searchableAttributes: [
          'title',
          'description',
          'tags',
          'content',
        ],
        attributesForFaceting: ['tags'],
        customRanking: ['desc(lastUpdated)'],
      });
      console.log('Index settings updated.');
    }
    
    console.log('Algolia indexing completed successfully!');
    return { success: true, recordCount: records.length };
  } catch (error) {
    console.error('Error during Algolia indexing:', error);
    return { success: false, error: error.message };
  }
}

// Run the indexing process
indexContent().then((result) => {
  if (result.success) {
    console.log(`Successfully indexed ${result.recordCount} records.`);
    process.exit(0);
  } else {
    console.error('Indexing failed:', result.error);
    process.exit(1);
  }
});