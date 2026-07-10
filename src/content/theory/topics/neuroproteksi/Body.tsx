import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
      <p>Intervensi antenatal pada ancaman persalinan prematur memperbaiki luaran neonatus secara bermakna.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200/60 dark:border-indigo-800/30">
          <h4 className="font-extrabold text-indigo-800 dark:text-indigo-300 text-xs uppercase mb-2">Kortikosteroid Antenatal</h4>
          <p className="text-xs text-indigo-700 dark:text-indigo-400 leading-snug mb-0">Deksametason/betametason pada 24–34 mgg menurunkan RDS, IVH, NEC, &amp; mortalitas neonatus.<Cite n={1} /></p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-950/30 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800/30">
          <h4 className="font-extrabold text-slate-700 dark:text-slate-300 text-xs uppercase mb-2">MgSO₄ Neuroproteksi</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mb-0">MgSO₄ ibu &lt;32 mgg menurunkan risiko cerebral palsy pada anak (BEAM trial).<Cite n={[2, 3]} /></p>
        </div>
      </div>
      <p className="text-sm mb-0">Komunikasikan status steroid/MgSO₄ antenatal saat serah terima — memengaruhi antisipasi RDS &amp; kesiapan surfaktan.</p>
    </>
  );
}
