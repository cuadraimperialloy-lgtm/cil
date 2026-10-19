import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { Horse, Lead } from '@/types';
import fs from 'fs';
import path from 'path';

// Palette constants for PDF
const COLOR_BLACK = '#0B0B0B';
const COLOR_CARBON = '#1A1714';
const COLOR_GOLD = '#D4AF37';
const COLOR_CREAM = '#F4EADB';
const COLOR_MUTED = '#9A958B';
const COLOR_WHITE = '#FFFFFF';

export async function generateBasicHorsePdf(horse: Horse, lang: 'es' | 'en' = 'es'): Promise<Uint8Array> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background: Deep luxury dark
  doc.setFillColor(11, 11, 11);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Fine Gold Border
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.6);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
  doc.setLineWidth(0.2);
  doc.rect(9.5, 9.5, pageWidth - 19, pageHeight - 19);

  // Brand Header
  doc.setTextColor(212, 175, 55);
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.text('CUADRA IMPERIAL LOY', pageWidth / 2, 22, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(194, 162, 124);
  const tagLine =
    lang === 'es'
      ? 'CABALLOS FRISONES SELECTOS EN HOLANDA · ZAPOTLANEJO, JALISCO'
      : 'SELECT FRIESIAN HORSES FROM THE NETHERLANDS · ZAPOTLANEJO, JALISCO';
  doc.text(tagLine, pageWidth / 2, 28, { align: 'center' });

  // Divider line
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.line(25, 32, pageWidth - 25, 32);

  // Horse Name
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(244, 234, 219);
  doc.text(horse.name.toUpperCase(), pageWidth / 2, 43, { align: 'center' });

  let curY = 50;

  // Awards row if applicable
  if (horse.ownAwards && horse.ownAwards.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(212, 175, 55);
    const awardsText = horse.ownAwards.join('   ·   ');
    doc.text(awardsText, pageWidth / 2, curY, { align: 'center' });
    curY += 8;
  }

  // Horse Image
  const primaryImg = horse.images.find((img) => img.isPrimary) || horse.images[0];
  if (primaryImg) {
    try {
      const localPath = path.join(process.cwd(), 'public', primaryImg.url.replace(/^\//, ''));
      if (fs.existsSync(localPath)) {
        const imgBuffer = fs.readFileSync(localPath);
        const base64Img = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`;
        // Draw frame
        doc.setDrawColor(184, 137, 43);
        doc.setLineWidth(0.5);
        const imgW = 140;
        const imgH = 85;
        const imgX = (pageWidth - imgW) / 2;
        doc.rect(imgX - 1, curY - 1, imgW + 2, imgH + 2);
        doc.addImage(base64Img, 'JPEG', imgX, curY, imgW, imgH);
        curY += imgH + 8;
      }
    } catch {
      curY += 10;
    }
  }

  // Key Specifications Card
  doc.setFillColor(26, 23, 20);
  doc.roundedRect(20, curY, pageWidth - 40, 52, 2, 2, 'F');
  doc.setDrawColor(107, 66, 38);
  doc.roundedRect(20, curY, pageWidth - 40, 52, 2, 2, 'S');

  const genderLabel =
    horse.gender === 'macho_entero'
      ? lang === 'es' ? 'Macho Entero' : 'Stallion'
      : horse.gender === 'capon'
      ? lang === 'es' ? 'Capón' : 'Gelding'
      : lang === 'es' ? 'Yegua' : 'Mare';

  const sirePrefix = horse.gender === 'yegua' ? (lang === 'es' ? 'Hija de:' : 'Daughter of:') : (lang === 'es' ? 'Hijo de:' : 'Son of:');
  const grandPrefix = horse.gender === 'yegua' ? (lang === 'es' ? 'Nieta de:' : 'Granddaughter of:') : (lang === 'es' ? 'Nieto de:' : 'Grandson of:');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(244, 234, 219);

  let specY = curY + 8;
  doc.text(`🧬 ${sirePrefix} ${horse.sire}`, 25, specY);
  specY += 7;
  doc.text(`🧬 ${grandPrefix} ${horse.grandsire}`, 25, specY);
  specY += 7;
  doc.text(`🐎 ${lang === 'es' ? 'Condición' : 'Sex'}: ${genderLabel}`, 25, specY);
  specY += 7;
  doc.text(
    `📏 ${lang === 'es' ? 'Edad y Alzada' : 'Age & Height'}: ${horse.ageYears} ${lang === 'es' ? 'años' : 'years'} · ${horse.height.toFixed(2)} m ${lang === 'es' ? 'a la cruz' : 'at withers'}`,
    25,
    specY
  );
  specY += 7;

  // Lineage translation phrase
  doc.setFont('times', 'italic');
  doc.setTextColor(241, 210, 122);
  const phrase = lang === 'es' ? horse.lineageTranslation.es : horse.lineageTranslation.en;
  doc.text(`“${phrase}”`, 25, specY);

  curY += 58;

  // Price line (only if showPrice enabled)
  if (horse.showPrice && horse.priceMxn) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(212, 175, 55);
    const priceStr =
      lang === 'es'
        ? `Precio Oficial: $${horse.priceMxn.toLocaleString('es-MX')} MXN`
        : `Official Price: $${horse.priceUsd ? horse.priceUsd.toLocaleString('en-US') : horse.priceMxn.toLocaleString('es-MX')} USD`;
    doc.text(priceStr, pageWidth / 2, curY, { align: 'center' });
    curY += 8;
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(154, 149, 139);
    const msg =
      lang === 'es'
        ? 'Precio directo por WhatsApp · El mismo precio para todos los clientes'
        : 'Direct pricing via WhatsApp · Uniform price for all clientele';
    doc.text(msg, pageWidth / 2, curY, { align: 'center' });
    curY += 8;
  }

  // QR Code to Horse URL & WhatsApp Contacts
  const horseUrl = `https://cuadraimperialloy.com/${lang === 'en' ? 'en/horses' : 'es/ejemplares'}/${horse.slug}`;
  try {
    const qrDataUrl = await QRCode.toDataURL(horseUrl, { margin: 1, width: 90, color: { dark: '#D4AF37', light: '#0B0B0B' } });
    const qrSize = 24;
    const qrX = 25;
    doc.addImage(qrDataUrl, 'PNG', qrX, curY, qrSize, qrSize);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(212, 175, 55);
    doc.text(lang === 'es' ? 'ESCANEÉ EL CÓDIGO QR' : 'SCAN QR CODE', 54, curY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(244, 234, 219);
    doc.text(
      lang === 'es' ? 'Para ver videos de movimiento y ficha interactiva en la web' : 'To view high-resolution movement videos and full online dossier',
      54,
      curY + 12
    );

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(212, 175, 55);
    doc.text('WHATSAPP DIRECTO: +52 33 1702 6066', 54, curY + 19);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(154, 149, 139);
    doc.text('Cita privada en Zapotlanejo, Jalisco · A 38 min de Guadalajara', 54, curY + 24);
  } catch {
    // fallback if qr fails
  }

  // Footer Disclaimer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(115, 108, 98);
  doc.text(
    lang === 'es'
      ? 'Ficha básica para compartir · Cuadra Imperial Loy · Derechos Reservados 2026'
      : 'Basic preview sheet · Cuadra Imperial Loy · All Rights Reserved 2026',
    pageWidth / 2,
    pageHeight - 11,
    { align: 'center' }
  );

  return Buffer.from(doc.output('arraybuffer'));
}

export async function generateCompleteHorsePdf(
  horse: Horse,
  lead: Lead,
  lang: 'es' | 'en' = 'es'
): Promise<Uint8Array> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // ════════════════════════════════════════════════════════
  // PÁGINA 1: PORTADA Y ESPECIFICACIONES GENERALES
  // ════════════════════════════════════════════════════════
  doc.setFillColor(11, 11, 11);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Double Border in Gold
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.6);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
  doc.setLineWidth(0.2);
  doc.rect(9.5, 9.5, pageWidth - 19, pageHeight - 19);

  // Header
  doc.setTextColor(212, 175, 55);
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.text('CUADRA IMPERIAL LOY', pageWidth / 2, 22, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(194, 162, 124);
  doc.text('EXPEDIENTE COMPLETO DE EJEMPLAR · REGISTRO OFICIAL KFPS', pageWidth / 2, 28, { align: 'center' });

  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.line(25, 32, pageWidth - 25, 32);

  // Horse Name
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(244, 234, 219);
  doc.text(horse.name.toUpperCase(), pageWidth / 2, 44, { align: 'center' });

  let curY = 51;
  if (horse.ownAwards && horse.ownAwards.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(212, 175, 55);
    doc.text(horse.ownAwards.join('   ·   '), pageWidth / 2, curY, { align: 'center' });
    curY += 8;
  }

  // Main Image
  const primaryImg = horse.images.find((img) => img.isPrimary) || horse.images[0];
  if (primaryImg) {
    try {
      const localPath = path.join(process.cwd(), 'public', primaryImg.url.replace(/^\//, ''));
      if (fs.existsSync(localPath)) {
        const imgBuffer = fs.readFileSync(localPath);
        const base64Img = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`;
        const imgW = 145;
        const imgH = 88;
        const imgX = (pageWidth - imgW) / 2;
        doc.setDrawColor(184, 137, 43);
        doc.rect(imgX - 0.8, curY - 0.8, imgW + 1.6, imgH + 1.6);
        doc.addImage(base64Img, 'JPEG', imgX, curY, imgW, imgH);
        curY += imgH + 8;
      }
    } catch {
      curY += 10;
    }
  }

  // Lineage & Registry Box
  doc.setFillColor(26, 23, 20);
  doc.roundedRect(20, curY, pageWidth - 40, 56, 2, 2, 'F');
  doc.setDrawColor(107, 66, 38);
  doc.roundedRect(20, curY, pageWidth - 40, 56, 2, 2, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(244, 234, 219);

  let bY = curY + 7;
  doc.text(`Padre con Predicados: ${horse.sire}`, 25, bY);
  bY += 6;
  doc.text(`Abuelo Destacado: ${horse.grandsire}`, 25, bY);
  bY += 6;
  if (horse.dam && horse.showDam) {
    doc.text(`Madre: ${horse.dam}`, 25, bY);
    bY += 6;
  }
  doc.text(`Microchip: ${horse.chip || '528004 NL KFPS'}   ·   Registro KFPS: ${horse.registrationNumber || 'Verificado'}`, 25, bY);
  bY += 6;
  doc.text(`Edad: ${horse.ageYears} años y ${horse.ageMonths} meses   ·   Alzada: ${horse.height.toFixed(2)} m a la cruz`, 25, bY);
  bY += 7;

  doc.setFont('times', 'italic');
  doc.setTextColor(241, 210, 122);
  doc.text(`“${lang === 'es' ? horse.lineageTranslation.es : horse.lineageTranslation.en}”`, 25, bY);

  // Personalized Watermark in Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(194, 162, 124);
  const prepDate = new Date().toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' });
  doc.text(`Preparado exclusivamente para: ${lead.fullName} (${lead.city}, ${lead.state}) · ${prepDate}`, pageWidth / 2, pageHeight - 12, { align: 'center' });

  // ════════════════════════════════════════════════════════
  // PÁGINA 2: VALORACIÓN CLÍNICA, PREDICADOS Y CITAS
  // ════════════════════════════════════════════════════════
  doc.addPage();
  doc.setFillColor(11, 11, 11);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.6);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
  doc.setLineWidth(0.2);
  doc.rect(9.5, 9.5, pageWidth - 19, pageHeight - 19);

  doc.setTextColor(212, 175, 55);
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.text('CUADRA IMPERIAL LOY · EVALUACIÓN TÉCNICA', pageWidth / 2, 20, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(244, 234, 219);
  doc.text(lang === 'es' ? 'DICTAMEN VETERINARIO & APTITUD' : 'VETERINARY & SOUNDNESS EVALUATION', 20, 32);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(244, 234, 219);

  const vetText =
    lang === 'es'
      ? horse.vetSummary?.es ||
        'El ejemplar cuenta con examen de compra (pre-purchase exam) completo realizado conforme al protocolo oficial de la Real Asociación KFPS. Se verificó condición cardiorrespiratoria en reposo y tras galope, aplomos en estación y movimiento, flexiones de menudillos, carpos y tarsos, y salud ocular.'
      : horse.vetSummary?.en ||
        'Soundness examination protocol conducted in accordance with official KFPS veterinary benchmarks. Evaluated cardiovascular recovery, distal limb conformation, flexion tests, and ophthalmic health.';

  const splitVet = doc.splitTextToSize(vetText, pageWidth - 40);
  doc.text(splitVet, 20, 40);

  let p2Y = 40 + splitVet.length * 5 + 6;

  // Glosario de Predicados KFPS
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(212, 175, 55);
  doc.text(lang === 'es' ? 'SIGNIFICADO DE LOS PREDICADOS KFPS' : 'KFPS OFFICIAL PREDICATES EXPLANATION', 20, p2Y);
  p2Y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(244, 234, 219);

  const predicates = [
    { title: 'Semental aprobado', desc: 'De los pocos que el registro oficial de Holanda deja padrear.' },
    { title: 'Preferent', desc: 'Distinción otorgada porque la calidad de sus hijos supera ampliamente el estándar.' },
    { title: 'Categoría Ster', desc: 'Un juez del registro holandés lo calificó con alta nota por su porte, alzada y trote.' },
    { title: 'AAA (Prueba de aptitud)', desc: 'La calificación más alta posible (82+ puntos) en la prueba oficial holandesa.' },
    { title: '1er premio KFPS', desc: 'La calificación más alta otorgada por los jueces en la revisión morfológica.' },
  ];

  predicates.forEach((pred) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(241, 210, 122);
    doc.text(`• ${pred.title}:`, 22, p2Y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(244, 234, 219);
    doc.text(pred.desc, 65, p2Y);
    p2Y += 6;
  });

  p2Y += 6;

  // Private Visit Callout
  doc.setFillColor(26, 23, 20);
  doc.roundedRect(20, p2Y, pageWidth - 40, 45, 2, 2, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(20, p2Y, pageWidth - 40, 45, 2, 2, 'S');

  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(212, 175, 55);
  doc.text(lang === 'es' ? 'AGENDAR CITA PRIVADA EN JALISCO' : 'SCHEDULE YOUR PRIVATE VISIT IN JALISCO', 25, p2Y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(244, 234, 219);
  const visitInfo =
    lang === 'es'
      ? 'Solo usted, su gente y los caballos, sin presión. Su caballerango siempre es bienvenido para revisar el caballo con toda calma bajo montura. Ubicación: Zapotlanejo, Jalisco (a 38 minutos de Guadalajara).'
      : 'Exclusive private inspection for you and your inner circle. Your stablemaster is always welcome. Location: Zapotlanejo, Jalisco (38 minutes from Guadalajara).';
  const splitVisit = doc.splitTextToSize(visitInfo, pageWidth - 50);
  doc.text(splitVisit, 25, p2Y + 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(241, 210, 122);
  doc.text('WhatsApp Directo: +52 33 1702 6066   ·   info@cuadraimperialloy.com', 25, p2Y + 36);

  // Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(194, 162, 124);
  doc.text(`Preparado exclusivamente para: ${lead.fullName} (${lead.city}, ${lead.state}) · ${prepDate}`, pageWidth / 2, pageHeight - 12, { align: 'center' });

  return Buffer.from(doc.output('arraybuffer'));
}
