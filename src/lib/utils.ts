import { promises as fs } from 'fs';
import path from 'path';

// Constants
export const DOCS_DIRECTORY = path.resolve(process.cwd(), '..', 'clawd', 'second-brain');

/**
 * Helper to safely read a directory
 */
export async function safeReadDir(dir: string): Promise<string[]> {
  try {
    return await fs.readdir(dir);
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
}

/**
 * Helper to safely read a file
 */
export async function safeReadFile(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

/**
 * Check if a file exists
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get absolute path to the second-brain folder
 * This is a fallback method that tries multiple potential paths
 */
export async function getDocumentsDirectory(): Promise<string> {
  // Try different paths
  const potentialPaths = [
    path.resolve('C:', 'Users', 'corne', 'Desktop', 'clawd', 'second-brain'),
    path.resolve(process.cwd(), '..', 'clawd', 'second-brain'),
    path.resolve('C:\\Users\\corne\\Desktop\\clawd\\second-brain'),
  ];
  
  // Use the first path that exists
  for (const potentialPath of potentialPaths) {
    if (await fileExists(potentialPath)) {
      return potentialPath;
    }
  }
  
  // If none exist, create the directory in the default location
  const defaultPath = path.resolve('C:', 'Users', 'corne', 'Desktop', 'clawd', 'second-brain');
  
  try {
    await fs.mkdir(defaultPath, { recursive: true });
    return defaultPath;
  } catch (error) {
    console.error('Error creating documents directory:', error);
    throw new Error('Failed to find or create documents directory');
  }
}