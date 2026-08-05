import { Album } from '@/lib/api';
import { list, create, fail } from '@/lib/api';

const FIELDS = ['name', 'description', 'cover', 'images', 'order'];

export async function GET() {
  return list(Album, {}, { order: 1, createdAt: -1 });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  return create(Album, body, FIELDS);
}
