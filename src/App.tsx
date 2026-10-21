import React, { useState, useEffect } from 'react';
import { 
  Role, 
  Product, 
  UserAccount, 
  ProductCategory, 
  EnrolledCourse, 
  MentoredCourse 
} from './types';
import { INITIAL_PRODUCTS, INITIAL_USER_ACCOUNT } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { LearningPlayerModal } from './components/LearningPlayerModal';
import { AssessmentModal } from './components/AssessmentModal';
import { CartDrawer } from './components/CartDrawer';
import { UserProfileView } from './components/UserProfileView';
import { PartnerPage } from './components/PartnerPage';
import { BecomeMentorPage } from './components/BecomeMentorPage';
import { AboutUsPage } from './components/AboutUsPage';
import { AdminDashboard } from './components/AdminDashboard';
import { PasarDayaSection } from './components/PasarDayaSection';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { BrainstormingStudio } from './components/BrainstormingStudio';
import { AdminPinModal } from './components/AdminPinModal';
import { Footer } from './components/Footer';
import { 
  Search, 
  CheckCircle, 
  ArrowRight, 
  X,
  BookOpen
} from 'lucide-react';

// ---- Penyimpanan status demo (sinkron antara tampilan Desktop dan bingkai Mobile/Tablet) ----
// Semua jendela berasal dari alamat yang sama, jadi memakai localStorage + event 'storage'.
const DEMO_STATE_KEY = 'empowerhub-demo-state-v1';

interface DemoState {
  role: Role;
  userAccount: UserAccount;
  products: Product[];
  cart: Product[];
}

function loadDemoState(): Partial<DemoState> {
  try {
    const raw = localStorage.getItem(DEMO_STATE_KEY);
    return raw ? (JSON.parse(raw) as Partial<DemoState>) : {};
  } catch {
    return {};
  }
}

export default function App() {
  const savedState = React.useMemo(loadDemoState, []);

  // Theme state with localStorage manipulation & system preference fallback
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Current Role: 'guest' | 'mentee' | 'mentor' | 'admin'
  const [role, setRole] = useState<Role>(savedState.role ?? 'mentee');

  // Active view tab: 'beranda' | 'katalog' | 'partner' | 'jadi-mentor' | 'profil' | 'tentang' | 'admin'
  const [currentTab, setCurrentTab] = useState<string>('beranda');

  // Single-account state with dual history
  const [userAccount, setUserAccount] = useState<UserAccount>(savedState.userAccount ?? INITIAL_USER_ACCOUNT);

  // Products catalog
  const [products, setProducts] = useState<Product[]>(savedState.products ?? INITIAL_PRODUCTS);

  // Shopping Cart state
  const [cart, setCart] = useState<Product[]>(savedState.cart ?? []);

  // Simpan status setiap kali berubah (hanya menulis bila isinya memang berbeda)
  useEffect(() => {
    try {
      const next = JSON.stringify({ role, userAccount, products, cart });
      if (localStorage.getItem(DEMO_STATE_KEY) !== next) {
        localStorage.setItem(DEMO_STATE_KEY, next);
      }
    } catch {
      /* penyimpanan tidak tersedia, abaikan */
    }
  }, [role, userAccount, products, cart]);

  // Terima perubahan dari jendela/bingkai lain (misalnya checkout di tampilan Mobile)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== DEMO_STATE_KEY) return;
      if (e.newValue === null) return;
      try {
        const incoming = JSON.parse(e.newValue) as Partial<DemoState>;
        if (incoming.role) setRole(incoming.role);
        if (incoming.userAccount) setUserAccount(incoming.userAccount);
        if (incoming.products) setProducts(incoming.products);
        if (incoming.cart) setCart(incoming.cart);
      } catch {
        /* abaikan data rusak */
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Assessment Modal state
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Semua');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid' | 'affiliate'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);
  const [learningPlayerProduct, setLearningPlayerProduct] = useState<Product | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [isAdminPinModalOpen, setIsAdminPinModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toastTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    // Batalkan timer sebelumnya agar notifikasi baru tidak ikut hilang lebih cepat
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 3000);
  };

  // Handle Role Switching
  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    const roleNames: Record<Role, string> = {
      guest: 'Tamu (Belum Login)',
      mentee: 'Mentee (Pelajar)',
      mentor: 'Mentor (Pengajar)',
      admin: 'Admin Platform (Review Console)',
    };
    showToast(`Peran dialihkan ke: ${roleNames[newRole]}`);
  };

  // Add item to cart
  const handleAddToCart = (product: Product) => {
    if (cart.find(item => item.id === product.id)) {
      showToast(`"${product.title}" sudah ada di keranjang belanja.`);
    } else {
      setCart(prev => [...prev, product]);
      showToast(`Ditambahkan ke keranjang: "${product.title}"`);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Keranjang belanja telah dikosongkan.');
  };

  // Quick Enroll / Purchase Flow
  const handleEnrollProduct = (product: Product) => {
    const exists = userAccount.enrolledCourses.find(c => c.productId === product.id);
    if (exists) {
      setLearningPlayerProduct(product);
      return;
    }

    if (product.price === 0) {
      // Free enroll immediately - DOES NOT force login
      const newEnrollment: EnrolledCourse = {
        productId: product.id,
        enrolledAt: 'Hari ini',
        progressPercent: 0,
        lastLessonId: product.lessons[0]?.id,
        completedLessonIds: [],
        notes: ''
      };

      setUserAccount(prev => ({
        ...prev,
        enrolledCourses: [newEnrollment, ...prev.enrolledCourses]
      }));

      showToast(`Akses Instan Dibuka! Selamat mempelajari "${product.title}".`);
      setLearningPlayerProduct(product);
    } else {
      // Paid product -> trigger Instant Checkout
      setCheckoutProduct(product);
      setCheckoutItems([product]);
    }
  };

  // Checkout Success handler: registers purchased products into single-account enrolled list
  const handleCheckoutSuccess = (purchasedItems: Product[]) => {
    const newEnrollments: EnrolledCourse[] = purchasedItems.map(item => ({
      productId: item.id,
      enrolledAt: 'Hari ini',
      progressPercent: 0,
      lastLessonId: item.lessons[0]?.id,
      completedLessonIds: [],
      notes: ''
    }));

    setUserAccount(prev => {
      const existingIds = new Set(prev.enrolledCourses.map(e => e.productId));
      const filteredNew = newEnrollments.filter(e => !existingIds.has(e.productId));
      return {
        ...prev,
        enrolledCourses: [...filteredNew, ...prev.enrolledCourses]
      };
    });

    const purchasedIds = new Set(purchasedItems.map(p => p.id));
    setCart(prev => prev.filter(item => !purchasedIds.has(item.id)));

    // Tidak ada toast di sini: status berhasil sudah ditampilkan di layar pembayaran.
  };

  // Toggle lesson completion inside LearningPlayerModal
  const handleToggleLessonCompletion = (productId: string, lessonId: string) => {
    setUserAccount(prev => {
      const targetProduct = products.find(p => p.id === productId);
      const totalLessons = targetProduct?.lessons.length || 1;

      const updatedEnrolled = prev.enrolledCourses.map(course => {
        if (course.productId !== productId) return course;

        const isCompleted = course.completedLessonIds.includes(lessonId);
        const newCompletedIds = isCompleted
          ? course.completedLessonIds.filter(id => id !== lessonId)
          : [...course.completedLessonIds, lessonId];

        const progressPercent = Math.min(100, Math.round((newCompletedIds.length / totalLessons) * 100));

        return {
          ...course,
          completedLessonIds: newCompletedIds,
          progressPercent,
          lastLessonId: lessonId
        };
      });

      return {
        ...prev,
        enrolledCourses: updatedEnrolled
      };
    });
  };

  // Selesaikan modul aktif (tanpa membatalkan) lalu pindah ke modul berikutnya
  const handleCompleteAndContinue = (productId: string, lessonId: string, nextLessonId?: string) => {
    setUserAccount(prev => {
      const targetProduct = products.find(p => p.id === productId);
      const totalLessons = targetProduct?.lessons.length || 1;

      return {
        ...prev,
        enrolledCourses: prev.enrolledCourses.map(course => {
          if (course.productId !== productId) return course;

          const newCompletedIds = course.completedLessonIds.includes(lessonId)
            ? course.completedLessonIds
            : [...course.completedLessonIds, lessonId];

          return {
            ...course,
            completedLessonIds: newCompletedIds,
            progressPercent: Math.min(100, Math.round((newCompletedIds.length / totalLessons) * 100)),
            lastLessonId: nextLessonId ?? lessonId
          };
        })
      };
    });
  };

  // Update learner notes
  const handleUpdateNotes = (productId: string, notes: string) => {
    setUserAccount(prev => ({
      ...prev,
      enrolledCourses: prev.enrolledCourses.map(c => 
        c.productId === productId ? { ...c, notes } : c
      )
    }));
  };

  // Mentor Actions: Submit New Course
  const handleAddNewCourse = (newCourseData: Partial<Product>) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      id: newId,
      title: newCourseData.title || 'Materi Baru Mentor',
      tagline: newCourseData.tagline || 'Kurikulum bernilai tinggi.',
      description: newCourseData.description || 'Deskripsi kurikulum.',
      category: newCourseData.category || 'Teknologi & Digital',
      type: newCourseData.type || 'video',
      typeLabel: newCourseData.type === 'mooc' ? 'MOOC Terstruktur' : 'Video Singkat',
      price: newCourseData.price || 0,
      formattedPrice: newCourseData.price === 0 ? 'Gratis' : `Rp ${newCourseData.price?.toLocaleString('id-ID')}`,
      mentorName: userAccount.name,
      mentorRole: userAccount.headline,
      mentorAvatar: userAccount.avatar,
      rating: 5.0,
      reviewCount: 0,
      studentCount: 0,
      durationOrSpecs: newCourseData.durationOrSpecs || '1 Jam Video',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&auto=format&fit=crop&q=80',
      status: 'pending',
      badgeHighlight: 'Menunggu Kurasi',
      keyTakeaways: [
        'Fondasi mendalam materi spesifik',
        'Penerapan studi kasus industri nyata',
        'Sesi tanya jawab interaktif dengan mentor'
      ],
      lessons: [
        { id: `${newId}-1`, title: '01. Pengantar dan Kerangka Kerja', duration: '15:00', type: 'video', summary: 'Fondasi awal konsep materi.' },
        { id: `${newId}-2`, title: '02. Praktik Langsung & Studi Kasus', duration: '30:00', type: 'interactive', summary: 'Implementasi terapan.' }
      ]
    };

    const newMentoredItem: MentoredCourse = {
      productId: newId,
      createdAt: 'Baru saja',
      activeStudents: 0,
      totalRevenue: 0,
      averageRating: 5.0,
      status: 'pending',
      adminFeedback: 'Menunggu review kurasi mutu oleh tim Admin.'
    };

    setProducts(prev => [newProduct, ...prev]);
    setUserAccount(prev => ({
      ...prev,
      mentoredCourses: [newMentoredItem, ...prev.mentoredCourses]
    }));

    showToast(`Materi "${newProduct.title}" diajukan! Status: Menunggu Kurasi Admin.`);
  };

  // Admin Actions: Approve Course
  const handleApproveCourse = (productId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, status: 'published', badgeHighlight: 'Baru Tayang' } : p));
    setUserAccount(prev => ({
      ...prev,
      mentoredCourses: prev.mentoredCourses.map(m => m.productId === productId ? { ...m, status: 'published', adminFeedback: undefined } : m)
    }));
    showToast('Materi berhasil disetujui! Status kini Tayang di Katalog Publik.');
  };

  // Admin Actions: Request Revision
  const handleRequestRevision = (productId: string, feedback: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, status: 'revision', badgeHighlight: 'Perlu Revisi' } : p));
    setUserAccount(prev => ({
      ...prev,
      mentoredCourses: prev.mentoredCourses.map(m => m.productId === productId ? { ...m, status: 'revision', adminFeedback: feedback } : m)
    }));
    showToast('Catatan revisi telah dikirimkan ke Mentor.');
  };

  // Filtered Products for Catalog
  const filteredProducts = products.filter(product => {
    if (role !== 'admin' && (product.status === 'pending' || product.status === 'revision')) {
      return false;
    }
    if (selectedCategory !== 'Semua' && product.category !== selectedCategory) {
      return false;
    }
    if (priceFilter === 'free' && product.price !== 0) return false;
    if (priceFilter === 'paid' && (product.price === 0 || product.isAffiliate)) return false;
    if (priceFilter === 'affiliate' && !product.isAffiliate) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchTagline = product.tagline.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchMentor = product.mentorName.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      const matchType = product.typeLabel.toLowerCase().includes(q);
      if (!matchTitle && !matchTagline && !matchDesc && !matchMentor && !matchCat && !matchType) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-ink-900 text-stone-850 dark:text-surface-50 transition-colors duration-300 overflow-x-hidden w-full max-w-full relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-brand-500 text-ink-900 px-4 py-2.5 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-brand-400 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-brand-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Responsive Navbar: Text-Only with Masuk & Daftar / Dewi Sartika profile */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        role={role}
        setRole={handleRoleChange}
        userAccount={userAccount}
        darkMode={isDark}
        setDarkMode={toggleDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAssessment={() => setIsAssessmentOpen(true)}
        onOpenAuthModal={(tab) => {
          setAuthModalTab(tab || 'login');
          setAuthModalOpen(true);
        }}
      />

      {/* Main Content Body */}
      <main className="flex-1 w-full">
        
        {/* VIEW 1: BERANDA (HOMEPAGE DENGAN SUSUNAN RAMPING & RITME KONTRASTIF) */}
        {currentTab === 'beranda' && (
          <div className="flex flex-col">
            
            {/* 1. Hero Section (Banner Gradasi Organik) + Floating Pill Asesmen */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 w-full">
              <HeroSection
                onExploreCatalog={() => {
                  setCurrentTab('katalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBecomeMentor={() => {
                  setCurrentTab('jadi-mentor');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenAssessment={() => setIsAssessmentOpen(true)}
              />
            </div>

            {/* 2. Section "CARA KERJA EMPOWERHUB" (3 Langkah + 2 Card Callout) */}
            <section className="w-full bg-surface-100 dark:bg-ink-900 py-16 sm:py-20 transition-colors duration-300 border-y border-surface-300/60 dark:border-ink-700">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <HowItWorksSection
                  onExploreCatalog={() => {
                    setCurrentTab('katalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onBecomeMentor={() => {
                    setCurrentTab('jadi-mentor');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            </section>

            {/* 3. Section "Materi Unggulan Pilihan Komunitas" (Katalog Produk & Kelas) */}
            <section className="w-full bg-white dark:bg-ink-900 py-16 sm:py-20 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
                
                {/* Spotlight Courses */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide mb-2 bg-brand-100 text-ink-800 dark:bg-ink-700 dark:text-brand-500">
                        <BookOpen className="w-3.5 h-3.5 text-ink-800 dark:text-brand-500" />
                        <span>Kurikulum Pilihan Komunitas</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-ink-900 dark:text-surface-50 mt-1">
                        Materi Unggulan Pilihan Komunitas
                      </h2>
                      <p className="text-xs sm:text-sm text-ink-400 dark:text-ink-300 mt-0.5">
                        Kurikulum praktis berkecepatan tinggi tanpa teori berbelit-belit.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentTab('katalog');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-ink-700 dark:text-brand-500 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Lihat Semua Katalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.filter(p => !p.status || p.status === 'published').slice(0, 4).map((product) => {
                      const enrolledData = userAccount.enrolledCourses.find(
                        c => c.productId === product.id
                      );

                      return (
                        <ProductCard
                          key={product.id}
                          product={product}
                          enrolledData={enrolledData}
                          onOpenDetail={(p) => setSelectedProduct(p)}
                          onQuickEnroll={handleEnrollProduct}
                          onContinueLearning={(p) => setLearningPlayerProduct(p)}
                          onAddToCart={handleAddToCart}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* 4. Section Kemitraan "Hub Kolaborasi Ekosistem" */}
                <PasarDayaSection
                  onExplorePartnerProducts={() => {
                    setSelectedCategory('Semua');
                    setPriceFilter('affiliate');
                    setSearchQuery('');
                    setCurrentTab('katalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenPartnerPage={() => {
                    setCurrentTab('partner');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

              </div>
            </section>

            {/* 5. Section "Cerita Mereka yang Bertumbuh" (Testimoni) */}
            <section className="w-full bg-surface-100 dark:bg-ink-900 py-16 sm:py-20 transition-colors duration-300 border-y border-surface-300/60 dark:border-ink-700">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TestimonialsSection />
              </div>
            </section>

            {/* 6. Section FAQ (Accordion) */}
            <section className="w-full bg-white dark:bg-ink-900 py-16 sm:py-20 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FaqSection />
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: KELAS & PRODUK (KATALOG LENGKAP DENGAN SEARCH BAR REAL-TIME) */}
        {currentTab === 'katalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in duration-200">
            
            {/* Header & Title */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-300 dark:border-ink-700">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="min-w-0 text-2xl sm:text-3xl font-black text-ink-900 dark:text-surface-50 tracking-tight">
                      Katalog Kelas &amp; Produk Digital
                    </h1>
                    <span className="shrink-0 whitespace-nowrap text-xs px-2.5 py-1 rounded-full bg-surface-300 dark:bg-ink-700 text-ink-700 dark:text-brand-500 font-bold">
                      {filteredProducts.length} Produk
                    </span>
                  </div>
                  <p className="text-xs text-ink-400 dark:text-ink-300 mt-1">
                    Tersedia opsi materi gratis, video vibe coding, template notion, dan kurasi Pasar Daya.
                  </p>
                </div>

                {/* Price / Type Segmented Filter Controls */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-4 -mx-4 sm:mx-0 sm:px-0 scroll-smooth whitespace-nowrap">
                  <div className="flex flex-wrap items-center gap-1 p-1 bg-surface-100 dark:bg-ink-800 rounded-xl border border-surface-300 dark:border-ink-700 max-w-full">
                    <button
                      onClick={() => setPriceFilter('all')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        priceFilter === 'all'
                          ? 'bg-white dark:bg-brand-500 text-ink-900 dark:text-ink-900 shadow-xs font-bold'
                          : 'text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white'
                      }`}
                    >
                      Semua
                    </button>
                    <button
                      onClick={() => setPriceFilter('free')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        priceFilter === 'free'
                          ? 'bg-white dark:bg-brand-500 text-ink-900 dark:text-ink-900 shadow-xs font-bold'
                          : 'text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white'
                      }`}
                    >
                      Akses Gratis
                    </button>
                    <button
                      onClick={() => setPriceFilter('paid')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        priceFilter === 'paid'
                          ? 'bg-white dark:bg-brand-500 text-ink-900 dark:text-ink-900 shadow-xs font-bold'
                          : 'text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white'
                      }`}
                    >
                      Berbayar
                    </button>
                    <button
                      onClick={() => setPriceFilter('affiliate')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        priceFilter === 'affiliate'
                          ? 'bg-white dark:bg-brand-500 text-ink-900 dark:text-ink-900 shadow-xs font-bold'
                          : 'text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white'
                      }`}
                    >
                      Produk Mitra
                    </button>
                  </div>
                </div>
              </div>

              {/* Kolom Input Pencarian (Search Bar) Responsif */}
              <div className="relative w-full max-w-2xl">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-300" />
                <input
                  type="text"
                  placeholder="Cari judul kelas, topik, atau nama mentor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm rounded-2xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 text-ink-900 dark:text-surface-50 placeholder-ink-400 dark:placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 transition-all shadow-[0_4px_20px_-4px_rgba(25,25,25,0.08)]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-ink-400 dark:text-ink-300 hover:text-ink-600 dark:hover:text-surface-300 cursor-pointer"
                    title="Hapus pencarian"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Feedback status pencarian */}
              {searchQuery && (
                <div className="flex items-center justify-between text-xs text-ink-400 dark:text-ink-300">
                  <span>
                    Menampilkan hasil pencarian untuk: <strong className="text-ink-800 dark:text-surface-300">&ldquo;{searchQuery}&rdquo;</strong>
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-ink-700 dark:text-brand-500 font-semibold hover:underline cursor-pointer"
                  >
                    Hapus pencarian
                  </button>
                </div>
              )}
            </div>

            {/* Category Pills Bar (membungkus ke baris berikutnya agar tidak terpotong) */}
            <div className="flex flex-wrap items-center gap-2 py-1">
              {(['Semua', 'Teknologi & Digital', 'Produktivitas', 'Wellness & Self-Growth', 'Karir & Mentoring'] as ProductCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-brand-500 text-ink-900 shadow-xs font-bold'
                      : 'bg-surface-100 dark:bg-ink-800 border border-surface-300 dark:border-ink-700 text-ink-700 dark:text-ink-200 hover:border-brand-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const enrolledData = userAccount.enrolledCourses.find(
                  c => c.productId === product.id
                );

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    enrolledData={enrolledData}
                    onOpenDetail={(p) => setSelectedProduct(p)}
                    onQuickEnroll={handleEnrollProduct}
                    onContinueLearning={(p) => setLearningPlayerProduct(p)}
                    onAddToCart={handleAddToCart}
                  />
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="p-12 text-center rounded-3xl border border-dashed border-surface-300 dark:border-ink-700 bg-surface-100/50 dark:bg-ink-800/50 space-y-3">
                <Search className="w-10 h-10 mx-auto text-ink-400 dark:text-ink-300" />
                <h3 className="text-base font-bold text-ink-800 dark:text-surface-300">
                  Tidak ditemukan produk yang cocok
                </h3>
                <p className="text-xs text-ink-400 dark:text-ink-300 max-w-sm mx-auto">
                  Coba gunakan kata kunci lain atau reset filter kategori dan harga untuk melihat seluruh katalog.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('Semua');
                    setPriceFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-brand-500 text-ink-900 shadow-sm hover:bg-brand-400 transition-all cursor-pointer"
                >
                  Reset Semua Filter
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: HALAMAN JADI PARTNER EMPOWERHUB (/partner) */}
        {currentTab === 'partner' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <PartnerPage />
          </div>
        )}

        {/* VIEW 4: HALAMAN JADI MENTOR (/jadi-mentor) */}
        {currentTab === 'jadi-mentor' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <BecomeMentorPage />
          </div>
        )}

        {/* VIEW 5: CEK AKTIVITASKU / PROFIL PENGGUNA DUAL-ROLE (/profile) */}
        {(currentTab === 'profil' || currentTab === 'belajar' || currentTab === 'mengajar') && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <UserProfileView
              userAccount={userAccount}
              products={products}
              role={role}
              onOpenPlayer={(product) => setLearningPlayerProduct(product)}
              onAddNewCourse={handleAddNewCourse}
              onBrowseCatalog={() => setCurrentTab('katalog')}
              onOpenLogin={() => {
                setAuthModalTab('login');
                setAuthModalOpen(true);
              }}
              onOpenRegister={() => {
                setAuthModalTab('register');
                setAuthModalOpen(true);
              }}
            />
          </div>
        )}

        {/* VIEW 6: TENTANG KAMI */}
        {currentTab === 'tentang' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <AboutUsPage
              onExploreCatalog={() => setCurrentTab('katalog')}
              onStartAssessment={() => setIsAssessmentOpen(true)}
            />
          </div>
        )}

        {/* VIEW 7: ADMIN REVIEW CONSOLE (Akses Khusus Tersembunyi via PIN) */}
        {currentTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <AdminDashboard
              products={products}
              onOpenDetail={(product) => setSelectedProduct(product)}
              onApproveCourse={handleApproveCourse}
              onRequestRevision={handleRequestRevision}
            />
          </div>
        )}


        {/* VIEW 8: DOKUMEN PANDUAN DESAIN (untuk tim) */}
        {currentTab === 'panduan' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <BrainstormingStudio />
          </div>
        )}
      </main>

      {/* Multi-step Assessment Modal */}
      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        products={products}
        onOpenLearningPlayer={(product) => {
          handleEnrollProduct(product);
        }}
        onAddToCart={handleAddToCart}
        onBuyNow={(product) => {
          setCheckoutProduct(product);
          setCheckoutItems([product]);
        }}
      />

      {/* Slide-over Drawer Keranjang Belanja */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedCheckout={(selectedItems) => {
          if (selectedItems.length > 0) {
            setCheckoutProduct(selectedItems[0]);
            setCheckoutItems(selectedItems);
          }
        }}
        onBrowseCatalog={() => {
          setCurrentTab('katalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        enrolledData={userAccount.enrolledCourses.find(c => c.productId === selectedProduct?.id)}
        onEnroll={handleEnrollProduct}
        onOpenPlayer={(p) => {
          setSelectedProduct(null);
          setLearningPlayerProduct(p);
        }}
        onAddToCart={handleAddToCart}
      />

      {/* Interactive Learning Player Modal */}
      <LearningPlayerModal
        product={learningPlayerProduct}
        enrolledData={userAccount.enrolledCourses.find(c => c.productId === learningPlayerProduct?.id)}
        onClose={() => setLearningPlayerProduct(null)}
        onToggleLessonCompletion={handleToggleLessonCompletion}
        onCompleteAndContinue={handleCompleteAndContinue}
        onUpdateNotes={handleUpdateNotes}
      />

      {/* Instant Checkout Simulation Modal (Non-freezing, 2 clear buttons, auto-countdown) */}
      <CheckoutModal
        product={checkoutProduct}
        items={checkoutItems.length > 0 ? checkoutItems : (checkoutProduct ? [checkoutProduct] : [])}
        onClose={() => {
          setCheckoutProduct(null);
          setCheckoutItems([]);
        }}
        onSuccess={handleCheckoutSuccess}
        onGoToProfile={() => {
          setCurrentTab('profil');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToHome={() => {
          setCurrentTab('beranda');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Auth / Role Entry Modal with 2 Tabs (Masuk & Daftar) and Google Login */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
        onLoginSuccess={(newRole, newName) => {
          setRole(newRole);
          setUserAccount(prev => ({
            ...prev,
            name: newName || 'Dewi Sartika'
          }));
          showToast(`Berhasil masuk! Selamat datang, ${newName || 'Dewi Sartika'}.`);
        }}
      />

      {/* Admin Security PIN Modal (PIN: 'admin123' - Akses Khusus & Tersembunyi via Footer) */}
      <AdminPinModal
        isOpen={isAdminPinModalOpen}
        onClose={() => setIsAdminPinModalOpen(false)}
        onSuccess={() => {
          handleRoleChange('admin');
          setCurrentTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          showToast('Akses Pengelola Diberikan. Selamat datang di Review Console!');
        }}
      />

      {/* Footer with WhatsApp Help & Discrete Portal Pengelola Link */}
      <Footer
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdminPin={() => setIsAdminPinModalOpen(true)}
      />

    </div>
  );
}
