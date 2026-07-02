import { useEffect, useMemo, useRef, useState } from 'react';
import {
  collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc, Timestamp,
} from 'firebase/firestore';
import {
  ArrowLeft, Search, RefreshCw, Download, Upload, Pencil, Trash2, X,
  ShieldAlert, Loader2, Users,
} from 'lucide-react';
import { db } from '../lib/firebase';
import { useAuth } from './useAuth';

interface AdminPageProps {
  onBack: () => void;
}

interface AdminUserRow {
  id: string;
  uid: string;
  email: string;
  username: string;
  namaLengkap?: string;
  role: string;
  subscriptionStatus: string;
  verificationStatus?: string;
  isAdmin?: boolean;
  subscriptionExpiredAt?: Timestamp | null;
  createdAt?: Timestamp | null;
}

type FilterKey = 'all' | 'active' | 'trial' | 'inactive';

function fmtDate(ts?: Timestamp | null): string {
  if (!ts) return '—';
  try {
    return ts.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '—';
  }
}

export default function AdminPage({ onBack }: AdminPageProps) {
  const { isAdmin, user } = useAuth();
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');
  const [editUser, setEditUser] = useState<AdminUserRow | null>(null);
  const [deleteUser, setDeleteUser] = useState<AdminUserRow | null>(null);
  const [importConfirmStep, setImportConfirmStep] = useState(0);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() } as AdminUserRow)));
    } catch (err) {
      console.error('Gagal memuat data pengguna:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  const filteredUsers = useMemo(() => {
    let list = users;
    if (filter !== 'all') {
      list = list.filter(u => (u.subscriptionStatus || 'inactive').toLowerCase() === filter);
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(u =>
        (u.namaLengkap || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q) ||
        (u.username || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [users, filter, searchQuery]);

  const handleSaveEdit = async (updated: Partial<AdminUserRow>) => {
    if (!editUser) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', editUser.id), updated);
      setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...updated } : u));
      setEditUser(null);
    } catch (err) {
      console.error('Gagal menyimpan perubahan:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteUser) return;
    setSaving(true);
    try {
      await deleteDoc(doc(db, 'users', deleteUser.id));
      setUsers(prev => prev.filter(u => u.id !== deleteUser.id));
      setDeleteUser(null);
    } catch (err) {
      console.error('Gagal menghapus pengguna:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const dateStr = new Date().toISOString().slice(0, 10);
    const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resneo-users-backup-${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (file: File) => {
    setImportFile(file);
    setImportConfirmStep(1);
  };

  const confirmImport = async () => {
    if (!importFile) return;
    setSaving(true);
    try {
      const text = await importFile.text();
      const data = JSON.parse(text) as AdminUserRow[];
      for (const u of data) {
        if (!u.id) continue;
        const { id, ...rest } = u;
        await updateDoc(doc(db, 'users', id), rest as any).catch(() => {});
      }
      await fetchUsers();
    } catch (err) {
      console.error('Gagal mengimpor data:', err);
    } finally {
      setSaving(false);
      setImportConfirmStep(0);
      setImportFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B132B] p-4">
        <div className="text-center">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Akses Ditolak</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Halaman ini hanya untuk administrator.</p>
          <button onClick={onBack} className="px-4 py-2 bg-indigo-500 text-white rounded-xl font-bold text-sm">
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B132B] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-[#0B132B]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-900 p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-base font-black flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" /> Admin Panel — Pengguna
            </h1>
            <p className="text-xs text-slate-400">{users.length} pengguna terdaftar · masuk sebagai {user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchUsers} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" title="Refresh">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={handleExport} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" title="Export JSON">
            <Download className="w-4 h-4" />
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" title="Import JSON">
            <Upload className="w-4 h-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleImportFile(f); }}
          />
        </div>
      </div>

      <div className="p-4 max-w-6xl mx-auto space-y-4">
        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari nama, email, atau username..."
              className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex gap-2">
            {([
              { key: 'all', label: 'Semua' },
              { key: 'active', label: 'Aktif' },
              { key: 'trial', label: 'Trial' },
              { key: 'inactive', label: 'Tidak Aktif' },
            ] as { key: FilterKey; label: string }[]).map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  filter === f.key
                    ? 'bg-indigo-500 text-white border-indigo-400'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="py-16 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-400">Tidak ada pengguna ditemukan.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <th className="text-left p-3">Nama</th>
                    <th className="text-left p-3">Email / Username</th>
                    <th className="text-left p-3">Role</th>
                    <th className="text-left p-3">Langganan</th>
                    <th className="text-left p-3">Berlaku s.d.</th>
                    <th className="text-right p-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="p-3 font-bold">{u.namaLengkap || '—'}</td>
                      <td className="p-3">
                        <div className="text-slate-700 dark:text-slate-300">{u.email}</div>
                        <div className="text-slate-400">@{u.username}</div>
                      </td>
                      <td className="p-3 capitalize">{u.role}</td>
                      <td className="p-3 capitalize">{u.subscriptionStatus}</td>
                      <td className="p-3">{fmtDate(u.subscriptionExpiredAt)}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => setEditUser(u)} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          {!u.isAdmin && (
                            <button onClick={() => setDeleteUser(u)} className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/50">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <EditUserModal
          userRow={editUser}
          saving={saving}
          onCancel={() => setEditUser(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* Delete confirm modal */}
      {deleteUser && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={() => setDeleteUser(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Hapus Pengguna?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              Data Firestore <span className="font-bold">{deleteUser.email}</span> akan dihapus. Akun Firebase Auth tidak terpengaruh.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteUser(null)} className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm">Batal</button>
              <button onClick={handleDelete} disabled={saving} className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm disabled:opacity-60">
                {saving ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import confirm modal — 2 steps */}
      {importConfirmStep > 0 && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-sm p-5">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">
              {importConfirmStep === 1 ? 'Import Data Pengguna?' : 'Konfirmasi Akhir'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              {importConfirmStep === 1
                ? `File "${importFile?.name}" akan menimpa data pengguna yang cocok. Lanjutkan?`
                : 'Tindakan ini akan menimpa data secara permanen. Anda yakin?'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => { setImportConfirmStep(0); setImportFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm"
              >
                Batal
              </button>
              <button
                onClick={() => importConfirmStep === 1 ? setImportConfirmStep(2) : confirmImport()}
                disabled={saving}
                className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm disabled:opacity-60"
              >
                {saving ? 'Memproses...' : importConfirmStep === 1 ? 'Lanjut' : 'Ya, Import'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EditUserModal({
  userRow, saving, onCancel, onSave,
}: {
  userRow: AdminUserRow;
  saving: boolean;
  onCancel: () => void;
  onSave: (data: Partial<AdminUserRow>) => void;
}) {
  const [namaLengkap, setNamaLengkap] = useState(userRow.namaLengkap || '');
  const [email, setEmail] = useState(userRow.email || '');
  const [role, setRole] = useState(userRow.role || 'pending');
  const [subscriptionStatus, setSubscriptionStatus] = useState(userRow.subscriptionStatus || 'inactive');
  const [verificationStatus, setVerificationStatus] = useState(userRow.verificationStatus || 'unverified');
  const [expiredAt, setExpiredAt] = useState(
    userRow.subscriptionExpiredAt ? userRow.subscriptionExpiredAt.toDate().toISOString().slice(0, 10) : ''
  );
  const [confirmSave, setConfirmSave] = useState(false);

  const buildPayload = (): Partial<AdminUserRow> => ({
    namaLengkap, email, role, subscriptionStatus, verificationStatus,
    subscriptionExpiredAt: expiredAt ? (Timestamp.fromDate(new Date(expiredAt)) as any) : null,
  });

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={onCancel}>
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white">Edit Pengguna</h3>
          <button onClick={onCancel}><X className="w-4 h-4 text-slate-400" /></button>
        </div>
        <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
          <Field label="Nama Lengkap" value={namaLengkap} onChange={setNamaLengkap} />
          <Field label="Email" value={email} onChange={setEmail} type="email" />
          <SelectField label="Role" value={role} onChange={setRole} options={['pending', 'doctor', 'resident', 'specialist', 'admin']} />
          <SelectField label="Status Langganan" value={subscriptionStatus} onChange={setSubscriptionStatus} options={['inactive', 'trial', 'active', 'expired']} />
          <SelectField label="Status Verifikasi" value={verificationStatus} onChange={setVerificationStatus} options={['unverified', 'verified']} />
          <Field label="Berlaku s.d." value={expiredAt} onChange={setExpiredAt} type="date" />
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
          {confirmSave ? (
            <>
              <button onClick={() => setConfirmSave(false)} className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm">Batal</button>
              <button onClick={() => onSave(buildPayload())} disabled={saving} className="flex-1 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm disabled:opacity-60">
                {saving ? 'Menyimpan...' : 'Konfirmasi Simpan'}
              </button>
            </>
          ) : (
            <>
              <button onClick={onCancel} className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm">Batal</button>
              <button onClick={() => setConfirmSave(true)} className="flex-1 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm">Simpan</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5 tracking-wider">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5 tracking-wider">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 capitalize"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
