import { describe, it, expect } from 'vitest';
import {
  INOTROPES,
  doseToRate,
  rateToDose,
  doseZone,
  ruleOfSix,
  ruleVariantFor,
  InotropeId,
} from './inotropes';

describe('INOTROPES katalog', () => {
  it('memuat 5 obat dengan rentang valid', () => {
    const ids: InotropeId[] = ['dopamine', 'dobutamine', 'epinephrine', 'norepinephrine', 'milrinone'];
    ids.forEach((id) => {
      const d = INOTROPES[id];
      expect(d).toBeDefined();
      expect(d.usual[0]).toBeLessThan(d.usual[1]);
      expect(d.max).toBeGreaterThanOrEqual(d.usual[1]);
      expect(d.presets.length).toBeGreaterThan(0);
      expect(d.typicalConc).toBeGreaterThan(0);
    });
  });
});

describe('doseToRate', () => {
  it('menghitung laju sesuai rumus dosis×BB×60÷(konsentrasi×1000)', () => {
    // dopamin 5 mcg/kg/mnt, BB 3 kg, konsentrasi 1.5 mg/mL
    // = 5*3*60 / (1.5*1000) = 900/1500 = 0.6 mL/jam
    expect(doseToRate(5, 3, 1.5)).toBeCloseTo(0.6, 5);
  });

  it('konsisten dengan "rule of six" standar (1 mL/jam = 1 mcg/kg/mnt)', () => {
    const r = ruleOfSix(3, 100, 'standard')!;
    // pada konsentrasi rule-of-6, dosis 1 → laju 1
    expect(doseToRate(1, 3, r.concMgPerMl)).toBeCloseTo(1, 5);
    expect(doseToRate(7, 3, r.concMgPerMl)).toBeCloseTo(7, 5);
  });

  it('rule of six potent: 1 mL/jam = 0,1 mcg/kg/mnt', () => {
    const r = ruleOfSix(2, 50, 'potent')!;
    expect(doseToRate(0.1, 2, r.concMgPerMl)).toBeCloseTo(1, 5);
  });

  it('mengembalikan null untuk input invalid', () => {
    expect(doseToRate(5, 0, 1.5)).toBeNull();
    expect(doseToRate(5, 3, 0)).toBeNull();
  });
});

describe('rateToDose (inversi doseToRate)', () => {
  it('rate→dose adalah kebalikan dose→rate', () => {
    const dose = 8;
    const rate = doseToRate(dose, 2.4, 1.6)!;
    expect(rateToDose(rate, 2.4, 1.6)).toBeCloseTo(dose, 6);
  });

  it('mengembalikan null untuk BB nol', () => {
    expect(rateToDose(1, 0, 1.6)).toBeNull();
  });
});

describe('doseZone', () => {
  it('mengklasifikasikan below/usual/high/over', () => {
    expect(doseZone('dopamine', 1)).toBe('below');
    expect(doseZone('dopamine', 5)).toBe('usual');
    expect(doseZone('dopamine', 20)).toBe('usual'); // == max, masih dalam batas
    expect(doseZone('dopamine', 25)).toBe('over');
  });

  it('menandai dosis di atas rentang lazim tapi ≤max sebagai high', () => {
    // milrinon usual [0.25, 0.75], max 1
    expect(doseZone('milrinone', 0.9)).toBe('high');
    expect(doseZone('milrinone', 1.2)).toBe('over');
  });
});

describe('ruleOfSix', () => {
  it('standar: (6×BB) mg per 100 mL', () => {
    const r = ruleOfSix(3, 100, 'standard')!;
    expect(r.drugMg).toBeCloseTo(18, 5);
    expect(r.concMgPerMl).toBeCloseTo(0.18, 5);
  });

  it('potent: (0,6×BB) mg per 100 mL', () => {
    const r = ruleOfSix(3, 100, 'potent')!;
    expect(r.drugMg).toBeCloseTo(1.8, 5);
  });

  it('menskala dengan volume total', () => {
    const r = ruleOfSix(2, 50, 'standard')!;
    expect(r.drugMg).toBeCloseTo(6, 5); // 6*2*50/100
  });

  it('null untuk input invalid', () => {
    expect(ruleOfSix(0, 100)).toBeNull();
  });
});

describe('ruleVariantFor', () => {
  it('epinefrin & norepinefrin memakai varian potent', () => {
    expect(ruleVariantFor('epinephrine')).toBe('potent');
    expect(ruleVariantFor('norepinephrine')).toBe('potent');
  });
  it('dopamin/dobutamin/milrinon memakai standar', () => {
    expect(ruleVariantFor('dopamine')).toBe('standard');
    expect(ruleVariantFor('milrinone')).toBe('standard');
  });
});
