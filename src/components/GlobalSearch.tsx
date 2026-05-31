import { useState, useEffect, useRef, useMemo } from 'react';
import { TabType } from '../types';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  tab: TabType;
  badge: string;
  badgeColor: string;
  action?: string; // e.g. score view id
}

export const SEARCH_INDEX: SearchItem[] = [
  // === EMERGENCY TAB ===
  { id: 'e-prep', title: 'Fase 0: Persiapan Resusitasi', description: 'Checklist tim, alat, estimasi BB, usia gestasi sebelum bayi lahir', keywords: ['persiapan','checklist','tim','alat','fase 0','briefing','nrp'], tab: 'emergency', badge: 'Resusitasi', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 'e-init', title: 'Langkah Awal (Golden Minute)', description: 'Skrining cepat, stimulasi, hangatkan, posisi, isap sekret', keywords: ['golden minute','initial steps','stimulasi','isap','suction','60 detik'], tab: 'emergency', badge: 'Resusitasi', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 'e-vtp', title: 'Ventilasi Tekanan Positif (VTP)', description: 'BVM/T-piece, teknik SRIBTA, evaluasi LDJ, 40–60x/menit', keywords: ['vtp','ventilasi','sribta','bvm','t-piece','ldj','frekuensi','napas'], tab: 'emergency', badge: 'Resusitasi', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 'e-cpap', title: 'CPAP Neonatus', description: 'PEEP 5–7 cmH₂O, indikasi, penyesuaian FiO2, evaluasi distres', keywords: ['cpap','peep','fio2','distres','napas','prematur'], tab: 'emergency', badge: 'Resusitasi', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 'e-kompr', title: 'Kompresi Dada Neonatus', description: 'Teknik dua jempol, rasio 3:1, 120 siklus/menit, kedalaman 1/3 AP', keywords: ['kompresi','dada','jantung','3:1','cardiac','compressions','dua jempol'], tab: 'emergency', badge: 'Resusitasi', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 'e-adr', title: 'Adrenalin / Epinefrin Neonatus', description: 'Dosis 0.1–0.3 mL/kg IV/IO (1:10.000), pengulangan tiap 3–5 menit', keywords: ['adrenalin','epinefrin','epinephrine','dosis','iv','io','obat','emergency'], tab: 'emergency', badge: 'Resusitasi', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 'e-vent', title: 'Setting Ventilator Mekanik', description: 'PIP, PEEP, RR, Ti, FiO2, tidal volume berdasarkan BB dan diagnosis paru', keywords: ['ventilator','pip','peep','rr','ti','fio2','tidal volume','intubasi','ett'], tab: 'emergency', badge: 'Resusitasi', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 'e-anthr', title: 'Antropometri Neonatus', description: 'Input BB Lahir, PB, LK, LD, LiLA — autofill ke seluruh kalkulator', keywords: ['antropometri','bbl','pb','lk','ld','lila','berat lahir','panjang','kepala','dada'], tab: 'emergency', badge: 'Resusitasi', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },

  // === SCORES TAB ===
  { id: 's-apgar', title: 'Skor APGAR', description: 'Appearance, Pulse, Grimace, Activity, Respiration — menit 1, 5, 10', keywords: ['apgar','appearance','pulse','grimace','activity','respiration','warna','denyut','tonus'], tab: 'scores', badge: 'Skor', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 's-downe', title: 'Skor Downe', description: 'Penilaian distres napas: frekuensi, retraksi, sianosis, air entry, merintih', keywords: ['downe','distres napas','retraksi','sianosis','grunting','merintih','air entry'], tab: 'scores', badge: 'Skor', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 's-thomson', title: 'Skor Thomson (HIE)', description: 'Penilaian ensefalopati hipoksik-iskemik, indikasi terapi pendinginan', keywords: ['thomson','hie','ensefalopati','hipoksia','pendinginan','cooling','hipotermia terapeutik'], tab: 'scores', badge: 'Skor', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 's-ballard', title: 'Skor New Ballard', description: 'Estimasi usia gestasi dari kematangan neuromuskular dan fisik', keywords: ['ballard','usia gestasi','kematangan','neuromuskular','fisik','posture','square window','lanugo'], tab: 'scores', badge: 'Skor', badgeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' },
  { id: 's-silverman', title: 'Skor Silverman-Anderson', description: 'RDS/distres napas prematur: gerak dada, retraksi, cuping hidung, grunting', keywords: ['silverman','anderson','rds','distres','retraksi','cuping','grunting','prematur'], tab: 'scores', badge: 'Skor', badgeColor: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' },
  { id: 's-gir', title: 'Kalkulator GIR', description: 'Glucose Infusion Rate — hitung kebutuhan dextrose mg/kg/menit', keywords: ['gir','glukosa','dextrose','infus','glucose infusion rate','hipoglikemia'], tab: 'scores', badge: 'Kalkulator', badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' },
  { id: 's-surf', title: 'Kalkulator Surfaktan', description: 'Dosis Poractant alfa (Curosurf) 200/100 mg/kg dan Beractant (Survanta)', keywords: ['surfaktan','curosurf','survanta','poractant','beractant','rds','prematur','dosis'], tab: 'scores', badge: 'Kalkulator', badgeColor: 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300' },
  { id: 's-ino', title: 'Kalkulator Inotropik', description: 'Dopamin & Dobutamin — konversi mcg/kg/menit ke mL/jam', keywords: ['dopamin','dobutamin','inotropik','inotrope','mcg','dosis','infus','syok'], tab: 'scores', badge: 'Kalkulator', badgeColor: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300' },
  { id: 's-fluid', title: 'Kalkulator Kebutuhan Cairan', description: 'Volume cairan harian neonatus berdasarkan hari kehidupan dan BB', keywords: ['cairan','fluid','mL/kg/hari','hari kehidupan','dol','aterm','prematur','bblr'], tab: 'scores', badge: 'Kalkulator', badgeColor: 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300' },

  // === THEORY TAB ===
  { id: 't-golden', title: 'The Golden Minute', description: 'Prinsip 60 detik pertama resusitasi, keputusan VTP berdasarkan HR dan napas', keywords: ['golden minute','60 detik','hr','napas','vtp','keputusan','nrp'], tab: 'theory', badge: 'Teori', badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' },
  { id: 't-trans', title: 'Transisi Kardiopulmonal', description: 'Fisiologi penutupan duktus arteriosus dan foramen ovale saat lahir', keywords: ['transisi','kardiopulmonal','duktus arteriosus','foramen ovale','fisiologi','sirkulasi'], tab: 'theory', badge: 'Teori', badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' },
  { id: 't-oksigen', title: 'Manajemen Oksigen Periresusitasi', description: 'Target SpO2 NRP 2021, titrasi FiO2, blender oksigen, hiperoksia', keywords: ['oksigen','spo2','fio2','blender','hiperoksia','target','nrp 2021'], tab: 'theory', badge: 'Teori', badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' },
  { id: 't-mekon', title: 'Mekonium / MSAF', description: 'Pendekatan NRP 2021: vigorous vs non-vigorous, tidak rutin suction orofaringeal', keywords: ['mekonium','msaf','meconium','vigorous','suction','aspirasi','air ketuban'], tab: 'theory', badge: 'Teori', badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' },
  { id: 't-intubasi', title: 'Intubasi ET & LMA', description: 'Ukuran ETT berdasarkan BB, kedalaman bibir, indikasi, teknik', keywords: ['intubasi','ett','lma','tube','ukuran','kedalaman','laringoskop','blade'], tab: 'theory', badge: 'Teori', badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' },
  { id: 't-kompr', title: 'Kompresi Dada Teori', description: 'Teknik dua jempol, titik penekanan, koordinasi VTP 3:1, evaluasi', keywords: ['kompresi','dua jempol','3:1','teknik','evaluasi','koordinasi'], tab: 'theory', badge: 'Teori', badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' },
  { id: 't-hipotermia', title: 'Hipotermia Terapeutik (TTM)', description: 'Pendinginan 33–34°C selama 72 jam untuk HIE sedang-berat ≥36 minggu', keywords: ['hipotermia','terapeutik','pendinginan','cooling','ttm','33','34','hie','thomson'], tab: 'theory', badge: 'Teori', badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' },
  { id: 't-dcc', title: 'Delayed Cord Clamping (DCC)', description: 'Penundaan pemotongan tali pusat ≥60 detik, manfaat untuk prematur dan aterm', keywords: ['dcc','delayed cord clamping','tali pusat','cord','pemotongan','ilcor'], tab: 'theory', badge: 'Teori', badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' },
  { id: 't-prematur', title: 'Resusitasi Neonatus Prematur', description: 'Pertimbangan khusus prematur: bungkus plastik, suhu, surfaktan, CPAP dini', keywords: ['prematur','preterm','bblr','plastik','suhu','surfaktan','cpap','dini'], tab: 'theory', badge: 'Teori', badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' },

  // === ADVANCED TAB ===
  { id: 'a-lubchenco', title: 'Kurva Pertumbuhan Lubchenco', description: 'Klasifikasi AGA/SGA/LGA berdasarkan BB lahir dan usia gestasi', keywords: ['lubchenco','pertumbuhan','aga','sga','lga','kurva','berat lahir','percentil'], tab: 'advanced', badge: 'Pertumbuhan', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 'a-gds', title: 'Hipoglikemia Neonatus', description: 'Manajemen GDS rendah, bolus D10%, target >47 mg/dL', keywords: ['hipoglikemia','gds','glukosa','dextrose','d10','bolus','gula darah'], tab: 'advanced', badge: 'Pertumbuhan', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 'a-gir2', title: 'GIR & Pengenceran Dextrose', description: 'Hitung konsentrasi dextrose, mixing D10/D40/WFI untuk target GIR', keywords: ['gir','dextrose','d10','d40','wfi','konsentrasi','pengenceran','campuran'], tab: 'advanced', badge: 'Pertumbuhan', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 'a-ino2', title: 'Dopamin & Dobutamin (Pengenceran)', description: 'Hitung mg obat, volume spuit, dan kecepatan infus inotropik', keywords: ['dopamin','dobutamin','spuit','pengenceran','inotrope','syok','kardiovaskular'], tab: 'advanced', badge: 'Pertumbuhan', badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
  { id: 's-flacc', title: 'Skor FLACC Nyeri Neonatus', description: 'Penilaian nyeri: wajah, kaki, aktivitas, tangisan, ketenangan — 0 hingga 10', keywords: ['flacc','nyeri','pain','neonatus','wajah','tangisan','kaki'], tab: 'scores', badge: 'Skor', badgeColor: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' },
  { id: 's-nips', title: 'Skor NIPS Nyeri Neonatus', description: 'Neonatal Infant Pain Scale — prematur dan aterm, evaluasi respons prosedural', keywords: ['nips','nyeri','pain','prematur','neonatal infant pain scale','prosedur'], tab: 'scores', badge: 'Skor', badgeColor: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' },
  { id: 'a-tpn', title: 'Kalkulator TPN Neonatus', description: 'Total Parenteral Nutrition: glukosa, protein, lipid, elektrolit harian untuk BBLR/prematur', keywords: ['tpn','parenteral','nutrisi','glukosa','protein','lipid','elektrolit','bblr','prematur'], tab: 'advanced', badge: 'Kalkulator', badgeColor: 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300' },
  { id: 'a-fenton', title: 'Kurva Pertumbuhan Fenton 2013', description: 'Klasifikasi SGA/AGA/LGA berdasarkan BB lahir dan GA 22–42 minggu, grafik persentil', keywords: ['fenton','pertumbuhan','sga','aga','lga','kurva','persentil','bb lahir','prematur'], tab: 'advanced', badge: 'Pertumbuhan', badgeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' },

  // === REFERENCES TAB ===
  { id: 'r-idai', title: 'IDAI 2022 — Resusitasi Neonatus', description: 'Panduan resusitasi neonatus Ikatan Dokter Anak Indonesia edisi 2022', keywords: ['idai','2022','resusitasi','panduan','indonesia','lokal'], tab: 'references', badge: 'Referensi', badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300' },
  { id: 'r-nrp', title: 'NRP 8th Edition (AAP/AHA 2021)', description: 'Neonatal Resuscitation Program edisi terbaru AAP dan AHA', keywords: ['nrp','aap','aha','2021','neonatal resuscitation program','8th'], tab: 'references', badge: 'Referensi', badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300' },
  { id: 'r-ilcor', title: 'ILCOR CoSTR 2022', description: 'International Liaison Committee on Resuscitation — Consensus on Science', keywords: ['ilcor','costr','2022','consensus','international'], tab: 'references', badge: 'Referensi', badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300' },
  { id: 'r-stable', title: 'S.T.A.B.L.E. Program 6th Ed', description: 'Post-resuscitation stabilization: Sugar, Temperature, Airway, Blood pressure, Lab, Emotional', keywords: ['stable','sugar','temperature','airway','blood pressure','lab','stabilisasi'], tab: 'references', badge: 'Referensi', badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300' },
];

interface GlobalSearchProps {
  onNavigate: (tab: TabType) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ onNavigate, isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.keywords.some(k => k.includes(q))
    ).slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in slide-in-from-top-4 zoom-in-95 duration-200">

        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari skor, kalkulator, teori, prosedur..."
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <kbd className="hidden sm:block text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono border border-slate-200 dark:border-slate-700">ESC</kbd>
        </div>

        {/* Results */}
        {query.length >= 2 && (
          <div className="max-h-[60vh] overflow-y-auto">
            {results.length > 0 ? (
              <ul className="py-2">
                {results.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => { onNavigate(item.tab); onClose(); }}
                      className="w-full flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-sm text-slate-900 dark:text-white truncate">{item.title}</span>
                          <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded flex-shrink-0 ${item.badgeColor}`}>{item.badge}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">{item.description}</p>
                      </div>
                      <svg className="w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-10 text-center text-slate-400 dark:text-slate-500">
                <svg className="w-8 h-8 mx-auto mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm font-medium">Tidak ada hasil untuk <span className="font-bold text-slate-600 dark:text-slate-300">"{query}"</span></p>
              </div>
            )}
          </div>
        )}

        {/* Empty state / hint */}
        {query.length < 2 && (
          <div className="px-4 py-4">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Pencarian Cepat</p>
            <div className="flex flex-wrap gap-2">
              {['APGAR','Ballard','CPAP','Surfaktan','Adrenalin','GIR','HIE','Ventilator'].map(hint => (
                <button
                  key={hint}
                  onClick={() => setQuery(hint.toLowerCase())}
                  className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors font-medium"
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
