import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TabType } from './types';

export type Phase = 'preparation' | 'initial_steps' | 'vtp' | 'vtp_ldj_eval' | 'cpap' | 'compressions' | 'setting_ventilator' | 'routine_care' | 'post_resuscitation' | 'completed';

export interface PatientIdentity {
  namaIbu: string;
  diagnosisIbu: string;
  kondisiKlinis: string;
  usia: string;
  jenisKelamin: string;
}

export interface Anthropometry {
  bbl: string;
  pb: string;
  lk: string;
  ld: string;
  lila: string;
}

export interface SessionRecord {
  id: string;
  date: string;
  duration: string;
  log: { time: string; message: string }[];
  anthropometry: Anthropometry;
  birthWeight: string;
  drugLog?: DrugAction[];
}

export interface DrugAction {
  id: string;
  time: string;
  elapsedTime: number;
  drugName: string;
  dose: string;
  route: string;
  notes: string;
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
  clinicalLog: { time: string; message: string }[];
  addLog: (elapsedTime: number, message: string) => void;
  clearLog: () => void;
  downeScore: number;
  setDowneScore: (score: number) => void;
  patientIdentity: PatientIdentity;
  setPatientIdentity: (p: Partial<PatientIdentity>) => void;
  anthropometry: Anthropometry;
  setAnthropometry: (a: Partial<Anthropometry>) => void;
  phaseStartTime: number | null;
  setPhaseStartTime: (t: number | null) => void;
  sessionHistory: SessionRecord[];
  saveSession: (record: Omit<SessionRecord, 'id' | 'date'>) => void;
  clearHistory: () => void;
  drugLog: DrugAction[];
  addDrugLog: (elapsed: number, drugName: string, dose: string, route: string, notes?: string) => void;
  clearDrugLog: () => void;
}

export const useStore = create<ResneoStore>()(
  persist(
    (set) => ({
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
      patientIdentity: { namaIbu: '', diagnosisIbu: '', kondisiKlinis: '', usia: '', jenisKelamin: '' },
      setPatientIdentity: (p) => set((state) => ({ patientIdentity: { ...state.patientIdentity, ...p } })),
      anthropometry: { bbl: '', pb: '', lk: '', ld: '', lila: '' },
      setAnthropometry: (a) => set((state) => ({ anthropometry: { ...state.anthropometry, ...a } })),
      phaseStartTime: null,
      setPhaseStartTime: (phaseStartTime) => set({ phaseStartTime }),
      sessionHistory: [],
      saveSession: (record) => set((state) => {
        const now = new Date();
        const date = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
          + ', ' + now.getHours().toString().padStart(2, '0')
          + ':' + now.getMinutes().toString().padStart(2, '0');
        const newRecord: SessionRecord = { id: Date.now().toString(), date, ...record, drugLog: state.drugLog };
        return { sessionHistory: [newRecord, ...state.sessionHistory].slice(0, 20) };
      }),
      clearHistory: () => set({ sessionHistory: [] }),
      drugLog: [],
      addDrugLog: (elapsed, drugName, dose, route, notes = '') => {
        const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const secs = (elapsed % 60).toString().padStart(2, '0');
        const now = new Date();
        const timeStr = `[${mins}:${secs} | ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}]`;
        const entry: DrugAction = { id: Date.now().toString(), time: timeStr, elapsedTime: elapsed, drugName, dose, route, notes };
        set((state) => ({ drugLog: [...state.drugLog, entry] }));
      },
      clearDrugLog: () => set({ drugLog: [] }),
    }),
    {
      name: 'resneo-store',
      storage: createJSONStorage(() => localStorage),
      // Hanya persist data klinis penting — timer state tidak perlu
      partialize: (state) => ({
        patientIdentity: state.patientIdentity,
        anthropometry: state.anthropometry,
        clinicalLog: state.clinicalLog,
        drugLog: state.drugLog,
        sessionHistory: state.sessionHistory,
        phase: state.phase,
        elapsedTime: state.elapsedTime,
        downeScore: state.downeScore,
        activeTab: state.activeTab,
      }),
    }
  )
);
