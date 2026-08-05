import bcrypt from 'bcryptjs';
import { Admin, connectDB, ok, fail } from '@/lib/api';
import { createSession } from '@/lib/auth';

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.password) return fail('Email and password are required');

  await connectDB();
  const admin = await Admin.findOne({ email: body.email.toLowerCase() }).lean();
  if (!admin) return fail('Invalid email or password', 401);

  const valid = await bcrypt.compare(body.password, admin.passwordHash);
  if (!valid) return fail('Invalid email or password', 401);

  await createSession(admin);

  return ok({
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  });
}
