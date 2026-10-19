'use client';

import { WhatsAppIcon } from '@/components/ui/SocialIcons';

interface WhatsAppFloatingProps {
  lang?: 'es' | 'en';
  horseName?: string;
}

export default function WhatsAppFloating({ lang = 'es', horseName }: WhatsAppFloatingProps) {
  const isEn = lang === 'en';

  const message = encodeURIComponent(
    horseName
      ? isEn
        ? `Hello. I am interested in ${horseName}. Could you share the price?`
        : `Buen día. Me interesa ${horseName}. ¿Me puede dar su precio?`
      : isEn
        ? 'Hello. I am interested in learning more about your Friesian horses.'
        : 'Buen día. Me interesa conocer sus caballos.'
  );

  return (
    <div className="fixed bottom-14 right-5 sm:bottom-16 sm:right-7 z-50">
      <a
        href={`https://wa.me/523317026066?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        title={isEn ? 'Inquire on WhatsApp' : 'Atención por WhatsApp'}
        aria-label={isEn ? 'Inquire on WhatsApp' : 'Atención por WhatsApp'}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#B8892B] via-[#D4AF37] to-[#F1D27A] text-[#0B0B0B] hover:brightness-110 flex items-center justify-center shadow-[0_4px_25px_rgba(212,175,55,0.55)] transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-[#FBF7F0]/60 group"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-[#0B0B0B] transition-transform duration-300 group-hover:scale-105" />
      </a>
    </div>
  );
}
