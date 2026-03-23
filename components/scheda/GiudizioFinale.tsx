'use client';

import { GiudizioFinale as GiudizioFinaleType, GiudizioValore } from '@/lib/types';
import { GIUDIZIO_OPZIONI } from '@/lib/schema';
import CampoTextarea from './CampoTextarea';

interface GiudizioFinaleProps {
  giudizio: GiudizioFinaleType;
  onChange: (giudizio: GiudizioFinaleType) => void;
}

export default function GiudizioFinale({ giudizio, onChange }: GiudizioFinaleProps) {
  function seleziona(valore: string) {
    const nuovoValore = giudizio.valore === valore ? null : valore as GiudizioValore;
    onChange({ ...giudizio, valore: nuovoValore });
  }

  const medaglie = GIUDIZIO_OPZIONI.filter((o) => o.tipo === 'medaglia');
  const coppe = GIUDIZIO_OPZIONI.filter((o) => o.tipo === 'coppa');

  return (
    <div className="space-y-6">
      {/* Medaglie */}
      <div>
        <p className="text-xs text-text-dim tracking-widest uppercase mb-3"
           style={{ fontFamily: 'var(--font-mono)' }}>
          Medaglie
        </p>
        <div className="flex flex-wrap gap-2">
          {medaglie.map((opz) => {
            const selezionata = giudizio.valore === opz.valore;
            return (
              <button
                key={opz.valore}
                type="button"
                onClick={() => seleziona(opz.valore)}
                className={`flex items-center gap-2 px-4 py-2 rounded border text-sm transition-all cursor-pointer
                  ${selezionata
                    ? 'border-gold bg-gold/15 text-gold-light'
                    : 'border-border bg-surface text-text-dim hover:border-gold/50 hover:text-text'
                  }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                  ${selezionata ? 'border-gold bg-gold' : 'border-text-dim'}`}>
                  {selezionata && <span className="w-2 h-2 rounded-full bg-bg block" />}
                </span>
                <span>{opz.label}</span>
                {opz.range && (
                  <span className="text-xs opacity-50 ml-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    {opz.range}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Coppe */}
      <div>
        <p className="text-xs text-text-dim tracking-widest uppercase mb-3"
           style={{ fontFamily: 'var(--font-mono)' }}>
          Riconoscimenti Speciali
        </p>
        <div className="flex flex-wrap gap-2">
          {coppe.map((opz) => {
            const selezionata = giudizio.valore === opz.valore;
            return (
              <button
                key={opz.valore}
                type="button"
                onClick={() => seleziona(opz.valore)}
                className={`flex items-center gap-2 px-4 py-2 rounded border text-sm transition-all cursor-pointer
                  ${selezionata
                    ? 'border-gold-light bg-gold/20 text-gold-light shadow-sm'
                    : 'border-border bg-surface text-text-dim hover:border-gold/50 hover:text-text'
                  }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                  ${selezionata ? 'border-gold bg-gold' : 'border-text-dim'}`}>
                  {selezionata && <span className="w-2 h-2 rounded-full bg-bg block" />}
                </span>
                <span>{opz.label}</span>
                {opz.range && (
                  <span className="text-xs opacity-50 ml-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    {opz.range}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Punteggio */}
      <div className="flex flex-col gap-1">
        <label
          className="text-xs text-text-dim tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Punteggio (70 – 100)
        </label>
        <input
          type="number"
          min={70}
          max={100}
          value={giudizio.punteggio}
          onChange={(e) => onChange({ ...giudizio, punteggio: e.target.value })}
          placeholder="es. 87"
          className="bg-surface border border-border rounded px-3 py-2 text-text text-sm outline-none
                     focus:border-gold transition-colors placeholder:text-text-dim w-32"
          style={{ fontFamily: 'var(--font-mono)' }}
        />
      </div>

      {/* Commento */}
      <CampoTextarea
        label="Commento e Osservazioni"
        value={giudizio.commento}
        onChange={(v) => onChange({ ...giudizio, commento: v })}
        placeholder="Note finali, impressioni generali..."
        rows={4}
      />
    </div>
  );
}
