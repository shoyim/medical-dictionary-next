import { MetadataRoute } from 'next'
import { prisma } from "@/lib/prisma"

interface MedicalTermTranslation {
  id: number;
  updated_at: Date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const terms = await prisma.medicalTermTranslation.findMany({
    select: {
      id: true,
      updated_at: true,
    }
  }) as MedicalTermTranslation[];
  
  const termEntries = terms.map((term: MedicalTermTranslation) => ({
    url: `https://medical-dictionary-uz/terms/${term.id}`,
    lastModified: term.updated_at,
  }))

  return [
    { 
      url: 'https://medical-dictionary.uz', 
      lastModified: new Date() 
    },
    ...termEntries,
  ]
}