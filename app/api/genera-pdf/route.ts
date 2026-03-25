import { NextRequest, NextResponse } from 'next/server';
import { generaPDF } from '@/lib/generatePdf';
import { SchedaCCA } from '@/lib/types';

export async function POST(req: NextRequest) {
  let scheda: SchedaCCA;

  const contentType = req.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    scheda = await req.json();
  } else {
    // form submit nativo (iOS Safari)
    const formData = await req.formData();
    scheda = JSON.parse(formData.get('scheda') as string);
  }

  const pdfBytes = await generaPDF(scheda);
  const buffer = Buffer.from(pdfBytes);

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="scheda-cca-${scheda.datiGenerali.data}.pdf"`,
    },
  });
}
