import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { DOCS_DIRECTORY } from '@/lib/utils';

/**
 * GET handler to fetch a specific document by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Decode the ID from the URL
    const id = decodeURIComponent(params.id);
    console.log('Fetching document with ID:', id);
    
    // Safety check: ensure the ID doesn't contain path traversal patterns
    if (id.includes('..')) {
      return NextResponse.json(
        { error: 'Invalid document ID' },
        { status: 400 }
      );
    }
    
    // List all files in the directory
    const allFiles = fs.readdirSync(DOCS_DIRECTORY);
    console.log('All files in directory:', allFiles);
    
    // Find the file that matches the ID (case insensitive, ignoring extension)
    const matchingFile = allFiles.find(file => 
      file.toLowerCase().replace(/\.md$/, '') === id.toLowerCase() ||
      file.replace(/\.md$/, '') === id
    );
    
    if (!matchingFile) {
      console.log('No matching file found for ID:', id);
      return NextResponse.json(
        { 
          error: 'Document not found',
          id: id,
          availableFiles: allFiles
        },
        { status: 404 }
      );
    }
    
    console.log('Found matching file:', matchingFile);
    
    // Read the document content
    const filePath = path.join(DOCS_DIRECTORY, matchingFile);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the title from the first line if it starts with #
    const lines = content.split('\n');
    let title = id;
    if (lines[0] && lines[0].startsWith('#')) {
      title = lines[0].replace(/^#\s+/, '');
    }
    
    // Return the document with its content
    return NextResponse.json({
      id,
      title,
      content,
    });
  } catch (error: any) {
    console.error(`Error fetching document ${params.id}:`, error);
    return NextResponse.json(
      { 
        error: `Failed to fetch document: ${error.message}`,
        id: params.id
      },
      { status: 500 }
    );
  }
}