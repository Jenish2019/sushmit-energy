import { Project } from '@/lib/api';
import { list, create, fail } from '@/lib/api';

const FIELDS = [
  'name', 'subtitle', 'slug', 'capacity', 'location', 'status', 'startDate',
  'type', 'river', 'annualEnergy', 'overview', 'features', 'image', 'published',
];

export async function GET() {
  return list(Project, {}, { order: 1, createdAt: -1 });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  return create(Project, body, FIELDS);
}
