import { describe, it, expect } from 'vitest';
import {
  phototherapyThreshold,
  exchangeTransfusionThreshold,
  classifyBilirubin,
  hasNeurotoxicityRiskFactor,
  DEFAULT_BILIRUBIN_RISK,
} from './bilirubin';

describe('Ambang fototerapi (AAP 2022, aproksimasi)', () => {
  it('term (≥38 mgg) naik seiring usia jam', () => {
    const t24 = phototherapyThreshold(40, 24, DEFAULT_BILIRUBIN_RISK);
    const t72 = phototherapyThreshold(40, 72, DEFAULT_BILIRUBIN_RISK);
    expect(t72).toBeGreaterThan(t24);
  });

  it('late-preterm (35–37 6/7 mgg) lebih rendah dari term pada usia sama', () => {
    const term = phototherapyThreshold(39, 48, DEFAULT_BILIRUBIN_RISK);
    const late = phototherapyThreshold(36, 48, DEFAULT_BILIRUBIN_RISK);
    expect(late).toBeLessThan(term);
  });

  it('faktor risiko menurunkan ambang ~2 mg/dL', () => {
    const noRisk = phototherapyThreshold(40, 48, DEFAULT_BILIRUBIN_RISK);
    const withRisk = phototherapyThreshold(40, 48, { ...DEFAULT_BILIRUBIN_RISK, sepsis: true });
    expect(noRisk - withRisk).toBeCloseTo(2, 5);
  });

  it('preterm <35 mgg pakai tabel GA, makin prematur makin rendah', () => {
    expect(phototherapyThreshold(27, 48, DEFAULT_BILIRUBIN_RISK)).toBeLessThan(
      phototherapyThreshold(33, 48, DEFAULT_BILIRUBIN_RISK)
    );
  });
});

describe('Ambang transfusi tukar', () => {
  it('selalu lebih tinggi dari ambang fototerapi', () => {
    const photo = phototherapyThreshold(40, 72, DEFAULT_BILIRUBIN_RISK);
    const exch = exchangeTransfusionThreshold(40, 72, DEFAULT_BILIRUBIN_RISK);
    expect(exch).toBeGreaterThan(photo);
  });
});

describe('Klasifikasi bilirubin', () => {
  it('TSB rendah → normal', () => {
    expect(classifyBilirubin(4, 40, 24, DEFAULT_BILIRUBIN_RISK)).toBe('normal');
  });
  it('TSB tepat di ambang fototerapi → fototerapi', () => {
    const photo = phototherapyThreshold(40, 72, DEFAULT_BILIRUBIN_RISK);
    expect(classifyBilirubin(photo, 40, 72, DEFAULT_BILIRUBIN_RISK)).toBe('fototerapi');
  });
  it('TSB di atas ambang transfusi → transfusi', () => {
    const exch = exchangeTransfusionThreshold(40, 72, DEFAULT_BILIRUBIN_RISK);
    expect(classifyBilirubin(exch + 1, 40, 72, DEFAULT_BILIRUBIN_RISK)).toBe('transfusi');
  });
});

describe('hasNeurotoxicityRiskFactor', () => {
  it('false jika semua false', () => {
    expect(hasNeurotoxicityRiskFactor(DEFAULT_BILIRUBIN_RISK)).toBe(false);
  });
  it('true jika salah satu true', () => {
    expect(hasNeurotoxicityRiskFactor({ ...DEFAULT_BILIRUBIN_RISK, asfiksia: true })).toBe(true);
  });
});
