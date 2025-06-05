import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { SunIcon, MoonIcon, ChartBarIcon, GlobeAltIcon, DevicePhoneMobileIcon, MegaphoneIcon, PresentationChartLineIcon, SparklesIcon, PaintBrushIcon } from '@heroicons/react/24/outline';
import { H6, Body2, Button } from './Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutTimeout = useRef<NodeJS.Timeout | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesTimeout = useRef<NodeJS.Timeout | null>(null);
  const [languageOpen, setLanguageOpen] = useState(false);

  const router = useRouter();
  const { i18n, t } = useTranslation('common');
  const locale = i18n.language;

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    localStorage.setItem('darkMode', (!isDark).toString());
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.services'), href: '/services' },
    { name: t('navigation.pricing'), href: '/pricing' },
    { name: t('navigation.blog'), href: '/blog' },
    { name: t('navigation.contact'), href: '/contact' },
  ];
  const aboutDropdown = [
    { name: t('menu.dropdown.about'), href: '/about' },
    { name: t('menu.dropdown.services'), href: '/services' },
    { name: t('menu.dropdown.portfolio'), href: '/portfolio' },
    { name: t('menu.dropdown.blog'), href: '/blog' },
    { name: t('menu.dropdown.contact'), href: '/contact' },
    { name: t('menu.dropdown.careers'), href: '/careers' },
    { name: t('menu.dropdown.faq'), href: '/faq' },
    { name: t('menu.dropdown.privacy'), href: '/privacy' },
    { name: t('menu.dropdown.terms'), href: '/terms' },
  ];

  const serviceMenu = [
    { name: 'SEO & SEM', href: '/services#seo-sem', icon: ChartBarIcon },
    { name: 'Web Design', href: '/services#web-design', icon: GlobeAltIcon },
    { name: 'Marketing Mobile', href: '/services#marketing-mobile', icon: DevicePhoneMobileIcon },
    { name: 'Social Media', href: '/services#social-media', icon: MegaphoneIcon },
    { name: 'Content Creator', href: '/services#content-creator', icon: PresentationChartLineIcon },
    { name: 'UX/UI Design', href: '/services#ux-ui-design', icon: PaintBrushIcon },
    { name: 'Innovation Digitale', href: '/services#innovation-digitale', icon: SparklesIcon }
  ];

  const handleAboutEnter = () => {
    if (aboutTimeout.current) clearTimeout(aboutTimeout.current);
    setAboutOpen(true);
  };
  const handleAboutLeave = () => {
    aboutTimeout.current = setTimeout(() => setAboutOpen(false), 180);
  };

  const handleServicesEnter = () => {
    if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
    setServicesOpen(true);
  };
  const handleServicesLeave = () => {
    servicesTimeout.current = setTimeout(() => setServicesOpen(false), 180);
  };

  const handleServiceClick = (href: string) => {
    router.push(href).then(() => {
      setTimeout(() => {
        const id = href.split('#')[1];
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 100);
    });
  };

  const changeLanguage = (lng: string) => {
    if (lng === i18n.language) return;
    router.push(router.asPath, router.asPath, { locale: lng });
    if (lng === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 shadow-lg dark:bg-gray-800/95 backdrop-blur-md'
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center group">
              <img 
                src="/images/logo/logo conecio.svg" 
                alt="Conecio Logo" 
                width={120} 
                height={20} 
                className="w-[80px] h-auto sm:w-[100px] md:w-[120px] transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center gap-4">
            <div className="ml-6 flex items-baseline space-x-3">
              {navItems.map((item, index) => (
                item.name === t('navigation.services') ? (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                    tabIndex={0}
                  >
                    <button
                      className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-dark transition-all duration-200 group flex items-center focus:outline-none focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50"
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((v) => !v)}
                      onFocus={handleServicesEnter}
                      onBlur={handleServicesLeave}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <svg className={`w-3 h-3 ml-1 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden"
                          onMouseEnter={handleServicesEnter}
                          onMouseLeave={handleServicesLeave}
                        >
                          <ul className="py-2">
                            {serviceMenu.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-200 hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-all duration-200"
                                >
                                  <item.icon className="w-4 h-4 text-primary-light dark:text-primary-dark" />
                                  <span>{item.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-dark transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-primary-light to-secondary-light rounded-full transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </motion.div>
                )
              ))}
              <div className="relative group"
                onMouseEnter={handleAboutEnter}
                onMouseLeave={handleAboutLeave}
                tabIndex={0}
              >
                <button
                  className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-dark transition-all duration-200 group flex items-center focus:outline-none focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50"
                  aria-haspopup="true"
                  aria-expanded={aboutOpen}
                  onClick={() => setAboutOpen((v) => !v)}
                  onFocus={handleAboutEnter}
                  onBlur={handleAboutLeave}
                >
                  <span className="relative z-10">{t('menu.more_info')}</span>
                  <svg className={`w-3 h-3 ml-1 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden"
                      onMouseEnter={handleAboutEnter}
                      onMouseLeave={handleAboutLeave}
                    >
                      <ul className="py-2">
                        {aboutDropdown.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-200 hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-all duration-200 focus:outline-none focus:bg-primary-light/20 dark:focus:bg-primary-dark/20"
                              tabIndex={0}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="ml-4 flex items-center gap-3">
              <Link
                href="/contact"
                className="btn-main btn-main--dark group text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary-light/20 dark:hover:shadow-primary-dark/20 focus:outline-none focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50"
              >
                <span>{t('navigation.audit')}</span>
                <span className="arrow group-hover:translate-x-1 transition-transform duration-200 ml-1">→</span>
              </Link>
              <div className="relative group">
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-dark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50"
                >
                  <img
                    src={`/images/flags/${i18n.language}.svg`}
                    alt={i18n.language.toUpperCase()}
                    className="w-5 h-5 rounded-sm shadow-sm"
                  />
                  <span className="uppercase">{i18n.language}</span>
                  <svg className={`w-3 h-3 transition-transform duration-200 ${languageOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <AnimatePresence>
                  {languageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden"
                    >
                      <ul className="py-2">
                        {[
                          { code: 'fr', name: 'Français' },
                          { code: 'en', name: 'English' },
                          { code: 'es', name: 'Español' },
                          { code: 'ar', name: 'العربية' }
                        ].map((lang) => (
                          <li key={lang.code}>
                            <button
                              onClick={() => {
                                changeLanguage(lang.code);
                                setLanguageOpen(false);
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-900 dark:text-gray-200 hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-all duration-200"
                            >
                              <img
                                src={`/images/flags/${lang.code}.svg`}
                                alt={lang.name}
                                className="w-5 h-5 rounded-sm shadow-sm"
                              />
                              <span>{lang.name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Switch jour/nuit accessible */}
          <button
            onClick={toggleDarkMode}
            aria-label={isDark ? "Activer le mode jour" : "Activer le mode nuit"}
            className="flex items-center rounded-lg px-1.5 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:shadow-primary-light/20 dark:hover:shadow-primary-dark/20 focus:outline-none focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50"
          >
            {/* Soleil */}
            <span className={`p-0.5 rounded-full transition-all duration-200 ${!isDark ? 'bg-white scale-110' : 'scale-100'}`}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-400">
                <circle cx="12" cy="12" r="5" strokeWidth="2" />
                <path strokeWidth="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <span className="sr-only">Mode jour</span>
            </span>
            {/* Lune */}
            <span className={`p-0.5 rounded-full transition-all duration-200 ${isDark ? 'bg-white scale-110' : 'scale-100'}`}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-700 dark:text-gray-200">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.75 15A9.72 9.72 0 0 1 18 15.75c-5.39 0-9.75-4.36-9.75-9.75 0-1.33.27-2.6.75-3.75A9.75 9.75 0 0 0 3 11.25C3 16.64 7.36 21 12.75 21a9.75 9.75 0 0 0 9-6z" />
                <circle cx="18" cy="6" r="1" fill="currentColor"/>
              </svg>
              <span className="sr-only">Mode nuit</span>
            </span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 