import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    if (!session && pathname.startsWith("/checkout")) {
      return NextResponse.redirect(new URL("/register", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (session) {
    if (session && pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (session && pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  }
}

export const config = {
  matcher: ["/student/:path*", "/checkout/:path*"],
};
