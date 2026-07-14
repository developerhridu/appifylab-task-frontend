import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "access_token";
const PROTECTED = ["/feed"];
const AUTH_PAGES = ["/login", "/register"];

/**
 * Edge gate on cookie presence only (cheap). The API still validates the JWT on
 * every request, so a forged/expired cookie never grants data — this just handles
 * navigation UX (bounce logged-out users to /login, logged-in users away from auth pages).
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasToken = req.cookies.has(AUTH_COOKIE);

  if (PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`)) && !hasToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (AUTH_PAGES.includes(pathname) && hasToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/feed";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/feed/:path*", "/login", "/register"],
};
