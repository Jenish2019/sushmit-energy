import { Client } from 'minio';
import path from 'path';

const endpoint = process.env.MINIO_ENDPOINT || '82.29.161.51';
const port = Number(process.env.MINIO_PORT || 9000);
const useSSL = (process.env.MINIO_USE_SSL || 'false') === 'true';
const accessKey = process.env.MINIO_ACCESS_KEY || 'clockbtech';
const secretKey = process.env.MINIO_SECRET_KEY || 'clockbtech';
const bucket = process.env.MINIO_BUCKET || 'sushmit-energy';

export function getMinioClient() {
  return new Client({
    endPoint: endpoint,
    port,
    useSSL,
    accessKey,
    secretKey,
  });
}

export function getPublicBaseUrl() {
  const protocol = useSSL ? 'https' : 'http';
  return `${protocol}://${endpoint}${port && port !== (useSSL ? 443 : 80) ? `:${port}` : ''}/${bucket}`;
}

let bucketReady = false;

export async function ensureBucket() {
  if (bucketReady) return;
  const client = getMinioClient();
  const exists = await client.bucketExists(bucket);
  if (!exists) {
    await client.makeBucket(bucket);
  }
  try {
    await client.setBucketPolicy(
      bucket,
      JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: ['*'] },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${bucket}/*`],
          },
        ],
      })
    );
  } catch (e) {
    console.warn('Could not set public bucket policy (public URLs may 403):', e.message);
  }
  bucketReady = true;
}

export function objectName(originalName, folder = '') {
  const ext = path.extname(originalName || '').toLowerCase();
  const base = path.basename(originalName || 'file', ext).replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
  const ts = Date.now();
  const key = `${base}-${ts}${ext}`;
  return folder ? `${folder.replace(/^\/+|\/+$/g, '')}/${key}` : key;
}

export async function uploadBuffer(buffer, originalName, folder = '', contentType = '') {
  await ensureBucket();
  const client = getMinioClient();
  const key = objectName(originalName, folder);
  await client.putObject(bucket, key, buffer, {
    'Content-Type': contentType || (originalName ? mimeFromName(originalName) : 'application/octet-stream'),
  });
  return `${getPublicBaseUrl()}/${key}`;
}

export function mimeFromName(name) {
  const ext = path.extname(name || '').toLowerCase();
  const mimes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.avif': 'image/avif',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.txt': 'text/plain',
    '.csv': 'text/csv',
  };
  return mimes[ext] || 'application/octet-stream';
}
