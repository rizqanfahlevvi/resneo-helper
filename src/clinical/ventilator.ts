// ============================================================
// Setting Ventilator Mekanik Neonatus — panduan awal berbasis
// evidence untuk ventilasi konvensional (CMV/SIMV).
//
// ⚠️ Ini adalah TITIK AWAL yang harus disesuaikan dengan analisa
// gas darah, radiologi toraks, compliance paru individual, dan
// kebijakan unit — bukan pengganti judgment klinis dokter yang
// merawat pasien secara langsung.
//
// Referensi utama:
// - Sweet DG et al. European Consensus Guidelines on the
//   Management of RDS: 2022 Update. Neonatology. 2023;120(1):3–23.
// - Neonatal Resuscitation Program (NRP) 8th Edition. AAP/AHA. 2021.
// - STABLE Program 6th Edition — Post-Resuscitation/Pre-Transport
//   Stabilization.
// - Keszler M. State of the Art in Conventional Mechanical
//   Ventilation. J Perinatol. 2009;29:262–275.
// - SUPPORT Study Group. Target Ranges of Oxygen Saturation in
//   Extremely Preterm Infants. N Engl J Med. 2010;362:1959–1969.
// - IDAI. Panduan Pelayanan Medis Neonatologi (referensi lokal
//   Indonesia).
// ============================================================

export type VentilatorScenario = 'normal' | 'rds' | 'mas' | 'apnea' | 'pphn';

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

export function getVentilatorSettings(scenario: VentilatorScenario): VentilatorSettingRange {
  return SETTINGS[scenario];
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

export const WEANING_CRITERIA: string[] = [
  'FiO₂ < 30–40%',
  'PIP < 14–16 cmH2O',
  'MAP < 6–8 cmH2O',
  'RR ventilator < 20 x/menit (mode SIMV) dengan usaha napas spontan adekuat',
  'Analisa gas darah stabil dalam target',
  'Tidak ada apnea signifikan & hemodinamik stabil',
  'Pertimbangkan kafein sitrat sebelum ekstubasi pada bayi prematur',
];
