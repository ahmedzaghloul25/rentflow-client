// src/middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Get the auth token from the request cookies
  const token = request.cookies.get('auth_token');

  const { pathname } = request.nextUrl;
  const loginUrl = new URL('/auth/google', request.url);
  const dashboardUrl = new URL('/dashboard', request.url);

  // 2. If the user is trying to access the dashboard without a token,
  //    redirect them to the login page.
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(loginUrl);
  }

  if (token && pathname.startsWith('/auth')) {
    return NextResponse.redirect(dashboardUrl)
  }

  // 4. Otherwise, continue with the request
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/auth'],
};