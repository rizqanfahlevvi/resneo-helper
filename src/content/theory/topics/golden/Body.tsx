import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
      <p>
        Konsep <strong className="text-slate-800 dark:text-slate-200">The Golden Minute</strong> menegaskan bahwa neonatus harus mulai bernapas sendiri atau diberikan ventilasi bantuan dalam <strong className="text-orange-600 dark:text-orange-400">60 detik pertama kehidupan</strong>.<Cite n={1} /> Keterlambatan dapat menyebabkan asfiksia berkepanjangan, ensefalopati hipoksik-iskemik (HIE), dan kematian.<Cite n={2} />
      </p>
      <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        <ul className="list-disc list-inside space-y-2 m-0 text-sm">
          <li><strong>Penilaian Awal (0–30 detik):</strong> tonus otot, usaha napas/menangis, usia gestasi. Lakukan langkah awal (hangatkan, posisikan, isap bila perlu, keringkan, stimulasi).<Cite n={1} /></li>
          <li><strong>Intervensi Cepat (30–60 detik):</strong> kaji LDJ. Bila apnu/megap-megap atau LDJ &lt;100 x/menit, segera inisiasi Ventilasi Tekanan Positif (VTP).<Cite n={[1, 3]} /></li>
        </ul>
      </div>
    </>
  );
}
