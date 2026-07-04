import { describe, it, expect } from 'vitest';
import {
  ettSizeByWeight,
  ettDepthAtLip,
  adrenalinIv,
  adrenalinEtt,
  saline10PerKg,
  dextrose10Bolus,
  bicarbonate42,
  umbilicalCatheterDepth,
  glucoseInfusionRate,
  ballardToGestationalAge,
  gentamicinByGA,
  gentamicinDosing,
  dailyFluidPerKg,
  isValidBirthWeightGram,
  isValidGestationalAgeWeek,
} from './doses';

describe('ETT (NRP 8th Ed)', () => {
  it('memilih ukuran berdasarkan berat', () => {
    expect(ettSizeByWeight(0.8)).toBe('2.5');
    expect(ettSizeByWeight(1.5)).toBe('3.0');
    expect(ettSizeByWeight(2.5)).toBe('3.5');
    expect(ettSizeByWeight(3.5)).toBe('3.5'); // NRP 8th: tanpa 4.0 rutin
    expect(ettSizeByWeight(0)).toBe('-');
  });

  it('kedalaman di bibir = BB + 6', () => {
    expect(ettDepthAtLip(3)).toBe('9.0');
    expect(ettDepthAtLip(1.2)).toBe('7.2');
    expect(ettDepthAtLip(0)).toBe('-');
  });
});

describe('Adrenalin 1:10.000', () => {
  it('IV/IO 0,1–0,3 mL/kg dengan saran 0,2', () => {
    const d = adrenalinIv(3);
    expect(d.min).toBe('0.30');
    expect(d.max).toBe('0.90');
    expect(d.suggested).toBe('0.60');
  });

  it('ETT 0,5–1,0 mL/kg', () => {
    const d = adrenalinEtt(2);
    expect(d.min).toBe('1.0');
    expect(d.max).toBe('2.0');
  });

  it('BB tidak valid mengembalikan strip', () => {
    expect(adrenalinIv(0).min).toBe('-');
    expect(adrenalinEtt(-1).max).toBe('-');
  });
});

describe('Cairan darurat', () => {
  it('NaCl 10 mL/kg', () => {
    expect(saline10PerKg(3)).toBe('30');
  });
  it('D10% 2 mL/kg', () => {
    expect(dextrose10Bolus(2.5)).toBe('5.0');
  });
  it('NaHCO3 4,2% rentang 2–4 mL/kg', () => {
    const b = bicarbonate42(3);
    expect(b.minMl).toBe('6.0');
    expect(b.maxMl).toBe('12.0');
  });
});

describe('Kateter umbilikal (Shukla)', () => {
  it('BB 3 kg: UAC high 18, UAC low 10, UVC 10', () => {
    const d = umbilicalCatheterDepth(3);
    expect(d.uacHigh).toBe(18);
    expect(d.uacLow).toBe(10);
    expect(d.uvc).toBe(10);
  });
  it('BB 1 kg: UAC high 12, UVC 7', () => {
    const d = umbilicalCatheterDepth(1);
    expect(d.uacHigh).toBe(12);
    expect(d.uvc).toBe(7);
  });
});

describe('GIR', () => {
  it('rate 12 mL/jam D10% BB 2 kg = 10 mg/kg/mnt', () => {
    expect(glucoseInfusionRate(12, 10, 2)).toBeCloseTo(10, 5);
  });
  it('rate 6 mL/jam D10% BB 3 kg ≈ 3,33', () => {
    expect(glucoseInfusionRate(6, 10, 3)).toBeCloseTo(3.333, 2);
  });
  it('input tidak valid → null', () => {
    expect(glucoseInfusionRate(10, 10, 0)).toBeNull();
    expect(glucoseInfusionRate(-1, 10, 2)).toBeNull();
  });
});

describe('New Ballard → usia gestasi', () => {
  it('skor -10 → 20 mgg; 0 → 24; 50 → 44', () => {
    expect(ballardToGestationalAge(-10)).toBe(20);
    expect(ballardToGestationalAge(0)).toBe(24);
    expect(ballardToGestationalAge(50)).toBe(44);
  });
  it('linier 2 minggu per 5 poin', () => {
    expect(ballardToGestationalAge(25) - ballardToGestationalAge(20)).toBeCloseTo(2);
  });
});

describe('Gentamisin (Neofax 2023, PNA 0–7 hari)', () => {
  it('<30 mgg: 5 mg/kg q48h', () => {
    expect(gentamicinByGA(28)).toEqual({ dosePerKg: 5, interval: 'q48h' });
  });
  it('30–34 mgg: 4,5 mg/kg q36h', () => {
    expect(gentamicinByGA(32)).toEqual({ dosePerKg: 4.5, interval: 'q36h' });
    expect(gentamicinByGA(34)).toEqual({ dosePerKg: 4.5, interval: 'q36h' });
  });
  it('≥35 mgg: 4 mg/kg q24h', () => {
    expect(gentamicinByGA(38)).toEqual({ dosePerKg: 4, interval: 'q24h' });
  });
});

describe('gentamicinDosing (PMA + PNA)', () => {
  it('PMA ≤29 mgg, PNA 0-7 hr: 5 mg/kg q48h', () => {
    expect(gentamicinDosing(28, 3)).toEqual({ dosePerKg: 5, interval: 'q48h' });
  });
  it('PMA ≤29 mgg, PNA 8-28 hr: 4 mg/kg q36h', () => {
    expect(gentamicinDosing(28, 14)).toEqual({ dosePerKg: 4, interval: 'q36h' });
  });
  it('PMA ≤29 mgg, PNA ≥29 hr: 4 mg/kg q24h', () => {
    expect(gentamicinDosing(28, 30)).toEqual({ dosePerKg: 4, interval: 'q24h' });
  });
  it('PMA 30-34 mgg, PNA ≤7 hr: 4,5 mg/kg q36h', () => {
    expect(gentamicinDosing(32, 5)).toEqual({ dosePerKg: 4.5, interval: 'q36h' });
  });
  it('PMA 30-34 mgg, PNA >7 hr: 4 mg/kg q24h', () => {
    expect(gentamicinDosing(32, 10)).toEqual({ dosePerKg: 4, interval: 'q24h' });
  });
  it('PMA ≥35 mgg: selalu 4 mg/kg q24h', () => {
    expect(gentamicinDosing(38, 1)).toEqual({ dosePerKg: 4, interval: 'q24h' });
    expect(gentamicinDosing(38, 20)).toEqual({ dosePerKg: 4, interval: 'q24h' });
  });
});

describe('Kebutuhan cairan harian', () => {
  it('makin prematur, kebutuhan hari-1 makin tinggi', () => {
    expect(dailyFluidPerKg('bblsr', 1)).toBeGreaterThan(dailyFluidPerKg('term', 1));
    expect(dailyFluidPerKg('bblr', 1)).toBeGreaterThan(dailyFluidPerKg('term', 1));
  });
  it('naik bertahap per DOL dan ter-clamp 1–7', () => {
    expect(dailyFluidPerKg('term', 1)).toBe(60);
    expect(dailyFluidPerKg('term', 7)).toBe(150);
    expect(dailyFluidPerKg('term', 99)).toBe(150); // clamp
    expect(dailyFluidPerKg('term', 0)).toBe(60);   // clamp
  });
});

describe('Guardrail input', () => {
  it('BB 300–6000 g valid, di luar itu tidak', () => {
    expect(isValidBirthWeightGram(3000)).toBe(true);
    expect(isValidBirthWeightGram(299)).toBe(false);
    expect(isValidBirthWeightGram(6001)).toBe(false);
    expect(isValidBirthWeightGram(NaN)).toBe(false);
  });
  it('GA 22–44 mgg valid', () => {
    expect(isValidGestationalAgeWeek(38)).toBe(true);
    expect(isValidGestationalAgeWeek(21)).toBe(false);
    expect(isValidGestationalAgeWeek(45)).toBe(false);
  });
});
