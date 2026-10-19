'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Horse } from '@/types';
import { ChevronLeft, ChevronRight, Share2, Check } from 'lucide-react';

interface FeaturedCarouselProps {
  horses: Horse[];
  lang?: 'es' | 'en';
}

export default function FeaturedCarousel({ horses, lang = 'es' }: FeaturedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [, setActiveIndex] = useState(0);
  const isEn = lang === 'en';

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 320;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(index, 0), horses.length - 1));
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.85;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleShare = async (horse: Horse) => {
    const url = `${window.location.origin}/${lang}/ejemplares/${horse.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${horse.name} · Cuadra Imperial Loy`,
          text: isEn
            ? `${horse.name}, Friesian horse sired by ${horse.sire}. Cuadra Imperial Loy in Zapotlanejo, Jalisco.`
            : `${horse.name}, caballo frisón hijo de ${horse.sire}. Cuadra Imperial Loy en Zapotlanejo, Jalisco.`,
          url,
        });
        return;
      } catch (err) {
        // fallback to clipboard
      }
    }
    navigator.clipboard.writeText(url);
    setCopiedId(horse.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Helper to determine training level label according to v1.5
  const getHorseLevel = (horse: Horse) => {
    if (horse.ageYears >= 4) return isEn ? 'High-School Dressage' : 'Alta escuela (bailador)';
    if (horse.ageYears === 3 && horse.ageMonths >= 5) return isEn ? 'Under Saddle' : 'Ya con rienda';
    if (horse.ageYears === 3) return isEn ? 'Starting Training' : 'Iniciando rienda';
    return isEn ? 'Colt' : 'Potro';
  };

  return (
    <section id="caballos" className="py-8 sm:py-10 bg-[#0B0B0B] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header v1.5 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
              {isEn ? 'Friesian Horses for Sale' : 'Caballos frisones en venta'}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4EADB]">
              {isEn ? 'Selected Horses' : 'Ejemplares Seleccionados'}
            </h2>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            <p className="text-xs text-neutral-400 max-w-md hidden sm:block">
              {isEn
                ? 'Handpicked one by one in the Netherlands. Each with video, official papers, and certified bloodline.'
                : 'Escogidos uno por uno en Holanda. Cada uno con su video, sus papeles y su línea de sangre.'}
            </p>

            {/* Carousel navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-8 h-8 rounded-full bg-[#1A1714] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all shadow-md active:scale-95"
                aria-label={isEn ? 'Previous' : 'Anterior'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-8 h-8 rounded-full bg-[#1A1714] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all shadow-md active:scale-95"
                aria-label={isEn ? 'Next' : 'Siguiente'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {horses.map((horse) => {
            const primaryImg = horse.images[0]?.url || '/images/horses/Yente/Yente_1.jpg';
            const level = getHorseLevel(horse);
            const isStud = horse.type === 'semental_maquila';
            const chipEnd = horse.chip ? horse.chip.slice(-4) : 'KFPS';

            const visitMessage = encodeURIComponent(
              isEn
                ? `Hello. I would like to schedule a private appointment to see ${horse.name}.`
                : `Buen día. Me gustaría agendar una cita privada para ver a ${horse.name}.`
            );
            const priceMessage = encodeURIComponent(
              isEn
                ? isStud
                  ? `Hello. I am interested in breeding services for ${horse.name}. Could you share the fee?`
                  : `Hello. I am interested in ${horse.name}. Could you share the price?`
                : isStud
                  ? `Buen día. Me interesa una maquila de ${horse.name}. ¿Me puede dar su precio?`
                  : `Buen día. Me interesa ${horse.name}. ¿Me puede dar su precio?`
            );

            return (
              <div
                key={horse.id}
                className="flex-shrink-0 w-[270px] sm:w-[300px] lg:w-[320px] snap-start bg-[#141210] border border-[#D4AF37]/25 hover:border-[#D4AF37]/70 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl hover:-translate-y-1"
              >
                {/* Image & Badge */}
                <div className="relative aspect-[16/11] w-full bg-black/60 overflow-hidden">
                  <Image
                    src={primaryImg}
                    alt={horse.name}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 270px, 320px"
                  />

                  {/* Badge v1.5 */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                    {isStud ? (
                      <span className="bg-[#D4AF37] text-black text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow">
                        {isEn ? 'Stallion · Stud Only' : 'Semental · Solo maquila'}
                      </span>
                    ) : (
                      <span className="bg-[#0B0B0B]/85 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                        🇳🇱 KFPS Holanda
                      </span>
                    )}

                    {horse.ownAwards && horse.ownAwards.length > 0 && (
                      <span className="bg-neutral-900/90 text-[#F1D27A] text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-[#D4AF37]/25">
                        {horse.ownAwards[0]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content v1.5 */}
                <div className="p-4 flex flex-col flex-grow justify-between text-left">
                  <div>
                    {/* Nombre */}
                    <h3 className="font-serif text-xl font-bold text-[#F4EADB] hover:text-[#D4AF37] transition-colors mb-0.5">
                      <Link href={`/${lang}/ejemplares/${horse.slug}`}>
                        {horse.name}
                      </Link>
                    </h3>

                    {/* Hijo de [padre] */}
                    <p className="text-xs text-neutral-300 mb-2">
                      <span className="text-neutral-500">{isEn ? 'Sire:' : 'Hijo de:'}</span>{' '}
                      <strong className="text-[#F4EADB] font-medium">{horse.sire}</strong>
                    </p>

                    {/* Nivel · Edad · Alzada a la cruz */}
                    <div className="bg-[#1A1714] border border-neutral-850 rounded p-2 mb-2.5 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">{isEn ? 'Level:' : 'Nivel:'}</span>
                        <span className="text-[#D4AF37] font-semibold">{level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">{isEn ? 'Height:' : 'Alzada a la cruz:'}</span>
                        <span className="text-[#F4EADB] font-medium">{horse.height.toFixed(2)} m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">{isEn ? 'Age:' : 'Edad:'}</span>
                        <span className="text-[#F4EADB]">{horse.ageYears} {isEn ? 'years' : 'años'}</span>
                      </div>
                    </div>

                    {/* Sus papeles (v1.5) */}
                    <div className="border-l-2 border-[#D4AF37]/60 pl-2.5 py-0.5 mb-3 text-[10px] text-neutral-400 space-y-0.5">
                      <p className="text-[#F4EADB]/90 font-medium">
                        {isEn ? 'Official KFPS passport & pedigree' : 'Pasaporte y papeles de origen KFPS'}
                      </p>
                      <p className="text-neutral-500">
                        {isEn ? `Microchip ending: ${chipEnd}` : `Chip: termina en ${chipEnd}`}
                      </p>
                    </div>
                  </div>

                  {/* Botones de acción oficiales v1.5 */}
                  <div className="space-y-2 pt-2 border-t border-neutral-850">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`https://wa.me/523317026066?text=${visitMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 bg-[#D4AF37] hover:bg-[#F1D27A] text-black font-bold text-[10px] uppercase tracking-wider py-2 rounded transition-all shadow"
                      >
                        <span>{isEn ? 'Schedule Visit' : 'Venga a verlo'}</span>
                      </a>

                      <a
                        href={`https://wa.me/523317026066?text=${priceMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 bg-[#1A1714] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#D4AF37] text-[10px] font-semibold uppercase tracking-wider py-2 rounded transition-all"
                      >
                        <span>
                          {isEn
                            ? isStud
                              ? 'Inquire stud'
                              : 'Inquire price'
                            : isStud
                              ? 'Cotizar maquila'
                              : 'Consultar precio'}
                        </span>
                      </a>
                    </div>

                    <div className="flex items-center justify-between pt-0.5">
                      <Link
                        href={`/${lang}/ejemplares/${horse.slug}`}
                        className="text-[11px] text-neutral-400 hover:text-[#D4AF37] font-medium underline"
                      >
                        {isEn ? 'More info & photos ▸' : 'Más info y fotos ▸'}
                      </Link>

                      <button
                        onClick={() => handleShare(horse)}
                        className="inline-flex items-center gap-1 text-[10px] text-neutral-500 hover:text-[#D4AF37] transition-colors"
                        title={isEn ? 'Share horse' : 'Compartir ejemplar'}
                      >
                        {copiedId === horse.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">{isEn ? 'Copied' : 'Copiado'}</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3 h-3" />
                            <span>{isEn ? 'Share' : 'Compartir'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
