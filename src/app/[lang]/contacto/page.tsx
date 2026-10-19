import { MessageCircle, MapPin, Mail } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/SocialIcons';

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === 'en' ? 'en' : 'es') as 'es' | 'en';
  const isEn = lang === 'en';

  const waMessage = encodeURIComponent(
    isEn
      ? 'Hello, I am contacting you from the Contact section of Cuadra Imperial Loy. I would like information regarding your Friesian horses.'
      : 'Hola, me comunico desde la sección Contacto de Cuadra Imperial Loy. Quisiera información sobre sus caballos frisones.'
  );

  return (
    <div className="bg-[#0B0B0B] text-[#F4EADB] min-h-[calc(100vh-64px)] pt-16 flex items-center justify-center">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto w-full space-y-4">
          {/* Header */}
          <div className="text-center space-y-1.5 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 border border-[#D4AF37]/35 bg-[#1A1714] px-3 py-0.5 rounded-full text-[10px] tracking-[0.2em] text-[#D4AF37] font-semibold uppercase">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isEn ? 'One-on-One Assistance' : 'Atención Personalizada'}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl xl:text-4xl font-bold text-[#F4EADB]">
              {isEn ? 'Contact the Stable' : 'Contacto con la Cuadra'}
            </h1>

            <p className="font-serif text-xs sm:text-sm text-[#D4AF37] italic">
              “{isEn ? 'Honest communication backed by official pedigree.' : 'Se dice lo que se ve y lo que dice el papel.'}”
            </p>
          </div>

          {/* Contact Methods Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp Direct */}
            <div className="bg-[#141210] border border-[#D4AF37]/40 p-5 rounded-2xl space-y-3 text-left shadow-xl">
              <div className="w-9 h-9 rounded-full bg-[#1A1714] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                <WhatsAppIcon className="w-4 h-4 fill-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F4EADB]">
                {isEn ? 'WhatsApp Inquiries' : 'Atención por WhatsApp'}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {isEn
                  ? 'Primary customer and sales channel. Immediate response 7 days a week. We share high-definition movement videos, pricing, and official KFPS passports.'
                  : 'Canal principal de atención y venta. Respuestas inmediatas de lunes a domingo. Le compartimos videos en alta resolución, precios y pasaportes.'}
              </p>
              <div className="pt-1">
                <a
                  href={`https://wa.me/523317026066?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-black font-bold text-xs uppercase px-5 py-2.5 rounded shadow hover:shadow-[#D4AF37]/30 transition-all active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-black" />
                  <span>+52 33 1702 6066</span>
                </a>
              </div>
            </div>

            {/* Sede y Cita Privada */}
            <div className="bg-[#141210] border border-[#D4AF37]/40 p-5 rounded-2xl space-y-3 text-left shadow-xl">
              <div className="w-9 h-9 rounded-full bg-[#1A1714] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F4EADB]">
                {isEn ? 'Stable Location' : 'Ubicación de la Cuadra'}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {isEn
                  ? 'Zapotlanejo, Jalisco, Mexico (38 minutes from Guadalajara).'
                  : 'Zapotlanejo, Jalisco, México (A 38 minutos de Guadalajara).'}
                <br />
                <span className="text-neutral-400 mt-1 block">
                  {isEn ? 'Visits strictly by confirmed private appointment.' : 'Atención previa cita privada confirmada.'}
                </span>
              </p>
              <div className="pt-1 text-xs text-[#D4AF37] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@cuadraimperialloy.com" className="hover:underline">
                  info@cuadraimperialloy.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
