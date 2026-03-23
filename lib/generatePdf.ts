import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont } from 'pdf-lib';
import { SchedaCCA } from './types';
import { AROMI_LIST, FORZA_OPZIONI, GIUDIZIO_OPZIONI } from './schema';

const GOLD = rgb(0.788, 0.659, 0.298);
const BLACK = rgb(0, 0, 0);
const DARK = rgb(0.1, 0.08, 0.04);
const GRAY = rgb(0.4, 0.35, 0.28);
const LIGHT_GRAY = rgb(0.85, 0.82, 0.78);
const BG_CELL = rgb(0.97, 0.95, 0.92);

interface DrawCtx {
  page: PDFPage;
  font: PDFFont;
  fontBold: PDFFont;
  width: number;
}

function checkbox(ctx: DrawCtx, x: number, y: number, label: string, checked: boolean, size = 9) {
  const { page, font, fontBold } = ctx;
  page.drawRectangle({ x, y, width: 9, height: 9, borderColor: GRAY, borderWidth: 0.5, color: BG_CELL });
  if (checked) {
    page.drawText('X', { x: x + 1.5, y: y + 1.5, size: 7, font: fontBold, color: BLACK });
  }
  page.drawText(label, { x: x + 13, y: y + 1, size, font: checked ? fontBold : font, color: checked ? DARK : GRAY });
}

function hline(page: PDFPage, x: number, y: number, w: number) {
  page.drawLine({ start: { x, y }, end: { x: x + w, y }, thickness: 0.4, color: LIGHT_GRAY });
}

function sectionTitle(ctx: DrawCtx, x: number, y: number, title: string): number {
  const { page, fontBold, width } = ctx;
  hline(page, x, y + 6, width - x * 2);
  page.drawText(title.toUpperCase(), { x: x + 2, y, size: 8, font: fontBold, color: GOLD });
  return y - 14;
}

export async function generaPDF(scheda: SchedaCCA): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  // ─── PAGINA 1 ───────────────────────────────────────────────────────────────
  const p1 = pdfDoc.addPage([595, 842]);
  const W = 595;
  const ctx: DrawCtx = { page: p1, font, fontBold, width: W };
  const margin = 36;

  // Header
  p1.drawRectangle({ x: 0, y: 780, width: W, height: 62, color: DARK });
  p1.drawText('SCHEDA DI DEGUSTAZIONE DEL SIGARO', {
    x: margin, y: 815, size: 14, font: fontBold, color: GOLD
  });
  p1.drawText('Cigar Club Association  —  CCA', {
    x: margin, y: 796, size: 9, font, color: LIGHT_GRAY
  });

  let y = 765;

  // ── Dati generali
  y = sectionTitle(ctx, margin, y, 'Dati Generali');
  const dg = scheda.datiGenerali;

  // Riga 1
  p1.drawText('Data:', { x: margin, y, size: 7, font, color: GRAY });
  p1.drawText(dg.data || '—', { x: margin + 30, y, size: 8, font: fontBold, color: DARK });
  p1.drawText('Catador:', { x: 160, y, size: 7, font, color: GRAY });
  p1.drawText(dg.catador || '—', { x: 200, y, size: 8, font: fontBold, color: DARK });
  p1.drawText('Paese:', { x: 370, y, size: 7, font, color: GRAY });
  p1.drawText(dg.paeseProduzone || '—', { x: 400, y, size: 8, font: fontBold, color: DARK });
  y -= 12;

  // Riga 2
  p1.drawText('Marca:', { x: margin, y, size: 7, font, color: GRAY });
  p1.drawText(dg.marca || '—', { x: margin + 34, y, size: 8, font: fontBold, color: DARK });
  p1.drawText('Sigaro:', { x: 200, y, size: 7, font, color: GRAY });
  p1.drawText(dg.sigaro || '—', { x: 232, y, size: 8, font: fontBold, color: DARK });
  p1.drawText('Prezzo:', { x: 370, y, size: 7, font, color: GRAY });
  p1.drawText(dg.prezzo || '—', { x: 402, y, size: 8, font: fontBold, color: DARK });
  y -= 12;

  // Riga 3
  p1.drawText('Vitola Galera:', { x: margin, y, size: 7, font, color: GRAY });
  p1.drawText(dg.vitolaGalera || '—', { x: margin + 58, y, size: 8, font: fontBold, color: DARK });
  p1.drawText('Misure:', { x: 200, y, size: 7, font, color: GRAY });
  p1.drawText(dg.misure || '—', { x: 232, y, size: 8, font: fontBold, color: DARK });
  y -= 12;

  // Fabbricazione
  p1.drawText('Fabbricazione:', { x: margin, y, size: 7, font, color: GRAY });
  const fabOpts = ['Tot. mano TL', 'Tot. mano TC', 'Parzial. mano', 'Tot. Macchina'];
  let fx = margin + 62;
  fabOpts.forEach((opt) => {
    checkbox(ctx, fx, y, opt, dg.fabbricazione === opt, 7);
    fx += 100;
  });
  y -= 12;

  // Codice
  p1.drawText('Cod. produzione:', { x: margin, y, size: 7, font, color: GRAY });
  p1.drawText(dg.codiceDataProduzione || '—', { x: margin + 72, y, size: 8, font: fontBold, color: DARK });
  y -= 16;

  // ── Analisi a Crudo
  y = sectionTitle(ctx, margin, y, 'Analisi a Crudo');
  const ac = scheda.analisiCrudo;

  function radioRow(label: string, opzioni: string[], valore: string | null): void {
    p1.drawText(label + ':', { x: margin, y, size: 7, font, color: GRAY });
    let rx = margin + 80;
    opzioni.forEach((opt) => {
      checkbox(ctx, rx, y, opt, valore === opt, 7);
      rx += Math.max(opt.length * 5 + 16, 60);
    });
    y -= 12;
  }

  radioRow('Colore Capa', ['Claro', 'Col. Claro', 'Colorado', 'Col. Maduro', 'Maduro'], ac.coloreCapa);
  radioRow('Toni', ['verde', 'giallo', 'dorato', 'rosso', 'bruno'], ac.toni);
  radioRow('Luminosita', ['brillante', 'luminoso', 'spento'], ac.luminosita);
  radioRow('Aspetto Vista', ['Serica', 'Liscia', 'legg. Ruvida', 'Ruvida'], ac.aspettoVista);
  radioRow('Uniformita', ['uniforme', 'abb. uniforme', 'non uniforme', 'con venature'], ac.uniformita);
  radioRow('Tatto', ['secca', 'vellutata', 'grassa', 'untuosa'], ac.tatto);
  radioRow('Costruzione', ['Ottima', 'Buona', 'Discreta', 'Scadente'], ac.costruzione);
  radioRow('Riempimento', ['Regolare', 'Carente', 'Eccessivo'], ac.riempimento);
  radioRow('Profumi', ['Lieve', 'Medio', 'Intenso'], ac.profumi);

  if (ac.sentoriCrudo) {
    p1.drawText('Sentori a crudo:', { x: margin, y, size: 7, font, color: GRAY });
    p1.drawText(ac.sentoriCrudo.substring(0, 80), { x: margin + 72, y, size: 8, font, color: DARK });
    y -= 12;
  }
  y -= 4;

  // ── Analisi Meccanica
  y = sectionTitle(ctx, margin, y, 'Analisi Meccanica');
  const am = scheda.analisiMeccanica;
  radioRow('Tiraggio', ['Eccellente', 'Regolare', 'Faticoso', 'Eccessivo'], am.tiraggio);
  radioRow('Combustione', ['Eccellente', 'Regolare', 'legg. Irregolare', 'Irregolare'], am.combustione);
  radioRow('Cenere', ['Solida', 'Compatta', 'Friabile'], am.cenere);
  if (am.cenereColore) {
    p1.drawText('Colore cenere:', { x: margin, y, size: 7, font, color: GRAY });
    p1.drawText(am.cenereColore, { x: margin + 62, y, size: 8, font, color: DARK });
    y -= 12;
  }
  y -= 4;

  // ── Sapori
  y = sectionTitle(ctx, margin, y, 'Analisi Gustativa  Sapori');
  const sapori = scheda.sapori;
  const saporiCols = ['dolce', 'amaro', 'sapido', 'aspro', 'piccante', 'tannico', 'asciutto'] as const;
  const colW = 66;
  const headerX = margin + 60;

  saporiCols.forEach((s, i) => {
    p1.drawText(s, { x: headerX + i * colW, y, size: 7, font, color: GRAY });
  });
  y -= 11;

  (['ingresso', 'centro', 'finale'] as const).forEach((fase) => {
    hline(p1, margin, y + 9, W - margin * 2);
    p1.drawText(fase.toUpperCase(), { x: margin, y, size: 7, font, color: GRAY });
    saporiCols.forEach((s, i) => {
      const val = sapori[fase][s];
      const cx = headerX + i * colW + 18;
      p1.drawRectangle({ x: cx - 4, y, width: 12, height: 9, borderColor: GRAY, borderWidth: 0.4, color: BG_CELL });
      if (val) {
        p1.drawText(val, { x: cx - 1, y: y + 1, size: 7, font: fontBold, color: DARK });
      }
    });
    y -= 11;
  });
  y -= 6;

  // ── Aromi
  y = sectionTitle(ctx, margin, y, 'Aromi');
  const arColW = Math.floor((W - margin * 2 - 60) / AROMI_LIST.length);

  AROMI_LIST.forEach((a, i) => {
    const abbr = a.substring(0, 4);
    p1.drawText(abbr, { x: margin + 60 + i * arColW, y, size: 6, font, color: GRAY });
  });
  y -= 11;

  (['ingresso', 'centro', 'finale'] as const).forEach((fase) => {
    hline(p1, margin, y + 9, W - margin * 2);
    p1.drawText(fase.toUpperCase(), { x: margin, y, size: 7, font, color: GRAY });
    AROMI_LIST.forEach((aroma, i) => {
      const checked = scheda.aromi[fase].includes(aroma);
      const cx = margin + 60 + i * arColW + 1;
      p1.drawRectangle({ x: cx, y, width: 9, height: 9, borderColor: GRAY, borderWidth: 0.4, color: BG_CELL });
      if (checked) {
        p1.drawText('X', { x: cx + 1.5, y: y + 1.5, size: 7, font: fontBold, color: BLACK });
      }
    });
    y -= 11;
  });

  if (scheda.aromi.altro) {
    p1.drawText('Altro: ' + scheda.aromi.altro.substring(0, 60), { x: margin, y, size: 7, font, color: DARK });
    y -= 11;
  }
  y -= 6;

  // ── Forza
  y = sectionTitle(ctx, margin, y, 'Forza');
  const forzaColW = Math.floor((W - margin * 2 - 60) / FORZA_OPZIONI.length);

  FORZA_OPZIONI.forEach((f, i) => {
    p1.drawText(f, { x: margin + 60 + i * forzaColW, y, size: 7, font, color: GRAY });
  });
  y -= 11;

  (['ingresso', 'centro', 'finale'] as const).forEach((fase) => {
    hline(p1, margin, y + 9, W - margin * 2);
    p1.drawText(fase.toUpperCase(), { x: margin, y, size: 7, font, color: GRAY });
    FORZA_OPZIONI.forEach((opz, i) => {
      const checked = scheda.forza[fase] === opz;
      const cx = margin + 60 + i * forzaColW + 14;
      p1.drawRectangle({ x: cx, y, width: 9, height: 9, borderColor: GRAY, borderWidth: 0.4, color: BG_CELL });
      if (checked) {
        p1.drawText('X', { x: cx + 1.5, y: y + 1.5, size: 7, font: fontBold, color: BLACK });
      }
    });
    y -= 11;
  });

  // ─── PAGINA 2 ───────────────────────────────────────────────────────────────
  const p2 = pdfDoc.addPage([595, 842]);
  const ctx2: DrawCtx = { page: p2, font, fontBold, width: W };

  p2.drawRectangle({ x: 0, y: 820, width: W, height: 22, color: DARK });
  p2.drawText('SCHEDA CCA  pagina 2', { x: margin, y: 826, size: 8, font, color: LIGHT_GRAY });

  let y2 = 805;

  // ── Descrizione fasi
  y2 = sectionTitle(ctx2, margin, y2, 'Descrizione Sintetica delle Fasi');
  const df = scheda.descrizioneFasi;

  function descFase(label: string, testo: string): void {
    p2.drawText(label + ':', { x: margin, y: y2, size: 7, font, color: GRAY });
    y2 -= 10;
    p2.drawRectangle({ x: margin, y: y2 - 18, width: W - margin * 2, height: 22, borderColor: LIGHT_GRAY, borderWidth: 0.4, color: BG_CELL });
    p2.drawText((testo || '').substring(0, 100), { x: margin + 4, y: y2 - 10, size: 8, font, color: DARK });
    y2 -= 28;
  }

  descFase('INGRESSO (I Terzo)', df.ingresso);
  descFase('CENTRO (II Terzo)', df.centro);
  descFase('FINALE (III Terzo)', df.finale);
  y2 -= 4;

  // ── Analisi organolettica
  y2 = sectionTitle(ctx2, margin, y2, 'Analisi Organolettica');
  const ao = scheda.analisiOrganolettica;

  function radioRow2(label: string, opzioni: string[], valore: string | null): void {
    p2.drawText(label + ':', { x: margin, y: y2, size: 7, font, color: GRAY });
    let rx = margin + 80;
    opzioni.forEach((opt) => {
      checkbox(ctx2, rx, y2, opt, valore === opt, 7);
      rx += Math.max(opt.length * 5 + 16, 70);
    });
    y2 -= 12;
  }

  radioRow2('Equilibrio', ['Armonico', 'Equilibrato', 'Abb. Equilibrato', 'Poco Equilibrato'], ao.equilibrio);
  radioRow2('Complessita', ['Eccellente', 'Buona', 'Media', 'Scadente'], ao.complessita);
  radioRow2('Evoluzione', ['Eccellente', 'Buona', 'Media', 'Scadente'], ao.evoluzione);
  radioRow2('Persistenza', ['Lunghissima', 'Lunga', 'Media', 'Corta'], ao.persistenza);
  radioRow2('Qualita', ['Eccellente', 'Fine', 'Comune', 'Scadente'], ao.qualita);
  y2 -= 4;

  // ── Considerazioni finali
  y2 = sectionTitle(ctx2, margin, y2, 'Considerazioni Finali');
  const cf = scheda.considerazioniFinali;

  p2.drawText('Durata fumata:', { x: margin, y: y2, size: 7, font, color: GRAY });
  p2.drawText(cf.durataFumata || '—', { x: margin + 65, y: y2, size: 8, font: fontBold, color: DARK });
  y2 -= 12;

  radioRow2('Sigaro per', ['Esperti', 'Amatori', 'Tutti', 'Principianti'], cf.sigaroPer);
  radioRow2('Momento giornata', ['Mattino', 'Pomeriggio', 'Tutte le ore', 'Dopo i pasti'], cf.momentoGiornata);

  p2.drawText('Abbinamento:', { x: margin, y: y2, size: 7, font, color: GRAY });
  p2.drawText((cf.abbinamentoConsigliato || '—').substring(0, 80), { x: margin + 62, y: y2, size: 8, font, color: DARK });
  y2 -= 12;

  radioRow2('Rapporto Q/P', ['Ottimo', 'Buono', 'Medio', 'Scadente'], cf.rapportoQP);
  radioRow2('Invecchiamento', ['Sconsigliato', '1-3 anni', '3-5 anni', '5-10 anni', 'Oltre 10 anni'], cf.invecchiamento);
  radioRow2('Costanza produttiva', ['Affidabile', 'Sufficiente', 'Incostante'], cf.costanzaProduttiva);
  radioRow2('Investimento', ['Sicuro', 'Probabile', 'Possibile', 'Da escludere'], cf.investimento);
  y2 -= 4;

  // ── Giudizio finale
  y2 = sectionTitle(ctx2, margin, y2, 'Giudizio Finale');
  const gf = scheda.giudizioFinale;

  p2.drawText('Medaglie:', { x: margin, y: y2, size: 7, font, color: GRAY });
  const medaglie = GIUDIZIO_OPZIONI.filter((o) => o.tipo === 'medaglia');
  let gx = margin + 52;
  medaglie.forEach((opz) => {
    checkbox(ctx2, gx, y2, opz.label, gf.valore === opz.valore, 7);
    gx += 80;
  });
  y2 -= 14;

  p2.drawText('Riconosc.:', { x: margin, y: y2, size: 7, font, color: GRAY });
  const coppe = GIUDIZIO_OPZIONI.filter((o) => o.tipo === 'coppa');
  let gx2 = margin + 52;
  coppe.forEach((opz) => {
    checkbox(ctx2, gx2, y2, opz.label, gf.valore === opz.valore, 7);
    gx2 += 180;
  });
  y2 -= 14;

  p2.drawText('Punteggio:', { x: margin, y: y2, size: 7, font, color: GRAY });
  p2.drawRectangle({ x: margin + 52, y: y2, width: 40, height: 10, borderColor: GRAY, borderWidth: 0.4, color: BG_CELL });
  if (gf.punteggio) {
    p2.drawText(gf.punteggio, { x: margin + 56, y: y2 + 1.5, size: 8, font: fontBold, color: DARK });
  }
  y2 -= 16;

  if (gf.commento) {
    p2.drawText('Commento:', { x: margin, y: y2, size: 7, font, color: GRAY });
    y2 -= 10;
    const lines = gf.commento.match(/.{1,100}/g) || [];
    lines.slice(0, 4).forEach((line) => {
      p2.drawText(line, { x: margin, y: y2, size: 8, font, color: DARK });
      y2 -= 10;
    });
  }

  // Footer
  hline(p2, margin, 32, W - margin * 2);
  p2.drawText('CCA  Cigar Club Association', { x: margin, y: 22, size: 7, font, color: GRAY });
  p2.drawText('Scheda generata il ' + new Date().toLocaleDateString('it-IT'), {
    x: W - margin - 140, y: 22, size: 7, font, color: GRAY
  });

  return pdfDoc.save();
}
