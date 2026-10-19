'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Volume2, VolumeX } from 'lucide-react';
import GoldTicker from './GoldTicker';

interface HeroProps {
  lang: 'es' | 'en';
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  posterUrl?: string;
  tickerItems?: string[];
}

export default function Hero({
  lang,
  title,
  subtitle,
  videoUrl = '',
  posterUrl = '/images/horses/Yente/Yente_1.jpg',
  tickerItems,
}: HeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isEn = lang === 'en';

  const hasVideo = Boolean(videoUrl && videoUrl.trim() !== '');

  const defaultTicker = isEn
    ? [
        'Imported from the Netherlands',
        'Private visit in Jalisco',
        'Registered with KFPS 🇳🇱',
        'Handpicked one by one',
        'Insured shipping to Mexico, USA & Latin America',
        'Direct relationship with the stable',
      ]
    : [
        'Importados de Holanda',
        'Cita privada en Jalisco',
        'Registrados en la KFPS 🇳🇱',
        'Escogidos uno por uno',
        'Envíos seguros a todo México, EE. UU. y América Latina',
        'Trato directo con la cuadra',
      ];

  const items = tickerItems && tickerItems.length > 0 ? tickerItems : defaultTicker;

  const defaultTitle = isEn
    ? 'Dutch Friesian horses. In Jalisco.'
    : 'Caballos frisones de Holanda. En Jalisco.';

  const defaultSubtitle = isEn
    ? 'Friesian horses for sale, hand-selected one by one in the Netherlands. View them in an exclusive private appointment.'
    : 'Caballos frisones en venta, escogidos uno por uno en Holanda. Véalos en una cita privada.';

  return (
    <section className="relative w-full h-[100dvh] max-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#0B0B0B]">
      {/* Background Horse Showcase */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {hasVideo ? (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl || '/images/horses/Yente/Yente_1.jpg'}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover filter brightness-[0.7] contrast-105"
          />
        ) : (
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={posterUrl || '/images/horses/Yente/Yente_1.jpg'}
              alt={isEn ? 'Cuadra Imperial Loy - Premium Friesian Horses KFPS' : 'Cuadra Imperial Loy - Caballos Frisones Selectos KFPS en Jalisco'}
              fill
              priority
              className="object-cover filter brightness-[0.72] contrast-105"
            />
          </div>
        )}
        {/* Luxury multi-stop gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-black/40 to-black/75" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-[#0B0B0B]/80 pointer-events-none" />
      </div>

      {/* Sound Toggle (Only visible if video is active) */}
      {hasVideo && (
        <div className="absolute top-20 right-6 sm:right-10 z-20">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-2 bg-[#1A1714]/80 backdrop-blur-md border border-[#D4AF37]/35 text-[#D4AF37] hover:border-[#D4AF37] px-3.5 py-1.5 rounded-full text-xs shadow-lg transition-all"
            aria-label="Toggle horse audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span className="hidden sm:inline">
              {isMuted ? (isEn ? 'Unmute' : 'Activar sonido') : (isEn ? 'Sound on' : 'Sonido activo')}
            </span>
          </button>
        </div>
      )}

      {/* Hero Content (Centered vertically in the available viewport space) */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-20 pb-2">
        {/* Antetítulo */}
        <div className="inline-flex items-center gap-2 border border-[#D4AF37]/35 bg-[#1A1714]/90 px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] tracking-[0.2em] text-[#D4AF37] font-semibold uppercase mb-2 sm:mb-2.5 backdrop-blur-sm animate-fadeIn shadow-lg">
          <span>{isEn ? 'Zapotlanejo · Jalisco · Imported from the Netherlands' : 'Zapotlanejo · Jalisco · Importados de Holanda'}</span>
        </div>

        {/* Título principal (H1) */}
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4EADB] leading-[1.12] max-w-3xl mb-1.5 sm:mb-2 drop-shadow-2xl">
          {title || defaultTitle}
        </h1>

        {/* Subtítulo */}
        <p className="font-serif text-xs sm:text-sm md:text-base text-[#F4EADB]/90 max-w-xl mb-1.5 sm:mb-2 leading-snug sm:leading-relaxed drop-shadow-md">
          {subtitle || defaultSubtitle}
        </p>

        {/* Línea de confianza */}
        <p className="text-[9px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.2em] text-[#D4AF37] font-medium mb-3 sm:mb-4">
          {isEn
            ? 'Private visit · Insured shipping · Registered with KFPS'
            : 'Cita privada · Envíos seguros · Registrados en la KFPS'}
        </p>

        {/* Botones oficiales v1.5 */}
        <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto">
          <Link
            href={`/${lang}/cita-privada`}
            className="text-center bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-[#0B0B0B] font-bold text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.16em] px-5 sm:px-7 py-2.5 sm:py-3 rounded shadow-xl hover:shadow-[#D4AF37]/30 transition-all transform hover:-translate-y-0.5 active:scale-95 shrink-0"
          >
            {isEn ? 'Schedule your visit' : 'Agende su cita'}
          </Link>

          <Link
            href={`/${lang}/ejemplares`}
            className="text-center bg-[#1A1714]/85 backdrop-blur-md border border-[#D4AF37]/60 hover:border-[#D4AF37] text-[#F4EADB] hover:text-[#D4AF37] text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded shadow-lg transition-all transform hover:-translate-y-0.5 shrink-0"
          >
            {isEn ? 'Explore the horses' : 'Conozca los caballos'}
          </Link>
        </div>
      </div>

      {/* Banner Móvil Continuo (GoldTicker integrado al pie del bloque de portada, 100% visible sin scroll) */}
      <div className="w-full shrink-0 relative z-20">
        <GoldTicker items={items} />
      </div>
    </section>
  );
}
