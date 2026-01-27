// app/sitemap.ts
import { MetadataRoute } from 'next'
import { prisma } from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const terms = await prisma.medicalTermTranslation.findMany()
  
  const termEntries = terms.map((term) => ({
    url: `https://medical-dictionary-uz.uz/terms/${term.id}`,
    lastModified: term.updated_at,
  }))

  return [
    { url: 'https://medical-dictionary-uz.uz', lastModified: new Date() },
    ...termEntries,
  ]
}