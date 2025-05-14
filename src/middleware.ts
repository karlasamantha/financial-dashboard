import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login'];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = await cookies();
  const session = cookie.get('session')?.value;
  const sessionPayload = await decrypt(session);

  if (isProtectedRoute && !sessionPayload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isPublicRoute && sessionPayload) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
