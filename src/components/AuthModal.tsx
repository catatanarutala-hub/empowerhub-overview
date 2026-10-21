import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: 'mentee', name?: string) => void;
  initialTab?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialTab = 'login',
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initialTab when modal opens
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess('mentee', name.trim() || 'Dewi Sartika');
      onClose();
    }, 400);
  };

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess('mentee', 'Dewi Sartika');
      onClose();
    }, 400);
  };

  const handleQuickDemo = () => {
    onLoginSuccess('mentee', 'Dewi Sartika');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 shadow-2xl p-6 sm:p-7 text-ink-800 dark:text-surface-50 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-ink-400 dark:text-ink-300 hover:text-ink-600 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-ink-700 transition-colors cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center text-ink-900 mx-auto shadow-md">
            <Sparkles className="w-6 h-6 text-brand-500" />
          </div>
          <h3 className="text-xl font-black text-ink-900 dark:text-white">
            {activeTab === 'login' ? 'Masuk ke EmpowerHub' : 'Daftar Akun Baru'}
          </h3>
          <p className="text-xs text-ink-400 dark:text-ink-300 max-w-xs mx-auto">
            Satu akun untuk belajar mandiri sekaligus berbagi ilmu sebagai mentor.
          </p>
        </div>

        {/* 2 Tab: [Masuk] dan [Daftar Akun Baru] */}
        <div className="mt-5 flex items-center p-1 bg-surface-100 dark:bg-ink-900 rounded-2xl border border-surface-300 dark:border-ink-700">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white dark:bg-brand-500 text-ink-900 dark:text-ink-900 shadow-xs'
                : 'text-ink-400 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white'
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white dark:bg-brand-500 text-ink-900 dark:text-ink-900 shadow-xs'
                : 'text-ink-400 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white'
            }`}
          >
            Daftar Akun Baru
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {activeTab === 'register' && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-ink-700 dark:text-ink-200">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-300" />
                <input
                  type="text"
                  placeholder="Contoh: Dewi Sartika"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-900 text-ink-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-ink-700 dark:text-ink-200">
              Alamat Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-300" />
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-900 text-ink-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-ink-700 dark:text-ink-200">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-300" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-900 text-ink-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <span>{activeTab === 'login' ? 'Masuk Sekarang' : 'Buat Akun Sekarang'}</span>
            <ArrowRight className="w-4 h-4 text-brand-500" />
          </button>
        </form>

        {/* Google Login Option */}
        <div className="mt-4 space-y-3">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-surface-300 dark:border-ink-700 w-full" />
            <span className="bg-white dark:bg-ink-800 px-2 text-[10px] text-ink-400 dark:text-ink-300 uppercase font-semibold">
              atau
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2.5 px-3 rounded-xl border border-surface-300 dark:border-ink-700 hover:bg-surface-100 dark:hover:bg-ink-700 text-xs font-semibold text-ink-700 dark:text-surface-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Masuk dengan Google</span>
          </button>

          {/* Quick Demo Button for fast testing */}
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2 px-3 rounded-xl bg-surface-100 dark:bg-ink-900 text-ink-700 dark:text-brand-500 border border-surface-300 dark:border-ink-700 text-xs font-bold hover:bg-surface-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Masuk Cepat Demo (Dewi Sartika)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
