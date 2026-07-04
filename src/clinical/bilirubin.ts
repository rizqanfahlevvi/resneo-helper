// ============================================================
// Kalkulator Bilirubin & Fototerapi — aproksimasi kurva AAP 2022
// ⚠️ Ini adalah APROKSIMASI untuk pendukung keputusan cepat bedside,
// BUKAN pengganti nomogram/BiliTool resmi. Selalu korelasikan dengan
// kurva jam-spesifik asli (AAP 2022 Clinical Practice Guideline) dan
// kebijakan RS setempat sebelum mengambil keputusan tata laksana.
// ============================================================

export interface BilirubinRiskFactors {
  isoimunHemolitik: boolean;   // inkompatibilitas ABO/Rhesus, dll
  defisiensiG6PD: boolean;
  asfiksia: boolean;
  letargiSignifikan: boolean;
  instabilitasSuhu: boolean;
  sepsis: boolean;
  asidosis: boolean;
  albuminRendah: boolean;      // < 3,0 g/dL
}

export const DEFAULT_BILIRUBIN_RISK: BilirubinRiskFactors = {
  isoimunHemolitik: false,
  defisiensiG6PD: false,
  asfiksia: false,
  letargiSignifikan: false,
  instabilitasSuhu: false,
  sepsis: false,
  asidosis: false,
  albuminRendah: false,
};

export function hasNeurotoxicityRiskFactor(risk: BilirubinRiskFactors): boolean {
  return Object.values(risk).some(Boolean);
}

// Titik kurva [jam, ambang term ≥38 mgg, ambang late-preterm 35–37 6/7 mgg] mg/dL
// — aproksimasi linier dari kurva AAP 2022 "risiko standar" (tanpa faktor risiko)
const PHOTO_CURVE_POINTS: [number, number, number][] = [
  [24, 10, 8],
  [48, 13, 11],
  [72, 15, 13.5],
  [96, 17, 15],
  [120, 18, 16],
];

function interpolateCurve(ageHours: number, col: 1 | 2): number {
  const points = PHOTO_CURVE_POINTS;
  if (ageHours <= points[0][0]) return points[0][col];
  if (ageHours >= points[points.length - 1][0]) return points[points.length - 1][col];
  for (let i = 0; i < points.length - 1; i++) {
    const lo = points[i];
    const hi = points[i + 1];
    if (ageHours >= lo[0] && ageHours <= hi[0]) {
      const frac = (ageHours - lo[0]) / (hi[0] - lo[0]);
      return lo[col] + frac * (hi[col] - lo[col]);
    }
  }
  return points[points.length - 1][col];
}

function phototherapyTermAndLatePreterm(gaWeek: number, ageHours: number, hasRisk: boolean): number {
  const col: 1 | 2 = gaWeek < 38 ? 2 : 1;
  const threshold = interpolateCurve(ageHours, col);
  return hasRisk ? threshold - 2 : threshold;
}

/**
 * Ambang fototerapi untuk GA <35 minggu — tabel praktik umum berbasis GA
 * (bukan kurva jam-spesifik AAP; panduan awal preterm, sesuaikan kebijakan unit).
 */
function phototherapyPreterm(gaWeek: number): number {
  if (gaWeek < 28) return 5;
  if (gaWeek < 30) return 7;
  if (gaWeek < 32) return 9;
  if (gaWeek < 34) return 11;
  return 13; // 34–34 6/7 minggu
}

export function phototherapyThreshold(gaWeek: number, ageHours: number, risk: BilirubinRiskFactors): number {
  if (gaWeek >= 35) return phototherapyTermAndLatePreterm(gaWeek, ageHours, hasNeurotoxicityRiskFactor(risk));
  return phototherapyPreterm(gaWeek);
}

/** Ambang transfusi tukar — ambang fototerapi + offset (lebih kecil pada bayi lebih prematur). */
export function exchangeTransfusionThreshold(gaWeek: number, ageHours: number, risk: BilirubinRiskFactors): number {
  const photo = phototherapyThreshold(gaWeek, ageHours, risk);
  const offset = gaWeek >= 38 ? 5 : gaWeek >= 35 ? 4 : 3;
  return photo + offset;
}

export type BilirubinZone = 'normal' | 'mendekati' | 'fototerapi' | 'transfusi';

export function classifyBilirubin(
  tsb: number,
  gaWeek: number,
  ageHours: number,
  risk: BilirubinRiskFactors
): BilirubinZone {
  const photo = phototherapyThreshold(gaWeek, ageHours, risk);
  const exchange = exchangeTransfusionThreshold(gaWeek, ageHours, risk);
  if (tsb >= exchange) return 'transfusi';
  if (tsb >= photo) return 'fototerapi';
  if (tsb >= photo - 2) return 'mendekati';
  return 'normal';
}
