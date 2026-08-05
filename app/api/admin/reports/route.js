import { Report } from '@/lib/api';
import { list, create, fail } from '@/lib/api';

const FIELDS = ['title', 'type', 'fileUrl', 'date'];

export async function GET() {
  return list(Report, {}, { date: -1 });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  return create(Report, body, FIELDS);
}
