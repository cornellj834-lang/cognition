import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { getDocumentsDirectory, fileExists } from '@/lib/utils';

/**
 * GET handler to fetch a specific document by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Safety check: ensure the ID doesn't contain invalid characters
    if (id.includes('..') || id.includes('/') || id.includes('\\')) {
      return NextResponse.json(
        { error: 'Invalid document ID' },
        { status: 400 }
      );
    }
    
    // Get the documents directory
    const docsDirectory = await getDocumentsDirectory();
    
    // Check if a file with this ID exists (with .md extension)
    const filePath = path.join(docsDirectory, `${id}.md`);
    
    // Use the native fs module directly for simplicity
    if (!require('fs').existsSync(filePath)) {
      return NextResponse.json(
        { 
          error: 'Document not found',
          path: filePath 
        },
        { status: 404 }
      );
    }
    
    // Read the document content
    const content = require('fs').readFileSync(filePath, 'utf8');
    
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
        error: `Failed to fetch document: ${error.message}`
      },
      { status: 500 }
    );
  }
}