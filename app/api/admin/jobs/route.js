import { Job } from '@/lib/api';
import { list, create, fail } from '@/lib/api';

const FIELDS = ['title', 'department', 'location', 'type', 'deadline', 'description', 'requirements', 'status'];

export async function GET() {
  return list(Job, {}, { createdAt: -1 });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  return create(Job, body, FIELDS);
}
