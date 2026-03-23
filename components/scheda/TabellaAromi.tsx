'use client';

import { Aromi } from '@/lib/types';
import { AROMI_LIST } from '@/lib/schema';
import CampoTesto from './CampoTesto';

interface TabellaAromiProps {
  aromi: Aromi;
  onChange: (aromi: Aromi) => void;
}

const FASI_LABEL = { ingresso: 'Ingresso I°', centro: 'Centro II°', finale: 'Finale III°' } as const;

export default function TabellaAromi({ aromi, onChange }: TabellaAromiProps) {
  function toggleAroma(fase: 'ingresso' | 'centro' | 'finale', aroma: string) {
    const corrente = aromi[fase];
    const nuovi = corrente.includes(aroma)
      ? corrente.filter((a) => a !== aroma)
      : [...corrente, aroma];
    onChange({ ...aromi, [fase]: nuovi });
  }

  return (
    <div className="space-y-4">
      {(['ingresso', 'centro', 'finale'] as const).map((fase) => (
        <div key={fase} className="border border-border rounded-lg overflow-hidden">
          <div className="bg-border/30 px-4 py-2">
            <span className="text-xs text-gold tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
              {FASI_LABEL[fase]}
            </span>
          </div>
          <div className="p-3 flex flex-wrap gap-2">
            {AROMI_LIST.map((aroma) => {
              const sel = aromi[fase].includes(aroma);
              return (
                <button
                  key={aroma}
                  type="button"
                  onClick={() => toggleAroma(fase, aroma)}
                  className={`px-4 py-3 min-h-[44px] rounded border text-sm transition-all cursor-pointer touch-manipulation
                    ${sel
                      ? 'border-gold bg-gold/15 text-gold-light'
                      : 'border-border bg-surface text-text-dim'
                    }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {aroma}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <CampoTesto
        label="Altro aroma"
        value={aromi.altro}
        onChange={(v) => onChange({ ...aromi, altro: v })}
        placeholder="Descrivi altri aromi..."
      />
    </div>
  );
}
