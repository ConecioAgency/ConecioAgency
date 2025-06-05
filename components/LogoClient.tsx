import Image from 'next/image';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const logos = [
  { src: '/images/clients/logo1.webp', alt: 'Logo client 1' },
  { src: '/images/clients/logo2.webp', alt: 'Logo client 2' },
  { src: '/images/clients/logo3.webp', alt: 'Logo client 3' },
  { src: '/images/clients/logo4.webp', alt: 'Logo client 4' },
  { src: '/images/clients/logo5.webp', alt: 'Logo client 5' },
];

const LogoClient = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % logos.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + logos.length) % logos.length);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden">
        <div className="flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative w-48 h-24"
            >
              <Image
                src={logos[currentIndex].src}
                alt={logos[currentIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {isHovered && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              aria-label="Logo précédent"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              aria-label="Logo suivant"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {logos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            aria-label={`Aller au logo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LogoClient; 