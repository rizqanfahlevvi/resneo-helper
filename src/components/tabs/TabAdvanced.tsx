import React, { useState } from 'react';
import { Activity, AlertTriangle, Droplet, CheckCircle2, FlaskConical, Scale, Info, Syringe } from 'lucide-react';
import { useStore } from '../../store';

interface TabAdvancedProps {
  gestationalAge: string;
  setGestationalAge: (val: string) => void;
  birthWeight: string;
  setBirthWeight: (val: string) => void;
}

export default function TabAdvanced({ gestationalAge, setGestationalAge, birthWeight, setBirthWeight }: TabAdvancedProps) {
  const { anthropometry } = useStore();

  // Autofill from anthropometry store if props are empty
  const effectiveGA = gestationalAge || '';
  const effectiveBW = birthWeight || (anthropometry.bbl || '');

  const gaNum = parseInt(effectiveGA) || 0;
  const bwNum = parseInt(effectiveBW) || 0;
  const wtKg = bwNum / 1000;

  // Hypoglycemia State
  const [showGds, setShowGds] = useState(false);
  const [gdsValue, setGdsValue] = useState<string>('');
  const gdsNum = parseInt(gdsValue) || 0;

  // Inotrope State
  const [dose, setDose] = useState<string>('5');
  const [syringeVol, setSyringeVol] = useState<string>('50');
  const [rate, setRate] = useState<string>('1');

  // GIR State
  const [targetGir, setTargetGir] = useState<string>('6');
  const [targetFluid, setTargetFluid] = useState<string>('60');

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

    return {
      totalVolume,
      dextroseGrams,
      concentration,
      vD10,
      vD40,
      vWFI
    };
  })();

  const getLubchencoPercentile = (ga: number, bw: number) => {
    if (!ga || !bw) return null;
    let effectiveGa = ga;
    if (ga < 24) effectiveGa = 24;
    if (ga > 42) effectiveGa = 42;
    const limits: Record<number, [number, number]> = {
      24: [500, 800], 25: [550, 900], 26: [600, 1000], 27: [650, 1150],
      28: [750, 1300], 29: [850, 1500], 30: [1000, 1700], 31: [1150, 1900],
      32: [1300, 2150], 33: [1500, 2400], 34: [1700, 2700], 35: [1900, 2950],
      36: [2100, 3200], 37: [2300, 3450], 38: [2500, 3700], 39: [2700, 3950],
      40: [2850, 4100], 41: [2950, 4250], 42: [3000, 4350]
    };
    const [p10, p90] = limits[effectiveGa];
    if (bw < p10) return 'SGA';
    if (bw > p90) return 'LGA';
    return 'AGA';
  };

  const status = getLubchencoPercentile(gaNum, bwNum);
  const bolusD10 = wtKg > 0 ? (wtKg * 2).toFixed(1) : 0;

  const doseNum = parseFloat(dose) || 0;
  const volNum = parseFloat(syringeVol) || 0;
  const rateNum = parseFloat(rate) || 0;
  const inotropeMg = (wtKg > 0 && rateNum > 0) ? ((doseNum * wtKg * 60 * volNum) / (rateNum * 1000)).toFixed(1) : '0';

  return (
    <div className="animate-in fade-in duration-300 relative pb-28">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <FlaskConical className="w-7 h-7 text-indigo-400" />
        Pertumbuhan, Cairan & Pengenceran Obat (Neonatologi)
      </h2>

      {/* Nilai Normal Neonatus */}
      <NilaiNormalCard />

      {/* Patient Data Sync */}
      <div className="glass-card rounded-2xl p-4 md:p-5 mb-6">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-3 flex items-center gap-2">
          <Scale className="w-4 h-4 text-slate-500 dark:text-slate-400" />
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

      <div className="space-y-6">
        
        {/* 1. LUBCHENCO CURVE CALCULATION ENGINE */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 text-white border-b border-slate-200 dark:border-white/10">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Kurva Pertumbuhan Lubchenco</h3>
          </div>
          <div className="p-4 md:p-5">
            {!status ? (
              <div className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center py-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                <Info className="w-4 h-4 mr-2" /> Masukkan Gestasi dan Berat Lahir di atas untuk melihat status bayi.
              </div>
            ) : (
              <div className="animate-in zoom-in-95 duration-300 flex flex-col md:flex-row gap-6">
                
                {/* Visual SVG Chart (Left Column) */}
                <div className="flex-1 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 p-4 rounded-2xl shadow-inner flex flex-col items-center justify-center">
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 self-start">Visualisasi Kurva Lubchenco</span>
                  
                  {(() => {
                    const constrainedGa = Math.max(24, Math.min(43, gaNum));
                    const constrainedBw = Math.max(0, Math.min(4600, bwNum));
                    
                    // Coordinates mapping: Width=520, Height=510
                    // X-axis: 24w (x=60) to 43w (x=480) -> width=420
                    // Y-axis: 0g (y=440) to 4600g (y=50) -> height=390
                    const getX = (ga: number) => 60 + ((ga - 24) / 19) * 420;
                    const getY = (bw: number) => 440 - (bw / 4600) * 390;
                    
                    const percentiles: Record<number, { p10: number, p25: number, p50: number, p75: number, p90: number }> = {
                      24: { p10: 480, p25: 580, p50: 700, p75: 820, p90: 950 },
                      25: { p10: 550, p25: 670, p50: 800, p75: 940, p90: 1100 },
                      26: { p10: 630, p25: 770, p50: 920, p75: 1080, p90: 1270 },
                      27: { p10: 720, p25: 880, p50: 1050, p75: 1240, p90: 1460 },
                      28: { p10: 820, p25: 1000, p50: 1200, p75: 1420, p90: 1670 },
                      29: { p10: 930, p25: 1140, p50: 1370, p75: 1620, p90: 1900 },
                      30: { p10: 1060, p25: 1300, p50: 1560, p75: 1840, p90: 2150 },
                      31: { p10: 1210, p25: 1480, p50: 1770, p75: 2080, p90: 2420 },
                      32: { p10: 1380, p25: 1680, p50: 2000, p75: 2355, p90: 2710 },
                      33: { p10: 1570, p25: 1910, p50: 2260, p75: 2650, p90: 3025 },
                      34: { p10: 1780, p25: 2150, p50: 2540, p75: 2960, p90: 3350 },
                      35: { p10: 2010, p25: 2410, p50: 2830, p75: 3275, p90: 3680 },
                      36: { p10: 2250, p25: 2670, p50: 3115, p75: 3580, p90: 3990 },
                      37: { p10: 2490, p25: 2920, p50: 3385, p75: 3850, p90: 4250 },
                      38: { p10: 2700, p25: 3135, p50: 3600, p75: 4070, p90: 4440 },
                      39: { p10: 2870, p25: 3300, p50: 3760, p75: 4210, p90: 4550 },
                      40: { p10: 2990, p25: 3410, p50: 3875, p75: 4300, p90: 4600 },
                      41: { p10: 3070, p25: 3480, p50: 3940, p75: 4340, p90: 4625 },
                      42: { p10: 3110, p25: 3510, p50: 3960, p75: 4350, p90: 4635 },
                      43: { p10: 3130, p25: 3520, p50: 3970, p75: 4360, p90: 4640 }
                    };
                    
                    const weeks = Array.from({ length: 20 }, (_, i) => 24 + i);
                    
                    // Shaded AGA Region (P10 to P90)
                    const p90Points = weeks.map(w => `${getX(w)},${getY(percentiles[w].p90)}`);
                    const p10Points = [...weeks].reverse().map(w => `${getX(w)},${getY(percentiles[w].p10)}`);
                    const polygonPoints = [...p90Points, ...p10Points].join(' ');
                    
                    const p10Path = weeks.map((w, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(w)} ${getY(percentiles[w].p10)}`).join(' ');
                    const p25Path = weeks.map((w, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(w)} ${getY(percentiles[w].p25)}`).join(' ');
                    const p50Path = weeks.map((w, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(w)} ${getY(percentiles[w].p50)}`).join(' ');
                    const p75Path = weeks.map((w, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(w)} ${getY(percentiles[w].p75)}`).join(' ');
                    const p90Path = weeks.map((w, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(w)} ${getY(percentiles[w].p90)}`).join(' ');
                    
                    const dotX = getX(constrainedGa);
                    const dotY = getY(constrainedBw);
                    
                    return (
                      <svg width="100%" height="450" viewBox="0 0 520 510" className="text-slate-400 dark:text-slate-500 overflow-visible font-sans select-none">
                        
                        {/* Title inside SVG */}
                        <text x="60" y="30" className="text-xs font-black fill-slate-800 dark:fill-slate-200 tracking-tight">WEIGHT PERCENTILES (both sexes)</text>
                        
                        {/* Shaded Normal AGA Region */}
                        <polygon points={polygonPoints} className="fill-emerald-500/10 dark:fill-emerald-500/5 stroke-none" />
                        
                        {/* DENSE GRID LINES */}
                        {/* Vertical grid lines (every week from 24 to 43) */}
                        {weeks.map(w => (
                          <line 
                            key={`v-${w}`} 
                            x1={getX(w)} 
                            y1={50} 
                            x2={getX(w)} 
                            y2={440} 
                            stroke="currentColor" 
                            strokeWidth="1" 
                            className="stroke-slate-200 dark:stroke-slate-800"
                          />
                        ))}
                        
                        {/* Horizontal grid lines (every 200g from 200g to 4600g) */}
                        {Array.from({ length: 23 }, (_, i) => (i + 1) * 200).map(g => (
                          <line 
                            key={`h-${g}`} 
                            x1={60} 
                            y1={getY(g)} 
                            x2={480} 
                            y2={getY(g)} 
                            stroke="currentColor" 
                            strokeWidth="1" 
                            className="stroke-slate-200 dark:stroke-slate-800"
                          />
                        ))}
                        
                        {/* Solid Chart Frame Borders */}
                        <rect x="60" y="50" width="420" height="390" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-slate-700 dark:stroke-slate-500" />
                        
                        {/* Preterm / Term Dividing Line */}
                        <line x1={getX(37)} y1={50} x2={getX(37)} y2={440} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
                        <text x={getX(37)} y="45" textAnchor="middle" className="text-[8px] font-black fill-red-500">37 Mgg (Term)</text>

                        {/* 5 PERCENTILE CURVES (Solid Professional Curves) */}
                        <path d={p10Path} fill="none" stroke="#e11d48" strokeWidth="2" className="stroke-rose-600 dark:stroke-rose-500" />
                        <path d={p25Path} fill="none" stroke="#f59e0b" strokeWidth="1.5" className="stroke-amber-500 dark:stroke-amber-500/80" />
                        <path d={p50Path} fill="none" stroke="#10b981" strokeWidth="2.2" className="stroke-emerald-600 dark:stroke-emerald-500" />
                        <path d={p75Path} fill="none" stroke="#6366f1" strokeWidth="1.5" className="stroke-indigo-500 dark:stroke-indigo-500/80" />
                        <path d={p90Path} fill="none" stroke="#8b5cf6" strokeWidth="2" className="stroke-purple-600 dark:stroke-purple-500" />
                        
                        {/* Percentile Boxes at the Right (matching reference style) */}
                        {[
                          { val: '90', g: percentiles[41].p90, bg: 'fill-purple-500 dark:fill-purple-600' },
                          { val: '75', g: percentiles[41].p75, bg: 'fill-indigo-500 dark:fill-indigo-600' },
                          { val: '50', g: percentiles[41].p50, bg: 'fill-emerald-500 dark:fill-emerald-600' },
                          { val: '25', g: percentiles[41].p25, bg: 'fill-amber-500 dark:fill-amber-600' },
                          { val: '10', g: percentiles[41].p10, bg: 'fill-rose-500 dark:fill-rose-600' }
                        ].map(box => (
                          <g key={`box-${box.val}`} transform={`translate(${getX(41.4) - 8}, ${getY(box.g) - 6.5})`}>
                            <rect width="16" height="13" className={`${box.bg} stroke-white dark:stroke-slate-900`} strokeWidth="1" rx="2.5" />
                            <text x="8" y="9.5" textAnchor="middle" className="text-[8px] font-black fill-white">{box.val}</text>
                          </g>
                        ))}

                        {/* Y-axis text labels (every 200g or 400g) */}
                        {Array.from({ length: 12 }, (_, i) => i * 400).map(g => (
                          <text key={`yl-${g}`} x="52" y={getY(g) + 3.5} textAnchor="end" className="text-[9px] font-extrabold fill-slate-500 dark:fill-slate-400 font-mono">{g}</text>
                        ))}
                        {/* Axis Y Label */}
                        <text x="18" y="245" textAnchor="middle" transform="rotate(-90, 18, 245)" className="text-[10px] font-black uppercase tracking-wider fill-slate-500 dark:fill-slate-400">Berat Badan (Gram)</text>

                        {/* X-axis text labels (weeks from 24 to 43) */}
                        {weeks.map(w => (
                          <text key={`xl-${w}`} x={getX(w)} y="457" textAnchor="middle" className="text-[9px] font-extrabold fill-slate-500 dark:fill-slate-400 font-mono">{w}</text>
                        ))}
                        {/* Axis X Label */}
                        <text x="270" y="475" textAnchor="middle" className="text-[10px] font-black uppercase tracking-wider fill-slate-500 dark:fill-slate-400">Usia Kehamilan / Gestational Age (Minggu)</text>

                        {/* Segment Labels: PRETERM vs TERM */}
                        <g transform="translate(0, 488)">
                          {/* Preterm Zone bar */}
                          <rect x="60" y="0" width={getX(37) - 60} height="16" fill="none" stroke="currentColor" strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" rx="4" />
                          <text x={(60 + getX(37)) / 2} y="11" textAnchor="middle" className="text-[9px] font-black fill-slate-500 dark:fill-slate-400 tracking-widest">PRETERM</text>
                          
                          {/* Term Zone bar */}
                          <rect x={getX(37)} y="0" width={480 - getX(37)} height="16" fill="none" stroke="currentColor" strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" rx="4" />
                          <text x={(getX(37) + 480) / 2} y="11" textAnchor="middle" className="text-[9px] font-black fill-slate-500 dark:fill-slate-400 tracking-widest">TERM</text>
                        </g>

                        {/* Patient Dot Indicator (Static Dot) */}
                        <g>
                          <circle cx={dotX} cy={dotY} r="6.5" className={`${status === 'AGA' ? 'fill-emerald-500' : 'fill-rose-500'} stroke-white dark:stroke-slate-900 stroke-[2] shadow-lg`} />
                        </g>
                      </svg>
                    );
                  })()}
                </div>

                {/* Patient Status Details Card (Right Column) */}
                <div className="flex-1 flex flex-col justify-center">
                  {status === 'SGA' && (
                    <div className="bg-orange-50 dark:bg-orange-500/20 border border-orange-200 dark:border-orange-500/50 rounded-xl p-5 shadow-sm text-center md:text-left h-full flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="inline-block bg-orange-500 text-white font-extrabold text-sm px-3.5 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
                          SGA (Small for Gestational Age)
                        </span>
                        <h4 className="font-extrabold text-base text-slate-900 dark:text-white pt-2">Berat Kurang Untuk Masa Kehamilan</h4>
                        <p className="text-xs text-orange-850 dark:text-orange-200 font-medium leading-relaxed">
                          Berat badan lahir berada di bawah **Persentil 10** kurva pertumbuhan Lubchenco untuk usia kehamilan {gaNum} minggu.
                        </p>
                      </div>
                      <div className="mt-4 bg-orange-100/50 dark:bg-orange-600/20 text-orange-950 dark:text-white p-3.5 rounded-xl flex items-start gap-2.5 border border-orange-200 dark:border-orange-500/40">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-orange-600 dark:text-orange-350 animate-pulse mt-0.5" />
                        <div className="text-left">
                          <span className="font-black text-xs block uppercase tracking-wider">Peringatan Klinis</span>
                          <span className="font-semibold text-[11px] leading-relaxed block mt-0.5">Waspada risiko tinggi terjadi **Hipoglikemia Akut**, Hipotermia berat, dan asfiksia perinatal. Siapkan protokol monitoring GDS rutin!</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {status === 'AGA' && (
                    <div className="bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-300/60 dark:border-emerald-500/50 rounded-xl p-5 shadow-sm text-center md:text-left h-full flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="inline-block bg-emerald-500 text-white font-extrabold text-sm px-3.5 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
                          AGA (Appropriate for Gestational Age)
                        </span>
                        <h4 className="font-extrabold text-base text-slate-900 dark:text-white pt-2">Berat Sesuai Masa Kehamilan</h4>
                        <p className="text-xs text-emerald-800 dark:text-emerald-200 font-medium leading-relaxed">
                          Berat badan lahir berada di rentang normal **Persentil 10 hingga 90** kurva pertumbuhan Lubchenco untuk usia kehamilan {gaNum} minggu.
                        </p>
                      </div>
                      <div className="mt-4 bg-emerald-500/10 dark:bg-emerald-500/10 text-emerald-950 dark:text-emerald-250 p-3.5 rounded-xl flex items-start gap-2.5 border border-emerald-300 dark:border-emerald-500/30">
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                        <div className="text-left">
                          <span className="font-black text-xs block uppercase tracking-wider text-emerald-800 dark:text-emerald-400">Rencana Terapi</span>
                          <span className="font-semibold text-[11px] leading-relaxed block mt-0.5">Pertumbuhan janin sesuai kehamilan. Lanjutkan perawatan rutin bayi baru lahir, inisiasi menyusui dini (IMD), dan pertahankan kehangatan tubuh bayi.</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {status === 'LGA' && (
                    <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/40 rounded-xl p-5 shadow-sm text-center md:text-left h-full flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="inline-block bg-indigo-550 dark:bg-indigo-650 text-white font-extrabold text-sm px-3.5 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
                          LGA (Large for Gestational Age)
                        </span>
                        <h4 className="font-extrabold text-base text-slate-900 dark:text-white pt-2">Berat Lebih Untuk Masa Kehamilan</h4>
                        <p className="text-xs text-indigo-850 dark:text-indigo-200 font-medium leading-relaxed">
                          Berat badan lahir berada di atas **Persentil 90** kurva pertumbuhan Lubchenco untuk usia kehamilan {gaNum} minggu.
                        </p>
                      </div>
                      <div className="mt-4 bg-indigo-100/50 dark:bg-indigo-600/20 text-indigo-950 dark:text-white p-3.5 rounded-xl flex items-start gap-2.5 border border-indigo-250 dark:border-indigo-500/30">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-indigo-550 dark:text-indigo-400 mt-0.5" />
                        <div className="text-left">
                          <span className="font-black text-xs block uppercase tracking-wider text-indigo-700 dark:text-indigo-300">Skrining Metabolik</span>
                          <span className="font-semibold text-[11px] leading-relaxed block mt-0.5">Pantau gejala **Hipoglikemia Reaktif** (terutama bila ibu menderita Diabetes Melitus). Skrining trauma lahir akibat makrosomia.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>

        {/* 2. EMERGENCY HYPOGLYCEMIA & FLUID CALCULATOR */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="bg-rose-600/80 backdrop-blur-md p-4 text-white border-b border-slate-200 dark:border-white/10">
            <h3 className="font-bold text-lg flex items-center gap-2 text-white">
              <Droplet className="w-5 h-5 animate-pulse" />
              Cairan Darurat & Manajemen Hipoglikemia
            </h3>
          </div>
          <div className="p-4 md:p-5">
            {!showGds ? (
              <button 
                onClick={() => setShowGds(true)}
                className="w-full bg-white dark:bg-white/5 hover:bg-slate-200/50 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] shadow-sm"
              >
                <Activity className="w-5 h-5 text-rose-400" />
                Cek GDS / Hipoglikemia
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
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-bold text-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  />
                </div>

                {gdsValue && gdsNum < 45 && (
                  <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-xl p-5 shadow-inner animate-in fade-in mt-4">
                    <h4 className="font-bold text-rose-600 dark:text-rose-400 text-lg mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Intervensi Hipoglikemia
                    </h4>
                    
                    <div className="bg-slate-100/50 dark:bg-slate-900/50 rounded-lg p-4 border border-rose-200 dark:border-rose-500/20 mb-3">
                      <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Bolus Darurat (Dextrose 10%)</span>
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl font-black text-rose-650 dark:text-rose-500 font-mono">{bolusD10}</span>
                        <span className="text-lg font-bold text-rose-650 dark:text-rose-500 mb-1">mL</span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                        (Dosis: 2 mL/kg). Berikan via IV perlahan dengan kecepatan alir 1 mL/menit.
                      </p>
                    </div>
 
                    <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-lg p-4 border border-indigo-200 dark:border-indigo-500/20">
                      <span className="block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">Cairan Maintenance</span>
                      <p className="text-[95%] text-slate-700 dark:text-indigo-200 font-medium leading-relaxed">
                        Lanjutkan dengan infus Glukosa kontinyu. Target <strong className="text-slate-900 dark:text-white font-bold">GIR awal 4-6 mg/kg/menit</strong>.
                        Cek ulang GDS dalam 30-60 menit.
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
        </div>

        {/* 3. GIR & FLUID DILUTION ENGINE */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="bg-cyan-600/80 backdrop-blur-md p-4 text-white border-b border-slate-200 dark:border-white/10">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Droplet className="w-5 h-5" />
              Kalkulator Titrasi Cairan & GIR
            </h3>
          </div>
          <div className="p-4 md:p-5">
            {wtKg <= 0 ? (
              <div className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center py-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 mb-2">
                <Info className="w-4 h-4 mr-2" /> Masukkan Berat Lahir di atas untuk menggunakan kalkulator.
              </div>
            ) : (
               <div className="space-y-6 animate-in slide-in-from-bottom-2">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Target GIR (mg/kg/menit)</label>
                      <input 
                        type="number" 
                        value={targetGir}
                        onChange={(e) => setTargetGir(e.target.value)}
                        className={`w-full bg-white dark:bg-slate-800 border ${girNum > 0 && (girNum < 4 || girNum > 14) ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-slate-300 dark:border-white/20'} rounded-xl px-4 py-3 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all`}
                      />
                      {girNum > 0 && (girNum < 4 || girNum > 14) && (
                        <p className="mt-2 text-xs font-bold text-red-500 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Target GIR di luar batas aman protokol (4 - 14 mg/kg/menit)!
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Target Total Cairan Harian (mL/kg/hari)</label>
                      <input 
                        type="number" 
                        value={targetFluid}
                        onChange={(e) => setTargetFluid(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      />
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
        </div>

        {/* 4. INOTROPIC SYRINGE PUMP DILUTION GUIDE */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="bg-indigo-600/80 backdrop-blur-md p-4 text-white border-b border-slate-200 dark:border-white/10">
            <h3 className="font-bold text-lg flex items-center gap-2 text-white">
              <Syringe className="w-5 h-5" />
              Pompa Syringe Inotropik (Dopamin/Dobutamin)
            </h3>
          </div>
          <div className="p-4 md:p-5">
            {wtKg <= 0 ? (
              <div className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center py-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 mb-2">
                <Info className="w-4 h-4 mr-2" /> Masukkan Berat Lahir di atas untuk menggunakan kalkulator.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
                
                {/* Form Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Target Dosis Mikro (mcg/kg/min)
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={dose}
                        onChange={(e) => setDose(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl pl-4 pr-16 py-3 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-bold">mcg</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Total Volume Spuit (mL)
                    </label>
                    <div className="flex gap-2">
                      {[ {label: '50', val: '50'} ].map(opt => (
                        <button
                          key={opt.val}
                          onClick={() => setSyringeVol(opt.val)}
                          className={`flex-1 py-3 text-sm rounded-xl font-bold border transition-all ${syringeVol === opt.val ? 'bg-indigo-600 border-indigo-500 shadow-lg text-white' : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/20 hover:bg-slate-200/50 dark:bg-white/10'}`}
                        >
                          {opt.label} mL
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Kecepatan Pump (mL/jam)
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl pl-4 pr-16 py-3 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-bold">mL/h</span>
                    </div>
                  </div>
                </div>

                {/* Calculation Output */}
                <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-5 flex flex-col justify-center shadow-inner mt-4 lg:mt-0">
                  <div className="mb-4">
                    <span className="block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 text-center">Jumlah Obat Murni Yang Di-Oplos</span>
                    <div className="flex flex-col items-center justify-center my-2">
                       <span className="text-4xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400 font-mono tracking-tight">{inotropeMg}</span>
                       <span className="text-xl font-bold text-indigo-650 dark:text-indigo-500 mt-1">mg</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-xl border border-indigo-200 dark:border-indigo-500/20 text-sm text-indigo-900 dark:text-indigo-200 font-medium leading-relaxed">
                    Larutkan <strong className="text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-500/20 px-1.5 py-0.5 rounded">{inotropeMg} mg</strong> obat inotropik ke dalam {syringeVol} mL cairan pelarut (D5% / NS). Jalankan syringe pump di kecepatan <strong className="text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-500/20 px-1.5 py-0.5 rounded">{rate} mL/jam</strong> untuk mendapatkan dosis {dose} mcg/kg/menit (BB: {wtKg} kg).
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>

      {/* Drug Dose Calculator (#5) */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden mt-6">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-red-50 dark:bg-red-950/20">
          <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Syringe className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="font-bold text-red-700 dark:text-red-300 text-sm">Kalkulator Dosis Darurat</h3>
            <p className="text-[10px] text-red-500 dark:text-red-400 font-semibold uppercase tracking-wider">Berdasarkan BB: {bwNum > 0 ? `${bwNum} g (${wtKg.toFixed(3)} kg)` : 'Belum diinput'}</p>
          </div>
        </div>
        {bwNum > 0 ? (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                name: 'Adrenalin IV/IO',
                desc: '0.1–0.3 mL/kg (1:10.000)',
                value: `${(0.1 * wtKg).toFixed(2)} – ${(0.3 * wtKg).toFixed(2)} mL`,
                note: 'IV/IO bolus cepat',
                color: 'red',
              },
              {
                name: 'Adrenalin via ETT',
                desc: '0.5–1.0 mL/kg (1:10.000)',
                value: `${(0.5 * wtKg).toFixed(2)} – ${(1.0 * wtKg).toFixed(2)} mL`,
                note: 'Intratrakeal',
                color: 'rose',
              },
              {
                name: 'Bikarbonat Natrium',
                desc: '1–2 mEq/kg → NaHCO3 4.2%',
                value: `${(2 * wtKg).toFixed(1)} – ${(4 * wtKg).toFixed(1)} mL`,
                note: 'IV/IO perlahan (asidosis)',
                color: 'orange',
              },
              {
                name: 'Nalokson',
                desc: '0.1 mg/kg (sol. 0.4 mg/mL)',
                value: `${(0.25 * wtKg).toFixed(2)} mL`,
                note: 'IM/IV (depresi opioid)',
                color: 'amber',
              },
              {
                name: 'Glukosa 10%',
                desc: '2 mL/kg bolus IV',
                value: `${(2 * wtKg).toFixed(1)} mL`,
                note: 'Hipoglikemia neonatus',
                color: 'yellow',
              },
              {
                name: 'NaCl 0.9%',
                desc: '10 mL/kg selama 5–10 menit',
                value: `${(10 * wtKg).toFixed(1)} mL`,
                note: 'Volume ekspander',
                color: 'blue',
              },
              {
                name: 'Surfaktan (Curosurf)',
                desc: '200 mg/kg (dosis 1) / 100 mg/kg (berikutnya)',
                value: `${(200 * wtKg / 80).toFixed(1)} mL / ${(100 * wtKg / 80).toFixed(1)} mL`,
                note: 'Intratrakeal (80 mg/mL)',
                color: 'teal',
              },
            ].map((drug) => (
              <div key={drug.name} className={`bg-${drug.color}-50 dark:bg-${drug.color}-950/20 border border-${drug.color}-100 dark:border-${drug.color}-900/30 rounded-xl p-3`}>
                <div className={`text-[10px] font-extrabold uppercase tracking-wider text-${drug.color}-600 dark:text-${drug.color}-400 mb-1`}>{drug.name}</div>
                <div className={`text-xl font-bold font-mono text-${drug.color}-800 dark:text-${drug.color}-200`}>{drug.value}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{drug.desc}</div>
                <div className={`text-[9px] font-bold text-${drug.color}-600 dark:text-${drug.color}-400 mt-0.5 uppercase tracking-wide`}>{drug.note}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-sm text-slate-400 dark:text-slate-500">
            <Syringe className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>Input Berat Lahir (BB) di panel Antropometri atau pada tab Alur Resusitasi untuk melihat dosis otomatis.</p>
          </div>
        )}
      </div>

      {/* TPN CALCULATOR */}
      <TpnCalculator effectiveBW={effectiveBW} />

      {/* ANTIBIOTIC DOSING CALCULATOR */}
      <AntibioticCalculator effectiveBW={effectiveBW} />

      {/* UVC/UAC CATHETER DEPTH CALCULATOR */}
      <UvcUacCalculator effectiveBW={effectiveBW} />

      {/* SEIZURE MANAGEMENT CALCULATOR */}
      <SeizureCalculator effectiveBW={effectiveBW} />

      {/* UNIT CONVERSION CALCULATOR */}
      <UnitConverter effectiveBW={effectiveBW} />

      {/* FENTON 2013 GROWTH CHART */}
      <FentonGrowthChart effectiveBW={effectiveBW} gestationalAge={effectiveGA} />

    </div>
  );
}

// ==========================================
// NILAI NORMAL NEONATUS
// ==========================================
function NilaiNormalCard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-6">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Nilai Normal Neonatus</span>
          <span className="text-xs text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-950/40 px-2 py-0.5 rounded font-bold ml-1">Referensi Cepat</span>
        </div>
        <svg className={`w-4 h-4 text-teal-500 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {open && (
        <div className="border-t border-teal-100 dark:border-teal-500/20 p-4 md:p-5 space-y-5">

          {/* a) Target SpO2 NRP 2021 */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-2">a) Target SpO₂ Preduktal (NRP 2021)</h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-teal-50 dark:bg-teal-950/30">
                    <th className="text-left p-2.5 font-extrabold text-teal-700 dark:text-teal-300 uppercase tracking-wider">Menit ke-</th>
                    <th className="text-center p-2.5 font-extrabold text-teal-700 dark:text-teal-300 uppercase tracking-wider">Target SpO₂</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[['1','60–65%'],['2','65–70%'],['3','70–75%'],['4','75–80%'],['5','80–85%'],['10','85–95%']].map(([m, t]) => (
                    <tr key={m} className="bg-white dark:bg-slate-900/30 hover:bg-teal-50/30 dark:hover:bg-teal-950/20 transition-colors">
                      <td className="p-2.5 font-semibold text-slate-700 dark:text-slate-300">{m} menit</td>
                      <td className="p-2.5 text-center font-bold text-teal-700 dark:text-teal-300">{t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* b) Hemodinamik Normal */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">b) Nilai Hemodinamik Normal</h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-950/30">
                    <th className="text-left p-2.5 font-extrabold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Parameter</th>
                    <th className="text-center p-2.5 font-extrabold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Aterm</th>
                    <th className="text-center p-2.5 font-extrabold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Prematur 34–37 mgg</th>
                    <th className="text-center p-2.5 font-extrabold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Prematur &lt;34 mgg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    ['HR (x/mnt)','100–160','100–160','100–170'],
                    ['RR (x/mnt)','40–60','40–60','40–70'],
                    ['SpO₂','95–100%','95–100%','92–98%'],
                    ['MAP (mmHg)','45–60','35–50','≥ GA (minggu)'],
                  ].map(([p,a,b,c]) => (
                    <tr key={p} className="bg-white dark:bg-slate-900/30 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-colors">
                      <td className="p-2.5 font-semibold text-slate-700 dark:text-slate-300">{p}</td>
                      <td className="p-2.5 text-center font-bold text-slate-800 dark:text-slate-200">{a}</td>
                      <td className="p-2.5 text-center font-bold text-slate-800 dark:text-slate-200">{b}</td>
                      <td className="p-2.5 text-center font-bold text-slate-800 dark:text-slate-200">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* c) Gas Darah Arteri */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 mb-2">c) Gas Darah Arteri Normal Neonatus</h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-indigo-50 dark:bg-indigo-950/30">
                    <th className="text-left p-2.5 font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Parameter</th>
                    <th className="text-center p-2.5 font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Normal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[['pH','7.35–7.45'],['PaCO₂','35–45 mmHg'],['PaO₂','50–80 mmHg'],['HCO₃','20–26 mEq/L'],['BE','-4 s/d +4'],['Laktat','< 2 mmol/L']].map(([p,v]) => (
                    <tr key={p} className="bg-white dark:bg-slate-900/30 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-colors">
                      <td className="p-2.5 font-semibold text-slate-700 dark:text-slate-300">{p}</td>
                      <td className="p-2.5 text-center font-bold text-indigo-700 dark:text-indigo-300">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* d) Hematologi */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-700 dark:text-rose-400 mb-2">d) Nilai Lab Hematologi</h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-rose-50 dark:bg-rose-950/30">
                    <th className="text-left p-2.5 font-extrabold text-rose-700 dark:text-rose-300 uppercase tracking-wider">Parameter</th>
                    <th className="text-center p-2.5 font-extrabold text-rose-700 dark:text-rose-300 uppercase tracking-wider">Aterm</th>
                    <th className="text-center p-2.5 font-extrabold text-rose-700 dark:text-rose-300 uppercase tracking-wider">Prematur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    ['Hb (g/dL)','14–20','12–18'],
                    ['Ht (%)','44–64','40–55'],
                    ['Leukosit (/µL)','9000–30000','5000–20000'],
                    ['Trombosit (/µL)','150000–400000','100000–300000'],
                    ['GDS (mg/dL)','47–120','47–110'],
                  ].map(([p,a,b]) => (
                    <tr key={p} className="bg-white dark:bg-slate-900/30 hover:bg-rose-50/30 dark:hover:bg-rose-950/20 transition-colors">
                      <td className="p-2.5 font-semibold text-slate-700 dark:text-slate-300">{p}</td>
                      <td className="p-2.5 text-center font-bold text-slate-800 dark:text-slate-200">{a}</td>
                      <td className="p-2.5 text-center font-bold text-slate-800 dark:text-slate-200">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* e) Elektrolit */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">e) Elektrolit & Biokimia Normal</h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-amber-50 dark:bg-amber-950/30">
                    <th className="text-left p-2.5 font-extrabold text-amber-700 dark:text-amber-300 uppercase tracking-wider">Parameter</th>
                    <th className="text-center p-2.5 font-extrabold text-amber-700 dark:text-amber-300 uppercase tracking-wider">Normal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    ['Na','135–145 mEq/L'],
                    ['K','3.5–5.5 mEq/L'],
                    ['Ca total','8–10.5 mg/dL'],
                    ['Ca ion','1.1–1.35 mmol/L'],
                    ['Mg','1.5–2.5 mg/dL'],
                    ['Cl','98–108 mEq/L'],
                    ['Bilirubin (24j)','< 8 mg/dL'],
                    ['Kreatinin','0.3–1.0 mg/dL'],
                  ].map(([p,v]) => (
                    <tr key={p} className="bg-white dark:bg-slate-900/30 hover:bg-amber-50/30 dark:hover:bg-amber-950/20 transition-colors">
                      <td className="p-2.5 font-semibold text-slate-700 dark:text-slate-300">{p}</td>
                      <td className="p-2.5 text-center font-bold text-amber-700 dark:text-amber-300">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 dark:text-slate-500 text-right">NRP 2021 · AAP/AHA · Nelson Textbook of Pediatrics 21st ed.</p>
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
// FENTON 2013 GROWTH CHART
// ==========================================
const fentonWeightBoys: Record<number, [number, number, number, number, number]> = {
  22: [350,400,500,620,700], 23: [400,460,575,710,810], 24: [460,530,665,820,940],
  25: [535,615,770,950,1090], 26: [615,715,895,1105,1270], 27: [710,830,1035,1280,1475],
  28: [820,960,1200,1490,1720], 29: [950,1110,1390,1730,2000], 30: [1100,1285,1610,2010,2325],
  31: [1270,1485,1860,2325,2695], 32: [1460,1705,2135,2675,3100], 33: [1670,1950,2440,3055,3545],
  34: [1900,2215,2770,3470,4025], 35: [2150,2500,3120,3905,4530], 36: [2410,2800,3490,4370,5070],
  37: [2680,3110,3870,4840,5620], 38: [2940,3410,4250,5310,6170], 39: [3190,3700,4610,5750,6680],
  40: [3420,3960,4940,6160,7160], 41: [3620,4190,5240,6520,7570], 42: [3790,4390,5490,6840,7930],
};

const fentonWeightGirls: Record<number, [number, number, number, number, number]> = {
  22: [330,380,475,590,665], 23: [385,440,550,685,775], 24: [440,505,635,795,900],
  25: [510,590,740,930,1060], 26: [590,685,865,1090,1245], 27: [685,800,1015,1285,1475],
  28: [795,935,1190,1515,1745], 29: [920,1090,1395,1785,2060], 30: [1070,1270,1635,2100,2430],
  31: [1240,1480,1910,2460,2850], 32: [1430,1715,2220,2865,3325], 33: [1645,1980,2570,3320,3860],
  34: [1875,2270,2955,3820,4445], 35: [2120,2575,3365,4360,5075], 36: [2375,2895,3790,4920,5730],
  37: [2630,3215,4225,5490,6395], 38: [2875,3520,4655,6055,7060], 39: [3100,3805,5070,6600,7700],
  40: [3300,4060,5460,7115,8300], 41: [3465,4285,5810,7590,8855], 42: [3595,4475,6120,8020,9360],
};

function FentonGrowthChart({ effectiveBW, gestationalAge }: { effectiveBW: string; gestationalAge: string }) {
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [gaInput, setGaInput] = useState(gestationalAge || '');
  const [bbInput, setBbInput] = useState(effectiveBW || '');
  const [open, setOpen] = useState(false);

  const table = sex === 'male' ? fentonWeightBoys : fentonWeightGirls;
  const gaNum = Math.min(42, Math.max(22, parseInt(gaInput) || 0));
  const bbNum = parseInt(bbInput) || 0;

  const row = gaNum >= 22 && gaNum <= 42 ? table[gaNum] : null;
  const interp = row && bbNum > 0
    ? bbNum < row[1] ? 'SGA'
    : bbNum > row[3] ? 'LGA'
    : 'AGA'
    : null;

  // SVG chart: GA 24-42 on X, weight 0-9000 on Y
  const gaRange = Array.from({ length: 19 }, (_, i) => i + 24); // 24..42
  const svgW = 400; const svgH = 200;
  const padL = 36; const padR = 10; const padT = 10; const padB = 24;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;
  const maxY = 9000;

  const xPos = (ga: number) => padL + ((ga - 24) / 18) * chartW;
  const yPos = (g: number) => padT + chartH - (g / maxY) * chartH;

  const pctColors = ['#f87171','#fb923c','#22c55e','#60a5fa','#818cf8'];
  const pctLabels = ['P3','P10','P50','P90','P97'];

  const polylinePoints = (pIdx: number) =>
    gaRange.map(ga => `${xPos(ga)},${yPos(table[ga][pIdx])}`).join(' ');

  const dotX = gaNum >= 24 && gaNum <= 42 && bbNum > 0 ? xPos(gaNum) : null;
  const dotY = bbNum > 0 && gaNum >= 24 && gaNum <= 42 ? yPos(bbNum) : null;

  return (
    <div className="mt-6 glass-card rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
          <span className="font-bold text-slate-900 dark:text-white text-sm">Kurva Pertumbuhan Fenton 2013</span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/40 px-2 py-0.5 rounded font-bold ml-1">Baru</span>
        </div>
        <svg className={`w-4 h-4 text-emerald-500 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {open && (
        <div className="border-t border-emerald-100 dark:border-emerald-500/20 p-4 md:p-6 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Jenis Kelamin</label>
              <div className="flex gap-1">
                <button onClick={() => setSex('male')} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${sex === 'male' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'}`}>Laki-laki</button>
                <button onClick={() => setSex('female')} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${sex === 'female' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'}`}>Perempuan</button>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">GA (minggu, 22–42)</label>
              <input type="number" min={22} max={42} value={gaInput} onChange={e => setGaInput(e.target.value)} placeholder="cth: 32" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">BB Lahir (gram)</label>
              <input type="number" value={bbInput} onChange={e => setBbInput(e.target.value)} placeholder="cth: 1200" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>

          {/* SVG Chart */}
          <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 p-3 overflow-x-auto">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-full" style={{ minWidth: 280 }}>
              {/* Grid lines */}
              {[0,1000,2000,3000,4000,5000,6000,7000,8000,9000].map(g => (
                <line key={g} x1={padL} y1={yPos(g)} x2={svgW - padR} y2={yPos(g)} stroke="#e2e8f0" strokeWidth={0.5} />
              ))}
              {gaRange.filter(ga => ga % 2 === 0).map(ga => (
                <line key={ga} x1={xPos(ga)} y1={padT} x2={xPos(ga)} y2={svgH - padB} stroke="#e2e8f0" strokeWidth={0.5} />
              ))}
              {/* Percentile curves */}
              {[0,1,2,3,4].map(pi => (
                <polyline key={pi} points={polylinePoints(pi)} fill="none" stroke={pctColors[pi]} strokeWidth={pi === 2 ? 1.5 : 1} strokeDasharray={pi === 0 || pi === 4 ? '3,2' : pi === 1 || pi === 3 ? '5,2' : undefined} opacity={0.85} />
              ))}
              {/* Patient dot */}
              {dotX !== null && dotY !== null && (
                <>
                  <circle cx={dotX} cy={dotY} r={5} fill="#ef4444" stroke="white" strokeWidth={1.5} />
                  <circle cx={dotX} cy={dotY} r={9} fill="none" stroke="#ef4444" strokeWidth={1} opacity={0.4} />
                </>
              )}
              {/* X axis labels */}
              {gaRange.filter(ga => ga % 4 === 0).map(ga => (
                <text key={ga} x={xPos(ga)} y={svgH - padB + 12} textAnchor="middle" fontSize={7} fill="#94a3b8">{ga}</text>
              ))}
              {/* Y axis labels */}
              {[0,2000,4000,6000,8000].map(g => (
                <text key={g} x={padL - 3} y={yPos(g) + 3} textAnchor="end" fontSize={6.5} fill="#94a3b8">{g/1000}k</text>
              ))}
              {/* Legend */}
              {pctLabels.map((lbl, i) => (
                <g key={lbl}>
                  <line x1={svgW - padR - 60 + i * 12} y1={padT + 8} x2={svgW - padR - 55 + i * 12} y2={padT + 8} stroke={pctColors[i]} strokeWidth={1.5} />
                  <text x={svgW - padR - 55 + i * 12} y={padT + 11} fontSize={5.5} fill={pctColors[i]}>{lbl}</text>
                </g>
              ))}
              {/* Axis labels */}
              <text x={padL + chartW / 2} y={svgH} textAnchor="middle" fontSize={7} fill="#94a3b8">Usia Gestasi (minggu)</text>
            </svg>
          </div>

          {/* Percentile table for selected GA */}
          {row && (
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-emerald-50 dark:bg-emerald-950/30">
                    <th className="p-2 text-left font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">GA {gaNum}mgg ({sex === 'male' ? 'L' : 'P'})</th>
                    {pctLabels.map(l => <th key={l} className="p-2 text-center font-bold text-emerald-600 dark:text-emerald-400">{l}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-slate-900/30">
                    <td className="p-2 font-semibold text-slate-700 dark:text-slate-300">Berat (gram)</td>
                    {row.map((v, i) => (
                      <td key={i} className={`p-2 text-center font-bold tabular-nums ${bbNum > 0 && ((i === 0 && bbNum < v) || (i === 4 && bbNum > v) || (i === 1 && bbNum < v) || (i === 3 && bbNum > v)) ? 'text-slate-400 dark:text-slate-600' : (bbNum > 0 && i === 2) ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'} ${bbNum > 0 && bbNum >= (i > 0 ? row[i-1] : 0) && bbNum <= v ? 'bg-emerald-50 dark:bg-emerald-950/30' : ''}`}>
                        {v}
                        {bbNum > 0 && bbNum >= (i > 0 ? row[i-1] : 0) && bbNum < v ? ' ◀' : ''}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Interpretation */}
          {interp && bbNum > 0 && gaNum >= 22 && (
            <div className={`rounded-2xl border-2 p-4 text-center ${interp === 'AGA' ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700' : interp === 'SGA' ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700' : 'bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-700'}`}>
              <span className={`text-3xl font-black ${interp === 'AGA' ? 'text-emerald-600 dark:text-emerald-400' : interp === 'SGA' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{interp}</span>
              <span className="block text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">
                {interp === 'SGA' ? 'Small for Gestational Age (<P10)' : interp === 'AGA' ? 'Appropriate for Gestational Age (P10–P90)' : 'Large for Gestational Age (>P90)'}
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-500 mt-0.5">BB {bbNum}g · GA {gaNum} minggu · {sex === 'male' ? 'Laki-laki' : 'Perempuan'}</span>
            </div>
          )}
          <p className="text-[10px] text-slate-400 text-right">Fenton TR &amp; Kim JH. BMC Pediatrics. 2013;13:59. doi:10.1186/1471-2431-13-59</p>
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

    // Gentamisin 10 mg/mL
    let gentDose = 4; let gentInterval = 'q24h';
    if (gaNum < 29) { gentDose = 5; gentInterval = 'q48h'; }
    else if (gaNum <= 34) { gentDose = 4; gentInterval = 'q36h'; }
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

  const uaLength = bwKg > 0 ? bwKg * 3 + 9 : 0;
  const uvcDepth = bwKg > 0 ? (0.5 * uaLength + 1) : 0;
  const uacHigh = bwKg > 0 ? 3 * bwKg + 9 : 0;
  const uacLow = bwKg > 0 ? bwKg + 7 : 0;

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
