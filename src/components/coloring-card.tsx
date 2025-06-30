import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface ColoringCardProps {
  title: string
  href: string
  imageSrc: string
  imageAlt?: string
}

export function ColoringCard({ title, href, imageSrc, imageAlt }: ColoringCardProps) {
  return (
    <Link href={href} className="group">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="aspect-square relative overflow-hidden bg-gray-50">
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="text-center text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
