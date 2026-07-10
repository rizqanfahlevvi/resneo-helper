import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
      <p>Mnemonic stabilisasi pasca-resusitasi berisiko tinggi saat menunggu rujukan/transport NICU.<Cite n={1} /></p>
      <ul className="text-sm space-y-2 border-l-2 border-cyan-200 dark:border-cyan-900 ml-1 pl-4 text-slate-700 dark:text-slate-300 font-medium list-none">
        <li><strong className="text-slate-900 dark:text-white">S</strong> = Sugar &amp; Safe Care (jaga GDS, IV D10%)</li>
        <li><strong className="text-slate-900 dark:text-white">T</strong> = Temperature (cegah hipotermia)</li>
        <li><strong className="text-slate-900 dark:text-white">A</strong> = Airway (oksigenasi &amp; jalan napas stabil)</li>
        <li><strong className="text-slate-900 dark:text-white">B</strong> = Blood Pressure (perfusi, bolus/inotropik)</li>
        <li><strong className="text-slate-900 dark:text-white">L</strong> = Lab Work (GDA, kultur, elektrolit)</li>
        <li><strong className="text-slate-900 dark:text-white">E</strong> = Emotional Support (komunikasi orang tua)</li>
      </ul>
    </>
  );
}
