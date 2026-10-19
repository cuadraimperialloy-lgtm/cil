'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/SocialIcons';

interface FaqItem {
  id: number;
  qEs: string;
  qEn: string;
  aEs: string;
  aEn: string;
}

const FAQS_COL1: FaqItem[] = [
  {
    id: 1,
    qEs: '1. ¿Cuánto cuesta un caballo frisón?',
    qEn: '1. How much does a Friesian horse cost?',
    aEs: 'Depende de su nivel (potro, iniciando rienda, ya con rienda o alta escuela), su alzada, su edad y sus premios. El precio de cada caballo se lo damos por mensaje, el mismo día. Es el mismo para todos.',
    aEn: 'Pricing depends on training level (colt, starting saddle training, fully trained, or high-school dressage), height, age, and official awards. We share the exact price via private message the same day. It is consistent for all clients.',
  },
  {
    id: 2,
    qEs: '2. ¿Cómo sé si un frisón es puro?',
    qEn: '2. How do I verify that a Friesian is purebred?',
    aEs: 'Por sus papeles: está registrado en la KFPS, el registro holandés de la raza. En cada ficha va la terminación de su chip, y en la cita privada lo leemos frente a usted.',
    aEn: 'By official documentation: registered with the KFPS, the official Dutch breed registry. Every listing displays their microchip ending, and during your private visit we scan and verify it in front of you.',
  },
  {
    id: 3,
    qEs: '3. ¿Un frisón puede ser caballo bailador?',
    qEn: '3. Can a Friesian perform as a high-school dancing horse?',
    aEs: 'Sí, si está enseñado: es un caballo de alta escuela. Cada ficha dice su nivel, y en su video lo ve bailar. Tenemos caballos de alta escuela ya montados con música y potros para formarlos a su gusto.',
    aEn: 'Yes, when trained: it is a high-school dressage horse. Each listing details training level, and movement videos demonstrate their cadence. We offer horses trained with live music as well as colts ready to be molded to your taste.',
  },
  {
    id: 4,
    qEs: '4. ¿Puedo ver su pedigrí antes de ir?',
    qEn: '4. Can I review their pedigree before visiting?',
    aEs: 'Sí. En cada ficha va de quién es hijo. El registro, la genealogía completa y la foto del pasaporte se los mandamos por mensaje.',
    aEn: 'Yes. Each listing specifies sire and dam line. We send you the complete 4-generation pedigree, registration certificate, and European passport scan via message.',
  },
  {
    id: 5,
    qEs: '5. ¿Existe el frisón blanco, pinto o café?',
    qEn: '5. Do white, pinto, or chestnut Friesians exist?',
    aEs: 'No en el registro holandés: solo registra caballos negros, y la única marca blanca permitida es una estrella pequeña en la frente. Los de otros colores son cruzas o de otros registros.',
    aEn: 'Not in the Dutch studbook: the KFPS registers exclusively black horses, with the only permitted marking being a small white forehead star. Other colors indicate crossbreeds or separate registries.',
  },
  {
    id: 6,
    qEs: '6. ¿Importado o nacional?',
    qEn: '6. Are the horses imported or domestic?',
    aEs: 'Todos los de la cuadra son importados de Holanda y escogidos uno por uno. Su pasaporte dice dónde nació.',
    aEn: 'Every horse in our stable is directly imported from the Netherlands and selected one by one. Their European passport certifies their birthplace.',
  },
];

const FAQS_COL2: FaqItem[] = [
  {
    id: 7,
    qEs: '7. ¿Todos se pueden montar?',
    qEn: '7. Can all horses be ridden immediately?',
    aEs: 'No. Cada ficha dice su nivel. Los de alta escuela y los que ya tienen rienda se montan. Los que van iniciando rienda y los potros todavía no: el caballerango de la cuadra los trabaja frente a usted.',
    aEn: 'No. Each listing details training status. High-school and trained horses are ridden. Young colts and horses starting training are handled and demonstrated in hand by our stablemaster.',
  },
  {
    id: 8,
    qEs: '8. ¿Qué tan alto es un frisón?',
    qEn: '8. How tall does a Friesian stand?',
    aEs: 'Depende de cada caballo. En cada ficha va su alzada a la cruz.',
    aEn: 'It varies per individual. Each listing provides exact height at withers in meters.',
  },
  {
    id: 9,
    qEs: '9. ¿Envían a otros estados o países?',
    qEn: '9. Do you ship to other states or abroad?',
    aEs: 'Sí. Envíos seguros a todo México (Monterrey, Querétaro, Ciudad de México o donde esté su rancho), a Estados Unidos y a América Latina. Le cotizamos el envío a su ciudad, sin compromiso.',
    aEn: 'Yes. Secure, insured shipping across Mexico (Monterrey, Querétaro, CDMX, or wherever your ranch is), the United States, and Latin America. We provide a tailored quote with no obligation.',
  },
  {
    id: 10,
    qEs: '10. ¿Son criadero?',
    qEn: '10. Are you a commercial breeding farm?',
    aEs: 'No. Los escogemos uno por uno en Holanda y los tenemos en Zapotlanejo, Jalisco, para que usted los vea en una cita privada.',
    aEn: 'No. We personally select each horse in the Netherlands and stable them in Zapotlanejo, Jalisco, for your evaluation during an exclusive private visit.',
  },
  {
    id: 11,
    qEs: '11. ¿Puedo ir con mi caballerango?',
    qEn: '11. May I attend with my trainer or veterinarian?',
    aEs: 'Siempre. Le apartamos el tiempo para que lo vea con calma. Y con su veterinario, cuando usted lo pida.',
    aEn: 'Always. We reserve private time for you to inspect the horse thoroughly. Your veterinarian is equally welcome upon request.',
  },
];

interface PreguntasSectionProps {
  lang?: 'es' | 'en';
}

export default function PreguntasSection({ lang = 'es' }: PreguntasSectionProps) {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const isEn = lang === 'en';

  const waAskMsg = encodeURIComponent(
    isEn
      ? 'Hello, I am contacting you from the FAQs section of Cuadra Imperial Loy. I have a direct question.'
      : 'Hola, me comunico desde la sección de Preguntas de Cuadra Imperial Loy. Quisiera hacer una consulta directa.'
  );

  return (
    <section id="preguntas" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 relative">
      <div className="w-full">
        {/* Header Compacto */}
        <div className="text-center mb-3 space-y-1">
          <div className="inline-flex items-center gap-1.5 border border-[#D4AF37]/35 bg-[#1A1714] px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
            <HelpCircle className="w-3 h-3" />
            <span>{isEn ? 'Certainty & Direct Relationship' : 'Certeza & Trato Directo'}</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#F4EADB]">
            {isEn ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
          </h2>
          <p className="text-[11px] sm:text-xs text-neutral-400">
            {isEn
              ? 'Direct communication with the stable in Zapotlanejo, Jalisco. Honest and transparent.'
              : 'Trato directo con la cuadra en Zapotlanejo, Jalisco. Sin rodeos ni intermediarios.'}
          </p>
        </div>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
          {/* Columna 1: Preguntas 1 a 6 */}
          <div className="space-y-1.5">
            {FAQS_COL1.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-[#141210] border rounded-lg transition-all ${
                    isOpen ? 'border-[#D4AF37]/60 shadow-lg' : 'border-neutral-850 hover:border-neutral-700'
                  }`}
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center justify-between p-2.5 text-left font-serif font-bold text-xs sm:text-[13px] text-[#F4EADB] hover:text-[#D4AF37] transition-colors gap-2"
                  >
                    <span>{isEn ? faq.qEn : faq.qEs}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-3 pb-2.5 text-[11px] sm:text-xs text-neutral-300 leading-relaxed border-t border-neutral-800 pt-2 animate-fadeIn">
                      {isEn ? faq.aEn : faq.aEs}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Columna 2: Preguntas 7 a 11 + Direct WhatsApp Box */}
          <div className="space-y-1.5">
            {FAQS_COL2.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-[#141210] border rounded-lg transition-all ${
                    isOpen ? 'border-[#D4AF37]/60 shadow-lg' : 'border-neutral-850 hover:border-neutral-700'
                  }`}
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center justify-between p-2.5 text-left font-serif font-bold text-xs sm:text-[13px] text-[#F4EADB] hover:text-[#D4AF37] transition-colors gap-2"
                  >
                    <span>{isEn ? faq.qEn : faq.qEs}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-3 pb-2.5 text-[11px] sm:text-xs text-neutral-300 leading-relaxed border-t border-neutral-800 pt-2 animate-fadeIn">
                      {isEn ? faq.aEn : faq.aEs}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Direct WhatsApp Box Integrado */}
            <div className="bg-[#141210] border border-[#D4AF37]/40 rounded-lg p-2.5 flex items-center justify-between gap-3 shadow-md mt-1">
              <div className="text-left space-y-0.5">
                <span className="font-serif font-bold text-xs text-[#F4EADB] block">
                  {isEn ? 'Have an additional question?' : '¿Tiene alguna pregunta adicional?'}
                </span>
                <span className="text-[10px] text-neutral-400 block leading-tight">
                  {isEn
                    ? 'We attend to you directly via WhatsApp with the personal touch of the stable.'
                    : 'Le atendemos directamente con el trato personal de la cuadra.'}
                </span>
              </div>
              <a
                href={`https://wa.me/523317026066?text=${waAskMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#B8892B] text-black font-bold text-[10px] uppercase tracking-wider px-3 py-2 rounded shadow hover:shadow-[#D4AF37]/30 transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-black" />
                <span>{isEn ? 'Ask on WhatsApp' : 'Preguntar'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
