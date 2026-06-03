export async function forceUpdateApp(): Promise<void> {
  // 1. Hapus semua cache SW
  if ('caches' in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
  }
  // 2. Unregister semua SW agar tidak serve cache lama
  if ('serviceWorker' in navigator) {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.map(r => r.unregister()));
  }
  // 3. Navigasi ke URL baru dengan timestamp agar browser tidak pakai HTTP cache
  const url = new URL(window.location.href);
  url.searchParams.set('_v', Date.now().toString());
  window.location.replace(url.toString());
}
