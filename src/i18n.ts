import { getRequestConfig } from 'next-intl/server'

type Messages = {
  [key: string]: unknown
}

export default getRequestConfig(async ({ locale }) => {
  let messages: Messages
  
  if (locale === 'en') {
    messages = (await import('./i18n/messages/en.json')).default
  } else if (locale === 'zh-TW') {
    messages = (await import('./i18n/messages/zh-TW.json')).default
  } else {
    // 默认使用中文
    messages = (await import('./i18n/messages/zh-CN.json')).default
  }

  return {
    locale: locale || 'zh-CN',
    messages
  }
})
