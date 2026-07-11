import React, { useState } from 'react';
import { Activity, AlertTriangle, Droplet, FlaskConical, Info, Syringe, CheckCircle2, Calculator } from 'lucide-react';
import { useStore } from '../../store';
import { gentamicinDosing, umbilicalCatheterDepth, FLUID_TABLE, ettSizeByWeight, ettDepthAtLip, glucoseInfusionRate, adrenalinIv, adrenalinEtt, saline10PerKg, dextrose10Bolus, bicarbonate42 } from '../../clinical/doses';
import {
  phototherapyThreshold,
  exchangeTransfusionThreshold,
  classifyBilirubin,
  DEFAULT_BILIRUBIN_RISK,
  BilirubinRiskFactors,
} from '../../clinical/bilirubin';
import { postnatalAge } from '../../clinical/pma';
import { getVentilatorSettings, VENTILATOR_SCENARIOS, getBloodGasTarget, getGaTier, GA_TIER_LABELS, WEANING_CRITERIA, VentilatorScenario } from '../../clinical/ventilator';
import { INOTROPES, InotropeId, doseToRate, rateToDose, doseZone, ruleOfSix, ruleVariantFor } from '../../clinical/inotropes';
import ClinicalTheoryAccordion from '../ClinicalTheoryAccordion';
import CalcSteps, { CalcDisclaimer } from '../CalcSteps';

interface TabCalculatorsProps {
  gestationalAge: string;
  setGestationalAge: (val: string) => void;
  birthWeight: string;
  setBirthWeight: (val: string) => void;
}

export default function TabCalculators({ gestationalAge, setGestationalAge, birthWeight, setBirthWeight }: TabCalculatorsProps) {
  const { anthropometry } = useStore();
  const effectiveGA = gestationalAge || '';
  const effectiveBW = birthWeight || (anthropometry.bbl || '');

  return (
    <div className="animate-in fade-in duration-300 relative pb-28">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Calculator className="w-7 h-7 text-indigo-400" />
        Kalkulator Klinis Neonatus
      </h2>

      {/* Patient Data Sync */}
      <div className="glass-card rounded-2xl p-4 md:p-5 mb-6">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          Data Pasien (Sinkronisasi Antar Tab)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Usia Gestasi (Minggu)</label>
            <input
              type="number"
              value={gestationalAge}
              onChange={(e) => setGestationalAge(e.target.value)}
              placeholder="cth: 38"
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Berat Lahir (Gram)
              {!birthWeight && anthropometry.bbl && <span className="ml-2 text-teal-500 font-normal normal-case">· autofill dari Antropometri</span>}
            </label>
            <input
              type="number"
              value={effectiveBW}
              onChange={(e) => setBirthWeight(e.target.value)}
              placeholder="cth: 3200"
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      <DosisDaruratCalculator effectiveBW={effectiveBW} />
      <VentilatorSettingCalculator effectiveBW={effectiveBW} gestationalAge={effectiveGA} />
      <GdsHipoglikemiaCalculator effectiveBW={effectiveBW} />
      <TitrasiCairanGirCalculator effectiveBW={effectiveBW} />
      <GirCalculator />
      <SurfaktanCalculator />
      <InotropikDripCalculator effectiveBW={effectiveBW} />
      <PompaSyringeInotropikCalculator effectiveBW={effectiveBW} />
      <KebutuhanCairanCalculator />
      <TpnCalculator effectiveBW={effectiveBW} />
      <AntibioticCalculator effectiveBW={effectiveBW} />
      <UvcUacCalculator effectiveBW={effectiveBW} />
      <SeizureCalculator effectiveBW={effectiveBW} />
      <UnitConverter effectiveBW={effectiveBW} />
      <BilirubinCalculator gestationalAge={effectiveGA} />
    </div>
  );
}

// ==========================================
// DOSIS DARURAT (ETT, Adrenalin, NaHCO3, Naloxone, D10, NaCl, Surfaktan)
// ==========================================
function DosisDaruratCalculator({ effectiveBW }: { effectiveBW: string }) {
  const [open, setOpen] = useState(true);
  const bwNum = parseInt(effectiveBW) || 0;
  const wtKg = bwNum / 1000;
  const ettSize = ettSizeByWeight(wtKg);
  const ettDepth = ettDepthAtLip(wtKg);
  const adrIv = adrenalinIv(wtKg);
  const adrEtt = adrenalinEtt(wtKg);
  const naHco3 = bicarbonate42(wtKg);
  const nacl = saline10PerKg(wtKg);
  const d10 = dextrose10Bolus(wtKg);

  return (
    <div className="mt-6 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-800 bg-red-50 dark:bg-red-950/20 text-left"
      >
        <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <Syringe className="w-4 h-4 text-red-600 dark:text-red-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-red-700 dark:text-red-300 text-sm">Kalkulator ETT & Dosis Darurat</h3>
          <p className="text-[10px] text-red-500 dark:text-red-400 font-semibold uppercase tracking-wider">Berdasarkan BB: {bwNum > 0 ? `${bwNum} g (${wtKg.toFixed(3)} kg)` : 'Belum diinput'}</p>
        </div>
        <svg className={`w-4 h-4 text-red-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        bwNum > 0 ? (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Ukuran ETT (NRP 8th Ed)</div>
              <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200">{ettSize} mm</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Kedalaman di bibir: {ettDepth} cm (BB + 6)</div>
              <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-wide">Konfirmasi dgn auskultasi/rontgen</div>
            </div>
            {[
              { name: 'Adrenalin IV/IO', desc: '0.1–0.3 mL/kg (1:10.000)', value: `${adrIv.min} – ${adrIv.max} mL`, note: 'IV/IO bolus cepat', color: 'red' },
              { name: 'Adrenalin via ETT', desc: '0.5–1.0 mL/kg (1:10.000)', value: `${adrEtt.min} – ${adrEtt.max} mL`, note: 'Intratrakeal', color: 'rose' },
              { name: 'Bikarbonat Natrium', desc: '1–2 mEq/kg → NaHCO3 4.2%', value: `${naHco3.minMl} – ${naHco3.maxMl} mL`, note: 'IV/IO perlahan (asidosis metabolik terbukti)', color: 'orange' },
              { name: 'Nalokson', desc: '0.1 mg/kg (sol. 0.4 mg/mL)', value: `${(0.25 * wtKg).toFixed(2)} mL`, note: 'Bukan bagian algoritma NRP — hindari pada ibu pengguna opioid kronis (risiko kejang)', color: 'amber' },
              { name: 'Glukosa 10%', desc: '2 mL/kg bolus IV', value: `${d10} mL`, note: 'Hipoglikemia neonatus (GDS <45 mg/dL)', color: 'yellow' },
              { name: 'NaCl 0.9%', desc: '10 mL/kg selama 5–10 menit', value: `${nacl} mL`, note: 'Volume ekspander (dugaan syok hipovolemik)', color: 'blue' },
              { name: 'Surfaktan (Curosurf)', desc: '200 mg/kg (dosis 1) / 100 mg/kg (berikutnya)', value: `${(200 * wtKg / 80).toFixed(1)} mL / ${(100 * wtKg / 80).toFixed(1)} mL`, note: 'Intratrakeal (konsentrasi 80 mg/mL)', color: 'teal' },
            ].map((drug) => (
              <div key={drug.name} className={`bg-${drug.color}-50 dark:bg-${drug.color}-950/20 border border-${drug.color}-100 dark:border-${drug.color}-900/30 rounded-xl p-3`}>
                <div className={`text-[10px] font-extrabold uppercase tracking-wider text-${drug.color}-600 dark:text-${drug.color}-400 mb-1`}>{drug.name}</div>
                <div className={`text-xl font-bold font-mono text-${drug.color}-800 dark:text-${drug.color}-200`}>{drug.value}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{drug.desc}</div>
                <div className={`text-[9px] font-bold text-${drug.color}-600 dark:text-${drug.color}-400 mt-0.5 uppercase tracking-wide`}>{drug.note}</div>
              </div>
            ))}
            <div className="sm:col-span-2 lg:col-span-3 space-y-3">
              <CalcSteps
                steps={[
                  {
                    label: 'Adrenalin IV/IO (dosis awal disarankan)',
                    formula: '0,2 mL/kg × BB (larutan 1:10.000)',
                    substitution: `0,2 × ${wtKg.toFixed(3)} = ${(0.2 * wtKg).toFixed(2)} mL, rentang aman ${adrIv.min}–${adrIv.max} mL`,
                    note: 'Setara 0,02 mg/kg. Ulangi tiap 3–5 menit bila LDJ tetap <60x/menit.',
                  },
                  {
                    label: 'Bikarbonat Natrium (konversi mEq → mL)',
                    formula: 'mEq/kg × BB ÷ 0,5 mEq/mL (NaHCO3 4,2%)',
                    substitution: `1 × ${wtKg.toFixed(3)} ÷ 0,5 = ${naHco3.minMl} mL (dosis 1 mEq/kg) — 2 × ${wtKg.toFixed(3)} ÷ 0,5 = ${naHco3.maxMl} mL (dosis 2 mEq/kg)`,
                    note: 'Hanya untuk asidosis metabolik terbukti (AGD) dengan ventilasi sudah adekuat — bukan rutin saat resusitasi.',
                  },
                  {
                    label: 'Surfaktan (dosis awal, konversi mg → mL)',
                    formula: '200 mg/kg × BB ÷ 80 mg/mL (konsentrasi Curosurf)',
                    substitution: `200 × ${wtKg.toFixed(3)} ÷ 80 = ${(200 * wtKg / 80).toFixed(2)} mL`,
                  },
                ]}
              />
              <CalcDisclaimer />
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-sm text-slate-400 dark:text-slate-500">
            <Syringe className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>Input Berat Lahir (BB) di panel Antropometri atau pada tab Alur Resusitasi untuk melihat dosis otomatis.</p>
          </div>
        )
      )}
    </div>
  );
}

// ==========================================
// SETTING VENTILATOR MEKANIK NEONATUS
// ==========================================
function VentilatorSettingCalculator({ effectiveBW, gestationalAge }: { effectiveBW: string; gestationalAge: string }) {
  const [open, setOpen] = useState(false);
  const [scenario, setScenario] = useState<VentilatorScenario>('normal');
  const bwNum = parseInt(effectiveBW) || 0;
  const gaNum = parseFloat(gestationalAge) || 0;
  const setting = getVentilatorSettings(scenario, gaNum);
  const bloodGasTarget = getBloodGasTarget(gaNum);
  const gaTier = gaNum > 0 ? getGaTier(gaNum) : null;
  const vtLow = setting.targetVt && bwNum > 0 ? ((setting.targetVt[0] * bwNum) / 1000).toFixed(1) : null;
  const vtHigh = setting.targetVt && bwNum > 0 ? ((setting.targetVt[1] * bwNum) / 1000).toFixed(1) : null;

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Setting Ventilator Mekanik Neonatus</span>
          <span className="text-xs text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/40 px-2 py-0.5 rounded font-bold ml-1">Baru</span>
        </div>
        <svg className={`w-4 h-4 text-indigo-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="p-4 md:p-5 border-t border-indigo-100 dark:border-indigo-500/20 space-y-5">
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-[11px] text-amber-700 dark:text-amber-300 leading-relaxed">
            ⚠️ Ini adalah <strong>titik awal</strong> — sesuaikan dengan analisa gas darah, radiologi toraks, dan compliance paru individual pasien. Bukan pengganti judgment klinis dokter yang merawat.
          </div>

          {(bwNum > 0 || gaNum > 0) && (
            <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-2.5">
              <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                Pasien saat ini: {bwNum > 0 ? `BB ${bwNum} g` : 'BB belum diisi'}{gaNum > 0 ? ` · GA ${gaNum} minggu` : ''}
              </p>
              {gaTier && (
                <p className="text-[10px] text-indigo-500 dark:text-indigo-400 mt-0.5">
                  Kategori: <strong>{GA_TIER_LABELS[gaTier]}</strong> — setting di bawah sudah disesuaikan untuk kategori ini
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Skenario Klinis</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(Object.keys(VENTILATOR_SCENARIOS) as VentilatorScenario[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setScenario(key)}
                  className={`px-3 py-2.5 rounded-xl text-left border transition-all ${scenario === key ? 'bg-indigo-500 text-white border-indigo-400 shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'}`}
                >
                  <span className="block text-xs font-bold">{VENTILATOR_SCENARIOS[key].label}</span>
                  <span className={`block text-[10px] mt-0.5 ${scenario === key ? 'text-indigo-100' : 'text-slate-400'}`}>{VENTILATOR_SCENARIOS[key].description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 text-center">
              <div className="text-[10px] font-extrabold uppercase text-indigo-500 tracking-wider">PIP</div>
              <div className="text-lg font-bold font-mono text-indigo-700 dark:text-indigo-300">{setting.pip[0]}–{setting.pip[1]}</div>
              <div className="text-[9px] text-slate-400">cmH₂O</div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 text-center">
              <div className="text-[10px] font-extrabold uppercase text-indigo-500 tracking-wider">PEEP</div>
              <div className="text-lg font-bold font-mono text-indigo-700 dark:text-indigo-300">{setting.peep[0]}–{setting.peep[1]}</div>
              <div className="text-[9px] text-slate-400">cmH₂O</div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 text-center">
              <div className="text-[10px] font-extrabold uppercase text-indigo-500 tracking-wider">RR</div>
              <div className="text-lg font-bold font-mono text-indigo-700 dark:text-indigo-300">{setting.rr[0]}–{setting.rr[1]}</div>
              <div className="text-[9px] text-slate-400">x/menit</div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 text-center">
              <div className="text-[10px] font-extrabold uppercase text-indigo-500 tracking-wider">Ti</div>
              <div className="text-lg font-bold font-mono text-indigo-700 dark:text-indigo-300">{setting.ti[0]}–{setting.ti[1]}</div>
              <div className="text-[9px] text-slate-400">detik</div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 text-center">
              <div className="text-[10px] font-extrabold uppercase text-indigo-500 tracking-wider">Flow</div>
              <div className="text-lg font-bold font-mono text-indigo-700 dark:text-indigo-300">{setting.flow[0]}–{setting.flow[1]}</div>
              <div className="text-[9px] text-slate-400">L/menit</div>
            </div>
            {vtLow && vtHigh && (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 text-center">
                <div className="text-[10px] font-extrabold uppercase text-emerald-500 tracking-wider">VT Target</div>
                <div className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-300">{vtLow}–{vtHigh}</div>
                <div className="text-[9px] text-slate-400">mL (BB {bwNum}g)</div>
              </div>
            )}
          </div>

          <div className="bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800 rounded-xl p-3">
            <span className="block text-[10px] font-extrabold uppercase text-sky-600 dark:text-sky-400 tracking-wider mb-1">FiO₂</span>
            <p className="text-xs text-slate-700 dark:text-slate-300">{setting.fio2Note}</p>
          </div>

          {setting.notes.length > 0 && (
            <div>
              <span className="block text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">Catatan Klinis — {VENTILATOR_SCENARIOS[scenario].label}</span>
              <ul className="space-y-1.5">
                {setting.notes.map((note, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <span className="block text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">
              Target Analisa Gas Darah {gaTier === 'extremely_preterm' && <span className="text-amber-500 normal-case font-semibold">(disesuaikan untuk ekstrem prematur)</span>}
            </span>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="bg-white dark:bg-slate-900/30"><td className="p-2 font-semibold text-slate-600 dark:text-slate-300">pH</td><td className="p-2 text-right font-mono font-bold text-slate-800 dark:text-slate-200">{bloodGasTarget.ph[0]}–{bloodGasTarget.ph[1]}</td></tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-900/10"><td className="p-2 font-semibold text-slate-600 dark:text-slate-300">PaCO₂ (permissive hypercapnia)</td><td className="p-2 text-right font-mono font-bold text-slate-800 dark:text-slate-200">{bloodGasTarget.paco2[0]}–{bloodGasTarget.paco2[1]} mmHg</td></tr>
                  <tr className="bg-white dark:bg-slate-900/30"><td className="p-2 font-semibold text-slate-600 dark:text-slate-300">PaO₂</td><td className="p-2 text-right font-mono font-bold text-slate-800 dark:text-slate-200">{bloodGasTarget.pao2[0]}–{bloodGasTarget.pao2[1]} mmHg</td></tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-900/10"><td className="p-2 font-semibold text-slate-600 dark:text-slate-300">SpO₂ preduktal (SUPPORT/STOP-ROP Trial)</td><td className="p-2 text-right font-mono font-bold text-slate-800 dark:text-slate-200">{bloodGasTarget.spo2[0]}–{bloodGasTarget.spo2[1]}%</td></tr>
                  <tr className="bg-white dark:bg-slate-900/30"><td className="p-2 font-semibold text-slate-600 dark:text-slate-300">HCO₃</td><td className="p-2 text-right font-mono font-bold text-slate-800 dark:text-slate-200">{bloodGasTarget.hco3[0]}–{bloodGasTarget.hco3[1]} mEq/L</td></tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-900/10"><td className="p-2 font-semibold text-slate-600 dark:text-slate-300">Base Excess</td><td className="p-2 text-right font-mono font-bold text-slate-800 dark:text-slate-200">{bloodGasTarget.be[0]} s/d {bloodGasTarget.be[1]}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <ClinicalTheoryAccordion
            title="Kriteria Weaning & Ekstubasi"
            content={
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                {WEANING_CRITERIA.map((c, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span>{c}</span></li>
                ))}
              </ul>
            }
            references={[
              'Sweet DG et al. European Consensus Guidelines on the Management of RDS: 2022 Update. Neonatology. 2023;120(1):3–23.',
              'Neonatal Resuscitation Program (NRP) 8th Edition. AAP/AHA. 2021.',
              'STABLE Program 6th Edition — Post-Resuscitation/Pre-Transport Stabilization.',
              'Keszler M. State of the Art in Conventional Mechanical Ventilation. J Perinatol. 2009;29:262–275.',
              'SUPPORT Study Group. Target Ranges of Oxygen Saturation in Extremely Preterm Infants. N Engl J Med. 2010;362:1959–1969.',
              'IDAI. Panduan Pelayanan Medis Neonatologi (referensi lokal Indonesia).',
            ]}
          />
        </div>
      )}
    </div>
  );
}

// ==========================================
// GDS & MANAJEMEN HIPOGLIKEMIA
// ==========================================
function GdsHipoglikemiaCalculator({ effectiveBW }: { effectiveBW: string }) {
  const [open, setOpen] = useState(false);
  const [showGds, setShowGds] = useState(false);
  const [gdsValue, setGdsValue] = useState('');
  const bwNum = parseInt(effectiveBW) || 0;
  const wtKg = bwNum / 1000;
  const gdsNum = parseInt(gdsValue) || 0;
  const bolusD10 = wtKg > 0 ? (wtKg * 2).toFixed(1) : '0';

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-rose-500" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Cairan Darurat &amp; Manajemen Hipoglikemia</span>
        </div>
        <svg className={`w-4 h-4 text-rose-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="p-4 md:p-5 border-t border-rose-100 dark:border-rose-500/20 space-y-3">
          <p className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-lg p-2">
            Bayi prematur, KMK (kecil masa kehamilan)/SGA, dan BMK/LGA merupakan kelompok risiko tinggi hipoglikemia — lakukan skrining GDS lebih dini &amp; lebih sering (mis. jam 1, 2, 4, 6 pasca-lahir) dibanding bayi aterm sehat.
          </p>
          {!showGds ? (
            <button
              onClick={() => setShowGds(true)}
              className="w-full bg-white dark:bg-white/5 hover:bg-slate-200/50 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-slate-100 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Activity className="w-5 h-5 text-rose-400" /> Cek GDS / Hipoglikemia
            </button>
          ) : (
            <div className="animate-in fade-in duration-300">
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 mb-4">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Nilai GDS (mg/dL)</label>
                <input
                  type="number"
                  value={gdsValue}
                  onChange={(e) => setGdsValue(e.target.value)}
                  placeholder="Masukkan hasil GDS..."
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-bold text-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                />
              </div>
              {gdsValue && gdsNum < 45 && (
                <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-xl p-5 shadow-inner animate-in fade-in mt-4">
                  <h4 className="font-bold text-rose-600 dark:text-rose-400 text-lg mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" /> Intervensi Hipoglikemia
                  </h4>
                  <div className="bg-slate-100/50 dark:bg-slate-900/50 rounded-lg p-4 border border-rose-200 dark:border-rose-500/20 mb-3">
                    <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Bolus Darurat (Dextrose 10%)</span>
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-3xl font-black text-rose-600 dark:text-rose-500 font-mono">{bolusD10}</span>
                      <span className="text-lg font-bold text-rose-600 dark:text-rose-500 mb-1">mL</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">(Dosis: 2 mL/kg). Berikan via IV perlahan dengan kecepatan alir 1 mL/menit.</p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-lg p-4 border border-indigo-200 dark:border-indigo-500/20">
                    <span className="block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">Cairan Maintenance</span>
                    <p className="text-[95%] text-slate-700 dark:text-indigo-200 font-medium leading-relaxed">
                      Lanjutkan dengan infus Glukosa kontinyu. Target <strong className="text-slate-900 dark:text-white font-bold">GIR awal 4-6 mg/kg/menit</strong>. Cek ulang GDS dalam 30-60 menit.
                    </p>
                  </div>
                </div>
              )}
              {gdsValue && gdsNum >= 45 && (
                <div className="bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/40 rounded-xl p-4 text-emerald-900 dark:text-emerald-100 font-medium flex items-start gap-3 animate-in fade-in mt-4">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                  <p>GDS terpantau normal (&ge; 45 mg/dL). Pertahankan asupan nutrisi oral/enteral jika dimungkinkan.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// TITRASI CAIRAN & GIR (Dilution Engine)
// ==========================================
function TitrasiCairanGirCalculator({ effectiveBW }: { effectiveBW: string }) {
  const [open, setOpen] = useState(false);
  const [targetGir, setTargetGir] = useState('6');
  const [targetFluid, setTargetFluid] = useState('60');
  const bwNum = parseInt(effectiveBW) || 0;
  const wtKg = bwNum / 1000;
  const girNum = parseFloat(targetGir) || 0;
  const fluidNum = parseFloat(targetFluid) || 0;

  const girResults = (() => {
    if (wtKg <= 0 || girNum <= 0 || fluidNum <= 0) return null;
    const totalVolume = fluidNum * wtKg;
    const dextroseGrams = (girNum * wtKg * 1440) / 1000;
    const concentration = (dextroseGrams / totalVolume) * 100;
    let vD10 = 0, vD40 = 0, vWFI = 0;
    if (concentration <= 10) {
      vD10 = dextroseGrams * 10;
      vWFI = totalVolume - vD10;
    } else {
      vD40 = (dextroseGrams - 0.1 * totalVolume) / 0.3;
      vD10 = totalVolume - vD40;
    }
    return { totalVolume, dextroseGrams, concentration, vD10, vD40, vWFI };
  })();

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-cyan-50 dark:hover:bg-cyan-500/10 transition-colors">
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-cyan-500" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Kalkulator Titrasi Cairan &amp; GIR</span>
        </div>
        <svg className={`w-4 h-4 text-cyan-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="p-4 md:p-5 border-t border-cyan-100 dark:border-cyan-500/20">
          {wtKg <= 0 ? (
            <div className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center py-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 mb-2">
              <Info className="w-4 h-4 mr-2" /> Masukkan Berat Lahir di atas untuk menggunakan kalkulator.
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-bottom-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Target GIR (mg/kg/menit)</label>
                  <input type="number" value={targetGir} onChange={(e) => setTargetGir(e.target.value)} className={`w-full bg-white dark:bg-slate-800 border ${girNum > 0 && (girNum < 4 || girNum > 14) ? 'border-red-500' : 'border-slate-300 dark:border-white/20'} rounded-xl px-4 py-3 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all`} />
                  {girNum > 0 && (girNum < 4 || girNum > 14) && (
                    <p className="mt-2 text-xs font-bold text-red-500 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Target GIR di luar batas aman protokol (4 - 14 mg/kg/menit)!</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Target Total Cairan Harian (mL/kg/hari)</label>
                  <input type="number" value={targetFluid} onChange={(e) => setTargetFluid(e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" />
                </div>
              </div>
              {girNum >= 4 && girNum <= 14 && girResults && (
                <div className="bg-cyan-500/10 rounded-xl border border-cyan-500/30 p-4 md:p-5">
                  <div className="mb-4">
                    <span className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Konsentrasi Dextrose Akhir</span>
                    <div className="text-3xl font-black text-cyan-400">{girResults.concentration.toFixed(1)}%</div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 mb-4">
                    <div className="bg-white dark:bg-white/5 p-3 rounded-xl border border-cyan-500/30 shadow-sm text-center">
                      <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Volume D10%</span>
                      <span className="block text-xl font-bold text-slate-900 dark:text-white">{girResults.vD10 > 0 ? girResults.vD10.toFixed(1) : 0} <span className="text-xs text-slate-500 dark:text-slate-400">mL</span></span>
                    </div>
                    {girResults.concentration > 10 ? (
                      <div className="bg-white dark:bg-white/5 p-3 rounded-xl border border-cyan-500/30 shadow-sm text-center">
                        <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Volume D40%</span>
                        <span className="block text-xl font-bold text-rose-400">{girResults.vD40 > 0 ? girResults.vD40.toFixed(1) : 0} <span className="text-xs text-slate-500 dark:text-slate-400">mL</span></span>
                      </div>
                    ) : (
                      <div className="bg-white dark:bg-white/5 p-3 rounded-xl border border-cyan-500/30 shadow-sm text-center">
                        <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Volume WFI / Aqua Bidest</span>
                        <span className="block text-xl font-bold text-blue-400">{girResults.vWFI > 0 ? girResults.vWFI.toFixed(1) : 0} <span className="text-xs text-slate-500 dark:text-slate-400">mL</span></span>
                      </div>
                    )}
                    <div className="bg-cyan-600/80 p-3 rounded-xl border border-cyan-500 shadow-sm text-center text-white">
                      <span className="block text-[10px] font-bold text-cyan-200 uppercase">Total Volume Akhir</span>
                      <span className="block text-xl font-bold">{girResults.totalVolume.toFixed(1)} <span className="text-xs text-cyan-200">mL</span></span>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-cyan-200 bg-cyan-900/50 p-3 rounded-xl flex items-start gap-2 border border-cyan-800">
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
                    <p>Rekomendasi racikan ini menghasilkan total glukosa <strong className="text-cyan-300">{girResults.dextroseGrams.toFixed(1)} gram</strong> per hari, ekuivalen konsentrasi dekstrosa sebesar <strong className="text-cyan-300">{girResults.concentration.toFixed(1)}%</strong> untuk mencapai GIR <strong className="text-cyan-300">{girNum} mg/kg/menit</strong>.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// GIR SEDERHANA (mg/kg/menit dari rate & konsentrasi)
// ==========================================
function GirCalculator() {
  const [open, setOpen] = useState(false);
  const [girBB, setGirBB] = useState('');
  const [girRate, setGirRate] = useState('');
  const [girDextrose, setGirDextrose] = useState('10');
  const [girPreterm, setGirPreterm] = useState(false);
  const girBBNum = parseFloat(girBB) || 0;
  const girRateNum = parseFloat(girRate) || 0;
  const girDextroseNum = parseFloat(girDextrose) || 0;
  const girValue = glucoseInfusionRate(girRateNum, girDextroseNum, girBBNum);

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors">
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-amber-500" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Kalkulator GIR — Glucose Infusion Rate</span>
        </div>
        <svg className={`w-4 h-4 text-amber-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="p-4 md:p-5 border-t border-amber-100 dark:border-amber-500/20 space-y-5">
          <p className="text-xs text-slate-500 dark:text-slate-400">GIR (mg/kg/mnt) = [Rate × Konsentrasi%] ÷ [6 × BB]</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Berat Badan (kg)</label>
              <input type="number" min="0.3" max="6" step="0.1" value={girBB} onChange={e => setGirBB(e.target.value)} placeholder="cth: 1.5" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Rate Infus (mL/jam)</label>
              <input type="number" min="0" max="50" step="0.5" value={girRate} onChange={e => setGirRate(e.target.value)} placeholder="cth: 6" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Konsentrasi Dekstrosa</label>
              <div className="flex flex-wrap gap-2">
                {['5', '10', '12.5', '15', '20'].map(d => (
                  <button key={d} onClick={() => setGirDextrose(d)} className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${girDextrose === d ? 'bg-amber-500 text-white border-amber-400' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}>D{d}%</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Status Bayi</label>
              <div className="flex gap-2">
                <button onClick={() => setGirPreterm(false)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${!girPreterm ? 'bg-amber-500 text-white border-amber-400' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>Aterm</button>
                <button onClick={() => setGirPreterm(true)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${girPreterm ? 'bg-amber-500 text-white border-amber-400' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>Prematur</button>
              </div>
            </div>
          </div>
          {girValue !== null && (
            <div className={`rounded-2xl p-5 text-center border-2 ${girValue < (girPreterm ? 6 : 4) ? 'bg-sky-50 dark:bg-sky-950/20 border-sky-300 dark:border-sky-700' : girValue <= (girPreterm ? 8 : 6) ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700' : 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-700'}`}>
              <span className={`block text-xs font-extrabold uppercase tracking-widest mb-1 ${girValue < (girPreterm ? 6 : 4) ? 'text-sky-600 dark:text-sky-400' : girValue <= (girPreterm ? 8 : 6) ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {girValue < (girPreterm ? 6 : 4) ? 'GIR Terlalu Rendah — Naikkan Rate atau Konsentrasi' : girValue <= (girPreterm ? 8 : 6) ? '✓ GIR Dalam Target' : '⚠ GIR Terlalu Tinggi — Turunkan Rate atau Konsentrasi'}
              </span>
              <span className={`text-4xl font-black tabular-nums ${girValue < (girPreterm ? 6 : 4) ? 'text-sky-600' : girValue <= (girPreterm ? 8 : 6) ? 'text-emerald-600' : 'text-rose-600'}`}>{girValue.toFixed(2)}</span>
              <span className="block text-sm font-bold text-slate-500 mt-1">mg/kg/menit</span>
              <span className="block text-xs text-slate-400 mt-2">Target {girPreterm ? 'prematur' : 'aterm'}: {girPreterm ? '6–8' : '4–6'} mg/kg/mnt</span>
            </div>
          )}
          {girValue !== null && (
            <CalcSteps
              steps={[
                {
                  label: 'Massa dekstrosa per jam',
                  formula: 'Rate (mL/jam) × Konsentrasi (g/100 mL)',
                  substitution: `${girRateNum} × ${(girDextroseNum / 100).toFixed(3)} = ${(girRateNum * girDextroseNum / 100).toFixed(2)} g/jam`,
                  note: `D${girDextrose}% = ${girDextroseNum} g dekstrosa per 100 mL cairan.`,
                },
                {
                  label: 'Konversi ke mg/menit',
                  formula: '(g/jam × 1000) ÷ 60',
                  substitution: `(${(girRateNum * girDextroseNum / 100).toFixed(2)} × 1000) ÷ 60 = ${(girRateNum * girDextroseNum * 1000 / 100 / 60).toFixed(2)} mg/menit`,
                },
                {
                  label: 'GIR per kg berat badan',
                  formula: 'mg/menit ÷ BB (kg)',
                  substitution: `${(girRateNum * girDextroseNum * 1000 / 100 / 60).toFixed(2)} ÷ ${girBBNum} = ${girValue.toFixed(2)} mg/kg/menit`,
                  note: `Setara rumus ringkas: (Rate × Konsentrasi%) ÷ (6 × BB) = (${girRateNum} × ${girDextroseNum}) ÷ (6 × ${girBBNum}) = ${girValue.toFixed(2)}.`,
                },
              ]}
            />
          )}
          <ClinicalTheoryAccordion
            title="Teori & Panduan GIR Neonatus"
            content={
              <div className="space-y-3 text-slate-600 dark:text-slate-400">
                <p>GIR adalah ukuran kecepatan glukosa yang diterima neonatus per satuan waktu. Pemantauan GIR penting untuk mencegah hipoglikemia (GIR terlalu rendah) dan hiperglikemia (GIR terlalu tinggi) pada neonatus yang bergantung pada infus glukosa.</p>
                <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-200/60 dark:border-amber-800/30 font-mono text-xs">GIR = (Rate mL/jam × Konsentrasi %) ÷ (6 × BB kg)</div>
                <p>Hipoglikemia neonatus didefinisikan sebagai GDA &lt;47 mg/dL. Tatalaksana awal: bolus D10% 2 mL/kg IV dalam 5 menit, diikuti peningkatan GIR secara bertahap.</p>
              </div>
            }
            references={['Thornton PS et al. Pediatrics. 2015;135(6):1191–1197. (AAP Clinical Report)', 'IDAI. Panduan Hipoglikemia Neonatus. 2022.', 'NRP 8th Edition. AAP. 2021.']}
          />
          <CalcDisclaimer />
        </div>
      )}
    </div>
  );
}

// ==========================================
// SURFAKTAN
// ==========================================
function SurfaktanCalculator() {
  const [open, setOpen] = useState(false);
  const [surfBB, setSurfBB] = useState('');
  const [surfDrug, setSurfDrug] = useState<'poractant-initial' | 'poractant-repeat' | 'beractant'>('poractant-initial');
  const getSurfactantResult = () => {
    const w = parseFloat(surfBB);
    if (!w || w <= 0) return null;
    if (surfDrug === 'poractant-initial') return { dose: (200 * w).toFixed(0), vol: (200 * w / 120).toFixed(2), drug: 'Poractant alfa (Curosurf 120 mg/mL)', dosePerKg: '200 mg/kg', note: 'Dosis awal rescue' };
    if (surfDrug === 'poractant-repeat') return { dose: (100 * w).toFixed(0), vol: (100 * w / 120).toFixed(2), drug: 'Poractant alfa (Curosurf 120 mg/mL)', dosePerKg: '100 mg/kg', note: 'Dosis ulangan (maks 2x)' };
    return { dose: (100 * w).toFixed(0), vol: (4 * w).toFixed(2), drug: 'Beractant (Survanta 25 mg/mL)', dosePerKg: '100 mg/kg = 4 mL/kg', note: 'Ulangan tiap 6 jam, maks 4 dosis' };
  };
  const result = getSurfactantResult();

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors">
        <div className="flex items-center gap-2">
          <Syringe className="w-5 h-5 text-violet-500" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Kalkulator Dosis Surfaktan</span>
        </div>
        <svg className={`w-4 h-4 text-violet-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="p-4 md:p-5 border-t border-violet-100 dark:border-violet-500/20 space-y-5">
          <p className="text-xs text-slate-500 dark:text-slate-400">Poractant alfa (Curosurf) · Beractant (Survanta) — Sweet et al. Neonatology 2023</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Berat Lahir (kg)</label>
              <input type="number" min="0.3" max="6" step="0.1" value={surfBB} onChange={e => setSurfBB(e.target.value)} placeholder="cth: 1.2" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Jenis &amp; Dosis Surfaktan</label>
              <div className="flex flex-col gap-2">
                {([
                  { val: 'poractant-initial', label: 'Curosurf — Dosis Awal (200 mg/kg)' },
                  { val: 'poractant-repeat', label: 'Curosurf — Dosis Ulangan (100 mg/kg)' },
                  { val: 'beractant', label: 'Survanta — 100 mg/kg = 4 mL/kg' },
                ] as { val: 'poractant-initial' | 'poractant-repeat' | 'beractant', label: string }[]).map(opt => (
                  <button key={opt.val} onClick={() => setSurfDrug(opt.val)} className={`px-3 py-2.5 rounded-xl text-xs font-bold border text-left transition-all ${surfDrug === opt.val ? 'bg-violet-500 text-white border-violet-400' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}>{opt.label}</button>
                ))}
              </div>
            </div>
          </div>
          {result && (
            <div className="bg-violet-50 dark:bg-violet-950/20 border-2 border-violet-300 dark:border-violet-700 rounded-2xl p-5">
              <span className="block text-xs font-extrabold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">{result.note} — {result.drug}</span>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Dosis</span>
                  <span className="text-3xl font-black text-violet-600 dark:text-violet-400">{result.dose} <span className="text-sm">mg</span></span>
                  <span className="block text-xs text-slate-400 mt-0.5">{result.dosePerKg}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Volume yang Diberikan</span>
                  <span className="text-3xl font-black text-violet-600 dark:text-violet-400">{result.vol} <span className="text-sm">mL</span></span>
                </div>
              </div>
            </div>
          )}
          <ClinicalTheoryAccordion
            title="Teori & Panduan Terapi Surfaktan"
            content={
              <div className="space-y-3 text-slate-600 dark:text-slate-400">
                <p>Terapi surfaktan diindikasikan untuk RDS akibat defisiensi surfaktan, terutama pada bayi prematur &lt;32 minggu. Surfaktan eksogen menurunkan tegangan permukaan alveolar dan mencegah kolaps alveoli.</p>
              </div>
            }
            references={['Sweet DG et al. European Consensus Guidelines on RDS. Neonatology. 2023;120(1):3–23.', 'IDAI. Panduan Surfaktan pada RDS Neonatus. 2022.', 'Polin RA et al. Pediatrics. 2014;133(1):156–163.']}
          />
        </div>
      )}
    </div>
  );
}

// ==========================================
// INOTROPIK — KONVERSI DOSIS KE RATE
// ==========================================
function InotropikDripCalculator({ effectiveBW }: { effectiveBW: string }) {
  const [open, setOpen] = useState(false);
  const [drug, setDrug] = useState<InotropeId>('dopamine');
  const [mode, setMode] = useState<'doseToRate' | 'rateToDose'>('doseToRate');
  const [bbKg, setBbKg] = useState('');
  const [conc, setConc] = useState('');
  const [dose, setDose] = useState('5');
  const [rate, setRate] = useState('1');

  const d = INOTROPES[drug];
  // BB dari input manual, atau autofill dari BB lahir (gram → kg)
  const autoKg = effectiveBW ? (parseInt(effectiveBW) / 1000) : 0;
  const wtKg = parseFloat(bbKg) || autoKg;
  const concNum = parseFloat(conc) || 0;

  const selectDrug = (id: InotropeId) => {
    setDrug(id);
    setDose(String(INOTROPES[id].presets[Math.min(1, INOTROPES[id].presets.length - 1)]));
    if (!conc) return; // biarkan konsentrasi apa adanya bila sudah diisi
  };

  const applyRuleOfSix = () => {
    const variant = ruleVariantFor(drug);
    const total = 50; // spuit 50 mL standar NICU
    const r = ruleOfSix(wtKg, total, variant);
    if (r) setConc(r.concMgPerMl.toFixed(4).replace(/0+$/, '').replace(/\.$/, ''));
  };
  const ros = wtKg > 0 ? ruleOfSix(wtKg, 50, ruleVariantFor(drug)) : null;

  const rateResult = mode === 'doseToRate' ? doseToRate(parseFloat(dose), wtKg, concNum) : null;
  const doseResult = mode === 'rateToDose' ? rateToDose(parseFloat(rate), wtKg, concNum) : null;

  const effectiveDose = mode === 'doseToRate' ? (parseFloat(dose) || 0) : (doseResult ?? 0);
  const zone = effectiveDose > 0 ? doseZone(drug, effectiveDose) : null;
  const zoneStyle: Record<string, { box: string; label: string; text: string }> = {
    below: { box: 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700', label: 'Di bawah rentang lazim', text: 'text-slate-500' },
    usual: { box: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800', label: 'Dalam rentang lazim', text: 'text-emerald-600 dark:text-emerald-400' },
    high: { box: 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800', label: 'Di atas rentang lazim — waspada', text: 'text-amber-600 dark:text-amber-400' },
    over: { box: 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800', label: 'MELEBIHI dosis maksimum!', text: 'text-rose-600 dark:text-rose-400' },
  };

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-cyan-50 dark:hover:bg-cyan-500/10 transition-colors">
        <div className="flex items-center gap-2">
          <Syringe className="w-5 h-5 text-cyan-500" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Kalkulator Drip Inotropik & Vasoaktif</span>
        </div>
        <svg className={`w-4 h-4 text-cyan-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="p-4 md:p-5 border-t border-cyan-100 dark:border-cyan-500/20 space-y-5">
          {/* Pemilih obat */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(INOTROPES) as InotropeId[]).map(id => (
              <button key={id} onClick={() => selectDrug(id)} className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${drug === id ? 'bg-cyan-500 text-white border-cyan-400' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>{INOTROPES[id].short}</button>
            ))}
          </div>
          <div className="bg-cyan-50/60 dark:bg-cyan-950/10 border border-cyan-100 dark:border-cyan-900/30 rounded-xl p-3 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong className="text-cyan-700 dark:text-cyan-300">{d.label}</strong> — {d.effect}
            <br /><span className="text-slate-500 dark:text-slate-500">{d.note}</span>
            <br /><span className="font-semibold">Rentang lazim: {d.usual[0]}–{d.usual[1]} mcg/kg/mnt (maks {d.max}).</span>
          </div>

          {/* Mode */}
          <div className="flex gap-2">
            <button onClick={() => setMode('doseToRate')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${mode === 'doseToRate' ? 'bg-cyan-500 text-white border-cyan-400' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>Dosis → Laju (mL/jam)</button>
            <button onClick={() => setMode('rateToDose')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${mode === 'rateToDose' ? 'bg-cyan-500 text-white border-cyan-400' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>Laju → Dosis</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Berat Badan (kg){autoKg > 0 && !bbKg && <span className="ml-1 text-teal-500 normal-case font-normal">· auto {autoKg.toFixed(2)}</span>}</label>
              <input type="number" min="0.3" max="6" step="0.1" value={bbKg} onChange={e => setBbKg(e.target.value)} placeholder={autoKg > 0 ? autoKg.toFixed(2) : 'cth: 2.5'} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Konsentrasi (mg/mL)</label>
              <input type="number" min="0.001" step="0.01" value={conc} onChange={e => setConc(e.target.value)} placeholder={`cth: ${d.typicalConc}`} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" />
              {ros && (
                <button onClick={applyRuleOfSix} className="mt-1.5 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline">
                  Isi "Rule of 6": {ros.drugMg.toFixed(ros.drugMg < 10 ? 2 : 1)} mg dalam 50 mL →
                </button>
              )}
            </div>

            {mode === 'doseToRate' ? (
              <div className="sm:col-span-2">
                <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Target Dosis (mcg/kg/mnt)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {d.presets.map(p => (
                    <button key={p} onClick={() => setDose(String(p))} className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${dose === String(p) ? 'bg-cyan-500 text-white border-cyan-400' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}>{p}</button>
                  ))}
                </div>
                <input type="number" min="0" step="0.01" value={dose} onChange={e => setDose(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" />
              </div>
            ) : (
              <div className="sm:col-span-2">
                <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Laju Pompa Aktual (mL/jam)</label>
                <input type="number" min="0" step="0.01" value={rate} onChange={e => setRate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" />
              </div>
            )}
          </div>

          {wtKg <= 0 || concNum <= 0 ? (
            <div className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center py-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
              <Info className="w-4 h-4 mr-2" /> Isi Berat Badan &amp; Konsentrasi untuk menghitung.
            </div>
          ) : (
            <div className={`rounded-2xl p-5 text-center border-2 ${zone ? zoneStyle[zone].box : 'bg-cyan-50 dark:bg-cyan-950/20 border-cyan-300 dark:border-cyan-700'}`}>
              {mode === 'doseToRate' && rateResult !== null && (
                <>
                  <span className="block text-xs font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-1">{d.short} — {dose} mcg/kg/mnt</span>
                  <span className="text-4xl font-black text-cyan-600 dark:text-cyan-400">{rateResult.toFixed(2)} <span className="text-lg">mL/jam</span></span>
                </>
              )}
              {mode === 'rateToDose' && doseResult !== null && (
                <>
                  <span className="block text-xs font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-1">{d.short} @ {rate} mL/jam</span>
                  <span className="text-4xl font-black text-cyan-600 dark:text-cyan-400">{doseResult.toFixed(2)} <span className="text-lg">mcg/kg/mnt</span></span>
                </>
              )}
              {zone && (
                <span className={`mt-3 inline-block text-xs font-bold px-3 py-1 rounded-full ${zoneStyle[zone].text} bg-white/70 dark:bg-slate-900/50`}>
                  {zone === 'over' && '⚠ '}{zoneStyle[zone].label}
                </span>
              )}
              <span className="block text-[10px] text-slate-400 mt-2">BB {wtKg.toFixed(2)} kg · konsentrasi {concNum} mg/mL</span>
            </div>
          )}
          <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center">
            Laju = Dosis × BB × 60 ÷ (Konsentrasi × 1000). Ref: Neonatal Formulary 8th Ed. 2020 · NeoFax 2023 · IDAI NICU. Verifikasi ganda sebelum pemberian.
          </p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// POMPA SYRINGE INOTROPIK — PANDUAN OPLOS
// ==========================================
function PompaSyringeInotropikCalculator({ effectiveBW }: { effectiveBW: string }) {
  const [open, setOpen] = useState(false);
  const [dose, setDose] = useState('5');
  const [syringeVol, setSyringeVol] = useState('50');
  const [rate, setRate] = useState('1');
  const bwNum = parseInt(effectiveBW) || 0;
  const wtKg = bwNum / 1000;
  const doseNum = parseFloat(dose) || 0;
  const volNum = parseFloat(syringeVol) || 0;
  const rateNum = parseFloat(rate) || 0;
  const inotropeMg = (wtKg > 0 && rateNum > 0) ? ((doseNum * wtKg * 60 * volNum) / (rateNum * 1000)).toFixed(1) : '0';

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
        <div className="flex items-center gap-2">
          <Syringe className="w-5 h-5 text-indigo-500" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Pompa Syringe Inotropik (Dopamin/Dobutamin)</span>
        </div>
        <svg className={`w-4 h-4 text-indigo-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="p-4 md:p-5 border-t border-indigo-100 dark:border-indigo-500/20">
          {wtKg <= 0 ? (
            <div className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center py-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
              <Info className="w-4 h-4 mr-2" /> Masukkan Berat Lahir di atas untuk menggunakan kalkulator.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Target Dosis Mikro (mcg/kg/min)</label>
                  <input type="number" value={dose} onChange={(e) => setDose(e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Total Volume Spuit (mL)</label>
                  <button onClick={() => setSyringeVol('50')} className="w-full py-3 text-sm rounded-xl font-bold border bg-indigo-600 border-indigo-500 text-white">50 mL</button>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Kecepatan Pump (mL/jam)</label>
                  <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                </div>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-5 flex flex-col justify-center shadow-inner">
                <div className="mb-4">
                  <span className="block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 text-center">Jumlah Obat Murni Yang Di-Oplos</span>
                  <div className="flex flex-col items-center justify-center my-2">
                    <span className="text-4xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400 font-mono tracking-tight">{inotropeMg}</span>
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-500 mt-1">mg</span>
                  </div>
                </div>
                <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-xl border border-indigo-200 dark:border-indigo-500/20 text-sm text-indigo-900 dark:text-indigo-200 font-medium leading-relaxed">
                  Larutkan <strong>{inotropeMg} mg</strong> obat inotropik ke dalam {syringeVol} mL cairan pelarut (D5% / NS). Jalankan syringe pump di kecepatan <strong>{rate} mL/jam</strong> untuk mendapatkan dosis {dose} mcg/kg/menit (BB: {wtKg} kg).
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// KEBUTUHAN CAIRAN
// ==========================================
function KebutuhanCairanCalculator() {
  const [open, setOpen] = useState(false);
  const [fluidBB, setFluidBB] = useState('');
  const [fluidDOL, setFluidDOL] = useState('1');
  const [fluidType, setFluidType] = useState<'term' | 'preterm-1500' | 'bblr' | 'bblsr'>('term');
  const fluidTable = FLUID_TABLE;
  const dol = Math.min(parseInt(fluidDOL) || 1, 7) - 1;
  const fluidMlKgDay = fluidTable[fluidType][dol];
  const birthDateTime = useStore((s) => s.patientIdentity.birthDateTime);
  const autoDol = birthDateTime ? (postnatalAge(birthDateTime)?.days ?? 0) + 1 : null;
  const fluidAbsolute = fluidBB ? (fluidMlKgDay * parseFloat(fluidBB)).toFixed(0) : null;

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-sky-50 dark:hover:bg-sky-500/10 transition-colors">
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-sky-500" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Kalkulator Kebutuhan Cairan Neonatus</span>
        </div>
        <svg className={`w-4 h-4 text-sky-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="p-4 md:p-5 border-t border-sky-100 dark:border-sky-500/20 space-y-5">
          <p className="text-xs text-slate-500 dark:text-slate-400">Berdasarkan hari kehidupan, berat lahir, dan status gestasi — IDAI 2022 · CAHS</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Berat Badan (kg)</label>
              <input type="number" min="0.3" max="6" step="0.1" value={fluidBB} onChange={e => setFluidBB(e.target.value)} placeholder="cth: 1.8" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Hari Kehidupan (DOL)</label>
              <div className="flex flex-wrap gap-2">
                {['1', '2', '3', '4', '5', '6', '7+'].map((d, i) => (
                  <button key={d} onClick={() => setFluidDOL(String(i + 1))} className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${fluidDOL === String(i + 1) ? 'bg-sky-500 text-white border-sky-400' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}>{d}</button>
                ))}
              </div>
              {autoDol !== null && (
                <button onClick={() => setFluidDOL(String(autoDol))} className="mt-2 text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline">
                  Gunakan DOL otomatis dari waktu lahir (hari ke-{autoDol})
                </button>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Kategori Berat Lahir</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {([
                  { val: 'term', label: 'Aterm', sub: '>2500 g' },
                  { val: 'preterm-1500', label: 'Prematur', sub: '1500–2500 g' },
                  { val: 'bblr', label: 'BBLR', sub: '<1500 g' },
                  { val: 'bblsr', label: 'BBLSR', sub: '<1000 g' },
                ] as { val: 'term' | 'preterm-1500' | 'bblr' | 'bblsr', label: string, sub: string }[]).map(opt => (
                  <button key={opt.val} onClick={() => setFluidType(opt.val)} className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${fluidType === opt.val ? 'bg-sky-500 text-white border-sky-400' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                    <span className="block font-extrabold">{opt.label}</span>
                    <span className="block text-[10px] opacity-70">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-sky-50 dark:bg-sky-950/20 border-2 border-sky-300 dark:border-sky-700 rounded-2xl p-5 text-center">
            <span className="block text-xs font-extrabold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-2">Kebutuhan Cairan — DOL {fluidDOL === '7' ? '7+' : fluidDOL}</span>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Per Berat Badan</span>
                <span className="text-3xl font-black text-sky-600 dark:text-sky-400">{fluidMlKgDay} <span className="text-sm">mL/kg/hari</span></span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Volume Absolut</span>
                <span className={`text-3xl font-black ${fluidAbsolute ? 'text-sky-600 dark:text-sky-400' : 'text-slate-300 dark:text-slate-600'}`}>{fluidAbsolute ? `${fluidAbsolute} mL` : '— mL'}</span>
                {fluidAbsolute && <span className="block text-xs text-slate-400 mt-0.5">{(parseFloat(fluidAbsolute) / 24).toFixed(1)} mL/jam</span>}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kategori</th>
                  {['DOL 1', 'DOL 2', 'DOL 3', 'DOL 4', 'DOL 5', 'DOL 6', 'DOL 7+'].map(d => <th key={d} className="text-center p-2 font-bold text-slate-500 dark:text-slate-400">{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {([
                  { label: 'Aterm (>2500g)', key: 'term' },
                  { label: 'Prematur 1500–2500g', key: 'preterm-1500' },
                  { label: 'BBLR <1500g', key: 'bblr' },
                  { label: 'BBLSR <1000g', key: 'bblsr' },
                ] as { label: string, key: 'term' | 'preterm-1500' | 'bblr' | 'bblsr' }[]).map((row, i) => (
                  <tr key={row.key} className={`border-b border-slate-100 dark:border-slate-800 ${row.key === fluidType ? 'bg-sky-50 dark:bg-sky-950/30 font-bold' : i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                    <td className="p-2 text-slate-700 dark:text-slate-300 font-semibold whitespace-nowrap">{row.label}</td>
                    {fluidTable[row.key].map((v, j) => (
                      <td key={j} className={`p-2 text-center tabular-nums ${row.key === fluidType && j === dol ? 'text-sky-600 dark:text-sky-400 font-black' : 'text-slate-500 dark:text-slate-400'}`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[10px] text-slate-400 mt-1.5 text-right">Satuan: mL/kg/hari</p>
          </div>
          <ClinicalTheoryAccordion
            title="Panduan Kebutuhan Cairan Neonatus"
            content={
              <div className="space-y-3 text-slate-600 dark:text-slate-400">
                <p>Manajemen cairan neonatus dimulai konservatif pada DOL 1 untuk menghindari overload cairan (risiko PDA, edema paru, NEC). Volume ditingkatkan bertahap seiring penurunan berat fisiologis dan kemampuan ginjal yang meningkat.</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Gunakan <strong>berat lahir</strong> sebagai acuan hingga bayi melampaui berat lahir kembali</li>
                  <li>Monitor output urin target: <strong>1–3 mL/kg/jam</strong></li>
                  <li>BBLSR lebih rentan kehilangan cairan transepidermal (IWL tinggi); pertimbangkan penambahan 10–20 mL/kg/hari jika di inkubator terbuka</li>
                </ul>
              </div>
            }
            references={['CAHS Neonatology Guidelines. Fluid and Nutrition Requirements. 2023.', 'IDAI. Panduan Manajemen Cairan Neonatus. 2022.', 'Modi N. Arch Dis Child Fetal Neonatal Ed. 2004;89(2):F108–F111.']}
          />
        </div>
      )}
    </div>
  );
}

// ==========================================
// TPN CALCULATOR
// ==========================================
function TpnCalculator({ effectiveBW }: { effectiveBW: string }) {
  const [tpnDol, setTpnDol] = useState<string>('1');
  const [tpnSex, setTpnSex] = useState<'male' | 'female'>('male');
  const [tpnStatus, setTpnStatus] = useState<'term' | 'preterm'>('term');
  const [open, setOpen] = useState(false);

  const bwNum = parseInt(effectiveBW) || 0;
  const bwKg = bwNum / 1000;
  const dolNum = Math.min(14, Math.max(1, parseInt(tpnDol) || 1));

  // Fluid mL/kg/day
  const getFluidRange = (): [number, number] => {
    let base: [number, number];
    if (dolNum === 1) base = [60, 80];
    else if (dolNum === 2) base = [80, 100];
    else if (dolNum === 3) base = [100, 120];
    else if (dolNum <= 7) base = [120, 150];
    else base = [140, 160];
    if (tpnStatus === 'preterm') return [base[0] + 20, base[1] + 20];
    return base;
  };

  const [fluidMin, fluidMax] = getFluidRange();
  const totalFluidMin = bwKg > 0 ? (fluidMin * bwKg).toFixed(0) : '—';
  const totalFluidMax = bwKg > 0 ? (fluidMax * bwKg).toFixed(0) : '—';

  // GIR / Glucose
  const girStart = { min: 4, max: 6 };
  const girTarget = { min: 6, max: 8 };
  const dextroseGStart = bwKg > 0 ? ((girStart.min + girStart.max) / 2 * bwKg * 1440 / 1000).toFixed(1) : '—';
  const volD10 = bwKg > 0 ? (parseFloat(dextroseGStart) / 0.1).toFixed(0) : '—';

  // Protein g/kg/day range
  const getProteinRange = (): [number, number] => {
    if (tpnStatus === 'preterm') return dolNum === 1 ? [2, 3] : [3.5, 4];
    return dolNum <= 2 ? [1.5, 2] : [3, 3.5];
  };
  const [protMin, protMax] = getProteinRange();
  const protVolMin = bwKg > 0 ? (protMin * bwKg / 0.1).toFixed(1) : '—';
  const protVolMax = bwKg > 0 ? (protMax * bwKg / 0.1).toFixed(1) : '—';

  // Lipid g/kg/day
  const getLipidRange = (): [number, number] => {
    if (dolNum === 1 && bwNum >= 1000) return [0, 0];
    if (dolNum === 1) return [0.5, 1];
    if (dolNum <= 3) return [1, 2];
    return [2, 3];
  };
  const [lipMin, lipMax] = getLipidRange();
  const lipVolMin = bwKg > 0 ? (lipMin * bwKg / 0.2).toFixed(1) : '—';
  const lipVolMax = bwKg > 0 ? (lipMax * bwKg / 0.2).toFixed(1) : '—';

  // Electrolytes (start DOL 2-3)
  const showElyte = dolNum >= 2;
  const naMin = bwKg > 0 ? (2 * bwKg).toFixed(1) : '—';
  const naMax = bwKg > 0 ? (3 * bwKg).toFixed(1) : '—';
  const kMin = bwKg > 0 ? (1 * bwKg).toFixed(1) : '—';
  const kMax = bwKg > 0 ? (2 * bwKg).toFixed(1) : '—';
  const caMin = bwKg > 0 ? (1 * bwKg).toFixed(1) : '—';
  const caMax = bwKg > 0 ? (1.5 * bwKg).toFixed(1) : '—';
  const caVolMin = bwKg > 0 ? (1 * bwKg * 10 / 4.65).toFixed(1) : '—';
  const caVolMax = bwKg > 0 ? (1.5 * bwKg * 10 / 4.65).toFixed(1) : '—';

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-violet-600 dark:text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
          <span className="font-bold text-slate-900 dark:text-white text-sm">Kalkulator TPN Neonatus</span>
          <span className="text-xs text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-950/40 px-2 py-0.5 rounded font-bold ml-1">Baru</span>
        </div>
        <svg className={`w-4 h-4 text-violet-500 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {open && (
        <div className="border-t border-violet-100 dark:border-violet-500/20 p-4 md:p-6 space-y-5">
          <p className="text-xs text-slate-500 dark:text-slate-400">Total Parenteral Nutrition — kalkulasi berdasarkan BB dan hari kehidupan. BB diambil dari data antropometri.</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">BB (gram)</label>
              <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200">{bwNum > 0 ? bwNum : '—'}</div>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Hari Kehidupan (DOL)</label>
              <input type="number" min={1} max={14} value={tpnDol} onChange={e => setTpnDol(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Jenis Kelamin</label>
              <div className="flex gap-1">
                <button onClick={() => setTpnSex('male')} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${tpnSex === 'male' ? 'bg-violet-500 text-white border-violet-400' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'}`}>L</button>
                <button onClick={() => setTpnSex('female')} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${tpnSex === 'female' ? 'bg-violet-500 text-white border-violet-400' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'}`}>P</button>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Status</label>
              <div className="flex gap-1">
                <button onClick={() => setTpnStatus('term')} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${tpnStatus === 'term' ? 'bg-violet-500 text-white border-violet-400' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'}`}>Aterm</button>
                <button onClick={() => setTpnStatus('preterm')} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${tpnStatus === 'preterm' ? 'bg-violet-500 text-white border-violet-400' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'}`}>Prematur</button>
              </div>
            </div>
          </div>

          {bwKg > 0 && (
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-violet-50 dark:bg-violet-950/30">
                    <th className="text-left p-3 font-extrabold text-violet-700 dark:text-violet-300 uppercase tracking-wider">Komponen</th>
                    <th className="text-center p-3 font-extrabold text-violet-700 dark:text-violet-300 uppercase tracking-wider">Dosis</th>
                    <th className="text-center p-3 font-extrabold text-violet-700 dark:text-violet-300 uppercase tracking-wider">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="bg-white dark:bg-slate-900/30">
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">Cairan Total</td>
                    <td className="p-3 text-center font-bold text-slate-900 dark:text-white">{fluidMin}–{fluidMax} mL/kg/hari</td>
                    <td className="p-3 text-center font-bold text-violet-600 dark:text-violet-400">{totalFluidMin}–{totalFluidMax} mL/hari</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-900/10">
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">Glukosa (GIR 4–6 mg/kg/mnt)</td>
                    <td className="p-3 text-center font-bold text-slate-900 dark:text-white">{dextroseGStart} g/hari</td>
                    <td className="p-3 text-center font-bold text-violet-600 dark:text-violet-400">D10%: {volD10} mL</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900/30">
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">Protein (Aminosteril Inf. 10%)</td>
                    <td className="p-3 text-center font-bold text-slate-900 dark:text-white">{protMin}–{protMax} g/kg/hari</td>
                    <td className="p-3 text-center font-bold text-violet-600 dark:text-violet-400">{protVolMin}–{protVolMax} mL</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-900/10">
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">Lipid (Intralipid 20%)</td>
                    <td className="p-3 text-center font-bold text-slate-900 dark:text-white">{lipMin === 0 && lipMax === 0 ? 'Tunda (DOL 1, BB≥1000g)' : `${lipMin}–${lipMax} g/kg/hari`}</td>
                    <td className="p-3 text-center font-bold text-violet-600 dark:text-violet-400">{lipMin === 0 && lipMax === 0 ? '—' : `${lipVolMin}–${lipVolMax} mL`}</td>
                  </tr>
                  {showElyte ? (
                    <>
                      <tr className="bg-white dark:bg-slate-900/30">
                        <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">Na⁺ (NaCl 3%: 1 mEq=1 mL)</td>
                        <td className="p-3 text-center font-bold text-slate-900 dark:text-white">2–3 mEq/kg/hari</td>
                        <td className="p-3 text-center font-bold text-violet-600 dark:text-violet-400">{naMin}–{naMax} mL</td>
                      </tr>
                      <tr className="bg-slate-50/50 dark:bg-slate-900/10">
                        <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">K⁺ (KCl 7.46%: 1 mEq=1 mL)</td>
                        <td className="p-3 text-center font-bold text-slate-900 dark:text-white">1–2 mEq/kg/hari</td>
                        <td className="p-3 text-center font-bold text-violet-600 dark:text-violet-400">{kMin}–{kMax} mL</td>
                      </tr>
                      <tr className="bg-white dark:bg-slate-900/30">
                        <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">Ca²⁺ (Ca Glukonat 10%)</td>
                        <td className="p-3 text-center font-bold text-slate-900 dark:text-white">1–1.5 mEq/kg/hari</td>
                        <td className="p-3 text-center font-bold text-violet-600 dark:text-violet-400">{caVolMin}–{caVolMax} mL</td>
                      </tr>
                    </>
                  ) : (
                    <tr className="bg-white dark:bg-slate-900/30">
                      <td className="p-3 font-semibold text-slate-500 dark:text-slate-400" colSpan={3}>Elektrolit dimulai DOL 2–3</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {bwKg <= 0 && (
            <div className="p-4 text-center text-xs text-slate-400 dark:text-slate-500">Input berat lahir di panel Antropometri untuk melihat kalkulasi TPN.</div>
          )}
          <p className="text-[10px] text-slate-400 text-right">ESPGHAN 2018 · IDAI NICU Guidelines · Koletzko B et al. J Pediatr Gastroenterol Nutr. 2018</p>
        </div>
      )}
    </div>
  );
}


// ==========================================
// ANTIBIOTIC DOSING CALCULATOR
// ==========================================
function AntibioticCalculator({ effectiveBW }: { effectiveBW: string }) {
  const [open, setOpen] = useState(false);
  const [gaAbx, setGaAbx] = useState<string>('');
  const [ageAbx, setAgeAbx] = useState<string>('0');
  const [therapyType, setTherapyType] = useState<'eons' | 'lons' | 'meningitis'>('eons');

  const bwNum = parseInt(effectiveBW) || 0;
  const bwKg = bwNum / 1000;
  const gaNum = parseInt(gaAbx) || 0;
  const ageNum = parseInt(ageAbx) || 0;

  type DrugRow = { drug: string; dose: string; interval: string; volume: string };

  const calcDrugs = (): DrugRow[] => {
    if (!bwKg || !gaNum) return [];
    const rows: DrugRow[] = [];

    // Ampisilin 100 mg/mL
    if (therapyType === 'meningitis') {
      const doseMg = 100 * bwKg;
      rows.push({ drug: 'Ampisilin', dose: `${doseMg.toFixed(0)} mg (100 mg/kg)`, interval: 'q8h', volume: `${(doseMg / 100).toFixed(2)} mL` });
    } else {
      let interval = 'q12h';
      if (gaNum >= 29 && ageNum > 7) interval = 'q8h';
      const doseMg = 50 * bwKg;
      rows.push({ drug: 'Ampisilin', dose: `${doseMg.toFixed(0)} mg (50 mg/kg)`, interval, volume: `${(doseMg / 100).toFixed(2)} mL` });
    }

    // Gentamisin 10 mg/mL — Neofax, berdasar PMA (GA lahir + usia postnatal) & PNA
    const pmaNum = gaNum + ageNum / 7;
    const { dosePerKg: gentDose, interval: gentInterval } = gentamicinDosing(pmaNum, ageNum);
    const gentMg = gentDose * bwKg;
    rows.push({ drug: 'Gentamisin', dose: `${gentMg.toFixed(1)} mg (${gentDose} mg/kg)`, interval: gentInterval, volume: `${(gentMg / 10).toFixed(2)} mL` });

    // Cefotaxime 100 mg/mL
    if (therapyType === 'meningitis') {
      const doseMg = 50 * bwKg;
      rows.push({ drug: 'Cefotaxime', dose: `${doseMg.toFixed(0)} mg (50 mg/kg)`, interval: 'q6h', volume: `${(doseMg / 100).toFixed(2)} mL` });
    } else {
      const cefInterval = ageNum <= 7 ? 'q12h' : 'q8h';
      const doseMg = 50 * bwKg;
      rows.push({ drug: 'Cefotaxime', dose: `${doseMg.toFixed(0)} mg (50 mg/kg)`, interval: cefInterval, volume: `${(doseMg / 100).toFixed(2)} mL` });
    }

    return rows;
  };

  const drugs = calcDrugs();

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Syringe className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Kalkulator Antibiotik Neonatus</span>
          <span className="text-xs text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/40 px-2 py-0.5 rounded font-bold ml-1">Kalkulator</span>
        </div>
        <svg className={`w-4 h-4 text-rose-500 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="border-t border-rose-100 dark:border-rose-500/20 p-4 md:p-6 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">BB (gram)</label>
              <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200">{bwNum > 0 ? bwNum : '—'}</div>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">GA (minggu, 23–42)</label>
              <input type="number" min={23} max={42} value={gaAbx} onChange={e => setGaAbx(e.target.value)} placeholder="cth: 32" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Usia Postnatal (hari)</label>
              <input type="number" min={0} max={28} value={ageAbx} onChange={e => setAgeAbx(e.target.value)} placeholder="0" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Jenis Terapi</label>
              <div className="flex gap-1 flex-wrap">
                {(['eons','lons','meningitis'] as const).map(t => (
                  <button key={t} onClick={() => setTherapyType(t)} className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${therapyType === t ? 'bg-rose-500 text-white border-rose-400' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'}`}>
                    {t === 'eons' ? 'EONS' : t === 'lons' ? 'LONS' : 'Mening.'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {gaNum > 0 && (
            <p className="text-[10px] text-slate-400 -mt-2">
              PMA saat ini: <span className="font-bold text-slate-600 dark:text-slate-300">{(gaNum + ageNum / 7).toFixed(1)} minggu</span> — interval gentamisin mengikuti PMA & PNA (Neofax)
            </p>
          )}
          {drugs.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-rose-50 dark:bg-rose-950/30">
                    <th className="text-left p-3 font-extrabold text-rose-700 dark:text-rose-300 uppercase tracking-wider">Obat</th>
                    <th className="text-center p-3 font-extrabold text-rose-700 dark:text-rose-300 uppercase tracking-wider">Dosis</th>
                    <th className="text-center p-3 font-extrabold text-rose-700 dark:text-rose-300 uppercase tracking-wider">Interval</th>
                    <th className="text-center p-3 font-extrabold text-rose-700 dark:text-rose-300 uppercase tracking-wider">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {drugs.map((d, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-slate-900/30' : 'bg-slate-50/50 dark:bg-slate-900/10'}>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{d.drug}</td>
                      <td className="p-3 text-center text-slate-700 dark:text-slate-300">{d.dose}</td>
                      <td className="p-3 text-center font-bold text-rose-600 dark:text-rose-400">{d.interval}</td>
                      <td className="p-3 text-center font-bold text-indigo-600 dark:text-indigo-400">{d.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-xs text-slate-400 py-4">Masukkan BB, GA, dan usia postnatal untuk menghitung dosis.</div>
          )}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-300">
            ⚠️ Sesuaikan dengan panduan RS dan kultur sensitivitas. Sediaan: Ampisilin 500mg/vial (100mg/mL), Gentamisin 10mg/mL, Cefotaxime 1g/vial (100mg/mL). Ref: Neofax 2023, BNFC.
          </div>
        </div>
      )}
    </div>
  );
}


// ==========================================
// UVC/UAC CATHETER DEPTH CALCULATOR
// ==========================================
function UvcUacCalculator({ effectiveBW }: { effectiveBW: string }) {
  const [open, setOpen] = useState(false);
  const bwNum = parseInt(effectiveBW) || 0;
  const bwKg = bwNum / 1000;

  const { uvc: uvcDepth, uacHigh, uacLow } = umbilicalCatheterDepth(bwKg);

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Kedalaman Kateter Umbilikal (UVC/UAC)</span>
          <span className="text-xs text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-950/40 px-2 py-0.5 rounded font-bold ml-1">Kalkulator</span>
        </div>
        <svg className={`w-4 h-4 text-teal-500 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="border-t border-teal-100 dark:border-teal-500/20 p-4 md:p-6 space-y-5">
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">BB (gram) — autofill dari Antropometri</label>
            <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 inline-block">{bwNum > 0 ? `${bwNum} g (${bwKg.toFixed(3)} kg)` : 'Belum diisi'}</div>
          </div>
          {bwKg > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-teal-50 dark:bg-teal-950/30">
                    <th className="text-left p-3 font-extrabold text-teal-700 dark:text-teal-300 uppercase tracking-wider">Kateter</th>
                    <th className="text-center p-3 font-extrabold text-teal-700 dark:text-teal-300 uppercase tracking-wider">Kedalaman</th>
                    <th className="text-left p-3 font-extrabold text-teal-700 dark:text-teal-300 uppercase tracking-wider">Posisi Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="bg-white dark:bg-slate-900/30">
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">UVC</td>
                    <td className="p-3 text-center font-bold text-teal-600 dark:text-teal-400 text-base">{uvcDepth.toFixed(1)} cm</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Supra-hepatik / T8–T9 (VCI)</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-900/10">
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">UAC High</td>
                    <td className="p-3 text-center font-bold text-teal-600 dark:text-teal-400 text-base">{uacHigh.toFixed(1)} cm</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Aorta T6–T9 (disukai)</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900/30">
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">UAC Low</td>
                    <td className="p-3 text-center font-bold text-teal-600 dark:text-teal-400 text-base">{uacLow.toFixed(1)} cm</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Aorta L3–L5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-xs text-slate-400 py-4">Input berat lahir di panel Antropometri untuk menghitung kedalaman kateter.</div>
          )}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-xs text-blue-700 dark:text-blue-300">
            💡 UVC aman untuk akses darurat. UAC high lebih disukai untuk monitoring arterial. Konfirmasi dengan foto rontgen setelah pemasangan.
          </div>
        </div>
      )}
    </div>
  );
}


// ==========================================
// SEIZURE MANAGEMENT CALCULATOR
// ==========================================
function SeizureCalculator({ effectiveBW }: { effectiveBW: string }) {
  const [open, setOpen] = useState(false);
  const [drug, setDrug] = useState<'phenobarbital' | 'levetiracetam' | 'midazolam' | 'phenytoin'>('phenobarbital');
  const bwNum = parseInt(effectiveBW) || 0;
  const bwKg = bwNum / 1000;

  type DoseRow = { label: string; dose: string; volume: string; note?: string };

  const calcRows = (): DoseRow[] => {
    if (!bwKg) return [];
    if (drug === 'phenobarbital') {
      const loadMg = 20 * bwKg;
      const maintMg = 2.5 * bwKg;
      return [
        { label: 'Loading', dose: `${loadMg.toFixed(1)} mg (20 mg/kg) IV selama 15–30 mnt`, volume: `${(loadMg / 200).toFixed(2)} mL (200mg/mL)` },
        { label: 'Maintenance (q12h)', dose: `${maintMg.toFixed(1)} mg/dosis (2.5 mg/kg)`, volume: `${(maintMg / 200).toFixed(3)} mL per dosis`, note: 'Mulai 12–24 jam setelah loading' },
        { label: 'Maks Loading', dose: `${(40 * bwKg).toFixed(1)} mg total (40 mg/kg)`, volume: `${(40 * bwKg / 200).toFixed(2)} mL total`, note: 'Jika kejang berlanjut' },
      ];
    }
    if (drug === 'levetiracetam') {
      const loadMg = 50 * bwKg;
      const maintMg = 25 * bwKg;
      return [
        { label: 'Loading', dose: `${loadMg.toFixed(1)} mg (50 mg/kg) IV selama 15 mnt`, volume: `${(loadMg / 100).toFixed(2)} mL (100mg/mL)` },
        { label: 'Maintenance (q12h)', dose: `${maintMg.toFixed(1)} mg/dosis (25 mg/kg)`, volume: `${(maintMg / 100).toFixed(2)} mL per dosis` },
      ];
    }
    if (drug === 'midazolam') {
      const bolusMg = 0.1 * bwKg;
      const infusMin = 0.01 * bwKg;
      const infusMax = 0.06 * bwKg;
      return [
        { label: 'Bolus IV', dose: `${bolusMg.toFixed(2)} mg (0.1 mg/kg) perlahan`, volume: `${(bolusMg / 5).toFixed(3)} mL (5mg/mL)` },
        { label: 'Infus Kontinu', dose: `${infusMin.toFixed(3)}–${infusMax.toFixed(3)} mg/kg/jam`, volume: `${(infusMin / 5).toFixed(3)}–${(infusMax / 5).toFixed(3)} mL/kg/jam` },
      ];
    }
    if (drug === 'phenytoin') {
      const loadMg = 17.5 * bwKg;
      return [
        { label: 'Loading', dose: `${loadMg.toFixed(1)} mg (17.5 mg/kg) IV selama 30 mnt`, volume: `${(loadMg / 50).toFixed(2)} mL (50mg/mL)`, note: 'Max rate 1 mg/kg/mnt' },
      ];
    }
    return [];
  };

  const rows = calcRows();
  const drugLabels: Record<string, string> = { phenobarbital: 'Fenobarbital', levetiracetam: 'Levetiracetam', midazolam: 'Midazolam', phenytoin: 'Fenitoin' };

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Manajemen Kejang Neonatus</span>
          <span className="text-xs text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/40 px-2 py-0.5 rounded font-bold ml-1">Kalkulator</span>
        </div>
        <svg className={`w-4 h-4 text-purple-500 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="border-t border-purple-100 dark:border-purple-500/20 p-4 md:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">BB (gram)</label>
              <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200">{bwNum > 0 ? bwNum : '—'}</div>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Obat Pilihan</label>
              <div className="flex gap-1 flex-wrap">
                {(['phenobarbital','levetiracetam','midazolam','phenytoin'] as const).map(k => (
                  <button key={k} onClick={() => setDrug(k)} className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all ${drug === k ? 'bg-purple-500 text-white border-purple-400' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'}`}>{drugLabels[k].slice(0, 8)}</button>
                ))}
              </div>
            </div>
          </div>
          {rows.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-purple-50 dark:bg-purple-950/30">
                    <th className="text-left p-3 font-extrabold text-purple-700 dark:text-purple-300 uppercase tracking-wider">Regimen</th>
                    <th className="text-left p-3 font-extrabold text-purple-700 dark:text-purple-300 uppercase tracking-wider">Dosis</th>
                    <th className="text-left p-3 font-extrabold text-purple-700 dark:text-purple-300 uppercase tracking-wider">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {rows.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-slate-900/30' : 'bg-slate-50/50 dark:bg-slate-900/10'}>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 align-top">
                        {r.label}
                        {r.note && <span className="block text-[10px] text-slate-400 font-normal">{r.note}</span>}
                      </td>
                      <td className="p-3 text-slate-700 dark:text-slate-300">{r.dose}</td>
                      <td className="p-3 font-bold text-purple-600 dark:text-purple-400">{r.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-xs text-slate-400 py-4">Input berat lahir di panel Antropometri untuk menghitung dosis.</div>
          )}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-300">
            ⚠️ Pertimbangkan EEG/aEEG. Cari dan tangani penyebab: hipoglikemia, hipokalsemia, infeksi, HIE. Monitor respirasi dan apnea. Ref: Fenichel, NeoFax 2023.
          </div>
        </div>
      )}
    </div>
  );
}


// ==========================================
// UNIT CONVERSION CALCULATOR
// ==========================================
function UnitConverter({ effectiveBW }: { effectiveBW: string }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<'dose' | 'solution' | 'infusion' | 'weight'>('dose');
  const bwNum = parseInt(effectiveBW) || 0;
  const bwKg = bwNum / 1000;

  const [mcgKgMin, setMcgKgMin] = useState('5');
  const [mgKgDose, setMgKgDose] = useState('50');
  const [solConc, setSolConc] = useState('10');
  const [solVol, setSolVol] = useState('50');
  const [infDose, setInfDose] = useState('5');
  const [infConc, setInfConc] = useState('1');
  const [weightInput, setWeightInput] = useState('');
  const [weightUnit, setWeightUnit] = useState<'g' | 'kg'>('g');

  const mcgToMgDay = bwKg > 0 ? (parseFloat(mcgKgMin) * 60 * 24 * bwKg / 1000).toFixed(2) : '—';
  const mgDoseTotal = bwKg > 0 ? (parseFloat(mgKgDose) * bwKg).toFixed(1) : '—';
  const solGrams = ((parseFloat(solConc) || 0) * (parseFloat(solVol) || 0) / 100).toFixed(2);
  const solMg = (parseFloat(solGrams) * 1000).toFixed(0);
  const infMlHr = bwKg > 0 && parseFloat(infConc) > 0
    ? ((parseFloat(infDose) || 0) * bwKg * 60 / ((parseFloat(infConc) || 1) * 1000)).toFixed(2)
    : '—';
  const weightConverted = weightUnit === 'g'
    ? `${((parseFloat(weightInput) || 0) / 1000).toFixed(3)} kg`
    : `${((parseFloat(weightInput) || 0) * 1000).toFixed(0)} g`;

  const categories = [
    { id: 'dose' as const, label: 'Dosis' },
    { id: 'solution' as const, label: 'Larutan' },
    { id: 'infusion' as const, label: 'Infus' },
    { id: 'weight' as const, label: 'Berat' },
  ];

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Konversi Unit Cepat</span>
          <span className="text-xs text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/40 px-2 py-0.5 rounded font-bold ml-1">Kalkulator</span>
        </div>
        <svg className={`w-4 h-4 text-orange-500 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="border-t border-orange-100 dark:border-orange-500/20 p-4 md:p-6 space-y-4">
          <div className="flex gap-1 flex-wrap">
            {categories.map(c => (
              <button key={c.id} onClick={() => setCategory(c.id)} className={`py-1.5 px-3 rounded-xl text-xs font-bold border transition-all ${category === c.id ? 'bg-orange-500 text-white border-orange-400' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'}`}>{c.label}</button>
            ))}
          </div>

          {category === 'dose' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">BB: {bwKg > 0 ? `${bwKg.toFixed(3)} kg` : 'Belum diisi'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 space-y-2">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500">mcg/kg/mnt → mg/hari</label>
                  <input type="number" value={mcgKgMin} onChange={e => setMcgKgMin(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  <div className="text-sm font-bold text-orange-600 dark:text-orange-400">= {mcgToMgDay} mg/hari</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 space-y-2">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500">mg/kg/dosis → total dosis</label>
                  <input type="number" value={mgKgDose} onChange={e => setMgKgDose(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  <div className="text-sm font-bold text-orange-600 dark:text-orange-400">= {mgDoseTotal} mg/dosis</div>
                </div>
              </div>
            </div>
          )}

          {category === 'solution' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Konsentrasi (%)</label>
                  <input type="number" value={solConc} onChange={e => setSolConc(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Volume (mL)</label>
                  <input type="number" value={solVol} onChange={e => setSolVol(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-3 text-sm font-bold text-orange-700 dark:text-orange-300">
                D{solConc}% {solVol}mL = {solGrams} g = {solMg} mg zat aktif
              </div>
            </div>
          )}

          {category === 'infusion' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">mL/jam = dosis × BB × 60 / (konsentrasi mg/mL × 1000)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Dosis (mcg/kg/mnt)</label>
                  <input type="number" value={infDose} onChange={e => setInfDose(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Konsentrasi (mg/mL)</label>
                  <input type="number" value={infConc} onChange={e => setInfConc(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">BB (gram)</label>
                  <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200">{bwNum > 0 ? bwNum : '—'}</div>
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-3 text-sm font-bold text-orange-700 dark:text-orange-300">
                Kecepatan Infus = {infMlHr} mL/jam
              </div>
            </div>
          )}

          {category === 'weight' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Nilai</label>
                  <input type="number" value={weightInput} onChange={e => setWeightInput(e.target.value)} placeholder="3200" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Satuan Input</label>
                  <div className="flex gap-1">
                    <button onClick={() => setWeightUnit('g')} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${weightUnit === 'g' ? 'bg-orange-500 text-white border-orange-400' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'}`}>gram</button>
                    <button onClick={() => setWeightUnit('kg')} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${weightUnit === 'kg' ? 'bg-orange-500 text-white border-orange-400' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'}`}>kg</button>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-3 text-sm font-bold text-orange-700 dark:text-orange-300">
                {weightInput || '—'} {weightUnit} = {weightInput ? weightConverted : '—'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// ==========================================
// BILIRUBIN / FOTOTERAPI CALCULATOR (aproksimasi AAP 2022)
// ==========================================
const RISK_FACTOR_LABELS: { key: keyof BilirubinRiskFactors; label: string }[] = [
  { key: 'isoimunHemolitik', label: 'Inkompatibilitas ABO/Rh (isoimun hemolitik)' },
  { key: 'defisiensiG6PD', label: 'Defisiensi G6PD' },
  { key: 'asfiksia', label: 'Asfiksia' },
  { key: 'letargiSignifikan', label: 'Letargi signifikan' },
  { key: 'instabilitasSuhu', label: 'Instabilitas suhu' },
  { key: 'sepsis', label: 'Sepsis' },
  { key: 'asidosis', label: 'Asidosis' },
  { key: 'albuminRendah', label: 'Albumin < 3,0 g/dL' },
];

const ZONE_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  normal: { label: 'Normal', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800' },
  mendekati: { label: 'Mendekati Ambang', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800' },
  fototerapi: { label: 'Indikasi Fototerapi', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800' },
  transfusi: { label: 'Indikasi Transfusi Tukar', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800' },
};

function BilirubinCalculator({ gestationalAge }: { gestationalAge: string }) {
  const [open, setOpen] = useState(false);
  const [gaBili, setGaBili] = useState(gestationalAge || '');
  const [ageHoursBili, setAgeHoursBili] = useState('');
  const [tsb, setTsb] = useState('');
  const [risk, setRisk] = useState<BilirubinRiskFactors>(DEFAULT_BILIRUBIN_RISK);

  const gaNum = parseFloat(gaBili) || 0;
  const ageNum = parseFloat(ageHoursBili) || 0;
  const tsbNum = parseFloat(tsb) || 0;

  const hasInput = gaNum > 0 && ageNum >= 0;
  const photoThreshold = hasInput ? phototherapyThreshold(gaNum, ageNum, risk) : 0;
  const exchThreshold = hasInput ? exchangeTransfusionThreshold(gaNum, ageNum, risk) : 0;
  const zone = hasInput && tsbNum > 0 ? classifyBilirubin(tsbNum, gaNum, ageNum, risk) : null;
  const zoneStyle = zone ? ZONE_STYLE[zone] : null;

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Bilirubin & Fototerapi</span>
          <span className="text-xs text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-950/40 px-2 py-0.5 rounded font-bold ml-1">Kalkulator</span>
        </div>
        <svg className={`w-4 h-4 text-yellow-500 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="border-t border-yellow-100 dark:border-yellow-500/20 p-4 md:p-6 space-y-5">
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-[11px] text-amber-700 dark:text-amber-300 leading-relaxed">
            ⚠️ Ambang di bawah adalah <strong>aproksimasi</strong> kurva AAP 2022 untuk pendukung keputusan cepat — bukan pengganti nomogram/BiliTool resmi. Selalu korelasikan dengan kurva jam-spesifik asli dan kebijakan RS.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Usia Gestasi (mgg)</label>
              <input type="number" min={22} max={44} value={gaBili} onChange={e => setGaBili(e.target.value)} placeholder="cth: 38" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Usia (jam)</label>
              <input type="number" min={0} max={336} value={ageHoursBili} onChange={e => setAgeHoursBili(e.target.value)} placeholder="cth: 48" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Bilirubin Total (mg/dL)</label>
              <input type="number" min={0} step={0.1} value={tsb} onChange={e => setTsb(e.target.value)} placeholder="cth: 14.5" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Faktor Risiko Neurotoksisitas (menurunkan ambang fototerapi)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {RISK_FACTOR_LABELS.map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={risk[key]}
                    onChange={e => setRisk(r => ({ ...r, [key]: e.target.checked }))}
                    className="accent-yellow-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {hasInput ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-xl p-3 text-center">
                  <div className="text-[10px] font-extrabold uppercase text-orange-500 tracking-wider mb-1">Ambang Fototerapi</div>
                  <div className="text-xl font-bold text-orange-700 dark:text-orange-300">{photoThreshold.toFixed(1)} <span className="text-xs font-normal">mg/dL</span></div>
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 rounded-xl p-3 text-center">
                  <div className="text-[10px] font-extrabold uppercase text-rose-500 tracking-wider mb-1">Ambang Transfusi Tukar</div>
                  <div className="text-xl font-bold text-rose-700 dark:text-rose-300">{exchThreshold.toFixed(1)} <span className="text-xs font-normal">mg/dL</span></div>
                </div>
              </div>

              {zoneStyle && (
                <div className={`rounded-xl p-4 text-center border ${zoneStyle.bg}`}>
                  <div className={`text-xs font-extrabold uppercase tracking-widest mb-1 ${zoneStyle.color}`}>{zoneStyle.label}</div>
                  <div className={`text-sm font-semibold ${zoneStyle.color}`}>TSB {tsbNum.toFixed(1)} mg/dL pada GA {gaNum} mgg, usia {ageNum} jam</div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-xs text-slate-400 py-4">Isi usia gestasi dan usia bayi (jam) untuk menghitung ambang.</div>
          )}
        </div>
      )}
    </div>
  );
}
