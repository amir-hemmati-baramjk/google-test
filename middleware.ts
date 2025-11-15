// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intl = createIntlMiddleware(routing);
const LOCALES = ["en", "ar"] as const;

function splitLocale(pathname: string) {
  const seg = pathname.split("/");
  const first = seg[1];
  const isLocale = (LOCALES as readonly string[]).includes(first);
  return {
    current: isLocale ? (first as (typeof LOCALES)[number]) : null,
    rest: "/" + (isLocale ? seg.slice(2) : seg.slice(1)).join("/"),
  };
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/__/auth/handler")) return NextResponse.next();

  const cookieLocale = req.cookies.get("APP_LANG")?.value as
    | "en"
    | "ar"
    | undefined;
  const forced = cookieLocale ?? (routing.defaultLocale as "en" | "ar");

  const { current, rest } = splitLocale(pathname);

  if (!current) {
    const url = req.nextUrl.clone();
    url.pathname = `/${forced}${rest}`;
    return NextResponse.redirect(url, 307);
  }

  if (current !== forced) {
    const url = req.nextUrl.clone();
    url.pathname = `/${forced}${rest}`;
    return NextResponse.redirect(url, 307);
  }

  return intl(req);
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt|__/auth/handler).*)",
  ],
};
