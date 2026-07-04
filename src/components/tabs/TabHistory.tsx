import { useStore } from '../../store';
import { Clock, Trash2, ChevronDown, ChevronUp, FileText, Download, CloudUpload, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/useAuth';
import { getRecentSessions } from '../../lib/firestore';
import { exportSessionPdf } from '../../utils/pdfExport';
import { SessionRecord } from '../../store';

export default function TabHistory() {
  const { sessionHistory, clearHistory, patientIdentity } = useStore();
  const [expanded, setExpanded] = useState<string | null>(null);
  const { user } = useAuth();
  const [cloudSessions, setCloudSessions] = useState<SessionRecord[]>([]);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!user) return;
    setSyncing(true);
    getRecentSessions(user.uid)
      .then(setCloudSessions)
      .catch((err) => console.warn('Gagal memuat riwayat cloud:', err))
      .finally(() => setSyncing(false));
  }, [user]);

  // Gabungkan sesi lokal + cloud, dedup berdasar id (id dibuat sama di kedua sisi saat sinkron)
  const mergedSessions = (() => {
    const map = new Map<string, SessionRecord>();
    cloudSessions.forEach((s) => map.set(s.id, s));
    sessionHistory.forEach((s) => map.set(s.id, s)); // lokal menang jika ada konflik (paling baru di device ini)
    return Array.from(map.values()).sort((a, b) => Number(b.id) - Number(a.id));
  })();

  if (mergedSessions.length === 0 && !syncing) {
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
        <div>
          <h2 className="text-lg font-black text-slate-800 dark:text-white">Riwayat Sesi Resusitasi</h2>
          {user && (
            <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
              {syncing ? (
                <><Loader2 className="w-3 h-3 animate-spin" /> Menyinkronkan dengan cloud...</>
              ) : (
                <><CloudUpload className="w-3 h-3" /> Tersinkronisasi ke akun Anda</>
              )}
            </p>
          )}
        </div>
        <button
          onClick={() => { if (window.confirm('Hapus semua riwayat lokal? Data di cloud tidak terhapus.')) clearHistory(); }}
          className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" /> Hapus Lokal
        </button>
      </div>

      {mergedSessions.map(session => (
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
            <div className="border-t border-slate-100 dark:border-slate-800 px-4 pb-4 pt-3 space-y-3">
              <button
                onClick={() => exportSessionPdf({ session, patientIdentity })}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Download className="w-3.5 h-3.5" /> Unduh PDF
              </button>
              <div className="space-y-1.5">
                {session.log.map((entry, i) => (
                  <div key={i} className="flex gap-2 text-xs">
                    <span className="font-mono text-slate-400 dark:text-slate-500 shrink-0">{entry.time}</span>
                    <span className="text-slate-700 dark:text-slate-300">{entry.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
