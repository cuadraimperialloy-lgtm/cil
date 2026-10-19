'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  lang?: 'es' | 'en';
}

export default function Navbar({ lang = 'es' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLangUrl = (targetLang: 'es' | 'en') => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split('/');
    if (segments.length > 1 && (segments[1] === 'es' || segments[1] === 'en')) {
      segments[1] = targetLang;
      return segments.join('/') || `/${targetLang}`;
    }
    return `/${targetLang}`;
  };

  const navLinks = [
    { href: `/${lang}/ejemplares`, label: lang === 'es' ? 'Caballos en venta' : 'Horses for Sale' },
    { href: `/${lang}/cita-privada`, label: lang === 'es' ? 'Cita privada' : 'Private Visit' },
    { href: `/${lang}/garantia`, label: lang === 'es' ? 'Garantía y envíos' : 'Warranty & Shipping' },
    { href: `/${lang}/la-cuadra`, label: lang === 'es' ? 'La cuadra' : 'The Stable' },
    { href: `/${lang}/comunidad`, label: lang === 'es' ? 'Comunidad' : 'Community' },
    { href: `/${lang}/preguntas`, label: lang === 'es' ? 'Preguntas' : 'FAQs' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0B0B]/95 backdrop-blur-md py-2.5 border-b border-[#D4AF37]/25 shadow-2xl'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logotipo Oficial Registrado */}
        <Link
          href={`/${lang}`}
          className="relative h-9 sm:h-11 w-36 sm:w-48 transition-transform duration-300 hover:scale-[1.02] focus:outline-none shrink-0"
        >
          <Image
            src="/brand/Logotipo_Cuadra_Imperial_Loy_horizontal_degradado.svg"
            alt="Cuadra Imperial Loy"
            fill
            className="object-contain object-left drop-shadow-[0_0_12px_rgba(212,175,55,0.25)]"
            priority
          />
        </Link>

        {/* Desktop Navigation Links (Más pequeños y elegantes para no saturar) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] xl:text-[12px] font-medium tracking-[0.06em] text-[#F4EADB]/80 hover:text-[#D4AF37] transition-colors py-1 relative group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Action Controls: CTA Cita Privada + Selector de Lenguaje (Sin icono whats superior) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <Link
            href={`/${lang}/cita-privada`}
            className="bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-black font-bold text-[10px] uppercase tracking-[0.14em] px-3.5 py-1.5 rounded shadow-md hover:shadow-[#D4AF37]/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            {lang === 'es' ? 'Cita Privada' : 'Private Visit'}
          </Link>

          {/* Selector de Lenguaje ES | EN */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#141210] border border-[#D4AF37]/40 text-[10px] font-bold tracking-wider">
            <Link
              href={getLangUrl('es')}
              className={`transition-colors px-1 py-0.5 rounded ${
                lang === 'es'
                  ? 'text-[#D4AF37] font-extrabold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              ES
            </Link>
            <span className="text-neutral-600">|</span>
            <Link
              href={getLangUrl('en')}
              className={`transition-colors px-1 py-0.5 rounded ${
                lang === 'en'
                  ? 'text-[#D4AF37] font-extrabold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              EN
            </Link>
          </div>
        </div>

        {/* Mobile Header: Selector de Lenguaje + Menú Hamburguesa */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Selector de Lenguaje Mobile */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#141210] border border-[#D4AF37]/40 text-[10px] font-bold tracking-wider">
            <Link
              href={getLangUrl('es')}
              className={lang === 'es' ? 'text-[#D4AF37]' : 'text-neutral-400'}
            >
              ES
            </Link>
            <span className="text-neutral-600">|</span>
            <Link
              href={getLangUrl('en')}
              className={lang === 'en' ? 'text-[#D4AF37]' : 'text-neutral-400'}
            >
              EN
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#F4EADB] hover:text-[#D4AF37] p-1.5 focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#D4AF37]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0B0B]/98 border-b border-[#D4AF37]/30 px-6 py-5 animate-fadeIn">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold tracking-wider text-[#F4EADB] hover:text-[#D4AF37] py-1.5 border-b border-neutral-900"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${lang}/cita-privada`}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center bg-gradient-to-r from-[#D4AF37] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider py-2.5 rounded"
            >
              {lang === 'es' ? 'Agendar Cita Privada' : 'Schedule Private Visit'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
