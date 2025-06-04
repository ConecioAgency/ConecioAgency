import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '../lib/utils';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { FaAward, FaUsers, FaRocket, FaUserTie } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

const Counter = ({ value, duration = 1200, suffix = '' }: { value: string, duration?: number, suffix?: string }) => {
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isNumber = !isNaN(Number(value.replace(/\D/g, '')));

  useEffect(() => {
    if (!isInView) return;
    if (!isNumber) {
      setDisplay(value);
      return;
    }
    let start = 0;
    const end = parseInt(value.replace(/\D/g, ''));
    const increment = Math.ceil(end / 40);
    let current = 0;
    const step = Math.max(20, duration / (end / increment));
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(current + suffix);
      }
    }, step);
    return () => clearInterval(timer);
  }, [value, duration, suffix, isNumber, isInView]);

  return <span ref={ref}>{display}</span>;
};

export const WhatToExpect = () => {
  const { t, i18n } = useTranslation('common');
  const [activeIndex, setActiveIndex] = useState(0);

  const isArabic = i18n.language === 'ar';
  const getToolKey = (suffix: string) => isArabic ? `tools.${suffix}` : `expect.tools.${suffix}`;

  // Génère dynamiquement les catégories et outils à chaque changement de langue
  const categories = useMemo(() => [
    { id: 'content', label: t(getToolKey('content.label')) },
    { id: 'ai', label: t(getToolKey('ai.label')) },
    { id: 'social', label: t(getToolKey('social.label')) },
    { id: 'advertising', label: t(getToolKey('advertising.label')) },
    { id: 'traffic', label: t(getToolKey('traffic.label')) },
    { id: 'seo', label: t(getToolKey('seo.label')) },
    { id: 'creation', label: t(getToolKey('creation.label')) },
  ], [t, i18n.language]);

  const swiperRef = useRef<any>(null);

  const stats = [
    { value: '5+', label: t('expect.stats_1'), icon: <FaAward className="w-5 h-5" /> },
    { value: '100%', label: t('expect.stats_2'), icon: <FaUsers className="w-5 h-5" /> },
    { value: '10+', label: t('expect.stats_3'), icon: <FaRocket className="w-5 h-5" /> },
    { value: '5', label: t('expect.stats_4'), icon: <FaUserTie className="w-5 h-5" /> },
  ];

  const features = [
    {
      title: "Expertise Technique",
      description: "Une équipe d'experts qualifiés à votre service.",
      image: "/images/character/astro1.webp",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Innovation Continue",
      description: "Des solutions toujours à la pointe de la technologie.",
      image: "/images/character/astro2.webp",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Support Dédié",
      description: "Un accompagnement personnalisé à chaque étape.",
      image: "/images/character/astro3.webp",
      gradient: "from-pink-500 to-orange-500"
    },
    {
      title: "Résultats Garantis",
      description: "Des performances mesurables et des résultats concrets.",
      image: "/images/character/astro2.webp",
      gradient: "from-orange-500 to-yellow-500"
    }
  ];

  const tools = useMemo(() => [
    {
      id: 'content',
      title: t(getToolKey('content.title')),
      items: [
        t(getToolKey('content.items.0')),
        t(getToolKey('content.items.1')),
        t(getToolKey('content.items.2')),
      ],
      icon: '/images/icons/carouselle/blogging.png',
      illustration: '/images/illustrations/content.png',
      buttonText: t(getToolKey('content.button')),
      color: 'bg-indigo-100 text-indigo-600',
      buttonColor: 'bg-indigo-500',
      description: t(getToolKey('content.description'))
    },
    {
      id: 'ai',
      title: t(getToolKey('ai.title')),
      items: [
        t(getToolKey('ai.items.0')),
        t(getToolKey('ai.items.1')),
        t(getToolKey('ai.items.2')),
      ],
      icon: '/images/icons/carouselle/intelligence.png',
      illustration: '/images/illustrations/ai.png',
      buttonText: t(getToolKey('ai.button')),
      color: 'bg-purple-100 text-purple-600',
      buttonColor: 'bg-purple-500',
      description: t(getToolKey('ai.description'))
    },
    {
      id: 'social',
      title: t(getToolKey('social.title')),
      items: [
        t(getToolKey('social.items.0')),
        t(getToolKey('social.items.1')),
        t(getToolKey('social.items.2')),
      ],
      icon: '/images/icons/carouselle/digital-marketing.png',
      illustration: '/images/illustrations/social.png',
      buttonText: t(getToolKey('social.button')),
      color: 'bg-pink-100 text-pink-600',
      buttonColor: 'bg-pink-500',
      description: t(getToolKey('social.description'))
    },
    {
      id: 'advertising',
      title: t(getToolKey('advertising.title')),
      items: [
        t(getToolKey('advertising.items.0')),
        t(getToolKey('advertising.items.1')),
        t(getToolKey('advertising.items.2')),
      ],
      icon: '/images/icons/carouselle/shopping-online.png',
      illustration: '/images/illustrations/ads.png',
      buttonText: t(getToolKey('advertising.button')),
      color: 'bg-blue-100 text-blue-600',
      buttonColor: 'bg-blue-500',
      description: t(getToolKey('advertising.description'))
    },
    {
      id: 'traffic',
      title: t(getToolKey('traffic.title')),
      items: [
        t(getToolKey('traffic.items.0')),
        t(getToolKey('traffic.items.1')),
        t(getToolKey('traffic.items.2')),
      ],
      icon: '/images/icons/carouselle/internet-of-things.png',
      illustration: '/images/illustrations/traffic.png',
      buttonText: t(getToolKey('traffic.button')),
      color: 'bg-cyan-100 text-cyan-600',
      buttonColor: 'bg-cyan-500',
      description: t(getToolKey('traffic.description'))
    },
    {
      id: 'seo',
      title: t(getToolKey('seo.title')),
      items: [
        t(getToolKey('seo.items.0')),
        t(getToolKey('seo.items.1')),
        t(getToolKey('seo.items.2')),
      ],
      icon: '/images/icons/carouselle/seo.png',
      illustration: '/images/illustrations/seo.png',
      buttonText: t(getToolKey('seo.button')),
      color: 'bg-teal-100 text-teal-600',
      buttonColor: 'bg-teal-500',
      description: t(getToolKey('seo.description'))
    },
    {
      id: 'creation',
      title: t(getToolKey('creation.title')),
      items: [
        t(getToolKey('creation.items.0')),
        t(getToolKey('creation.items.1')),
        t(getToolKey('creation.items.2')),
      ],
      icon: '/images/icons/carouselle/landing-page.png',
      illustration: '/images/illustrations/local.png',
      buttonText: t(getToolKey('creation.button')),
      color: 'bg-violet-100 text-violet-600',
      buttonColor: 'bg-violet-500',
      description: t(getToolKey('creation.description'))
    }
  ], [t, i18n.language]);

  const ToolCard = ({ tool }: { tool: typeof tools[0] }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsExpanded(entry.isIntersecting);
        },
        {
          threshold: 0.5,
          rootMargin: '-10% 0px'
        }
      );
      if (cardRef.current) observer.observe(cardRef.current);
      return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
    }, []);

    return (
      <div
        ref={cardRef}
        className={cn(
          'relative flex flex-col justify-between items-stretch bg-white rounded-[28px] shadow-xl transition-all duration-500 overflow-hidden',
          'h-[420px] w-full max-w-[370px] mx-auto',
          isExpanded ? 'scale-105 z-20' : 'scale-95 z-10'
        )}
      >
        <div className="flex items-start gap-3 px-6 pt-6 pb-2">
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', tool.color)}>
            <Image src={tool.icon} alt={tool.title} width={28} height={28} />
          </div>
          <h3 className="text-2xl font-bold ml-2 mt-1 text-zinc-900">{tool.title}</h3>
        </div>
        <ul className="px-8 pb-2 flex-1">
          {tool.items.map((item, i) => (
            <li key={i} className="flex items-start mb-2">
              <span className="mt-1 mr-2 text-lg text-zinc-400">•</span>
              <span className="text-base text-zinc-800">{item}</span>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-4 flex flex-col items-center">
          <div className="w-full flex justify-center mb-4">
            <Image src={tool.illustration} alt={tool.title + ' illustration'} width={260} height={90} className="object-contain rounded-xl shadow" />
          </div>
          <button className={cn('w-full py-3 rounded-xl text-white font-semibold text-base', tool.buttonColor)}>
            {tool.buttonText}
          </button>
        </div>
      </div>
    );
  };

  const FeatureCard = ({ title, description, image, gradient }: { title: string; description: string; image: string; gradient: string }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
          `bg-gradient-to-r ${gradient}`
        )} />
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-4">
            <div className={cn(
              "rounded-xl p-2",
              `bg-gradient-to-r ${gradient}`
            )}>
              <Image
                src={image}
                alt={title}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{title}</h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-24 relative bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block bg-blue-50 dark:bg-blue-900/40 px-4 py-1 rounded-full text-sm font-medium tracking-wider mb-3"
          >
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t('expect.tools_badge')}
            </span>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl font-bold text-center mb-4"
          >
            {t('expect.tools_title')}
          </motion.h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center max-w-2xl mx-auto mb-6">
            {t('expect.tools_subtitle')}
          </p>
          {/* Pills catégories */}
          <div className="flex gap-1 bg-gray-900/90 backdrop-blur-sm rounded-[20px] px-1 py-1 shadow-lg mx-auto mb-8 relative z-20 w-max border border-gray-700/30">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                className={`px-4 py-1.5 rounded-[16px] text-sm font-medium transition-all duration-300 font-sans relative ${activeIndex === i ? 'text-white' : 'text-gray-400 hover:text-white/90'}`}
                tabIndex={0}
                onClick={() => {
                  setActiveIndex(i);
                  swiperRef.current?.slideToLoop(i);
                }}
              >
                {activeIndex === i && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[16px] border border-indigo-500/30 backdrop-blur-sm" style={{ opacity: 1 }} />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          {/* Flèche gauche */}
          <button
            className={`absolute left-0 z-20 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full shadow p-2 transition-all ${activeIndex === 0 ? 'opacity-30 pointer-events-none' : 'hover:bg-indigo-100 dark:hover:bg-indigo-900'}`}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Précédent"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          {/* Swiper carousel avec effet coverflow */}
          <Swiper
            modules={[Navigation, EffectCoverflow]}
            effect="coverflow"
            centeredSlides
            slidesPerView="auto"
            loop
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 180, modifier: 1.8, slideShadows: false }}
            onSwiper={swiper => { swiperRef.current = swiper; }}
            onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
            className="w-full max-w-5xl px-0 md:px-12"
            navigation={false}
            allowTouchMove={false}
          >
            {tools.map((tool, i) => (
              <SwiperSlide key={tool.id} style={{ width: 370, maxWidth: 370 }}>
                {({ isActive }) => (
                  <div
                    className={`relative flex flex-col justify-between items-stretch bg-white rounded-[28px] shadow-xl transition-all duration-500 overflow-hidden h-[420px] mx-auto ${isActive ? 'scale-100 z-20 border-2 border-indigo-400' : 'scale-95 z-10 opacity-90'} `}
                  >
                    <div className="flex items-start gap-3 px-6 pt-6 pb-2">
                      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', tool.color)}>
                        <Image src={tool.icon} alt={tool.title} width={28} height={28} />
                      </div>
                      <h3 className="text-2xl font-bold ml-2 mt-1 text-zinc-900">{tool.title}</h3>
                    </div>
                    <ul className="px-8 pb-2 flex-1">
                      {tool.items.map((item, j) => (
                        <li key={j} className="flex items-start mb-2">
                          <span className={`mt-1 mr-2 text-lg transition-opacity duration-300 ${isActive ? 'opacity-100 text-green-500' : 'opacity-0'}`}>✓</span>
                          <span className="text-base text-zinc-800">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="px-6 pb-4 flex flex-col items-center">
                      <div className="w-full flex justify-center mb-4">
                        {/* Image illustration removed */}
                      </div>
                      {isActive && (
                        <a href="/pricing" className="btn-main group w-full flex items-center justify-center mt-2 btn-main--dark dark:btn-main--light">
                          <span>{tool.buttonText}</span>
                          <span className="arrow group-hover:translate-x-1 transition-transform ml-2">→</span>
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center px-4 mb-4 min-h-[48px]">{tool.description}</p>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Flèche droite */}
          <button
            className={`absolute right-0 z-20 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full shadow p-2 transition-all ${activeIndex === tools.length - 1 ? 'opacity-30 pointer-events-none' : 'hover:bg-indigo-100 dark:hover:bg-indigo-900'}`}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Suivant"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect; 