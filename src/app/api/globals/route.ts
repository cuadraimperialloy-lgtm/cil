import { NextRequest, NextResponse } from 'next/server';
import { getGlobals, updateGlobals } from '@/lib/db';

export async function GET() {
  try {
    const globals = getGlobals();
    return NextResponse.json({ success: true, globals });
  } catch (error) {
    console.error('Error fetching globals:', error);
    return NextResponse.json({ success: false, error: 'Error al obtener configuraciones' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = updateGlobals(body);
    return NextResponse.json({ success: true, globals: updated });
  } catch (error) {
    console.error('Error updating globals:', error);
    return NextResponse.json({ success: false, error: 'Error al actualizar configuraciones' }, { status: 500 });
  }
}
