import { create } from 'zustand';
import { TabType } from './types';

export type Phase = 'preparation' | 'initial_steps' | 'vtp' | 'vtp_ldj_eval' | 'cpap' | 'compressions' | 'setting_ventilator' | 'routine_care' | 'post_resuscitation' | 'completed';

export interface Anthropometry {
  bbl: string;  // berat badan lahir aktual (gram)
  pb: string;   // panjang badan (cm)
  lk: string;   // lingkar kepala (cm)
  ld: string;   // lingkar dada (cm)
  lila: string; // lingkar lengan atas (cm)
}

interface ResneoStore {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  phase: Phase;
  setPhase: (p: Phase) => void;
  isTimerRunning: boolean;
  setIsTimerRunning: (r: boolean) => void;
  elapsedTime: number;
  setElapsedTime: (t: number) => void;
  startTime: number | null;
  setStartTime: (t: number | null) => void;
  clinicalLog: { time: string, message: string }[];
  addLog: (elapsedTime: number, message: string) => void;
  clearLog: () => void;
  downeScore: number;
  setDowneScore: (score: number) => void;
  anthropometry: Anthropometry;
  setAnthropometry: (a: Partial<Anthropometry>) => void;
}

export const useStore = create<ResneoStore>((set) => ({
  activeTab: 'home',
  setActiveTab: (activeTab) => set({ activeTab }),
  phase: 'preparation',
  setPhase: (phase) => set({ phase }),
  isTimerRunning: false,
  setIsTimerRunning: (isTimerRunning) => set({ isTimerRunning }),
  elapsedTime: 0,
  setElapsedTime: (elapsedTime) => set({ elapsedTime }),
  startTime: null,
  setStartTime: (startTime) => set({ startTime }),
  clinicalLog: [],
  addLog: (elapsed, message) => {
    const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const secs = (elapsed % 60).toString().padStart(2, '0');
    const now = new Date();
    const hrs = now.getHours().toString().padStart(2, '0');
    const minsReal = now.getMinutes().toString().padStart(2, '0');
    const secsReal = now.getSeconds().toString().padStart(2, '0');
    const timeStr = `[${mins}:${secs} | ${hrs}:${minsReal}:${secsReal}]`;
    set((state) => ({ clinicalLog: [...state.clinicalLog, { time: timeStr, message }] }));
  },
  clearLog: () => set({ clinicalLog: [] }),
  downeScore: 0,
  setDowneScore: (downeScore) => set({ downeScore }),
  anthropometry: { bbl: '', pb: '', lk: '', ld: '', lila: '' },
  setAnthropometry: (a) => set((state) => ({ anthropometry: { ...state.anthropometry, ...a } })),
}));
