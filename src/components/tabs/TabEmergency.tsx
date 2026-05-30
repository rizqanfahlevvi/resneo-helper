import { useState, useEffect } from 'react';
import { useStore, Phase } from '../../store';
import { 
  AlertTriangle, Check, CheckCircle2, Clock, 
  Play, FastForward, Activity, RotateCcw, 
  Syringe, Pause, X, Menu, Wind, Heart, Users, ChevronDown, Waves
} from 'lucide-react';

const TEAM_TASKS = [
  { id: 'leader', label: 'Tentukan Pemimpin Tim Resusitasi (Leader)' },
  { id: 'roles', label: 'Tentukan Peran Anggota: PJ Jalan Napas (Airway), Kompresi Dada, & Obat/Alat' },
  { id: 'review', label: 'Tinjau Faktor Risiko Perinatal & Lakukan Team Briefing' },
];

const EQUIP_TASKS = [
  { id: 'warm', label: 'Thermal Care: Radiant warmer menyala, kain hangat, topi dlm plastik (prematur <32 mgg)' },
  { id: 'airway', label: 'Airway: Sungkup wajah pas, laringoskop menyala, kateter isap (suction -80 s.d -100 mmHg)' },
  { id: 'breath', label: 'Breathing: T-Piece Resuscitator / BMS berfungsi, katup PEEP diuji' },
  { id: 'oxy', label: 'Oxygenation: Sumber oksigen 100% tersambung ke blender udara (FiO2 awal diatur)' },
  { id: 'monitor', label: 'Monitoring: Sensor Pulse Oximeter, kabel SpO2, & monitor/elektrode EKG siap' },
  { id: 'stethoscope', label: 'Diagostic: Stetoskop neonatus siap digunakan bedside' },
];

const ROUTINE_CARE_TASKS = [
  { id: 'skin', label: 'Lakukan kontak kulit-ke-kulit (skin-to-skin) segera antara bayi dengan ibu.' },
  { id: 'warm', label: 'Keringkan tubuh bayi, selimuti dengan kain kering hangat, dan pasangkan topi.' },
  { id: 'imd', label: 'Fasilitasi Inisiasi Menyusu Dini (IMD) dalam 1 jam pertama.' },
  { id: 'monitor', label: 'Pemantauan secara berkala (usaha napas, laju denyut jantung, suhu, dan warna kulit).' },
];

const POST_RESUSCITATION_TASKS = [
  { id: 'obs_napas', label: 'Observasi pernapasan secara ketat' },
  { id: 'oksigen', label: 'Jika sianosis sentral tanpa distres napas, berikan oksigen aliran bebas sesuaikan target SpO2' },
  { id: 'jantung', label: 'Bila tidak ada perbaikan, pertimbangkan penyakit jantung kongenital' },
];



interface TabEmergencyProps {
  gestationalAge: string;
  setGestationalAge: (val: string) => void;
  birthWeight: string;
  setBirthWeight: (val: string) => void;
}

const ANTHROPO_FIELDS = [
  { key: 'bbl',  label: 'BB Lahir',       unit: 'gram', placeholder: '3200', note: 'Aktual (bukan estimasi)' },
  { key: 'pb',   label: 'Panjang Badan',  unit: 'cm',   placeholder: '50',   note: '' },
  { key: 'lk',   label: 'Lingkar Kepala', unit: 'cm',   placeholder: '34',   note: '' },
  { key: 'ld',   label: 'Lingkar Dada',   unit: 'cm',   placeholder: '33',   note: '' },
  { key: 'lila', label: 'LiLA',           unit: 'cm',   placeholder: '11',   note: 'Lingkar lengan atas' },
] as const;

function AnthropoPanel({ setBirthWeight, compact = false }: { setBirthWeight: (v: string) => void, compact?: boolean }) {
  const { anthropometry, setAnthropometry } = useStore();
  const [open, setOpen] = useState(false);
  const filled = !!anthropometry.bbl;
  return (
    <div className={`rounded-2xl border overflow-hidden ${compact ? 'border-teal-200 dark:border-teal-500/30 bg-white/60 dark:bg-teal-950/10' : 'border-teal-200 dark:border-teal-500/20 glass-card'}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-colors"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <svg className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-sm font-bold text-teal-800 dark:text-teal-300">Antropometri Neonatus</span>
          {filled
            ? <span className="text-xs bg-teal-500 text-white font-bold px-2 py-0.5 rounded-full flex-shrink-0">BBL: {anthropometry.bbl} g{anthropometry.pb ? ` · PB: ${anthropometry.pb} cm` : ''}</span>
            : <span className="text-xs text-slate-400 dark:text-slate-500 truncate">BBL, PB, LK, LD, LiLA — autofill ke seluruh tab</span>
          }
        </div>
        <svg className={`w-4 h-4 text-teal-500 transition-transform duration-200 flex-shrink-0 ml-2 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-teal-100 dark:border-teal-500/20 px-4 py-4 space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl px-3 py-2">
            Data tersambung ke seluruh kalkulator & skor. BB Lahir aktual akan memperbarui panduan dosis secara otomatis.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ANTHROPO_FIELDS.map(field => (
              <div key={field.key} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl p-3">
                <label className="block text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">
                  {field.label} <span className="normal-case font-normal">({field.unit})</span>
                </label>
                {field.note && <p className="text-[9px] text-teal-600 dark:text-teal-400 font-semibold mb-1">{field.note}</p>}
                <input
                  type="number"
                  value={anthropometry[field.key]}
                  onChange={(e) => {
                    setAnthropometry({ [field.key]: e.target.value });
                    if (field.key === 'bbl') setBirthWeight(e.target.value);
                  }}
                  placeholder={field.placeholder}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TabEmergency({ gestationalAge, setGestationalAge, birthWeight, setBirthWeight }: TabEmergencyProps) {
  const { phase, setPhase, isTimerRunning, setIsTimerRunning, elapsedTime, setElapsedTime, startTime, setStartTime, clinicalLog, clearLog, addLog: addStoreLog, anthropometry, setAnthropometry } = useStore();

  // Phase VTP States
  const [vtpStartTime, setVtpStartTime] = useState<number | null>(null);
  const [showVtpModal, setShowVtpModal] = useState(false);
  const [sribtaMode, setSribtaMode] = useState(false);
  const [lungCondition, setLungCondition] = useState<'normal' | 'rds' | 'mas'>('normal');
  const [vtpElapsed, setVtpElapsed] = useState(0);
  const [vtpAudioEnabled, setVtpAudioEnabled] = useState(false);
  const [vtpBeatStage, setVtpBeatStage] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  // SpO2 checkboxes state
  const [achievedTargets, setAchievedTargets] = useState<Record<number, boolean>>({});

  // Compressions beat stage state
  const [compBeatStage, setCompBeatStage] = useState<number>(0);

  // Phase Compressions States
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [compressionsStartTime, setCompressionsStartTime] = useState<number | null>(null);
  const [compressionsElapsed, setCompressionsElapsed] = useState(0);

  // Phase Drugs
  const [adrenalinDoses, setAdrenalinDoses] = useState<number[]>([]);
  const [adrenalinElapsed, setAdrenalinElapsed] = useState<number | null>(null);

  // Phase Routine Care & Screening
  const [screening, setScreening] = useState({ term: false, tone: false, breathe: false });
  const [routineTasks, setRoutineTasks] = useState<Record<string, boolean>>({});

  // Phase 0 States
  const [teamItems, setTeamItems] = useState<Record<string, boolean>>({});
  const [equipItems, setEquipItems] = useState<Record<string, boolean>>({});

  const [sribtaChecks, setSribtaChecks] = useState<Record<string, boolean>>({});
  
  
  const addLog = (msg: string) => addStoreLog(elapsedTime, msg);

  // Phase CPAP
  const [cpapPeep, setCpapPeep] = useState<number>(5);
  const [cpapDistress, setCpapDistress] = useState<boolean>(false);

  // Ventilator Calculator
  const [ventBB, setVentBB] = useState<string>('');

  // Timer States
  const [fabMenuOpen, setFabMenuOpen] = useState(false);
  const [showRetraksiEval, setShowRetraksiEval] = useState(false);

  // Shared AudioContext to prevent hitting maximum hardware contexts limit
  const getAudioCtx = () => {
    if (!(window as any).sharedAudioCtx) {
      (window as any).sharedAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return (window as any).sharedAudioCtx as AudioContext;
  };

  const playChime = () => {
    try {
      const audioCtx = getAudioCtx();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.value = 1200;
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 1.5);
    } catch(e) {
      console.error(e);
    }
  };

  const playDoubleBeep = () => {
    try {
      const audioCtx = getAudioCtx();
      const playTone = (timeOffset: number) => {
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.type = 'square';
          oscillator.frequency.value = 800;
          gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime + timeOffset);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + timeOffset + 0.1);
          oscillator.start(audioCtx.currentTime + timeOffset);
          oscillator.stop(audioCtx.currentTime + timeOffset + 0.1);
      };
      playTone(0);
      playTone(0.2);
    } catch(e) {
      console.error("Audio block not available", e);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, startTime]);

  // VTP: 15-second evaluate modal
  useEffect(() => {
    let vtpInterval: NodeJS.Timeout;
    if (phase === 'vtp' && vtpStartTime && !showVtpModal && !sribtaMode) {
      vtpInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - vtpStartTime) / 1000);
        setVtpElapsed(elapsed);
        if (elapsed >= 15) {
          playDoubleBeep();
          setShowVtpModal(true);
        }
      }, 200);
    } else if (phase !== 'vtp') {
      setVtpElapsed(0);
    }
    return () => clearInterval(vtpInterval);
  }, [phase, vtpStartTime, showVtpModal, sribtaMode]);

  // Compressions timer (60s)
  useEffect(() => {
    let compInterval: NodeJS.Timeout;
    if (phase === 'compressions' && compressionsStartTime) {
      compInterval = setInterval(() => {
        setCompressionsElapsed(Math.floor((Date.now() - compressionsStartTime) / 1000));
      }, 1000);
    } else if (phase !== 'compressions') {
      setCompressionsElapsed(0);
    }
    return () => clearInterval(compInterval);
  }, [phase, compressionsStartTime]);

  // Adrenalin recurring timer
  useEffect(() => {
    let adrInterval: NodeJS.Timeout;
    if (adrenalinDoses.length > 0) {
      adrInterval = setInterval(() => {
        const last = adrenalinDoses[adrenalinDoses.length - 1];
        const elapsed = Math.floor((Date.now() - last) / 1000);
        setAdrenalinElapsed(elapsed);
        if (elapsed > 0 && elapsed % 180 === 0) {
          playChime();
        }
      }, 1000);
    }
    return () => clearInterval(adrInterval);
  }, [adrenalinDoses]);

  // Compressions: Metronome Audio
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (phase === 'compressions' && audioEnabled) {
      try {
        const audioCtx = getAudioCtx();
        
        // Attempt to resume AudioContext if it's suspended
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume().catch(() => {});
        }

        let beatCount = 0;
        const playBeep = (isVent: boolean) => {
          try {
            if (!audioCtx) return;
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.type = isVent ? 'square' : 'sine';
            oscillator.frequency.value = isVent ? 600 : 1000;
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
          } catch (e) {
            console.warn("Metronome sound blocked", e);
          }
        };

        intervalId = setInterval(() => {
          const isVent = beatCount % 4 === 3;
          playBeep(isVent);
          setCompBeatStage(beatCount % 4);
          beatCount++;
        }, 500);
      } catch (e) {
        console.warn("Audio Context blocked", e);
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [phase, audioEnabled]);

  // VTP: Metronome Audio (Squeeze, Release, Release) - 40 breaths per minute (1.5 seconds cycle)
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (phase === 'vtp' && vtpAudioEnabled) {
      try {
        const audioCtx = getAudioCtx();

        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume().catch(() => {});
        }

        let beatCount = 0;
        const playBeep = (freq: number, duration: number) => {
          try {
            if (!audioCtx) return;
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.type = 'sine';
            oscillator.frequency.value = freq;
            gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + duration);
          } catch (e) {
            console.warn("Metronome VTP sound blocked", e);
          }
        };

        intervalId = setInterval(() => {
          const stage = beatCount % 3;
          setVtpBeatStage(stage);
          if (stage === 0) {
            // Squeeze (Pompa) - High Beep
            playBeep(880, 0.18);
          } else {
            // Release (Lepas) - Low Beep
            playBeep(440, 0.08);
          }
          beatCount++;
        }, 500);
      } catch (e) {
        console.warn("VTP Audio Context blocked", e);
        // Fallback: even if audio is blocked/unsupported, keep updating VTP visual breathing guide!
        let beatCount = 0;
        intervalId = setInterval(() => {
          const stage = beatCount % 3;
          setVtpBeatStage(stage);
          beatCount++;
        }, 500);
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [phase, vtpAudioEnabled]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleReset = () => {
    setPhase('preparation');
    setTeamItems({});
    setEquipItems({});
    setGestationalAge('');
    setBirthWeight('');
    setStartTime(null);
    setElapsedTime(0);
    setIsTimerRunning(false);
    setShowRetraksiEval(false);
    setScreening({ term: false, tone: false, breathe: false });
    clearLog();
    setRoutineTasks({});
    setCpapPeep(5);
    setCpapDistress(false);
    setVtpStartTime(null);
    setShowVtpModal(false);
    setSribtaMode(false);
    setLungCondition('normal');
    setVtpElapsed(0);
    setAudioEnabled(false);
    setVtpAudioEnabled(false);
    setCompressionsStartTime(null);
    setCompressionsElapsed(0);
    setAdrenalinDoses([]);
    setAdrenalinElapsed(null);
  };

  const handleCopyLog = () => {
    const formattedText = `=== RESNEO HELPER CLINICAL RESUSCITATION LOG ===
Berat Lahir: ${birthWeight ? birthWeight + ' gram' : '-'} | Usia Gestasi: ${gestationalAge ? gestationalAge + ' minggu' : '-'}
Total Waktu Skenario: ${formatTime(elapsedTime)}

${clinicalLog.map(l => `${l.time} - ${l.message}`).join('\n')}
================================================`;

    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAllChecked = 
    TEAM_TASKS.every(t => teamItems[t.id]) && 
    EQUIP_TASKS.every(t => equipItems[t.id]);

  const handleBypassChecklist = () => {
    const newTeam: Record<string, boolean> = {};
    TEAM_TASKS.forEach(t => newTeam[t.id] = true);
    setTeamItems(newTeam);

    const newEquip: Record<string, boolean> = {};
    EQUIP_TASKS.forEach(t => newEquip[t.id] = true);
    setEquipItems(newEquip);
  };

  const handleBabyBorn = () => {
    setPhase('initial_steps');
    setStartTime(Date.now());
    setIsTimerRunning(true);
    addLog("Resusitasi Dimulai (Fase 0 Checklist Berhasil Dilewati)");
  };

  const gaNum = parseInt(gestationalAge) || 0;
  const bwNum = parseInt(birthWeight) || 0;
  const isPremature = (gaNum > 0 && gaNum < 32) || (bwNum > 0 && bwNum < 1500);
  const recommendedFiO2 = (gaNum >= 35) ? '21%' : '21-30%';
  const showSidebar = phase !== 'preparation' && phase !== 'completed';

  // Emergency Calculator values
  const bwKg = bwNum / 1000;
  const ettSize = bwKg > 0 ? (bwKg < 1 ? '2.5' : bwKg < 2 ? '3.0' : bwKg < 3 ? '3.5' : '4.0') : '-';
  const ettDepth = bwKg > 0 ? (bwKg + 6).toFixed(1) : '-';
  const adrenalinMin = bwKg > 0 ? (0.1 * bwKg).toFixed(2) : '-';
  const adrenalinMax = bwKg > 0 ? (0.3 * bwKg).toFixed(2) : '-';
  const volumeExp = bwKg > 0 ? (10 * bwKg).toFixed(1) : '-';

  // Determine Master Timer Color based on Golden Minute Rule and SpO2 Targets
  let timerBgClass = 'bg-emerald-500 text-white shadow-emerald-500/30';
  let isFlashing = false;
  
  const activeSpo2Idx = [
    { min: 0, max: 60 },
    { min: 61, max: 120 },
    { min: 121, max: 180 },
    { min: 181, max: 240 },
    { min: 241, max: 300 },
    { min: 301, max: 600 },
    { min: 601, max: Infinity }
  ].findIndex(item => elapsedTime >= item.min && elapsedTime <= item.max);
  
  const isCurrentTargetAchieved = activeSpo2Idx !== -1 && !!achievedTargets[activeSpo2Idx];

  if (phase === 'initial_steps' && !isCurrentTargetAchieved) {
    if (elapsedTime >= 60 && elapsedTime < 75) {
      timerBgClass = 'bg-yellow-400 text-yellow-900 shadow-yellow-400/30';
    } else if (elapsedTime >= 75) {
      timerBgClass = 'bg-red-600 text-white shadow-red-600/30';
      isFlashing = true;
    }
  }

  return (
    <div className="animate-in fade-in duration-300 relative pb-28">
      
      {/* Master Timer */}
      {phase !== 'preparation' && phase !== 'routine_care' && (
        <div className="sticky top-[4rem] md:top-4 z-40 mb-6 flex flex-col gap-2">
          <div className={`transition-colors duration-300 ${timerBgClass} ${isFlashing ? 'animate-pulse' : ''} px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between gap-3`}>
            <div className="flex items-center gap-3">
              <Clock className={`w-7 h-7 sm:w-8 sm:h-8 ${isFlashing ? 'animate-bounce' : ''}`} />
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-mono font-bold leading-none tabular-nums tracking-tight">
                  {formatTime(elapsedTime)}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold opacity-80 mt-1">
                  Master Timer
                </span>
              </div>
            </div>
            
            {/* Dynamic SpO2 Target Tracker Dropdown */}
            <details className="relative z-50 group">
              <summary className="bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10 cursor-pointer list-none flex items-center gap-2 transition-colors outline-none focus:ring-2 focus:ring-white/50 [&::-webkit-details-marker]:hidden">
                <Activity className="w-3.5 h-3.5 text-white opacity-90 hidden sm:block" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white opacity-90">
                  SpO2<span className="hidden sm:inline"> Target</span>
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-white opacity-70 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="absolute top-full right-0 mt-2 bg-slate-900 border border-slate-700 shadow-2xl rounded-xl p-4 z-50 min-w-[260px] sm:min-w-[280px]">
                <h4 className="text-white text-xs font-bold mb-3 uppercase tracking-wider border-b border-slate-700 pb-2">Target SpO2 Preduktal</h4>
                <div className="space-y-2 text-xs font-medium text-white/80">
                  {[
                    { label: '1 Menit', min: 0, max: 60, target: '60-70%' },
                    { label: '2 Menit', min: 61, max: 120, target: '65-85%' },
                    { label: '3 Menit', min: 121, max: 180, target: '70-90%' },
                    { label: '4 Menit', min: 181, max: 240, target: '75-90%' },
                    { label: '5 Menit', min: 241, max: 300, target: '80-90%' },
                    { label: '10 Menit', min: 301, max: 600, target: '85-90%' },
                    { label: '>15 Menit', min: 601, max: Infinity, target: '90-95%' }
                  ].map((item, idx) => {
                    const isActive = elapsedTime >= item.min && elapsedTime <= item.max;
                    return (
                      <label 
                        key={idx} 
                        className={`flex justify-between items-center rounded-xl px-3 py-2 border transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-[#c6ff00] border-[#c6ff00]/40 text-slate-900 font-bold shadow-[0_0_12px_rgba(198,255,0,0.45)]' 
                            : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-white/90'
                        }`}
                      >
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            checked={!!achievedTargets[idx]} 
                            onChange={(e) => {
                              setAchievedTargets(prev => ({ ...prev, [idx]: e.target.checked }));
                              if (e.target.checked) {
                                addLog(`Target SpO2 Preduktal ${item.label} (${item.target}) tercapai.`);
                              }
                            }}
                            className="w-4 h-4 rounded border-slate-500 text-indigo-600 focus:ring-0 outline-none cursor-pointer"
                          />
                          <span>{item.label}</span>
                        </div>
                        <span className={isActive ? 'text-slate-900 font-extrabold' : 'text-slate-400 font-semibold'}>{item.target}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </details>
          </div>
          
          {/* Global Adrenalin Countdown */}
          {adrenalinDoses.length > 0 && adrenalinElapsed !== null && (
            <div className="bg-red-500/90 backdrop-blur-md border border-red-400 text-white shadow-xl rounded-2xl px-4 py-3 flex items-center justify-between animate-in slide-in-from-top-2">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Syringe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold opacity-90">Adrenalin Aktif (Ke-{adrenalinDoses.length})</div>
                  <div className="text-xl font-mono font-bold leading-none tabular-nums tracking-tight">
                    {formatTime(adrenalinElapsed)} <span className="text-xs font-normal opacity-80 ml-1">/ 03:00</span>
                  </div>
                </div>
              </div>
              <div>
                {adrenalinElapsed >= 180 ? (
                  <button
                    onClick={() => setAdrenalinDoses([...adrenalinDoses, Date.now()])}
                    className="bg-white text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Ulangi Dosis
                  </button>
                ) : (
                  <div className="bg-black/20 px-3 py-1.5 rounded-lg text-xs font-bold text-white/90 uppercase tracking-wider">
                    Tunggu
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PHASE 0: PRE-BIRTH CHECKLIST */}
      {phase === 'preparation' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Fase 0: Persiapan</h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Pre-Birth Team & Equipment Checklist</p>
            </div>
            <div className="px-3 py-1 bg-slate-200/50 dark:bg-white/10 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider border border-slate-300 dark:border-white/20">
              IDAI 2022
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-4 shadow-sm">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Usia Gestasi (Minggu)</label>
              <input 
                type="number" 
                value={gestationalAge}
                onChange={(e) => setGestationalAge(e.target.value)}
                placeholder="cth: 38"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
              />
            </div>
            <div className="glass-card rounded-2xl p-4 shadow-sm">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Estimasi Berat Lahir (Gram)</label>
              <input
                type="number"
                value={birthWeight}
                onChange={(e) => setBirthWeight(e.target.value)}
                placeholder="cth: 3200 (taksiran)"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
              />
              <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-2 font-semibold flex items-center gap-1">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                Nilai estimasi untuk panduan dosis. Antropometri aktual diisi setelah resusitasi selesai.
              </p>
            </div>
          </div>

          <AnthropoPanel setBirthWeight={setBirthWeight} />

          <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-5 py-3 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                Briefing Tim (Persiapan Peran)
              </h3>
            </div>
            <div className="p-2 space-y-1">
              {TEAM_TASKS.map((task) => (
                <label key={task.id} className="flex items-start gap-3 p-3 rounded-xl cursor-pointer hover:bg-white dark:bg-white/5 transition-colors group">
                  <div className="mt-0.5 shrink-0 relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-white/30 rounded cursor-pointer checked:bg-blue-600 checked:border-blue-600 transition-colors"
                      checked={!!teamItems[task.id]}
                      onChange={(e) => setTeamItems(prev => ({...prev, [task.id]: e.target.checked}))}
                    />
                    <Check className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                  </div>
                  <span className={`text-sm font-medium select-none transition-colors ${teamItems[task.id] ? 'text-slate-500 line-through' : 'text-slate-700 dark:text-slate-300 group-hover:text-white'}`}>{task.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-5 py-3 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                Cek Peralatan Resusitasi
              </h3>
              <button onClick={handleBypassChecklist} className="text-xs font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg border border-blue-500/20 transition-colors flex items-center gap-1">
                <FastForward className="w-3.5 h-3.5" />
                Konfirmasi Semua Siap
              </button>
            </div>
            <div className="p-2 space-y-1">
              {EQUIP_TASKS.map((task) => (
                <label key={task.id} className="flex items-start gap-3 p-3 rounded-xl cursor-pointer hover:bg-white dark:bg-white/5 transition-colors group">
                  <div className="mt-0.5 shrink-0 relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-white/30 rounded cursor-pointer checked:bg-blue-600 checked:border-blue-600 transition-colors"
                      checked={!!equipItems[task.id]}
                      onChange={(e) => setEquipItems(prev => ({...prev, [task.id]: e.target.checked}))}
                    />
                    <Check className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                  </div>
                  <span className={`text-sm font-medium select-none transition-colors ${equipItems[task.id] ? 'text-slate-500 line-through' : 'text-slate-700 dark:text-slate-300 group-hover:text-white'}`}>{task.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 pb-8">
            <button
              disabled={!isAllChecked}
              onClick={handleBabyBorn}
              className={`w-full py-5 rounded-2xl font-bold text-lg uppercase tracking-wider transition-all duration-300 flex justify-center items-center gap-3 shadow-lg hover:-translate-y-1 ${
                isAllChecked 
                  ? 'bg-blue-600 text-white shadow-blue-500/25 hover:bg-blue-500 hover:shadow-blue-500/40 border border-blue-500' 
                  : 'bg-white dark:bg-white/5 text-slate-500 border border-slate-200 dark:border-white/10 cursor-not-allowed shadow-none'
              }`}
            >
              <Play className={`w-6 h-6 ${isAllChecked ? 'fill-white' : ''}`} />
              BAYI LAHIR
            </button>
            {!isAllChecked && (
              <p className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium mt-3">
                Selesaikan checklist persiapan tim & alat atau ketuk tombol "Konfirmasi Semua Siap" untuk mengaktifkan tombol masuk.
              </p>
            )}
          </div>
        </div>
      )}

      {/* PHASE 1: GOLDEN MINUTE */}
      {showSidebar ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">

            {/* Antropometri — tampil di semua ukuran layar kecuali desktop (sidebar sudah ada) */}
            <div className="lg:hidden">
              <AnthropoPanel setBirthWeight={setBirthWeight} />
            </div>

            {phase === 'initial_steps' && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          
          {/* Smart Alert Peringatan Prematuritas */}
          {isPremature && (
            <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-xl rounded-l-none flex items-start gap-3 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <AlertTriangle className="w-16 h-16 text-orange-900" />
              </div>
              <AlertTriangle className="w-6 h-6 text-orange-600 shrink-0 mt-0.5 relative z-10" />
              <div className="relative z-10">
                <h4 className="font-bold text-orange-900">UG &lt; 32 minggu / BL &lt; 1500g</h4>
                <p className="text-orange-800 text-sm mt-1 leading-relaxed">
                  <strong>Langsung bungkus plastik tanpa dikeringkan, pasang topi!</strong> Jaga suhu ruangan 23-25°C.
                </p>
              </div>
            </div>
          )}

          {/* Skrining Awal Card */}
          <div className="glass-card rounded-2xl p-4 md:p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-md mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
              Skrining Cepat (NRP / IDAI)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
               <label className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-slate-200/50 dark:bg-white/10 transition-colors">
                 <div className="mt-0.5 shrink-0 relative flex items-center justify-center">
                   <input type="checkbox" checked={screening.term} onChange={(e) => setScreening(p => ({...p, term: e.target.checked}))} className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-white/30 rounded cursor-pointer checked:bg-blue-500 checked:border-blue-500 transition-colors" />
                   <Check className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                 </div>
                 <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Cukup Bulan?</span>
               </label>
               <label className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-slate-200/50 dark:bg-white/10 transition-colors">
                 <div className="mt-0.5 shrink-0 relative flex items-center justify-center">
                   <input type="checkbox" checked={screening.tone} onChange={(e) => setScreening(p => ({...p, tone: e.target.checked}))} className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-white/30 rounded cursor-pointer checked:bg-blue-500 checked:border-blue-500 transition-colors" />
                   <Check className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                 </div>
                 <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Tonus Baik?</span>
               </label>
               <label className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-slate-200/50 dark:bg-white/10 transition-colors">
                 <div className="mt-0.5 shrink-0 relative flex items-center justify-center">
                   <input type="checkbox" checked={screening.breathe} onChange={(e) => setScreening(p => ({...p, breathe: e.target.checked}))} className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-white/30 rounded cursor-pointer checked:bg-blue-500 checked:border-blue-500 transition-colors" />
                   <Check className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                 </div>
                 <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Menangis/Napas?</span>
               </label>
            </div>
            
            {screening.term && screening.tone && screening.breathe ? (
               <div className="mt-4 animate-in fade-in zoom-in-95 duration-200">
                 <button onClick={() => setPhase('routine_care')} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/30 border border-emerald-500 transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                   <Heart className="w-4 h-4" />
                   Bayi Bugar - Perawatan Rutin
                 </button>
               </div>
            ) : (
               <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl flex items-start gap-2">
                 <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                 <p className="text-amber-800 dark:text-amber-200 text-xs font-semibold leading-relaxed">
                   Jika salah satu "TIDAK", segera potong tali pusat & berikan <strong className="font-bold text-amber-950 dark:text-amber-450">Langkah Awal</strong> di pemancar panas.
                 </p>
               </div>
            )}
          </div>

          <div className="glass-card rounded-2xl shadow-sm p-5 md:p-6">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4 flex items-center justify-between">
              <span>Langkah Awal (Golden Minute)</span>
              <span className="text-xs px-2 py-1 bg-slate-200/50 dark:bg-white/10 text-slate-700 dark:text-slate-300 rounded font-bold uppercase tracking-wider border border-slate-300 dark:border-white/20">
                Target: &lt; 60 Detik
              </span>
            </h3>
            
            <ol className="space-y-4">
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30">1</div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Berikan Kehangatan</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Letakkan di bawah pemancar panas. Posisikan kepala setengah tengadah.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30">2</div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Bersihkan Jalan Napas</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Isap lendir memposisikan mulut kemudian hidung (hanya bila perlu/tersumbat).</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30">3</div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Keringkan & Stimulasi</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Keringkan seluruh tubuh sambil memberikan rangsang taktil, ganti kain basah, reposisi ke posisi sniffing.</p>
                </div>
              </li>
            </ol>
            
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
               <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                 Evaluasi Napas & Laju Denyut Jantung (LDJ)
                 <Activity className="w-4 h-4 text-blue-400" />
               </h4>
               <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Pilih tindakan berdasarkan kondisi bayi setelah diberikan langkah awal.</p>
               <div className="grid grid-cols-1 gap-3 mt-4">
                 <button 
                  onClick={() => {
                    addLog("Napas spontan normal, tanpa distres napas. Masuk ke Pasca Resusitasi.");
                    setPhase('post_resuscitation');
                  }}
                  className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-400 text-left p-4 rounded-xl transition-colors flex items-center justify-between group"
                 >
                    <div>
                      <span className="block font-bold mb-1">Napas Spontan & LDJ &ge; 100x/mnt (Tanpa Distres)</span>
                      <span className="block text-xs font-semibold opacity-80">Bayi membaik. Lakukan Perawatan Pasca Resusitasi.</span>
                    </div>
                    <ChevronDown className="w-5 h-5 -rotate-90 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                 </button>
                 
                 <button 
                  onClick={() => {
                    addLog("Napas spontan dengan distres (retraksi/merintih/sianosis). Masuk Jalur CPAP.");
                    setPhase('cpap');
                  }}
                  className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-left p-4 rounded-xl transition-colors flex items-center justify-between group"
                 >
                    <div>
                      <span className="block font-bold mb-1">Napas Spontan & LDJ &ge; 100x/mnt (Dengan Distres)</span>
                      <span className="block text-xs font-semibold opacity-80">Ada retraksi/merintih/sianosis. Mulai observasi CPAP.</span>
                    </div>
                    <ChevronDown className="w-5 h-5 -rotate-90 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                 </button>

                 <button 
                  onClick={() => {
                    addLog("Kondisi Bayi Apnea / Megap-megap / LDJ < 100. Masuk Jalur VTP.");
                    setPhase('vtp');
                    setVtpStartTime(Date.now());
                  }}
                  className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-600 dark:text-red-400 text-left p-4 rounded-xl transition-colors flex items-center justify-between group"
                 >
                    <div>
                      <span className="block font-bold mb-1">Apnea / Megap-megap / LDJ &lt; 100x/mnt</span>
                      <span className="block text-xs font-semibold opacity-80">Kritis. Segera mulai Ventilasi Tekanan Positif (VTP).</span>
                    </div>
                    <ChevronDown className="w-5 h-5 -rotate-90 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* JALUR CPAP */}
      {phase === 'cpap' && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <div className="glass-card rounded-2xl shadow-sm overflow-hidden flex flex-col">
             <div className="bg-emerald-600/80 backdrop-blur-md px-5 py-4 text-white flex justify-between items-center border-b border-slate-200 dark:border-white/10">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Wind className="w-5 h-5" />
                  Jalur Observasi / CPAP
                </h3>
             </div>
             <div className="p-5 md:p-6">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6 shadow-sm text-emerald-200 font-medium">
                  <Wind className="w-5 h-5 inline-block mr-2 text-emerald-400" />
                  Pasang CPAP, evaluasi usaha napas dan SpO2 secara kontinu.
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Pengaturan PEEP / TPAE (cmH2O)</label>
                  <div className="flex gap-2">
                    {[5, 6, 7, 8].map(val => (
                      <button 
                        key={val}
                        onClick={() => setCpapPeep(val)}
                        className={`flex-1 py-3 rounded-xl font-bold border transition-colors ${cpapPeep === val ? 'bg-emerald-600 text-white shadow-md border-emerald-500' : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-200/50 dark:bg-white/10'}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-start gap-3 p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-slate-200/50 dark:bg-white/10 transition-colors">
                    <div className="mt-0.5 shrink-0 relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-white/30 rounded cursor-pointer checked:bg-red-500 checked:border-red-500 transition-colors"
                        checked={cpapDistress}
                        onChange={(e) => setCpapDistress(e.target.checked)}
                      />
                      <Check className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                    </div>
                    <div>
                      <span className="text-slate-900 dark:text-white font-bold block mb-1">Masih distres napas berat / SpO2 tidak capai target</span>
                      <span className="text-slate-500 dark:text-slate-400 text-sm block">Centang jika SpO2 tidak tercapai dengan FiO2 &gt; 40% ATAU dengan TPAE 8 cmH2O masih distres napas berat (Gagal CPAP).</span>
                    </div>
                  </label>
                </div>

                {cpapDistress && (
                  <div className="bg-red-500/20 border border-red-500/30 text-white p-5 rounded-xl mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)] animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 text-red-500" />
                      <div>
                        <h4 className="font-bold text-lg leading-tight uppercase tracking-wide text-red-100">⚠️ KRITERIA GAGAL CPAP TERPENUHI</h4>
                        <p className="text-red-200 mt-2 text-sm leading-relaxed font-medium">
                          Gagal CPAP (Skor Downe &gt; 6). Segera bersiap untuk VTP dan Intubasi!
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        addLog("Gagal CPAP. Intubasi & Setting Ventilator");
                        setPhase('setting_ventilator');
                      }}
                      className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold transition-colors uppercase tracking-wider text-sm flex justify-center items-center gap-2 shadow-md border border-red-500"
                    >
                      <Wind className="w-5 h-5" />
                      BERALIH KE SETTING VENTILATOR
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <button 
                    onClick={() => {
                      addLog("CPAP Berhasil (Tidak ada retraksi/merintih/sianosis). Perawatan Pasca Resusitasi.");
                      setPhase('post_resuscitation');
                    }}
                    className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 py-4 rounded-xl font-bold transition-colors"
                  >
                    Tidak Retraksi (Perawatan Pasca Resusitasi)
                  </button>
                  <button 
                    onClick={() => setPhase('initial_steps')}
                    className="w-full bg-white dark:bg-white/5 hover:bg-slate-200/50 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 py-4 rounded-xl font-bold transition-colors"
                  >
                    Kembali ke Evaluasi Awal
                  </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* PHASE 3A: VTP Stage */}
      {phase === 'vtp' && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <div className="glass-card rounded-2xl shadow-sm overflow-hidden flex flex-col">
             <div className="bg-blue-600/80 backdrop-blur-md px-5 py-4 text-white flex justify-between items-center border-b border-slate-200 dark:border-white/10">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Wind className="w-5 h-5" />
                  Ventilasi Tekanan Positif (VTP)
                </h3>
                <span className="text-xs px-2 py-1 bg-white/20 rounded font-bold uppercase tracking-wider">
                  Target: 40-60x/mnt
                </span>
             </div>
             
             {sribtaMode ? (
               // SRIBTA CORRECTION VIEW
               <div className="p-5 md:p-6 animate-in slide-in-from-left-2">
                 <h4 className="font-bold text-red-500 mb-4 flex items-center gap-2">
                   <AlertTriangle className="w-5 h-5" />
                   Panduan Koreksi VTP (SRIBTA)
                 </h4>
                 <div className="space-y-3 mb-6">
                   {[
                     { id: 'sungkup', letter: 'S', text: 'Sungkup diperbaiki pelekatannya' },
                     { id: 'reposisi', letter: 'R', text: 'Reposisi kepala (posisi mengendus)', divider: 'Tes VTP Ulang' },
                     { id: 'isap', letter: 'I', text: 'Isap lendir (mulut lalu hidung)' },
                     { id: 'buka', letter: 'B', text: 'Buka mulut', divider: 'Tes VTP Ulang' },
                     { id: 'tekanan', letter: 'T', text: 'Tekanan dinaikkan' },
                     { id: 'alternatif', letter: 'A', text: 'Alternatif jalan napas (ET / LMA)' }
                   ].map(item => (
                      <div key={item.id}>
                        <div 
                          className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-slate-200/50 dark:bg-white/10 transition-colors"
                          onClick={() => setSribtaChecks(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                        >
                          <div className={`w-6 h-6 rounded border flex items-center justify-center shrink-0 ${sribtaChecks[item.id] ? 'bg-blue-600 border-blue-600' : 'bg-transparent border-slate-300 dark:border-white/30'}`}>
                            {sribtaChecks[item.id] && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <span className="font-bold text-xl text-blue-400 w-6 text-center">{item.letter}</span>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 dark:text-white">{item.text}</span>
                            {item.id === 'tekanan' && (
                              <span className="text-xs font-bold text-amber-400">
                                {gaNum > 0 && gaNum < 37 ? 'Maksimal PIP 30 cmH2O' : 'Maksimal PIP 40 cmH2O'}
                              </span>
                            )}
                          </div>
                        </div>
                        {item.divider && (
                          <div className="text-center font-bold text-red-400 py-1 text-xs uppercase tracking-widest border-l-2 border-red-500 ml-5 my-1">
                            {item.divider}
                          </div>
                        )}
                      </div>
                   ))}
                 </div>

                 <button 
                  disabled={!['sungkup', 'reposisi', 'isap', 'buka', 'tekanan', 'alternatif'].every(id => sribtaChecks[id])}
                  onClick={() => {
                    addLog("SRIBTA Selesai Dilakukan, Uji VTP Ulang");
                    setSribtaChecks({});
                    setSribtaMode(false);
                    setVtpStartTime(Date.now()); // Restart timer
                  }}
                  className={`w-full py-4 rounded-xl font-bold transition-all uppercase tracking-wider ${
                    ['sungkup', 'reposisi', 'isap', 'buka', 'tekanan', 'alternatif'].every(id => sribtaChecks[id])
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md border border-blue-500'
                      : 'bg-white dark:bg-white/5 text-slate-500 border border-slate-200 dark:border-white/10 cursor-not-allowed'
                  }`}
                 >
                   Uji VTP Ulang
                 </button>
               </div>
             ) : (
               // NORMAL VTP VIEW
               <div className="p-5 md:p-6">
                  {/* VTP Visual Sub-Timer */}
                  <div className="mb-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Sub-Timer Evaluasi
                      </span>
                      <span className="text-xl font-bold text-blue-400 font-mono tracking-tighter">
                        {Math.min(15, vtpElapsed)}s <span className="text-sm font-medium text-slate-500">/ 15s</span>
                      </span>
                    </div>
                    <div className="h-3 w-full bg-white dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-200 ease-linear"
                        style={{ width: `${Math.min(100, (vtpElapsed / 15) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Pilih Kondisi Paru Awal</label>
                    <select 
                      value={lungCondition}
                      onChange={(e) => setLungCondition(e.target.value as any)}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/20 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="normal">Normal (BBL Cukup Bulan)</option>
                      <option value="rds">RDS (Prematur / Gangguan Napas)</option>
                      <option value="mas">MAS (Sindrom Aspirasi Mekonium)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl text-center border border-slate-200/60 dark:border-white/5 shadow-md shadow-slate-200/40 dark:shadow-none relative group cursor-help hover:shadow-lg hover:-translate-y-0.5 transition-all">
                      <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">FiO2</span>
                      <span className="block text-xl font-bold text-blue-400">{recommendedFiO2}</span>
                      <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-white dark:bg-slate-800 text-white text-xs p-2 rounded shadow-xl z-10">
                        {gaNum >= 35 ? '≥ 35 minggu: 21%' : '< 35 minggu: 21-30%'}
                      </div>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl text-center border border-slate-200/60 dark:border-white/5 shadow-md shadow-slate-200/40 dark:shadow-none hover:shadow-lg hover:-translate-y-0.5 transition-all">
                      <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">PIP</span>
                      <span className="block text-2xl font-bold text-slate-900 dark:text-white">{lungCondition === 'mas' ? '25-30' : '20-25'}</span>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl text-center border border-slate-200/60 dark:border-white/5 shadow-md shadow-slate-200/40 dark:shadow-none hover:shadow-lg hover:-translate-y-0.5 transition-all">
                      <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">PEEP</span>
                      <span className="block text-2xl font-bold text-slate-900 dark:text-white">{lungCondition === 'mas' ? '0' : '5'}</span>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-xl rounded-l-none mb-6 flex justify-between items-center gap-4">
                    <div>
                      <h4 className="font-bold text-amber-500 mb-1">Ritme BVP (VTP)</h4>
                      <p className="text-amber-200 text-sm font-mono tracking-tight">"Pompa --- Lepas --- Lepas" (40x/menit)</p>
                    </div>
                    <button
                      onClick={() => setVtpAudioEnabled(!vtpAudioEnabled)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 ${
                        vtpAudioEnabled 
                          ? 'bg-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                          : 'bg-white dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-white border border-slate-200 dark:border-white/10'
                      }`}
                    >
                      {vtpAudioEnabled ? (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-pulse" />
                          Audio Aktif
                        </>
                      ) : (
                        'Aktifkan Metronom'
                      )}
                    </button>
                  </div>

                  {/* Visual Pulse Metronom VTP (Bouncing Respiration Assist) */}
                  {vtpAudioEnabled && (
                    <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center gap-4 mb-6 animate-in zoom-in duration-300">
                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Visual VTP Breathing Guide</span>
                      
                      <div className="grid grid-cols-3 gap-3 w-full max-w-md py-2">
                        {/* Step 1: Lepas (1) */}
                        <div className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-150 ${
                          vtpBeatStage === 1
                            ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)] scale-105'
                            : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600'
                        }`}>
                          <Waves className={`w-6 h-6 mb-1 ${vtpBeatStage === 1 ? 'animate-pulse' : ''}`} />
                          <span className="text-xs font-black uppercase tracking-wider">Lepas</span>
                          <span className="text-[9px] font-bold opacity-80 mt-0.5">Satu</span>
                        </div>

                        {/* Step 2: Lepas (2) */}
                        <div className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-150 ${
                          vtpBeatStage === 2
                            ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)] scale-105'
                            : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600'
                        }`}>
                          <Waves className={`w-6 h-6 mb-1 ${vtpBeatStage === 2 ? 'animate-pulse' : ''}`} />
                          <span className="text-xs font-black uppercase tracking-wider">Lepas</span>
                          <span className="text-[9px] font-bold opacity-80 mt-0.5">Dua</span>
                        </div>

                        {/* Step 3: Pompa */}
                        <div className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-150 ${
                          vtpBeatStage === 0
                            ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.7)] scale-105'
                            : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600'
                        }`}>
                          <Wind className={`w-6 h-6 mb-1 ${vtpBeatStage === 0 ? 'animate-bounce' : ''}`} />
                          <span className="text-xs font-black uppercase tracking-wider">Pompa</span>
                          <span className="text-[9px] font-bold opacity-80 mt-0.5">Tiga</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => {
                        addLog("LD < 60, Masuk Fase VTP + Kompresi Dada 3:1 (Metronom Aktif)");
                        setPhase('compressions');
                        setCompressionsStartTime(Date.now());
                        setAudioEnabled(true);
                    }}
                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-4 rounded-xl font-bold transition-colors uppercase tracking-wider"
                  >
                    LD &lt; 60x/mnt (Lanjut Kompresi)
                  </button>
               </div>
             )}
          </div>
        </div>
      )}

      {/* PHASE 3B: Evaluasi LDJ Pasca-VTP */}
      {phase === 'vtp_ldj_eval' && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <div className="glass-card rounded-2xl shadow-xl overflow-hidden flex flex-col border-blue-500/30">
            <div className="bg-blue-600/80 backdrop-blur-md px-5 py-4 text-white flex justify-between items-center border-b border-slate-200 dark:border-white/10">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Evaluasi LDJ Pasca-VTP
              </h3>
            </div>
            <div className="p-5 md:p-6 space-y-4">
              <p className="font-semibold text-slate-800 dark:text-slate-200 text-lg mb-6">Pilih hasil evaluasi Laju Denyut Jantung (LDJ) bayi saat ini:</p>

              <button 
                onClick={() => {
                  addLog("Sirkulasi Kembali Membaik Paca-VTP -> Beralih ke Setting Ventilator");
                  setPhase('setting_ventilator');
                }}
                className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 py-4 px-4 rounded-xl font-bold transition-colors text-left flex flex-col gap-1 shadow-sm"
              >
                <span className="text-lg">LDJ &ge; 100 x/menit</span>
                <span className="text-xs font-normal opacity-80">Sirkulasi kembali, bayi membaik. Segera beralih ke Setting Ventilator.</span>
              </button>

              <button 
                onClick={() => {
                  addLog("Evaluasi Pasca-VTP: LDJ 60-99 x/mnt. Lanjutkan VTP.");
                  setPhase('vtp');
                  setVtpStartTime(Date.now());
                }}
                className="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 py-4 px-4 rounded-xl font-bold transition-colors text-left flex flex-col gap-1 shadow-sm"
              >
                <span className="text-lg">LDJ 60 - 99 x/menit</span>
                <span className="text-xs font-normal opacity-80">Lanjutkan VTP berkelanjutan hingga 30 detik (Ulangi metronom). Evaluasi ulang napas dan LDJ secara berkala.</span>
              </button>

              <button 
                onClick={() => {
                  addLog("Evaluasi Pasca-VTP: LDJ < 60x/mnt. Mulai Kompresi.");
                  setPhase('compressions');
                  setCompressionsStartTime(Date.now());
                  setAudioEnabled(true);
                }}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 py-4 px-4 rounded-xl font-bold transition-colors text-left flex flex-col gap-1 shadow-sm"
              >
                <span className="text-lg">LDJ &lt; 60 x/menit</span>
                <span className="text-xs font-normal opacity-80">Kritis. Mulai VTP + Kompresi Dada (3:1) dengan metronom 120 BPM.</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 4A: Chest Compressions */}
      {phase === 'compressions' && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          
          {/* Removed Emergency Calculator, merged into FAB */}

          <div className="glass-card rounded-2xl shadow-xl overflow-hidden text-slate-900 dark:text-white flex flex-col border-red-500/30">
             <div className="p-5 md:p-6 text-center border-b border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-600/10 relative">
                <Activity className="w-10 h-10 mx-auto mb-3 opacity-90 text-red-600 dark:text-red-400" />
                <h3 className="font-bold text-2xl tracking-tight text-red-900 dark:text-red-100">Fase 4A: VTP + Kompresi Dada</h3>
                <p className="text-red-800 dark:text-red-300 text-sm mt-1">Laju 120 kali/menit (Rasio 3 kompresi : 1 ventilasi)</p>
             </div>
             
             <div className="bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm p-5 md:p-6 text-slate-900 dark:text-slate-100">
               
               {/* Instruction Box */}
               <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 mb-6 shadow-sm">
                 <h4 className="font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                   <AlertTriangle className="w-5 h-5" />
                   Instruksi Klinis
                 </h4>
                 <ul className="text-sm text-red-900/80 dark:text-red-200 space-y-1 ml-4 list-disc font-medium">
                   <li>Pastikan Pipa Endotraheal (ETT) / LMA telah terpasang dengan baik.</li>
                   <li>Naikkan konsentrasi oksigen (FiO2) menjadi <strong className="font-bold text-red-700 dark:text-red-100">100%</strong>.</li>
                   <li>Segera pasang akses vaskular darurat (UVC / Intraoseus - IO).</li>
                 </ul>
               </div>

               {/* Metronome Controls */}
               <div className="flex justify-between items-center mb-6 bg-white dark:bg-white/5 backdrop-blur-md p-2 rounded-xl border border-slate-200 dark:border-white/10">
                 <div className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-3">Audio Metronom</div>
                 <div className="flex gap-2">
                   <button 
                     onClick={() => setAudioEnabled(true)}
                     className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors border ${audioEnabled ? 'bg-blue-600 text-white shadow-md border-blue-500' : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-300 dark:border-white/20 hover:bg-slate-200/50 dark:bg-white/10'}`}
                   >
                     AKTIF
                   </button>
                   <button 
                     onClick={() => setAudioEnabled(false)}
                     className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors border ${!audioEnabled ? 'bg-slate-700 text-white shadow-md border-slate-600' : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-300 dark:border-white/20 hover:bg-slate-200/50 dark:bg-white/10'}`}
                   >
                     NONAKTIF
                   </button>
                 </div>
               </div>

                {/* Visual Compression Metronome Guide */}
                <div className="grid grid-cols-4 gap-2.5 w-full max-w-lg mx-auto py-2 mb-8">
                  {/* Step 1: SATU */}
                  <div className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-150 ${
                    audioEnabled && compBeatStage === 0
                      ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.7)] scale-105 font-extrabold shadow-red-500/50'
                      : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-600'
                  }`}>
                    <span className="text-lg font-black tracking-tight leading-none">1</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider mt-1.5">Satu</span>
                  </div>

                  {/* Step 2: DUA */}
                  <div className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-150 ${
                    audioEnabled && compBeatStage === 1
                      ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.7)] scale-105 font-extrabold shadow-red-500/50'
                      : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-600'
                  }`}>
                    <span className="text-lg font-black tracking-tight leading-none">2</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider mt-1.5">Dua</span>
                  </div>

                  {/* Step 3: TIGA */}
                  <div className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-150 ${
                    audioEnabled && compBeatStage === 2
                      ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.7)] scale-105 font-extrabold shadow-red-500/50'
                      : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-600'
                  }`}>
                    <span className="text-lg font-black tracking-tight leading-none">3</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider mt-1.5">Tiga</span>
                  </div>

                  {/* Step 4: POMPA */}
                  <div className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-150 ${
                    audioEnabled && compBeatStage === 3
                      ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_25px_rgba(37,99,235,0.7)] scale-105 font-extrabold shadow-blue-500/50'
                      : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-600'
                  }`}>
                    <span className="text-lg font-black tracking-tight leading-none">💨</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider mt-1.5">Pompa</span>
                  </div>
                </div>
               
               {/* Evaluasi 60 detik */}
               <div className="border-t border-slate-200 dark:border-white/10 pt-6">
                 <div className="flex justify-between items-end mb-2">
                   <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                     <Clock className="w-4 h-4" />
                     Siklus Kompresi (60 Detik)
                   </span>
                   <span className="text-xl font-bold text-red-400 font-mono tracking-tighter">
                     {Math.min(60, compressionsElapsed)}s <span className="text-sm font-medium text-slate-500">/ 60s</span>
                   </span>
                 </div>
                 <div className="h-3 w-full bg-white dark:bg-slate-800 rounded-full overflow-hidden mb-6 border border-white/5">
                   <div 
                     className="h-full bg-red-500 transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                     style={{ width: `${Math.min(100, (compressionsElapsed / 60) * 100)}%` }}
                   />
                 </div>

                 {compressionsElapsed >= 60 && adrenalinDoses.length === 0 && (
                   <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                     <div className="bg-red-500/10 text-red-300 text-sm font-bold p-3 rounded-xl mb-3 text-center border border-red-500/20">
                       Evaluasi ulang: Jika Laju Denyut Jantung (LDJ) tetap &lt; 60 x/menit
                     </div>
                     <button
                       onClick={() => {
                         addLog(`Tombol Berikan Adrenalin Diklik (Dosis Terhitung Berdasarkan BB)`);
                         setAdrenalinDoses([...adrenalinDoses, Date.now()])
                       }}
                       className="w-full bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/30 py-4 rounded-xl font-bold transition-all uppercase tracking-wider flex justify-center items-center gap-2 border border-red-500"
                     >
                       <Syringe className="w-5 h-5" />
                       BERIKAN ADRENALIN
                     </button>
                   </div>
                 )}

                 {/* Removed */}

                 <div className="mt-6 space-y-3">
                   <button 
                    onClick={() => {
                      addLog("LDJ >= 60 x/menit (Sirkulasi Spontan). Hentikan Kompresi, Beralih ke Setting Ventilator");
                      setPhase('setting_ventilator');
                      setAdrenalinDoses([]);
                      setCompressionsElapsed(0);
                      setAudioEnabled(false);
                      setVtpStartTime(Date.now());
                    }}
                    className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 py-3 rounded-xl font-bold transition-colors text-sm shadow-sm"
                   >
                     LDJ &ge; 60 x/mnt (Hentikan Kompresi, Beralih ke Setting Ventilator)
                   </button>
                   <button 
                    onClick={() => {
                      setPhase('initial_steps');
                      setAdrenalinDoses([]);
                      setCompressionsElapsed(0);
                      setAudioEnabled(false);
                    }}
                    className="w-full bg-white dark:bg-white/5 hover:bg-slate-200/50 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 py-3 rounded-xl font-bold transition-colors text-sm shadow-sm"
                   >
                     Reset ke Evaluasi Awal
                   </button>
                 </div>
               </div>
             </div>
          </div>
        </div>
      )}

      {/* VTP 15s Evaluation Modal */}
      {showVtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-indigo-600 p-5 text-white flex items-center gap-3 border-b border-light-200 dark:border-slate-850">
              <AlertTriangle className="w-6 h-6 text-amber-300" />
              <h3 className="font-bold text-lg tracking-tight">Evaluasi VTP (15 Detik)</h3>
            </div>
            <div className="p-6">
              <p className="text-slate-850 dark:text-slate-50 mb-6 font-semibold text-center text-lg leading-snug">Apakah dada bayi mengembang saat VTP diberikan?</p>
              <div className="space-y-4">
                <button 
                  onClick={() => {
                    addLog("Interupsi VTP 15s: Dada Mengembang");
                    setShowVtpModal(false);
                    setPhase('vtp_ldj_eval');
                  }}
                  className="w-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-605 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 py-4 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)] focus:ring-2 focus:ring-emerald-500/50"
                >
                  YA, Dada Mengembang
                </button>
                <button 
                  onClick={() => {
                    addLog("Interupsi VTP 15s: Dada TIDAK Mengembang (Memulai SRIBTA)");
                    setShowVtpModal(false);
                    setSribtaMode(true);
                  }}
                  className="w-full bg-rose-50 dark:bg-rose-500/10 text-rose-605 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 hover:bg-rose-100 dark:hover:bg-rose-500/20 py-4 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(244,63,94,0.1)] focus:ring-2 focus:ring-rose-500/50"
                >
                  TIDAK, Dada Tidak Mengembang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Routine Care Phase */}
      {phase === 'routine_care' && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <div className="glass-card rounded-2xl shadow-xl overflow-hidden text-slate-900 dark:text-white flex flex-col border-emerald-500/30">
            <div className="p-6 text-center border-b border-emerald-500/30 bg-emerald-600/10 relative">
              <div className="mx-auto bg-slate-200/50 dark:bg-white/10 w-16 h-16 flex items-center justify-center rounded-full mb-4 shadow-inner border border-slate-300 dark:border-white/20">
                <Heart className="w-8 h-8 text-emerald-400 fill-emerald-500/20" />
              </div>
              <h3 className="font-bold text-2xl tracking-tight mb-1 text-emerald-100">Fase Perawatan Rutin</h3>
              <p className="text-emerald-300 text-sm font-medium">Bugar - Rawat Bersama Ibu</p>
            </div>
            
            <div className="bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-900 dark:text-slate-100 p-5 md:p-6">
              <div className="mb-5">
                <AnthropoPanel setBirthWeight={setBirthWeight} />
              </div>
              <h4 className="font-bold text-emerald-100 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Checklist Asuhan Normal (IDAI / AHA)
              </h4>
              
              <div className="space-y-2 mb-8">
                {ROUTINE_CARE_TASKS.map((task) => (
                  <label key={task.id} className="flex items-start gap-3 p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-slate-200/50 dark:bg-white/10 transition-colors group shadow-sm">
                    <div className="mt-0.5 shrink-0 flex items-center justify-center relative">
                      <input 
                        type="checkbox" 
                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-white/30 rounded cursor-pointer checked:bg-emerald-500 checked:border-emerald-500 transition-colors"
                        checked={!!routineTasks[task.id]}
                        onChange={(e) => setRoutineTasks(prev => ({...prev, [task.id]: e.target.checked}))}
                      />
                      <Check className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                    </div>
                    <span className={`text-sm md:text-base font-medium select-none transition-colors leading-snug ${routineTasks[task.id] ? 'text-slate-500 line-through' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{task.label}</span>
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <button 
                  onClick={() => {
                    const finalTimeStr = `[${Math.floor(elapsedTime / 60).toString().padStart(2, '0')}:${(elapsedTime % 60).toString().padStart(2, '0')}]`;
                    addLog(`Resusitasi Selesai & Log Disimpan. Total Waktu: ${finalTimeStr}`);
                    setPhase('completed');
                    setIsTimerRunning(false);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 py-4 rounded-xl font-bold transition-all uppercase tracking-wider flex justify-center items-center gap-2 border border-emerald-500"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Selesai & Simpan Log Tindakan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Setting Ventilator Phase */}
      {phase === 'setting_ventilator' && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <div className="glass-card rounded-2xl shadow-xl overflow-hidden text-slate-900 dark:text-white flex flex-col border-cyan-500/30">
            <div className="p-6 text-center border-b border-cyan-500/30 bg-cyan-600/10 relative">
              <div className="mx-auto bg-slate-200/50 dark:bg-white/10 w-16 h-16 flex items-center justify-center rounded-full mb-4 shadow-inner border border-slate-300 dark:border-white/20">
                <Wind className="w-8 h-8 text-cyan-400 fill-cyan-500/20" />
              </div>
              <h3 className="font-bold text-2xl tracking-tight mb-1 text-cyan-100">Setting Ventilator Mekanik</h3>
              <p className="text-cyan-300 text-sm font-medium">Beralih ke dukungan nafas invasif</p>
            </div>
            
            <div className="bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-900 dark:text-slate-100 p-5 md:p-6 space-y-6">

              {/* Input BB untuk kalkulasi */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Berat Badan (gram)</label>
                  <input
                    type="number"
                    value={ventBB || birthWeight}
                    onChange={(e) => setVentBB(e.target.value)}
                    placeholder={birthWeight || 'cth: 1500'}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Diagnosis / Kondisi Paru</label>
                  <select
                    value={lungCondition}
                    onChange={(e) => setLungCondition(e.target.value as 'normal' | 'rds' | 'mas')}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="normal">Asfiksia / Paru Normal</option>
                    <option value="rds">HMD / RDS (Prematur)</option>
                    <option value="mas">MAS (Aspirasi Mekonium)</option>
                  </select>
                </div>
              </div>

              {/* Setting Grid */}
              {(() => {
                const bbKg = parseFloat(ventBB || birthWeight) / 1000 || 0;
                const tvMin = bbKg > 0 ? (4 * bbKg).toFixed(1) : '-';
                const tvMax = bbKg > 0 ? (6 * bbKg).toFixed(1) : '-';
                const mapMin = lungCondition === 'rds' ? (bbKg > 0 ? (8 * bbKg).toFixed(0) : '-') : '-';
                const settings = {
                  normal: { pip: '15–20', peep: '5', rr: '40–50', ti: '0.35–0.45', fio2: gaNum >= 35 ? '21%' : '21–30%', mode: 'AC/PC' },
                  rds:    { pip: '20–25', peep: '5–6', rr: '40–60', ti: '0.3–0.4', fio2: '30–40%', mode: 'AC/PC' },
                  mas:    { pip: '25–30', peep: '3–4', rr: '40–50', ti: '0.4–0.5', fio2: '40–60%', mode: 'SIMV+PS' },
                };
                const s = settings[lungCondition];
                const cards = [
                  { label: 'Mode', value: s.mode, sub: 'atau SIMV + PS', color: 'text-cyan-500' },
                  { label: 'FiO2 Awal', value: s.fio2, sub: 'Titrasi ke SpO2 target', color: 'text-sky-500' },
                  { label: 'Rate (RR)', value: s.rr, sub: 'x / menit', color: '' },
                  { label: 'PIP', value: s.pip, sub: 'cmH₂O', color: '' },
                  { label: 'PEEP', value: s.peep, sub: 'cmH₂O', color: '' },
                  { label: 'Ti', value: s.ti, sub: 'detik', color: '' },
                  { label: 'Tidal Volume', value: bbKg > 0 ? `${tvMin}–${tvMax}` : '4–6 mL/kg', sub: bbKg > 0 ? `mL (4–6 mL/kg × ${bbKg.toFixed(2)} kg)` : 'mL — isi BB', color: 'text-emerald-500' },
                  ...(lungCondition === 'rds' && bbKg > 0 ? [{ label: 'MAP Target', value: mapMin, sub: 'cmH₂O (~8× BB kg) — RDS', color: 'text-violet-500' }] : []),
                ];
                return (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {cards.map((c, i) => (
                      <div key={i} className="bg-white/80 dark:bg-slate-900/50 p-3 rounded-xl text-center border border-slate-200/60 dark:border-white/5 shadow-sm">
                        <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{c.label}</span>
                        <span className={`block text-xl font-black ${c.color || 'text-slate-900 dark:text-white'}`}>{c.value}</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">{c.sub}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* SpO2 Target Table */}
              <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/40 rounded-xl p-4">
                <p className="text-xs font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider mb-2">Target SpO2 Pasca-Intubasi (NRP 2021 / ILCOR 2022)</p>
                <div className="grid grid-cols-5 gap-1 text-center text-xs">
                  {[['1 mnt','60–65%'],['2 mnt','65–70%'],['3 mnt','70–75%'],['4 mnt','75–80%'],['≥10 mnt','85–95%']].map(([t,v]) => (
                    <div key={t} className="bg-white dark:bg-slate-900/50 rounded-lg py-2 border border-cyan-100 dark:border-cyan-900/40">
                      <span className="block text-[9px] text-slate-400 font-semibold">{t}</span>
                      <span className="block font-extrabold text-cyan-700 dark:text-cyan-300 text-xs">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Referensi */}
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                Ref: NRP 8th Ed (AAP/AHA 2021) · ILCOR CoSTR 2022 · Klingenberg et al. Arch Dis Child Fetal 2011 · Sweet et al. ESPGHAN/ESPR Guidelines 2023
              </p>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => {
                    const bbDisp = ventBB || birthWeight;
                    addLog(`Ventilator diatur: ${lungCondition.toUpperCase()}, BB ${bbDisp}g. Pindah Pasca Resusitasi.`);
                    setPhase('post_resuscitation');
                  }}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 py-4 rounded-xl font-bold transition-all uppercase tracking-wider flex justify-center items-center gap-2 border border-cyan-500"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Konfirmasi & Pindah Perawatan Lanjut
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Resuscitation Care Phase */}
      {phase === 'post_resuscitation' && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <div className="glass-card rounded-2xl shadow-xl overflow-hidden text-slate-900 dark:text-white flex flex-col border-blue-500/30">
            <div className="p-6 text-center border-b border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-600/10 relative">
              <div className="mx-auto bg-slate-200/50 dark:bg-white/10 w-16 h-16 flex items-center justify-center rounded-full mb-4 shadow-inner border border-slate-300 dark:border-white/20">
                <Heart className="w-8 h-8 text-blue-500 dark:text-blue-400 fill-blue-500/20" />
              </div>
              <h3 className="font-bold text-2xl tracking-tight mb-1 text-blue-900 dark:text-blue-100">Perawatan Pasca Resusitasi</h3>
              <p className="text-blue-600 dark:text-blue-300 text-sm font-semibold">Bugar Pasca-Tindakan VTP/CPAP</p>
            </div>
            
            <div className="bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-900 dark:text-slate-100 p-5 md:p-6">

              <div className="mb-5">
                <AnthropoPanel setBirthWeight={setBirthWeight} />
              </div>

              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                Checklist Evaluasi Lanjut (IDAI)
              </h4>
              
              <div className="space-y-2 mb-8">
                {POST_RESUSCITATION_TASKS.map((task) => (
                  <label key={task.id} className="flex items-start gap-3 p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-slate-200/50 dark:bg-white/10 transition-colors group shadow-sm">
                    <div className="mt-0.5 shrink-0 flex items-center justify-center relative">
                      <input 
                        type="checkbox" 
                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-white/30 rounded cursor-pointer checked:bg-blue-500 checked:border-blue-500 transition-colors"
                        checked={!!routineTasks[task.id]}
                        onChange={(e) => setRoutineTasks(prev => ({...prev, [task.id]: e.target.checked}))}
                      />
                      <Check className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                    </div>
                    <span className={`text-sm md:text-base font-medium select-none transition-colors leading-snug ${routineTasks[task.id] ? 'text-slate-500 line-through' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{task.label}</span>
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <button 
                  onClick={() => {
                    const finalTimeStr = `[${Math.floor(elapsedTime / 60).toString().padStart(2, '0')}:${(elapsedTime % 60).toString().padStart(2, '0')}]`;
                    addLog(`Perawatan Pasca Resusitasi Selesai. Total Waktu: ${finalTimeStr}`);
                    setPhase('completed');
                    setIsTimerRunning(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 py-4 rounded-xl font-bold transition-all uppercase tracking-wider flex justify-center items-center gap-2 border border-blue-500"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Selesai & Simpan Log Tindakan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
          </div>

          {/* Quick Adrenalin & Critical Parameter Cheat Sheet Card for Tablet/Desktop */}
          <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-[9rem] space-y-4">
             <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-slate-200 dark:border-slate-800/80 flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                   <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                     <Syringe className="w-5 h-5 text-red-600 dark:text-red-450" />
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Referensi Dosis & Alat</h3>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Instant Parameter (Desktop)</p>
                   </div>
                </div>

                {/* Direct edit input for Birth Weight in Sidebar */}
                <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 p-3 rounded-xl shadow-inner">
                   <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">Estimasi BB (Gram) & Gestasi</label>
                   <div className="flex gap-2">
                      <input
                        type="number"
                        value={birthWeight}
                        onChange={(e) => setBirthWeight(e.target.value)}
                        placeholder="cth: 3000"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-505 focus:outline-none focus:border-indigo-505 font-mono"
                      />
                      <span className="text-xs font-bold text-slate-400 self-center">Gram</span>
                   </div>
                   {isPremature && (
                      <div className="text-[10px] font-semibold text-orange-600 dark:text-orange-400 mt-1.5 flex items-center gap-1 leading-none animate-pulse">
                         <AlertTriangle className="w-3.5 h-3.5" /> Prematur/BBLR
                      </div>
                   )}
                </div>

                {/* Antropometri collapsible di sidebar */}
                <AnthropoPanel setBirthWeight={setBirthWeight} compact />

                {bwKg <= 0 ? (
                   <div className="text-center p-4 bg-red-50/40 dark:bg-red-950/15 rounded-xl border border-red-205/50 dark:border-red-950/40">
                      <p className="text-xs text-red-750 dark:text-red-400 font-bold mb-1">Berat Badan Belum Diinput</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Silakan masukkan berat badan (BB) pada input di atas untuk melihat pedoman dosis & ukuran alat secara instan.</p>
                   </div>
                ) : (
                   <div className="space-y-4 text-xs font-medium">
                      <div className="grid grid-cols-2 gap-2">
                         <div className="bg-slate-50 dark:bg-slate-950/30 rounded-lg p-2.5 border border-slate-150/50 dark:border-slate-800/60">
                            <span className="block text-[10px] text-slate-500 font-bold uppercase mb-0.5">Ukuran ETT</span>
                            <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">{ettSize} mm</span>
                         </div>
                         <div className="bg-slate-50 dark:bg-slate-950/30 rounded-lg p-2.5 border border-slate-150/50 dark:border-slate-800/60">
                            <span className="block text-[10px] text-slate-500 font-bold uppercase mb-0.5">Batas Bibir</span>
                            <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">{ettDepth} cm</span>
                         </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-955/30 rounded-lg p-2.5 border border-slate-150/50 dark:border-slate-800/60">
                         <span className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Salin Normal (10 mL/kg)</span>
                         <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">{volumeExp} <span className="text-[10px] font-medium text-slate-400">mL</span></span>
                      </div>

                      <div className="bg-red-50 dark:bg-red-955/20 rounded-xl p-3 border border-red-100 dark:border-red-900/40">
                         <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] text-red-700 dark:text-red-400 font-bold uppercase">Adrenalin IV/IO</span>
                            <span className="text-[9px] bg-red-100 dark:bg-red-950/40 text-red-750 dark:text-red-400 px-1 py-0.5 rounded font-extrabold uppercase">1:10.000 (0.1-0.3 mL)</span>
                         </div>
                         <div className="font-extrabold text-base text-red-650 dark:text-red-400 tracking-tight">{adrenalinMin} - {adrenalinMax} <span className="text-xs font-normal text-slate-500">mL</span></div>
                      </div>

                      <div className="bg-rose-50 dark:bg-rose-955/20 rounded-xl p-3 border border-rose-100 dark:border-rose-900/40">
                         <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] text-rose-700 dark:text-rose-450 font-bold uppercase">Adrenalin via ETT</span>
                            <span className="text-[9px] bg-rose-100 dark:bg-rose-950/40 text-rose-750 dark:text-rose-400 px-1 py-0.5 rounded font-extrabold uppercase">1:10.000 (0.5-1.0 mL)</span>
                         </div>
                         <div className="font-extrabold text-sm text-rose-650 dark:text-rose-455 tracking-tight">{(0.5 * bwKg).toFixed(2)} - {(1.0 * bwKg).toFixed(1)} <span className="text-xs font-normal text-slate-500">mL</span></div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                         <div className="bg-amber-50 dark:bg-amber-955/20 rounded-xl p-2.5 border border-amber-100 dark:border-amber-900/40">
                            <span className="block text-[9px] text-amber-700 dark:text-amber-400 font-bold uppercase mb-0.5">Dextrose 10% Bolus</span>
                            <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs">{(2 * bwKg).toFixed(1)} <span className="text-[9px] font-medium text-slate-400">mL</span></span>
                            <span className="block text-[8px] text-slate-400 mt-0.5">2 mL/kg (Hipoglikemia)</span>
                         </div>
                         <div className="bg-emerald-50 dark:bg-emerald-955/20 rounded-xl p-2.5 border border-emerald-100 dark:border-emerald-900/40">
                            <span className="block text-[9px] text-emerald-700 dark:text-emerald-400 font-bold uppercase mb-0.5">Meylon / NaBic 4.2%</span>
                            <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs">{(4 * bwKg).toFixed(1)} <span className="text-[9px] font-medium text-slate-400">mL</span></span>
                            <span className="block text-[8px] text-slate-400 mt-0.5">2 mEq/kg (Asidosis)</span>
                         </div>
                      </div>

                      <button
                        onClick={() => {
                           addLog(`Sidebar: Berikan Adrenalin (${adrenalinMin}-${adrenalinMax} mL)`);
                           setAdrenalinDoses([...adrenalinDoses, Date.now()]);
                        }}
                        className="w-full bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all flex justify-center items-center gap-2 shadow-md border border-red-550 hover:scale-[1.01]"
                      >
                         <Syringe className="w-4 h-4" />
                         Berikan Adrenalin
                      </button>
                   </div>
                )}
                
                {/* Always show Akhiri Resusitasi button at the bottom of the reference card */}
                <hr className="border-slate-100 dark:border-slate-800 my-1" />
                <button 
                  onClick={() => {
                      setIsTimerRunning(false);
                      addLog("Resusitasi diakhiri secara paksa oleh klinisi via panel referensi desktop.");
                      setPhase('completed');
                  }}
                  className="w-full bg-red-650 hover:bg-red-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-xs font-black shadow-lg shadow-red-500/20 active:scale-95 cursor-pointer"
                >
                  <X className="w-4 h-4 text-white" />
                  Akhiri Resusitasi
                </button>
             </div>
          </div>
        </div>
      ) : null}

      {/* Completed Phase - Log Summary */}
      {phase === 'completed' && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">

          <AnthropoPanel setBirthWeight={setBirthWeight} />

          <div className="glass-card rounded-2xl shadow-xl overflow-hidden text-slate-900 dark:text-slate-100 flex flex-col">
            <div className="p-5 md:p-6 text-center border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
              <h3 className="font-bold text-xl tracking-tight text-slate-900 dark:text-white mb-1">Ringkasan Kronologis Tindakan Klinis</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Log Kronologis Resusitasi Terperinci</p>
            </div>
            <div className="p-5 md:p-6">
              <textarea 
                className="w-full h-64 bg-white/80 dark:bg-slate-900/80 text-emerald-400 p-4 rounded-xl font-mono text-sm leading-relaxed border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 resize-none selection:bg-blue-500/30 shadow-inner"
                readOnly
                value={clinicalLog.map(l => `${l.time} - ${l.message}`).join('\n')}
              />
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button 
                  onClick={handleCopyLog}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 border ${
                    copied 
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/20' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/20'
                  }`}
                >
                  <Check className={`w-4 h-4 transition-transform ${copied ? 'scale-110' : 'scale-0 hidden'}`} />
                  {copied ? 'Berhasil Disalin!' : 'Salin Log ke Clipboard'}
                </button>
                <button 
                  onClick={handleReset}
                  className="flex-1 bg-slate-200/50 dark:bg-white/10 hover:bg-white/20 text-slate-700 dark:text-white py-3 rounded-xl font-bold transition-colors text-sm border border-slate-300 dark:border-white/20"
                >
                  Tutup & Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAB - Global Interrupts & Instant Adrenalin */}
      {isTimerRunning && phase !== 'completed' && (
        <>
          {/* Backdrop for FAB Menu */}
          {fabMenuOpen && (
            <div 
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden animate-in fade-in"
              onClick={() => setFabMenuOpen(false)}
            />
          )}
          
          <div className="fixed bottom-6 right-6 z-50 md:hidden flex flex-col items-end gap-3">
            {fabMenuOpen && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 mb-2 animate-in slide-in-from-bottom-4 zoom-in-95 w-72">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm flex items-center justify-between">
                  <span>Aksi Cepat Menu</span>
                  <button onClick={() => setFabMenuOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </h4>
                
                <div className="space-y-3">
                  {/* Adrenalin Instan */}
                  <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-3 shadow-sm mb-2">
                    <span className="block text-xs font-bold text-red-600 dark:text-red-500 uppercase tracking-wider mb-2">Parameter Kritis & Tindakan Cepat</span>
                    
                    <div className="mb-3">
                       <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block mb-1">Berat Lahir (Gram)</label>
                       <input 
                         type="number"
                         value={birthWeight}
                         onChange={(e) => setBirthWeight(e.target.value)}
                         placeholder="Mis: 3200"
                         className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1.5 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none transition-all font-mono"
                       />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-bold mb-0.5">ETT / BATAS (cm)</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{bwKg > 0 ? (bwKg < 1 ? '2.5' : bwKg < 2 ? '3.0' : '3.5') : '-'} <span className="font-normal text-xs text-slate-500">/ Bts: {ettDepth}</span></span>
                      </div>
                      <div className="bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-bold mb-0.5">C. EXP. (10mL/kg)</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{volumeExp} <span className="font-normal text-[10px] text-slate-500">mL</span></span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-white dark:bg-slate-900 rounded-lg px-2 py-2 mb-2 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-bold tracking-tight">Adrenalin IV/IO</span>
                      <span className="font-bold text-red-600 dark:text-red-500 text-sm">{bwKg > 0 ? `${adrenalinMin}-${adrenalinMax}` : '-'} <span className="text-[10px] text-slate-400 font-normal">mL</span></span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                        <span className="block text-[8px] text-slate-500 dark:text-slate-400 font-bold mb-0.5 uppercase">Dextrose 10% (2 mL/kg)</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">{bwKg > 0 ? `${(2 * bwKg).toFixed(1)} mL` : '-'}</span>
                      </div>
                      <div className="bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                        <span className="block text-[8px] text-slate-500 dark:text-slate-400 font-bold mb-0.5 uppercase">Meylon 4.2% (4 mL/kg)</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">{bwKg > 0 ? `${(4 * bwKg).toFixed(1)} mL` : '-'}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        addLog(`FAB: Berikan Adrenalin (${adrenalinMin}-${adrenalinMax} mL)`);
                        setAdrenalinDoses([...adrenalinDoses, Date.now()]);
                        setFabMenuOpen(false);
                      }}
                      disabled={bwKg <= 0}
                      className="w-full bg-red-600 hover:bg-red-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-1 transition-colors shadow-sm"
                    >
                      <Syringe className="w-4 h-4" />
                      Berikan Adrenalin Sekarang
                    </button>
                  </div>

                  {/* Antropometri di FAB mobile */}
                  <AnthropoPanel setBirthWeight={setBirthWeight} compact />

                  <hr className="border-slate-200 dark:border-slate-700 my-1" />

                  <button
                    onClick={() => {
                      addLog("FAB: Kembali ke Langkah Awal");
                      setPhase('initial_steps');
                      setFabMenuOpen(false);
                    }}
                    className="w-full text-left bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 p-3 rounded-xl flex items-center gap-2 transition-colors text-sm font-bold text-slate-700 dark:text-slate-200"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-500" />
                    Beralih ke Langkah Awal
                  </button>
                  
                  <button 
                    onClick={() => {
                        addLog("FAB: Pindah ke VTP");
                        setPhase('vtp');
                        setVtpStartTime(Date.now());
                        setFabMenuOpen(false);
                    }}
                    className="w-full text-left bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 p-3 rounded-xl flex items-center gap-2 transition-colors text-sm font-bold text-slate-700 dark:text-slate-200"
                  >
                    <Wind className="w-4 h-4 text-blue-500" />
                    Beralih ke VTP / CPAP
                  </button>

                  <button 
                    onClick={() => {
                        addLog("FAB: Pindah ke Kompresi Dada");
                        setPhase('compressions');
                        setFabMenuOpen(false);
                    }}
                    className="w-full text-left bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 p-3 rounded-xl flex items-center gap-2 transition-colors text-sm font-bold text-slate-700 dark:text-slate-200 mb-1"
                  >
                    <Heart className="w-4 h-4 text-rose-500" />
                    Beralih ke Kompresi
                  </button>

                  <button 
                    onClick={() => {
                        addLog("FAB: Pindah ke Setting Ventilator");
                        setPhase('setting_ventilator');
                        setFabMenuOpen(false);
                    }}
                    className="w-full text-left bg-cyan-500/10 hover:bg-cyan-500/20 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 p-3 rounded-xl flex items-center gap-2 transition-colors text-sm font-bold text-cyan-700 dark:text-cyan-400"
                  >
                    <Wind className="w-4 h-4 text-cyan-500" />
                    Beralih ke Setting Ventilator
                  </button>

                  <hr className="border-slate-200 dark:border-slate-700 my-1" />

                  <button 
                    onClick={() => {
                        setIsTimerRunning(false);
                        addLog("Resusitasi diakhiri secara paksa oleh klinisi via menu aksi cepat.");
                        setPhase('completed');
                        setFabMenuOpen(false);
                    }}
                    className="w-full text-left bg-red-650 hover:bg-red-500 text-white p-3 rounded-xl flex items-center gap-2 transition-all text-sm font-black shadow-lg shadow-red-500/20 active:scale-95 cursor-pointer"
                  >
                    <X className="w-4 h-4 text-white" />
                    Akhiri Resusitasi
                  </button>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setFabMenuOpen(!fabMenuOpen)}
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-blue-600/40 transition-all active:scale-95"
            >
              {fabMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </>
      )}

    </div>
  );
}

