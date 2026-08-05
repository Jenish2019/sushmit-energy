import { NextResponse } from 'next/server';
import { uploadBuffer } from '@/lib/minio';
import { fail } from '@/lib/api';

export const maxDuration = 60;

const IMAGE_MIME = /^image\//;
const IMAGE_MAX = 2 * 1024 * 1024;
const FILE_MAX = 50 * 1024 * 1024;

export async function POST(request) {
  const form = await request.formData().catch(() => null);
  if (!form) return fail('Invalid upload');

  const file = form.get('file');
  if (!file || typeof file === 'string' || !file.arrayBuffer) {
    return fail('No file provided (field name: "file")');
  }

  const folder = typeof form.get('folder') === 'string' ? form.get('folder') : '';

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.byteLength === 0) return fail('Empty file');
    const type = (file.type || '').toLowerCase();
    const isImage = IMAGE_MIME.test(type);
    const limit = isImage ? IMAGE_MAX : FILE_MAX;
    if (buffer.byteLength > limit) {
      return fail(isImage ? 'Image exceeds 2 MB limit' : 'File exceeds 50 MB limit');
    }
    const url = await uploadBuffer(buffer, file.name, folder, type);
    return NextResponse.json({ success: true, data: { url, name: file.name } });
  } catch (e) {
    console.error('Upload failed:', e.message);
    return fail(e.message || 'Upload failed', 500);
  }
}
