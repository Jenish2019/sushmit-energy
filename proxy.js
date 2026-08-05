import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_COOKIE = 'admin_session';
const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'sushmit-energy-dev-secret-change-in-production'
);

const OPEN_API_PATHS = [
  '/api/admin/auth/login',
  '/api/admin/auth/register',
  '/api/admin/auth/me',
  '/api/admin/auth/logout',
];

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  let session = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      session = payload;
    } catch {
      session = null;
    }
  }

  if (pathname.startsWith('/api/admin')) {
    if (OPEN_API_PATHS.includes(pathname)) {
      return NextResponse.next();
    }
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  if (pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/login'],
};
