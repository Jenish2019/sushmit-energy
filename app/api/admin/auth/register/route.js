import bcrypt from 'bcryptjs';
import { Admin, connectDB, ok, fail } from '@/lib/api';

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.password) {
    return fail('Name, email and password are required');
  }
  if (body.password.length < 8) {
    return fail('Password must be at least 8 characters');
  }

  await connectDB();

  const existing = await Admin.countDocuments();
  if (existing > 0) {
    return fail('Admins already exist. Registration is closed.', 403);
  }

  const passwordHash = await bcrypt.hash(body.password, 10);
  const doc = await Admin.create({
    name: body.name,
    email: body.email.toLowerCase(),
    passwordHash,
    role: body.role || 'superadmin',
  });

  return ok({ id: doc._id, name: doc.name, email: doc.email, role: doc.role }, 201);
}
