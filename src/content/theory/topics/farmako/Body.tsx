import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-50/80 dark:bg-slate-900/40 rounded-2xl p-4 border border-slate-200/80 dark:border-white/5">
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mb-2 border-b border-slate-200/70 dark:border-white/5 pb-2">Epinefrin (Adrenalin) 1:10.000</h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug mb-0">
            <strong>Indikasi:</strong> LDJ &lt;60 x/menit persisten walau VTP efektif + kompresi 3:1 dengan O₂ 100% selama 30–60 detik.<Cite n={1} /><br /><br />
            <strong>Dosis:</strong> IV/IO <strong>0,01–0,03 mg/kg</strong> (0,1–0,3 mL/kg 1:10.000); rute ET 0,05–0,1 mg/kg bila IV belum ada. Ulangi tiap 3–5 menit.<Cite n={1} />
          </p>
        </div>
        <div className="bg-slate-50/80 dark:bg-slate-900/40 rounded-2xl p-4 border border-slate-200/80 dark:border-white/5">
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mb-2 border-b border-slate-200/70 dark:border-white/5 pb-2">Volume Expander (NaCl 0,9% / PRC)</h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug mb-0">
            <strong>Indikasi:</strong> kecurigaan syok hipovolemik (pucat menetap, nadi lemah, riwayat perdarahan/solusio).<Cite n={2} /><br /><br />
            <strong>Dosis:</strong> <strong>10 mL/kg</strong> IV pelan 5–10 menit via UVC. Pada prematur, hindari bolus cepat (risiko IVH). PRC O-negatif bila perdarahan masif.<Cite n={1} />
          </p>
        </div>
      </div>
      <p className="border-l-4 border-emerald-300 dark:border-emerald-700 pl-4 py-1 text-sm font-medium italic bg-emerald-50/50 dark:bg-emerald-950/10 rounded-r-lg mb-0">
        Ventilasi efektif tetap intervensi terpenting. Obat jarang diperlukan bila VTP &amp; kompresi dilakukan benar.<Cite n={2} />
      </p>
    </>
  );
}
