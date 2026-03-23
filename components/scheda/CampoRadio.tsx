'use client';

interface Opzione {
  valore: string;
  label: string;
  range?: string;
}

interface CampoRadioProps {
  label?: string;
  opzioni: readonly Opzione[] | readonly string[];
  valore: string | null;
  onChange: (valore: string | null) => void;
  className?: string;
}

function normalizza(opzione: Opzione | string): Opzione {
  if (typeof opzione === 'string') return { valore: opzione, label: opzione };
  return opzione;
}

export default function CampoRadio({
  label,
  opzioni,
  valore,
  onChange,
  className = '',
}: CampoRadioProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <span
          className="text-xs text-text-dim tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {label}
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        {(opzioni as readonly (Opzione | string)[]).map((opz) => {
          const { valore: val, label: lbl, range } = normalizza(opz);
          const selezionata = valore === val;
          return (
            <button
              key={val}
              type="button"
              onClick={() => onChange(selezionata ? null : val)}
              className={`px-4 py-3 min-h-[44px] rounded border text-base transition-all cursor-pointer touch-manipulation
                ${selezionata
                  ? 'border-gold bg-gold/10 text-gold-light'
                  : 'border-border bg-surface text-text-dim hover:border-gold/50 hover:text-text'
                }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {lbl}
              {range && (
                <span className="ml-1 text-xs opacity-60" style={{ fontFamily: 'var(--font-mono)' }}>
                  {range}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
