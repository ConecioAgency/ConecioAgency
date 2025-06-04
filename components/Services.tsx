import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Section from './Section';
import ScrollAnimation from './ScrollAnimation';
import { useTranslation } from 'next-i18next';

const slides = [
  {
    titleKey: 'services.slide_1_title',
    descriptionKey: 'services.slide_1_desc',
    image: '/images/PSD/mockup_paper_out_of_screen_website_copy.png',
  },
  {
    titleKey: 'services.slide_2_title',
    descriptionKey: 'services.slide_2_desc',
    video: '/videos/design.webm',
  },
  {
    titleKey: 'services.slide_3_title',
    descriptionKey: 'services.slide_3_desc',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
  },
  {
    titleKey: 'services.slide_4_title',
    descriptionKey: 'services.slide_4_desc',
    image: '',
  },
];

export default function Services() {
  const { t } = useTranslation('common');
  const [selected, setSelected] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 80, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <Section className="bg-transparent overflow-hidden">
        <div className="flex flex-col items-center">
          {/* Titre section */}
          <ScrollAnimation direction="up" delay={0.4}>
            <div className="flex flex-col items-center mb-12">
              <ScrollAnimation direction="up" delay={0.5}>
                <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold subtitle tracking-widest mb-4" style={{letterSpacing: '0.08em'}}>
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('services.section_title')}</span>
                </span>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={0.6}>
                <h2 className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent w-full">
                  {t('services.section_subtitle')}
                </h2>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={0.7}>
                <p className="text-gray-400 text-center max-w-xl mx-auto mt-4">
                  {t('services.section_desc')}
                </p>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>

          {/* Carrousel */}
          <ScrollAnimation direction="up" delay={0.8}>
            <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center mb-8 mt-0">
              {/* Box du carrousel avec animation d'entrée */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.4, 0, 0.2, 1],
                  delay: 1
                }}
                className="relative z-20 rounded-[2.5rem] w-full max-w-7xl aspect-[16/9] min-h-[450px] flex flex-col items-center justify-center px-8 overflow-hidden"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(106,51,255,0.18) 0%, rgba(56,125,255,0.12) 60%, transparent 100%)',
                  boxShadow: '0 0 60px 10px rgba(106,51,255,0.18), 0 0 0 1.5px rgba(56,125,255,0.10)'
                }}
              >
                {/* GitHub-like background gradients */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  <div className="absolute top-[-50%] left-[-10%] right-[-50%] bottom-[-50%] rotate-[30deg]"
                    style={{
                      background: 'radial-gradient(ellipse at bottom right, rgba(56,125,255,0.17) 0%, transparent 70%)'
                    }}
                  />
                  <div className="absolute top-[-50%] left-[-50%] right-[-20%] bottom-[-50%] rotate-[30deg]"
                    style={{
                      background: 'radial-gradient(ellipse at top left, rgba(106,51,255,0.25) 0%, transparent 70%)'
                    }}
                  />
                  {/* Dark mode overlay */}
                  <div className="absolute inset-0 hidden dark:block" style={{background: 'rgba(13,17,23,0.6)'}} />
                  {/* Light mode overlay */}
                  <div className="absolute inset-0 block dark:hidden" style={{background: 'rgba(255,255,255,0.5)'}} />
                </div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {slides.map((slide, i) => (
                      <motion.div
                        key={slide.titleKey}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ 
                          opacity: selected === i ? 1 : 0,
                          scale: selected === i ? 1 : 0.95,
                          zIndex: selected === i ? 10 : 0
                        }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`absolute inset-0 flex flex-col items-center justify-center ${
                          selected === i ? 'pointer-events-auto' : 'pointer-events-none'
                        }`}
                      >
                        {/* Afficher la vidéo si slide.video existe, sinon l'image, sinon la vidéo spéciale 'Gérer' */}
                        {slide.video ? (
                          <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden rounded-3xl bg-black">
                            <video
                              src={slide.video}
                              className="w-full h-full object-cover shadow-2xl bg-black"
                              loop
                              muted
                              autoPlay
                              playsInline
                            />
                            <motion.h3 
                              className="absolute bottom-8 left-8 text-3xl font-bold text-white"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              {t(slide.titleKey)}
                            </motion.h3>
                          </div>
                        ) : slide.titleKey === 'services.slide_4_title' ? (
                          <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden rounded-3xl bg-black">
                            <video
                              ref={videoRef}
                              src="/videos/Gerer-Service.mp4"
                              className="w-full h-full object-cover shadow-2xl bg-black"
                              loop
                              muted
                              autoPlay
                              playsInline
                              onPlay={() => setIsPlaying(true)}
                              onPause={() => setIsPlaying(false)}
                            />
                            <motion.button
                              onClick={handlePlayPause}
                              className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-700 transition"
                              style={{ zIndex: 20 }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              aria-label={isPlaying ? 'Pause' : 'Play'}
                            >
                              {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-300">
                                  <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                                  <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-indigo-600 dark:text-indigo-300">
                                  <polygon points="8,5 20,12 8,19" fill="currentColor" />
                                </svg>
                              )}
                            </motion.button>
                          </div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full"
                          >
                            <motion.img 
                              src={slide.image} 
                              alt={t(slide.titleKey)} 
                              className="w-full h-full object-cover rounded-3xl"
                              initial={{ scale: 1.1 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.8 }}
                            />
                            {slide.titleKey !== 'services.slide_1_title' && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-3xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                              />
                            )}
                            <motion.h3 
                              className="absolute bottom-8 left-8 text-3xl font-bold text-white"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              {t(slide.titleKey)}
                            </motion.h3>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </ScrollAnimation>

          {/* Menu toggle */}
          <ScrollAnimation direction="up" delay={1.1}>
            <div className="flex gap-1 bg-gray-900/90 backdrop-blur-sm rounded-[20px] px-1 py-1 shadow-lg mx-auto -mt-16 mb-8 relative z-20 w-max border border-gray-700/30">
              {slides.map((slide, i) => (
                <motion.button
                  key={slide.titleKey}
                  onClick={() => setSelected(i)}
                  className={`px-4 py-1.5 rounded-[16px] text-sm font-medium transition-all duration-300 font-sans relative ${
                    selected === i
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white/90'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selected === i && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[16px] border border-indigo-500/30 backdrop-blur-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{t(slide.titleKey)}</span>
                </motion.button>
              ))}
            </div>
          </ScrollAnimation>

          {/* Texte descriptif */}
          <ScrollAnimation direction="up" delay={1.2}>
            <div className="w-full flex justify-center z-30 bg-transparent">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-2xl text-center text-gray-700 dark:text-gray-200 text-base md:text-lg font-normal leading-relaxed bg-transparent"
                >
                  {selected === 0 && (
                    <motion.div 
                      className="space-y-6"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.2
                          }
                        }
                      }}
                    >
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        className="text-center"
                      >
                        <p className="text-gray-400 text-center max-w-xl mx-auto mt-4">
                          {t('services.tabs.create.desc')}
                        </p>
                        <motion.a
                          href="/services#web-design"
                          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors group font-medium mt-4"
                          whileHover={{ x: 5 }}
                        >
                          {t('services.tabs.create.cta')}
                          <motion.span
                            className="inline-block"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </motion.a>
                      </motion.div>
                    </motion.div>
                  )}
                  {selected === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <p className="text-gray-400 text-center max-w-xl mx-auto mt-4">
                        {t('services.tabs.design.desc')}
                      </p>
                      <motion.a
                        href="/services#design"
                        className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors group font-medium mt-4"
                        whileHover={{ x: 5 }}
                      >
                        {t('services.tabs.design.cta')}
                        <motion.span
                          className="inline-block"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.a>
                    </motion.div>
                  )}
                  {selected === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <p className="text-gray-400 text-center max-w-xl mx-auto mt-4">
                        {t('services.tabs.promote.desc')}
                      </p>
                      <motion.a
                        href="/services#marketing"
                        className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors group font-medium mt-4"
                        whileHover={{ x: 5 }}
                      >
                        {t('services.tabs.promote.cta')}
                        <motion.span
                          className="inline-block"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.a>
                    </motion.div>
                  )}
                  {selected === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <p className="text-gray-400 text-center max-w-xl mx-auto mt-4">
                        {t('services.tabs.manage.desc')}
                      </p>
                      <motion.a
                        href="/services#social"
                        className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors group font-medium mt-4"
                        whileHover={{ x: 5 }}
                      >
                        {t('services.tabs.manage.cta')}
                        <motion.span
                          className="inline-block"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.a>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollAnimation>
        </div>
      </Section>
    </motion.div>
  );
} 