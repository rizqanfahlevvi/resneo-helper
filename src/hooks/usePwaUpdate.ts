export async function forceUpdateApp(): Promise<void> {
  // 1. Hapus semua cache SW
  if ('caches' in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
  }
  // 2. Update & unregister SW agar tidak serve cache lama
  if ('serviceWorker' in navigator) {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.map(r => r.update().catch(() => r.unregister())));
  }
  // 3. Hard reload bypass cache
  window.location.reload();
}
