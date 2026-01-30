import { NextResponse } from 'next/server';
import path from 'path';
import { getDocumentsDirectory, safeReadFile } from '@/lib/utils';

/**
 * GET handler to fetch all documents
 */
export async function GET() {
  try {
    // Get the documents directory
    const docsDirectory = await getDocumentsDirectory();
    console.log('Reading directory:', docsDirectory);
    
    // Get all files in the directory using the native fs module
    // This is a workaround for any issues with the promises API
    const files = require('fs').readdirSync(docsDirectory);
    
    // Filter for markdown files only
    const markdownFiles = files.filter((file: string) => file.toLowerCase().endsWith('.md'));
    
    // Map files to a format with id, title, and path
    const documents = [];
    
    for (const file of markdownFiles) {
      // Remove the .md extension for the id
      const id = file.replace(/\.md$/, '');
      
      // For the title, read the first line of the file (usually the # title)
      let title = id; // Default title is the id
      
      const filePath = path.join(docsDirectory, file);
      const content = require('fs').readFileSync(filePath, 'utf8');
      
      if (content) {
        const firstLine = content.split('\n')[0];
        
        // If first line starts with #, use it as the title (removing the # prefix)
        if (firstLine.startsWith('#')) {
          title = firstLine.replace(/^#\s+/, '');
        }
      }
      
      documents.push({
        id,
        title,
        path: file,
      });
    }
    
    return NextResponse.json(documents);
  } catch (error: any) {
    console.error('Error reading documents directory:', error);
    return NextResponse.json({ 
      error: `Failed to fetch documents: ${error.message}`
    }, { status: 500 });
  }
}