import { describe, it, expect } from 'vitest';
import { postnatalAge, postmenstrualAgeWeeks, formatPMA, formatPostnatalAge } from './pma';

describe('postnatalAge', () => {
  it('menghitung selisih jam/hari dengan benar', () => {
    const birth = new Date('2026-01-01T00:00:00Z');
    const ref = new Date('2026-01-04T06:00:00Z'); // 3 hari 6 jam kemudian
    const pna = postnatalAge(birth.toISOString(), ref);
    expect(pna).not.toBeNull();
    expect(pna!.days).toBe(3);
    expect(pna!.hours).toBe(6);
  });

  it('null jika input kosong atau invalid', () => {
    expect(postnatalAge('')).toBeNull();
    expect(postnatalAge('not-a-date')).toBeNull();
  });

  it('null jika referensi sebelum lahir', () => {
    const birth = new Date('2026-01-05T00:00:00Z');
    const ref = new Date('2026-01-01T00:00:00Z');
    expect(postnatalAge(birth.toISOString(), ref)).toBeNull();
  });
});

describe('postmenstrualAgeWeeks', () => {
  it('PMA = GA lahir + usia postnatal dalam minggu', () => {
    const birth = new Date('2026-01-01T00:00:00Z');
    const ref = new Date('2026-01-08T00:00:00Z'); // +7 hari = +1 minggu
    const pma = postmenstrualAgeWeeks(32, birth.toISOString(), ref);
    expect(pma).toBeCloseTo(33, 5);
  });

  it('null jika GA tidak valid', () => {
    expect(postmenstrualAgeWeeks(0, new Date().toISOString())).toBeNull();
  });
});

describe('format', () => {
  it('formatPMA menampilkan minggu+hari', () => {
    expect(formatPMA(38.5)).toBe('38 mgg 4 hr');
    expect(formatPMA(40)).toBe('40 mgg');
  });
  it('formatPostnatalAge menampilkan jam saja jika <1 hari', () => {
    expect(formatPostnatalAge({ totalHours: 5, days: 0, hours: 5 })).toBe('5 jam');
    expect(formatPostnatalAge({ totalHours: 30, days: 1, hours: 6 })).toBe('1 hr 6 jam');
  });
});
