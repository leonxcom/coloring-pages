"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Search, Menu, Globe, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { useTranslations, useLocale } from "next-intl"
import { locales, localeNames } from "@/i18n/config"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ThemeToggle } from "@/components/aceternity-ui/theme-toggle"

interface NavItem {
  name: string
  href: string
  subItems?: { name: string; href: string }[]
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('header')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const navItems: NavItem[] = []

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <span className="text-2xl">🎨</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {t('logo')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition-colors font-medium dark:text-gray-300 dark:hover:text-primary"
                >
                  {item.name}
                </Link>
                {item.subItems && (
                  <div className="absolute left-0 top-full pt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                    <div className="bg-white rounded-lg shadow-lg py-2 min-w-[200px] dark:bg-gray-800 dark:border dark:border-gray-700">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors dark:text-gray-300 dark:hover:bg-primary/20"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              href="https://coloringplanet.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm font-bold text-gray-700 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-primary"
            >
              <span>{t('external.fullStackVersion')}</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="https://colorpenguin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-primary"
            >
              <span>{t('external.aiGenerator')}</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Select value={locale} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[140px]">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locales.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {localeNames[loc]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="sr-only">导航菜单</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                <Link
                  href="https://coloringplanet.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-lg font-bold text-gray-700 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{t('external.fullStackVersion')}</span>
                  <ExternalLink className="h-5 w-5" />
                </Link>
                <Link
                  href="https://colorpenguin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-lg font-medium text-gray-700 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{t('external.aiGenerator')}</span>
                  <ExternalLink className="h-5 w-5" />
                </Link>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start space-x-2 text-lg font-medium text-gray-700 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-primary p-0 h-auto"
                >
                  <Search className="h-5 w-5" />
                  <span>{t('search')}</span>
                </Button>
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="text-lg font-medium text-gray-700 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.subItems && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-sm text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t dark:border-gray-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('theme.toggle')}</span>
                    <ThemeToggle />
                  </div>
                  <Select value={locale} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full">
                      <Globe className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locales.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {localeNames[loc]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
