import React from 'react';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Rina',
      age: 34,
      role: 'Ibu Rumah Tangga & Pengusaha Kue',
      badge: 'Alumni Vibe Coding',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
      story:
        'Materi vibe coding-nya sangat membumi, tanpa istilah ribet. Sekarang saya bisa bantu kelola inventaris usaha kue dari rumah.',
      highlight: 'Hemat 3 jam pencatatan per hari',
    },
    {
      id: 2,
      name: 'Sarah',
      age: 26,
      role: 'Career Switcher',
      badge: 'Peserta Asesmen Adaptif',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&auto=format&fit=crop&q=80',
      story:
        'Asesmen belajarnya benar-benar akurat menebak hambatan waktu saya. Belajar mandiri jadi tidak terasa membebani.',
      highlight: 'Belajar 20 menit saat malam hari',
    },
    {
      id: 3,
      name: 'Dewi',
      age: 41,
      role: 'Mentor Kerajinan Lokal',
      badge: 'Mitra Kurasi Pasar Daya',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
      story:
        'Bisa monetisasi keahlian lewat bimbingan kurasi EmpowerHub dan terhubung ke pasar yang tepat.',
      highlight: 'Menghasilkan dari 120+ pembelajar',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide mb-3 bg-brand-100 text-ink-800 dark:bg-ink-700 dark:text-brand-500">
          <Sparkles className="w-3.5 h-3.5 text-ink-800 dark:text-brand-500" />
          <span>Kisah Nyata Pemberdayaan</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink-900 dark:text-surface-50 tracking-tight">
          Cerita Mereka yang Bertumbuh Bersama EmpowerHub
        </h2>
        <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200">
          Dari ibu rumah tangga hingga mentor terampil, belajar dengan tempo sendiri membawa perubahan nyata.
        </p>
      </div>

      {/* Grid 3 Kartu Testimoni dengan Card Elevation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-6 sm:p-7 rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 flex flex-col justify-between space-y-6 shadow-[0_4px_20px_-4px_rgba(25,25,25,0.08)] hover:shadow-[0_8px_25px_-4px_rgba(25,25,25,0.14)] hover:border-brand-400 dark:hover:border-brand-400/60 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Top row: Avatar, Info, and Star Rating */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-brand-400/50 shadow-xs"
                  />
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-ink-900 dark:text-surface-50 leading-tight">
                      {item.name} ({item.age} th)
                    </h3>
                    <p className="text-[11px] text-ink-700 dark:text-brand-500 font-semibold">
                      {item.role}
                    </p>
                  </div>
                </div>

                <Quote className="w-7 h-7 text-ink-400/30 dark:text-brand-500/40 shrink-0" />
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-brand-500 text-brand-500"
                  />
                ))}
              </div>

              {/* Story Quote */}
              <p className="text-xs sm:text-sm text-ink-700 dark:text-surface-300 leading-relaxed italic">
                &ldquo;{item.story}&rdquo;
              </p>
            </div>

            {/* Bottom Tag / Impact */}
            <div className="pt-3 border-t border-surface-300 dark:border-ink-700 flex items-center justify-between text-[11px]">
              <span className="font-medium text-ink-400 dark:text-ink-300">
                {item.badge}
              </span>
              <span className="font-bold text-ink-700 dark:text-brand-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {item.highlight}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
