import { Wind } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'vent-01',
  category: 'Ventilator Mekanik — Panduan Lengkap',
  title: 'Bab 1 — Pendahuluan & Konsep Dasar Ventilasi Mekanik',
  shortTitle: 'Bab 1: Konsep Dasar',
  teaser: 'Lung-protective ventilation, VILI, compliance, resistance, time constant.',
  badge: 'Materi NICU/PICU · MD Kit & ResNeo Helper',
  icon: Wind,
  accent: 'indigo',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'van Kaam AH, Bearer CF, Molloy EJ. Modes and strategies for providing conventional mechanical ventilation in neonates. Pediatr Res. 2021;90:957–962. doi:10.1038/s41390-019-0704-1' },
  { n: 2, text: 'Chakkarapani AA, et al. Basic neonatal and paediatric mechanical ventilation. International Journal of Pediatrics and Adolescent Medicine. 2020;7:15-20.' },
  { n: 3, text: 'Neonatal Respiratory Physiology. Mind The Bleep.', link: 'https://mindthebleep.com/neonatal-respiratory-physiology/' },
  { n: 4, text: 'Neonatal respiratory physiology. Deranged Physiology.', link: 'https://derangedphysiology.com/main/cicm-primary-exam/respiratory-system/Chapter-926/neonatal-respiratory-physiology' },
  { n: 5, text: 'Trachsel D, et al. Developmental respiratory physiology. Pediatric Anesthesia. 2022;32(1). doi:10.1111/pan.14362' },
  { n: 6, text: 'van Kaam AH, Rimensberger PC. Lung-protective ventilation strategies in neonatology: what do we know—what do we need to know? Crit Care Med. 2007;35:925-31.' },
];
