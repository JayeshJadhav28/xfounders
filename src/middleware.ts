import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/favicon.ico") {
    // Serve existing image as favicon to avoid 404s
    const url = new URL("/placeholder-logo.png", request.url)
    return NextResponse.redirect(url, 308)
  }
  return NextResponse.next()
}


