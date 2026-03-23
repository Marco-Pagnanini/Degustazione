// Tipi base
export type SceltaSingola = string | null;
export type Intensita = '1' | '2' | '3' | '';

// Dati generali
export interface DatiGenerali {
  data: string;
  catador: string;
  paeseProduzone: string;
  marca: string;
  sigaro: string;           // Vitola de Salida
  vitolaGalera: string;     // Shape
  prezzo: string;
  misure: string;
  fabbricazione: SceltaSingola; // 'Tot. mano TL' | 'Tot. mano TC' | 'Parzial. mano' | 'Tot. Macchina'
  codiceDataProduzione: string;
}

// Analisi a crudo
export interface AnalisiCrudo {
  coloreCapa: SceltaSingola;   // Claro | Col. Claro | Colorado | Col. Maduro | Maduro
  toni: SceltaSingola;         // verde | giallo | dorato | rosso | bruno
  luminosita: SceltaSingola;   // brillante | luminoso | spento
  aspettoVista: SceltaSingola; // Serica | Liscia | legg. Ruvida | Ruvida
  uniformita: SceltaSingola;   // uniforme | abb. uniforme | non uniforme | con venature
  tatto: SceltaSingola;        // secca | vellutata | grassa | untuosa
  costruzione: SceltaSingola;  // Ottima | Buona | Discreta | Scadente
  riempimento: SceltaSingola;  // Regolare | Carente | Eccessivo
  profumi: SceltaSingola;      // Lieve | Medio | Intenso
  sentoriCrudo: string;        // testo libero
}

// Analisi meccanica
export interface AnalisiMeccanica {
  tiraggio: SceltaSingola;    // Eccellente | Regolare | Faticoso | Eccessivo
  combustione: SceltaSingola; // Eccellente | Regolare | legg. Irregolare | Irregolare
  cenere: SceltaSingola;      // Solida | Compatta | Friabile
  cenereColore: string;
}

// Fase gustativa (per ciascuna delle 3 fasi)
export interface FaseSapori {
  dolce: Intensita;
  amaro: Intensita;
  sapido: Intensita;
  aspro: Intensita;
  piccante: Intensita;
  tannico: Intensita;
  asciutto: Intensita;
}

// Aromi selezionati (array di stringhe per fase)
export interface Aromi {
  ingresso: string[];
  centro: string[];
  finale: string[];
  altro: string;
}

// Forza per fase
export interface FaseForza {
  ingresso: SceltaSingola; // Leggero | Medio-Leggero | Medio | Medio-Forte | Forte
  centro: SceltaSingola;
  finale: SceltaSingola;
}

// Descrizione fasi
export interface DescrizioneFasi {
  ingresso: string;
  centro: string;
  finale: string;
}

// Analisi organolettica
export interface AnalisiOrganolettica {
  equilibrio: SceltaSingola;   // Armonico | Equilibrato | Abb. Equilibrato | Poco Equilibrato
  complessita: SceltaSingola;  // Eccellente | Buona | Media | Scadente
  evoluzione: SceltaSingola;   // Eccellente | Buona | Media | Scadente
  persistenza: SceltaSingola;  // Lunghissima | Lunga | Media | Corta
  qualita: SceltaSingola;      // Eccellente | Fine | Comune | Scadente
}

// Considerazioni finali
export interface ConsiderazioniFinali {
  durataFumata: string;
  sigaroPer: SceltaSingola;      // Esperti | Amatori | Tutti | Principianti
  momentoGiornata: SceltaSingola; // Mattino | Pomeriggio | Tutte le ore | Dopo i pasti
  abbinamentoConsigliato: string;
  rapportoQP: SceltaSingola;     // Ottimo | Buono | Medio | Scadente
  invecchiamento: SceltaSingola; // Sconsigliato | 1-3 anni | 3-5 anni | 5-10 anni | Oltre 10 anni
  costanzaProduttiva: SceltaSingola; // Affidabile | Sufficiente | Incostante
  investimento: SceltaSingola;   // Sicuro | Probabile | Possibile | Da escludere
}

// Giudizio finale — UNA SOLA selezione tra tutte le opzioni
export type GiudizioValore = '1' | '2' | '3' | '4' | '5' | 'Coppa' | 'OK' | null;

export interface GiudizioFinale {
  valore: GiudizioValore;   // UN SOLO valore selezionato tra tutti
  punteggio: string;        // numero libero 70-100
  commento: string;
}

// Scheda completa
export interface SchedaCCA {
  datiGenerali: DatiGenerali;
  analisiCrudo: AnalisiCrudo;
  analisiMeccanica: AnalisiMeccanica;
  sapori: {
    ingresso: FaseSapori;
    centro: FaseSapori;
    finale: FaseSapori;
  };
  aromi: Aromi;
  forza: FaseForza;
  descrizioneFasi: DescrizioneFasi;
  analisiOrganolettica: AnalisiOrganolettica;
  considerazioniFinali: ConsiderazioniFinali;
  giudizioFinale: GiudizioFinale;
}
