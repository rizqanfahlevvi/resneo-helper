import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Layout from './components/Layout';
import TabEmergency from './components/tabs/TabEmergency';
import TabScores from './components/tabs/TabScores';
import TabAdvanced from './components/tabs/TabAdvanced';
import TabHome from './components/tabs/TabHome';
import TabHistory from './components/tabs/TabHistory';
import TabDashboard from './components/tabs/TabDashboard';
import { useStore } from './store';
import { AlertTriangle, Lock, RefreshCw, MessageCircle, X } from 'lucide-react';
import { TabType } from './types';
import { useAuth } from './auth/useAuth';
import ProfilePopup from './auth/ProfilePopup';
import { useSettingsStore } from './settings/useSettingsStore';
import { FONT_FAMILY_MAP } from './settings/fontMap';
import { loadFont } from './utils/fontLoader';

// Halaman non-kritis di-lazy-load agar chunk awal (resusitasi) tetap kecil
const TabReferences = lazy(() => import('./components/tabs/TabReferences'));
const TabTheory = lazy(() => import('./components/tabs/TabTheory'));
const TabSettings = lazy(() => import('./components/tabs/TabSettings'));
const AdminPage = lazy(() => import('./auth/AdminPage'));

const TabFallback = () => (
  <div className="flex items-center justify-center py-24 text-slate-400 text-sm font-semibold animate-pulse">
    Memuat...
  </div>
);

const TAB_PATHS: Record<TabType, string> = {
  home: '/',
  emergency: '/emergency',
  scores: '/scores',
  advanced: '/advanced',
  references: '/references',
  theory: '/theory',
  history: '/history',
  dashboard: '/dashboard',
  settings: '/settings',
};

const PATH_TABS: Record<string, TabType> = Object.fromEntries(
  Object.entries(TAB_PATHS).map(([tab, path]) => [path, tab as TabType])
);

// Fade-transition wrapper: fade out current tab, swap content, fade in new tab
function TabTransition({ activeTab, children }: { activeTab: TabType; children: (tab: TabType) => React.ReactNode }) {
  const [visibleTab, setVisibleTab] = useState<TabType>(activeTab);
  const [opacity, setOpacity] = useState(1);
  const pendingTab = useRef<TabType | null>(null);
  const animating = useRef(false);

  useEffect(() => {
    if (activeTab === visibleTab) return;
    if (animating.current) {
      pendingTab.current = activeTab;
      return;
    }
    animating.current = true;
    setOpacity(0);
    const swap = setTimeout(() => {
      setVisibleTab(activeTab);
      setOpacity(1);
      setTimeout(() => {
        animating.current = false;
        if (pendingTab.current && pendingTab.current !== activeTab) {
          // will re-trigger via next render
        }
        pendingTab.current = null;
      }, 200);
    }, 180);
    return () => clearTimeout(swap);
  }, [activeTab]);

  return (
    <div
      style={{ opacity, transition: 'opacity 180ms ease' }}
    >
      {children(visibleTab)}
    </div>
  );
}

function getTabFromHash(): TabType {
  const path = window.location.hash.replace('#', '') || '/';
  return PATH_TABS[path] ?? 'home';
}

function fmtDateID(val: any): string {
  const date = val?.toDate ? val.toDate() : (val ? new Date(val) : null);
  if (!date) return 'Seumur hidup';
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function App() {
  const { activeTab, setActiveTab, downeScore, setPhase, addLog, elapsedTime } = useStore();
  const { user, userProfile, isAdmin, refreshProfile } = useAuth();
  const { fontFamily, fontScale, fontWeight, bwMode, readingMode } = useSettingsStore();
  // Shared state across tabs
  const [gestationalAge, setGestationalAge] = useState<string>('');
  const [birthWeight, setBirthWeight] = useState<string>('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [checkingAccess, setCheckingAccess] = useState(false);

  // Terapkan preferensi Setting App (font, skala, ketebalan, skema warna) ke root document
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--font-scale', fontScale.toString());

    const lightWeight = Math.max(100, Math.min(900, 300 + fontWeight));
    const normalWeight = Math.max(100, Math.min(900, 400 + fontWeight));
    const mediumWeight = Math.max(100, Math.min(900, 500 + fontWeight));
    const semiboldWeight = Math.max(100, Math.min(900, 600 + fontWeight));
    const boldWeight = Math.max(100, Math.min(900, 700 + fontWeight));
    const extraboldWeight = Math.max(100, Math.min(900, 800 + fontWeight));
    const blackWeight = Math.max(100, Math.min(900, 900 + fontWeight));

    root.style.setProperty('--fw-light', lightWeight.toString());
    root.style.setProperty('--fw-normal', normalWeight.toString());
    root.style.setProperty('--fw-medium', mediumWeight.toString());
    root.style.setProperty('--fw-semibold', semiboldWeight.toString());
    root.style.setProperty('--fw-bold', boldWeight.toString());
    root.style.setProperty('--fw-extrabold', extraboldWeight.toString());
    root.style.setProperty('--fw-black', blackWeight.toString());

    loadFont(fontFamily);
    root.style.setProperty('--font-sans', FONT_FAMILY_MAP[fontFamily] || FONT_FAMILY_MAP.system);

    if (bwMode) {
      root.classList.add('bw-mode');
    } else {
      root.classList.remove('bw-mode');
    }
  }, [fontFamily, fontScale, fontWeight, bwMode]);

  // Aktifkan transisi halus setelah initial load agar tidak flicker
  useEffect(() => {
    const timer = setTimeout(() => {
      document.documentElement.classList.add('theme-transition');
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Sync tab ↔ URL hash
  const navigateTo = (tab: TabType) => {
    const path = TAB_PATHS[tab];
    const hash = path === '/' ? '' : path;
    history.pushState({ tab }, '', '#' + hash);
    setActiveTab(tab);
  };

  useEffect(() => {
    // On mount: replace current history entry so back doesn't go to non-hash URL
    const tab = getTabFromHash();
    history.replaceState({ tab }, '', window.location.href);
    if (tab !== activeTab) setActiveTab(tab);

    const onPopState = (e: PopStateEvent) => {
      const currentTab = getTabFromHash();
      setActiveTab(currentTab);
      // If we've popped to the very first entry and it's the app root, push a new entry
      // to prevent the next back press from exiting the SPA
      if (!e.state) {
        history.replaceState({ tab: currentTab }, '', window.location.href);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const showDowneAlert = downeScore > 6 && activeTab !== 'emergency';

  const displayName = userProfile?.namaLengkap || userProfile?.username || user?.email?.split('@')[0] || '';
  const userInitial = displayName.trim().charAt(0).toUpperCase() || '?';

  const normalizedStatus = userProfile?.subscriptionStatus?.toLowerCase() || 'inactive';
  const isAdminUser = isAdmin;
  const isLocked = !!user &&
    !isAdminUser &&
    (normalizedStatus !== 'active' && normalizedStatus !== 'trial');
  const isHomeTab = activeTab === 'home';
  const shouldShowOverlay = isLocked && !isHomeTab;

  const waLockedLink = `https://wa.me/6287749076019?text=${encodeURIComponent(
    `Hai dok, saya sudah daftar ResNeo Helper MD Kit, username saya ${userProfile?.username || user?.email || ''}`
  )}`;
  const waTrialLink = waLockedLink;

  const handleCheckAccess = async () => {
    setCheckingAccess(true);
    try {
      await refreshProfile();
    } finally {
      setCheckingAccess(false);
    }
  };

  if (adminOpen) {
    return (
      <Suspense fallback={<TabFallback />}>
        <AdminPage onBack={() => setAdminOpen(false)} />
      </Suspense>
    );
  }

  return (
    <>
      {showDowneAlert && (
        <div className="fixed top-0 left-0 w-full z-50 p-4 animate-in slide-in-from-top-4">
          <div className="max-w-2xl mx-auto bg-red-600/90 backdrop-blur-md border border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)] text-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 shrink-0 animate-pulse" />
              <div className="text-left">
                <h3 className="font-bold uppercase tracking-wider text-sm">🚨 Peringatan Bedside</h3>
                <p className="text-red-100 font-medium">Skor Downe &gt; 6. Pasien mengalami Gagal CPAP klinis!</p>
              </div>
            </div>
            <button
              onClick={() => {
                navigateTo('emergency');
                setPhase('compressions');
                addLog(elapsedTime, "Peringatan Global: Gagal CPAP (Skor Downe > 6). Diambil alih untuk Intubasi/VTP");
              }}
              className="bg-white text-red-700 hover:bg-neutral-100 font-bold px-4 py-2 rounded-xl whitespace-nowrap shadow-sm transition-colors text-sm uppercase tracking-wide border border-transparent hover:border-red-200"
            >
              AMBIL ALIH JALUR INTUBASI
            </button>
          </div>
        </div>
      )}

      <Layout
        activeTab={activeTab}
        onTabChange={navigateTo}
        birthWeight={birthWeight}
        setBirthWeight={setBirthWeight}
        isLoggedIn={!!user}
        userInitial={userInitial}
        onOpenProfile={() => setProfileOpen(true)}
      >
        {showBanner && normalizedStatus === 'trial' && !isLocked && (
          <div className="mb-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
              Anda sedang dalam masa Trial. Akses Anda dibatasi hingga {fmtDateID(userProfile?.subscriptionExpiredAt)}.{' '}
              <a href={waTrialLink} target="_blank" rel="noopener noreferrer" className="underline font-bold">Hubungi via WhatsApp</a>
            </p>
            <button onClick={() => setShowBanner(false)} className="text-amber-500 hover:text-amber-700 shrink-0"><X className="w-4 h-4" /></button>
          </div>
        )}
        {showBanner && normalizedStatus === 'active' && (
          <div className="mb-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Terima kasih telah berlangganan! Status aktif hingga {fmtDateID(userProfile?.subscriptionExpiredAt)}.
            </p>
            <button onClick={() => setShowBanner(false)} className="text-emerald-500 hover:text-emerald-700 shrink-0"><X className="w-4 h-4" /></button>
          </div>
        )}

        <TabTransition activeTab={activeTab}>
          {(visibleTab) => (
            <>
              {visibleTab === 'home' && <TabHome onNavigate={navigateTo} />}
              {visibleTab === 'emergency' && (
                <TabEmergency
                  gestationalAge={gestationalAge}
                  setGestationalAge={setGestationalAge}
                  birthWeight={birthWeight}
                  setBirthWeight={setBirthWeight}
                />
              )}
              {visibleTab === 'scores' && (
                <TabScores
                  gestationalAge={gestationalAge}
                  setGestationalAge={setGestationalAge}
                  birthWeight={birthWeight}
                  setBirthWeight={setBirthWeight}
                />
              )}
              {visibleTab === 'advanced' && (
                <TabAdvanced
                  gestationalAge={gestationalAge}
                  setGestationalAge={setGestationalAge}
                  birthWeight={birthWeight}
                  setBirthWeight={setBirthWeight}
                />
              )}
              {visibleTab === 'references' && (
                <Suspense fallback={<TabFallback />}><TabReferences /></Suspense>
              )}
              {visibleTab === 'theory' && (
                <div className={readingMode ? 'reading-mode' : undefined}>
                  <Suspense fallback={<TabFallback />}><TabTheory /></Suspense>
                </div>
              )}
              {visibleTab === 'history' && <TabHistory />}
              {visibleTab === 'dashboard' && <TabDashboard onNavigate={navigateTo} />}
              {visibleTab === 'settings' && (
                <Suspense fallback={<TabFallback />}><TabSettings /></Suspense>
              )}
            </>
          )}
        </TabTransition>
      </Layout>

      {shouldShowOverlay && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/30 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-[340px] w-[90%] text-center shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => navigateTo('home')}
              title="Kembali ke Beranda"
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'none',
                border: 'none',
                fontSize: 20,
                cursor: 'pointer',
                color: '#999',
                lineHeight: 1,
              }}
            >
              ✕
            </button>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4">
              <Lock className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="font-black text-slate-900 dark:text-white mb-1.5 text-lg">Fitur Terkunci</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Anda belum mengaktifkan langganan. Silakan hubungi kami via WhatsApp untuk verifikasi dan aktivasi akses.
            </p>
            <a
              href={waLockedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-sm mb-2.5"
            >
              <MessageCircle className="w-4 h-4" /> Hubungi via WhatsApp
            </a>
            <button
              onClick={handleCheckAccess}
              disabled={checkingAccess}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm rounded-xl transition-all disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${checkingAccess ? 'animate-spin' : ''}`} />
              {checkingAccess ? 'Memeriksa...' : 'Cek Status Akses'}
            </button>
          </div>
        </div>
      )}

      <ProfilePopup
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onOpenAdmin={() => {
          setProfileOpen(false);
          setAdminOpen(true);
        }}
      />
    </>
  );
}
