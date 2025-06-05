import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedTitle } from './AnimatedTitle';
import { FaChevronDown, FaInfoCircle, FaEuroSign, FaCogs, FaLifeRing, FaShieldAlt } from 'react-icons/fa';
import { H4, H2 } from './Typography';
import SectionTitle from './SectionTitle';
import { useTranslation } from 'next-i18next';

const categories = [
  { key: 'Général', label: 'Général', icon: <FaInfoCircle className="w-4 h-4 mr-2" /> },
  { key: 'Tarifs', label: 'Tarifs', icon: <FaEuroSign className="w-4 h-4 mr-2" /> },
  { key: 'Services', label: 'Services', icon: <FaCogs className="w-4 h-4 mr-2" /> },
  { key: 'Support', label: 'Support', icon: <FaLifeRing className="w-4 h-4 mr-2" /> },
  { key: 'Sécurité', label: 'Sécurité', icon: <FaShieldAlt className="w-4 h-4 mr-2" /> },
];

const ContactFaqSection = () => {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState('Général');
  const [mounted, setMounted] = useState(false);

  // Récupère dynamiquement les questions traduites
  const faqs = t('faq.questions', { returnObjects: true }) as Array<any>;

  // Associe une icône à chaque catégorie
  const getIcon = (category: string) => {
    switch (category) {
      case 'Général':
        return <FaInfoCircle className="w-6 h-6 text-indigo-500" />;
      case 'Tarifs':
        return <FaEuroSign className="w-6 h-6 text-pink-500" />;
      case 'Services':
        return <FaCogs className="w-6 h-6 text-green-500" />;
      case 'Support':
        return <FaLifeRing className="w-6 h-6 text-blue-500" />;
      case 'Sécurité':
        return <FaShieldAlt className="w-6 h-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  const filteredFaqs = faqs.filter(faq => faq.category === selectedCategory);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0 bg-[url('/images/withdraw-bg.png')] bg-center bg-no-repeat bg-cover" />
        </div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="flex flex-col items-center mb-4">
            <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold text-base tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('faq.badge')}</span>
            </span>
          </div>
          <div className="flex flex-col items-center w-full">
            <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent w-full">
              {t('faq.title')}
            </AnimatedTitle>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base text-gray-500 dark:text-gray-300 font-normal max-w-2xl mx-auto text-center mb-2"
          >
            {t('faq.subtitle')}
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[url('/images/withdraw-bg.png')] bg-center bg-no-repeat bg-cover" />
      </div>
      <div className="container mx-auto px-4 relative z-10 font-inter">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center mb-4">
            <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold text-base tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('faq.badge')}</span>
            </span>
          </div>
          <div className="flex flex-col items-center w-full">
            <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent w-full">
              {t('faq.title')}
            </AnimatedTitle>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base text-gray-500 dark:text-gray-300 font-normal max-w-2xl mx-auto text-center mb-2"
          >
            {t('faq.subtitle')}
          </motion.p>
        </div>

        {/* Grille FAQ + Bloc aide */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Colonne FAQ */}
          <div className="flex-1 min-w-0">
            {/* Catégories */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex items-center px-5 py-2 rounded-full font-semibold border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs
                    ${selectedCategory === cat.key
                      ? 'bg-indigo-600 text-white shadow-lg border-indigo-600'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700'}
                  `}
                >
                  {cat.icon}
                  {t(`faq.categories.${cat.key}`)}
                </button>
              ))}
            </div>

            {/* Liste des questions filtrées */}
            <AnimatePresence mode="wait">
              <div className="space-y-5">
                {filteredFaqs.map((faq, idx) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between py-1.5 px-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer">
                        <div className="flex items-center gap-2">
                          {getIcon(faq.category)}
                          <span className="text-[15px] font-bold text-gray-900 dark:text-white">
                            {faq.question}
                          </span>
                        </div>
                        <FaChevronDown className="w-3.5 h-3.5 text-indigo-500 transform transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <div className="py-3 px-6 md:px-10 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mt-1">
                        <p className="font-inter font-normal text-[16px] leading-[1.8] text-gray-800 dark:text-gray-200 whitespace-pre-line">
                          {highlightKeywords(formatDashes(faq.answer))}
                        </p>
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>

          {/* Bloc aide à droite */}
          <div className="md:w-72 w-full bg-gray-900 rounded-xl shadow border border-gray-700 p-4 flex flex-col justify-between min-w-[180px] max-w-xs mx-auto md:mx-0">
            <div>
              <span className="text-[15px] font-bold text-gray-100 mb-2 block" dangerouslySetInnerHTML={{ __html: t('faq.help_title') }} />
              <p className="text-[11px] text-gray-300 mb-1" dangerouslySetInnerHTML={{ __html: t('faq.help_commercial') }} />
              <p className="text-[11px] text-gray-300" dangerouslySetInnerHTML={{ __html: t('faq.help_tech') }} />
            </div>
            <div className="flex justify-end mt-3">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" /></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Met en gras les mots-clés importants dans la réponse
function highlightKeywords(text: string) {
  const keywords = [
    'expertise technique',
    'créativité',
    'stratégie business',
    'solutions digitales',
    'résultats concrets',
    'experts certifiés',
    'méthodologie éprouvée',
    'accompagnement premium',
    'résultats mesurables',
    'analyse approfondie',
    'stratégie sur-mesure',
    'développement',
    'mise en œuvre',
    'suivi',
    'optimisation continue',
    'devis personnalisés',
    'support technique',
    'sécurité',
    'RGPD',
    'SEO',
    'SEA',
    'branding',
    'analytics',
    'campagnes publicitaires',
    'design personnalisé',
    'intégrations tierces',
    'boutiques en ligne',
    'conversion',
    'gestion des stocks',
    'paiement',
    'solutions évolutives',
    'design sur-mesure',
    'expérience utilisateur',
    'maintenance',
    'sauvegardes automatiques',
    'confidentialité',
    'audits',
    'netlinking',
    'trafic qualifié',
    'cryptage',
    'serveurs sécurisés',
    'conformité',
  ];
  let result = text;
  keywords.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    result = result.replace(regex, '<strong>$1</strong>');
  });
  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

// Force un retour à la ligne après chaque tiret suivi d'un espace
function formatDashes(text: string) {
  return text.replace(/ - /g, '\n- ');
}

export default ContactFaqSection; 