import { Product, UserAccount } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-vibe-coding',
    title: 'Pengenalan Vibe Coding',
    tagline: 'Membangun aplikasi web interaktif berkecepatan tinggi dengan AI assistance tanpa friksi teknis.',
    description: 'Pelajari metodologi vibe coding modern: mengubah ide bisnis, prototipe, dan visual menjadi aplikasi web fungsional dalam hitungan jam menggunakan generative AI dan best-practices frontend.',
    price: 0,
    formattedPrice: 'Gratis',
    category: 'Teknologi & Digital',
    type: 'video',
    typeLabel: 'Video Singkat',
    mentorName: 'Rian Dirgantara',
    mentorRole: 'Lead Frontend AI Architect',
    mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 312,
    studentCount: 1420,
    durationOrSpecs: '45 Menit · 5 Modul Video',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&auto=format&fit=crop&q=80',
    badgeHighlight: 'Populer · Akses Bebas',
    keyTakeaways: [
      'Memahami mindset kolaborasi AI: prompting terstruktur vs syntax boilerplate',
      'Teknik dekomposisi fitur dan scaffolding proyek modern dengan Vite & Tailwind',
      'Debugging berbasis observasi visual dan iterative feedback loops',
      'Deploy instan ke cloud environment tanpa setup server rumit'
    ],
    lessons: [
      { id: 'vc-1', title: '01. Apa itu Vibe Coding dan Mengapa Mengubah Industri', duration: '08:15', type: 'video', summary: 'Pengenalan konsep kolaborasi manusia-AI dalam software craftmanship.' },
      { id: 'vc-2', title: '02. Menyiapkan Canvas Mental & Desain Dekomposisi', duration: '10:40', type: 'video', summary: 'Menyusun arsitektur sistem sebelum menulis prompt pertama.' },
      { id: 'vc-3', title: '03. Hands-on: Membangun Komponen Reaktif dalam 10 Menit', duration: '12:20', type: 'interactive', summary: 'Praktik langsung membuat widget dinamis dengan feedback instan.' },
      { id: 'vc-4', title: '04. Teknik Iterasi & Menghindari Halusinasi Kode', duration: '09:05', type: 'video', summary: 'Strategi refactoring modular dan test compile berkesinambungan.' },
      { id: 'vc-5', title: '05. Peluncuran & Langkah Selanjutnya', duration: '05:30', type: 'reading', summary: 'Roadmap pengembangan portofolio mandiri.' },
    ],
    resources: [
      { title: 'Cheatsheet Prompting Vibe Coding (PDF)', type: 'PDF' },
      { title: 'Starter Template Github Boilerplate', type: 'ZIP' },
    ]
  },
  {
    id: 'prod-gsuite-pemula',
    title: 'Kelas Google Workspace untuk Pemula',
    tagline: 'Optimalkan alur kerja digital harian, kolaborasi tim, dan otomasi spreadsheet praktis.',
    description: 'Panduan kurikulum terstruktur (MOOC) dari dasar hingga mahir menggunakan Google Docs, Sheets, Drive, Slides, dan Forms untuk meningkatkan efisiensi kerja profesional hingga 300%.',
    price: 79000,
    formattedPrice: 'Rp 79.000',
    category: 'Produktivitas',
    type: 'mooc',
    typeLabel: 'MOOC Terstruktur',
    mentorName: 'Dewi Sartika',
    mentorRole: 'Digital Productivity Consultant',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 4.85,
    reviewCount: 184,
    studentCount: 890,
    durationOrSpecs: '6 Jam Belajar · 18 Video + Kuis',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&auto=format&fit=crop&q=80',
    badgeHighlight: 'Best Seller',
    keyTakeaways: [
      'Master formula penting Google Sheets (XLOOKUP, QUERY, IMPORTRANGE)',
      'Pengorganisasian cloud drive cerdas dengan sistem hak akses kolaboratif',
      'Desain presentasi memikat di Google Slides dalam hitungan menit',
      'Sertifikat kelulusan terverifikasi dan template siap pakai'
    ],
    lessons: [
      { id: 'gw-1', title: 'Modul 1: Ekosistem Workspace & Efisiensi Cloud', duration: '22:00', type: 'video', summary: 'Fondasi manajemen akun, sinkronisasi file, dan pintasan keyboard sakti.' },
      { id: 'gw-2', title: 'Modul 2: Google Docs Kolaboratif & Smart Chips', duration: '35:10', type: 'video', summary: 'Menggunakan smart canvas, template resume, dan live editing bersama.' },
      { id: 'gw-3', title: 'Modul 3: Google Sheets Analitik untuk Non-Programmer', duration: '48:30', type: 'interactive', summary: 'Membuat dashboard visual dinamis dan kalkulasi otomatis.' },
      { id: 'gw-4', title: 'Modul 4: Formulir & Otomasi Pengumpulan Data', duration: '30:15', type: 'video', summary: 'Menghubungkan respon survei langsung ke sheet analitik.' },
      { id: 'gw-5', title: 'Modul 5: Proyek Akhir & Kuis Sertifikasi', duration: '45:00', type: 'worksheet', summary: 'Studi kasus nyata menyelesaikan masalah operasional kantor.' },
    ],
    resources: [
      { title: 'Pack 20+ Template Google Sheets Finansial & Operasional', type: 'Spreadsheet' },
      { title: 'Buku Panduan Shortcut Keyboard Google Workspace', type: 'PDF' },
    ]
  },
  {
    id: 'prod-skill-income',
    title: 'Akses Tools: Skill to Income Studio',
    tagline: 'Kalkulator konversi keahlian, generator penawaran klien, dan roadmap monetisasi mandiri.',
    description: 'Aplikasi web interaktif berfitur lengkap untuk memetakan keahlian unik Anda, menghitung estimasi pricing jasa/produk digital, serta menyusun surat penawaran teruji.',
    price: 49000,
    formattedPrice: 'Rp 49.000',
    category: 'Teknologi & Digital',
    type: 'tool',
    typeLabel: 'Web App / Tool',
    mentorName: 'Arif Wicaksono',
    mentorRole: 'Creator Economy Strategist',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 4.92,
    reviewCount: 95,
    studentCount: 520,
    durationOrSpecs: 'Akses Web App Penuh + Lisensi Komersial',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&auto=format&fit=crop&q=80',
    badgeHighlight: 'Akses Sekali Seumur Hidup',
    keyTakeaways: [
      'Alat audit portofolio & validasi positioning pasar berbasis data',
      'Kalkulator tarif jasa hourly vs project-based vs value-based',
      'Generator naskah proposal klien siap kirim dengan tingkat konversi tinggi',
      'Pembaruan berkala fitur tools tanpa biaya langganan tambahan'
    ],
    lessons: [
      { id: 'sti-1', title: 'Panduan Onboarding & Setup Workspace Studio', duration: '12:00', type: 'video', summary: 'Cara login dan memanfaatkan dashboard analisa skill.' },
      { id: 'sti-2', title: 'Kalkulasi Nilai Jam Kerja & Margin Keuntungan Ideal', duration: '18:40', type: 'interactive', summary: 'Memasukkan biaya operasional dan target laba bulanan.' },
      { id: 'sti-3', title: 'Mengunduh Hasil Laporan & Script Pitching Klien', duration: '10:15', type: 'reading', summary: 'Ekspor proposal profesional berformat PDF atau teks langsung.' }
    ],
    resources: [
      { title: 'Tautan Akses Aplikasi Web (Direct Portal)', type: 'Web Link' },
      { title: 'Checklist Negosiasi Kontrak Freelance 2026', type: 'PDF' }
    ]
  },
  {
    id: 'prod-journal-healing',
    title: 'Worksheet Journaling Emotional Healing',
    tagline: 'Panduan reflektif 30 hari untuk merawat kesehatan mental, kesadaran diri, dan fokus positif.',
    description: 'Buku kerja digital interaktif berformat PDF printable dan tablet-friendly (GoodNotes/Notability). Dirancang bersama psikolog untuk membantu memproses stres harian, regulasi emosi, dan mengenali batasan diri.',
    price: 29000,
    formattedPrice: 'Rp 29.000',
    category: 'Wellness & Self-Growth',
    type: 'pdf',
    typeLabel: 'Unduhan PDF & Printables',
    mentorName: 'Nadira Putri, M.Psi.',
    mentorRole: 'Clinical Psychologist & Mindfulness Coach',
    mentorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rating: 4.96,
    reviewCount: 420,
    studentCount: 1680,
    durationOrSpecs: 'PDF 48 Halaman Interaktif + Audio Panduan',
    thumbnail: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=700&auto=format&fit=crop&q=80',
    badgeHighlight: 'Rekomendasi Psikolog',
    keyTakeaways: [
      '30 lembar prompt harian berakar dari Cognitive Behavioral Therapy (CBT)',
      'Pelacak suasana hati (Mood & Habit Tracker) visual estetik',
      'Panduan grounding visual untuk mengatasi kecemasan mendadak',
      'Format digital fillable dan versi siap cetak monokrom hemat tinta'
    ],
    lessons: [
      { id: 'jh-1', title: 'Pengantar: Membangun Ruang Aman Refleksi Harian', duration: '14:20', type: 'video', summary: 'Waktu terbaik journaling dan cara merangkul kejujuran emosional.' },
      { id: 'jh-2', title: 'Lembar Refleksi Minggu 1: Eksplorasi Pemicu Emosi', duration: '08:00', type: 'worksheet', summary: 'Latihan mengenali pola pikiran yang melelahkan.' },
      { id: 'jh-3', title: 'Lembar Refleksi Minggu 2: Batasan Sehat & Self-Compassion', duration: '09:30', type: 'worksheet', summary: 'Teknik menetapkan batasan tanpa rasa bersalah.' },
      { id: 'jh-4', title: 'Audio Grounding 5 Menit (Relaksasi Terpandu)', duration: '05:00', type: 'interactive', summary: 'Audio pernapasan menenangkan detak jantung.' }
    ],
    resources: [
      { title: 'Worksheet Emotional Healing 48 Hal (Fillable PDF)', type: 'PDF' },
      { title: 'Audio Meditasi Relaksasi (MP3)', type: 'Audio' }
    ]
  },
  {
    id: 'prod-mitra-pasardaya',
    title: 'Jurnal Konsisten Branding',
    tagline: 'Template strategis memetakan identitas brand, content calendar, dan narasi bisnis autentik.',
    description: 'Produk kolaborasi resmi mitra Pasar Daya. Disusun untuk solopreneur, kreator konten, dan UMKM agar memiliki fondasi visual dan pesan promosi yang kohesif selama 90 hari ke depan.',
    price: 35000,
    formattedPrice: 'Rp 35.000',
    category: 'Produktivitas',
    type: 'affiliate',
    typeLabel: 'Produk Afiliasi Pasar Daya',
    mentorName: 'Tim Kurator Pasar Daya',
    mentorRole: 'Ekosistem Produk Berdaya',
    mentorAvatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    rating: 4.88,
    reviewCount: 215,
    studentCount: 780,
    durationOrSpecs: 'Workbook Digital + Notion Hub + Lisensi',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&auto=format&fit=crop&q=80',
    isAffiliate: true,
    affiliateBadge: 'Mitra Pasar Daya',
    affiliateUrl: 'https://pasardaya.vercel.app',
    badgeHighlight: 'Kolaborasi Eksklusif',
    keyTakeaways: [
      'Menemukan suara brand unik (Brand Voice, Archetype, & Value Statement)',
      'Bank ide konten 90 hari untuk Instagram, LinkedIn, dan TikTok',
      'Template audit estetika feed dan copywriting hook pembuka pesan',
      'Terkoneksi langsung dengan katalog resmi pasardaya.vercel.app'
    ],
    lessons: [
      { id: 'pd-1', title: 'Fondasi Brand: Siapa Anda & Untuk Siapa Anda Ada', duration: '15:00', type: 'video', summary: 'Pembeda antara jualan produk dan membangun loyalitas komunitas.' },
      { id: 'pd-2', title: 'Struktur Kalender Konten 3 Pilar Utama', duration: '20:10', type: 'reading', summary: 'Membagi konten Edukasi, Inspirasi, dan Konversi secara proporsional.' },
      { id: 'pd-3', title: 'Menerapkan Worksheet Pasar Daya', duration: '10:00', type: 'interactive', summary: 'Integrasi dengan ekosistem Pasar Daya.' }
    ],
    resources: [
      { title: 'Jurnal Konsisten Branding Workbook (PDF)', type: 'PDF' },
      { title: 'Tautan Ekosistem Pasar Daya (pasardaya.vercel.app)', type: 'Web Link' }
    ]
  },
  {
    id: 'prod-ai-workflows',
    title: 'Mastering Prompting & AI Workflows',
    tagline: 'Kuasai teknik engineering prompt tingkat lanjut untuk riset, penulisan, dan otomasi kerja harian.',
    description: 'Kupas tuntas seni berdialog dengan LLM generasi terbaru. Dapatkan koleksi 150+ prompt teruji, formula role-context-task-constraint, dan cara membangun agen mandiri sederhana.',
    price: 99000,
    formattedPrice: 'Rp 99.000',
    category: 'Teknologi & Digital',
    type: 'video',
    typeLabel: 'Video Singkat & Vault',
    mentorName: 'Dewi Sartika',
    mentorRole: 'AI Workflow Architect',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 4.94,
    reviewCount: 310,
    studentCount: 1150,
    durationOrSpecs: '2.5 Jam Video + 150 Prompt Library',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&auto=format&fit=crop&q=80',
    badgeHighlight: 'Trending Tech',
    keyTakeaways: [
      'Struktur prompt tingkat lanjut: Few-Shot, Chain-of-Thought, Meta-Prompting',
      'Mengotomasi riset pasar & sintesis dokumen PDF 100+ halaman',
      'Menulis copywriting sales page bergaya natural tanpa terasa kaku',
      'Vault 150+ prompt Notion terorganisir per divisi pekerjaan'
    ],
    lessons: [
      { id: 'ai-1', title: 'Arsitektur Prompt: Mengapa Prompt Biasa Menghasilkan Teks Pasaran', duration: '18:10', type: 'video', summary: 'Anatomi instruksi tingkat tinggi yang presisi.' },
      { id: 'ai-2', title: 'Framework RCTO (Role, Context, Task, Output constraints)', duration: '24:00', type: 'video', summary: 'Metode universal untuk hasil AI yang siap pakai seketika.' },
      { id: 'ai-3', title: 'Mengakses Vault 150+ Prompt dan Kustomisasi Cepat', duration: '15:20', type: 'reading', summary: 'Pemanfaatan database template siap salin.' },
      { id: 'ai-4', title: 'Studi Kasus Otomasi Laporan Mingguan', duration: '22:15', type: 'interactive', summary: 'Mengubah transkrip rapat acak menjadi action-items rapi.' }
    ],
    resources: [
      { title: 'Akses Notion Vault: 150+ Prompt Formula Terverifikasi', type: 'Notion' },
      { title: 'Diagram Alur Kerja AI Efisien 2026', type: 'PDF' }
    ]
  },
  {
    id: 'prod-mentoring-1on1',
    title: '1-on-1 Mentoring: Karir Tech & Portfolio Review',
    tagline: 'Sesi privat 60 menit via video call untuk bedah CV, portofolio, dan strategi karir global.',
    description: 'Dapatkan tinjauan mendalam langsung dari mentor berpengalaman. Cocok untuk Anda yang sedang mempersiapkan diri melamar pekerjaan tech, freelance luar negeri, atau transisi karir (career switcher).',
    price: 149000,
    formattedPrice: 'Rp 149.000',
    category: 'Karir & Mentoring',
    type: 'mentoring',
    typeLabel: '1-on-1 Mentoring',
    mentorName: 'Bayu Danurwenda',
    mentorRole: 'Staff Engineering Manager & Career Coach',
    mentorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 4.98,
    reviewCount: 88,
    studentCount: 165,
    durationOrSpecs: '60 Menit Live Google Meet + Ringkasan Tertulis',
    thumbnail: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=700&auto=format&fit=crop&q=80',
    badgeHighlight: 'Slot Terbatas',
    keyTakeaways: [
      'Review baris demi baris CV format ATS dan LinkedIn profile optimization',
      'Bedah arsitektur proyek portofolio agar memikat hiring manager',
      'Simulasi mock interview teknis / behavioral dengan umpan balik langsung',
      'Rangkuman rencana aksi 30 hari tertulis pasca sesi konsultasi'
    ],
    lessons: [
      { id: 'men-1', title: 'Kuesioner Pra-Sesi & Pengumpulan Tautan Portofolio', duration: '15:00', type: 'worksheet', summary: 'Mengisi form aspirasi dan tantangan karir yang dihadapi.' },
      { id: 'men-2', title: 'Pilih Jadwal Kalender Sesi (Google Calendar Sync)', duration: '05:00', type: 'interactive', summary: 'Pilih slot waktu sesuai fleksibilitas Anda.' },
      { id: 'men-3', title: 'Pelaksanaan Sesi 1-on-1 Live Mentoring', duration: '60:00', type: 'video', summary: 'Diskusi intensif bersama mentor terpilih.' },
      { id: 'men-4', title: 'Menerima Action Plan & Rekaman Konsultasi', duration: '10:00', type: 'reading', summary: 'Dokumen evaluasi dan rekaman video sesi untuk dipelajari kembali.' }
    ],
    resources: [
      { title: 'Template CV Standar Internasional Format ATS', type: 'Docs' },
      { title: 'Panduan Negosiasi Gaji & Benefit Tech', type: 'PDF' }
    ]
  },
  {
    id: 'prod-notion-life-os',
    title: 'Notion Life OS & Financial Dashboard',
    tagline: 'Satu sistem terpadu untuk kelola target hidup, keuangan pribadi, tugas harian, dan kebiasaan.',
    description: 'Template Notion terstruktur dengan metodologi Second Brain & PARA (Projects, Areas, Resources, Archives). Dilengkapi kalkulator budgeting otomatis, monthly review, dan pelacak habit visual.',
    price: 39000,
    formattedPrice: 'Rp 39.000',
    category: 'Produktivitas',
    type: 'template',
    typeLabel: 'Template Notion',
    mentorName: 'Siti Rahmania',
    mentorRole: 'Productivity Architect & Notion Ambassador',
    mentorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 4.89,
    reviewCount: 260,
    studentCount: 1040,
    durationOrSpecs: 'Template Siap Duplikasi + Video Tutorial 30 Menit',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=700&auto=format&fit=crop&q=80',
    badgeHighlight: 'Favorit Solopreneur',
    keyTakeaways: [
      'Dashboard All-in-One: tugas hari ini, jadwal minggu ini, dan prioritas kuartalan',
      'Sistem keuangan 50-30-20 dengan pencatatan pemasukan & pengeluaran ringkas',
      'Database Second Brain untuk menyimpan catatan buku, podcast, dan ide penting',
      'Video tutorial cara duplikasi dan penyesuaian estetika tampilan Notion'
    ],
    lessons: [
      { id: 'nt-1', title: 'Tutorial Duplikasi & Penyesuaian Ruang Kerja Notion', duration: '12:00', type: 'video', summary: 'Cara aman duplikasi ke akun Notion gratis maupun berbayar.' },
      { id: 'nt-2', title: 'Manajemen Keuangan Bulanan & Analisa Arus Kas', duration: '10:30', type: 'interactive', summary: 'Menggunakan database formula untuk mengecek sisa bujet harian.' },
      { id: 'nt-3', title: 'Membangun Rutinitas Review Mingguan (Weekly Reset)', duration: '08:45', type: 'reading', summary: 'Menjaga dashboard tetap relevan dan tidak terbengkalai.' }
    ],
    resources: [
      { title: 'Tautan Duplikasi Template Notion Life OS 2026', type: 'Notion Link' },
      { title: 'Panduan Instalasi Widget Jam & Cuaca Estetik', type: 'PDF' }
    ]
  },
  {
    id: 'prod-python-otomasi',
    title: 'Otomasi Workflow AI & Scripting Praktis',
    tagline: 'Gunakan skrip Python sederhana untuk menarik data otomatis dan menyusun laporan kilat.',
    description: 'Draf kurikulum baru yang diajukan oleh Dewi Sartika. Berisi 4 modul pembuatan skrip otomatisasi tanpa sintaks kompleks menggunakan template teruji.',
    price: 49000,
    formattedPrice: 'Rp 49.000',
    category: 'Teknologi & Digital',
    type: 'video',
    typeLabel: 'Video Singkat',
    mentorName: 'Dewi Sartika',
    mentorRole: 'Digital Productivity Consultant',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewCount: 0,
    studentCount: 0,
    durationOrSpecs: '1.5 Jam Video + Source Code',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80',
    status: 'pending',
    badgeHighlight: 'Modul Baru',
    keyTakeaways: [
      'Memahami dasar otomasi data tanpa error',
      'Integrasi API sederhana dengan output CSV rapi',
      'Template siap jalankan di Google Colab cloud'
    ],
    lessons: [
      { id: 'po-1', title: '01. Pengenalan Scripting AI tanpa Ribet', duration: '15:00', type: 'video', summary: 'Menjalankan skrip pertama di browser.' },
      { id: 'po-2', title: '02. Otomasi Ekstrak Ringkasan Dokumen', duration: '25:00', type: 'interactive', summary: 'Merapikan data acak.' }
    ],
    resources: [
      { title: 'Notebook Google Colab Siap Pakai', type: 'Python' }
    ]
  }
];

export const INITIAL_USER_ACCOUNT: UserAccount = {
  id: 'usr-dewi-sartika',
  name: 'Dewi Sartika',
  email: 'dewi.sartika@empowerhub.id',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  headline: 'Digital Productivity Consultant & Continuous Learner',
  bio: 'Praktisi teknologi yang bersemangat dalam memberdayakan generasi baru melalui skill vibe coding dan otomasi cerdas. Senang belajar sekaligus berbagi!',
  enrolledCourses: [
    {
      productId: 'prod-vibe-coding',
      enrolledAt: '12 Maret 2026',
      progressPercent: 60,
      lastLessonId: 'vc-3',
      completedLessonIds: ['vc-1', 'vc-2', 'vc-3'],
      notes: 'Sangat impresif metode scaffolding langsung dengan generative prompt. Lanjut selesaikan modul 4 malam ini.'
    },
    {
      productId: 'prod-journal-healing',
      enrolledAt: '28 Februari 2026',
      progressPercent: 100,
      lastLessonId: 'jh-4',
      completedLessonIds: ['jh-1', 'jh-2', 'jh-3', 'jh-4'],
      notes: 'Prompt hari ke-14 tentang batasan diri sangat membantu relaksasi saat deadline padat.'
    },
    {
      productId: 'prod-skill-income',
      enrolledAt: '05 April 2026',
      progressPercent: 33,
      lastLessonId: 'sti-1',
      completedLessonIds: ['sti-1'],
      notes: 'Sudah mencoba kalkulator rate hourly, ketemu angka yang rasional untuk klien overseas.'
    }
  ],
  mentoredCourses: [
    {
      productId: 'prod-gsuite-pemula',
      createdAt: '15 Januari 2026',
      activeStudents: 890,
      totalRevenue: 70310000,
      averageRating: 4.85,
      status: 'published'
    },
    {
      productId: 'prod-ai-workflows',
      createdAt: '10 Februari 2026',
      activeStudents: 1150,
      totalRevenue: 113850000,
      averageRating: 4.94,
      status: 'published'
    },
    {
      productId: 'prod-python-otomasi',
      createdAt: '16 Oktober 2026',
      activeStudents: 0,
      totalRevenue: 0,
      averageRating: 5.0,
      status: 'pending',
      adminFeedback: 'Menunggu review mutu modul video dan ringkasan studi kasus oleh tim Admin.'
    }
  ]
};
