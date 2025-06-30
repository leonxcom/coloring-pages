"use client"

import { useState } from "react"
import Image from "next/image"
import { Download, Printer, X } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ColoringPagePreviewProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: string
    title: string
    imageSrc: string
    href: string
  }
}

export function ColoringPagePreview({ isOpen, onClose, item }: ColoringPagePreviewProps) {
  const t = useTranslations('coloringPages')

  const handleDownload = () => {
    // 创建一个临时链接下载图片
    const link = document.createElement('a')
    link.href = item.imageSrc
    link.download = `${item.title.replace(/\s+/g, '-').toLowerCase()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    // 打开新窗口进行打印
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>打印 - ${item.title}</title>
            <style>
              body {
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: white;
              }
              img {
                max-width: 100%;
                max-height: 100vh;
                object-fit: contain;
              }
              @media print {
                body { margin: 0; padding: 0; }
                img { max-height: 100vh; width: auto; }
              }
            </style>
          </head>
          <body>
            <img src="${item.imageSrc}" alt="${item.title}" onload="window.print(); window.close();" />
          </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">
            {item.title}
          </DialogTitle>
        </DialogHeader>
        
        {/* 图片容器 */}
        <div className="flex-1 relative overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800 min-h-0">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* 按钮组 */}
        <div className="flex-shrink-0 flex justify-center gap-4 pt-4">
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            下载 PDF
          </Button>
          
          <Button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            打印
          </Button>
        </div>
        
        {/* 关闭按钮 */}
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">关闭</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
} 