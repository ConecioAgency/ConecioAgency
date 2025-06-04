import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { H6, Body2, Caption } from './Typography';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: t('footer.services.seo'), href: '/services#seo' },
      { name: t('footer.services.web_design'), href: '/services#web-design' },
      { name: t('footer.services.marketing_mobile'), href: '/services#marketing-mobile' },
      { name: t('footer.services.social_media'), href: '/services#social-media' },
      { name: t('footer.services.content_marketing'), href: '/services#content-marketing' },
      { name: t('footer.services.analytics'), href: '/services#analytics' },
      { name: t('footer.services.branding'), href: '/services#branding' },
    ],
    company: [
      { name: t('footer.company.about'), href: '/about' },
      { name: t('footer.company.pricing'), href: '/pricing' },
      { name: t('footer.company.blog'), href: '/blog' },
      { name: t('footer.company.contact'), href: '/contact' },
    ],
    legal: [
      { name: t('footer.legal.privacy'), href: '/politique-confidentialite' },
    ],
    blog: [
      { name: t('footer.blog.trends'), href: '/blog/tendances-digital-marketing-2025' },
      { name: t('footer.blog.seo_tips'), href: '/blog/astuces-seo-2024' },
      { name: t('footer.blog.content_strategy'), href: '/blog/strategie-contenu-efficace' },
    ],
  };

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/ConecioAgency',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/conecioagency/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 min-h-[400px]">
      {/* Ligne de séparation dégradée */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-light via-secondary-light to-pink-400 opacity-60" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block w-[40px] h-[40px]">
              <Image 
                src="/images/logo/conecio_logo.png" 
                alt="Conecio Logo" 
                width={40} 
                height={40} 
                className="w-full h-full object-contain" 
                priority 
                loading="eager"
                sizes="40px"
              />
            </Link>
            <div className="mb-6 min-h-[100px]">
              <H6 className="mb-4">{t('footer.about_title')}</H6>
              <Body2 className="text-gray-600 dark:text-gray-400">
                {t('footer.description')}
              </Body2>
            </div>
            <div className="flex space-x-4 mt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2, boxShadow: '0 4px 16px #a21caf33' }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 w-6 h-6"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="min-h-[200px]">
            <H6 className="mb-4">{t('footer.services_title')}</H6>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name} className="h-6">
                  <Body2 className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                    <Link href={link.href}>
                      {link.name}
                    </Link>
                  </Body2>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div className="min-h-[200px]">
            <H6 className="mb-4">{t('footer.company_title')}</H6>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name} className="h-6">
                  <Body2 className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                    <Link href={link.href}>
                      {link.name}
                    </Link>
                  </Body2>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div className="min-h-[200px]">
            <H6 className="mb-4">{t('footer.blog_title')}</H6>
            <ul className="space-y-2">
              {footerLinks.blog.map((link) => (
                <li key={link.name} className="h-6">
                  <Body2 className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                    <Link href={link.href}>{link.name}</Link>
                  </Body2>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div className="min-h-[200px]">
            <H6 className="mb-4">{t('footer.legal_title')}</H6>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name} className="h-6">
                  <Body2 className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                    <Link href={link.href}>
                      {link.name}
                    </Link>
                  </Body2>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Caption className="text-gray-500 dark:text-gray-400">
            {t('footer.copyright', { year: currentYear })}
          </Caption>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 