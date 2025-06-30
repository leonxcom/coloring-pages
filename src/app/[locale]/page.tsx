import { useTranslations } from 'next-intl';
import { coloringPages } from '@/lib/coloring-pages-data';
import { HoverEffect } from '@/components/aceternity-ui/card-hover-effect';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ColoringPagesSection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="bg-white dark:bg-gray-950 pt-12 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧文本内容 */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 leading-tight whitespace-nowrap">
              {t('hero.title')}
            </h1>
            
            <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('hero.description1')}
            </div>
            
            <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('hero.description2')}
            </div>
            
            <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {(() => {
                const text = t('hero.description3');
                const procreateIndex = text.indexOf('Procreate');
                if (procreateIndex === -1) {
                  return text;
                }
                
                const beforeProcreate = text.substring(0, procreateIndex);
                const afterProcreate = text.substring(procreateIndex + 'Procreate'.length);
                
                return (
                  <>
                    {beforeProcreate}
                    <a 
                      href={t('hero.procreateLink')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:text-cyan-600 underline font-semibold transition-colors"
                    >
                      Procreate
                    </a>
                    {afterProcreate}
                  </>
                );
              })()}
            </div>
          </div>

          {/* 右侧图片 */}
          <div className="relative max-w-md mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/hero/ai-coloring-hero.png"
                alt="孩子们快乐地制作涂色页面"
                width={300}
                height={300}
                className="w-full h-auto object-cover"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QFLQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
                             {/* 装饰性渐变遮罩 */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
             </div>
             
             {/* 装饰性浮动元素 */}
             <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-20 blur-xl" />
             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-15 blur-2xl" />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

function ColoringPagesSection() {
  const t = useTranslations('home');

  // 转换数据格式以适配HoverEffect组件
  const coloringPagesData = coloringPages.slice(0, 32).map(page => ({
    id: page.id,
    title: page.title,
    href: page.href,
    imageSrc: page.imageSrc
  }));

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
          {t('sections.coloringPagesTitle')}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          {t('sections.coloringPagesDescription')}
        </p>
        
        {/* 使用Aceternity UI的HoverEffect组件 */}
        <HoverEffect items={coloringPagesData} className="mb-12" />
        
        <div className="text-center">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl duration-300">
            查看更多涂色页面
          </button>
        </div>
      </div>
    </section>
  );
}


