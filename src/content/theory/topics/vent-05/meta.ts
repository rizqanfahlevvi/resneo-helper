import { Settings } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'vent-05',
  category: 'Ventilator Mekanik — Panduan Lengkap',
  title: 'Bab 5 — Ventilator Secara Umum: Komponen & Cara Kerja',
  shortTitle: 'Bab 5: Komponen & Cara Kerja',
  teaser: 'Trigger-Limit-Cycle, variabel kontrol, & waveform dasar.',
  badge: 'Materi NICU/PICU · contoh: Bellavista G6/1000/1000e',
  icon: Settings,
  accent: 'sky',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Understanding Ventilator Basics and Ventilator Waveforms. Respiratory Therapy. 2025.' },
  { n: 2, text: 'Phase variables: triggering, limits, cycling and PEEP. Deranged Physiology.' },
  { n: 3, text: 'Limit (target) variables in mechanical ventilation. Deranged Physiology.' },
  { n: 4, text: 'Mechanical Ventilation - Phase Variables & Trigger, Limit and Cycle series. Critical Care Practitioner. 2021.' },
  { n: 5, text: 'Pressure versus volume controlled modes in invasive mechanical ventilation. Medicina Intensiva. 2013.' },
  { n: 6, text: '2.4 Phase Variables: Control vs. Spontaneously Initiated Breaths & 5.1/5.5 Control Modes. Breathe Easy: RT Student Resource, eCampusOntario.' },
  { n: 7, text: "Control Variables in Modes of Ventilation (Tobin's Principles and Practice of Mechanical Ventilation)." },
  { n: 8, text: 'imtmedical ag. bellavista Ventilator User Manual, G6, 1000/1000e, Neo. 2019 (rev. 2020-03).' },
];
