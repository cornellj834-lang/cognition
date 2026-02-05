import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    // Try a few different paths to find the one that works
    const potentialPaths = [
      'C:\\Users\\corne\\Desktop\\clawd\\second-brain',
      path.resolve('C:', 'Users', 'corne', 'Desktop', 'clawd', 'second-brain'),
      path.join(process.cwd(), '..', 'clawd', 'second-brain')
    ];
    
    const results = {};
    
    for (const testPath of potentialPaths) {
      try {
        const exists = require('fs').existsSync(testPath);
        
        let files = [];
        if (exists) {
          files = require('fs').readdirSync(testPath);
        }
        
        results[testPath] = {
          exists,
          files,
          error: null
        };
      } catch (error: any) {
        results[testPath] = {
          exists: false,
          files: [],
          error: error.message
        };
      }
    }
    
    return NextResponse.json({
      cwd: process.cwd(),
      paths: results
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: `Test failed: ${error.message}`
    }, { status: 500 });
  }
}