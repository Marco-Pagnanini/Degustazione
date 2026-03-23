import { SchedaCCA } from './types';

// Lista completa degli aromi disponibili
export const AROMI_LIST = [
  'Erbaceo', 'Vegetale', 'Erbe Aromatiche', 'Spezie', 'Legno',
  'Terra', 'Frutta secca', 'Cuoio', 'Cacao', 'Caffè', 'Pepe', 'Miele', 'Noce'
] as const;

export const FORZA_OPZIONI = [
  'Leggero', 'Medio-Leggero', 'Medio', 'Medio-Forte', 'Forte'
] as const;

export const FASI = ['ingresso', 'centro', 'finale'] as const;

// Opzioni giudizio finale — UN'UNICA selezione tra tutte
// Medaglie: 1 (Scadente 70-74), 2 (Sufficiente 75-79),
//           3 (Discreto 80-84), 4 (Buono 85-89), 5 (Ottimo 90-94)
// Coppe:    Coppa (Eccezionale 95-100), OK (Emozionante)
export const GIUDIZIO_OPZIONI = [
  { valore: '5',     label: '5 — Ottimo',           range: '90-94',  tipo: 'medaglia' },
  { valore: '4',     label: '4 — Buono',             range: '85-89',  tipo: 'medaglia' },
  { valore: '3',     label: '3 — Discreto',          range: '80-84',  tipo: 'medaglia' },
  { valore: '2',     label: '2 — Sufficiente',       range: '75-79',  tipo: 'medaglia' },
  { valore: '1',     label: '1 — Scadente',          range: '70-74',  tipo: 'medaglia' },
  { valore: 'Coppa', label: 'Coppa — Eccezionale',   range: '95-100', tipo: 'coppa' },
  { valore: 'OK',    label: 'OK !!! — Emozionante',  range: '',       tipo: 'coppa' },
] as const;

// Stato iniziale della scheda
export const SCHEDA_INIZIALE: SchedaCCA = {
  datiGenerali: {
    data: new Date().toISOString().split('T')[0],
    catador: '', paeseProduzone: '', marca: '', sigaro: '',
    vitolaGalera: '', prezzo: '', misure: '',
    fabbricazione: null, codiceDataProduzione: ''
  },
  analisiCrudo: {
    coloreCapa: null, toni: null, luminosita: null,
    aspettoVista: null, uniformita: null, tatto: null,
    costruzione: null, riempimento: null, profumi: null, sentoriCrudo: ''
  },
  analisiMeccanica: { tiraggio: null, combustione: null, cenere: null, cenereColore: '' },
  sapori: {
    ingresso: { dolce: '', amaro: '', sapido: '', aspro: '', piccante: '', tannico: '', asciutto: '' },
    centro:   { dolce: '', amaro: '', sapido: '', aspro: '', piccante: '', tannico: '', asciutto: '' },
    finale:   { dolce: '', amaro: '', sapido: '', aspro: '', piccante: '', tannico: '', asciutto: '' },
  },
  aromi: { ingresso: [], centro: [], finale: [], altro: '' },
  forza: { ingresso: null, centro: null, finale: null },
  descrizioneFasi: { ingresso: '', centro: '', finale: '' },
  analisiOrganolettica: {
    equilibrio: null, complessita: null, evoluzione: null,
    persistenza: null, qualita: null
  },
  considerazioniFinali: {
    durataFumata: '', sigaroPer: null, momentoGiornata: null,
    abbinamentoConsigliato: '', rapportoQP: null, invecchiamento: null,
    costanzaProduttiva: null, investimento: null
  },
  giudizioFinale: { valore: null, punteggio: '', commento: '' }
};
