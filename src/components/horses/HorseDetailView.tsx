'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Horse } from '@/types';
import {
  MessageCircle,
  Download,
  Share2,
  Calendar,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Video,
  FileCheck,
  Truck,
  Users,
  Eye,
  Check,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/SocialIcons';
import LeadGateModal from './LeadGateModal';

interface HorseDetailViewProps {
  horse: Horse;
  relatedHorses: Horse[];
  lang: 'es' | 'en';
}

export default function HorseDetailView({ horse, relatedHorses, lang }: HorseDetailViewProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    desc: true,
    papers: false,
    video: false,
    visit: false,
    shipping: false,
  });

  const [copiedShare, setCopiedShare] = useState(false);
  const [discretePromptVisible, setDiscretePromptVisible] = useState(false);

  // Toggle Accordion
  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Discrete Prompt Timer & Scroll listener
  useEffect(() => {
    const hasPromptDismissed = sessionStorage.getItem(`cil_prompt_${horse.id}`);
    if (hasPromptDismissed) return;

    const timer = setTimeout(() => {
      setDiscretePromptVisible(true);
    }, 40000); // 40 seconds

    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0 && window.scrollY / scrollTotal > 0.6) {
        setDiscretePromptVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [horse.id]);

  const dismissPrompt = () => {
    sessionStorage.setItem(`cil_prompt_${horse.id}`, 'true');
    setDiscretePromptVisible(false);
  };

  const mediaList = [
    ...horse.images.map((img) => ({ type: 'image', url: img.url, alt: img.altEs })),
    ...(horse.videoUrl ? [{ type: 'video', url: horse.videoUrl, alt: 'Video de movimiento' }] : []),
  ];

  const currentMedia = mediaList[activeMediaIndex] || mediaList[0];

  const genderLabel =
    horse.gender === 'macho_entero'
      ? lang === 'es' ? 'Macho Entero' : 'Stallion'
      : horse.gender === 'capon'
      ? lang === 'es' ? 'Capón' : 'Gelding'
      : lang === 'es' ? 'Yegua' : 'Mare';

  const sirePrefix = horse.gender === 'yegua' ? (lang === 'es' ? 'Hija de:' : 'Daughter of:') : (lang === 'es' ? 'Hijo de:' : 'Son of:');
  const grandPrefix = horse.gender === 'yegua' ? (lang === 'es' ? 'Nieta de:' : 'Granddaughter of:') : (lang === 'es' ? 'Nieto de:' : 'Grandson of:');

  const isStud = horse.type === 'semental_maquila';
  const chipEnd = horse.chip ? horse.chip.slice(-4) : 'KFPS';

  const visitMessage = encodeURIComponent(
    `Buen día. Me gustaría agendar una cita privada para ver a ${horse.name}.`
  );

  const priceMessage = encodeURIComponent(
    isStud
      ? `Buen día. Me interesa una maquila de ${horse.name}. ¿Me puede dar su precio?`
      : `Buen día. Me interesa ${horse.name}. ¿Me puede dar su precio?`
  );

  // Web Share API handler for basic sheet
  const handleShareBasic = async () => {
    const basicPdfUrl = `${window.location.origin}/api/pdf/${horse.slug}/basic?lang=${lang}`;
    const shareData = {
      title: `${horse.name} · Cuadra Imperial Loy`,
      text: `${horse.name} (${sirePrefix} ${horse.sire}). ${horse.ageYears} ${lang === 'es' ? 'años' : 'years'}, ${horse.height.toFixed(2)} m. Cuadra Imperial Loy.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback to clipboard
        copyShareLink();
      }
    } else {
      copyShareLink();
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="bg-[#0B0B0B] text-[#F4EADB] min-h-screen pt-24 pb-28">
      {/* Lead Gate Modal */}
      <LeadGateModal
        horse={horse}
        lang={lang}
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
      />

      {/* Discrete Prompt Bar */}
      {discretePromptVisible && (
        <div className="fixed bottom-20 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 sm:max-w-md z-40 bg-[#1A1714]/95 border border-[#D4AF37] rounded-lg shadow-2xl p-4 backdrop-blur-md animate-fadeIn">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-serif font-bold text-[#D4AF37] mb-1">
                {lang === 'es' ? `¿Desea la ficha completa de ${horse.name}?` : `Would you like the full dossier for ${horse.name}?`}
              </p>
              <p className="text-[11px] text-neutral-300">
                {lang === 'es'
                  ? 'Incluye genealogía de 4 generaciones, placas radiológicas y dictamen veterinario oficial.'
                  : 'Includes 4-generation pedigree, x-rays, and official veterinary inspection.'}
              </p>
            </div>
            <button
              onClick={dismissPrompt}
              className="text-neutral-400 hover:text-white text-xs"
              aria-label="Cerrar aviso"
            >
              ✕
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => {
                dismissPrompt();
                setLeadModalOpen(true);
              }}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8892B] text-black font-bold text-[11px] uppercase tracking-wider px-3 py-1.5 rounded"
            >
              {lang === 'es' ? 'Recibir PDF' : 'Get PDF'}
            </button>
            <button
              onClick={dismissPrompt}
              className="text-[11px] text-neutral-400 hover:text-white px-2 py-1"
            >
              {lang === 'es' ? 'Ahora no' : 'Not now'}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <Link href={`/${lang}`} className="hover:text-[#D4AF37]">
            {lang === 'es' ? 'Inicio' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${lang}/ejemplares`} className="hover:text-[#D4AF37]">
            {lang === 'es' ? 'Ejemplares' : 'Horses'}
          </Link>
          <span>/</span>
          <span className="text-[#D4AF37] font-semibold">{horse.name}</span>
        </nav>

        {/* Product Grid: Left Gallery, Right Sticky Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ════ LEFT COLUMN: MEDIA GALLERY ════ */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/80 border border-[#D4AF37]/30 shadow-2xl">
              {currentMedia.type === 'video' ? (
                <video
                  src={currentMedia.url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={currentMedia.url}
                  alt={currentMedia.alt || horse.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="bg-[#0B0B0B]/85 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                  🇳🇱 KFPS Holanda
                </span>
                {horse.status === 'apartado' && (
                  <span className="bg-amber-900/90 text-amber-200 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {lang === 'es' ? 'Apartado' : 'Reserved'}
                  </span>
                )}
                {horse.status === 'vendido' && (
                  <span className="bg-neutral-800 text-neutral-300 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {lang === 'es' ? 'Ya con su nuevo dueño' : 'Sold'}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {mediaList.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border transition-all ${
                    activeMediaIndex === idx
                      ? 'border-[#D4AF37] scale-105 shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                      : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  {m.type === 'video' ? (
                    <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-[#D4AF37]">
                      <Video className="w-6 h-6" />
                    </div>
                  ) : (
                    <Image src={m.url} alt={m.alt} fill className="object-cover" />
                  )}
                </button>
              ))}
            </div>

            {/* Trust Highlights under Gallery */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#1A1714] border border-neutral-800 rounded-lg text-center text-xs text-neutral-300">
              <div>
                <p className="font-bold text-[#D4AF37]">{lang === 'es' ? 'Origen Holandés' : 'Dutch Origin'}</p>
                <p className="text-[11px] text-neutral-400">{lang === 'es' ? 'Sin intermediarios' : 'Direct importation'}</p>
              </div>
              <div className="border-x border-neutral-800">
                <p className="font-bold text-[#D4AF37]">{lang === 'es' ? 'Papeles a su Nombre' : 'Official Transfer'}</p>
                <p className="text-[11px] text-neutral-400">{lang === 'es' ? 'Endoso legal KFPS' : 'KFPS studbook'}</p>
              </div>
              <div>
                <p className="font-bold text-[#D4AF37]">{lang === 'es' ? 'Cita Privada' : 'Private Viewing'}</p>
                <p className="text-[11px] text-neutral-400">{lang === 'es' ? 'Zapotlanejo, Jalisco' : 'Zapotlanejo, Jal.'}</p>
              </div>
            </div>
          </div>

          {/* ════ RIGHT COLUMN: INFORMATION (STRICT ORDER) ════ */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            {/* 1. NOMBRE */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4EADB] tracking-tight">
                {horse.name}
              </h1>

              {/* 2. FILA DE PREMIO (solo si aplica) */}
              {horse.ownAwards && horse.ownAwards.length > 0 && (
                <div className="mt-3 inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/40 px-3.5 py-1.5 rounded text-xs font-semibold text-[#D4AF37]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{horse.ownAwards.join('   ·   ')}</span>
                </div>
              )}
            </div>

            {/* 3, 4, 5. SANGRE & GÉNERO */}
            <div className="bg-[#1A1714] border border-neutral-800 rounded-lg p-5 space-y-2.5 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-neutral-500 w-24 shrink-0">{sirePrefix}</span>
                <span className="font-semibold text-[#F4EADB]">{horse.sire}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-neutral-500 w-24 shrink-0">{grandPrefix}</span>
                <span className="font-semibold text-[#F4EADB]">{horse.grandsire}</span>
              </div>
              <div className="flex items-center gap-3 pt-1 border-t border-neutral-850">
                <span className="text-xs uppercase tracking-wider text-neutral-500 w-24 shrink-0">{lang === 'es' ? 'Condición:' : 'Sex:'}</span>
                <span className="font-semibold text-[#D4AF37]">{genderLabel}</span>
              </div>
            </div>

            {/* 6. TRADUCCIÓN DEL LINAJE EN UNA FRASE */}
            <div className="border-l-2 border-[#D4AF37] pl-4 py-1.5 bg-[#1A1714]/40 rounded-r">
              <p className="font-serif italic text-base text-[#F1D27A] leading-relaxed">
                “{lang === 'es' ? horse.lineageTranslation.es : horse.lineageTranslation.en}”
              </p>
            </div>

            {/* 7. EDAD Y ALZADA A LA CRUZ */}
            <div className="flex items-center gap-6 text-sm text-neutral-300 bg-[#1A1714]/60 border border-neutral-800/80 px-4 py-2.5 rounded">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-neutral-500">{lang === 'es' ? 'Edad:' : 'Age:'}</span>
                <strong className="text-[#F4EADB]">{horse.ageYears} {lang === 'es' ? 'años' : 'years'}</strong>
              </div>
              <span className="text-neutral-600">·</span>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-neutral-500">{lang === 'es' ? 'Alzada:' : 'Height:'}</span>
                <strong className="text-[#F4EADB]">{horse.height.toFixed(2)} m</strong>
                <span className="text-xs text-neutral-400">{lang === 'es' ? 'a la cruz' : 'at withers'}</span>
              </div>
            </div>

            {/* 8. PRECIO */}
            <div className="pt-2 pb-1">
              {horse.showPrice && horse.priceMxn ? (
                <div>
                  <span className="text-xs text-neutral-400 uppercase tracking-wider block mb-1">
                    {lang === 'es' ? 'Precio de Inversión' : 'Official Price'}
                  </span>
                  <div className="text-3xl font-bold text-[#D4AF37] font-serif">
                    ${horse.priceMxn.toLocaleString('es-MX')} MXN
                    {horse.priceUsd && (
                      <span className="text-sm font-normal text-neutral-400 ml-2">
                        (${horse.priceUsd.toLocaleString('en-US')} USD)
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-sm font-serif italic text-[#C2A27C]">
                  {lang === 'es'
                    ? 'Precio directo por WhatsApp, el mismo para todos los clientes.'
                    : 'Direct pricing via WhatsApp, uniform for all clients.'}
                </div>
              )}
            </div>

            {/* Sus papeles (v1.5) */}
            <div className="bg-[#141210] border border-[#D4AF37]/35 rounded-lg p-5 space-y-1.5 text-xs text-neutral-300">
              <p className="font-semibold text-[#F4EADB]">Pasaporte y papeles de origen, registrados en la KFPS.</p>
              <p className="text-neutral-400">Chip: termina en <strong className="text-[#D4AF37]">{chipEnd}</strong></p>
              <p className="text-neutral-500 italic">El registro y la genealogía completa se los mandamos por mensaje.</p>
            </div>

            {/* 9. BOTONES DE ACCIÓN OFICIALES v1.5 */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/523317026066?text=${visitMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider py-4 rounded shadow-xl hover:shadow-[#D4AF37]/30 transition-all active:scale-95 text-center"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Venga a verlo</span>
                </a>

                <a
                  href={`https://wa.me/523317026066?text=${priceMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#1A1714] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold text-xs uppercase tracking-wider py-4 rounded shadow-lg transition-all active:scale-95 text-center"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{isStud ? 'Cotizar maquila' : 'Consultar precio'}</span>
                </a>
              </div>

              <button
                onClick={handleShareBasic}
                className="w-full flex items-center justify-center gap-2 border border-neutral-750 hover:border-[#D4AF37] text-neutral-300 hover:text-white py-3 rounded text-xs font-semibold uppercase tracking-wider transition-all"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedShare ? 'Enlace copiado al portapapeles' : 'Compartir ejemplar'}</span>
              </button>
            </div>

            {/* 10. ACORDEONES DETALLADOS */}
            <div className="pt-6 border-t border-neutral-800 space-y-3">
              {/* Descripción */}
              <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#1A1714]">
                <button
                  onClick={() => toggleAccordion('desc')}
                  className="w-full flex items-center justify-between p-4 text-xs font-semibold uppercase tracking-wider text-[#F4EADB] hover:text-[#D4AF37]"
                >
                  <span>{lang === 'es' ? 'Descripción del Ejemplar' : 'Horse Description'}</span>
                  {openAccordions.desc ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.desc && (
                  <div className="p-4 pt-0 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/60">
                    <p className="mt-3">{lang === 'es' ? horse.description.es : horse.description.en}</p>
                  </div>
                )}
              </div>

              {/* Papeles y Registro KFPS */}
              <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#1A1714]">
                <button
                  onClick={() => toggleAccordion('papers')}
                  className="w-full flex items-center justify-between p-4 text-xs font-semibold uppercase tracking-wider text-[#F4EADB] hover:text-[#D4AF37]"
                >
                  <span>{lang === 'es' ? 'Papeles y Registro KFPS' : 'KFPS Studbook Registration'}</span>
                  {openAccordions.papers ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.papers && (
                  <div className="p-4 pt-0 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/60 space-y-2">
                    <p className="mt-3">
                      {lang === 'es'
                        ? 'Registrado formalmente ante la Real Asociación KFPS de los Países Bajos. Se entrega con pasaporte original y transferencia de titularidad directa al comprador.'
                        : 'Formally recorded in the Royal Dutch KFPS studbook. Accompanied by original European passport and direct ownership transfer certificate.'}
                    </p>
                    <p className="text-[#D4AF37] text-[11px]">
                      {lang === 'es' ? 'Microchip Verificado · Prueba de ADN Oficial' : 'Verified Microchip · Official Parentage DNA test'}
                    </p>
                  </div>
                )}
              </div>

              {/* Video de Movimiento */}
              {horse.hasMovementVideo && (
                <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#1A1714]">
                  <button
                    onClick={() => toggleAccordion('video')}
                    className="w-full flex items-center justify-between p-4 text-xs font-semibold uppercase tracking-wider text-[#F4EADB] hover:text-[#D4AF37]"
                  >
                    <span>{lang === 'es' ? 'Video de Movimiento y Baile' : 'Movement & Gait Video'}</span>
                    {openAccordions.video ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.video && (
                    <div className="p-4 pt-0 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/60 space-y-2">
                      <p className="mt-3">
                        {lang === 'es'
                          ? 'Excelentes movimientos con elevación natural de rodilla y suspensión cadenciada. Solicite el metraje completo por WhatsApp para observarlo bajo montura.'
                          : 'Exceptional movement with high knee action and cadenced suspension. Request full video library directly on WhatsApp.'}
                      </p>
                      <a
                        href={`https://wa.me/523317026066?text=${encodeURIComponent(`Buen día. Me gustaría ver videos adicionales de ${horse.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:underline pt-1 text-xs"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>{lang === 'es' ? 'Ver videos adicionales por WhatsApp' : 'View more videos via WhatsApp'}</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Cita Privada */}
              <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#1A1714]">
                <button
                  onClick={() => toggleAccordion('visit')}
                  className="w-full flex items-center justify-between p-4 text-xs font-semibold uppercase tracking-wider text-[#F4EADB] hover:text-[#D4AF37]"
                >
                  <span>{lang === 'es' ? 'Cita Privada en Jalisco' : 'Private Visit in Jalisco'}</span>
                  {openAccordions.visit ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.visit && (
                  <div className="p-4 pt-0 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/60 space-y-2">
                    <p className="mt-3">
                      {lang === 'es'
                        ? 'Solo usted, su gente y los caballos, sin presión. Su caballerango y veterinario son siempre bienvenidos a nuestras instalaciones en Zapotlanejo (a 38 minutos de Guadalajara).'
                        : 'Only you, your people, and the horses. Your trainer and veterinarian are always welcome at our private stables in Zapotlanejo (38 min from Guadalajara).'}
                    </p>
                  </div>
                )}
              </div>

              {/* Envíos */}
              <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#1A1714]">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between p-4 text-xs font-semibold uppercase tracking-wider text-[#F4EADB] hover:text-[#D4AF37]"
                >
                  <span>{lang === 'es' ? 'Envíos Nacionales e Internacionales' : 'Worldwide Shipping'}</span>
                  {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.shipping && (
                  <div className="p-4 pt-0 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/60 space-y-2">
                    <p className="mt-3">
                      {lang === 'es'
                        ? 'Coordinamos el transporte especializado a cualquier estado de la República Mexicana, Estados Unidos y América Latina con transportistas certificados en remolques climatizados y seguro de traslado.'
                        : 'Specialized climate-controlled equine transportation to any state in Mexico, the United States, and Latin America with certified logistics partners.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 11. MÁS EJEMPLARES (RELACIONADOS) */}
        {relatedHorses.length > 0 && (
          <div className="mt-28 pt-16 border-t border-neutral-900">
            <div className="mb-10 text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                {lang === 'es' ? 'Otros Ejemplares Selectos' : 'Other Select Horses'}
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#F4EADB] mt-1">
                {lang === 'es' ? 'Más Caballos en la Cuadra' : 'More Horses in the Stable'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedHorses.map((rel) => {
                const relImg = rel.images.find((i) => i.isPrimary) || rel.images[0];
                return (
                  <Link
                    key={rel.id}
                    href={`/${lang}/ejemplares/${rel.slug}`}
                    className="card-luxury rounded-lg overflow-hidden group block"
                  >
                    <div className="relative aspect-[4/3] w-full bg-black/60">
                      <Image
                        src={relImg.url}
                        alt={rel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h4 className="font-serif text-xl font-bold text-[#F4EADB] group-hover:text-[#D4AF37] transition-colors">
                        {rel.name}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1">
                        {rel.sire} · {rel.ageYears} {lang === 'es' ? 'años' : 'yrs'}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE STICKY BOTTOM ACTION BAR (v1.5) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0B0B]/98 backdrop-blur-md border-t border-[#D4AF37]/30 p-2.5 flex items-center gap-2">
        <a
          href={`https://wa.me/523317026066?text=${visitMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8892B] text-black font-bold text-[11px] uppercase tracking-wider py-3 rounded shadow text-center"
        >
          <WhatsAppIcon className="w-4 h-4 fill-black" />
          <span>{lang === 'es' ? 'Venga a verlo' : 'Schedule Visit'}</span>
        </a>

        <a
          href={`https://wa.me/523317026066?text=${priceMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#1A1714] border border-[#D4AF37] text-[#D4AF37] font-bold text-[11px] uppercase tracking-wider py-3 rounded text-center"
        >
          <span>
            {lang === 'es'
              ? isStud
                ? 'Cotizar maquila'
                : 'Consultar precio'
              : isStud
                ? 'Inquire Stud'
                : 'Inquire Price'}
          </span>
        </a>
      </div>
    </div>
  );
}
