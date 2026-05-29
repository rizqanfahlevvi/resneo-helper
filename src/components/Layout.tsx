import { ReactNode, useState } from 'react';
import { TabType } from '../types';
import { Baby, Activity, ClipboardList, Stethoscope, Sun, Moon, RotateCcw, Pause, Syringe, X, Menu, Play, ChevronLeft, ChevronRight, BookOpen, FileText, MoreHorizontal, Home } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useStore } from '../store';
import PwaInstallPrompt from './PwaInstallPrompt';

interface LayoutProps {
  children: ReactNode;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  birthWeight?: string;
  setBirthWeight?: (weight: string) => void;
}

const TABS = [
  { id: 'home', label: 'Beranda', icon: Home },
  { id: 'emergency', label: 'Alur Resusitasi', icon: Activity },
  { id: 'scores', label: 'Skor & Kalkulator', icon: ClipboardList },
  { id: 'advanced', label: 'Stabilisasi NICU', icon: Stethoscope },
  { id: 'theory', label: 'Materi & Teori', icon: FileText },
  { id: 'references', label: 'Pustaka & Referensi', icon: BookOpen },
] as const;

export default function Layout({ children, activeTab, onTabChange, birthWeight, setBirthWeight }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [fabMenuOpen, setFabMenuOpen] = useState(false);
  const [showAdrenalinPopup, setShowAdrenalinPopup] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  const { phase, setPhase, isTimerRunning, setIsTimerRunning, elapsedTime } = useStore();
  const showFab = phase !== 'preparation' && phase !== 'routine_care';

  const bwNum = parseInt(birthWeight || '0') || 0;
  const bwKg = bwNum / 1000;
  const ettSize = bwKg > 0 ? (bwKg < 1 ? '2.5' : bwKg < 2 ? '3.0' : bwKg < 3 ? '3.5' : '4.0') : '-';
  const ettDepth = bwKg > 0 ? (bwKg + 6).toFixed(1) : '-';
  const adrenalinMin = bwKg > 0 ? (0.1 * bwKg).toFixed(1) : '-';
  const adrenalinMax = bwKg > 0 ? (0.3 * bwKg).toFixed(1) : '-';
  const ettAdrenalinMin = bwKg > 0 ? (0.5 * bwKg).toFixed(1) : '-';
  const ettAdrenalinMax = bwKg > 0 ? (1.0 * bwKg).toFixed(1) : '-';

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-[#0B132B] overflow-hidden text-slate-900 dark:text-slate-100 relative transition-colors duration-300">
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
            <>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Baby className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                ResNeo Helper
              </h1>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 uppercase tracking-wider font-semibold ml-7">Panduan Protokol Medis</p>
            </>
          )}
        </div>
        <nav className={`flex-1 space-y-2 mt-6 ${sidebarCollapsed ? 'px-3' : 'px-4'}`}>
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

        {/* Bottom Sidebar Collapse Toggle */}
        <div className={`p-4 border-t border-slate-100 dark:border-slate-900 flex ${sidebarCollapsed ? 'justify-center' : 'justify-end'}`}>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-xl bg-slate-55 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition-all shadow-sm"
            title={sidebarCollapsed ? "Perbesar Sidebar" : "Perkecil Sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col h-full overflow-y-auto pb-32 md:pb-6 scroll-smooth">
        {/* Top Bar / Mobile & Desktop Sticky Header */}
        <header className="bg-white/90 dark:bg-[#0B132B]/90 backdrop-blur-md p-4 sticky top-0 z-40 border-b border-slate-200 dark:border-slate-900/80 flex items-center justify-between transition-all duration-300">
          
          {/* Mobile View Header Content with Hamburger Menu */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all shadow-sm"
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
              <p className="text-[9px] text-indigo-650 dark:text-indigo-400 uppercase tracking-widest font-extrabold mt-0.5">Panduan Protokol Medis</p>
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
          {phase !== 'preparation' && phase !== 'routine_care' && (
            <div className="hidden md:flex items-center gap-3 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-250/70 dark:border-slate-800/80 px-4 py-1.5 rounded-full shadow-inner animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isTimerRunning ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`} />
                <span className="text-xs font-bold text-slate-505 dark:text-slate-400">Timer Resusitasi:</span>
                <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-100">
                  {Math.floor(elapsedTime / 60).toString().padStart(2, '0')}:${(elapsedTime % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Fase Resusitasi:</span>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/50">
                  {phase.replace('_', ' ')}
                </span>
              </div>
            </div>
          )}

          {/* Right Section: Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-2 p-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-750 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800/80 transition-all text-sm font-bold shadow-sm"
          >
            {theme === 'dark' ? <><Sun className="w-4 h-4 text-amber-500 dark:text-amber-300" /> <span className="hidden sm:inline">Mode Terang</span></> : <><Moon className="w-4 h-4 text-indigo-600" /> <span className="hidden sm:inline">Mode Gelap</span></>}
          </button>
        </header>
        
        <div className="p-4 sm:p-5 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full h-full">
          {children}
        </div>
      </main>

      {/* Backdrop for Mobile Collapsible Menu "Lainnya" */}
      {moreMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-xs md:hidden animate-in fade-in"
          onClick={() => setMoreMenuOpen(false)}
        />
      )}

      {/* Mobile Bottom Navigation (< md) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[88px] bg-white/95 dark:bg-slate-950/98 border-t border-slate-200/80 dark:border-slate-900/90 flex justify-around items-end px-1 pb-[18px] pt-1.5 z-50 transition-all shadow-[0_-4px_25px_rgba(0,0,0,0.06)] dark:shadow-none">
        
        {/* Tab 1: Beranda */}
        <button
          onClick={() => {
            onTabChange('home');
            setMoreMenuOpen(false);
          }}
          className={`flex flex-col items-center justify-end flex-1 min-w-0 transition-all ${
            activeTab === 'home' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <div className={`px-3 py-1.5 rounded-full mb-1 transition-all duration-300 ${activeTab === 'home' ? 'bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-100/50 dark:border-indigo-500/30' : 'bg-transparent'}`}>
            <Home className="w-6 h-6" />
          </div>
          <span className={`text-[10px] tracking-tight truncate ${activeTab === 'home' ? 'font-black' : 'font-semibold'}`}>
            Beranda
          </span>
        </button>

        {/* Tab 2: Skor & Kalkulator */}
        <button
          onClick={() => {
            onTabChange('scores');
            setMoreMenuOpen(false);
          }}
          className={`flex flex-col items-center justify-end flex-1 min-w-0 transition-all ${
            activeTab === 'scores' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <div className={`px-3 py-1.5 rounded-full mb-1 transition-all duration-300 ${activeTab === 'scores' ? 'bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-100/50 dark:border-indigo-500/30' : 'bg-transparent'}`}>
            <ClipboardList className="w-6 h-6" />
          </div>
          <span className={`text-[10px] tracking-tight truncate ${activeTab === 'scores' ? 'font-black' : 'font-semibold'}`}>
            Skoring
          </span>
        </button>

        {/* Spacer & FAB Tengah ("Mulai Resusitasi") - Raksasa & Menonjol */}
        {activeTab !== 'emergency' ? (
          <div className="flex-1 flex flex-col items-center justify-end relative min-w-[4.5rem] h-full pb-0.5 animate-in fade-in duration-300">
            <button
              onClick={() => {
                onTabChange('emergency');
                setMoreMenuOpen(false);
              }}
              title="Mulai Resusitasi"
              className="w-[66px] h-[66px] bg-gradient-to-br from-rose-600 to-red-500 rounded-full flex items-center justify-center text-white shadow-[0_6px_22px_rgba(239,68,68,0.5)] absolute top-[-26px] border-4 border-slate-50 dark:border-[#0B132B] active:scale-95 transition-all z-50 group"
            >
              <Activity className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            </button>
            <span className="text-[10px] tracking-tight truncate font-semibold text-slate-500 dark:text-slate-400">
              Resus
            </span>
          </div>
        ) : (
          /* Empty spacer to keep navigation tabs perfectly aligned without jumping */
          <div className="flex-1 min-w-[4.5rem] h-full" />
        )}

        {/* Tab 3: Stabilisasi NICU */}
        <button
          onClick={() => {
            onTabChange('advanced');
            setMoreMenuOpen(false);
          }}
          className={`flex flex-col items-center justify-end flex-1 min-w-0 transition-all ${
            activeTab === 'advanced' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <div className={`px-3 py-1.5 rounded-full mb-1 transition-all duration-300 ${activeTab === 'advanced' ? 'bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-100/50 dark:border-indigo-500/30' : 'bg-transparent'}`}>
            <Stethoscope className="w-6 h-6" />
          </div>
          <span className={`text-[10px] tracking-tight truncate ${activeTab === 'advanced' ? 'font-black' : 'font-semibold'}`}>
            NICU
          </span>
        </button>

        {/* Tab 4: Lainnya (Collapsible Popover) */}
        <div className="flex-1 flex justify-center min-w-0 h-full relative">
          <button
            onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            className={`flex flex-col items-center justify-end w-full transition-all ${
              moreMenuOpen || activeTab === 'theory' || activeTab === 'references' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <div className={`px-3 py-1.5 rounded-full mb-1 transition-all duration-300 ${moreMenuOpen || activeTab === 'theory' || activeTab === 'references' ? 'bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-100/50 dark:border-indigo-500/30' : 'bg-transparent'}`}>
              <MoreHorizontal className="w-6 h-6" />
            </div>
            <span className={`text-[10px] tracking-tight truncate ${moreMenuOpen || activeTab === 'theory' || activeTab === 'references' ? 'font-black' : 'font-semibold'}`}>
              Lainnya
            </span>
          </button>

          {/* Floated Collapsible Popover Menu */}
          {moreMenuOpen && (
            <div className="absolute bottom-[88px] right-3 bg-white/95 dark:bg-slate-900/98 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl rounded-2xl p-2.5 z-[60] min-w-[170px] flex flex-col gap-1.5 animate-in slide-in-from-bottom-3 duration-200 origin-bottom-right">
              <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2.5 py-1 block border-b border-slate-100 dark:border-slate-800 mb-1 leading-none">
                Akses Tambahan
              </span>
              
              {/* Collapsible item 1: Materi & Teori */}
              <button
                onClick={() => {
                  onTabChange('theory');
                  setMoreMenuOpen(false);
                }}
                className={`w-full text-left font-bold text-xs px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 ${
                  activeTab === 'theory' 
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850'
                }`}
              >
                <FileText className="w-4 h-4 text-slate-450 shrink-0" />
                Materi & Teori
              </button>

              {/* Collapsible item 2: Pustaka & Referensi */}
              <button
                onClick={() => {
                  onTabChange('references');
                  setMoreMenuOpen(false);
                }}
                className={`w-full text-left font-bold text-xs px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 ${
                  activeTab === 'references' 
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850'
                }`}
              >
                <BookOpen className="w-4 h-4 text-slate-450 shrink-0" />
                Pustaka & Referensi
              </button>
            </div>
          )}
        </div>

      </nav>

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
                className={`bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-3 rounded-full shadow-2xl flex items-center justify-center hover:bg-slate-150 dark:hover:bg-slate-800 transition-colors w-12 h-12 ${isTimerRunning ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}
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
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-300 p-3 rounded-full shadow-2xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white transition-colors w-12 h-12 relative overflow-hidden"
              >
                <RotateCcw className="w-5 h-5 relative z-10" />
              </button>
            </div>
          )}
          
          {/* Main FAB */}
          <button 
            onClick={() => setFabMenuOpen(!fabMenuOpen)}
            className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform ${
              fabMenuOpen ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-slate-300/50 dark:shadow-slate-950/55 rotate-90 scale-105 border border-slate-200 dark:border-slate-800' : 'bg-red-600 dark:bg-red-600/90 hover:bg-red-700 text-white shadow-red-300/40 dark:shadow-red-950/50'
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
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Berat Badan</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{bwKg} kg</span>
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
                   <p className="text-xs text-slate-605 dark:text-slate-400 font-medium leading-relaxed">
                     Berat Lahir (BB) belum diinput. Anda dapat memasukkannya langsung di bawah ini untuk melihat dosis instan, atau beralih ke Fase 0 (Persiapan).
                   </p>
                   
                   <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-150 dark:border-slate-800">
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
