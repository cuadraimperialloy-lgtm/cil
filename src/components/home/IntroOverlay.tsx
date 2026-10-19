'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IntroOverlayProps {
  currentLang: 'es' | 'en';
  enabled?: boolean;
  videoUrl?: string;
  posterUrl?: string;
}

export default function IntroOverlay({
  currentLang,
  enabled = true,
  videoUrl = '/images/horses/Yente/Yente_Trote.mp4',
  posterUrl = '/images/horses/Yente/Yente_1.jpg',
}: IntroOverlayProps) {
  const [visible, setVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'es' | 'en'>(currentLang);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;
    const hasSeenIntro = sessionStorage.getItem('cil_intro_seen');
    if (!hasSeenIntro) {
      setVisible(true);
    }
  }, [enabled]);

  const handleDismiss = (chosenLang: 'es' | 'en') => {
    sessionStorage.setItem('cil_intro_seen', 'true');
    setVisible(false);
    if (chosenLang !== currentLang) {
      router.push(`/${chosenLang}`);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0B0B] flex flex-col items-center justify-between p-6 sm:p-10 overflow-hidden">
      {/* Background Horse Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105 transition-opacity duration-1000"
        />
        {/* Luxury Vignette & Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-[#0B0B0B]/90" />
      </div>

      {/* Top Header: Sound toggle & Instant Skip button (visible from second 1) */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex items-center gap-2 bg-[#1A1714]/80 border border-[#D4AF37]/30 text-[#D4AF37] px-3.5 py-1.5 rounded-full text-xs hover:border-[#D4AF37] transition-all"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          <span>{isMuted ? (selectedLang === 'es' ? 'Sonido apagado' : 'Sound muted') : (selectedLang === 'es' ? 'Sonido activo' : 'Sound on')}</span>
        </button>

        <button
          onClick={() => handleDismiss(selectedLang)}
          className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F4EADB]/70 hover:text-[#D4AF37] bg-black/40 border border-neutral-700/60 hover:border-[#D4AF37]/40 px-4 py-1.5 rounded-full transition-all"
        >
          {selectedLang === 'es' ? 'Saltar ▸' : 'Skip ▸'}
        </button>
      </div>

      {/* Center: Glowing Gold Monogram & Brand Name */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto max-w-xl">
        {/* Logotipo Oficial Registrado */}
        <div className="relative w-64 sm:w-96 h-20 sm:h-28 mb-4">
          <Image
            src="/brand/Logotipo_Cuadra_Imperial_Loy_horizontal_degradado.svg"
            alt="Cuadra Imperial Loy"
            fill
            className="object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.45)]"
            priority
          />
        </div>

        <div className="text-xs sm:text-sm tracking-[0.35em] text-[#D4AF37] font-semibold mb-6">
          ZAPOTLANEJO · JALISCO
        </div>

        <p className="font-serif text-lg sm:text-xl text-[#F4EADB]/90 italic max-w-md mb-8">
          “{selectedLang === 'es' ? 'Recibe su caballo sano y con papeles de origen.' : 'Receive your horse sound and with certified origin papers.'}”
        </p>

        {/* Language Selection & Enter Button */}
        <div className="w-full max-w-xs flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 bg-[#1A1714] border border-[#D4AF37]/30 p-1 rounded">
            <button
              onClick={() => setSelectedLang('es')}
              className={`py-2 text-xs font-semibold tracking-wider uppercase rounded transition-all ${
                selectedLang === 'es' ? 'bg-[#D4AF37] text-black shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Español
            </button>
            <button
              onClick={() => setSelectedLang('en')}
              className={`py-2 text-xs font-semibold tracking-wider uppercase rounded transition-all ${
                selectedLang === 'en' ? 'bg-[#D4AF37] text-black shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          <button
            onClick={() => handleDismiss(selectedLang)}
            className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-[#0B0B0B] font-bold text-xs uppercase tracking-[0.2em] py-3.5 rounded shadow-xl hover:shadow-[#D4AF37]/30 transition-all transform hover:scale-[1.02]"
          >
            <span>{selectedLang === 'es' ? 'Entrar a la Cuadra' : 'Enter the Stable'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="relative z-10 text-[11px] text-neutral-500 tracking-wider uppercase">
        {selectedLang === 'es' ? 'Caballos Frisones Selectos KFPS · Países Bajos' : 'Select KFPS Friesian Horses · Netherlands'}
      </div>
    </div>
  );
}
