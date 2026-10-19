import { ShieldCheck, Truck } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/SocialIcons';

interface GarantiaEnviosSectionProps {
  lang?: 'es' | 'en';
}

export default function GarantiaEnviosSection({ lang = 'es' }: GarantiaEnviosSectionProps) {
  const isEn = lang === 'en';

  const waQuoteMsg = encodeURIComponent(
    isEn
      ? 'Hello, I am interested in obtaining a safe transport quote for a Friesian horse to my city.'
      : 'Buen día. Me interesa cotizar el envío seguro de un caballo frisón a mi ciudad.'
  );

  return (
    <section id="garantia" className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2 relative">
      <div className="w-full text-center space-y-3.5">
        {/* Encabezado compacto */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 border border-[#D4AF37]/35 bg-[#1A1714] px-3 py-0.5 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isEn ? 'Origin & Health Guarantee' : 'Garantía de Origen y Salud'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl xl:text-4xl font-bold text-[#F4EADB]">
            {isEn
              ? 'Receive your horse sound and with certified origin papers.'
              : 'Recibe su caballo sano y con papeles de origen.'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            {isEn
              ? 'No deceptive contracts or inflated words: backed strictly by official Dutch KFPS registry records.'
              : 'Sin contratos engañosos ni palabras de más: lo que avala el registro oficial holandés KFPS.'}
          </p>
        </div>

        {/* Tarjeta de Envíos de Alta Gama */}
        <div className="bg-[#141210] border-2 border-[#D4AF37]/40 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden text-center max-w-3xl mx-auto">
          <div className="w-11 h-11 mx-auto rounded-full bg-[#1A1714] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-3">
            <Truck className="w-5 h-5" />
          </div>

          <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#F4EADB] mb-1.5">
            {isEn
              ? 'Safe, insured shipping across Mexico, the United States, and Latin America.'
              : 'Envíos seguros a todo México, Estados Unidos y América Latina.'}
          </h3>

          <p className="text-xs sm:text-sm text-[#D4AF37] font-medium mb-4">
            {isEn
              ? 'We provide transport quotes directly to your ranch or city, with no obligation.'
              : 'Le cotizamos el traslado a su rancho o ciudad, sin compromiso.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-xs text-neutral-300 mb-5">
            <span className="bg-[#1A1714] border border-neutral-800 px-3 py-1 rounded-full">
              {isEn ? '📍 Climate-controlled luxury trailers' : '📍 Remolques climatizados de alta gama'}
            </span>
            <span className="bg-[#1A1714] border border-neutral-800 px-3 py-1 rounded-full">
              {isEn ? '📋 Full zoosanitary & customs clearance' : '📋 Certificados zoosanitarios y de aduana en regla'}
            </span>
            <span className="bg-[#1A1714] border border-neutral-800 px-3 py-1 rounded-full">
              {isEn ? '🛡️ Transit insurance & dedicated monitoring' : '🛡️ Monitoreo y seguro de viaje'}
            </span>
          </div>

          <div>
            <a
              href={`https://wa.me/523317026066?text=${waQuoteMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded shadow-lg hover:shadow-[#D4AF37]/30 transition-all active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 fill-black" />
              <span>{isEn ? 'Request quote via WhatsApp' : 'Cotizar traslado por WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
