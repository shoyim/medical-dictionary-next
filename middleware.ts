import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rasmlar va ichki fayllarni tekshirmaslik uchun
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('/api/') ||
    pathname.includes('.') // rasm, favicon va h.k.
  ) {
    return;
  }

  // Agar URL da til kodi bo'lmasa (uz, ru, en)
  const pathnameIsMissingLocale = ['/uz', '/ru', '/en'].every(
    (locale) => !pathname.startsWith(locale) && pathname !== locale
  );

  if (pathnameIsMissingLocale) {
    // Faqat bir marta yo'naltiradi
    return NextResponse.redirect(new URL(`/uz${pathname}`, request.url));
  }
}