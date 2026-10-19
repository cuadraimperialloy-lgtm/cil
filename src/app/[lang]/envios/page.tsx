import { Truck, ShieldCheck, Globe, Check, MessageCircle } from 'lucide-react';

export default async function EnviosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === 'en' ? 'en' : 'es') as 'es' | 'en';

  const waMessage = encodeURIComponent(
    lang === 'es'
      ? 'Hola, me comunico desde la sección Envíos de Cuadra Imperial Loy. Quisiera cotizar el traslado de un caballo frisón a mi ciudad.'
      : 'Hello, I am contacting you from the Shipping section of Cuadra Imperial Loy. I would like a shipping quote for a Friesian horse to my city.'
  );

  const zones = [
    {
      title: lang === 'es' ? 'Jalisco y Zona Occidente' : 'Jalisco & Western Mexico',
      desc: lang === 'es' ? 'Guadalajara, Los Altos, Tapalpa, Colima, Nayarit, Michoacán.' : 'Guadalajara, Los Altos, Tapalpa, Colima, Nayarit, Michoacán.',
      transit: lang === 'es' ? 'Traslado directo mismo día' : 'Same-day direct transit',
    },
    {
      title: lang === 'es' ? 'El Bajío y Centro del País' : 'Central Mexico & Bajio',
      desc: lang === 'es' ? 'Guanajuato, Querétaro, Aguascalientes, San Luis Potosí, CDMX y Estado de México.' : 'Guanajuato, Queretaro, Aguascalientes, San Luis Potosi, Mexico City.',
      transit: lang === 'es' ? 'Remolques climatizados de alta gama' : 'Premium climate-controlled trailers',
    },
    {
      title: lang === 'es' ? 'Norte de la República' : 'Northern Mexico',
      desc: lang === 'es' ? 'Nuevo León (Monterrey), Coahuila, Chihuahua, Sonora, Sinaloa, Tamaulipas.' : 'Nuevo Leon (Monterrey), Coahuila, Chihuahua, Sonora, Sinaloa, Tamaulipas.',
      transit: lang === 'es' ? 'Descansos programados y supervisión veterinaria' : 'Scheduled rest stops and vet supervision',
    },
    {
      title: lang === 'es' ? 'Estados Unidos (USA)' : 'United States (USA)',
      desc: lang === 'es' ? 'Texas, California, Florida y cualquier estado con trámite USDA / SENASICA.' : 'Texas, California, Florida and all 50 states via USDA / SENASICA clearance.',
      transit: lang === 'es' ? 'Cuarentena y trámites aduanales fronterizos' : 'Full border quarantine and customs clearance',
    },
  ];

  return (
    <div className="bg-[#0B0B0B] text-[#F4EADB] min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-[#D4AF37]/35 bg-[#1A1714] px-3.5 py-1.5 rounded-full text-xs tracking-[0.2em] text-[#D4AF37] font-semibold uppercase">
            <Truck className="w-4 h-4" />
            <span>{lang === 'es' ? 'Logística Ecuestre Especializada' : 'Specialized Equine Logistics'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4EADB]">
            {lang === 'es' ? 'Envíos a México, EE. UU. y América Latina' : 'Shipping across Mexico, USA & Latin America'}
          </h1>

          <p className="font-serif text-lg text-[#D4AF37] italic">
            “{lang === 'es' ? 'Su caballo viaja seguro, descansado y con documentación en regla.' : 'Your horse travels safely, rested, and with all documentation in order.'}”
          </p>
        </div>

        {/* Coverage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {zones.map((z, idx) => (
            <div key={idx} className="card-luxury p-6 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-[#F4EADB]">{z.title}</h3>
                <Globe className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">{z.desc}</p>
              <div className="pt-2 text-[11px] text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>{z.transit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Box */}
        <div className="bg-[#1A1714] border border-neutral-800 rounded-xl p-8 space-y-4 text-xs text-neutral-300 leading-relaxed">
          <h3 className="font-serif text-xl font-bold text-[#D4AF37]">
            {lang === 'es' ? 'Compromiso de Bienestar Equino en Tránsito' : 'Equine Welfare & Safety in Transit'}
          </h3>
          <p>
            {lang === 'es'
              ? 'En Cuadra Imperial Loy coordinamos cada traslado con choferes experimentados y remolques de cama profunda acolchada, suspensión de aire y monitoreo por cámara. Cada caballo viaja con certificado zoosanitario de movilización oficial, pruebas de anemia infecciosa equina negativas y seguro de transporte.'
              : 'At Cuadra Imperial Loy we coordinate every shipment with professional equine transporters using deep-bedded, air-ride trailers and camera monitoring. Every horse travels with verified zoosanitary health permits and negative Coggins certificates.'}
          </p>
          <p className="text-neutral-400">
            {lang === 'es'
              ? '* Los costos y tiempos exactos de traslado se cotizan según el destino específico sin recargos ocultos.'
              : '* Exact shipping rates and timelines are calculated tailored to destination with zero hidden surcharges.'}
          </p>

          <div className="pt-4">
            <a
              href={`https://wa.me/523317026066?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8892B] text-black font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded shadow"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{lang === 'es' ? 'Cotizar Envío por WhatsApp' : 'Get Shipping Quote on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
