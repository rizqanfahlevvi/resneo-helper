import { useRegisterSW } from 'virtual:pwa-register/react';

export function usePwaUpdate() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      // Periodically check for updates every 60 minutes
      if (r) {
        setInterval(async () => {
          if (!r.installing && navigator.onLine) {
            const resp = await fetch(swUrl, { cache: 'no-store', headers: { cache: 'no-store', 'cache-control': 'no-cache' } });
            if (resp?.status === 200) await r.update();
          }
        }, 60 * 60 * 1000);
      }
    },
  });

  const checkForUpdates = () => updateServiceWorker(false);
  const applyUpdate = () => updateServiceWorker(true);

  return { needRefresh, checkForUpdates, applyUpdate };
}
