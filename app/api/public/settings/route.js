import { getSettings, getContact } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [settings, contact] = await Promise.all([getSettings(), getContact()]);
  return Response.json({
    success: true,
    data: {
      settings,
      contact,
    },
  });
}
