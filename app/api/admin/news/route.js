import { NewsArticle } from '@/lib/api';
import { list, create, fail } from '@/lib/api';

const FIELDS = [
  'title', 'slug', 'category', 'content', 'excerpt', 'image', 'date',
  'status', 'metaTitle', 'metaDescription',
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const query = {};
  if (category) query.category = category;
  if (status) query.status = status;
  return list(NewsArticle, query);
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  return create(NewsArticle, body, FIELDS);
}
