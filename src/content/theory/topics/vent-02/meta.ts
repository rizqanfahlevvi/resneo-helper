import { HeartPulse } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'vent-02',
  category: 'Ventilator Mekanik — Panduan Lengkap',
  title: 'Bab 2 — Airway, Breathing, Circulation dalam Konteks Ventilasi',
  shortTitle: 'Bab 2: ABC & Ventilasi',
  teaser: 'Anatomi jalan napas anak, kerja napas, & interaksi kardiopulmoner PEEP.',
  badge: 'Materi NICU/PICU · MD Kit & ResNeo Helper',
  icon: HeartPulse,
  accent: 'rose',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Adewale L. Anatomy and assessment of the pediatric airway. Pediatr Anesth. 2009;19:1-8. doi:10.1111/j.1460-9592.2009.03012.x' },
  { n: 2, text: 'The neonatal airway. ScienceDirect (chapter).' },
  { n: 3, text: 'Pediatric Airway Pathology. PMC.', link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7288604/' },
  { n: 4, text: 'Pediatric Airway Anatomy. OpenAnesthesia.' },
  { n: 5, text: 'Bronicki RA, Anas NG. Cardiopulmonary interaction. Pediatr Crit Care Med. 2009;10(3):313-22.' },
  { n: 6, text: 'Alviar CL, et al. Positive Pressure Ventilation in the Cardiac Intensive Care Unit. J Am Coll Cardiol. 2018.' },
  { n: 7, text: 'Cardiopulmonary interactions in left heart failure. Front Physiol. 2023.' },
  { n: 8, text: 'Luecke T, Pelosi P. Clinical review: Positive end-expiratory pressure and cardiac output. Crit Care. PMC.' },
  { n: 9, text: 'Heart-lung interactions during mechanical ventilation: the basics. PMC.' },
  { n: 10, text: 'LearnPICU. Cardiopulmonary Interactions.', link: 'https://www.learnpicu.com/cardiology/cardiopulmonary-interactions' },
];
