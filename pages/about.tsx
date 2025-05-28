import Head from 'next/head';
import React from 'react';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Qui nous sommes | Conecio</title>
        <meta name="description" content="Découvrez l'équipe, la mission et les valeurs de Conecio, agence de marketing digital innovante." />
      </Head>
      <main className="min-h-screen bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">Qui nous sommes</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">Conecio est une agence de marketing digital passionnée par l'innovation et la réussite de ses clients. Notre équipe réunit des experts en SEO, web design, publicité digitale, social media, analytics et branding.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-primary-light dark:text-primary-dark">Notre mission</h2>
              <p className="text-base text-gray-700 dark:text-gray-300">Accompagner les entreprises dans leur transformation digitale avec des solutions sur-mesure, innovantes et performantes.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 text-primary-light dark:text-primary-dark">Nos valeurs</h2>
              <ul className="list-disc pl-5 text-base text-gray-700 dark:text-gray-300">
                <li>Innovation</li>
                <li>Transparence</li>
                <li>Excellence</li>
                <li>Proximité client</li>
                <li>Créativité</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 