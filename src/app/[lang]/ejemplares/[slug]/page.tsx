import { notFound } from 'next/navigation';
import { getHorseBySlug, getHorses } from '@/lib/db';
import HorseDetailView from '@/components/horses/HorseDetailView';
import type { Metadata } from 'next';

interface HorsePageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: HorsePageProps): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = (rawLang === 'en' ? 'en' : 'es') as 'es' | 'en';
  const horse = getHorseBySlug(slug);

  if (!horse) {
    return { title: 'Ejemplar no encontrado · Cuadra Imperial Loy' };
  }

  const title =
    lang === 'es'
      ? `${horse.name} · Caballo Frisón KFPS en Venta · Cuadra Imperial Loy`
      : `${horse.name} · Friesian Horse KFPS for Sale · Cuadra Imperial Loy`;

  const description =
    lang === 'es'
      ? `Hijo de ${horse.sire}. ${horse.ageYears} años, ${horse.height.toFixed(2)} m a la cruz. ${horse.lineageTranslation.es} Cita privada en Jalisco.`
      : `Son of ${horse.sire}. ${horse.ageYears} years old, ${horse.height.toFixed(2)} m. ${horse.lineageTranslation.en} Private visit in Jalisco.`;

  const primaryImg = horse.images.find((i) => i.isPrimary) || horse.images[0];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: primaryImg ? [{ url: primaryImg.url, alt: horse.name }] : [],
    },
  };
}

export default async function SingleHorsePage({ params }: HorsePageProps) {
  const { lang: rawLang, slug } = await params;
  const lang = (rawLang === 'en' ? 'en' : 'es') as 'es' | 'en';

  const horse = getHorseBySlug(slug);
  if (!horse) {
    notFound();
  }

  // Get related horses (excluding current)
  const allHorses = getHorses();
  const relatedHorses = allHorses.filter((h) => h.id !== horse.id).slice(0, 3);

  return <HorseDetailView horse={horse} relatedHorses={relatedHorses} lang={lang} />;
}
