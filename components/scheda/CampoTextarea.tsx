'use client';

interface CampoTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export default function CampoTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  className = '',
}: CampoTextareaProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        className="text-xs text-text-dim tracking-widest uppercase"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="bg-surface border border-border rounded px-3 py-2 text-text text-sm outline-none
                   focus:border-gold transition-colors placeholder:text-text-dim resize-none"
        style={{ fontFamily: 'var(--font-body)' }}
      />
    </div>
  );
}
