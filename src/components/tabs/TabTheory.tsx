import { useState } from 'react';
import {
  BookText, HeartPulse, Target, Activity, Wind, Stethoscope, Gauge, Snowflake,
  HandHeart, Waves, Scissors, Droplets, Coffee, Syringe, Layers, ChevronsDownUp, ChevronsUpDown,
} from 'lucide-react';
import TheorySection, { Cite, TheoryReference } from '../TheorySection';

interface SectionMeta {
  id: string;
  category: string;
}

// Urutan & kategori bagian — dipakai untuk "Buka/Tutup Semua" dan grup visual.
const SECTIONS: SectionMeta[] = [
  { id: 'golden', category: 'Fisiologi & Prinsip Dasar' },
  { id: 'transisi', category: 'Fisiologi & Prinsip Dasar' },
  { id: 'dcc', category: 'Fisiologi & Prinsip Dasar' },
  { id: 'oksigen', category: 'Jalan Napas & Ventilasi' },
  { id: 'mekonium', category: 'Jalan Napas & Ventilasi' },
  { id: 'intubasi', category: 'Jalan Napas & Ventilasi' },
  { id: 'mrsopa', category: 'Jalan Napas & Ventilasi' },
  { id: 'kompresi', category: 'Sirkulasi, Obat & Kompresi' },
  { id: 'farmako', category: 'Sirkulasi, Obat & Kompresi' },
  { id: 'prematur', category: 'Neonatus Prematur' },
  { id: 'surfaktan', category: 'Neonatus Prematur' },
  { id: 'kafein', category: 'Neonatus Prematur' },
  { id: 'stable', category: 'Pasca-Resusitasi & Stabilisasi' },
  { id: 'hipotermia', category: 'Pasca-Resusitasi & Stabilisasi' },
  { id: 'hipoglikemia', category: 'Pasca-Resusitasi & Stabilisasi' },
  { id: 'neuroproteksi', category: 'Pasca-Resusitasi & Stabilisasi' },
];

const CATEGORY_ORDER = [
  'Fisiologi & Prinsip Dasar',
  'Jalan Napas & Ventilasi',
  'Sirkulasi, Obat & Kompresi',
  'Neonatus Prematur',
  'Pasca-Resusitasi & Stabilisasi',
];

// ── Referensi per bagian (nomor di-reset tiap bagian) ──
const REFS: Record<string, TheoryReference[]> = {
  golden: [
    { n: 1, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation (NRP), 8th Edition. American Academy of Pediatrics; 2021.' },
    { n: 2, text: 'Aziz K, et al. Part 5: Neonatal Resuscitation — 2020 AHA Guidelines for CPR & ECC. Circulation. 2020;142(16 suppl 2):S524–S550.', link: 'https://doi.org/10.1161/CIR.0000000000000902' },
    { n: 3, text: 'Buku Panduan Resusitasi Neonatus, Edisi ke-8. Ikatan Dokter Anak Indonesia (IDAI); 2022.' },
  ],
  transisi: [
    { n: 1, text: 'Hooper SB, et al. Cardiovascular transition at birth: a physiological sequence. Front Pediatr. 2015;3:38.', link: 'https://doi.org/10.3389/fped.2015.00038' },
    { n: 2, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation, 8th Ed. AAP; 2021.' },
  ],
  dcc: [
    { n: 1, text: 'Fogarty M, et al. Delayed vs early umbilical cord clamping for preterm infants: systematic review & meta-analysis. Am J Obstet Gynecol. 2018;218(1):1–18.', link: 'https://doi.org/10.1016/j.ajog.2017.10.231' },
    { n: 2, text: 'Rabe H, et al. Effect of timing of umbilical cord clamping and other strategies on preterm infants. Cochrane Database Syst Rev. 2019;9:CD003248.' },
    { n: 3, text: 'WHO Guideline: Delayed umbilical cord clamping for improved maternal and infant health. WHO; 2014.' },
    { n: 4, text: 'Wyckoff MH, et al. Neonatal Life Support: 2020 ILCOR Consensus (CoSTR). Circulation. 2020;142(16 suppl 1):S185–S221.' },
  ],
  oksigen: [
    { n: 1, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation, 8th Ed. AAP; 2021 (target SpO₂ pre-duktal).' },
    { n: 2, text: 'SUPPORT Study Group of the NICHD NRN. Target ranges of oxygen saturation in extremely preterm infants. N Engl J Med. 2010;362:1959–1969.', link: 'https://doi.org/10.1056/NEJMoa0911781' },
    { n: 3, text: 'Saugstad OD, et al. Systematic review of optimal FiO₂ for preterm resuscitation. Neonatology. 2019.' },
  ],
  mekonium: [
    { n: 1, text: 'Aziz K, et al. Part 5: Neonatal Resuscitation — 2020 AHA/AAP. Pediatrics. 2021;147(suppl 1):e2020038505E.' },
    { n: 2, text: 'Chettri S, et al. Endotracheal suction for non-vigorous neonates born through MSAF: RCT. J Pediatr. 2015;166(5):1208–1213.' },
    { n: 3, text: 'Weiner GM, ed. NRP 8th Ed. AAP; 2021.' },
  ],
  intubasi: [
    { n: 1, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation, 8th Ed. AAP; 2021.' },
    { n: 2, text: 'Kempley ST, et al. Endotracheal tube length for neonatal intubation: weight-based nomogram. Resuscitation. 2008;77(3):369–373.' },
  ],
  mrsopa: [
    { n: 1, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation, 8th Ed. AAP; 2021 (langkah koreksi ventilasi MR. SOPA).' },
  ],
  kompresi: [
    { n: 1, text: 'Weiner GM, ed. NRP 8th Ed. AAP; 2021 (rasio 3:1, 90 kompresi + 30 ventilasi/menit).' },
    { n: 2, text: 'Wyckoff MH, et al. 2020 ILCOR Neonatal CoSTR. Circulation. 2020;142(16 suppl 1):S185–S221.' },
    { n: 3, text: 'Christman C, et al. Two-thumb vs two-finger chest compression in a neonatal model. Arch Dis Child Fetal Neonatal Ed. 2011;96(2):F99–F101.' },
  ],
  farmako: [
    { n: 1, text: 'Weiner GM, ed. NRP 8th Ed. AAP; 2021 (epinefrin 0,01–0,03 mg/kg IV/IO; 1:10.000).' },
    { n: 2, text: 'Aziz K, et al. 2020 AHA Neonatal Resuscitation Guidelines. Circulation. 2020;142:S524–S550.' },
  ],
  prematur: [
    { n: 1, text: 'Sweet DG, et al. European Consensus Guidelines on the Management of RDS: 2022 Update. Neonatology. 2023;120(1):3–23.', link: 'https://doi.org/10.1159/000528914' },
    { n: 2, text: 'McCall EM, et al. Interventions to prevent hypothermia at birth in preterm/LBW infants. Cochrane Database Syst Rev. 2018;2:CD004210.' },
    { n: 3, text: 'Weiner GM, ed. NRP 8th Ed. AAP; 2021.' },
  ],
  surfaktan: [
    { n: 1, text: 'Sweet DG, et al. European Consensus Guidelines on the Management of RDS: 2022 Update. Neonatology. 2023;120(1):3–23.', link: 'https://doi.org/10.1159/000528914' },
    { n: 2, text: 'Dargaville PA, et al. Effect of Minimally-Invasive Surfactant Therapy (OPTIMIST-A) on death/BPD in preterm infants 25–28 wk: RCT. JAMA. 2021;326(24):2478–2487.', link: 'https://doi.org/10.1001/jama.2021.21892' },
    { n: 3, text: 'Aldana-Aguirre JC, et al. LISA vs INSURE: systematic review & meta-analysis. Arch Dis Child Fetal Neonatal Ed. 2017;102(1):F17–F23.' },
  ],
  kafein: [
    { n: 1, text: 'Schmidt B, et al. Caffeine therapy for apnea of prematurity (CAP trial). N Engl J Med. 2006;354(20):2112–2121.', link: 'https://doi.org/10.1056/NEJMoa054065' },
    { n: 2, text: 'Schmidt B, et al. Long-term effects of caffeine on death or disability at 18 mo. N Engl J Med. 2007;357(19):1893–1902.' },
    { n: 3, text: 'Dobson NR, Patel RM. The role of caffeine in the development of BPD. Clin Perinatol. 2016;43(4):773–782.' },
  ],
  stable: [
    { n: 1, text: 'Karlsen K. The S.T.A.B.L.E. Program: Post-Resuscitation/Pre-Transport Stabilization Care, 6th Edition. 2013.' },
  ],
  hipotermia: [
    { n: 1, text: 'Shankaran S, et al. Whole-body hypothermia for neonates with HIE (NICHD NRN). N Engl J Med. 2005;353(15):1574–1584.', link: 'https://doi.org/10.1056/NEJMcps050929' },
    { n: 2, text: 'Azzopardi D, et al. Moderate hypothermia to treat perinatal asphyxial encephalopathy (TOBY). N Engl J Med. 2009;361(14):1349–1358.' },
    { n: 3, text: 'Jacobs SE, et al. Cooling for newborns with HIE. Cochrane Database Syst Rev. 2013;1:CD003311.' },
    { n: 4, text: 'NICE Interventional Procedures Guidance IPG347: Therapeutic hypothermia with intracorporeal temperature monitoring for HIE.' },
  ],
  hipoglikemia: [
    { n: 1, text: 'Thornton PS, et al. Pediatric Endocrine Society recommendations for evaluation & management of persistent hypoglycemia in neonates, infants, and children. J Pediatr. 2015;167(2):238–245.' },
    { n: 2, text: 'Adamkin DH; AAP Committee on Fetus and Newborn. Postnatal glucose homeostasis in late-preterm and term infants. Pediatrics. 2011;127(3):575–579.' },
    { n: 3, text: 'Harris DL, et al. Dextrose gel for neonatal hypoglycaemia (Sugar Babies): randomised trial. Lancet. 2013;382(9910):2077–2083.', link: 'https://doi.org/10.1016/S0140-6736(13)61645-1' },
  ],
  neuroproteksi: [
    { n: 1, text: 'Roberts D, et al. Antenatal corticosteroids for accelerating fetal lung maturation. Cochrane Database Syst Rev. 2017;3:CD004454.' },
    { n: 2, text: 'Rouse DJ, et al. Magnesium sulfate for prevention of cerebral palsy (BEAM trial). N Engl J Med. 2008;359(9):895–905.', link: 'https://doi.org/10.1056/NEJMoa0801187' },
    { n: 3, text: 'Doyle LW, et al. Magnesium sulphate for women at risk of preterm birth for neuroprotection. Cochrane Database Syst Rev. 2009;1:CD004661.' },
  ],
};

export default function TabTheory() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['golden']));

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const openAll = () => setOpenIds(new Set(SECTIONS.map((s) => s.id)));
  const closeAll = () => setOpenIds(new Set());

  const isOpen = (id: string) => openIds.has(id);
  const sectionProps = (id: string, extra: { icon: React.ComponentType<{ className?: string }>; accent: string; title: string; badge?: string }) => ({
    id,
    open: isOpen(id),
    onToggle: () => toggle(id),
    refs: REFS[id],
    ...extra,
  });

  return (
    <div className="w-full h-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-36">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <BookText className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">Materi &amp; Teori Medis</h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Fisiologi transisi & fundamental resusitasi neonatus — berbasis bukti (NRP 8th 2021, ILCOR, IDAI, RDS Guidelines) dengan sitasi inline.
          </p>
        </div>
      </div>

      {/* Kontrol Buka/Tutup Semua */}
      <div className="flex items-center justify-between gap-3 mb-6 sticky top-2 z-10">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">{SECTIONS.length} topik · {openIds.size} terbuka</span>
        <div className="flex gap-2">
          <button
            onClick={openAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-colors"
          >
            <ChevronsUpDown className="w-3.5 h-3.5" /> Buka Semua
          </button>
          <button
            onClick={closeAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-colors"
          >
            <ChevronsDownUp className="w-3.5 h-3.5" /> Tutup Semua
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {CATEGORY_ORDER.map((cat) => (
          <section key={cat} className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1">{cat}</h3>

            {cat === 'Fisiologi & Prinsip Dasar' && (
              <>
                <TheorySection {...sectionProps('golden', { icon: Target, accent: 'orange', title: 'The Golden Minute (Menit Emas)', badge: 'NRP 8th Ed. 2021 · IDAI 2022' })}>
                  <p>
                    Konsep <strong className="text-slate-800 dark:text-slate-200">The Golden Minute</strong> menegaskan bahwa neonatus harus mulai bernapas sendiri atau diberikan ventilasi bantuan dalam <strong className="text-orange-600 dark:text-orange-400">60 detik pertama kehidupan</strong>.<Cite n={1} /> Keterlambatan dapat menyebabkan asfiksia berkepanjangan, ensefalopati hipoksik-iskemik (HIE), dan kematian.<Cite n={2} />
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <ul className="list-disc list-inside space-y-2 m-0 text-sm">
                      <li><strong>Penilaian Awal (0–30 detik):</strong> tonus otot, usaha napas/menangis, usia gestasi. Lakukan langkah awal (hangatkan, posisikan, isap bila perlu, keringkan, stimulasi).<Cite n={1} /></li>
                      <li><strong>Intervensi Cepat (30–60 detik):</strong> kaji LDJ. Bila apnu/megap-megap atau LDJ &lt;100 x/menit, segera inisiasi Ventilasi Tekanan Positif (VTP).<Cite n={[1, 3]} /></li>
                    </ul>
                  </div>
                </TheorySection>

                <TheorySection {...sectionProps('transisi', { icon: HeartPulse, accent: 'rose', title: 'Fisiologi Transisi Kardiopulmonal', badge: 'Hooper SB, Front Pediatr 2015' })}>
                  <p>
                    Saat lahir, paru yang penuh cairan harus segera digantikan udara. Pemotongan tali pusat menghentikan aliran darah plasenta, memicu <strong>hiperkarbia sementara</strong> yang menstimulasi kemoreseptor untuk napas pertama.<Cite n={1} />
                  </p>
                  <p>
                    Napas pertama yang dalam mendorong cairan keluar alveoli dan memicu <strong>vasodilatasi kapiler paru</strong>. Tekanan atrium kiri meningkat melampaui atrium kanan, menutup fungsional Foramen Ovale dan Ductus Arteriosus.<Cite n={1} />
                  </p>
                  <p className="border-l-4 border-rose-300 dark:border-rose-700 pl-4 py-1 text-sm font-medium italic bg-rose-50/50 dark:bg-rose-950/10 rounded-r-lg">
                    Bila bayi apnu, hipoksia menyebabkan vasokonstriksi paru persisten (PPHN), menghambat aliran darah paru dan menurunkan LDJ. Ventilasi buatan (VTP) adalah terapi utama, bukan obat.<Cite n={2} />
                  </p>
                </TheorySection>

                <TheorySection {...sectionProps('dcc', { icon: Scissors, accent: 'teal', title: 'Delayed Cord Clamping (DCC)', badge: 'ILCOR 2020 · WHO 2014 · Cochrane' })}>
                  <p>
                    Penundaan pemotongan tali pusat <strong className="text-teal-600 dark:text-teal-400">≥30–60 detik</strong> pada bayi bugar meningkatkan transfusi plasenta, cadangan besi, dan Hb. Pada prematur, DCC menurunkan mortalitas rumah sakit dan kebutuhan transfusi.<Cite n={1} />
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <ul className="space-y-1.5 text-sm list-disc list-inside m-0">
                      <li><strong>Aterm bugar:</strong> DCC 30–60 detik.<Cite n={3} /></li>
                      <li><strong>Prematur bugar:</strong> DCC ≥30 detik — menurunkan mortalitas.<Cite n={1} /></li>
                      <li><strong>Tidak bugar / perlu resusitasi:</strong> jangan tunda resusitasi; <em>cord milking</em> tidak dianjurkan rutin pada &lt;28 minggu (risiko IVH).<Cite n={4} /></li>
                    </ul>
                  </div>
                  <p className="text-sm">Selama DCC, jaga bayi tetap hangat dan setinggi/di bawah level plasenta. Meta-analisis menunjukkan penurunan mortalitas relatif pada prematur yang menjalani DCC dibanding klem dini.<Cite n={[1, 2]} /></p>
                </TheorySection>
              </>
            )}

            {cat === 'Jalan Napas & Ventilasi' && (
              <>
                <TheorySection {...sectionProps('oksigen', { icon: Gauge, accent: 'sky', title: 'Manajemen Oksigen Periresusitasi', badge: 'NRP 8th 2021 · SUPPORT Trial 2010' })}>
                  <p>
                    Pemberian oksigen harus <strong className="text-slate-800 dark:text-slate-200">berbasis target SpO₂ pre-duktal</strong>, bukan intuisi. Oksigen 100% rutin tidak direkomendasikan karena risiko stres oksidatif, ROP, dan cedera otak.<Cite n={1} />
                  </p>
                  <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/30 rounded-xl p-4">
                    <h4 className="font-extrabold text-sky-800 dark:text-sky-300 text-xs uppercase tracking-widest mb-3">Target SpO₂ Pre-Duktal (Tangan Kanan) — NRP 2021</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {[['1 mnt', '60–65%'], ['2 mnt', '65–70%'], ['3 mnt', '70–75%'], ['4 mnt', '75–80%'], ['5 mnt', '80–85%'], ['10 mnt', '85–95%']].map(([t, v]) => (
                        <div key={t} className="bg-white dark:bg-sky-900/30 rounded-lg p-2 text-center border border-sky-100 dark:border-sky-800/30">
                          <span className="block text-[9px] font-bold text-sky-500 uppercase">{t}</span>
                          <span className="block text-xs font-extrabold text-sky-700 dark:text-sky-300 mt-0.5">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 border border-slate-100 dark:border-slate-800 text-sm">
                      <strong className="text-slate-800 dark:text-slate-200">Bayi ≥35 minggu:</strong>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-0">Mulai <strong>21% O₂</strong>; naikkan FiO₂ bila SpO₂ tak mencapai target.<Cite n={1} /></p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 border border-slate-100 dark:border-slate-800 text-sm">
                      <strong className="text-slate-800 dark:text-slate-200">Bayi &lt;35 minggu:</strong>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-0">Mulai <strong>21–30% O₂</strong> dengan blender; hindari hiperoksia (ROP).<Cite n={[2, 3]} /></p>
                    </div>
                  </div>
                  <p className="border-l-4 border-sky-300 dark:border-sky-700 pl-4 py-1 text-sm font-medium italic bg-sky-50/50 dark:bg-sky-950/10 rounded-r-lg">
                    Pasang oksimeter di <strong>tangan/pergelangan kanan</strong> (pre-duktal). Probe di kaki (post-duktal) bisa memberi nilai rendah palsu saat ada pirau kanan-ke-kiri.<Cite n={1} />
                  </p>
                </TheorySection>

                <TheorySection {...sectionProps('mekonium', { icon: Wind, accent: 'amber', title: 'Mekonium dalam Air Ketuban (MSAF)', badge: 'NRP 2021 · Chettri, J Pediatr 2015' })}>
                  <p>
                    <strong>Meconium Stained Amniotic Fluid (MSAF)</strong> terjadi pada ~10–15% persalinan. NRP 2021 menegaskan: <strong className="text-amber-700 dark:text-amber-400">suction trakea rutin tidak lagi direkomendasikan</strong> untuk semua bayi MSAF.<Cite n={1} />
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-4 border border-emerald-200/60 dark:border-emerald-800/30">
                      <h4 className="font-extrabold text-emerald-800 dark:text-emerald-300 text-xs uppercase mb-2">✓ Bayi BUGAR (VIGOROUS)</h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-snug mb-0">Menangis kuat, tonus baik, LDJ &gt;100. <strong>Perawatan rutin</strong> — tanpa laringoskopi/suction trakea.<Cite n={1} /></p>
                    </div>
                    <div className="bg-rose-50 dark:bg-rose-950/20 rounded-xl p-4 border border-rose-200/60 dark:border-rose-800/30">
                      <h4 className="font-extrabold text-rose-800 dark:text-rose-300 text-xs uppercase mb-2">⚠ Bayi TIDAK BUGAR</h4>
                      <p className="text-xs text-rose-700 dark:text-rose-400 leading-snug mb-0">Tonus lemah/apnu, LDJ &lt;100. Prioritaskan <strong>VTP</strong>; laringoskopi + suction hanya bila ada obstruksi jalan napas jelas.<Cite n={[1, 2]} /></p>
                    </div>
                  </div>
                  <p className="text-sm mb-0">Indikasi intervensi adalah <strong>obstruksi jalan napas</strong>, bukan sekadar keberadaan mekonium. RCT tidak menunjukkan manfaat suction trakea rutin pada bayi tidak bugar.<Cite n={2} /></p>
                </TheorySection>

                <TheorySection {...sectionProps('intubasi', { icon: Stethoscope, accent: 'violet', title: 'Intubasi Endotrakeal & LMA', badge: 'NRP 8th 2021 · Kempley, Resuscitation 2008' })}>
                  <div className="bg-violet-50/80 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-800/30 rounded-xl p-4 text-sm">
                    <strong className="text-violet-800 dark:text-violet-300 text-xs uppercase tracking-wider block mb-2">Indikasi Intubasi ET<Cite n={1} /></strong>
                    <ul className="list-disc list-inside space-y-1 text-xs text-violet-700 dark:text-violet-400 m-0">
                      <li>VTP tidak efektif walau sudah MR. SOPA</li>
                      <li>MSAF bayi tidak bugar dengan obstruksi</li>
                      <li>Kompresi dada diperlukan (sinkronisasi 3:1)</li>
                      <li>Pemberian surfaktan intratrakeal</li>
                      <li>Hernia diafragmatika kongenital</li>
                    </ul>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800">
                          <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Berat Lahir</th>
                          <th className="text-center p-2 font-extrabold text-slate-700 dark:text-slate-300">ETT (mm ID)</th>
                          <th className="text-center p-2 font-extrabold text-slate-700 dark:text-slate-300">Kedalaman Bibir</th>
                          <th className="text-center p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Blade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['< 1 kg', '2.5 mm', 'BB(kg) + 6 cm', 'Miller 00'],
                          ['1 – 2 kg', '3.0 mm', 'BB(kg) + 6 cm', 'Miller 0'],
                          ['2 – 3 kg', '3.5 mm', 'BB(kg) + 6 cm', 'Miller 0'],
                          ['> 3 kg', '3.5 – 4.0 mm', 'BB(kg) + 6 cm', 'Miller 1'],
                        ].map(([bb, ett, depth, blade], i) => (
                          <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                            <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{bb}</td>
                            <td className="p-2 text-center font-extrabold text-violet-600 dark:text-violet-400">{ett}</td>
                            <td className="p-2 text-center text-slate-600 dark:text-slate-400">{depth}</td>
                            <td className="p-2 text-center text-slate-500 dark:text-slate-500">{blade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs italic text-slate-500 dark:text-slate-400">Estimasi kedalaman "BB + 6 cm" divalidasi terhadap posisi ujung ETT radiografis.<Cite n={2} /></p>
                  <p className="text-sm mb-0"><strong>LMA</strong> ukuran 1 adalah alternatif pada bayi &gt;2 kg (≥34 mgg) bila intubasi gagal; kurang sesuai untuk prematur sangat kecil.<Cite n={1} /></p>
                </TheorySection>

                <TheorySection {...sectionProps('mrsopa', { icon: Activity, accent: 'indigo', title: 'Langkah Koreksi Ventilasi — MR. SOPA', badge: 'NRP 8th Ed. 2021' })}>
                  <p>Bila dada tidak mengembang selama VTP awal, lakukan koreksi berurutan MR. SOPA sebelum menyimpulkan VTP gagal.<Cite n={1} /></p>
                  <div className="flex flex-col gap-2">
                    {[
                      { l: 'M', word: 'Mask Adjustment', t: 'Perbaiki perlekatan sungkup agar tidak bocor.' },
                      { l: 'R', word: 'Reposition Airway', t: 'Posisi kepala menghidu (sniffing position).' },
                      { l: 'S', word: 'Suction', t: 'Isap mulut lalu hidung (M before N).' },
                      { l: 'O', word: 'Open Mouth', t: 'Buka sedikit mulut bayi saat ventilasi.' },
                      { l: 'P', word: 'Pressure Increase', t: 'Naikkan PIP bertahap hingga dada mengembang (maks ~40 cmH₂O).' },
                      { l: 'A', word: 'Airway Alternative', t: 'Pertimbangkan intubasi ETT atau LMA.' },
                    ].map((s, i) => (
                      <div key={i} className="flex gap-3 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-lg w-5 text-center shrink-0">{s.l}</span>
                        <div>
                          <h5 className="font-bold text-[11px] text-slate-800 dark:text-slate-200 m-0">{s.word}</h5>
                          <p className="text-[10px] text-slate-500 m-0">{s.t}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs italic text-slate-500 mb-0">Dua langkah pertama (M, R) paling sering memperbaiki ventilasi; setelah S-O-P selalu evaluasi ulang gerak dada &amp; LDJ.<Cite n={1} /></p>
                </TheorySection>
              </>
            )}

            {cat === 'Sirkulasi, Obat & Kompresi' && (
              <>
                <TheorySection {...sectionProps('kompresi', { icon: HandHeart, accent: 'rose', title: 'Kompresi Dada Neonatus (CPR)', badge: 'NRP 8th 2021 · ILCOR CoSTR 2020' })}>
                  <p>
                    Kompresi diindikasikan bila <strong className="text-rose-600 dark:text-rose-400">LDJ &lt;60 x/menit</strong> setelah 30 detik VTP adekuat (dada mengembang) dengan O₂ 100%. Pastikan ventilasi benar-benar efektif dulu.<Cite n={1} />
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-rose-50 dark:bg-rose-950/20 rounded-xl p-4 border border-rose-200/60 dark:border-rose-800/30">
                      <h4 className="font-extrabold text-rose-800 dark:text-rose-300 text-xs uppercase mb-2">Teknik Ibu Jari Melingkar ⭐</h4>
                      <p className="text-xs text-rose-700 dark:text-rose-400 leading-snug mb-0">Kedua ibu jari di <strong>⅓ bawah sternum</strong>, jari melingkari dada. Perfusi koroner lebih tinggi — teknik pilihan NRP.<Cite n={[1, 3]} /></p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950/30 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800/30">
                      <h4 className="font-extrabold text-slate-700 dark:text-slate-300 text-xs uppercase mb-2">Teknik 2 Jari (Alternatif)</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mb-0">Dipakai bila akses umbilikal dibutuhkan bersamaan; jari tengah &amp; telunjuk di ⅓ bawah sternum.<Cite n={1} /></p>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <ul className="space-y-2 text-sm list-none m-0 p-0">
                      <li><strong className="text-slate-800 dark:text-slate-200">Rasio:</strong> <span className="text-rose-600 dark:text-rose-400 font-extrabold">3 kompresi : 1 ventilasi</span> (berbeda dari 30:2 dewasa)<Cite n={1} /></li>
                      <li><strong className="text-slate-800 dark:text-slate-200">Kecepatan:</strong> 90 kompresi + 30 ventilasi = <strong>120 events/menit</strong></li>
                      <li><strong className="text-slate-800 dark:text-slate-200">Ritme:</strong> <em>"satu–dua–tiga–napas"</em> tiap ~2 detik</li>
                      <li><strong className="text-slate-800 dark:text-slate-200">Kedalaman:</strong> ⅓ diameter antero-posterior dada</li>
                      <li><strong className="text-slate-800 dark:text-slate-200">Evaluasi LDJ:</strong> tiap 45–60 detik; hentikan kompresi bila LDJ &gt;60.<Cite n={2} /></li>
                    </ul>
                  </div>
                </TheorySection>

                <TheorySection {...sectionProps('farmako', { icon: Syringe, accent: 'emerald', title: 'Dosis & Farmakologi Darurat', badge: 'NRP 8th Ed. 2021' })}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50/80 dark:bg-slate-900/40 rounded-2xl p-4 border border-slate-200/80 dark:border-white/5">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mb-2 border-b border-slate-200/70 dark:border-white/5 pb-2">Epinefrin (Adrenalin) 1:10.000</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug mb-0">
                        <strong>Indikasi:</strong> LDJ &lt;60 x/menit persisten walau VTP efektif + kompresi 3:1 dengan O₂ 100% selama 30–60 detik.<Cite n={1} /><br /><br />
                        <strong>Dosis:</strong> IV/IO <strong>0,01–0,03 mg/kg</strong> (0,1–0,3 mL/kg 1:10.000); rute ET 0,05–0,1 mg/kg bila IV belum ada. Ulangi tiap 3–5 menit.<Cite n={1} />
                      </p>
                    </div>
                    <div className="bg-slate-50/80 dark:bg-slate-900/40 rounded-2xl p-4 border border-slate-200/80 dark:border-white/5">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mb-2 border-b border-slate-200/70 dark:border-white/5 pb-2">Volume Expander (NaCl 0,9% / PRC)</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug mb-0">
                        <strong>Indikasi:</strong> kecurigaan syok hipovolemik (pucat menetap, nadi lemah, riwayat perdarahan/solusio).<Cite n={2} /><br /><br />
                        <strong>Dosis:</strong> <strong>10 mL/kg</strong> IV pelan 5–10 menit via UVC. Pada prematur, hindari bolus cepat (risiko IVH). PRC O-negatif bila perdarahan masif.<Cite n={1} />
                      </p>
                    </div>
                  </div>
                  <p className="border-l-4 border-emerald-300 dark:border-emerald-700 pl-4 py-1 text-sm font-medium italic bg-emerald-50/50 dark:bg-emerald-950/10 rounded-r-lg mb-0">
                    Ventilasi efektif tetap intervensi terpenting. Obat jarang diperlukan bila VTP &amp; kompresi dilakukan benar.<Cite n={2} />
                  </p>
                </TheorySection>
              </>
            )}

            {cat === 'Neonatus Prematur' && (
              <>
                <TheorySection {...sectionProps('prematur', { icon: Layers, accent: 'amber', title: 'Resusitasi Neonatus Prematur', badge: 'European RDS 2023 · NRP 2021' })}>
                  <p>
                    Bayi &lt;35 minggu memerlukan pertimbangan khusus: paru imatur (defisiensi surfaktan), kulit tipis (kehilangan panas), dan risiko IVH lebih tinggi.<Cite n={1} />
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <ul className="space-y-1.5 text-sm list-disc list-inside m-0">
                      <li><strong>Termoregulasi &lt;32 mgg:</strong> bungkus plastik polietilen tanpa dikeringkan + topi; target suhu 36,5–37,5°C.<Cite n={2} /></li>
                      <li><strong>Oksigen:</strong> mulai 21–30%, titrasi dengan oksimeter pre-duktal.<Cite n={3} /></li>
                      <li><strong>Dukungan napas:</strong> utamakan <strong>CPAP dini</strong> (PEEP 5–8) di ruang bersalin bila bernapas spontan — kurangi intubasi &amp; BPD.<Cite n={1} /></li>
                      <li><strong>PEEP:</strong> gunakan T-piece resuscitator untuk PIP/PEEP konsisten.<Cite n={1} /></li>
                    </ul>
                  </div>
                  <p className="text-sm mb-0">Strategi "gentle ventilation": VT rendah (4–6 mL/kg), hindari volutrauma &amp; hiperoksia. Lihat kalkulator ventilator untuk setting per tier GA.</p>
                </TheorySection>

                <TheorySection {...sectionProps('surfaktan', { icon: Droplets, accent: 'teal', title: 'Terapi Surfaktan & LISA / MIST', badge: 'OPTIMIST-A, JAMA 2021 · RDS 2023' })}>
                  <p>
                    Surfaktan eksogen menggantikan defisiensi surfaktan pada RDS, menurunkan tegangan permukaan alveoli &amp; mencegah kolaps. Guideline RDS Eropa 2023 merekomendasikan surfaktan <strong>terapi selektif dini</strong> pada RDS memburuk, bukan profilaksis rutin.<Cite n={1} />
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-teal-50 dark:bg-teal-950/20 rounded-xl p-4 border border-teal-200/60 dark:border-teal-800/30">
                      <h4 className="font-extrabold text-teal-800 dark:text-teal-300 text-xs uppercase mb-2">LISA / MIST</h4>
                      <p className="text-xs text-teal-700 dark:text-teal-400 leading-snug mb-0"><strong>Less/Minimally Invasive Surfactant Therapy</strong>: surfaktan via kateter tipis saat bayi tetap bernapas spontan dengan CPAP — tanpa intubasi/ventilasi mekanik. Menurunkan komposit kematian/BPD.<Cite n={2} /></p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950/30 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800/30">
                      <h4 className="font-extrabold text-slate-700 dark:text-slate-300 text-xs uppercase mb-2">Dosis & Ambang</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mb-0">Poractant alfa <strong>200 mg/kg</strong> dosis awal lebih unggul dari 100 mg/kg. Pertimbangkan bila FiO₂ &gt;0,30 (CPAP ≥6) pada RDS.<Cite n={1} /></p>
                    </div>
                  </div>
                  <p className="text-sm mb-0">Meta-analisis: LISA menurunkan kebutuhan ventilasi mekanik &amp; BPD dibanding INSURE/intubasi.<Cite n={3} /></p>
                </TheorySection>

                <TheorySection {...sectionProps('kafein', { icon: Coffee, accent: 'violet', title: 'Kafein Sitrat — Apnea Prematuritas', badge: 'CAP Trial, NEJM 2006/2007' })}>
                  <p>
                    Kafein sitrat adalah <strong>stimulan pernapasan</strong> pilihan untuk apnea prematuritas. Trial CAP menunjukkan kafein menurunkan BPD, durasi ventilasi, PDA, dan memperbaiki luaran neurodevelopmental jangka panjang.<Cite n={[1, 2]} />
                  </p>
                  <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-800/30 rounded-xl p-4 text-sm">
                    <ul className="space-y-1.5 list-disc list-inside text-violet-700 dark:text-violet-400 m-0">
                      <li><strong>Loading:</strong> kafein sitrat 20 mg/kg IV/PO</li>
                      <li><strong>Maintenance:</strong> 5–10 mg/kg/hari (mulai 24 jam setelah loading)</li>
                      <li><strong>Waktu:</strong> inisiasi dini (&lt;72 jam / dalam 24 jam pada &lt;29 mgg) dikaitkan luaran lebih baik.<Cite n={3} /></li>
                    </ul>
                  </div>
                  <p className="text-sm mb-0">Kafein juga memfasilitasi keberhasilan ekstubasi &amp; mengurangi kegagalan CPAP pada prematur.<Cite n={1} /></p>
                </TheorySection>
              </>
            )}

            {cat === 'Pasca-Resusitasi & Stabilisasi' && (
              <>
                <TheorySection {...sectionProps('stable', { icon: Waves, accent: 'cyan', title: 'Program S.T.A.B.L.E', badge: 'STABLE Program 6th Ed.' })}>
                  <p>Mnemonic stabilisasi pasca-resusitasi berisiko tinggi saat menunggu rujukan/transport NICU.<Cite n={1} /></p>
                  <ul className="text-sm space-y-2 border-l-2 border-cyan-200 dark:border-cyan-900 ml-1 pl-4 text-slate-700 dark:text-slate-300 font-medium list-none">
                    <li><strong className="text-slate-900 dark:text-white">S</strong> = Sugar &amp; Safe Care (jaga GDS, IV D10%)</li>
                    <li><strong className="text-slate-900 dark:text-white">T</strong> = Temperature (cegah hipotermia)</li>
                    <li><strong className="text-slate-900 dark:text-white">A</strong> = Airway (oksigenasi &amp; jalan napas stabil)</li>
                    <li><strong className="text-slate-900 dark:text-white">B</strong> = Blood Pressure (perfusi, bolus/inotropik)</li>
                    <li><strong className="text-slate-900 dark:text-white">L</strong> = Lab Work (GDA, kultur, elektrolit)</li>
                    <li><strong className="text-slate-900 dark:text-white">E</strong> = Emotional Support (komunikasi orang tua)</li>
                  </ul>
                </TheorySection>

                <TheorySection {...sectionProps('hipotermia', { icon: Snowflake, accent: 'cyan', title: 'Hipotermia Terapeutik (Cooling)', badge: 'NICHD 2005 · TOBY 2009 · Cochrane' })}>
                  <p>
                    Satu-satunya neuroproteksi berbasis bukti untuk HIE sedang–berat. Menurunkan metabolisme serebral &amp; menghambat kaskade apoptosis pasca-asfiksia — menurunkan kematian/disabilitas mayor.<Cite n={[1, 2, 3]} />
                  </p>
                  <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200/60 dark:border-cyan-800/30 rounded-xl p-4">
                    <h4 className="font-extrabold text-cyan-800 dark:text-cyan-300 text-xs uppercase tracking-widest mb-3">Kriteria Eligibilitas (semua terpenuhi)</h4>
                    <ul className="space-y-1.5 text-xs text-cyan-700 dark:text-cyan-400 list-disc list-inside m-0">
                      <li>Usia gestasi <strong>≥36 minggu</strong></li>
                      <li>HIE sedang–berat: <strong>Thomson ≥7</strong> / Sarnat II–III / aEEG abnormal</li>
                      <li>Inisiasi dalam <strong>6 jam pertama</strong> (window of opportunity)<Cite n={4} /></li>
                      <li>Tanpa kontraindikasi (perdarahan mayor aktif, anomali letal)</li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[['Target Suhu', '33–34°C'], ['Durasi', '72 Jam'], ['Rewarming', '≤0,5°C/jam']].map(([l, v]) => (
                      <div key={l} className="bg-white/80 dark:bg-slate-900/40 rounded-xl p-3 border border-slate-200/60 dark:border-slate-800 text-center">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">{l}</span>
                        <span className="text-lg sm:text-2xl font-black text-cyan-600 dark:text-cyan-400">{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="border-l-4 border-cyan-300 dark:border-cyan-700 pl-4 py-1 text-sm font-medium italic bg-cyan-50/50 dark:bg-cyan-950/10 rounded-r-lg mb-0">
                    Monitoring ketat: suhu rektal/esofagus kontinu, aEEG untuk kejang, GDA, elektrolit, fungsi ginjal &amp; koagulasi tiap 6–12 jam.<Cite n={2} />
                  </p>
                </TheorySection>

                <TheorySection {...sectionProps('hipoglikemia', { icon: Droplets, accent: 'emerald', title: 'Hipoglikemia Neonatus', badge: 'PES 2015 · Sugar Babies, Lancet 2013' })}>
                  <p>
                    Kelompok risiko: prematur, KMK/SGA, BMK/LGA, bayi ibu diabetes. Glukosa otak yang rendah berkepanjangan berisiko cedera neurologis — skrining lebih dini &amp; sering.<Cite n={2} />
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-4 border border-emerald-200/60 dark:border-emerald-800/30">
                      <h4 className="font-extrabold text-emerald-800 dark:text-emerald-300 text-xs uppercase mb-2">Ambang Tata Laksana</h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-snug mb-0">PES: pertahankan GDS &gt;<strong>50 mg/dL</strong> (&lt;48 jam) &amp; &gt;60 mg/dL (&gt;48 jam) pada bayi berisiko. Simtomatik / &lt;40 mg/dL → intervensi segera.<Cite n={1} /></p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950/30 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800/30">
                      <h4 className="font-extrabold text-slate-700 dark:text-slate-300 text-xs uppercase mb-2">Terapi</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mb-0"><strong>Dextrose gel 40%</strong> 0,5 mL/kg bukal (lini pertama asimtomatik ringan). Bila berat: <strong>bolus D10% 2 mL/kg</strong> lalu infus GIR 4–8 mg/kg/menit.<Cite n={[1, 3]} /></p>
                    </div>
                  </div>
                  <p className="text-sm mb-0">Trial Sugar Babies: dextrose gel mengurangi kegagalan tata laksana &amp; pemisahan ibu–bayi dibanding pemberian susu saja.<Cite n={3} /></p>
                </TheorySection>

                <TheorySection {...sectionProps('neuroproteksi', { icon: HeartPulse, accent: 'indigo', title: 'Neuroproteksi & Persiapan Antenatal', badge: 'BEAM, NEJM 2008 · Cochrane' })}>
                  <p>Intervensi antenatal pada ancaman persalinan prematur memperbaiki luaran neonatus secara bermakna.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200/60 dark:border-indigo-800/30">
                      <h4 className="font-extrabold text-indigo-800 dark:text-indigo-300 text-xs uppercase mb-2">Kortikosteroid Antenatal</h4>
                      <p className="text-xs text-indigo-700 dark:text-indigo-400 leading-snug mb-0">Deksametason/betametason pada 24–34 mgg menurunkan RDS, IVH, NEC, &amp; mortalitas neonatus.<Cite n={1} /></p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950/30 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800/30">
                      <h4 className="font-extrabold text-slate-700 dark:text-slate-300 text-xs uppercase mb-2">MgSO₄ Neuroproteksi</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mb-0">MgSO₄ ibu &lt;32 mgg menurunkan risiko cerebral palsy pada anak (BEAM trial).<Cite n={[2, 3]} /></p>
                    </div>
                  </div>
                  <p className="text-sm mb-0">Komunikasikan status steroid/MgSO₄ antenatal saat serah terima — memengaruhi antisipasi RDS &amp; kesiapan surfaktan.</p>
                </TheorySection>
              </>
            )}
          </section>
        ))}

        {/* Disclaimer */}
        <div className="bg-slate-100 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 px-2 m-0">
            Materi ini adalah alat bantu kognitif berbasis pedoman terkini dan <strong>bukan</strong> pengganti penilaian klinis tenaga medis yang menangani langsung. Selalu rujuk pedoman resmi terbaru (NRP, ILCOR, IDAI) untuk keputusan definitif.
          </p>
        </div>
      </div>
    </div>
  );
}
