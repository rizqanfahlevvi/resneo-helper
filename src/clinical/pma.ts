// ============================================================
// Usia postnatal (PNA) & usia pasca-menstruasi (PMA) berjalan
// ============================================================

export interface PostnatalAge {
  totalHours: number;
  days: number;
  hours: number;
}

/** Usia postnatal dari waktu lahir hingga waktu referensi (default: sekarang). */
export function postnatalAge(birthDateTimeIso: string, referenceDate: Date = new Date()): PostnatalAge | null {
  if (!birthDateTimeIso) return null;
  const birth = new Date(birthDateTimeIso);
  if (Number.isNaN(birth.getTime())) return null;
  const totalMs = referenceDate.getTime() - birth.getTime();
  if (totalMs < 0) return null;
  const totalHours = totalMs / (1000 * 60 * 60);
  return {
    totalHours,
    days: Math.floor(totalHours / 24),
    hours: Math.floor(totalHours % 24),
  };
}

/** PMA (minggu) = usia gestasi saat lahir (minggu) + usia postnatal (minggu). */
export function postmenstrualAgeWeeks(
  gaAtBirthWeeks: number,
  birthDateTimeIso: string,
  referenceDate: Date = new Date()
): number | null {
  const pna = postnatalAge(birthDateTimeIso, referenceDate);
  if (pna === null || !(gaAtBirthWeeks > 0)) return null;
  return gaAtBirthWeeks + pna.totalHours / (24 * 7);
}

/** Format PMA menjadi mis. "38 mgg 3 hr". */
export function formatPMA(pmaWeeks: number): string {
  const weeks = Math.floor(pmaWeeks);
  const days = Math.round((pmaWeeks - weeks) * 7);
  return days > 0 ? `${weeks} mgg ${days} hr` : `${weeks} mgg`;
}

/** Format usia postnatal menjadi mis. "3 hr 14 jam" atau "8 jam" jika < 1 hari. */
export function formatPostnatalAge(pna: PostnatalAge): string {
  if (pna.days === 0) return `${pna.hours} jam`;
  return `${pna.days} hr ${pna.hours} jam`;
}
