import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhatToExpect from '../components/WhatToExpect';
import Process from '../components/Process';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HomeBlogSection from '../components/HomeBlogSection';
import DevisPopup from '../components/DevisPopup';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { motion } from 'framer-motion';
import { H1, H2, H3, Body1, Body2, Overline, Button } from '../components/Typography';
import { AnimatedPremiumTitle } from '../components/AnimatedPremiumTitle';

export default function Home() {
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
        <title>Conecio - Agence de Marketing Digital & Innovation</title>
        <meta name="description" content="Conecio est une agence de marketing digital innovante qui vous accompagne dans votre transformation digitale avec des solutions sur mesure : SEO, web design, social media, content marketing et plus encore." />
        <meta name="keywords" content="agence marketing digital, SEO, web design, social media, content marketing, transformation digitale, innovation digitale, stratégie digitale" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://www.conecio.com" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Conecio - Agence de Marketing Digital & Innovation" />
        <meta property="og:description" content="Conecio est une agence de marketing digital innovante qui vous accompagne dans votre transformation digitale avec des solutions sur mesure : SEO, web design, social media, content marketing et plus encore." />
        <meta property="og:image" content="https://www.conecio.com/images/og-image.jpg" />
        <meta property="og:image:alt" content="Conecio - Agence de Marketing Digital" />
        <meta property="og:url" content="https://www.conecio.com" />
        <meta property="og:site_name" content="Conecio" />
        <meta property="og:locale" content="fr_FR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Conecio - Agence de Marketing Digital & Innovation" />
        <meta name="twitter:description" content="Conecio est une agence de marketing digital innovante qui vous accompagne dans votre transformation digitale avec des solutions sur mesure : SEO, web design, social media, content marketing et plus encore." />
        <meta name="twitter:image" content="https://www.conecio.com/images/og-image.jpg" />
        <meta name="twitter:site" content="@conecio" />
        <meta name="twitter:creator" content="@conecio" />
        
        {/* Autres meta tags */}
        <meta name="author" content="Conecio" />
        <meta name="language" content="fr" />
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
            "description": "Agence de marketing digital innovante spécialisée dans la transformation digitale",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR"
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
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-800">
        <Navbar />
        <main>
          <Hero />
          <section aria-label="Nos Services" itemScope itemType="https://schema.org/Service">
            <Services />
          </section>
          <section aria-label="À quoi s'attendre" itemScope itemType="https://schema.org/ItemList">
            <WhatToExpect />
          </section>
          <section aria-label="Notre Processus" itemScope itemType="https://schema.org/ItemList">
            <Process />
          </section>
          {/* <section id="portfolio" aria-label="Notre Portfolio" itemScope itemType="https://schema.org/ItemList">
            <Portfolio />
          </section> */}
          <section id="testimonials" aria-label="Témoignages" itemScope itemType="https://schema.org/ItemList">
            <Testimonials />
          </section>
          <section aria-label="Derniers Articles" itemScope itemType="https://schema.org/Blog">
            <HomeBlogSection />
          </section>
          <section className="py-16">
            <div className="max-w-5xl mx-auto bg-gray-100 dark:bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-8 px-8 py-12 border border-gray-200 dark:border-gray-300 transition-colors">
              {/* Texte */}
              <div className="flex-1 flex flex-col items-start justify-center mb-8 md:mb-0">
                <div className="flex justify-center mb-4">
                  <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold subtitle tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">PROJET</span>
                  </span>
                </div>
                <div className="w-full text-center mb-10">
                  <AnimatedTitle className="heading heading-lg font-bold mb-2 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent w-full">
                    Démarrer un projet&nbsp;?
                  </AnimatedTitle>
                  <span className="block h-1 mt-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"></span>
                  <p className="text-lg text-gray-400 mt-4">
                    Confiez votre ambition à une équipe d'experts passionnés&nbsp;: stratégie, créativité et performance pour propulser votre marque au sommet.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                  <a href="/contact" className="btn-main bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>Démarrer un projet</span>
                    <span className="arrow ml-2">→</span>
                  </a>
                </div>
              </div>
              {/* Illustration */}
              <div className="flex-1 flex justify-center items-center">
                <img src="/images/04.png" alt="Démarrer un projet" className="max-w-xs md:max-w-md w-full h-auto" />
              </div>
            </div>
          </section>
          <section aria-label="Contact" itemScope itemType="https://schema.org/ContactPoint">
            <Contact />
          </section>
        </main>
      </div>
    </>
  );
} 