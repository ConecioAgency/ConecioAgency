import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

const DevisPopup = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSuccess(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={className || "px-7 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-primary-light to-primary-dark shadow hover:scale-105 transition-all text-xs text-center"}
      >
        <span className="sprite-mask-text">Demander un devis</span>
        <span className="arrow ml-2">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M5 12h14"></path>
            <path d="M13 6l6 6-6 6"></path>
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="popup-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backdropFilter: 'blur(8px)', background: 'rgba(30,32,40,0.25)' }}
          >
            <motion.div
              key="popup"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 max-w-lg w-full border border-gray-200 dark:border-gray-700 flex flex-col items-center"
              style={{ fontFamily: 'Poppins, Inter, sans-serif' }}
            >
              {/* Bouton fermer */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-2xl p-2 rounded-full bg-white/60 dark:bg-gray-800/60 shadow-md backdrop-blur-md transition-all"
                aria-label="Fermer"
              >
                <IoClose />
              </button>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 text-center tracking-tight">Demande de devis</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center text-sm">Obtenez une estimation rapide et personnalisée pour votre projet digital.</p>
              <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="Nom" 
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition-all" 
                      required 
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Email" 
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition-all" 
                      required 
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      placeholder="Téléphone" 
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition-all" 
                      required 
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site web</label>
                    <input 
                      type="url" 
                      id="website"
                      name="website"
                      autoComplete="url"
                      placeholder="https://" 
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition-all" 
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget</label>
                    <select 
                      id="budget"
                      name="budget"
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition-all" 
                      required
                    >
                      <option value="">Budget</option>
                      <option value="<1000">Moins de 1000€</option>
                      <option value="1000-3000">1000€ - 3000€</option>
                      <option value="3000-10000">3000€ - 10 000€</option>
                      <option value=">10000">Plus de 10 000€</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline</label>
                    <input 
                      type="date" 
                      id="deadline"
                      name="deadline"
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition-all" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type de projet</label>
                  <select 
                    id="projectType"
                    name="projectType"
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition-all" 
                    required
                  >
                    <option value="">Type de projet</option>
                    <option value="web">Web Design</option>
                    <option value="seo">SEO</option>
                    <option value="social">Social Media</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    placeholder="Message" 
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition-all" 
                    rows={4} 
                    required
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04, background: 'linear-gradient(90deg,#6366f1,#ec4899)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-7 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-primary-light to-primary-dark shadow-lg transition-all text-base text-center mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </motion.button>
                {success && <div className="text-green-500 text-center font-semibold mt-2">Votre demande a bien été envoyée !</div>}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DevisPopup; 