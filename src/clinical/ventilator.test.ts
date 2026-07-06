import { describe, it, expect } from 'vitest';
import { getVentilatorSettings, VENTILATOR_SCENARIOS, BLOOD_GAS_TARGET, WEANING_CRITERIA, VentilatorScenario } from './ventilator';

describe('getVentilatorSettings', () => {
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
