import { motion } from 'framer-motion';
import { ChartBarIcon, LightBulbIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useRef, useEffect } from 'react';
import { FaCloud, FaChartBar, FaLightbulb, FaSearch, FaEnvelope, FaDesktop, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { AnimatedTitle } from './AnimatedTitle';
import GooeyButton from './GooeyButton';
import BrandIconsCarousel from 'src/components/BrandIconsCarousel';
import { useTranslation } from 'next-i18next';

// Nouvelle section : Pourquoi nous choisir (thème du site)
const marketingServices = [
  {
    title: "Stratégie Digitale",
    desc: "Nous élaborons des stratégies sur-mesure pour booster votre visibilité et votre ROI.",
    icon: <FaCloud className="w-6 h-6" />,
    color: "from-indigo-500 to-pink-500",
  },
  {
    title: "Réseaux Sociaux",
    desc: "Nous animons et développons vos communautés pour créer un engagement durable.",
    icon: <FaChartBar className="w-6 h-6" />,
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Création de Contenu",
    desc: "Des contenus créatifs et engageants pour attirer et fidéliser votre audience.",
    icon: <FaLightbulb className="w-6 h-6" />,
    color: "from-teal-400 to-teal-600",
  },
  {
    title: "SEO & SEA",
    desc: "Optimisez votre positionnement sur Google grâce à nos experts en référencement.",
    icon: <FaSearch className="w-6 h-6" />,
    color: "from-purple-400 to-purple-600",
  },
  {
    title: "Email Marketing",
    desc: "Des campagnes email ciblées et performantes pour convertir et fidéliser vos clients.",
    icon: <FaEnvelope className="w-6 h-6" />,
    color: "from-pink-400 to-pink-600",
  },
  {
    title: "Web Design",
    desc: "Création de sites web modernes, performants et adaptés à vos objectifs business.",
    icon: <FaDesktop className="w-6 h-6" />,
    color: "from-orange-400 to-orange-600",
  },
];

function PourquoiNousChoisirSection() {
  const { t } = useTranslation('common');
  const steps = [
    {
      icon: ChartBarIcon,
      title: t('process.step_1_title'),
      desc: t('process.step_1_desc'),
      color: "from-indigo-500 via-purple-500 to-pink-500",
    },
    {
      icon: LightBulbIcon,
      title: t('process.step_2_title'),
      desc: t('process.step_2_desc'),
      color: "from-green-400 via-teal-400 to-blue-500",
    },
    {
      icon: RocketLaunchIcon,
      title: t('process.step_3_title'),
      desc: t('process.step_3_desc'),
      color: "from-pink-500 via-red-400 to-yellow-400",
    },
  ];
  // On ne garde que 3 services
  const displayedServices = marketingServices.slice(0, 3);
  return (
    <section className="py-20 bg-white dark:bg-gray-800 w-full">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Image à gauche dans une forme arrondie moderne, agrandie et animée */}
        {/* <div className="w-full md:w-1/2 flex flex-col items-center justify-center mb-8 md:mb-0">
          <BrandIconsCarousel small />
        </div> */}
        {/* Contenu à droite */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
          <div className="flex flex-col items-center mb-4">
            <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold subtitle tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('process.section_title')}</span>
            </span>
          </div>
          <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {t('process.section_subtitle')}
          </AnimatedTitle>
          <p className="text-gray-700 dark:text-gray-200 text-lg mb-8 max-w-xl text-center md:text-left mx-auto md:mx-0">{t('process.section_desc')}</p>
          <ProcessShowcaseSection />
          <div className="flex justify-center w-full mt-8">
            <a className="btn-main btn-main--dark group" href="#contact">
              <span>{t('process.cta_btn')}</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const BizkarProcess = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 bg-white dark:bg-gray-800">
      <div className="w-full max-w-2xl rounded-3xl shadow-xl bg-white dark:bg-gray-100 border border-gray-200 dark:border-gray-300 backdrop-blur-xl p-8 md:p-12 flex flex-col items-center">
        {/* Image décorative en haut */}
        <motion.div
          initial={{ y: 0, opacity: 0.92 }}
          animate={{ y: [0, -18, 0, 18, 0], opacity: 1 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center mb-4"
        >
          <div className="absolute inset-0 rounded-[40%] bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300 opacity-30 blur-2xl z-0" />
          <img
            src="/images/cta-2-1.png"
            alt="Décor features"
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80";
            }}
          />
          {/* Glow animé autour de l'image */}
          <motion.div
            className="absolute inset-0 rounded-[40%] pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 60% 40%, #a78bfa55 0%, #fbc2eb33 60%, transparent 100%)',
              zIndex: 1,
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        {/* Badge, titre, texte, services, bouton, slogan */}
        <div className="flex flex-col items-center mb-4">
          <span className="inline-block bg-blue-50 dark:bg-blue-900/60 px-6 py-1 rounded-xl font-bold subtitle tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">NOTRE AGENCE</span>
          </span>
        </div>
        <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          L'Art de Révéler Votre Marque
        </AnimatedTitle>
        <div className="flex justify-center w-full mb-4">
          <BrandIconsCarousel small />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="body text-gray-700 text-base md:text-lg text-center dark:text-gray-700"
        >
          Chez Conecio, nous croyons que chaque entreprise mérite une présence digitale à la hauteur de ses ambitions. Notre équipe passionnée vous accompagne de la stratégie à la réalisation, en passant par la création de contenus, le web design et l'optimisation de votre visibilité en ligne.
        </motion.p>
        <div className="space-y-6 mb-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.15, rotate: 8 }} transition={{ type: 'spring', stiffness: 200, damping: 10 }} className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400/20">
              <FaLightbulb className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <div>
              <h3 className="block text-lg md:text-xl font-bold heading text-indigo-400 dark:text-indigo-600 mb-2">Stratégie & Innovation</h3>
              <p className="body text-gray-900 dark:text-gray-700 text-xs">Des solutions créatives et sur-mesure pour chaque projet.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.15, rotate: -8 }} transition={{ type: 'spring', stiffness: 200, damping: 10 }} className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500/20">
              <FaChartBar className="w-6 h-6 text-indigo-400" />
            </motion.div>
            <div>
              <h3 className="block text-lg md:text-xl font-bold heading text-indigo-400 dark:text-indigo-600 mb-2">Analyse & Croissance</h3>
              <p className="body text-gray-900 dark:text-gray-700 text-xs">Nous optimisons votre visibilité et vos résultats.</p>
            </div>
          </motion.div>
        </div>
        <a className="btn-main btn-main--light group" href="/demarche">
          <span>Découvrir notre démarche</span>
          <span className="arrow">→</span>
        </a>
        <div className="mt-4 text-xs text-indigo-200 text-center dark:text-indigo-600">Agence 100% digitale & créative</div>
      </div>
    </section>
  );
};

function TrustedCompaniesCarousel() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const logos = [
    { src: '/images/logo/discord-1.png', alt: 'Discord' },
    { src: '/images/logo/Telegram-Symbol-1.png', alt: 'Telegram' },
    { src: '/images/logo/skype-logo-vector-icon-template-clipart-download-0-1.png', alt: 'Skype' },
    { src: '/images/logo/Messenger-Logo-1.png', alt: 'Messenger' },
    { src: '/images/logo/Duolingo-logo_2-1.png', alt: 'Duolingo' },
    { src: '/images/logo/slack_logo-1.png', alt: 'Slack' },
    { src: '/images/logo/fb.png', alt: 'fb' },
  ];

  return (
    <section className="relative w-full py-14 md:py-20 bg-white dark:bg-gray-800 transition-colors duration-500 overflow-hidden">
      {/* Shape vague premium en bas, animée et moins visible */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <svg viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[100px] md:h-[180px]">
          <defs>
            <linearGradient id="wave-gradient-premium" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="0.5" stopColor="#a21caf" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
            {/* Dégradé néon pour le trait */}
            <linearGradient id="neon-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="0.5" stopColor="#a21caf" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Vague principale, plus ondulée */}
          <path fill="url(#wave-gradient-premium)" fillOpacity="0.22">
            <animate attributeName="d" dur="8s" repeatCount="indefinite"
              values="M0,70 C180,120 360,40 540,100 C720,160 900,60 1080,120 C1260,180 1350,80 1440,120 L1440,180 L0,180Z;
                      M0,90 C200,60 400,160 600,80 C800,0 1000,140 1200,60 C1350,0 1400,120 1440,100 L1440,180 L0,180Z;
                      M0,70 C180,120 360,40 540,100 C720,160 900,60 1080,120 C1260,180 1350,80 1440,120 L1440,180 L0,180Z" />
          </path>
          {/* Trait néon premium qui suit la vague */}
          <path stroke="url(#neon-gradient)" strokeWidth="4.5" strokeOpacity="0.7" fill="none" filter="url(#glow)">
            <animate attributeName="d" dur="8s" repeatCount="indefinite"
              values="M0,70 C180,120 360,40 540,100 C720,160 900,60 1080,120 C1260,180 1350,80 1440,120;
                      M0,90 C200,60 400,160 600,80 C800,0 1000,140 1200,60 C1350,0 1400,120 1440,100;
                      M0,70 C180,120 360,40 540,100 C720,160 900,60 1080,120 C1260,180 1350,80 1440,120" />
          </path>
        </svg>
      </div>
      <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
        <div className="flex flex-col items-center mb-4">
          <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold subtitle tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">PARTENAIRES</span>
          </span>
        </div>
        <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Ils nous font confiance
        </AnimatedTitle>
        <p className="body text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10 text-center">Des marques et entreprises qui nous accompagnent dans l'innovation digitale.</p>
        <div className="w-full max-w-5xl mb-16">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={40}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            loop={true}
            autoplay={{ delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            grabCursor={true}
            className="w-full"
          >
            {logos.map((logo) => (
              <SwiperSlide key={logo.alt} className="flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 md:h-16 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 drop-shadow-xl mx-auto"
                  style={{ maxWidth: '140px' }}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

const Process = () => {
  return <ProcessShowcaseSection />;
};

// Composant pour le trait animé avec adaptation dark mode et shimmer
const TraitGlowAnimated = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const gradientRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-[90%] z-0 overflow-visible"
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: '90%', opacity: 1, backgroundPosition: '0% 50%' }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      viewport={{ once: true }}
      transition={{
        width: { duration: 1.2, delay: 0.2, type: 'spring' },
        opacity: { duration: 1.2, delay: 0.2, type: 'spring' },
        backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
      }}
      style={{
        background: 'linear-gradient(90deg, #6366F1 0%, #EC4899 50%, #F59E42 100%)',
        backgroundSize: '200% 100%',
        backgroundPosition: '0% 50%',
        borderRadius: 8,
        boxShadow: 'none',
      }}
    >
      {/* Trait scanner fin et doux */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-0.5 w-32 md:w-40 rounded-full blur-md"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
          opacity: 0.4,
        }}
        animate={{ x: ['0%', 'calc(100% - 10rem)', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

// --- Nouveau composant interactif pour la section Process ---
const processSteps = [
  {
    titleKey: 'process_steps.0.title',
    descKey: 'process_steps.0.desc',
    image: "/images/character/analyse_strategie.webp",
    descriptionKey: 'process_steps.0.description'
  },
  {
    titleKey: 'process_steps.1.title',
    descKey: 'process_steps.1.desc',
    image: "/images/character/creation_innovation.webp",
    descriptionKey: 'process_steps.1.description'
  },
  {
    titleKey: 'process_steps.2.title',
    descKey: 'process_steps.2.desc',
    image: "/images/character/croisse_suivi.webp",
    descriptionKey: 'process_steps.2.description'
  },
];

export default function ProcessShowcaseSection() {
  const [selected, setSelected] = useState<number>(0);
  const { t } = useTranslation('common');
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-800 relative overflow-hidden py-12 px-2 md:px-8">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Colonne gauche */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center px-2 md:px-8">
          <span className="inline-block mb-4 px-6 py-1 rounded-xl font-bold tracking-widest bg-blue-50 text-base animate__animated animate__zoomInDown mx-auto md:mx-0" style={{letterSpacing: '0.08em'}}>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('process.section_title')}</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading mb-4 text-center md:text-left bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {t('process.section_subtitle')}
          </h2>
          <p className="text-gray-700 dark:text-gray-200 text-lg mb-8 max-w-xl text-center md:text-left mx-auto md:mx-0">{t('process.section_desc')}</p>
          <div className="w-full max-w-xl divide-y divide-gray-200 dark:divide-gray-700 border-t border-b border-gray-200 dark:border-gray-700 bg-transparent">
            {processSteps.map((step, idx) => {
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
                        {t(step.descriptionKey)}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {/* Colonne droite : carte avec effet glow */}
        <div className="flex-1 flex items-center justify-center py-8 px-2 md:px-8">
          <div className="relative flex items-center justify-center w-full max-w-lg min-h-[420px]">
            {/* Glow effet */}
            <div className="absolute inset-0 rounded-[2.5rem] blur-2xl pointer-events-none" style={{boxShadow: '0 0 120px 24px #a855f7cc, 0 0 80px 16px #38bdf8cc'}} />
            <div className="relative bg-[#23232b] rounded-[2.5rem] p-8 shadow-2xl w-full min-h-[420px] flex items-center justify-center">
              <img
                src={processSteps[selected].image}
                alt={t(processSteps[selected].titleKey)}
                className="w-full h-full max-h-[340px] object-contain drop-shadow-2xl animate-zoom-in"
                style={{ transition: 'transform 0.5s cubic-bezier(.4,2,.6,1)', transform: 'scale(1.08)' }}
              />
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