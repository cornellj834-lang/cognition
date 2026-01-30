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
    console.log('Raw params object:', params);
    console.log('Raw params.id:', params.id);
    console.log('Request URL:', request.url);
    
    // Extract document ID from params
    const rawId = params.id;
    const id = decodeURIComponent(rawId || '');
    
    console.log('Raw ID from params:', rawId);
    console.log('Decoded ID:', id);
    console.log('Docs Directory:', DOCS_DIRECTORY);
    
    // Use a simpler approach: try to find the file directly
    const mdFilePath = path.join(DOCS_DIRECTORY, `${id}.md`);
    console.log('Looking for file at path:', mdFilePath);
    
    // Check if the file exists directly
    if (!fs.existsSync(mdFilePath)) {
      console.log('File not found at path:', mdFilePath);
      
      // List available files for debugging
      const allFiles = fs.readdirSync(DOCS_DIRECTORY);
      console.log('Available files in directory:', allFiles);
      
      return NextResponse.json({
        error: 'Document not found',
        requestedPath: mdFilePath,
        requestedId: id,
        rawId: rawId,
        availableFiles: allFiles
      }, { status: 404 });
    }
    
    // Read the document content
    const content = fs.readFileSync(mdFilePath, 'utf8');
    
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
      filePath: mdFilePath
    });
  } catch (error: any) {
    console.error(`Error fetching document:`, error);
    return NextResponse.json(
      { 
        error: `Failed to fetch document: ${error.message}`,
        requestedParams: params
      },
      { status: 500 }
    );
  }
}