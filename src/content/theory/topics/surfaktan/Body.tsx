import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
      <p>
        <strong className="text-slate-800 dark:text-slate-200">Sindrom Distres Respirasi (RDS)</strong> disebabkan defisiensi surfaktan pulmonal — kompleks fosfolipid-protein yang menurunkan tegangan permukaan alveoli. Tanpa surfaktan, alveoli kolaps saat ekspirasi (atelektasis progresif), kerja napas meningkat, dan terjadi hipoksemia. Surfaktan eksogen menggantikan defisiensi ini, menstabilkan alveoli, memperbaiki komplians &amp; oksigenasi, serta menurunkan mortalitas dan pneumotoraks pada prematur.<Cite n={1} />
      </p>

      <div className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-800/30 rounded-xl p-4">
        <h4 className="font-extrabold text-teal-800 dark:text-teal-300 text-xs uppercase tracking-widest mb-2">Indikasi & Ambang Pemberian (RDS 2023)<Cite n={1} /></h4>
        <ul className="list-disc list-inside space-y-1 text-xs text-teal-700 dark:text-teal-400 m-0">
          <li><strong>Terapi selektif dini</strong> (bukan profilaksis rutin) — profilaksis tidak lagi dianjurkan di era CPAP dini &amp; steroid antenatal.</li>
          <li>Beri surfaktan bila RDS memburuk: <strong>FiO₂ &gt;0,30</strong> pada CPAP ≥6 cmH₂O.</li>
          <li>Semakin dini pada RDS yang jelas memburuk, semakin baik luaran (hindari menunggu gagal napas berat).</li>
        </ul>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Preparat</th>
              <th className="text-center p-2 font-extrabold text-slate-700 dark:text-slate-300">Dosis Awal</th>
              <th className="text-center p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Ulangan</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Poractant alfa (Curosurf)', '200 mg/kg (2,5 mL/kg)', '100 mg/kg tiap 6–12 jam bila perlu'],
              ['Beractant (Survanta)', '100 mg/kg (4 mL/kg)', '100 mg/kg tiap ≥6 jam (maks 4×)'],
              ['Calfactant (Infasurf)', '105 mg/kg (3 mL/kg)', '105 mg/kg tiap 12 jam bila perlu'],
            ].map(([n, init, rep], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{n}</td>
                <td className="p-2 text-center font-extrabold text-teal-600 dark:text-teal-400">{init}</td>
                <td className="p-2 text-center text-slate-600 dark:text-slate-400">{rep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs italic text-slate-500 dark:text-slate-400">Poractant alfa dosis awal <strong>200 mg/kg lebih unggul dari 100 mg/kg</strong> (menurunkan mortalitas &amp; kebutuhan dosis ulang).<Cite n={4} /></p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm mt-2">Teknik Pemberian</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-teal-50 dark:bg-teal-950/20 rounded-xl p-3 border border-teal-200/60 dark:border-teal-800/30">
          <h5 className="font-extrabold text-teal-800 dark:text-teal-300 text-[11px] uppercase mb-1">LISA / MIST ⭐</h5>
          <p className="text-[11px] text-teal-700 dark:text-teal-400 leading-snug m-0"><strong>Less/Minimally Invasive Surfactant Therapy</strong>: surfaktan via kateter tipis saat bayi tetap bernapas spontan dengan CPAP — tanpa intubasi/ventilasi mekanik.<Cite n={2} /></p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-950/30 rounded-xl p-3 border border-slate-200/60 dark:border-slate-800/30">
          <h5 className="font-extrabold text-slate-700 dark:text-slate-300 text-[11px] uppercase mb-1">INSURE</h5>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug m-0"><strong>IN</strong>tubate–<strong>SUR</strong>factant–<strong>E</strong>xtubate ke CPAP. Intubasi singkat lalu ekstubasi dini.<Cite n={5} /></p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-950/30 rounded-xl p-3 border border-slate-200/60 dark:border-slate-800/30">
          <h5 className="font-extrabold text-slate-700 dark:text-slate-300 text-[11px] uppercase mb-1">Via ETT</h5>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug m-0">Bila bayi sudah terintubasi &amp; diventilasi. Lanjutkan ventilasi lembut pasca-pemberian.<Cite n={6} /></p>
        </div>
      </div>
      <p className="text-sm">
        <strong>Bukti:</strong> trial OPTIMIST-A menunjukkan LISA pada bayi 25–28 minggu menurunkan komposit kematian/BPD.<Cite n={2} /> Meta-analisis: LISA menurunkan kebutuhan ventilasi mekanik, BPD, &amp; komposit kematian/BPD dibanding INSURE/intubasi.<Cite n={3} />
      </p>
      <p className="border-l-4 border-teal-300 dark:border-teal-700 pl-4 py-1 text-sm font-medium italic bg-teal-50/50 dark:bg-teal-950/10 rounded-r-lg mb-0">
        Pasca-pemberian: pantau desaturasi/bradikardia &amp; obstruksi ETT saat instilasi; sesuaikan (turunkan) FiO₂ &amp; PIP cepat mengikuti perbaikan komplians untuk menghindari hiperoksia &amp; volutrauma.<Cite n={1} />
      </p>
    </>
  );
}
