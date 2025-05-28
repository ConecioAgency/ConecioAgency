import { motion } from 'framer-motion';
import { ChartBarIcon, LightBulbIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useRef, useState, useEffect } from 'react';
import { FaCloud, FaChartBar, FaLightbulb, FaSearch, FaEnvelope, FaDesktop, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import React from 'react';
import SectionTitle from './SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { AnimatedTitle } from './AnimatedTitle';
import GooeyButton from './GooeyButton';

const steps = [
  {
    icon: ChartBarIcon,
    title: "Analyse & Stratégie",
    desc: "On analyse vos besoins et on définit une stratégie digitale sur-mesure.",
    color: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    icon: LightBulbIcon,
    title: "Création & Innovation",
    desc: "On conçoit des solutions créatives et innovantes pour votre marque.",
    color: "from-green-400 via-teal-400 to-blue-500",
  },
  {
    icon: RocketLaunchIcon,
    title: "Croissance & Suivi",
    desc: "On propulse votre business et on optimise vos résultats en continu.",
    color: "from-pink-500 via-red-400 to-yellow-400",
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay },
  }),
};

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

const bizkarServices = [
  {
    icon: <FaLightbulb className="w-6 h-6" />,
    title: "Manage Your Project",
    desc: "Consectetur adipisicing elit sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    color: "border-orange-400 text-orange-500 bg-white",
  },
  {
    icon: <FaChartBar className="w-6 h-6" />,
    title: "Business & Data Analytics",
    desc: "Consectetur adipisicing elit sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    color: "border-indigo-400 text-indigo-500 bg-white",
  },
];

function PourquoiNousChoisirSection() {
  // On ne garde que 3 services
  const displayedServices = marketingServices.slice(0, 3);
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Image à gauche dans une forme arrondie moderne, agrandie et animée */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.92, x: -40 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: [0, -16, 0, 16, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-[45%_55%_60%_40%_/_60%_40%_60%_40%] bg-gradient-to-br from-indigo-400 via-purple-400 to-orange-300 shadow-2xl flex items-center justify-center overflow-visible">
            {/* Glow animé autour de l'image */}
            <motion.div
              className="absolute inset-0 rounded-[45%_55%_60%_40%_/_60%_40%_60%_40%] pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 60% 40%, #a78bfa55 0%, #fbc2eb33 60%, transparent 100%)',
                zIndex: 1,
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <img
              src="/images/home4-banner-el.png"
              alt="Agence marketing digital"
              className="w-[96%] h-[96%] object-contain drop-shadow-2xl opacity-100 transition-transform duration-500 hover:scale-105 z-10"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80";
              }}
            />
            {/* Légère ombre colorée supplémentaire */}
            <div className="absolute inset-0 rounded-[45%_55%_60%_40%_/_60%_40%_60%_40%] pointer-events-none" style={{boxShadow: '0 0 64px 8px #a78bfa55, 0 0 32px 8px #fbc2eb33'}} />
          </div>
        </motion.div>
        {/* Contenu à droite */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
          <div className="flex flex-col items-center mb-4">
            <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold subtitle tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">NOTRE PROCESSUS</span>
            </span>
          </div>
          <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            L'Innovation au Cœur de Votre Croissance
          </AnimatedTitle>
          <p className="body text-gray-700 dark:text-gray-300 mb-8 max-w-xl">Notre équipe vous accompagne à chaque étape pour propulser votre marque et atteindre vos objectifs business grâce au digital.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-8">
            {displayedServices.map((service, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center gap-4 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-xl border border-white/30 dark:border-gray-700/30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${service.color} text-white shadow-lg mb-2 transition-transform duration-300 animate-float group-hover:scale-110 group-hover:shadow-2xl`}>
                  {service.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 text-center">{service.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 text-center">{service.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center w-full">
            <a className="btn-main btn-main--dark group" href="#contact">
              <span>Démarrer Maintenant</span>
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
          <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold subtitle tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">NOTRE AGENCE</span>
          </span>
        </div>
        <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          L'Art de Révéler Votre Marque
        </AnimatedTitle>
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
  return (
    <>
      <BizkarProcess />
      <section className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center md:items-stretch gap-8 md:gap-0">
          {/* Colonne texte/processus à gauche */}
          <div className="w-full md:w-1/2 flex flex-col justify-center md:justify-center items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center mb-4">
              <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold subtitle tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">SUCCÈS</span>
              </span>
            </div>
            <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Votre succès, étape par étape
            </AnimatedTitle>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center mb-8"
            >Atteignez de nouveaux sommets avec Conecio : chaque étape de votre parcours digital est pensée pour transformer vos ambitions en réussites concrètes.</motion.p>
            {/* Timeline horizontale */}
            <div className="flex flex-col w-full md:w-[80%] mx-auto">
              {/* Rangée des bulles avec trait positionné en absolu */}
              <div className="relative flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 w-full pb-10">
                <TraitGlowAnimated />
                {steps.map((step, idx) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 40, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: idx * 0.18 }}
                    className="relative z-10 flex flex-col items-center md:w-1/3 group mx-2"
                    whileHover={{ scale: 1.08 }}
                  >
                    {/* Bulle glassmorphism avec effet pulse au survol */}
                    <motion.div
                      className={`relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full bg-white/70 dark:bg-gray-900/70 shadow-2xl border-2 border-white dark:border-gray-800 backdrop-blur-xl group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ scale: 1.13, boxShadow: '0 0 32px 8px #a78bfa77' }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    >
                      {/* Glow */}
                      <motion.div
                        className={`absolute inset-0 rounded-full blur-2xl opacity-50 z-0 bg-gradient-to-br ${step.color}`}
                        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      {/* Icône dans cercle 3D avec effet pulse */}
                      <motion.div
                        className={`relative z-10 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-xl`}
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 }}
                      >
                        <step.icon className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg" />
                      </motion.div>
                      {/* Numéro d'étape */}
                      <span className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-900/80 text-base md:text-lg font-extrabold heading text-primary-light dark:text-primary-dark shadow-lg border-2 border-white dark:border-gray-800">{idx + 1}</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              {/* Espace entre trait et descriptions */}
              <div className="mt-10" />
              {/* Rangée des descriptions */}
              <div className="flex flex-col md:flex-row items-start justify-center gap-8 w-full">
                {steps.map((step, idx) => (
                  <div key={step.title} className="md:w-1/3 mx-2 text-center md:text-left max-w-xs">
                    <h3 className="heading text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 drop-shadow-sm">{step.title}</h3>
                    <p className="body text-gray-600 dark:text-gray-300 text-xs md:text-sm">{step.desc}</p>
                    <div className="my-4"></div>
                    <div className="my-4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Colonne image flottante à droite */}
          <div className="relative flex items-center justify-center md:w-1/2 w-full min-h-[320px] md:min-h-[500px] mb-8 md:mb-0 pl-0 md:pl-8 pr-0 md:pr-12">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -30, 0, 30, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[80vw] max-w-[420px] md:w-[90%] md:max-w-[420px] h-[270px] md:h-[420px] pointer-events-none"
              style={{ opacity: 0.6 }}
            >
              <Image
                src="/images/features.png"
                alt="Décor features"
                fill
                style={{ objectFit: 'contain' }}
                priority={true}
              />
            </motion.div>
          </div>
        </div>
      </section>
      <PourquoiNousChoisirSection />
      <TrustedCompaniesCarousel />
    </>
  );
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

export default Process; 