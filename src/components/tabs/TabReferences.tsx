import { ExternalLink, BookOpen, ScrollText, BookText } from 'lucide-react';

export default function TabReferences() {
  const internationalRefs = [
    {
      title: "Neonatal Resuscitation Program (NRP) 8th Edition Guidelines",
      organization: "American Heart Association (AHA) & American Academy of Pediatrics (AAP)",
      year: "2020 / Updates 2025",
      desc: "Konsensus dan pedoman emas internasional untuk resusitasi neonatus yang berfokus pada The Golden Minute.",
      link: "https://www.aap.org/nrp"
    },
    {
      title: "Consensus on Science with Treatment Recommendations (CoSTR) for Neonatal Life Support",
      organization: "International Liaison Committee on Resuscitation (ILCOR)",
      year: "2023 Update",
      desc: "Pembaruan rutin untuk praktik resusitasi global, termasuk ventilasi, kompresi, dan panduan target oksigenasi neonatus.",
      link: "https://ilcor.org/"
    },
    {
      title: "S.T.A.B.L.E. Program Guidelines",
      organization: "The S.T.A.B.L.E. Program",
      year: "6th Edition",
      desc: "Panduan pasca-resusitasi pra-transportasi yang mencakup (Sugar, Temperature, Airway, Blood pressure, Lab work, Emotional support).",
      link: "https://stableprogram.org/"
    }
  ];

  const localRefs = [
    {
      title: "Buku Panduan Resusitasi Neonatus Edisi Ke-8",
      organization: "Ikatan Dokter Anak Indonesia (IDAI)",
      year: "2022",
      desc: "Buku rujukan utama di Indonesia yang diadaptasi dari NRP AAP/AHA untuk menyesuaikan dengan kondisi fasilitas medis nasional.",
    },
    {
      title: "Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Kegawatan Neonatus",
      organization: "Kementerian Kesehatan Republik Indonesia",
      year: "2023",
      desc: "Standar tata laksana kegawatdaruratan pada bayi baru lahir di berbagai fasilitas layanan kesehatan, termasuk penanganan asfiksia.",
    }
  ];

  const theories = [
    {
      title: "Konsep The Golden Minute",
      content: "Neonatus harus bernapas sendiri atau diberikan ventilasi dalam 60 detik pertama kehidupan. Evaluasi cepat meliputi: apakah bayi cukup bulan? tonus baik? bernapas/menangis? Jika tidak, langsung masuk ke fase resusitasi awal."
    },
    {
      title: "Langkah Koreksi VTP (MR. SOPA)",
      content: "Masker diperbaiki (Mask), Reposisi kepala (Reposition), Isap hidung lalu mulut (Suction), Buka mulut (Open), Tekanan ditingkatkan bertahap maks 40 cmH2O (Pressure), Alternatif jalan napas - Intubasi/LMA (Airway)."
    },
    {
      title: "Rasio Kompresi dan Ventilasi",
      content: "Rasio pada neonatus harus 3 kompresi : 1 ventilasi dengan kecepatan 120 kejadian per menit (90 kompresi dan 30 ventilasi). Kompresi dimulai hanya jika LDJ tetap < 60 x/menit setelah 30 detik VTP efektif."
    },
    {
      title: "Tatalaksana Hipoglikemia D10%",
      content: "Pemberian bolus D10% 2 mL/kg (setara 200 mg/kg glukosa) masuk dalam 5 menit, diikuti asupan intravena kontinu GIR (Glucose Infusion Rate) 4-8 mg/kg/menit."
    }
  ];

  return (
    <div className="w-full h-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-36">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Pustaka &amp; Referensi</h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Sumber pedoman klinis, konsensus, dan teori medis terkini untuk resusitasi neonatus
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kolom Referensi */}
        <div className="space-y-8">
          
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ScrollText className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Panduan Nasional (Lokal)</h3>
            </div>
            <div className="space-y-4">
              {localRefs.map((ref, idx) => (
                <div key={idx} className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-md shadow-slate-200/40 dark:shadow-none hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-500/50 hover:-translate-y-0.5 transition-all group">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-sm lg:text-base leading-tight mb-1">{ref.title}</h4>
                      <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-2">{ref.organization} • {ref.year}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{ref.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <BookText className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Pedoman Internasional</h3>
            </div>
            <div className="space-y-4">
              {internationalRefs.map((ref, idx) => (
                <div key={idx} className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-md shadow-slate-200/40 dark:shadow-none hover:shadow-xl hover:shadow-slate-200/50 hover:border-emerald-500/50 hover:-translate-y-0.5 transition-all group">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-sm lg:text-base leading-tight mb-1">{ref.title}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">{ref.organization} • {ref.year}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{ref.desc}</p>
                      {ref.link && (
                        <a href={ref.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors">
                          Kunjungi Referensi <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Kolom Teori Medis Terkini */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-rose-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Teori &amp; Konsep Utama Resusitasi Terkini</h3>
          </div>
          
          <div className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-900/10 p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-rose-900/30 shadow-inner">
            <div className="space-y-6">
              {theories.map((theory, idx) => (
                <div key={idx} className="relative pl-5 border-l-2 border-rose-300 dark:border-rose-800">
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-rose-500 dark:bg-rose-400 -left-[6px] top-1.5 shadow-[0_0_0_4px] shadow-rose-100 dark:shadow-slate-900" />
                  <h4 className="font-extrabold text-slate-900 dark:text-white mb-1.5">{theory.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {theory.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2 mt-4">
             <p className="text-xs text-slate-500 dark:text-slate-400 px-4">
               Semua algoritma dan perhitungan dalam <strong className="text-rose-600 dark:text-rose-400">ResneoHelper</strong> didasarkan pada referensi terkini. Aplikasi ini merupakan alat bantu kognitif (cognitive aid) dan <strong>bukan</strong> pengganti judgement klinis dokter/tenaga medis yang menangani langsung.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}
