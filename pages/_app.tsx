import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBubbles from '../components/AnimatedBubbles';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Script from 'next/script';
import CookieConsent from 'react-cookie-consent';
import { useEffect, useState } from 'react';
import { appWithTranslation } from 'next-i18next';

// Hook global pour animer tous les h2.h2-animated au scroll
function useH2ScrollAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const elements = document.querySelectorAll('h2.h2-animated');
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('h2-animated-visible');
        }
      });
    }, { threshold: 0.2 });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function MyApp({ Component, pageProps }: AppProps) {
  useH2ScrollAnimation();
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    performance: false,
    chat: false,
    functional: false,
    analytics: false,
    advertisement: false
  });
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [showCustomize, setShowCustomize] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPreferences = localStorage.getItem('cookiePreferences');
      if (savedPreferences) {
        setCookiePreferences(JSON.parse(savedPreferences));
        setCookiesAccepted(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = {
      essential: true,
      performance: true,
      chat: true,
      functional: true,
      analytics: true,
      advertisement: true
    };
    setCookiePreferences(newPreferences);
    localStorage.setItem('cookiePreferences', JSON.stringify(newPreferences));
    setCookiesAccepted(true);
    setShowCookieBanner(false);
  };

  const handleCustomize = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setCookiesAccepted(cookiePreferences.essential);
    setShowCookieBanner(false);
  };

  const toggleCookie = (type: keyof typeof cookiePreferences) => {
    if (type === 'essential') return; // Ne peut pas être désactivé
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <>
      <Head>
        <title>Conecio - Agence Web Créative</title>
        <meta name="description" content="Conecio - Votre partenaire pour des solutions web innovantes et créatives" />
        <link rel="icon" type="image/png" href="/images/logo/conecio_logo.png" />
      </Head>

      <Navbar />
      <AnimatedBubbles />
      <Component {...pageProps} />
      <Footer />
      <ScrollToTopButton />

      {/* Nouvelle bannière cookies inspirée de l'image */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 w-full z-[9999] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in text-gray-900 dark:text-gray-100">
          <div className="flex-1 min-w-0">
            <div className="font-bold text-gray-900 dark:text-gray-100 text-base mb-1 md:mb-0">Nous respectons votre vie privée</div>
            <div className="text-gray-700 dark:text-gray-200 text-sm md:inline-block md:ml-0">
              Nous utilisons des cookies pour améliorer votre expérience de navigation, proposer des contenus ou publicités personnalisés et analyser notre trafic. En cliquant sur « Tout accepter », vous consentez à l'utilisation de ces cookies. <a href="/politique-confidentialite" className="text-blue-600 dark:text-blue-400 underline ml-1" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>
            </div>
          </div>
          <div className="flex flex-shrink-0 gap-2 mt-2 md:mt-0">
            <button
              className="px-4 py-2 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded transition hover:bg-blue-50 dark:hover:bg-blue-900 text-sm font-medium"
              onClick={() => setShowCustomize(true)}
            >
              Personnaliser
            </button>
            <button
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded transition hover:bg-blue-700 dark:hover:bg-blue-600 text-sm font-medium"
              onClick={() => {
                setCookiePreferences({ essential: true, performance: false, chat: false, functional: false, analytics: false, advertisement: false });
                localStorage.setItem('cookiePreferences', JSON.stringify({ essential: true, performance: false, chat: false, functional: false, analytics: false, advertisement: false }));
                setCookiesAccepted(true);
                setShowCookieBanner(false);
              }}
            >
              Tout refuser
            </button>
            <button
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded transition hover:bg-blue-700 dark:hover:bg-blue-600 text-sm font-medium"
              onClick={() => {
                setCookiePreferences({ essential: true, performance: true, chat: true, functional: true, analytics: true, advertisement: true });
                localStorage.setItem('cookiePreferences', JSON.stringify({ essential: true, performance: true, chat: true, functional: true, analytics: true, advertisement: true }));
                setCookiesAccepted(true);
                setShowCookieBanner(false);
              }}
            >
              Tout accepter
            </button>
          </div>
        </div>
      )}

      {/* Optionnel : fenêtre de personnalisation */}
      {showCustomize && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-gray-800 dark:text-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-xl">Préférences de consentement</div>
              <button className="text-gray-400 hover:text-gray-700" onClick={() => setShowCustomize(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="text-gray-700 text-sm mb-4">
              Nous utilisons des cookies pour vous aider à naviguer efficacement et à exécuter certaines fonctions. Vous trouverez des informations détaillées sur tous les cookies sous chaque catégorie ci-dessous.<br />
              Les cookies classés comme « Nécessaires » sont stockés sur votre navigateur car ils sont essentiels au fonctionnement de base du site.<br />
            </div>
            <div className="space-y-5 mb-6">
              {/* Nécessaires */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Nécessaires</div>
                  <span className="text-green-600 font-semibold text-xs">Toujours activé</span>
                </div>
                <div className="text-gray-500 text-xs mt-1">Les cookies nécessaires sont requis pour activer les fonctionnalités de base du site, comme la connexion sécurisée ou l'ajustement de vos préférences de consentement. Ces cookies ne stockent aucune donnée personnelle identifiable.</div>
              </div>
              {/* Fonctionnels */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Fonctionnels</div>
                  <input type="checkbox" checked={cookiePreferences.functional || false} onChange={() => toggleCookie('functional')} className="accent-blue-600 w-5 h-5" />
                </div>
                <div className="text-gray-500 text-xs mt-1">Les cookies fonctionnels permettent d'activer certaines fonctionnalités comme le partage de contenu sur les réseaux sociaux, la collecte de feedback, et d'autres services tiers.</div>
              </div>
              {/* Analytics */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Analytics</div>
                  <input type="checkbox" checked={cookiePreferences.analytics || false} onChange={() => toggleCookie('analytics')} className="accent-blue-600 w-5 h-5" />
                </div>
                <div className="text-gray-500 text-xs mt-1">Les cookies analytics servent à comprendre comment les visiteurs interagissent avec le site. Ils fournissent des informations sur le nombre de visiteurs, le taux de rebond, la source du trafic, etc.</div>
              </div>
              {/* Performance */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Performance</div>
                  <input type="checkbox" checked={cookiePreferences.performance} onChange={() => toggleCookie('performance')} className="accent-blue-600 w-5 h-5" />
                </div>
                <div className="text-gray-500 text-xs mt-1">Les cookies de performance servent à analyser les indicateurs clés de performance du site afin d'offrir une meilleure expérience utilisateur.</div>
              </div>
              {/* Publicité */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Publicité</div>
                  <input type="checkbox" checked={cookiePreferences.advertisement || false} onChange={() => toggleCookie('advertisement')} className="accent-blue-600 w-5 h-5" />
                </div>
                <div className="text-gray-500 text-xs mt-1">Les cookies publicitaires servent à fournir des publicités personnalisées et à mesurer l'efficacité des campagnes publicitaires.</div>
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700" onClick={() => { setCookiePreferences({ essential: true, performance: false, chat: false, functional: false, analytics: false, advertisement: false }); setShowCustomize(false); setShowCookieBanner(false); }}>Tout refuser</button>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded text-sm font-medium hover:bg-blue-50" onClick={() => { handleCustomize(); setShowCustomize(false); setShowCookieBanner(false); }}>Enregistrer mes préférences</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700" onClick={() => { setCookiePreferences({ essential: true, performance: true, chat: true, functional: true, analytics: true, advertisement: true }); setShowCustomize(false); setShowCookieBanner(false); }}>Tout accepter</button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Crisp - ne se charge que si les cookies sont acceptés */}
      {cookiesAccepted && cookiePreferences.chat && (
        <Script id="crisp-chat" strategy="afterInteractive">
          {`
            window.$crisp=[];
            window.CRISP_WEBSITE_ID="3d7e2d27-df4c-464c-8d5e-00e4932cfa67";
            (function(){
              d=document;s=d.createElement("script");
              s.src="https://client.crisp.chat/l.js";
              s.async=1;d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `}
        </Script>
      )}

      {/* Google Analytics - ne se charge que si cookies analytics acceptés */}
      {cookiesAccepted && cookiePreferences.analytics && (
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX'); // Remplace par ton ID GA4
          `}
        </Script>
      )}

      {/* Google Tag Manager - ne se charge que si cookies analytics acceptés */}
      {cookiesAccepted && cookiePreferences.analytics && (
        <>
          {/* GTM Script dans le head */}
          <Script id="gtm-head" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T3KPBWNC');
            `}
          </Script>
          {/* GTM NoScript dans le body */}
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T3KPBWNC" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
          </noscript>
        </>
      )}

      {/* Rappel pour activer le chat si cookies de chat non acceptés - version icône bulle */}
      {cookiesAccepted && !cookiePreferences.chat && !showCookieBanner && (
        <button
          className="fixed right-0 bottom-32 z-[9999] bg-indigo-600 text-white px-2 py-3 rounded-l-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-indigo-700 transition"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.1em', fontSize: '0.85rem', fontWeight: 600 }}
          onClick={() => setShowChatPopup(true)}
          aria-label="Activer le chat en ligne"
        >
          accepte-moi !
        </button>
      )}

      {/* Pop-up d'explication pour activer le chat */}
      {showChatPopup && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <div className="font-bold text-lg mb-2 text-indigo-700 flex items-center gap-2">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6 text-indigo-600'><path strokeLinecap='round' strokeLinejoin='round' d='M8.625 9.75a3.375 3.375 0 116.75 0c0 1.657-1.343 2.25-2.25 2.25-.907 0-2.25.593-2.25 2.25m2.25 3.75h.007v.008h-.007v-.008z' /></svg>
              Activer le chat en ligne
            </div>
            <div className="text-gray-700 text-sm mb-4">Pour discuter avec le support en ligne, vous devez accepter les cookies de chat.</div>
            <div className="flex gap-2 justify-end">
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100 text-sm" onClick={() => setShowChatPopup(false)}>Fermer</button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium hover:bg-indigo-700" onClick={() => {
                setCookiePreferences(prev => ({ ...prev, chat: true }));
                localStorage.setItem('cookiePreferences', JSON.stringify({ ...cookiePreferences, chat: true }));
                setShowChatPopup(false);
              }}>Accepter les cookies de chat</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default appWithTranslation(MyApp); 