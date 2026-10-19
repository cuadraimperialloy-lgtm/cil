import Image from 'next/image';
import { MapPin, Clock, Award, ShieldCheck } from 'lucide-react';

interface LaCuadraSectionProps {
  lang?: 'es' | 'en';
}

export default function LaCuadraSection({ lang = 'es' }: LaCuadraSectionProps) {
  const isEn = lang === 'en';

  return (
    <section id="la-cuadra" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 relative">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-center">
          {/* Columna Izquierda: Información de la Cuadra y Registro KFPS */}
          <div className="lg:col-span-7 space-y-3.5 text-left">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#D4AF37]/35 bg-[#1A1714] px-3 py-0.5 rounded-full text-[10px] tracking-[0.2em] text-[#D4AF37] font-semibold uppercase mb-1.5">
                <Award className="w-3 h-3" />
                <span>{isEn ? 'The Stable' : 'La Cuadra'}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl xl:text-4xl font-bold text-[#F4EADB] leading-tight mb-1">
                {isEn ? 'Direct relationship with the stable.' : 'Trato directo con la cuadra.'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-snug">
                {isEn
                  ? 'The horses belong to Cuadra Imperial Loy, hand-selected one by one in the Netherlands.'
                  : 'Los caballos son de Cuadra Imperial Loy, escogidos uno por uno en Holanda.'}
              </p>
            </div>

            {/* 3 Tarjetas de datos rápidos */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-[#141210] border border-[#D4AF37]/30 rounded-xl p-2.5 text-center shadow-md">
                <MapPin className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                  {isEn ? 'Where' : 'Dónde'}
                </span>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#F4EADB] truncate block">
                  Zapotlanejo, Jal.
                </span>
              </div>

              <div className="bg-[#141210] border border-[#D4AF37]/30 rounded-xl p-2.5 text-center shadow-md">
                <Clock className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                  {isEn ? 'From GDL' : 'Desde GDL'}
                </span>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#F4EADB] block">
                  {isEn ? '38 minutes' : '38 minutos'}
                </span>
              </div>

              <div className="bg-[#141210] border border-[#D4AF37]/30 rounded-xl p-2.5 text-center shadow-md">
                <Award className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                  {isEn ? 'Visits' : 'Visitas'}
                </span>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#F4EADB] block">
                  {isEn ? 'Private visit' : 'Cita privada'}
                </span>
              </div>
            </div>

            {/* Bloque: La Raza y Registro KFPS desde 1879 */}
            <div className="bg-[#141210] border border-neutral-800 rounded-xl p-3.5 sm:p-4 space-y-1 shadow-lg">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isEn ? 'The Breed · Official Registry since 1879' : 'La Raza · Registro Oficial desde 1879'}</span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#F4EADB]">
                {isEn ? 'Dutch KFPS genealogy and passport.' : 'Genealogía y pasaporte KFPS holandés.'}
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                {isEn
                  ? 'The KFPS, the official breed registry in the Netherlands, has strictly regulated each Friesian since 1879: ancestry, breeder, withers height, and official inspection predicates. Your horse is delivered with its official European passport and pedigree documents formally transferable to your name.'
                  : 'La KFPS, el registro oficial de la raza en los Países Bajos, lleva desde 1879 el control estricto de cada frisón: ascendencia, criador, alzada y premios. Con su caballo se le entrega su pasaporte y papeles de origen formalmente transferibles a su nombre.'}
              </p>
            </div>
          </div>

          {/* Columna Derecha: Fotografía y Respaldo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative aspect-[4/3] w-full max-w-[440px] max-h-[300px] sm:max-h-[340px] rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-black">
              <Image
                src="/images/horses/Theo/Theo_1.jpg"
                alt="Caballos frisones selectos Cuadra Imperial Loy"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-center bg-[#1A1714]/90 backdrop-blur-md border border-[#D4AF37]/30 p-2 rounded-lg text-[10px] sm:text-[11px] text-[#D4AF37] font-semibold">
                {isEn
                  ? '🇳🇱 Directly imported from the Netherlands · Registered with KFPS'
                  : '🇳🇱 Importados directamente de Holanda · Registrados en la KFPS'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
