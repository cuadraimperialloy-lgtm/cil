import Link from 'next/link';
import Image from 'next/image';
import { getHorses, getGlobals } from '@/lib/db';
import Hero from '@/components/home/Hero';
import FeaturedCarousel from '@/components/home/FeaturedCarousel';
import { WhatsAppIcon } from '@/components/ui/SocialIcons';
import {
  Award,
  Truck,
  Clock,
  ArrowRight,
  CheckCircle2,
  Users,
  Play,
  HelpCircle,
} from 'lucide-react';

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === 'en' ? 'en' : 'es') as 'es' | 'en';
  const isEn = lang === 'en';

  const horses = getHorses();
  const globals = getGlobals();

  const tickerItems = isEn ? globals.ticker.itemsEn : globals.ticker.itemsEs;

  const pillars = [
    {
      title: isEn ? 'Imported from the Netherlands' : 'Importados de Holanda',
      badge: isEn ? '🇳🇱 KFPS Netherlands' : '🇳🇱 KFPS Holanda',
      subtitle: isEn ? 'Hand-selected one by one' : 'Escogidos uno por uno',
      desc: isEn
        ? 'We are neither a mass breeding farm nor a broker. We travel personally to the Netherlands to select horses with stellar conformation, immaculate health, and gentle temperament.'
        : 'No somos criadero masivo ni broker intermediario. Viajamos personalmente a los Países Bajos para seleccionar ejemplares con morfología estelar, salud impecable y temperamento noble.',
      linkHref: `/${lang}/la-cuadra`,
      linkLabel: isEn ? 'Discover history and breed' : 'Conozca la historia y la raza',
      icon: Award,
    },
    {
      title: isEn ? 'Private Visit in Jalisco' : 'Cita Privada en Jalisco',
      badge: isEn ? '38 min from Guadalajara' : '38 min de Guadalajara',
      subtitle: isEn ? 'Behind closed doors' : 'A puerta cerrada',
      desc: isEn
        ? 'Located in Zapotlanejo, Jalisco. We reserve the arena and grounds exclusively for you, your family, your veterinarian, and your trainer to ride and evaluate with total peace of mind.'
        : 'Ubicados en Zapotlanejo, Jalisco. Le apartamos la pista y el tiempo en exclusiva para que usted, su familia, su veterinario y su caballerango monten y convivan con el caballo con total tranquilidad.',
      linkHref: `/${lang}/cita-privada`,
      linkLabel: isEn ? 'How the private visit works' : 'Cómo funciona la cita privada',
      icon: Users,
    },
    {
      title: isEn ? 'Warranty & Insured Shipping' : 'Garantía y Envíos Seguros',
      badge: isEn ? 'Zoosanitary Certainty' : 'Certeza Zoosanitaria',
      subtitle: isEn ? 'Across Mexico & USA' : 'A todo México y EE. UU.',
      desc: isEn
        ? 'Receive your horse sound and with certified KFPS origin papers transferred to your name. Specialized logistics in luxury climate-controlled trailers with transit monitoring.'
        : 'Recibe su caballo sano y con papeles de origen KFPS que pasan formalmente a su nombre. Logística especializada en remolques climatizados de alta gama y monitoreo de viaje.',
      linkHref: `/${lang}/garantia`,
      linkLabel: isEn ? 'Warranty and shipping details' : 'Ver detalles de garantía y envíos',
      icon: Truck,
    },
  ];

  const socialHighlights = [
    {
      id: 'hl_1',
      platform: 'Instagram',
      type: 'Reel',
      caption: isEn
        ? 'Afternoon of live music and high-school dressage on our Zapotlanejo arena. Pure Friesian nobility.'
        : 'Tarde de música tradicional y alta escuela en nuestra pista de Zapotlanejo. Nobleza pura.',
      image: '/images/horses/Yente/Yente_1.jpg',
      stats: isEn ? '48.2K views' : '48.2K reproducciones',
    },
    {
      id: 'hl_2',
      platform: 'TikTok',
      type: 'Video',
      caption: isEn
        ? 'Friends visiting us to experience and ride the Friesian horses in person.'
        : 'Amigos que nos visitan para conocer y montar a los caballos frisones.',
      image: '/images/horses/Wilco/Wilco_1.jpg',
      stats: isEn ? '112K views' : '112K reproducciones',
    },
    {
      id: 'hl_3',
      platform: 'Facebook',
      type: 'Post',
      caption: isEn
        ? 'Young stallion Aylan showcasing pure KFPS Dutch bloodlines in Jalisco.'
        : 'El joven potro Aylan luciendo el porte y sangre KFPS holandesa en Jalisco.',
      image: '/images/horses/Aylan/Aylan_1.jpg',
      stats: isEn ? '1.4K reactions' : '1.4K interacciones',
    },
  ];

  const waHomeMsg = encodeURIComponent(
    isEn
      ? 'Hello, I would like direct information regarding your Friesian horses.'
      : 'Buen día. Quisiera información sobre sus caballos frisones.'
  );

  return (
    <div className="bg-[#0B0B0B]">
      {/* 1. Portada Principal de Lujo con Banner Móvil integrado sin scroll */}
      <Hero
        lang={lang}
        tickerItems={tickerItems}
      />

      {/* 3. Carrusel Horizontal de Ejemplares Seleccionados */}
      <div id="carrusel">
        <FeaturedCarousel horses={horses} lang={lang} />
      </div>

      {/* Botón para ver el catálogo completo */}
      <div className="bg-[#0B0B0B] text-center pb-8 pt-2">
        <Link
          href={`/${lang}/ejemplares`}
          className="inline-flex items-center gap-2 bg-[#141210] border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black font-bold text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-lg transition-all shadow-xl group"
        >
          <span>{isEn ? 'View complete collection of horses' : 'Ver catálogo completo de ejemplares'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 4. Los Tres Pilares de Cuadra Imperial Loy (Sección Exclusiva de Home) */}
      <section className="py-10 sm:py-14 bg-gradient-to-b from-[#0B0B0B] via-[#12100E] to-[#0B0B0B] border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              {isEn ? 'Prestige & Integrity' : 'Prestigio y Certeza'}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4EADB]">
              {isEn ? 'Why Cuadra Imperial Loy' : 'Por qué Cuadra Imperial Loy'}
            </h2>
            <p className="font-serif text-sm sm:text-base text-[#D4AF37] italic">
              {isEn
                ? '“Receive your horse sound and with certified origin papers.”'
                : '“Recibe su caballo sano y con papeles de origen.”'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#141210] border border-neutral-850 hover:border-[#D4AF37]/60 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:-translate-y-1 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#1A1714] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-black/60 px-2.5 py-1 rounded border border-[#D4AF37]/30">
                        {pillar.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#F4EADB] mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#D4AF37] font-medium">
                        {pillar.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-850">
                    <Link
                      href={pillar.linkHref}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:text-[#F1D27A] transition-colors group-hover:translate-x-1 duration-300"
                    >
                      <span>{pillar.linkLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Invitación a la Experiencia VIP: Cita Privada */}
      <section className="py-10 sm:py-14 bg-[#0B0B0B] border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141210] border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-left">
                <div className="inline-flex items-center gap-1.5 bg-[#1A1714] border border-[#D4AF37]/40 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                  <Clock className="w-3 h-3" />
                  <span>{isEn ? '38 minutes from Guadalajara' : 'A 38 minutos de Guadalajara'}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4EADB] leading-tight">
                  {isEn ? 'A private visit behind closed doors.' : 'Una cita privada a puerta cerrada.'}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {isEn
                    ? 'At Cuadra Imperial Loy visits are strictly by private appointment in Zapotlanejo, Jalisco. We reserve the arena and grounds exclusively for you, your people, your veterinarian, and your stablemaster.'
                    : 'En Cuadra Imperial Loy las visitas son estrictamente con cita privada en Zapotlanejo, Jalisco. Le apartamos la pista y las instalaciones con tiempo exclusivo para usted, su gente, su veterinario y su caballerango.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{isEn ? 'Ridden test with live music' : 'Prueba montada con música'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{isEn ? 'In-person microchip scanning' : 'Lectura de microchip presencial'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{isEn ? 'Official European KFPS passport review' : 'Inspección de pasaporte KFPS'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{isEn ? 'Zero purchase pressure' : 'Sin presiones de compra'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Link
                    href={`/${lang}/cita-privada`}
                    className="bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded shadow-xl hover:shadow-[#D4AF37]/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
                  >
                    {isEn ? 'Schedule Private Visit' : 'Agendar Cita Privada'}
                  </Link>

                  <a
                    href={`https://wa.me/523317026066?text=${encodeURIComponent(
                      isEn
                        ? 'Hello. I am interested in scheduling a private appointment to view your Friesian horses.'
                        : 'Buen día. Me interesa agendar una cita privada para conocer sus caballos.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={isEn ? 'Assistance on WhatsApp' : 'Atención por WhatsApp'}
                    aria-label={isEn ? 'Assistance on WhatsApp' : 'Atención por WhatsApp'}
                    className="w-11 h-11 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-black flex items-center justify-center shadow-lg hover:shadow-[#D4AF37]/30 transition-all active:scale-95 border border-[#D4AF37]/50"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-black" />
                  </a>
                </div>
              </div>

              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl bg-black">
                <Image
                  src="/images/horses/Yde/Yde_1.jpg"
                  alt="Instalaciones Cuadra Imperial Loy Zapotlanejo Jalisco"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 p-2.5 rounded-lg text-center text-xs text-[#F4EADB]">
                  {isEn
                    ? '📍 Zapotlanejo, Jalisco · Premier private equestrian grounds'
                    : '📍 Zapotlanejo, Jalisco · Instalaciones privadas de primer nivel'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Lo Último de la Cuadra: Destacados de Redes Sociales */}
      <section className="py-10 sm:py-14 bg-[#0B0B0B] border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
                {isEn ? 'Live from the stable' : 'En vivo desde la cuadra'}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4EADB]">
                {isEn ? 'Our Community' : 'Nuestra Comunidad'}
              </h2>
            </div>

            <Link
              href={`/${lang}/comunidad`}
              className="inline-flex items-center gap-2 text-xs text-[#D4AF37] hover:text-[#F1D27A] font-bold uppercase tracking-wider group"
            >
              <span>{isEn ? 'View full social feed & events' : 'Ver feed social completo y eventos'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialHighlights.map((item) => (
              <Link
                key={item.id}
                href={`/${lang}/comunidad`}
                className="group bg-[#141210] border border-neutral-800 hover:border-[#D4AF37]/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl hover:-translate-y-1 block"
              >
                <div className="relative aspect-[16/10] w-full bg-black overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 px-2 py-0.5 rounded text-[10px] font-semibold text-[#D4AF37] flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>{item.platform} {item.type}</span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white/90">
                    {item.stats}
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs text-[#F4EADB] group-hover:text-[#D4AF37] transition-colors leading-relaxed line-clamp-2">
                    “{item.caption}”
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Trato Directo y Preguntas Frecuentes (Banner Final) */}
      <section className="py-10 sm:py-14 bg-gradient-to-b from-[#0B0B0B] to-[#12100E] border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 border border-[#D4AF37]/35 bg-[#1A1714] px-3.5 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isEn ? 'Integrity & Direct Relationship' : 'Certeza & Trato Directo'}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4EADB]">
            {isEn
              ? 'Questions regarding purity, pricing, or shipping?'
              : '¿Dudas sobre pureza, precios o traslados?'}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl mx-auto">
            {isEn
              ? 'We communicate clearly and directly. In your first message we share high-definition movement videos, official Dutch KFPS passport scans, and the exact price of the horse you are interested in.'
              : 'Hablamos claro y sin rodeos. En el primer mensaje le compartimos videos en alta definición, pasaporte holandés KFPS y precio exacto del ejemplar de su interés.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href={`/${lang}/preguntas`}
              className="bg-[#141210] border border-[#D4AF37]/60 hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded transition-all shadow-lg"
            >
              {isEn ? 'Consult Frequently Asked Questions' : 'Consultar Preguntas Frecuentes'}
            </Link>

            <a
              href={`https://wa.me/523317026066?text=${waHomeMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded shadow-lg hover:shadow-[#D4AF37]/30 transition-all active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 fill-black" />
              <span>{isEn ? 'Contact via WhatsApp' : 'Contactar por WhatsApp'}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
