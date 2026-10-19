import { NextRequest, NextResponse } from 'next/server';
import { getLeads } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const leads = getLeads();

    const headers = [
      'ID',
      'Fecha',
      'Nombre Completo',
      'WhatsApp',
      'Lada',
      'Email',
      'Ciudad',
      'Estado',
      'País',
      'Caballo de Interés',
      'Estatus',
      'Origen',
      '¿Tiene Frisones?',
      '¿Interés en Cita?',
      'Mensaje',
      'Notas Internas',
      'Responsable',
      'Idioma',
    ];

    const escapeCsv = (str: string | undefined | null) => {
      if (!str) return '""';
      const clean = String(str).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = leads.map((l) => [
      escapeCsv(l.id),
      escapeCsv(new Date(l.createdAt).toLocaleString('es-MX')),
      escapeCsv(l.fullName),
      escapeCsv(l.whatsapp),
      escapeCsv(l.dialCode),
      escapeCsv(l.email),
      escapeCsv(l.city),
      escapeCsv(l.state),
      escapeCsv(l.country),
      escapeCsv(l.horseName),
      escapeCsv(l.status),
      escapeCsv(l.source),
      escapeCsv(l.ownsFriesians ? 'Sí' : 'No'),
      escapeCsv(l.interestedInPrivateVisit ? 'Sí' : 'No'),
      escapeCsv(l.message || ''),
      escapeCsv(l.internalNotes || ''),
      escapeCsv(l.assignedTo || ''),
      escapeCsv(l.language),
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="Leads_CuadraImperialLoy_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting leads:', error);
    return NextResponse.json({ success: false, error: 'Error al exportar CSV' }, { status: 500 });
  }
}
