import { Message } from '@/lib/api';
import { connectDB, ok, fail } from '@/lib/api';

const FIELDS = ['name', 'email', 'phone', 'subject', 'message'];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const read = searchParams.get('read');
  await connectDB();
  const query = {};
  if (read === 'true') query.read = true;
  if (read === 'false') query.read = false;
  const docs = await Message.find(query).sort({ createdAt: -1 }).lean();
  return ok(docs);
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  if (!body.name || !body.email || !body.message) {
    return fail('Name, email and message are required');
  }
  await connectDB();
  const data = {};
  for (const key of FIELDS) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  const doc = new Message(data);
  await doc.save();
  return ok(doc.toObject(), 201);
}
