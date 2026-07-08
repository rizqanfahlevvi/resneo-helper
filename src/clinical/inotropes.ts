/**
 * Obat inotropik & vasoaktif neonatus — konversi dosis ⇄ laju infus dan
 * rentang dosis keamanan. Semua obat di sini memakai satuan mcg/kg/menit.
 *
 * Rumus konversi (single source of truth, diuji di inotropes.test.ts):
 *   laju (mL/jam) = dosis(mcg/kg/mnt) × BB(kg) × 60 ÷ [konsentrasi(mg/mL) × 1000]
 *   dosis(mcg/kg/mnt) = laju(mL/jam) × konsentrasi(mg/mL) × 1000 ÷ [BB(kg) × 60]
 *
 * Referensi rentang dosis:
 *  - Neonatal Formulary 8th Ed. (Wiley-Blackwell, 2020)
 *  - NeoFax / Micromedex NeoFax (2023)
 *  - Barrington KJ. Common hemodynamic problems in the neonate. Neonatology 2013.
 *  - IDAI, Formularium NICU.
 */

export type InotropeId = 'dopamine' | 'dobutamine' | 'epinephrine' | 'norepinephrine' | 'milrinone';

export interface InotropeDrug {
  id: InotropeId;
  label: string;
  short: string;
  /** Rentang dosis lazim [min, max] mcg/kg/menit */
  usual: [number, number];
  /** Dosis maksimum lazim mcg/kg/menit */
  max: number;
  /** Preset tombol dosis cepat */
  presets: number[];
  /** Konsentrasi larutan lazim untuk neonatus (mg/mL) sebagai titik awal */
  typicalConc: number;
  effect: string;
  note: string;
}

export const INOTROPES: Record<InotropeId, InotropeDrug> = {
  dopamine: {
    id: 'dopamine', label: 'Dopamin', short: 'Dopamin',
    usual: [2, 20], max: 20, presets: [2, 5, 10, 15, 20], typicalConc: 1.6,
    effect: 'Dosis-dependen: renal/dopaminergik (2–5), β/inotropik (5–10), α/vasopresor (10–20).',
    note: 'Vasopresor lini pertama hipotensi neonatus. Ekstravasasi → nekrosis; utamakan akses sentral bila >10 mcg/kg/mnt.',
  },
  dobutamine: {
    id: 'dobutamine', label: 'Dobutamin', short: 'Dobutamin',
    usual: [2.5, 20], max: 20, presets: [2.5, 5, 7.5, 10, 20], typicalConc: 2,
    effect: 'β1-agonis: inotropik + sedikit kronotropik. Menurunkan afterload (β2).',
    note: 'Pilihan pada disfungsi miokard / curah jantung rendah. Kurang menaikkan tekanan darah dibanding dopamin.',
  },
  epinephrine: {
    id: 'epinephrine', label: 'Epinefrin (Adrenalin)', short: 'Epinefrin',
    usual: [0.05, 1], max: 1, presets: [0.05, 0.1, 0.3, 0.5, 1], typicalConc: 0.02,
    effect: 'Dosis rendah (<0,3) β-dominan (inotropik); dosis tinggi α-dominan (vasopresor).',
    note: 'Untuk syok refrakter. Pantau laktat & GDS (hiperglikemia). Wajib akses sentral. Konsentrasi kecil (mis. 0,02 mg/mL).',
  },
  norepinephrine: {
    id: 'norepinephrine', label: 'Norepinefrin (Noradrenalin)', short: 'Norepinefrin',
    usual: [0.05, 1], max: 1, presets: [0.05, 0.1, 0.3, 0.5, 1], typicalConc: 0.02,
    effect: 'α1-dominan: vasokonstriksi kuat + inotropik ringan. Menaikkan resistensi vaskular sistemik.',
    note: 'Syok vasodilatasi/septik & PPHN (menaikkan tekanan sistemik relatif terhadap pulmonal). Wajib akses sentral.',
  },
  milrinone: {
    id: 'milrinone', label: 'Milrinon', short: 'Milrinon',
    usual: [0.25, 0.75], max: 1, presets: [0.25, 0.33, 0.5, 0.75], typicalConc: 0.2,
    effect: 'Inhibitor fosfodiesterase-3: inodilator (inotropik + vasodilatasi paru & sistemik). Tidak lewat reseptor adrenergik.',
    note: 'PPHN & disfungsi ventrikel pasca-cooling. Dapat menyebabkan hipotensi (vasodilatasi) — pertimbangkan hindari dosis muat pada neonatus. Ekskresi ginjal.',
  },
};

export type DoseZone = 'below' | 'usual' | 'high' | 'over';

/** Klasifikasi keamanan dosis relatif terhadap rentang lazim & maksimum. */
export function doseZone(id: InotropeId, dose: number): DoseZone {
  const d = INOTROPES[id];
  if (dose < d.usual[0]) return 'below';
  if (dose > d.max) return 'over';
  if (dose > d.usual[1]) return 'high';
  return 'usual';
}

/** Dosis (mcg/kg/menit) → laju infus (mL/jam). Mengembalikan null bila input invalid. */
export function doseToRate(doseMcgKgMin: number, weightKg: number, concMgPerMl: number): number | null {
  if (!(doseMcgKgMin >= 0) || !(weightKg > 0) || !(concMgPerMl > 0)) return null;
  return (doseMcgKgMin * weightKg * 60) / (concMgPerMl * 1000);
}

/** Laju infus (mL/jam) → dosis (mcg/kg/menit). Mengembalikan null bila input invalid. */
export function rateToDose(rateMlHr: number, weightKg: number, concMgPerMl: number): number | null {
  if (!(rateMlHr >= 0) || !(weightKg > 0) || !(concMgPerMl > 0)) return null;
  return (rateMlHr * concMgPerMl * 1000) / (weightKg * 60);
}

/**
 * "Rule of 6" — resep pengenceran standar agar konversi laju sederhana.
 * standard (faktor 6): tambahkan (6 × BB) mg obat ke total 100 mL →
 *   konsentrasi sedemikian rupa sehingga 1 mL/jam = 1 mcg/kg/menit.
 * potent (faktor 0,6): untuk epinefrin/norepinefrin →
 *   1 mL/jam = 0,1 mcg/kg/menit (menghindari dosis berlebih pada obat poten).
 * Mengembalikan mg obat yang perlu ditambahkan & konsentrasi hasilnya (mg/mL).
 */
export function ruleOfSix(
  weightKg: number,
  totalVolumeMl: number,
  variant: 'standard' | 'potent' = 'standard',
): { drugMg: number; concMgPerMl: number } | null {
  if (!(weightKg > 0) || !(totalVolumeMl > 0)) return null;
  const factor = variant === 'potent' ? 0.6 : 6;
  const drugMg = (factor * weightKg * totalVolumeMl) / 100;
  return { drugMg, concMgPerMl: drugMg / totalVolumeMl };
}

/** Obat poten yang sebaiknya memakai varian "rule of six" 0,6. */
export function ruleVariantFor(id: InotropeId): 'standard' | 'potent' {
  return id === 'epinephrine' || id === 'norepinephrine' ? 'potent' : 'standard';
}
