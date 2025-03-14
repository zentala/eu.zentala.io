import { algoliasearch } from 'algoliasearch';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import { remark } from 'remark';
import strip from 'strip-markdown';
import grayMatter from 'gray-matter';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import crypto from 'crypto';

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

// Constants for record size analysis
const MAX_RECORD_SIZE_BYTES = 10000; // Algolia has a 10KB limit per record
const LONG_FIELDS = []; // Array to store information about long fields
const TODO_FILE_PATH = 'TODO_ALGOLIA.md'; // Path to the TODO file
const CACHE_FILE_PATH = '.algolia-cache.json'; // Path to the cache file

// Helper to convert markdown to plain text
async function markdownToPlainText(markdown) {
  try {
    const result = await remark()
      .use(strip)
      .process(markdown);
    return String(result).trim();
  } catch (error) {
    console.warn(`Warning: Error converting markdown to plain text: ${error.message}`);
    return markdown.substring(0, 1000); // Return a substring of raw markdown as fallback
  }
}

// Function to estimate object size in bytes
function estimateObjectSize(obj) {
  return Buffer.byteLength(JSON.stringify(obj), 'utf8');
}

// Function to calculate file hash for change detection
async function calculateFileHash(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return crypto.createHash('md5').update(content).digest('hex');
  } catch (error) {
    console.warn(`Warning: Error calculating hash for ${filePath}: ${error.message}`);
    return null;
  }
}

// Function to load the cache file
async function loadCache() {
  try {
    const cacheData = await fs.readFile(CACHE_FILE_PATH, 'utf-8');
    return JSON.parse(cacheData);
  } catch (error) {
    // If the file doesn't exist or can't be parsed, return an empty cache
    return {
      lastRun: null,
      fileHashes: {},
      objectIDs: {}
    };
  }
}

// Function to save the cache file
async function saveCache(cache) {
  try {
    await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(cache, null, 2), 'utf-8');
    console.log(`Cache saved to ${CACHE_FILE_PATH}`);
  } catch (error) {
    console.warn(`Warning: Error saving cache file: ${error.message}`);
  }
}

// Function to save information about long fields to a TODO file
async function saveTodoFile() {
  if (LONG_FIELDS.length === 0) {
    return;
  }
  
  try {
    let todoContent = `# Algolia Indexing TODO List\n\n`;
    todoContent += `Last updated: ${new Date().toLocaleString()}\n\n`;
    todoContent += `## Files exceeding Algolia size limit (${MAX_RECORD_SIZE_BYTES} bytes)\n\n`;
    
    LONG_FIELDS.forEach((field, index) => {
      todoContent += `### ${index + 1}. ${field.filePath}\n\n`;
      todoContent += `- **Slug:** ${field.slug}\n`;
      todoContent += `- **Total size:** ${field.totalSize} bytes\n`;
      todoContent += `- **Content:** ${field.contentSize} bytes (${field.contentLength} characters)\n`;
      todoContent += `- **Title:** ${field.titleSize} bytes (${field.titleLength} characters)\n`;
      todoContent += `- **Description:** ${field.descriptionSize} bytes (${field.descriptionLength} characters)\n\n`;
    });
    
    todoContent += `## How to fix the issue\n\n`;
    todoContent += `1. Open the file mentioned above\n`;
    todoContent += `2. Shorten the content of the field that is too long (usually the "content" field)\n`;
    todoContent += `3. Run the indexing process again: \`npm run index-algolia\`\n\n`;
    todoContent += `Algolia has a 10KB limit per record. Most often, the problem is with the "content" field being too long.\n`;
    
    await fs.writeFile(TODO_FILE_PATH, todoContent, 'utf-8');
    console.log(`Information about long fields has been saved to ${TODO_FILE_PATH}`);
  } catch (error) {
    console.error(`Error saving TODO file: ${error.message}`);
  }
}

// Process a content file and extract searchable data
async function processFile(filePath, cache) {
  try {
    // Check if the file has changed since the last run
    const currentHash = await calculateFileHash(filePath);
    if (!currentHash) {
      return { record: null, changed: false };
    }
    
    const previousHash = cache.fileHashes[filePath];
    const hasChanged = !previousHash || previousHash !== currentHash;
    
    // If the file hasn't changed and we have its objectID, we can skip processing
    if (!hasChanged && cache.objectIDs[filePath]) {
      return { 
        record: { objectID: cache.objectIDs[filePath] }, 
        changed: false 
      };
    }
    
    // Update the hash in the cache
    cache.fileHashes[filePath] = currentHash;
    
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Validate file content
    if (!content || content.trim() === '') {
      console.warn(`Warning: Empty file: ${filePath}`);
      return { record: null, changed: true };
    }
    
    let frontmatter = {};
    let markdown = '';
    
    try {
      const parsed = grayMatter(content);
      frontmatter = parsed.data;
      markdown = parsed.content;
    } catch (parseError) {
      console.warn(`Warning: Error parsing frontmatter in ${filePath}: ${parseError.message}`);
      // Try to continue with empty frontmatter and the whole content as markdown
      markdown = content;
    }
    
    // Skip draft content
    if (frontmatter.draft === true) {
      return { record: null, changed: true };
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
    
    // Validate required fields
    if (!slug) {
      console.warn(`Warning: Could not generate slug for ${filePath}`);
      slug = `/content/${Math.random().toString(36).substring(2)}`;
    }
    
    // Create search record
    const record = {
      objectID: slug,
      slug,
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      content: plainText || '',
      excerpt: plainText ? (plainText.slice(0, 300) + (plainText.length > 300 ? '...' : '')) : '',
      lastUpdated: frontmatter.lastUpdated || new Date().toISOString(),
    };
    
    // Store the objectID in the cache
    cache.objectIDs[filePath] = record.objectID;
    
    // Check the size of the entire record
    const recordSize = estimateObjectSize(record);
    if (recordSize > MAX_RECORD_SIZE_BYTES) {
      // Check the size of individual fields
      const contentSize = estimateObjectSize(record.content);
      const titleSize = estimateObjectSize(record.title);
      const descriptionSize = estimateObjectSize(record.description);
      
      LONG_FIELDS.push({
        filePath,
        slug,
        totalSize: recordSize,
        contentSize,
        titleSize,
        descriptionSize,
        contentLength: record.content.length,
        titleLength: record.title.length,
        descriptionLength: record.description.length
      });
      
      console.warn(`Warning: Record for ${filePath} exceeds Algolia size limit (${recordSize} bytes):`);
      console.warn(`  - Content: ${contentSize} bytes (${record.content.length} chars)`);
      console.warn(`  - Title: ${titleSize} bytes (${record.title.length} chars)`);
      console.warn(`  - Description: ${descriptionSize} bytes (${record.description.length} chars)`);
    }
    
    // Validate record
    if (!record.title || !record.content) {
      console.warn(`Warning: Record for ${filePath} is missing title or content`);
    }
    
    return { record, changed: true };
  } catch (error) {
    console.warn(`Warning: Error processing file ${filePath}: ${error.message}`);
    return { record: null, changed: true };
  }
}

// Function to find deleted files
function findDeletedFiles(contentFiles, cache) {
  const currentFilePaths = new Set(contentFiles);
  const deletedFiles = [];
  
  // Check each file in the cache to see if it still exists
  for (const filePath in cache.fileHashes) {
    if (!currentFilePaths.has(filePath)) {
      deletedFiles.push(filePath);
      
      // If we have an objectID for this file, we'll need to delete it from Algolia
      if (cache.objectIDs[filePath]) {
        deletedFiles.push({
          objectID: cache.objectIDs[filePath],
          filePath
        });
      }
      
      // Remove the file from the cache
      delete cache.fileHashes[filePath];
      delete cache.objectIDs[filePath];
    }
  }
  
  return deletedFiles;
}

async function indexContent() {
  try {
    console.log('Starting Algolia indexing...');
    
    // Load the cache
    const cache = await loadCache();
    console.log(`Cache loaded. Last run: ${cache.lastRun || 'Never'}`);
    
    // Find all content files
    const contentFiles = await globby([
      'src/content/**/*.{md,mdx}',
      'src/pages/**/*.{md,mdx}',
      '!src/pages/**/_*.{md,mdx}', // Exclude files starting with _
      '!node_modules',
      '!.git',
    ]);
    
    console.log(`Found ${contentFiles.length} content files to index.`);
    
    // Find deleted files
    const deletedFiles = findDeletedFiles(contentFiles, cache);
    if (deletedFiles.length > 0) {
      console.log(`Found ${deletedFiles.length} files that have been deleted since the last run.`);
    }
    
    // Process all files
    const records = [];
    const changedRecords = [];
    const failedFiles = [];
    
    for (const file of contentFiles) {
      try {
        const { record, changed } = await processFile(file, cache);
        if (record) {
          records.push(record);
          if (changed) {
            changedRecords.push(record);
          }
        }
      } catch (error) {
        console.warn(`Warning: Failed to process ${file}: ${error.message}`);
        failedFiles.push(file);
      }
    }
    
    console.log(`Processed ${records.length} valid content records.`);
    console.log(`Found ${changedRecords.length} records that have changed since the last run.`);
    
    if (failedFiles.length > 0) {
      console.warn(`Warning: Failed to process ${failedFiles.length} files.`);
    }
    
    // Display summary of long fields
    if (LONG_FIELDS.length > 0) {
      console.warn('\n=== SUMMARY OF LONG FIELDS ===');
      console.warn(`Found ${LONG_FIELDS.length} records exceeding Algolia size limit (${MAX_RECORD_SIZE_BYTES} bytes):`);
      
      LONG_FIELDS.forEach((field, index) => {
        console.warn(`\n${index + 1}. File: ${field.filePath}`);
        console.warn(`   Slug: ${field.slug}`);
        console.warn(`   Total size: ${field.totalSize} bytes`);
        console.warn(`   Content: ${field.contentSize} bytes (${field.contentLength} characters)`);
        console.warn(`   Title: ${field.titleSize} bytes (${field.titleLength} characters)`);
        console.warn(`   Description: ${field.descriptionSize} bytes (${field.descriptionLength} characters)`);
      });
      
      console.warn('\nTo solve this problem, you need to manually shorten the content of these fields in the source files.');
      console.warn('Algolia has a 10KB limit per record. Most often, the problem is with the "content" field being too long.');
      console.warn('=== END OF SUMMARY ===\n');
      
      // Save information about long fields to the TODO file
      await saveTodoFile();
    }
    
    // Only proceed with indexing if there are changed records or deleted files
    if (changedRecords.length > 0 || deletedFiles.length > 0) {
      console.log(`Indexing ${changedRecords.length} changed records to Algolia index: ${ALGOLIA_INDEX_NAME}`);
      
      try {
        // Display only basic information about the record structure, without content
        if (changedRecords.length > 0) {
          const sampleRecord = changedRecords[0];
          console.log('Sample record structure (without content):');
          console.log(`  - objectID: ${sampleRecord.objectID}`);
          console.log(`  - slug: ${sampleRecord.slug}`);
          console.log(`  - title: ${sampleRecord.title}`);
          console.log(`  - description: ${sampleRecord.description ? sampleRecord.description.substring(0, 50) + '...' : 'N/A'}`);
          console.log(`  - tags: ${sampleRecord.tags.length} tags`);
          console.log(`  - content: [${sampleRecord.content.length} chars]`);
          console.log(`  - excerpt: [${sampleRecord.excerpt.length} chars]`);
        }
        
        // Make sure each record has an objectID
        const validRecords = changedRecords.map((record, index) => {
          if (!record.objectID) {
            console.warn(`Warning: Record at index ${index} is missing objectID, generating one...`);
            return { ...record, objectID: `generated-${index}-${Date.now()}` };
          }
          return record;
        });
        
        // Filter out records that are too large
        const validSizedRecords = validRecords.filter(record => {
          const recordSize = estimateObjectSize(record);
          return recordSize <= MAX_RECORD_SIZE_BYTES;
        });
        
        console.log(`Filtered out ${validRecords.length - validSizedRecords.length} records that exceed Algolia size limit.`);
        
        // Handle deleted records
        if (deletedFiles.length > 0) {
          console.log(`Deleting ${deletedFiles.length} records from Algolia...`);
          
          try {
            // Use DELETE method directly to Algolia API for each deleted record
            for (const deletedFile of deletedFiles) {
              if (deletedFile.objectID) {
                const url = `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX_NAME}/${deletedFile.objectID}`;
                const headers = {
                  'Content-Type': 'application/json',
                  'X-Algolia-API-Key': ALGOLIA_API_KEY,
                  'X-Algolia-Application-Id': ALGOLIA_APP_ID
                };
                
                try {
                  const response = await fetch(url, {
                    method: 'DELETE',
                    headers
                  });
                  
                  if (!response.ok) {
                    console.warn(`Warning: Error deleting record ${deletedFile.objectID}: ${await response.text()}`);
                  } else {
                    console.log(`Successfully deleted record for ${deletedFile.filePath}`);
                  }
                } catch (deleteError) {
                  console.warn(`Warning: Error deleting record ${deletedFile.objectID}: ${deleteError.message}`);
                }
              }
            }
          } catch (deleteError) {
            console.warn(`Warning: Error during deletion: ${deleteError.message}`);
          }
        }
        
        // Save objects in smaller chunks
        if (validSizedRecords.length > 0) {
          const chunkSize = 50; // Reduce chunk size
          for (let i = 0; i < validSizedRecords.length; i += chunkSize) {
            const chunk = validSizedRecords.slice(i, i + chunkSize);
            console.log(`Indexing chunk ${Math.floor(i/chunkSize) + 1} of ${Math.ceil(validSizedRecords.length/chunkSize)}...`);
            
            try {
              console.log(`Sending ${chunk.length} records to Algolia...`);
              
              // Create temporary index
              const indexName = ALGOLIA_INDEX_NAME;
              
              // Use POST method directly to Algolia API
              const url = `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${indexName}/batch`;
              const headers = {
                'Content-Type': 'application/json',
                'X-Algolia-API-Key': ALGOLIA_API_KEY,
                'X-Algolia-Application-Id': ALGOLIA_APP_ID
              };
              
              const body = {
                requests: chunk.map(record => ({
                  action: 'addObject',
                  body: record
                }))
              };
              
              // Use fetch API to send the request
              const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
              });
              
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
              }
              
              const result = await response.json();
              console.log(`Successfully indexed chunk with ${chunk.length} records.`);
            } catch (chunkError) {
              console.warn(`Warning: Error indexing chunk: ${chunkError.message}`);
              console.warn('Will continue with next chunk...');
            }
          }
        } else {
          console.log('No valid records to index after filtering.');
        }
        
        // Configure index settings
        console.log('Updating index settings...');
        try {
          // Use PUT method directly to Algolia API
          const url = `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX_NAME}/settings`;
          const headers = {
            'Content-Type': 'application/json',
            'X-Algolia-API-Key': ALGOLIA_API_KEY,
            'X-Algolia-Application-Id': ALGOLIA_APP_ID
          };
          
          const body = {
            searchableAttributes: [
              'title',
              'description',
              'tags',
              'content',
            ],
            attributesForFaceting: ['tags'],
            customRanking: ['desc(lastUpdated)'],
          };
          
          // Use fetch API to send the request
          const response = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
          }
          
          const result = await response.json();
          console.log('Index settings updated.');
        } catch (settingsError) {
          console.warn(`Warning: Error updating index settings: ${settingsError.message}`);
        }
      } catch (indexingError) {
        console.warn(`Warning: Error during indexing: ${indexingError.message}`);
        console.warn('Some records may not have been indexed.');
      }
    } else {
      console.log('No changes detected since the last run. Skipping indexing.');
    }
    
    // Update the cache with the current timestamp
    cache.lastRun = new Date().toISOString();
    await saveCache(cache);
    
    console.log('Algolia indexing process completed.');
    return { 
      success: true, 
      recordCount: records.length,
      changedCount: changedRecords.length,
      deletedCount: deletedFiles.length,
      failedFiles: failedFiles.length,
      longFields: LONG_FIELDS.length
    };
  } catch (error) {
    console.error('Error during Algolia indexing process:', error);
    return { success: false, error: error.message };
  }
}

// Run the indexing process
indexContent().then((result) => {
  if (result.success) {
    console.log(`Successfully processed ${result.recordCount} records.`);
    console.log(`Changed records: ${result.changedCount}, Deleted records: ${result.deletedCount}`);
    
    if (result.failedFiles > 0) {
      console.warn(`Warning: ${result.failedFiles} files could not be processed.`);
    }
    if (result.longFields > 0) {
      console.warn(`Warning: ${result.longFields} records exceed Algolia size limit. See details above.`);
      console.log(`Information about long fields has been saved to ${TODO_FILE_PATH}`);
    }
    process.exit(0);
  } else {
    console.error('Indexing process failed:', result.error);
    process.exit(1);
  }
});