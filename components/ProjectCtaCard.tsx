import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  hover: { scale: 1.018, boxShadow: '0 8px 48px 0 #a78bfa33, 0 1.5px 8px 0 #fbc2eb33' },
};

const textVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.15 } },
};

const imageVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, delay: 0.25 } },
  animate: { y: [0, -10, 0, 10, 0], transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' } },
};

const buttonVariants = {
  rest: { scale: 1, boxShadow: '0 4px 24px 0 #a78bfa22' },
  hover: { scale: 1.07, x: 6, boxShadow: '0 8px 32px 0 #a78bfa55, 0 1.5px 8px 0 #fbc2eb33' },
};

const ProjectCtaCard = () => {
  const { t } = useTranslation('common');
  return (
    <section className="w-full flex justify-center items-center py-8 md:py-10 bg-zinc-50 dark:bg-zinc-900 relative overflow-hidden">
      {/* Pattern SVG discret en fond */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 1800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#e0e7ef" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
          <circle cx="1550" cy="80" r="90" fill="#a78bfa22" />
          <circle cx="120" cy="320" r="70" fill="#fbc2eb22" />
        </svg>
      </div>
      <motion.div
        className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-lg flex flex-col md:flex-row items-center px-2 sm:px-6 md:px-8 py-6 md:py-8 gap-0 md:gap-10 overflow-visible min-h-[180px] md:min-h-[180px] z-10 border border-zinc-100 dark:border-zinc-800"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Texte à gauche */}
        <motion.div
          className="flex-1 flex flex-col items-start justify-center z-10 max-w-xl w-full"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 rounded-lg font-bold text-xs tracking-widest mb-2 uppercase text-indigo-600 dark:text-indigo-300" style={{letterSpacing: '0.09em'}}>
            <span className="text-lg">🚀</span>
            {t('home.cta.badge')}
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
        </motion.div>
        {/* Illustration à droite */}
        <motion.div
          className="flex-1 flex justify-center items-center z-10"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          animate="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src="/images/04.png"
            alt={t('home.cta.img_alt')}
            width={220}
            height={160}
            className="object-contain w-[120px] h-[80px] sm:w-[160px] sm:h-[110px] md:w-[180px] md:h-[120px] lg:w-[200px] lg:h-[140px] xl:w-[220px] xl:h-[160px]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectCtaCard; 