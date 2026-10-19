'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Horse, Lead, GlobalConfig, AdminUser, UserRole, LeadStatus } from '@/types';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Download,
  ExternalLink,
  MessageCircle,
  Search,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  ShieldAlert,
  Save,
  RotateCcw,
  Eye,
  LogOut,
  AlertTriangle,
} from 'lucide-react';

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<AdminUser>({
    id: 'user_admin',
    username: 'admin',
    name: 'Dirección General',
    role: 'Administrador',
    email: 'info@cuadraimperialloy.com',
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'horses' | 'leads' | 'globals'>('dashboard');

  const [horses, setHorses] = useState<Horse[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [globals, setGlobals] = useState<GlobalConfig | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Horse Edit Modal State
  const [editingHorse, setEditingHorse] = useState<Partial<Horse> | null>(null);
  const [isNewHorse, setIsNewHorse] = useState(false);
  const [horseModalOpen, setHorseModalOpen] = useState(false);
  const [horseSaveMessage, setHorseSaveMessage] = useState<string | null>(null);

  // Leads Filter & Search State
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('todos');

  // Load Initial Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [hRes, lRes, gRes, sRes] = await Promise.all([
        fetch('/api/horses?includeDrafts=true').then((r) => r.json()),
        fetch('/api/leads').then((r) => r.json()),
        fetch('/api/globals').then((r) => r.json()),
        fetch('/api/admin/stats').then((r) => r.json()),
      ]);

      if (hRes.success) setHorses(hRes.horses);
      if (lRes.success) setLeads(lRes.leads);
      if (gRes.success) setGlobals(gRes.globals);
      if (sRes.success) setStats(sRes.stats);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ─── HORSE CRUD ──────────────────────────────────────────

  const handleCreateHorse = () => {
    setIsNewHorse(true);
    setEditingHorse({
      name: '',
      gender: 'macho_entero',
      type: 'venta',
      status: 'disponible',
      fullPaper: true,
      birthDate: '2021-01-01',
      height: 1.68,
      ownAwards: [],
      sire: '',
      grandsire: '',
      dam: '',
      showDam: false,
      lineageTranslation: { es: '', en: '' },
      description: { es: '', en: '' },
      hasMovementVideo: true,
      priceMxn: 800000,
      priceUsd: 42000,
      showPrice: false,
      images: [
        {
          url: '/images/horses/Yente/Yente_1.jpg',
          altEs: 'Caballo frisón de Cuadra Imperial Loy',
          altEn: 'Friesian horse Cuadra Imperial Loy',
          isPrimary: true,
        },
      ],
      videoUrl: '/images/hero-frison.mp4',
      featured: true,
      order: horses.length + 1,
    });
    setHorseModalOpen(true);
  };

  const handleEditHorse = (horse: Horse) => {
    setIsNewHorse(false);
    setEditingHorse({ ...horse });
    setHorseModalOpen(true);
  };

  const handleDuplicateHorse = (horse: Horse) => {
    setIsNewHorse(true);
    setEditingHorse({
      ...horse,
      id: undefined,
      name: `${horse.name} (Copia)`,
      slug: undefined,
      order: horses.length + 1,
    });
    setHorseModalOpen(true);
  };

  const handleDeleteHorse = async (id: string) => {
    if (!confirm('¿Está seguro de eliminar este ejemplar? Esta acción no se puede deshacer.')) return;
    try {
      const res = await fetch(`/api/horses/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setHorses(horses.filter((h) => h.id !== id));
      }
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  const handleSaveHorse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHorse) return;

    // Check for banned words Stb / Vb warning
    if (editingHorse.sire?.includes('Stb') || editingHorse.sire?.includes('Vb') || editingHorse.grandsire?.includes('Stb') || editingHorse.grandsire?.includes('Vb')) {
      alert('Aviso de Reglas de Marca: Las siglas "Stb" y "Vb" no deben usarse en el nombre del padre ni del abuelo. Por favor retírelas para guardar.');
      return;
    }

    try {
      const res = await fetch('/api/horses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingHorse),
      });
      const data = await res.json();
      if (data.success) {
        setHorseSaveMessage('¡Ejemplar guardado exitosamente!');
        setTimeout(() => {
          setHorseSaveMessage(null);
          setHorseModalOpen(false);
          fetchData();
        }, 1200);
      } else {
        alert(data.error || 'Error al guardar');
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= horses.length) return;

    const newHorses = [...horses];
    const temp = newHorses[index];
    newHorses[index] = newHorses[targetIndex];
    newHorses[targetIndex] = temp;

    setHorses(newHorses);

    const orderedIds = newHorses.map((h) => h.id);
    await fetch('/api/horses/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderedIds }),
    });
  };

  // ─── LEADS UPDATE ────────────────────────────────────────

  const handleUpdateLeadStatus = async (id: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
      }
    } catch (err) {
      alert('Error al actualizar estatus');
    }
  };

  const handleUpdateLeadNotes = async (id: string, notes: string) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internalNotes: notes }),
      });
    } catch (err) {
      console.error('Error saving notes:', err);
    }
  };

  // ─── GLOBALS UPDATE ──────────────────────────────────────

  const handleSaveGlobals = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!globals) return;
    try {
      const res = await fetch('/api/globals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(globals),
      });
      const data = await res.json();
      if (data.success) {
        alert('Configuraciones globales actualizadas con éxito.');
      }
    } catch (err) {
      alert('Error al guardar configuraciones');
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    if (leadStatusFilter !== 'todos' && l.status !== leadStatusFilter) return false;
    if (leadSearch) {
      const q = leadSearch.toLowerCase();
      return (
        l.fullName.toLowerCase().includes(q) ||
        l.whatsapp.includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.horseName.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4EADB] flex flex-col">
      {/* Top Header */}
      <header className="bg-[#1A1714] border-b border-[#D4AF37]/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-44 sm:w-52 h-10">
            <Image
              src="/brand/Logotipo_Cuadra_Imperial_Loy_horizontal_degradado.svg"
              alt="Cuadra Imperial Loy"
              fill
              className="object-contain object-left"
            />
          </div>
          <span className="hidden sm:inline-block text-[11px] tracking-widest text-[#D4AF37] font-semibold border-l border-[#D4AF37]/30 pl-4 py-1">
            PANEL DE ADMINISTRACIÓN
          </span>
        </div>

        {/* User Role Switcher (Simulated Session) */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#0B0B0B] border border-neutral-700 rounded px-3 py-1.5 text-xs">
            <span className="text-neutral-400">Rol activo:</span>
            <select
              value={currentUser.role}
              onChange={(e) => {
                const newRole = e.target.value as UserRole;
                setCurrentUser({
                  ...currentUser,
                  role: newRole,
                  name: newRole === 'Administrador' ? 'Dirección General' : newRole === 'Editor' ? 'Editor de Contenido' : 'Atención a Clientes',
                });
              }}
              className="bg-transparent text-[#D4AF37] font-bold focus:outline-none"
            >
              <option value="Administrador">Administrador (Total)</option>
              <option value="Editor">Editor (Caballos/CMS)</option>
              <option value="Ventas">Ventas (Solo Leads)</option>
            </select>
          </div>

          <Link
            href="/es"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-[#D4AF37] border border-neutral-700 px-3 py-1.5 rounded transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Sitio Web</span>
          </Link>
        </div>
      </header>

      {/* Main Layout: Sidebar + Workspace */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 bg-[#141210] border-r border-neutral-800 p-4 space-y-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8892B] text-black shadow'
                : 'text-neutral-300 hover:bg-neutral-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Tablero General</span>
          </button>

          {(currentUser.role === 'Administrador' || currentUser.role === 'Editor') && (
            <button
              onClick={() => setActiveTab('horses')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'horses'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8892B] text-black shadow'
                  : 'text-neutral-300 hover:bg-neutral-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Ejemplares</span>
              </div>
              <span className="bg-black/40 text-[10px] px-2 py-0.5 rounded font-mono">
                {horses.length}
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'leads'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8892B] text-black shadow'
                : 'text-neutral-300 hover:bg-neutral-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              <span>Prospectos / Leads</span>
            </div>
            <span className="bg-black/40 text-[10px] px-2 py-0.5 rounded font-mono">
              {leads.length}
            </span>
          </button>

          {currentUser.role === 'Administrador' && (
            <button
              onClick={() => setActiveTab('globals')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'globals'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8892B] text-black shadow'
                  : 'text-neutral-300 hover:bg-neutral-800/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configuración Global</span>
            </button>
          )}

          <div className="pt-8 border-t border-neutral-800/80 mt-8 text-xs text-neutral-500 px-3">
            <p className="font-semibold text-neutral-400">Cuadra Imperial Loy</p>
            <p className="text-[11px] mt-0.5">Versión 2.0 · Producción</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-grow p-6 sm:p-10 overflow-y-auto">
          {loading ? (
            <div className="text-center py-24 text-neutral-400 font-serif text-lg">
              Cargando información del sistema...
            </div>
          ) : (
            <>
              {/* ═════════ TAB 1: TABLERO GENERAL ═════════ */}
              {activeTab === 'dashboard' && stats && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-[#F4EADB]">
                      Tablero de Operación & Conversión
                    </h2>
                    <p className="text-xs text-neutral-400 mt-1">
                      Métricas en tiempo real de leads, visitas a fichas y estatus de ejemplares en Jalisco.
                    </p>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="card-luxury p-5 rounded-lg border-l-4 border-l-[#D4AF37]">
                      <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                        Total Prospectos (Leads)
                      </span>
                      <div className="text-3xl font-bold font-serif text-[#F4EADB] mt-2">
                        {stats.totalLeads}
                      </div>
                      <span className="text-[11px] text-[#D4AF37] mt-1 block">
                        Interesados con teléfono verificado
                      </span>
                    </div>

                    <div className="card-luxury p-5 rounded-lg border-l-4 border-l-emerald-500">
                      <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                        Caballos Disponibles
                      </span>
                      <div className="text-3xl font-bold font-serif text-emerald-400 mt-2">
                        {stats.horsesCount.available}
                      </div>
                      <span className="text-[11px] text-neutral-400 mt-1 block">
                        De {stats.horsesCount.total} ejemplares en la cuadra
                      </span>
                    </div>

                    <div className="card-luxury p-5 rounded-lg border-l-4 border-l-amber-500">
                      <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                        Apartados
                      </span>
                      <div className="text-3xl font-bold font-serif text-amber-400 mt-2">
                        {stats.horsesCount.reserved}
                      </div>
                      <span className="text-[11px] text-neutral-400 mt-1 block">
                        En proceso de visita o enganche
                      </span>
                    </div>

                    <div className="card-luxury p-5 rounded-lg border-l-4 border-l-neutral-600">
                      <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                        Cerrados / Vendidos
                      </span>
                      <div className="text-3xl font-bold font-serif text-neutral-300 mt-2">
                        {stats.horsesCount.sold}
                      </div>
                      <span className="text-[11px] text-neutral-400 mt-1 block">
                        Con sus nuevos dueños
                      </span>
                    </div>
                  </div>

                  {/* Charts / Distribution Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Leads by Horse */}
                    <div className="card-luxury p-6 rounded-lg space-y-4">
                      <h3 className="font-serif text-xl font-bold text-[#F4EADB]">
                        Interés por Ejemplar
                      </h3>
                      <div className="space-y-3">
                        {stats.horseCounts.map((hc: any, idx: number) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="font-semibold text-neutral-200">{hc.name}</span>
                              <span className="text-[#D4AF37] font-bold">{hc.count} solicitudes</span>
                            </div>
                            <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F1D27A]"
                                style={{ width: `${Math.min(100, (hc.count / Math.max(stats.totalLeads, 1)) * 100)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Leads by Source & Funnel */}
                    <div className="card-luxury p-6 rounded-lg space-y-4">
                      <h3 className="font-serif text-xl font-bold text-[#F4EADB]">
                        Origen de Prospectos
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(stats.sourceCounts).map(([src, cnt]: any) => (
                          <div key={src} className="flex items-center justify-between p-2.5 bg-[#0B0B0B] rounded text-xs">
                            <span className="capitalize text-neutral-300 font-medium">
                              {src === 'facebook' ? 'Facebook (Principal)' : src === 'recomendado' ? 'Recomendación / Aliados' : src}
                            </span>
                            <span className="font-bold text-[#D4AF37]">{cnt} leads</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ═════════ TAB 2: GESTIÓN DE CABALLOS ═════════ */}
              {activeTab === 'horses' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-3xl font-bold text-[#F4EADB]">
                        Catálogo de Ejemplares
                      </h2>
                      <p className="text-xs text-neutral-400 mt-1">
                        Alta, edición, ordenamiento y control de fichas públicas y privadas.
                      </p>
                    </div>

                    <button
                      onClick={handleCreateHorse}
                      className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider px-5 py-3 rounded shadow hover:scale-105 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nuevo Ejemplar</span>
                    </button>
                  </div>

                  {/* Horse List Table */}
                  <div className="bg-[#1A1714] border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#0B0B0B] text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                          <tr>
                            <th className="py-3 px-4">Orden</th>
                            <th className="py-3 px-4">Ejemplar</th>
                            <th className="py-3 px-4">Tipo</th>
                            <th className="py-3 px-4">Sexo</th>
                            <th className="py-3 px-4">Edad / Alzada</th>
                            <th className="py-3 px-4">Estatus</th>
                            <th className="py-3 px-4">Precio Público</th>
                            <th className="py-3 px-4 text-right">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/80">
                          {horses.map((horse, idx) => (
                            <tr key={horse.id} className="hover:bg-neutral-800/30 transition-colors">
                              {/* Reorder arrows */}
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleMoveOrder(idx, 'up')}
                                    disabled={idx === 0}
                                    className="p-1 text-neutral-400 hover:text-[#D4AF37] disabled:opacity-20"
                                    title="Subir orden"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleMoveOrder(idx, 'down')}
                                    disabled={idx === horses.length - 1}
                                    className="p-1 text-neutral-400 hover:text-[#D4AF37] disabled:opacity-20"
                                    title="Bajar orden"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="font-mono text-[11px] text-neutral-500 ml-1">
                                    #{horse.order}
                                  </span>
                                </div>
                              </td>

                              {/* Horse Info */}
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative w-10 h-10 rounded overflow-hidden bg-black shrink-0 border border-neutral-700">
                                    <Image
                                      src={horse.images[0]?.url || '/images/horses/Yente/Yente_1.jpg'}
                                      alt={horse.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-serif font-bold text-sm text-[#F4EADB]">
                                      {horse.name}
                                    </p>
                                    <p className="text-[11px] text-neutral-400">
                                      Hijo de {horse.sire}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              {/* Type */}
                              <td className="py-3 px-4">
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${horse.type === 'venta' ? 'bg-blue-950 text-blue-300' : 'bg-purple-950 text-purple-300'}`}>
                                  {horse.type === 'venta' ? 'Venta' : 'Maquila'}
                                </span>
                              </td>

                              {/* Gender */}
                              <td className="py-3 px-4 capitalize">
                                {horse.gender === 'macho_entero' ? 'Macho Entero' : horse.gender === 'capon' ? 'Capón' : 'Yegua'}
                              </td>

                              {/* Age & Height */}
                              <td className="py-3 px-4">
                                {horse.ageYears} años · {horse.height.toFixed(2)} m
                              </td>

                              {/* Status */}
                              <td className="py-3 px-4">
                                <span
                                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                    horse.status === 'disponible'
                                      ? 'bg-emerald-950 text-emerald-300'
                                      : horse.status === 'apartado'
                                      ? 'bg-amber-950 text-amber-300'
                                      : 'bg-neutral-800 text-neutral-400'
                                  }`}
                                >
                                  {horse.status}
                                </span>
                              </td>

                              {/* Price Toggle Status */}
                              <td className="py-3 px-4">
                                {horse.showPrice && horse.priceMxn ? (
                                  <span className="text-emerald-400 font-bold">
                                    ${horse.priceMxn.toLocaleString('es-MX')}
                                  </span>
                                ) : (
                                  <span className="text-neutral-500 italic">Oculto</span>
                                )}
                              </td>

                              {/* Actions */}
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Link
                                    href={`/es/ejemplares/${horse.slug}`}
                                    target="_blank"
                                    className="p-1.5 text-neutral-400 hover:text-white"
                                    title="Ver Ficha Web"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </Link>
                                  <button
                                    onClick={() => handleDuplicateHorse(horse)}
                                    className="p-1.5 text-neutral-400 hover:text-[#D4AF37]"
                                    title="Duplicar"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleEditHorse(horse)}
                                    className="p-1.5 text-neutral-400 hover:text-[#D4AF37]"
                                    title="Editar"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  {currentUser.role === 'Administrador' && (
                                    <button
                                      onClick={() => handleDeleteHorse(horse.id)}
                                      className="p-1.5 text-neutral-400 hover:text-red-400"
                                      title="Eliminar"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ═════════ TAB 3: GESTIÓN DE LEADS ═════════ */}
              {activeTab === 'leads' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-3xl font-bold text-[#F4EADB]">
                        Prospectos & Solicitudes de Ficha
                      </h2>
                      <p className="text-xs text-neutral-400 mt-1">
                        Contacte a clientes en WhatsApp con 1 toque. Ningún precio ni dato se comparte sin registro previo.
                      </p>
                    </div>

                    <a
                      href="/api/leads/export"
                      download
                      className="flex items-center gap-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Exportar CSV</span>
                    </a>
                  </div>

                  {/* Filter & Search Toolbar */}
                  <div className="bg-[#1A1714] border border-neutral-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-grow w-full">
                      <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={leadSearch}
                        onChange={(e) => setLeadSearch(e.target.value)}
                        placeholder="Buscar por cliente, teléfono, correo o caballo..."
                        className="w-full bg-[#0B0B0B] border border-neutral-700 rounded pl-10 pr-4 py-2 text-xs text-[#F4EADB] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <span className="text-xs text-neutral-400 shrink-0">Estatus:</span>
                      <select
                        value={leadStatusFilter}
                        onChange={(e) => setLeadStatusFilter(e.target.value)}
                        className="bg-[#0B0B0B] border border-neutral-700 rounded px-3 py-2 text-xs text-[#F4EADB] focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="todos">Todos los estatus</option>
                        <option value="nuevo">Nuevo</option>
                        <option value="contactado_whatsapp">Contactado por WhatsApp</option>
                        <option value="cita_agendada">Cita Agendada</option>
                        <option value="visito">Visitó la Cuadra</option>
                        <option value="cerro">Cerró Venta</option>
                        <option value="no_interesado">No Interesado</option>
                      </select>
                    </div>
                  </div>

                  {/* Leads Table */}
                  <div className="bg-[#1A1714] border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#0B0B0B] text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                          <tr>
                            <th className="py-3 px-4">Fecha</th>
                            <th className="py-3 px-4">Cliente</th>
                            <th className="py-3 px-4">Caballo</th>
                            <th className="py-3 px-4">Ubicación</th>
                            <th className="py-3 px-4">Estatus</th>
                            <th className="py-3 px-4">Notas Internas</th>
                            <th className="py-3 px-4 text-right">Contacto</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/80">
                          {filteredLeads.map((lead) => {
                            const cleanPhone = `${lead.dialCode.replace('+', '')}${lead.whatsapp}`;
                            const waDirectUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                              `Hola ${lead.fullName}, le saluda Cuadra Imperial Loy respecto a su solicitud por ${lead.horseName}. ¿Cómo podemos asistirle?`
                            )}`;

                            return (
                              <tr key={lead.id} className="hover:bg-neutral-800/30 transition-colors">
                                <td className="py-3 px-4 text-neutral-400 whitespace-nowrap">
                                  {new Date(lead.createdAt).toLocaleDateString('es-MX', {
                                    day: '2-digit',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </td>

                                <td className="py-3 px-4">
                                  <p className="font-bold text-[#F4EADB]">{lead.fullName}</p>
                                  <p className="text-[11px] text-neutral-400 font-mono">
                                    {lead.dialCode} {lead.whatsapp}
                                  </p>
                                  <p className="text-[10px] text-neutral-500">{lead.email}</p>
                                </td>

                                <td className="py-3 px-4 font-semibold text-[#D4AF37]">
                                  {lead.horseName}
                                </td>

                                <td className="py-3 px-4 text-neutral-300">
                                  {lead.city ? `${lead.city}, ${lead.state}` : lead.country}
                                </td>

                                {/* Status Selector */}
                                <td className="py-3 px-4">
                                  <select
                                    value={lead.status}
                                    onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                                    className={`text-[10px] font-bold uppercase rounded px-2 py-1 bg-black border ${
                                      lead.status === 'nuevo'
                                        ? 'border-blue-500 text-blue-300'
                                        : lead.status === 'contactado_whatsapp'
                                        ? 'border-emerald-500 text-emerald-300'
                                        : lead.status === 'cita_agendada'
                                        ? 'border-[#D4AF37] text-[#D4AF37]'
                                        : 'border-neutral-700 text-neutral-400'
                                    }`}
                                  >
                                    <option value="nuevo">Nuevo</option>
                                    <option value="contactado_whatsapp">Contactado WhatsApp</option>
                                    <option value="cita_agendada">Cita Agendada</option>
                                    <option value="visito">Visitó</option>
                                    <option value="cerro">Cerró</option>
                                    <option value="no_interesado">No Interesado</option>
                                  </select>
                                </td>

                                {/* Internal Notes */}
                                <td className="py-3 px-4">
                                  <input
                                    type="text"
                                    defaultValue={lead.internalNotes || ''}
                                    onBlur={(e) => handleUpdateLeadNotes(lead.id, e.target.value)}
                                    placeholder="Agregar nota interna..."
                                    className="bg-black/50 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-300 w-44 focus:outline-none focus:border-[#D4AF37]"
                                  />
                                </td>

                                {/* Action: One-Click WhatsApp */}
                                <td className="py-3 px-4 text-right">
                                  <a
                                    href={waDirectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 bg-emerald-950 border border-emerald-500/50 hover:bg-emerald-600 hover:text-black text-emerald-300 px-3 py-1.5 rounded font-semibold transition-all text-xs"
                                    title="Abrir chat en WhatsApp"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                                    <span>WhatsApp</span>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ═════════ TAB 4: CONFIGURACIÓN GLOBAL ═════════ */}
              {activeTab === 'globals' && globals && (
                <form onSubmit={handleSaveGlobals} className="space-y-8 max-w-4xl animate-fadeIn">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-[#F4EADB]">
                      Configuraciones Globales del Sitio
                    </h2>
                    <p className="text-xs text-neutral-400 mt-1">
                      Edite textos del hero, intro animada, diferenciadores, WhatsApp oficial y aviso de privacidad.
                    </p>
                  </div>

                  {/* Intro Section */}
                  <div className="bg-[#1A1714] border border-neutral-800 rounded-xl p-6 space-y-4">
                    <h3 className="font-serif text-lg font-bold text-[#D4AF37]">
                      1. Pantalla de Bienvenida (Intro Animada)
                    </h3>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-xs text-neutral-300 font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={globals.intro.enabled}
                          onChange={(e) =>
                            setGlobals({
                              ...globals,
                              intro: { ...globals.intro, enabled: e.target.checked },
                            })
                          }
                          className="h-4 w-4 rounded border-neutral-700 bg-black text-[#D4AF37]"
                        />
                        <span>Mostrar intro animada en primera visita por sesión</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-neutral-400 mb-1">Ruta del Video de la Intro</label>
                        <input
                          type="text"
                          value={globals.intro.videoUrl}
                          onChange={(e) =>
                            setGlobals({
                              ...globals,
                              intro: { ...globals.intro, videoUrl: e.target.value },
                            })
                          }
                          className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Tiempo Máximo (Segundos)</label>
                        <input
                          type="number"
                          value={globals.intro.maxSeconds}
                          onChange={(e) =>
                            setGlobals({
                              ...globals,
                              intro: { ...globals.intro, maxSeconds: Number(e.target.value) },
                            })
                          }
                          className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hero Copy */}
                  <div className="bg-[#1A1714] border border-neutral-800 rounded-xl p-6 space-y-4">
                    <h3 className="font-serif text-lg font-bold text-[#D4AF37]">
                      2. Frases Principales (Hero)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-neutral-400 mb-1">Frase Principal (Español)</label>
                        <input
                          type="text"
                          value={globals.hero.titleEs}
                          onChange={(e) =>
                            setGlobals({
                              ...globals,
                              hero: { ...globals.hero, titleEs: e.target.value },
                            })
                          }
                          className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Frase Principal (Inglés)</label>
                        <input
                          type="text"
                          value={globals.hero.titleEn}
                          onChange={(e) =>
                            setGlobals({
                              ...globals,
                              hero: { ...globals.hero, titleEn: e.target.value },
                            })
                          }
                          className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Promesa Única (Español)</label>
                        <input
                          type="text"
                          value={globals.hero.subtitleEs}
                          onChange={(e) =>
                            setGlobals({
                              ...globals,
                              hero: { ...globals.hero, subtitleEs: e.target.value },
                            })
                          }
                          className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Promesa Única (Inglés)</label>
                        <input
                          type="text"
                          value={globals.hero.subtitleEn}
                          onChange={(e) =>
                            setGlobals({
                              ...globals,
                              hero: { ...globals.hero, subtitleEn: e.target.value },
                            })
                          }
                          className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp and Notification Email */}
                  <div className="bg-[#1A1714] border border-neutral-800 rounded-xl p-6 space-y-4">
                    <h3 className="font-serif text-lg font-bold text-[#D4AF37]">
                      3. Canales Oficiales de Venta
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-neutral-400 mb-1">Teléfono WhatsApp Oficial</label>
                        <input
                          type="text"
                          value={globals.contact.whatsappFormatted}
                          onChange={(e) =>
                            setGlobals({
                              ...globals,
                              contact: { ...globals.contact, whatsappFormatted: e.target.value },
                            })
                          }
                          className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Correo de Notificación de Leads</label>
                        <input
                          type="email"
                          value={globals.contact.notificationEmail}
                          onChange={(e) =>
                            setGlobals({
                              ...globals,
                              contact: { ...globals.contact, notificationEmail: e.target.value },
                            })
                          }
                          className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider px-8 py-4 rounded shadow-xl"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Configuraciones Globales</span>
                  </button>
                </form>
              )}
            </>
          )}
        </main>
      </div>

      {/* ═════════ MODAL: ALTA Y EDICIÓN DE CABALLO ═════════ */}
      {horseModalOpen && editingHorse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#1A1714] border border-[#D4AF37]/50 rounded-xl shadow-2xl p-6 sm:p-8 text-[#F4EADB] my-8 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setHorseModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white"
            >
              ✕
            </button>

            <form onSubmit={handleSaveHorse} className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#F4EADB]">
                  {isNewHorse ? 'Alta de Nuevo Ejemplar' : `Editar Ejemplar: ${editingHorse.name}`}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Ingrese los datos exactos del pasaporte KFPS. No use &quot;Stb&quot; ni &quot;Vb&quot; en los predicados.
                </p>
              </div>

              {horseSaveMessage && (
                <div className="p-3 bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs rounded">
                  {horseSaveMessage}
                </div>
              )}

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={editingHorse.name || ''}
                    onChange={(e) => setEditingHorse({ ...editingHorse, name: e.target.value })}
                    placeholder="Ej. [EJEMPLO] Tjerk"
                    className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2.5 text-[#F4EADB]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Slug URL (Automático)</label>
                  <input
                    type="text"
                    value={editingHorse.slug || ''}
                    onChange={(e) => setEditingHorse({ ...editingHorse, slug: e.target.value })}
                    placeholder="tjerk"
                    className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2.5 text-[#F4EADB]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Sexo / Condición *</label>
                  <select
                    value={editingHorse.gender || 'macho_entero'}
                    onChange={(e) => setEditingHorse({ ...editingHorse, gender: e.target.value as any })}
                    className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2.5 text-[#F4EADB]"
                  >
                    <option value="macho_entero">Macho Entero</option>
                    <option value="capon">Capón</option>
                    <option value="yegua">Yegua</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Tipo de Publicación *</label>
                  <select
                    value={editingHorse.type || 'venta'}
                    onChange={(e) => setEditingHorse({ ...editingHorse, type: e.target.value as any })}
                    className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2.5 text-[#F4EADB]"
                  >
                    <option value="venta">Venta Directa</option>
                    <option value="semental_maquila">Semental para Maquila</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Fecha de Nacimiento *</label>
                  <input
                    type="date"
                    required
                    value={editingHorse.birthDate || '2021-01-01'}
                    onChange={(e) => setEditingHorse({ ...editingHorse, birthDate: e.target.value })}
                    className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                  />
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">
                    La edad en años y meses se calcula automáticamente
                  </span>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Alzada a la Cruz (Metros) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingHorse.height || 1.68}
                    onChange={(e) => setEditingHorse({ ...editingHorse, height: Number(e.target.value) })}
                    className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Estatus del Ejemplar</label>
                  <select
                    value={editingHorse.status || 'disponible'}
                    onChange={(e) => setEditingHorse({ ...editingHorse, status: e.target.value as any })}
                    className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                  >
                    <option value="disponible">Disponible</option>
                    <option value="apartado">Apartado</option>
                    <option value="vendido">Vendido (Ya con su nuevo dueño)</option>
                    <option value="borrador">Borrador</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">¿Full Paper?</label>
                  <select
                    value={editingHorse.fullPaper ? 'si' : 'no'}
                    onChange={(e) => setEditingHorse({ ...editingHorse, fullPaper: e.target.value === 'si' })}
                    className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                  >
                    <option value="si">Sí (Full Paper oficial)</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              {/* Lineage */}
              <div className="bg-[#0B0B0B] border border-neutral-800 p-4 rounded-lg space-y-3 text-xs">
                <h4 className="font-serif font-bold text-sm text-[#D4AF37]">Linaje y Predicados KFPS</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-400 mb-1">Padre con Predicados *</label>
                    <input
                      type="text"
                      required
                      value={editingHorse.sire || ''}
                      onChange={(e) => setEditingHorse({ ...editingHorse, sire: e.target.value })}
                      placeholder="Ej. Alwin 469 Sport AAA"
                      className="w-full bg-[#1A1714] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Abuelo Destacado *</label>
                    <input
                      type="text"
                      required
                      value={editingHorse.grandsire || ''}
                      onChange={(e) => setEditingHorse({ ...editingHorse, grandsire: e.target.value })}
                      placeholder="Ej. Tsjalke 397 Sport Pref"
                      className="w-full bg-[#1A1714] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Traducción del Linaje en UNA Frase (Español) *</label>
                  <input
                    type="text"
                    required
                    value={editingHorse.lineageTranslation?.es || ''}
                    onChange={(e) =>
                      setEditingHorse({
                        ...editingHorse,
                        lineageTranslation: {
                          ...editingHorse.lineageTranslation,
                          es: e.target.value,
                          en: editingHorse.lineageTranslation?.en || '',
                        },
                      })
                    }
                    placeholder="Papá y abuelo triple A: lo más alto del registro holandés. Lo trae en la sangre."
                    className="w-full bg-[#1A1714] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-3 text-xs">
                <h4 className="font-serif font-bold text-sm text-[#D4AF37]">Descripción Editorial</h4>
                <div>
                  <label className="block text-neutral-400 mb-1">Descripción (Español)</label>
                  <textarea
                    rows={3}
                    value={editingHorse.description?.es || ''}
                    onChange={(e) =>
                      setEditingHorse({
                        ...editingHorse,
                        description: {
                          ...editingHorse.description,
                          es: e.target.value,
                          en: editingHorse.description?.en || '',
                        },
                      })
                    }
                    className="w-full bg-[#0B0B0B] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                  />
                </div>
              </div>

              {/* Pricing & Visibility Toggles */}
              <div className="bg-[#0B0B0B] border border-neutral-800 p-4 rounded-lg space-y-4 text-xs">
                <h4 className="font-serif font-bold text-sm text-[#D4AF37]">Precios & Visibilidad</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-neutral-400 mb-1">Precio MXN</label>
                    <input
                      type="number"
                      value={editingHorse.priceMxn || ''}
                      onChange={(e) => setEditingHorse({ ...editingHorse, priceMxn: Number(e.target.value) })}
                      placeholder="850000"
                      className="w-full bg-[#1A1714] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Precio USD</label>
                    <input
                      type="number"
                      value={editingHorse.priceUsd || ''}
                      onChange={(e) => setEditingHorse({ ...editingHorse, priceUsd: Number(e.target.value) })}
                      placeholder="45000"
                      className="w-full bg-[#1A1714] border border-neutral-700 rounded p-2 text-[#F4EADB]"
                    />
                  </div>
                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingHorse.showPrice || false}
                        onChange={(e) => setEditingHorse({ ...editingHorse, showPrice: e.target.checked })}
                        className="h-4 w-4 rounded border-neutral-700 text-[#D4AF37]"
                      />
                      <span className="font-semibold text-neutral-200">Mostrar precio público en el sitio</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setHorseModalOpen(false)}
                  className="px-5 py-2.5 rounded border border-neutral-700 text-neutral-300 text-xs uppercase"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#D4AF37] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded shadow"
                >
                  {isNewHorse ? 'Crear Ejemplar' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
