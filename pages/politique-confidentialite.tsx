import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Head>
        <title>Politique de confidentialité | Conecio</title>
        <meta name="description" content="Politique de confidentialité de Conecio" />
      </Head>
      <Navbar />
      <main className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-2 md:px-4">
        {/* Motif SVG décoratif en fond */}
        <svg className="absolute top-0 left-0 w-40 h-40 opacity-10 text-indigo-400 dark:text-indigo-700" fill="currentColor" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
        <svg className="absolute bottom-0 right-0 w-40 h-40 opacity-10 text-pink-400 dark:text-pink-700" fill="currentColor" viewBox="0 0 100 100"><rect width="100" height="100" rx="30" /></svg>
        <div className="relative max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 md:p-10 text-gray-800 dark:text-gray-100 text-[0.97rem] md:text-base">
          {/* Illustration/icône en haut */}
          <div className="flex justify-center mb-4">
            <svg className="w-14 h-14 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7m0 4v4m0 0c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2z" /></svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Politique de confidentialité</h1>
          <p className="mb-4 text-center text-gray-600 dark:text-gray-300">
            Chez <strong>Conecio</strong>, la protection de vos données personnelles est une priorité. Cette politique explique quelles informations nous collectons, comment nous les utilisons, et quels sont vos droits.
          </p>
          <h2 className="text-lg font-semibold mt-8 mb-2">1. Données collectées</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Informations fournies via les formulaires (nom, email, société, etc.)</li>
            <li>Données de navigation (cookies, adresse IP, navigateur, etc.)</li>
            <li>Statistiques d'utilisation du site (Google Analytics, etc.)</li>
            <li>Messages échangés via le chat en ligne</li>
          </ul>
          <h2 className="text-lg font-semibold mt-8 mb-2">2. Utilisation des données</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Répondre à vos demandes via le formulaire de contact</li>
            <li>Améliorer l'expérience utilisateur et la sécurité du site</li>
            <li>Analyser l'audience et les performances du site</li>
            <li>Proposer un chat en ligne pour l'assistance</li>
            <li>Vous informer sur nos services et actualités (si vous y avez consenti)</li>
          </ul>
          <h2 className="text-lg font-semibold mt-8 mb-2">3. Sécurité des données</h2>
          <p className="mb-4">
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès, modification ou divulgation non autorisés.
          </p>
          <h2 className="text-lg font-semibold mt-8 mb-2">4. Durée de conservation</h2>
          <p className="mb-4">
            Vos données sont conservées uniquement le temps nécessaire à la finalité de leur traitement, sauf obligation légale contraire.
          </p>
          <h2 className="text-lg font-semibold mt-8 mb-2">5. Destinataires des données</h2>
          <p className="mb-4">
            Vos données peuvent être transmises à nos prestataires techniques (hébergement, outils d'analytics, chat en ligne) uniquement pour les besoins du service. Elles ne sont jamais revendues à des tiers.
          </p>
          <h2 className="text-lg font-semibold mt-8 mb-2">6. Cookies</h2>
          <p className="mb-4">
            Nous utilisons différents types de cookies pour assurer le bon fonctionnement du site, mesurer l'audience, proposer des contenus personnalisés et permettre le chat en ligne. Vous pouvez gérer vos préférences à tout moment via la bannière cookies.
          </p>
          <h2 className="text-lg font-semibold mt-8 mb-2">7. Vos droits</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Accéder à vos données personnelles</li>
            <li>Demander la rectification ou la suppression de vos données</li>
            <li>Retirer votre consentement à tout moment</li>
            <li>Vous opposer à certains traitements</li>
            <li>Portabilité de vos données</li>
          </ul>
          <h2 className="text-lg font-semibold mt-8 mb-2">8. Contact</h2>
          <p>
            Pour toute question concernant la protection de vos données, contactez-nous à&nbsp;
            <a href="mailto:conecioagency@gmail.com" className="text-blue-600 dark:text-blue-400 underline">conecioagency@gmail.com</a>.
          </p>
        </div>
      </main>
    </>
  );
} 