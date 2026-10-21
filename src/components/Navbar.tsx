import React, { useState, useRef, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles, 
  User, 
  ChevronDown, 
  ShoppingCart, 
  ShieldCheck,
  UserPlus,
  Home,
  LogOut,
  MessageCircle
} from 'lucide-react';
import { Role, UserAccount } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  role: Role;
  setRole: (role: Role) => void;
  userAccount: UserAccount;
  darkMode: boolean;
  setDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAssessment: () => void;
  onOpenAuthModal: (tab?: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  role,
  setRole,
  userAccount,
  darkMode,
  setDarkMode,
  searchQuery: _searchQuery,
  setSearchQuery: _setSearchQuery,
  cartCount,
  onOpenCart,
  onOpenAssessment,
  onOpenAuthModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [kolaborasiDropdownOpen, setKolaborasiDropdownOpen] = useState(false);
  const [mobileKolaborasiOpen, setMobileKolaborasiOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const kolaborasiRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_CS_URL =
    'https://wa.me/628123456789?text=Halo%20Admin%20EmpowerHub,%20saya%20butuh%20bantuan';

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Submenu Kolaborasi otomatis terbuka jika halaman aktif berada di dalamnya
  const isKolaborasiActive = currentTab === 'partner' || currentTab === 'jadi-mentor';
  const kolaborasiExpanded = mobileKolaborasiOpen || isKolaborasiActive;

  // Kunci scroll halaman di belakang drawer + tutup dengan tombol Esc
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Tutup drawer otomatis saat layar melebar ke desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (kolaborasiRef.current && !kolaborasiRef.current.contains(event.target as Node)) {
        setKolaborasiDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getRoleBadgeStyle = (r: Role) => {
    switch (r) {
      case 'admin':
        return 'bg-brand-500 text-ink-900 border border-brand-400';
      case 'mentor':
        return 'bg-surface-300 text-ink-700 font-semibold dark:bg-ink-700 dark:text-brand-500';
      case 'mentee':
        return 'bg-brand-400 text-ink-900 font-bold';
      default:
        return 'bg-surface-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200';
    }
  };

  const getRoleLabel = (r: Role) => {
    switch (r) {
      case 'admin': return 'Admin';
      case 'mentor': return 'Mentor';
      case 'mentee': return 'Mentee';
      default: return 'Tamu';
    }
  };

  return (
    <>
    <header className="sticky top-0 z-40 backdrop-blur-md transition-colors duration-200 border-b border-surface-300 dark:border-ink-700 bg-white/95 dark:bg-ink-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => { setCurrentTab('beranda'); }}
              className="flex items-center gap-2 text-left group focus:outline-none cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-500 flex items-center justify-center text-ink-900 shadow-sm group-hover:bg-ink-300 transition-colors relative shrink-0">
                <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-brand-500" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-400 rounded-full border-2 border-white dark:border-ink-900" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-ink-700 dark:text-surface-50">
                    Empower<span className="text-brand-500">Hub</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 inline-block" />
                </div>
                <p className="text-[9px] tracking-wide text-ink-400 dark:text-ink-300 font-medium hidden sm:block">
                  Nyata Praktiknya · Fleksibel Waktunya
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Menu: TEXT-ONLY */}
          <nav className="hidden lg:flex items-center gap-5 text-[13px] font-medium text-ink-700 dark:text-ink-200">
            {/* 1. Beranda */}
            <button
              onClick={() => setCurrentTab('beranda')}
              className={`py-1.5 transition-colors relative cursor-pointer ${
                currentTab === 'beranda'
                  ? 'text-ink-700 dark:text-brand-500 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-500 dark:after:bg-brand-400'
                  : 'hover:text-ink-700 dark:hover:text-brand-500'
              }`}
            >
              Beranda
            </button>

            {/* 2. Kelas & Produk */}
            <button
              onClick={() => setCurrentTab('katalog')}
              className={`py-1.5 transition-colors relative cursor-pointer ${
                currentTab === 'katalog'
                  ? 'text-ink-700 dark:text-brand-500 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-500 dark:after:bg-brand-400'
                  : 'hover:text-ink-700 dark:hover:text-brand-500'
              }`}
            >
              Kelas &amp; Produk
            </button>

            {/* 3. Mulai Asesmen */}
            <button
              onClick={onOpenAssessment}
              className="py-1.5 text-ink-700 dark:text-brand-500 font-semibold hover:opacity-80 transition-opacity cursor-pointer"
            >
              Mulai Asesmen
            </button>

            {/* 4. Kolaborasi (Dropdown Menu) */}
            <div className="relative" ref={kolaborasiRef}>
              <button
                onClick={() => setKolaborasiDropdownOpen(!kolaborasiDropdownOpen)}
                className={`py-1.5 flex items-center gap-1 transition-colors relative cursor-pointer ${
                  currentTab === 'partner' || currentTab === 'jadi-mentor'
                    ? 'text-ink-700 dark:text-brand-500 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-500 dark:after:bg-brand-400'
                    : 'hover:text-ink-700 dark:hover:text-brand-500'
                }`}
              >
                <span>Kolaborasi</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${kolaborasiDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown with 2 submenus */}
              {kolaborasiDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-2xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 space-y-1">
                  <button
                    onClick={() => {
                      setCurrentTab('partner');
                      setKolaborasiDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors block cursor-pointer ${
                      currentTab === 'partner'
                        ? 'bg-surface-300/50 dark:bg-ink-700 text-ink-700 dark:text-brand-500 font-bold'
                        : 'hover:bg-surface-100 dark:hover:bg-ink-900 text-ink-700 dark:text-surface-300'
                    }`}
                  >
                    Jadi Partner EmpowerHub
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('jadi-mentor');
                      setKolaborasiDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors block cursor-pointer ${
                      currentTab === 'jadi-mentor'
                        ? 'bg-surface-300/50 dark:bg-ink-700 text-ink-700 dark:text-brand-500 font-bold'
                        : 'hover:bg-surface-100 dark:hover:bg-ink-900 text-ink-700 dark:text-surface-300'
                    }`}
                  >
                    Jadi Mentor
                  </button>
                </div>
              )}
            </div>

            {/* 5. Aktivitasku */}
            <button
              onClick={() => setCurrentTab('profil')}
              className={`py-1.5 flex items-center gap-1.5 transition-colors relative cursor-pointer ${
                currentTab === 'profil'
                  ? 'text-ink-700 dark:text-brand-500 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-500 dark:after:bg-brand-400'
                  : 'hover:text-ink-700 dark:hover:text-brand-500'
              }`}
            >
              <span>Aktivitasku</span>
              {role !== 'guest' && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-surface-300 dark:bg-ink-700 text-ink-700 dark:text-brand-500 font-bold">
                  {userAccount.enrolledCourses.length + userAccount.mentoredCourses.length}
                </span>
              )}
            </button>

            {/* 6. Tentang Kami */}
            <button
              onClick={() => setCurrentTab('tentang')}
              className={`py-1.5 transition-colors relative cursor-pointer ${
                currentTab === 'tentang'
                  ? 'text-ink-700 dark:text-brand-500 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-500 dark:after:bg-brand-400'
                  : 'hover:text-ink-700 dark:hover:text-brand-500'
              }`}
            >
              Tentang Kami
            </button>

            {/* Admin Review Badge ONLY if Admin role is active */}
            {role === 'admin' && (
              <button
                onClick={() => setCurrentTab('admin')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'admin'
                    ? 'bg-brand-400 text-ink-900 shadow-xs'
                    : 'bg-brand-500 text-ink-900 hover:bg-brand-400'
                }`}
                title="Panel Verifikasi Kurasi Admin"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Review</span>
              </button>
            )}
          </nav>

          {/* Right Header Controls: Dark Mode, Cart, Masuk / Daftar or Profile */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={setDarkMode}
              aria-label="Toggle Dark Mode"
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 text-ink-700 dark:text-surface-300 hover:border-brand-400 transition-colors cursor-pointer shrink-0"
              title={darkMode ? "Ganti ke Light Mode" : "Ganti ke Dark Mode"}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-brand-500" />
              ) : (
                <Moon className="w-4 h-4 text-brand-500" />
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative w-8 h-8 flex items-center justify-center rounded-xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 text-ink-700 dark:text-surface-300 hover:border-brand-400 transition-colors cursor-pointer shrink-0"
              aria-label="Buka Keranjang Belanja"
              title="Keranjang Belanja"
            >
              <ShoppingCart className="w-4 h-4 text-brand-500" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-400 text-ink-900 text-[10px] font-black flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile OR Masuk & Daftar Buttons (Hidden on mobile < sm, placed in drawer) */}
            {role === 'guest' ? (
              <div className="hidden sm:flex items-center gap-1.5">
                {/* Tombol Masuk */}
                <button
                  onClick={() => onOpenAuthModal('login')}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl border border-surface-300 dark:border-ink-700 text-ink-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-ink-700 transition-colors cursor-pointer"
                >
                  Masuk
                </button>

                {/* Tombol Daftar */}
                <button
                  onClick={() => onOpenAuthModal('register')}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-900 transition-colors shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5 text-brand-500" />
                  <span>Daftar</span>
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 rounded-xl border border-surface-300 dark:border-ink-700 hover:bg-surface-100 dark:hover:bg-ink-800 transition-colors cursor-pointer"
                >
                  <img
                    src={userAccount.avatar}
                    alt={userAccount.name}
                    className="w-6 h-6 rounded-lg object-cover ring-1 ring-brand-400"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-ink-800 dark:text-surface-200 leading-tight">
                      {userAccount.name}
                    </p>
                    <span className={`inline-block text-[9px] px-1.5 py-0.2 rounded font-semibold ${getRoleBadgeStyle(role)}`}>
                      {getRoleLabel(role)}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-ink-400 dark:text-ink-300 hidden sm:block" />
                </button>

                {/* Profile Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="flex items-center gap-3 pb-3 border-b border-surface-300 dark:border-ink-700">
                      <img
                        src={userAccount.avatar}
                        alt={userAccount.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-brand-500"
                      />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-ink-800 dark:text-surface-200 truncate">
                          {userAccount.name}
                        </p>
                        <p className="text-[10px] text-ink-400 dark:text-ink-300 truncate">
                          {userAccount.email}
                        </p>
                        <span className={`inline-block mt-1 text-[9px] px-2 py-0.5 rounded font-semibold ${getRoleBadgeStyle(role)}`}>
                          Status: {getRoleLabel(role)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 space-y-1">
                      <button
                        onClick={() => {
                          setCurrentTab('profil');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-2 text-xs rounded-xl font-bold bg-surface-300/40 dark:bg-ink-700 text-ink-700 dark:text-brand-500 flex items-center justify-between cursor-pointer"
                      >
                        <span>Aktivitasku (Dual-Role)</span>
                        <span className="text-[10px]">Buka →</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentTab('profil');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2 py-1.5 text-xs rounded-lg text-ink-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-ink-700 flex items-center justify-between font-medium cursor-pointer"
                      >
                        <span>Mode Belajar (Mentee)</span>
                        <span className="text-[10px] text-ink-700 dark:text-brand-500">
                          {userAccount.enrolledCourses.length} Kelas →
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentTab('profil');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2 py-1.5 text-xs rounded-lg text-ink-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-ink-700 flex items-center justify-between font-medium cursor-pointer"
                      >
                        <span>Mode Mengajar (Mentor)</span>
                        <span className="text-[10px] text-ink-700 dark:text-brand-500">
                          {userAccount.mentoredCourses.length} Materi →
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setRole('guest');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2 py-1.5 text-xs rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-medium cursor-pointer"
                      >
                        Keluar Akun
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger Button for Mobile & Tablet */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-xl border border-surface-300 dark:border-ink-700 text-ink-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-ink-800 cursor-pointer shrink-0"
              aria-label="Buka Menu Navigasi"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-drawer"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

    </header>

    {/* =====================================================================
        MOBILE DRAWER (Fullscreen, slide dari kanan)
        Sengaja diletakkan DI LUAR <header>: header memakai backdrop-blur yang
        menjadikannya containing block, sehingga elemen `fixed` di dalamnya
        hanya setinggi header dan menu tampak kosong.
        ===================================================================== */}
    <div
      id="mobile-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Menu Navigasi EmpowerHub"
      aria-hidden={!mobileMenuOpen}
      inert={!mobileMenuOpen}
      className={`fixed inset-0 z-50 bg-white dark:bg-ink-900 flex flex-col p-6 overflow-y-auto lg:hidden transform transition-[transform,visibility] duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0 visible' : 'translate-x-full invisible'
      }`}
    >
      {/* HEADER DRAWER */}
      <div className="flex items-center justify-between pb-4 border-b border-surface-300 dark:border-ink-700 shrink-0">
        <button
          onClick={() => {
            setCurrentTab('beranda');
            closeMobileMenu();
          }}
          className="text-lg font-bold text-ink-700 dark:text-brand-500 cursor-pointer"
          aria-label="EmpowerHub, kembali ke Beranda"
        >
          EmpowerHub
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              closeMobileMenu();
              onOpenCart();
            }}
            className="relative w-11 h-11 flex items-center justify-center rounded-xl text-ink-700 dark:text-brand-500 hover:bg-surface-100 dark:hover:bg-ink-800 transition-colors cursor-pointer"
            aria-label="Buka Keranjang Belanja"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-brand-400 text-ink-900 text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={setDarkMode}
            className="w-11 h-11 flex items-center justify-center rounded-xl text-ink-700 dark:text-brand-500 hover:bg-surface-100 dark:hover:bg-ink-800 transition-colors cursor-pointer"
            aria-label={darkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={closeMobileMenu}
            className="w-11 h-11 flex items-center justify-center rounded-xl text-ink-600 dark:text-ink-200 hover:bg-surface-100 dark:hover:bg-ink-800 transition-colors cursor-pointer"
            aria-label="Tutup Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* DAFTAR MENU */}
      <nav className="flex-1 space-y-2 py-6" aria-label="Menu utama">
        {(() => {
          const itemBase =
            'w-full min-h-[48px] px-4 py-3 rounded-xl flex items-center justify-between text-left text-base transition-colors cursor-pointer';
          const itemActive =
            'bg-surface-100 dark:bg-ink-800 text-ink-700 dark:text-brand-500 font-semibold';
          const itemIdle =
            'text-ink-700 dark:text-surface-300 font-medium hover:bg-surface-100 dark:hover:bg-ink-800';
          const go = (tab: string) => () => {
            setCurrentTab(tab);
            closeMobileMenu();
          };

          return (
            <>
              {/* 1. Beranda */}
              <button
                onClick={go('beranda')}
                aria-current={currentTab === 'beranda' ? 'page' : undefined}
                className={`${itemBase} ${currentTab === 'beranda' ? itemActive : itemIdle}`}
              >
                <span className="flex items-center gap-2.5">
                  <Home className="w-4.5 h-4.5" />
                  Beranda
                </span>
              </button>

              {/* 2. Kelas & Produk */}
              <button
                onClick={go('katalog')}
                aria-current={currentTab === 'katalog' ? 'page' : undefined}
                className={`${itemBase} ${currentTab === 'katalog' ? itemActive : itemIdle}`}
              >
                <span>Kelas &amp; Produk</span>
              </button>

              {/* 3. Mulai Asesmen */}
              <button
                onClick={() => {
                  closeMobileMenu();
                  onOpenAssessment();
                }}
                className={`${itemBase} text-ink-700 dark:text-brand-500 font-semibold bg-brand-400/20 dark:bg-brand-400/10 hover:bg-brand-400/30`}
              >
                <span>Mulai Asesmen</span>
                <Sparkles className="w-4 h-4 text-brand-500" />
              </button>

              {/* 4. Kolaborasi + 2 submenu */}
              <div>
                <button
                  onClick={() => setMobileKolaborasiOpen(!kolaborasiExpanded)}
                  aria-expanded={kolaborasiExpanded}
                  aria-controls="mobile-kolaborasi-submenu"
                  className={`${itemBase} ${isKolaborasiActive ? itemActive : itemIdle}`}
                >
                  <span>Kolaborasi</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${kolaborasiExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {kolaborasiExpanded && (
                  <div
                    id="mobile-kolaborasi-submenu"
                    className="mt-1 ml-6 pl-3 space-y-1 border-l-2 border-surface-300 dark:border-ink-700"
                  >
                    {[
                      { tab: 'partner', label: 'Jadi Partner' },
                      { tab: 'jadi-mentor', label: 'Jadi Mentor' },
                    ].map((sub) => (
                      <button
                        key={sub.tab}
                        onClick={go(sub.tab)}
                        aria-current={currentTab === sub.tab ? 'page' : undefined}
                        className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-[15px] transition-colors cursor-pointer ${
                          currentTab === sub.tab
                            ? 'bg-surface-100 dark:bg-ink-800 text-ink-700 dark:text-brand-500 font-semibold'
                            : 'text-ink-600 dark:text-ink-200 hover:bg-surface-100 dark:hover:bg-ink-800'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Aktivitasku */}
              <button
                onClick={go('profil')}
                aria-current={currentTab === 'profil' ? 'page' : undefined}
                className={`${itemBase} ${currentTab === 'profil' ? itemActive : itemIdle}`}
              >
                <span>Aktivitasku</span>
                {role !== 'guest' && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-300 dark:bg-ink-700 text-ink-700 dark:text-brand-500 font-bold">
                    {userAccount.enrolledCourses.length + userAccount.mentoredCourses.length}
                  </span>
                )}
              </button>

              {/* 6. Tentang Kami */}
              <button
                onClick={go('tentang')}
                aria-current={currentTab === 'tentang' ? 'page' : undefined}
                className={`${itemBase} ${currentTab === 'tentang' ? itemActive : itemIdle}`}
              >
                <span>Tentang Kami</span>
              </button>

              {/* 7. Bantuan / Hubungi CS (WhatsApp) */}
              <a
                href={WHATSAPP_CS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className={`${itemBase} ${itemIdle}`}
              >
                <span>Bantuan / Hubungi CS</span>
                <MessageCircle className="w-4 h-4 text-ink-400 dark:text-brand-500" />
              </a>

              {/* Admin Review (hanya untuk Admin) */}
              {role === 'admin' && (
                <button
                  onClick={go('admin')}
                  className={`${itemBase} justify-start gap-2.5 bg-brand-500 text-ink-900 font-semibold hover:bg-ink-600`}
                >
                  <ShieldCheck className="w-4 h-4 text-brand-500" />
                  <span>Admin Review Console</span>
                </button>
              )}
            </>
          );
        })()}
      </nav>

      {/* FOOTER DRAWER */}
      <div className="shrink-0 pt-4 border-t border-surface-300 dark:border-ink-700">
        {role === 'guest' ? (
          <button
            onClick={() => {
              closeMobileMenu();
              onOpenAuthModal('login');
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-brand-500 hover:bg-ink-600 text-ink-900 font-semibold text-center shadow-md transition-colors cursor-pointer"
          >
            Masuk atau Daftar
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <img
              src={userAccount.avatar}
              alt=""
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-brand-500 dark:ring-brand-400 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink-800 dark:text-surface-200 truncate">
                {userAccount.name}
              </p>
              <span
                className={`inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded font-semibold ${getRoleBadgeStyle(role)}`}
              >
                {getRoleLabel(role)}
              </span>
            </div>
            <button
              onClick={() => {
                setRole('guest');
                closeMobileMenu();
              }}
              className="min-h-[44px] px-4 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-sm font-semibold flex items-center gap-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};
