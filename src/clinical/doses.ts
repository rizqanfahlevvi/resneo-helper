// ============================================================
// Formula klinis terpusat — SATU sumber kebenaran untuk dosis
// & ukuran alat neonatus. Semua fungsi murni agar bisa di-test.
// Referensi: NRP 8th Ed (AAP/AHA 2021), IDAI 2022, Neofax 2023.
// ============================================================

/** Batas input wajar untuk berat lahir neonatus (gram). */
export const BW_MIN_G = 300;
export const BW_MAX_G = 6000;
/** Batas input wajar usia gestasi (minggu). */
export const GA_MIN_WK = 22;
export const GA_MAX_WK = 44;

export function isValidBirthWeightGram(bwGram: number): boolean {
  return Number.isFinite(bwGram) && bwGram >= BW_MIN_G && bwGram <= BW_MAX_G;
}

export function isValidGestationalAgeWeek(gaWeek: number): boolean {
  return Number.isFinite(gaWeek) && gaWeek >= GA_MIN_WK && gaWeek <= GA_MAX_WK;
}

/**
 * Ukuran ETT (mm ID) berdasarkan berat badan — NRP 8th Ed.
 * <1000 g: 2.5 | 1000–2000 g: 3.0 | >2000 g: 3.5
 * (ETT 4.0 tidak lagi direkomendasikan rutin pada NRP 8th Ed.)
 */
export function ettSizeByWeight(bwKg: number): string {
  if (!(bwKg > 0)) return '-';
  if (bwKg < 1) return '2.5';
  if (bwKg < 2) return '3.0';
  return '3.5';
}

/** Kedalaman ETT di bibir (cm): BB(kg) + 6. */
export function ettDepthAtLip(bwKg: number): string {
  if (!(bwKg > 0)) return '-';
  return (bwKg + 6).toFixed(1);
}

/**
 * Dosis adrenalin/epinefrin 1:10.000 (0,1 mg/mL) — NRP 8th Ed / IDAI 2022.
 * IV/IO: 0,1–0,3 mL/kg (0,01–0,03 mg/kg); dosis awal disarankan 0,2 mL/kg.
 * ETT:   0,5–1,0 mL/kg (0,05–0,1 mg/kg).
 */
export function adrenalinIv(bwKg: number): { min: string; max: string; suggested: string } {
  if (!(bwKg > 0)) return { min: '-', max: '-', suggested: '-' };
  return {
    min: (0.1 * bwKg).toFixed(2),
    max: (0.3 * bwKg).toFixed(2),
    suggested: (0.2 * bwKg).toFixed(2),
  };
}

export function adrenalinEtt(bwKg: number): { min: string; max: string } {
  if (!(bwKg > 0)) return { min: '-', max: '-' };
  return {
    min: (0.5 * bwKg).toFixed(1),
    max: (1.0 * bwKg).toFixed(1),
  };
}

/** Bolus NaCl 0,9% untuk hipovolemia: 10 mL/kg. */
export function saline10PerKg(bwKg: number): string {
  if (!(bwKg > 0)) return '-';
  return (10 * bwKg).toFixed(0);
}

/** Bolus Dextrose 10% untuk hipoglikemia: 2 mL/kg. */
export function dextrose10Bolus(bwKg: number): string {
  if (!(bwKg > 0)) return '-';
  return (2 * bwKg).toFixed(1);
}

/**
 * NaHCO3 (Meylon 4,2% = 0,5 mEq/mL): 1–2 mEq/kg = 2–4 mL/kg IV lambat.
 * Kembalikan rentang, bukan angka tunggal.
 */
export function bicarbonate42(bwKg: number): { minMl: string; maxMl: string } {
  if (!(bwKg > 0)) return { minMl: '-', maxMl: '-' };
  return { minMl: (2 * bwKg).toFixed(1), maxMl: (4 * bwKg).toFixed(1) };
}

/**
 * Kedalaman kateter umbilikal (cm) — formula Shukla.
 * UAC high: 3×BB+9 | UAC low: BB+7 | UVC: (UAC high)/2 + 1
 */
export function umbilicalCatheterDepth(bwKg: number): { uvc: number; uacHigh: number; uacLow: number } {
  if (!(bwKg > 0)) return { uvc: 0, uacHigh: 0, uacLow: 0 };
  const uacHigh = 3 * bwKg + 9;
  return { uvc: uacHigh / 2 + 1, uacHigh, uacLow: bwKg + 7 };
}

/** GIR (mg/kg/menit) = (rate mL/jam × %dekstrosa) / (6 × BB kg). */
export function glucoseInfusionRate(rateMlPerHr: number, dextrosePct: number, bwKg: number): number | null {
  if (!(bwKg > 0) || !(rateMlPerHr >= 0) || !(dextrosePct > 0)) return null;
  return (rateMlPerHr * dextrosePct) / (6 * bwKg);
}

/** Estimasi usia gestasi dari total New Ballard Score: GA = 24 + skor×0,4 (−10→20 mgg, 50→44 mgg). */
export function ballardToGestationalAge(totalScore: number): number {
  return 24 + totalScore * 0.4;
}

/**
 * Dosis gentamisin berdasarkan usia gestasi (Neofax 2023, usia postnatal 0–7 hari):
 * <30 mgg: 5 mg/kg q48h | 30–34 mgg: 4,5 mg/kg q36h | ≥35 mgg: 4 mg/kg q24h
 */
export function gentamicinByGA(gaWeek: number): { dosePerKg: number; interval: string } {
  if (gaWeek < 30) return { dosePerKg: 5, interval: 'q48h' };
  if (gaWeek <= 34) return { dosePerKg: 4.5, interval: 'q36h' };
  return { dosePerKg: 4, interval: 'q24h' };
}

/**
 * Dosis gentamisin berdasarkan usia pasca-menstruasi (PMA = GA lahir + usia postnatal)
 * DAN usia postnatal (PNA) — konvensi Neofax. Interval memendek seiring
 * pematangan klirens ginjal pada PNA lanjut, terlepas dari GA saat lahir.
 */
export function gentamicinDosing(pmaWeek: number, pnaDay: number): { dosePerKg: number; interval: string } {
  if (pmaWeek <= 29) {
    if (pnaDay <= 7) return { dosePerKg: 5, interval: 'q48h' };
    if (pnaDay <= 28) return { dosePerKg: 4, interval: 'q36h' };
    return { dosePerKg: 4, interval: 'q24h' };
  }
  if (pmaWeek <= 34) {
    if (pnaDay <= 7) return { dosePerKg: 4.5, interval: 'q36h' };
    return { dosePerKg: 4, interval: 'q24h' };
  }
  return { dosePerKg: 4, interval: 'q24h' };
}

/**
 * Kebutuhan cairan (mL/kg/hari) per hari kehidupan (kolom = DOL 1–7).
 * Prinsip: makin kecil/prematur, insensible water loss makin besar →
 * kebutuhan hari-pertama makin TINGGI (Neofax/AAP).
 * ⚠ Selalu sesuaikan dengan balans, diuresis, Na, dan kebijakan unit.
 */
export const FLUID_TABLE: Record<'term' | 'preterm-1500' | 'bblr' | 'bblsr', number[]> = {
  //               DOL:  1    2    3    4    5    6    7
  'term':         [60,  75,  90, 105, 120, 135, 150],
  'preterm-1500': [80,  95, 110, 120, 130, 140, 150],
  'bblr':         [80, 100, 110, 120, 130, 140, 150], // 1000–1500 g
  'bblsr':        [90, 110, 120, 130, 140, 150, 160], // <1000 g
};

export function dailyFluidPerKg(category: keyof typeof FLUID_TABLE, dayOfLife: number): number {
  const idx = Math.min(Math.max(Math.trunc(dayOfLife), 1), 7) - 1;
  return FLUID_TABLE[category][idx];
}
