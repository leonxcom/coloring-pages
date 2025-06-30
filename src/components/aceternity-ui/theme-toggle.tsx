"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const t = useTranslations('header')

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn(
        "relative inline-flex h-9 w-16 items-center rounded-full transition-all duration-300 bg-gray-200 dark:bg-gray-700",
        className
      )}>
        <div className="h-7 w-7 rounded-full bg-white shadow-lg transition-transform duration-300 translate-x-1" />
      </div>
    )
  }

  const isDark = theme === "dark"
  
  // 定义主题相关的CSS类
  const backgroundGradient = isDark
    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    : "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500"
    
  const glowGradient = isDark
    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    : "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500"
    
  const sliderPosition = isDark ? "translate-x-8" : "translate-x-1"
  
  const sunClasses = isDark 
    ? "scale-0 opacity-0 rotate-90" 
    : "scale-100 opacity-100 rotate-0"
    
  const moonClasses = isDark 
    ? "scale-100 opacity-100 rotate-0" 
    : "scale-0 opacity-0 -rotate-90"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-9 w-16 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900",
        backgroundGradient,
        className
      )}
      aria-label={isDark ? t('theme.light') : t('theme.dark')}
    >
      {/* 背景光晕效果 */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full blur-xl opacity-70 transition-all duration-300",
          glowGradient
        )}
      />
      
      {/* 滑动按钮 */}
      <div
        className={cn(
          "relative h-7 w-7 rounded-full bg-white shadow-lg transition-all duration-300 flex items-center justify-center",
          sliderPosition
        )}
      >
        {/* 图标容器 */}
        <div className="relative w-4 h-4">
          <Sun
            className={cn(
              "absolute inset-0 w-4 h-4 text-orange-500 transition-all duration-300",
              sunClasses
            )}
          />
          <Moon
            className={cn(
              "absolute inset-0 w-4 h-4 text-indigo-600 transition-all duration-300",
              moonClasses
            )}
          />
        </div>
      </div>

      {/* 星星装饰效果 */}
      {isDark && (
        <>
          <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-pulse" />
          <div className="absolute bottom-1 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-75" />
          <div className="absolute top-2 left-5 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-150" />
        </>
      )}
    </button>
  )
} 