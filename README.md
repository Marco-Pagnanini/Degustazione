# Degustazione - Scheda di Valutazione Sigari CCA

Applicazione web per la creazione di schede di degustazione sigari secondo gli standard del **Cigar Club Association (CCA)**.

## Descrizione

Degustazione è un'applicazione form-based che permette ai catadores (degustatori) di documentare valutazioni dettagliate dei sigari con criteri standardizzati ed esportare i risultati in formato PDF.

## Funzionalità

- **Form multi-sezione** per la valutazione completa del sigaro
- **Analisi a crudo** - colore capa, tonalità, luminosità, texture, uniformità
- **Analisi meccanica** - tiraggio, combustione, cenere
- **Analisi gustativa** - tabella sapori su 3 fasi (ingresso, centro, finale)
- **Aromi** - 13 categorie di aromi identificabili per fase
- **Forza** - intensità percepita nelle 3 fasi
- **Giudizio finale** - sistema di medaglie e riconoscimenti speciali
- **Barra di progresso** in tempo reale
- **Esportazione PDF** professionale con loghi CCA

## Tech Stack

- **Next.js 16** - Framework React con App Router
- **React 19** - Libreria UI
- **TypeScript 5** - Tipizzazione statica
- **Tailwind CSS 4** - Styling utility-first
- **pdf-lib** - Generazione PDF lato server

## Installazione

```bash
# Clona il repository
git clone <repo-url>
cd degustazione

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:3000`

## Comandi

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il server di sviluppo |
| `npm run build` | Build di produzione |
| `npm start` | Avvia il server di produzione |
| `npm run lint` | Esegue ESLint |

## Struttura Progetto

```
degustazione/
├── app/
│   ├── page.tsx              # Redirect a /scheda
│   ├── layout.tsx            # Layout con font e metadata
│   ├── globals.css           # Stili globali e tema
│   ├── scheda/
│   │   └── page.tsx          # Pagina principale del form
│   └── api/
│       └── genera-pdf/
│           └── route.ts      # API per generazione PDF
├── components/
│   └── scheda/               # Componenti del form
│       ├── SchedaForm.tsx    # Container principale
│       ├── ProgressBar.tsx   # Indicatore progresso
│       ├── CampoTesto.tsx    # Input testo
│       ├── CampoTextarea.tsx # Textarea
│       ├── CampoRadio.tsx    # Radio buttons
│       ├── CampoColoreCapa.tsx # Selettore colore capa
│       ├── TabellaSapori.tsx # Tabella intensità sapori
│       ├── TabellaAromi.tsx  # Tabella selezione aromi
│       ├── TabellaForza.tsx  # Tabella forza per fase
│       ├── GiudizioFinale.tsx # Medaglie e riconoscimenti
│       └── SezioneHeader.tsx # Titoli sezione
├── lib/
│   ├── types.ts              # Definizioni TypeScript
│   ├── schema.ts             # Schema form e costanti
│   └── generatePdf.ts        # Logica generazione PDF
└── public/
    ├── logoCCA.png           # Logo Cigar Club Association
    └── logoCivithabana.png   # Logo CivitHabana
```

## Sezioni della Scheda

1. **Dati Generali** - Data, catador, paese, marca, vitola, prezzo
2. **Analisi a Crudo** - Valutazione visiva e tattile del sigaro
3. **Analisi Meccanica** - Tiraggio, combustione, cenere
4. **Analisi Gustativa** - 7 sapori con 3 livelli di intensità
5. **Aromi** - Identificazione aromi per fase di fumata
6. **Forza** - Intensità percepita (leggera → forte)
7. **Descrizione Fasi** - Note libere per ogni fase
8. **Analisi Organolettica** - Equilibrio, complessità, evoluzione
9. **Considerazioni Finali** - Durata, abbinamenti, rapporto qualità/prezzo
10. **Giudizio Finale** - Medaglia e commento finale

## Sistema di Valutazione

| Medaglia | Descrizione |
|----------|-------------|
| Scadente | ⭐ |
| Sufficiente | ⭐⭐ |
| Buono | ⭐⭐⭐ |
| Distinto | ⭐⭐⭐⭐ |
| Ottimo | ⭐⭐⭐⭐⭐ |
| **Coppa** | Eccellenza assoluta |
| **OK!** | Esperienza emozionale |

## Design

Tema dark luxury ispirato all'estetica dei club del sigaro:

- **Background**: Nero-marrone profondo (`#0e0b07`)
- **Accenti**: Oro (`#c9a84c`)
- **Font**: Playfair Display, Crimson Pro, DM Mono

## Licenza

Progetto portfolio - Tutti i diritti riservati.

---

Sviluppato per il **Cigar Club Association**
