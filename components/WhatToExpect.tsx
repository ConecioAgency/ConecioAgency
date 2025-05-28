import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from './SectionTitle';
import { AnimatedTitle } from './AnimatedTitle';

const counters = [
  {
    icon: '/images/icons/award.png',
    value: 5,
    suffix: '+',
    label: "Années d'expérience",
    desc: "Une expertise solide dans le digital et l'innovation.",
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
  },
  {
    icon: '/images/icons/fedback.png',
    value: 100,
    suffix: '%',
    label: 'Clients satisfaits',
    desc: 'Notre priorité : la satisfaction et la réussite de nos clients.',
    gradient: 'from-green-400 via-teal-400 to-blue-500',
  },
  {
    icon: '/images/icons/viral.png',
    value: 10,
    suffix: '+',
    label: 'Projets réalisés',
    desc: 'Des solutions sur-mesure pour chaque client.',
    gradient: 'from-pink-500 via-red-400 to-yellow-400',
  },
  {
    icon: '/images/icons/community.png',
    value: 5,
    suffix: '',
    label: 'Experts à votre service',
    desc: 'Une équipe passionnée et pluridisciplinaire.',
    gradient: 'from-blue-500 via-cyan-400 to-green-400',
  },
];

const Counter = ({ value, suffix, gradient }: { value: number; suffix: string; gradient: string }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let interval: NodeJS.Timeout;
    let start = 0;
    const duration = 2000; // 2 secondes
    const steps = 50;
    const increment = value / steps;
    let currentStep = 0;
    interval = setInterval(() => {
      currentStep++;
      start += increment;
      if (currentStep < steps) {
        setDisplay(Math.round(start));
      } else {
        setDisplay(value);
        clearInterval(interval);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [value, isInView]);

  return (
    <span
      ref={ref}
      className={`text-5xl md:text-6xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent drop-shadow-lg select-none`}
      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
    >
      {display}
      <span className="ml-1 text-4xl align-top font-bold">{suffix}</span>
    </span>
  );
};

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, delay, type: 'spring', stiffness: 80 },
  }),
};

const WhatToExpect = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-4">
          <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold subtitle tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">POURQUOI NOUS</span>
          </span>
        </div>
        <div className="flex flex-col items-center w-full">
          <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent w-full">
            Pourquoi nous ?
          </AnimatedTitle>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="body text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-16 text-center"
        >
          Nous accompagnons nos clients dans leur transformation digitale avec passion, expertise et créativité.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {counters.map((item, idx) => (
            <motion.div
              key={item.label}
              className="flex flex-col items-center text-center backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-10 shadow-2xl border border-gray-100 dark:border-gray-800 relative group transition-all duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.2 + idx * 0.15}
              whileHover={{
                y: -16,
                scale: 1.07,
                boxShadow: '0 8px 40px 0 #a5b4fc55, 0 0 0 12px #f472b655',
                borderColor: '#a5b4fc',
                transition: { duration: 0.5, type: 'spring' }
              }}
              animate={{
                y: [0, -10, 0, 10, 0],
                transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              {/* Halo animé autour de la carte */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none z-0"
                animate={{
                  opacity: [0.18, 0.32, 0.18],
                  scale: [1, 1.08, 1],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${item.gradient.includes('pink') ? '#f472b6' : '#6366f1'}33 0%, transparent 80%)`,
                  filter: 'blur(16px)',
                }}
              />
              {/* Halo autour de l'icône + étoiles animées */}
              <div className="mb-6 z-10 relative flex items-center justify-center">
                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-40 z-0 bg-gradient-to-br ${item.gradient}`}></div>
                {/* Étoiles animées */}
                <motion.span
                  className="absolute left-2 top-2 text-yellow-400 text-xs"
                  animate={{ y: [0, -6, 0], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2, ease: 'easeInOut' }}
                >★</motion.span>
                <motion.span
                  className="absolute right-3 top-4 text-pink-400 text-[10px]"
                  animate={{ y: [0, 5, 0], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.7, ease: 'easeInOut' }}
                >★</motion.span>
                <motion.span
                  className="absolute left-8 bottom-2 text-blue-400 text-[8px]"
                  animate={{ y: [0, -4, 0], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: 1.1, ease: 'easeInOut' }}
                >★</motion.span>
                <Image src={item.icon} alt={item.label} width={64} height={64} className="drop-shadow-xl relative z-10" />
              </div>
              <div className="flex items-end justify-center mb-3 z-10">
                <Counter value={item.value} suffix={item.suffix} gradient={item.gradient} />
              </div>
              <span className="block text-lg md:text-xl font-bold heading text-gray-900 dark:text-white mb-2 z-10">{item.label}</span>
              <p className="body text-gray-500 dark:text-gray-300 text-base z-10">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect; 