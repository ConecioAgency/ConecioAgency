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

export default function HomeBlogSection() {
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
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">BLOG</span>
          </span>
        </div>
        <div className="flex flex-col items-center w-full">
          <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent w-full">
            Nos derniers articles
          </AnimatedTitle>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center mb-12"
        >Plongez dans l'univers Conecio : conseils, tendances et retours d'expérience sur le digital, le marketing et l'innovation. Nos experts partagent chaque semaine des articles pour booster votre stratégie et votre créativité.</motion.p>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
            1400: { slidesPerView: 6 },
          }}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={articles.length > 6}
          className="w-full"
        >
          {articles.map(article => (
            <SwiperSlide key={article.slug}>
              <motion.div
                whileHover={{ y: -16, rotateY: 8, boxShadow: '0 16px 48px 0 #a5b4fc77, 0 0 0 8px #f472b655', backgroundColor: '#eef2ff' }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                style={{ perspective: 800 }}
                className="group rounded-2xl overflow-hidden shadow-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-100 dark:border-gray-700 flex flex-col h-full transition-all hover:shadow-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/40 backdrop-blur-xl p-0 relative"
              >
                <div className="relative w-full h-56">
                  <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-2xl" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {article.tags.slice(0,1).map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {article.title}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-300 mb-2">{(article as any).readTime ? String((article as any).readTime) : '5 min'} de lecture</span>
                  <p className="body text-gray-600 dark:text-gray-300 mb-2 flex-1 text-xs line-clamp-2">{article.summary}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-auto">
                    <span className="inline-flex items-center gap-1"><svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" /></svg>{new Date(article.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-xs font-bold flex items-center gap-1 px-2 py-1 rounded border border-indigo-500 text-indigo-600 dark:text-white dark:border-white bg-transparent hover:bg-indigo-500 hover:text-white dark:hover:bg-white dark:hover:text-indigo-700 transition-all group shadow"
                    >
                      Lire
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center mt-12">
          <a href="/blog" style={{ textDecoration: 'none' }}>
            <ReadMoreButton text="Voir tous les articles" />
          </a>
        </div>
      </div>
    </section>
  );
} 