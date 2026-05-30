import { BookText, HeartPulse, Target, BrainCircuit, Activity, Waves, Wind, Thermometer, Stethoscope, Gauge, Snowflake, HandHeart } from 'lucide-react';

export default function TabTheory() {
  return (
    <div className="w-full h-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-36">
      
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

          {/* ── TEORI BARU 1: Manajemen Oksigen ── */}
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none transition-all hover:shadow-2xl hover:shadow-slate-200/40 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-sky-100 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Manajemen Oksigen Periresusitasi</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500">NRP 8th Ed. 2021 · AAP</span>
              </div>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-350 leading-relaxed space-y-4">
              <p>
                Panduan NRP 2021 menegaskan bahwa pemberian oksigen harus <strong className="text-slate-800 dark:text-slate-200">berbasis target SpO₂ pre-duktal</strong>, bukan berdasarkan intuisi klinis. Oksigen 100% rutin tidak lagi direkomendasikan karena risiko toksisitas oksigen (ROP, kerusakan otak oksidatif).
              </p>
              <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/30 rounded-xl p-4">
                <h4 className="font-extrabold text-sky-800 dark:text-sky-300 text-xs uppercase tracking-widest mb-3">Target SpO₂ Pre-Duktal (Tangan Kanan) — NRP 2021</h4>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[['1 mnt','60–65%'],['2 mnt','65–70%'],['3 mnt','70–75%'],['4 mnt','75–80%'],['5 mnt','80–85%'],['10 mnt','85–95%']].map(([t, v]) => (
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
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Mulai dengan udara kamar <strong>21% O₂</strong>. Tingkatkan FiO₂ jika SpO₂ tidak mencapai target per menit.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 border border-slate-100 dark:border-slate-800 text-sm">
                  <strong className="text-slate-800 dark:text-slate-200">Bayi &lt;35 minggu:</strong>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Mulai dengan <strong>21–30% O₂</strong>. Gunakan blender oksigen untuk titrasi bertahap.</p>
                </div>
              </div>
              <p className="border-l-4 border-sky-300 dark:border-sky-700 pl-4 py-1 text-sm font-medium italic bg-sky-50/50 dark:bg-sky-950/10 rounded-r-lg">
                Pasang pulse oximeter di <strong>tangan/pergelangan kanan</strong> (pre-duktal) untuk pembacaan SpO₂ akurat. Hindari probe di kaki (post-duktal) karena dapat memberikan nilai rendah palsu pada kondisi pirau kanan-ke-kiri.
              </p>
            </div>
          </div>

          {/* ── TEORI BARU 2: Mekonium (MSAF) ── */}
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none transition-all hover:shadow-2xl hover:shadow-slate-200/40 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Mekonium dalam Air Ketuban (MSAF)</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">NRP 2021 · Aziz et al. Pediatrics 2020</span>
              </div>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-350 leading-relaxed space-y-4">
              <p>
                <strong>Meconium Stained Amniotic Fluid (MSAF)</strong> terjadi pada ~10–15% persalinan. Pedoman NRP 2021 mengubah pendekatan secara signifikan: <strong className="text-amber-700 dark:text-amber-400">suction trakea rutin tidak lagi direkomendasikan</strong> untuk semua bayi MSAF.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-4 border border-emerald-200/60 dark:border-emerald-800/30">
                  <h4 className="font-extrabold text-emerald-800 dark:text-emerald-300 text-xs uppercase mb-2">✓ Bayi VIGOROUS</h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-snug">Menangis kuat, tonus otot baik, HR &gt;100 x/mnt. Lakukan <strong>perawatan rutin</strong>. Tidak perlu laringoskopi atau suction trakea.</p>
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/20 rounded-xl p-4 border border-rose-200/60 dark:border-rose-800/30">
                  <h4 className="font-extrabold text-rose-800 dark:text-rose-300 text-xs uppercase mb-2">⚠ Bayi TIDAK VIGOROUS</h4>
                  <p className="text-xs text-rose-700 dark:text-rose-400 leading-snug">Tidak menangis, tonus lemah, HR &lt;100 x/mnt. <strong>Pertimbangkan laringoskopi</strong> + suction trakea jika terdapat obstruksi jalan napas yang jelas.</p>
                </div>
              </div>
              <p className="text-sm">
                Alasan utama intervensi adalah <strong>obstruksi jalan napas</strong>, bukan sekadar keberadaan mekonium. Jika tidak ada obstruksi terlihat dan VTP BVM efektif, lanjutkan VTP tanpa laringoskopi.
              </p>
            </div>
          </div>

          {/* ── TEORI BARU 3: Intubasi ET & LMA ── */}
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none transition-all hover:shadow-2xl hover:shadow-slate-200/40 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Intubasi Endotrakeal &amp; LMA</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-violet-500">NRP 8th Ed. 2021 · ILCOR 2021</span>
              </div>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-350 leading-relaxed space-y-4">
              <div className="bg-violet-50/80 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-800/30 rounded-xl p-4 text-sm">
                <strong className="text-violet-800 dark:text-violet-300 text-xs uppercase tracking-wider block mb-2">Indikasi Intubasi ET</strong>
                <ul className="list-disc list-inside space-y-1 text-xs text-violet-700 dark:text-violet-400">
                  <li>VTP BVM tidak efektif atau tidak membaik setelah langkah MR. SOPA</li>
                  <li>MSAF bayi tidak vigorous (dengan obstruksi)</li>
                  <li>Kompresi dada diperlukan (agar rasio sinkron 3:1)</li>
                  <li>Pemberian surfaktan intratrakeal</li>
                  <li>Hernia diafragmatika kongenital</li>
                </ul>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Berat Lahir</th>
                      <th className="text-center p-2 font-extrabold text-slate-700 dark:text-slate-300">Ukuran ETT (mm ID)</th>
                      <th className="text-center p-2 font-extrabold text-slate-700 dark:text-slate-300">Kedalaman di Bibir</th>
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
              <p className="text-sm">
                <strong>LMA (Laryngeal Mask Airway)</strong> ukuran 1 dapat digunakan sebagai alternatif pada bayi &gt;2 kg jika intubasi ET tidak berhasil. LMA tidak cocok untuk bayi prematur sangat kecil atau pasca-surfaktan.
              </p>
            </div>
          </div>

          {/* ── TEORI BARU 4: Kompresi Dada ── */}
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none transition-all hover:shadow-2xl hover:shadow-slate-200/40 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
                <HandHeart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Kompresi Dada Neonatus (CPR)</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500">NRP 8th Ed. 2021 · ILCOR CoSTR 2020</span>
              </div>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-350 leading-relaxed space-y-4">
              <p>
                Kompresi dada diindikasikan bila <strong className="text-rose-600 dark:text-rose-400">HR &lt;60 x/menit</strong> setelah 30 detik VTP adekuat (dada mengembang) dengan oksigen 100%. Sebelum memulai kompresi, pastikan ventilasi benar-benar efektif.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-rose-50 dark:bg-rose-950/20 rounded-xl p-4 border border-rose-200/60 dark:border-rose-800/30">
                  <h4 className="font-extrabold text-rose-800 dark:text-rose-300 text-xs uppercase mb-2">Teknik Ibu Jari Melingkar ⭐</h4>
                  <p className="text-xs text-rose-700 dark:text-rose-400 leading-snug">Kedua ibu jari di <strong>1/3 bawah sternum</strong>, jari-jari melingkari dada. Metode ini menghasilkan tekanan perfusi koroner lebih tinggi dan direkomendasikan NRP 2021.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950/30 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800/30">
                  <h4 className="font-extrabold text-slate-700 dark:text-slate-300 text-xs uppercase mb-2">Teknik 2 Jari (Alternatif)</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">Digunakan saat akses umbilikal diperlukan bersamaan. Jari tengah dan telunjuk tegak lurus di 1/3 bawah sternum.</p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <ul className="space-y-2 text-sm list-none m-0">
                  <li><strong className="text-slate-800 dark:text-slate-200">Rasio:</strong> <span className="text-rose-600 dark:text-rose-400 font-extrabold">3 kompresi : 1 ventilasi</span> (berbeda dari CPR dewasa 30:2)</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Kecepatan:</strong> 90 kompresi + 30 ventilasi = <strong>120 events/menit</strong></li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Ritme metronom:</strong> <em>"satu–dua–tiga–napas"</em> setiap siklus ~2 detik</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Kedalaman:</strong> 1/3 diameter AP dada anterior-posterior</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Evaluasi HR:</strong> Setiap 45–60 detik. Hentikan kompresi bila HR &gt;60 x/mnt.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── TEORI BARU 5: Hipotermia Terapeutik ── */}
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none transition-all hover:shadow-2xl hover:shadow-slate-200/40 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                <Snowflake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Hipotermia Terapeutik (Cooling Therapy)</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500">NICE IPG347 2021 · BAPM 2020 · ILCOR 2020</span>
              </div>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-350 leading-relaxed space-y-4">
              <p>
                Hipotermia terapeutik adalah satu-satunya neuroproteksi berbasis bukti untuk HIE sedang–berat. Terapi ini bekerja dengan <strong>menurunkan metabolisme serebral</strong> dan menghambat apoptosis sel neuron pasca-asfiksia.
              </p>
              <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200/60 dark:border-cyan-800/30 rounded-xl p-4">
                <h4 className="font-extrabold text-cyan-800 dark:text-cyan-300 text-xs uppercase tracking-widest mb-3">Kriteria Eligibilitas (Semua Harus Terpenuhi)</h4>
                <ul className="space-y-1.5 text-xs text-cyan-700 dark:text-cyan-400 list-disc list-inside">
                  <li>Usia gestasi <strong>≥36 minggu</strong></li>
                  <li>HIE sedang–berat: <strong>Thomson Score ≥5</strong> atau kriteria Sarnat II–III</li>
                  <li>Inisiasi dalam <strong>6 jam pertama</strong> setelah lahir (window of opportunity)</li>
                  <li>Tidak ada kontraindikasi (perdarahan mayor aktif, sepsis berat tak terkontrol)</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white/80 dark:bg-slate-900/40 rounded-xl p-3 border border-slate-200/60 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Target Suhu</span>
                  <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400">33–34°C</span>
                </div>
                <div className="bg-white/80 dark:bg-slate-900/40 rounded-xl p-3 border border-slate-200/60 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Durasi</span>
                  <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400">72 Jam</span>
                </div>
                <div className="bg-white/80 dark:bg-slate-900/40 rounded-xl p-3 border border-slate-200/60 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Rewarming</span>
                  <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400">0.5°C/jam</span>
                </div>
              </div>
              <p className="border-l-4 border-cyan-300 dark:border-cyan-700 pl-4 py-1 text-sm font-medium italic bg-cyan-50/50 dark:bg-cyan-950/10 rounded-r-lg">
                Monitoring ketat diperlukan: suhu rektal/esofagus kontinyu, EEG untuk deteksi kejang, GDA, elektrolit, fungsi ginjal, dan koagulasi setiap 6–12 jam selama cooling berlangsung.
              </p>
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

          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/30 dark:shadow-none transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
            <div className="flex items-center gap-2 mb-4 text-rose-600 dark:text-rose-500">
              <Thermometer className="w-5 h-5" />
              <h3 className="font-black text-sm uppercase tracking-widest">Delayed Cord Clamping</h3>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 text-justify leading-relaxed">
              Penundaan pemotongan tali pusat (DCC) selama <strong className="text-slate-700 dark:text-slate-300">30–60 detik</strong> pada bayi vigorous terbukti meningkatkan cadangan zat besi dan Hb neonatus.
            </p>
            <ul className="text-xs space-y-2 border-l border-slate-200 dark:border-slate-800 ml-1 pl-4 text-slate-700 dark:text-slate-300">
              <li><strong className="text-slate-900 dark:text-white">Aterm vigorous:</strong> DCC 30–60 detik.</li>
              <li><strong className="text-slate-900 dark:text-white">Prematur vigorous:</strong> DCC ≥30 detik.</li>
              <li><strong className="text-slate-900 dark:text-white">Tidak vigorous:</strong> Langsung resusitasi; milking tali pusat boleh jika DCC tidak aman.</li>
            </ul>
            <p className="text-[10px] text-slate-400 mt-3 italic">Ref: NRP 8th Ed. 2021, WHO 2014</p>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/30 dark:shadow-none transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
            <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-500">
              <Wind className="w-5 h-5" />
              <h3 className="font-black text-sm uppercase tracking-widest">Resusitasi Prematur</h3>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 text-justify leading-relaxed">
              Bayi prematur (&lt;35 minggu) memerlukan pertimbangan khusus karena paru imatur, kulit tipis, dan risiko IVH lebih tinggi.
            </p>
            <ul className="text-xs space-y-2 border-l border-slate-200 dark:border-slate-800 ml-1 pl-4 text-slate-700 dark:text-slate-300">
              <li><strong className="text-slate-900 dark:text-white">&lt;32 mgg:</strong> Bungkus plastik polietilen segera setelah lahir (tanpa dikeringkan) untuk mencegah kehilangan panas.</li>
              <li><strong className="text-slate-900 dark:text-white">Oksigen:</strong> Mulai 21–30%, titrasi dengan pulse oximeter.</li>
              <li><strong className="text-slate-900 dark:text-white">VTP:</strong> Tekanan awal 20–25 cmH₂O (lebih rendah dari aterm).</li>
              <li><strong className="text-slate-900 dark:text-white">Surfaktan:</strong> Pertimbangkan dini bila &lt;30 minggu.</li>
            </ul>
            <p className="text-[10px] text-slate-400 mt-3 italic">Ref: NRP 8th Ed. 2021, IDAI 2022</p>
          </div>

        </div>

      </div>
    </div>
  );
}
