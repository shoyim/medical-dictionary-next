const dictionaries = {
  uz: () => import('@/dictionaries/uz.json').then((module) => module.default),
  ru: () => import('@/dictionaries/ru.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: string) => {
  const loader = dictionaries[locale as Locale] || dictionaries.uz;
  return loader();
};