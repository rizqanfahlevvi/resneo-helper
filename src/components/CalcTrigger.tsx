import { Calculator, RotateCcw } from 'lucide-react';

/**
 * Tombol konfirmasi eksplisit untuk kalkulator/skor — hasil baru tampil
 * setelah pengguna menekan "Hitung"/"Simpan Skor", menandai data sudah
 * final (bukan realtime saat mengetik). Reset otomatis ke belum-terkonfirmasi
 * saat input berubah lagi setelah dihitung (lewat prop `dirty`).
 */
export default function CalcTrigger({
  disabled,
  confirmed,
  dirty,
  onConfirm,
  label = 'Hitung',
  confirmedLabel = 'Sudah Dihitung — Ubah untuk Hitung Ulang',
}: {
  disabled: boolean;
  confirmed: boolean;
  dirty: boolean;
  onConfirm: () => void;
  label?: string;
  confirmedLabel?: string;
}) {
  if (confirmed && !dirty) {
    return (
      <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
        <Calculator className="w-3.5 h-3.5" /> {confirmedLabel}
      </div>
    );
  }
  return (
    <button
      onClick={onConfirm}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors"
    >
      {confirmed && dirty ? <RotateCcw className="w-4 h-4" /> : <Calculator className="w-4 h-4" />}
      {confirmed && dirty ? 'Hitung Ulang' : label}
    </button>
  );
}
