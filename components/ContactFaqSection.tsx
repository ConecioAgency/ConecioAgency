import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedTitle } from './AnimatedTitle';
import { FaChevronDown, FaInfoCircle, FaEuroSign, FaCogs, FaLifeRing, FaShieldAlt } from 'react-icons/fa';
import { H4, H2 } from './Typography';
import SectionTitle from './SectionTitle';

const categories = [
  { key: 'Général', label: 'Général', icon: <FaInfoCircle className="w-4 h-4 mr-2" /> },
  { key: 'Tarifs', label: 'Tarifs', icon: <FaEuroSign className="w-4 h-4 mr-2" /> },
  { key: 'Services', label: 'Services', icon: <FaCogs className="w-4 h-4 mr-2" /> },
  { key: 'Support', label: 'Support', icon: <FaLifeRing className="w-4 h-4 mr-2" /> },
  { key: 'Sécurité', label: 'Sécurité', icon: <FaShieldAlt className="w-4 h-4 mr-2" /> },
];

const faqs = [
  // Général
  {
    category: 'Général',
    icon: <FaInfoCircle className="w-6 h-6 text-indigo-500" />, 
    question: 'Comment Conecio se démarque-t-elle des autres agences digitales ?',
    answer: 'Conecio se distingue par son approche holistique et personnalisée. Nous combinons expertise technique, créativité et stratégie business pour créer des solutions digitales qui génèrent des résultats concrets. Notre équipe d\'experts certifiés et notre méthodologie éprouvée nous permettent d\'offrir un accompagnement premium et des résultats mesurables.'
  },
  {
    category: 'Général',
    icon: <FaInfoCircle className="w-6 h-6 text-indigo-500" />, 
    question: 'Quelle est votre approche pour le développement d\'un projet digital ?',
    answer: 'Notre méthodologie se déroule en 4 phases clés : 1) Analyse approfondie de vos besoins et objectifs business, 2) Élaboration d\'une stratégie sur-mesure, 3) Développement et mise en œuvre des solutions, 4) Suivi et optimisation continue. Chaque phase est documentée et validée avec vous pour garantir l\'alignement parfait avec vos objectifs.'
  },
  {
    category: 'Général',
    icon: <FaInfoCircle className="w-6 h-6 text-indigo-500" />,
    question: 'Combien de temps dure la création d\'un site web ?',
    answer: 'La durée dépend du type de site et de la complexité du projet. Un site vitrine prend généralement 4 à 6 semaines, tandis qu\'un site e-commerce peut nécessiter 8 à 12 semaines. Nous vous fournissons un planning précis dès le début.'
  },
  // Tarifs
  {
    category: 'Tarifs',
    icon: <FaEuroSign className="w-6 h-6 text-pink-500" />, 
    question: 'Quels sont vos tarifs et modes de facturation ?',
    answer: 'Nos tarifs sont transparents et adaptés à chaque projet. Nous proposons des devis personnalisés basés sur vos besoins spécifiques. Les paiements sont échelonnés selon l\'avancement du projet, avec des options de maintenance mensuelle ou annuelle. Contactez-nous pour un devis détaillé adapté à vos objectifs.'
  },
  {
    category: 'Tarifs',
    icon: <FaEuroSign className="w-6 h-6 text-pink-500" />, 
    question: 'Proposez-vous des solutions pour les petites entreprises ?',
    answer: 'Absolument ! Nous avons développé des solutions adaptées aux budgets et besoins des PME. Nos forfaits évolutifs permettent de démarrer avec l\'essentiel et de développer votre présence digitale progressivement. Nous croyons que chaque entreprise mérite une stratégie digitale performante, quelle que soit sa taille.'
  },
  {
    category: 'Tarifs',
    icon: <FaEuroSign className="w-6 h-6 text-pink-500" />,
    question: 'Quels sont les facteurs qui influencent le prix d\'un site web ?',
    answer: 'Le prix dépend de plusieurs critères : type de site (vitrine, e-commerce, sur-mesure), nombre de pages, fonctionnalités spécifiques, design personnalisé, intégrations tierces, etc. Nous réalisons toujours un devis détaillé et transparent.'
  },
  // Services
  {
    category: 'Services',
    icon: <FaCogs className="w-6 h-6 text-green-500" />, 
    question: 'Quels types de services proposez-vous ?',
    answer: 'Nous proposons une gamme complète de services digitaux : création de site web, SEO, SEA, gestion des réseaux sociaux, branding, analytics, campagnes publicitaires, et plus encore. Nous adaptons chaque prestation à vos besoins spécifiques.'
  },
  {
    category: 'Services',
    icon: <FaCogs className="w-6 h-6 text-green-500" />, 
    question: 'Quels sont vos délais moyens pour un projet de site web ?',
    answer: 'Les délais varient selon la complexité du projet. Un site vitrine prend généralement 4-6 semaines, un site e-commerce 8-12 semaines. Nous établissons un planning détaillé dès le début du projet et assurons un suivi régulier pour respecter les délais convenus.'
  },
  {
    category: 'Services',
    icon: <FaCogs className="w-6 h-6 text-green-500" />,
    question: 'Réalisez-vous des sites e-commerce performants ?',
    answer: 'Oui, nous concevons des boutiques en ligne optimisées pour la conversion, la sécurité et la gestion des stocks. Nous intégrons les meilleurs outils de paiement et proposons des solutions évolutives pour accompagner votre croissance.'
  },
  {
    category: 'Services',
    icon: <FaCogs className="w-6 h-6 text-green-500" />,
    question: 'Proposez-vous des services de design sur-mesure ?',
    answer: 'Notre équipe de designers crée des interfaces uniques, modernes et adaptées à votre image de marque. Nous privilégions l\'expérience utilisateur (UX) et l\'esthétique pour maximiser l\'impact de votre site.'
  },
  // Support
  {
    category: 'Support',
    icon: <FaLifeRing className="w-6 h-6 text-blue-500" />, 
    question: 'Quelle est votre politique de maintenance et de support ?',
    answer: 'Nous offrons un support technique réactif 24/7, des mises à jour régulières, des sauvegardes automatiques et une maintenance préventive. Nos clients bénéficient d\'un accès à un portail dédié pour suivre l\'état de leur projet et soumettre des demandes.'
  },
  {
    category: 'Support',
    icon: <FaLifeRing className="w-6 h-6 text-blue-500" />, 
    question: 'Comment fonctionne le suivi de projet ?',
    answer: 'Un chef de projet dédié vous accompagne à chaque étape. Vous recevez des points réguliers, des rapports détaillés et pouvez suivre l\'avancement en temps réel via notre plateforme.'
  },
  // SEO
  {
    category: 'Services',
    icon: <FaCogs className="w-6 h-6 text-green-500" />,
    question: 'Proposez-vous des prestations SEO pour améliorer la visibilité ?',
    answer: 'Oui, nous proposons des audits SEO, l\'optimisation technique, la rédaction de contenus optimisés, le netlinking et le suivi de positionnement. Notre objectif est d\'augmenter durablement votre trafic qualifié.'
  },
  // Sécurité
  {
    category: 'Sécurité',
    icon: <FaShieldAlt className="w-6 h-6 text-yellow-500" />, 
    question: 'Comment assurez-vous la sécurité des données de mes clients ?',
    answer: 'La sécurité est au cœur de nos préoccupations. Nous implémentons les dernières normes de sécurité (RGPD, SSL, cryptage), effectuons des audits réguliers et formons nos clients aux bonnes pratiques. Nos solutions sont hébergées sur des serveurs sécurisés et nous garantissons la confidentialité totale des données.'
  },
  {
    category: 'Sécurité',
    icon: <FaShieldAlt className="w-6 h-6 text-yellow-500" />, 
    question: 'Êtes-vous conforme au RGPD ?',
    answer: 'Oui, toutes nos solutions sont conçues pour être conformes au RGPD. Nous accompagnons également nos clients dans la mise en conformité de leurs propres outils digitaux.'
  },
];

const ContactFaqSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('Général');
  const [mounted, setMounted] = useState(false);
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
          <div className="text-center mb-12">
            <SectionTitle badge="FAQ">
              Questions Fréquentes
            </SectionTitle>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base text-gray-500 dark:text-gray-300 font-normal max-w-2xl mx-auto text-center mb-2"
            >
              Trouvez rapidement la réponse à vos questions selon la thématique.
            </motion.p>
          </div>
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
          <SectionTitle badge="FAQ">
            Questions Fréquentes
          </SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base text-gray-500 dark:text-gray-300 font-normal max-w-2xl mx-auto text-center mb-2"
          >
            Trouvez rapidement la réponse à vos questions selon la thématique.
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
                  {cat.label}
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
                          {faq.icon}
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
              <span className="text-[15px] font-bold text-gray-100 mb-2 block">Vous avez encore des questions ou besoin d'aide&nbsp;?</span>
              <p className="text-[11px] text-gray-300 mb-1">Écrivez-nous à <a href="mailto:conecioagency@gmail.com" className="text-indigo-400 underline">conecioagency@gmail.com</a> pour toute question commerciale.</p>
              <p className="text-[11px] text-gray-300">Pour un problème technique, veuillez <a href="/contact" className="text-indigo-400 underline">contacter le support</a>. (Si vous devez partager des informations privées, vous pouvez aussi <a href="mailto:contact@conecio.com" className="text-indigo-400 underline">nous écrire à contact@conecio.com</a>.)</p>
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