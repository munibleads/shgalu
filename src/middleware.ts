import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Always prefix locales in the path (including default)
  localePrefix: "always",

  // Used when no locale matches
  defaultLocale: "ar",
})

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
