import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import ClientBody from "../ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Messages = {
  [key: string]: unknown
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "涂色星球 - 最好玩的涂色平台",
    description: "为所有儿童和成人发现免费涂色页面。无需注册！立即下载并为手绘插图着色。",
  }
}

export function generateStaticParams() {
  return [
    { locale: 'zh-CN' },
    { locale: 'en' },
    { locale: 'zh-TW' }
  ]
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // 加载翻译消息
  let messages: Messages
  if (locale === 'en') {
    messages = (await import("@/i18n/messages/en.json")).default
  } else if (locale === 'zh-TW') {
    messages = (await import("@/i18n/messages/zh-TW.json")).default
  } else {
    messages = (await import("@/i18n/messages/zh-CN.json")).default
  }

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} h-full`} suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased flex flex-col min-h-full">
        <ThemeProvider>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ClientBody>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ClientBody>
        </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
