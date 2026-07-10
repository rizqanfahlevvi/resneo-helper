import { Waves } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'stable',
  category: 'Pasca-Resusitasi & Stabilisasi',
  title: 'Program S.T.A.B.L.E',
  shortTitle: 'S.T.A.B.L.E',
  teaser: 'Mnemonic stabilisasi pra-rujukan/transport NICU.',
  badge: 'STABLE Program 6th Ed.',
  icon: Waves,
  accent: 'cyan',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Karlsen K. The S.T.A.B.L.E. Program: Post-Resuscitation/Pre-Transport Stabilization Care, 6th Edition. 2013.' },
];
