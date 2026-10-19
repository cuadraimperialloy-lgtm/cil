import { NextRequest, NextResponse } from 'next/server';
import { getHorseBySlug, getLeadByToken, updateLead } from '@/lib/db';
import { generateCompleteHorsePdf } from '@/lib/pdf';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const lang = (searchParams.get('lang') === 'en' ? 'en' : 'es') as 'es' | 'en';

    if (!token) {
      return NextResponse.json({ success: false, error: 'Token de acceso no proporcionado' }, { status: 401 });
    }

    const lead = getLeadByToken(token);
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Enlace expirado o no válido' }, { status: 403 });
    }

    const horse = getHorseBySlug(slug);
    if (!horse) {
      return NextResponse.json({ success: false, error: 'Ejemplar no encontrado' }, { status: 404 });
    }

    // Mark as downloaded
    updateLead(lead.id, { pdfDownloaded: true });

    const pdfBuffer = await generateCompleteHorsePdf(horse, lead, lang);
    const cleanName = horse.name.replace(/\[ejemplo\]/gi, '').trim().replace(/\s+/g, '_');
    const filename = `CuadraImperialLoy_${cleanName}_completa_${lang}.pdf`;

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error generating complete PDF:', error);
    return NextResponse.json({ success: false, error: 'Error al generar expediente completo' }, { status: 500 });
  }
}
