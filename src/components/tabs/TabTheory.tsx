import { BookText, HeartPulse, Target, BrainCircuit, Activity, Waves } from 'lucide-react';

export default function TabTheory() {
  return (
    <div className="w-full h-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-450 flex items-center justify-center">
          <BookText className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Materi &amp; Teori Medis</h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Penjelasan teoritis mendalam, fisiologi transisi neonatus, dan fundamental praktik resusitasi IDAI.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Utama 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none transition-all hover:shadow-2xl hover:shadow-slate-200/40 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">The Golden Minute (Menit Emas)</h3>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-350 leading-relaxed space-y-4">
              <p>
                Konsep <strong className="text-slate-800 dark:text-slate-200">The Golden Minute</strong> menegaskan bahwa neonatus harus mulai bernapas sendiri atau diberikan ventilasi bantuan dalam <strong className="text-orange-600 dark:text-orange-400">60 detik pertama kehidupan</strong>. Kegagalan melakukan hal ini dapat menyebabkan asfiksia berkepanjangan, kerusakan otak ireversibel (HIE - Hypoxic Ischemic Encephalopathy), dan kematian.
              </p>
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-805">
                <ul className="list-disc list-inside space-y-2 m-0 text-sm">
                  <li><strong>Penilaian Awal (0-30 detik):</strong> Evaluasi tonus otot, usaha napas / menangis, dan usia gestasi saat bayi lahir. Lakukan langkah awal (hangatkan, posisikan kepala, isap lendir, keringkan, stimulasi).</li>
                  <li><strong>Intervensi Cepat (30-60 detik):</strong> Kaji LDJ (Laju Denyut Jantung). Bila bayi megap-megap, apnu, atau LDJ &lt; 100x/menit, segera inisiasi Ventilasi Tekanan Positif (VTP).</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none transition-all hover:shadow-2xl hover:shadow-slate-200/40 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Fisiologi Transisi Kardiopulmonal</h3>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-350 leading-relaxed text-justify space-y-4">
              <p>
                Ketika bayi lahir, paru-paru yang tadinya penuh cairan harus segera digantikan oleh udara. Pemotongan tali pusat menghentikan aliran darah kaya oksigen dari plasenta, mengakibatkan <strong>hiperkarbia sementara</strong> (peningkatan CO₂) dan stimulasi kemoreseptor yang memicu napas pertama.
              </p>
              <p>
                Napas pertama yang dalam mendorong cairan keluar dari alveoli, memasukkan oksigen yang memicu <strong>vasodilatasi kapiler paru</strong>. Tekanan di atrium kiri meningkat melampaui atrium kanan, yang kemudian secara fungsional menutup Foramen Ovale dan Ductus Arteriosus.
              </p>
              <p className="border-l-4 border-rose-300 dark:border-rose-700 pl-4 py-1 text-sm font-medium italic bg-rose-50/50 dark:bg-rose-950/10 rounded-r-lg">
                Masalah terjadi ketika bayi tidak bisa bernapas efektif (apnu). Hipoksia menyebabkan vasokonstriksi paru ireversibel (Hipertensi Pulmonal Persisten), menghambat aliran darah ke paru-paru dan menurunkan LDJ (bradikardi). Ventilasi buatan (VTP) adalah terapi utama.
              </p>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none transition-all hover:shadow-2xl hover:shadow-slate-200/40 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Dosis &amp; Farmakologi Darurat</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-slate-50/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/80 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                 <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mb-2 border-b border-slate-200/70 dark:border-white/5 pb-2">Epinefrin (Adrenalin) 1:10.000</h4>
                 <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                   <strong>Indikasi:</strong> LDJ konsisten &lt; 60x/menit meskipun telah diberikan VTP efektif (dada mengembang) dan kompresi dada yang sinkron (rasio 3:1) dengan oksigen 100% selama 30-60 detik. <br/><br/>
                   <strong>Mekanisme Kardio:</strong> Stimulasi reseptor Alpha-Adrenergik menyebabkan vasokonstriksi, sehingga memompa aliran darah koroner langsung ke otot jantung.
                 </p>
               </div>
               <div className="bg-slate-50/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/80 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                 <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mb-2 border-b border-slate-200/70 dark:border-white/5 pb-2">Salin Normal (NaCl 0.9%)</h4>
                 <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                   <strong>Indikasi:</strong> Resusitasi volume pada kecurigaan syok hipovolemik absolut (bayi pucat menetap walau sudah oksigenasi adekuat, pulsasi lemah, atau ada riwayat perdarahan solusio plasenta/plasenta previa). <br/><br/>
                   <strong>Aturan:</strong> 10 mL/kg diberikan perlahan (slow push) selama 5-10 menit via akses vena umbilikal (UVC) agar tidak membebani vaskuler otak (risiko perdarahan ventrikel/IVH pada prematur).
                 </p>
               </div>
            </div>
          </div>

        </div>

        {/* Kolom Kanan 1/3 */}
        <div className="space-y-6">
          
          <div className="bg-indigo-50/80 dark:bg-slate-900/90 backdrop-blur-sm border border-indigo-100/80 dark:border-indigo-900/50 p-6 rounded-3xl shadow-lg shadow-indigo-100/50 dark:shadow-none hover:shadow-xl hover:shadow-indigo-100/60 transition-all hover:-translate-y-1">
            <h3 className="text-base font-extrabold text-indigo-900 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4" />
              MR. SOPA
            </h3>
            <p className="text-xs text-indigo-800/80 dark:text-slate-400 leading-relaxed mb-4">
              Langkah koreksi jalan napas dan ventilasi. Wajib dilakukan bila ekspansi dada tidak terlihat selama VTP awal.
            </p>
            <div className="flex flex-col gap-2">
              {[
                { l: 'M', word: 'Mask Adjustment', t: 'Perbaiki posisi perlekatan sungkup di wajah bayi agar tidak bocor.' },
                { l: 'R', word: 'Reposition Airway', t: 'Baringkan kepala pada posisi menghidu (sniffing position).' },
                { l: 'S', word: 'Suction', t: 'Isap lendir di mulut lalu hidung (M before N).' },
                { l: 'O', word: 'Open Mouth', t: 'Buka mulut bayi sedikit saat memberikan ventilasi.' },
                { l: 'P', word: 'Pressure Increase', t: 'Naikkan tekanan PIP secara bertahap hingga dada mengembang (maks 40 cmH2O).' },
                { l: 'A', word: 'Airway Alternative', t: 'Pertimbangkan segera pemasangan Intubasi Endotrakeal (ETT) atau LMA.' }
              ].map((sopa, i) => (
                <div key={i} className="flex gap-3 bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-indigo-100 dark:border-slate-800">
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-500 text-lg">{sopa.l}</span>
                  <div>
                    <h5 className="font-bold text-[11px] text-slate-800 dark:text-slate-200">{sopa.word}</h5>
                    <p className="text-[10px] text-slate-500">{sopa.t}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/30 dark:shadow-none transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
            <div className="flex items-center gap-2 mb-4 text-cyan-600 dark:text-cyan-500">
              <Waves className="w-5 h-5" />
              <h3 className="font-black text-sm uppercase tracking-widest">S.T.A.B.L.E Program</h3>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 text-justify">
              Mnemonic untuk stabilisasi paska-resusitasi berisiko tinggi saat menunggu rujukan/transport NICU.
            </p>
            <ul className="text-xs space-y-2 border-l border-slate-200 dark:border-slate-800 ml-1 pl-4 text-slate-700 dark:text-slate-300 font-medium">
              <li><strong className="text-slate-900 dark:text-white">S</strong> = Sugar &amp; Safe Care (IV D10%).</li>
              <li><strong className="text-slate-900 dark:text-white">T</strong> = Temperature (Mencegah hipotermia prematur).</li>
              <li><strong className="text-slate-900 dark:text-white">A</strong> = Airway (Oksigenasi stabil).</li>
              <li><strong className="text-slate-900 dark:text-white">B</strong> = Blood Pressure (Bolus, Dopamin).</li>
              <li><strong className="text-slate-900 dark:text-white">L</strong> = Laboratory (Kultur darah, AGD).</li>
              <li><strong className="text-slate-900 dark:text-white">E</strong> = Emotional Support (Orang tua).</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
