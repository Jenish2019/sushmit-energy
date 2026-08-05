import { Project } from '@/lib/api';
import { detail, update, remove, fail } from '@/lib/api';

const FIELDS = [
  'name', 'subtitle', 'slug', 'capacity', 'location', 'status', 'startDate',
  'type', 'river', 'annualEnergy', 'overview', 'features', 'image', 'published',
];

export async function GET(_request, { params }) {
  const { id } = await params;
  if (!id) return fail('Missing id');
  return detail(Project, id);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  if (!id) return fail('Missing id');
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  return update(Project, id, body, FIELDS);
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  if (!id) return fail('Missing id');
  return remove(Project, id);
}
