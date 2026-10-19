import { NextRequest, NextResponse } from 'next/server';
import { getHorseBySlug } from '@/lib/db';
import { generateBasicHorsePdf } from '@/lib/pdf';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const lang = (searchParams.get('lang') === 'en' ? 'en' : 'es') as 'es' | 'en';

    const horse = getHorseBySlug(slug);
    if (!horse) {
      return NextResponse.json({ success: false, error: 'Ejemplar no encontrado' }, { status: 404 });
    }

    const pdfBuffer = await generateBasicHorsePdf(horse, lang);
    const cleanName = horse.name.replace(/\[ejemplo\]/gi, '').trim().replace(/\s+/g, '_');
    const filename = `CuadraImperialLoy_${cleanName}_basica_${lang}.pdf`;

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating basic PDF:', error);
    return NextResponse.json({ success: false, error: 'Error al generar PDF' }, { status: 500 });
  }
}
