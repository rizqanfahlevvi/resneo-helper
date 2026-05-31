import { useStore } from '../../store';
import { Clock, Trash2, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { useState } from 'react';

export default function TabHistory() {
  const { sessionHistory, clearHistory } = useStore();
  const [expanded, setExpanded] = useState<string | null>(null);

  if (sessionHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400 dark:text-slate-600 gap-4">
        <FileText className="w-12 h-12 opacity-30" />
        <p className="font-semibold">Belum ada riwayat sesi resusitasi</p>
        <p className="text-xs text-center max-w-xs">Riwayat akan tersimpan otomatis setiap kali resusitasi selesai</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-black text-slate-800 dark:text-white">Riwayat Sesi Resusitasi</h2>
        <button
          onClick={() => { if (window.confirm('Hapus semua riwayat?')) clearHistory(); }}
          className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" /> Hapus Semua
        </button>
      </div>

      {sessionHistory.map(session => (
        <div key={session.id} className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setExpanded(expanded === session.id ? null : session.id)}
            className="w-full flex items-center gap-4 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900/40">
              <Clock className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-slate-800 dark:text-white">{session.date}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-3 flex-wrap">
                <span>Durasi: <span className="font-mono font-bold">{session.duration}</span></span>
                <span>{session.log.length} entri log</span>
                {session.anthropometry?.bbl && <span>BB: {session.anthropometry.bbl}g</span>}
              </div>
            </div>
            {expanded === session.id ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
          </button>

          {expanded === session.id && (
            <div className="border-t border-slate-100 dark:border-slate-800 px-4 pb-4 pt-3 space-y-1.5">
              {session.log.map((entry, i) => (
                <div key={i} className="flex gap-2 text-xs">
                  <span className="font-mono text-slate-400 dark:text-slate-500 shrink-0">{entry.time}</span>
                  <span className="text-slate-700 dark:text-slate-300">{entry.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
