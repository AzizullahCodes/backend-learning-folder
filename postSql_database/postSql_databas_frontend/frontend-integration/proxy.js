// middleware.js (or proxy.js)
import { NextResponse } from "next/server";
import { publicRoutes, privateRoutes } from "./src/routes/routes";

export function proxy(req) {
  const cookiesVal = req.cookies.get('myToken')?.value;
  const path = req.nextUrl.pathname;

  console.log('cookies value:', cookiesVal);
  console.log('path:', path);

  // 1. If user HAS token and tries to access a PUBLIC route (e.g., /login) -> Redirect to Home
  if (cookiesVal && publicRoutes.includes(path)) {
    console.log('Public route accessed by authenticated user. Redirecting...');
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 2. If user NO token and tries to access a PRIVATE route (e.g., /dashboard) -> Redirect to Login
  if (!cookiesVal && privateRoutes.includes(path)) {
    console.log('Private route accessed by guest. Redirecting to /login...');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 3. REQUIRED: Allow request to continue if no redirect condition met
  return NextResponse.next();
}

export default proxy;