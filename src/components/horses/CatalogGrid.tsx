'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Horse } from '@/types';
import { Eye, MessageCircle, ArrowRight, ShieldCheck, Filter, RotateCcw } from 'lucide-react';
import QuickViewModal from './QuickViewModal';
import LeadGateModal from './LeadGateModal';

interface CatalogGridProps {
  horses: Horse[];
  lang: 'es' | 'en';
}

export default function CatalogGrid({ horses, lang }: CatalogGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Active filters from search params or defaults
  const genderFilter = searchParams.get('sexo') || 'todos';
  const statusFilter = searchParams.get('estado') || 'todos';
  const fullPaperFilter = searchParams.get('full_paper') || 'todos';
  const videoFilter = searchParams.get('con_video') || 'todos';
  const sortOrder = searchParams.get('orden') || 'recientes';

  const [quickViewHorse, setQuickViewHorse] = useState<Horse | null>(null);
  const [leadModalHorse, setLeadModalHorse] = useState<Horse | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Update URL filter
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'todos' || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    router.push(window.location.pathname, { scroll: false });
  };

  // Separate regular sale horses from breeding stallions (Sementales para maquila)
  const saleHorses = useMemo(() => {
    return horses.filter((h) => h.type === 'venta');
  }, [horses]);

  const studHorses = useMemo(() => {
    return horses.filter((h) => h.type === 'semental_maquila');
  }, [horses]);

  // Apply filters to sale horses
  const filteredSaleHorses = useMemo(() => {
    let list = [...saleHorses];

    if (genderFilter !== 'todos') {
      list = list.filter((h) => h.gender === genderFilter);
    }
    if (statusFilter !== 'todos') {
      list = list.filter((h) => h.status === statusFilter);
    }
    if (fullPaperFilter === 'si') {
      list = list.filter((h) => h.fullPaper);
    }
    if (videoFilter === 'si') {
      list = list.filter((h) => h.hasMovementVideo);
    }

    if (sortOrder === 'edad_asc') {
      list.sort((a, b) => a.ageYears - b.ageYears);
    } else if (sortOrder === 'edad_desc') {
      list.sort((a, b) => b.ageYears - a.ageYears);
    } else if (sortOrder === 'alzada_desc') {
      list.sort((a, b) => b.height - a.height);
    } else {
      // Mas nuevos / orden configurado
      list.sort((a, b) => a.order - b.order);
    }

    return list;
  }, [saleHorses, genderFilter, statusFilter, fullPaperFilter, videoFilter, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Quick View Modal */}
      <QuickViewModal
        horse={quickViewHorse}
        lang={lang}
        isOpen={Boolean(quickViewHorse)}
        onClose={() => setQuickViewHorse(null)}
        onRequestFullPdf={(h) => setLeadModalHorse(h)}
      />

      {/* Lead Gate Modal */}
      {leadModalHorse && (
        <LeadGateModal
          horse={leadModalHorse}
          lang={lang}
          isOpen={Boolean(leadModalHorse)}
          onClose={() => setLeadModalHorse(null)}
        />
      )}

      {/* Filter Control Bar */}
      <div className="bg-[#1A1714] border border-neutral-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
            <Filter className="w-4 h-4" />
            <span>{lang === 'es' ? 'Filtros de Búsqueda' : 'Filter Collection'}</span>
          </div>

          {(genderFilter !== 'todos' || statusFilter !== 'todos' || fullPaperFilter !== 'todos' || videoFilter !== 'todos') && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#D4AF37] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Restablecer' : 'Reset'}</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {/* Sexo */}
          <div>
            <label className="block text-neutral-400 mb-1">{lang === 'es' ? 'Sexo / Condición' : 'Sex'}</label>
            <select
              value={genderFilter}
              onChange={(e) => updateFilter('sexo', e.target.value)}
              className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-xs text-[#F4EADB]"
            >
              <option value="todos">{lang === 'es' ? 'Todos los sexos' : 'All sexes'}</option>
              <option value="macho_entero">{lang === 'es' ? 'Macho entero' : 'Stallion'}</option>
              <option value="capon">{lang === 'es' ? 'Capón' : 'Gelding'}</option>
              <option value="yegua">{lang === 'es' ? 'Yegua' : 'Mare'}</option>
            </select>
          </div>

          {/* Full Paper */}
          <div>
            <label className="block text-neutral-400 mb-1">Full Paper</label>
            <select
              value={fullPaperFilter}
              onChange={(e) => updateFilter('full_paper', e.target.value)}
              className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-xs text-[#F4EADB]"
            >
              <option value="todos">{lang === 'es' ? 'Todos' : 'All'}</option>
              <option value="si">{lang === 'es' ? 'Solo Full Paper' : 'Full Paper only'}</option>
            </select>
          </div>

          {/* Con Video */}
          <div>
            <label className="block text-neutral-400 mb-1">{lang === 'es' ? 'Video' : 'Video'}</label>
            <select
              value={videoFilter}
              onChange={(e) => updateFilter('con_video', e.target.value)}
              className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-xs text-[#F4EADB]"
            >
              <option value="todos">{lang === 'es' ? 'Cualquiera' : 'Any'}</option>
              <option value="si">{lang === 'es' ? 'Con video de movimiento' : 'With video'}</option>
            </select>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-neutral-400 mb-1">{lang === 'es' ? 'Disponibilidad' : 'Status'}</label>
            <select
              value={statusFilter}
              onChange={(e) => updateFilter('estado', e.target.value)}
              className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-xs text-[#F4EADB]"
            >
              <option value="todos">{lang === 'es' ? 'Todos los estados' : 'All statuses'}</option>
              <option value="disponible">{lang === 'es' ? 'Disponible' : 'Available'}</option>
              <option value="apartado">{lang === 'es' ? 'Apartado' : 'Reserved'}</option>
              <option value="vendido">{lang === 'es' ? 'Vendido' : 'Sold'}</option>
            </select>
          </div>

          {/* Orden */}
          <div>
            <label className="block text-neutral-400 mb-1">{lang === 'es' ? 'Ordenar por' : 'Sort by'}</label>
            <select
              value={sortOrder}
              onChange={(e) => updateFilter('orden', e.target.value)}
              className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-xs text-[#F4EADB]"
            >
              <option value="recientes">{lang === 'es' ? 'Selección Cuadra' : 'Curated Order'}</option>
              <option value="edad_asc">{lang === 'es' ? 'Edad: menor a mayor' : 'Age: youngest first'}</option>
              <option value="edad_desc">{lang === 'es' ? 'Edad: mayor a menor' : 'Age: oldest first'}</option>
              <option value="alzada_desc">{lang === 'es' ? 'Alzada: mayor altura' : 'Height: tallest first'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* ════ SECCIÓN 1: CABALLOS EN VENTA ════ */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4EADB]">
              {lang === 'es' ? 'Ejemplares en Venta' : 'Horses for Sale'}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              {lang === 'es'
                ? `Mostrando ${filteredSaleHorses.length} ejemplares selectos importados de Holanda`
                : `Displaying ${filteredSaleHorses.length} select horses imported from the Netherlands`}
            </p>
          </div>
        </div>

        {filteredSaleHorses.length === 0 ? (
          <div className="text-center py-16 bg-[#1A1714] border border-neutral-800 rounded-xl p-8">
            <p className="font-serif text-xl text-neutral-400">
              {lang === 'es' ? 'No se encontraron ejemplares con los filtros seleccionados.' : 'No horses found matching the selected criteria.'}
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#D4AF37] border border-[#D4AF37]/50 px-4 py-2 rounded hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Limpiar filtros' : 'Clear filters'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredSaleHorses.map((horse) => {
              const isHovered = hoveredId === horse.id;
              const primaryImg = horse.images.find((i) => i.isPrimary) || horse.images[0];
              const secondaryImg = horse.images.find((i) => !i.isPrimary) || horse.images[1] || primaryImg;

              const genderLabel =
                horse.gender === 'macho_entero'
                  ? lang === 'es' ? 'Macho Entero' : 'Stallion'
                  : horse.gender === 'capon'
                  ? lang === 'es' ? 'Capón' : 'Gelding'
                  : lang === 'es' ? 'Yegua' : 'Mare';

              const waMsg = encodeURIComponent(
                lang === 'es'
                  ? `Hola, me interesa ${horse.name}. ¿Me comparte información?`
                  : `Hello, I am interested in ${horse.name}. Could you please share more information?`
              );

              return (
                <div
                  key={horse.id}
                  onMouseEnter={() => setHoveredId(horse.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group card-luxury rounded-lg overflow-hidden flex flex-col justify-between"
                >
                  {/* Photo with hover effect */}
                  <div className="relative aspect-[4/3] w-full bg-black overflow-hidden">
                    <Image
                      src={isHovered ? secondaryImg.url : primaryImg.url}
                      alt={horse.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Quick View Button */}
                    <button
                      onClick={() => setQuickViewHorse(horse)}
                      className="absolute bottom-2.5 right-2.5 bg-[#1A1714]/90 backdrop-blur-md text-[#F4EADB] hover:text-[#D4AF37] border border-neutral-700 hover:border-[#D4AF37] p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title={lang === 'es' ? 'Vista Rápida' : 'Quick View'}
                      aria-label="Quick view"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                      <span className="bg-black/80 border border-[#D4AF37]/40 text-[#D4AF37] text-[9px] uppercase font-bold px-2 py-0.5 rounded">
                        🇳🇱 KFPS
                      </span>
                      {horse.status === 'apartado' && (
                        <span className="bg-amber-950 text-amber-200 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                          {lang === 'es' ? 'Apartado' : 'Reserved'}
                        </span>
                      )}
                      {horse.status === 'vendido' && (
                        <span className="bg-neutral-800 text-neutral-300 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                          {lang === 'es' ? 'Vendido' : 'Sold'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between">
                    <div>
                      {horse.ownAwards && horse.ownAwards.length > 0 && (
                        <p className="text-[10px] text-[#D4AF37] font-semibold truncate mb-1">
                          {horse.ownAwards.join(' · ')}
                        </p>
                      )}

                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F4EADB] group-hover:text-[#D4AF37] transition-colors leading-tight mb-1 truncate">
                        <Link href={`/${lang}/ejemplares/${horse.slug}`}>
                          {horse.name}
                        </Link>
                      </h3>

                      <p className="text-[11px] text-neutral-400 truncate mb-1">
                        <span className="text-neutral-500">{horse.gender === 'yegua' ? 'Hija de:' : 'Hijo de:'}</span>{' '}
                        <span className="text-[#F4EADB]">{horse.sire}</span>
                      </p>

                      <div className="flex items-center gap-1.5 text-[11px] text-[#C2A27C] mb-3">
                        <span>{genderLabel}</span>
                        <span>·</span>
                        <span>{horse.ageYears} {lang === 'es' ? 'años' : 'y'}</span>
                        <span>·</span>
                        <span>{horse.height.toFixed(2)} m</span>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-2.5 border-t border-neutral-800/80 flex items-center justify-between gap-1.5">
                      <div className="text-[10px]">
                        {horse.showPrice && horse.priceMxn ? (
                          <span className="font-bold text-[#D4AF37] block">
                            ${horse.priceMxn.toLocaleString('es-MX')}
                          </span>
                        ) : (
                          <span className="text-neutral-400 italic">
                            {lang === 'es' ? 'Precio por mensaje' : 'Price on request'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <a
                          href={`https://wa.me/523317026066?text=${waMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                          title="WhatsApp"
                          aria-label="WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <Link
                          href={`/${lang}/ejemplares/${horse.slug}`}
                          className="bg-neutral-800 hover:bg-[#D4AF37] text-white hover:text-black text-[11px] font-semibold px-2 py-1.5 rounded transition-all flex items-center gap-1"
                        >
                          <span>{lang === 'es' ? 'Ficha' : 'View'}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ════ SECCIÓN 2: SEMENTALES PARA MAQUILA (NO SE VENDEN) ════ */}
      {studHorses.length > 0 && (
        <div className="pt-16 border-t border-neutral-900">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'es' ? 'Línea Genética Selecta' : 'Select Breeding Studs'}</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#F4EADB]">
              {lang === 'es' ? 'Sementales para Maquila' : 'Stud Stallions for Breeding'}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              {lang === 'es'
                ? 'Ejemplares de sangre aprobada disponibles exclusivamente para servicio de maquila por salto directo o semen refrigerado / congelado. No están a la venta.'
                : 'Select stallions available strictly for breeding service via live cover or cooled / frozen semen. Not for sale.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {studHorses.map((stud) => {
              const studImg = stud.images.find((i) => i.isPrimary) || stud.images[0];
              const waMaquilaMsg = encodeURIComponent(
                lang === 'es'
                  ? `Hola, me interesa cotizar servicio de maquila con el semental ${stud.name}. ¿Me comparte condiciones?`
                  : `Hello, I am inquiring about breeding service for stud ${stud.name}. Could you please share terms?`
              );

              return (
                <div
                  key={stud.id}
                  className="card-luxury rounded-lg overflow-hidden flex flex-col justify-between border-[#D4AF37]/30"
                >
                  <div className="relative aspect-[4/3] w-full bg-black">
                    <Image src={studImg.url} alt={stud.name} fill className="object-cover" />
                    <div className="absolute top-3 left-3 bg-[#1A1714]/90 border border-[#D4AF37] text-[#D4AF37] px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                      {lang === 'es' ? 'Semental · Solo Maquila' : 'Stud · Breeding Only'}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-[#F4EADB]">
                      {stud.name}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Hijo de {stud.sire} · {stud.height.toFixed(2)} m a la cruz
                    </p>
                    <p className="text-xs font-serif italic text-[#C2A27C]">
                      “{lang === 'es' ? stud.lineageTranslation.es : stud.lineageTranslation.en}”
                    </p>

                    <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                      <span className="text-xs text-neutral-400">
                        {lang === 'es' ? 'Disponibilidad de maquila' : 'Breeding availability'}
                      </span>
                      <a
                        href={`https://wa.me/523317026066?text=${waMaquilaMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-[#D4AF37] to-[#B8892B] text-black font-bold text-xs uppercase px-4 py-2 rounded flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{lang === 'es' ? 'Cotizar Maquila' : 'Inquire Service'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
