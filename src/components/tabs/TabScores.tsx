import React from 'react';
import { useState, useEffect } from 'react';
import { Activity, Plus, AlertTriangle, Calculator, AlertCircle, BookOpen } from 'lucide-react';
import { useStore } from '../../store';
import { useRipple } from '../Ripple';

type ApgarEval = {
  minute: number;
  appearance: number | null;
  pulse: number | null;
  grimace: number | null;
  activity: number | null;
  respiration: number | null;
};

interface TabScoresProps {
  gestationalAge?: string;
  setGestationalAge?: (val: string) => void;
  birthWeight?: string;
  setBirthWeight?: (val: string) => void;
}

// ==========================================
// CLINICAL THEORY AND ACCORDION COMPONENT
// ==========================================

const ClinicalTheoryAccordion = ({ title, content, references }: { title: string, content: React.ReactNode, references: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addRipple, ripplesContainer } = useRipple();
  return (
    <div className="mt-8 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white/40 dark:bg-slate-900/10 backdrop-blur-md transition-all shadow-sm">
      <button
        onPointerDown={addRipple}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex justify-between items-center text-left font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors relative overflow-hidden"
      >
        {ripplesContainer}
        <span className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          {title}
        </span>
        <svg className={`w-5 h-5 text-slate-400 transition-transform duration-350 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-white/5 text-xs md:text-sm text-slate-650 dark:text-slate-300 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {content}
          <div className="pt-4 border-t border-slate-200/60 dark:border-white/10">
            <span className="block font-bold text-xs text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">📚 Referensi Medis Terbaru:</span>
            <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-500 dark:text-slate-450">
              {references.map((ref, idx) => (
                <li key={idx} className="leading-relaxed">{ref}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const apgarTheoryContent = (
  <div className="space-y-3 leading-relaxed text-slate-600 dark:text-slate-350">
    <p>
      <strong>Skor APGAR</strong> pertama kali diperkenalkan oleh dr. Virginia Apgar pada tahun 1952 sebagai alat evaluasi klinis yang cepat dan terstandarisasi untuk menilai kondisi fisik bayi baru lahir segera setelah persalinan. Sistem penilaian ini berfokus pada 5 parameter vital: <em>Appearance</em> (warna kulit), <em>Pulse</em> (denyut jantung), <em>Grimace</em> (refleks/respons terhadap stimulasi), <em>Activity</em> (tonus otot), dan <em>Respiration</em> (usaha bernapas).
    </p>
    <p>
      Penilaian ini secara rutin dilakukan pada <strong>menit ke-1</strong> (merefleksikan seberapa baik bayi bertahan dari proses kelahiran) dan <strong>menit ke-5</strong> (merefleksikan adaptasi bayi di lingkungan luar rahim serta responsnya terhadap intervensi resusitasi). Jika skor menit ke-5 berada di bawah 7, evaluasi harus terus diulang setiap 5 menit (menit ke-10, 15, dan 20) sampai skor mencapai minimal 7 atau resusitasi dihentikan.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
      <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-250 dark:border-emerald-500/20">
        <span className="block font-black text-emerald-800 dark:text-emerald-300 text-xs">Skor 7 – 10 (Normal/Bugar)</span>
        <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 leading-normal">Bayi menunjukkan adaptasi transisi ekstrauterin yang sangat baik. Cukup lakukan perawatan rutin bayi baru lahir.</p>
      </div>
      <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-250 dark:border-amber-500/20">
        <span className="block font-black text-amber-800 dark:text-amber-300 text-xs">Skor 4 – 6 (Asfiksia Sedang)</span>
        <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-1 leading-normal">Menunjukkan depresi napas atau sirkulasi ringan-sedang. Butuh stimulasi taktil, pembersihan jalan napas, dan terapi oksigen/VTP.</p>
      </div>
      <div className="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-xl border border-rose-250 dark:border-rose-500/20">
        <span className="block font-black text-rose-800 dark:text-rose-300 text-xs">Skor 0 – 3 (Asfiksia Berat)</span>
        <p className="text-[11px] text-rose-700 dark:text-rose-400 mt-1 leading-normal">Darurat medis kritis. Memerlukan bantuan resusitasi aktif segera (ventilasi tekanan positif, kompresi dada, obat epinefrin).</p>
      </div>
    </div>
    <div className="bg-indigo-50 dark:bg-indigo-500/10 p-3 rounded-xl border border-indigo-200/50 dark:border-indigo-500/20 text-xs text-indigo-800 dark:text-indigo-300 font-medium">
      <strong>⚠️ Catatan Klinis Kritis:</strong> Skor APGAR <strong>tidak boleh</strong> digunakan untuk menunda inisiasi tindakan resusitasi. Jika bayi lahir dalam keadaan tidak bernapas, lemas, atau sianosis berat, resusitasi harus segera dimulai sebelum penilaian menit ke-1 selesai dicatat.
    </div>
  </div>
);

const apgarReferences = [
  "American Academy of Pediatrics (AAP) & American College of Obstetricians and Gynecologists (ACOG). Committee Opinion No. 644: The Apgar Score. Obstetrics & Gynecology (Reaffirmed 2020).",
  "World Health Organization (WHO). Guidelines on Basic Newborn Resuscitation. Geneva: World Health Organization.",
  "Ikatan Dokter Anak Indonesia (IDAI). Konsensus Nasional Resusitasi Neonatus. Jakarta: Badan Penerbit IDAI (2022)."
];

const downeTheoryContent = (
  <div className="space-y-3 leading-relaxed text-slate-600 dark:text-slate-350">
    <p>
      <strong>Skor Downe</strong> merupakan sistem penilaian klinis yang sangat berharga dan digunakan secara luas di seluruh dunia untuk mengevaluasi derajat keparahan gangguan pernapasan (*respiratory distress*) pada bayi baru lahir. Keunggulan utama Skor Downe adalah kesederhanaannya, di mana parameter penilaian hanya mengandalkan temuan fisik di tempat tidur pasien (*bedside clinical signs*), tanpa memerlukan peralatan diagnostik laboratorium yang kompleks.
    </p>
    <p>
      Sistem ini menilai 5 parameter klinis utama:
    </p>
    <ul className="list-decimal pl-5 space-y-1 my-2 font-medium">
      <li><strong>Frekuensi Napas</strong>: Mendeteksi adanya takipnea sebagai respons kompensasi awal terhadap hipoksia.</li>
      <li><strong>Retraksi dada</strong>: Menunjukkan penggunaan otot-otot bantu pernapasan akibat usaha bernapas yang meningkat keras.</li>
      <li><strong>Sianosis</strong>: Menunjukkan tingkat saturasi oksigen arteri yang tidak memadai pada mukosa/jaringan tubuh.</li>
      <li><strong>Air Entry (Udara masuk)</strong>: Mengukur keadekuatan ventilasi alveolar di kedua lapang paru lewat auskultasi stetoskop.</li>
      <li><strong>Grunting (Merintih)</strong>: Suara napas ekspirasi akibat penutupan parsial glotis, mekanisme fisiologis bayi untuk mempertahankan tekanan positif akhir ekspirasi (PEEP) alami di alveoli.</li>
    </ul>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
      <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-250 dark:border-emerald-500/20">
        <span className="block font-black text-emerald-800 dark:text-emerald-300 text-xs">Skor 1 – 3 (Gangguan Ringan)</span>
        <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 leading-normal">Bayi mengalami sesak ringan. Biasanya cukup dengan pemantauan ketat atau terapi oksigen aliran bebas (nasal kanul).</p>
      </div>
      <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-250 dark:border-amber-500/20">
        <span className="block font-black text-amber-805 dark:text-amber-300 text-xs">Skor 4 – 5 (Gangguan Sedang)</span>
        <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-1 leading-normal">Memerlukan bantuan tekanan positif non-invasif segera menggunakan mesin <strong>CPAP (Continuous Positive Airway Pressure)</strong>.</p>
      </div>
      <div className="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-xl border border-rose-250 dark:border-rose-500/20">
        <span className="block font-black text-rose-800 dark:text-rose-300 text-xs">Skor &ge; 6 (Gangguan Berat / Gagal CPAP)</span>
        <p className="text-[11px] text-rose-700 dark:text-rose-400 mt-1 leading-normal">Indikasi kritis kegagalan pernapasan. Bayi memerlukan tindakan intubasi endotrakeal (ETT) serta ventilasi mekanik invasif.</p>
      </div>
    </div>
  </div>
);

const downeReferences = [
  "Downe ES, et al. Clinical Scoring System for Respiratory Distress in Newborns. Pediatric Pulmonology Journal.",
  "World Health Organization (WHO). Pocket Book of Hospital Care for Children: Guidelines for the Management of Common Childhood Illnesses. Second Edition (2020).",
  "Kementerian Kesehatan RI & IDAI. Protokol Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Bayi Baru Lahir. Jakarta (2021)."
];

const thomsonTheoryContent = (
  <div className="space-y-3 leading-relaxed text-slate-600 dark:text-slate-350">
    <p>
      <strong>Skor Thomson</strong> adalah sistem klasifikasi neurologis khusus yang dirancang oleh dr. Alastair J. Thomson dan timnya pada tahun 1997 untuk mengevaluasi derajat Ensefalopati Hipoksik Iskemik (HIE) pada neonatus dengan riwayat asfiksia perinatal. HIE adalah cedera otak non-progresif yang diakibatkan oleh kurangnya aliran darah atau suplai oksigen ke otak janin/bayi selama proses persalinan.
    </p>
    <p>
      Skor Thomson sangat disukai dalam dunia klinis praktis karena bersifat cepat, kuantitatif, dan tidak memerlukan keahlian neurologis tingkat tinggi atau mesin EEG yang mahal. Skor ini menilai 9 parameter neurologis: tingkat kesadaran (lok), tonus otot (tone), postur tubuh, refleks Moro, kekuatan mengisap (suck), frekuensi/karakter kejang (fits), ketegangan fontanela, pola respirasi, dan ada tidaknya refleks faring (gag).
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
      <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-250 dark:border-emerald-500/20">
        <span className="block font-black text-emerald-800 dark:text-emerald-300 text-xs">Skor 0 – 4 (HIE Ringan)</span>
        <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 leading-normal">Risiko gangguan jangka panjang sangat rendah. Lakukan observasi ketat dan perawatan suportif di ruangan rawat gabung/NICU level rendah.</p>
      </div>
      <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-250 dark:border-amber-500/20">
        <span className="block font-black text-amber-850 dark:text-amber-300 text-xs">Skor 5 – 10 (HIE Sedang)</span>
        <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-1 leading-normal">Memerlukan pemantauan intensif di NICU. Merupakan kriteria penting untuk mempertimbangkan inisiasi <strong>Hipotermia Terapeutik (Cooling Therapy)</strong> dalam jendela waktu 6 jam pertama pasca lahir.</p>
      </div>
      <div className="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-xl border border-rose-250 dark:border-rose-500/20">
        <span className="block font-black text-rose-800 dark:text-rose-300 text-xs">Skor 11 – 22 (HIE Berat)</span>
        <p className="text-[11px] text-rose-700 dark:text-rose-400 mt-1 leading-normal">Indikasi kerusakan neurologis berat dengan risiko kematian atau disabilitas jangka panjang (Cerebral Palsy) yang tinggi. Butuh terapi pendinginan segera dan tata laksana antikejang yang agresif.</p>
      </div>
    </div>
  </div>
);

const thomsonReferences = [
  "Thomson AJ, et al. A clinical grading system for hypoxic ischemic encephalopathy in newborn infants: Relationship to outcome. Pediatrics, 99(2), 244-248 (1997).",
  "British Association of Perinatal Medicine (BAPM). Therapeutic Hypothermia for Neonatal Encephalopathy: A BAPM Clinical Framework. London (2020).",
  "National Institute for Health and Care Excellence (NICE). Therapeutic hypothermia with intracorporeal cooling for hypoxic-ischemic encephalopathy in newborns. Guidance IPG347 (2021)."
];

const ballardTheoryContent = (
  <div className="space-y-3 leading-relaxed text-slate-600 dark:text-slate-350">
    <p>
      Sistem penilaian <strong>New Ballard Score (NBS)</strong> adalah instrumen klinis standar emas yang dikembangkan oleh Jeanne L. Ballard pada tahun 1991 (sebagai penyempurnaan dari Ballard Score tahun 1979) untuk mengestimasi usia kehamilan (*gestational age*) bayi baru lahir. NBS dirancang khusus agar dapat secara akurat menilai bayi yang sangat prematur (hingga usia gestasi 20 minggu dengan skor total -10).
    </p>
    <p>
      Metode penilaian didasarkan pada kombinasi dari dua domain kematangan:
    </p>
    <ul className="list-disc pl-5 space-y-1 my-2 font-medium">
      <li><strong>Kematangan Neuromuskular (6 Parameter)</strong>: Menilai tonus otot pasif bayi yang berkembang dari arah kaudal ke kranial seiring bertambahnya usia kehamilan. Parameter meliputi: Postur, Square Window (sudut pergelangan), Arm Recoil (reaksi lengan), Popliteal Angle (sudut popliteal), Scarf Sign (tanda syal), dan Heel to Ear (tumit ke telinga).</li>
      <li><strong>Kematangan Fisik (6 Parameter)</strong>: Menilai perkembangan anatomis permukaan tubuh terluar yang meliputi: Kulit, Lanugo (rambut halus), Permukaan Plantar kaki, Payudara (breast bud), Mata/Telinga, dan Alat Kelamin (Genitalia pria/wanita).</li>
    </ul>
    <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 space-y-2">
      <span className="block font-bold text-xs text-slate-700 dark:text-slate-350">Cara Kerja Rumus Estimasi Usia Gestasi:</span>
      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
        Total skor berkisar dari -10 (setara 20 minggu gestasi) hingga 50 (setara 44 minggu gestasi). Setiap kenaikan 5 poin pada total skor merepresentasikan pertambahan usia kehamilan sebanyak 2 minggu secara linier. Rumus matematis konversi yang digunakan pada sistem ini adalah:
      </p>
      <div className="py-2 px-3 bg-emerald-50 dark:bg-emerald-500/10 text-center rounded-lg font-mono font-bold text-emerald-800 dark:text-emerald-400 text-xs">
        Usia Gestasi (Minggu) = 24 + (Skor Ballard &times; 0.4)
      </div>
    </div>
  </div>
);

const ballardReferences = [
  "Ballard JL, et al. New Ballard Score, expanded to include extremely premature infants. Journal of Pediatrics, 119(3), 417-423 (1991).",
  "American College of Obstetricians and Gynecologists (ACOG). Committee Opinion No. 700: Methods for Estimating the Due Date. Obstetrics & Gynecology (Reaffirmed 2021).",
  "Neonatal Resuscitation Program (NRP) Textbook. 8th Edition. American Academy of Pediatrics (2021)."
];

type ApgarEval = {
  minute: number;
  appearance: number | null;
  pulse: number | null;
  grimace: number | null;
  activity: number | null;
  respiration: number | null;
};

interface TabScoresProps {
  gestationalAge?: string;
  setGestationalAge?: (val: string) => void;
  birthWeight?: string;
  setBirthWeight?: (val: string) => void;
}

export default function TabScores({ gestationalAge, setGestationalAge, birthWeight, setBirthWeight }: TabScoresProps) {
  // Navigation & Accordion States
  const [activeScoreView, setActiveScoreView] = useState<'menu' | 'apgar' | 'downe' | 'thomson' | 'ballard' | 'silverman' | 'gir' | 'surfactan' | 'inotropic' | 'fluid'>('menu');
  const [expandedMinutes, setExpandedMinutes] = useState<Record<number, boolean>>({ 1: true, 5: true });

  // APGAR State
  const [apgarEvals, setApgarEvals] = useState<ApgarEval[]>([
    { minute: 1, appearance: null, pulse: null, grimace: null, activity: null, respiration: null },
    { minute: 5, appearance: null, pulse: null, grimace: null, activity: null, respiration: null }
  ]);

  const addApgarEval = () => {
    const nextMinute = apgarEvals.length === 2 ? 10 : apgarEvals.length === 3 ? 15 : 20;
    if (nextMinute <= 20) {
      setApgarEvals([...apgarEvals, { minute: nextMinute, appearance: null, pulse: null, grimace: null, activity: null, respiration: null }]);
      setExpandedMinutes(prev => ({ ...prev, [nextMinute]: true }));
    }
  };

  const updateApgar = (evalIdx: number, field: keyof ApgarEval, val: number) => {
    const newEvals = [...apgarEvals];
    newEvals[evalIdx] = { ...newEvals[evalIdx], [field]: val };
    setApgarEvals(newEvals);
  };

  const getApgarTotal = (ev: ApgarEval) => {
    let total = 0;
    let complete = true;
    const fields: (keyof ApgarEval)[] = ['appearance', 'pulse', 'grimace', 'activity', 'respiration'];
    fields.forEach(f => {
      if (ev[f] !== null) total += ev[f] as number;
      else complete = false;
    });
    return { total, complete };
  };

  // BALLARD State
  const [ballardN, setBallardN] = useState<Record<string, number | null>>({
    posture: null, squareWindow: null, armRecoil: null, popliteal: null, scarf: null, heelEar: null
  });
  const [openNeuroParam, setOpenNeuroParam] = useState<string | null>(null);
  const [openPhysParam, setOpenPhysParam] = useState<string | null>(null);
  const [ballardP, setBallardP] = useState<Record<string, number | null>>({
    skin: null, lanugo: null, plantar: null, breast: null, eyeEar: null, genitals: null
  });

  const getBallardTotal = () => {
    let total = 0;
    Object.values(ballardN).forEach(v => { if (v !== null) total += Number(v); });
    Object.values(ballardP).forEach(v => { if (v !== null) total += Number(v); });
    return total;
  };
  
  const ballardTotal = getBallardTotal();
  const estimatedGestationalAge = 24 + ballardTotal * 0.4; // 2 Weeks per 5 score points

  // THOMSON State
  const thomsonDetails = [
    { id: 'loc', label: 'Kesadaran', opts: [{val: 0, desc: 'Normal'}, {val: 1, desc: 'Hiperalert/Iritabel'}, {val: 2, desc: 'Letargi/Somnolen'}, {val: 3, desc: 'Koma/Stupor'}] },
    { id: 'tone', label: 'Tonus', opts: [{val: 0, desc: 'Normal'}, {val: 1, desc: 'Hipertonus/Kaku'}, {val: 2, desc: 'Hipotonus/Lemas'}, {val: 3, desc: 'Flaccid/Terkulai'}] },
    { id: 'posture', label: 'Postur', opts: [{val: 0, desc: 'Normal fleksi'}, {val: 1, desc: 'Distal fleksi'}, {val: 2, desc: 'Dekortikasi/Opistotonus'}] },
    { id: 'moro', label: 'Moro', opts: [{val: 0, desc: 'Normal'}, {val: 1, desc: 'Parsial/Tidak lengkap'}, {val: 2, desc: 'Tidak ada'}] },
    { id: 'suck', label: 'Mengisap', opts: [{val: 0, desc: 'Kuat'}, {val: 1, desc: 'Lemah'}, {val: 2, desc: 'Tidak ada'}] },
    { id: 'fits', label: 'Kejang', opts: [{val: 0, desc: 'Tidak ada'}, {val: 1, desc: 'Jarang/Fokal'}, {val: 2, desc: 'Sering/Frequent'}] },
    { id: 'fontanelle', label: 'Fontanela', opts: [{val: 0, desc: 'Datar/Lembut'}, {val: 1, desc: 'Tegang/Menonjol'}] },
    { id: 'resp', label: 'Respirasi', opts: [{val: 0, desc: 'Reguler'}, {val: 1, desc: 'Irreguler'}, {val: 2, desc: 'Apnea/Butuh Ventilasi'}] },
    { id: 'gag', label: 'Refleks Faring', opts: [{val: 0, desc: 'Normal'}, {val: 1, desc: 'Menurun/Depressed'}] }
  ];
  const [thomson, setThomson] = useState<Record<string, number | null>>({});
  
  const getThomsonTotal = () => {
    let t = 0;
    Object.values(thomson).forEach(v => { if (v !== null) t += Number(v); });
    return t;
  };
  const thomsonTotal = getThomsonTotal();

  // DOWNE State
  // SILVERMAN-ANDERSON State
  const silvermanDetails = [
    { id: 'chest', label: 'Gerak Dada Atas', opts: [{val: 0, desc: 'Sinkron'}, {val: 1, desc: 'Lag/Tertinggal'}, {val: 2, desc: 'Paradoksal'}] },
    { id: 'intercostal', label: 'Retraksi Interkostal', opts: [{val: 0, desc: 'Tidak ada'}, {val: 1, desc: 'Ringan'}, {val: 2, desc: 'Berat'}] },
    { id: 'subxiphoid', label: 'Retraksi Subxiphoid', opts: [{val: 0, desc: 'Tidak ada'}, {val: 1, desc: 'Ringan'}, {val: 2, desc: 'Berat'}] },
    { id: 'nares', label: 'Cuping Hidung (Nasal Flaring)', opts: [{val: 0, desc: 'Tidak ada'}, {val: 1, desc: 'Minimal'}, {val: 2, desc: 'Nyata/Jelas'}] },
    { id: 'grunt', label: 'Merintih (Grunting)', opts: [{val: 0, desc: 'Tidak ada'}, {val: 1, desc: 'Hanya dengan stetoskop'}, {val: 2, desc: 'Terdengar jelas'}] },
  ];
  const [silverman, setSilverman] = useState<Record<string, number | null>>({});
  const getSilvermanTotal = () => {
    let t = 0;
    Object.values(silverman).forEach(v => { if (v !== null) t += Number(v); });
    return t;
  };
  const silvermanTotal = getSilvermanTotal();

  // GIR Kalkulator State
  const [girBB, setGirBB] = useState('');
  const [girRate, setGirRate] = useState('');
  const [girDextrose, setGirDextrose] = useState('10');
  const [girPreterm, setGirPreterm] = useState(false);
  const girValue = girBB && girRate ? (parseFloat(girRate) * parseFloat(girDextrose)) / (6 * parseFloat(girBB)) : null;

  // Surfaktan Kalkulator State
  const [surfBB, setSurfBB] = useState('');
  const [surfDrug, setSurfDrug] = useState<'poractant-initial' | 'poractant-repeat' | 'beractant'>('poractant-initial');
  const getSurfactantResult = () => {
    const w = parseFloat(surfBB);
    if (!w || w <= 0) return null;
    if (surfDrug === 'poractant-initial') return { dose: (200 * w).toFixed(0), vol: (200 * w / 120).toFixed(2), drug: 'Poractant alfa (Curosurf 120 mg/mL)', dosePerKg: '200 mg/kg', note: 'Dosis awal rescue' };
    if (surfDrug === 'poractant-repeat') return { dose: (100 * w).toFixed(0), vol: (100 * w / 120).toFixed(2), drug: 'Poractant alfa (Curosurf 120 mg/mL)', dosePerKg: '100 mg/kg', note: 'Dosis ulangan (maks 2x)' };
    return { dose: (100 * w).toFixed(0), vol: (4 * w).toFixed(2), drug: 'Beractant (Survanta 25 mg/mL)', dosePerKg: '100 mg/kg = 4 mL/kg', note: 'Ulangan tiap 6 jam, maks 4 dosis' };
  };

  // Inotropik Kalkulator State
  const [inoBB, setInoBB] = useState('');
  const [inoDrug, setInoDrug] = useState<'dopamine' | 'dobutamine'>('dopamine');
  const [inoConc, setInoConc] = useState('');
  const [inoDose, setInoDose] = useState('5');
  const inoRate = inoBB && inoConc && inoDose ? ((parseFloat(inoDose) * parseFloat(inoBB) * 60) / (parseFloat(inoConc) * 1000)).toFixed(2) : null;

  // Kebutuhan Cairan State
  const [fluidBB, setFluidBB] = useState('');
  const [fluidDOL, setFluidDOL] = useState('1');
  const [fluidType, setFluidType] = useState<'term' | 'preterm-1500' | 'bblr' | 'bblsr'>('term');
  const fluidTable: Record<string, number[]> = {
    'term':         [80, 90, 100, 120, 120, 130, 150],
    'preterm-1500': [80, 90, 100, 110, 120, 130, 150],
    'bblr':         [70, 80, 100, 110, 120, 130, 150],
    'bblsr':        [60, 70, 80,  100, 110, 120, 150],
  };
  const dol = Math.min(parseInt(fluidDOL) || 1, 7) - 1;
  const fluidMlKgDay = fluidTable[fluidType][dol];
  const fluidAbsolute = fluidBB ? (fluidMlKgDay * parseFloat(fluidBB)).toFixed(0) : null;

  const downeDetails = [
    { id: 'freq', label: 'Frekuensi Napas', opts: [{val: 0, desc: '< 60 x/m'}, {val: 1, desc: '60-80 x/m'}, {val: 2, desc: '> 80 x/m'}] },
    { id: 'retraction', label: 'Retraksi', opts: [{val: 0, desc: 'Tidak Ada'}, {val: 1, desc: 'Ringan'}, {val: 2, desc: 'Berat/dalam'}] },
    { id: 'cyanosis', label: 'Sianosis', opts: [{val: 0, desc: 'Tidak Ada'}, {val: 1, desc: 'Hilang dgn O2'}, {val: 2, desc: 'Menetap walau dgn O2'}] },
    { id: 'airEntry', label: 'Air Entry', opts: [{val: 0, desc: 'Bilateral baik'}, {val: 1, desc: 'Menurun ringan'}, {val: 2, desc: 'Sangat minimal'}] },
    { id: 'grunting', label: 'Merintih', opts: [{val: 0, desc: 'Tidak Ada'}, {val: 1, desc: 'Hanya dgn stetoskop'}, {val: 2, desc: 'Terdengar tanpa alat'}] }
  ];
  const [downe, setDowne] = useState<Record<string, number | null>>({});

  const getDowneTotal = () => {
    let t = 0;
    Object.values(downe).forEach(v => { if (v !== null) t += Number(v); });
    return t;
  };
  const downeTotal = getDowneTotal();

  useEffect(() => {
    useStore.getState().setDowneScore(downeTotal);
  }, [downeTotal]);

  const DetailedScoreOption = ({ val, current, onClick, desc, svg, activeColor = 'bg-blue-600 border-blue-500 shadow-blue-500/30' }: { key?: string | number, val: number, current: number | null, onClick: () => void, desc?: string, svg?: React.ReactNode, activeColor?: string }) => {
    const { addRipple, ripplesContainer } = useRipple();
    return (
      <button 
        onPointerDown={addRipple}
        onClick={onClick}
        className={`relative overflow-hidden flex-1 p-1 md:p-2 text-xs md:text-sm font-medium rounded-2xl border transition-all flex flex-col items-center justify-start text-center h-full hover:-translate-y-0.5 active:scale-95
          ${current === val ? `${activeColor} text-white shadow-lg` : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:border-white/20 hover:bg-slate-200/50 dark:bg-white/10'}`}
      >
        {ripplesContainer}
        <div className="font-black text-base md:text-lg mb-1 leading-none">{val}</div>
        {svg && <div className={`mb-1 transition-colors ${current === val ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>{svg}</div>}
        {desc && <div className={`text-xs md:text-xs leading-tight font-semibold px-0.5 relative z-10 ${current === val ? 'text-white/95' : 'text-slate-500 dark:text-slate-400'}`}>{desc}</div>}
      </button>
    );
  };

  const CompactScoreOption = ({ val, current, onClick, activeColor }: { key?: string | number, val: number, current: number | null, onClick: () => void, activeColor: string }) => {
    const { addRipple, ripplesContainer } = useRipple();
    return (
      <button 
        onPointerDown={addRipple}
        onClick={onClick}
        className={`relative overflow-hidden w-10 h-10 md:w-11 md:h-11 text-sm md:text-base font-bold rounded-xl border flex items-center justify-center transition-all hover:-translate-y-0.5 active:scale-95
          ${current === val ? `${activeColor} text-white shadow-lg` : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-200/50 dark:bg-white/10 hover:border-slate-300 dark:border-white/20'}`}
      >
        {ripplesContainer}
        <span className="relative z-10">{val}</span>
      </button>
    );
  };

  const BALLARD_IMG_PREFIX: Record<string, string> = {
    posture: 'ballard_post',
    squareWindow: 'ballard_square',
    armRecoil: 'ballard_armrecoil',
    popliteal: 'ballard_poplitealangle',
    scarf: 'ballard_scarfsign',
    heelEar: 'ballard_heeltoear',
  };

  const BallardImg = ({ type, val }: { type: string; val: number }) => {
    const prefix = BALLARD_IMG_PREFIX[type];
    if (!prefix) return null;
    return (
      <img
        src={`/ballard/${prefix}_${val}.png`}
        alt={`${type} skor ${val}`}
        className="w-12 h-12 object-contain opacity-90 mx-auto dark:brightness-90"
        loading="lazy"
      />
    );
  };

  const ballardPhysicalDesc: Record<string, Record<number, string>> = {
    skin: {
      '-1': 'Lengket, rapuh, transparan',
      0: 'Gelatin, merah, transparan',
      1: 'Halus, merah muda, vena terlihat',
      2: 'Mengelupas ± ruam, vena sedikit',
      3: 'Area pucat, retak, vena jarang',
      4: 'Kulit seperti perkamen, retak dalam',
      5: 'Kulit kasar, keriput, retak dalam',
    },
    lanugo: {
      '-1': 'Tidak ada',
      0: 'Jarang',
      1: 'Banyak',
      2: 'Menipis',
      3: 'Gundul sebagian',
      4: 'Hampir tidak ada',
    },
    plantar: {
      '-1': 'Tumit–jari 40–50 mm: -1',
      0: 'Tumit–jari <40 mm: -2',
      1: 'Garis samar-samar',
      2: 'Garis anterior saja',
      3: 'Lipatan anterior 2/3',
      4: 'Lipatan seluruh telapak',
    },
    breast: {
      '-1': 'Tidak tampak',
      0: 'Hampir tak tampak',
      1: 'Areola rata, tanpa tonjolan',
      2: 'Areola timbul, tonjolan 1–2 mm',
      3: 'Areola penuh, tonjolan 3–4 mm',
      4: 'Payudara penuh, tonjolan 5–10 mm',
    },
    eyeEar: {
      '-1': 'Kelopak menyatu longgar',
      0: 'Kelopak menyatu kuat',
      1: 'Daun telinga datar, tetap terlipat',
      2: 'Daun telinga melengkung sedikit, rekoil lambat',
      3: 'Daun telinga dibentuk, rekoil cepat',
      4: 'Kartilago tebal, telinga kaku',
    },
    genitals: {
      '-1': 'Skrotum datar / Klitoris menonjol, labia datar',
      0: 'Skrotum kosong, rugae samar / Klitoris menonjol, labia minora kecil',
      1: 'Testis di kanal atas, rugae jarang / Labia minora membesar',
      2: 'Testis turun, rugae sedikit / Klitoris & labia minora sama menonjol',
      3: 'Testis turun, rugae baik / Labia mayora & minora sama menonjol',
      4: 'Testis menggantung, rugae dalam / Labia mayora menutupi klitoris',
    },
  };

  const apgarDetails = [
    { key: 'appearance', name: 'Appearance (Warna Kulit)', opts: [{val: 0, desc: 'Biru/Pucat'}, {val: 1, desc: 'Tubuh pink, ekstremitas biru'}, {val: 2, desc: 'Seluruh tubuh pink normal'}] },
    { key: 'pulse', name: 'Pulse (Laju Jantung)', opts: [{val: 0, desc: 'Tidak ada'}, {val: 1, desc: '<100 x/m'}, {val: 2, desc: '>=100 x/m'}] },
    { key: 'grimace', name: 'Grimace (Refleks)', opts: [{val: 0, desc: 'Tidak ada respons'}, {val: 1, desc: 'Meringis tipis'}, {val: 2, desc: 'Menangis kuat/batuk'}] },
    { key: 'activity', name: 'Activity (Tonus Otot)', opts: [{val: 0, desc: 'Lemas/Flaccid'}, {val: 1, desc: 'Sedikit fleksi'}, {val: 2, desc: 'Gerakan aktif fleksi kuat'}] },
    { key: 'respiration', name: 'Respiration (Usaha Napas)', opts: [{val: 0, desc: 'Tidak ada'}, {val: 1, desc: 'Lambat/merintih'}, {val: 2, desc: 'Menangis kuat'}] },
  ];

  const RenderBackButton = () => (
    <button 
      onClick={() => setActiveScoreView('menu')}
      className="mb-6 inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-black transition-all hover:-translate-x-0.5 active:scale-95 shadow-sm"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
      </svg>
      Kembali ke Menu Utama Skoring
    </button>
  );

  return (
    <div className="animate-in fade-in duration-300 relative pb-36">
      
      {/* 0. DASHBOARD SELECTION MENU */}
      {activeScoreView === 'menu' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-7 h-7 text-indigo-400" />
              Sistem Penilaian &amp; Kalkulator Neonatus
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Pilih modul penilaian klinis terstandar di bawah ini untuk memulai evaluasi pasien.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: APGAR */}
            <div 
              onClick={() => setActiveScoreView('apgar')}
              className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 hover:-translate-y-1 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between min-h-[160px]"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 rounded">
                  Skor APGAR
                </span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Evaluasi Bugar Neonatus</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Menilai Appearance, Pulse, Grimace, Activity, dan Respiration pada menit ke-1, 5, dan 10 pasca lahir.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 mt-3 flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>STATUS: {apgarEvals.some(ev => getApgarTotal(ev).complete) ? "Telah Diisi" : "Belum Diisi"}</span>
                <span className="text-indigo-500 dark:text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Buka Alat →</span>
              </div>
            </div>

            {/* Card 2: DOWNE */}
            <div 
              onClick={() => setActiveScoreView('downe')}
              className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-sky-500/30 hover:-translate-y-1 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between min-h-[160px]"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-sky-100 dark:bg-sky-955 text-sky-700 dark:text-sky-400 rounded">
                  Skor Downe
                </span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Evaluasi Distres Pernapasan</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Mengukur frekuensi napas, retraksi, sianosis, air entry, dan grunting untuk skrining sesak napas.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 mt-3 flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>SKOR SAAT INI: {downeTotal}</span>
                <span className="text-sky-500 dark:text-sky-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Buka Alat →</span>
              </div>
            </div>

            {/* Card 3: THOMSON */}
            <div 
              onClick={() => setActiveScoreView('thomson')}
              className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-amber-500/30 hover:-translate-y-1 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between min-h-[160px]"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-955 text-amber-700 dark:text-amber-400 rounded">
                  Skor Thomson
                </span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Screener HIE (Asfiksia)</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Menilai derajat ensefalopati hipoksik iskemik pada bayi baru lahir berdasarkan respons neurologis.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 mt-3 flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>SKOR SAAT INI: {thomsonTotal}</span>
                <span className="text-amber-500 dark:text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Buka Alat →</span>
              </div>
            </div>

            {/* Card 4: BALLARD */}
            <div 
              onClick={() => setActiveScoreView('ballard')}
              className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 hover:-translate-y-1 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between min-h-[160px]"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded">
                  Ballard Score
                </span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Kematangan Usia Gestasi</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Menilai kematangan fisik dan neuromuskular untuk memprediksi usia kehamilan bayi baru lahir.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 mt-3 flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>ESTIMASI: {ballardTotal > -12 ? (() => { const d = Math.round(estimatedGestationalAge * 7); const w = Math.floor(d / 7); const r = d % 7; return `${w}mgg${r > 0 ? ` ${r}hr` : ''}`; })() : "Belum Diisi"}</span>
                <span className="text-emerald-500 dark:text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Buka Alat →</span>
              </div>
            </div>

            {/* Card 5: SILVERMAN-ANDERSON */}
            <div
              onClick={() => setActiveScoreView('silverman')}
              className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-rose-500/30 hover:-translate-y-1 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between min-h-[160px]"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 rounded">Silverman-Anderson</span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Skor Distres Napas Prematur</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Menilai gerak dada, retraksi interkostal & subxiphoid, cuping hidung, dan grunting pada neonatus prematur.</p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 mt-3 flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>SKOR SAAT INI: {silvermanTotal}</span>
                <span className="text-rose-500 dark:text-rose-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Buka Alat →</span>
              </div>
            </div>

            {/* Card 6: GIR */}
            <div
              onClick={() => setActiveScoreView('gir')}
              className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-amber-500/30 hover:-translate-y-1 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between min-h-[160px]"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 rounded">Kalkulator GIR</span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Glucose Infusion Rate</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Hitung kecepatan infus glukosa (mg/kg/mnt) dari berat badan, rate, dan konsentrasi dekstrosa yang digunakan.</p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 mt-3 flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>TARGET: Aterm 4–6, Prematur 6–8 mg/kg/mnt</span>
                <span className="text-amber-500 dark:text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Buka →</span>
              </div>
            </div>

            {/* Card 7: Surfaktan */}
            <div
              onClick={() => setActiveScoreView('surfactan')}
              className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-violet-500/30 hover:-translate-y-1 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between min-h-[160px]"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400 rounded">Kalkulator Surfaktan</span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Dosis Surfaktan Intratrakeal</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Hitung volume Poractant alfa (Curosurf) dan Beractant (Survanta) berdasarkan berat lahir neonatus.</p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 mt-3 flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>Curosurf 200 mg/kg · Survanta 4 mL/kg</span>
                <span className="text-violet-500 dark:text-violet-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Buka →</span>
              </div>
            </div>

            {/* Card 8: Inotropik */}
            <div
              onClick={() => setActiveScoreView('inotropic')}
              className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 hover:-translate-y-1 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between min-h-[160px]"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 rounded">Kalkulator Inotropik</span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Dopamin &amp; Dobutamin</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Konversi dosis mcg/kg/mnt ke kecepatan infus mL/jam berdasarkan konsentrasi larutan yang disiapkan.</p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 mt-3 flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>Dopamin 5–20 · Dobutamin 2.5–20 mcg/kg/mnt</span>
                <span className="text-cyan-500 dark:text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Buka →</span>
              </div>
            </div>

            {/* Card 9: Kebutuhan Cairan */}
            <div
              onClick={() => setActiveScoreView('fluid')}
              className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-sky-500/30 hover:-translate-y-1 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between min-h-[160px]"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 rounded">Kalkulator Cairan</span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Kebutuhan Cairan Neonatus</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Hitung volume cairan harian (mL/kg/hari) dan absolut (mL/hari) berdasarkan hari kehidupan dan berat lahir.</p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 mt-3 flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>Aterm 80–150 · BBLSR 60–150 mL/kg/hari</span>
                <span className="text-sky-500 dark:text-sky-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Buka →</span>
              </div>
            </div>

          </div>

          {/* DIFFERENTIAL DIAGNOSIS ENGINE */}
          {(() => {
            const ga = estimatedGestationalAge;
            const hasBallard = ballardTotal > -12;
            type DDx = { dx: string; probability: 'tinggi' | 'sedang' | 'rendah'; basis: string; action: string };
            const ddx: DDx[] = [];

            // RDS / HMD
            if ((hasBallard && ga < 34) || silvermanTotal >= 3 || downeTotal >= 4) {
              ddx.push({
                dx: 'Respiratory Distress Syndrome (RDS/HMD)',
                probability: (hasBallard && ga < 30) || silvermanTotal >= 6 ? 'tinggi' : 'sedang',
                basis: [hasBallard && ga < 34 && `Ballard <34 mgg (${Math.floor(ga)}m)`, silvermanTotal >= 3 && `Silverman ${silvermanTotal}`, downeTotal >= 4 && `Downe ${downeTotal}`].filter(Boolean).join(', '),
                action: 'Surfaktan rescue (CPAP FiO2 >0.30), CPAP PEEP 5–7 cmH₂O. Ref: ILCOR CoSTR 2022',
              });
            }

            // TTN
            if ((!hasBallard || ga >= 34) && downeTotal >= 2 && downeTotal <= 5 && silvermanTotal >= 1 && silvermanTotal <= 4) {
              ddx.push({
                dx: 'Transient Tachypnea of the Newborn (TTN)',
                probability: 'sedang',
                basis: `Downe ${downeTotal}, Silverman ${silvermanTotal}, usia gestasi ≥34 mgg`,
                action: 'O₂ suplemental, observasi ketat. Resolusi spontan 24–72 jam. Ref: AAP 2017',
              });
            }

            // MAS
            if (downeTotal >= 5 && silvermanTotal >= 5 && (!hasBallard || ga >= 36)) {
              ddx.push({
                dx: 'Meconium Aspiration Syndrome (MAS)',
                probability: 'tinggi',
                basis: `Downe ${downeTotal}, Silverman ${silvermanTotal}, matur/post-matur`,
                action: 'Ventilasi PEEP rendah (3–4 cmH₂O), surfaktan rescue jika berat. Ref: NRP 8th Ed 2021',
              });
            }

            // HIE
            if (thomsonTotal >= 5) {
              ddx.push({
                dx: 'Hypoxic-Ischemic Encephalopathy (HIE)',
                probability: thomsonTotal >= 11 ? 'tinggi' : 'sedang',
                basis: `Thomson ${thomsonTotal}${thomsonTotal >= 11 ? ' (berat)' : ' (sedang)'}`,
                action: 'Terapi pendinginan 33–34°C selama 72 jam jika ≥36 mgg. Konsul neuropediatri. Ref: WHO 2022, Jacobs 2013',
              });
            }

            // Hipoglikemia risiko
            if (hasBallard && (ga < 37 || ga > 42)) {
              ddx.push({
                dx: 'Risiko Hipoglikemia Neonatus',
                probability: ga < 32 ? 'tinggi' : 'sedang',
                basis: `Ballard: ${Math.floor(ga)} mgg ${ga > 42 ? '(post-matur)' : '(prematur)'}`,
                action: 'Skrining GDS 1–2 jam post-lahir, target >47 mg/dL. Ref: AAP PES 2011, ACOG 2017',
              });
            }

            // Sepsis
            if (downeTotal >= 4 && thomsonTotal >= 3) {
              ddx.push({
                dx: 'Early-Onset Neonatal Sepsis (EONS)',
                probability: 'sedang',
                basis: `Downe ${downeTotal} + Thomson ${thomsonTotal} — gejala klinis tumpang tindih`,
                action: 'Kultur darah, CBC, CRP. Ampisilin + Gentamisin empiris. Ref: ESCMID/ACOG 2020',
              });
            }

            if (ddx.length === 0) return null;

            const probColor = (p: string) => p === 'tinggi'
              ? 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
              : p === 'sedang'
              ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';

            return (
              <div className="mt-6 glass-card rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-800/80 dark:bg-slate-900/80 backdrop-blur-md px-5 py-3 border-b border-white/10 flex items-center gap-2">
                  <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                  <h4 className="font-bold text-white text-sm">Diagnosis Diferensial Otomatis</h4>
                  <span className="ml-auto text-[10px] text-slate-400 font-normal">Berdasarkan kombinasi skor yang telah diisi</span>
                </div>
                <div className="p-4 space-y-3">
                  {ddx.map((d, i) => (
                    <div key={i} className={`rounded-xl border p-3 ${probColor(d.probability)}`}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-bold text-sm leading-snug">{d.dx}</span>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 border ${probColor(d.probability)}`}>
                          {d.probability}
                        </span>
                      </div>
                      <p className="text-xs opacity-80 mb-1"><span className="font-semibold">Dasar:</span> {d.basis}</p>
                      <p className="text-xs opacity-90"><span className="font-semibold">Tindakan:</span> {d.action}</p>
                    </div>
                  ))}
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center pt-1">
                    DDx dihasilkan otomatis berdasarkan skor terisi. Konfirmasi selalu dengan klinis dan pemeriksaan penunjang.
                  </p>
                </div>
              </div>
            );
          })()}

        </div>
      )}

      {/* 1. INTERACTIVE APGAR SCORE VIEW */}
      {activeScoreView === 'apgar' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <RenderBackButton />
          
          <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-indigo-600/80 backdrop-blur-md p-4 text-white border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
              <h3 className="font-bold text-lg text-white">Skor APGAR Interaktif</h3>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              {apgarEvals.map((ev, idx) => {
                const { total, complete } = getApgarTotal(ev);
                const isExpanded = !!expandedMinutes[ev.minute];
                return (
                  <div key={ev.minute} className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm animate-in fade-in transition-all">
                    
                    {/* Collapsible Accordion Header */}
                    <div 
                      onClick={() => setExpandedMinutes({...expandedMinutes, [ev.minute]: !isExpanded})}
                      className="flex justify-between items-center cursor-pointer select-none pb-2 border-b border-slate-100 dark:border-slate-800/80"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 px-3 py-1 rounded-full text-xs uppercase tracking-wider leading-none">
                          Menit ke-{ev.minute}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 hidden sm:inline">
                          {isExpanded ? '▲ Klik untuk menciutkan' : '▼ Klik untuk mengisi'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-base font-mono font-bold ${complete ? (total >= 7 ? 'text-emerald-500' : total >= 4 ? 'text-amber-500' : 'text-rose-500') : 'text-slate-400'}`}>
                          {complete ? `Skor: ${total} / 10` : 'Belum Lengkap'}
                        </span>
                        <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Collapsible Accordion Body */}
                    {isExpanded && (
                      <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-1 duration-200">
                        {apgarDetails.map(param => (
                          <div key={param.key} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                             <span className="text-xs font-bold text-slate-655 dark:text-slate-350 w-44">{param.name}</span>
                             <div className="flex gap-1.5 flex-1 items-stretch min-h-[3.5rem]">
                              {param.opts.map(opt => (
                                <DetailedScoreOption 
                                  key={opt.val} 
                                  val={opt.val} 
                                  current={ev[param.key as keyof ApgarEval]} 
                                  onClick={() => updateApgar(idx, param.key as keyof ApgarEval, opt.val)}
                                  desc={opt.desc}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                );
              })}
              
              {apgarEvals.length < 5 && (
                <button 
                  onClick={addApgarEval}
                  className="w-full bg-white dark:bg-white/5 border border-dashed border-indigo-300 dark:border-indigo-500/50 text-indigo-650 dark:text-indigo-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-indigo-455 py-3.5 rounded-xl font-bold transition-all flex justify-center items-center gap-2 shadow-sm text-xs"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Evaluasi {apgarEvals.length === 2 ? '10' : apgarEvals.length === 3 ? '15' : '20'} Menit Berikutnya
                </button>
              )}

              <ClinicalTheoryAccordion 
                title="Teori Medis & Panduan Skor APGAR" 
                content={apgarTheoryContent} 
                references={apgarReferences} 
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. DOWNE SCORE VIEW */}
      {activeScoreView === 'downe' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <RenderBackButton />
          
          <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-sky-600 p-4 text-white border-b border-slate-200 dark:border-white/10">
              <h3 className="font-bold text-lg text-white">Downe Score (Evaluasi Sesak)</h3>
            </div>
            <div className="p-4 md:p-5">
              <div className="space-y-5 mb-6">
                {downeDetails.map(param => (
                  <div key={param.id} className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-slate-650 dark:text-slate-350">{param.label}</span>
                    <div className="flex gap-1.5 items-stretch min-h-[3.5rem]">
                      {param.opts.map(opt => (
                        <DetailedScoreOption 
                          key={opt.val} 
                          val={opt.val} 
                          desc={opt.desc} 
                          current={downe[param.id] ?? null} 
                          onClick={() => setDowne({...downe, [param.id]: opt.val})}
                          activeColor="bg-slate-700 border-slate-600"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center bg-white/80 dark:bg-slate-900/50 backdrop-blur-md p-4 rounded-xl border border-slate-200/60 dark:border-white/5 mb-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-bold text-slate-700 dark:text-slate-300">Total Skor Downe</span>
                <span className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{downeTotal}</span>
              </div>

              {downeTotal > 6 && (
                <div className="bg-rose-50 dark:bg-rose-500/20 border border-rose-200 dark:border-rose-500/50 text-rose-900 dark:text-rose-200 p-4 rounded-xl shadow-lg shadow-rose-500/20 animate-pulse flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 text-rose-600 dark:text-rose-300" />
                  <div>
                    <h4 className="font-bold text-lg leading-tight uppercase tracking-wide">🚨 Skor Downe &gt; 6</h4>
                    <p className="mt-1 font-semibold text-sm leading-relaxed text-rose-800 dark:text-rose-100">
                      Kriteria Gagal CPAP Terpenuhi! Siapkan tim untuk tindakan Intubasi ETT + VTP!
                    </p>
                  </div>
                </div>
              )}

              <ClinicalTheoryAccordion 
                title="Teori Medis & Panduan Skor Downe" 
                content={downeTheoryContent} 
                references={downeReferences} 
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. THOMSON SCORE VIEW */}
      {activeScoreView === 'thomson' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <RenderBackButton />
          
          <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-amber-600/80 backdrop-blur-md p-4 text-white border-b border-slate-200 dark:border-white/10">
              <h3 className="font-bold text-lg text-white">Skor Thomson (Screener HIE - Ensefalopati Hipoksik Iskemik)</h3>
            </div>
            <div className="p-4 md:p-5">
              <div className="flex flex-col gap-4 mb-6">
                {thomsonDetails.map(param => (
                  <div key={param.id} className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-md shadow-slate-200/40 dark:shadow-none flex flex-col md:flex-row md:items-center gap-3 md:gap-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <span className="text-xs md:text-sm font-bold uppercase text-slate-500 dark:text-slate-400 md:w-48 shrink-0">{param.label}</span>
                    
                    {/* Desktop View: Button Group */}
                    <div className="hidden md:flex gap-2 flex-1 items-stretch min-h-[3.5rem]">
                      {param.opts.map(opt => (
                        <DetailedScoreOption 
                          key={opt.val} 
                          val={opt.val} 
                          desc={opt.desc}
                          current={thomson[param.id] ?? null} 
                          onClick={() => setThomson({...thomson, [param.id]: opt.val})} 
                          activeColor="bg-amber-600 border-amber-500 shadow-amber-500/30" 
                        />
                      ))}
                    </div>

                    {/* Mobile View: Select Dropdown */}
                    <div className="block md:hidden relative">
                      <select 
                        className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition-all"
                        value={thomson[param.id] ?? ""}
                        onChange={(e) => setThomson({...thomson, [param.id]: e.target.value !== "" ? parseInt(e.target.value) : null})}
                      >
                        <option value="" disabled>-- Pilih Skor --</option>
                        {param.opts.map(opt => (
                          <option key={opt.val} value={opt.val}>
                            Skor {opt.val}: {opt.desc}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center bg-white/80 dark:bg-slate-900/50 backdrop-blur-md p-4 rounded-xl border border-slate-200/60 dark:border-white/5 mb-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-bold text-slate-700 dark:text-slate-300">Total Skor Thomson</span>
                <span className="text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">{thomsonTotal}</span>
              </div>

              {thomsonTotal >= 5 && (
                <div className="bg-amber-50 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/50 text-amber-900 dark:text-amber-200 p-4 rounded-xl animate-in zoom-in duration-300 flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 shrink-0 mt-0.5 text-amber-600 dark:text-amber-405" />
                  <div>
                    <h4 className="font-bold text-lg leading-tight uppercase tracking-wide">⚠️ Indikasi HIE {thomsonTotal >= 11 ? 'Berat' : 'Sedang'}</h4>
                    <p className="mt-1 font-semibold text-sm leading-relaxed text-amber-800 dark:text-amber-100">
                      Skor Thomson {thomsonTotal} (&ge; 5). Segera rujuk dan observasi terapi pendinginan pasif/aktif!
                    </p>
                  </div>
                </div>
              )}

              <ClinicalTheoryAccordion 
                title="Teori Medis & Panduan Skor Thomson" 
                content={thomsonTheoryContent} 
                references={thomsonReferences} 
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. NEW BALLARD SCORE VIEW */}
      {activeScoreView === 'ballard' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <RenderBackButton />
          
          <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-emerald-600/80 backdrop-blur-md p-4 text-white border-b border-slate-200 dark:border-white/10">
              <h3 className="font-bold text-lg text-white">Skor New Ballard (Penilaian Usia Gestasi)</h3>
            </div>
            <div className="p-4 md:p-5">
              
              <div className="mb-6">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 border-b border-slate-200 dark:border-white/10 pb-2">Kematangan Neuromuskular</h4>
                <div className="space-y-2">
                  {(() => {
                    const neuroParams = [
                      { id: 'posture', label: 'Postur Tubuh (Posture)', min: 0, max: 4 },
                      { id: 'squareWindow', label: 'Sudut Pergelangan (Square Window)', min: -1, max: 4 },
                      { id: 'armRecoil', label: 'Pemantulan Lengan (Arm Recoil)', min: 0, max: 4 },
                      { id: 'popliteal', label: 'Sudut Popliteal (Popliteal Angle)', min: -1, max: 5 },
                      { id: 'scarf', label: 'Tanda Scarf (Scarf Sign)', min: -1, max: 4 },
                      { id: 'heelEar', label: 'Tumit ke Telinga (Heel to Ear)', min: -1, max: 4 }
                    ];
                    return neuroParams.map(param => {
                      const selected = ballardN[param.id] ?? null;
                      const isOpen = openNeuroParam === param.id;
                      const vals = Array.from({ length: param.max - param.min + 1 }, (_, i) => i + param.min);
                      return (
                        <div key={param.id} className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-sm overflow-hidden">
                          {/* Dropdown header */}
                          <button
                            onClick={() => setOpenNeuroParam(isOpen ? null : param.id)}
                            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{param.label}</span>
                              {selected !== null && (
                                <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                                  Skor: {selected}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {selected !== null && (
                                <img
                                  src={`/ballard/${BALLARD_IMG_PREFIX[param.id]}_${selected}.png`}
                                  alt={`preview ${selected}`}
                                  className="w-10 h-10 object-contain dark:brightness-90"
                                />
                              )}
                              <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </button>
                          {/* Dropdown body */}
                          {isOpen && (
                            <div className="border-t border-slate-100 dark:border-white/5 px-4 py-4">
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {vals.map(val => {
                                  const isActive = selected === val;
                                  return (
                                    <button
                                      key={val}
                                      onClick={() => { setBallardN({...ballardN, [param.id]: val}); setOpenNeuroParam(null); }}
                                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all active:scale-95
                                        ${isActive
                                          ? 'bg-emerald-500 border-emerald-400 shadow-md text-white'
                                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-slate-700 dark:text-slate-300'
                                        }`}
                                    >
                                      <img
                                        src={`/ballard/${BALLARD_IMG_PREFIX[param.id]}_${val}.png`}
                                        alt={`${param.id} ${val}`}
                                        className={`w-24 h-24 object-contain ${isActive ? 'brightness-0 invert' : 'dark:brightness-90'}`}
                                        loading="lazy"
                                      />
                                      <span className="text-sm font-extrabold">Skor {val}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 border-b border-slate-200 dark:border-white/10 pb-2">Kematangan Fisik</h4>
                <div className="space-y-2">
                  {[
                    { id: 'skin', label: 'Kulit (Skin)', min: -1, max: 5 },
                    { id: 'lanugo', label: 'Lanugo (Rambut Halus)', min: -1, max: 4 },
                    { id: 'plantar', label: 'Permukaan Plantar', min: -1, max: 4 },
                    { id: 'breast', label: 'Payudara (Breast)', min: -1, max: 4 },
                    { id: 'eyeEar', label: 'Mata / Telinga (Eye / Ear)', min: -1, max: 4 },
                    { id: 'genitals', label: 'Alat Kelamin (Genitalia)', min: -1, max: 4 }
                  ].map(param => {
                    const selected = ballardP[param.id] ?? null;
                    const isOpen = openPhysParam === param.id;
                    const vals = Array.from({ length: param.max - param.min + 1 }, (_, i) => i + param.min);
                    const selectedDesc = selected !== null ? (ballardPhysicalDesc[param.id]?.[selected] ?? '') : null;
                    return (
                      <div key={param.id} className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-sm overflow-hidden">
                        {/* Header */}
                        <button
                          onClick={() => setOpenPhysParam(isOpen ? null : param.id)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex-shrink-0">{param.label}</span>
                            {selected !== null && (
                              <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex-shrink-0">
                                Skor: {selected}
                              </span>
                            )}
                            {selectedDesc && (
                              <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{selectedDesc}</span>
                            )}
                          </div>
                          <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {/* Body */}
                        {isOpen && (
                          <div className="border-t border-slate-100 dark:border-white/5 px-4 py-4">
                            <div className="flex flex-col gap-2">
                              {vals.map(val => {
                                const isActive = selected === val;
                                const desc = ballardPhysicalDesc[param.id]?.[val] ?? '';
                                return (
                                  <button
                                    key={val}
                                    onClick={() => { setBallardP({...ballardP, [param.id]: val}); setOpenPhysParam(null); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all active:scale-95
                                      ${isActive
                                        ? 'bg-emerald-500 text-white border-emerald-400 shadow-sm'
                                        : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                                      }`}
                                  >
                                    <span className={`text-lg font-black w-8 text-center flex-shrink-0 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`}>{val}</span>
                                    <span className={`text-sm leading-snug ${isActive ? 'text-white font-semibold' : 'text-slate-600 dark:text-slate-300'}`}>{desc}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl p-5 text-center shadow-inner">
                <span className="block font-bold text-emerald-800 dark:text-emerald-300 text-sm uppercase tracking-wider mb-1">Estimasi Usia Kehamilan (Ballard)</span>
                {ballardTotal > -12 ? (() => {
                  const totalDays = Math.round(estimatedGestationalAge * 7);
                  const weeks = Math.floor(totalDays / 7);
                  const days = totalDays % 7;
                  return (
                    <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      {weeks}<span className="text-lg"> Minggu</span>
                      {days > 0 && <> {days}<span className="text-lg"> Hari</span></>}
                    </span>
                  );
                })() : <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">--</span>}
                <span className="block text-emerald-600 dark:text-emerald-500 text-xs mt-2 font-medium">
                  Total Skor Ballard: {ballardTotal}
                </span>
              </div>

              {/* Alert klinis berdasarkan estimasi usia gestasi */}
              {ballardTotal > -12 && (() => {
                const ga = estimatedGestationalAge;
                const alerts: { color: string; title: string; items: string[] }[] = [];
                if (ga < 28) alerts.push({
                  color: 'red',
                  title: '⚠ Sangat Prematur (<28 minggu) — Pertimbangkan Segera:',
                  items: [
                    'Surfaktan profilaktik (Poractant 200 mg/kg) dalam 1–2 jam pertama (NRP 2021, ILCOR CoSTR 2022)',
                    'CPAP dini sejak ruang bersalin — hindari intubasi elektif (SUPPORT Trial, NEJM 2010)',
                    'Hipotermia terapeutik TIDAK diindikasikan pada usia gestasi <36 minggu (WHO 2022)',
                    'Konsultasi NICU tersier — risiko RDS, NEC, IVH, retinopati',
                    'Informed consent extended kepada orang tua mengenai prognosis',
                  ],
                });
                else if (ga < 32) alerts.push({
                  color: 'orange',
                  title: '⚠ Prematur (<32 minggu) — Tindakan Prioritas:',
                  items: [
                    'Surfaktan rescue jika FiO2 >0.30 pada CPAP (Neonatal CPAP or Intubation Trial — NEJM 2008)',
                    'CPAP PEEP 5–7 cmH₂O segera, hindari hiperoksia (target SpO2 90–95%)',
                    'Pertimbangkan kortikosteroid antenatal jika belum diberikan (WHO ACS guidelines 2022)',
                    'Pantau suhu ketat — bungkus plastik jika <32 minggu (NRP 8th Ed)',
                    'Skrining hipoglikemia 1–2 jam setelah lahir (GDS target >47 mg/dL)',
                    'Pertimbangkan Delayed Cord Clamping ≥60 detik jika kondisi stabil (ILCOR 2022)',
                  ],
                });
                else if (ga < 37) alerts.push({
                  color: 'amber',
                  title: 'Prematur Akhir / Late Preterm (32–<37 minggu):',
                  items: [
                    'Risiko hipoglikemia lebih tinggi — skrining GDS rutin tiap 3–4 jam (AAP 2011)',
                    'Pertimbangkan CPAP jika tanda distres napas (Silverman >3)',
                    'Pantau jaundice lebih ketat — risiko hiperbilirubinemia signifikan',
                    'IMD dan laktasi mungkin lebih sulit — konsul laktasi',
                  ],
                });
                if (alerts.length === 0) return null;
                const colorMap: Record<string, string> = {
                  red: 'bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200',
                  orange: 'bg-orange-50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-700 text-orange-800 dark:text-orange-200',
                  amber: 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200',
                };
                return alerts.map((alert, i) => (
                  <div key={i} className={`mt-4 rounded-xl border p-4 ${colorMap[alert.color]}`}>
                    <p className="font-bold text-sm mb-2">{alert.title}</p>
                    <ul className="space-y-1">
                      {alert.items.map((item, j) => (
                        <li key={j} className="text-xs flex gap-2 leading-snug">
                          <span className="mt-0.5 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ));
              })()}

              <ClinicalTheoryAccordion
                title="Teori Medis & Panduan Skor New Ballard"
                content={ballardTheoryContent}
                references={ballardReferences}
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. SILVERMAN-ANDERSON */}
      {activeScoreView === 'silverman' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <RenderBackButton />
          <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-rose-600/80 backdrop-blur-md p-4 text-white border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Skor Silverman-Anderson</h3>
                <p className="text-xs text-white/70">Penilaian distres pernapasan neonatus — Silverman & Andersen, Pediatrics 1956</p>
              </div>
              <span className={`text-3xl font-black tabular-nums px-4 py-2 rounded-xl ${silvermanTotal <= 3 ? 'bg-emerald-500/30' : silvermanTotal <= 6 ? 'bg-amber-500/30' : 'bg-rose-500/30'}`}>{silvermanTotal}</span>
            </div>
            <div className="p-4 md:p-6 space-y-4">
              {silvermanDetails.map(param => (
                <div key={param.id} className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">{param.label}</p>
                  <div className="flex gap-2">
                    {param.opts.map(opt => (
                      <DetailedScoreOption key={opt.val} val={opt.val} current={silverman[param.id] ?? null} onClick={() => setSilverman(p => ({...p, [param.id]: opt.val}))} desc={opt.desc} activeColor="bg-rose-500 border-rose-400 shadow-rose-500/30" />
                    ))}
                  </div>
                </div>
              ))}
              <div className={`rounded-2xl p-5 text-center border-2 ${silvermanTotal <= 3 ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700' : silvermanTotal <= 6 ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700' : 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-700'}`}>
                <span className={`block text-xs font-extrabold uppercase tracking-widest mb-1 ${silvermanTotal <= 3 ? 'text-emerald-600 dark:text-emerald-400' : silvermanTotal <= 6 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {silvermanTotal <= 3 ? 'Distres Napas Ringan' : silvermanTotal <= 6 ? 'Distres Napas Sedang' : '⚠ Kegagalan Napas — Segera Eskalasi'}
                </span>
                <span className={`text-4xl font-black ${silvermanTotal <= 3 ? 'text-emerald-600' : silvermanTotal <= 6 ? 'text-amber-600' : 'text-rose-600'}`}>{silvermanTotal} / 10</span>
                <span className={`block text-xs mt-2 font-semibold ${silvermanTotal <= 3 ? 'text-emerald-600/80 dark:text-emerald-400' : silvermanTotal <= 6 ? 'text-amber-600/80 dark:text-amber-400' : 'text-rose-600/80 dark:text-rose-400'}`}>
                  {silvermanTotal <= 3 ? 'Tatalaksana: O₂ nasal/hood; observasi ketat' : silvermanTotal <= 6 ? 'Tatalaksana: CPAP diindikasikan segera' : 'Tatalaksana: Intubasi + Ventilasi Mekanik'}
                </span>
              </div>
              <ClinicalTheoryAccordion
                title="Teori Medis & Panduan Skor Silverman-Anderson"
                content={
                  <div className="space-y-3 text-slate-600 dark:text-slate-350">
                    <p><strong>Skor Silverman-Anderson</strong> (1956) adalah sistem penilaian klinis 5-parameter untuk mengevaluasi keparahan gangguan pernapasan pada neonatus, terutama bayi prematur dengan Respiratory Distress Syndrome (RDS). Setiap parameter dinilai 0–2, menghasilkan total skor 0–10. Skor yang lebih tinggi menunjukkan distres yang lebih berat.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[['0–3','Ringan','bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400','O₂ nasal cannula / hood. Observasi ketat.'],['4–6','Sedang','bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400','CPAP diindikasikan. Pertimbangkan surfaktan.'],['7–10','Berat / Gagal Napas','bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400','Intubasi + Ventilasi Mekanik segera.']].map(([s,g,cls,t]) => (
                        <div key={s} className={`p-3 rounded-xl border ${cls}`}>
                          <span className="block font-black text-xs">Skor {s} — {g}</span>
                          <p className="text-[11px] mt-1 leading-normal">{t}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                }
                references={['Silverman WA & Andersen DH. Pediatrics. 1956;17(1):1–10.','WHO Pocket Book of Hospital Care for Children. 2nd Ed. 2020.','IDAI. Panduan Resusitasi Neonatus. Jakarta: BPIDAI 2022.']}
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. GIR KALKULATOR */}
      {activeScoreView === 'gir' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <RenderBackButton />
          <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-amber-500/80 backdrop-blur-md p-4 text-white border-b border-white/10">
              <h3 className="font-bold text-lg">Kalkulator GIR — Glucose Infusion Rate</h3>
              <p className="text-xs text-white/70">GIR (mg/kg/mnt) = [Rate × Konsentrasi%] ÷ [6 × BB]</p>
            </div>
            <div className="p-4 md:p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Berat Badan (kg)</label>
                  <input type="number" min="0.3" max="6" step="0.1" value={girBB} onChange={e => setGirBB(e.target.value)} placeholder="cth: 1.5" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Rate Infus (mL/jam)</label>
                  <input type="number" min="0" max="50" step="0.5" value={girRate} onChange={e => setGirRate(e.target.value)} placeholder="cth: 6" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Konsentrasi Dekstrosa</label>
                  <div className="flex flex-wrap gap-2">
                    {['5','10','12.5','15','20'].map(d => (
                      <button key={d} onClick={() => setGirDextrose(d)} className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${girDextrose === d ? 'bg-amber-500 text-white border-amber-400 shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'}`}>D{d}%</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Status Bayi</label>
                  <div className="flex gap-2">
                    <button onClick={() => setGirPreterm(false)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${!girPreterm ? 'bg-amber-500 text-white border-amber-400' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>Aterm</button>
                    <button onClick={() => setGirPreterm(true)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${girPreterm ? 'bg-amber-500 text-white border-amber-400' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>Prematur</button>
                  </div>
                </div>
              </div>
              {girValue !== null && (
                <div className={`rounded-2xl p-5 text-center border-2 ${girValue < (girPreterm ? 6 : 4) ? 'bg-sky-50 dark:bg-sky-950/20 border-sky-300 dark:border-sky-700' : girValue <= (girPreterm ? 8 : 6) ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700' : 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-700'}`}>
                  <span className={`block text-xs font-extrabold uppercase tracking-widest mb-1 ${girValue < (girPreterm ? 6 : 4) ? 'text-sky-600 dark:text-sky-400' : girValue <= (girPreterm ? 8 : 6) ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {girValue < (girPreterm ? 6 : 4) ? 'GIR Terlalu Rendah — Naikkan Rate atau Konsentrasi' : girValue <= (girPreterm ? 8 : 6) ? '✓ GIR Dalam Target' : '⚠ GIR Terlalu Tinggi — Turunkan Rate atau Konsentrasi'}
                  </span>
                  <span className={`text-4xl font-black tabular-nums ${girValue < (girPreterm ? 6 : 4) ? 'text-sky-600' : girValue <= (girPreterm ? 8 : 6) ? 'text-emerald-600' : 'text-rose-600'}`}>{girValue.toFixed(2)}</span>
                  <span className="block text-sm font-bold text-slate-500 mt-1">mg/kg/menit</span>
                  <span className="block text-xs text-slate-400 mt-2">Target {girPreterm ? 'prematur' : 'aterm'}: {girPreterm ? '6–8' : '4–6'} mg/kg/mnt</span>
                </div>
              )}
              <ClinicalTheoryAccordion
                title="Teori & Panduan GIR Neonatus"
                content={
                  <div className="space-y-3 text-slate-600 dark:text-slate-350">
                    <p>GIR adalah ukuran kecepatan glukosa yang diterima neonatus per satuan waktu. Pemantauan GIR penting untuk mencegah hipoglikemia (GIR terlalu rendah) dan hiperglikemia (GIR terlalu tinggi) pada neonatus yang bergantung pada infus glukosa.</p>
                    <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-200/60 dark:border-amber-800/30 font-mono text-xs">GIR = (Rate mL/jam × Konsentrasi %) ÷ (6 × BB kg)</div>
                    <p>Hipoglikemia neonatus didefinisikan sebagai GDA &lt;47 mg/dL. Tatalaksana awal: bolus D10% 2 mL/kg IV dalam 5 menit, diikuti peningkatan GIR secara bertahap.</p>
                  </div>
                }
                references={['Thornton PS et al. Pediatrics. 2015;135(6):1191–1197. (AAP Clinical Report)','IDAI. Panduan Hipoglikemia Neonatus. 2022.','NRP 8th Edition. AAP. 2021.']}
              />
            </div>
          </div>
        </div>
      )}

      {/* 7. SURFAKTAN KALKULATOR */}
      {activeScoreView === 'surfactan' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <RenderBackButton />
          <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-violet-600/80 backdrop-blur-md p-4 text-white border-b border-white/10">
              <h3 className="font-bold text-lg">Kalkulator Dosis Surfaktan</h3>
              <p className="text-xs text-white/70">Poractant alfa (Curosurf) · Beractant (Survanta) — Sweet et al. Neonatology 2023</p>
            </div>
            <div className="p-4 md:p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Berat Lahir (kg)</label>
                  <input type="number" min="0.3" max="6" step="0.1" value={surfBB} onChange={e => setSurfBB(e.target.value)} placeholder="cth: 1.2" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Jenis &amp; Dosis Surfaktan</label>
                  <div className="flex flex-col gap-2">
                    {([
                      { val: 'poractant-initial', label: 'Curosurf — Dosis Awal (200 mg/kg)' },
                      { val: 'poractant-repeat', label: 'Curosurf — Dosis Ulangan (100 mg/kg)' },
                      { val: 'beractant', label: 'Survanta — 100 mg/kg = 4 mL/kg' },
                    ] as { val: 'poractant-initial' | 'poractant-repeat' | 'beractant', label: string }[]).map(opt => (
                      <button key={opt.val} onClick={() => setSurfDrug(opt.val)} className={`px-3 py-2.5 rounded-xl text-xs font-bold border text-left transition-all ${surfDrug === opt.val ? 'bg-violet-500 text-white border-violet-400 shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-violet-400'}`}>{opt.label}</button>
                    ))}
                  </div>
                </div>
              </div>
              {getSurfactantResult() && (
                <div className="bg-violet-50 dark:bg-violet-950/20 border-2 border-violet-300 dark:border-violet-700 rounded-2xl p-5">
                  <span className="block text-xs font-extrabold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">{getSurfactantResult()!.note} — {getSurfactantResult()!.drug}</span>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Dosis</span>
                      <span className="text-3xl font-black text-violet-600 dark:text-violet-400">{getSurfactantResult()!.dose} <span className="text-sm">mg</span></span>
                      <span className="block text-xs text-slate-400 mt-0.5">{getSurfactantResult()!.dosePerKg}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Volume yang Diberikan</span>
                      <span className="text-3xl font-black text-violet-600 dark:text-violet-400">{getSurfactantResult()!.vol} <span className="text-sm">mL</span></span>
                    </div>
                  </div>
                </div>
              )}
              <ClinicalTheoryAccordion
                title="Teori & Panduan Terapi Surfaktan"
                content={
                  <div className="space-y-3 text-slate-600 dark:text-slate-350">
                    <p>Terapi surfaktan diindikasikan untuk RDS akibat defisiensi surfaktan, terutama pada bayi prematur &lt;32 minggu. Surfaktan eksogen menurunkan tegangan permukaan alveolar dan mencegah kolaps alveoli.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-violet-50 dark:bg-violet-950/20 p-3 rounded-xl border border-violet-200/60 dark:border-violet-800/30">
                        <strong className="text-xs text-violet-700 dark:text-violet-400 block mb-1">Poractant alfa (Curosurf)</strong>
                        <ul className="text-xs space-y-1 list-disc list-inside text-violet-600 dark:text-violet-400"><li>Konsentrasi: 120 mg/mL</li><li>Dosis awal: 200 mg/kg (1.67 mL/kg)</li><li>Ulangan: 100 mg/kg, maks 2x ulangan</li></ul>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950/30 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                        <strong className="text-xs text-slate-700 dark:text-slate-300 block mb-1">Beractant (Survanta)</strong>
                        <ul className="text-xs space-y-1 list-disc list-inside text-slate-600 dark:text-slate-400"><li>Konsentrasi: 25 mg/mL</li><li>Dosis: 100 mg/kg = 4 mL/kg</li><li>Ulangan tiap 6 jam, maks 4 dosis</li></ul>
                      </div>
                    </div>
                  </div>
                }
                references={['Sweet DG et al. European Consensus Guidelines on RDS. Neonatology. 2023;120(1):3–23.','IDAI. Panduan Surfaktan pada RDS Neonatus. 2022.','Polin RA et al. Pediatrics. 2014;133(1):156–163.']}
              />
            </div>
          </div>
        </div>
      )}

      {/* 8. INOTROPIK KALKULATOR */}
      {activeScoreView === 'inotropic' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <RenderBackButton />
          <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-cyan-600/80 backdrop-blur-md p-4 text-white border-b border-white/10">
              <h3 className="font-bold text-lg">Kalkulator Inotropik Neonatus</h3>
              <p className="text-xs text-white/70">Rate (mL/jam) = [Dosis × BB × 60] ÷ Konsentrasi — ANMF 2021 · IDAI NICU</p>
            </div>
            <div className="p-4 md:p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Berat Badan (kg)</label>
                  <input type="number" min="0.3" max="6" step="0.1" value={inoBB} onChange={e => setInoBB(e.target.value)} placeholder="cth: 2.5" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Jenis Obat</label>
                  <div className="flex gap-2">
                    <button onClick={() => setInoDrug('dopamine')} className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${inoDrug === 'dopamine' ? 'bg-cyan-500 text-white border-cyan-400 shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>Dopamin</button>
                    <button onClick={() => setInoDrug('dobutamine')} className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${inoDrug === 'dobutamine' ? 'bg-cyan-500 text-white border-cyan-400 shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>Dobutamin</button>
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">{inoDrug === 'dopamine' ? 'Dopamin: renal 2–5, kardiak 5–10, vasopresor 10–20 mcg/kg/mnt' : 'Dobutamin: inotrop 2.5–10 mcg/kg/mnt, maks 20 mcg/kg/mnt'}</p>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Target Dosis (mcg/kg/mnt)</label>
                  <div className="flex flex-wrap gap-2">
                    {(inoDrug === 'dopamine' ? ['2','5','10','15','20'] : ['2.5','5','7.5','10','20']).map(d => (
                      <button key={d} onClick={() => setInoDose(d)} className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${inoDose === d ? 'bg-cyan-500 text-white border-cyan-400 shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-400'}`}>{d}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Konsentrasi Larutan (mg/mL)</label>
                  <input type="number" min="0.1" max="20" step="0.1" value={inoConc} onChange={e => setInoConc(e.target.value)} placeholder="cth: 1.6" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" />
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">{inoBB ? `Contoh: ${inoDrug === 'dopamine' ? '30' : '25'} mg × ${inoBB} kg ÷ 50 mL = ${((parseFloat(inoDrug === 'dopamine' ? '30' : '25') * parseFloat(inoBB)) / 50).toFixed(2)} mg/mL` : 'Isikan BB untuk contoh otomatis'}</p>
                </div>
              </div>
              {inoRate && (
                <div className="bg-cyan-50 dark:bg-cyan-950/20 border-2 border-cyan-300 dark:border-cyan-700 rounded-2xl p-5 text-center">
                  <span className="block text-xs font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-1">{inoDrug === 'dopamine' ? 'Dopamin' : 'Dobutamin'} — {inoDose} mcg/kg/mnt</span>
                  <span className="text-4xl font-black text-cyan-600 dark:text-cyan-400">{inoRate} <span className="text-lg">mL/jam</span></span>
                  <span className="block text-xs text-slate-400 mt-2">Formula: ({inoDose} × {inoBB} × 60) ÷ ({inoConc} mg/mL × 1000)</span>
                </div>
              )}
              <ClinicalTheoryAccordion
                title="Teori & Panduan Terapi Inotropik Neonatus"
                content={
                  <div className="space-y-3 text-slate-600 dark:text-slate-350">
                    <p>Terapi inotropik diindikasikan pada syok neonatus (distributif, kardiogenik) yang tidak responsif terhadap resusitasi cairan. Dopamin dan dobutamin adalah agen lini pertama.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-cyan-50 dark:bg-cyan-950/20 p-3 rounded-xl border border-cyan-200/60 dark:border-cyan-800/30">
                        <strong className="text-xs text-cyan-700 dark:text-cyan-400 block mb-1">Dopamin</strong>
                        <ul className="text-xs space-y-1 list-disc list-inside text-cyan-600 dark:text-cyan-400"><li>2–5 mcg/kg/mnt: efek renal (diuresis)</li><li>5–10 mcg/kg/mnt: inotrop + kronotropik</li><li>10–20 mcg/kg/mnt: vasopresor</li></ul>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950/30 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                        <strong className="text-xs text-slate-700 dark:text-slate-300 block mb-1">Dobutamin</strong>
                        <ul className="text-xs space-y-1 list-disc list-inside text-slate-600 dark:text-slate-400"><li>Pilihan jika disfungsi miokard dominan</li><li>Dosis: 2.5–10 mcg/kg/mnt (inotrop)</li><li>Maks: 20 mcg/kg/mnt</li></ul>
                      </div>
                    </div>
                  </div>
                }
                references={['ANMF. Dobutamine Neonatal Guideline. 2021.','Brierley J et al. Crit Care Med. 2009;37(2):666–688.','IDAI. Panduan Tatalaksana Syok Neonatus. 2022.']}
              />
            </div>
          </div>
        </div>
      )}

      {/* 9. KEBUTUHAN CAIRAN */}
      {activeScoreView === 'fluid' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <RenderBackButton />
          <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-sky-600/80 backdrop-blur-md p-4 text-white border-b border-white/10">
              <h3 className="font-bold text-lg">Kalkulator Kebutuhan Cairan Neonatus</h3>
              <p className="text-xs text-white/70">Berdasarkan hari kehidupan, berat lahir, dan status gestasi — IDAI 2022 · CAHS</p>
            </div>
            <div className="p-4 md:p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Berat Badan (kg)</label>
                  <input type="number" min="0.3" max="6" step="0.1" value={fluidBB} onChange={e => setFluidBB(e.target.value)} placeholder="cth: 1.8" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Hari Kehidupan (DOL)</label>
                  <div className="flex flex-wrap gap-2">
                    {['1','2','3','4','5','6','7+'].map((d, i) => (
                      <button key={d} onClick={() => setFluidDOL(String(i + 1))} className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${fluidDOL === String(i + 1) ? 'bg-sky-500 text-white border-sky-400 shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-400'}`}>{d}</button>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Kategori Berat Lahir</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {([
                      { val: 'term', label: 'Aterm', sub: '>2500 g' },
                      { val: 'preterm-1500', label: 'Prematur', sub: '1500–2500 g' },
                      { val: 'bblr', label: 'BBLR', sub: '<1500 g' },
                      { val: 'bblsr', label: 'BBLSR', sub: '<1000 g' },
                    ] as { val: 'term' | 'preterm-1500' | 'bblr' | 'bblsr', label: string, sub: string }[]).map(opt => (
                      <button key={opt.val} onClick={() => setFluidType(opt.val)} className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${fluidType === opt.val ? 'bg-sky-500 text-white border-sky-400 shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                        <span className="block font-extrabold">{opt.label}</span>
                        <span className="block text-[10px] opacity-70">{opt.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-sky-50 dark:bg-sky-950/20 border-2 border-sky-300 dark:border-sky-700 rounded-2xl p-5 text-center">
                <span className="block text-xs font-extrabold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-2">Kebutuhan Cairan — DOL {fluidDOL === '7' ? '7+' : fluidDOL}</span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Per Berat Badan</span>
                    <span className="text-3xl font-black text-sky-600 dark:text-sky-400">{fluidMlKgDay} <span className="text-sm">mL/kg/hari</span></span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Volume Absolut</span>
                    <span className={`text-3xl font-black ${fluidAbsolute ? 'text-sky-600 dark:text-sky-400' : 'text-slate-300 dark:text-slate-600'}`}>{fluidAbsolute ? `${fluidAbsolute} mL` : '— mL'}</span>
                    {fluidAbsolute && <span className="block text-xs text-slate-400 mt-0.5">{(parseFloat(fluidAbsolute) / 24).toFixed(1)} mL/jam</span>}
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kategori</th>
                      {['DOL 1','DOL 2','DOL 3','DOL 4','DOL 5','DOL 6','DOL 7+'].map(d => <th key={d} className="text-center p-2 font-bold text-slate-500 dark:text-slate-400">{d}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {([
                      { label: 'Aterm (>2500g)', key: 'term' },
                      { label: 'Prematur 1500–2500g', key: 'preterm-1500' },
                      { label: 'BBLR <1500g', key: 'bblr' },
                      { label: 'BBLSR <1000g', key: 'bblsr' },
                    ] as { label: string, key: 'term' | 'preterm-1500' | 'bblr' | 'bblsr' }[]).map((row, i) => (
                      <tr key={row.key} className={`border-b border-slate-100 dark:border-slate-800 ${row.key === fluidType ? 'bg-sky-50 dark:bg-sky-950/30 font-bold' : i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                        <td className="p-2 text-slate-700 dark:text-slate-300 font-semibold whitespace-nowrap">{row.label}</td>
                        {fluidTable[row.key].map((v, j) => (
                          <td key={j} className={`p-2 text-center tabular-nums ${row.key === fluidType && j === dol ? 'text-sky-600 dark:text-sky-400 font-black' : 'text-slate-500 dark:text-slate-400'}`}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[10px] text-slate-400 mt-1.5 text-right">Satuan: mL/kg/hari</p>
              </div>
              <ClinicalTheoryAccordion
                title="Panduan Kebutuhan Cairan Neonatus"
                content={
                  <div className="space-y-3 text-slate-600 dark:text-slate-350">
                    <p>Manajemen cairan neonatus dimulai konservatif pada DOL 1 untuk menghindari overload cairan (risiko PDA, edema paru, NEC). Volume ditingkatkan bertahap seiring penurunan berat fisiologis dan kemampuan ginjal yang meningkat.</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Gunakan <strong>berat lahir</strong> sebagai acuan hingga bayi melampaui berat lahir kembali</li>
                      <li>Monitor output urin target: <strong>1–3 mL/kg/jam</strong></li>
                      <li>BBLSR lebih rentan kehilangan cairan transepidermal (IWL tinggi); pertimbangkan penambahan 10–20 mL/kg/hari jika di inkubator terbuka</li>
                    </ul>
                  </div>
                }
                references={['CAHS Neonatology Guidelines. Fluid and Nutrition Requirements. 2023.','IDAI. Panduan Manajemen Cairan Neonatus. 2022.','Modi N. Arch Dis Child Fetal Neonatal Ed. 2004;89(2):F108–F111.']}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
