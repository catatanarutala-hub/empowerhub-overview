import React, { useState } from 'react';
import { X, Lock, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === 'admin123') {
      setError(false);
      setPin('');
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-900 p-6 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setError(false);
            setPin('');
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl text-ink-400 dark:text-ink-300 hover:text-ink-600 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-ink-700"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-500 text-ink-900 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6 text-brand-500" />
          </div>
          <h3 className="text-lg font-black text-ink-900 dark:text-white">
            Portal Pengelola (Admin)
          </h3>
          <p className="text-xs text-ink-400 dark:text-ink-300">
            Masukkan PIN pengelola untuk mengaktifkan akses kurasi materi dan review platform.
          </p>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-ink-700 dark:text-ink-200 block">
              PIN Keamanan Pengelola
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-300" />
              <input
                type="password"
                placeholder="Masukkan PIN..."
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError(false);
                }}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-900 text-ink-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
              />
            </div>
            {error && (
              <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>PIN salah. Silakan coba lagi (Petunjuk: admin123).</span>
              </p>
            )}
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setError(false);
                setPin('');
                onClose();
              }}
              className="flex-1 py-2.5 rounded-xl border border-surface-300 dark:border-ink-700 text-xs font-bold text-ink-600 dark:text-ink-200 hover:bg-surface-100 dark:hover:bg-ink-700"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-ink-900 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
              <span>Verifikasi PIN</span>
            </button>
          </div>
        </form>

        <p className="text-[10px] text-center text-ink-400 dark:text-ink-300">
          Akses terbatas hanya untuk tim kurator dan pengelola EmpowerHub.
        </p>
      </div>
    </div>
  );
};
