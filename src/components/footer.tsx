"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

export function Footer() {
  const t = useTranslations('footer')
  const tHeader = useTranslations('header')
  const locale = useLocale()

  const footerLinks = [
    {
      title: tHeader('nav.toolsTricks'),
      href: `/${locale}/tools-tricks`
    },
    {
      title: tHeader('nav.about'),
      href: `/${locale}/about`
    },
    {
      title: tHeader('nav.contact'),
      href: `/${locale}/contact`
    }
  ]

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Links */}
          <div className="space-y-4">
            <nav className="space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="block text-white/80 hover:text-white transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center space-x-4">
            <Link
              href="#"
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Pinterest"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            </Link>
            <Link
              href="#"
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right space-y-2">
            <p className="text-sm text-white/80">
              {t('copyright')}
            </p>
            <div className="text-sm text-white/60 space-x-2">
              <Link href={`/${locale}/privacy-policy`} className="hover:text-white/80 transition-colors">
                {t('privacyPolicy')}
              </Link>
              <span>|</span>
              <Link href={`/${locale}/affiliate-disclaimer`} className="hover:text-white/80 transition-colors">
                {t('affiliateDisclaimer')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
