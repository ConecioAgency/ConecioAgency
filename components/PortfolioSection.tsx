import React from 'react';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const portfolioSites = [
  {
    title: 'Aroua Chahid',
    subtitle: 'Portfolio de motion designer',
    category: 'Portfolio',
    image: '/images/web/1.jpg',
    link: 'https://arouachahid.vercel.app/',
    size: 'large',
  },
  {
    title: 'Karyla',
    subtitle: 'Site E-commerce de bijoux',
    category: 'E-commerce',
    image: '/images/web/2.png',
    link: 'https://karyla.vercel.app/',
    size: 'wide',
  },
  {
    title: 'Sotorec',
    subtitle: 'Site pour cabinet de comptabilité',
    category: 'Comptabilité',
    image: '/images/web/4.png',
    link: 'https://sotorec.com/',
    size: 'normal',
  },
  {
    title: 'Designer',
    subtitle: "Portfolio d'un designer",
    category: 'Portfolio',
    image: '/images/web/6.png',
    link: 'https://ankouss-youssef.vercel.app/',
    size: 'normal',
  },
];

const getGridClasses = (size: 'normal' | 'large' | 'wide') => {
  switch (size) {
    case 'large':
      return 'md:row-span-2';
    case 'wide':
      return 'md:col-span-2';
    default:
      return '';
  }
};

const PortfolioSection = () => {
  const { t } = useTranslation('common');
  return (
    <section id="portfolio" className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex flex-col items-center mb-4">
            <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold text-base tracking-widest" style={{ letterSpacing: '0.08em' }}>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {t('portfolio.badge', 'PORTFOLIO')}
              </span>
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {t('portfolio.title', 'Exemples de Réalisations')}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('portfolio.subtitle', "Découvrez quelques sites web créés par l'agence. Cliquez sur un projet pour voir la démo en direct !")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[220px] md:auto-rows-[200px] gap-5 md:gap-8 grid-flow-dense">
          {portfolioSites.map((site, idx) => (
            <a
              key={idx}
              href={site.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative group rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-gray-900 transition-all duration-300 flex flex-col ${getGridClasses(site.size as 'normal' | 'large' | 'wide')}`}
            >
              {/* Overlay de survol */}
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-pink-400/20 via-violet-400/20 to-gray-400/20 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform scale-105 group-hover:scale-100">
                <FaEye className="text-white text-5xl transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out delay-100" />
              </div>

              {/* Contenu original de la carte */}
              <span className={`absolute top-4 left-4 z-20 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-md bg-gray-700 text-white tracking-wide group-hover:opacity-0 transition-opacity duration-300`}>
                {site.category}
              </span>
              <div className="relative w-full h-full flex-1 aspect-[16/10] md:aspect-[4/3]">
                <Image
                  src={site.image}
                  alt={site.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 z-20 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-base md:text-lg font-extrabold mb-1 text-white flex items-center gap-2 truncate">
                  {site.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm font-semibold text-white/80">{site.category}</span>
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                    <FiArrowUpRight className="text-white" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection; 