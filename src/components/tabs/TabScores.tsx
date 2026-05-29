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
  const [activeScoreView, setActiveScoreView] = useState<'menu' | 'apgar' | 'downe' | 'thomson' | 'ballard'>('menu');
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

  const BallardSVGs = ({ type, val }: { type: string, val: number }) => {
    if (type === 'squareWindow') {
      let angle = val === -1 ? 120 : val === 0 ? 90 : val === 1 ? 60 : val === 2 ? 45 : val === 3 ? 30 : 0;
      return (
        <svg width="40" height="40" viewBox="0 0 60 60" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 drop-shadow-sm">
          <g transform={`translate(-5, 0)`}>
            <path d="M10 40 L 40 40" strokeWidth="6" fill="currentColor" fillOpacity="0.1" />
            <path d="M10 40 L 40 40" strokeWidth="3" />
            <g transform={`rotate(${-angle}, 40, 40)`}>
              <path d="M40 40 L 55 40" strokeWidth="5" />
              <path d="M55 40 Q 60 40 60 38 L 45 38" strokeWidth="3" />
              <path d="M58 38 Q 62 38 62 35 L 43 35" strokeWidth="2" opacity="0.6"/>
              <path d="M58 35 Q 61 35 61 32 L 42 32" strokeWidth="2" opacity="0.6"/>
              <path d="M55 32 Q 58 32 58 29 L 40 29" strokeWidth="2" opacity="0.6"/>
            </g>
          </g>
        </svg>
      );
    }
    if (type === 'armRecoil') {
       let angle = val === 0 ? 180 : val === 1 ? 150 : val === 2 ? 120 : val === 3 ? 100 : 70;
       return (
         <svg width="40" height="40" viewBox="0 0 60 60" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 drop-shadow-sm">
            <path d="M25 15 L 25 35" strokeWidth="5" />
            <circle cx="25" cy="15" r="4" fill="currentColor" fillOpacity="0.2" stroke="none" />
            <g transform={`rotate(${-angle + 90}, 25, 35)`}>
              <path d="M25 35 L 25 55" strokeWidth="4" />
              <circle cx="25" cy="55" r="3" fill="currentColor" stroke="none" />
            </g>
         </svg>
       )
    }
    if (type === 'popliteal') {
       let a = val === -1 ? 180 : val === 0 ? 160 : val === 1 ? 140 : val === 2 ? 120 : val === 3 ? 100 : val === 4 ? 90 : 70;
       return (
         <svg width="40" height="40" viewBox="0 0 60 60" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 drop-shadow-sm pb-1">
            <path d="M5 45 L 25 45" strokeWidth="4" />
            <rect x="5" y="41" width="20" height="8" rx="4" fill="currentColor" fillOpacity="0.05" stroke="none" />
            <path d="M25 45 L 25 20" strokeWidth="5" />
            <g transform={`rotate(${a - 180}, 25, 20)`}>
              <path d="M25 20 L 45 20" strokeWidth="4" />
              <path d="M45 20 L 50 15" strokeWidth="3" />
            </g>
         </svg>
       )
    }
    if (type === 'posture') {
      return (
         <svg width="40" height="40" viewBox="0 0 60 60" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 drop-shadow-sm">
            <circle cx="30" cy="14" r="7" fill="currentColor" fillOpacity="0.1"/>
            <rect x="23" y="21" width="14" height="20" rx="6" fill="currentColor" fillOpacity="0.05" strokeWidth="2" />
            {val === 0 && (
              <>
                <path d="M23 24 Q 15 26 13 35" />
                <path d="M37 24 Q 45 26 47 35" />
                <path d="M25 41 Q 23 50 20 58" />
                <path d="M35 41 Q 37 50 40 58" />
              </>
            )}
            {val === 1 && (
              <>
                <path d="M23 24 Q 15 26 13 35" />
                <path d="M37 24 Q 45 26 47 35" />
                <path d="M25 41 Q 18 45 15 50" />
                <path d="M35 41 Q 42 45 45 50" />
              </>
            )}
            {val === 2 && (
              <>
                <path d="M23 24 Q 14 26 14 36" />
                <path d="M37 24 Q 46 26 46 36" />
                <path d="M25 41 Q 15 42 16 48 L 19 50" />
                <path d="M35 41 Q 45 42 44 48 L 41 50" />
              </>
            )}
            {val === 3 && (
              <>
                <path d="M23 24 Q 15 23 14 28 T 17 31" />
                <path d="M37 24 Q 45 23 46 28 T 43 31" />
                <path d="M25 41 Q 15 39 16 46 L 21 48" />
                <path d="M35 41 Q 45 39 44 46 L 39 48" />
              </>
            )}
            {val === 4 && (
              <>
                <path d="M23 25 Q 16 23 16 28 T 21 31" />
                <path d="M37 25 Q 44 23 44 28 T 39 31" />
                <path d="M26 40 Q 15 36 17 44 L 24 45" />
                <path d="M34 40 Q 45 36 43 44 L 36 45" />
              </>
            )}
         </svg>
      )
    }
    if (type === 'scarf') {
       let x = val === -1 ? 55 : val === 0 ? 45 : val === 1 ? 35 : val === 2 ? 30 : val === 3 ? 20 : 10;
       return (
         <svg width="40" height="40" viewBox="0 0 60 60" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" className="opacity-80 drop-shadow-sm">
           <circle cx="30" cy="18" r="8" fill="currentColor" fillOpacity="0.1" />
           <rect x="22" y="28" width="16" height="22" rx="6" fill="currentColor" fillOpacity="0.05" strokeWidth="2" />
           <path d="M30 28 L30 50" strokeDasharray="3 3" />
           <path d="M18 30 C 22 36, 28 36, 42 30" strokeWidth="4" />
           <path d={`M42 30 L ${x} 40`} strokeWidth="4" />
           <circle cx={x} cy="40" r="3" fill="currentColor" stroke="none" />
         </svg>
       )
    }
    if (type === 'heelEar') {
       let a = val === -1 ? 90 : val === 0 ? 80 : val === 1 ? 60 : val === 2 ? 45 : val === 3 ? 20 : 0;
       return (
         <svg width="40" height="40" viewBox="0 0 60 60" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 drop-shadow-sm pr-1">
           <circle cx="20" cy="15" r="7" fill="currentColor" fillOpacity="0.1"/>
           <rect x="15" y="24" width="10" height="20" rx="4" fill="currentColor" fillOpacity="0.05" strokeWidth="2"/>
           <g transform={`rotate(${-a - 10}, 20, 42)`}>
             <path d="M20 42 L 50 42" strokeWidth="4" />
             <path d="M50 42 L 53 37" strokeWidth="3" />
           </g>
         </svg>
       )
    }
    return null;
  }

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
                <span>ESTIMASI: {ballardTotal > -12 ? `${estimatedGestationalAge.toFixed(1)} Mgg` : "Belum Diisi"}</span>
                <span className="text-emerald-500 dark:text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Buka Alat →</span>
              </div>
            </div>

          </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { id: 'posture', label: 'Postur Tubuh (Posture)', min: 0, max: 4 },
                    { id: 'squareWindow', label: 'Sudut Pergelangan (Square Window)', min: -1, max: 4 },
                    { id: 'armRecoil', label: 'Pemantulan Lengan (Arm Recoil)', min: 0, max: 4 },
                    { id: 'popliteal', label: 'Sudut Popliteal (Popliteal Angle)', min: -1, max: 5 },
                    { id: 'scarf', label: 'Tanda Scarf (Scarf Sign)', min: -1, max: 4 },
                    { id: 'heelEar', label: 'Tumit ke Telinga (Heel to Ear)', min: -1, max: 4 }
                  ].map(param => (
                    <div key={param.id} className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-sm flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-350 block mb-3 uppercase tracking-wider">{param.label}</span>
                      <div className="flex gap-1.5 flex-1 items-stretch min-h-[3.5rem]">
                        {Array.from({ length: param.max - param.min + 1 }, (_, i) => i + param.min).map(val => (
                          <DetailedScoreOption
                            key={val}
                            val={val}
                            current={ballardN[param.id] ?? null}
                            onClick={() => setBallardN({...ballardN, [param.id]: val})}
                            svg={<BallardSVGs type={param.id} val={val} />}
                            activeColor="bg-emerald-500 border-emerald-400 shadow-emerald-500/30"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 border-b border-slate-200 dark:border-white/10 pb-2">Kematangan Fisik</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'skin', label: 'Kulit (Skin)', min: -1, max: 5 },
                    { id: 'lanugo', label: 'Lanugo (Rambut Halus)', min: -1, max: 4 },
                    { id: 'plantar', label: 'Permukaan Plantar', min: -1, max: 4 },
                    { id: 'breast', label: 'Payudara (Breast)', min: -1, max: 4 },
                    { id: 'eyeEar', label: 'Mata / Telinga (Eye / Ear)', min: -1, max: 4 },
                    { id: 'genitals', label: 'Alat Kelamin (Genitalia)', min: -1, max: 4 }
                  ].map(param => (
                    <div key={param.id} className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-350 block mb-2">{param.label}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {Array.from({ length: param.max - param.min + 1 }, (_, i) => i + param.min).map(val => (
                          <CompactScoreOption key={val} val={val} current={ballardP[param.id] ?? null} onClick={() => setBallardP({...ballardP, [param.id]: val})} activeColor="bg-emerald-500 border-emerald-400 shadow-emerald-500/30" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl p-5 text-center shadow-inner">
                <span className="block font-bold text-emerald-800 dark:text-emerald-300 text-sm uppercase tracking-wider mb-1">Estimasi Usia Kehamilan (Ballard)</span>
                <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {ballardTotal > -12 ? estimatedGestationalAge.toFixed(1) : '--'} <span className="text-lg">Minggu</span>
                </span>
                <span className="block text-emerald-600 dark:text-emerald-500 text-xs mt-2 font-medium">
                  Total Skor Ballard: {ballardTotal}
                </span>
              </div>

              <ClinicalTheoryAccordion 
                title="Teori Medis & Panduan Skor New Ballard" 
                content={ballardTheoryContent} 
                references={ballardReferences} 
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
