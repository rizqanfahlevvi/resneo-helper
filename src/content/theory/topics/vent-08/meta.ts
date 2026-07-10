import { Activity } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'vent-08',
  category: 'Ventilator Mekanik — Panduan Lengkap',
  title: 'Bab 8 — Monitoring Selama Ventilasi',
  shortTitle: 'Bab 8: Monitoring',
  teaser: 'OI/OSI, kapnografi, SpO2, waveform, compliance/resistance, & alarm.',
  badge: 'Materi NICU/PICU · contoh: Bellavista G6/1000/1000e',
  icon: Activity,
  accent: 'rose',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Emeriaud G, dkk. Executive Summary of the Second International Guidelines for the Diagnosis and Management of Pediatric Acute Respiratory Distress Syndrome (PALICC-2). Pediatr Crit Care Med. 2023.' },
  { n: 2, text: 'Pediatric Acute Respiratory Distress Syndrome Updates in the Light of the PALICC-2 Guidelines. PMC. 2025.' },
  { n: 3, text: 'Capnography waveforms: basic interpretation in neonatal intensive care. Front Pediatr. 2024.' },
  { n: 4, text: 'Mainstream end-tidal carbon dioxide monitoring in ventilated neonates. PubMed.' },
  { n: 5, text: 'LearnPICU. ARDS/ALI.' },
  { n: 6, text: 'Patient-ventilator asynchrony. PMC.' },
  { n: 7, text: 'Patient-ventilator asynchronies: types, outcomes and nursing detection skills. PMC. 2019.' },
  { n: 8, text: 'ICU Ventilator Alarms Guide: Troubleshooting Common Alerts. Noccarc. 2025.' },
  { n: 9, text: 'Your First Shift in the Unit: Demystifying Ventilator Alarms. EMRA.' },
  { n: 10, text: 'Ventilator Alarms: Types, Causes, and Troubleshooting. Respiratory Therapy Zone. 2026.' },
  { n: 11, text: 'Alarm Fatigue in Adult ICU. Respiratory Therapy. 2024.' },
  { n: 12, text: 'imtmedical ag. bellavista Ventilator User Manual, G6, 1000/1000e, Neo. 2019 (rev. 2020-03) — Bagian 9 "During ventilation".' },
];
