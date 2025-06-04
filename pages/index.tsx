import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhatToExpect from '../components/WhatToExpect';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HomeBlogSection from '../components/HomeBlogSection';
import DevisPopup from '../components/DevisPopup';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { H1, H2, H3, Body1, Body2, Overline, Button } from '../components/Typography';
import { AnimatedPremiumTitle } from '../components/AnimatedPremiumTitle';
import { wrap } from '@motionone/utils';
import React from 'react';
import OurAgency from '../components/OurAgency';
import BrandIconsCarousel from 'src/components/BrandIconsCarousel';
import SectionReveal from '../components/SectionReveal';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticPropsContext } from 'next';

interface ParallaxTextProps {
  children: React.ReactNode;
  baseVelocity: number;
}

const VIOLET = '#a100ff';
const TURQUOISE = '#00c3a5';
const BLANC = '#fff';

const ParallaxText = ({ children, baseVelocity = 100 }: ParallaxTextProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="relative overflow-hidden whitespace-nowrap flex flex-nowrap py-0">
      {/* Fade à gauche */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-12 z-20"
        style={{
          background:
            'linear-gradient(to right, var(--fade-bg, #fff) 0%, transparent 80%, transparent 100%)'
        }}
      />
      {/* Fade à droite */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-12 z-20"
        style={{
          background:
            'linear-gradient(to left, var(--fade-bg, #fff) 0%, transparent 80%, transparent 100%)'
        }}
      />
      <motion.div
        className="flex whitespace-nowrap flex-nowrap relative z-10"
        style={{
          x,
          fontFamily: "'Plaster', sans-serif",
          fontSize: '64px',
          fontWeight: 600,
          fontStyle: 'normal',
          height: '51.2px',
          letterSpacing: '-2px',
          lineHeight: '51.2px',
          textTransform: 'uppercase',
          WebkitFontSmoothing: 'antialiased',
          color: 'var(--parallax-text-color, #18181b)',
        }}
      >
        <span style={{ display: 'block', marginRight: 30, whiteSpace: 'nowrap' }}>{children}</span>
        <span style={{ display: 'block', marginRight: 30, whiteSpace: 'nowrap' }}>{children}</span>
        <span style={{ display: 'block', marginRight: 30, whiteSpace: 'nowrap' }}>{children}</span>
        <span style={{ display: 'block', marginRight: 30, whiteSpace: 'nowrap' }}>{children}</span>
      </motion.div>
      <style jsx global>{`
        :root {
          --fade-bg: #fff;
          --parallax-text-color: #18181b;
        }
        .dark {
          --fade-bg: #18181b;
          --parallax-text-color: #fff;
        }
      `}</style>
    </div>
  );
};

export { ParallaxText };

export default function Home() {
  const { t, i18n } = useTranslation('common');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>{t('home.seo.title')}</title>
        <meta name="description" content={t('home.seo.description')} />
        <meta name="keywords" content={t('home.seo.keywords')} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://www.conecio.com" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('home.seo.title')} />
        <meta property="og:description" content={t('home.seo.description')} />
        <meta property="og:image" content="https://www.conecio.com/images/og-image.jpg" />
        <meta property="og:image:alt" content={t('home.seo.og_image_alt')} />
        <meta property="og:url" content="https://www.conecio.com" />
        <meta property="og:site_name" content="Conecio" />
        <meta property="og:locale" content={i18n.language === 'fr' ? 'fr_FR' : i18n.language === 'en' ? 'en_US' : i18n.language === 'es' ? 'es_ES' : 'ar_AR'} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('home.seo.title')} />
        <meta name="twitter:description" content={t('home.seo.description')} />
        <meta name="twitter:image" content="https://www.conecio.com/images/og-image.jpg" />
        <meta name="twitter:site" content="@conecio" />
        <meta name="twitter:creator" content="@conecio" />
        
        {/* Autres meta tags */}
        <meta name="author" content="Conecio" />
        <meta name="language" content={i18n.language} />
        <meta name="revisit-after" content="7 days" />
        <meta name="generator" content="Next.js" />
        
        {/* Données structurées */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Conecio",
            "url": "https://www.conecio.com",
            "logo": "https://www.conecio.com/images/logo.png",
            "description": t('home.seo.structured_desc'),
            "address": {
              "@type": "PostalAddress",
              "addressCountry": i18n.language.toUpperCase()
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+33-XX-XX-XX-XX",
              "contactType": "customer service",
              "email": "contact@conecio.com"
            },
            "sameAs": [
              "https://www.linkedin.com/company/conecio",
              "https://twitter.com/conecio",
              "https://www.facebook.com/conecio"
            ]
          })}
        </script>
        
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Plaster&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-800">
        <Navbar />
        <main>
          <SectionReveal><Hero /></SectionReveal>
          <ParallaxText baseVelocity={-2}>
            <span style={{ color: VIOLET }}>{t('home.parallax.innovate')}</span>{' '}
            <span style={{ color: TURQUOISE }}>{t('home.parallax.impact')}</span>{' '}
            <span style={{ color: BLANC }}>{t('home.parallax.dare')}</span>
          </ParallaxText>
          <ParallaxText baseVelocity={2}>
            <span style={{ color: TURQUOISE }}>{t('home.parallax.strategy')}</span>{' '}
            <span style={{ color: VIOLET }}>{t('home.parallax.digital')}</span>{' '}
            <span style={{ color: BLANC }}>{t('home.parallax.creativity')}</span>{' '}
            <span style={{ color: TURQUOISE }}>{t('home.parallax.results')}</span>{' '}
            {t('home.parallax.agency_diff')}{' '}
            <span style={{ color: VIOLET }}>{t('home.parallax.difference')}</span>
          </ParallaxText>
          <SectionReveal delay={0.1}><OurAgency /></SectionReveal>
          <SectionReveal delay={0.15}><BrandIconsCarousel /></SectionReveal>
          <SectionReveal delay={0.2}><Services /></SectionReveal>
          <SectionReveal delay={0.25}><WhatToExpect /></SectionReveal>
          <SectionReveal delay={0.3}><Process /></SectionReveal>
          <SectionReveal delay={0.35}><Testimonials /></SectionReveal>
          <SectionReveal delay={0.4}><HomeBlogSection /></SectionReveal>
          <section className="py-12 md:py-16 bg-white dark:bg-gray-800 relative overflow-hidden">
            <div className="relative max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6 px-4 sm:px-8 py-8 border border-zinc-100 dark:border-zinc-800 overflow-hidden">
              {/* Pattern SVG discret en fond de la box */}
              <div className="absolute inset-0 pointer-events-none z-0 dark:opacity-30">
                <svg width="100%" height="100%" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <pattern id="dots-box" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="2" fill="#e0e7ef" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots-box)" />
                  <circle cx="500" cy="60" r="60" fill="#a78bfa22" />
                  <circle cx="80" cy="160" r="40" fill="#fbc2eb22" />
                </svg>
              </div>
              {/* Texte */}
              <div className="flex-1 flex flex-col items-start justify-center z-10">
                <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold text-base tracking-widest mb-2 animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
                  <span className="mr-2">🚀</span>
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('home.cta.badge')}</span>
                </span>
                <h2 className="text-lg md:text-xl font-extrabold mb-1 text-zinc-900 dark:text-white leading-snug">
                  {t('home.cta.title')}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base font-normal mb-4 max-w-xl leading-snug">
                  {t('home.cta.desc')}
                </p>
                <a href="/contact" className="btn-main btn-main--dark group mt-1">
                  <span>{t('home.cta.button')}</span>
                  <span className="arrow group-hover:translate-x-1 transition-transform ml-2">→</span>
                </a>
              </div>
              {/* Illustration compacte à droite */}
              <div className="flex-1 flex justify-center items-center z-10">
                <img src="/images/04.png" alt={t('home.cta.img_alt')} className="w-[120px] h-[80px] sm:w-[160px] sm:h-[110px] md:w-[180px] md:h-[120px] lg:w-[200px] lg:h-[140px] xl:w-[220px] xl:h-[160px] object-contain" />
              </div>
            </div>
          </section>
          <SectionReveal delay={0.45}><Contact /></SectionReveal>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'fr', ['common'])),
    },
  };
} 