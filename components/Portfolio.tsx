import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AnimatedPremiumTitle } from './AnimatedPremiumTitle';
import 'animate.css';

const categories = ['Tous', 'Web Design', 'SEO', 'Social Media', 'Branding'];

const projects = [
  {
    id: 1,
    title: 'Refonte E-commerce',
    category: 'Web Design',
    image: '/portfolio/project1.jpg',
    description: 'Refonte complète d\'une boutique en ligne avec une expérience utilisateur optimisée.',
  },
  {
    id: 2,
    title: 'Stratégie SEO',
    category: 'SEO',
    image: '/portfolio/project2.jpg',
    description: 'Optimisation SEO pour une entreprise de services professionnels.',
  },
  {
    id: 3,
    title: 'Campagne Instagram',
    category: 'Social Media',
    image: '/portfolio/project3.jpg',
    description: 'Campagne virale sur Instagram pour une marque de mode.',
  },
  {
    id: 4,
    title: 'Identité Visuelle',
    category: 'Branding',
    image: '/portfolio/project4.jpg',
    description: 'Création d\'une identité visuelle complète pour une startup tech.',
  },
  {
    id: 5,
    title: 'Site Vitrine',
    category: 'Web Design',
    image: '/portfolio/project5.jpg',
    description: 'Site vitrine moderne pour une agence créative.',
  },
  {
    id: 6,
    title: 'Optimisation Local SEO',
    category: 'SEO',
    image: '/portfolio/project6.jpg',
    description: 'Stratégie SEO local pour une chaîne de restaurants.',
  },
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = selectedCategory === 'Tous'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
          <span className="inline-block bg-blue-50 dark:bg-gray-800 px-6 py-1 rounded-xl font-bold text-base tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">PORTFOLIO</span>
          </span>
        </div>
        <AnimatedPremiumTitle
          intro="Découvrez nos réalisations et laissez-vous inspirer par nos projets"
          className="mb-16 animate__animated animate__zoomInDown"
        >
          Notre Portfolio
        </AnimatedPremiumTitle>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-light dark:bg-primary-dark text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Grille de projets */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <span className="text-sm font-medium text-primary-light dark:text-primary-dark">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-2 mb-2">
                    {project.title}
                  </h3>
                  <p className="body text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio; 