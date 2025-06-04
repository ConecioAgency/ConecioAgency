import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback, memo, useMemo, useRef, useTransition, Suspense } from 'react';
import { appWithTranslation } from 'next-i18next';
import Script from 'next/script';
import Image from 'next/image';

// Import dynamique des composants non critiques avec préchargement
const Navbar = dynamic(() => import('../components/Navbar'), { 
  ssr: true,
  loading: () => <div className="h-16 bg-white dark:bg-gray-900 animate-pulse" />
});

const Footer = dynamic(() => import('../components/Footer'), { 
  ssr: true,
  loading: () => <div className="h-64 bg-white dark:bg-gray-900 animate-pulse" />
});

const AnimatedBubbles = dynamic(() => import('../components/AnimatedBubbles'), { 
  ssr: false,
  loading: () => null
});

const ScrollToTopButton = dynamic(() => import('../components/ScrollToTopButton'), { 
  ssr: false,
  loading: () => null
});

// Types optimisés avec des valeurs littérales et des unions discriminées
type CookieType = 'essential' | 'performance' | 'chat' | 'functional' | 'analytics' | 'advertisement';
type CookiePreferences = Readonly<Record<CookieType, boolean>>;

// Constantes optimisées avec des valeurs littérales et des objets gelés
const DEFAULT_COOKIE_PREFS = Object.freeze({
  essential: true,
  performance: false,
  chat: false,
  functional: false,
  analytics: false,
  advertisement: false
} as const);

const ACCEPTED_COOKIE_PREFS = Object.freeze({
  essential: true,
  performance: true,
  chat: true,
  functional: true,
  analytics: true,
  advertisement: true
} as const);

// Styles optimisés pour les polices avec preload et font-display
const fontStyles = `
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1Mu4mxK.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1Mu4mxK.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1Mu4mxK.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`;

// Composants optimisés avec memo et types stricts
const CookieBanner = memo(({ onAccept, onCustomize, onReject }: {
  readonly onAccept: () => void;
  readonly onCustomize: () => void;
  readonly onReject: () => void;
}) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={bannerRef}
      className="fixed bottom-0 left-0 w-full z-[9999] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-gray-900 dark:text-gray-100"
      style={{ 
        contain: 'layout style paint',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
        willChange: 'opacity, transform'
      }}
    >
      <div className="flex-1 min-w-0">
        <div className="font-bold text-gray-900 dark:text-gray-100 text-base mb-1 md:mb-0">Nous respectons votre vie privée</div>
        <div className="text-gray-700 dark:text-gray-200 text-sm md:inline-block md:ml-0">
          Nous utilisons des cookies pour améliorer votre expérience de navigation, proposer des contenus ou publicités personnalisés et analyser notre trafic. En cliquant sur « Tout accepter », vous consentez à l'utilisation de ces cookies. <a href="/politique-confidentialite" className="text-blue-600 dark:text-blue-400 underline ml-1" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>
        </div>
      </div>
      <div className="flex flex-shrink-0 gap-2 mt-2 md:mt-0">
        <button
          className="px-4 py-2 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded transition hover:bg-blue-50 dark:hover:bg-blue-900 text-sm font-medium"
          onClick={onCustomize}
          style={{ contain: 'layout style paint' }}
        >
          Personnaliser
        </button>
        <button
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded transition hover:bg-blue-700 dark:hover:bg-blue-600 text-sm font-medium"
          onClick={onReject}
          style={{ contain: 'layout style paint' }}
        >
          Tout refuser
        </button>
        <button
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded transition hover:bg-blue-700 dark:hover:bg-blue-600 text-sm font-medium"
          onClick={onAccept}
          style={{ contain: 'layout style paint' }}
        >
          Tout accepter
        </button>
      </div>
    </div>
  );
});

CookieBanner.displayName = 'CookieBanner';

// Hook optimisé pour l'animation des h2 avec IntersectionObserver et RAF
function useH2ScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const elements = document.querySelectorAll('h2.h2-animated');
    if (!elements.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        startTransition(() => {
          requestAnimationFrame(() => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('h2-animated-visible');
              }
            });
          });
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    elements.forEach(el => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);
}

function MyApp({ Component, pageProps }: AppProps) {
  useH2ScrollAnimation();
  
  // États optimisés avec des valeurs initiales
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(DEFAULT_COOKIE_PREFS);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Chargement initial des préférences avec useMemo et localStorage
  const savedPreferences = useMemo(() => {
    if (typeof window === 'undefined') return null;
    try {
      const prefs = localStorage.getItem('cookiePreferences');
      return prefs ? JSON.parse(prefs) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (savedPreferences) {
      startTransition(() => {
        setCookiePreferences(savedPreferences);
        setCookiesAccepted(true);
      });
    }
  }, [savedPreferences]);

  // Handlers optimisés avec useCallback et types stricts
  const handleAcceptAll = useCallback(() => {
    startTransition(() => {
      setCookiePreferences(ACCEPTED_COOKIE_PREFS);
      try {
        localStorage.setItem('cookiePreferences', JSON.stringify(ACCEPTED_COOKIE_PREFS));
      } catch {
        // Gestion silencieuse des erreurs de stockage
      }
      setCookiesAccepted(true);
      setShowCookieBanner(false);
    });
  }, []);

  const handleRejectAll = useCallback(() => {
    startTransition(() => {
      setCookiePreferences(DEFAULT_COOKIE_PREFS);
      try {
        localStorage.setItem('cookiePreferences', JSON.stringify(DEFAULT_COOKIE_PREFS));
      } catch {
        // Gestion silencieuse des erreurs de stockage
      }
      setCookiesAccepted(true);
      setShowCookieBanner(false);
    });
  }, []);

  const handleCustomize = useCallback(() => {
    startTransition(() => {
      try {
        localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
      } catch {
        // Gestion silencieuse des erreurs de stockage
      }
      setCookiesAccepted(cookiePreferences.essential);
      setShowCookieBanner(false);
    });
  }, [cookiePreferences]);

  const toggleCookie = useCallback((type: CookieType) => {
    if (type === 'essential') return;
    startTransition(() => {
      setCookiePreferences(prev => ({ ...prev, [type]: !prev[type] }));
    });
  }, []);

  return (
    <>
      <Head>
        <title>Conecio - Agence Web Créative</title>
        <meta name="description" content="Conecio - Votre partenaire pour des solutions web innovantes et créatives" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <link rel="icon" type="image/png" href="/images/logo/conecio_logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        
        {/* Préchargement des ressources critiques */}
        <link rel="preload" href="/images/logo/conecio_logo.png" as="image" type="image/png" />
        <link rel="preload" href="/images/hero_landing.png" as="image" type="image/png" />
        
        {/* Optimisation des polices */}
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Optimisation des métadonnées */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Optimisation du cache */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
        
        <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      </Head>

      <Suspense fallback={<div className="h-screen bg-white dark:bg-gray-900 animate-pulse" />}>
        <Navbar />
        <AnimatedBubbles />
        <Component {...pageProps} />
        <Footer />
        <ScrollToTopButton />
      </Suspense>

      {showCookieBanner && (
        <CookieBanner
          onAccept={handleAcceptAll}
          onCustomize={handleCustomize}
          onReject={handleRejectAll}
        />
      )}

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

      {cookiesAccepted && cookiePreferences.analytics && (
        <>
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `}
          </Script>
          <Script id="gtm-head" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T3KPBWNC');
            `}
          </Script>
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T3KPBWNC" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
          </noscript>
        </>
      )}
    </>
  );
}

export default appWithTranslation(MyApp); 