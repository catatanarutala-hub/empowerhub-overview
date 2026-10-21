import React, { useState } from 'react';
import { 
  User, 
  BookOpen, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  ArrowRight, 
  Download, 
  FileCheck, 
  Eye, 
  Sparkles, 
  AlertCircle,
  FileText,
  DollarSign,
  Star,
  X,
  Printer
} from 'lucide-react';
import { Product, UserAccount, EnrolledCourse, MentoredCourse, Role } from '../types';

interface UserProfileViewProps {
  userAccount: UserAccount;
  products: Product[];
  role?: Role;
  onOpenPlayer: (product: Product) => void;
  onAddNewCourse: (newCourse: Partial<Product>) => void;
  onBrowseCatalog: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  userAccount,
  products,
  role = 'mentee',
  onOpenPlayer,
  onAddNewCourse,
  onBrowseCatalog,
  onOpenLogin,
  onOpenRegister,
}) => {
  const [activeTab, setActiveTab] = useState<'mentee' | 'mentor'>('mentee');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedCertProduct, setSelectedCertProduct] = useState<Product | null>(null);

  // Form state for Ajukan Materi Baru
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    category: 'Teknologi & Digital' as Product['category'],
    type: 'video' as Product['type'],
    price: 49000,
    durationOrSpecs: '1.5 Jam Video + Rangkuman',
  });

  const enrolledProducts = userAccount.enrolledCourses.map((enrolled) => {
    const product = products.find((p) => p.id === enrolled.productId);
    return {
      enrolled,
      product: product!,
    };
  }).filter(item => item.product);

  const mentoredItems = userAccount.mentoredCourses.map((m) => {
    const product = products.find((p) => p.id === m.productId);
    return {
      stats: m,
      product: product!,
    };
  }).filter(item => item.product);

  const totalRevenue = mentoredItems.reduce((acc, curr) => acc + curr.stats.totalRevenue, 0);
  // Sertifikat hanya untuk kelas MOOC Terstruktur yang sudah 100%
  const completedCoursesCount = enrolledProducts.filter(i => i.enrolled.progressPercent === 100 && i.product.type === 'mooc').length;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onAddNewCourse({
      title: formData.title,
      tagline: formData.tagline || 'Kuasai keterampilan bernilai tinggi bersama kurikulum terpadu.',
      description: formData.description || 'Kurikulum intensif yang diajukan langsung oleh mentor untuk hasil nyata.',
      category: formData.category,
      type: formData.type,
      price: Number(formData.price),
      durationOrSpecs: formData.durationOrSpecs,
    });

    setIsSubmitModalOpen(false);
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

  const getCurationBadge = (status: MentoredCourse['status']) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Tayang (Aktif)
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Menunggu Kurasi Admin
          </span>
        );
      case 'revision':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-extrabold bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Perlu Revisi
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-surface-300 dark:bg-ink-700 text-ink-700 dark:text-ink-200">
            Draf
          </span>
        );
    }
  };

  // GUEST EMPTY STATE: Jika pengguna belum login (Mode Guest)
  if (role === 'guest') {
    return (
      <div className="py-6 sm:py-12 px-4 animate-in fade-in duration-300">
        <div className="max-w-xl mx-auto rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 p-8 sm:p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
          
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-surface-100 dark:bg-ink-700 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-100/30 dark:bg-ink-700/30 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

          <div className="relative z-10">
            {/* Ikon Ilustrasi Buku / Folder Kosong Bernuansa Mauve Lembut */}
            <div className="w-20 h-20 rounded-3xl bg-surface-100 dark:bg-ink-700 border border-surface-300 dark:border-ink-700 text-ink-700 dark:text-brand-500 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <BookOpen className="w-10 h-10 text-ink-400 dark:text-brand-500" />
            </div>

            {/* Badge Status */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-surface-100 dark:bg-ink-700 text-ink-700 dark:text-ink-200 border border-surface-300 dark:border-ink-700 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Akses Belajar Personal</span>
            </div>

            {/* Judul & Subjudul Ramah */}
            <h2 className="text-2xl sm:text-3xl font-black text-ink-900 dark:text-white tracking-tight">
              Belum Ada Aktivitas Belajar
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-ink-600 dark:text-ink-200 leading-relaxed max-w-md mx-auto">
              Masuk atau daftar akun EmpowerHub terlebih dahulu untuk menyimpan kelas yang kamu ikuti, mengakses materi, atau mengelola materi yang kamu bagikan.
            </p>

            {/* 2 Tombol Aksi: Masuk (Muted Plum) & Buat Akun (Butter Yellow) */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={onOpenLogin}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <User className="w-4 h-4 text-brand-500" />
                <span>Masuk ke Akun</span>
              </button>

              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm bg-brand-400 hover:bg-brand-300 text-ink-900 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-ink-700" />
                <span>Buat Akun Baru</span>
              </button>
            </div>

            {/* Navigasi Sekunder ke Katalog */}
            <div className="mt-8 pt-6 border-t border-surface-300/60 dark:border-ink-700">
              <button
                onClick={onBrowseCatalog}
                className="text-xs font-semibold text-ink-400 hover:text-ink-700 dark:text-ink-300 dark:hover:text-brand-500 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Ingin melihat materi yang tersedia dulu? Jelajahi Katalog Kelas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Profil Pengguna Header Card */}
      <div className="rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
          
          {/* Avatar with Dual-Role Glow */}
          <div className="relative shrink-0">
            <img
              src={userAccount.avatar}
              alt={userAccount.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-brand-500 dark:ring-brand-400 shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-brand-400 text-ink-900 flex items-center justify-center font-black text-xs shadow">
              <Sparkles className="w-4 h-4 text-ink-700" />
            </div>
          </div>

          {/* User Info Details */}
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-ink-900 dark:text-white">
                {userAccount.name}
              </h1>

              {/* Status Badge: "Pembelajar & Mentor" */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-brand-400 text-ink-900 shadow-xs">
                <GraduationCap className="w-3.5 h-3.5 text-ink-700" />
                <span>Pembelajar &amp; Mentor</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-ink-700 dark:text-ink-200">
              {userAccount.headline}
            </p>

            <p className="text-xs text-ink-600 dark:text-ink-200 max-w-2xl leading-relaxed">
              {userAccount.bio}
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs text-ink-400 dark:text-ink-300">
              <span className="break-all">{userAccount.email}</span>
              <span aria-hidden="true" className="hidden min-[420px]:inline">·</span>
              <span className="whitespace-nowrap text-emerald-700 dark:text-emerald-400 font-semibold">Akun Terverifikasi</span>
            </div>
          </div>

        </div>

        {/* Dual-Role Metric Counters */}
        <div className="mt-6 pt-5 border-t border-surface-200 dark:border-ink-700 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 min-w-0 rounded-2xl bg-surface-100 dark:bg-ink-900 text-center sm:text-left">
            <span className="text-[10px] text-ink-400 dark:text-ink-300 uppercase tracking-wider block font-semibold">
              Kelas Diikuti
            </span>
            <span className="font-heading block whitespace-nowrap tracking-tight text-base sm:text-xl font-black text-ink-900 dark:text-white">
              {enrolledProducts.length} Kursus
            </span>
          </div>

          <div className="p-3 min-w-0 rounded-2xl bg-surface-100 dark:bg-ink-900 text-center sm:text-left">
            <span className="text-[10px] text-ink-400 dark:text-ink-300 uppercase tracking-wider block font-semibold">
              Sertifikat Kelulusan
            </span>
            <span className="font-heading block whitespace-nowrap tracking-tight text-base sm:text-xl font-black text-emerald-700 dark:text-emerald-400">
              {completedCoursesCount} Resmi
            </span>
          </div>

          <div className="p-3 min-w-0 rounded-2xl bg-surface-100 dark:bg-ink-900 text-center sm:text-left">
            <span className="text-[10px] text-ink-400 dark:text-ink-300 uppercase tracking-wider block font-semibold">
              Materi Diajarkan
            </span>
            <span className="font-heading block whitespace-nowrap tracking-tight text-base sm:text-xl font-black text-ink-700 dark:text-brand-500">
              {mentoredItems.length} Materi
            </span>
          </div>

          <div className="p-3 min-w-0 rounded-2xl bg-surface-100 dark:bg-ink-900 text-center sm:text-left">
            <span className="text-[10px] text-ink-400 dark:text-ink-300 uppercase tracking-wider block font-semibold">
              Pendapatan Mentor
            </span>
            <span className="font-heading block whitespace-nowrap tracking-tight text-base sm:text-xl font-black text-ink-900 dark:text-white">
              Rp {(totalRevenue / 1000000).toFixed(1).replace('.', ',')} Jt
            </span>
          </div>
        </div>
      </div>

      {/* 2. Dua Tab Navigasi: "Mode Belajar (Mentee)" & "Mode Mengajar (Mentor)" */}
      <div className="space-y-4">
        
        {/* Navigation Tabs Selector */}
        <div className="flex items-center gap-2 p-1.5 bg-surface-100 dark:bg-ink-900 rounded-2xl border border-surface-300 dark:border-ink-700 w-full sm:w-fit">
          <button
            onClick={() => setActiveTab('mentee')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-3 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'mentee'
                ? 'bg-brand-500 text-ink-900 shadow-sm'
                : 'text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-ink-800'
            }`}
          >
            <span className="sm:hidden">🎓 Belajar</span>
            <span className="hidden sm:inline">🎓 Mode Belajar (Mentee)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-300 dark:bg-ink-700 text-ink-900 dark:text-surface-50 font-black">
              {enrolledProducts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('mentor')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-3 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'mentor'
                ? 'bg-brand-500 text-ink-900 shadow-sm'
                : 'text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-ink-800'
            }`}
          >
            <span className="sm:hidden">👩‍🏫 Mengajar</span>
            <span className="hidden sm:inline">👩‍🏫 Mode Mengajar (Mentor)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-300 dark:bg-ink-700 text-ink-900 dark:text-surface-50 font-black">
              {mentoredItems.length}
            </span>
          </button>
        </div>

        {/* TAB 1 CONTENT: KELAS SAYA (MENTEE) */}
        {activeTab === 'mentee' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-black text-base text-ink-900 dark:text-white">
                  Kurikulum Pembelajaran Aktif ({enrolledProducts.length})
                </h3>
                <p className="text-xs text-ink-400 dark:text-ink-300">
                  Lanjutkan materi yang sedang Anda pelajari atau unduh sertifikat resmi jika kelas MOOC Terstruktur sudah 100%.
                </p>
              </div>

              <button
                onClick={onBrowseCatalog}
                className="self-start sm:self-auto shrink-0 whitespace-nowrap min-h-[44px] sm:min-h-0 text-xs sm:text-sm font-bold text-ink-700 dark:text-brand-500 hover:underline flex items-center gap-1"
              >
                <span>+ Ambil Kelas Lain</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {enrolledProducts.length === 0 ? (
              <div className="p-8 text-center rounded-3xl border border-dashed border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
                <BookOpen className="w-10 h-10 mx-auto text-ink-400 dark:text-ink-300 mb-2" />
                <p className="text-xs font-bold text-ink-700 dark:text-ink-200">
                  Belum ada kelas yang diikuti
                </p>
                <button
                  onClick={onBrowseCatalog}
                  className="mt-3 px-4 py-2 text-xs font-bold rounded-xl bg-brand-500 text-ink-900"
                >
                  Jelajahi Katalog Kelas
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledProducts.map(({ enrolled, product }) => {
                  const is100 = enrolled.progressPercent === 100;

                  return (
                    <div
                      key={product.id}
                      className="rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                    >
                      <div className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-12 h-12 rounded-2xl object-cover ring-1 ring-brand-400"
                          />
                          <span className="text-[10px] font-bold text-ink-400 dark:text-ink-300">
                            Terdaftar: {enrolled.enrolledAt}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-700 dark:text-ink-200">
                            {product.category} · {product.typeLabel}
                          </span>
                          <h4 className="font-black text-sm text-ink-900 dark:text-white break-words mt-0.5">
                            {product.title}
                          </h4>
                          <p className="text-[11px] text-ink-400 dark:text-ink-300 line-clamp-1 mt-0.5">
                            Instruktur: {product.mentorName}
                          </p>
                        </div>

                        {/* Progress Tracker */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-[11px] font-semibold text-ink-600 dark:text-ink-200">
                              Progres Belajar:
                            </span>
                            <span className={`text-[11px] font-bold ${
                              is100 ? 'text-emerald-700 dark:text-emerald-400' : 'text-ink-700 dark:text-brand-500'
                            }`}>
                              {enrolled.progressPercent}% Selesai
                            </span>
                          </div>

                          <div className="w-full bg-brand-100 dark:bg-ink-700 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                is100 ? 'bg-emerald-500' : 'bg-brand-500 dark:bg-brand-400'
                              }`}
                              style={{ width: `${enrolled.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="p-4 pt-3 border-t border-surface-200 dark:border-ink-700 bg-surface-100/50 dark:bg-ink-900/50 flex items-center justify-between gap-2">
                        {is100 && product.type !== 'mooc' ? (
                          <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                            Selesai
                          </span>
                        ) : is100 ? (
                          <button
                            onClick={() => setSelectedCertProduct(product)}
                            className="px-3 py-1.5 rounded-xl font-bold text-xs bg-brand-400 text-ink-900 hover:bg-brand-300 flex items-center gap-1.5 shadow-xs transition-colors"
                          >
                            <Award className="w-3.5 h-3.5 text-ink-700" />
                            <span>Unduh Sertifikat</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-ink-400 dark:text-ink-300">
                            {product.lessons.length} Modul Terstruktur
                          </span>
                        )}

                        <button
                          onClick={() => onOpenPlayer(product)}
                          className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center gap-1.5 transition-colors shadow-xs ml-auto"
                        >
                          <span>Lanjut Belajar</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2 CONTENT: MATERI SAYA (MENTOR) */}
        {activeTab === 'mentor' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-black text-base text-ink-900 dark:text-white">
                  Daftar Materi yang Anda Ampu ({mentoredItems.length})
                </h3>
                <p className="text-xs text-ink-400 dark:text-ink-300">
                  Pantau status verifikasi kurasi, jumlah peserta, dan ajukan produk materi baru.
                </p>
              </div>

              {/* Tombol [+ Ajukan Materi Baru] */}
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-4 py-2.5 rounded-2xl font-bold text-xs bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4 text-brand-500" />
                <span>+ Ajukan Materi Baru</span>
              </button>
            </div>

            {/* Mentored Courses List */}
            <div className="space-y-3">
              {mentoredItems.map(({ stats, product }) => (
                <div
                  key={product.id}
                  className="p-5 rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 shadow-xs hover:shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-1 ring-brand-400 shrink-0"
                    />
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {getCurationBadge(stats.status)}
                        <span className="text-[10px] text-ink-400 dark:text-ink-300">
                          Diajukan: {stats.createdAt}
                        </span>
                      </div>

                      <h4 className="font-black text-sm sm:text-base text-ink-900 dark:text-white break-words">
                        {product.title}
                      </h4>

                      <p className="text-xs text-ink-400 dark:text-ink-300 line-clamp-1">
                        {product.category} · {product.typeLabel} · Harga: <strong>{product.formattedPrice}</strong>
                      </p>

                      {stats.adminFeedback && (
                        <div className="mt-1 p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span>{stats.adminFeedback}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right stats & actions */}
                  <div className="flex flex-wrap items-center justify-between md:justify-end gap-x-5 gap-y-2 pt-3 md:pt-0 border-t md:border-t-0 border-surface-200 dark:border-ink-700 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-ink-400 dark:text-ink-300 uppercase tracking-wider block">Peserta</span>
                      <span className="font-black text-sm whitespace-nowrap text-ink-900 dark:text-white">
                        {stats.activeStudents} Siswa
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-ink-400 dark:text-ink-300 uppercase tracking-wider block">Pendapatan</span>
                      <span className="font-black text-sm whitespace-nowrap text-ink-700 dark:text-brand-500">
                        Rp {(stats.totalRevenue / 1000000).toFixed(1).replace('.', ',')} Jt
                      </span>
                    </div>

                    <button
                      onClick={() => alert(`Kelola silabus materi: "${product.title}" (${product.lessons.length} modul)`)}
                      className="px-3.5 py-2 whitespace-nowrap rounded-xl text-xs font-bold border border-surface-300 dark:border-ink-700 hover:bg-surface-100 dark:hover:bg-ink-700 text-ink-800 dark:text-surface-300"
                    >
                      Kelola Modul
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 3. Modal Mock Unduh Sertifikat Kelulusan */}
      {selectedCertProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="max-w-xl w-full rounded-3xl border-4 border-brand-400 bg-white dark:bg-ink-800 p-6 sm:p-8 text-center shadow-2xl relative text-ink-800 dark:text-surface-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCertProduct(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-ink-400 dark:text-ink-300 hover:text-ink-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 mx-auto rounded-full bg-brand-100 dark:bg-ink-700 flex items-center justify-center text-ink-700 dark:text-brand-500 mb-3">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-ink-700 dark:text-brand-500">
              EmpowerHub Official Certificate of Mastery
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-1 text-ink-900 dark:text-white">
              Sertifikat Kelulusan
            </h2>
            <p className="text-xs text-ink-400 dark:text-ink-300 mt-0.5">Diberikan dengan bangga kepada:</p>

            <div className="my-4 py-3 border-y border-surface-300 dark:border-ink-700">
              <p className="font-heading text-xl font-black text-ink-700 dark:text-brand-500">
                {userAccount.name}
              </p>
              <p className="text-xs text-ink-600 dark:text-ink-200 mt-1">
                Telah berhasil menyelesaikan seluruh kurikulum terverifikasi:
              </p>
              <p className="font-extrabold text-sm sm:text-base text-ink-900 dark:text-white mt-1">
                "{selectedCertProduct.title}"
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-ink-400 dark:text-ink-300 px-4 mb-4">
              <span>Instruktur: <strong>{selectedCertProduct.mentorName}</strong></span>
              <span>No. Seri: <strong>EPH-2026-{selectedCertProduct.id.slice(-4).toUpperCase()}</strong></span>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => {
                  alert('Sertifikat PDF resolusi tinggi siap dicetak!');
                  setSelectedCertProduct(null);
                }}
                className="px-5 py-2.5 text-xs font-bold rounded-xl bg-brand-500 text-ink-900 flex items-center gap-1.5 hover:bg-brand-400 shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-brand-500" />
                <span>Unduh File PDF</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 text-xs font-semibold rounded-xl border border-surface-300 dark:border-ink-700 flex items-center gap-1.5 hover:bg-surface-100"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal Ajukan Materi Baru (Mentor Proposal) */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-2xl p-6 text-ink-800 dark:text-surface-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-surface-300 dark:border-ink-700">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-ink-700 dark:text-brand-500" />
                <h3 className="font-bold text-base">Ajukan Kurikulum Materi Baru</h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-ink-400 dark:text-ink-300 hover:text-ink-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 my-3 rounded-2xl bg-surface-100 dark:bg-ink-800 border border-surface-300 dark:border-ink-700 text-xs text-ink-600 dark:text-ink-200 leading-relaxed">
              <span className="font-bold text-ink-700 dark:text-brand-500">Alur Kurasi Mutu:</span>{' '}
              Materi yang diajukan akan berstatus <strong className="text-amber-700 dark:text-amber-400">Menunggu Kurasi Admin</strong> sebelum diterbitkan resmi ke katalog publik.
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold block mb-1">Judul Materi / Kelas:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Otomasi Spreadsheet Google untuk UKM"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Tagline Ringkas (Manfaat Utama):</label>
                <input
                  type="text"
                  placeholder="Contoh: Praktik langsung membuat laporan keuangan tanpa rumus rumit"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Kategori:</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800"
                  >
                    <option value="Teknologi & Digital">Teknologi & Digital</option>
                    <option value="Produktivitas">Produktivitas</option>
                    <option value="Wellness & Self-Growth">Wellness & Self-Growth</option>
                    <option value="Karir & Mentoring">Karir & Mentoring</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Format Penyampaian:</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800"
                  >
                    <option value="video">Video Singkat</option>
                    <option value="mooc">MOOC Terstruktur</option>
                    <option value="tool">Web App / Tool</option>
                    <option value="pdf">Unduhan PDF / Worksheet</option>
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
                    className="w-full p-2.5 rounded-xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Estimasi Durasi / Specs:</label>
                  <input
                    type="text"
                    value={formData.durationOrSpecs}
                    onChange={(e) => setFormData({ ...formData, durationOrSpecs: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-surface-300 dark:border-ink-700 hover:bg-surface-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-500 text-ink-900 font-bold hover:bg-brand-400"
                >
                  Kirim Pengajuan Materi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
