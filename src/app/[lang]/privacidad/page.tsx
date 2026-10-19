import { getGlobals } from '@/lib/db';
import { ShieldCheck } from 'lucide-react';

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === 'en' ? 'en' : 'es') as 'es' | 'en';
  const globals = getGlobals();

  return (
    <div className="bg-[#0B0B0B] text-[#F4EADB] min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 border border-[#D4AF37]/35 bg-[#1A1714] px-3.5 py-1.5 rounded-full text-xs tracking-[0.2em] text-[#D4AF37] font-semibold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'es' ? 'Cumplimiento Legal LFPDPPP' : 'Privacy Protection'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4EADB]">
            {lang === 'es' ? 'Aviso de Privacidad Integral' : 'Privacy Policy'}
          </h1>
          <p className="text-xs text-neutral-400">
            {lang === 'es' ? 'Última actualización: Octubre 2026 · Cuadra Imperial Loy' : 'Last updated: October 2026 · Cuadra Imperial Loy'}
          </p>
        </div>

        <div className="bg-[#1A1714] border border-neutral-800 rounded-xl p-8 sm:p-12 space-y-6 text-xs text-neutral-300 leading-relaxed shadow-xl">
          <p>{lang === 'es' ? globals.privacyPolicy.es : globals.privacyPolicy.en}</p>

          <h3 className="font-serif font-bold text-base text-[#D4AF37] pt-2">
            {lang === 'es' ? '1. Datos personales recabados' : '1. Collected Personal Data'}
          </h3>
          <p>
            {lang === 'es'
              ? 'Recabamos su nombre completo, número de WhatsApp, correo electrónico y ciudad de residencia al solicitar la ficha técnica de un ejemplar o agendar una cita privada.'
              : 'We collect your full name, WhatsApp phone number, email address, and residence location when requesting equine technical dossiers or booking appointments.'}
          </p>

          <h3 className="font-serif font-bold text-base text-[#D4AF37] pt-2">
            {lang === 'es' ? '2. Finalidades del tratamiento' : '2. Purpose of Processing'}
          </h3>
          <p>
            {lang === 'es'
              ? 'Sus datos se utilizan única y exclusivamente para: (a) Enviar el expediente técnico en PDF del caballo de su interés, (b) Atender sus dudas vía WhatsApp de manera confidencial, y (c) Coordinar accesos a nuestras instalaciones privadas en Zapotlanejo, Jalisco.'
              : 'Your data is strictly processed to: (a) Deliver requested technical equine dossiers, (b) Answer your direct inquiries confidentially via WhatsApp, and (c) Coordinate private access to our stables in Zapotlanejo, Jalisco.'}
          </p>

          <h3 className="font-serif font-bold text-base text-[#D4AF37] pt-2">
            {lang === 'es' ? '3. Ejercicio de Derechos ARCO' : '3. Privacy & Access Rights'}
          </h3>
          <p>
            {lang === 'es'
              ? 'Usted tiene derecho en cualquier momento a revocar su consentimiento o solicitar la eliminación total de sus datos enviando un mensaje directo a info@cuadraimperialloy.com.'
              : 'You have the right at any time to revoke your consent or request total data erasure by writing directly to info@cuadraimperialloy.com.'}
          </p>
        </div>
      </div>
    </div>
  );
}
