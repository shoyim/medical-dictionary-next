import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Static fayllar va API'larni o'tkazib yuborish
    if (
      pathname.startsWith('/_next') || 
      pathname.includes('/api/') ||
      pathname.includes('.') 
    ) {
      return NextResponse.next();
    }

    // 2. AGAR yo'l /admin bilan boshlansa, til qo'shish mantiqini TO'XTATISH
    if (pathname.startsWith('/admin')) {
      return NextResponse.next();
    }

    // 3. Til (locale) bor-yo'qligini tekshirish
    const locales = ['uz', 'ru', 'en'];
    const pathnameIsMissingLocale = locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // 4. Faqat admin bo'lmagan va tili yo'q sahifalar uchun redirect
    if (pathnameIsMissingLocale) {
      return NextResponse.redirect(
        new URL(`/uz${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Admin sahifalariga ruxsatni tekshirish
        if (pathname.startsWith('/admin')) {
          // Login sahifasiga hamma kirishi mumkin
          if (pathname === '/admin/login') return true;
          // Boshqa admin sahifalari uchun token shart
          return !!token;
        }
        
        return true;
      },
    },
    pages: {
      signIn: "/admin/login", 
    },
  }
);

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};