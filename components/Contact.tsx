import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { AnimatedTitle } from './AnimatedTitle';

const REQUEST_TYPES = [
  "Demande d'information",
  'Demande de devis',
  'Demande de partenariat',
  'Autre',
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedType, setSelectedType] = useState(REQUEST_TYPES[0]);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setValue('requestType', selectedType);
  }, [selectedType, setValue]);

  if (!mounted) return null;

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    reset();
    setSelectedType(REQUEST_TYPES[0]);
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email',
      content: 'contact@conecio.com',
      link: 'mailto:contact@conecio.com',
    },
    {
      icon: PhoneIcon,
      title: 'Téléphone',
      content: '+33 1 23 45 67 89',
      link: 'tel:+33123456789',
    },
    {
      icon: MapPinIcon,
      title: 'Adresse',
      content: '123 Rue du Digital, 75001 Paris',
      link: 'https://maps.google.com',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex flex-col items-center mb-4">
            <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold text-base tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">CONTACT</span>
            </span>
          </div>
          <div className="flex flex-col items-center w-full">
            <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent w-full">
              Contactez-nous
            </AnimatedTitle>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Discutons de votre projet et voyons comment nous pouvons vous aider à atteindre vos objectifs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
          >
            <form
              action="https://formspree.io/f/xzzrnbrk"
              method="POST"
              className="space-y-6"
            >
              {/* Badges toggle group premium pour le type de demande */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Spécifiez votre demande :
                </label>
                <div className="flex gap-1 bg-gray-800 dark:bg-gray-900 p-1 rounded-full w-fit mx-auto mb-6">
                  {REQUEST_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`px-3 py-1.5 text-xs rounded-full font-semibold transition-all duration-200
                        ${selectedType === type
                          ? 'bg-white/10 text-white shadow-inner font-bold'
                          : 'bg-white/0 text-gray-300 hover:bg-white/10 hover:text-white'}
                      `}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <input type="hidden" name="requestType" value={selectedType} />
                {errors.requestType && (
                  <p className="mt-1 text-sm text-red-500">Veuillez sélectionner un type de demande</p>
                )}
              </div>

              {/* Champs supplémentaires pour un formulaire plus complet */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom complet*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">Le nom est requis</p>
                  )}
                </div>
                <div>
                  <label htmlFor="sector" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Secteur d'activité*
                  </label>
                  <select
                    id="sector"
                    name="sector"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                    defaultValue=""
                  >
                    <option value="" disabled>Choisissez un secteur</option>
                    <option value="Informatique">Informatique</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Santé">Santé</option>
                    <option value="Finance">Finance</option>
                    <option value="Éducation">Éducation</option>
                    <option value="Immobilier">Immobilier</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Industrie">Industrie</option>
                    <option value="Tourisme">Tourisme</option>
                    <option value="Autre">Autre</option>
                  </select>
                  {errors.sector && (
                    <p className="mt-1 text-sm text-red-500">Le secteur d'activité est requis</p>
                  )}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom de l'entreprise*
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    autoComplete="organization"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-500">Le nom de l'entreprise est requis</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Téléphone*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    autoComplete="tel"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">Le téléphone est requis</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    E-mail*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">Un email valide est requis</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">Le message est requis</p>
                )}
              </div>

              {/* Cloudflare Turnstile Captcha */}
              <div className="my-4">
                <div
                  className="cf-turnstile"
                  data-sitekey="YOUR_TURNSTILE_SITE_KEY"
                ></div>
              </div>

              <button className="btn-main btn-main--dark group w-full" type="submit">
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                <span className="arrow">→</span>
              </button>
            </form>
          </motion.div>

          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-primary-light/10 dark:bg-primary-dark/10 rounded-lg flex items-center justify-center mr-4">
                  <info.icon className="w-6 h-6 text-primary-light dark:text-primary-dark" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {info.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {info.content}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Carte Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-64 rounded-xl overflow-hidden shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647874586701!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 