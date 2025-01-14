import fs from 'fs';
import path from 'path';

// Function to recursively search for .mdx files and append their content to a single .md file
function appendMdxContentToFile(dir, outputFilePath) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      // Recursively search in subdirectories
      appendMdxContentToFile(fullPath, outputFilePath);
    } else if (['.mdx', '.md'].includes(path.extname(fullPath))) {
      // Read the .mdx or .md file and append its content to the output file
      const content = fs.readFileSync(fullPath, 'utf-8');
      fs.appendFileSync(outputFilePath, `\n\n# ${file.replace(path.extname(fullPath), '')}\n\n${content}`);
      console.log(`Appended: ${fullPath} to ${outputFilePath}`);
    }
  });
}

// Define the source directory and the output file path
const srcDir = path.join(process.cwd(), 'content');
const exportFilePath = path.join(process.cwd(), 'export.md');

// Ensure the export file is empty before starting
fs.writeFileSync(exportFilePath, '');

// Start the appending process
appendMdxContentToFile(srcDir, exportFilePath);
