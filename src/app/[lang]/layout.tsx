import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloating from '@/components/layout/WhatsAppFloating';
import IntroOverlay from '@/components/home/IntroOverlay';
import { getGlobals } from '@/lib/db';

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === 'en' ? 'en' : 'es') as 'es' | 'en';
  const globals = getGlobals();

  return (
    <>
      {/* Intro Modal on First Visit */}
      <IntroOverlay
        currentLang={lang}
        enabled={globals.intro.enabled}
        videoUrl={globals.intro.videoUrl}
        posterUrl={globals.intro.posterUrl}
      />

      {/* Luxury Navbar */}
      <Navbar lang={lang} />

      {/* Main Content */}
      <main className="w-full">{children}</main>

      {/* Floating WhatsApp Button */}
      <WhatsAppFloating lang={lang} />

      {/* Luxury Footer on all tabs */}
      <Footer lang={lang} />
    </>
  );
}
