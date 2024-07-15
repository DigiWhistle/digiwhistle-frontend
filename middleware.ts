import { NextResponse, type NextRequest } from "next/server";

function shouldSkipRequest(pathname: string) {
  const prefixes = ["/_next", "/assets", "/brand", "/favicon.ico", ".ico"];
  let shouldSkip = false;

  shouldSkip = prefixes.some(prefix => pathname.startsWith(prefix));
  console.log(pathname, shouldSkip);
  if (pathname === "/" || pathname.match(/\.(png|webp|ico)$/)) {
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
    response = NextResponse.next();

    response.cookies.delete("userToken");
  } else {
    if (!request.cookies.has("userToken")) {
      response = NextResponse.redirect(new URL("/sign-up", request.url));
    } else {
      response = NextResponse.next();
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.svg$|.*\\.webp$|.*\\.png$).*)",
    "//_next|/assets|/brand|/favicon.ico/|/icon.ico",
  ],
};
