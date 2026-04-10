'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SchedaCCA, FaseSapori, Intensita } from '@/lib/types';
import { SCHEDA_INIZIALE } from '@/lib/schema';

import ProgressBar from './ProgressBar';
import SezioneHeader from './SezioneHeader';
import CampoTesto from './CampoTesto';
import CampoTextarea from './CampoTextarea';
import CampoRadio from './CampoRadio';
import CampoColoreCapa from './CampoColoreCapa';
import TabellaSapori from './TabellaSapori';
import TabellaAromi from './TabellaAromi';
import TabellaForza from './TabellaForza';
import GiudizioFinaleComp from './GiudizioFinale';

export default function SchedaForm() {
  const [scheda, setScheda] = useState<SchedaCCA>(SCHEDA_INIZIALE);
  const [scaricando, setScaricando] = useState(false);

  function aggDatiGenerali(campo: string, valore: string | null) {
    setScheda((prev) => ({
      ...prev,
      datiGenerali: { ...prev.datiGenerali, [campo]: valore },
    }));
  }

  function aggAnalisiCrudo(campo: string, valore: string | null) {
    setScheda((prev) => ({
      ...prev,
      analisiCrudo: { ...prev.analisiCrudo, [campo]: valore },
    }));
  }

  function aggAnalisiMeccanica(campo: string, valore: string | null) {
    setScheda((prev) => ({
      ...prev,
      analisiMeccanica: { ...prev.analisiMeccanica, [campo]: valore },
    }));
  }

  function aggSapori(fase: 'ingresso' | 'centro' | 'finale', campo: keyof FaseSapori, valore: Intensita) {
    setScheda((prev) => ({
      ...prev,
      sapori: {
        ...prev.sapori,
        [fase]: { ...prev.sapori[fase], [campo]: valore },
      },
    }));
  }

  function aggForza(fase: keyof SchedaCCA['forza'], valore: string | null) {
    setScheda((prev) => ({
      ...prev,
      forza: { ...prev.forza, [fase]: valore },
    }));
  }

  function aggDescrizioneFasi(fase: string, valore: string) {
    setScheda((prev) => ({
      ...prev,
      descrizioneFasi: { ...prev.descrizioneFasi, [fase]: valore },
    }));
  }

  function aggAnalisiOrganolettica(campo: string, valore: string | null) {
    setScheda((prev) => ({
      ...prev,
      analisiOrganolettica: { ...prev.analisiOrganolettica, [campo]: valore },
    }));
  }

  function aggConsiderazioniFinali(campo: string, valore: string | null) {
    setScheda((prev) => ({
      ...prev,
      considerazioniFinali: { ...prev.considerazioniFinali, [campo]: valore },
    }));
  }

  function scaricaPDF() {
    // Form submit nativo: sincrono, nessun blob URL, funziona su iOS Safari.
    // Il browser apre direttamente la risposta PDF (viewer nativo su mobile,
    // download su desktop). Nessun problema di "user gesture chain".
    setScaricando(true);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/api/genera-pdf';
    // Nessun target: il browser riceve Content-Disposition:attachment
    // e scarica il file senza navigare via dalla pagina.
    // target="_blank" verrebbe bloccato dai popup blocker di tutti i browser.

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'scheda';
    input.value = JSON.stringify(scheda);
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();

    // Il form va rimosso dopo l'invio, non subito (il browser potrebbe ancora referenziarlo)
    setTimeout(() => {
      document.body.removeChild(form);
      setScaricando(false);
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-bg text-text pb-36">
      <ProgressBar scheda={scheda} />

      {/* Spacer per progress bar */}
      <div className="h-10" />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Header principale */}
        <div className="text-center py-6">
          <Image
            src="/logoCivithabana.png"
            alt="CivitHabana Cigar Club"
            width={320}
            height={128}
            className="mx-auto"
            style={{ objectFit: 'contain' }}
            priority
          />
          <p className="text-gold tracking-widest text-xs mt-3 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
            Scheda di Degustazione
          </p>
        </div>

        {/* ── DATI GENERALI ── */}
        <section className="bg-surface rounded-lg border border-border p-6 space-y-6">
          <SezioneHeader titolo="Dati Generali" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CampoTesto
              label="Data"
              value={scheda.datiGenerali.data}
              onChange={(v) => aggDatiGenerali('data', v)}
              type="date"
            />
            <CampoTesto
              label="Catador"
              value={scheda.datiGenerali.catador}
              onChange={(v) => aggDatiGenerali('catador', v)}
              placeholder="Nome del degustatore"
            />
            <CampoTesto
              label="Paese di Produzione"
              value={scheda.datiGenerali.paeseProduzone}
              onChange={(v) => aggDatiGenerali('paeseProduzone', v)}
              placeholder="es. Cuba, Nicaragua..."
            />
            <CampoTesto
              label="Marca"
              value={scheda.datiGenerali.marca}
              onChange={(v) => aggDatiGenerali('marca', v)}
              placeholder="Marca del sigaro"
            />
            <CampoTesto
              label="Sigaro (Vitola de Salida)"
              value={scheda.datiGenerali.sigaro}
              onChange={(v) => aggDatiGenerali('sigaro', v)}
              placeholder="es. Robusto, Corona..."
            />
            <CampoTesto
              label="Prezzo"
              value={scheda.datiGenerali.prezzo}
              onChange={(v) => aggDatiGenerali('prezzo', v)}
              placeholder="es. € 12,50"
            />
            <CampoTesto
              label="Vitola de Galera (Shape)"
              value={scheda.datiGenerali.vitolaGalera}
              onChange={(v) => aggDatiGenerali('vitolaGalera', v)}
              placeholder="Forma"
            />
            <CampoTesto
              label="Misure"
              value={scheda.datiGenerali.misure}
              onChange={(v) => aggDatiGenerali('misure', v)}
              placeholder="es. 50 × 127mm"
            />
            <CampoTesto
              label="Codice e Data di Produzione"
              value={scheda.datiGenerali.codiceDataProduzione}
              onChange={(v) => aggDatiGenerali('codiceDataProduzione', v)}
              placeholder="Codice scatola"
              className="sm:col-span-2"
            />
          </div>
          <CampoRadio
            label="Fabbricazione"
            opzioni={['Tot. mano TL', 'Tot. mano TC', 'Parzial. mano', 'Tot. Macchina']}
            valore={scheda.datiGenerali.fabbricazione}
            onChange={(v) => aggDatiGenerali('fabbricazione', v)}
          />
        </section>

        {/* ── ANALISI A CRUDO ── */}
        <section
          className="relative rounded-lg border border-border p-6 space-y-5 overflow-hidden"
          style={{
            backgroundImage: 'url(/back.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 space-y-5">
          <SezioneHeader titolo="Analisi a Crudo" />
          <CampoColoreCapa
            valore={scheda.analisiCrudo.coloreCapa}
            onChange={(v) => aggAnalisiCrudo('coloreCapa', v)}
          />
          <CampoRadio
            label="Toni"
            opzioni={['verde', 'giallo', 'dorato', 'rosso', 'bruno']}
            valore={scheda.analisiCrudo.toni}
            onChange={(v) => aggAnalisiCrudo('toni', v)}
          />
          <CampoRadio
            label="Luminosità"
            opzioni={['brillante', 'luminoso', 'spento']}
            valore={scheda.analisiCrudo.luminosita}
            onChange={(v) => aggAnalisiCrudo('luminosita', v)}
          />
          <CampoRadio
            label="Aspetto (Vista)"
            opzioni={['Serica', 'Liscia', 'legg. Ruvida', 'Ruvida']}
            valore={scheda.analisiCrudo.aspettoVista}
            onChange={(v) => aggAnalisiCrudo('aspettoVista', v)}
          />
          <CampoRadio
            label="Uniformità"
            opzioni={['uniforme', 'abb. uniforme', 'non uniforme', 'con venature']}
            valore={scheda.analisiCrudo.uniformita}
            onChange={(v) => aggAnalisiCrudo('uniformita', v)}
          />
          <CampoRadio
            label="Tatto"
            opzioni={['secca', 'vellutata', 'grassa', 'untuosa']}
            valore={scheda.analisiCrudo.tatto}
            onChange={(v) => aggAnalisiCrudo('tatto', v)}
          />
          <CampoRadio
            label="Costruzione"
            opzioni={['Ottima', 'Buona', 'Discreta', 'Scadente']}
            valore={scheda.analisiCrudo.costruzione}
            onChange={(v) => aggAnalisiCrudo('costruzione', v)}
          />
          <CampoRadio
            label="Riempimento"
            opzioni={['Regolare', 'Carente', 'Eccessivo']}
            valore={scheda.analisiCrudo.riempimento}
            onChange={(v) => aggAnalisiCrudo('riempimento', v)}
          />
          <CampoRadio
            label="Profumi"
            opzioni={['Lieve', 'Medio', 'Intenso']}
            valore={scheda.analisiCrudo.profumi}
            onChange={(v) => aggAnalisiCrudo('profumi', v)}
          />
          <CampoTextarea
            label="Sentori a Crudo"
            value={scheda.analisiCrudo.sentoriCrudo}
            onChange={(v) => aggAnalisiCrudo('sentoriCrudo', v)}
            placeholder="Descrivi i sentori a crudo..."
            rows={2}
          />
          </div>
        </section>

        {/* ── ANALISI MECCANICA ── */}
        <section className="bg-surface rounded-lg border border-border p-6 space-y-5">
          <SezioneHeader titolo="Analisi Meccanica" />
          <CampoRadio
            label="Tiraggio"
            opzioni={['Eccellente', 'Regolare', 'Faticoso', 'Eccessivo']}
            valore={scheda.analisiMeccanica.tiraggio}
            onChange={(v) => aggAnalisiMeccanica('tiraggio', v)}
          />
          <CampoRadio
            label="Combustione"
            opzioni={['Eccellente', 'Regolare', 'legg. Irregolare', 'Irregolare']}
            valore={scheda.analisiMeccanica.combustione}
            onChange={(v) => aggAnalisiMeccanica('combustione', v)}
          />
          <CampoRadio
            label="Cenere"
            opzioni={['Solida', 'Compatta', 'Friabile']}
            valore={scheda.analisiMeccanica.cenere}
            onChange={(v) => aggAnalisiMeccanica('cenere', v)}
          />
          <CampoTesto
            label="Colore Cenere"
            value={scheda.analisiMeccanica.cenereColore}
            onChange={(v) => aggAnalisiMeccanica('cenereColore', v)}
            placeholder="es. bianca, grigio chiaro..."
          />
        </section>

        {/* ── ANALISI GUSTATIVA ── */}
        <section className="bg-surface rounded-lg border border-border p-6 space-y-6">
          <SezioneHeader titolo="Analisi Gustativa" sottotitolo="Sapori per Fase" />
          <TabellaSapori
            sapori={scheda.sapori}
            onChange={aggSapori}
          />
        </section>

        {/* ── AROMI ── */}
        <section className="bg-surface rounded-lg border border-border p-6 space-y-6">
          <SezioneHeader titolo="Aromi" sottotitolo="Seleziona gli aromi percepiti per fase" />
          <TabellaAromi
            aromi={scheda.aromi}
            onChange={(aromi) => setScheda((prev) => ({ ...prev, aromi }))}
          />
        </section>

        {/* ── FORZA ── */}
        <section className="bg-surface rounded-lg border border-border p-6 space-y-6">
          <SezioneHeader titolo="Forza" sottotitolo="Intensità per fase" />
          <TabellaForza
            forza={scheda.forza}
            onChange={aggForza}
          />
        </section>

        {/* ── DESCRIZIONE FASI ── */}
        <section className="bg-surface rounded-lg border border-border p-6 space-y-5">
          <SezioneHeader titolo="Descrizione Sintetica delle Fasi" />
          <CampoTextarea
            label="Ingresso (I° Terzo)"
            value={scheda.descrizioneFasi.ingresso}
            onChange={(v) => aggDescrizioneFasi('ingresso', v)}
            placeholder="Descrivi il primo terzo..."
            rows={3}
          />
          <CampoTextarea
            label="Centro (II° Terzo)"
            value={scheda.descrizioneFasi.centro}
            onChange={(v) => aggDescrizioneFasi('centro', v)}
            placeholder="Descrivi il secondo terzo..."
            rows={3}
          />
          <CampoTextarea
            label="Finale (III° Terzo)"
            value={scheda.descrizioneFasi.finale}
            onChange={(v) => aggDescrizioneFasi('finale', v)}
            placeholder="Descrivi il terzo finale..."
            rows={3}
          />
        </section>

        {/* ── ANALISI ORGANOLETTICA ── */}
        <section className="bg-surface rounded-lg border border-border p-6 space-y-5">
          <SezioneHeader titolo="Analisi Organolettica" />
          <CampoRadio
            label="Equilibrio"
            opzioni={['Armonico', 'Equilibrato', 'Abb. Equilibrato', 'Poco Equilibrato']}
            valore={scheda.analisiOrganolettica.equilibrio}
            onChange={(v) => aggAnalisiOrganolettica('equilibrio', v)}
          />
          <CampoRadio
            label="Complessità"
            opzioni={['Eccellente', 'Buona', 'Media', 'Scadente']}
            valore={scheda.analisiOrganolettica.complessita}
            onChange={(v) => aggAnalisiOrganolettica('complessita', v)}
          />
          <CampoRadio
            label="Evoluzione"
            opzioni={['Eccellente', 'Buona', 'Media', 'Scadente']}
            valore={scheda.analisiOrganolettica.evoluzione}
            onChange={(v) => aggAnalisiOrganolettica('evoluzione', v)}
          />
          <CampoRadio
            label="Persistenza"
            opzioni={['Lunghissima', 'Lunga', 'Media', 'Corta']}
            valore={scheda.analisiOrganolettica.persistenza}
            onChange={(v) => aggAnalisiOrganolettica('persistenza', v)}
          />
          <CampoRadio
            label="Qualità"
            opzioni={['Eccellente', 'Fine', 'Comune', 'Scadente']}
            valore={scheda.analisiOrganolettica.qualita}
            onChange={(v) => aggAnalisiOrganolettica('qualita', v)}
          />
        </section>

        {/* ── CONSIDERAZIONI FINALI ── */}
        <section className="bg-surface rounded-lg border border-border p-6 space-y-5">
          <SezioneHeader titolo="Considerazioni Finali" />
          <CampoTesto
            label="Durata Fumata (ore e minuti)"
            value={scheda.considerazioniFinali.durataFumata}
            onChange={(v) => aggConsiderazioniFinali('durataFumata', v)}
            placeholder="es. 1h 20min"
          />
          <CampoRadio
            label="Sigaro Per"
            opzioni={['Esperti', 'Amatori', 'Tutti', 'Principianti']}
            valore={scheda.considerazioniFinali.sigaroPer}
            onChange={(v) => aggConsiderazioniFinali('sigaroPer', v)}
          />
          <CampoRadio
            label="Momento della Giornata"
            opzioni={['Mattino', 'Pomeriggio', 'Tutte le ore', 'Dopo i pasti']}
            valore={scheda.considerazioniFinali.momentoGiornata}
            onChange={(v) => aggConsiderazioniFinali('momentoGiornata', v)}
          />
          <CampoTesto
            label="Abbinamento Consigliato"
            value={scheda.considerazioniFinali.abbinamentoConsigliato}
            onChange={(v) => aggConsiderazioniFinali('abbinamentoConsigliato', v)}
            placeholder="es. Rum invecchiato, Bourbon, Espresso..."
          />
          <CampoRadio
            label="Rapporto Qualità/Prezzo"
            opzioni={['Ottimo', 'Buono', 'Medio', 'Scadente']}
            valore={scheda.considerazioniFinali.rapportoQP}
            onChange={(v) => aggConsiderazioniFinali('rapportoQP', v)}
          />
          <CampoRadio
            label="Invecchiamento"
            opzioni={['Sconsigliato', '1-3 anni', '3-5 anni', '5-10 anni', 'Oltre 10 anni']}
            valore={scheda.considerazioniFinali.invecchiamento}
            onChange={(v) => aggConsiderazioniFinali('invecchiamento', v)}
          />
          <CampoRadio
            label="Costanza Produttiva"
            opzioni={['Affidabile', 'Sufficiente', 'Incostante']}
            valore={scheda.considerazioniFinali.costanzaProduttiva}
            onChange={(v) => aggConsiderazioniFinali('costanzaProduttiva', v)}
          />
          <CampoRadio
            label="Investimento (Collezione)"
            opzioni={['Sicuro', 'Probabile', 'Possibile', 'Da escludere']}
            valore={scheda.considerazioniFinali.investimento}
            onChange={(v) => aggConsiderazioniFinali('investimento', v)}
          />
        </section>

        {/* ── GIUDIZIO FINALE ── */}
        <section className="bg-surface rounded-lg border border-border p-6 space-y-6">
          <SezioneHeader
            titolo="Giudizio Finale"
            sottotitolo="Seleziona UN SOLO valore tra medaglie e riconoscimenti"
          />
          <GiudizioFinaleComp
            giudizio={scheda.giudizioFinale}
            onChange={(g) => setScheda((prev) => ({ ...prev, giudizioFinale: g }))}
          />
        </section>
      </div>

      {/* Bottone PDF sticky */}
      <div
        className="fixed bottom-0 left-0 right-0 border-t border-border bg-bg/95 backdrop-blur-sm flex justify-center"
        style={{ padding: 'max(1rem, env(safe-area-inset-bottom) + 0.75rem) 1rem 1rem' }}
      >
        <button
          type="button"
          onClick={scaricaPDF}
          disabled={scaricando}
          className="flex items-center justify-center gap-2 w-full max-w-sm min-h-[52px] rounded-lg font-semibold text-bg
                     bg-gold hover:bg-gold-light active:bg-gold transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                     tracking-widest uppercase text-sm shadow-lg touch-manipulation"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {scaricando ? (
            <>
              <span className="animate-spin">◌</span>
              Generazione in corso...
            </>
          ) : (
            <>
              ↓ Scarica Bozza PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
}
