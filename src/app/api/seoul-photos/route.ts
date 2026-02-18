import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const photosDir = path.join(process.cwd(), 'public', 'seoul-photos');
    
    try {
      await fs.access(photosDir);
    } catch {
      return NextResponse.json([]);
    }

    const files = await fs.readdir(photosDir);
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const photos = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/seoul-photos/${file}`);

    return NextResponse.json(photos);
  } catch {
    return NextResponse.json([]);
  }
}
