'use client';

import { FaseSapori, Intensita } from '@/lib/types';

const SAPORI = ['dolce', 'amaro', 'sapido', 'aspro', 'piccante', 'tannico', 'asciutto'] as const;
const FASI_LABEL = { ingresso: 'Ingresso I°', centro: 'Centro II°', finale: 'Finale III°' } as const;
const INTENSITA: { value: Intensita; label: string; desc: string }[] = [
  { value: '', label: '—', desc: 'nessuno' },
  { value: '1', label: '1', desc: 'lieve' },
  { value: '2', label: '2', desc: 'presente' },
  { value: '3', label: '3', desc: 'importante' },
];

interface TabellaSaporiProps {
  sapori: {
    ingresso: FaseSapori;
    centro: FaseSapori;
    finale: FaseSapori;
  };
  onChange: (fase: 'ingresso' | 'centro' | 'finale', campo: keyof FaseSapori, valore: Intensita) => void;
}

export default function TabellaSapori({ sapori, onChange }: TabellaSaporiProps) {
  return (
    <div className="space-y-4">
      {(['ingresso', 'centro', 'finale'] as const).map((fase) => (
        <div key={fase} className="border border-border rounded-lg overflow-hidden">
          <div className="bg-border/30 px-4 py-2">
            <span className="text-xs text-gold tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
              {FASI_LABEL[fase]}
            </span>
          </div>
          <div className="divide-y divide-border">
            {SAPORI.map((sapore) => {
              const valCorrente = sapori[fase][sapore];
              return (
                <div key={sapore} className="flex items-center px-4 py-2 gap-3">
                  <span
                    className="text-sm text-text-dim capitalize w-20 shrink-0"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {sapore}
                  </span>
                  <div className="flex gap-2 flex-1">
                    {INTENSITA.map((opt) => {
                      const sel = valCorrente === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => onChange(fase, sapore, opt.value)}
                          title={opt.desc}
                          className={`flex-1 min-h-[44px] rounded border text-sm font-medium transition-all cursor-pointer touch-manipulation
                            ${sel
                              ? 'border-gold bg-gold/15 text-gold-light'
                              : 'border-border bg-surface text-text-dim'
                            }`}
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <p className="text-text-dim text-xs italic px-1" style={{ fontFamily: 'var(--font-body)' }}>
        1 = lieve &nbsp;·&nbsp; 2 = presente &nbsp;·&nbsp; 3 = importante
      </p>
    </div>
  );
}
