import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaChartBar } from 'react-icons/fa';
import Link from 'next/link';

const OurAgency = () => {
  return (
    <section className="relative py-24 bg-white dark:bg-gray-800 overflow-hidden">
      {/* Effet de rotation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full" />
          <div className="absolute inset-0 border-2 border-purple-500/20 rounded-full" style={{ transform: 'rotate(45deg)' }} />
          <div className="absolute inset-0 border-2 border-pink-500/20 rounded-full" style={{ transform: 'rotate(90deg)' }} />
          <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full" style={{ transform: 'rotate(135deg)' }} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-4">
          <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold text-base tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">NOTRE AGENCE</span>
          </span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold font-heading mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          L'Art de Révéler Votre Marque
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-6 text-gray-700 text-base md:text-lg text-center dark:text-gray-700 max-w-3xl mx-auto"
        >
          Chez Conecio, nous croyons que chaque entreprise mérite une présence digitale à la hauteur de ses ambitions. Notre équipe passionnée vous accompagne de la stratégie à la réalisation, en passant par la création de contenus, le web design et l'optimisation de votre visibilité en ligne.
        </motion.p>
        <div className="space-y-6 mb-8 w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 8 }} 
              transition={{ type: 'spring', stiffness: 200, damping: 10 }} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400/20"
            >
              <FaLightbulb className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <div>
              <h3 className="text-xl font-medium text-indigo-400 dark:text-indigo-600">Stratégie & Innovation</h3>
              <p className="text-gray-900 dark:text-gray-700 text-xs">Des solutions créatives et sur-mesure pour chaque projet.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: -8 }} 
              transition={{ type: 'spring', stiffness: 200, damping: 10 }} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500/20"
            >
              <FaChartBar className="w-6 h-6 text-indigo-400" />
            </motion.div>
            <div>
              <h3 className="text-xl font-medium text-indigo-400 dark:text-indigo-600">Analyse & Croissance</h3>
              <p className="text-gray-900 dark:text-gray-700 text-xs">Nous optimisons votre visibilité et vos résultats.</p>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link href="/demarche" className="btn-premium">Découvrir notre démarche</Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-4 text-xs text-indigo-200 text-center dark:text-indigo-600"
        >
          Agence 100% digitale & créative
        </motion.div>
      </div>
    </section>
  );
};

export default OurAgency; 