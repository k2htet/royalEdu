import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    if (pathname.startsWith("/login")) {
      return res;
    }

    if (pathname.startsWith("/register")) {
      return res;
    }

    if (pathname.startsWith("/checkout")) {
      return NextResponse.redirect(new URL("/register", req.url));
    }

    if (pathname.startsWith("/student/enroll")) {
      return NextResponse.redirect(new URL("/register", req.url));
    }

    return NextResponse.redirect(new URL("/", req.url));
  }

  if (session) {
    if (pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  }
}

export const config = {
  matcher: [
    "/student/:path*",
    "/checkout/:path*",
    "/register/:path*",
    "/login/:path*",
  ],
};
