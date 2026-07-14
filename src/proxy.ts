import { NextResponse } from "next/server";

/**
 * Auth gating lives client-side (see the protected layout), not here: the auth
 * cookie is httpOnly on the cross-origin API domain, so the edge never receives
 * it and can't reliably tell logged-in from logged-out. Gating on a cookie we
 * can't read would wrongly bounce a just-logged-in user off /feed back to /login.
 */
export function proxy() {
  return NextResponse.next();
}
