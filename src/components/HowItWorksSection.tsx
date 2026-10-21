import React from 'react';
import { BookOpen, Share2, ArrowRight, Sparkles } from 'lucide-react';

interface HowItWorksSectionProps {
  onExploreCatalog: () => void;
  onBecomeMentor: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onExploreCatalog,
  onBecomeMentor,
}) => {
  const steps = [
    {
      number: '01',
      title: 'Kenali Minat dan Kebutuhanmu',
      description:
        'Jawab beberapa pertanyaan singkat tentang minat, pengalaman, tujuan, dan waktu yang kamu miliki untuk belajar. Tidak perlu membuat akun untuk memulai.',
    },
    {
      number: '02',
      title: 'Temukan Rekomendasi yang Sesuai',
      description:
        'Dapatkan rekomendasi kelas dan produk pembelajaran yang selaras dengan kebutuhanmu, lengkap dengan alasan mengapa pilihan tersebut relevan untukmu.',
    },
    {
      number: '03',
      title: 'Sesuaikan dengan Ritmemu',
      description:
        'Pilih cara belajar yang paling nyaman untukmu, mulai dari video singkat dan sesi bersama mentor hingga aktivitas interaktif dan starter kit praktis.',
    },
  ];

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide mb-3 bg-brand-100 text-ink-800 dark:bg-ink-700 dark:text-brand-500">
          <Sparkles className="w-3.5 h-3.5 text-ink-800 dark:text-brand-500" />
          <span>Cara Kerja EmpowerHub</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink-900 dark:text-surface-50 tracking-tight">
          Temukan Cara Belajar yang Tepat untukmu
        </h2>
        <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200">
          Tiga langkah terarah tanpa kerumitan untuk menguasai keterampilan masa depan.
        </p>
      </div>

      {/* Grid 3 Kartu Langkah (01, 02, 03) dengan Badge Solid & Card Elevation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="p-6 sm:p-7 rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 shadow-[0_4px_20px_-4px_rgba(25,25,25,0.08)] hover:shadow-[0_8px_25px_-4px_rgba(25,25,25,0.14)] transition-all duration-300 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              {/* Badge Solid Menonjol */}
              <div className="w-10 h-10 rounded-full bg-brand-500 text-ink-900 font-bold flex items-center justify-center text-sm shadow-sm">
                {step.number}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-ink-900 dark:text-surface-50 leading-snug">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200 leading-relaxed">
                {step.description}
              </p>
            </div>
            <div className="w-8 h-1 bg-surface-300 dark:bg-ink-700 rounded-full" />
          </div>
        ))}
      </div>

      {/* Grid 2 Kartu Callout Besar dengan Card Elevation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* Kartu Kiri: Belajar Sesuai Kebutuhanmu */}
        <div className="p-6 sm:p-8 rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 shadow-[0_4px_20px_-4px_rgba(25,25,25,0.08)] hover:shadow-[0_8px_25px_-4px_rgba(25,25,25,0.14)] transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
          <div className="space-y-3 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-brand-500 text-ink-900 flex items-center justify-center shadow-sm">
              <BookOpen className="w-6 h-6 text-brand-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-ink-900 dark:text-surface-50">
              Belajar Sesuai Kebutuhanmu
            </h3>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200 leading-relaxed max-w-md">
              Temukan kelas, sesi bersama mentor, dan produk pembelajaran yang bisa mendukung tujuanmu. Pilih cara belajar yang sesuai dengan minat, waktu, dan ritmemu.
            </p>
          </div>

          <div className="relative z-10 pt-2">
            <button
              onClick={onExploreCatalog}
              className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm text-ink-700 dark:text-brand-500 hover:underline group-hover:translate-x-1 transition-transform"
            >
              <span>Jelajahi Kelas &amp; Produk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-surface-300/40 dark:bg-ink-700/30 blur-xl pointer-events-none" />
        </div>

        {/* Kartu Kanan: Bagikan Apa yang Kamu Kuasai */}
        <div className="p-6 sm:p-8 rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 shadow-[0_4px_20px_-4px_rgba(25,25,25,0.08)] hover:shadow-[0_8px_25px_-4px_rgba(25,25,25,0.14)] transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
          <div className="space-y-3 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-brand-500 text-ink-900 flex items-center justify-center shadow-sm">
              <Share2 className="w-6 h-6 text-brand-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-ink-900 dark:text-surface-50">
              Bagikan Apa yang Kamu Kuasai
            </h3>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200 leading-relaxed max-w-md">
              Pengalaman dan keahlianmu punya nilai. Bagikan melalui kelas atau produk, jangkau pembelajar yang tepat, dan buka peluang untuk mendapatkan penghasilan dari hal yang kamu kuasai.
            </p>
          </div>

          <div className="relative z-10 pt-2">
            <button
              onClick={onBecomeMentor}
              className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm text-ink-700 dark:text-brand-500 hover:underline group-hover:translate-x-1 transition-transform"
            >
              <span>Mulai Jadi Mentor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-brand-400/15 blur-xl pointer-events-none" />
        </div>

      </div>

    </div>
  );
};
