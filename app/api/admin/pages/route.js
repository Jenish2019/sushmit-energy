import { Page, connectDB, ok } from '@/lib/api';
import { list, create, fail } from '@/lib/api';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (slug) {
    await connectDB();
    const doc = await Page.findOne({ slug }).lean();
    return ok(doc || { slug });
  }
  return list(Page, {}, { slug: 1 });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  return create(Page, body);
}
