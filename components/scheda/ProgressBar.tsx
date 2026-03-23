'use client';

import { SchedaCCA } from '@/lib/types';

interface ProgressBarProps {
  scheda: SchedaCCA;
}

function calcolaProgresso(scheda: SchedaCCA): number {
  let completati = 0;
  let totale = 0;

  // Campi testo obbligatori
  const obbligatori: string[] = [
    scheda.datiGenerali.catador,
    scheda.datiGenerali.marca,
    scheda.datiGenerali.sigaro,
    scheda.datiGenerali.data,
  ];
  obbligatori.forEach((c) => {
    totale++;
    if (c && c.trim()) completati++;
  });

  // Gruppi radio (analisi crudo)
  const radios = [
    scheda.analisiCrudo.coloreCapa,
    scheda.analisiCrudo.toni,
    scheda.analisiCrudo.luminosita,
    scheda.analisiCrudo.aspettoVista,
    scheda.analisiCrudo.uniformita,
    scheda.analisiCrudo.tatto,
    scheda.analisiCrudo.costruzione,
    scheda.analisiCrudo.riempimento,
    scheda.analisiCrudo.profumi,
    scheda.analisiMeccanica.tiraggio,
    scheda.analisiMeccanica.combustione,
    scheda.analisiMeccanica.cenere,
    scheda.forza.ingresso,
    scheda.forza.centro,
    scheda.forza.finale,
    scheda.analisiOrganolettica.equilibrio,
    scheda.analisiOrganolettica.complessita,
    scheda.analisiOrganolettica.evoluzione,
    scheda.analisiOrganolettica.persistenza,
    scheda.analisiOrganolettica.qualita,
    scheda.considerazioniFinali.sigaroPer,
    scheda.considerazioniFinali.rapportoQP,
  ];
  radios.forEach((r) => {
    totale++;
    if (r !== null) completati++;
  });

  // Almeno un aroma per fase
  (['ingresso', 'centro', 'finale'] as const).forEach((fase) => {
    totale++;
    if (scheda.aromi[fase].length > 0) completati++;
  });

  // Giudizio finale
  totale++;
  if (scheda.giudizioFinale.valore !== null) completati++;

  return Math.round((completati / totale) * 100);
}

export default function ProgressBar({ scheda }: ProgressBarProps) {
  const percentuale = calcolaProgresso(scheda);

  return (
    <div className="fixed top-0 left-0 right-0 z-50" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="h-1 bg-surface">
        <div
          className="h-full bg-gold transition-all duration-500"
          style={{ width: `${percentuale}%` }}
        />
      </div>
      <div className="flex justify-end px-4 py-2 bg-bg/90 backdrop-blur-sm border-b border-border">
        <span
          className="text-xs text-text-dim"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {percentuale}% completato
        </span>
      </div>
    </div>
  );
}
