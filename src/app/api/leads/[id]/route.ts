import { NextRequest, NextResponse } from 'next/server';
import { updateLead, deleteLead, getLeadById } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const lead = getLeadById(id);
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Prospecto no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json({ success: false, error: 'Error del servidor' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = updateLead(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Prospecto no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ success: false, error: 'Error al actualizar prospecto' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Prospecto no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ success: false, error: 'Error al eliminar prospecto' }, { status: 500 });
  }
}
