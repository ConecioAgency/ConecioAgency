import Link from 'next/link';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';

type Currency = 'EUR' | 'USD' | 'MAD';
type Period = 'monthly' | 'annual';

const categories = [
  { id: 'free', name: 'free' },
  { id: 'onetime', name: 'onetime' },
  { id: 'pack', name: 'pack' },
  { id: 'social', name: 'social' },
  { id: 'marketing', name: 'marketing' },
  { id: 'web', name: 'web' },
  { id: 'all', name: 'all' },
];

type Offer = {
  id: string;
  category: string;
  price:
    | { EUR: { monthly: number; annual: number }; USD: { monthly: number; annual: number }; MAD: { monthly: number; annual: number } }
    | { EUR: number; USD: number; MAD: number }
    | string;
  popular?: boolean;
};

const offers: Offer[] = [
  { id: 'booster', category: 'pack', price: { EUR: { monthly: 990, annual: 792 }, USD: { monthly: 1078, annual: 862 }, MAD: { monthly: 10780, annual: 8624 } } },
  { id: 'premium', category: 'pack', price: { EUR: { monthly: 1990, annual: 1592 }, USD: { monthly: 2168, annual: 1734 }, MAD: { monthly: 21680, annual: 17344 } }, popular: true },
  { id: 'ultimate', category: 'pack', price: { EUR: { monthly: 3390, annual: 2712 }, USD: { monthly: 3694, annual: 2955 }, MAD: { monthly: 36940, annual: 29552 } } },
  { id: 'web', category: 'web', price: { EUR: { monthly: 150, annual: 120 }, USD: { monthly: 163, annual: 130 }, MAD: { monthly: 1630, annual: 1304 } } },
  { id: 'marketing', category: 'marketing', price: { EUR: { monthly: 250, annual: 200 }, USD: { monthly: 272, annual: 218 }, MAD: { monthly: 2720, annual: 2176 } } },
  { id: 'social', category: 'social', price: { EUR: { monthly: 200, annual: 160 }, USD: { monthly: 218, annual: 174 }, MAD: { monthly: 2180, annual: 1744 } } },
  { id: 'custom', category: 'all', price: 'Sur devis' },
  { id: 'vitrine', category: 'onetime', price: { EUR: 950, USD: 1050, MAD: 10500 } },
  { id: 'pack10posts', category: 'onetime', price: { EUR: 180, USD: 200, MAD: 2000 } },
  { id: 'video', category: 'onetime', price: { EUR: 350, USD: 390, MAD: 3900 } },
  { id: 'audit', category: 'onetime', price: { EUR: 220, USD: 240, MAD: 2400 } },
  { id: 'logo', category: 'onetime', price: { EUR: 120, USD: 130, MAD: 1300 } },
  { id: 'cvpromo', category: 'onetime', price: { EUR: 50, USD: 50, MAD: 500 }, popular: false },
];

// TypeScript helper pour différencier les prix à la demande et récurrents
function isOnetimePrice(price: any): price is { EUR: number; USD: number; MAD: number } {
  return typeof price.EUR === 'number' && typeof price.USD === 'number' && typeof price.MAD === 'number';
}

// Helper pour formater les prix MAD avec espace milliers
function formatPrice(currency: Currency, value: number) {
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

// Helper pour choisir un emoji selon le feature (simple mapping)
function featureIcon(feature: string) {
  if (feature.toLowerCase().includes('utilisateur') || feature.toLowerCase().includes('user')) return '👤';
  if (feature.toLowerCase().includes('conversation')) return '💬';
  if (feature.toLowerCase().includes('site')) return '🌐';
  if (feature.toLowerCase().includes('seo')) return '🔍';
  if (feature.toLowerCase().includes('réseaux') || feature.toLowerCase().includes('social')) return '📱';
  if (feature.toLowerCase().includes('vidéo') || feature.toLowerCase().includes('video')) return '🎬';
  if (feature.toLowerCase().includes('maintenance')) return '🛠️';
  if (feature.toLowerCase().includes('audit')) return '📝';
  if (feature.toLowerCase().includes('design')) return '🎨';
  if (feature.toLowerCase().includes('support')) return '💡';
  if (feature.toLowerCase().includes('contenu') || feature.toLowerCase().includes('content')) return '✍️';
  if (feature.toLowerCase().includes('email')) return '✉️';
  if (feature.toLowerCase().includes('analytics') || feature.toLowerCase().includes('reporting')) return '📊';
  if (feature.toLowerCase().includes('cms')) return '🔗';
  if (feature.toLowerCase().includes('stratégie') || feature.toLowerCase().includes('strategy')) return '🧩';
  if (feature.toLowerCase().includes('accompagnement') || feature.toLowerCase().includes('support')) return '🤝';
  if (feature.toLowerCase().includes('optimisation mobile') || feature.toLowerCase().includes('mobile')) return '📱';
  if (feature.toLowerCase().includes('livraison rapide') || feature.toLowerCase().includes('fast delivery')) return '⚡';
  if (feature.toLowerCase().includes('texte') || feature.toLowerCase().includes('text')) return '📝';
  if (feature.toLowerCase().includes('72h')) return '⏱️';
  if (feature.toLowerCase().includes('campagne') || feature.toLowerCase().includes('campaign')) return '📈';
  if (feature.toLowerCase().includes('sécurité web')) return '🛡️';
  if (feature.toLowerCase().includes('analyse technique') || feature.toLowerCase().includes('technical analysis')) return '🧪';
  if (feature.toLowerCase().includes('recommandation') || feature.toLowerCase().includes('recommendation')) return '📋';
  if (feature.toLowerCase().includes('montage pro') || feature.toLowerCase().includes('pro editing')) return '🎞️';
  if (feature.toLowerCase().includes('hd')) return '🖼️';
  if (feature.toLowerCase().includes('community management')) return '🤳';
  if (feature.toLowerCase().includes('planning éditorial') || feature.toLowerCase().includes('editorial planning')) return '🗓️';
  return '•';
}

export default function Pricing() {
  const { t } = useTranslation('pricing');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('EUR');
  const [isAnnual, setIsAnnual] = useState(false);

  const filteredOffers = selectedCategory === 'all' 
    ? offers 
    : offers.filter((offer) => offer.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-block px-4 py-1 rounded-full bg-gray-800 dark:bg-gray-700 text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-4 uppercase shadow-sm">TARIFS</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
            {t('title')}
          </h1>
        </div>
        <div className="text-center">
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            {t('subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 relative
                  ${selectedCategory === category.id
                    ? category.id === 'free'
                      ? 'bg-green-500 text-white border-green-500 shadow'
                      : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white shadow border border-gray-300 dark:border-gray-600'
                    : category.id === 'free'
                      ? 'bg-white text-green-600 border border-green-400 hover:bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-green-900'
                      : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}
                  ${category.id === 'all' && selectedCategory === 'all' ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-600 dark:text-white' : ''}
                `}
              >
                {category.id === 'free' ? t('categories.free') : t(`categories.${category.id}`)}
              </button>
            ))}
        </div>

        {/* Currency and Period Selector */}
        <div className="max-w-2xl mx-auto mt-16 mb-8 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6">
          {/* Période */}
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 px-1 py-1 shadow-sm text-xs font-semibold">
            <div
              className={`px-3 py-1 rounded-full cursor-pointer transition-all duration-150 ${
                !isAnnual
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setIsAnnual(false)}
            >
              {t('period.monthly')}
            </div>
            <div
              className={`relative flex items-center px-3 py-1 rounded-full cursor-pointer transition-all duration-150 ml-1 ${
                isAnnual
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setIsAnnual(true)}
            >
              {t('period.annual')}
              {isAnnual && (
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
                  selectedCurrency === curr
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                style={{ fontSize: '0.95em', fontWeight: 600 }}
                onClick={() => setSelectedCurrency(curr)}
              >
                {curr === 'EUR' ? '€ EUR' : curr === 'USD' ? '$ USD' : 'DH MAD'}
              </div>
            ))}
          </div>
        </div>

      {/* Pricing grid */}
      <section id="pricing" className="py-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-5">
          {/* Card promotionnelle CV Portfolio */}
          <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 dark:from-purple-600 dark:via-pink-600 dark:to-red-600 rounded-2xl shadow-xl border border-purple-300 dark:border-purple-700 p-6 flex flex-col relative max-w-xs w-full transition-all duration-200 transform hover:scale-105">
            {/* Badge Promotion */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 px-4 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              PROMOTION
            </div>
            {/* Titre */}
            <h2 className="text-xl font-bold mb-2 text-white tracking-tight">{t('offers.cvpromo.name')}</h2>
            {/* Prix */}
            <div className="flex items-end gap-2 mb-2">
              <span className="font-extrabold text-4xl text-white">
                {formatPrice(selectedCurrency, 50)}
              </span>
            </div>
            {/* Description principale */}
            <div className="font-semibold text-white mb-1">
              {t('offers.cvpromo.description')}
            </div>
            {/* Features */}
            <ul className="mb-5 space-y-2 text-left text-[0.98em] text-white">
              {(() => {
                const features = t('offers.cvpromo.features', { returnObjects: true }) as string[];
                return features.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    <span>{f}</span>
                  </li>
                ));
              })()}
            </ul>
            <Link href="/contact" className="mt-auto px-4 py-2 rounded-md bg-white text-purple-600 font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300 group flex items-center gap-2 justify-center text-sm w-fit mx-auto">
              <span>{t('cta.contact')}</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
            {/* Détails */}
            <div className="mt-3 text-xs text-white/80 text-center">{t('offers.cvpromo.details')}</div>
          </div>

          {/* Card spéciale pour l'audit gratuit */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-green-300 dark:border-green-700 p-6 flex flex-col relative max-w-xs w-full transition-all duration-200">
            {/* Petit badge gratuit en haut à gauche */}
            <span className="absolute -top-3 left-4 bg-green-500 text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-sm z-10">GRATUIT</span>
            {/* Titre */}
            <h2 className="text-base font-semibold mb-2 text-green-700 dark:text-green-300 tracking-tight">{t('freeAudit.name')}</h2>
            {/* Prix */}
            <div className="flex items-end gap-2 mb-2">
              <span className="font-extrabold text-3xl text-green-700 dark:text-green-300">{t('freeAudit.price')}</span>
            </div>
            {/* Description principale (en gras) */}
            <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
              {t('freeAudit.description')}
            </div>
            {/* Texte explicatif */}
            <div className="text-gray-500 dark:text-gray-300 text-sm mb-4 min-h-[36px]">
              {t('freeAudit.text')}
            </div>
            {/* Séparateur */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            {/* Features */}
            <ul className="mb-5 space-y-2 text-left text-[0.98em] text-green-900 dark:text-green-200">
              {(() => {
                const featuresRaw = t('freeAudit.features', { returnObjects: true });
                const featuresArr: string[] = Array.isArray(featuresRaw) ? featuresRaw as string[] : [];
                return featuresArr.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-lg">✔️</span>
                    <span>{f}</span>
                  </li>
                ));
              })()}
            </ul>
            <Link href="/contact#devis-gratuit" className="mt-auto px-4 py-2 rounded-md bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition-all duration-300 group flex items-center gap-2 justify-center text-sm">
              <span>{t('freeAudit.cta')}</span>
              <span className="text-white group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
            {/* Détails */}
            <div className="mt-3 text-xs text-green-700 dark:text-green-300 text-center">{t('freeAudit.details')}</div>
          </div>
          {/* Offres classiques */}
          {filteredOffers.map((offer) => {
            const offerT = (key: string) => t(`offers.${offer.id}.${key}`);
            const features = t(`offers.${offer.id}.features`, { returnObjects: true }) as string[];
            const featuresArray = Array.isArray(features) ? features : [];
          return (
            <div 
                key={offer.id}
              className={`bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col relative max-w-xs w-full transition-all duration-200`}
            >
              {/* Badge Most Popular */}
              {offer.popular && (
                <div className="absolute top-5 right-5 bg-green-200 text-green-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  MOST POPULAR
                </div>
              )}
              {/* Badge Promotion */}
              {offer.id === 'cvpromo' && (
                <div className="absolute top-5 left-5 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm animate-bounce">
                  PROMOTION
                </div>
              )}
              {/* Titre */}
                <h2 className="text-base font-semibold mb-2 text-gray-800 dark:text-gray-100 tracking-tight">{offerT('name')}</h2>
              {/* Prix */}
              <div className="flex items-end gap-2 mb-2">
                  <span className={`font-extrabold ${selectedCurrency === 'MAD' ? 'text-4xl text-purple-700 dark:text-purple-300' : 'text-3xl text-gray-900 dark:text-white'}`}>
                  {isOnetimePrice(offer.price)
                      ? formatPrice(selectedCurrency, offer.price[selectedCurrency])
                      : typeof offer.price === 'string'
                        ? offer.price
                        : formatPrice(selectedCurrency, offer.price[selectedCurrency][isAnnual ? 'annual' : 'monthly'])}
                </span>
                {!isOnetimePrice(offer.price) && typeof offer.price !== 'string' && (
                  <span className="text-sm text-gray-400 mb-1">/mois</span>
                )}
              </div>
              {/* Description principale (en gras) */}
              <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {featuresArray[0]}
              </div>
              {/* Texte explicatif */}
              <div className="text-gray-500 dark:text-gray-300 text-sm mb-4 min-h-[36px]">
                  {offerT('description')}
              </div>
              {/* Séparateur */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              {/* Features (sauf le premier déjà mis en avant) */}
              <ul className="mb-5 space-y-2 text-left text-[0.98em]">
                  {featuresArray.slice(1).map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <span className="text-lg">{featureIcon(f)}</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-auto px-4 py-2 rounded-md bg-gray-800 dark:bg-white border border-gray-700 dark:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group flex items-center gap-2 justify-center text-sm w-fit mx-auto">
                  <span className="text-gray-200 dark:text-gray-700 font-medium">{t('cta.contact')}</span>
                <span className="text-indigo-400 dark:text-indigo-500 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
              {/* Détails */}
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">{offerT('details')}</div>
            </div>
          );
        })}
        </div>
      </section>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'fr', ['pricing', 'common'])),
    },
  };
}; 