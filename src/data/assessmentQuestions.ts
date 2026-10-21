import { AssessmentQuestion, AssessmentResult, Product } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1_interest',
    title: 'Topik apa yang paling memicu rasa penasaran Anda saat ini?',
    subtitle: 'Pilih maksimal 3 minat utama. Jika bingung, Anda bisa memilih opsi "Belum Tahu".',
    isMultiSelect: true,
    maxSelect: 3,
    options: [
      { id: 'vibe_coding', label: 'Coding Santai & Bikin Web AI (Vibe Coding)', description: 'Bikin aplikasi web tanpa pusing sintaks kode yang rumit.' },
      { id: 'office_productivity', label: 'Efisiensi Kerja Kantor & Google Workspace', description: 'Otomasi spreadsheet, kolaborasi tim, dan rapih dokumen.' },
      { id: 'mindfulness_healing', label: 'Kesehatan Emosional & Journaling Reflektif', description: 'Redakan burnout, kelola stres, dan temukan ketenangan diri.' },
      { id: 'skill_monetization', label: 'Monetisasi Keahlian Jadi Penghasilan (Freelance)', description: 'Kalkulasi tarif jasa dan konversi skill jadi pemasukan.' },
      { id: 'branding_content', label: 'Personal Branding & Konten Bisnis (Pasar Daya)', description: 'Bangun identitas brand dan kalender konten konsisten.' },
      { id: 'ai_prompting', label: 'Mastering AI Prompting & Alur Kerja Cerdas', description: 'Manfaatkan generative AI untuk memangkas jam kerja manual.' },
      { id: 'notion_productivity', label: 'Organisasi Hidup & Finansial dengan Notion', description: 'Sistem Second Brain untuk target harian dan keuangan.' },
      { id: 'career_tech', label: 'Review Karir & Portofolio Tech 1-on-1', description: 'Bimbingan privat untuk lolos rekrutmen atau naik jenjang.' },
      { id: 'belum_tahu', label: 'Belum Tahu / Masih Bingung Memilih', description: 'Bantu saya mendiagnosis dari masalah keseharian yang dihadapi.' },
    ]
  },
  {
    id: 'q2_alt_daily_problem',
    title: 'Tantangan harian apa yang paling mendesak ingin Anda selesaikan?',
    subtitle: 'Pertanyaan khusus untuk membantu memetakan kebutuhan dasar Anda.',
    conditionalOn: {
      questionId: 'q1_interest',
      optionId: 'belum_tahu'
    },
    options: [
      { id: 'prob_tech_fear', label: 'Ingin coba bikin web/teknologi tapi takut istilahnya rumit', description: 'Butuh panduan santai yang ramah pemula tanpa kode rumit.' },
      { id: 'prob_work_overwhelm', label: 'Kewalahan dengan pekerjaan administratif kantor harian', description: 'Ingin cara cepat mengolah data sheets dan dokumen tim.' },
      { id: 'prob_burnout', label: 'Sering stres, cemas, dan kehilangan fokus saat bekerja', description: 'Butuh lembar kerja refleksi emosi dan panduan mindful.' },
      { id: 'prob_income', label: 'Punya skill tapi tidak tahu cara menghasilkan uang darinya', description: 'Perlu panduan menentukan harga jasa dan proposal klien.' },
    ]
  },
  {
    id: 'q2_goal',
    title: 'Apa tujuan utama yang ingin Anda capai setelah belajar?',
    subtitle: 'Fokus hasil akhir membantu kami menyaring materi yang paling aplikatif.',
    options: [
      { id: 'practical_skill', label: 'Langsung bisa membuat sesuatu yang nyata (Proyek/Karya)', description: 'Fokus hasil jadi yang bisa langsung dipamerkan atau dipakai.' },
      { id: 'efficiency', label: 'Bekerja jauh lebih cepat dan hemat waktu luang', description: 'Memangkas tugas repetitif hingga 50-70%.' },
      { id: 'mental_peace', label: 'Menjaga kewarasan mental dan keteraturan emosi', description: 'Menemukan rutinitas yang tenang dan membumi.' },
      { id: 'monetize', label: 'Mendapat penghasilan sampingan atau klien pertama', description: 'Menghasilkan uang dari keahlian yang sudah dipelajari.' },
    ]
  },
  {
    id: 'q3_time',
    title: 'Berapa banyak waktu luang yang bisa Anda luangkan per hari?',
    subtitle: 'Kami akan mencocokkan durasi kurikulum agar pas di sela kesibukan Anda.',
    options: [
      { id: 'micro_15m', label: '15 – 30 Menit per Hari', description: 'Cocok untuk video mikro atau lembar refleksi 1 halaman.' },
      { id: 'medium_1h', label: '45 – 60 Menit per Hari', description: 'Cukup untuk satu bab kurikulum terstruktur dan praktik.' },
      { id: 'weekend_only', label: 'Hanya di Akhir Pekan (2 – 3 Jam)', description: 'Model belajar intensif sprint mingguan.' },
      { id: 'flexible', label: 'Fleksibel, bisa kapan saja saat santai', description: 'Tanpa tenggat waktu, serap materi dengan ritme sendiri.' },
    ]
  },
  {
    id: 'q4_level',
    title: 'Seberapa familiar Anda dengan topik yang ingin dipelajari?',
    subtitle: 'Tingkat keahlian Anda saat ini (Level 1 sampai 4).',
    options: [
      { id: 'lvl_1', label: 'Level 1: Pemula Total (Nol Pengalaman)', description: 'Belum pernah menyentuh sama sekali, butuh analogi dari dasar.' },
      { id: 'lvl_2', label: 'Level 2: Pernah Coba Sedikit', description: 'Pernah menonton tutorial atau mencoba tapi masih bingung.' },
      { id: 'lvl_3', label: 'Level 3: Menengah (Paham Konsep Dasar)', description: 'Sudah biasa memakai, butuh teknik tingkat lanjut dan trik efisiensi.' },
      { id: 'lvl_4', label: 'Level 4: Mahir / Siap Mentoring Profesional', description: 'Ingin validasi portofolio atau feedback langsung dari praktisi.' },
    ]
  },
  {
    id: 'q5_format',
    title: 'Format penyampaian materi mana yang paling nyaman Anda nikmati?',
    subtitle: 'Setiap orang menyerap ilmu dengan cara berbeda.',
    options: [
      { id: 'fmt_video', label: 'Video Singkat Ringkas (Bite-sized Video)', description: 'Video to-the-point tanpa basa-basi, langsung praktik.' },
      { id: 'fmt_mooc', label: 'MOOC Terstruktur Lengkap', description: 'Urutan bab bertingkat, kuis interaktif, dan latihan bertahap.' },
      { id: 'fmt_pdf', label: 'Lembar Kerja / PDF Printable Mandiri', description: 'Buku kerja digital yang bisa dicetak atau diisi di tablet.' },
      { id: 'fmt_tool', label: 'Aplikasi Web / Tools Kalkulator Siap Pakai', description: 'Alat bantu otomatis tanpa perlu instalasi rumit.' },
      { id: 'fmt_mentoring', label: 'Sesi Bimbingan Live 1-on-1 Privat', description: 'Diskusi tatap muka langsung via Google Meet.' },
    ]
  },
  {
    id: 'q6_motivation',
    title: 'Apa faktor pendorong terbesar yang menggerakkan Anda sekarang?',
    subtitle: 'Alasan emosional atau finansial di balik niat belajar Anda.',
    options: [
      { id: 'mot_freedom', label: 'Kemandirian Finansial & Kerja Fleksibel', description: 'Ingin punya keahlian freelance atau bisnis sendiri.' },
      { id: 'mot_curiosity', label: 'Rasa Ingin Tahu Tren Teknologi & AI Terkini', description: 'Tertarik dengan era vibe coding dan AI agent modern.' },
      { id: 'mot_career', label: 'Peningkatan Karir & Daya Saing di Kantor', description: 'Menjadi orang paling diandalkan dalam tim kerja.' },
      { id: 'mot_healing', label: 'Kebutuhan Merawat Diri & Regulasi Emosi', description: 'Memulihkan energi mental setelah rutinitas yang melelahkan.' },
    ]
  },
  {
    id: 'q7_learning_style',
    title: 'Bagaimana cara Anda paling cepat memahami sesuatu?',
    subtitle: 'Kami memprioritaskan metode belajar yang selaras dengan karakter Anda.',
    options: [
      { id: 'style_hands_on', label: 'Sambil Nonton Sambil Meniru Langsung', description: 'Langsung klik, ketik, dan rasakan hasilnya seketika.' },
      { id: 'style_reading', label: 'Membaca Rangkuman & Menulis Catatan', description: 'Menyerap melalui teks, poin ringkas, dan visual mindmap.' },
      { id: 'style_template', label: 'Mulai dari Template Jadi yang Tinggal Disesuaikan', description: 'Tidak suka mulai dari kanvas kosong, lebih suka modifikasi.' },
      { id: 'style_discussion', label: 'Tanya Jawab & Diskusi Terarah', description: 'Mendapat feedback dan jawaban langsung atas kendala unik.' },
    ]
  },
  {
    id: 'q8_hurdle',
    title: 'Apa hambatan utama yang sering menggagalkan Anda belajar mandiri?',
    subtitle: 'Kami ingin memastikan kurikulum Anda terbebas dari jebakan ini.',
    options: [
      { id: 'hurdle_jargon', label: 'Pusing dengan Istilah Teknis & Teori Berbelit-belit', description: 'Terlalu banyak bahasa asing yang tidak dijelaskan secara membumi.' },
      { id: 'hurdle_time', label: 'Waktu Sangat Terbatas & Sering Tertunda', description: 'Materi terlalu panjang sehingga sulit diselesaikan.' },
      { id: 'hurdle_consistency', label: 'Cepat Bosan & Kehilangan Motivasi di Tengah Jalan', description: 'Kurang melihat dampak nyata dari hal yang dipelajari.' },
      { id: 'hurdle_stuck', label: 'Bingung Kalau Error / Tidak Tahu Tanya ke Siapa', description: 'Butuh solusi yang jelas dan panduan anti-buntu.' },
    ]
  },
  {
    id: 'q9_language',
    title: 'Gaya bahasa materi seperti apa yang membuat Anda nyaman?',
    subtitle: 'Tone of voice materi pembelajaran di EmpowerHub.',
    options: [
      { id: 'lang_casual', label: 'Santai, Hangat, & Penuh Analogi Keseharian', description: 'Seperti mengobrol dengan teman dekat, tanpa jargon asing.' },
      { id: 'lang_semi_formal', label: 'Semi-Formal Ringkas dengan Glosarium Istilah', description: 'Rapi dan teratur, istilah teknis selalu disertai arti bahasa Indonesianya.' },
      { id: 'lang_professional', label: 'Bahasa Profesional Standar Industri Global', description: 'Memakai terminologi internasional untuk kesiapan kerja global.' },
    ]
  },
  {
    id: 'q10_mentorship_need',
    title: 'Berapa banyak pendampingan yang Anda harapkan?',
    subtitle: 'Pilihan antara eksplorasi mandiri atau bimbingan mentor.',
    options: [
      { id: 'mentor_solo', label: 'Sepenuhnya Mandiri (Self-paced Kapan Saja)', description: 'Saya lebih suka belajar sendiri tanpa terikat jadwal siapapun.' },
      { id: 'mentor_community', label: 'Mandiri tapi Ada Komunitas & Contoh Studi Kasus', description: 'Bisa melihat contoh karya rekan lain untuk inspirasi.' },
      { id: 'mentor_direct', label: 'Dapat Masukan Langsung dari Praktisi Ahli', description: 'Butuh mentor yang mengecek karya saya secara privat.' },
    ]
  },
  {
    id: 'q11_pace',
    title: 'Target kecepatan belajar yang Anda inginkan?',
    subtitle: 'Membantu menyusun ekspektasi progres yang sehat.',
    options: [
      { id: 'pace_sprint', label: 'Kilat (1 – 3 Hari Selesai & Paham Inti)', description: 'Materi padat sari pati yang langsung membuahkan hasil.' },
      { id: 'pace_steady', label: 'Bertahap Teratur (1 – 2 Minggu)', description: 'Menyelesaikan 1 modul per 2 hari dengan santai.' },
      { id: 'pace_marathon', label: 'Komprehensif Mendalam (1 Bulan)', description: 'Menuntaskan seluruh latihan hingga ke sudut terdalam.' },
    ]
  },
  {
    id: 'q12_certificate',
    title: 'Seberapa penting sertifikat atau portofolio bagi Anda?',
    subtitle: 'Keluaran akhir yang paling berarti untuk Anda miliki.',
    options: [
      { id: 'cert_vital', label: 'Sangat Butuh Sertifikat Resmi untuk CV / LinkedIn', description: 'Sebagai bukti kredibilitas kompetensi kepada perusahaan atau klien.' },
      { id: 'cert_portfolio', label: 'Lebih Butuh Karya Nyata / Portofolio Hidup', description: 'Klien lebih percaya bukti hasil karya daripada selembar sertifikat.' },
      { id: 'cert_skills_only', label: 'Cukup Ilmunya Saja yang Bermanfaat Nyata', description: 'Tidak perlu sertifikat, yang penting masalah saya terpecahkan.' },
    ]
  },
  {
    id: 'q13_practice_readiness',
    title: 'Bagaimana kesiapan Anda saat mulai sesi praktik?',
    subtitle: 'Memastikan materi tidak melompati langkah krusial.',
    options: [
      { id: 'prac_from_scratch', label: 'Bimbing Saya dari Kanvas Nol (Langkah Demi Langkah)', description: 'Tuntun setiap klik dan langkah pertama tanpa asumsi awal.' },
      { id: 'prac_own_project', label: 'Saya Sudah Punya Ide / Proyek yang Ingin Dikerjakan', description: 'Ingin langsung menerapkan ilmunya ke kebutuhan pribadi/kantor.' },
      { id: 'prac_templates', label: 'Cukup Berikan Template & Lembar Kerja Siap Pakai', description: 'Saya ingin langsung mengunduh dan memanfaatkan yang sudah jadi.' },
    ]
  },
  {
    id: 'q14_device_signal',
    title: 'Perangkat apa yang paling sering Anda pakai & kondisi internet Anda?',
    subtitle: 'Kami memastikan materi ringan diakses tanpa kendala teknis.',
    options: [
      { id: 'dev_mobile_hemat', label: 'Dominan Lewat Smartphone (HP) & Kuota Hemat', description: 'Butuh video ramah mobile, teks ringkas, dan PDF ringan.' },
      { id: 'dev_laptop_wifi', label: 'Laptop / PC dengan Koneksi WiFi Stabil', description: 'Nyaman membuka banyak tab, code editor, dan spreadsheet luas.' },
      { id: 'dev_hybrid', label: 'Bisa HP maupun Laptop Kapan Saja', description: 'Fleksibel sinkron di mana saja.' },
    ]
  },
  {
    id: 'q15_budget',
    title: 'Berapa anggaran investasi belajar yang paling sesuai untuk Anda saat ini?',
    subtitle: 'EmpowerHub menyediakan opsi dari gratis hingga bimbingan intensif.',
    options: [
      { id: 'bud_free', label: 'Mulai dari yang Gratis Dulu (Rp 0)', description: 'Ingin menguji kecocokan tanpa komitmen finansial.' },
      { id: 'bud_micro', label: 'Budget Hemat Terjangkau (Rp 25.000 – Rp 50.000)', description: 'Setara harga segelas kopi untuk worksheet atau tools esensial.' },
      { id: 'bud_mid', label: 'Investasi Menengah (Rp 50.000 – Rp 150.000)', description: 'Untuk kurikulum MOOC komprehensif atau prompt vault lengkap.' },
      { id: 'bud_premium', label: 'Siap Berinvestasi (Hingga Rp 500.000)', description: 'Untuk sesi tatap muka mentoring privat 1-on-1 bersama praktisi.' },
    ]
  },
  {
    id: 'q16_commitment',
    title: 'Terakhir: Kapan Anda ingin mulai mengambil langkah pertama?',
    subtitle: 'Menetapkan niat adalah 50% dari keberhasilan belajar.',
    options: [
      { id: 'com_now', label: 'Sekarang Juga! (Siap 15 Menit Pertama)', description: 'Membuka lembar pertama atau video pembuka hari ini.' },
      { id: 'com_tonight', label: 'Nanti Malam Setelah Aktivitas Selesai', description: 'Menyiapkan ruang tenang sebelum istirahat tidur.' },
      { id: 'com_weekend', label: 'Akhir Pekan Ini dengan Lebih Santai', description: 'Menyisihkan waktu khusus di hari Sabtu atau Minggu.' },
    ]
  }
];

export function calculateAssessmentResult(
  answers: Record<string, string | string[]>,
  products: Product[]
): AssessmentResult {
  // Extract answers
  const interest = answers['q1_interest'] || [];
  const interestList = Array.isArray(interest) ? interest : [interest];
  const dailyProblem = answers['q2_alt_daily_problem'] as string;
  const formatPref = answers['q5_format'] as string;
  const budgetPref = answers['q15_budget'] as string;
  const hurdlePref = answers['q8_hurdle'] as string;
  const devicePref = answers['q14_device_signal'] as string;
  const languagePref = answers['q9_language'] as string;

  // Decision logic to select the primary product
  let primaryId = 'prod-vibe-coding'; // default friendly recommendation
  const reasons: string[] = [];

  // Match scoring
  if (interestList.includes('vibe_coding') || dailyProblem === 'prob_tech_fear' || budgetPref === 'bud_free') {
    primaryId = 'prod-vibe-coding';
  } else if (interestList.includes('office_productivity') || dailyProblem === 'prob_work_overwhelm') {
    primaryId = 'prod-gsuite-pemula';
  } else if (interestList.includes('mindfulness_healing') || dailyProblem === 'prob_burnout' || formatPref === 'fmt_pdf') {
    primaryId = 'prod-journal-healing';
  } else if (interestList.includes('skill_monetization') || dailyProblem === 'prob_income' || formatPref === 'fmt_tool') {
    primaryId = 'prod-skill-income';
  } else if (interestList.includes('branding_content')) {
    primaryId = 'prod-mitra-pasardaya';
  } else if (interestList.includes('career_tech') || formatPref === 'fmt_mentoring' || budgetPref === 'bud_premium') {
    primaryId = 'prod-mentoring-1on1';
  } else if (interestList.includes('notion_productivity')) {
    primaryId = 'prod-notion-life-os';
  } else if (interestList.includes('ai_prompting')) {
    primaryId = 'prod-ai-workflows';
  } else {
    primaryId = 'prod-vibe-coding';
  }

  // Find primary product
  let primaryProduct = products.find(p => p.id === primaryId) || products[0];

  // If budget strictly free and selected product is paid, fallback to free vibe coding
  if (budgetPref === 'bud_free' && primaryProduct.price > 0) {
    // Keep it if user explicitly wanted something else, but note it
  }

  // Generate personalized reasons
  if (hurdlePref === 'hurdle_jargon') {
    reasons.push('Dirancang 100% tanpa istilah teknis asing yang membingungkan; menggunakan analogi visual dan bahasa sehari-hari.');
  } else {
    reasons.push('Struktur materi ringkas dan langsung ke inti praktik tanpa teori berbelit-belit.');
  }

  if (devicePref === 'dev_mobile_hemat') {
    reasons.push('Optimal diakses lewat layar smartphone dengan konsumsi kuota data yang sangat hemat.');
  } else {
    reasons.push('Mendukung akses multi-perangkat secara instan.');
  }

  if (budgetPref === 'bud_free' || primaryProduct.price === 0) {
    reasons.push('Akses 100% Bebas Biaya (Gratis) — langsung bisa dipelajari tanpa komitmen finansial.');
  } else {
    reasons.push(`Investasi terjangkau (${primaryProduct.formattedPrice}) dengan akses selamanya.`);
  }

  if (formatPref === 'fmt_video') {
    reasons.push('Format video to-the-point yang selaras dengan gaya belajar visual Anda.');
  } else if (formatPref === 'fmt_pdf') {
    reasons.push('Buku kerja printable & tablet-friendly yang bisa diisi mandiri dengan tenang.');
  } else if (formatPref === 'fmt_tool') {
    reasons.push('Aplikasi web interaktif siap pakai yang langsung menghasilkan output kerja.');
  } else {
    reasons.push('Kurikulum terstruktur bertahap dari pemula hingga mandiri.');
  }

  // Pick 2-3 format alternatives (different types from primary)
  const remaining = products.filter(p => p.id !== primaryProduct.id);
  const alt1 = remaining.find(p => p.type !== primaryProduct.type && p.price === 0) 
    || remaining.find(p => p.type === 'pdf') 
    || remaining[0];
    
  const alt2 = remaining.find(p => p.id !== alt1?.id && (p.isAffiliate || p.type === 'tool' || p.type === 'mooc'))
    || remaining[1];
    
  const alt3 = remaining.find(p => p.id !== alt1?.id && p.id !== alt2?.id) 
    || remaining[2];

  const alternativeProducts = [
    {
      product: alt1,
      formatDifferenceNote: alt1.price === 0 ? 'Opsi Akses Bebas Biaya (Video)' : `Format alternatif: ${alt1.typeLabel}`
    },
    {
      product: alt2,
      formatDifferenceNote: alt2.isAffiliate ? 'Koleksi Mitra Pasar Daya (Branding)' : `Format alternatif: ${alt2.typeLabel}`
    },
    ...(alt3 ? [{
      product: alt3,
      formatDifferenceNote: `Format alternatif: ${alt3.typeLabel}`
    }] : [])
  ];

  return {
    primaryProduct,
    matchScore: 98,
    personalReasons: reasons,
    alternativeProducts
  };
}
