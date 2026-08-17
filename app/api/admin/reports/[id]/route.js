import { Report } from '@/lib/api';
import { detail, update, remove, fail } from '@/lib/api';

const FIELDS = ['title', 'type', 'fileUrl', 'date', 'description', 'size'];

export async function GET(_request, { params }) {
  const { id } = await params;
  if (!id) return fail('Missing id');
  return detail(Report, id);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  if (!id) return fail('Missing id');
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  return update(Report, id, body, FIELDS);
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  if (!id) return fail('Missing id');
  return remove(Report, id);
}
