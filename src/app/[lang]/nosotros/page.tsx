import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Award, MessageCircle } from 'lucide-react';

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === 'en' ? 'en' : 'es') as 'es' | 'en';

  const predicates = [
    {
      title: 'Semental aprobado',
      term: 'Approved Stallion',
      meaningEs: 'De los pocos que el registro oficial de Holanda deja padrear.',
      meaningEn: 'One of the very few stallions certified by the Dutch studbook for active breeding.',
    },
    {
      title: 'Preferent (Padre)',
      term: 'Preferent Sire',
      meaningEs: 'Lo premiaron porque sus hijos salen buenos y con alta calidad comprobada.',
      meaningEn: 'Awarded because offspring consistently demonstrate outstanding conformation and gait.',
    },
    {
      title: 'Categoría Ster',
      term: 'Ster Category',
      meaningEs: 'Un juez del registro holandés lo calificó por su porte, sus movimientos y su alzada.',
      meaningEn: 'Judged with top honors for conformation, stride elevation, and height.',
    },
    {
      title: 'Kroon / Model',
      term: 'Crown / Model',
      meaningEs: 'Corona y Modelo: las máximas distinciones que el registro holandés concede a una yegua.',
      meaningEn: 'The highest accolades the Dutch studbook bestows upon elite mares.',
    },
    {
      title: 'Sport / Sport-Elite',
      term: 'Sport / Sport-Elite',
      meaningEs: 'Título otorgado por resultados comprobados en competencias de alto rendimiento.',
      meaningEn: 'Title earned through proven performance in official dressage and driving sport.',
    },
    {
      title: 'AAA (Prueba IBOP/ABFP)',
      term: 'AAA Performance Aptitude',
      meaningEs: 'La calificación más alta (82 puntos o más) en la prueba del registro holandés.',
      meaningEn: 'The highest score (82+ points) in the official Dutch riding and driving aptitude test.',
    },
    {
      title: 'AA (Prueba oficial)',
      term: 'AA Performance Aptitude',
      meaningEs: 'Muy por encima del promedio en la prueba de aptitudes de la KFPS.',
      meaningEn: 'Substantially above average in the official KFPS performance assessment.',
    },
    {
      title: '1er premio KFPS',
      term: '1st Premium KFPS',
      meaningEs: 'La calificación más alta del juez en su revisión e inspección morfológica.',
      meaningEn: 'The highest rating granted by Dutch inspection judges on keuring day.',
    },
  ];

  const waMessage = encodeURIComponent(
    lang === 'es'
      ? 'Hola, me comunico desde la sección Nosotros de Cuadra Imperial Loy. Quisiera agendar una cita privada.'
      : 'Hello, I am contacting you from the About section of Cuadra Imperial Loy. I would like to schedule a private visit.'
  );

  return (
    <div className="bg-[#0B0B0B] text-[#F4EADB] min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-[#D4AF37]/35 bg-[#1A1714] px-3.5 py-1.5 rounded-full text-xs tracking-[0.2em] text-[#D4AF37] font-semibold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'es' ? 'Filosofía & Linaje' : 'Philosophy & Pedigree'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4EADB]">
            {lang === 'es' ? 'Quiénes Somos en Cuadra Imperial Loy' : 'About Cuadra Imperial Loy'}
          </h1>

          <p className="font-serif text-lg text-[#D4AF37] italic">
            “{lang === 'es' ? 'Recibe su caballo sano y con papeles de origen.' : 'Receive your horse sound and with certified origin papers.'}”
          </p>
        </div>

        {/* Story & Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#D4AF37]/30 bg-black">
            <Image
              src="/images/horses/Tebbe/Tebbe_1.jpg"
              alt="Cuadra Imperial Loy Zapotlanejo"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-[#F4EADB]">
              {lang === 'es' ? 'Pasión por la nobleza y el porte holandés' : 'Dedication to Dutch Nobility & Stature'}
            </h2>
            <p>
              {lang === 'es'
                ? 'Ubicados en Zapotlanejo, Jalisco, a 38 minutos de Guadalajara, en Cuadra Imperial Loy nos dedicamos exclusivamente a traer caballos frisones de gran porte, seleccionados personalmente en los Países Bajos.'
                : 'Located in Zapotlanejo, Jalisco, just 38 minutes from Guadalajara, Cuadra Imperial Loy is dedicated exclusively to curating fine Friesian horses selected personally across the Netherlands.'}
            </p>
            <p>
              {lang === 'es'
                ? 'No somos broker ni criadero de volumen. No traemos lotes: viajamos a Holanda para ver montar, caminar y revisar el carácter de cada caballo. Cada ejemplar cuenta con pasaporte oficial y registro genealógico emitido por la Real Asociación KFPS que pasa a nombre de su nuevo dueño.'
                : 'We are neither brokers nor high-volume breeders. We never import batches: we travel to the Netherlands to observe temperament and movement under saddle. Every horse carries official KFPS papers that transfer directly to the buyer.'}
            </p>
          </div>
        </div>

        {/* What is KFPS & Predicates Glossary Table */}
        <div className="space-y-8 bg-[#1A1714] border border-neutral-800 rounded-xl p-6 sm:p-10 shadow-xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2">
              <Award className="w-4 h-4" />
              <span>{lang === 'es' ? 'El Estándar Holandés' : 'The Dutch Standard'}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4EADB]">
              {lang === 'es' ? '¿Qué es la KFPS y qué significan sus predicados?' : 'What is the KFPS and what do predicates mean?'}
            </h2>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              {lang === 'es'
                ? 'La Koninklijke Vereniging Het Friesch Paarden-Stamboek (KFPS) fundada en 1879 es la autoridad mundial de la raza frisona. Sus predicados son títulos oficiales ganados por mérito propio o de sus hijos:'
                : 'The Koninklijke Vereniging Het Friesch Paarden-Stamboek (KFPS), established in 1879, is the global registry of the Friesian breed. Its predicates are official honors earned by performance:'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-[#D4AF37] font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">{lang === 'es' ? 'Predicado en el Papel' : 'Predicate Title'}</th>
                  <th className="py-3 px-4">{lang === 'es' ? 'Qué Significa' : 'Meaning & Context'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {predicates.map((p, idx) => (
                  <tr key={idx} className="hover:bg-neutral-800/30">
                    <td className="py-3 px-4 font-bold text-[#F4EADB] whitespace-nowrap">
                      {p.title}
                    </td>
                    <td className="py-3 px-4 text-neutral-300">
                      {lang === 'es' ? p.meaningEs : p.meaningEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="card-luxury p-8 sm:p-10 rounded-xl text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4EADB]">
            {lang === 'es' ? 'Conozca Nuestros Ejemplares en Persona' : 'Experience Our Horses in Person'}
          </h3>
          <p className="text-sm text-neutral-400 max-w-lg mx-auto">
            {lang === 'es'
              ? 'Agende su cita privada en Zapotlanejo. Solo usted, su gente y los caballos, sin presión.'
              : 'Schedule your private visit in Zapotlanejo. Only you, your inner circle, and the horses.'}
          </p>
          <a
            href={`https://wa.me/523317026066?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{lang === 'es' ? 'Agendar Cita Privada' : 'Schedule Private Visit'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
