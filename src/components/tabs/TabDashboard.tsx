import React from 'react';
import { LayoutDashboard, Baby, ClipboardList, Activity, History, ArrowRight } from 'lucide-react';
import { useStore } from '../../store';
import { TabType } from '../../types';

interface TabDashboardProps {
  onNavigate: (tab: TabType) => void;
}

function getDowneInterpretation(score: number): { label: string; color: string } {
  if (score === 0) return { label: 'Normal', color: 'text-emerald-600 dark:text-emerald-400' };
  if (score <= 2) return { label: 'Distres Ringan', color: 'text-yellow-600 dark:text-yellow-400' };
  if (score <= 5) return { label: 'Distres Sedang', color: 'text-orange-600 dark:text-orange-400' };
  return { label: 'Distres Berat / Gagal CPAP', color: 'text-red-600 dark:text-red-400' };
}

function formatElapsed(secs: number): string {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function TabDashboard({ onNavigate }: TabDashboardProps) {
  const { anthropometry, downeScore, phase, elapsedTime, clinicalLog, drugLog } = useStore();

  const hasBbl = !!anthropometry.bbl;
  const downeInterp = getDowneInterpretation(downeScore);

  const lastLogs = clinicalLog.slice(-3).reverse();

  const resusActive = phase !== 'preparation';
  const resusCompleted = phase === 'completed';

  return (
    <div className="animate-in fade-in duration-300 space-y-6 pb-28">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <LayoutDashboard className="w-7 h-7 text-indigo-400" />
        Dashboard Pasien
      </h2>

      {/* Identitas Pasien */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
            <Baby className="w-4 h-4 text-indigo-400" />
            Identitas Pasien
          </h3>
          <button
            onClick={() => onNavigate('emergency')}
            className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            Edit Antropometri <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'BB Lahir', value: anthropometry.bbl ? `${anthropometry.bbl} g` : '—' },
            { label: 'PB', value: anthropometry.pb ? `${anthropometry.pb} cm` : '—' },
            { label: 'LK', value: anthropometry.lk ? `${anthropometry.lk} cm` : '—' },
            { label: 'LD', value: anthropometry.ld ? `${anthropometry.ld} cm` : '—' },
            { label: 'LiLA', value: anthropometry.lila ? `${anthropometry.lila} cm` : '—' },
          ].map(item => (
            <div key={item.label} className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 text-center">
              <div className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 mb-1">{item.label}</div>
              <div className={`font-bold text-sm ${item.value === '—' ? 'text-slate-400 dark:text-slate-600' : 'text-slate-900 dark:text-white'}`}>{item.value}</div>
            </div>
          ))}
        </div>
        {!hasBbl && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-2">
            Antropometri belum diisi. Buka tab Alur Resusitasi untuk mengisi data pasien.
          </p>
        )}
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* APGAR */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">APGAR</span>
          <span className="text-2xl font-black text-slate-400 dark:text-slate-600">—</span>
          <button onClick={() => onNavigate('scores')} className="text-xs text-indigo-500 font-semibold hover:underline flex items-center gap-1">Isi Skor <ArrowRight className="w-3 h-3" /></button>
        </div>
        {/* Downe */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Downe</span>
          {downeScore > 0 ? (
            <>
              <span className={`text-2xl font-black ${downeInterp.color}`}>{downeScore}<span className="text-xs font-normal text-slate-400">/10</span></span>
              <span className={`text-xs font-bold ${downeInterp.color}`}>{downeInterp.label}</span>
            </>
          ) : (
            <>
              <span className="text-2xl font-black text-slate-400 dark:text-slate-600">—</span>
              <button onClick={() => onNavigate('scores')} className="text-xs text-indigo-500 font-semibold hover:underline flex items-center gap-1">Isi Skor <ArrowRight className="w-3 h-3" /></button>
            </>
          )}
        </div>
        {/* Thomson */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Thomson</span>
          <span className="text-2xl font-black text-slate-400 dark:text-slate-600">—</span>
          <button onClick={() => onNavigate('scores')} className="text-xs text-indigo-500 font-semibold hover:underline flex items-center gap-1">Isi Skor <ArrowRight className="w-3 h-3" /></button>
        </div>
        {/* Resusitasi */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Resusitasi</span>
          {resusActive ? (
            <>
              <span className={`text-sm font-black ${resusCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                {resusCompleted ? 'Selesai' : 'Aktif'}
              </span>
              <span className="text-xs font-mono text-slate-500">{formatElapsed(elapsedTime)}</span>
            </>
          ) : (
            <>
              <span className="text-2xl font-black text-slate-400 dark:text-slate-600">—</span>
              <button onClick={() => onNavigate('emergency')} className="text-xs text-indigo-500 font-semibold hover:underline flex items-center gap-1">Mulai <ArrowRight className="w-3 h-3" /></button>
            </>
          )}
        </div>
      </div>

      {/* Status Klinis */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-indigo-400" />
          Status Klinis
        </h3>
        <ul className="space-y-2">
          {downeScore > 0 ? (
            <li className={`text-sm font-semibold ${downeInterp.color}`}>
              • Distres napas: <span className="font-bold">{downeInterp.label}</span> (Skor Downe {downeScore}/10)
            </li>
          ) : (
            <li className="text-sm text-slate-400 dark:text-slate-500">• Skor distres napas belum diisi</li>
          )}
          {hasBbl ? (
            <li className="text-sm text-slate-700 dark:text-slate-300">
              • BB Lahir: <span className="font-bold">{anthropometry.bbl} g</span>
              {anthropometry.pb && ` · PB: ${anthropometry.pb} cm`}
              {anthropometry.lk && ` · LK: ${anthropometry.lk} cm`}
            </li>
          ) : (
            <li className="text-sm text-slate-400 dark:text-slate-500">• Antropometri belum diisi</li>
          )}
          {resusActive ? (
            <li className="text-sm text-slate-700 dark:text-slate-300">
              • Resusitasi: <span className={`font-bold ${resusCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                {resusCompleted ? `Selesai (${formatElapsed(elapsedTime)})` : `Berjalan — ${formatElapsed(elapsedTime)} | Fase: ${phase.replace(/_/g, ' ')}`}
              </span>
            </li>
          ) : (
            <li className="text-sm text-slate-400 dark:text-slate-500">• Resusitasi belum dimulai</li>
          )}
        </ul>
      </div>

      {/* Log Ringkas */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-400" />
            Log Tindakan Terakhir {clinicalLog.length > 0 && <span className="text-xs font-normal text-slate-400">({clinicalLog.length} entri)</span>}
          </h3>
          {clinicalLog.length > 0 && (
            <button onClick={() => onNavigate('history')} className="text-xs text-indigo-500 font-semibold hover:underline flex items-center gap-1">Lihat Riwayat <ArrowRight className="w-3 h-3" /></button>
          )}
        </div>
        {lastLogs.length > 0 ? (
          <div className="space-y-2">
            {lastLogs.map((log, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 font-mono text-xs text-slate-700 dark:text-slate-300">
                <span className="text-indigo-500 dark:text-indigo-400 font-bold">{log.time}</span> {log.message}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-slate-400 dark:text-slate-500 text-sm text-center py-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
            Belum ada log tindakan. Mulai sesi resusitasi untuk mencatat tindakan.
          </div>
        )}
      </div>

      {/* Drug Log */}
      {drugLog.length > 0 && (
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-400" />
            Log Obat ({drugLog.length} tindakan)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="text-left p-2">Waktu</th>
                  <th className="text-left p-2">Obat</th>
                  <th className="text-left p-2">Dosis</th>
                  <th className="text-left p-2">Rute</th>
                </tr>
              </thead>
              <tbody>
                {drugLog.slice(-5).reverse().map(d => (
                  <tr key={d.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="p-2 font-mono text-indigo-500 dark:text-indigo-400">{d.time}</td>
                    <td className="p-2 font-semibold text-slate-700 dark:text-slate-300">{d.drugName}</td>
                    <td className="p-2 text-slate-600 dark:text-slate-400">{d.dose}</td>
                    <td className="p-2 text-slate-500">{d.route}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Aksi Cepat</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate('emergency')}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-600 dark:text-rose-400 font-bold text-sm hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-colors"
          >
            <Activity className="w-4 h-4" /> Mulai Resusitasi
          </button>
          <button
            onClick={() => onNavigate('scores')}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-xl text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:bg-indigo-100 dark:hover:bg-indigo-950/40 transition-colors"
          >
            <ClipboardList className="w-4 h-4" /> Isi Skor
          </button>
          <button
            onClick={() => onNavigate('history')}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <History className="w-4 h-4" /> Lihat Riwayat
          </button>
        </div>
      </div>
    </div>
  );
}
