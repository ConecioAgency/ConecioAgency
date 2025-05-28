import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function Devis() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simuler l'envoi
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSuccess(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <Head>
        <title>Demande de devis | Conecio</title>
        <meta name="description" content="Demandez un devis personnalisé pour votre projet digital avec Conecio." />
      </Head>
      <section className="min-h-screen flex items-center justify-center py-16 px-4 bg-gray-100 dark:bg-white transition-colors">
        <div className="w-full max-w-2xl rounded-3xl shadow-2xl p-10 md:p-14 border border-gray-200 dark:border-gray-300 bg-white dark:bg-gray-900 transition-colors">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 dark:text-white text-center">Demande de devis</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">Remplissez ce formulaire pour recevoir un devis personnalisé pour votre projet digital.</p>
          {success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-center font-semibold">
              Merci, votre demande a bien été envoyée ! Nous vous répondrons rapidement.
            </motion.div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom complet *</label>
                <input required name="name" type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                <input required name="email" type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                <input name="phone" type="tel" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site web</label>
                <input name="website" type="url" placeholder="https://" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget estimé</label>
                <select name="budget" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent">
                  <option value="">Sélectionner</option>
                  <option value="<2000">Moins de 2 000 €</option>
                  <option value="2000-5000">2 000 - 5 000 €</option>
                  <option value="5000-10000">5 000 - 10 000 €</option>
                  <option value=">10000">Plus de 10 000 €</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline</label>
                <input name="deadline" type="date" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type de projet *</label>
              <select required name="type" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent">
                <option value="">Sélectionner</option>
                <option value="Site vitrine">Site vitrine</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Application web">Application web</option>
                <option value="SEO/SEA">SEO / SEA</option>
                <option value="Branding">Branding</option>
                <option value="Stratégie digitale">Stratégie digitale</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label>
              <textarea required name="message" rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg font-bold text-white bg-primary-light dark:bg-primary-dark shadow hover:scale-105 transition-all text-lg mt-2"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
            </motion.button>
          </form>
        </div>
      </section>
    </>
  );
} 