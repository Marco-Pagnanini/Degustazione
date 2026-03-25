interface SezioneHeaderProps {
  titolo: string;
  sottotitolo?: string;
}

export default function SezioneHeader({ titolo, sottotitolo }: SezioneHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="h-px flex-1 bg-border opacity-60" />
        <span className="text-gold text-xs opacity-60">✦</span>
        <div className="h-px flex-1 bg-border opacity-60" />
      </div>
      <h2
        className="text-gold text-xl tracking-widest uppercase text-center"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {titolo}
      </h2>
      {sottotitolo && (
        <p
          className="text-text text-base text-center mt-1 tracking-wide"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {sottotitolo}
        </p>
      )}
    </div>
  );
}
