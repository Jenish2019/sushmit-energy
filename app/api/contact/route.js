import { Message, connectDB, ok, fail } from '@/lib/api';

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return fail('Invalid JSON body');
  if (!body.name || !body.email || !body.message) {
    return fail('Name, email and message are required');
  }

  await connectDB();
  const doc = await Message.create({
    name: String(body.name),
    email: String(body.email),
    phone: String(body.phone || ''),
    subject: String(body.subject || ''),
    message: String(body.message),
  });

  return ok({ id: doc._id, received: true }, 201);
}
