import { Suspense } from 'react';
import { getHorses } from '@/lib/db';
import CatalogGrid from '@/components/horses/CatalogGrid';
import { ShieldCheck } from 'lucide-react';

export default async function EjemplaresPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === 'en' ? 'en' : 'es') as 'es' | 'en';

  const horses = getHorses();

  return (
    <div className="bg-[#0B0B0B] text-[#F4EADB] min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Page Header Compacto */}
        <div className="text-center max-w-3xl mx-auto mb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 border border-[#D4AF37]/35 bg-[#1A1714] px-3 py-0.5 rounded-full text-[10px] tracking-[0.2em] text-[#D4AF37] font-semibold uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'es' ? 'Colección Exclusiva KFPS' : 'Exclusive KFPS Collection'}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#F4EADB]">
            {lang === 'es' ? 'Caballos Frisones en Venta' : 'Friesian Horses for Sale'}
          </h1>

          <p className="text-xs sm:text-sm text-neutral-300 leading-snug max-w-xl mx-auto">
            {lang === 'es'
              ? 'Ejemplares importados de Holanda, registrados en la KFPS con pasaporte y documentación oficial que pasa a su nombre. Agende su cita privada en Zapotlanejo, Jalisco.'
              : 'Horses imported from the Netherlands, registered with the KFPS with passport and official transfer to your name. Schedule your private visit in Zapotlanejo, Jalisco.'}
          </p>
        </div>

        {/* Catalog Grid with Filters wrapped in Suspense */}
        <Suspense fallback={<div className="text-center py-12 text-[#D4AF37]">Cargando catálogo...</div>}>
          <CatalogGrid horses={horses} lang={lang} />
        </Suspense>
      </div>
    </div>
  );
}
