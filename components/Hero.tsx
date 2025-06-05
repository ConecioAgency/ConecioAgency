import React, { useEffect, useState } from "react";
import EvaModel from "./EvaModel";
import CardLoaderAnimation from "./CardLoaderAnimation";
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { motion } from 'framer-motion';

function RotatingText({ rotatingWords }: { rotatingWords: string[] }) {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation('common');
  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % rotatingWords.length), 1800);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);
  return (
    <span className="rotating-text">{rotatingWords[index]}</span>
  );
}

export default function Hero() {
  const { t, i18n } = useTranslation('common');
  const isArabic = i18n.language === 'ar';
  const rotatingWords = [
    t('hero.rotating_word_1'),
    t('hero.rotating_word_2'),
    t('hero.rotating_word_3'),
    t('hero.rotating_word_4'),
    t('hero.rotating_word_5'),
  ];
  // Texte alternatif pour l'arabe si besoin
  const badgeText = isArabic ? '⭐️⭐️⭐️⭐️⭐️ عزز ظهورك الرقمي' : (<><span role="img" aria-label="star">⭐️⭐️⭐️⭐️⭐️</span> {t('hero.boost_visibility')}</>);
  const mainTitle = isArabic ? 'أطلق العنان لقوة التسويق الرقمي' : t('hero.deploy_power');
  const subtitle = isArabic ? 'حلول رقمية متكاملة لزيادة عملائك وتعزيز علامتك التجارية.' : t('hero.subtitle');
  const ctaText = isArabic ? 'ابدأ مشروعك الآن' : t('hero.start_project');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Préchargement de l'image hero
    const img = new window.Image();
    img.src = '/images/PSD/mockup_paper_out_of_screen_website.webp';
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Transformez votre présence digitale
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Nous créons des expériences web exceptionnelles qui captent l'attention et convertissent vos visiteurs en clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Démarrer un projet
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Nos services
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-[4/3] max-w-xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-2xl" />
            <Image
              src="/images/PSD/mockup_paper_out_of_screen_website.webp"
              alt="Hero Landing"
              fill
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 540px"
              className="object-contain drop-shadow-2xl"
              style={{
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Loader animé à droite
function LoaderAnimation() {
  return (
    <div className="loader">
      <div className="wrapper">
        <div className="circle"></div>
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-3"></div>
        <div className="line-4"></div>
      </div>
      <style jsx>{`
        .loader {
          position: relative;
          width: 300px;
          height: 160px;
          margin-bottom: 10px;
          border: 1px solid #d3d3d3;
          padding: 15px;
          background-color: #e3e3e3;
          overflow: hidden;
          border-radius: 18px;
          z-index: 2;
          box-shadow: 0 2px 24px #0002;
        }
        .loader:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(110deg, rgba(227, 227, 227, 0) 0%, rgba(227, 227, 227, 0) 40%, rgba(227, 227, 227, 0.5) 50%, rgba(227, 227, 227, 0) 60%, rgba(227, 227, 227, 0) 100%);
          animation: gradient-animation_2 1.2s linear infinite;
        }
        .loader .wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .loader .wrapper > div {
          background-color: #cacaca;
        }
        .loader .circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        .loader .line-1 {
          position: absolute;
          top: 18px;
          left: 78px;
          height: 14px;
          width: 130px;
        }
        .loader .line-2 {
          position: absolute;
          top: 48px;
          left: 78px;
          height: 14px;
          width: 190px;
        }
        .loader .line-3 {
          position: absolute;
          top: 80px;
          left: 0px;
          height: 14px;
          width: 100%;
        }
        .loader .line-4 {
          position: absolute;
          top: 112px;
          left: 0px;
          height: 14px;
          width: 92%;
        }
        @keyframes gradient-animation_2 {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

function QrLoaderCard() {
  return (
    <div className="qr-loader-card">
      <div className="header">
        <div className="avatar"></div>
        <div className="info">
          <div className="nickname"></div>
          <div className="signature"></div>
        </div>
      </div>
      <div className="qr-code">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          className="qr-icon"
        >
          <path
            d="M392.6 544.256a102.4 102.4 0 0 1 102.4 102.4V885.76a102.4 102.4 0 0 1-102.4 102.4H153.6a102.4 102.4 0 0 1-102.4-102.4V646.656a102.4 102.4 0 0 1 102.4-102.4h239zm521.5 214.272a43.52 43.52 0 0 1 43.16 38.092l0.36 5.427v136.704a43.52 43.52 0 0 1-86.68 5.478l-0.36-5.427v-136.704c0-24.064 19.456-43.52 43.52-43.52zm-295.8 0a43.52 43.52 0 0 1 43.16 38.092l0.36 5.427v136.704a43.52 43.52 0 0 1-86.73 5.478l-0.31-5.427v-136.704c0-24.064 19.456-43.52 43.52-43.52zm147.9 47.514a43.52 43.52 0 0 1 43.16 38.04l0.36 5.48v89.24a43.52 43.52 0 0 1-86.73 5.428l-0.31-5.428v-89.24c0-24.064 19.456-43.52 43.52-43.52zM392.6 615.936H153.6a30.72 30.72 0 0 0-30.31 25.754l-0.41 4.966v239a30.72 30.72 0 0 0 25.75 30.31l4.97 0.41h239a30.72 30.72 0 0 0 30.31-25.754l0.41-4.966V646.656a30.72 30.72 0 0 0-25.75-30.31l-4.97-0.41zm-71.17 76.288a25.6 25.6 0 0 1 25.6 25.6v96.666a25.6 25.6 0 0 1-25.6 25.6H224.768a25.6 25.6 0 0 1-25.6-25.6V717.824a25.6 25.6 0 0 1 25.6-25.6h96.768zm444.774-92.877a43.52 43.52 0 0 1 43.16 38.04l0.36 5.48v98.61a43.52 43.52 0 0 1-86.73 5.478l-0.31-5.478v-98.61c0-24.064 19.456-43.52 43.52-43.52zm-147.97 0a43.52 43.52 0 0 1 43.21 38.04l0.36 5.48v49.305a43.52 43.52 0 0 1-86.73 5.478l-0.31-5.478v-49.305c0-24.064 19.456-43.52 43.52-43.52zm295.885 0a43.52 43.52 0 0 1 43.16 38.04l0.36 5.48v49.305a43.52 43.52 0 0 1-86.68 5.478l-0.36-5.478v-49.305c0-24.064 19.456-43.52 43.52-43.52zM392.6 51.2a102.4 102.4 0 0 1 102.4 102.4v239a102.4 102.4 0 0 1-102.4 102.4H153.6a102.4 102.4 0 0 1-102.4-102.4V153.6a102.4 102.4 0 0 1 102.4-102.4h239zm493.056 0a102.4 102.4 0 0 1 102.4 102.4v239a102.4 102.4 0 0 1-102.4 102.4h-239a102.4 102.4 0 0 1-102.4-102.4V153.6a102.4 102.4 0 0 1 102.4-102.4h239zm-493.056 71.68H153.6a30.72 30.72 0 0 0-30.31 25.754L122.88 153.6v239a30.72 30.72 0 0 0 25.75 30.31l4.97 0.41h239a30.72 30.72 0 0 0 30.31-25.754l0.41-4.966V153.6a30.72 30.72 0 0 0-25.75-30.31l-4.97-0.41zm493.056 0h-239a30.72 30.72 0 0 0-30.31 25.754L615.936 153.6v239a30.72 30.72 0 0 0 25.75 30.31l4.97 0.41h239a30.72 30.72 0 0 0 30.31-25.754l0.41-4.966V153.6a30.72 30.72 0 0 0-25.75-30.31l-4.97-0.41zM321.485 199.168a25.6 25.6 0 0 1 25.6 25.6v96.717a25.6 25.6 0 0 1-25.6 25.6H224.768a25.6 25.6 0 0 1-25.6-25.6v-96.768a25.6 25.6 0 0 1 25.6-25.6h96.768zm493.107 0a25.6 25.6 0 0 1 25.6 25.6v96.717a25.6 25.6 0 0 1-25.6 25.6H717.824a25.6 25.6 0 0 1-25.6-25.6v-96.768a25.6 25.6 0 0 1 25.6-25.6h96.768z"
          ></path>
        </svg>
      </div>
      <style jsx>{`
        .qr-loader-card {
          width: 150px;
          height: 214px;
          padding: 15px;
          background: #f5f5f5;
          border: 1px solid #eee;
          border-radius: 12px;
          position: absolute;
          left: -90px;
          bottom: -30px;
          overflow: hidden;
          box-shadow: 0 2px 12px #0001;
          z-index: 3;
        }
        .header {
          display: flex;
          margin-top: 5px;
          margin-bottom: 20px;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e0e0e0;
          margin-right: 15px;
        }
        .info {
          flex: 1;
          padding-top: 5px;
        }
        .nickname {
          width: 40px;
          height: 16px;
          background: #e0e0e0;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .signature {
          width: 55px;
          height: 12px;
          background: #e0e0e0;
          border-radius: 4px;
        }
        .qr-code {
          width: 110px;
          height: 110px;
          background: #e0e0e0;
          border-radius: 8px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }
        .qr-icon {
          width: 80px;
          height: 80px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.08;
        }
        .qr-loader-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shine 1.2s infinite;
        }
        @keyframes shine {
          100% {
            left: 200%;
          }
        }
      `}</style>
    </div>
  );
} 