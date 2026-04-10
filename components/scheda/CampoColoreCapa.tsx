'use client';

const OPZIONI = ['Claro', 'Col. Claro', 'Colorado', 'Col. Maduro', 'Maduro'] as const;

interface CampoColoreCapaProps {
  valore: string | null;
  onChange: (valore: string | null) => void;
}

export default function CampoColoreCapa({ valore, onChange }: CampoColoreCapaProps) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="text-sm text-text tracking-widest uppercase"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Colore della Capa
      </span>
      <div className="flex flex-wrap gap-2">
        {OPZIONI.map((val) => {
          const selezionato = valore === val;
          return (
            <button
              key={val}
              type="button"
              onClick={() => onChange(selezionato ? null : val)}
              className={`px-4 py-3 min-h-[44px] rounded border text-base transition-all cursor-pointer touch-manipulation
                ${selezionato
                  ? 'border-gold bg-gold/20 text-gold-light font-semibold'
                  : 'border-white/40 bg-black/30 text-white hover:border-gold/60 hover:bg-black/50'
                }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {val}
            </button>
          );
        })}
      </div>
    </div>
  );
}
