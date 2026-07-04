import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X, WifiOff } from 'lucide-react';

export default function PwaUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      // Cek update tiap 30 menit selagi tab terbuka — cukup jarang untuk hemat baterai/data,
      // cukup sering agar versi baru tidak menumpuk lama tanpa disadari.
      if (!registration) return;
      setInterval(() => registration.update(), 30 * 60 * 1000);
    },
  });

  const close = () => {
    setNeedRefresh(false);
    setOfflineReady(false);
  };

  if (!needRefresh && !offlineReady) return null;

  return (
    <div className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-[90] animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl p-4 flex items-start gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${needRefresh ? 'bg-indigo-100 dark:bg-indigo-950/50' : 'bg-emerald-100 dark:bg-emerald-950/50'}`}>
          {needRefresh ? (
            <RefreshCw className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <WifiOff className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-slate-900 dark:text-white">
            {needRefresh ? 'Versi baru tersedia' : 'Siap dipakai offline'}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            {needRefresh
              ? 'Muat ulang untuk mendapatkan pembaruan terbaru ResNeo Helper.'
              : 'Aplikasi telah disimpan di perangkat — tetap bisa dipakai tanpa internet.'}
          </p>
          {needRefresh && (
            <button
              onClick={() => updateServiceWorker(true)}
              className="mt-2.5 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Muat Ulang Sekarang
            </button>
          )}
        </div>
        <button onClick={close} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
