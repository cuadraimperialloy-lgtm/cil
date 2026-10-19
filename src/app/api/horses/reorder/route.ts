import { NextRequest, NextResponse } from 'next/server';
import { reorderHorses } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { orderedIds } = await request.json();
    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ success: false, error: 'orderedIds debe ser un arreglo' }, { status: 400 });
    }
    reorderHorses(orderedIds);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error reordering horses:', error);
    return NextResponse.json({ success: false, error: 'Error al reordenar' }, { status: 500 });
  }
}
