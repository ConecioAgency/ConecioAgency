import Link from 'next/link';
import { useState } from 'react';

const categories = [
  { id: 'all', name: 'Tous les services' },
  { id: 'web', name: 'Web & Design' },
  { id: 'marketing', name: 'Marketing Digital' },
  { id: 'social', name: 'Social Media' },
  { id: 'pack', name: 'Packs Complets' },
  { id: 'onetime', name: 'À la demande' },
];

const offers = [
  {
    name: 'Pack Booster',
    category: 'pack',
    price: {
      EUR: { monthly: 990, annual: 792 },
      USD: { monthly: 1078, annual: 862 },
      MAD: { monthly: 10780, annual: 8624 },
    },
    description: 'Solution complète pour démarrer votre présence digitale.',
    features: [
      'Site Web (jusqu\'à 5 pages)',
      'Digital Marketing (1 campagne)',
      'Réseaux sociaux (3 posts)',
      'Vidéo (30s à 1mn)',
      'Maintenance (1 mois)',
    ],
    details: 'Parfait pour les startups et petites entreprises qui veulent une présence digitale complète.',
  },
  {
    name: 'Pack Premium',
    category: 'pack',
    price: {
      EUR: { monthly: 1990, annual: 1592 },
      USD: { monthly: 2168, annual: 1734 },
      MAD: { monthly: 21680, annual: 17344 },
    },
    description: 'Solution avancée pour une croissance digitale rapide.',
    features: [
      'Site Web (jusqu\'à 10 pages)',
      'Création de page site web',
      'SEO technique de base',
      'Digital Marketing (2 campagnes)',
      'Réseaux sociaux (10 posts)',
      'Vidéos (2 vidéos)',
      'Maintenance (2 mois)',
    ],
    details: 'Pour les entreprises qui veulent une présence digitale professionnelle et sécurisée.',
    popular: true,
  },
  {
    name: 'Pack Ultimate',
    category: 'pack',
    price: {
      EUR: { monthly: 3390, annual: 2712 },
      USD: { monthly: 3694, annual: 2955 },
      MAD: { monthly: 36940, annual: 29552 },
    },
    description: 'Solution complète pour une transformation digitale totale.',
    features: [
      'Site Web (jusqu\'à 15 pages)',
      'Création de page site web',
      'SEO avancé',
      'Digital Marketing (3 campagnes)',
      'Réseaux sociaux (20 posts)',
      'Vidéos (3 vidéos)',
      'Maintenance (3 mois)',
    ],
    details: 'Pour les entreprises ambitieuses qui veulent une présence digitale premium.',
  },
  {
    name: 'Web & Design',
    category: 'web',
    price: {
      EUR: { monthly: 150, annual: 120 },
      USD: { monthly: 163, annual: 130 },
      MAD: { monthly: 1630, annual: 1304 },
    },
    description: 'Créez une présence web professionnelle.',
    features: [
      'Site web statique/dynamique',
      'Design responsive',
      'Optimisation SEO',
      'Intégration CMS',
      'Maintenance mensuelle',
    ],
    details: 'Pour ceux qui veulent un site web professionnel et performant.',
  },
  {
    name: 'Marketing Digital',
    category: 'marketing',
    price: {
      EUR: { monthly: 250, annual: 200 },
      USD: { monthly: 272, annual: 218 },
      MAD: { monthly: 2720, annual: 2176 },
    },
    description: 'Boostez votre visibilité en ligne.',
    features: [
      'SEO & SEM',
      'Campagnes publicitaires',
      'Content Marketing',
      'Email Marketing',
      'Analytics & Reporting',
    ],
    details: 'Pour les entreprises qui veulent augmenter leur visibilité en ligne.',
  },
  {
    name: 'Social Media Pro',
    category: 'social',
    price: {
      EUR: { monthly: 200, annual: 160 },
      USD: { monthly: 218, annual: 174 },
      MAD: { monthly: 2180, annual: 1744 },
    },
    description: 'Gérez votre présence sur les réseaux sociaux.',
    features: [
      'Gestion de 3 réseaux sociaux',
      'Création de contenu',
      'Community Management',
      'Planning éditorial',
      'Reporting mensuel',
    ],
    details: 'Pour les entreprises qui veulent une présence sociale professionnelle.',
  },
  {
    name: 'Sur-mesure',
    category: 'all',
    price: 'Sur devis',
    description: 'Une solution personnalisée selon vos besoins.',
    features: [
      'Audit personnalisé',
      'Stratégie sur mesure',
      'Accompagnement dédié',
      'Support premium',
    ],
    details: 'Contactez-nous pour une solution 100% adaptée à vos objectifs.',
  },
  {
    name: 'Création site web vitrine',
    category: 'onetime',
    price: {
      EUR: 950,
      USD: 1050,
      MAD: 10500,
    },
    description: 'Un site web professionnel livré clé en main.',
    features: [
      'Jusqu\'à 5 pages',
      'Design personnalisé',
      'Optimisation mobile',
      'Livraison rapide',
    ],
    details: 'Idéal pour les indépendants et PME.',
  },
  {
    name: 'Pack 10 posts Instagram/Facebook',
    category: 'onetime',
    price: {
      EUR: 180,
      USD: 200,
      MAD: 2000,
    },
    description: '10 visuels professionnels pour vos réseaux sociaux.',
    features: [
      'Design sur-mesure',
      'Textes optimisés',
      'Livraison en 72h',
    ],
    details: 'Pour booster votre communication ponctuelle.',
  },
  {
    name: 'Vidéo promotionnelle unique',
    category: 'onetime',
    price: {
      EUR: 350,
      USD: 390,
      MAD: 3900,
    },
    description: 'Vidéo animée ou filmée pour promouvoir votre activité.',
    features: [
      'Storyboard',
      'Montage pro',
      'Livraison HD',
    ],
    details: 'Pour une campagne ou un lancement.',
  },
  {
    name: 'Audit SEO unique',
    category: 'onetime',
    price: {
      EUR: 220,
      USD: 240,
      MAD: 2400,
    },
    description: 'Analyse complète de votre site pour le SEO.',
    features: [
      'Rapport détaillé',
      'Recommandations',
      'Analyse technique',
    ],
    details: 'Pour améliorer votre référencement ponctuellement.',
  },
  {
    name: 'Design de logo',
    category: 'onetime',
    price: {
      EUR: 120,
      USD: 130,
      MAD: 1300,
    },
    description: 'Création d\'un logo professionnel et unique pour votre marque.',
    features: [
      'Design sur-mesure',
      '3 propositions de logo',
      'Livraison HD',
      'Fichiers vectoriels',
    ],
    details: 'Idéal pour les entrepreneurs, startups et PME.',
  },
];

// TypeScript helper pour différencier les prix à la demande et récurrents
function isOnetimePrice(price: any): price is { EUR: number; USD: number; MAD: number } {
  return typeof price.EUR === 'number' && typeof price.USD === 'number' && typeof price.MAD === 'number';
}

// Helper pour formater les prix MAD avec espace milliers
function formatPrice(currency: string, value: number) {
  if (currency === 'MAD') {
    return `DH ${value.toLocaleString('fr-FR')}`;
  }
  if (currency === 'EUR') {
    return `€${value}`;
  }
  if (currency === 'USD') {
    return `$${value}`;
  }
  return `${value}`;
}

// Helper pour choisir un emoji selon le feature (simple mapping)
function featureIcon(feature: string) {
  if (feature.toLowerCase().includes('utilisateur') || feature.toLowerCase().includes('user')) return '👤';
  if (feature.toLowerCase().includes('conversation')) return '💬';
  if (feature.toLowerCase().includes('site')) return '🌐';
  if (feature.toLowerCase().includes('seo')) return '🔍';
  if (feature.toLowerCase().includes('réseaux') || feature.toLowerCase().includes('social')) return '📱';
  if (feature.toLowerCase().includes('vidéo')) return '🎬';
  if (feature.toLowerCase().includes('maintenance')) return '🛠️';
  if (feature.toLowerCase().includes('audit')) return '📝';
  if (feature.toLowerCase().includes('design')) return '🎨';
  if (feature.toLowerCase().includes('support')) return '💡';
  if (feature.toLowerCase().includes('contenu')) return '✍️';
  if (feature.toLowerCase().includes('content marketing')) return '✍️';
  if (feature.toLowerCase().includes('email')) return '✉️';
  if (feature.toLowerCase().includes('analytics') || feature.toLowerCase().includes('reporting')) return '📊';
  if (feature.toLowerCase().includes('cms')) return '🔗';
  if (feature.toLowerCase().includes('stratégie')) return '🧩';
  if (feature.toLowerCase().includes('accompagnement')) return '🤝';
  if (feature.toLowerCase().includes('optimisation mobile')) return '📱';
  if (feature.toLowerCase().includes('livraison rapide')) return '⚡';
  if (feature.toLowerCase().includes('texte')) return '📝';
  if (feature.toLowerCase().includes('72h')) return '⏱️';
  if (feature.toLowerCase().includes('campagne')) return '📈';
  if (feature.toLowerCase().includes('sécurité web')) return '🛡️';
  if (feature.toLowerCase().includes('analyse technique')) return '🧪';
  if (feature.toLowerCase().includes('recommandation')) return '📋';
  if (feature.toLowerCase().includes('montage pro')) return '🎞️';
  if (feature.toLowerCase().includes('hd')) return '🖼️';
  if (feature.toLowerCase().includes('community management')) return '🤳';
  if (feature.toLowerCase().includes('planning éditorial')) return '🗓️';
  return '•';
}

export default function Pricing() {
  const [period, setPeriod] = useState<'monthly' | 'annual'>('annual');
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'MAD'>('EUR');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFeatures, setOpenFeatures] = useState<{ [key: number]: boolean }>({});

  const currencySymbols = {
    EUR: '€',
    USD: '$',
    MAD: 'DH',
  };

  const filteredOffers = selectedCategory === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero */}
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Future-proof plans for scalable growth
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto mb-8">
          Unlock smarter digital presence, happier customers, and a more efficient business
        </p>

        {/* Période et Devise Selector - version compacte */}
        <div className="max-w-2xl mx-auto mb-10 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6">
          {/* Période */}
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 px-1 py-1 shadow-sm text-xs font-semibold">
            <div
              className={`px-3 py-1 rounded-full cursor-pointer transition-all duration-150 ${
                period === 'monthly'
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setPeriod('monthly')}
            >
              Monthly
            </div>
            <div
              className={`relative flex items-center px-3 py-1 rounded-full cursor-pointer transition-all duration-150 ml-1 ${
                period === 'annual'
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setPeriod('annual')}
            >
              Annually
              {period === 'annual' && (
                <span className="ml-2 px-2 py-0.5 rounded-full text-[0.7em] font-bold bg-purple-100 text-purple-600 border border-purple-200" style={{letterSpacing: '0.03em'}}>
                  SAVE UP TO 20%
                </span>
              )}
            </div>
          </div>

          {/* Devise */}
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 px-1 py-1 shadow-sm text-xs font-semibold">
            {(['EUR', 'USD', 'MAD'] as const).map((curr) => (
              <div
                key={curr}
                data-currency={curr}
                className={`px-3 py-1 rounded-full cursor-pointer transition-all duration-150 ${
                  currency === curr
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                style={{ fontSize: '0.95em', fontWeight: 600 }}
                onClick={() => setCurrency(curr)}
              >
                {currencySymbols[curr]} {curr}
              </div>
            ))}
          </div>
        </div>

        {/* Catégories */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing grid */}
      <section id="pricing" className="py-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-5">
          {filteredOffers.map((offer, idx) => {
            return (
              <div 
                key={offer.name} 
                className={`bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col relative max-w-xs w-full transition-all duration-200`}
              >
                {/* Badge Most Popular */}
                {offer.popular && (
                  <div className="absolute top-5 right-5 bg-green-200 text-green-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    MOST POPULAR
                  </div>
                )}
                {/* Titre */}
                <h2 className="text-base font-semibold mb-2 text-gray-800 dark:text-gray-100 tracking-tight">{offer.name}</h2>
                {/* Prix */}
                <div className="flex items-end gap-2 mb-2">
                  <span className={`font-extrabold ${currency === 'MAD' ? 'text-4xl text-purple-700 dark:text-purple-300' : 'text-3xl text-gray-900 dark:text-white'}`}>
                    {isOnetimePrice(offer.price)
                      ? formatPrice(currency, offer.price[currency])
                      : formatPrice(currency, typeof offer.price === 'string' ? 0 : offer.price[currency][period])}
                  </span>
                  {!isOnetimePrice(offer.price) && typeof offer.price !== 'string' && (
                    <span className="text-sm text-gray-400 mb-1">/mois</span>
                  )}
                </div>
                {/* Description principale (en gras) */}
                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {offer.features[0]}
                </div>
                {/* Texte explicatif */}
                <div className="text-gray-500 dark:text-gray-300 text-sm mb-4 min-h-[36px]">
                  {offer.description}
                </div>
                {/* Séparateur */}
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                {/* Features (sauf le premier déjà mis en avant) */}
                <ul className="mb-5 space-y-2 text-left text-[0.98em]">
                  {offer.features.slice(1).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                      <span className="text-lg">{featureIcon(f)}</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="mt-auto px-4 py-2 rounded-md bg-gray-800 dark:bg-white border border-gray-700 dark:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group flex items-center gap-2 justify-center text-sm">
                  <span className="text-gray-200 dark:text-gray-700 font-medium">Demander un devis</span>
                  <span className="text-indigo-400 dark:text-indigo-500 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
                {/* Détails */}
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">{offer.details}</div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
} 