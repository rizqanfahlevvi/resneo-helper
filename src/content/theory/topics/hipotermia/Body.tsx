import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
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
    </>
  );
}
