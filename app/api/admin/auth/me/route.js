import { Admin, connectDB, ok, fail } from '@/lib/api';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session?.id) return fail('Not authenticated', 401);

  await connectDB();
  const admin = await Admin.findById(session.id).lean();
  if (!admin) return fail('Not authenticated', 401);

  return ok({
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  });
}
