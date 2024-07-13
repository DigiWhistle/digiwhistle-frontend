import { NextResponse, type NextRequest } from "next/server";

function shouldSkipRequest(pathname: string) {
  const prefixes = ["/_next", "/assets", "/brand", "/favicon.ico", "/icon.ico"];
  let shouldSkip = false;

  shouldSkip = prefixes.some(prefix => pathname.startsWith(prefix));
  if (pathname === "/") {
    shouldSkip = true;
  }
  return shouldSkip;
}

export function middleware(request: NextRequest) {
  let response;

  if (shouldSkipRequest(request.nextUrl.pathname)) {
    response = NextResponse.next();
  } else if (
    request.nextUrl.pathname === "/sign-up" ||
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/reset-password"
  ) {
    // Clearing the userToken and companyId cookies when /sign-up, /login & /reset-password routes are called
    response = NextResponse.next();

    response.cookies.delete("userToken");
  } else {
    if (!request.cookies.has("userToken")) {
      response = NextResponse.redirect(new URL("/login", request.url));
    } else {
      response = NextResponse.next();
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "//_next|/assets|/brand|/favicon.ico/|/icon.ico",
  ],
};
