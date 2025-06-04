import Link from 'next/link';
import Image from 'next/image';
import { blogArticles } from '../data/blogArticles';
import SectionTitle from './SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { motion } from 'framer-motion';
import { AnimatedTitle } from './AnimatedTitle';
import { useState, useEffect } from 'react';
import ReadMoreButton from './ReadMoreButton';
import { cn } from '@/lib/utils';
import { useTranslation } from 'next-i18next';

export default function HomeBlogSection() {
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);
  const articles = blogArticles.slice(0, 12);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-4">
          <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold text-base tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('blog.badge')}</span>
          </span>
        </div>
        <div className="flex flex-col items-center w-full">
          <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent w-full">
            {t('blog.title')}
          </AnimatedTitle>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center mb-12"
        >{t('blog.subtitle')}</motion.p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 w-full">
          {articles.slice(0, 6).map((article, i) => {
            const isNew = (Date.now() - new Date(article.date).getTime()) < 1000 * 60 * 60 * 24 * 15;
            const authorAvatar = '/images/character/astro2.png';
            return (
              <div
                key={article.slug}
                className={cn(
                  'p-0 rounded-md min-h-20',
                  (i === 0 || i === 2) && 'row-span-2 h-full'
                )}
              >
                <div className={cn(
                  'rounded-md overflow-hidden border border-zinc-100 dark:border-zinc-800 flex flex-col h-full bg-zinc-50 dark:bg-zinc-900',
                  (i === 0 || i === 2) ? 'h-full' : ''
                )}>
                  <div className={cn(
                    'relative w-full',
                    (i === 0 || i === 2) ? 'h-28' : 'h-24'
                  )}>
                    <Image src={article.image} alt={article.title} fill className="object-cover rounded-t-md" />
                    {isNew && (
                      <span className="absolute top-2 left-2 bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold shadow">{t('blog.new')}</span>
                    )}
                  </div>
                  <div className="h-1 w-full bg-gradient-to-r from-indigo-200 via-pink-200 to-transparent dark:from-indigo-900/30 dark:via-pink-900/20 dark:to-zinc-900" />
                  <div className="p-3 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {article.tags.slice(0,1).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block w-1 h-4 rounded bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 mr-2" />
                      <h3 className={cn(
                        'font-semibold text-zinc-800 dark:text-zinc-100 mb-0.5 line-clamp-2',
                        (i === 0 || i === 2) ? 'text-sm' : 'text-xs'
                      )}>
                        {article.title}
                      </h3>
                    </div>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-400 mb-1">{(article as any).readTime ? String((article as any).readTime) : '5 min'} {t('blog.read_time')}</span>
                    <p className="body text-zinc-600 dark:text-zinc-300 mb-1 flex-1 text-[11px] line-clamp-1">{article.summary}</p>
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 mt-auto">
                      <span className="inline-flex items-center gap-1">
                        <Image src={authorAvatar} alt={article.author} width={18} height={18} className="rounded-full object-cover border border-zinc-200 dark:border-zinc-700" />
                        <span>{new Date(article.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </span>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="text-[10px] text-indigo-600 dark:text-indigo-300 underline hover:no-underline font-medium"
                      >
                        {t('blog.read')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-12">
          <a href="/blog" style={{ textDecoration: 'none' }}>
            <ReadMoreButton text={t('blog.see_all')} />
          </a>
        </div>
      </div>
    </section>
  );
} 