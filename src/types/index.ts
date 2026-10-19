export type HorseGender = 'macho_entero' | 'capon' | 'yegua';
export type HorseType = 'venta' | 'semental_maquila';
export type HorseStatus = 'borrador' | 'disponible' | 'apartado' | 'vendido';

export interface HorseImage {
  url: string;
  altEs: string;
  altEn: string;
  isPrimary?: boolean;
}

export interface HorsePrivateDoc {
  id: string;
  name: string;
  url: string;
  type: 'pasaporte' | 'kfps' | 'veterinaria' | 'otro';
  includeInFullPdf: boolean;
}

export interface Horse {
  id: string;
  slug: string;
  name: string;
  gender: HorseGender;
  type: HorseType;
  status: HorseStatus;
  fullPaper: boolean;
  birthDate: string; // YYYY-MM-DD
  ageYears: number;
  ageMonths: number;
  height: number; // in meters (e.g. 1.68)
  ownAwards: string[]; // e.g. ["1er premio KFPS", "Categoría Ster", "Full Paper"]
  sire: string; // Padre con predicados (ej. Alwin 469 Sport AAA)
  grandsire: string; // Abuelo con predicados (ej. Tsjalke 397 Sport Pref)
  dam?: string;
  showDam?: boolean;
  lineageTranslation: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  hasMovementVideo: boolean;
  priceMxn?: number | null;
  priceUsd?: number | null;
  showPrice: boolean; // default false
  images: HorseImage[];
  videoUrl?: string;
  privateDocs?: HorsePrivateDoc[];
  fieldVisibility?: {
    fullGenealogyInBasic?: boolean;
    vetCheckInBasic?: boolean;
    chipInBasic?: boolean;
  };
  featured: boolean;
  order: number;
  chip?: string;
  registrationNumber?: string;
  vetSummary?: {
    es: string;
    en: string;
  };
  seo?: {
    titleEs?: string;
    titleEn?: string;
    descriptionEs?: string;
    descriptionEn?: string;
    ogImage?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type LeadStatus =
  | 'nuevo'
  | 'contactado_whatsapp'
  | 'cita_agendada'
  | 'visito'
  | 'cerro'
  | 'no_interesado';

export interface Lead {
  id: string;
  horseId: string;
  horseName: string;
  fullName: string;
  whatsapp: string;
  dialCode: string;
  email: string;
  city: string;
  state: string;
  country: string;
  source: 'facebook' | 'instagram' | 'tiktok' | 'recomendado' | 'evento' | 'otro';
  ownsFriesians: boolean;
  interestedInPrivateVisit: boolean;
  message?: string;
  privacyAccepted: boolean;
  status: LeadStatus;
  assignedTo?: string;
  internalNotes?: string;
  language: 'es' | 'en';
  utmSource?: string;
  referrer?: string;
  pdfDownloaded: boolean;
  downloadToken: string;
  tokenExpiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Differentiator {
  id: string;
  number: string;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  quoteEs: string;
  quoteEn: string;
  image: string;
}

export interface FAQItem {
  id: string;
  questionEs: string;
  questionEn: string;
  answerEs: string;
  answerEn: string;
  category?: string;
}

export interface GlobalConfig {
  intro: {
    enabled: boolean;
    videoUrl: string;
    posterUrl: string;
    maxSeconds: number;
  };
  hero: {
    titleEs: string;
    titleEn: string;
    subtitleEs: string;
    subtitleEn: string;
    videoUrl: string;
    posterUrl: string;
  };
  differentiators: Differentiator[];
  ticker: {
    itemsEs: string[];
    itemsEn: string[];
  };
  privateVisit: {
    location: string;
    timeFromGdl: string;
    address: string;
    descEs: string;
    descEn: string;
    image: string;
  };
  shipping: {
    textEs: string;
    textEn: string;
    destinationsEs: string[];
    destinationsEn: string[];
  };
  faqs: FAQItem[];
  contact: {
    phone: string;
    whatsappNumber: string;
    whatsappFormatted: string;
    whatsappPreFilledEs: string;
    whatsappPreFilledEn: string;
    facebookUrl: string;
    instagramUrl: string;
    tiktokUrl: string;
    location: string;
    notificationEmail: string;
  };
  privacyPolicy: {
    es: string;
    en: string;
  };
  terms: {
    es: string;
    en: string;
  };
}

export type UserRole = 'Administrador' | 'Editor' | 'Ventas';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email: string;
}
