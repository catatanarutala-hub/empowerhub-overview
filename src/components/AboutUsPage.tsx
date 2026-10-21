import React from 'react';
import { Sparkles, Heart, Compass, Users } from 'lucide-react';

interface AboutUsPageProps {
  onExploreCatalog: () => void;
  onStartAssessment: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onExploreCatalog,
  onStartAssessment,
}) => {
  return (
    <div className="space-y-12 sm:space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-100 dark:bg-ink-700 text-ink-700 dark:text-brand-500 border border-surface-300 dark:border-ink-700">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span>Tentang EmpowerHub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-900 dark:text-white tracking-tight">
          Pemberdayaan Skill Nyata untuk Setiap Potensi
        </h1>
        <p className="text-sm sm:text-base text-ink-600 dark:text-ink-200 leading-relaxed">
          EmpowerHub hadir sebagai jembatan ramah bagi siapa pun yang ingin melangkah ke dunia digital tanpa intimidasi teknis. Bersama mitra ekosistem <strong>Pasar Daya</strong>, kami memadukan edukasi terapan dan peluang ekonomi mandiri.
        </p>
      </div>

      {/* 3 Nilai Utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-ink-700 text-ink-700 dark:text-brand-500 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-ink-900 dark:text-white">
            Bahasa Membumi &amp; Empatik
          </h3>
          <p className="text-xs text-ink-600 dark:text-ink-200 leading-relaxed">
            Semua materi disajikan tanpa jargon yang membingungkan. Kami percaya setiap orang berhak memahami teknologi dengan analogi sederhana sehari-hari.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-ink-700 text-ink-700 dark:text-brand-500 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-ink-900 dark:text-white">
            Praktik Langsung Menghasilkan
          </h3>
          <p className="text-xs text-ink-600 dark:text-ink-200 leading-relaxed">
            Bukan sekadar hafalan teori. Setiap modul menghasilkan karya nyata: kode aplikasi web, spreadsheet otomatis, proposal klien, atau jurnal refleksi.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-ink-700 text-ink-700 dark:text-brand-500 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-ink-900 dark:text-white">
            Satu Akun, Dua Peran
          </h3>
          <p className="text-xs text-ink-600 dark:text-ink-200 leading-relaxed">
            Ekosistem dua arah yang memuliakan pembelajar sekaligus mentor. Belajar apa yang kamu butuhkan, dan bagikan apa yang sudah kamu kuasai.
          </p>
        </div>
      </div>

      {/* CTA Box (Kartu Bantuan Tunggal tetap ada di Footer bagian bawah sebelum link footer) */}
      <div className="p-6 sm:p-10 rounded-3xl bg-brand-500 text-ink-900 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black">
            Mulai Perjalanan Belajarmu Sekarang
          </h3>
          <p className="text-xs sm:text-sm text-ink-800 max-w-md">
            Coba asesmen adaptif 5 menit atau jelajahi katalog kelas kami tanpa kewajiban membuat akun.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStartAssessment}
            className="px-5 py-3 rounded-2xl font-black text-xs sm:text-sm bg-brand-400 text-ink-900 hover:bg-brand-300 shadow-md transition-all cursor-pointer"
          >
            Mulai Asesmen (5 Menit)
          </button>
          <button
            onClick={onExploreCatalog}
            className="px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm border border-ink-900/50 hover:bg-ink-900/10 text-ink-900 transition-all cursor-pointer"
          >
            Lihat Katalog
          </button>
        </div>
      </div>

    </div>
  );
};
