import React from 'react';
import { 
  Star, 
  Users, 
  ExternalLink, 
  PlayCircle, 
  FileText, 
  Wrench, 
  Layers, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingCart
} from 'lucide-react';
import { Product, EnrolledCourse } from '../types';

interface ProductCardProps {
  product: Product;
  enrolledData?: EnrolledCourse;
  onOpenDetail: (product: Product) => void;
  onQuickEnroll: (product: Product) => void;
  onContinueLearning: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  enrolledData,
  onOpenDetail,
  onQuickEnroll,
  onContinueLearning,
  onAddToCart,
}) => {
  const getTypeIcon = (type: Product['type']) => {
    switch (type) {
      case 'video': return PlayCircle;
      case 'pdf': return FileText;
      case 'tool': return Wrench;
      case 'mooc': return Layers;
      case 'affiliate': return ExternalLink;
      case 'mentoring': return Users;
      default: return FileText;
    }
  };

  const TypeIcon = getTypeIcon(product.type);
  const isEnrolled = !!enrolledData;

  return (
    <article 
      className="group rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 overflow-hidden flex flex-col shadow-[0_4px_20px_-4px_rgba(25,25,25,0.08)] hover:shadow-[0_8px_25px_-4px_rgba(25,25,25,0.14)] hover:border-brand-400 dark:hover:border-brand-400/70 transition-all duration-300"
    >
      {/* Thumbnail Container */}
      <div 
        onClick={() => onOpenDetail(product)}
        className="relative aspect-[16/10] overflow-hidden bg-surface-100 dark:bg-ink-900 cursor-pointer"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.isAffiliate ? (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide bg-brand-400 text-ink-900 shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-ink-700" />
              <span>Mitra: {product.affiliateBadge ? product.affiliateBadge.replace(/^Mitra:?\s*/i, '') : 'Pasar Daya'}</span>
            </span>
          ) : product.price === 0 ? (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide bg-brand-400 text-ink-900 shadow-sm">
              GRATIS
            </span>
          ) : product.badgeHighlight ? (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide bg-surface-300 text-ink-700 dark:bg-ink-700 dark:text-brand-500 shadow-sm">
              {product.badgeHighlight}
            </span>
          ) : <div />}

          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
            <TypeIcon className="w-3 h-3 text-brand-500" />
            {product.typeLabel}
          </span>
        </div>

        {/* Bar Hitam Transparan 1 Baris: Rating di Kiri, Durasi di Kanan (Rapi & Bebas Tabrakan) */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-2.5 flex items-center justify-between text-white text-[11px] font-medium pointer-events-none">
          <div className="flex items-center gap-1 text-brand-500">
            <Star className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
            <span className="font-bold text-white">{product.rating.toFixed(1)}</span>
            <span className="text-white/70 text-[10px]">({product.reviewCount})</span>
          </div>
          <span className="text-white/90 text-[10.5px] leading-tight break-words max-w-[55%] text-right font-medium">
            {product.durationOrSpecs.split('·')[0]}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Clean Inline */}
          <div className="text-[11px] font-medium text-ink-400 dark:text-ink-300 mb-1.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-ink-700 dark:text-ink-200 font-semibold">{product.category}</span>
            <span aria-hidden="true" className="text-ink-200 dark:text-ink-600">·</span>
            <span>{product.typeLabel}</span>
            {product.isAffiliate && (
              <>
                <span aria-hidden="true" className="text-ink-200 dark:text-ink-600">·</span>
                <span className="text-ink-700 dark:text-brand-500">pasardaya.vercel.app</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenDetail(product)}
            className="font-heading text-base font-bold text-ink-900 dark:text-surface-50 group-hover:text-ink-700 dark:group-hover:text-brand-500 transition-colors cursor-pointer break-words leading-snug"
          >
            {product.title}
          </h3>

          {/* Tagline / Description */}
          <p className="mt-1.5 text-xs text-ink-600 dark:text-ink-200 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Mentor Information */}
          <div className="mt-3.5 pt-3 border-t border-surface-300/60 dark:border-ink-700 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={product.mentorAvatar}
                alt={product.mentorName}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-brand-400"
              />
              <span className="font-semibold text-ink-700 dark:text-ink-200 truncate text-[11.5px]">
                {product.mentorName}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-ink-400 dark:text-ink-300 shrink-0">
              <Users className="w-3 h-3" />
              <span>{product.studentCount}</span>
            </div>
          </div>
        </div>

        {/* Footer Area: Price & Contextual Action (Sisi Kiri Harga Rapi, Sisi Kanan 2 Tombol Ringkas) */}
        <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800">
          {isEnrolled ? (
            /* Enrolled Status View */
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-ink-700 dark:text-brand-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Terdaftar
                </span>
                <span className="text-[11px] font-bold text-ink-700 dark:text-surface-300">
                  {enrolledData?.progressPercent}% selesai
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-surface-100 dark:bg-ink-700 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-500 dark:bg-brand-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${enrolledData?.progressPercent || 0}%` }}
                />
              </div>

              <button
                onClick={() => onContinueLearning(product)}
                className="w-full mt-2 py-2 px-3 text-xs font-bold rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <span>Lanjut Belajar</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
              </button>
            </div>
          ) : (
            /* Not Enrolled View: Sisi Kiri Harga Rapi, Sisi Kanan 2 Tombol Ringkas (Keranjang + Daftar) */
            <div className="flex items-center justify-between gap-3">
              {/* Sisi Kiri: Harga Terkunci Tanpa Wrap */}
              <div className="shrink-0 min-w-[70px]">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-400 font-medium block leading-none mb-1">
                  HARGA
                </span>
                <span className={`text-base sm:text-lg font-bold whitespace-nowrap block ${
                  product.price === 0 
                    ? 'text-emerald-700 dark:text-emerald-400 font-black' 
                    : 'text-stone-900 dark:text-white'
                }`}>
                  {product.formattedPrice}
                </span>
              </div>

              {/* Sisi Kanan: Cukup Tampilkan 2 Tombol Ringkas (Ikon Keranjang + Tombol Daftar) */}
              <div className="flex items-center gap-1.5 shrink-0">
                {product.isAffiliate ? (
                  <a
                    href={product.affiliateUrl || 'https://pasardaya.vercel.app'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-brand-400 hover:bg-brand-300 text-ink-900 flex items-center gap-1.5 transition-colors shadow-xs whitespace-nowrap cursor-pointer"
                  >
                    <span>Pasar Daya</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <>
                    {/* 1. Tombol Ikon Keranjang kecil (p-2 border rounded-lg text-stone-600 hover:bg-stone-50) */}
                    {onAddToCart && product.price > 0 && (
                      <button
                        onClick={() => onAddToCart(product)}
                        className="p-2 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-ink-700 transition-colors cursor-pointer"
                        title="Tambahkan ke Keranjang"
                        aria-label="Tambah ke Keranjang"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-ink-700 dark:text-brand-500" />
                      </button>
                    )}

                    {/* 2. Tombol Solid Orange (brand-500): Daftar -> (px-3.5 py-2 text-xs font-semibold text-white rounded-lg whitespace-nowrap) */}
                    <button
                      onClick={() => onQuickEnroll(product)}
                      className="px-3.5 py-2 text-xs font-semibold text-ink-900 bg-brand-500 hover:bg-brand-400 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
                    >
                      <span>{product.price === 0 ? 'Ambil Gratis' : 'Daftar'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
