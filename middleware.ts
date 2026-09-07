import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /cms/* except /cms/login
  if (pathname.startsWith("/cms") && !pathname.startsWith("/cms/login")) {
    const auth = request.cookies.get("cms_auth");
    if (auth?.value !== "1") {
      return NextResponse.redirect(new URL("/cms/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cms/:path*"],
};
