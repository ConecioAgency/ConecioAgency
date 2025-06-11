import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback, memo, useMemo, useRef, useTransition, Suspense } from 'react';
import { appWithTranslation } from 'next-i18next';
import Script from 'next/script';
import Image from 'next/image';
import { roboto } from '../lib/fonts';
import { ThemeProvider } from 'next-themes';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

// Types pour Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useH2ScrollAnimation();
  
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

  // Gestion de Google Analytics en fonction des préférences de cookies
  useEffect(() => {
    if (cookiePreferences.analytics && typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: any[]) => {
        window.dataLayer.push(args);
      };
      gtag('js', new Date());
      gtag('config', 'G-H6W321C56C', {
        'cookie_flags': 'SameSite=None;Secure',
        'cookie_domain': 'auto',
        'cookie_expires': 28 * 24 * 60 * 60, // 28 jours
        'anonymize_ip': true,
        'allow_google_signals': false,
        'allow_ad_personalization_signals': false
      });
    }
  }, [cookiePreferences.analytics]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        
        {/* Préchargement des ressources critiques */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* Préchargement des images critiques */}
        <link
          rel="preload"
          href="/images/logo/logo conecio.svg"
          as="image"
          type="image/svg+xml"
        />
      </Head>

      <main className={`${roboto.className} min-h-screen bg-white dark:bg-gray-900`}>
        <Navbar />
            <Component {...pageProps} />
        <Footer />
        <ScrollToTopButton />
        <AnimatedBubbles />
      </main>

      {/* Google Analytics - Chargé uniquement si les cookies analytics sont acceptés */}
      {cookiePreferences.analytics && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-H6W321C56C"
            strategy="afterInteractive"
            onLoad={() => {
              console.log('Google Analytics chargé avec succès');
            }}
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              const gtag = (...args) => {
                window.dataLayer.push(args);
              };
              gtag('js', new Date());
              gtag('config', 'G-H6W321C56C', {
                'cookie_flags': 'SameSite=None;Secure',
                'cookie_domain': 'auto',
                'cookie_expires': 28 * 24 * 60 * 60,
                'anonymize_ip': true,
                'allow_google_signals': false,
                'allow_ad_personalization_signals': false
              });
            `}
          </Script>
        </>
      )}

      {showCookieBanner && (
        <CookieBanner
          onAccept={handleAcceptAll}
          onCustomize={handleCustomize}
          onReject={handleRejectAll}
        />
      )}

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp); 