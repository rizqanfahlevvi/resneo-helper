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
  birthDateTime: string; // ISO datetime — dasar perhitungan usia postnatal & PMA
}

export interface ApgarEval {
  minute: number;
  appearance: number | null;
  pulse: number | null;
  grimace: number | null;
  activity: number | null;
  respiration: number | null;
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

/** Jawaban per-parameter suatu skor: key parameter -> poin terpilih (null = belum diisi). */
export type ScoreAnswers = Record<string, number | null>;

// Snapshot bayi tersimpan di database pasien — memungkinkan banyak bayi
// tersimpan sekaligus, masing-masing dengan identitas & data klinisnya sendiri.
export interface PatientRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  patientIdentity: PatientIdentity;
  anthropometry: Anthropometry;
  gestationalAge: string;
  birthWeight: string;
  apgarEvals: ApgarEval[];
  downeScore: number;
  thomsonScore: number;
  silvermanScore: number;
  downeAnswers: ScoreAnswers;
  thomsonAnswers: ScoreAnswers;
  silvermanAnswers: ScoreAnswers;
  ballardN: ScoreAnswers;
  ballardP: ScoreAnswers;
  flaccAnswers: ScoreAnswers;
  nipsAnswers: ScoreAnswers;
  clinicalLog: { time: string; message: string }[];
  drugLog: DrugAction[];
  phase: Phase;
  elapsedTime: number;
}

const blankPatientIdentity = (): PatientIdentity => ({
  namaIbu: '', diagnosisIbu: '', kondisiKlinis: '', usia: '', jenisKelamin: '', birthDateTime: '',
});
const blankAnthropometry = (): Anthropometry => ({ bbl: '', pb: '', lk: '', ld: '', lila: '' });
const blankApgarEvals = (): ApgarEval[] => [
  { minute: 1, appearance: null, pulse: null, grimace: null, activity: null, respiration: null },
  { minute: 5, appearance: null, pulse: null, grimace: null, activity: null, respiration: null },
];

type ActivePatientFields = Pick<ResneoStore,
  'patientIdentity' | 'anthropometry' | 'gestationalAge' | 'birthWeight' | 'apgarEvals' |
  'downeScore' | 'thomsonScore' | 'silvermanScore' |
  'downeAnswers' | 'thomsonAnswers' | 'silvermanAnswers' | 'ballardN' | 'ballardP' | 'flaccAnswers' | 'nipsAnswers' |
  'clinicalLog' | 'drugLog' | 'phase' | 'elapsedTime'
>;

const blankActivePatientFields = (): ActivePatientFields => ({
  patientIdentity: blankPatientIdentity(),
  anthropometry: blankAnthropometry(),
  gestationalAge: '',
  birthWeight: '',
  apgarEvals: blankApgarEvals(),
  downeScore: 0,
  thomsonScore: 0,
  silvermanScore: 0,
  downeAnswers: {},
  thomsonAnswers: {},
  silvermanAnswers: {},
  ballardN: {},
  ballardP: {},
  flaccAnswers: {},
  nipsAnswers: {},
  clinicalLog: [],
  drugLog: [],
  phase: 'preparation',
  elapsedTime: 0,
});

const patientFieldsFromRecord = (r: PatientRecord): ActivePatientFields => ({
  patientIdentity: r.patientIdentity,
  anthropometry: r.anthropometry,
  gestationalAge: r.gestationalAge,
  birthWeight: r.birthWeight,
  apgarEvals: r.apgarEvals,
  downeScore: r.downeScore,
  thomsonScore: r.thomsonScore,
  silvermanScore: r.silvermanScore,
  downeAnswers: r.downeAnswers ?? {},
  thomsonAnswers: r.thomsonAnswers ?? {},
  silvermanAnswers: r.silvermanAnswers ?? {},
  ballardN: r.ballardN ?? {},
  ballardP: r.ballardP ?? {},
  flaccAnswers: r.flaccAnswers ?? {},
  nipsAnswers: r.nipsAnswers ?? {},
  clinicalLog: r.clinicalLog,
  drugLog: r.drugLog,
  phase: r.phase,
  elapsedTime: r.elapsedTime,
});

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
  thomsonScore: number;
  setThomsonScore: (score: number) => void;
  silvermanScore: number;
  setSilvermanScore: (score: number) => void;
  downeAnswers: ScoreAnswers;
  setDowneAnswer: (key: string, value: number | null) => void;
  clearDowneAnswers: () => void;
  thomsonAnswers: ScoreAnswers;
  setThomsonAnswer: (key: string, value: number | null) => void;
  clearThomsonAnswers: () => void;
  silvermanAnswers: ScoreAnswers;
  setSilvermanAnswer: (key: string, value: number | null) => void;
  clearSilvermanAnswers: () => void;
  ballardN: ScoreAnswers;
  setBallardN: (key: string, value: number | null) => void;
  ballardP: ScoreAnswers;
  setBallardP: (key: string, value: number | null) => void;
  clearBallard: () => void;
  flaccAnswers: ScoreAnswers;
  setFlaccAnswer: (key: string, value: number | null) => void;
  clearFlaccAnswers: () => void;
  nipsAnswers: ScoreAnswers;
  setNipsAnswer: (key: string, value: number | null) => void;
  clearNipsAnswers: () => void;
  patientIdentity: PatientIdentity;
  setPatientIdentity: (p: Partial<PatientIdentity>) => void;
  anthropometry: Anthropometry;
  setAnthropometry: (a: Partial<Anthropometry>) => void;
  gestationalAge: string;
  setGestationalAge: (ga: string) => void;
  birthWeight: string;
  setBirthWeight: (bw: string) => void;
  phaseStartTime: number | null;
  setPhaseStartTime: (t: number | null) => void;
  sessionHistory: SessionRecord[];
  saveSession: (record: Omit<SessionRecord, 'id' | 'date'>) => void;
  clearHistory: () => void;
  drugLog: DrugAction[];
  addDrugLog: (elapsed: number, drugName: string, dose: string, route: string, notes?: string) => void;
  clearDrugLog: () => void;
  apgarEvals: ApgarEval[];
  setApgarField: (minute: number, field: keyof Omit<ApgarEval, 'minute'>, value: number | null) => void;
  addApgarMinute: (minute: number) => void;
  clearApgar: () => void;
  patients: PatientRecord[];
  activePatientId: string | null;
  addPatient: () => void;
  selectPatient: (id: string) => void;
  deletePatient: (id: string) => void;
  ensureActivePatient: () => void;
  favoriteTheory: string[];
  toggleFavoriteTheory: (id: string) => void;
  /** Deep-link sekali-pakai dari pencarian global ke topik teori tertentu — dikonsumsi & dikosongkan oleh TabTheory. */
  theoryDeepLinkId: string | null;
  setTheoryDeepLinkId: (id: string | null) => void;
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
      thomsonScore: 0,
      setThomsonScore: (thomsonScore) => set({ thomsonScore }),
      silvermanScore: 0,
      setSilvermanScore: (silvermanScore) => set({ silvermanScore }),
      downeAnswers: {},
      setDowneAnswer: (key, value) => set((state) => ({ downeAnswers: { ...state.downeAnswers, [key]: value } })),
      clearDowneAnswers: () => set({ downeAnswers: {}, downeScore: 0 }),
      thomsonAnswers: {},
      setThomsonAnswer: (key, value) => set((state) => ({ thomsonAnswers: { ...state.thomsonAnswers, [key]: value } })),
      clearThomsonAnswers: () => set({ thomsonAnswers: {}, thomsonScore: 0 }),
      silvermanAnswers: {},
      setSilvermanAnswer: (key, value) => set((state) => ({ silvermanAnswers: { ...state.silvermanAnswers, [key]: value } })),
      clearSilvermanAnswers: () => set({ silvermanAnswers: {}, silvermanScore: 0 }),
      ballardN: {},
      setBallardN: (key, value) => set((state) => ({ ballardN: { ...state.ballardN, [key]: value } })),
      ballardP: {},
      setBallardP: (key, value) => set((state) => ({ ballardP: { ...state.ballardP, [key]: value } })),
      clearBallard: () => set({ ballardN: {}, ballardP: {} }),
      flaccAnswers: {},
      setFlaccAnswer: (key, value) => set((state) => ({ flaccAnswers: { ...state.flaccAnswers, [key]: value } })),
      clearFlaccAnswers: () => set({ flaccAnswers: {} }),
      nipsAnswers: {},
      setNipsAnswer: (key, value) => set((state) => ({ nipsAnswers: { ...state.nipsAnswers, [key]: value } })),
      clearNipsAnswers: () => set({ nipsAnswers: {} }),
      patientIdentity: blankPatientIdentity(),
      setPatientIdentity: (p) => set((state) => ({ patientIdentity: { ...state.patientIdentity, ...p } })),
      anthropometry: blankAnthropometry(),
      setAnthropometry: (a) => set((state) => ({ anthropometry: { ...state.anthropometry, ...a } })),
      gestationalAge: '',
      setGestationalAge: (gestationalAge) => set({ gestationalAge }),
      birthWeight: '',
      setBirthWeight: (birthWeight) => set({ birthWeight }),
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
      apgarEvals: blankApgarEvals(),
      setApgarField: (minute, field, value) => set((state) => ({
        apgarEvals: state.apgarEvals.map((ev) => ev.minute === minute ? { ...ev, [field]: value } : ev),
      })),
      addApgarMinute: (minute) => set((state) => {
        if (state.apgarEvals.some((ev) => ev.minute === minute)) return state;
        return {
          apgarEvals: [...state.apgarEvals, { minute, appearance: null, pulse: null, grimace: null, activity: null, respiration: null }]
            .sort((a, b) => a.minute - b.minute),
        };
      }),
      clearApgar: () => set({ apgarEvals: blankApgarEvals() }),
      patients: [],
      activePatientId: null,
      addPatient: () => set((state) => {
        const id = Date.now().toString();
        const now = new Date().toISOString();
        const blank = blankActivePatientFields();
        const record: PatientRecord = { id, createdAt: now, updatedAt: now, ...blank };
        return {
          ...blank,
          patients: [record, ...state.patients],
          activePatientId: id,
        };
      }),
      selectPatient: (id) => set((state) => {
        const target = state.patients.find((p) => p.id === id);
        if (!target) return state;
        return { activePatientId: id, ...patientFieldsFromRecord(target) };
      }),
      deletePatient: (id) => set((state) => {
        const remaining = state.patients.filter((p) => p.id !== id);
        if (state.activePatientId !== id) return { patients: remaining };
        const next = remaining[0];
        return {
          patients: remaining,
          activePatientId: next ? next.id : null,
          ...(next ? patientFieldsFromRecord(next) : blankActivePatientFields()),
        };
      }),
      favoriteTheory: [],
      toggleFavoriteTheory: (id) => set((state) => ({
        favoriteTheory: state.favoriteTheory.includes(id)
          ? state.favoriteTheory.filter((f) => f !== id)
          : [...state.favoriteTheory, id],
      })),
      theoryDeepLinkId: null,
      setTheoryDeepLinkId: (theoryDeepLinkId) => set({ theoryDeepLinkId }),
      ensureActivePatient: () => set((state) => {
        if (state.activePatientId || state.patients.length > 0) return state;
        const hasData = !!(state.patientIdentity.namaIbu || state.anthropometry.bbl || state.gestationalAge);
        if (!hasData) return state;
        const id = Date.now().toString();
        const now = new Date().toISOString();
        const record: PatientRecord = {
          id, createdAt: now, updatedAt: now,
          patientIdentity: state.patientIdentity,
          anthropometry: state.anthropometry,
          gestationalAge: state.gestationalAge,
          birthWeight: state.birthWeight,
          apgarEvals: state.apgarEvals,
          downeScore: state.downeScore,
          thomsonScore: state.thomsonScore,
          silvermanScore: state.silvermanScore,
          downeAnswers: state.downeAnswers,
          thomsonAnswers: state.thomsonAnswers,
          silvermanAnswers: state.silvermanAnswers,
          ballardN: state.ballardN,
          ballardP: state.ballardP,
          flaccAnswers: state.flaccAnswers,
          nipsAnswers: state.nipsAnswers,
          clinicalLog: state.clinicalLog,
          drugLog: state.drugLog,
          phase: state.phase,
          elapsedTime: state.elapsedTime,
        };
        return { patients: [record], activePatientId: id };
      }),
    }),
    {
      name: 'resneo-store',
      storage: createJSONStorage(() => localStorage),
      // Hanya persist data klinis penting — timer state tidak perlu
      partialize: (state) => ({
        patientIdentity: state.patientIdentity,
        anthropometry: state.anthropometry,
        gestationalAge: state.gestationalAge,
        birthWeight: state.birthWeight,
        clinicalLog: state.clinicalLog,
        drugLog: state.drugLog,
        apgarEvals: state.apgarEvals,
        sessionHistory: state.sessionHistory,
        phase: state.phase,
        elapsedTime: state.elapsedTime,
        downeScore: state.downeScore,
        thomsonScore: state.thomsonScore,
        silvermanScore: state.silvermanScore,
        downeAnswers: state.downeAnswers,
        thomsonAnswers: state.thomsonAnswers,
        silvermanAnswers: state.silvermanAnswers,
        ballardN: state.ballardN,
        ballardP: state.ballardP,
        flaccAnswers: state.flaccAnswers,
        nipsAnswers: state.nipsAnswers,
        activeTab: state.activeTab,
        patients: state.patients,
        activePatientId: state.activePatientId,
        favoriteTheory: state.favoriteTheory,
      }),
    }
  )
);

// Sinkron otomatis: setiap perubahan data pasien aktif (identitas, skor, log, dll)
// disalin ke record-nya di database `patients`, agar tidak perlu tombol "simpan" manual
// dan data setiap bayi tetap terpisah saat berpindah pasien.
useStore.subscribe((state, prevState) => {
  if (!state.activePatientId || state.activePatientId !== prevState.activePatientId) return;
  const changed =
    state.patientIdentity !== prevState.patientIdentity ||
    state.anthropometry !== prevState.anthropometry ||
    state.gestationalAge !== prevState.gestationalAge ||
    state.birthWeight !== prevState.birthWeight ||
    state.apgarEvals !== prevState.apgarEvals ||
    state.downeScore !== prevState.downeScore ||
    state.thomsonScore !== prevState.thomsonScore ||
    state.silvermanScore !== prevState.silvermanScore ||
    state.downeAnswers !== prevState.downeAnswers ||
    state.thomsonAnswers !== prevState.thomsonAnswers ||
    state.silvermanAnswers !== prevState.silvermanAnswers ||
    state.ballardN !== prevState.ballardN ||
    state.ballardP !== prevState.ballardP ||
    state.flaccAnswers !== prevState.flaccAnswers ||
    state.nipsAnswers !== prevState.nipsAnswers ||
    state.clinicalLog !== prevState.clinicalLog ||
    state.drugLog !== prevState.drugLog ||
    state.phase !== prevState.phase ||
    state.elapsedTime !== prevState.elapsedTime;
  if (!changed) return;

  const idx = state.patients.findIndex((p) => p.id === state.activePatientId);
  if (idx === -1) return;
  const patients = [...state.patients];
  patients[idx] = {
    ...patients[idx],
    updatedAt: new Date().toISOString(),
    patientIdentity: state.patientIdentity,
    anthropometry: state.anthropometry,
    gestationalAge: state.gestationalAge,
    birthWeight: state.birthWeight,
    apgarEvals: state.apgarEvals,
    downeScore: state.downeScore,
    thomsonScore: state.thomsonScore,
    silvermanScore: state.silvermanScore,
    downeAnswers: state.downeAnswers,
    thomsonAnswers: state.thomsonAnswers,
    silvermanAnswers: state.silvermanAnswers,
    ballardN: state.ballardN,
    ballardP: state.ballardP,
    flaccAnswers: state.flaccAnswers,
    nipsAnswers: state.nipsAnswers,
    clinicalLog: state.clinicalLog,
    drugLog: state.drugLog,
    phase: state.phase,
    elapsedTime: state.elapsedTime,
  };
  useStore.setState({ patients });
});
