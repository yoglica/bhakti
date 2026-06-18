// proxy.js

import { NextResponse } from 'next/server'

export function proxy(request) {
  const path = request.nextUrl.pathname
  console.log('Proxy - path:', path)
  
  // List of paths that should NOT be handled by the catch-all route
  // These will be handled by their dedicated routes
  const excludePaths = [
    '/about-us',
    '/about-us/',
    '/contact',
    '/contact/',
    '/privacy',
    '/privacy/',
    '/terms',
    '/terms/',
  ]
  
  // If the path is in the exclude list, let Next.js handle it normally
  if (excludePaths.some(excludePath => path === excludePath || path.startsWith(excludePath + '/'))) {
    console.log('Path excluded, letting Next.js handle it:', path)
    return NextResponse.next()
  }
  
  // For all other paths, continue to the catch-all route
  console.log('Path continuing to catch-all:', path)
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
}