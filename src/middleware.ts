import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { AUTH_SIGN_IN_PATH, AUTH_TOKEN_NAME } from './constants/auth.constants'


export function middleware(req: NextRequest) {
  const token = cookies().get(AUTH_TOKEN_NAME)
  const isAuthenticated = token === undefined ? false : true

  if (!isAuthenticated) return NextResponse.redirect(new URL(AUTH_SIGN_IN_PATH, req.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}