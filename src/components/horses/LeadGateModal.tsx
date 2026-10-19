'use client';

import { useState } from 'react';
import { Horse } from '@/types';
import { X, Download, MessageCircle, ShieldCheck, CheckCircle2, Loader2, FileText, Lock } from 'lucide-react';

interface LeadGateModalProps {
  horse: Horse;
  lang: 'es' | 'en';
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadGateModal({ horse, lang, isOpen, onClose }: LeadGateModalProps) {
  const [fullName, setFullName] = useState('');
  const [dialCode, setDialCode] = useState('+52');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [interestedInPrivateVisit, setInterestedInPrivateVisit] = useState(true);
  const [privacyAccepted, setPrivacyAccepted] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    downloadUrl: string;
    whatsappUrl: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !whatsapp.trim() || !email.trim()) {
      setError(
        lang === 'es'
          ? 'Por favor complete su nombre, WhatsApp y correo.'
          : 'Please enter your name, WhatsApp, and email.'
      );
      return;
    }

    if (!privacyAccepted) {
      setError(
        lang === 'es'
          ? 'Debe aceptar el aviso de privacidad para continuar.'
          : 'You must accept the privacy notice to continue.'
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          dialCode,
          whatsapp,
          email,
          city: city.trim() || 'No especificada',
          state: state.trim() || 'No especificado',
          country: dialCode === '+1' ? 'EE. UU.' : 'México',
          horseId: horse.id,
          horseName: horse.name,
          source: 'web_dossier',
          ownsFriesians: false,
          interestedInPrivateVisit,
          message: interestedInPrivateVisit ? 'Interesado en agendar cita privada.' : 'Solicitud de ficha técnica.',
          privacyAccepted,
          language: lang,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Error al procesar la solicitud');
      }

      setSuccessData({
        downloadUrl: data.downloadUrl,
        whatsappUrl: data.whatsappUrl,
      });
    } catch (err: any) {
      setError(err.message || 'Error de conexión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#141210] border border-[#D4AF37]/50 rounded-xl shadow-2xl p-5 sm:p-7 text-[#F4EADB] my-auto animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-[#D4AF37] transition-colors p-1"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {!successData ? (
          /* FORM VIEW - ONE CLEAN, HIGH-TRUST BLOCK */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-1">
                <FileText className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'Expediente Oficial KFPS' : 'Official KFPS Dossier'}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F4EADB] leading-tight">
                {lang === 'es' ? `Ficha Completa de ${horse.name}` : `Complete Dossier: ${horse.name}`}
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                {lang === 'es'
                  ? 'Genealogía de 4 generaciones, dictamen veterinario y placas radiológicas.'
                  : '4-generation pedigree, veterinary inspection report, and x-ray evaluation.'}
              </p>
            </div>

            {error && (
              <div className="p-2.5 bg-red-950/80 border border-red-500/50 text-red-200 text-xs rounded">
                {error}
              </div>
            )}

            {/* Row 1: Nombre Completo */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                {lang === 'es' ? 'Nombre completo *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={lang === 'es' ? 'Ej. Roberto Garza Elizondo' : 'E.g. Robert Vance'}
                className="w-full bg-[#0B0B0B] border border-neutral-700 focus:border-[#D4AF37] rounded-md px-3 py-2 text-sm text-[#F4EADB] focus:outline-none transition-colors"
              />
            </div>

            {/* Row 2: WhatsApp con selector de LADA en línea */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                {lang === 'es' ? 'WhatsApp de contacto *' : 'WhatsApp Number *'}
              </label>
              <div className="flex gap-2">
                <select
                  value={dialCode}
                  onChange={(e) => setDialCode(e.target.value)}
                  className="w-32 bg-[#0B0B0B] border border-neutral-700 focus:border-[#D4AF37] rounded-md px-2 py-2 text-xs text-[#F4EADB] focus:outline-none shrink-0"
                >
                  <option value="+52">🇲🇽 +52 (MX)</option>
                  <option value="+1">🇺🇸 +1 (USA)</option>
                  <option value="+57">🇨🇴 +57 (CO)</option>
                  <option value="+502">🇬🇹 +502 (GT)</option>
                  <option value="+504">🇭🇳 +504 (HN)</option>
                  <option value="+506">🇨🇷 +506 (CR)</option>
                  <option value="+507">🇵🇦 +507 (PA)</option>
                  <option value="+34">🇪🇸 +34 (ES)</option>
                </select>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="33 1234 5678"
                  className="flex-1 bg-[#0B0B0B] border border-neutral-700 focus:border-[#D4AF37] rounded-md px-3 py-2 text-sm text-[#F4EADB] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Correo Electrónico */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                {lang === 'es' ? 'Correo electrónico *' : 'Email Address *'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full bg-[#0B0B0B] border border-neutral-700 focus:border-[#D4AF37] rounded-md px-3 py-2 text-sm text-[#F4EADB] focus:outline-none transition-colors"
              />
            </div>

            {/* Row 4: Ubicación en 1 solo renglón (Ciudad y Estado) */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                  {lang === 'es' ? 'Ciudad' : 'City'}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={lang === 'es' ? 'Guadalajara' : 'Houston'}
                  className="w-full bg-[#0B0B0B] border border-neutral-700 focus:border-[#D4AF37] rounded-md px-3 py-2 text-xs text-[#F4EADB] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                  {lang === 'es' ? 'Estado' : 'State'}
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder={lang === 'es' ? 'Jalisco' : 'Texas'}
                  className="w-full bg-[#0B0B0B] border border-neutral-700 focus:border-[#D4AF37] rounded-md px-3 py-2 text-xs text-[#F4EADB] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Checkbox 1: Cita Privada */}
            <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-neutral-300 select-none">
              <input
                type="checkbox"
                checked={interestedInPrivateVisit}
                onChange={(e) => setInterestedInPrivateVisit(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-700 bg-black text-[#D4AF37] focus:ring-[#D4AF37] accent-[#D4AF37]"
              />
              <span>
                {lang === 'es'
                  ? 'Me interesa agendar una cita privada para verlo en persona'
                  : 'I am interested in scheduling a private visit'}
              </span>
            </label>

            {/* Checkbox 2: Aviso de Privacidad (LFPDPPP) */}
            <label className="flex items-start gap-2 cursor-pointer text-[11px] text-neutral-400 select-none">
              <input
                type="checkbox"
                required
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-neutral-700 bg-black text-[#D4AF37] focus:ring-[#D4AF37] accent-[#D4AF37]"
              />
              <span>
                {lang === 'es' ? (
                  <>
                    Acepto el <a href={`/${lang}/privacidad`} target="_blank" className="text-[#D4AF37] underline">Aviso de Privacidad</a> (LFPDPPP). Sus datos son estrictamente confidenciales.
                  </>
                ) : (
                  <>
                    I accept the <a href={`/${lang}/privacidad`} target="_blank" className="text-[#D4AF37] underline">Privacy Policy</a> (LFPDPPP). Your information is strictly confidential.
                  </>
                )}
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-[#0B0B0B] font-bold text-xs uppercase tracking-[0.2em] py-3.5 rounded-md shadow-xl hover:shadow-[#D4AF37]/30 transition-all disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{lang === 'es' ? 'Generando expediente...' : 'Generating dossier...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{lang === 'es' ? 'Descargar Ficha Completa en PDF' : 'Download Complete PDF Dossier'}</span>
                </>
              )}
            </button>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 pt-1">
              <Lock className="w-3 h-3 text-[#D4AF37]" />
              <span>
                {lang === 'es'
                  ? 'Atención personalizada vía WhatsApp o correo oficial info@cuadraimperialloy.com'
                  : 'Personalized attention via WhatsApp or official info@cuadraimperialloy.com'}
              </span>
            </div>
          </form>
        ) : (
          /* SUCCESS VIEW */
          <div className="text-center py-4 space-y-5 animate-fadeIn">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-[#F4EADB] mb-1">
                {lang === 'es' ? '¡Expediente Listo!' : 'Dossier Ready!'}
              </h3>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                {lang === 'es'
                  ? `El expediente de ${horse.name} se generó con éxito con su membrete oficial de Cuadra Imperial Loy.`
                  : `The dossier for ${horse.name} has been generated with official Cuadra Imperial Loy certification.`}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={successData.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider py-3 rounded-md shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'es' ? 'Descargar PDF' : 'Download PDF'}</span>
              </a>

              <a
                href={successData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'es' ? 'Abrir en WhatsApp' : 'Open WhatsApp'}</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-neutral-400 hover:text-white underline pt-2 block mx-auto"
            >
              {lang === 'es' ? 'Cerrar ventana' : 'Close window'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
