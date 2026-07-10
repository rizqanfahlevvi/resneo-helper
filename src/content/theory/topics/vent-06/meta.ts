import { Layers } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'vent-06',
  category: 'Ventilator Mekanik — Panduan Lengkap',
  title: 'Bab 6 — Mode-Mode Ventilator (Lengkap)',
  shortTitle: 'Bab 6: Mode-Mode Ventilator',
  teaser: 'VCV, PCV, PSV, PRVC/TargetVent, APRV, HFOV, nCPAP/nIPPV, & tabel perbandingan.',
  badge: 'Materi NICU/PICU · contoh: Bellavista G6/1000/1000e',
  icon: Layers,
  accent: 'violet',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'imtmedical ag. bellavista Ventilator User Manual, G6, 1000/1000e, Neo. 2019 (rev. 2020-03) — Bagian 8 "Setting up ventilation".' },
  { n: 2, text: 'Canpolat FE, dkk. Comparison of Bilevel Volume Guarantee and Pressure-Regulated Volume Control Modes in Preterm Infants. PMC. 2023.' },
  { n: 3, text: 'Pressure-Regulated Volume Control Ventilation Versus Pressure Control Ventilation on Oxygenation and Lung Dynamics of Neonates With Acute Respiratory Failure: A Quasi-experimental Study. PMC. 2025.' },
  { n: 4, text: 'Leak-compensated pressure regulated volume control ventilation. Paten/deskripsi teknis PRVC.' },
  { n: 5, text: 'High-Frequency Oscillator in the Neonate. StatPearls — NCBI Bookshelf. 2024.' },
  { n: 6, text: 'High Frequency Ventilation. StatPearls — NCBI Bookshelf. 2022.' },
  { n: 7, text: 'High Frequency Oscillatory Ventilation (HFOV): a guide to the use of HFOV in the neonate. NHS Greater Glasgow and Clyde / Right Decisions.' },
  { n: 8, text: 'Are we ready for volume targeting during high-frequency oscillatory ventilation in neonates? Pediatr Res. 2025.' },
  { n: 9, text: 'Wibble Wobble: High Frequency Oscillatory Ventilation. PaediatricFOAM. 2024.' },
  { n: 10, text: 'The Physiological Basis of High-Frequency Oscillatory Ventilation and Current Evidence in Adults and Children: A Narrative Review. Front Physiol. 2022.' },
  { n: 11, text: 'High-frequency oscillatory ventilation with or without volume guarantee during neonatal transport. J Perinatol. 2024.' },
  { n: 12, text: 'Pulmonary: NICU Handbook. Stead Family Children’s Hospital.' },
];
