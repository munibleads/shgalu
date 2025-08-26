import createMiddleware from "next-intl/middleware"
import { NextRequest } from "next/server"

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["ar", "en"],

  // Always prefix locales in the path (including default)
  localePrefix: "always",

  // Used when no locale matches
  defaultLocale: "ar",
})

export default function middleware(request: NextRequest) {
  // Handle root path explicitly
  if (request.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/ar", request.url))
  }
  
  return intlMiddleware(request)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.ico).*)"],
}
