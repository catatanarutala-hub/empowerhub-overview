import React, { useState } from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  Users, 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Sparkles, 
  AlertCircle,
  Eye,
  MessageSquare,
  Clock,
  Layers,
  FileCheck
} from 'lucide-react';
import { Product, MentoredCourse } from '../types';

interface AdminDashboardProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onApproveCourse: (productId: string) => void;
  onRequestRevision: (productId: string, feedback: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onOpenDetail,
  onApproveCourse,
  onRequestRevision,
}) => {
  const [activeTab, setActiveTab] = useState<'review' | 'overview' | 'affiliate'>('review');
  const [revisionFeedback, setRevisionFeedback] = useState<Record<string, string>>({});
  const [activeRevisionId, setActiveRevisionId] = useState<string | null>(null);

  // Filter products by status
  const pendingCourses = products.filter(p => p.status === 'pending');
  const publishedCourses = products.filter(p => p.status !== 'pending' && p.status !== 'revision');
  const revisionCourses = products.filter(p => p.status === 'revision');

  const handleSendRevision = (productId: string) => {
    const feedback = revisionFeedback[productId] || 'Mohon lengkapi silabus modul 2 dan tambahkan pratinjau lembar kerja terapan.';
    onRequestRevision(productId, feedback);
    setActiveRevisionId(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Admin Control Banner with "Admin Review" Badge */}
      <div className="rounded-3xl border border-brand-500 dark:border-ink-700 bg-brand-500 text-ink-900 p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Badge Khusus: Admin Review */}
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-brand-400 text-ink-900 shadow-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-ink-700" />
                <span>Admin Review Console</span>
              </span>
              <span className="text-xs text-ink-800">· EmpowerHub Governance</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black">
              Pusat Verifikasi Kurasi &amp; Kontrol Mutu
            </h1>

            <p className="text-xs sm:text-sm text-ink-800 max-w-xl leading-relaxed">
              Tinjau draf materi yang diajukan para mentor, verifikasi kesesuaian kurikulum tanpa istilah teknis berbelit, dan setujui untuk tayang di katalog publik.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-2xl bg-ink-900 border border-ink-700 text-center">
              <span className="text-[10px] text-ink-200 uppercase tracking-wider block font-semibold">
                Menunggu Review
              </span>
              <span className="font-heading text-2xl font-black text-brand-500">
                {pendingCourses.length} Materi
              </span>
            </div>
          </div>
        </div>

        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-ink-300/30 blur-2xl pointer-events-none" />
      </div>

      {/* 2. Admin Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
          <div className="flex items-center justify-between text-ink-400 dark:text-ink-300">
            <span className="text-xs font-semibold">Antrean Kurasi</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-heading text-2xl font-black text-amber-700 dark:text-amber-400 mt-2">
            {pendingCourses.length}
          </p>
          <span className="text-[10px] text-ink-400 dark:text-ink-300">Perlu Tindakan</span>
        </div>

        <div className="p-4 rounded-2xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
          <div className="flex items-center justify-between text-ink-400 dark:text-ink-300">
            <span className="text-xs font-semibold">Materi Tayang Live</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="font-heading text-2xl font-black text-ink-900 dark:text-white mt-2">
            {publishedCourses.length}
          </p>
          <span className="text-[10px] text-emerald-700 font-semibold">Di Katalog Publik</span>
        </div>

        <div className="p-4 rounded-2xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
          <div className="flex items-center justify-between text-ink-400 dark:text-ink-300">
            <span className="text-xs font-semibold">Gross Volume (GMV)</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="font-heading text-xl sm:text-2xl font-black text-ink-700 dark:text-brand-500 mt-2">
            Rp 245,8 Jt
          </p>
          <span className="text-[10px] text-ink-400 dark:text-ink-300">Transaksional</span>
        </div>

        <div className="p-4 rounded-2xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
          <div className="flex items-center justify-between text-ink-400 dark:text-ink-300">
            <span className="text-xs font-semibold">Rujukan Pasar Daya</span>
            <Sparkles className="w-4 h-4 text-brand-500" />
          </div>
          <p className="font-heading text-2xl font-black text-ink-900 dark:text-white mt-2">
            1,420
          </p>
          <span className="text-[10px] text-ink-400 dark:text-ink-300">Klik Mitra Keluar</span>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-surface-100 dark:bg-ink-800 rounded-2xl border border-surface-300 dark:border-ink-700 w-fit">
        <button
          onClick={() => setActiveTab('review')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'review'
              ? 'bg-white dark:bg-brand-500 text-ink-900 dark:text-ink-900 shadow-xs'
              : 'text-ink-600 dark:text-ink-300'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>Draf Menunggu Verifikasi ({pendingCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-white dark:bg-brand-500 text-ink-900 dark:text-ink-900 shadow-xs'
              : 'text-ink-600 dark:text-ink-300'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          <span>Katalog Live ({publishedCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('affiliate')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'affiliate'
              ? 'bg-white dark:bg-brand-500 text-ink-900 dark:text-ink-900 shadow-xs'
              : 'text-ink-600 dark:text-ink-300'
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5 text-ink-700 dark:text-brand-500" />
          <span>Audit Mitra Pasar Daya</span>
        </button>
      </div>

      {/* TAB 1: DRAF MENUNGGU VERIFIKASI (ADMIN REVIEW MOCKUP) */}
      {activeTab === 'review' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-sm sm:text-base text-ink-900 dark:text-white">
              Antrean Draf Materi Baru dari Mentor
            </h3>
            <span className="text-xs text-ink-400 dark:text-ink-300">
              Setujui untuk langsung menayangkan di katalog publik
            </span>
          </div>

          {pendingCourses.length === 0 ? (
            <div className="p-8 text-center rounded-3xl border border-dashed border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
              <CheckCircle className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
              <p className="text-xs font-bold text-ink-800 dark:text-surface-300">
                Semua draf materi telah diverifikasi!
              </p>
              <p className="text-[11px] text-ink-400 dark:text-ink-300 mt-0.5">
                Tidak ada materi baru yang menunggu kurasi admin saat ini.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingCourses.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl border-2 border-amber-300 dark:border-amber-900/60 bg-white dark:bg-ink-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400 shrink-0"
                    />

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                          Menunggu Kurasi Admin
                        </span>
                        <span className="text-[10px] text-ink-400 dark:text-ink-300">
                          {item.category} · {item.typeLabel}
                        </span>
                      </div>

                      <h4 className="font-black text-base text-ink-900 dark:text-white break-words">
                        {item.title}
                      </h4>

                      <p className="text-xs text-ink-600 dark:text-ink-200 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-ink-400 dark:text-ink-300 pt-1">
                        <span>Mentor: <strong>{item.mentorName}</strong></span>
                        <span>·</span>
                        <span>Usulan Harga: <strong className="text-ink-700 dark:text-brand-500">{item.formattedPrice}</strong></span>
                        <span>·</span>
                        <span>Durasi: <strong>{item.durationOrSpecs}</strong></span>
                      </div>

                      {/* Revision Input Box if active */}
                      {activeRevisionId === item.id && (
                        <div className="pt-2 space-y-2">
                          <label className="text-[11px] font-bold text-ink-700 dark:text-ink-200 block">
                            Catatan Masukan untuk Mentor:
                          </label>
                          <textarea
                            value={revisionFeedback[item.id] || ''}
                            onChange={(e) => setRevisionFeedback({ ...revisionFeedback, [item.id]: e.target.value })}
                            placeholder="Tuliskan bagian modul yang perlu diperjelas atau diperbaiki..."
                            className="w-full p-2.5 rounded-xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setActiveRevisionId(null)}
                              className="px-3 py-1 rounded-lg text-xs border border-surface-300 dark:border-ink-700"
                            >
                              Batal
                            </button>
                            <button
                              onClick={() => handleSendRevision(item.id)}
                              className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700"
                            >
                              Kirim Catatan Revisi
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions: [Setujui] atau [Minta Revisi] */}
                  <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
                    <button
                      onClick={() => onOpenDetail(item)}
                      className="px-3 py-2 rounded-xl border border-surface-300 dark:border-ink-700 text-ink-700 dark:text-ink-200 hover:bg-surface-100 dark:hover:bg-ink-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Pratinjau</span>
                    </button>

                    <button
                      onClick={() => setActiveRevisionId(activeRevisionId === item.id ? null : item.id)}
                      className="px-3.5 py-2 rounded-xl border border-rose-300 dark:border-rose-900/60 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Minta Revisi</span>
                    </button>

                    {/* Tombol [Setujui] */}
                    <button
                      onClick={() => onApproveCourse(item.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black flex items-center gap-1.5 shadow-md transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Setujui (Tayang)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: KATALOG LIVE */}
      {activeTab === 'overview' && (
        <div className="rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-surface-300 dark:border-ink-700 flex items-center justify-between">
            <h3 className="font-bold text-sm text-ink-900 dark:text-white">
              Daftar Materi Aktif Tayang ({publishedCourses.length})
            </h3>
            <span className="text-xs text-ink-400 dark:text-ink-300">Siap diakses peserta</span>
          </div>

          <div className="divide-y divide-surface-300 dark:divide-ink-700">
            {publishedCourses.map((p) => (
              <div key={p.id} className="p-4 flex items-center justify-between gap-4 text-xs hover:bg-surface-100 dark:hover:bg-ink-700 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={p.thumbnail} alt={p.title} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-ink-900 dark:text-white break-words">{p.title}</h4>
                    <p className="text-[10px] text-ink-400 dark:text-ink-300 truncate">{p.mentorName} · {p.category}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold text-ink-700 dark:text-brand-500">{p.formattedPrice}</span>
                  <span className="text-[10px] text-emerald-700 block font-semibold">● Tayang</span>
                </div>

                <button
                  onClick={() => onOpenDetail(p)}
                  className="px-3 py-1.5 rounded-xl border border-surface-300 dark:border-ink-700 font-semibold text-ink-700 dark:text-ink-200"
                >
                  Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AFILIASI PASAR DAYA AUDIT */}
      {activeTab === 'affiliate' && (
        <div className="p-6 rounded-3xl border-2 border-brand-400 bg-surface-100 dark:bg-ink-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-400 text-ink-900 px-2.5 py-0.5 rounded-md">
                Mitra Resmi Ekosistem
              </span>
              <h3 className="text-base font-bold text-ink-700 dark:text-brand-500 mt-1">
                Kemitraan Pasar Daya (pasardaya.vercel.app)
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-200 mt-1 max-w-xl">
                EmpowerHub bekerja sama dengan Pasar Daya secara transparan tanpa biaya perantara tersembunyi.
              </p>
            </div>

            <a
              href="https://pasardaya.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-900 text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <span>Kunjungi pasardaya.vercel.app</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-500" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-ink-900 border border-surface-300 dark:border-ink-700">
              <span className="text-[10px] text-ink-400 dark:text-ink-300 block font-semibold">Total Rujukan Keluar</span>
              <span className="font-heading text-lg font-black text-ink-900 dark:text-white">1,420 Klik</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-ink-900 border border-surface-300 dark:border-ink-700">
              <span className="text-[10px] text-ink-400 dark:text-ink-300 block font-semibold">Produk Mitra Terhubung</span>
              <span className="font-heading text-lg font-black text-ink-900 dark:text-white">Jurnal Konsisten Branding</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-ink-900 border border-surface-300 dark:border-ink-700">
              <span className="text-[10px] text-ink-400 dark:text-ink-300 block font-semibold">Integritas URL Target</span>
              <span className="font-heading text-lg font-black text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> 200 OK Terverifikasi
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
