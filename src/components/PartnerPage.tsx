import React from 'react';
import { 
  Building2, 
  HeartHandshake, 
  ExternalLink, 
  Users, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  Award,
  Globe2,
  ArrowRight,
  Send
} from 'lucide-react';

export const PartnerPage: React.FC = () => {
  const partnerTypes = [
    {
      icon: Users,
      title: 'Komunitas & Organisasi Perempuan',
      description:
        'Kolaborasi pelatihan digital inklusif untuk anggota komunitas, mencakup keterampilan vibe coding, digital marketing, hingga literasi emosional.',
    },
    {
      icon: Building2,
      title: 'Perusahaan & Lembaga Korporasi',
      description:
        'Program Corporate Social Responsibility (CSR), pelatihan upskilling karyawan non-teknis, dan penyaluran talenta terampil siap kerja.',
    },
    {
      icon: GraduationCap,
      title: 'Kampus & Lembaga Pendidikan',
      description:
        'Integrasi kurikulum praktis siap industri untuk melengkapi materi akademis mahasiswa dengan portofolio terverifikasi.',
    },
  ];

  const benefits = [
    'Kurikulum siap pakai yang disusun langsung oleh praktisi industri',
    'Dashboard monitoring progres peserta dan laporan dampak berkala',
    'Sertifikasi resmi kolaboratif bertaraf nasional dan terverifikasi digital',
    'Publikasi dan eksposur kegiatan bersama jaringan media EmpowerHub',
  ];

  return (
    <div className="py-6 sm:py-10 space-y-12 animate-in fade-in duration-200">
      
      {/* Hero Partner */}
      <div className="rounded-3xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 p-6 sm:p-12 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-brand-100 dark:bg-ink-700 text-ink-700 dark:text-brand-500">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Kemitraan Strategis &amp; Dampak Sosial</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-900 dark:text-white tracking-tight leading-tight">
            Bersama Memberdayakan Talenta Indonesia Lewat Pendidikan Praktis
          </h1>

          <p className="text-sm sm:text-base text-ink-600 dark:text-ink-200 max-w-2xl mx-auto leading-relaxed">
            EmpowerHub berkolaborasi dengan institusi, korporasi, dan komunitas perempuan untuk menghadirkan pelatihan keterampilan digital yang relevan, fleksibel, dan berdampak nyata.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Isi Formulir Kerja Sama</span>
              <ExternalLink className="w-4 h-4 text-brand-500" />
            </a>
          </div>
        </div>

        {/* Ambient background blur */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-100/60 dark:bg-ink-700/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Tiga Pilar Kemitraan */}
      <div className="space-y-4">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-700 dark:text-brand-500">
            Bentuk Kolaborasi
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-ink-900 dark:text-white mt-1">
            Siapa Saja yang Bisa Bermitra dengan Kami?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {partnerTypes.map((type, i) => {
            const Icon = type.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-ink-700 text-ink-700 dark:text-brand-500 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-ink-900 dark:text-white">
                    {type.title}
                  </h3>
                  <p className="text-xs text-ink-600 dark:text-ink-200 leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nilai Tambah & Keuntungan */}
      <div className="rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-700 dark:text-brand-500">
              Keuntungan Bermitra
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-ink-900 dark:text-white leading-tight">
              Mengapa Berkolaborasi Bersama EmpowerHub?
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200 leading-relaxed">
              Kami memadukan pendekatan pembelajaran praktis tanpa jargon dengan infrastruktur teknologi siap pakai, memudahkan partner meluncurkan program pelatihan dalam hitungan hari.
            </p>

            <div className="space-y-2.5 pt-2">
              {benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-ink-700 dark:text-ink-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl border-2 border-brand-400 bg-surface-100 dark:bg-ink-900 space-y-4 text-center">
              <Sparkles className="w-10 h-10 mx-auto text-ink-700 dark:text-brand-500" />
              <h3 className="text-lg font-black text-ink-900 dark:text-white">
                Mulai Inisiasi Kerja Sama
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-200 max-w-sm mx-auto">
                Ceritakan kebutuhan program atau aspirasi kolaborasi organisasi Anda. Tim kemitraan EmpowerHub akan segera menghubungi Anda dalam 1x24 jam kerja.
              </p>
              <div className="pt-2">
                <a
                  href="https://forms.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-xs bg-brand-500 hover:bg-brand-400 text-ink-900 shadow-md transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-brand-500" />
                  <span>Isi Formulir Kerja Sama (Google Form)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-brand-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
