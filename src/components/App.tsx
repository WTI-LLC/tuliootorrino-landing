import type React from 'react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { WhatsAppProvider } from '../context/WhatsAppContext';
import Header from './Header';
import Footer from './Footer';
import HomeContent from './HomeContent';
import AboutContent from './AboutContent';
import GalleryContent from './GalleryContent';

interface Props {
  page?: string;
  whatsappNumber?: string;
}

const pages: Record<string, () => React.ReactElement> = {
  home: () => <HomeContent />,
  about: () => <AboutContent />,
  gallery: () => <GalleryContent />,
};

export default function App({ page = 'home', whatsappNumber = '' }: Props) {
  const PageComponent = pages[page] ?? pages.home;

  return (
    <LanguageProvider>
      <WhatsAppProvider number={whatsappNumber}>
        <Header />
        <main>
          <PageComponent />
        </main>
        <Footer />
      </WhatsAppProvider>
    </LanguageProvider>
  );
}