import { ManagementMember } from '@/lib/api';
import { list, create, fail } from '@/lib/api';

const FIELDS = ['name', 'title', 'description', 'image', 'order'];

export async function GET() {
  return list(ManagementMember, {}, { order: 1, createdAt: -1 });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  return create(ManagementMember, body, FIELDS);
}
