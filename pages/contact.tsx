import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Suspense } from 'react';
import SectionTitle from '../components/SectionTitle';
import DevisPopup from '../components/DevisPopup';
import ContactFaqSection from '../components/ContactFaqSection';
import { H1, H2, Body1, Body2, Overline } from '../components/Typography';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ContactForm = dynamic(() => import('../components/Contact'), { ssr: false });
const Testimonials = dynamic(() => import('../components/Testimonials'), { ssr: false });
const HomeBlogSection = dynamic(() => import('../components/HomeBlogSection'), { ssr: false });

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Conecio</title>
        <meta name="description" content="Contactez l'équipe Conecio pour discuter de votre projet digital, demander un devis ou obtenir des conseils personnalisés." />
        <link rel="canonical" href="https://www.conecio.com/contact" />
      </Head>
      {/* Hero Section */}
      <div className="relative z-10">
        <Suspense fallback={<div className="text-center py-20 font-[Inter]">Chargement du formulaire...</div>}>
          <ContactForm />
        </Suspense>
      </div>
      {/* Section témoignages */}
      <div className="relative z-10">
        <Suspense fallback={<div className="text-center py-20 font-[Inter]">Chargement des témoignages...</div>}>
          <Testimonials />
        </Suspense>
      </div>
      {/* Section Blog */}
      <div className="relative z-10">
        <Suspense fallback={<div className="text-center py-20 font-[Inter]">Chargement du blog...</div>}>
          <HomeBlogSection />
        </Suspense>
      </div>
      {/* FAQ en bas */}
      <ContactFaqSection />
    </>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 