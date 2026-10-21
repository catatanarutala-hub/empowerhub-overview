import React from 'react';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import heroWomanImage from '../assets/images/hero_woman_laptop_1792224892450.jpg';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onBecomeMentor: () => void;
  onOpenAssessment: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onBecomeMentor,
  onOpenAssessment,
}) => {
  return (
    <div className="pt-2 sm:pt-4 pb-8 relative">
      {/* Container Banner Lebar dengan Gradasi Organik Muted Plum -> Mauve -> Blush */}
      <div className="rounded-3xl sm:rounded-[36px] overflow-hidden shadow-xl bg-gradient-to-r from-ink-900 via-ink-800 to-ink-600 text-white relative">
        
        {/* Soft Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/15 rounded-full blur-3xl pointer-events-none" />

        {/* 2-Column Grid di Desktop dengan Padding Proporsional (Ringkas & Tidak Terlalu Tinggi) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center min-h-[380px] sm:min-h-[420px]">
          
          {/* Sisi Kiri: Teks & Tombol (Padding py-10 sm:py-14 px-6 sm:px-12) */}
          <div className="lg:col-span-7 py-10 sm:py-14 px-6 sm:px-12 space-y-4 sm:space-y-5 text-center lg:text-left">
            
            {/* Badge Kecil */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-white/20 backdrop-blur-xs text-white border border-white/25 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>MULAI DARI LANGKAH KECIL</span>
            </div>

            {/* Judul Hero */}
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-white leading-[1.18]">
              Saatnya Potensimu <br className="hidden sm:inline" />
              <span className="text-brand-500">Menemukan Jalannya</span>
            </h1>

            {/* Subjudul Soft Ivory / Putih Gading */}
            <p className="text-sm sm:text-base lg:text-lg text-brand-10/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Ruang belajar inklusif bagi perempuan untuk memperluas wawasan, mengasah kemampuan, dan menjelajahi berbagai kesempatan.
            </p>

            {/* Tombol CTA */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 flex-wrap">
              {/* Tombol Utama: Orange (brand-400) */}
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3 rounded-2xl font-black text-xs sm:text-sm bg-brand-400 hover:bg-brand-300 text-ink-900 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Temukan Kelas &amp; Produk</span>
                <ArrowRight className="w-4 h-4 text-ink-900" />
              </button>

              {/* Tombol Sekunder: Outline Putih */}
              <button
                onClick={onBecomeMentor}
                className="px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm border-2 border-white/40 text-white hover:bg-white/10 hover:border-white flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Bagikan Keahlianmu</span>
              </button>
            </div>
          </div>

          {/* Sisi Kanan: Foto Portrait Perempuan Menyatu Organik Tanpa Garis Kaku */}
          <div className="lg:col-span-5 h-full relative flex items-center justify-center lg:justify-end overflow-hidden p-6 lg:p-0">
            <div className="relative w-full max-w-md lg:max-w-none h-64 sm:h-72 lg:h-[380px] rounded-2xl lg:rounded-none overflow-hidden [mask-image:linear-gradient(to_left,black_75%,transparent)] sm:[mask-image:linear-gradient(to_left,black_80%,transparent)]">
              <img
                src={heroWomanImage}
                alt="Perempuan ramah sedang belajar di depan laptop"
                className="w-full h-full object-cover object-center lg:object-right filter contrast-[1.02] brightness-[1.01]"
              />

              {/* Seamless Overlay Blend dari kiri ke foto */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink-800 via-ink-800/60 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/35 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

      </div>

      {/* Floating Pill Asesmen Terintegrasi - Responsive Mobile & Desktop */}
      <div className="relative z-20 -mt-6 sm:-mt-7 max-w-2xl mx-auto px-2 sm:px-4">
        <div
          onClick={onOpenAssessment}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onOpenAssessment();
            }
          }}
          className="w-[92%] sm:w-auto max-w-2xl mx-auto rounded-2xl sm:rounded-full p-3 sm:px-5 sm:py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4 shadow-md bg-white dark:bg-ink-800 border border-surface-300 dark:border-ink-700 transition-all duration-300 hover:shadow-lg cursor-pointer text-left group"
        >
          {/* Sisi Kiri: Ikon & Teks Panduan Asesmen */}
          <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-500 text-ink-900 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-ink-600 transition-colors">
              <BookOpen className="w-4 h-4 text-brand-500" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-white leading-snug">
                Bingung Memilih Keterampilan yang Paling Tepat?
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-300 mt-0.5">
                Jawab pertanyaan singkat kesiapan dan kebutuhanmu.
              </p>
            </div>
          </div>

          {/* Sisi Kanan: Tombol CTA Kapsul Butter Yellow */}
          <div className="w-full sm:w-auto text-center px-4 py-1.5 text-xs font-semibold rounded-full bg-brand-400 text-stone-900 whitespace-nowrap shadow-xs group-hover:bg-brand-300 transition-colors flex items-center justify-center gap-1.5 shrink-0 self-stretch sm:self-auto">
            <span>Mulai Asesmen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

    </div>
  );
};
