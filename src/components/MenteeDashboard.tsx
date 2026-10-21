import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Clock, 
  PlayCircle, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Sparkles,
  FileCheck
} from 'lucide-react';
import { Product, UserAccount } from '../types';

interface MenteeDashboardProps {
  userAccount: UserAccount;
  products: Product[];
  onOpenPlayer: (product: Product) => void;
  onBrowseCatalog: () => void;
}

export const MenteeDashboard: React.FC<MenteeDashboardProps> = ({
  userAccount,
  products,
  onOpenPlayer,
  onBrowseCatalog,
}) => {
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  const enrolledProducts = userAccount.enrolledCourses.map((enrolled) => {
    const product = products.find((p) => p.id === enrolled.productId);
    return {
      enrolled,
      product: product!,
    };
  }).filter(item => item.product);

  const completedCount = enrolledProducts.filter(i => i.enrolled.progressPercent === 100).length;
  const inProgressCount = enrolledProducts.filter(i => i.enrolled.progressPercent < 100).length;

  const filteredItems = enrolledProducts.filter(item => {
    if (filter === 'in-progress') return item.enrolled.progressPercent < 100;
    if (filter === 'completed') return item.enrolled.progressPercent === 100;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Dashboard Top Banner */}
      <div className="rounded-2xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 p-5 sm:p-7 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-brand-400 text-ink-900">
                Dashboard Pelajar (Mentee)
              </span>
              <span className="text-xs text-ink-400 dark:text-ink-300">· {userAccount.name}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-ink-900 dark:text-surface-50">
              Ruang Belajar Mandiri
            </h1>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200 mt-1 max-w-xl">
              Lanjutkan kurikulum yang telah Anda ambil, selesaikan lembar kerja interaktif, dan kumpulkan sertifikat kompetensi keahlian Anda.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBrowseCatalog}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center gap-1.5 transition-colors shadow-sm shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Jelajahi Kelas Lain</span>
            </button>
          </div>
        </div>

        {/* Ambient Corner Accent */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-brand-100/60 dark:bg-ink-700/40 blur-2xl pointer-events-none" />
      </div>

      {/* Learning Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
          <div className="flex items-center justify-between text-ink-400 dark:text-ink-300">
            <span className="text-xs font-semibold">Total Kelas</span>
            <BookOpen className="w-4 h-4 text-ink-700 dark:text-brand-500" />
          </div>
          <p className="font-heading text-2xl font-black text-ink-900 dark:text-surface-50 mt-2">
            {enrolledProducts.length}
          </p>
          <span className="text-[10px] text-ink-400 dark:text-ink-300">Tersimpan di Akun</span>
        </div>

        <div className="p-4 rounded-xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
          <div className="flex items-center justify-between text-ink-400 dark:text-ink-300">
            <span className="text-xs font-semibold">Sedang Dipelajari</span>
            <Clock className="w-4 h-4 text-ink-400" />
          </div>
          <p className="font-heading text-2xl font-black text-ink-900 dark:text-surface-50 mt-2">
            {inProgressCount}
          </p>
          <span className="text-[10px] text-ink-400 dark:text-ink-300">Aktif Berprogres</span>
        </div>

        <div className="p-4 rounded-xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
          <div className="flex items-center justify-between text-ink-400 dark:text-ink-300">
            <span className="text-xs font-semibold">Tuntas 100%</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="font-heading text-2xl font-black text-ink-900 dark:text-surface-50 mt-2">
            {completedCount}
          </p>
          <span className="text-[10px] text-ink-400 dark:text-ink-300">Kurikulum Selesai</span>
        </div>

        <div className="p-4 rounded-xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
          <div className="flex items-center justify-between text-ink-400 dark:text-ink-300">
            <span className="text-xs font-semibold">Sertifikat Resmi</span>
            <Award className="w-4 h-4 text-brand-500" />
          </div>
          <p className="font-heading text-2xl font-black text-ink-900 dark:text-surface-50 mt-2">
            {enrolledProducts.filter(i => i.enrolled.certificateIssued).length}
          </p>
          <span className="text-[10px] text-ink-400 dark:text-ink-300">Terverifikasi</span>
        </div>
      </div>

      {/* Filter Tabs (Interactive Controls) */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-surface-100 dark:bg-ink-800 rounded-xl border border-surface-300 dark:border-ink-700">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-white dark:bg-brand-500 text-ink-900 dark:text-ink-900 shadow-sm'
                : 'text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white'
            }`}
          >
            Semua ({enrolledProducts.length})
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'in-progress'
                ? 'bg-white dark:bg-brand-500 text-ink-900 dark:text-ink-900 shadow-sm'
                : 'text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white'
            }`}
          >
            Sedang Belajar ({inProgressCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'completed'
                ? 'bg-white dark:bg-brand-500 text-ink-900 dark:text-ink-900 shadow-sm'
                : 'text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white'
            }`}
          >
            Selesai ({completedCount})
          </button>
        </div>
      </div>

      {/* Enrolled Courses Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-dashed border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800">
          <BookOpen className="w-10 h-10 mx-auto text-ink-400 mb-2" />
          <h4 className="text-sm font-bold text-ink-800 dark:text-surface-300">
            Tidak ada materi pada kategori ini
          </h4>
          <p className="text-xs text-ink-400 dark:text-ink-300 mt-1 max-w-sm mx-auto">
            Temukan kurikulum baru di katalog untuk mulai meningkatkan keahlian masa depan Anda.
          </p>
          <button
            onClick={onBrowseCatalog}
            className="mt-4 px-4 py-2 text-xs font-bold rounded-xl bg-brand-500 text-ink-900"
          >
            Buka Katalog Produk
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(({ enrolled, product }) => {
            return (
              <div
                key={product.id}
                className="rounded-2xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all group"
              >
                {/* Thumbnail banner */}
                <div className="relative aspect-[16/9] overflow-hidden bg-surface-200">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[11px] font-bold text-white flex items-center gap-1">
                      <PlayCircle className="w-3.5 h-3.5 text-brand-500" />
                      {product.typeLabel}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[10px] text-ink-400 dark:text-ink-300 mb-1 flex items-center gap-1.5">
                      <span>Terdaftar: {enrolled.enrolledAt}</span>
                      <span>·</span>
                      <span className="text-ink-700 dark:text-ink-200 font-semibold">{product.category}</span>
                    </div>

                    <h3 className="font-bold text-ink-900 dark:text-surface-50 text-sm line-clamp-1 leading-snug">
                      {product.title}
                    </h3>
                    
                    <p className="text-[11px] text-ink-400 dark:text-ink-300 line-clamp-1 mt-1">
                      Instruktur: {product.mentorName}
                    </p>

                    {enrolled.notes && (
                      <div className="mt-2 p-2 rounded-lg bg-surface-100 dark:bg-ink-900 border border-surface-300 dark:border-ink-700 text-[10.5px] text-ink-600 dark:text-ink-200 italic line-clamp-2">
                        "{enrolled.notes}"
                      </div>
                    )}
                  </div>

                  {/* Progress Section */}
                  <div className="pt-2 border-t border-surface-200 dark:border-ink-700 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-ink-600 dark:text-ink-200">
                        Progres Belajar
                      </span>
                      <span className={`text-[11px] font-bold ${
                        enrolled.progressPercent === 100 
                          ? 'text-emerald-700 dark:text-emerald-400' 
                          : 'text-ink-700 dark:text-brand-500'
                      }`}>
                        {enrolled.progressPercent}% Selesai
                      </span>
                    </div>

                    <div className="w-full bg-brand-100 dark:bg-ink-700 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          enrolled.progressPercent === 100 ? 'bg-emerald-500' : 'bg-brand-500 dark:bg-brand-400'
                        }`}
                        style={{ width: `${enrolled.progressPercent}%` }}
                      />
                    </div>

                    <button
                      onClick={() => onOpenPlayer(product)}
                      className="w-full mt-2 py-2 px-3 text-xs font-bold rounded-lg bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>{enrolled.progressPercent === 100 ? 'Tinjau Ulang Materi' : 'Lanjut Belajar'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
