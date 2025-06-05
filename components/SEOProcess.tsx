import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const seoSteps = [
  {
    titleKey: 'seo_process.seo.title',
    descriptionKey: 'seo_process.seo.description',
    detailsKey: 'seo_process.seo.details',
    image: '/images/character/SEO.svg',
  },
  {
    titleKey: 'seo_process.sea.title',
    descriptionKey: 'seo_process.sea.description',
    detailsKey: 'seo_process.sea.details',
    image: '/images/character/SEA.svg',
  },
  {
    titleKey: 'seo_process.smo.title',
    descriptionKey: 'seo_process.smo.description',
    detailsKey: 'seo_process.smo.details',
    image: '/images/character/SMO.svg',
  }
];

export default function SEOProcess() {
  const [selected, setSelected] = useState(0);
  const { t } = useTranslation('common');

  const getDetails = (key: string): string[] => {
    const details = t(key, { returnObjects: true });
    return Array.isArray(details) ? details.filter((d): d is string => typeof d === 'string') : [];
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-800 relative overflow-hidden py-2 mb-0 mt-0 px-2 md:px-8">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Colonne image à gauche */}
        <div className="flex-1 flex items-center justify-center py-8 px-2 md:px-8 order-1 md:order-none">
          <div className="relative w-full max-w-lg min-h-[420px]">
            {/* Glow effet */}
            <div className="absolute inset-0 rounded-[2.5rem] blur-2xl pointer-events-none" style={{boxShadow: '0 0 40px 8px #a855f755, 0 0 24px 4px #38bdf855'}} />
            <div className="relative bg-[#23232b] rounded-[2.5rem] p-8 shadow-2xl w-full min-h-[420px] flex items-center justify-center">
              <img
                src={seoSteps[selected].image}
                alt={t(seoSteps[selected].titleKey)}
                className="w-full h-full max-h-[340px] object-contain drop-shadow-2xl animate-zoom-in"
                style={{ transition: 'transform 0.5s cubic-bezier(.4,2,.6,1)', transform: 'scale(1.08)' }}
              />
            </div>
          </div>
        </div>
        {/* Colonne texte à droite */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center px-2 md:px-8 order-2 md:order-none">
          <div className="w-full max-w-xl">
            {/* Badge, titre, TextPressure, description */}
            <span className="inline-block mb-4 px-6 py-1 rounded-xl font-bold tracking-widest bg-blue-50 text-base animate__animated animate__zoomInDown mx-auto md:mx-0" style={{letterSpacing: '0.08em'}}>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('seo_process.section_title')}</span>
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading mb-4 text-center md:text-left bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t('seo_process.section_subtitle')}
            </h2>
            <div style={{ width: '100%', maxWidth: 700, margin: '0 auto' }}>
              <h3
                className="text-3xl md:text-4xl font-extrabold text-center md:text-left mb-4 bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg"
              >
                SEM = SEO + SEA + SMO
              </h3>
              <svg width="0" height="0">
                <linearGradient id="sem-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop stopColor="#6366F1" />
                  <stop offset="50%" stopColor="#a21caf" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </svg>
            </div>
            <p className="text-gray-700 dark:text-gray-200 text-lg max-w-xl text-center md:text-left mx-auto md:mx-0">
              {t('seo_process.section_desc')}
            </p>
            {/* Accordéon */}
            <div className="w-full max-w-xl divide-y divide-gray-200 dark:divide-gray-700 border-t border-b border-gray-200 dark:border-gray-700 bg-transparent mt-6">
              {seoSteps.map((step, idx) => {
                const isOpen = selected === idx;
                return (
                  <div key={step.titleKey} className="py-1">
                    <button
                      onClick={() => setSelected(idx)}
                      className={`w-full flex flex-col items-start text-left transition-colors group focus:outline-none py-3 px-2 md:px-4 ${isOpen ? 'bg-gray-100 dark:bg-[#23232b]' : 'hover:bg-gray-100/60 dark:hover:bg-[#23232b]/60'}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-base md:text-lg font-semibold ${isOpen ? 'text-indigo-500' : 'text-gray-900 dark:text-white'}`}>{t(step.titleKey)}</span>
                        <span className={`ml-4 text-xl font-bold transition-transform duration-300 ${isOpen ? 'rotate-45 text-indigo-500' : 'text-gray-400 dark:text-gray-400 group-hover:text-indigo-500'}`}>+</span>
                      </div>
                      {isOpen && (
                        <div className="w-full animate-fade-in-up text-gray-700 dark:text-gray-200 text-sm mt-2 mb-1 leading-snug">
                          <div className="mb-2 font-medium">{t(step.descriptionKey)}</div>
                          <ul className="list-none pl-0">
                            {getDetails(step.detailsKey).map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-200 mb-1">
                                <span className="text-indigo-500 text-xl font-bold mt-1">+</span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(.4,2,.6,1); }
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1.08); }
        }
        .animate-zoom-in { animation: zoom-in 0.7s cubic-bezier(.4,2,.6,1); }
      `}</style>
    </section>
  );
} 