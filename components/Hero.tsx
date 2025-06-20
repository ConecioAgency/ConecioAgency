import React, { useEffect, useState, Suspense } from "react";
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Chargement dynamique des composants non critiques
const EvaModel = dynamic(() => import("./EvaModel"), {
  loading: () => <div className="w-full h-64 flex items-center justify-center">Chargement...</div>,
  ssr: false
});

const CardLoaderAnimation = dynamic(() => import("./CardLoaderAnimation"), {
  loading: () => <div className="w-full h-64 flex items-center justify-center">Chargement...</div>,
  ssr: false
});

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
  
  const badgeText = isArabic ? '⭐️⭐️⭐️⭐️⭐️ عزز ظهورك الرقمي' : (<><span role="img" aria-label="star">⭐️⭐️⭐️⭐️⭐️</span> {t('hero.boost_visibility')}</>);
  const mainTitle = isArabic ? 'أطلق العنان لقوة التسويق الرقمي' : t('hero.deploy_power');
  const subtitle = isArabic ? 'حلول رقمية متكاملة لزيادة عملائك وتعزيز علامتك التجارية.' : t('hero.subtitle');
  const ctaText = isArabic ? 'ابدأ مشروعك الآن' : t('hero.start_project');

  return (
    <section className="hero-section">
      <div className={`hero-content${isArabic ? ' flex-row-reverse' : ''}`}>
        <div className={`hero-left${isArabic ? ' text-right' : ''}`}>
          <div className="hero-badge">
            {badgeText}
          </div>
          <h1>
            <span className="hero-title-main">{mainTitle}</span><br />
            <span className="hero-title-rotating">
              <RotatingText rotatingWords={rotatingWords} />
            </span>
          </h1>
          <p className="hero-subtitle">
            {subtitle}
          </p>
          <a href="/contact" className="inline-flex items-center px-5 py-2 rounded-md bg-white text-purple-700 font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300 group text-base">
            <span>{ctaText}</span>
            <span className="arrow group-hover:translate-x-1 transition-transform ml-2">→</span>
          </a>
        </div>
        <div className="hero-right">
          <div className="hero-right-flex">
            <Image
              src="/images/PSD/mockup_paper_out_of_screen_website.webp"
              alt={isArabic ? "صورة بطل الصفحة" : "Hero Landing"}
              className="hero-landing-img"
              width={540}
              height={410}
              priority
              loading="eager"
              sizes="(max-width: 768px) 100vw, 540px"
              style={{
                background: 'transparent',
                maxWidth: '100%',
                minHeight: '320px',
                objectFit: 'contain',
                borderRadius: '32px',
                willChange: 'transform',
                contain: 'layout style paint'
              }}
            />
          </div>
          <div className="hero-pattern" />
        </div>
      </div>
      <style jsx>{`
        .hero-section {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at 70% 40%, #1e293b 0%, #0a0c12 100%);
          position: relative;
          overflow: hidden;
          contain: layout style paint;
          content-visibility: auto;
        }
        .hero-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1200px;
          padding: 60px 32px 40px 32px;
          contain: layout style paint;
        }
        .hero-content.flex-row-reverse {
          flex-direction: row-reverse;
        }
        .hero-left {
          flex: 1;
          z-index: 2;
          contain: layout style paint;
        }
        .hero-left.text-right {
          text-align: right;
        }
        .hero-badge {
          background: #181c2a;
          color: #fff;
          font-size: 1rem;
          border-radius: 8px;
          padding: 8px 18px;
          margin-bottom: 24px;
          display: inline-block;
          font-weight: 500;
          box-shadow: 0 2px 12px #0002;
          contain: layout style paint;
        }
        h1 {
          font-size: 3rem;
          font-weight: 800;
          color: #f3f4f6;
          margin-bottom: 18px;
          line-height: 1.1;
          contain: layout style paint;
          content-visibility: auto;
        }
        .hero-title-main {
          color: #f3f4f6;
          contain: layout style paint;
        }
        .hero-title-rotating {
          color: #a855f7;
          font-weight: 800;
          font-size: 1.1em;
          letter-spacing: -1px;
          display: inline-block;
          min-height: 1.2em;
          contain: layout style paint;
        }
        .rotating-text {
          display: inline-block;
          animation: fadeInUp 0.7s;
          contain: layout style paint;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .hero-subtitle {
          color: #b3b8c5;
          font-size: 1.15rem;
          margin-bottom: 32px;
          max-width: 500px;
          contain: layout style paint;
        }
        .hero-right {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          min-width: 340px;
          min-height: 260px;
          contain: layout style paint;
        }
        .hero-right-flex {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 3.5rem;
          position: relative;
          z-index: 2;
          contain: layout style paint;
        }
        .hero-landing-img {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        @media (max-width: 768px) {
          .hero-content {
            flex-direction: column;
            text-align: center;
            padding: 40px 20px;
          }
          .hero-left {
            margin-bottom: 40px;
          }
          h1 {
            font-size: 2.5rem;
          }
          .hero-right {
            min-width: 280px;
          }
        }
      `}</style>
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