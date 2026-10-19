import { NextRequest, NextResponse } from 'next/server';
import { getHorses, saveHorse } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const type = searchParams.get('type') || undefined;
    const featured = searchParams.has('featured') ? searchParams.get('featured') === 'true' : undefined;
    const includeDrafts = searchParams.get('includeDrafts') === 'true';

    const horses = getHorses({ status, type, featured, includeDrafts });
    return NextResponse.json({ success: true, horses });
  } catch (error) {
    console.error('Error fetching horses:', error);
    return NextResponse.json({ success: false, error: 'Error al obtener ejemplares' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.birthDate) {
      return NextResponse.json({ success: false, error: 'Nombre y fecha de nacimiento son obligatorios' }, { status: 400 });
    }

    const saved = saveHorse(body);
    return NextResponse.json({ success: true, horse: saved });
  } catch (error) {
    console.error('Error saving horse:', error);
    return NextResponse.json({ success: false, error: 'Error al guardar ejemplar' }, { status: 500 });
  }
}
