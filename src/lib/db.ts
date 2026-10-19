import fs from 'fs';
import path from 'path';
import { Horse, Lead, GlobalConfig, AdminUser, LeadStatus } from '@/types';
import { INITIAL_HORSES, INITIAL_LEADS, INITIAL_GLOBALS, INITIAL_USERS } from '@/data/seed';

export interface DatabaseSchema {
  horses: Horse[];
  leads: Lead[];
  globals: GlobalConfig;
  users: AdminUser[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

function ensureDatabase(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      horses: INITIAL_HORSES,
      leads: INITIAL_LEADS,
      globals: INITIAL_GLOBALS,
      users: INITIAL_USERS,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw) as DatabaseSchema;
  } catch (error) {
    console.error('Error reading database.json, reinitializing from seed:', error);
    const initialData: DatabaseSchema = {
      horses: INITIAL_HORSES,
      leads: INITIAL_LEADS,
      globals: INITIAL_GLOBALS,
      users: INITIAL_USERS,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
    return initialData;
  }
}

function writeDatabase(data: DatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export function calculateAge(birthDateStr: string): { years: number; months: number } {
  const birth = new Date(birthDateStr);
  if (isNaN(birth.getTime())) {
    return { years: 0, months: 0 };
  }
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();

  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) {
    years--;
    months += 12;
  }
  if (now.getDate() < birth.getDate()) {
    months = Math.max(0, months - 1);
  }
  return { years: Math.max(0, years), months: Math.max(0, months) };
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\[ejemplo\]/gi, '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── CABALLOS ──────────────────────────────────────────

export function getHorses(options?: {
  status?: string;
  type?: string;
  featured?: boolean;
  includeDrafts?: boolean;
}): Horse[] {
  const db = ensureDatabase();
  let result = [...db.horses];

  if (!options?.includeDrafts) {
    result = result.filter((h) => h.status !== 'borrador');
  }
  if (options?.status && options.status !== 'todos') {
    result = result.filter((h) => h.status === options.status);
  }
  if (options?.type && options.type !== 'todos') {
    result = result.filter((h) => h.type === options.type);
  }
  if (options?.featured !== undefined) {
    result = result.filter((h) => h.featured === options.featured);
  }

  return result.sort((a, b) => a.order - b.order);
}

export function getHorseBySlug(slug: string): Horse | null {
  const db = ensureDatabase();
  return db.horses.find((h) => h.slug === slug || h.id === slug) || null;
}

export function getHorseById(id: string): Horse | null {
  const db = ensureDatabase();
  return db.horses.find((h) => h.id === id) || null;
}

export function saveHorse(horseData: Partial<Horse> & { name: string; birthDate: string }): Horse {
  const db = ensureDatabase();
  const now = new Date().toISOString();
  const age = calculateAge(horseData.birthDate);

  const existingIndex = horseData.id ? db.horses.findIndex((h) => h.id === horseData.id) : -1;

  if (existingIndex >= 0) {
    const existing = db.horses[existingIndex];
    const updated: Horse = {
      ...existing,
      ...horseData,
      ageYears: age.years,
      ageMonths: age.months,
      slug: horseData.slug || generateSlug(horseData.name),
      updatedAt: now,
    };
    db.horses[existingIndex] = updated;
    writeDatabase(db);
    return updated;
  } else {
    const newId = `horse_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newHorse: Horse = {
      id: newId,
      slug: horseData.slug || generateSlug(horseData.name),
      name: horseData.name,
      gender: horseData.gender || 'macho_entero',
      type: horseData.type || 'venta',
      status: horseData.status || 'disponible',
      fullPaper: horseData.fullPaper ?? true,
      birthDate: horseData.birthDate,
      ageYears: age.years,
      ageMonths: age.months,
      height: horseData.height || 1.68,
      ownAwards: horseData.ownAwards || [],
      sire: horseData.sire || '',
      grandsire: horseData.grandsire || '',
      dam: horseData.dam || '',
      showDam: horseData.showDam ?? false,
      lineageTranslation: horseData.lineageTranslation || { es: '', en: '' },
      description: horseData.description || { es: '', en: '' },
      hasMovementVideo: horseData.hasMovementVideo ?? true,
      priceMxn: horseData.priceMxn ?? null,
      priceUsd: horseData.priceUsd ?? null,
      showPrice: horseData.showPrice ?? false,
      images: horseData.images || [],
      videoUrl: horseData.videoUrl || '',
      privateDocs: horseData.privateDocs || [],
      fieldVisibility: horseData.fieldVisibility || {
        fullGenealogyInBasic: false,
        vetCheckInBasic: false,
        chipInBasic: false,
      },
      featured: horseData.featured ?? false,
      order: horseData.order ?? db.horses.length + 1,
      chip: horseData.chip || '',
      registrationNumber: horseData.registrationNumber || '',
      vetSummary: horseData.vetSummary || { es: '', en: '' },
      seo: horseData.seo || {},
      createdAt: now,
      updatedAt: now,
    };
    db.horses.push(newHorse);
    writeDatabase(db);
    return newHorse;
  }
}

export function deleteHorse(id: string): boolean {
  const db = ensureDatabase();
  const initialLen = db.horses.length;
  db.horses = db.horses.filter((h) => h.id !== id);
  if (db.horses.length !== initialLen) {
    writeDatabase(db);
    return true;
  }
  return false;
}

export function reorderHorses(orderedIds: string[]): boolean {
  const db = ensureDatabase();
  orderedIds.forEach((id, idx) => {
    const horse = db.horses.find((h) => h.id === id);
    if (horse) {
      horse.order = idx + 1;
    }
  });
  writeDatabase(db);
  return true;
}

// ─── LEADS ─────────────────────────────────────────────

export function getLeads(filters?: {
  status?: string;
  horseId?: string;
  search?: string;
}): Lead[] {
  const db = ensureDatabase();
  let result = [...db.leads];

  if (filters?.status && filters.status !== 'todos') {
    result = result.filter((l) => l.status === filters.status);
  }
  if (filters?.horseId && filters.horseId !== 'todos') {
    result = result.filter((l) => l.horseId === filters.horseId);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (l) =>
        l.fullName.toLowerCase().includes(q) ||
        l.whatsapp.includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.horseName.toLowerCase().includes(q)
    );
  }

  return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getLeadById(id: string): Lead | null {
  const db = ensureDatabase();
  return db.leads.find((l) => l.id === id) || null;
}

export function getLeadByToken(token: string): Lead | null {
  const db = ensureDatabase();
  const lead = db.leads.find((l) => l.downloadToken === token);
  if (!lead) return null;
  if (new Date(lead.tokenExpiresAt).getTime() < Date.now()) {
    return null; // Expired
  }
  return lead;
}

export function createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'downloadToken' | 'tokenExpiresAt' | 'pdfDownloaded'>): Lead {
  const db = ensureDatabase();
  const now = new Date();
  const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const token = `cil_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
  const newLead: Lead = {
    ...leadData,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    downloadToken: token,
    tokenExpiresAt: expires.toISOString(),
    pdfDownloaded: false,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  db.leads.unshift(newLead);
  writeDatabase(db);
  return newLead;
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const db = ensureDatabase();
  const index = db.leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const updated: Lead = {
    ...db.leads[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  db.leads[index] = updated;
  writeDatabase(db);
  return updated;
}

export function deleteLead(id: string): boolean {
  const db = ensureDatabase();
  const initialLen = db.leads.length;
  db.leads = db.leads.filter((l) => l.id !== id);
  if (db.leads.length !== initialLen) {
    writeDatabase(db);
    return true;
  }
  return false;
}

// ─── GLOBALS ───────────────────────────────────────────

export function getGlobals(): GlobalConfig {
  const db = ensureDatabase();
  return db.globals;
}

export function updateGlobals(newGlobals: Partial<GlobalConfig>): GlobalConfig {
  const db = ensureDatabase();
  db.globals = {
    ...db.globals,
    ...newGlobals,
  };
  writeDatabase(db);
  return db.globals;
}

// ─── STATS & ANALYTICS ─────────────────────────────────

export function getStats() {
  const db = ensureDatabase();
  const totalLeads = db.leads.length;
  const statusCounts: Record<string, number> = {};
  const horseCounts: Record<string, { name: string; count: number }> = {};
  const sourceCounts: Record<string, number> = {};

  db.leads.forEach((l) => {
    statusCounts[l.status] = (statusCounts[l.status] || 0) + 1;
    sourceCounts[l.source] = (sourceCounts[l.source] || 0) + 1;
    if (!horseCounts[l.horseId]) {
      horseCounts[l.horseId] = { name: l.horseName, count: 0 };
    }
    horseCounts[l.horseId].count++;
  });

  const availableHorses = db.horses.filter((h) => h.status === 'disponible').length;
  const reservedHorses = db.horses.filter((h) => h.status === 'apartado').length;
  const soldHorses = db.horses.filter((h) => h.status === 'vendido').length;

  return {
    totalLeads,
    statusCounts,
    horseCounts: Object.values(horseCounts),
    sourceCounts,
    horsesCount: {
      total: db.horses.length,
      available: availableHorses,
      reserved: reservedHorses,
      sold: soldHorses,
    },
  };
}

export function resetDatabase(): DatabaseSchema {
  const initialData: DatabaseSchema = {
    horses: INITIAL_HORSES,
    leads: INITIAL_LEADS,
    globals: INITIAL_GLOBALS,
    users: INITIAL_USERS,
  };
  writeDatabase(initialData);
  return initialData;
}
