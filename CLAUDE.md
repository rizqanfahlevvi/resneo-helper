# ResNeo Helper — Panduan untuk Claude

PWA pendukung keputusan bedside untuk dokter/perawat NICU/ruang bersalin Indonesia — kalkulator dosis/parameter, skoring klinis, interpretasi lab/AGD, dan panduan resusitasi neonatus (NRP). Semua teks UI Bahasa Indonesia.

Bagian dari ekosistem "Helper" milik pemilik proyek (ACLS Helper, ICU Helper, PICNIC Helper, ResNeo Helper) — repo terpisah, kadang fitur/pola disamakan lintas app. Repo lain tidak bisa dibaca langsung — kalau diminta menyamakan/porting fitur, minta kode sumber lengkap disertakan di prompt.

## Perintah

- `npm run dev` — server dev (Vite, port 3000)
- `npm run lint` — alias untuk `tsc --noEmit` (repo ini tidak pakai ESLint terpisah)
- `npm test` — Vitest (`vitest run`)
- `npm run build` — build produksi (Vite + vite-plugin-pwa)

**Gerbang mutu (WAJIB sebelum commit):** `npx tsc --noEmit && npx vitest run && npm run build` harus lolos bersih. Ini pola yang konsisten dipakai sepanjang riwayat commit di repo ini — jangan commit kalau salah satu gagal.

## Stack

React 19 · Vite 6 · Tailwind CSS v4 (via `@tailwindcss/vite`) · Firebase 12 (Auth + Firestore, client-only — tidak ada server Express/API route seperti app "Helper" lain) · Zustand 5 (dua store: `useStore` di `src/store.ts` untuk data pasien/sesi, `useSettingsStore` di `src/settings/useSettingsStore.ts` untuk preferensi tampilan) · TypeScript · Vitest.

## Struktur inti

- `src/clinical/*.ts` — **satu sumber kebenaran** untuk semua rumus klinis (murni, di-test dengan Vitest): `doses.ts` (dosis darurat, ETT, kateter umbilikal, GIR, gentamisin, cairan harian), `bilirubin.ts` (ambang fototerapi/transfusi tukar), `inotropes.ts` (konversi dosis↔laju, Rule of Six), `ventilator.ts` (setting ventilator per skenario×GA), `apgar.ts`, `pma.ts` (usia pasca-menstruasi/koreksi). **Jangan menulis ulang rumus dosis/konversi di komponen** — panggil fungsi dari sini. Kalau menemukan rumus yang sama dihitung inline di beberapa tempat (pola yang berulang kali ditemukan di audit), satukan ke `clinical/*.ts`.
- `src/components/tabs/` — satu file per tab besar: `TabCalculators.tsx` (15+ kalkulator dosis/volume/laju), `TabScores.tsx` (APGAR, Downe, Thomson, Ballard, Silverman-Anderson, FLACC, NIPS, + DDx Engine otomatis), `TabEmergency.tsx` (~2700 baris, layar resusitasi/code langsung — file paling berisiko tinggi di repo ini, sering ada duplikasi UI dari `clinical/doses.ts` di beberapa panel berbeda: cek semuanya kalau mengubah dosis darurat), `TabHome.tsx`, `TabTheory.tsx`, `TabReferences.tsx`, `TabHistory.tsx`, `TabAdvanced.tsx`, `TabSettings.tsx`, `TabDashboard.tsx`.
- `src/content/theory/topics/<topik>/{meta.ts,Body.tsx}` — materi teori per topik, dengan `refs: TheoryReference[]` bernomor dan komponen `<Cite n={..} />` di body untuk sitasi.
- `src/components/CalcSteps.tsx` — **WAJIB dipakai** untuk setiap fitur yang menghasilkan angka (dosis, volume, laju, skor). Ekspor dua hal:
  - `CalcSteps` — daftar langkah `{ label, formula, substitution, note? }`; `substitution` HARUS memuat angka pasien yang sudah disubstitusi (mis. `"0,2 × 1,5 = 0,3 mL"`), bukan sekadar rumus generik. Untuk skoring: satu langkah per parameter (pilihan → poin) lalu satu langkah total.
  - `CalcDisclaimer` — disclaimer standar; teks default: *"Alat bantu edukasi/referensi cepat — bukan pengganti penilaian klinis atau keputusan DPJP. Verifikasi ulang sebelum tindakan."* Pakai `text` prop untuk varian khusus (mis. DDx Engine, setting ventilator). **Setiap fitur penghasil dosis/volume/laju/DDx WAJIB punya ini.**
- `src/components/ClinicalTheoryAccordion.tsx` — accordion teori + referensi di bawah tiap kalkulator/skor. Skor tanpa ini (riwayat: FLACC & NIPS pernah tidak punya sama sekali) dianggap tidak lengkap.

## Sistem font & skala (App.tsx + index.css)

`useSettingsStore` menyimpan `fontScale` (0.5–2.0) dan `fontWeight` (offset -300..400). `App.tsx` men-set `--font-scale` dan `--fw-light`…`--fw-black` di root; `index.css` men-set `:root { font-size: calc(78% * var(--font-scale)) }`, jadi kelas Tailwind berbasis **rem** (`text-xs`, `text-sm`, dst.) otomatis ikut skala.

⚠️ **Beda dengan ICU Helper**: repo ini **tidak** punya sistem override per-kelas untuk `text-[Npx]` arbitrary di `index.css`. Ada 270+ pemakaian `text-[Npx]` di codebase (nilai px eksplisit, bukan rem) — nilai-nilai ini **tidak ikut skala font** karena px tidak relatif terhadap root font-size. Ini gap yang belum diperbaiki, bukan sesuatu yang "sudah benar secara default". Kalau menambah teks baru: **utamakan kelas Tailwind standar** (`text-xs`/`text-sm`/dst, yang otomatis rem & ikut skala) daripada `text-[Npx]` baru. Kalau harus pakai px arbitrary, sadari itu tidak akan berubah saat pengguna menggeser slider Ukuran Font — jangan diam-diam asumsikan sudah benar.

## Warna & tema

- Tailwind v4 dengan token warna kustom di `index.css` (light/dark via `.dark` class + `@media (prefers-color-scheme)`), termasuk skala `--color-slate-*` yang di-override per tema (lihat `index.css` baris ~57–94).
- Jangan hardcode hex/rgb di komponen — pakai kelas Tailwind (`text-slate-600 dark:text-slate-400`, dst.) yang sudah dipetakan ke token tema.
- Dukung light/dark di setiap elemen baru (`dark:` variant).

## State (Zustand)

- **`useStore`** (`src/store.ts`, persist) — `patientIdentity` (termasuk `jenisKelamin: string`, bukan tipe union — validasi/konversi manual kalau dibutuhkan tipe ketat), `anthropometry`, `gestationalAge`, `birthWeight`, `apgarEvals`, `patients`/`activePatientId` (multi-pasien), `sessionHistory`, `drugLog`, `clinicalLog`, skor Downe/Thomson/Silverman, `favoriteTheory`, `theoryDeepLinkId` (deep-link sekali-pakai dari pencarian global ke teori).
- **`useSettingsStore`** (`src/settings/useSettingsStore.ts`, persist terpisah `resneo-helper-settings`) — `fontFamily`, `fontScale`, `fontWeight`, `themeMode`, `bwMode` (mode hitam-putih), `readingMode` (kontras tinggi), `vibrationEnabled`.

## Pola standar saat menambah/mengubah kalkulator atau skor

1. Rumus baru/diubah → taruh di `src/clinical/*.ts` (fungsi murni), bukan inline di komponen tab.
2. Ambil BB/GA dari props (`effectiveBW`, `gestationalAge`) yang di-autofill dari `useStore`, bukan input manual duplikat kalau datanya sudah ada di store.
3. Tambahkan `<CalcSteps steps={[...]} />` dengan substitusi angka pasien nyata untuk setiap hasil angka.
4. Tambahkan `<CalcDisclaimer />` untuk fitur penghasil dosis/volume/laju/DDx.
5. Kalau ada teori pendukung, tambahkan/perbarui `<ClinicalTheoryAccordion title=... content=... references={[...]} />`.
6. Jalankan gerbang mutu, lalu commit dengan pesan yang mencatat: rumus lama (kalau ada bug), rumus benar, referensi, dan contoh hitung manual.

## Aturan klinis (KESELAMATAN)

- **Jangan mengarang** nilai/ambang/faktor/konsentrasi klinis. Verifikasi ke referensi reliable (NRP 8th Ed/AAP-AHA > guideline resmi lain seperti KDIGO/ESPGHAN > NEJM/JAMA/Lancet > UpToDate) dan sebutkan sumbernya di commit.
- **Verifikasi rumus dengan hitung manual** + edge case (bagi nol, satuan, klamp min/maks, nilai ekstrem) sebelum menganggap benar. Riwayat bug nyata yang ditemukan lewat pola ini: konsentrasi Curosurf salah (dipakai 120 mg/mL padahal 120 mg adalah isi vial, konsentrasi asli 80 mg/mL — underdosing ~33%), cabang dosis gentamisin mati (`gentamicinByGA`) yang memberi dosis berbeda dari fungsi yang benar-benar dipakai, dan panel NaHCO3 di `TabEmergency.tsx` yang menampilkan angka tunggal padahal seharusnya rentang.
- **Jangan diam-diam mengubah angka dosis/skor** yang dilihat dokter. Kalau ada >1 rumus sah dengan hasil berbeda bermakna → laporkan & tanya, atau tampilkan sebagai rentang.
- **Waspada khusus laju per-jam vs per-24-jam** dan arah koreksi (naik/turun) — rawan salah label dan berbahaya secara klinis.
- **Duplikasi rumus adalah risiko keselamatan**, bukan cuma masalah kerapian kode — `TabEmergency.tsx` sempat punya 3 salinan independen dari rumus dosis darurat yang sama di panel berbeda (mobile/desktop/FAB), yang berisiko drift diam-diam. Kalau menambah/mengubah dosis di sana, cek SEMUA panel yang menampilkan angka itu, bukan cuma satu.
- Rasio kompresi:ventilasi **3:1** (NRP) yang dipakai di seluruh app hanya berlaku untuk periode *newly born* (resusitasi transisi di kamar bersalin/ruang tindakan segera pasca-lahir) — bukan untuk neonatus yang sudah stabil lalu mengalami cardiac arrest di kemudian hari (pakai PALS infant 15:2/30:2). Konteks aplikasi ini memang newly-born/NRP, jadi 3:1 di alur kerja sudah tepat — jangan diganti tanpa memastikan konteksnya benar-benar berubah.

## Testing

Test di `src/clinical/*.test.ts` (Vitest, `vitest run`) — cakupan: `doses.test.ts`, `bilirubin.test.ts`, `inotropes.test.ts`, `pma.test.ts`, `ventilator.test.ts`. Kalau menambah/memperbaiki rumus di `clinical/*.ts`, tambahkan/perbarui test di file yang sesuai sebagai bukti (input diketahui → hasil diketahui), terutama untuk perbaikan bug klinis. Komponen UI di `components/tabs/` belum punya test — belum ada pola untuk itu di repo ini.

## Alur kerja & git

- Kerjakan per fase kecil (per kalkulator/kelompok kalkulator); jalankan gerbang mutu lalu commit deskriptif tiap fase — jangan menumpuk perubahan besar tanpa verifikasi antar-langkah.
- Push langsung ke `main` (pola yang dipakai konsisten di riwayat commit repo ini) kecuali diminta pakai branch terpisah.
- Untuk perbaikan rumus, catat di pesan commit: rumus lama, rumus benar, referensi, dan contoh hitung manual sebagai bukti.

## Keamanan (konteks)

- Firebase config di `src/lib/firebase.ts` publik & aman by design — keamanan sesungguhnya ada di `firestore.rules` (di-review manual, bukan lewat CI).
- `firestore.rules`: field `role`, `subscriptionStatus`, `isAdmin`, `verificationStatus` di `users/{uid}` sengaja TIDAK termasuk field yang boleh diubah pengguna biasa (`onlySelfServiceFields`) — hanya admin yang bisa mengubahnya. Jangan menambah field otorisasi baru tanpa mendaftarkannya (atau sengaja mengecualikannya) di rules ini.
- Tidak ada server/API route di repo ini — semua akses data lewat Firebase SDK client-side + Firestore Security Rules.

## Tidak ada CI

Tidak ada GitHub Actions di repo ini — gerbang mutu (`tsc`/`vitest`/`build`) hanya dijalankan manual sebelum commit. Jangan asumsikan ada pipeline otomatis yang memblokir push yang salah.
