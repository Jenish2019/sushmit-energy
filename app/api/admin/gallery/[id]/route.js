import { Album } from '@/lib/api';
import { detail, update, remove, fail } from '@/lib/api';

const FIELDS = ['name', 'description', 'cover', 'images', 'order'];

export async function GET(_request, { params }) {
  const { id } = await params;
  if (!id) return fail('Missing id');
  return detail(Album, id);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  if (!id) return fail('Missing id');
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  return update(Album, id, body, FIELDS);
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  if (!id) return fail('Missing id');
  return remove(Album, id);
}
