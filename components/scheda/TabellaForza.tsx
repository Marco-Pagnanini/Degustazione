'use client';

import { FaseForza } from '@/lib/types';
import { FORZA_OPZIONI } from '@/lib/schema';

interface TabellaForzaProps {
  forza: FaseForza;
  onChange: (fase: keyof FaseForza, valore: string | null) => void;
}

const FASI_LABEL = { ingresso: 'Ingresso I°', centro: 'Centro II°', finale: 'Finale III°' } as const;

export default function TabellaForza({ forza, onChange }: TabellaForzaProps) {
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
            {FORZA_OPZIONI.map((opzione) => {
              const sel = forza[fase] === opzione;
              return (
                <button
                  key={opzione}
                  type="button"
                  onClick={() => onChange(fase, sel ? null : opzione)}
                  className={`px-4 py-3 min-h-[44px] rounded border text-sm transition-all cursor-pointer touch-manipulation flex-1
                    ${sel
                      ? 'border-gold bg-gold/15 text-gold-light'
                      : 'border-border bg-surface text-text-dim'
                    }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {opzione}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
