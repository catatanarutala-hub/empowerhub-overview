import React from 'react';
import { 
  X, 
  Star, 
  Users, 
  Clock, 
  CheckCircle, 
  BookOpen, 
  ExternalLink, 
  Sparkles, 
  Download, 
  PlayCircle, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Product, EnrolledCourse } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  enrolledData?: EnrolledCourse;
  onEnroll: (product: Product) => void;
  onOpenPlayer: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  enrolledData,
  onEnroll,
  onOpenPlayer,
  onAddToCart,
}) => {
  if (!product) return null;

  const isEnrolled = !!enrolledData;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-2xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-700 dark:text-ink-200">
              {product.category}
            </span>
            <span className="text-ink-200 dark:text-ink-600">·</span>
            <span className="text-xs text-ink-600 dark:text-ink-200 font-medium">
              {product.typeLabel}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-400 dark:text-ink-300 hover:text-ink-700 dark:hover:text-white hover:bg-white dark:hover:bg-ink-700 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1">
          {/* Hero Banner inside Modal */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-7 space-y-3">
              {product.isAffiliate ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-brand-400 text-ink-900">
                  <Sparkles className="w-3.5 h-3.5 text-ink-700" />
                  <span>Mitra Resmi Pasar Daya</span>
                </div>
              ) : product.price === 0 ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <span>Akses Gratis Selamanya</span>
                </div>
              ) : null}

              <h2 className="text-xl sm:text-2xl font-extrabold text-ink-900 dark:text-surface-50 leading-tight">
                {product.title}
              </h2>

              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200 leading-relaxed">
                {product.description}
              </p>

              {/* Stats & Rating */}
              <div className="flex items-center gap-4 text-xs text-ink-400 dark:text-ink-300 pt-1">
                <div className="flex items-center gap-1 text-ink-700 dark:text-brand-500 font-bold">
                  <Star className="w-4 h-4 fill-brand-500 text-brand-500" />
                  <span>{product.rating.toFixed(2)}</span>
                  <span className="font-normal text-ink-400 dark:text-ink-300">({product.reviewCount} ulasan)</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{product.studentCount} peserta</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{product.durationOrSpecs.split('·')[0]}</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Preview Card */}
            <div className="md:col-span-5">
              <div className="rounded-xl overflow-hidden border border-surface-300 dark:border-ink-700 shadow-md relative aspect-[16/10]">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-bold flex items-center gap-1.5">
                    <PlayCircle className="w-4 h-4 text-brand-500" />
                    Pratinjau Materi Tersedia
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mitra Pasar Daya Special Alert (for affiliate products) */}
          {product.isAffiliate && (
            <div className="p-4 rounded-xl border border-brand-400 bg-surface-100 dark:bg-ink-800 relative">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-400 flex items-center justify-center text-ink-700 shrink-0 font-extrabold text-sm shadow-sm">
                  PD
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-ink-700 dark:text-brand-500 text-sm">
                      Kemitraan Ekosistem: Pasar Daya
                    </h4>
                    <span className="text-[10px] bg-brand-100 dark:bg-ink-700 text-ink-700 dark:text-surface-300 px-2 py-0.5 rounded font-semibold">
                      pasardaya.vercel.app
                    </span>
                  </div>
                  <p className="text-ink-600 dark:text-ink-200 mt-1 leading-relaxed">
                    Produk ini dikurasi langsung oleh mitra strategis <strong>Pasar Daya</strong> — platform pemberdayaan ekonomi kreatif lokal. Anda dapat mengakses materi terintegrasi atau mengunjungi portal resmi untuk koleksi pelengkap lainnya.
                  </p>
                  <div className="mt-2.5 flex items-center gap-3">
                    <a
                      href={product.affiliateUrl || 'https://pasardaya.vercel.app'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-ink-700 dark:text-brand-500 hover:underline"
                    >
                      <span>Kunjungi Website Resmi Pasar Daya</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          <div>
            <h4 className="text-sm font-bold text-ink-900 dark:text-surface-200 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-ink-700 dark:text-brand-500" />
              Apa yang Akan Anda Kuasai
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.keyTakeaways.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-100 dark:bg-ink-800 border border-surface-300 dark:border-ink-700 text-xs text-ink-700 dark:text-ink-200"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus / Modules */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-ink-900 dark:text-surface-200 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-ink-700 dark:text-brand-500" />
                Kurikulum & Modul Pembelajaran ({product.lessons.length} Bagian)
              </h4>
              <span className="text-xs text-ink-400 dark:text-ink-300 font-medium">{product.durationOrSpecs}</span>
            </div>

            <div className="space-y-2">
              {product.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="p-3 rounded-xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 flex items-center justify-between text-xs hover:border-brand-400 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-md bg-brand-100 dark:bg-ink-700 text-ink-700 dark:text-brand-500 font-bold text-[11px] flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-ink-800 dark:text-surface-300 truncate">
                        {lesson.title}
                      </p>
                      <p className="text-[11px] text-ink-400 dark:text-ink-300 line-clamp-1">
                        {lesson.summary}
                      </p>
                    </div>
                  </div>
                  <span className="text-ink-400 dark:text-ink-300 font-medium shrink-0 ml-3 text-[11px]">
                    {lesson.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mentor Profile Card */}
          <div className="p-4 rounded-xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={product.mentorAvatar}
                alt={product.mentorName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500"
              />
              <div>
                <p className="text-xs text-ink-400 dark:text-ink-300">Instruktur / Penyusun Materi</p>
                <h5 className="text-sm font-bold text-ink-900 dark:text-surface-200">
                  {product.mentorName}
                </h5>
                <p className="text-xs text-ink-700 dark:text-ink-200 font-medium">
                  {product.mentorRole}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-900 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-ink-400 dark:text-ink-300 uppercase tracking-wider block">Total Investasi</span>
            <span className={`text-xl sm:text-2xl font-black ${
              product.price === 0 ? 'text-emerald-700' : 'text-ink-700 dark:text-brand-500'
            }`}>
              {product.formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isEnrolled ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenPlayer(product);
                }}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center gap-2 shadow-md transition-all"
              >
                <span>Buka Ruang Belajar</span>
                <ArrowRight className="w-4 h-4 text-brand-500" />
              </button>
            ) : product.isAffiliate ? (
              <a
                href={product.affiliateUrl || 'https://pasardaya.vercel.app'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-brand-400 hover:bg-brand-300 text-ink-900 flex items-center gap-2 shadow-md transition-all"
              >
                <span>Buka di Pasar Daya</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <div className="flex items-center gap-2">
                {onAddToCart && product.price > 0 && (
                  <button
                    onClick={() => {
                      onAddToCart(product);
                    }}
                    className="px-4 py-2.5 rounded-xl font-bold text-xs border border-brand-500 dark:border-brand-400 text-ink-700 dark:text-brand-500 hover:bg-brand-100/40 transition-colors"
                  >
                    + Keranjang
                  </button>
                )}
                <button
                  onClick={() => {
                    onEnroll(product);
                  }}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center gap-2 shadow-md transition-all"
                >
                  <span>{product.price === 0 ? 'Daftar Kelas Gratis Sekarang' : 'Daftar & Ambil Akses'}</span>
                  <ArrowRight className="w-4 h-4 text-brand-500" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
