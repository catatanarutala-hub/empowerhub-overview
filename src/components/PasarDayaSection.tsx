import React from 'react';
import { 
  HeartHandshake, 
  ArrowRight, 
  ExternalLink, 
  BookOpen, 
  Users, 
  Sparkles 
} from 'lucide-react';

interface PasarDayaSectionProps {
  onExplorePartnerProducts: () => void;
  onOpenPartnerPage: () => void;
}

export const PasarDayaSection: React.FC<PasarDayaSectionProps> = ({
  onExplorePartnerProducts,
  onOpenPartnerPage,
}) => {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-surface-100 via-brand-25 to-brand-25 border-2 border-surface-300 shadow-md dark:bg-gradient-to-r dark:from-ink-800 dark:via-ink-800 dark:to-ink-900 dark:border-ink-700 p-6 sm:p-10 relative overflow-hidden transition-all duration-300">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-surface-300/40 dark:bg-ink-700/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-60 h-60 bg-brand-400/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        
        {/* Header: Kolaborasi Ekosistem & Komunitas */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          {/* Badge Kapsul Kontras */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide mb-2 bg-brand-100 text-ink-800 dark:bg-ink-700 dark:text-brand-500">
            <HeartHandshake className="w-3.5 h-3.5 text-ink-800 dark:text-brand-500" />
            <span>KOLABORASI EKOSISTEM &amp; KOMUNITAS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink-900 dark:text-surface-50 tracking-tight">
            Tumbuh Bersama Jaringan Pemberdayaan Perempuan
          </h2>

          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200 max-w-2xl mx-auto leading-relaxed">
            EmpowerHub membuka ruang kolaborasi seluas-luasnya dengan komunitas, inkubator, dan platform kreator untuk memperluas akses belajar praktis bagi perempuan.
          </p>
        </div>

        {/* Dual-Action Cards: 2 Kartu Berdampingan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Kartu Kiri (Untuk Pembelajar) */}
          <div className="rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(25,25,25,0.08)] hover:shadow-[0_8px_25px_-4px_rgba(25,25,25,0.14)] transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-surface-100 dark:bg-ink-700 border border-surface-300 dark:border-ink-700 text-ink-700 dark:text-brand-500 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6 text-ink-700 dark:text-brand-500" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-100 dark:bg-ink-700 text-ink-700 dark:text-ink-200 border border-surface-300 dark:border-ink-700">
                  Untuk Pembelajar
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-ink-900 dark:text-white">
                  Eksplorasi Kurasi Produk Mitra
                </h3>
                <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200 leading-relaxed">
                  Dapatkan materi terpilih, lembar kerja bisnis, dan panduan praktis yang dikurasi langsung bersama mitra strategis seperti Pasar Daya.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-surface-300/60 dark:border-ink-700">
              <button
                onClick={onExplorePartnerProducts}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Lihat Koleksi Produk Mitra</span>
                <ArrowRight className="w-4 h-4 text-brand-500" />
              </button>
            </div>
          </div>

          {/* 2. Kartu Kanan (Untuk Komunitas / Organisasi) */}
          <div className="rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(25,25,25,0.08)] hover:shadow-[0_8px_25px_-4px_rgba(25,25,25,0.14)] transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-25 dark:bg-ink-700 border border-brand-400/40 dark:border-ink-700 text-ink-900 dark:text-brand-500 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6 text-ink-700 dark:text-brand-500" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-25 dark:bg-ink-700 text-ink-700 dark:text-brand-500 border border-brand-400/30 dark:border-ink-700">
                  Untuk Komunitas
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-ink-900 dark:text-white">
                  Bermitra dengan EmpowerHub
                </h3>
                <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200 leading-relaxed">
                  Punya komunitas atau program pemberdayaan perempuan? Mari integrasikan kurikulum, publikasikan karya mentormu, dan tumbuh bersama ekosistem kami.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-surface-300/60 dark:border-ink-700">
              <button
                onClick={onOpenPartnerPage}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border-2 border-brand-500 dark:border-brand-400 text-ink-700 dark:text-brand-500 hover:bg-surface-100 dark:hover:bg-ink-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Ajukan Kerja Sama Komunitas</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Baris Badge Mitra Resmi */}
        <div className="pt-6 border-t border-surface-300/80 dark:border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-ink-400 dark:text-ink-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Jaringan Mitra Ekosistem:</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            {/* Logo/Badge Pasar Daya (Mitra Peluncuran) */}
            <a
              href="https://pasardaya.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-ink-800 text-ink-900 dark:text-surface-50 border border-surface-300 dark:border-ink-700 shadow-xs hover:border-brand-500 hover:text-ink-700 dark:hover:text-brand-500 transition-all cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Pasar Daya (Mitra Peluncuran)</span>
              <ExternalLink className="w-3 h-3 text-ink-700 dark:text-brand-500" />
            </a>

            {/* Placeholder Terbuka untuk Mitra Baru */}
            <button
              onClick={onOpenPartnerPage}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-ink-400 dark:text-ink-300 border border-dashed border-surface-300 dark:border-ink-700 hover:text-ink-700 dark:hover:text-brand-500 hover:border-brand-500 dark:hover:border-brand-400 transition-all cursor-pointer"
            >
              <span>+ Terbuka untuk Mitra Baru</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
