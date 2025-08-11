import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSession } from "./lib/auth"

export async function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip auth check for login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    try {
      const user = await getSession()

      if (!user || user.role !== "admin") {
        // Redirect to login page
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }
    } catch (error) {
      // Redirect to login page on error
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
