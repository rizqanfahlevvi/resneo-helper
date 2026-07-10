import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
      <p>
        Glukosa adalah bahan bakar utama otak neonatus. Hipoglikemia berat/berkepanjangan/berulang dikaitkan cedera neuron (terutama korteks oksipital) &amp; luaran neurodevelopmental buruk. Karena tidak ada ambang tunggal yang aman untuk semua, pendekatan modern memakai <strong>ambang operasional</strong> untuk memulai intervensi, bukan diagnosis penyakit tunggal.<Cite n={2} />
      </p>

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/30 rounded-xl p-4">
        <h4 className="font-extrabold text-amber-800 dark:text-amber-300 text-xs uppercase tracking-widest mb-2">Kelompok Risiko — Wajib Skrining</h4>
        <ul className="list-disc list-inside space-y-1 text-xs text-amber-700 dark:text-amber-400 m-0">
          <li>Prematur &amp; late-preterm; KMK/SGA; BMK/LGA</li>
          <li>Bayi ibu diabetes (IDM) — hiperinsulinisme transien</li>
          <li>Asfiksia perinatal, hipotermia, sepsis, polisitemia</li>
          <li>Gejala: jitteriness, letargi, hipotonia, apnea, kejang, tangis lemah, sulit minum</li>
        </ul>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Situasi</th>
              <th className="text-center p-2 font-extrabold text-slate-700 dark:text-slate-300">Ambang GDS</th>
              <th className="text-center p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Target</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Bayi berisiko, <48 jam (AAP)', 'Intervensi bila <45 mg/dL', '≥45 mg/dL'],
              ['PES, ≤48 jam', 'Pertahankan >50 mg/dL', '>50 mg/dL'],
              ['PES, >48 jam', 'Pertahankan >60 mg/dL', '>60 mg/dL'],
              ['Simtomatik / kejang', 'Terapi segera bila <45–50', '>50 mg/dL'],
              ['Curiga hiperinsulinisme', '—', '>70 mg/dL'],
            ].map(([sit, amb, tgt], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{sit}</td>
                <td className="p-2 text-center text-slate-600 dark:text-slate-400">{amb}</td>
                <td className="p-2 text-center font-extrabold text-emerald-600 dark:text-emerald-400">{tgt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs italic text-slate-500 dark:text-slate-400">Ambang AAP (Adamkin) &amp; PES (Thornton) berbeda karena tujuan berbeda; keduanya sepakat: <strong>simtomatik = terapi IV segera</strong>.<Cite n={[1, 2]} /></p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm mt-2">Algoritma Tata Laksana</h4>
      <div className="space-y-2">
        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-3 border border-emerald-200/60 dark:border-emerald-800/30 text-sm">
          <strong className="text-emerald-800 dark:text-emerald-300">1. Asimtomatik, ringan (mis. 25–45 mg/dL):</strong>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 mb-0">Beri minum (ASI/PASI) segera + <strong>dextrose gel 40% 0,5 mL/kg</strong> (≈200 mg/kg) digosok di mukosa bukal. Ulang GDS 30 menit. Gel + menyusu menurunkan kegagalan terapi &amp; pemisahan ibu–bayi.<Cite n={3} /></p>
        </div>
        <div className="bg-rose-50 dark:bg-rose-950/20 rounded-xl p-3 border border-rose-200/60 dark:border-rose-800/30 text-sm">
          <strong className="text-rose-800 dark:text-rose-300">2. Simtomatik, atau GDS sangat rendah (&lt;25 mg/dL), atau gagal langkah 1:</strong>
          <p className="text-xs text-rose-700 dark:text-rose-400 mt-1 mb-0"><strong>Bolus D10% 2 mL/kg IV</strong> (≈200 mg/kg) pelan, langsung diikuti <strong>infus glukosa kontinu GIR 4–8 mg/kg/menit</strong>. Hindari bolus hipertonik pekat/berulang tanpa infus rumatan (rebound).<Cite n={1} /></p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-950/30 rounded-xl p-3 border border-slate-200/60 dark:border-slate-800/30 text-sm">
          <strong className="text-slate-700 dark:text-slate-300">3. Refrakter / GIR meningkat (&gt;8–12 mg/kg/mnt):</strong>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-0">Naikkan GIR bertahap; bila butuh GIR &gt;8–10 curigai <strong>hiperinsulinisme</strong> — periksa insulin, kortisol, GH saat hipoglikemia (critical sample). Pertimbangkan glukagon 0,2 mg/kg (mis. IDM sambil menyiapkan akses) / diazoksid pada hiperinsulinisme persisten. Butuh akses sentral bila dextrose &gt;12,5%.<Cite n={1} /></p>
        </div>
      </div>

      <p className="border-l-4 border-emerald-300 dark:border-emerald-700 pl-4 py-1 text-sm font-medium italic bg-emerald-50/50 dark:bg-emerald-950/10 rounded-r-lg mb-0">
        Hindari <strong>overtreatment</strong>: episode hipoglikemia yang dikoreksi hingga euglikemia stabil tidak terbukti memperburuk luaran, tetapi hipoglikemia berulang &amp; instabilitas glikemik (termasuk hiperglikemia) dikaitkan gangguan perkembangan — jaga glukosa dalam target, hindari fluktuasi.<Cite n={4} />
      </p>
    </>
  );
}
