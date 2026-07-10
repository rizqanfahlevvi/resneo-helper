import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
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
    </>
  );
}
