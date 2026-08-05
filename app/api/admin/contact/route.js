import { Contact } from '@/lib/api';
import { connectDB, ok, fail } from '@/lib/api';

const FIELDS = ['address', 'phone', 'email', 'mapEmbed'];

export async function GET() {
  await connectDB();
  const doc = await Contact.findOne().lean();
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
  const doc = await Contact.findOneAndUpdate({}, data, { upsert: true, new: true }).lean();
  return ok(doc);
}
