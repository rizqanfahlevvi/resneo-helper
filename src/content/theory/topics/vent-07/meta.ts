import { Gauge } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'vent-07',
  category: 'Ventilator Mekanik — Panduan Lengkap',
  title: 'Bab 7 — Nilai & Parameter Ventilator: Setting Awal dan Target',
  shortTitle: 'Bab 7: Nilai & Parameter',
  teaser: 'Vt, PEEP, FiO2, rate, I:E, tekanan, HFOV — titik awal & target per PALICC-2.',
  badge: 'Materi NICU/PICU · PALICC-2',
  icon: Gauge,
  accent: 'emerald',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Emeriaud G, López-Fernández YM, Iyer NP, dkk. Executive Summary of the Second International Guidelines for the Diagnosis and Management of Pediatric Acute Respiratory Distress Syndrome (PALICC-2). Pediatr Crit Care Med. 2023;24(2):143-168.' },
  { n: 2, text: 'Pediatric Acute Respiratory Distress Syndrome Clinical Practice Guidelines (PALICC-2, 2023). Medscape. 2023.' },
  { n: 3, text: "Adherence to the PALICC-2 Guidelines for Management of PARDS in the PICU of a Tertiary Children's Hospital. CHEST. 2025." },
  { n: 4, text: "Paediatric acute respiratory distress syndrome (PARDS). Don't Forget the Bubbles. 2024." },
  { n: 5, text: 'LearnPICU. ARDS/ALI.', link: 'https://www.learnpicu.com/respiratory/ARDS' },
  { n: 6, text: 'Pediatric Acute Respiratory Distress Syndrome Ventilation Bundle. ClinicalTrials.gov NCT03504176.' },
  { n: 7, text: 'ART-2 Pilot - Driving Pressure Limited Ventilation for Patients With ARDS. ClinicalTrials.gov NCT02365038.' },
  { n: 8, text: 'Spaeth JP, dkk. Understanding pediatric ventilation in the operative setting. Part II. Pediatr Anesth. 2022.' },
  { n: 9, text: 'Supplemental Resources for the PICU/NICU: Mechanical Ventilation in the Neonate. Stritch School of Medicine, Loyola University.' },
  { n: 10, text: 'Volume Targeted Mask Ventilation Versus Pressure Ventilation in Preterm Infants. ClinicalTrials.gov protocol.' },
  { n: 11, text: 'Ventilation settings in preterm neonates with ventilator-dependent, evolving BPD. ScienceDirect. 2021.' },
  { n: 12, text: 'Tidal Volume - an overview. ScienceDirect Topics.' },
  { n: 13, text: "Pulmonary: NICU Handbook. Stead Family Children's Hospital." },
  { n: 14, text: 'Respiratory Support in Neonates and Infants. Merck Manual Professional Edition. 2025.' },
  { n: 15, text: 'High Frequency Jet Ventilator (HFJV) for Neonates Clinical Pathway. Johns Hopkins All Children’s Hospital.' },
  { n: 16, text: 'High-Frequency Oscillator in the Neonate. StatPearls — NCBI Bookshelf. 2024.' },
  { n: 17, text: 'High Frequency Ventilation. StatPearls — NCBI Bookshelf. 2022.' },
  { n: 18, text: 'Wibble Wobble: High Frequency Oscillatory Ventilation. PaediatricFOAM. 2024.' },
  { n: 19, text: 'FT64 End Tidal Carbon Dioxide (EtCO2) Measurement in Neonates.' },
  { n: 20, text: 'Capnography waveforms: basic interpretation in neonatal intensive care. Front Pediatr. 2024.' },
  { n: 21, text: 'Pediatricians and Emergency Physicians - Capnography. capnography.com.' },
  { n: 22, text: 'imtmedical ag. bellavista Ventilator User Manual, G6, 1000/1000e, Neo. 2019 (rev. 2020-03).' },
];
