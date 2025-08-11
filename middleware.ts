import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip auth check for login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    try {
      const session = request.cookies.get("session")?.value
      if (!session) {
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }

      const secretKey = process.env.JWT_SECRET || "your-secret-key-change-in-production"
      const key = new TextEncoder().encode(secretKey)
      const { payload } = await jwtVerify(session, key, { algorithms: ["HS256"] })

      const role = (payload as any)?.role
      const expires = (payload as any)?.expires

      if (!role || role !== "admin") {
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }

      if (!expires || new Date() > new Date(expires as any)) {
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
