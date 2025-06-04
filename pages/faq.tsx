import ContactFaqSection from '../components/ContactFaqSection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function FAQPage() {
  return <ContactFaqSection />;
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 