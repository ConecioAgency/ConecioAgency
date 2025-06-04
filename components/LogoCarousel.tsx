import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const logos = [
  '/images/logo/SVG_Logo/Fichier 2.svg',
  '/images/logo/SVG_Logo/Fichier 3.svg',
  '/images/logo/SVG_Logo/Fichier 4.svg',
  '/images/logo/SVG_Logo/Fichier 5.svg',
  '/images/logo/SVG_Logo/Fichier 6.svg',
  '/images/logo/SVG_Logo/Fichier 7.svg',
  '/images/logo/SVG_Logo/Fichier 8.svg',
  '/images/logo/SVG_Logo/Fichier 9.svg',
  '/images/logo/SVG_Logo/Fichier 10.svg',
  '/images/logo/SVG_Logo/Fichier 11.svg',
  '/images/logo/SVG_Logo/Fichier 12.svg',
  '/images/logo/SVG_Logo/Fichier 13.svg',
  '/images/logo/SVG_Logo/Fichier 14.svg',
  '/images/logo/SVG_Logo/Fichier 15.svg',
  '/images/logo/SVG_Logo/Fichier 16.svg',
];

const LogoCarousel = () => {
  const { t } = useTranslation('common');

  return (
    <section className="py-8 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold font-heading mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            {t('clients.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="body text-gray-700 text-base md:text-lg text-center dark:text-gray-300 max-w-2xl mx-auto"
          >
            {t('clients.description')}
          </motion.p>
        </motion.div>
        
        <div className="relative w-full overflow-hidden">
          {/* Gradient overlay à gauche */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white dark:from-gray-800 to-transparent" />
          
          {/* Gradient overlay à droite */}
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white dark:from-gray-800 to-transparent" />
          
          <div className="flex animate-scroll">
            {/* Premier groupe de logos */}
            <div className="flex space-x-24 items-center">
              {logos.map((logo, index) => (
                <motion.div
                  key={`first-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 w-32 h-16 relative"
                >
                  <div className="relative w-full h-full p-4">
                    <Image
                      src={logo}
                      alt={t('clients.logoAlt', { number: index + 1 })}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Deuxième groupe de logos (copie pour l'effet infini) */}
            <div className="flex space-x-24 items-center">
              {logos.map((logo, index) => (
                <motion.div
                  key={`second-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 w-32 h-16 relative"
                >
                  <div className="relative w-full h-full p-4">
                    <Image
                      src={logo}
                      alt={t('clients.logoAlt', { number: index + 1 })}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default LogoCarousel; 