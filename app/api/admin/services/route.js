import { Service } from '@/lib/api';
import { list, create, fail } from '@/lib/api';

const FIELDS = ['title', 'description', 'icon', 'active', 'order'];

export async function GET() {
  return list(Service, {}, { order: 1, createdAt: -1 });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  return create(Service, body, FIELDS);
}
