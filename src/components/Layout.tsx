import { ReactNode, useState, useEffect, useRef, useMemo } from 'react';
import { TabType } from '../types';
import { Baby, Activity, ClipboardList, Stethoscope, Sun, Moon, RotateCcw, Pause, Syringe, X, Menu, Play, ChevronLeft, ChevronRight, BookOpen, FileText, MoreHorizontal, Home, Search, History, LayoutDashboard, RefreshCw, Settings, Calculator } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useStore } from '../store';
import PwaInstallPrompt from './PwaInstallPrompt';
import LiveClock from './LiveClock';
import { SEARCH_INDEX } from './searchIndex';
import { forceUpdateApp } from '../hooks/usePwaUpdate';
import { ettSizeByWeight, ettDepthAtLip, adrenalinIv, adrenalinEtt } from '../clinical/doses';

interface LayoutProps {
  children: ReactNode;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  birthWeight?: string;
  setBirthWeight?: (weight: string) => void;
  isLoggedIn?: boolean;
  userInitial?: string;
  onOpenProfile?: () => void;
}

const TABS = [
  { id: 'home', label: 'Beranda', icon: Home },
  { id: 'dashboard', label: 'Dashboard Pasien', icon: LayoutDashboard },
  { id: 'emergency', label: 'Alur Resusitasi', icon: Activity },
  { id: 'scores', label: 'Skor & Penilaian', icon: ClipboardList },
  { id: 'calculators', label: 'Kalkulator Klinis', icon: Calculator },
  { id: 'advanced', label: 'Pertumbuhan & Referensi', icon: Stethoscope },
  { id: 'theory', label: 'Materi & Teori', icon: FileText },
  { id: 'references', label: 'Pustaka & Referensi', icon: BookOpen },
  { id: 'history', label: 'Riwayat Sesi', icon: History },
  { id: 'settings', label: 'Pengaturan & Info', icon: Settings },
] as const;

export default function Layout({ children, activeTab, onTabChange, birthWeight, setBirthWeight, isLoggedIn, userInitial, onOpenProfile }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [fabMenuOpen, setFabMenuOpen] = useState(false);
  const [showAdrenalinPopup, setShowAdrenalinPopup] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => { window.removeEventListener('online', onOnline); window.removeEventListener('offline', onOffline); };
  }, []);

  // Ctrl/Cmd+K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setSidebarSearchOpen(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  
  const { phase, setPhase, isTimerRunning, setIsTimerRunning, elapsedTime, addLog, setTheoryDeepLinkId } = useStore();
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [sidebarSearchOpen, setSidebarSearchOpen] = useState(false);
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState('');
  const sidebarSearchRef = useRef<HTMLInputElement>(null);

  const sidebarSearchResults = useMemo(() => {
    const q = sidebarSearchQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    return SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.keywords.some(k => k.includes(q))
    ).slice(0, 7);
  }, [sidebarSearchQuery]);

  useEffect(() => {
    if (sidebarSearchOpen) {
      setTimeout(() => sidebarSearchRef.current?.focus(), 80);
    } else {
      setSidebarSearchQuery('');
    }
  }, [sidebarSearchOpen]);

  const handleCheckUpdate = async () => {
    if (checkingUpdate) return;
    setCheckingUpdate(true);
    try {
      await forceUpdateApp();
    } catch {
      // reload gagal — reset spinner
      setCheckingUpdate(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isTimerRunning && phase !== 'completed' && phase !== 'preparation') {
        e.preventDefault();
        e.returnValue = 'Apakah Anda yakin ingin meninggalkan halaman? Skenario resusitasi sedang aktif.';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isTimerRunning, phase]);

  const showFab = phase !== 'preparation' && phase !== 'routine_care';

  const bwNum = parseInt(birthWeight || '0') || 0;
  const bwKg = bwNum / 1000;
  const ettSize = ettSizeByWeight(bwKg);
  const ettDepth = ettDepthAtLip(bwKg);
  const adrenalinIvDose = adrenalinIv(bwKg);
  const adrenalinMin = adrenalinIvDose.min;
  const adrenalinMax = adrenalinIvDose.max;
  const adrenalinEttDose = adrenalinEtt(bwKg);
  const ettAdrenalinMin = adrenalinEttDose.min;
  const ettAdrenalinMax = adrenalinEttDose.max;

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-[#0A0A0C] overflow-hidden text-slate-900 dark:text-slate-100 relative transition-colors duration-300">
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-white text-center text-xs font-bold py-1.5 px-4 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Mode Offline — Data tetap tersedia dari cache
        </div>
      )}
      {/* Backdrop for Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-45 bg-slate-950/40 backdrop-blur-xs md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Drawer (Mobile & Desktop) */}
      <aside className={`flex flex-col shrink-0 border-r border-slate-200 dark:border-slate-900 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md z-50 md:z-20 transition-all duration-300 
        fixed inset-y-0 left-0 w-64 md:relative md:translate-x-0 
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${sidebarCollapsed ? 'md:w-20' : 'md:w-64'}`}>
        
        {/* Mobile Sidebar Close Button */}
        <div className="md:hidden p-4 flex justify-end pb-0">
          <button 
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div 
          className={`pb-2 border-b border-transparent cursor-pointer hover:opacity-80 transition-opacity ${sidebarCollapsed ? 'p-4 flex justify-center' : 'p-6 pt-2 md:p-6'}`}
          onClick={() => onTabChange('home' as any)}
        >
          {sidebarCollapsed ? (
            <Baby className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Baby className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              ResNeo Helper
            </h1>
          )}
        </div>
        {/* Search Panel in Sidebar */}
        <div className={`mt-4 ${sidebarCollapsed ? 'px-3' : 'px-4'}`}>
          {sidebarSearchOpen && !sidebarCollapsed ? (
            <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800/60 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  ref={sidebarSearchRef}
                  type="text"
                  value={sidebarSearchQuery}
                  onChange={e => setSidebarSearchQuery(e.target.value)}
                  placeholder="Cari skor, prosedur, teori..."
                  className="flex-1 bg-transparent text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none font-medium"
                  onKeyDown={e => { if (e.key === 'Escape') setSidebarSearchOpen(false); }}
                />
                <button onClick={() => setSidebarSearchOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              {sidebarSearchQuery.length >= 2 ? (
                sidebarSearchResults.length > 0 ? (
                  <ul className="max-h-64 overflow-y-auto py-1">
                    {sidebarSearchResults.map(item => (
                      <li key={item.id}>
                        <button
                          onClick={() => { if (item.tab === 'theory' && item.action) setTheoryDeepLinkId(item.action); onTabChange(item.tab); setSidebarSearchOpen(false); setMobileSidebarOpen(false); }}
                          className="w-full flex items-start gap-2 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                              <span className="font-bold text-xs text-slate-900 dark:text-white truncate">{item.title}</span>
                              <span className={`text-[8px] font-black uppercase tracking-wider px-1 py-0.5 rounded flex-shrink-0 ${item.badgeColor}`}>{item.badge}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-1">{item.description}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-5 text-center text-xs text-slate-400 dark:text-slate-500">
                    Tidak ditemukan untuk <span className="font-bold">"{sidebarSearchQuery}"</span>
                  </div>
                )
              ) : (
                <div className="px-3 py-2.5">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Akses Cepat</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['APGAR','Ballard','VTP','Adrenalin','GIR','HIE'].map(hint => (
                      <button key={hint} onClick={() => setSidebarSearchQuery(hint.toLowerCase())}
                        className="text-[9px] px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700 font-semibold transition-colors">
                        {hint}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => { if (sidebarCollapsed) { setSidebarCollapsed(false); setTimeout(() => setSidebarSearchOpen(true), 150); } else { setSidebarSearchOpen(true); } }}
              title="Cari"
              className={`w-full flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all text-xs font-semibold shadow-sm ${sidebarCollapsed ? 'justify-center p-3' : 'px-4 py-2.5'}`}
            >
              <Search className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">Cari...</span>
                  <span className="text-[9px] bg-white dark:bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono border border-slate-200 dark:border-slate-700 leading-none">Ctrl+K</span>
                </>
              )}
            </button>
          )}
        </div>

        <nav className={`flex-1 space-y-2 mt-4 ${sidebarCollapsed ? 'px-3' : 'px-4'}`}>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id as TabType);
                  setMobileSidebarOpen(false);
                }}
                title={sidebarCollapsed ? tab.label : undefined}
                className={`w-full flex items-center transition-all duration-300 text-sm font-semibold relative overflow-hidden group ${
                  sidebarCollapsed 
                    ? 'justify-center p-3 rounded-2xl' 
                    : 'gap-3 px-4 py-3 rounded-2xl'
                } ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 shadow-[0_4px_12px_rgba(99,102,241,0.06)] dark:shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-900/50 border border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`} />
                {!sidebarCollapsed && <span className={isActive ? 'text-slate-900 dark:text-white font-bold' : ''}>{tab.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className={`p-4 pb-28 md:pb-4 border-t border-slate-100 dark:border-slate-900`}>
          <div className={`flex ${sidebarCollapsed ? 'justify-center' : 'justify-end'}`}>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition-all shadow-sm"
              title={sidebarCollapsed ? "Perbesar Sidebar" : "Perkecil Sidebar"}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col overflow-y-auto scroll-smooth">
        {/* Top Bar / Mobile & Desktop Sticky Header */}
        <header className="bg-white/90 dark:bg-[#0A0A0C]/90 backdrop-blur-md p-4 sticky top-0 z-40 border-b border-slate-200 dark:border-slate-900/80 flex items-center justify-between transition-all duration-300">
          
          {/* Mobile View Header Content with Hamburger Menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all shadow-sm"
              title="Buka Menu Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onTabChange('home' as any)}
            >
              <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 leading-none">
                <Baby className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" />
                ResNeo Helper
              </h1>
            </div>
          </div>

          {/* Desktop/Tablet View Header Content (Sticky Bar Controls) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-xl bg-slate-100/80 dark:bg-slate-900 hover:bg-slate-200/85 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition-all shadow-sm"
              title={sidebarCollapsed ? "Perbesar Sidebar" : "Perkecil Sidebar"}
            >
              {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-2 text-xs font-semibold select-none text-slate-400 dark:text-slate-500">
              <span className="uppercase tracking-wider">Navigasi</span>
              <span>/</span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                {TABS.find(t => t.id === activeTab)?.label || 'Aplikasi'}
              </span>
            </div>
          </div>

          {/* Desktop/Tablet Active Timer Indicator */}
          {phase !== 'preparation' && phase !== 'routine_care' && (() => {
            const elapsedMin = elapsedTime / 60;
            let timerTextClass = 'text-slate-800 dark:text-slate-100';
            let timerBgClass = 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200/70 dark:border-slate-800/80';
            let timerPulse = false;
            let showWarning = false;
            if (elapsedMin >= 10) {
              timerTextClass = 'text-red-500 animate-pulse';
              timerBgClass = 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50';
              timerPulse = true;
              showWarning = true;
            } else if (elapsedMin >= 5) {
              timerTextClass = 'text-orange-500';
              timerBgClass = 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800/50';
            } else if (elapsedMin >= 3) {
              timerTextClass = 'text-amber-500';
              timerBgClass = 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50';
            }
            return (
              <div className={`hidden md:flex items-center gap-3 ${timerBgClass} border px-4 py-1.5 rounded-full shadow-inner animate-in fade-in duration-200`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isTimerRunning ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`} />
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Timer Resusitasi:</span>
                  <span className={`text-sm font-mono font-bold ${timerTextClass}`}>
                    {Math.floor(elapsedTime / 60).toString().padStart(2, '0')}:{(elapsedTime % 60).toString().padStart(2, '0')}
                  </span>
                  {showWarning && <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-wider">⚠ Evaluasi segera</span>}
                </div>
                <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Fase Resusitasi:</span>
                  <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/50">
                    {phase.replace('_', ' ')}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Right Section: Live Digital Clock & Theme Toggle Button */}
          <div className="flex items-center gap-2">
            <LiveClock />

            <button
              onClick={handleCheckUpdate}
              disabled={checkingUpdate}
              title="Bersihkan cache & muat versi terbaru"
              className="flex items-center gap-1.5 p-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/80 transition-all text-sm font-bold shadow-sm disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 shrink-0 ${checkingUpdate ? 'animate-spin' : ''}`} />
              <span className="hidden lg:inline">{checkingUpdate ? 'Memuat...' : 'Pembaruan'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 p-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800/80 transition-all text-sm font-bold shadow-sm"
            >
              {theme === 'dark' ? <><Sun className="w-4 h-4 text-amber-500 dark:text-amber-300" /> <span className="hidden sm:inline">Mode Terang</span></> : <><Moon className="w-4 h-4 text-indigo-600" /> <span className="hidden sm:inline">Mode Gelap</span></>}
            </button>

            {isLoggedIn && (
              <button
                onClick={onOpenProfile}
                title="Profil & Akun"
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-sm hover:brightness-110 transition-all shrink-0"
              >
                {userInitial || '?'}
              </button>
            )}
          </div>
        </header>

        <div className="p-5 sm:p-5 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          {children}
          {/* Spacer agar konten tidak tertutup bottom nav di mobile */}
          <div className="h-24 md:hidden" aria-hidden="true" />
        </div>
      </main>

      {/* Mobile Bottom Navigation (< md) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[88px] bg-white/95 dark:bg-slate-950/98 border-t border-slate-200/80 dark:border-slate-900/90 flex justify-around items-end px-1 pb-[18px] pt-1.5 z-50 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] dark:shadow-none">

        {/* Beranda */}
        <button
          onClick={() => { onTabChange('home'); setMoreMenuOpen(false); }}
          className={`flex flex-col items-center justify-end flex-1 min-w-0 transition-all duration-200 ${activeTab === 'home' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}
        >
          <div className={`px-3 py-1.5 rounded-full mb-1 transition-all duration-300 ${activeTab === 'home' ? 'bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-100/50 dark:border-indigo-500/30' : ''}`}>
            <Home className="w-6 h-6" />
          </div>
          <span className={`text-[10px] tracking-tight truncate ${activeTab === 'home' ? 'font-black' : 'font-semibold'}`}>Beranda</span>
        </button>

        {/* Data Pasien */}
        <button
          onClick={() => { onTabChange('dashboard'); setMoreMenuOpen(false); }}
          className={`flex flex-col items-center justify-end flex-1 min-w-0 transition-all duration-200 ${activeTab === 'dashboard' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}
        >
          <div className={`px-3 py-1.5 rounded-full mb-1 transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-100/50 dark:border-indigo-500/30' : ''}`}>
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <span className={`text-[10px] tracking-tight truncate ${activeTab === 'dashboard' ? 'font-black' : 'font-semibold'}`}>Data Pasien</span>
        </button>

        {/* FAB — Resusitasi */}
        {activeTab !== 'emergency' ? (
          <div className="flex-1 flex flex-col items-center justify-end relative min-w-[4.5rem] h-full pb-0.5">
            <button
              onClick={() => { onTabChange('emergency'); setMoreMenuOpen(false); }}
              title="Mulai Resusitasi"
              className="w-[66px] h-[66px] bg-gradient-to-br from-rose-600 to-red-500 rounded-full flex items-center justify-center text-white shadow-[0_6px_22px_rgba(239,68,68,0.5)] absolute top-[-26px] border-4 border-slate-50 dark:border-[#0A0A0C] transition-all z-50 group"
            >
              <Activity className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            </button>
            <span className="text-[10px] tracking-tight truncate font-semibold text-slate-500 dark:text-slate-400">Resus</span>
          </div>
        ) : (
          <button
            onClick={() => {
              if (window.confirm("Apakah Anda yakin ingin mengakhiri sesi resusitasi ini? Semua log tindakan akan disimpan.")) {
                setIsTimerRunning(false);
                addLog(elapsedTime, "Resusitasi diakhiri secara paksa oleh klinisi melalui tombol navigasi bawah.");
                setPhase('completed');
              }
            }}
            className="flex flex-col items-center justify-end flex-1 min-w-0 transition-all text-slate-500 dark:text-slate-400"
          >
            <div className="px-3 py-1.5 rounded-full mb-1 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all">
              <X className="w-6 h-6" />
            </div>
            <span className="text-[10px] tracking-tight truncate font-semibold">Akhiri</span>
          </button>
        )}

        {/* Skoring */}
        <button
          onClick={() => { onTabChange('scores'); setMoreMenuOpen(false); }}
          className={`flex flex-col items-center justify-end flex-1 min-w-0 transition-all duration-200 ${activeTab === 'scores' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}
        >
          <div className={`px-3 py-1.5 rounded-full mb-1 transition-all duration-300 ${activeTab === 'scores' ? 'bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-100/50 dark:border-indigo-500/30' : ''}`}>
            <ClipboardList className="w-6 h-6" />
          </div>
          <span className={`text-[10px] tracking-tight truncate ${activeTab === 'scores' ? 'font-black' : 'font-semibold'}`}>Skoring</span>
        </button>

        {/* Lainnya */}
        <button
          onClick={() => setMoreMenuOpen(v => !v)}
          className={`flex flex-col items-center justify-end flex-1 min-w-0 transition-all duration-200 ${moreMenuOpen ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}
        >
          <div className={`px-3 py-1.5 rounded-full mb-1 transition-all duration-300 ${moreMenuOpen ? 'bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-100/50 dark:border-indigo-500/30' : ''}`}>
            <MoreHorizontal className={`w-6 h-6 transition-transform duration-300 ${moreMenuOpen ? 'rotate-90' : ''}`} />
          </div>
          <span className={`text-[10px] tracking-tight truncate ${moreMenuOpen ? 'font-black' : 'font-semibold'}`}>Lainnya</span>
        </button>
      </nav>

      {/* Blur backdrop untuk menu Lainnya */}
      {moreMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm md:hidden"
          onClick={() => setMoreMenuOpen(false)}
        />
      )}

      {/* Menu Lainnya — slide up dari bottom nav */}
      {moreMenuOpen && (
        <div className="fixed bottom-[88px] left-0 right-0 z-50 md:hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="mx-4 mb-2 bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-5 pt-4 pb-2">
              <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">Menu Lainnya</span>
            </div>
            <div className="grid grid-cols-2 gap-2 px-4 pb-4">
              {[
                { id: 'calculators', label: 'Kalkulator Klinis', icon: Calculator, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900/50' },
                { id: 'advanced', label: 'Pertumbuhan & Referensi', icon: Stethoscope, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/30 border-teal-100 dark:border-teal-900/50' },
                { id: 'theory', label: 'Materi & Teori', icon: FileText, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/50' },
                { id: 'references', label: 'Pustaka & Referensi', icon: BookOpen, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/50' },
                { id: 'history', label: 'Riwayat Sesi', icon: History, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/50' },
                { id: 'settings', label: 'Pengaturan & Info', icon: Settings, color: 'text-slate-600 dark:text-slate-300', bg: 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => { onTabChange(item.id as TabType); setMoreMenuOpen(false); }}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border font-bold text-xs transition-all active:scale-95 ${item.bg} ${item.color}`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-left leading-snug">{item.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 px-4 py-3">
              <button
                onClick={() => { setMoreMenuOpen(false); setMobileSidebarOpen(true); setSidebarSearchOpen(true); }}
                className="w-full flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl font-bold text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
              >
                <Search className="w-5 h-5 text-indigo-500" />
                <span>Cari di Aplikasi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) - Visible only after timer starts on Mobile */}
      {showFab && (
        <div className="fixed bottom-[5.5rem] right-4 md:hidden z-[60]">
          {/* Overlay Menu */}
          {fabMenuOpen && (
            <div className="absolute bottom-16 right-0 mb-2 flex flex-col gap-3 animate-in slide-in-from-bottom-2 duration-200 origin-bottom-right">
              {/* Back to Emergency Wizard Button */}
              <button 
                onClick={() => {
                  onTabChange('emergency');
                  setFabMenuOpen(false);
                }}
                className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 p-3 rounded-full shadow-2xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors w-12 h-12"
              >
                <Activity className="w-5 h-5" />
              </button>
              
              {/* PAUSE/RESUME Button */}
              <button 
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-3 rounded-full shadow-2xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-12 h-12 ${isTimerRunning ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}
              >
                {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              {/* Adrenalin Instan Button */}
              <button 
                onClick={() => {
                   setShowAdrenalinPopup(true);
                   setFabMenuOpen(false);
                }}
                className="bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-500/40 p-3 rounded-full shadow-2xl flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-500/35 transition-colors w-12 h-12"
              >
                <Syringe className="w-5 h-5" />
              </button>

              {/* Reset to Prep */}
              <button 
                onClick={() => {
                   setPhase('preparation');
                   setFabMenuOpen(false);
                   onTabChange('emergency');
                }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 p-3 rounded-full shadow-2xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors w-12 h-12 relative overflow-hidden"
              >
                <RotateCcw className="w-5 h-5 relative z-10" />
              </button>
            </div>
          )}
          
          {/* Main FAB */}
          <button 
            onClick={() => setFabMenuOpen(!fabMenuOpen)}
            className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform ${
              fabMenuOpen ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-slate-300/50 dark:shadow-slate-950/55 rotate-90 scale-100 border border-slate-200 dark:border-slate-800' : 'bg-red-600 dark:bg-red-600/90 hover:bg-red-700 text-white shadow-red-300/40 dark:shadow-red-950/50'
            }`}
          >
            {fabMenuOpen ? <X className="w-6 h-6" /> : <Syringe className="w-6 h-6" />}
          </button>
        </div>
      )}

      {/* Adrenalin Tooltip Pop-up */}
      {showAdrenalinPopup && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/40 dark:bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setShowAdrenalinPopup(false)}>
           <div className="bg-white dark:bg-slate-900/90 w-full max-w-sm rounded-2xl shadow-3xl border border-slate-200 dark:border-slate-800 overflow-hidden" onClick={e => e.stopPropagation()}>
             <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-red-50 dark:bg-red-950/20">
               <h3 className="font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                 <Syringe className="w-5 h-5 text-red-500" /> Adrenalin Instan
               </h3>
               <button onClick={() => setShowAdrenalinPopup(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                 <X className="w-5 h-5" />
               </button>
             </div>
             <div className="p-5 space-y-4">
               {bwKg > 0 ? (
                 <>
                   <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                     <label className="block text-[10px] font-extrabold uppercase text-slate-400 dark:text-slate-500 mb-1.5">
                       Edit Berat Lahir (Gram)
                     </label>
                     <div className="flex gap-2">
                       <input
                         type="number"
                         placeholder="Contoh: 3000"
                         value={birthWeight || ''}
                         onChange={(e) => setBirthWeight && setBirthWeight(e.target.value)}
                         className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-xs leading-tight text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                       />
                       <span className="self-center font-bold text-xs text-slate-500 shrink-0">Gram</span>
                     </div>
                   </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-slate-400 dark:text-slate-500 mb-1">Dosis IV/IO (1:10.000)</span>
                    <div className="text-xl font-bold tracking-tight text-red-600 dark:text-red-400 shadow-sm">{adrenalinMin} - {adrenalinMax} mL</div>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-slate-400 dark:text-slate-500 mb-1">Dosis via ETT (1:10.000)</span>
                    <div className="text-xl font-bold tracking-tight text-red-500 dark:text-red-300">{ettAdrenalinMin} - {ettAdrenalinMax} mL</div>
                  </div>
                  <div className="pt-2">
                    <span className="block text-xs font-bold uppercase text-slate-400 dark:text-slate-500 mb-1">ETT Size & Kedalaman</span>
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-lg">{ettSize} mm / Bts: {ettDepth} cm</div>
                  </div>
                 </>
               ) : (
                 <div className="space-y-4">
                   <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                     Berat Lahir (BB) belum diinput. Anda dapat memasukkannya langsung di bawah ini untuk melihat dosis instan, atau beralih ke Fase 0 (Persiapan).
                   </p>
                   
                   <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                     <label className="block text-[10px] font-extrabold uppercase text-slate-400 dark:text-slate-500 mb-1.5">
                       Input Berat Lahir (Gram)
                     </label>
                     <div className="flex gap-2">
                       <input
                         type="number"
                         placeholder="Contoh: 3000"
                         value={birthWeight || ''}
                         onChange={(e) => setBirthWeight && setBirthWeight(e.target.value)}
                         className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-xs leading-tight text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                       />
                       <span className="self-center font-bold text-xs text-slate-500 shrink-0">Gram</span>
                     </div>
                   </div>

                   <button
                     onClick={() => {
                       setShowAdrenalinPopup(false);
                       onTabChange('emergency');
                       setPhase('preparation');
                     }}
                     className="w-full py-2 bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 rounded-xl font-bold transition-all text-xs text-center animate-pulse"
                   >
                     Atau Beralih ke Fase 0 (Persiapan)
                   </button>
                 </div>
               )}
               <button onClick={() => setShowAdrenalinPopup(false)} className="w-full mt-4 py-3.5 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 rounded-xl font-bold transition-all">
                 Tutup
               </button>
             </div>
           </div>
        </div>
      )}
      {activeTab === 'home' && <PwaInstallPrompt />}

    </div>
  );
}
