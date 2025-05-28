import {
  ChartBarIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  MegaphoneIcon,
  PresentationChartLineIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatedPremiumTitle } from './AnimatedPremiumTitle';
import 'animate.css';
import { AnimatedTitle } from './AnimatedTitle';

const services = [
  {
    icon: ChartBarIcon,
    title: 'SEO & SEM',
    description: 'Optimisez votre visibilité et atteignez le sommet des résultats de recherche',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
  },
  {
    icon: GlobeAltIcon,
    title: 'Web Design',
    description: 'Créez une présence digitale qui captive et convertit',
    gradient: 'from-green-400 via-teal-400 to-blue-500',
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Marketing Mobile',
    description: 'Connectez-vous avec votre audience où qu\'elle soit',
    gradient: 'from-pink-500 via-red-400 to-yellow-400',
  },
  {
    icon: MegaphoneIcon,
    title: 'Social Media',
    description: 'Développez votre communauté et amplifiez votre message',
    gradient: 'from-blue-500 via-cyan-400 to-green-400',
  },
  {
    icon: PresentationChartLineIcon,
    title: 'Analytics & Reporting',
    description: 'Prenez des décisions basées sur des données concrètes',
    gradient: 'from-yellow-400 via-orange-400 to-red-500',
  },
  {
    icon: SparklesIcon,
    title: 'Branding & Identité',
    description: 'Donnez vie à votre marque avec une identité unique',
    gradient: 'from-purple-500 via-pink-400 to-red-500',
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, delay, type: 'spring', stiffness: 80 },
  }),
};

const Services = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
      {/* Image animée en fond */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -30, 0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.15 }}
      >
        <Image
          src="/images/withdraw-bg.png"
          alt="Décor agence"
          fill
          style={{ objectFit: 'cover' }}
          priority={true}
        />
      </motion.div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-4">
          <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold subtitle tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">SERVICES</span>
          </span>
        </div>
        <div className="flex flex-col items-center w-full">
          <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent w-full">
            Solutions Marketing Digital
          </AnimatedTitle>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center mb-12"
        >
          Nous accompagnons votre croissance avec des solutions innovantes et performantes.
        </motion.p>

        <style jsx>{`
          .services-e-cards-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem 2.5rem;
            max-width: 1100px;
            margin: 60px auto;
            padding: 0 1rem;
          }
          .e-card {
            margin: 0 auto;
            background: transparent;
            box-shadow: 0px 8px 28px -9px rgba(0,0,0,0.45);
            position: relative;
            width: 240px;
            height: 260px;
            border-radius: 16px;
            overflow: hidden;
            font: 18px Arial, Helvetica, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .e-card .card-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            padding: 1.1rem 0.7rem 0.7rem 0.7rem;
            gap: 0.3em;
          }
          .e-card.card-1 { background-color: rgba(227,234,254,0.85); color: #23263a; }
          .e-card.card-2 { background-color: rgba(237,233,254,0.85); color: #23263a; }
          .e-card.card-3 { background-color: rgba(253,242,248,0.85); color: #23263a; }
          .e-card.card-4 { background-color: rgba(224,242,241,0.85); color: #23263a; }
          .e-card.card-5 { background-color: rgba(254,249,195,0.85); color: #23263a; }
          .e-card.card-6 { background-color: rgba(243,244,246,0.85); color: #23263a; }
          .dark .e-card.card-1 { background-color: rgba(35,38,58,0.92); color: #e0e7ef; }
          .dark .e-card.card-2 { background-color: rgba(49,46,129,0.92); color: #ede9fe; }
          .dark .e-card.card-3 { background-color: rgba(131,24,67,0.92); color: #fdf2f8; }
          .dark .e-card.card-4 { background-color: rgba(19,78,74,0.92); color: #e0f2f1; }
          .dark .e-card.card-5 { background-color: rgba(120,53,15,0.92); color: #fef9c3; }
          .dark .e-card.card-6 { background-color: rgba(30,41,59,0.92); color: #f3f4f6; }
          .wave {
            position: absolute;
            width: 540px;
            height: 700px;
            opacity: 0.35;
            left: 0;
            top: 0;
            margin-left: -50%;
            margin-top: -70%;
            background: linear-gradient(744deg,#af40ff,#5b42f3 60%,#00ddeb);
            border-radius: 40%;
            animation: wave 55s infinite linear;
            z-index: 1;
            pointer-events: none;
          }
          .wave:nth-child(2), .wave:nth-child(3) { top: 210px; }
          .wave:nth-child(2) { animation-duration: 50s; }
          .wave:nth-child(3) { animation-duration: 45s; }
          @keyframes wave {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .e-card .icon {
            width: 3em;
            height: 3em;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255,255,255,0.18);
            border-radius: 50%;
            margin: 0 auto;
            z-index: 2;
            transition: transform 0.3s;
          }
          .e-card:hover .icon {
            transform: scale(1.13) rotate(-8deg);
            background: rgba(255,255,255,0.28);
          }
          .e-card .icon svg {
            transition: all 0.3s;
            color: #fff;
          }
          .e-card.card-1:hover .icon svg { color: #6366f1; }
          .e-card.card-2:hover .icon svg { color: #a21caf; }
          .e-card.card-3:hover .icon svg { color: #db2777; }
          .e-card.card-4:hover .icon svg { color: #059669; }
          .e-card.card-5:hover .icon svg { color: #eab308; }
          .e-card.card-6:hover .icon svg { color: #2563eb; }
          .e-card h3 {
            font-size: 1.1rem;
            font-weight: 600;
            margin: 0.2em 0 0.1em 0;
            z-index: 2;
          }
          .e-card p {
            font-size: 0.95rem;
            margin: 0 auto;
            line-height: 1.3;
            z-index: 2;
            text-align: center;
            max-width: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 48px;
          }
          @media (max-width: 900px) {
            .services-e-cards-grid { grid-template-columns: 1fr 1fr; gap: 1.5rem 1rem; }
          }
          @media (max-width: 600px) {
            .services-e-cards-grid { grid-template-columns: 1fr; gap: 1.2rem 0; }
            .e-card { width: 98vw; height: 320px; }
          }
          .premium-btn-container {
            display: flex;
            justify-content: center;
            margin-top: 2.5rem;
          }
          button {
            position: relative;
            display: inline-block;
            cursor: pointer;
            outline: none;
            border: 0;
            vertical-align: middle;
            text-decoration: none;
            background: transparent;
            padding: 0;
            font-size: inherit;
            font-family: inherit;
          }
          button.learn-more {
            width: 12rem;
            height: auto;
          }
          button.learn-more .circle {
            transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
            box-shadow: 0 0 5px 1px rgba(0,0,0,0.2);
            position: relative;
            display: block;
            margin: 0;
            width: 3rem;
            height: 3rem;
            background: #fff;
            border-radius: 1.625rem;
          }
          .dark button.learn-more .circle {
            background: #fff;
            box-shadow: 0 0 5px 1px rgba(255,255,255,0.2);
          }
          button.learn-more .circle .icon {
            transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            background: #fff;
          }
          .dark button.learn-more .circle .icon {
            background: #fff;
          }
          button.learn-more .circle .icon.arrow {
            transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
            left: 0.625rem;
            width: 1.125rem;
            height: 0.125rem;
            background: none;
          }
          button.learn-more .circle .icon.arrow::before {
            position: absolute;
            content: "";
            top: -0.29rem;
            right: 0.0625rem;
            width: 0.625rem;
            height: 0.625rem;
            border-top: 0.125rem solid #000;
            border-right: 0.125rem solid #000;
            transform: rotate(45deg);
          }
          .dark button.learn-more .circle .icon.arrow::before {
            border-top: 0.125rem solid #000;
            border-right: 0.125rem solid #000;
          }
          button.learn-more .button-text {
            transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0.75rem 0;
            margin: 0 0 0 1.85rem;
            color: #000;
            font-weight: 700;
            line-height: 1.6;
            text-align: center;
            text-transform: uppercase;
          }
          .dark button.learn-more .button-text {
            color: #000;
          }
          button:hover .circle {
            width: 100%;
            box-shadow: 0 0 10px 2px rgba(0,0,0,0.2);
          }
          .dark button:hover .circle {
            box-shadow: 0 0 10px 2px rgba(255,255,255,0.2);
          }
          button:hover .button-text {
            transform: translate(-1.7rem, 0);
            color: #000;
          }
          .dark button:hover .button-text {
            color: #000;
          }
          button:hover .circle .icon.arrow {
            background: #fff;
            transform: translate(8.7rem, 0);
          }
          .dark button:hover .circle .icon.arrow {
            background: #fff;
          }
          button:active .circle .icon.arrow {
            transform: translate(9.5rem, 0);
            transition: all 0.3s;
          }
          button:active .circle {
            transform: scale(0.9);
            transition: all 0.3s;
            box-shadow: 0 0 5px 0.5px rgba(0,0,0,0.2);
          }
          .dark button:active .circle {
            box-shadow: 0 0 5px 0.5px rgba(255,255,255,0.2);
          }
          button:active .button-text {
            color: #000;
          }
          .dark button:active .button-text {
            color: #000;
          }
        `}</style>
        <div className="services-e-cards-grid">
          {services.slice(0,6).map((service, idx) => (
            <div className={`e-card card-${idx+1} playing`} key={service.title}>
              <div className="wave" />
              <div className="wave" style={{ animationDuration: '50s', top: '210px' }} />
              <div className="wave" style={{ animationDuration: '45s', top: '210px' }} />
              <div className="card-content">
                <div className="icon">
                  <service.icon className="w-6 h-6 text-white mx-auto" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a
                  href={`/services#${service.title.toLowerCase().replace(/\s|&/g, '-').replace(/[^a-z0-9\-]/g, '')}`}
                  className="text-xs font-bold text-white flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-all group shadow"
                >
                  Découvrez <span className="transition-transform group-hover:translate-x-1">&gt;</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="premium-btn-container flex justify-center mt-8">
          <a
            href="/contact"
            className="btn-main btn-main--dark group"
          >
            <span>En savoir plus</span>
            <span className="arrow group-hover:translate-x-1 transition-transform ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services; 