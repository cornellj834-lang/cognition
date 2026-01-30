import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// The root directory where markdown files are stored
const DOCS_DIRECTORY = 'C:/Users/corne/Desktop/clawd/second-brain';

/**
 * GET handler to fetch all documents
 */
export async function GET() {
  try {
    // Get all files in the directory
    const files = fs.readdirSync(DOCS_DIRECTORY);
    
    // Filter for markdown files only
    const markdownFiles = files.filter(file => file.toLowerCase().endsWith('.md'));
    
    // Map files to a format with id, title, and path
    const documents = markdownFiles.map(file => {
      // Remove the .md extension for the id
      const id = file.replace(/\.md$/, '');
      
      // For the title, read the first line of the file (usually the # title)
      let title = id; // Default title is the id
      try {
        const filePath = path.join(DOCS_DIRECTORY, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const firstLine = content.split('\n')[0];
        
        // If first line starts with #, use it as the title (removing the # prefix)
        if (firstLine.startsWith('#')) {
          title = firstLine.replace(/^#\s+/, '');
        }
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
      }
      
      return {
        id,
        title,
        path: file,
      };
    });
    
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error reading documents directory:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}