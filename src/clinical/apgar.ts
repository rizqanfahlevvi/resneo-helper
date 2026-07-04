import { ApgarEval } from '../store';

export const APGAR_PARAMS: {
  key: keyof Omit<ApgarEval, 'minute'>;
  name: string;
  opts: { val: number; desc: string }[];
}[] = [
  { key: 'appearance', name: 'Appearance (Warna Kulit)', opts: [{ val: 0, desc: 'Biru/Pucat' }, { val: 1, desc: 'Tubuh pink, ekstremitas biru' }, { val: 2, desc: 'Seluruh tubuh pink normal' }] },
  { key: 'pulse', name: 'Pulse (Laju Jantung)', opts: [{ val: 0, desc: 'Tidak ada' }, { val: 1, desc: '<100 x/m' }, { val: 2, desc: '>=100 x/m' }] },
  { key: 'grimace', name: 'Grimace (Refleks)', opts: [{ val: 0, desc: 'Tidak ada respons' }, { val: 1, desc: 'Meringis tipis' }, { val: 2, desc: 'Menangis kuat/batuk' }] },
  { key: 'activity', name: 'Activity (Tonus Otot)', opts: [{ val: 0, desc: 'Lemas/Flaccid' }, { val: 1, desc: 'Sedikit fleksi' }, { val: 2, desc: 'Gerakan aktif fleksi kuat' }] },
  { key: 'respiration', name: 'Respiration (Usaha Napas)', opts: [{ val: 0, desc: 'Tidak ada' }, { val: 1, desc: 'Lambat/merintih' }, { val: 2, desc: 'Menangis kuat' }] },
];

export function getApgarTotal(ev: ApgarEval): { total: number; complete: boolean } {
  let total = 0;
  let complete = true;
  const fields: (keyof Omit<ApgarEval, 'minute'>)[] = ['appearance', 'pulse', 'grimace', 'activity', 'respiration'];
  fields.forEach((f) => {
    if (ev[f] !== null) total += ev[f] as number;
    else complete = false;
  });
  return { total, complete };
}

export function apgarInterpretation(total: number): { label: string; color: string } {
  if (total >= 7) return { label: 'Normal', color: 'text-emerald-600 dark:text-emerald-400' };
  if (total >= 4) return { label: 'Asfiksia Sedang', color: 'text-amber-600 dark:text-amber-400' };
  return { label: 'Asfiksia Berat', color: 'text-rose-600 dark:text-rose-400' };
}
