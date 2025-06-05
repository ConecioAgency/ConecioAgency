import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const gridClasses = [
  // Grande card (gauche, hauteur égale à la colonne de droite)
  'md:col-span-4 md:row-span-3 h-64 md:h-96',
  // Petite 1 (droite haut)
  'md:col-span-2 md:row-span-1 h-32',
  // Petite 2 (droite milieu)
  'md:col-span-2 md:row-span-1 h-32',
  // Petite 3 (droite bas)
  'md:col-span-2 md:row-span-1 h-32',
];

const bentoGrid = [
  // [grande, petite1, petite2, petite3]
  [0, 1, 2, 3],
  [1, 2, 0, 3],
  [2, 0, 1, 3],
  [3, 0, 1, 2],
];

const OurAgency = () => {
  const { t } = useTranslation('common');
  const [selected, setSelected] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const order = bentoGrid[selected];

  const services = [
    {
      icon: "✒️",
      title: t('agency.service_1_title'),
      desc: t('agency.service_1_desc'),
      image: "/images/character/a-creative-character--young-designer--sitting-at-a.webp",
      points: [
        t('agency.service_1_point_1'),
        t('agency.service_1_point_2'),
        t('agency.service_1_point_3'),
      ]
    },
    {
      icon: "🎬",
      title: t('agency.service_2_title'),
      desc: t('agency.service_2_desc'),
      image: "/images/character/a-character--animator-or-storyteller--in-front-of-.webp",
      points: [
        t('agency.service_2_point_1'),
        t('agency.service_2_point_2'),
        t('agency.service_2_point_3'),
      ]
    },
    {
      icon: "📱",
      title: t('agency.service_3_title'),
      desc: t('agency.service_3_desc'),
      image: "/images/character/a-social-media-manager-character-creating-and-post.webp",
      points: [
        t('agency.service_3_point_1'),
        t('agency.service_3_point_2'),
        t('agency.service_3_point_3'),
      ]
    },
    {
      icon: "🖥️",
      title: t('agency.service_4_title'),
      desc: t('agency.service_4_desc'),
      image: "/images/character/a-motion-designer-character-working-on-a-computer-.webp",
      points: [
        t('agency.service_4_point_1'),
        t('agency.service_4_point_2'),
        t('agency.service_4_point_3'),
      ]
    }
  ];

  const explanations = [
    "Création de logos sur-mesure adaptés à votre univers.",
    "Définition d'une charte graphique cohérente et impactante.",
    "Accompagnement pour décliner votre identité sur tous vos supports."
  ];

  return (
    <section ref={ref} className="relative py-16 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-4">
          <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold text-base tracking-widest animate__animated animate__zoomInDown" style={{ letterSpacing: '0.08em' }}>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('agency.section_title')}</span>
          </span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold font-heading mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          {t('agency.give_life')}
        </motion.h2>
        <p className="body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center mb-8">{t('agency.intro')}</p>
        <p className="body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center mb-8">{t('agency.creation_services')}</p>
        <div className="grid md:grid-cols-6 md:grid-rows-3 gap-2 mb-8">
          {order.map((serviceIdx, gridIdx) => {
            const service = services[serviceIdx];
            const isActive = gridIdx === 0;
            return (
              <motion.div
                key={serviceIdx}
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onClick={() => setSelected(serviceIdx)}
                className={`cursor-pointer group relative flex flex-col items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-900 transition-all duration-300 overflow-hidden ${gridClasses[gridIdx]} ${isActive ? 'z-10 scale-105 md:scale-110 ring-2 ring-indigo-400/40' : 'opacity-80'}`}
                style={{ minWidth: 0 }}
              >
                {/* Glow effet autour de la grande card */}
                {isActive && (
                  <div className="absolute inset-0 rounded-3xl pointer-events-none blur-2xl z-0"
                    style={{
                      boxShadow: '0 0 120px 24px rgba(168,85,247,0.7), 0 0 80px 16px rgba(56,189,248,0.6)'
                    }}
                  />
                )}
                {isActive ? (
                  // Layout : image à gauche, texte à droite, texte centré verticalement et horizontalement
                  <div className="flex flex-col md:flex-row items-center justify-center w-full h-full gap-4 md:gap-10 py-4 md:py-0 z-10">
                    {/* Image principale centrée, fond doux, padding */}
                    <div className="flex items-center justify-center w-32 h-32 md:w-64 md:h-64 bg-gray-50 dark:bg-gray-800 rounded-lg p-2 mb-4 md:mb-0 md:ml-4">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="object-contain w-full h-full"
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                      />
                    </div>
                    {/* Texte */}
                    <div className="flex flex-col justify-center items-center md:items-start flex-1 h-full text-center md:text-left">
                      <span className="text-3xl mb-2">{service.icon}</span>
                      <h3 className="text-2xl md:text-3xl font-extrabold mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(99,102,241,0.15)]">{service.title}</h3>
                      <p className="text-lg md:text-xl font-medium mb-2 text-gray-800 dark:text-gray-100 drop-shadow-[0_1px_4px_rgba(99,102,241,0.10)]">{service.desc}</p>
                      <ul className="mt-2 space-y-1 text-sm md:text-base text-gray-700 dark:text-gray-200 max-w-xs mx-auto md:mx-0">
                        {service.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2 justify-center md:justify-start"><span className="mt-1 text-indigo-400">-</span> <span>{pt}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Image en fond avec opacité plus forte en light, faible en dark */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-30 dark:opacity-10"
                    />
                    <span className={`text-2xl mb-1 z-10 ${isActive ? '' : 'opacity-60'}`}>{service.icon}</span>
                    <h3 className="text-base md:text-lg font-bold text-center mb-1 z-10 text-indigo-600 dark:text-pink-400">{service.title}</h3>
                    <p className={`text-center text-xs md:text-sm z-10 ${isActive ? 'font-medium' : 'opacity-70'}`}>{service.desc}</p>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <a href="/contact" className="btn-main btn-main--dark group">
            <span>{t('agency.order_btn')}</span>
            <span className="arrow group-hover:translate-x-1 transition-transform ml-2">→</span>
          </a>
        </motion.div>
        <p className="body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center mb-8 mt-10">{t('agency.slogan')}</p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-4 text-xs text-indigo-200 text-center dark:text-indigo-600"
        >
          {t('agency.digital_creative')}
        </motion.div>
      </div>
    </section>
  );
};

export default OurAgency;
