import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
      <p>
        Penundaan pemotongan tali pusat <strong className="text-teal-600 dark:text-teal-400">≥30–60 detik</strong> pada bayi bugar meningkatkan transfusi plasenta, cadangan besi, dan Hb. Pada prematur, DCC menurunkan mortalitas rumah sakit dan kebutuhan transfusi.<Cite n={1} />
      </p>
      <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        <ul className="space-y-1.5 text-sm list-disc list-inside m-0">
          <li><strong>Aterm bugar:</strong> DCC 30–60 detik.<Cite n={3} /></li>
          <li><strong>Prematur bugar:</strong> DCC ≥30 detik — menurunkan mortalitas.<Cite n={1} /></li>
          <li><strong>Tidak bugar / perlu resusitasi:</strong> jangan tunda resusitasi; <em>cord milking</em> tidak dianjurkan rutin pada &lt;28 minggu (risiko IVH).<Cite n={4} /></li>
        </ul>
      </div>
      <p className="text-sm">Selama DCC, jaga bayi tetap hangat dan setinggi/di bawah level plasenta. Meta-analisis menunjukkan penurunan mortalitas relatif pada prematur yang menjalani DCC dibanding klem dini.<Cite n={[1, 2]} /></p>
    </>
  );
}
