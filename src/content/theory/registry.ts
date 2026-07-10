import { lazy } from 'react';
import { TheoryTopicEntry } from './types';

import { meta as goldenMeta, refs as goldenRefs } from './topics/golden/meta';
import { meta as transisiMeta, refs as transisiRefs } from './topics/transisi/meta';
import { meta as dccMeta, refs as dccRefs } from './topics/dcc/meta';
import { meta as oksigenMeta, refs as oksigenRefs } from './topics/oksigen/meta';
import { meta as mekoniumMeta, refs as mekoniumRefs } from './topics/mekonium/meta';
import { meta as intubasiMeta, refs as intubasiRefs } from './topics/intubasi/meta';
import { meta as mrsopaMeta, refs as mrsopaRefs } from './topics/mrsopa/meta';
import { meta as kompresiMeta, refs as kompresiRefs } from './topics/kompresi/meta';
import { meta as farmakoMeta, refs as farmakoRefs } from './topics/farmako/meta';
import { meta as prematurMeta, refs as prematurRefs } from './topics/prematur/meta';
import { meta as surfaktanMeta, refs as surfaktanRefs } from './topics/surfaktan/meta';
import { meta as kafeinMeta, refs as kafeinRefs } from './topics/kafein/meta';
import { meta as stableMeta, refs as stableRefs } from './topics/stable/meta';
import { meta as hipotermiaMeta, refs as hipotermiaRefs } from './topics/hipotermia/meta';
import { meta as hipoglikemiaMeta, refs as hipoglikemiaRefs } from './topics/hipoglikemia/meta';
import { meta as neuroproteksiMeta, refs as neuroproteksiRefs } from './topics/neuroproteksi/meta';

// Buku "Ventilator Mekanik — Panduan Lengkap" (materi NICU/PICU, 11 bab).
// Bab 1-4 sudah tersedia; Bab 5-11 menyusul dengan pola folder yang sama.
import { meta as vent01Meta, refs as vent01Refs } from './topics/vent-01/meta';
import { meta as vent02Meta, refs as vent02Refs } from './topics/vent-02/meta';
import { meta as vent03Meta, refs as vent03Refs } from './topics/vent-03/meta';
import { meta as vent04Meta, refs as vent04Refs } from './topics/vent-04/meta';

/**
 * Registry pusat semua topik teori. Setiap topik hanya mendaftarkan
 * metadata (ringan, dimuat langsung) + isi lengkap (Body) yang di-lazy-load
 * saat topik dibuka. Menambah topik baru = tambah 1 folder di topics/
 * (meta.ts + Body.tsx) lalu daftarkan di sini — tidak menyentuh file lain.
 */
export const TOPICS: TheoryTopicEntry[] = [
  { ...goldenMeta, refs: goldenRefs, Body: lazy(() => import('./topics/golden/Body')) },
  { ...transisiMeta, refs: transisiRefs, Body: lazy(() => import('./topics/transisi/Body')) },
  { ...dccMeta, refs: dccRefs, Body: lazy(() => import('./topics/dcc/Body')) },
  { ...oksigenMeta, refs: oksigenRefs, Body: lazy(() => import('./topics/oksigen/Body')) },
  { ...mekoniumMeta, refs: mekoniumRefs, Body: lazy(() => import('./topics/mekonium/Body')) },
  { ...intubasiMeta, refs: intubasiRefs, Body: lazy(() => import('./topics/intubasi/Body')) },
  { ...mrsopaMeta, refs: mrsopaRefs, Body: lazy(() => import('./topics/mrsopa/Body')) },
  { ...kompresiMeta, refs: kompresiRefs, Body: lazy(() => import('./topics/kompresi/Body')) },
  { ...farmakoMeta, refs: farmakoRefs, Body: lazy(() => import('./topics/farmako/Body')) },
  { ...prematurMeta, refs: prematurRefs, Body: lazy(() => import('./topics/prematur/Body')) },
  { ...surfaktanMeta, refs: surfaktanRefs, Body: lazy(() => import('./topics/surfaktan/Body')) },
  { ...kafeinMeta, refs: kafeinRefs, Body: lazy(() => import('./topics/kafein/Body')) },
  { ...stableMeta, refs: stableRefs, Body: lazy(() => import('./topics/stable/Body')) },
  { ...hipotermiaMeta, refs: hipotermiaRefs, Body: lazy(() => import('./topics/hipotermia/Body')) },
  { ...hipoglikemiaMeta, refs: hipoglikemiaRefs, Body: lazy(() => import('./topics/hipoglikemia/Body')) },
  { ...neuroproteksiMeta, refs: neuroproteksiRefs, Body: lazy(() => import('./topics/neuroproteksi/Body')) },

  { ...vent01Meta, refs: vent01Refs, Body: lazy(() => import('./topics/vent-01/Body')) },
  { ...vent02Meta, refs: vent02Refs, Body: lazy(() => import('./topics/vent-02/Body')) },
  { ...vent03Meta, refs: vent03Refs, Body: lazy(() => import('./topics/vent-03/Body')) },
  { ...vent04Meta, refs: vent04Refs, Body: lazy(() => import('./topics/vent-04/Body')) },
];

export const CATEGORY_ORDER = [
  'Fisiologi & Prinsip Dasar',
  'Jalan Napas & Ventilasi',
  'Sirkulasi, Obat & Kompresi',
  'Neonatus Prematur',
  'Pasca-Resusitasi & Stabilisasi',
  'Ventilator Mekanik — Panduan Lengkap',
];

export function getTopic(id: string): TheoryTopicEntry | undefined {
  return TOPICS.find((t) => t.id === id);
}

export function topicsByCategory(category: string): TheoryTopicEntry[] {
  return TOPICS.filter((t) => t.category === category);
}
