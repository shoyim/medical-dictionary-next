// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Admin panelni qidiruv tizimlaridan berkitish
    },
    sitemap: 'https://medical-dictionary-uz.uz/sitemap.xml',
  }
}