export const locales = ['zh-CN', 'en', 'zh-TW'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'zh-CN'

export const localeNames: Record<Locale, string> = {
  'zh-CN': '中文（简体）',
  'en': 'English',
  'zh-TW': '中文（繁體）'
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
