import { describe, it, expect } from 'vitest';
import {
  getVentilatorSettings,
  VENTILATOR_SCENARIOS,
  BLOOD_GAS_TARGET,
  getBloodGasTarget,
  getGaTier,
  WEANING_CRITERIA,
  VentilatorScenario,
} from './ventilator';

describe('getVentilatorSettings (tanpa GA)', () => {
  const scenarios: VentilatorScenario[] = ['normal', 'rds', 'mas', 'apnea', 'pphn'];

  it('mengembalikan setting untuk semua skenario', () => {
    scenarios.forEach((s) => {
      const setting = getVentilatorSettings(s);
      expect(setting.pip[0]).toBeLessThanOrEqual(setting.pip[1]);
      expect(setting.peep[0]).toBeLessThanOrEqual(setting.peep[1]);
      expect(setting.rr[0]).toBeLessThanOrEqual(setting.rr[1]);
      expect(setting.ti[0]).toBeLessThanOrEqual(setting.ti[1]);
      expect(setting.notes.length).toBeGreaterThan(0);
    });
  });

  it('MAS memakai RR lebih rendah dari RDS (perpanjang ekspirasi, cegah air-trapping)', () => {
    const mas = getVentilatorSettings('mas');
    const rds = getVentilatorSettings('rds');
    expect(mas.rr[1]).toBeLessThan(rds.rr[1]);
  });

  it('Apnea memakai PIP paling rendah (ventilasi minimal)', () => {
    const apnea = getVentilatorSettings('apnea');
    const rds = getVentilatorSettings('rds');
    const mas = getVentilatorSettings('mas');
    expect(apnea.pip[1]).toBeLessThan(rds.pip[1]);
    expect(apnea.pip[1]).toBeLessThan(mas.pip[1]);
  });

  it('MAS memakai PEEP lebih rendah dari RDS (hindari air-trapping)', () => {
    const mas = getVentilatorSettings('mas');
    const rds = getVentilatorSettings('rds');
    expect(mas.peep[1]).toBeLessThanOrEqual(rds.peep[1]);
  });

  it('semua skenario terdaftar di VENTILATOR_SCENARIOS', () => {
    scenarios.forEach((s) => {
      expect(VENTILATOR_SCENARIOS[s]).toBeDefined();
      expect(VENTILATOR_SCENARIOS[s].label.length).toBeGreaterThan(0);
    });
  });
});

describe('getGaTier', () => {
  it('mengklasifikasikan tier dengan benar', () => {
    expect(getGaTier(26)).toBe('extremely_preterm');
    expect(getGaTier(30)).toBe('very_preterm');
    expect(getGaTier(34)).toBe('late_preterm');
    expect(getGaTier(39)).toBe('term');
  });

  it('batas tepat tier terklasifikasi benar', () => {
    expect(getGaTier(27.9)).toBe('extremely_preterm');
    expect(getGaTier(28)).toBe('very_preterm');
    expect(getGaTier(31.9)).toBe('very_preterm');
    expect(getGaTier(32)).toBe('late_preterm');
    expect(getGaTier(36.9)).toBe('late_preterm');
    expect(getGaTier(37)).toBe('term');
  });
});

describe('getVentilatorSettings (dengan GA — stratifikasi prematur)', () => {
  it('RDS pada ekstrem prematur memakai VT target lebih rendah (gentle ventilation)', () => {
    const extremePreterm = getVentilatorSettings('rds', 26);
    const lateTerm = getVentilatorSettings('rds', 38);
    expect(extremePreterm.targetVt![1]).toBeLessThan(lateTerm.targetVt![1]);
  });

  it('RDS pada ekstrem prematur memakai PIP atas lebih rendah dari default', () => {
    const extremePreterm = getVentilatorSettings('rds', 26);
    const noGa = getVentilatorSettings('rds');
    expect(extremePreterm.pip[1]).toBeLessThanOrEqual(noGa.pip[1]);
  });

  it('menambahkan catatan spesifik GA di awal daftar notes', () => {
    const extremePreterm = getVentilatorSettings('normal', 25);
    expect(extremePreterm.notes[0]).toContain('Ekstrem prematur');
  });

  it('MAS tidak disesuaikan oleh GA (epidemiologis dominan aterm)', () => {
    const masWithGa = getVentilatorSettings('mas', 39);
    const masNoGa = getVentilatorSettings('mas');
    expect(masWithGa.pip).toEqual(masNoGa.pip);
    expect(masWithGa.peep).toEqual(masNoGa.peep);
  });

  it('GA 0 atau tidak diberikan → sama dengan default (backward compatible)', () => {
    const withZero = getVentilatorSettings('rds', 0);
    const withoutGa = getVentilatorSettings('rds');
    expect(withZero).toEqual(withoutGa);
  });
});

describe('getBloodGasTarget', () => {
  it('default sama dengan BLOOD_GAS_TARGET bila GA tidak diberikan', () => {
    expect(getBloodGasTarget()).toEqual(BLOOD_GAS_TARGET);
  });

  it('ekstrem prematur: permissive hypercapnia lebih longgar & SpO2 atas lebih rendah (cegah ROP)', () => {
    const target = getBloodGasTarget(25);
    expect(target.ph[0]).toBeLessThan(BLOOD_GAS_TARGET.ph[0]);
    expect(target.paco2[1]).toBeGreaterThan(BLOOD_GAS_TARGET.paco2[1]);
    expect(target.spo2[1]).toBeLessThan(BLOOD_GAS_TARGET.spo2[1]);
  });

  it('aterm memakai target standar', () => {
    expect(getBloodGasTarget(39)).toEqual(BLOOD_GAS_TARGET);
  });
});

describe('BLOOD_GAS_TARGET', () => {
  it('rentang valid (min <= max)', () => {
    expect(BLOOD_GAS_TARGET.ph[0]).toBeLessThanOrEqual(BLOOD_GAS_TARGET.ph[1]);
    expect(BLOOD_GAS_TARGET.paco2[0]).toBeLessThanOrEqual(BLOOD_GAS_TARGET.paco2[1]);
    expect(BLOOD_GAS_TARGET.spo2[0]).toBeLessThanOrEqual(BLOOD_GAS_TARGET.spo2[1]);
  });

  it('target SpO2 sesuai evidence SUPPORT trial (90-95%)', () => {
    expect(BLOOD_GAS_TARGET.spo2[0]).toBe(90);
    expect(BLOOD_GAS_TARGET.spo2[1]).toBe(95);
  });
});

describe('WEANING_CRITERIA', () => {
  it('memiliki minimal 5 kriteria', () => {
    expect(WEANING_CRITERIA.length).toBeGreaterThanOrEqual(5);
  });
});
