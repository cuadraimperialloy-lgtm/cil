'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from '@/components/ui/SocialIcons';
import {
  Play,
  Heart,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  Radio,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export interface SocialPost {
  id: string;
  platform: 'Instagram' | 'TikTok' | 'Facebook';
  type: 'reel' | 'video' | 'post';
  handle: string;
  dateEs: string;
  dateEn: string;
  captionEs: string;
  captionEn: string;
  imageUrl: string;
  stats: {
    likes: string;
    comments: string;
    views?: string;
  };
  link: string;
}

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'social_1',
    platform: 'Instagram',
    type: 'reel',
    handle: '@cuadraimperialloy',
    dateEs: 'Hace 2 días',
    dateEn: '2 days ago',
    captionEs:
      'Tarde de música y alta escuela en nuestra pista de Zapotlanejo. La cadencia, elevación y nobleza de Yente.',
    captionEn:
      'Afternoon of traditional music and high-school dressage at our Zapotlanejo arena. Cadence, elevation, and nobility of Yente.',
    imageUrl: '/images/horses/Yente/Yente_1.jpg',
    stats: {
      likes: '3,840',
      comments: '142',
      views: '48.2K',
    },
    link: 'https://www.instagram.com/cuadraimperialloy',
  },
  {
    id: 'social_2',
    platform: 'TikTok',
    type: 'video',
    handle: '@cuadraimperialloy',
    dateEs: 'Hace 4 días',
    dateEn: '4 days ago',
    captionEs:
      'Recibiendo a una familia de amigos que viajó para conocer a Wilco en su cita privada. Convivir con estos gigantes nobles no tiene precio.',
    captionEn:
      'Welcoming a family of friends traveling for their private appointment with Wilco. Experiencing these gentle giants is priceless.',
    imageUrl: '/images/horses/Wilco/Wilco_1.jpg',
    stats: {
      likes: '8,920',
      comments: '315',
      views: '112K',
    },
    link: 'https://www.tiktok.com/@cuadraimperialloy',
  },
  {
    id: 'social_3',
    platform: 'Facebook',
    type: 'post',
    handle: 'Cuadra Imperial Loy Oficial',
    dateEs: 'Esta semana',
    dateEn: 'This week',
    captionEs:
      'Presentación de Yde fan de Kamp. Imponente alzada de 1.72 m y estampa única en Zapotlanejo, Jalisco.',
    captionEn:
      'Presentation of Yde fan de Kamp. Majestic 1.72 m withers height and unique presence in Zapotlanejo, Jalisco.',
    imageUrl: '/images/horses/Yde/Yde_1.jpg',
    stats: {
      likes: '1,450',
      comments: '89',
    },
    link: 'https://www.facebook.com/CuadraImperialLoy',
  },
  {
    id: 'social_4',
    platform: 'Instagram',
    type: 'reel',
    handle: '@cuadraimperialloy',
    dateEs: 'Hace 1 semana',
    dateEn: '1 week ago',
    captionEs:
      'Detrás de cámaras con Xavi fan Veldzicht: rutina matutina de cepillado y acondicionamiento. La salud del caballo es prioridad absoluta.',
    captionEn:
      'Behind the scenes with Xavi fan Veldzicht: morning grooming and conditioning. Health and care is our top priority.',
    imageUrl: '/images/horses/Xavi/Xavi_1.jpg',
    stats: {
      likes: '4,110',
      comments: '98',
      views: '54.1K',
    },
    link: 'https://www.instagram.com/cuadraimperialloy',
  },
  {
    id: 'social_5',
    platform: 'TikTok',
    type: 'video',
    handle: '@cuadraimperialloy',
    dateEs: 'Hace 2 semanas',
    dateEn: '2 weeks ago',
    captionEs:
      'El joven potro Aylan luciendo sus movimientos naturales en pista. Sangre holandesa de primera línea.',
    captionEn:
      'Young stallion Aylan showcasing natural cadence and movement. First-tier Dutch bloodlines.',
    imageUrl: '/images/horses/Aylan/Aylan_1.jpg',
    stats: {
      likes: '6,230',
      comments: '210',
      views: '89.4K',
    },
    link: 'https://www.tiktok.com/@cuadraimperialloy',
  },
  {
    id: 'social_6',
    platform: 'Facebook',
    type: 'post',
    handle: 'Cuadra Imperial Loy Oficial',
    dateEs: 'Hace 3 semanas',
    dateEn: '3 weeks ago',
    captionEs:
      'Tebbe y Theo en su sesión de entrenamiento de trote. Fuerza, elevación y carácter noble.',
    captionEn:
      'Tebbe and Theo during their trot training session. Power, elevation, and gentle disposition.',
    imageUrl: '/images/horses/Tebbe/Tebbe_1.jpg',
    stats: {
      likes: '2,180',
      comments: '134',
    },
    link: 'https://www.facebook.com/CuadraImperialLoy',
  },
];

interface ComunidadSectionProps {
  lang?: 'es' | 'en';
}

export default function ComunidadSection({ lang = 'es' }: ComunidadSectionProps) {
  const [filter, setFilter] = useState<'all' | 'Instagram' | 'TikTok' | 'Facebook'>('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const isEn = lang === 'en';

  const filteredPosts =
    filter === 'all'
      ? SOCIAL_POSTS
      : SOCIAL_POSTS.filter((post) => post.platform === filter);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="comunidad" className="w-full max-w-7xl mx-auto flex flex-col justify-between h-full px-4 sm:px-6 lg:px-8 py-1.5 relative overflow-hidden">
      <div className="w-full flex flex-col flex-1 justify-between min-h-0">
        {/* Header con filtros y flechas de navegación */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 border border-[#D4AF37]/35 bg-[#1A1714] px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-1">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>{isEn ? 'Live Social Feed' : 'Feed Social en Vivo'}</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#F4EADB]">
              {isEn ? 'Welcome to the Family.' : 'Bienvenidos a la familia.'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Filtros */}
            <div className="flex items-center gap-1.5 bg-[#141210] p-1 rounded-full border border-neutral-800 text-[10px]">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                  filter === 'all' ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isEn ? 'All' : 'Todos'}
              </button>
              <button
                onClick={() => setFilter('Instagram')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold transition-all ${
                  filter === 'Instagram' ? 'bg-gradient-to-r from-pink-500 to-amber-500 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <InstagramIcon className="w-3 h-3" />
                <span className="hidden sm:inline">Instagram</span>
              </button>
              <button
                onClick={() => setFilter('TikTok')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold transition-all ${
                  filter === 'TikTok' ? 'bg-neutral-100 text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <TikTokIcon className="w-3 h-3" />
                <span className="hidden sm:inline">TikTok</span>
              </button>
              <button
                onClick={() => setFilter('Facebook')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold transition-all ${
                  filter === 'Facebook' ? 'bg-[#1877F2] text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <FacebookIcon className="w-3 h-3" />
                <span className="hidden sm:inline">Facebook</span>
              </button>
            </div>

            {/* Controles de carrusel */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => scroll('left')}
                className="w-7 h-7 rounded-full bg-[#1A1714] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all"
                aria-label={isEn ? 'Previous' : 'Anterior'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-7 h-7 rounded-full bg-[#1A1714] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all"
                aria-label={isEn ? 'Next' : 'Siguiente'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carrusel Horizontal de Publicaciones Sociales */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto py-2 scroll-smooth snap-x snap-mandatory scrollbar-none flex-1 min-h-0 items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredPosts.map((post) => {
            const isReel = post.type === 'reel' || post.type === 'video';

            return (
              <article
                key={post.id}
                className="flex-shrink-0 w-[270px] sm:w-[300px] snap-start bg-[#141210] border border-neutral-800 hover:border-[#D4AF37]/60 rounded-xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                {/* Header compacto del post */}
                <div className="p-2.5 flex items-center justify-between border-b border-neutral-850">
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#D4AF37]/50 bg-black shrink-0">
                      <Image
                        src="/brand/Logotipo_Cuadra_Imperial_Loy_isotipo_degradado.svg"
                        alt="Cuadra Imperial Loy"
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-[11px] text-[#F4EADB]">
                          Cuadra Imperial Loy
                        </span>
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#D4AF37] fill-current" />
                      </div>
                      <span className="text-[9px] text-neutral-400 block leading-tight">
                        {post.handle} · {isEn ? post.dateEn : post.dateEs}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] text-[#D4AF37] font-semibold uppercase">
                    {post.platform}
                  </span>
                </div>

                {/* Media Container con aspecto de Reel/Post */}
                <div className="relative aspect-[16/10] w-full bg-black overflow-hidden group/media">
                  <Image
                    src={post.imageUrl}
                    alt={isEn ? post.captionEn : post.captionEs}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {isReel && (
                    <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] text-white flex items-center gap-1 font-semibold">
                      <Play className="w-2 h-2 fill-current text-[#D4AF37]" />
                      <span>{post.platform === 'Instagram' ? 'Reel' : 'TikTok'}</span>
                    </div>
                  )}
                  {post.stats.views && (
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] text-white">
                      ▶ {post.stats.views}
                    </div>
                  )}
                </div>

                {/* Cuerpo del Post */}
                <div className="p-2.5 flex flex-col justify-between flex-grow text-left">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 text-neutral-400 text-[10px]">
                      <span className="flex items-center gap-1 text-rose-400 font-medium">
                        <Heart className="w-3 h-3 fill-rose-500/30" />
                        <span>{post.stats.likes}</span>
                      </span>
                      <span className="flex items-center gap-1 text-neutral-300">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.stats.comments}</span>
                      </span>
                    </div>

                    <p className="text-[11px] text-[#F4EADB]/90 leading-snug line-clamp-2">
                      “{isEn ? post.captionEn : post.captionEs}”
                    </p>
                  </div>

                  <div className="pt-2 mt-1.5 border-t border-neutral-850">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1 text-[10px] font-semibold py-1 rounded bg-[#1A1714] border border-neutral-800 hover:border-[#D4AF37] text-neutral-300 hover:text-[#D4AF37] transition-all"
                    >
                      <span>{isEn ? `View on ${post.platform}` : `Ver en ${post.platform}`}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Barra inferior de Seguimiento Oficial */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#141210] border border-[#D4AF37]/35 rounded-xl shrink-0 mt-2 text-xs">
          <span className="text-[11px] text-[#F4EADB] font-medium hidden sm:inline">
            {isEn ? 'Follow our official channels:' : 'Síganos en nuestras cuentas oficiales:'}
          </span>

          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <a
              href="https://www.facebook.com/CuadraImperialLoy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#1877F2] text-white text-[10px] font-bold uppercase tracking-wider"
            >
              <FacebookIcon className="w-3 h-3" />
              <span>Facebook</span>
            </a>

            <a
              href="https://www.instagram.com/cuadraimperialloy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white text-[10px] font-bold uppercase tracking-wider"
            >
              <InstagramIcon className="w-3 h-3" />
              <span>Instagram</span>
            </a>

            <a
              href="https://www.tiktok.com/@cuadraimperialloy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-black border border-neutral-700 text-white text-[10px] font-bold uppercase tracking-wider"
            >
              <TikTokIcon className="w-3 h-3" />
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
