import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

const NOTES_DIR = 'public/notes';

export async function GET() {
  try {
    const files = await readdir(NOTES_DIR);
    const txtFiles = files.filter(file => file.endsWith('.txt'));
    
    const fileContents = await Promise.all(
      txtFiles.map(async (filename) => {
        const content = await readFile(join(NOTES_DIR, filename), 'utf-8');
        return { filename, content };
      })
    );
    
    return NextResponse.json(fileContents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read notes directory' }, { status: 500 });
  }
}