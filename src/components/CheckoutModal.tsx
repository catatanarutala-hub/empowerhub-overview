import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, 
  CheckCircle2, 
  QrCode, 
  CreditCard, 
  Wallet, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Building2, 
  Smartphone,
  BookOpen,
  Home
} from 'lucide-react';
import { Product } from '../types';

interface CheckoutModalProps {
  product: Product | null;
  items?: Product[];
  onClose: () => void;
  onSuccess: (products: Product[]) => void;
  onGoToProfile?: () => void;
  onGoToHome?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  product,
  items,
  onClose,
  onSuccess,
  onGoToProfile,
  onGoToHome,
}) => {
  const checkoutItems: Product[] = items && items.length > 0 
    ? items 
    : product ? [product] : [];

  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'ewallet' | 'va'>('qris');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Define action handlers with useCallback and before any useEffect hooks to prevent Temporal Dead Zone ReferenceErrors
  // Penyelesaian hanya boleh berjalan SEKALI per pembayaran. Tanpa penjaga ini,
  // callback dari induk berganti setiap render sehingga efek hitung mundur terpicu
  // berulang dan menyebabkan notifikasi berkedip tanpa henti.
  const finishedRef = useRef(false);

  const finishCheckout = useCallback((after?: () => void) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onSuccess(checkoutItems);
    if (after) after();
    onClose();
  }, [checkoutItems, onSuccess, onClose]);

  const handleCompleteLearning = useCallback(() => {
    finishCheckout(onGoToProfile);
  }, [finishCheckout, onGoToProfile]);

  const handleBackToHome = useCallback(() => {
    finishCheckout(onGoToHome);
  }, [finishCheckout, onGoToHome]);

  const handlePay = () => {
    finishedRef.current = false;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      setCountdown(3);
    }, 800);
  };

  // Reset completion & countdown when new items are checked out
  useEffect(() => {
    if (checkoutItems.length > 0) {
      finishedRef.current = false;
      setIsCompleted(false);
      setIsProcessing(false);
      setCountdown(3);
    }
  }, [product?.id, items?.length]);

  // Auto-redirect countdown after payment success
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCompleted && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isCompleted && countdown === 0) {
      handleCompleteLearning();
    }
    return () => clearTimeout(timer);
  }, [isCompleted, countdown, handleCompleteLearning]);

  if (checkoutItems.length === 0) return null;

  const totalPrice = checkoutItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-[94%] max-w-md mx-auto max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl bg-white dark:bg-ink-800 shadow-2xl my-auto text-ink-800 dark:text-surface-50 relative border border-surface-300 dark:border-ink-700 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Always-Available Close (X) Button */}
        <div className="flex items-center justify-between pb-3.5 border-b border-surface-300 dark:border-ink-700 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center text-ink-900">
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
              ) : (
                <Lock className="w-4 h-4 text-brand-500" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {isCompleted ? 'Konfirmasi Transaksi' : 'Pembayaran Instan Indonesia'}
              </h3>
              <p className="text-[10px] text-ink-400 dark:text-ink-300">
                {isCompleted ? 'Terverifikasi Secara Otomatis' : 'QRIS · E-Wallet · Virtual Account'}
              </p>
            </div>
          </div>

          {/* Close button is ALWAYS present to prevent freeze/trapping */}
          <button
            onClick={() => {
              if (isCompleted) {
                handleCompleteLearning();
              } else {
                onClose();
              }
            }}
            className="p-1.5 rounded-xl text-ink-400 dark:text-ink-300 hover:text-ink-600 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-ink-700 transition-colors cursor-pointer"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* State 1: Pembayaran Berhasil! Bebas Macet dengan 2 Tombol Tindakan & Countdown */}
        {isCompleted ? (
          <div className="py-8 sm:py-10 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-ink-900 dark:text-white">
                Pembayaran Berhasil!
              </h4>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200 max-w-sm mx-auto leading-relaxed">
                Selamat! <strong>{checkoutItems.length} produk</strong> telah otomatis terdaftar ke akun belajar Anda.
              </p>
            </div>

            {/* Countdown Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface-100 dark:bg-ink-900 text-ink-700 dark:text-brand-500 border border-surface-300 dark:border-ink-700">
              <span>Otomatis dialihkan dalam {countdown} detik...</span>
            </div>

            {/* 2 Action Buttons as requested */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* 1. Tombol Utama (Butter Yellow) */}
              <button
                onClick={handleCompleteLearning}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-brand-400 hover:bg-brand-300 text-ink-900 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-ink-700" />
                <span>Mulai Belajar Sekarang</span>
                <ArrowRight className="w-4 h-4 text-ink-900" />
              </button>

              {/* 2. Tombol Sekunder (Outline / Netral) */}
              <button
                onClick={handleBackToHome}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl font-semibold text-xs sm:text-sm border border-surface-300 dark:border-ink-700 text-ink-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-ink-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Kembali ke Beranda</span>
              </button>
            </div>
          </div>
        ) : (
          /* State 2: Checkout Form */
          <div className="overflow-y-auto pt-4 pr-3 sm:pr-4 space-y-4 text-xs flex-1 [scrollbar-gutter:stable]">
            
            {/* Products in this checkout */}
            <div className="space-y-2">
              <span className="font-bold block text-ink-700 dark:text-ink-200 text-[11px] uppercase tracking-wider">
                Ringkasan Pembelian ({checkoutItems.length} Item):
              </span>

              <div className="space-y-2 max-h-56 overflow-y-auto">
                {checkoutItems.map((item) => (
                  <div 
                    key={item.id}
                    className="p-2.5 rounded-2xl bg-surface-100 dark:bg-ink-900 border border-surface-300 dark:border-ink-700 flex items-center gap-3"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-11 h-11 shrink-0 rounded-xl object-cover ring-1 ring-brand-400"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[9.5px] font-bold text-ink-700 dark:text-ink-200 uppercase block">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-ink-900 dark:text-white leading-snug whitespace-normal break-words">
                        {item.title}
                      </h4>
                      <span className="text-xs font-black text-ink-700 dark:text-brand-500">
                        {item.formattedPrice}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Price Box */}
            <div className="p-3.5 rounded-2xl bg-surface-100 dark:bg-ink-800 border border-surface-300 dark:border-ink-700 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-ink-400 dark:text-ink-300 block font-medium">
                  Total Biaya Investasi
                </span>
                <span className="font-heading text-xl font-black text-ink-700 dark:text-brand-500">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-brand-400 text-ink-900">
                Sekali Bayar · Selamanya
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <span className="font-bold block text-ink-700 dark:text-ink-200 text-[11px] uppercase tracking-wider">
                Pilih Metode Pembayaran Cepat:
              </span>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('qris')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'qris'
                      ? 'border-brand-500 dark:border-brand-400 bg-surface-100 dark:bg-ink-700 font-bold shadow-xs'
                      : 'border-surface-300 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:bg-surface-100'
                  }`}
                >
                  <QrCode className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-ink-700 dark:text-brand-500" />
                  <span className="text-[11px] block truncate font-medium">QRIS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('ewallet')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'ewallet'
                      ? 'border-brand-500 dark:border-brand-400 bg-surface-100 dark:bg-ink-700 font-bold shadow-xs'
                      : 'border-surface-300 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:bg-surface-100'
                  }`}
                >
                  <Wallet className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-ink-700 dark:text-brand-500" />
                  <span className="text-[11px] block truncate font-medium">E-Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('va')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'va'
                      ? 'border-brand-500 dark:border-brand-400 bg-surface-100 dark:bg-ink-700 font-bold shadow-xs'
                      : 'border-surface-300 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:bg-surface-100'
                  }`}
                >
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-ink-700 dark:text-brand-500" />
                  <span className="text-[11px] block truncate font-medium">Virtual Acc</span>
                </button>
              </div>
            </div>

            {/* Payment Method Details Simulation */}
            <div className="p-3.5 sm:p-4 rounded-2xl border border-dashed border-surface-300 dark:border-ink-700 bg-surface-100/50 dark:bg-ink-900/50">
              {paymentMethod === 'qris' && (
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white p-1 rounded-xl shadow-xs shrink-0 flex items-center justify-center border border-surface-300">
                    <QrCode className="w-10 h-10 text-ink-900" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-ink-900 dark:text-white">
                      Scan QRIS Bank &amp; E-Wallet
                    </h5>
                    <p className="text-[11px] text-ink-400 dark:text-ink-300 mt-0.5">
                      BCA, Mandiri, BRI, GoPay, OVO, ShopeePay, Dana terverifikasi otomatis.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'ewallet' && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-ink-900 dark:text-white font-bold">
                    <Smartphone className="w-4 h-4 text-ink-700 dark:text-brand-500" />
                    <span>Nomor E-Wallet Terdaftar</span>
                  </div>
                  <input
                    type="text"
                    disabled
                    value="0812-3456-7890 (Dewi Sartika)"
                    className="w-full p-2 bg-white dark:bg-ink-800 rounded-xl border border-surface-300 dark:border-ink-700 font-mono text-[11px]"
                  />
                </div>
              )}

              {paymentMethod === 'va' && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-ink-900 dark:text-white font-bold">
                    <Building2 className="w-4 h-4 text-ink-700 dark:text-brand-500" />
                    <span>Nomor Virtual Account BCA</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-ink-800 rounded-xl border border-surface-300 dark:border-ink-700 font-mono text-xs font-bold text-ink-700 dark:text-brand-500 flex items-center justify-between">
                    <span>8801 2345 6789 0012</span>
                    <span className="text-[10px] text-ink-400 dark:text-ink-300 font-sans font-normal">Salin</span>
                  </div>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <div className="pt-2">
              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3 px-3 rounded-xl font-semibold text-xs sm:text-sm bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-brand-500" />
                    <span>Memproses Verifikasi Pembayaran...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-brand-500 shrink-0" />
                    <span>Simulasi Bayar Berhasil (Rp {totalPrice.toLocaleString('id-ID')})</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-center text-ink-400 dark:text-ink-300">
              Transaksi aman 256-bit SSL · Akses materi langsung aktif tanpa menunggu manual.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
