'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Horse } from '@/types';
import { X, MessageCircle, ArrowRight, ShieldCheck, Download } from 'lucide-react';

interface QuickViewModalProps {
  horse: Horse | null;
  lang: 'es' | 'en';
  isOpen: boolean;
  onClose: () => void;
  onRequestFullPdf: (horse: Horse) => void;
}

export default function QuickViewModal({
  horse,
  lang,
  isOpen,
  onClose,
  onRequestFullPdf,
}: QuickViewModalProps) {
  if (!isOpen || !horse) return null;

  const primaryImg = horse.images.find((i) => i.isPrimary) || horse.images[0];
  const genderLabel =
    horse.gender === 'macho_entero'
      ? lang === 'es' ? 'Macho Entero' : 'Stallion'
      : horse.gender === 'capon'
      ? lang === 'es' ? 'Capón' : 'Gelding'
      : lang === 'es' ? 'Yegua' : 'Mare';

  const waMsg = encodeURIComponent(
    lang === 'es'
      ? `Hola, me interesa ${horse.name}. ¿Me comparte información?`
      : `Hello, I am interested in ${horse.name}. Could you please share more information?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#1A1714] border border-[#D4AF37]/40 rounded-xl shadow-2xl p-6 text-[#F4EADB] my-8 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-[#D4AF37] transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Horse Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/50 border border-neutral-800">
            <Image
              src={primaryImg?.url || '/images/horses/Yente/Yente_1.jpg'}
              alt={horse.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-2.5 left-2.5 bg-black/80 border border-[#D4AF37]/40 text-[#D4AF37] px-2 py-0.5 rounded text-[10px] font-bold uppercase">
              🇳🇱 KFPS Holanda
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            {horse.ownAwards && horse.ownAwards.length > 0 && (
              <div className="text-[11px] font-semibold text-[#D4AF37] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{horse.ownAwards.join(' · ')}</span>
              </div>
            )}

            <h3 className="font-serif text-2xl font-bold text-[#F4EADB]">
              {horse.name}
            </h3>

            <p className="text-xs text-neutral-300">
              <span className="text-neutral-500">{horse.gender === 'yegua' ? 'Hija de:' : 'Hijo de:'}</span>{' '}
              <span className="font-semibold text-[#F4EADB]">{horse.sire}</span>
            </p>

            <div className="flex items-center gap-2 text-xs text-[#C2A27C]">
              <span>{genderLabel}</span>
              <span>·</span>
              <span>{horse.ageYears} {lang === 'es' ? 'años' : 'yrs'}</span>
              <span>·</span>
              <span>{horse.height.toFixed(2)} m</span>
            </div>

            <p className="text-xs font-serif italic text-neutral-400">
              “{lang === 'es' ? horse.lineageTranslation.es : horse.lineageTranslation.en}”
            </p>

            {/* Price */}
            <div className="pt-2 text-xs">
              {horse.showPrice && horse.priceMxn ? (
                <div className="text-base font-bold text-[#D4AF37]">
                  ${horse.priceMxn.toLocaleString('es-MX')} MXN
                </div>
              ) : (
                <span className="text-xs text-[#C2A27C] italic">
                  {lang === 'es' ? 'Precio por mensaje' : 'Price on inquiry'}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-3">
              <a
                href={`https://wa.me/523317026066?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider py-2.5 rounded shadow"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onRequestFullPdf(horse);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-2 rounded text-[11px] font-semibold uppercase tracking-wider transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>

                <Link
                  href={`/${lang}/ejemplares/${horse.slug}`}
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white py-2 rounded text-[11px] font-semibold uppercase tracking-wider transition-all"
                >
                  <span>{lang === 'es' ? 'Ficha' : 'Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
