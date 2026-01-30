import { promises as fs } from 'fs';
import path from 'path';

// Constants - use the path we confirmed works
export const DOCS_DIRECTORY = 'C:\\Users\\corne\\Desktop\\clawd\\second-brain';

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
 */
export async function getDocumentsDirectory(): Promise<string> {
  return DOCS_DIRECTORY;
}