import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_DEFAULT_ROUTE, USER_DEFAULT_ROUTE } from "./lib/constants";

function shouldSkipRequest(pathname: string) {
  const prefixes = ["/_next", "/assets", "/brand", "/favicon.ico", ".ico"];
  let shouldSkip = false;

  shouldSkip = prefixes.some(prefix => pathname.includes(prefix));

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
    request.nextUrl.pathname.startsWith("/sign-up") ||
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/reset-password" ||
    request.nextUrl.pathname === "/onboarding"
  ) {
    if (request.cookies.has("token") && request.cookies.has("role")) {
      if (
        request.cookies.get("role")?.value === "admin" ||
        request.cookies.get("role")?.value === "employee"
      ) {
        response = NextResponse.redirect(new URL(ADMIN_DEFAULT_ROUTE, request.url));
      } else if (
        request.cookies.get("role")?.value === "influencer" ||
        request.cookies.get("role")?.value === "brand" ||
        request.cookies.get("role")?.value === "agency"
      ) {
        response = NextResponse.redirect(new URL(USER_DEFAULT_ROUTE, request.url));
      } else {
        response = NextResponse.next();
        response.cookies.delete("token");
        response.cookies.delete("role");
      }
    } else {
      response = NextResponse.next();
      response.cookies.delete("token");
      response.cookies.delete("role");
    }
  } else {
    if (!request.cookies.has("token") || !request.cookies.has("role")) {
      response = NextResponse.redirect(new URL("/login", request.url));
    } else if (request.nextUrl.pathname.startsWith("/admin")) {
      if (
        request.cookies.get("role")?.value === "admin" ||
        request.cookies.get("role")?.value === "employee"
      ) {
        response = NextResponse.next();
      } else {
        response = NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } else if (request.nextUrl.pathname.startsWith("/user")) {
      if (
        request.cookies.get("role")?.value === "influencer" ||
        request.cookies.get("role")?.value === "brand" ||
        request.cookies.get("role")?.value === "agency"
      ) {
        response = NextResponse.next();
      } else {
        response = NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } else {
      response = NextResponse.next();
    }
  }

  return response;
}

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|.\\.svg$|.\\.webp$|.\\.png$).)",
//     "//_next|/assets|/brand|/favicon.ico/|/icon.ico",
//   ],
// };
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "//_next|/assets|/brand|/favicon.ico/",
  ],
};
