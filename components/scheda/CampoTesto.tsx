'use client';

interface CampoTestoProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}

export default function CampoTesto({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
}: CampoTestoProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        className="text-xs text-text-dim tracking-widest uppercase"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-surface border border-border rounded px-3 py-2 text-text text-sm outline-none
                   focus:border-gold transition-colors placeholder:text-text-dim"
        style={{ fontFamily: 'var(--font-body)' }}
      />
    </div>
  );
}
