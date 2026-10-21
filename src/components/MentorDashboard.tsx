import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  DollarSign, 
  Star, 
  PlusCircle, 
  Layers, 
  TrendingUp, 
  Sparkles, 
  Edit3, 
  Eye, 
  CheckCircle,
  X,
  FilePlus
} from 'lucide-react';
import { Product, UserAccount, MentoredCourse } from '../types';

interface MentorDashboardProps {
  userAccount: UserAccount;
  products: Product[];
  onAddNewCourse: (newCourse: Partial<Product>) => void;
  onOpenDetail: (product: Product) => void;
}

export const MentorDashboard: React.FC<MentorDashboardProps> = ({
  userAccount,
  products,
  onAddNewCourse,
  onOpenDetail,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    category: 'Teknologi & Digital' as Product['category'],
    type: 'video' as Product['type'],
    price: 49000,
    durationOrSpecs: '1.5 Jam Video + Rangkuman',
  });

  const mentoredItems = userAccount.mentoredCourses.map((m) => {
    const product = products.find((p) => p.id === m.productId);
    return {
      stats: m,
      product: product!,
    };
  }).filter(item => item.product);

  const totalRevenue = mentoredItems.reduce((acc, curr) => acc + curr.stats.totalRevenue, 0);
  const totalStudents = mentoredItems.reduce((acc, curr) => acc + curr.stats.activeStudents, 0);
  const averageRating = mentoredItems.length > 0 
    ? (mentoredItems.reduce((acc, curr) => acc + curr.stats.averageRating, 0) / mentoredItems.length).toFixed(2)
    : '5.0';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    onAddNewCourse({
      title: formData.title,
      tagline: formData.tagline || 'Kuasai keterampilan bernilai tinggi bersama kurikulum terpadu.',
      description: formData.description || 'Kurikulum intensif yang dirancang langsung oleh mentor untuk hasil nyata.',
      category: formData.category,
      type: formData.type,
      price: Number(formData.price),
      durationOrSpecs: formData.durationOrSpecs,
    });

    setIsModalOpen(false);
    setFormData({
      title: '',
      tagline: '',
      description: '',
      category: 'Teknologi & Digital',
      type: 'video',
      price: 49000,
      durationOrSpecs: '1.5 Jam Video + Rangkuman',
    });
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Banner */}
      <div className="rounded-2xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 p-5 sm:p-7 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-brand-100 text-ink-700 dark:bg-ink-700 dark:text-brand-500">
                Studio Pengajar (Mentor)
              </span>
              <span className="text-xs text-ink-400 dark:text-ink-300">· {userAccount.name}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-ink-900 dark:text-surface-50">
              Pusat Manajemen Kelas & Kreator
            </h1>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200 mt-1 max-w-xl">
              Kelola kurikulum pengajaran Anda, pantau pertumbuhan peserta aktif, dan terus perluas dampak pemberdayaan ekonomi talenta.
            </p>
          </div>

          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 text-xs font-bold rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center gap-2 transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-brand-500" />
              <span>Publikasikan Kelas / Modul Baru</span>
            </button>
          </div>
        </div>

        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-brand-400/30 blur-2xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
          <div className="flex items-center justify-between text-ink-400 dark:text-ink-300">
            <span className="text-xs font-semibold">Total Siswa Aktif</span>
            <Users className="w-4 h-4 text-ink-700 dark:text-brand-500" />
          </div>
          <p className="font-heading text-2xl font-black text-ink-900 dark:text-surface-50 mt-2">
            {totalStudents.toLocaleString('id-ID')}
          </p>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-3 h-3" /> +14% bulan ini
          </span>
        </div>

        <div className="p-4 rounded-xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
          <div className="flex items-center justify-between text-ink-400 dark:text-ink-300">
            <span className="text-xs font-semibold">Total Pendapatan</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="font-heading whitespace-nowrap text-lg sm:text-2xl font-black text-ink-700 dark:text-brand-500 mt-2">
            Rp {(totalRevenue / 1000000).toFixed(1).replace('.', ',')} Jt
          </p>
          <span className="text-[10px] text-ink-400 dark:text-ink-300">Estimasi Bruto</span>
        </div>

        <div className="p-4 rounded-xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
          <div className="flex items-center justify-between text-ink-400 dark:text-ink-300">
            <span className="text-xs font-semibold">Rating Rata-rata</span>
            <Star className="w-4 h-4 fill-brand-500 text-brand-500" />
          </div>
          <p className="font-heading text-2xl font-black text-ink-900 dark:text-surface-50 mt-2">
            {averageRating}
          </p>
          <span className="text-[10px] text-ink-400 dark:text-ink-300">Dari seluruh ulasan</span>
        </div>

        <div className="p-4 rounded-xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
          <div className="flex items-center justify-between text-ink-400 dark:text-ink-300">
            <span className="text-xs font-semibold">Kelas Diterbitkan</span>
            <Layers className="w-4 h-4 text-ink-400" />
          </div>
          <p className="font-heading text-2xl font-black text-ink-900 dark:text-surface-50 mt-2">
            {mentoredItems.length}
          </p>
          <span className="text-[10px] text-emerald-700 font-semibold">Semua Live</span>
        </div>
      </div>

      {/* Courses Managed Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-ink-900 dark:text-surface-200 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-ink-700 dark:text-brand-500" />
            Daftar Kelas yang Anda Ampu ({mentoredItems.length})
          </h2>
          <span className="text-xs text-ink-400 dark:text-ink-300 font-medium">
            Histori terhubung dengan profil mentor Anda
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mentoredItems.map(({ stats, product }) => (
            <div
              key={product.id}
              className="p-5 rounded-2xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-14 h-14 rounded-xl object-cover ring-1 ring-brand-400"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-ink-700 dark:text-ink-200 uppercase tracking-wider">
                        {product.category} · {product.typeLabel}
                      </span>
                      <h3 className="font-bold text-ink-900 dark:text-white text-sm break-words">
                        {product.title}
                      </h3>
                      <p className="text-[11px] text-ink-400 dark:text-ink-300">
                        Dibuat: {stats.createdAt} · Harga: {product.formattedPrice}
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    Aktif
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-surface-100 dark:bg-ink-900 text-xs">
                  <div>
                    <span className="text-[10px] text-ink-400 dark:text-ink-300 block">Siswa</span>
                    <span className="font-extrabold text-ink-800 dark:text-surface-300">
                      {stats.activeStudents}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-400 dark:text-ink-300 block">Rating</span>
                    <span className="font-extrabold text-ink-700 dark:text-brand-500 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-brand-500 text-brand-500" />
                      {stats.averageRating}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-400 dark:text-ink-300 block">Pendapatan</span>
                    <span className="font-extrabold text-ink-800 dark:text-surface-300">
                      Rp {(stats.totalRevenue / 1000000).toFixed(1).replace('.', ',')} Jt
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-surface-200 dark:border-ink-700">
                <button
                  onClick={() => onOpenDetail(product)}
                  className="text-xs font-semibold text-ink-600 dark:text-ink-200 hover:text-ink-700 dark:hover:text-brand-500 flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Tampilan Publik</span>
                </button>

                <button
                  onClick={() => alert(`Kelola kurikulum kelas "${product.title}": 5 modul aktif.`)}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg border border-surface-300 dark:border-ink-700 hover:bg-surface-100 dark:hover:bg-ink-700 text-ink-700 dark:text-brand-500 flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Kelola Materi</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="w-full max-w-lg rounded-2xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-2xl p-6 text-ink-800 dark:text-surface-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-surface-300 dark:border-ink-700">
              <div className="flex items-center gap-2">
                <FilePlus className="w-5 h-5 text-ink-700 dark:text-brand-500" />
                <h3 className="font-bold text-base">Publikasikan Materi / Kelas Baru</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-ink-400 dark:text-ink-300 hover:text-ink-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Judul Kelas / Produk Digital:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Otomasi Workflow AI dengan Python Pemula"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Tagline Ringkas:</label>
                <input
                  type="text"
                  placeholder="Contoh: Hemat 10 jam kerja per minggu dengan otomasi pintar"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Kategori:</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800"
                  >
                    <option value="Teknologi & Digital">Teknologi & Digital</option>
                    <option value="Produktivitas">Produktivitas</option>
                    <option value="Wellness & Self-Growth">Wellness & Self-Growth</option>
                    <option value="Karir & Mentoring">Karir & Mentoring</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Format Format:</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800"
                  >
                    <option value="video">Video Singkat</option>
                    <option value="mooc">MOOC Terstruktur</option>
                    <option value="tool">Web App / Tool</option>
                    <option value="pdf">Unduhan PDF / Worksheet</option>
                    <option value="mentoring">1-on-1 Mentoring</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Harga (Rp, isi 0 jika Gratis):</label>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Durasi / Spesifikasi:</label>
                  <input
                    type="text"
                    value={formData.durationOrSpecs}
                    onChange={(e) => setFormData({ ...formData, durationOrSpecs: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-surface-300 dark:border-ink-700 hover:bg-surface-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-brand-500 text-ink-900 font-bold hover:bg-brand-400"
                >
                  Terbitkan Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
