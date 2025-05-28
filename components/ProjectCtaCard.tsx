import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
  return (
    <section className="w-full flex justify-center items-center py-10 md:py-16 bg-transparent">
      <motion.div
        className="relative w-full max-w-[98vw] xl:max-w-[1500px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center px-3 sm:px-8 md:px-16 py-8 md:py-12 gap-0 md:gap-20 overflow-visible min-h-[320px] md:min-h-[320px] lg:min-h-[280px]"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Texte à gauche */}
        <motion.div
          className="flex-1 flex flex-col items-start justify-center z-10 max-w-2xl w-full"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="inline-block bg-blue-50 px-4 py-1 rounded-xl font-bold text-xs tracking-widest mb-2 uppercase" style={{letterSpacing: '0.09em'}}>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">NOUVEAU PROJET ?</span>
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-relaxed text-balance">
            Prêt à concrétiser<br className="hidden md:block" /> votre projet&nbsp;digital&nbsp;?
          </h2>
          <p className="text-gray-700 dark:text-gray-200 text-base md:text-lg font-medium mb-7 max-w-xl text-balance leading-relaxed">
            Discutons ensemble de vos idées et donnons vie à une solution sur-mesure, performante et créative.
          </p>
          <Link href="/contact" className="btn-premium mt-2 md:mt-0">
            Contactez-nous
            <span className="ml-3">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 12h14"></path>
                <path d="M13 6l6 6-6 6"></path>
              </svg>
            </span>
          </Link>
        </motion.div>
        {/* Illustration à droite */}
        <motion.div
          className="flex-1 flex items-end justify-center md:justify-end mt-8 md:mt-0 md:ml-0 z-10 relative"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          animate="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative w-[220px] h-[140px] sm:w-[300px] sm:h-[200px] md:w-[370px] md:h-[240px] lg:w-[420px] lg:h-[270px] xl:w-[480px] xl:h-[320px] md:-mr-10 lg:-mr-16 xl:-mr-24">
            <Image
              src="/images/project-need-dee85a1f.png"
              alt="Démarrer un projet"
              fill
              style={{ objectFit: 'contain' }}
              priority={true}
            />
          </div>
        </motion.div>
        {/* Effet décoratif */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full">
            <circle cx="1550" cy="80" r="120" fill="#a78bfa22" />
            <circle cx="120" cy="320" r="100" fill="#fbc2eb22" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectCtaCard; 