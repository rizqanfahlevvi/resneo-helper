// ============================================================
// Setting Ventilator Mekanik Neonatus — panduan awal berbasis
// evidence untuk ventilasi konvensional (CMV/SIMV), distratifikasi
// per skenario klinis DAN kategori usia gestasi (GA tier) karena
// toleransi tekanan, target gas darah, dan strategi ventilasi
// berbeda signifikan antara bayi ekstrem prematur dan aterm.
//
// ⚠️ Ini adalah TITIK AWAL yang harus disesuaikan dengan analisa
// gas darah, radiologi toraks, compliance paru individual, dan
// kebijakan unit — bukan pengganti judgment klinis dokter yang
// merawat pasien secara langsung.
//
// Referensi utama:
// - Sweet DG et al. European Consensus Guidelines on the
//   Management of RDS: 2022 Update. Neonatology. 2023;120(1):3–23.
//   (secara eksplisit menstratifikasi tata laksana RDS per GA)
// - Neonatal Resuscitation Program (NRP) 8th Edition. AAP/AHA. 2021.
// - STABLE Program 6th Edition — Post-Resuscitation/Pre-Transport
//   Stabilization.
// - Keszler M. State of the Art in Conventional Mechanical
//   Ventilation. J Perinatol. 2009;29:262–275.
// - SUPPORT Study Group; BOOST-II; STOP-ROP. Target oksigenasi &
//   risiko ROP pada bayi ekstrem prematur. N Engl J Med. 2010;
//   362:1959–1969.
// - Sant'Anna GM & Keszler M. Weaning Preterm Infants from
//   Mechanical Ventilation. NeoReviews.
// - IDAI. Panduan Pelayanan Medis Neonatologi (referensi lokal
//   Indonesia).
// ============================================================

export type VentilatorScenario = 'normal' | 'rds' | 'mas' | 'apnea' | 'pphn';

export type GaTier = 'extremely_preterm' | 'very_preterm' | 'late_preterm' | 'term';

export function getGaTier(gaWeek: number): GaTier {
  if (gaWeek > 0 && gaWeek < 28) return 'extremely_preterm';
  if (gaWeek < 32) return 'very_preterm';
  if (gaWeek < 37) return 'late_preterm';
  return 'term';
}

export const GA_TIER_LABELS: Record<GaTier, string> = {
  extremely_preterm: 'Ekstrem Prematur (<28 minggu)',
  very_preterm: 'Sangat Prematur (28–31 minggu)',
  late_preterm: 'Prematur Lanjut (32–36 minggu)',
  term: 'Aterm (≥37 minggu)',
};

export interface VentilatorSettingRange {
  pip: [number, number];        // cmH2O
  peep: [number, number];       // cmH2O
  rr: [number, number];         // x/menit
  ti: [number, number];         // detik
  flow: [number, number];       // L/menit
  fio2Note: string;
  targetVt?: [number, number];  // mL/kg — bila mode volume-targeted tersedia
  notes: string[];
}

export const VENTILATOR_SCENARIOS: Record<VentilatorScenario, { label: string; description: string }> = {
  normal: { label: 'Paru Normal / Stabilisasi Pasca-Resusitasi', description: 'Tidak ada penyakit paru signifikan, ventilasi suportif sementara' },
  rds: { label: 'RDS (Defisiensi Surfaktan)', description: 'Distres napas prematur akibat defisiensi surfaktan' },
  mas: { label: 'MAS (Aspirasi Mekonium)', description: 'Obstruksi jalan napas parsial, risiko air-trapping & air-leak' },
  apnea: { label: 'Apnea Primer', description: 'Ventilasi minimal untuk dukungan apnea tanpa penyakit paru berat' },
  pphn: { label: 'PPHN (Hipertensi Pulmonal Persisten)', description: 'Optimalisasi volume paru, hindari hiperventilasi agresif' },
};

const SETTINGS: Record<VentilatorScenario, VentilatorSettingRange> = {
  normal: {
    pip: [14, 18],
    peep: [5, 5],
    rr: [40, 60],
    ti: [0.30, 0.35],
    flow: [6, 8],
    fio2Note: 'Titrasi ke target SpO₂ preduktal sesuai usia (lihat tabel target)',
    targetVt: [4, 6],
    notes: [
      'Mulai dari PIP rendah, naikkan bertahap hingga chest rise adekuat terlihat.',
      'Gunakan mode volume-targeted (VTV/PRVC) bila tersedia — target VT 4–6 mL/kg.',
    ],
  },
  rds: {
    pip: [16, 24],
    peep: [5, 6],
    rr: [40, 60],
    ti: [0.30, 0.40],
    flow: [6, 10],
    fio2Note: 'Titrasi ke SpO₂ 90–95% (preterm) — hindari hiperoksia',
    targetVt: [4, 6],
    notes: [
      'PEEP dapat dinaikkan hingga 6–8 cmH2O pada RDS berat untuk mempertahankan volume paru akhir-ekspirasi.',
      'Pertimbangkan surfaktan dini + strategi INSURE/LISA sesuai kondisi klinis.',
      'Target permissive hypercapnia pada BBLSR (PaCO₂ 45–55 mmHg, pH >7,22) untuk mengurangi volutrauma.',
    ],
  },
  mas: {
    pip: [20, 25],
    peep: [4, 5],
    rr: [30, 40],
    ti: [0.30, 0.50],
    flow: [8, 10],
    fio2Note: 'Sesuai kebutuhan — waspada PPHN sekunder pada MAS berat',
    notes: [
      'Gunakan rate lebih rendah & perpanjang waktu ekspirasi untuk mencegah air-trapping akibat obstruksi parsial jalan napas.',
      'Hindari PEEP terlalu tinggi — risiko air-trapping dan pneumotoraks meningkat.',
      'Risiko pneumotoraks tinggi — siapkan monitoring & alat dekompresi. Pertimbangkan HFOV bila refrakter.',
      'MAS praktis hanya terjadi pada bayi aterm/post-term — stratifikasi GA prematur tidak relevan untuk skenario ini.',
    ],
  },
  apnea: {
    pip: [12, 16],
    peep: [4, 5],
    rr: [20, 30],
    ti: [0.30, 0.35],
    flow: [6, 8],
    fio2Note: 'Mulai 21% (udara ruangan) kecuali ada hipoksia',
    notes: [
      'PIP minimal — cukup untuk chest rise ringan, bukan untuk mengatasi penyakit paru.',
      'RR di atas adalah backup rate pada mode SIMV; evaluasi penyebab apnea (sepsis, elektrolit, kafein sitrat).',
      'Ventilasi umumnya bersifat sementara hingga penyebab primer teratasi.',
    ],
  },
  pphn: {
    pip: [16, 22],
    peep: [5, 6],
    rr: [40, 60],
    ti: [0.30, 0.40],
    flow: [8, 10],
    fio2Note: 'Sering butuh FiO₂ tinggi awal — target SpO₂ preduktal 90–95%, evaluasi gradien pre/post-duktal',
    notes: [
      'Hindari strategi hiperventilasi agresif (hipokarbia) — sudah ditinggalkan karena risiko cedera SSP.',
      'Optimalkan volume paru (hindari under- maupun over-inflation) untuk menurunkan resistensi vaskular paru.',
      'Target pH normal hingga sedikit alkali (7,35–7,45); pertimbangkan iNO bila oxygenation index tinggi.',
      'Konfirmasi diagnosis dengan ekokardiografi bila memungkinkan.',
    ],
  },
};

/**
 * Penyesuaian per tier GA — hanya diterapkan bermakna pada skenario yang
 * insidennya lintas-GA (normal, RDS, PPHN). MAS/Apnea tidak disesuaikan
 * karena secara epidemiologis dominan pada kelompok GA tertentu saja.
 */
function applyGaAdjustment(base: VentilatorSettingRange, scenario: VentilatorScenario, tier: GaTier): VentilatorSettingRange {
  const adjusted: VentilatorSettingRange = { ...base, notes: [...base.notes] };

  if (scenario !== 'normal' && scenario !== 'rds' && scenario !== 'pphn') {
    return adjusted;
  }

  if (tier === 'extremely_preterm') {
    adjusted.pip = [base.pip[0], Math.max(base.pip[0] + 2, base.pip[1] - 2)];
    if (base.targetVt) adjusted.targetVt = [4, 5];
    adjusted.notes.unshift(
      'Ekstrem prematur (<28 mgg): utamakan dukungan napas non-invasif (nCPAP/NIPPV) bila memungkinkan — ventilasi invasif menaikkan risiko BPD.',
      'Strategi "gentle ventilation": PIP seminimal mungkin untuk chest rise adekuat, VT target lebih rendah (4–5 mL/kg) untuk mengurangi volutrauma.',
      'Permissive hypercapnia lebih longgar dapat diterima (PaCO₂ hingga 55–60 mmHg, pH >7,20) — prioritaskan menghindari volutrauma dibanding normokapnia ketat.',
      'Target SpO₂ atas DIPERKETAT ke ≤94% — hindari hiperoksia (risiko retinopati prematuritas/ROP, evidence STOP-ROP & BOOST-II).',
      'Pertimbangkan kafein sitrat dini (dalam 24 jam) untuk turunkan risiko kegagalan ekstubasi & apnea prematuritas.',
    );
  } else if (tier === 'very_preterm') {
    adjusted.notes.unshift(
      'Sangat prematur (28–31 mgg): pertimbangkan nCPAP/NIPPV sebagai lini pertama sebelum intubasi bila distres napas tidak berat.',
      'Target SpO₂ atas tetap ≤95% — hindari hiperoksia berkepanjangan (risiko ROP menurun tapi belum hilang pada kelompok ini).',
    );
  } else if (tier === 'late_preterm') {
    adjusted.notes.unshift('Prematur lanjut (32–36 mgg): risiko RDS/TTN masih ada namun umumnya lebih ringan; evaluasi respons terhadap CPAP dini sebelum eskalasi ke ventilasi invasif.');
  } else {
    if (scenario === 'rds') {
      adjusted.notes.unshift('RDS pada bayi aterm jarang — pertimbangkan penyebab sekunder (aspirasi, pneumonia, TTN berat) dan permissive hypercapnia TIDAK perlu seagresif pada prematur (target pH mendekati normal, 7,30–7,40).');
    }
  }

  return adjusted;
}

export function getVentilatorSettings(scenario: VentilatorScenario, gaWeek?: number): VentilatorSettingRange {
  const base = SETTINGS[scenario];
  if (!gaWeek || gaWeek <= 0) return base;
  const tier = getGaTier(gaWeek);
  return applyGaAdjustment(base, scenario, tier);
}

export interface BloodGasTarget {
  ph: [number, number];
  paco2: [number, number];
  pao2: [number, number];
  spo2: [number, number];
  hco3: [number, number];
  be: [number, number];
}

/** Target analisa gas darah umum pada ventilasi neonatus (permissive hypercapnia strategy). */
export const BLOOD_GAS_TARGET: BloodGasTarget = {
  ph: [7.25, 7.40],
  paco2: [45, 55],
  pao2: [50, 80],
  spo2: [90, 95],
  hco3: [20, 26],
  be: [-4, 4],
};

/**
 * Target gas darah disesuaikan GA — ekstrem prematur mendapat rentang
 * pH bawah & PaCO2 atas lebih longgar (permissive hypercapnia lebih
 * agresif untuk kurangi volutrauma), serta batas atas SpO2 lebih rendah
 * untuk mengurangi risiko ROP (STOP-ROP, BOOST-II, SUPPORT Trial).
 */
export function getBloodGasTarget(gaWeek?: number): BloodGasTarget {
  if (!gaWeek || gaWeek <= 0) return BLOOD_GAS_TARGET;
  const tier = getGaTier(gaWeek);
  if (tier === 'extremely_preterm') {
    return { ...BLOOD_GAS_TARGET, ph: [7.20, 7.40], paco2: [45, 60], spo2: [90, 94] };
  }
  if (tier === 'very_preterm') {
    return { ...BLOOD_GAS_TARGET, spo2: [90, 95] };
  }
  return BLOOD_GAS_TARGET;
}

export const WEANING_CRITERIA: string[] = [
  'FiO₂ < 30–40%',
  'PIP < 14–16 cmH2O',
  'MAP < 6–8 cmH2O',
  'RR ventilator < 20 x/menit (mode SIMV) dengan usaha napas spontan adekuat',
  'Analisa gas darah stabil dalam target',
  'Tidak ada apnea signifikan & hemodinamik stabil',
  'Pertimbangkan kafein sitrat sebelum ekstubasi pada bayi prematur (idealnya sudah dimulai sejak dini)',
];
