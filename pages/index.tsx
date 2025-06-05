import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhatToExpect from '../components/WhatToExpect';
import Process from '../components/Process';
import SEOProcess from '../components/SEOProcess';
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
import LogoCarousel from '../components/LogoCarousel';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticPropsContext } from 'next';

export default function Home() {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Head>
        <title>{t('home.seo.title') === 'home.seo.title' ? 'Conecio - Agence de Marketing Digital & Innovation' : t('home.seo.title')}</title>
        <meta name="description" content={t('home.seo.description')} />
        <meta name="keywords" content={t('home.seo.keywords')} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://www.conecio.com" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('home.seo.title')} />
        <meta property="og:description" content={t('home.seo.description')} />
        <meta property="og:image" content="https://www.conecio.com/images/logo/conecio_logo.png" />
        <meta property="og:image:alt" content={t('home.seo.og_image_alt')} />
        <meta property="og:url" content="https://www.conecio.com" />
        <meta property="og:site_name" content="Conecio" />
        <meta property="og:locale" content={i18n.language === 'fr' ? 'fr_FR' : i18n.language === 'en' ? 'en_US' : i18n.language === 'es' ? 'es_ES' : 'ar_AR'} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('home.seo.title')} />
        <meta name="twitter:description" content={t('home.seo.description')} />
        <meta name="twitter:image" content="https://www.conecio.com/images/logo/conecio_logo.png" />
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
            "logo": "https://www.conecio.com/images/logo/conecio_logo.png",
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
          <BrandIconsCarousel />
          <SectionReveal delay={0.05}><Services /></SectionReveal>
          <SectionReveal delay={0.1}><OurAgency /></SectionReveal>
          <SectionReveal delay={0.15}><WhatToExpect /></SectionReveal>
          <SectionReveal delay={0.2}><Process /></SectionReveal>
          <SectionReveal delay={0.25}><SEOProcess /></SectionReveal>
          <SectionReveal delay={0.3}><Testimonials /></SectionReveal>
          <SectionReveal delay={0.35}><HomeBlogSection /></SectionReveal>
          <SectionReveal delay={0.4}><Contact /></SectionReveal>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 