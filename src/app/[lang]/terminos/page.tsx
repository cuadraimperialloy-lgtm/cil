import { getGlobals } from '@/lib/db';
import { ShieldCheck } from 'lucide-react';

export default async function TerminosPage({
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
            <span>{lang === 'es' ? 'Condiciones de Operación' : 'Terms of Operation'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4EADB]">
            {lang === 'es' ? 'Términos de Servicio y Operación' : 'Terms of Service'}
          </h1>
          <p className="text-xs text-neutral-400">
            {lang === 'es' ? 'Cuadra Imperial Loy · Zapotlanejo, Jalisco' : 'Cuadra Imperial Loy · Zapotlanejo, Jalisco'}
          </p>
        </div>

        <div className="bg-[#1A1714] border border-neutral-800 rounded-xl p-8 sm:p-12 space-y-6 text-xs text-neutral-300 leading-relaxed shadow-xl">
          <p>{lang === 'es' ? globals.terms.es : globals.terms.en}</p>

          <h3 className="font-serif font-bold text-base text-[#D4AF37] pt-2">
            {lang === 'es' ? '1. Naturaleza de la Cuadra' : '1. Nature of the Stable'}
          </h3>
          <p>
            {lang === 'es'
              ? 'Cuadra Imperial Loy es una cuadra privada especializada en la selección, importación y venta directa de caballos frisones registrados en la KFPS. No opera como intermediario financiero ni plataforma de subastas.'
              : 'Cuadra Imperial Loy is a private stable specializing in direct selection, importation, and sale of KFPS Friesian horses. It does not operate as a financial broker or public auction.'}
          </p>

          <h3 className="font-serif font-bold text-base text-[#D4AF37] pt-2">
            {lang === 'es' ? '2. Disponibilidad y Apartados' : '2. Availability & Holds'}
          </h3>
          <p>
            {lang === 'es'
              ? 'Los ejemplares listados en el catálogo están sujetos a venta previa. El estatus de "Apartado" se otorga únicamente tras confirmación directa con el equipo de ventas.'
              : 'Horses listed in the catalog are subject to prior sale. A "Reserved" status is granted solely upon formal confirmation with our sales team.'}
          </p>

          <h3 className="font-serif font-bold text-base text-[#D4AF37] pt-2">
            {lang === 'es' ? '3. Entrega de Documentación' : '3. Delivery of Original Documentation'}
          </h3>
          <p>
            {lang === 'es'
              ? 'La entrega del caballo incluye forzosamente su pasaporte europeo original emitido por la Real Asociación KFPS, su certificado genealógico y el protocolo de endoso legal a nombre del comprador.'
              : 'Horse delivery unconditionally includes the original European KFPS passport, official studbook certificate, and legal transfer documentation in the buyer’s name.'}
          </p>
        </div>
      </div>
    </div>
  );
}
