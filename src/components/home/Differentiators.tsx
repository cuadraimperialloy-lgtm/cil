import Image from 'next/image';
import { Differentiator } from '@/types';
import { ShieldCheck, Award, Eye, FileText } from 'lucide-react';

interface DifferentiatorsProps {
  differentiators: Differentiator[];
  lang: 'es' | 'en';
}

export default function Differentiators({ differentiators, lang }: DifferentiatorsProps) {
  const icons = [Eye, ShieldCheck, Award, FileText];

  return (
    <section className="py-24 bg-[#0B0B0B] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-3">
            {lang === 'es' ? '¿Por qué confiar en Cuadra Imperial Loy?' : 'Why Cuadra Imperial Loy?'}
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4EADB] mb-4">
            {lang === 'es' ? 'Los Cuatro Principios de la Cuadra' : 'Our Four Guiding Principles'}
          </h2>
          <p className="text-sm text-neutral-400">
            {lang === 'es'
              ? 'El que impone es el caballo. No usamos palabras grandes ni presiones: solo lo que se ve en la pista y lo que dice el papel.'
              : 'The horse commands the arena. No exaggerated claims, no sales pressure: only what is visible in movement and backed by official registry.'}
          </p>
        </div>

        {/* 4 Differentiator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentiators.map((diff, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={diff.id}
                className="card-luxury rounded-lg p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Background image subtle watermark */}
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                  <Image
                    src={diff.image || '/images/horses/Wilco/Wilco_1.jpg'}
                    alt={diff.titleEs}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                <div className="relative z-10">
                  {/* Top Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                      {diff.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#1A1714] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4EADB] mb-4">
                    {lang === 'es' ? diff.titleEs : diff.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6 max-w-lg">
                    {lang === 'es' ? diff.descEs : diff.descEn}
                  </p>
                </div>

                {/* Quote highlight */}
                <div className="relative z-10 pt-4 border-t border-neutral-800">
                  <p className="font-serif italic text-xs text-[#D4AF37]">
                    {lang === 'es' ? diff.quoteEs : diff.quoteEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
