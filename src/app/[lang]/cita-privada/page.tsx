'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Users, CheckCircle2, Send } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/SocialIcons';

export default function CitaPrivadaPage() {
  const routeParams = useParams();
  const lang = (routeParams?.lang === 'en' ? 'en' : 'es') as 'es' | 'en';
  const isEn = lang === 'en';

  const [formData, setFormData] = useState({
    name: '',
    horseName: '',
    preferredDay: '',
  });

  const horses = [
    isEn ? 'Any horse / Personalized consultation' : 'Cualquier ejemplar / Asesoría',
    'Yente (Ster AA)',
    'Wilco WT fan de Boerdam',
    'Yde fan de Kamp (1.72 m)',
    'Xavi fan Veldzicht (Ster)',
    'Aylan (Potro 2 años)',
    'Ykpe (Ster AA)',
    'Theo (Semental de maquila)',
    'Tebbe (Semental de maquila)',
    'Ulke van \'t Heidehoefke',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      isEn
        ? `Hello. My name is ${formData.name || 'Client'}. I would like to schedule a private visit to see ${formData.horseName || 'your Friesian horses'} on ${formData.preferredDay || 'the upcoming weekend'}.`
        : `Buen día. Mi nombre es ${formData.name || 'Cliente'}. Me gustaría agendar una cita privada para conocer ${formData.horseName || 'sus caballos'} el día ${formData.preferredDay || 'próximo fin de semana'}.`
    );
    window.open(`https://wa.me/523317026066?text=${text}`, '_blank');
  };

  const directWhatsapp = `https://wa.me/523317026066?text=${encodeURIComponent(
    isEn
      ? 'Hello. I am interested in scheduling a private appointment at Cuadra Imperial Loy.'
      : 'Buen día. Me interesa agendar una cita privada en Cuadra Imperial Loy.'
  )}`;

  return (
    <div className="bg-[#0B0B0B] text-[#F4EADB] min-h-[calc(100vh-64px)] pt-16 flex items-center justify-center">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Columna Izquierda: Encabezado y Formulario Oficial (7 cols) */}
            <div className="lg:col-span-7 space-y-3.5 text-left">
              <div>
                <div className="inline-flex items-center gap-1.5 border border-[#D4AF37]/35 bg-[#1A1714] px-3 py-0.5 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Exclusivity & Tranquility' : 'Exclusividad & Tranquilidad'}</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl xl:text-4xl font-bold text-[#F4EADB] leading-tight mb-1">
                  {isEn ? 'Schedule your Private Visit in Jalisco' : 'Agende su Cita Privada en Jalisco'}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 leading-snug">
                  {isEn
                    ? 'Only you, your inner circle and the horses, with zero pressure. 38 minutes from Guadalajara.'
                    : 'Solo usted, su gente y los caballos, sin presión. A 38 minutos de Guadalajara.'}
                </p>
              </div>

              {/* Formulario de 3 campos */}
              <form onSubmit={handleSubmit} className="bg-[#141210] border border-[#D4AF37]/35 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                    {isEn ? 'Your Name *' : 'Su Nombre *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isEn ? 'e.g. Mr. Fernando Garcia' : 'Ej. Don Fernando García'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1A1714] border border-neutral-700 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                      {isEn ? 'Horse of Interest' : 'Caballo de Interés'}
                    </label>
                    <select
                      value={formData.horseName}
                      onChange={(e) => setFormData({ ...formData, horseName: e.target.value })}
                      className="w-full bg-[#1A1714] border border-neutral-700 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none transition-colors"
                    >
                      {horses.map((h, i) => (
                        <option key={i} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                      {isEn ? 'Preferred Day' : 'Día Preferido'}
                    </label>
                    <input
                      type="text"
                      placeholder={isEn ? 'e.g. This Saturday morning' : 'Ej. Este sábado por la mañana'}
                      value={formData.preferredDay}
                      onChange={(e) => setFormData({ ...formData, preferredDay: e.target.value })}
                      className="w-full bg-[#1A1714] border border-neutral-700 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex items-center gap-2.5 pt-1">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg shadow-lg hover:shadow-[#D4AF37]/30 transition-all active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Schedule via Message' : 'Agendar por mensaje'}</span>
                  </button>

                  <a
                    href={directWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={isEn ? 'Direct WhatsApp' : 'WhatsApp Directo'}
                    aria-label={isEn ? 'Direct WhatsApp' : 'WhatsApp Directo'}
                    className="w-11 h-11 shrink-0 flex items-center justify-center bg-[#1A1714] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-lg shadow transition-all active:scale-95"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                </div>
              </form>
            </div>

            {/* Columna Derecha: Tarjeta de Instalaciones y Beneficios VIP (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="bg-[#141210] border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-black">
                  <Image
                    src="/images/horses/Yde/Yde_1.jpg"
                    alt="Instalaciones Cuadra Imperial Loy Zapotlanejo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-center text-[10px] text-[#D4AF37] font-semibold bg-black/80 px-2 py-1 rounded border border-[#D4AF37]/25">
                    {isEn
                      ? '📍 Zapotlanejo, Jalisco · 38 min from GDL'
                      : '📍 Zapotlanejo, Jalisco · A 38 min de GDL'}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{isEn ? 'Ridden and dancing exhibition with music' : 'Prueba montada y baile con música'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{isEn ? 'Live microchip scanning and verification' : 'Lectura de microchip presencial'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{isEn ? 'Original European KFPS passport inspection' : 'Inspección de pasaporte KFPS original'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{isEn ? 'Your trainer and veterinarian are welcome' : 'Su veterinario y caballerango son bienvenidos'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
