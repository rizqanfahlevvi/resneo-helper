import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TabEmergency from './components/tabs/TabEmergency';
import TabScores from './components/tabs/TabScores';
import TabAdvanced from './components/tabs/TabAdvanced';
import TabHome from './components/tabs/TabHome';
import TabReferences from './components/tabs/TabReferences';
import TabTheory from './components/tabs/TabTheory';
import TabHistory from './components/tabs/TabHistory';
import TabDashboard from './components/tabs/TabDashboard';
import { useStore } from './store';
import { ThemeProvider } from './components/ThemeProvider';
import { AlertTriangle } from 'lucide-react';
import { TabType } from './types';

const TAB_PATHS: Record<TabType, string> = {
  home: '/',
  emergency: '/emergency',
  scores: '/scores',
  advanced: '/advanced',
  references: '/references',
  theory: '/theory',
  history: '/history',
  dashboard: '/dashboard',
};

const PATH_TABS: Record<string, TabType> = Object.fromEntries(
  Object.entries(TAB_PATHS).map(([tab, path]) => [path, tab as TabType])
);

function getTabFromHash(): TabType {
  const path = window.location.hash.replace('#', '') || '/';
  return PATH_TABS[path] ?? 'home';
}

export default function App() {
  const { activeTab, setActiveTab, downeScore, setPhase, addLog, elapsedTime } = useStore();
  // Shared state across tabs
  const [gestationalAge, setGestationalAge] = useState<string>('');
  const [birthWeight, setBirthWeight] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [homeSearchTrigger, setHomeSearchTrigger] = useState(0);

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

  const renderTab = () => {
    switch (activeTab) {
      case 'emergency':
        return <TabEmergency 
                 gestationalAge={gestationalAge} 
                 setGestationalAge={setGestationalAge}
                 birthWeight={birthWeight}
                 setBirthWeight={setBirthWeight}
               />;
      case 'scores':
        return <TabScores 
                 gestationalAge={gestationalAge} 
                 setGestationalAge={setGestationalAge}
                 birthWeight={birthWeight}
                 setBirthWeight={setBirthWeight}
               />;
      case 'advanced':
        return <TabAdvanced 
                 gestationalAge={gestationalAge} 
                 setGestationalAge={setGestationalAge}
                 birthWeight={birthWeight}
                 setBirthWeight={setBirthWeight}
               />;
      default:
        return null; // Handled outside Layout
    }
  };

  const showDowneAlert = downeScore > 6 && activeTab !== 'emergency';

  return (
    <ThemeProvider>
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
        searchOpen={searchOpen}
        onSearchOpen={setSearchOpen}
        onSidebarSearch={() => { navigateTo('home'); setHomeSearchTrigger(t => t + 1); }}
      >
          <div className={activeTab === 'home' ? 'block' : 'hidden'}>
            <TabHome onNavigate={navigateTo} focusTrigger={homeSearchTrigger} />
          </div>
          <div className={activeTab === 'emergency' ? 'block' : 'hidden'}>
            <TabEmergency 
              gestationalAge={gestationalAge} 
              setGestationalAge={setGestationalAge}
              birthWeight={birthWeight}
              setBirthWeight={setBirthWeight}
            />
          </div>
          <div className={activeTab === 'scores' ? 'block' : 'hidden'}>
             <TabScores 
              gestationalAge={gestationalAge} 
              setGestationalAge={setGestationalAge}
              birthWeight={birthWeight}
              setBirthWeight={setBirthWeight}
            />
          </div>
          <div className={activeTab === 'advanced' ? 'block' : 'hidden'}>
             <TabAdvanced 
              gestationalAge={gestationalAge} 
              setGestationalAge={setGestationalAge}
              birthWeight={birthWeight}
              setBirthWeight={setBirthWeight}
            />
          </div>
          <div className={activeTab === 'references' ? 'block' : 'hidden'}>
             <TabReferences />
          </div>
          <div className={activeTab === 'theory' ? 'block' : 'hidden'}>
             <TabTheory />
          </div>
          <div className={activeTab === 'history' ? 'block' : 'hidden'}>
             <TabHistory />
          </div>
          <div className={activeTab === 'dashboard' ? 'block' : 'hidden'}>
             <TabDashboard onNavigate={navigateTo} />
          </div>
        </Layout>
    </ThemeProvider>
  );
}

