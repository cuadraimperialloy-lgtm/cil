import { NextRequest, NextResponse } from 'next/server';
import { getLeads, createLead, getHorseById } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const horseId = searchParams.get('horseId') || undefined;
    const search = searchParams.get('search') || undefined;

    const leads = getLeads({ status, horseId, search });
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ success: false, error: 'Error al obtener prospectos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      whatsapp,
      dialCode,
      email,
      city,
      state,
      country,
      horseId,
      horseName,
      source,
      ownsFriesians,
      interestedInPrivateVisit,
      message,
      privacyAccepted,
      language,
      utmSource,
      referrer,
    } = body;

    if (!fullName || !whatsapp || !email || !privacyAccepted) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos obligatorios o aceptación del aviso de privacidad' },
        { status: 400 }
      );
    }

    const horse = getHorseById(horseId);
    const resolvedHorseName = horseName || horse?.name || 'Ejemplar Frisón';
    const resolvedHorseSlug = horse?.slug || 'frison';

    const newLead = createLead({
      horseId: horseId || '',
      horseName: resolvedHorseName,
      fullName,
      whatsapp: String(whatsapp).replace(/\D/g, ''),
      dialCode: dialCode || '+52',
      email: email.trim().toLowerCase(),
      city: city || '',
      state: state || '',
      country: country || 'México',
      source: source || 'otro',
      ownsFriesians: Boolean(ownsFriesians),
      interestedInPrivateVisit: Boolean(interestedInPrivateVisit),
      message: message || '',
      privacyAccepted: true,
      status: 'nuevo',
      language: language === 'en' ? 'en' : 'es',
      utmSource: utmSource || '',
      referrer: referrer || '',
    });

    const downloadUrl = `/api/pdf/${resolvedHorseSlug}/complete?token=${newLead.downloadToken}&lang=${newLead.language}`;

    // WhatsApp Direct link with pre-filled message for the customer
    const cleanPhone = `${newLead.dialCode.replace('+', '')}${newLead.whatsapp}`;
    const cuadraPhone = '523317026066';
    const waCustomerMessage = encodeURIComponent(
      newLead.language === 'en'
        ? `Hello, my name is ${newLead.fullName}. I just requested the complete dossier for ${resolvedHorseName} from the website. Could you please share more information?`
        : `Hola, soy ${newLead.fullName}. Acabo de solicitar la ficha completa de ${resolvedHorseName} desde el sitio web. ¿Me comparte información?`
    );
    const waUrl = `https://wa.me/${cuadraPhone}?text=${waCustomerMessage}`;

    return NextResponse.json({
      success: true,
      lead: newLead,
      downloadToken: newLead.downloadToken,
      downloadUrl,
      whatsappUrl: waUrl,
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ success: false, error: 'Error al registrar prospecto' }, { status: 500 });
  }
}
