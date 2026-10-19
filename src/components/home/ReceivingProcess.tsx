import Image from 'next/image';
import { FileCheck, BookOpen, Stethoscope, RefreshCw, Shield } from 'lucide-react';

interface ReceivingProcessProps {
  lang: 'es' | 'en';
}

export default function ReceivingProcess({ lang }: ReceivingProcessProps) {
  const steps = [
    {
      icon: BookOpen,
      title: lang === 'es' ? 'Pasaporte Oficial KFPS' : 'Official KFPS Passport',
      desc:
        lang === 'es'
          ? 'Expedido por la Real Asociación del Caballo Frisón en los Países Bajos. Acredita microchip, vacunas y genealogía verificada.'
          : 'Issued by the Royal Friesian Horse Association in the Netherlands. Certifies microchip, vaccines, and verified pedigree.',
    },
    {
      icon: RefreshCw,
      title: lang === 'es' ? 'Papeles a su Nombre' : 'Official Registry Transfer',
      desc:
        lang === 'es'
          ? 'La titularidad del registro oficial se transfiere y endosa directamente a su nombre como único dueño legítimo ante la KFPS.'
          : 'Official ownership is transferred and registered under your full name directly with the KFPS studbook.',
    },
    {
      icon: Stethoscope,
      title: lang === 'es' ? 'Revisión Veterinaria' : 'Soundness & Health Check',
      desc:
        lang === 'es'
          ? 'Examen clínico y radiológico exhaustivo. Su propio médico veterinario y caballerango son bienvenidos para revisar al caballo antes de cerrar.'
          : 'Thorough clinical and radiological vetting. Your personal veterinarian and stablemaster are invited to inspect before finalizing.',
    },
    {
      icon: FileCheck,
      title: lang === 'es' ? 'Certificado de Importación' : 'Legal Import Clearance',
      desc:
        lang === 'es'
          ? 'Trámites aduanales, certificado zoosanitario de movilización y pruebas de laboratorio en regla para cualquier destino en México o el extranjero.'
          : 'Complete customs documentation, zoosanitary mobilization certificates, and laboratory tests for Mexico or global destinations.',
    },
  ];

  return (
    <section className="py-24 bg-[#0B0B0B] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Proof */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 border border-[#D4AF37]/30 bg-[#1A1714] px-3.5 py-1.5 rounded-full text-xs tracking-[0.2em] text-[#D4AF37] font-semibold uppercase">
              <Shield className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Certeza y Tranquilidad' : 'Certificates & Peace of Mind'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4EADB] leading-tight">
              {lang === 'es' ? 'Así lo recibe: con papeles de origen en mano.' : 'How you receive your horse: certified papers in hand.'}
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {lang === 'es'
                ? 'Sabemos que en este medio abundan los revendedores y las promesas sin fundamento. En Cuadra Imperial Loy no hay contratos extraños ni palabras de más: se entrega lo que se ve en la pista y lo que avala el registro holandés.'
                : 'We understand the concerns of buying fine horses from brokers. At Cuadra Imperial Loy there are no ambiguous contracts: you receive exactly what you inspected and what the Dutch studbook guarantees.'}
            </p>

            {/* List of Deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="bg-[#1A1714] border border-neutral-800 p-4 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-[#0B0B0B] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-[#F4EADB] text-base mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Passport Graphic & Proof card */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-black">
              <Image
                src="/images/horses/Yde/Yde_1.jpg"
                alt="Documentación oficial y pasaporte de caballo frisón Cuadra Imperial Loy"
                fill
                className="object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Passport overlay badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#1A1714]/95 backdrop-blur-md border border-[#D4AF37]/40 p-5 rounded-lg text-xs">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🇳🇱</span>
                    <span className="font-serif font-bold text-[#D4AF37] text-sm">
                      KFPS PASPOORT VOOR PAARDEN
                    </span>
                  </div>
                  <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    {lang === 'es' ? 'Verificado' : 'Verified'}
                  </span>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  {lang === 'es'
                    ? '“Recibe su caballo sano y con papeles de origen.” Los documentos se revisan en físico con su equipo antes de cualquier entrega.'
                    : '“Receive your horse sound and with certified origin papers.” All paperwork is reviewed in hand with your team prior to final release.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
