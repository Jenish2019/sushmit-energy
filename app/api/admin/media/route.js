import { MediaResource } from '@/lib/api';
import { list, create, fail } from '@/lib/api';

const FIELDS = ['title', 'type', 'fileUrl', 'date', 'group'];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const group = searchParams.get('group');
  const query = {};
  if (group) query.group = group;
  return list(MediaResource, query, { date: -1 });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  return create(MediaResource, body, FIELDS);
}
