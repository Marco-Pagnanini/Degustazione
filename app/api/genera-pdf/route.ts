import { NextRequest, NextResponse } from 'next/server';
import { generaPDF } from '@/lib/generatePdf';
import { SchedaCCA } from '@/lib/types';

export async function POST(req: NextRequest) {
  const scheda: SchedaCCA = await req.json();
  const pdfBytes = await generaPDF(scheda);
  const buffer = Buffer.from(pdfBytes);

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="scheda-cca-${scheda.datiGenerali.data}.pdf"`,
    },
  });
}
