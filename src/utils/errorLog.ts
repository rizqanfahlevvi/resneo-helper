// ============================================================
// Error logging ringan — ring buffer di localStorage.
// Tujuan: saat app dipakai bedside/darurat lalu crash, ada jejak
// untuk didiagnosis nanti (tanpa perlu layanan pihak ketiga).
// ============================================================

const STORAGE_KEY = 'resneo-error-log';
const MAX_ENTRIES = 30;

export interface ErrorLogEntry {
  timestamp: string; // ISO
  message: string;
  stack?: string;
  source: 'window.onerror' | 'unhandledrejection' | 'react-error-boundary';
  route?: string;
}

function readLog(): ErrorLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeLog(entries: ErrorLogEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
  } catch {
    // localStorage penuh/diblokir — abaikan, jangan sampai logging error melempar error baru
  }
}

export function logError(entry: Omit<ErrorLogEntry, 'timestamp' | 'route'>): void {
  const full: ErrorLogEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
    route: typeof window !== 'undefined' ? window.location.hash : undefined,
  };
  writeLog([full, ...readLog()]);
}

export function getErrorLog(): ErrorLogEntry[] {
  return readLog();
}

export function clearErrorLog(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}

let installed = false;

/** Pasang listener global sekali di root app. */
export function installGlobalErrorHandlers(): void {
  if (installed || typeof window === 'undefined') return;
  installed = true;

  window.addEventListener('error', (event) => {
    logError({
      source: 'window.onerror',
      message: event.message || 'Unknown error',
      stack: event.error?.stack,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    logError({
      source: 'unhandledrejection',
      message: reason?.message || String(reason) || 'Unhandled promise rejection',
      stack: reason?.stack,
    });
  });
}
