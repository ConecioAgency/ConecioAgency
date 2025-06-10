import { Suspense, lazy } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticPropsContext } from 'next';

// Composants critiques chargés immédiatement
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhatsAppButton from '../components/WhatsAppButton';

// Lazy loading des composants non critiques avec préchargement
const Services = lazy(() => import('../components/Services'));
const WhatToExpect = lazy(() => import('../components/WhatToExpect'));
const Process = lazy(() => import('../components/Process'));
const SEOProcess = lazy(() => import('../components/SEOProcess'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Contact = lazy(() => import('../components/Contact'));
const HomeBlogSection = lazy(() => import('../components/HomeBlogSection'));
const OurAgency = lazy(() => import('../components/OurAgency'));
const BrandIconsCarousel = lazy(() => import('src/components/BrandIconsCarousel'));

// Composant de chargement optimisé
const LoadingFallback = () => (
  <div className="h-96 flex items-center justify-center">
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-32 h-32"></div>
  </div>
);

export default function Home() {
  const { t, i18n } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('home.seo.title') === 'home.seo.title' ? 'Conecio - Agence de Marketing Digital & Innovation' : t('home.seo.title')}</title>
        <meta name="description" content={t('home.seo.description')} />
        <meta name="keywords" content={t('home.seo.keywords')} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://www.conecio.com" />
        
        {/* Preload des ressources critiques */}
        <link rel="preload" href="/images/logo/conecio_logo.png" as="image" />
        <link rel="preload" href="/images/hero_landing.webp" as="image" />
        
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
              "addressCountry": (i18n.language || 'fr').toUpperCase()
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
        
        <link rel="icon" type="image/svg+xml" href="/images/logo/logo conecio SVG/SVG/logo horizantal gradient.svg" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-800">
        <Navbar />
        <main>
          <Suspense fallback={<LoadingFallback />}>
            <Hero />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <BrandIconsCarousel />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Services />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <OurAgency />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <WhatToExpect />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Process />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <SEOProcess />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Testimonials />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <HomeBlogSection />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        </main>
      </div>
      <WhatsAppButton />
    </>
  );
}

export async function getStaticProps({ locale = 'fr' }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 