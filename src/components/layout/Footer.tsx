import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ShieldCheck, Lock } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/ui/SocialIcons';

interface FooterProps {
  lang?: 'es' | 'en';
}

export default function Footer({ lang = 'es' }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isEn = lang === 'en';

  const waMsg = encodeURIComponent(
    isEn
      ? 'Hello, I am interested in learning more about your Friesian horses.'
      : 'Buen día. Me interesa conocer sus caballos.'
  );

  return (
    <footer className="bg-[#0B0B0B] border-t border-[#D4AF37]/20 text-[#F4EADB]/80 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Marca y Resumen (v1.5) */}
          <div className="md:col-span-2 space-y-4 text-left">
            <Link href={`/${lang}`} className="inline-block">
              <div className="relative w-56 h-14">
                <Image
                  src="/brand/Logotipo_Cuadra_Imperial_Loy_horizontal_degradado.svg"
                  alt="Cuadra Imperial Loy"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-[#D4AF37] font-serif text-base italic max-w-md">
              {isEn
                ? '“Receive your horse sound and with certified origin papers.”'
                : '“Recibe su caballo sano y con papeles de origen.”'}
            </p>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              {isEn
                ? 'Friesian horses for sale in Zapotlanejo, Jalisco. Safe shipping across Mexico, the United States, and Latin America. Direct stable relationship.'
                : 'Caballos frisones en venta en Zapotlanejo, Jalisco. Envíos seguros a todo México, Estados Unidos y América Latina. Trato directo con la cuadra.'}
            </p>
            <p className="text-[11px] text-[#C2A27C] font-medium">
              {isEn
                ? 'Imported from the Netherlands · In Zapotlanejo, Jalisco · Safe Shipping to Mexico, USA & Latin America'
                : 'Importados de Holanda · En Zapotlanejo, Jalisco · Envíos seguros a México, EE. UU. y América Latina'}
            </p>

            {/* Redes sociales */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/CuadraImperialLoy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#141210] border border-[#D4AF37]/35 flex items-center justify-center text-[#F4EADB] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/cuadraimperialloy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#141210] border border-[#D4AF37]/35 flex items-center justify-center text-[#F4EADB] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@cuadraimperialloy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#141210] border border-[#D4AF37]/35 flex items-center justify-center text-[#F4EADB] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/523317026066?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] flex items-center justify-center text-black shadow-md transition-all active:scale-95"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-black" />
              </a>
            </div>
          </div>

          {/* Col 2: Enlaces v1.5 */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
              {isEn ? 'Navigation' : 'Navegación'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${lang}/ejemplares`} className="hover:text-[#D4AF37] transition-colors">
                  {isEn ? 'Horses for Sale' : 'Caballos en venta'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/cita-privada`} className="hover:text-[#D4AF37] transition-colors">
                  {isEn ? 'Private Visit' : 'Cita privada'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/garantia`} className="hover:text-[#D4AF37] transition-colors">
                  {isEn ? 'Warranty & Shipping' : 'Garantía y envíos'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/la-cuadra`} className="hover:text-[#D4AF37] transition-colors">
                  {isEn ? 'The Stable' : 'La cuadra'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/comunidad`} className="hover:text-[#D4AF37] transition-colors">
                  {isEn ? 'Community' : 'Comunidad'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/preguntas`} className="hover:text-[#D4AF37] transition-colors">
                  {isEn ? 'FAQs' : 'Preguntas frecuentes'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacto v1.5 */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
              {isEn ? 'Direct Contact' : 'Contacto Directo'}
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-neutral-300">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#F4EADB]">
                  {isEn ? 'Zapotlanejo, Jalisco, Mexico' : 'Zapotlanejo, Jalisco, México'}
                </p>
                <p className="text-neutral-400">
                  {isEn ? '38 minutes from Guadalajara' : 'A 38 minutos de Guadalajara'}
                </p>
                <p className="text-[11px] text-[#C2A27C] mt-1">
                  {isEn ? 'Visits strictly by confirmed private appointment' : 'Visitas únicamente con cita privada previa'}
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs space-y-1">
              <p className="text-neutral-400">{isEn ? 'Official WhatsApp:' : 'WhatsApp Oficial:'}</p>
              <a
                href={`https://wa.me/523317026066?text=${waMsg}`}
                className="text-[#D4AF37] font-semibold text-sm hover:underline block"
              >
                +52 33 1702 6066
              </a>

              <p className="text-neutral-400 pt-1.5">{isEn ? 'Official Email:' : 'Correo Oficial:'}</p>
              <a
                href="mailto:info@cuadraimperialloy.com"
                className="text-[#F4EADB] hover:text-[#D4AF37] font-medium text-xs hover:underline block transition-colors"
              >
                info@cuadraimperialloy.com
              </a>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/90 pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isEn ? 'Registered with Royal KFPS Studbook' : 'Registrados en la Real Asociación KFPS'}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            {isEn
              ? `© ${currentYear} Cuadra Imperial Loy. All rights reserved.`
              : `© ${currentYear} Cuadra Imperial Loy. Todos los derechos reservados.`}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}/privacidad`} className="hover:text-[#D4AF37] transition-colors">
              {isEn ? 'Privacy Policy (LFPDPPP)' : 'Aviso de Privacidad (LFPDPPP)'}
            </Link>
            <Link href={`/${lang}/terminos`} className="hover:text-[#D4AF37] transition-colors">
              {isEn ? 'Terms & Conditions' : 'Términos y Condiciones'}
            </Link>
            <Link href="/admin" className="flex items-center gap-1 text-neutral-600 hover:text-[#D4AF37] transition-colors">
              <Lock className="w-3 h-3" />
              <span>CMS</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
