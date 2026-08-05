import { Setting } from '@/lib/api';
import { connectDB, ok, fail } from '@/lib/api';

const FIELDS = ['siteName', 'siteEmail', 'sitePhone', 'address', 'bannerSlides'];

export async function GET() {
  await connectDB();
  const doc = await Setting.findOne().lean();
  if (!doc) return ok({});
  return ok(doc);
}

export async function PUT(request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  await connectDB();
  const data = {};
  for (const key of FIELDS) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  const doc = await Setting.findOneAndUpdate({}, data, { upsert: true, new: true }).lean();
  return ok(doc);
}
