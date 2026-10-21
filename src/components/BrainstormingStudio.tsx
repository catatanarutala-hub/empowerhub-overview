import React, { useState } from 'react';
import {
  Layers,
  Palette,
  ShoppingBag,
  Users,
  ClipboardList,
  HelpCircle,
  Copy,
  Check,
  Component,
  GraduationCap,
} from 'lucide-react';

type TabId = 'warna' | 'gaya' | 'peran' | 'asesmen-kelas' | 'produk' | 'keputusan' | 'salin';

type Swatch = { token: string; code: string; desc: string; light: boolean };

const lightTokens: Swatch[] = [
  { token: 'absolute-white', code: '#FFFFFF', desc: 'Latar halaman, kartu, modal', light: true },
  { token: 'absolute-black', code: '#000000', desc: 'Hitam mutlak, dipakai sangat jarang (lapisan di atas foto)', light: false },
  { token: 'brand-500', code: '#FF9500', desc: 'Oranye utama: tombol utama, penanda aktif, ikon. Teks di atasnya wajib ink-900', light: true },
  { token: 'brand-400', code: '#FFBF66', desc: 'Hover tombol, badge, sorotan', light: true },
  { token: 'brand-300', code: '#FFCA80', desc: 'Hover lembut dan hiasan', light: true },
  { token: 'brand-200', code: '#FFD499', desc: 'Garis hiasan dan latar sorotan', light: true },
  { token: 'brand-100', code: '#FFEACC', desc: 'Chip dan latar badge lembut', light: true },
  { token: 'brand-50', code: '#FFF4E5', desc: 'Latar sorotan sangat lembut', light: true },
  { token: 'brand-25', code: '#FFF9F0', desc: 'Latar bagian hangat', light: true },
  { token: 'brand-10', code: '#FFFDFA', desc: 'Putih hangat', light: true },
  { token: 'surface-300', code: '#E4E4E7', desc: 'Garis tepi kartu dan pemisah', light: true },
  { token: 'surface-200', code: '#F1F1F3', desc: 'Latar chip netral dan keadaan hover', light: true },
  { token: 'surface-100', code: '#F7F7F8', desc: 'Latar bagian berselang, kolom isian', light: true },
  { token: 'surface-50', code: '#FCFCFD', desc: 'Putih netral, teks utama di mode gelap', light: true },
  { token: 'ink-900', code: '#191919', desc: 'Teks utama dan judul; teks di atas oranye', light: false },
  { token: 'ink-800', code: '#262626', desc: 'Teks kuat dan kartu mode gelap', light: false },
  { token: 'ink-700', code: '#333333', desc: 'Teks kuat dan garis mode gelap', light: false },
  { token: 'ink-600', code: '#4C4C4D', desc: 'Teks isi sekunder', light: false },
  { token: 'ink-500', code: '#59595A', desc: 'Teks isi sekunder', light: false },
  { token: 'ink-400', code: '#656567', desc: 'Teks pendukung di mode terang (terlemah yang masih lulus)', light: false },
  { token: 'ink-300', code: '#98989A', desc: 'Teks pendukung di mode gelap. Bukan untuk teks di latar putih', light: true },
  { token: 'ink-200', code: '#B3B3B3', desc: 'Teks sekunder di mode gelap, garis nonaktif', light: true },
];

const darkTokens: Swatch[] = [
  { token: 'ink-900', code: '#191919', desc: 'Latar halaman dan bagian mode gelap', light: false },
  { token: 'ink-800', code: '#262626', desc: 'Kartu, panel, kolom isian', light: false },
  { token: 'ink-700', code: '#333333', desc: 'Garis tepi dan pemisah (hiasan)', light: false },
  { token: 'surface-50', code: '#FCFCFD', desc: 'Teks utama dan judul', light: true },
  { token: 'ink-300', code: '#98989A', desc: 'Teks pendukung', light: true },
  { token: 'brand-500', code: '#FF9500', desc: 'Tautan, ikon, penanda aktif, dan tombol utama (teks tombol ink-900)', light: true },
  { token: 'brand-400', code: '#FFBF66', desc: 'Hover dan sorotan', light: true },
];

const contrasts = [
  { pair: 'ink-900 di putih', hex: '#191919 di #FFFFFF', ratio: '17,6 : 1', verdict: 'Lulus (semua teks)' },
  { pair: 'ink-900 di surface-100', hex: '#191919 di #F7F7F8', ratio: '16,4 : 1', verdict: 'Lulus' },
  { pair: 'ink-600 di putih', hex: '#4C4C4D di #FFFFFF', ratio: '8,6 : 1', verdict: 'Lulus (teks isi sekunder)' },
  { pair: 'ink-400 di putih', hex: '#656567 di #FFFFFF', ratio: '5,8 : 1', verdict: 'Lulus (teks pendukung, batas terlemah)' },
  { pair: 'ink-400 di brand-100', hex: '#656567 di #FFEACC', ratio: '5,0 : 1', verdict: 'Lulus' },
  { pair: 'ink-900 di brand-500', hex: '#191919 di #FF9500', ratio: '8,0 : 1', verdict: 'Lulus (teks tombol utama dan banner)' },
  { pair: 'ink-900 di brand-400', hex: '#191919 di #FFBF66', ratio: '10,8 : 1', verdict: 'Lulus (badge, hover tombol)' },
  { pair: 'ink-900 di brand-100', hex: '#191919 di #FFEACC', ratio: '15,0 : 1', verdict: 'Lulus (chip)' },
  { pair: 'Putih di brand-500', hex: '#FFFFFF di #FF9500', ratio: '2,2 : 1', verdict: 'Tidak lulus. Jangan pernah dipakai; teks di oranye selalu ink-900' },
  { pair: 'brand-500 di putih', hex: '#FF9500 di #FFFFFF', ratio: '2,2 : 1', verdict: 'Tidak lulus untuk teks. Hanya ikon besar, logo, dan hiasan (kurang dari 3:1)' },
  { pair: 'ink-300 di putih', hex: '#98989A di #FFFFFF', ratio: '2,9 : 1', verdict: 'Tidak lulus. Hanya untuk mode gelap' },
  { pair: 'surface-50 di ink-900 (gelap)', hex: '#FCFCFD di #191919', ratio: '17,1 : 1', verdict: 'Lulus (teks utama mode gelap)' },
  { pair: 'ink-300 di ink-900 (gelap)', hex: '#98989A di #191919', ratio: '6,1 : 1', verdict: 'Lulus (teks pendukung mode gelap)' },
  { pair: 'ink-300 di ink-800 (gelap)', hex: '#98989A di #262626', ratio: '5,3 : 1', verdict: 'Lulus (teks pendukung di kartu gelap)' },
  { pair: 'brand-500 di ink-900 (gelap)', hex: '#FF9500 di #191919', ratio: '8,0 : 1', verdict: 'Lulus (tautan dan penanda aktif mode gelap)' },
  { pair: 'brand-500 di ink-800 (gelap)', hex: '#FF9500 di #262626', ratio: '6,9 : 1', verdict: 'Lulus' },
  { pair: 'Putih di hijau 700', hex: '#FFFFFF di #047857', ratio: '5,5 : 1', verdict: 'Lulus (tombol WhatsApp, status Tayang)' },
];

const productTypes = [
  ['Video Singkat', 'video', 'Video 5 sampai 15 menit, to the point, langsung praktik.', 'Daftar atau beli, lalu buka ruang belajar'],
  ['MOOC Terstruktur', 'mooc', 'Modul bertingkat, latihan, proyek akhir, dan kuis.', 'Daftar atau beli, kemajuan dihitung per modul'],
  ['Web App / Tool', 'tool', 'Aplikasi atau kalkulator siap pakai lewat tautan akses.', 'Beli, lalu buka tautan akses di ruang belajar'],
  ['Unduhan PDF & Printables', 'pdf', 'Lembar kerja yang bisa dicetak atau diisi di tablet, plus audio pendamping.', 'Beli, lalu unduh file'],
  ['Template Notion', 'template', 'Template jadi yang tinggal disesuaikan.', 'Beli, lalu duplikasi template'],
  ['1-on-1 Mentoring', 'mentoring', 'Kuesioner pra-sesi, pilih jadwal, sesi live, lalu rencana tindak lanjut.', 'Beli, isi kuesioner, pilih jadwal'],
  ['Produk Afiliasi Pasar Daya', 'affiliate', 'Produk mitra yang dikurasi bersama Pasar Daya.', 'Tombol "Buka di Pasar Daya" (tautan eksternal)'],
];

const categories = ['Teknologi & Digital', 'Produktivitas', 'Wellness & Self-Growth', 'Karir & Mentoring'];

const fullSpec = `# EMPOWERHUB: DOKUMEN PANDUAN
Disusun oleh: Ufie BM

## 1. SISTEM WARNA
Sistem desain bersifat usulan sementara karena logo dan warna brand belum ada. Semua nilai ditulis sebagai token (brand-*, surface-*, ink-*), sehingga ketika key visual sudah fix, tim cukup mengganti nilai token di src/index.css (blok @theme) tanpa mengubah komponen. Tone warna saat ini terinspirasi dari KARHUTLA, sebagai bentuk ekspresi simpati pada yang terdampak nyata.
Pairing font: Lexend untuk heading dan angka, Nunito Sans untuk isi dan UI (hangat, angka nol polos yang familiar, berbeda dari Plus Jakarta Sans milik Pasar Daya).
- Absolut: absolute-white #FFFFFF dan absolute-black #000000 (hitam hampir tidak dipakai).
- Oranye (brand): brand-500 #FF9500, brand-400 #FFBF66, brand-300 #FFCA80, brand-200 #FFD499, brand-100 #FFEACC, brand-50 #FFF4E5, brand-25 #FFF9F0, brand-10 #FFFDFA.
- Putih netral (surface): surface-300 #E4E4E7, surface-200 #F1F1F3, surface-100 #F7F7F8, surface-50 #FCFCFD.
- Abu gelap (ink, untuk teks yang terbaca): ink-900 #191919, ink-800 #262626, ink-700 #333333, ink-600 #4C4C4D, ink-500 #59595A, ink-400 #656567, ink-300 #98989A, ink-200 #B3B3B3.
- Tombol utama: brand-500 dengan teks ink-900 (8,0:1), hover brand-400. Putih di atas brand-500 hanya 2,2:1 sehingga tidak dipakai.
- Oranye tidak dipakai sebagai warna teks di latar putih (2,2:1). Di latar terang oranye hanya untuk isian, ikon besar, dan hiasan. Di mode gelap oranye boleh menjadi warna tautan (8,0:1 di ink-900).
- Teks: ink-900 utama (17,6:1), ink-600 isi sekunder (8,6:1), ink-400 teks pendukung terlemah di mode terang (5,8:1). ink-300 hanya di mode gelap.
- Mode gelap: latar ink-900, kartu ink-800, garis ink-700, teks surface-50, teks pendukung ink-300, tautan dan penanda aktif brand-500.
- Hijau (WhatsApp, "Tayang", status berhasil), kuning-oranye (menunggu), merah muda/rose (revisi, galat) dipakai hanya untuk status. Status selalu disertai teks atau ikon.

## 2. GAYA DAN KOMPONEN
- Lexend (400 sampai 800) hanya untuk h1 sampai h4, judul kartu, judul section, dan angka statistik/skor. Nunito Sans (400 sampai 700) untuk paragraf, deskripsi, tombol, kolom isian, dropdown, dan FAQ. Teks isi 12 sampai 14 px.
- Sudut besar: kartu rounded-3xl, tombol dan kolom isian rounded-xl sampai 2xl, pill penuh.
- Kartu berbayangan netral yang lembut (card-elevation), garis tepi surface-300, hover memunculkan garis brand-400.
- Hero: banner gelap (ink) dengan foto perempuan belajar dan sorotan oranye, judul "Saatnya Potensimu Menemukan Jalannya", tiga tombol (Temukan Kelas & Produk, Bagikan Keahlianmu, Mulai Asesmen).
- Navbar: tautan teks di desktop, hamburger layar penuh di bawah 1024 px, tombol mode gelap, ikon keranjang dengan penghitung, tombol Masuk dan Daftar untuk tamu, menu profil untuk pengguna, menu Kolaborasi (Jadi Partner, Jadi Mentor).
- Badge peran: Admin (brand-500), Mentor (brand-100), Mentee (brand-400), Tamu (surface-200).
- Modal dan laci: asesmen, detail produk, pembayaran, masuk/daftar, pemutar kelas, PIN admin, dan laci keranjang dari kanan.
- Toast notifikasi di kanan atas selama 3 detik.

## 3. PERAN DAN ALUR
- Tamu: menjelajah, mengisi asesmen, mengakses materi gratis, menaruh ke keranjang tanpa harus login.
- Mentee (pembelajar): akun terverifikasi, histori kelas, kemajuan, catatan, sertifikat (khusus kelas MOOC Terstruktur).
- Mentor: satu akun yang sama dengan Mentee. Di halaman Aktivitasku ada dua mode: "Mode Belajar (Mentee)" dan "Mode Mengajar (Mentor)". Akses mentor dibeli lewat Pasar Daya, materi diajukan lewat dasbor, lalu dikurasi admin.
- Admin: masuk lewat tautan "Portal Pengelola" di footer dengan PIN. Admin Review Console berisi antrean kurasi, materi tayang, volume transaksi (GMV), dan audit rujukan Pasar Daya.
- Status materi mentor: Menunggu Kurasi, Perlu Revisi, Tayang.

## 4. ASESMEN
- Bisa dimulai tanpa akun. Total 16 pertanyaan (15 ditampilkan, satu pertanyaan tantangan harian hanya muncul bila memilih "Belum Tahu"), satu langkah per layar dengan "Langkah X dari Y", Sebelumnya, dan Lewati/Lanjut.
- Topik: minat (maks 3), tantangan harian, tujuan, waktu, level (1 sampai 4), format, motivasi, gaya belajar, hambatan, gaya bahasa, pendampingan, kecepatan, sertifikat, kesiapan praktik, perangkat dan internet, anggaran, dan komitmen mulai.
- Hasil: satu rekomendasi utama (dengan alasan personal), dua sampai tiga alternatif dengan format berbeda, tombol Akses Sekarang, Keranjang, Beli Sekarang, dan Ulangi Asesmen.

## 5. KELAS
- Pemutar kelas: daftar modul bertipe video, bacaan, lembar kerja, interaktif. Penanda "Tandai Materi Ini Selesai", tombol "Selesai & Lanjut ke Modul Berikutnya", catatan pribadi, kemajuan dalam persen.
- Tombol progres ("Selesai & Lanjut ke Modul Berikutnya", "Selesai & Tuntaskan Kelas", "Selesai") hanya ada di bawah daftar modul (checklist), tidak di area video atau foto produk. Modul juga bisa dicentang langsung di daftar.
- Sertifikat (nomor seri EPH-2026-xxxx, unduh PDF, cetak) hanya diberikan untuk kelas MOOC Terstruktur. Format lain cukup berstatus Selesai.

## 6. PRODUK DAN PEMBAYARAN
- Tujuh format: Video Singkat, MOOC Terstruktur, Web App / Tool, Unduhan PDF & Printables, Template Notion, 1-on-1 Mentoring, Produk Afiliasi Pasar Daya.
- Empat kategori: Teknologi & Digital, Produktivitas, Wellness & Self-Growth, Karir & Mentoring.
- Filter katalog: Semua, Akses Gratis, Berbayar, Produk Mitra, ditambah pencarian dan pill kategori.
- Produk gratis: langsung dibuka tanpa login. Produk berbayar: Beli Sekarang membuka pembayaran instan (QRIS, E-Wallet, Virtual Account), atau masukkan ke keranjang lalu pilih produk yang dibayar sekaligus.
- Produk afiliasi: tombol keluar ke Pasar Daya, tidak dibayar di EmpowerHub.

## 7. KEPUTUSAN TERBUKA YANG TERLIHAT DI KODE
- Sapaan campuran "Anda" dan "kamu".
- Tampilan "Kecocokan 98%" di hasil asesmen dan label level "Pemula Total" perlu disesuaikan dengan keputusan bahwa hasil adalah saran dan bahasa tidak menghakimi.
- Pembayaran dan masuk masih simulasi, PIN admin masih tampil sebagai petunjuk.
- Produk fisik via WhatsApp dan produk akses-link belum ada di prototipe baru.
- Kebijakan pengembalian dana, perlindungan pengguna anak, dan sistem akun bersama dengan Pasar Daya belum diputuskan.`;

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 p-4 sm:p-6 space-y-3">
    <h2 className="text-base sm:text-lg font-black text-ink-900 dark:text-surface-50">{title}</h2>
    {children}
  </section>
);

const Bullets: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="space-y-2 text-sm text-ink-600 dark:text-ink-200 leading-relaxed">
    {items.map((it, i) => (
      <li key={i} className="flex gap-2.5">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 dark:bg-brand-400 shrink-0" aria-hidden="true" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

const SwatchGrid: React.FC<{ items: Swatch[] }> = ({ items }) => (
  <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-3">
    {items.map((s) => (
      <div key={s.token + s.code} className="rounded-2xl border border-surface-300 dark:border-ink-700 overflow-hidden bg-white dark:bg-ink-900">
        <div
          className="h-14 flex items-end px-3 pb-1.5 text-xs font-bold"
          style={{ backgroundColor: s.code, color: s.light ? '#191919' : '#FFFFFF' }}
        >
          {s.code}
        </div>
        <div className="p-3">
          <p className="text-sm font-bold text-ink-900 dark:text-surface-50">{s.token}</p>
          <p className="text-xs text-ink-600 dark:text-ink-300 mt-0.5 leading-relaxed">{s.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'warna', label: '1. Sistem Warna & WCAG', icon: Palette },
  { id: 'gaya', label: '2. Gaya & Komponen', icon: Component },
  { id: 'peran', label: '3. Peran & Alur', icon: Users },
  { id: 'asesmen-kelas', label: '4. Asesmen & Kelas', icon: ClipboardList },
  { id: 'produk', label: '5. Produk & Pembayaran', icon: ShoppingBag },
  { id: 'keputusan', label: '6. Keputusan Desain', icon: HelpCircle },
  { id: 'salin', label: '7. Salin Markdown', icon: Copy },
];

export const BrainstormingStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('warna');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'terang' | 'gelap'>('terang');

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(fullSpec);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard tidak tersedia */
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-ink-900 via-ink-800 to-ink-600 text-white flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-500 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-brand-500" />
            <span>Dokumen Panduan Desain & Spesifikasi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">EmpowerHub</h1>
          <p className="text-xs sm:text-sm font-bold text-brand-500 mt-1">Disusun oleh: Ufie BM</p>
          <p className="text-sm text-surface-200 mt-3 max-w-2xl leading-relaxed">
            Sistem desain sementara bersifat usulan, karena logo dan warna brand belum ada. Semua nilai ditulis sebagai token, jadi ketika key visual sudah fix, tim cukup mengganti nilai token tanpa mengubah komponen.
          </p>
          <p className="text-base sm:text-lg text-white font-semibold mt-3 max-w-2xl leading-relaxed">
            Disesuaikan dengan prototipe terbaru, satu akun untuk belajar dan mengajar, tujuh format produk, serta kolaborasi Pasar Daya. Tone warna untuk saat ini terinspirasi dari KARHUTLA, sebagai bentuk ekspresi simpati pada yang terdampak nyata.
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 rounded-xl bg-brand-400 hover:bg-brand-300 text-ink-900 text-sm font-bold transition-colors shrink-0 cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Spesifikasi Disalin' : 'Salin Dokumen Lengkap'}</span>
        </button>
      </div>

      <div role="tablist" aria-label="Bagian panduan" className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 min-h-[44px] px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer border ${
                active
                  ? 'bg-brand-500 text-ink-900 border-brand-500'
                  : 'bg-surface-100 dark:bg-ink-800 border-surface-300 dark:border-ink-700 text-ink-700 dark:text-ink-200 hover:border-brand-400'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-ink-900' : 'text-brand-500'}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="space-y-5">
        {activeTab === 'warna' && (
          <>
            <Section title="Prinsip pemakaian warna">
              <Bullets
                items={[
                  <>Aksen utama adalah <strong>oranye brand-500 #FF9500</strong> untuk tombol utama serta tab dan pill yang aktif. Teks di atasnya selalu <strong>ink-900</strong> (8,0:1); putih di atas oranye hanya 2,2:1 sehingga tidak dipakai.</>,
                  <><strong>brand-400 sampai brand-10</strong> adalah turunan oranye yang makin lembut, untuk hover, badge, chip, dan latar sorotan. Teks di atasnya ink-900 atau ink-400 (minimal 5,0:1).</>,
                  <><strong>Oranye bukan warna teks di latar putih</strong> (2,2:1). Di mode terang oranye hanya untuk isian, ikon, logo, dan hiasan. Teks pendukung memakai ink-400 (5,8:1); ink-300 hanya di mode gelap.</>,
                  <>Hijau, kuning-oranye, dan rose hanya penanda status (WhatsApp, Tayang, Menunggu, Revisi) dan selalu disertai teks atau ikon, tidak hanya warna.</>,
                  <>Mode gelap memakai abu gelap ink-900 dan ink-800, bukan hitam murni. Di sana oranye boleh menjadi warna tautan dan penanda aktif (8,0:1).</>,
                ]}
              />
            </Section>

            <Section title="Token warna">
              <div className="inline-flex rounded-xl border border-surface-300 dark:border-ink-700 p-1 bg-surface-100 dark:bg-ink-900" role="group" aria-label="Pilih mode warna">
                {(['terang', 'gelap'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    aria-pressed={mode === m}
                    className={`min-h-[40px] px-4 py-1.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
                      mode === m ? 'bg-brand-500 text-ink-900' : 'text-ink-600 dark:text-ink-200'
                    }`}
                  >
                    Mode {m === 'terang' ? 'Terang' : 'Gelap'}
                  </button>
                ))}
              </div>
              <SwatchGrid items={mode === 'terang' ? lightTokens : darkTokens} />
            </Section>

            <Section title="Rasio kontras (WCAG 2.2 AA: 4,5:1 teks, 3:1 ikon dan bentuk)">
              <div className="rt overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-ink-400 dark:text-ink-300 border-b border-surface-300 dark:border-ink-700">
                      <th className="py-2 pr-3 font-bold">Pasangan</th>
                      <th className="py-2 pr-3 font-bold">Warna</th>
                      <th className="py-2 pr-3 font-bold">Rasio</th>
                      <th className="py-2 font-bold">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contrasts.map((c) => (
                      <tr key={c.pair} className="border-b border-surface-300/60 dark:border-ink-700 align-top">
                        <td data-label="Pasangan" className="py-2 pr-3 font-semibold text-ink-900 dark:text-surface-50">{c.pair}</td>
                        <td data-label="Warna" className="py-2 pr-3 text-ink-600 dark:text-ink-300">{c.hex}</td>
                        <td data-label="Rasio" className="py-2 pr-3 font-bold text-ink-700 dark:text-brand-500 whitespace-nowrap">{c.ratio}</td>
                        <td data-label="Keterangan" className="py-2 text-ink-600 dark:text-ink-200">{c.verdict}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="Perbaikan kontras yang sudah diterapkan di kode">
              <Bullets
                items={[
                  <>Seluruh warna di kode kini memakai token (brand, surface, ink), bukan hex atau kelas slate, sehingga warna dapat diganti di satu tempat.</>,
                  <>Teks pada latar oranye diganti dari putih ke ink-900 di seluruh tombol, banner, dan penanda aktif.</>,
                  <>Tombol dan teks hijau 600 (WhatsApp, Tayang, selesai) dinaikkan ke hijau 700, teks kuning-oranye 600 ke 700.</>,
                  <>Masih perlu dicek: ikon dan logo oranye di latar putih (di bawah 3:1, dianggap hiasan, perlu pendamping teks) dan kontras setelah logo serta warna brand final ditetapkan.</>,
                ]}
              />
            </Section>
          </>
        )}

        {activeTab === 'gaya' && (
          <>
            <Section title="Gaya visual">
              <Bullets
                items={[
                  <><strong>Hangat dan berenergi:</strong> oranye api dengan netral hangat memberi kesan ramah dan penuh semangat, sambil tetap tenang dibaca. Tone ini terinspirasi dari KARHUTLA sebagai ekspresi simpati.</>,
                  <><strong>Pairing font:</strong> Lexend hanya untuk heading (h1 sampai h4), judul kartu, judul section, dan angka statistik. Nunito Sans untuk paragraf, deskripsi, tombol, kolom isian, dropdown, dan FAQ. Lexend dipilih karena lebar dan lega serta ramah pembaca, Nunito Sans karena hangat dan berangka nol polos yang familiar bagi pembaca Indonesia (Atkinson Hyperlegible sempat dicoba tetapi nol bercoretnya terasa asing). Isi berjarak baris longgar (1,65).</>,
                  <><strong>Sudut besar:</strong> kartu rounded-3xl, tombol dan kolom isian rounded-xl sampai 2xl, badge dan filter berbentuk pill.</>,
                  <><strong>Kedalaman halus:</strong> bayangan netral 8% (card-elevation) dan garis tepi surface-300. Saat hover, garis berubah brand-400.</>,
                  <><strong>Ritme beranda:</strong> bagian putih dan surface-100 bergantian dengan garis tipis, supaya bagian mudah dibedakan tanpa warna keras.</>,
                  <><strong>Foto:</strong> perempuan belajar dan berkarya dengan suasana hangat, ditempatkan di hero dan kartu produk.</>,
                ]}
              />
            </Section>

            <Section title="Komponen utama">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  ['Navbar', 'Tautan teks di desktop. Di bawah 1024 px menjadi hamburger layar penuh. Berisi mode gelap, keranjang dengan penghitung, Masuk dan Daftar (tamu) atau menu profil, serta menu Kolaborasi.'],
                  ['Hero', 'Banner gelap dengan foto dan sorotan oranye. Tiga tombol: Temukan Kelas & Produk, Bagikan Keahlianmu, Mulai Asesmen.'],
                  ['Cara Kerja', 'Tiga langkah: Kenali Minat dan Kebutuhanmu, Temukan Rekomendasi yang Sesuai, Sesuaikan dengan Ritmemu. Dua kartu ajakan: Jelajahi dan Jadi Mentor.'],
                  ['Kartu produk', 'Thumbnail, badge (brand-400 untuk sorotan, surface-200 untuk netral), mentor, rating, durasi, harga, tombol Detail, Daftar atau Beli, dan Keranjang.'],
                  ['Katalog', 'Pencarian waktu nyata, filter Semua / Akses Gratis / Berbayar / Produk Mitra, pill kategori yang membungkus ke baris berikutnya, status kosong dengan tombol reset.'],
                  ['Modal dan laci', 'Asesmen, detail produk, pembayaran, masuk dan daftar, pemutar kelas, PIN admin. Keranjang berupa laci dari kanan.'],
                  ['Kolaborasi Pasar Daya', 'Bagian beranda yang mengajak melihat koleksi produk mitra atau mengajukan kerja sama komunitas.'],
                  ['Testimoni dan FAQ', 'Tiga kisah peserta dan mentor, serta akordeon pertanyaan umum.'],
                  ['Footer', 'Kartu bantuan WhatsApp, tautan navigasi, dan tautan diskret "Portal Pengelola" untuk admin.'],
                  ['Toast', 'Pesan singkat di kanan atas selama 3 detik untuk konfirmasi aksi.'],
                  ['Mode presentasi', 'Khusus prototipe: tombol melayang di bawah (Mobile 390 px, Tablet 820 px, Desktop) memuat aplikasi yang sama dalam bingkai perangkat. Hanya tampil di layar lebar dan bisa disembunyikan.'],
                ].map(([t, d]) => (
                  <div key={t} className="p-4 rounded-2xl bg-surface-100 dark:bg-ink-900 border border-surface-300 dark:border-ink-700">
                    <p className="text-sm font-bold text-ink-900 dark:text-surface-50">{t}</p>
                    <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 mt-1 leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Aturan aksesibilitas">
              <Bullets
                items={[
                  'Area ketuk tombol utama minimal 44 sampai 48 px (contoh: tombol pembayaran min-h 48 px).',
                  'Semua tombol ikon punya aria-label (menu, keranjang, mode gelap, tutup).',
                  'Menu hamburger dapat ditutup dengan Escape dan menutup sendiri saat layar melebar.',
                  'Status memakai teks dan ikon, tidak hanya warna.',
                  'Teks isi di ponsel terlalu kecil bila di bawah 14 px. Disarankan menaikkan teks 10 sampai 12 px menjadi minimal 12 px dan menambah pengatur ukuran teks.',
                ]}
              />
            </Section>
          </>
        )}

        {activeTab === 'peran' && (
          <>
            <Section title="Empat peran">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  ['Tamu', 'Menjelajah katalog, mengisi asesmen, membuka materi gratis, menyimpan produk di keranjang. Masuk atau Daftar lewat navbar.'],
                  ['Mentee (pembelajar)', 'Memiliki akun. Di Aktivitasku ada Mode Belajar: kelas yang diambil, kemajuan, catatan, lanjut belajar, unduh sertifikat (khusus MOOC Terstruktur).'],
                  ['Mentor', 'Akun yang sama dengan Mentee. Di Aktivitasku ada Mode Mengajar: ringkasan peserta, pendapatan, rating, ajukan materi baru, dan status kurasi.'],
                  ['Admin', 'Masuk lewat "Portal Pengelola" di footer dengan PIN. Admin Review Console: antrean kurasi, materi tayang, GMV, audit rujukan Pasar Daya.'],
                ].map(([t, d]) => (
                  <div key={t} className="p-4 rounded-2xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-900">
                    <p className="text-sm font-bold text-ink-700 dark:text-brand-500">{t}</p>
                    <p className="text-sm text-ink-600 dark:text-ink-200 mt-1 leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Satu akun, dua mode">
              <Bullets
                items={[
                  'Keputusan baru: Mentee dan Mentor tidak lagi akun terpisah. Satu akun punya dua riwayat, belajar dan mengajar.',
                  'Beralih mode lewat menu profil (Mode Belajar, Mode Mengajar) atau tab di halaman Aktivitasku.',
                  'Akses mentor dibeli lewat Pasar Daya. Tombol "Daftar Jadi Mentor di Pasar Daya" membuka tautan eksternal.',
                ]}
              />
            </Section>

            <Section title="Alur mentor dan kurasi">
              <Bullets
                items={[
                  '1. Daftar tiket akses mentor di Pasar Daya.',
                  '2. Validasi dan kurasi topik bersama tim kurator.',
                  '3. Susun silabus atau modul (video singkat, PDF, template kerja).',
                  '4. Ajukan materi. Status "Menunggu Kurasi" dan tidak tampil di katalog publik.',
                  '5. Admin memilih Setujui (Tayang), atau Minta Revisi dengan catatan. Mentor melihat catatan di dasbornya.',
                  '6. Materi tayang di katalog dan mulai menjangkau pembelajar.',
                ]}
              />
            </Section>
          </>
        )}

        {activeTab === 'asesmen-kelas' && (
          <>
            <Section title="Prinsip asesmen">
              <Bullets
                items={[
                  'Dapat dimulai tanpa akun (tombol Mulai Asesmen di hero dan navbar).',
                  'Satu pertanyaan per layar dengan penanda "Langkah X dari Y", tombol Sebelumnya dan Lewati / Lanjut.',
                  'Pertanyaan tantangan harian hanya muncul bila pengguna memilih "Belum Tahu / Masih Bingung".',
                  'Minat boleh memilih sampai tiga. Pertanyaan lain pilihan tunggal.',
                  'Aspek yang dipetakan: minat, tantangan, tujuan, waktu, level, format, motivasi, gaya belajar, hambatan, gaya bahasa, pendampingan, kecepatan, sertifikat, kesiapan praktik, perangkat dan internet, anggaran, serta komitmen mulai.',
                  'Hasil: satu rekomendasi utama dengan alasan personal, lalu dua sampai tiga alternatif dengan format berbeda (gratis, mitra, atau format lain).',
                  'Aturan rekomendasi memakai pencocokan minat, tantangan, format, dan anggaran. Aturan ini disusun tim kurikulum dan konten.',
                ]}
              />
            </Section>

            <Section title="Prinsip kelas">
              <Bullets
                items={[
                  'Pemutar kelas berisi daftar modul bertipe video, bacaan, lembar kerja, dan interaktif.',
                  'Pembelajar menandai modul selesai, atau memakai "Selesai & Lanjut ke Modul Berikutnya". Kemajuan dihitung otomatis per modul dalam persen.',
                  'Catatan pribadi tersimpan per kelas.',
                  'Tombol progres ("Selesai & Lanjut ke Modul Berikutnya", "Selesai & Tuntaskan Kelas", "Selesai") hanya ada di bawah daftar modul (checklist), tidak di area video atau foto produk.',
                  'Sertifikat (nomor seri, unduh PDF, cetak) hanya diberikan untuk kelas MOOC Terstruktur. Format lain cukup berstatus Selesai.',
                  'Materi gratis langsung terbuka tanpa login. Mentee dengan kelas yang sudah diambil melihat tombol "Lanjut Belajar".',
                ]}
              />
            </Section>
          </>
        )}

        {activeTab === 'produk' && (
          <>
            <Section title="Tujuh format produk dan empat kategori">
              <div className="rt overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-ink-400 dark:text-ink-300 border-b border-surface-300 dark:border-ink-700">
                      <th className="py-2 pr-3 font-bold">Format</th>
                      <th className="py-2 pr-3 font-bold">Kode</th>
                      <th className="py-2 pr-3 font-bold">Isi</th>
                      <th className="py-2 font-bold">Cara mendapatkan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productTypes.map(([a, b, c, d]) => (
                      <tr key={b} className="border-b border-surface-300/60 dark:border-ink-700 align-top">
                        <td data-label="Format" className="py-2 pr-3 font-semibold text-ink-900 dark:text-surface-50">{a}</td>
                        <td data-label="Kode" className="py-2 pr-3 text-ink-600 dark:text-ink-300">{b}</td>
                        <td data-label="Isi" className="py-2 pr-3 text-ink-600 dark:text-ink-200">{c}</td>
                        <td data-label="Cara" className="py-2 text-ink-600 dark:text-ink-200">{d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-ink-600 dark:text-ink-200">
                Kategori: {categories.join(', ')}.
              </p>
            </Section>

            <Section title="Pembayaran dan keranjang">
              <Bullets
                items={[
                  'Produk gratis: tombol "Daftar Kelas Gratis Sekarang", langsung terbuka tanpa login.',
                  'Produk berbayar: "Beli Sekarang" membuka pembayaran instan (QRIS, E-Wallet, Virtual Account), status diverifikasi otomatis, lalu "Mulai Belajar Sekarang".',
                  'Keranjang berupa laci dari kanan. Pembelajar memilih produk yang akan dibayar, melihat total, lalu "Lanjut ke Pembayaran Cepat". Biaya layanan dan pajak tampil Rp 0.',
                  'Setelah berhasil, produk masuk ke daftar kelas dan keluar dari keranjang.',
                  'Produk afiliasi Pasar Daya tidak dibayar di EmpowerHub. Tombolnya "Buka di Pasar Daya" ke tautan eksternal.',
                  'Mentor menerima bagi hasil. Pengaturan bagi hasil dan pencairan ada di Pasar Daya.',
                ]}
              />
            </Section>
          </>
        )}

        {activeTab === 'keputusan' && (
          <>
            <Section title="Keputusan desain pada prototipe terbaru">
              <Bullets
                items={[
                  'Arah visual: dari biru minimalis, lalu plum, kini oranye dengan abu netral (terinspirasi KARHUTLA, sementara), ditulis sebagai token agar mudah diganti saat brand final. Pairing font Lexend (heading) dan Nunito Sans (isi).',
                  'Satu akun untuk belajar dan mengajar, dengan dua mode di Aktivitasku.',
                  'Admin tidak punya tombol di navbar, hanya lewat Portal Pengelola di footer dan PIN.',
                  'Navigasi mobile berupa hamburger layar penuh, menu Kolaborasi mengelompokkan Jadi Partner dan Jadi Mentor.',
                  'Halaman baru: Jadi Partner (komunitas, perusahaan, kampus), Tentang Kami, dan FAQ di beranda.',
                  'Produk gratis boleh dibuka tanpa login. Pembayaran memakai QRIS, E-Wallet, dan Virtual Account.',
                  'Tampilan mode terang dan gelap disimpan di perangkat dan mengikuti pengaturan sistem pada kunjungan pertama.',
                ]}
              />
            </Section>

            <Section title="Perlu diputuskan atau diperbaiki">
              <Bullets
                items={[
                  <><strong>Sapaan:</strong> teks memakai "Anda" dan "kamu" bergantian. Pilih satu, disarankan "kamu" agar hangat.</>,
                  <><strong>Hasil asesmen:</strong> label "Kecocokan 98% · Sangat Cocok" dan nilai tetap 98 menyiratkan pengukuran pasti. Sebelumnya disepakati hasil bersifat saran, bukan jawaban mutlak. Disarankan diganti "Rekomendasi untukmu" tanpa persentase.</>,
                  <><strong>Level kemampuan:</strong> "Level 1: Pemula Total" terasa menghakimi. Disarankan "Baru mulai belajar".</>,
                  <><strong>Produk fisik (WhatsApp) dan akses-link/game:</strong> ada di rencana sebelumnya tetapi belum ada di prototipe baru.</>,
                  <><strong>Verifikasi email dan lupa kata sandi:</strong> belum ada alurnya. Masuk dengan Google dan "Masuk Cepat Demo" masih simulasi.</>,
                  <><strong>Pembayaran:</strong> nomor virtual account dan proses verifikasi masih simulasi. Perlu penyedia pembayaran sungguhan.</>,
                  <><strong>PIN admin</strong> tampil sebagai petunjuk di layar. Hapus sebelum rilis dan gunakan autentikasi sungguhan.</>,
                  <><strong>Sertifikat:</strong> masih memakai peringatan browser, belum menghasilkan PDF.</>,
                  <><strong>Teks kecil:</strong> banyak teks 10 sampai 12 px. Untuk pengguna ponsel Android dan semua usia, naikkan ke minimal 12 sampai 14 px.</>,
                  <><strong>Perlindungan pengguna anak, kebijakan pengembalian dana, dan sistem akun bersama dengan Pasar Daya</strong> masih terbuka.</>,
                ]}
              />
            </Section>
          </>
        )}

        {activeTab === 'salin' && (
          <Section title="Spesifikasi lengkap (Markdown)">
            <p className="text-sm text-ink-600 dark:text-ink-200">
              Salin isi di bawah ini untuk dibagikan ke tim atau dipakai sebagai konteks saat meminta Claude mengubah tampilan.
            </p>
            <pre className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap break-words p-4 rounded-2xl bg-surface-100 dark:bg-ink-900 border border-surface-300 dark:border-ink-700 text-ink-700 dark:text-ink-200 max-h-[60vh] overflow-y-auto">
              {fullSpec}
            </pre>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-900 text-sm font-bold cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Disalin' : 'Salin Markdown'}</span>
            </button>
          </Section>
        )}
      </div>

      <p className="flex items-center gap-2 text-xs text-ink-400 dark:text-ink-300">
        <GraduationCap className="w-4 h-4 text-brand-500" />
        <span>Dokumen ini mengikuti kode prototipe. Setiap perubahan tampilan perlu disalin kembali ke sini.</span>
      </p>
    </div>
  );
};
