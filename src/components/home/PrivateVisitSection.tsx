'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Clock, Calendar, Users, Send } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/SocialIcons';
import { Horse } from '@/types';

interface PrivateVisitSectionProps {
  horses?: Horse[];
}

export default function PrivateVisitSection({ horses = [] }: PrivateVisitSectionProps) {
  const [visitorName, setVisitorName] = useState('');
  const [selectedHorse, setSelectedHorse] = useState('Quiero conocer varios');
  const [preferredDay, setPreferredDay] = useState('');

  const horseOptions = horses.length > 0 
    ? [...horses.map(h => h.name), 'Quiero conocer varios']
    : ['Yente', 'Wilco WT fan de Boerdam', 'Yde fan de Kamp', 'Xavi fan Veldzicht', 'Aylan', 'Ykpe', 'Theo', 'Tebbe', 'Ulke', 'Quiero conocer varios'];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = visitorName.trim() || 'Cliente';
    const day = preferredDay.trim() || 'próximamente';
    const text = encodeURIComponent(
      `Buen día. Soy ${name}. Me gustaría agendar una cita privada para ver a ${selectedHorse} el ${day}.`
    );
    window.open(`https://wa.me/523317026066?text=${text}`, '_blank');
  };

  const directWhatsapp = 'https://wa.me/523317026066?text=Buen%20d%C3%ADa.%20Me%20interesa%20conocer%20sus%20caballos.';

  return (
    <section id="visita" className="py-20 bg-[#0B0B0B] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Col 1: Imagen e Información de Ubicación */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl bg-black">
              <Image
                src="/images/horses/Ulke/Ulke_1.jpg"
                alt="Instalaciones privadas Cuadra Imperial Loy en Zapotlanejo Jalisco"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              <div className="absolute top-4 left-4 bg-[#1A1714]/90 backdrop-blur-md border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs text-[#D4AF37] font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Zapotlanejo, Jalisco</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-[#1A1714]/95 backdrop-blur-md border border-neutral-800 p-3.5 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <div>
                    <span className="font-bold text-[#F4EADB] block">
                      A 38 minutos de Guadalajara
                    </span>
                    <span className="text-neutral-400 text-[11px]">
                      Solo usted, su gente y los caballos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Formulario de la Cita Privada (v1.5) */}
          <div className="lg:col-span-7 bg-[#141210] border border-[#D4AF37]/35 rounded-xl p-6 sm:p-8 shadow-2xl">
            {/* Header */}
            <div className="mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
                Cita privada
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4EADB] mb-2">
                Agende su cita privada.
              </h2>
              <p className="text-sm text-neutral-300">
                En Zapotlanejo, Jalisco, a 38 minutos de Guadalajara. Solo usted, su gente y los caballos, sin presión.
              </p>
            </div>

            {/* Formulario (corto) */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                  Su nombre *
                </label>
                <input
                  type="text"
                  required
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="Ej. Roberto Garza"
                  className="w-full bg-[#0B0B0B] border border-neutral-700 focus:border-[#D4AF37] rounded-md px-3.5 py-2.5 text-sm text-[#F4EADB] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                    Caballo que quiere ver
                  </label>
                  <select
                    value={selectedHorse}
                    onChange={(e) => setSelectedHorse(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-neutral-700 focus:border-[#D4AF37] rounded-md px-3 py-2.5 text-xs sm:text-sm text-[#F4EADB] focus:outline-none"
                  >
                    {horseOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                    Día que le acomoda
                  </label>
                  <input
                    type="text"
                    value={preferredDay}
                    onChange={(e) => setPreferredDay(e.target.value)}
                    placeholder="Ej. Este viernes o sábado"
                    className="w-full bg-[#0B0B0B] border border-neutral-700 focus:border-[#D4AF37] rounded-md px-3.5 py-2.5 text-sm text-[#F4EADB] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Botones de acción: Agendar por mensaje + Botón WhatsApp con icono */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-md shadow-lg hover:shadow-[#D4AF37]/30 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Agendar por mensaje</span>
                </button>

                <a
                  href={directWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Atención por WhatsApp"
                  aria-label="Atención por WhatsApp"
                  className="w-12 h-12 shrink-0 flex items-center justify-center bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-md shadow-lg transition-all active:scale-95 border border-white/20"
                >
                  <WhatsAppIcon className="w-6 h-6" />
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
