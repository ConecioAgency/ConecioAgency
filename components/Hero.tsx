import React, { useEffect, useState } from "react";
import EvaModel from "./EvaModel";
import CardLoaderAnimation from "./CardLoaderAnimation";
import { useTranslation } from 'next-i18next';

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
  const { t } = useTranslation('common');
  const rotatingWords = [
    t('hero.rotating_word_1'),
    t('hero.rotating_word_2'),
    t('hero.rotating_word_3'),
    t('hero.rotating_word_4'),
    t('hero.rotating_word_5'),
  ];
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-badge">
            <span role="img" aria-label="star">⭐️⭐️⭐️⭐️⭐️</span> {t('hero.boost_visibility')}
          </div>
          <h1>
            <span className="hero-title-main">{t('hero.deploy_power')}</span><br />
            <span className="hero-title-rotating">
              <RotatingText rotatingWords={rotatingWords} />
            </span>
          </h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <a href="/contact" className="btn-main btn-main--dark group">
            <span>{t('hero.start_project')}</span>
            <span className="arrow group-hover:translate-x-1 transition-transform ml-2">→</span>
          </a>
        </div>
        <div className="hero-right">
          <div className="hero-right-flex" style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img
              src="/images/hero_landing.png"
              alt="Hero Landing"
              className="hero-landing-img"
              style={{
                background: 'transparent',
                maxWidth: '100%',
                minHeight: '320px',
                width: '540px',
                height: '410px',
                objectFit: 'contain'
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
        }
        .hero-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1200px;
          padding: 60px 32px 40px 32px;
        }
        .hero-left {
          flex: 1;
          z-index: 2;
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
        }
        h1 {
          font-size: 3rem;
          font-weight: 800;
          color: #f3f4f6;
          margin-bottom: 18px;
          line-height: 1.1;
        }
        .hero-title-main {
          color: #f3f4f6;
        }
        .hero-title-rotating {
          color: #a855f7;
          font-weight: 800;
          font-size: 1.1em;
          letter-spacing: -1px;
          display: inline-block;
          min-height: 1.2em;
        }
        .rotating-text {
          display: inline-block;
          animation: fadeInUp 0.7s;
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
        }
        .hero-right {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          min-width: 340px;
          min-height: 260px;
        }
        .hero-right-flex {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 3.5rem;
          position: relative;
          z-index: 2;
        }
        .cards-pile-group {
          position: relative;
          width: 340px;
          height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 30px;
        }
        .card {
          position: absolute;
          border-radius: 18px;
          box-shadow: 0 8px 32px #0003, 0 2px 8px #6366f133;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(6px);
          transition: box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-qr-main {
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
        }
        .card-loader-top-right {
          left: 62%;
          top: -24px;
          z-index: 2;
          opacity: 0.95;
        }
        .card-loader-bottom-left {
          left: 6%;
          top: calc(62% - 8px);
          z-index: 2;
          opacity: 0.95;
        }
        .hero-pattern {
          position: absolute;
          right: 0;
          top: 0;
          width: 100%;
          height: 100%;
          max-width: 520px;
          background: 
            repeating-linear-gradient(
              to bottom right,
              #334155 0px,
              #334155 1px,
              transparent 1px,
              transparent 40px
            ),
            repeating-linear-gradient(
              to top right,
              #334155 0px,
              #334155 1px,
              transparent 1px,
              transparent 40px
            );
          opacity: 0.18;
          z-index: 1;
          border-radius: 32px 0 0 32px;
        }
        @media (max-width: 900px) {
          .hero-content { flex-direction: column; gap: 40px; }
          .hero-right-flex { flex-direction: column; align-items: center; gap: 1.5rem; }
          .hero-right { min-width: 220px; }
          .cards-pile-group {
            width: 220px;
            height: 340px;
          }
        }
        .btn-main {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: unset;
          width: auto;
          padding: 0.75rem 1.5rem;
          font-size: 1.08rem;
          font-weight: 600;
          border-radius: 0.75rem;
          margin: 0 auto;
          box-shadow: 0 2px 12px #0001;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .hero-landing-img {
          animation: heroFloatZoom 3.5s ease-in-out infinite alternate;
          border-radius: 32px;
        }
        @keyframes heroFloatZoom {
          0% {
            transform: scale(1) translateY(0px);
          }
          50% {
            transform: scale(1.07) translateY(-16px);
          }
          100% {
            transform: scale(1) translateY(0px);
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