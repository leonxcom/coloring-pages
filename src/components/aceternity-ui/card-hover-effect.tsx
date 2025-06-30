"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ColoringPagePreview } from "@/components/coloring-page-preview";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    id: string;
    title: string;
    href: string;
    imageSrc: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    title: string;
    href: string;
    imageSrc: string;
  } | null>(null);

  const handleCardClick = (item: {
    id: string;
    title: string;
    href: string;
    imageSrc: string;
  }) => {
    setSelectedItem(item);
  };

  const handleClosePreview = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
          className
        )}
      >
        {items.map((item, idx) => (
          <div
            key={item?.id}
            className="relative group block p-2 h-full w-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleCardClick(item)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-purple-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <div className="aspect-square relative overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-xl">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardTitle>{item.title}</CardTitle>
            </Card>
          </div>
        ))}
      </div>
      
      {/* 预览弹窗 */}
      {selectedItem && (
        <ColoringPagePreview
          isOpen={!!selectedItem}
          onClose={handleClosePreview}
          item={selectedItem}
        />
      )}
    </>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-gray-900 border border-transparent dark:border-white/[0.2] group-hover:border-purple-300 dark:group-hover:border-purple-500 relative z-20 shadow-lg group-hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      <div className="relative z-50">
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-center text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors tracking-wide", className)}>
      {children}
    </h4>
  );
}; 