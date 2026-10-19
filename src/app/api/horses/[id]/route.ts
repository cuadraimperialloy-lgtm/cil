import { NextRequest, NextResponse } from 'next/server';
import { getHorseById, getHorseBySlug, saveHorse, deleteHorse } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const horse = getHorseById(id) || getHorseBySlug(id);
    if (!horse) {
      return NextResponse.json({ success: false, error: 'Ejemplar no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, horse });
  } catch (error) {
    console.error('Error fetching horse:', error);
    return NextResponse.json({ success: false, error: 'Error del servidor' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const saved = saveHorse({ ...body, id });
    return NextResponse.json({ success: true, horse: saved });
  } catch (error) {
    console.error('Error updating horse:', error);
    return NextResponse.json({ success: false, error: 'Error al actualizar' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deleteHorse(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Ejemplar no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting horse:', error);
    return NextResponse.json({ success: false, error: 'Error al eliminar' }, { status: 500 });
  }
}
