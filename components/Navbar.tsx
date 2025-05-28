import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { SunIcon, MoonIcon, ChartBarIcon, GlobeAltIcon, DevicePhoneMobileIcon, MegaphoneIcon, PresentationChartLineIcon, SparklesIcon, PaintBrushIcon } from '@heroicons/react/24/outline';
import { H6, Body2, Button } from './Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutTimeout = useRef<NodeJS.Timeout | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesTimeout = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

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
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Tarifs', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];
  const aboutDropdown = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Qui nous sommes', href: '/about' },
    { name: 'Témoignages', href: '/#testimonials' },
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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-50 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center">
              <img src="/images/logo/conecio_logo.png" alt="Conecio Logo" width={40} height={40} className="mr-2" />
              <H6 className="font-bold">Conecio</H6>
              <Image src="/images/w2.png" alt="Test Image" width={40} height={40} className="ml-4" />
            </Link>
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                item.name === 'Services' ? (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                    tabIndex={0}
                  >
                    <button
                      className="relative px-3 py-2 rounded-md body text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-dark transition-colors group flex items-center focus:outline-none"
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((v) => !v)}
                      onFocus={handleServicesEnter}
                      onBlur={handleServicesLeave}
                    >
                      <span className="relative z-10">Services</span>
                      <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50"
                          onMouseEnter={handleServicesEnter}
                          onMouseLeave={handleServicesLeave}
                        >
                          <ul className="py-2">
                            {serviceMenu.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                                >
                                  <item.icon className="w-5 h-5" />
                                  {item.name}
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
                      className="relative px-3 py-2 rounded-md body text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-dark transition-colors group"
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
                  className="relative px-3 py-2 rounded-md body text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-dark transition-colors group flex items-center focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={aboutOpen}
                  onClick={() => setAboutOpen((v) => !v)}
                  onFocus={handleAboutEnter}
                  onBlur={handleAboutLeave}
                >
                  <span className="relative z-10">À propos de nous</span>
                  <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50"
                      onMouseEnter={handleAboutEnter}
                      onMouseLeave={handleAboutLeave}
                    >
                      <ul className="py-2">
                        {aboutDropdown.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="block px-5 py-2 body text-gray-700 dark:text-gray-200 hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-all rounded-md focus:bg-primary-light/30 dark:focus:bg-primary-dark/30 focus:outline-none"
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
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
          >
            {isDark ? (
              <SunIcon className="h-5 w-5 text-yellow-500" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-700" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 