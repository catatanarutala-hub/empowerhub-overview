import React from 'react';
import { 
  GraduationCap, 
  ExternalLink, 
  Sparkles, 
  DollarSign, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export const BecomeMentorPage: React.FC = () => {
  const mentorBenefits = [
    {
      icon: DollarSign,
      title: 'Monetisasi Keahlian Transparan',
      description:
        'Dapatkan bagi hasil yang adil dari setiap peserta yang mendaftar di kelas atau membeli produk digital Anda tanpa potongan tersembunyi.',
    },
    {
      icon: Clock,
      title: 'Waktu Fleksibel Sesuai Ritmemu',
      description:
        'Anda menentukan sendiri format materi: video on-demand, lembar kerja PDF, atau sesi 1-on-1 saat akhir pekan.',
    },
    {
      icon: Users,
      title: 'Jangkau Ribuan Pembelajar Aktif',
      description:
        'Terhubung langsung dengan komunitas talenta yang antusias belajar dan siap bertumbuh bersama panduan praktis Anda.',
    },
    {
      icon: ShieldCheck,
      title: 'Dukungan Penyusunan Kurikulum',
      description:
        'Tim kurator EmpowerHub dan Pasar Daya membantu memoles silabus agar ramah pemula dan siap tayang.',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Daftar Tiket Akses Mentor',
      desc: 'Buka portal mitra resmi Pasar Daya dan daftarkan profil keahlian Anda.',
    },
    {
      num: '02',
      title: 'Validasi & Kurasi Topik',
      desc: 'Tim kurator membantu memetakan materi agar tepat sasaran dan mudah dipahami.',
    },
    {
      num: '03',
      title: 'Susun Silabus / Modul',
      desc: 'Unggah video singkat, dokumen PDF, atau template kerja yang Anda siapkan.',
    },
    {
      num: '04',
      title: 'Publikasi & Dapatkan Penghasilan',
      desc: 'Kelas Anda tayang di katalog publik EmpowerHub dan mulai menjangkau peserta.',
    },
  ];

  return (
    <div className="py-6 sm:py-10 space-y-12 animate-in fade-in duration-200">
      
      {/* Hero Mentor */}
      <div className="rounded-3xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 p-6 sm:p-12 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-brand-400 text-ink-900 shadow-xs">
            <GraduationCap className="w-4 h-4 text-ink-700" />
            <span>Peluang Mentor &amp; Kreator Pembelajaran</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-900 dark:text-white tracking-tight leading-tight">
            Bagikan Keahlianmu, Inspirasi Ribuan Pembelajar, dan Bangun Penghasilan
          </h1>

          <p className="text-sm sm:text-base text-ink-600 dark:text-ink-200 max-w-2xl mx-auto leading-relaxed">
            Pengalaman kerjamu bernilai tinggi bagi mereka yang baru memulai. Bergabunglah sebagai mentor EmpowerHub melalui ekosistem kurasi <strong>Pasar Daya</strong>.
          </p>

          {/* Tombol CTA Menonjol */}
          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            <a
              href="https://pasardaya.vercel.app/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl font-black text-sm sm:text-base bg-brand-400 hover:bg-brand-300 text-ink-900 flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
            >
              <span>Daftar Jadi Mentor di Pasar Daya</span>
              <ExternalLink className="w-5 h-5 text-ink-900" />
            </a>
          </div>

          <p className="text-[11px] text-ink-400 dark:text-ink-300">
            Terkoneksi langsung dengan portal resmi pendaftaran mitra: pasardaya.vercel.app/index.html
          </p>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-100/60 dark:bg-ink-700/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-400/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Keuntungan Membagikan Skill */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-700 dark:text-brand-500">
            Manfaat Bergabung
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-ink-900 dark:text-white mt-1">
            Kenapa Mengajar di EmpowerHub?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mentorBenefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 shadow-xs hover:border-brand-400 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-ink-700 text-ink-700 dark:text-brand-500 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-ink-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ink-600 dark:text-ink-200 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Langkah Menjadi Mentor */}
      <div className="rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 p-6 sm:p-10 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-700 dark:text-brand-500">
            Alur Pendaftaran
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-ink-900 dark:text-white mt-1">
            4 Langkah Mudah Memulai
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((st) => (
            <div key={st.num} className="space-y-2 p-4 rounded-2xl bg-surface-100 dark:bg-ink-900 border border-surface-300 dark:border-ink-700">
              <span className="text-xs font-black text-ink-700 dark:text-brand-500 font-mono px-2 py-0.5 rounded bg-white dark:bg-ink-800 inline-block">
                Langkah {st.num}
              </span>
              <h4 className="font-bold text-sm text-ink-900 dark:text-white pt-1">
                {st.title}
              </h4>
              <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Final CTA Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-brand-500 text-ink-900 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black">
              Siap Memulai Perjalanan Pengajaranmu?
            </h3>
            <p className="text-xs sm:text-sm text-ink-800 max-w-md">
              Dapatkan tiket akses mentor di Pasar Daya dan nikmati kebebasan berbagi ilmu secara berkelanjutan.
            </p>
          </div>

          <a
            href="https://pasardaya.vercel.app/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm bg-brand-400 text-ink-900 hover:bg-brand-300 flex items-center gap-2 shadow-md transition-all shrink-0"
          >
            <span>Daftar Jadi Mentor di Pasar Daya ↗</span>
          </a>
        </div>
      </div>

    </div>
  );
};
