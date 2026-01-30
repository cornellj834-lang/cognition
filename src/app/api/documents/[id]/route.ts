import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// The root directory where markdown files are stored
const DOCS_DIRECTORY = 'C:/Users/corne/Desktop/clawd/second-brain';

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
    
    // Check if a file with this ID exists (with .md extension)
    const filePath = path.join(DOCS_DIRECTORY, `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }
    
    // Read the document content
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
  } catch (error) {
    console.error(`Error fetching document ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}