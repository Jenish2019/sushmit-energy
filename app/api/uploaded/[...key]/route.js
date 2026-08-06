import { Readable } from 'stream';
import { NextResponse } from 'next/server';
import { getMinioClient, bucket, mimeFromName } from '@/lib/minio';

export const runtime = 'nodejs';
export const maxDuration = 60;

const SAFE_KEY = /^[a-zA-Z0-9._/-]+$/;

export async function GET(_request, { params }) {
  const { key } = await params;
  const raw = Array.isArray(key) ? key.join('/') : String(key || '');
  const clean = raw.replace(/^\/+/, '');
  if (!clean || clean.includes('..') || !SAFE_KEY.test(clean)) {
    return new Response('Not found', { status: 404 });
  }

  const client = getMinioClient();
  let stat;
  try {
    stat = await client.statObject(bucket, clean);
  } catch (e) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const contentType =
      (stat.metaData && (stat.metaData['content-type'] || stat.metaData['Content-Type'])) ||
      mimeFromName(clean);
    const stream = await client.getObject(bucket, clean);
    const body = Readable.toWeb(stream);
    return new NextResponse(body, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(stat.size || ''),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (e) {
    return new Response('Not found', { status: 404 });
  }
}
