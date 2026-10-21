import React, { useEffect, useState } from 'react';
import {
  X,
  Trash2,
  ShoppingCart,
  ArrowRight,
  Check,
  Compass,
  CreditCard,
} from 'lucide-react';
import { Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Product[];
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
  /** Dipanggil dengan item yang DIPILIH saja (bukan seluruh isi keranjang). */
  onProceedCheckout: (selectedItems: Product[]) => void;
  /** Dipanggil untuk menuju halaman "Katalog Kelas & Produk". */
  onBrowseCatalog: () => void;
}

/** Kotak centang kustom yang ramah sentuhan. */
const CheckBox: React.FC<{ checked: boolean }> = ({ checked }) => (
  <span
    aria-hidden="true"
    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
      checked
        ? 'bg-brand-500 border-brand-500 dark:bg-brand-400 dark:border-brand-400'
        : 'bg-white dark:bg-ink-900 border-ink-200 dark:border-ink-600'
    }`}
  >
    {checked && <Check className="w-3.5 h-3.5 text-ink-900" strokeWidth={3} />}
  </span>
);

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveFromCart,
  onClearCart,
  onProceedCheckout,
  onBrowseCatalog,
}) => {
  // Yang disimpan adalah item yang TIDAK dipilih, sehingga produk baru
  // yang masuk keranjang otomatis ikut terpilih.
  const [deselectedIds, setDeselectedIds] = useState<Set<string>>(new Set());

  // Bersihkan id yang sudah tidak ada di keranjang
  useEffect(() => {
    setDeselectedIds((prev) => {
      const cartIds = new Set(cart.map((p) => p.id));
      const next = new Set([...prev].filter((id) => cartIds.has(id)));
      return next.size === prev.size ? prev : next;
    });
  }, [cart]);

  if (!isOpen) return null;

  const selectedItems = cart.filter((p) => !deselectedIds.has(p.id));
  const selectedCount = selectedItems.length;
  const allSelected = cart.length > 0 && selectedCount === cart.length;
  const totalPrice = selectedItems.reduce((acc, curr) => acc + curr.price, 0);

  const toggleItem = (id: string) => {
    setDeselectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setDeselectedIds(allSelected ? new Set(cart.map((p) => p.id)) : new Set());
  };

  const handleBrowseCatalog = () => {
    onClose();
    onBrowseCatalog();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang Belanja"
        className="w-full sm:max-w-md lg:max-w-lg h-full bg-white dark:bg-ink-900 sm:border-l border-surface-300 dark:border-ink-700 shadow-2xl flex flex-col text-ink-800 dark:text-surface-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-surface-300 dark:border-ink-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-ink-900">
              <ShoppingCart className="w-4 h-4 text-brand-500" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Keranjang Belanja</h3>
              <p className="text-[11px] sm:text-xs text-ink-400 dark:text-ink-300">
                {cart.length} Materi Kursus &amp; Produk
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-ink-400 dark:text-ink-300 hover:text-ink-700 dark:hover:text-white cursor-pointer"
            aria-label="Tutup Keranjang"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-surface-100 dark:bg-ink-800 flex items-center justify-center text-ink-400 dark:text-ink-300">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-sm sm:text-base text-ink-700 dark:text-ink-200">
                Keranjang Belanja Masih Kosong
              </h4>
              <p className="text-xs sm:text-sm text-ink-400 dark:text-ink-300 max-w-xs">
                Pilih kursus atau produk digital bernilai tinggi dari katalog untuk mulai belajar.
              </p>
              <button
                onClick={handleBrowseCatalog}
                className="mt-2 min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-brand-500 hover:bg-brand-400 text-ink-900 inline-flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4 text-brand-500" />
                Jelajahi Katalog
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Pilih semua + Kosongkan */}
              <div className="flex items-center justify-between gap-3 pb-1">
                <button
                  onClick={toggleAll}
                  role="checkbox"
                  aria-checked={allSelected}
                  className="min-h-[44px] flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-ink-700 dark:text-surface-300 cursor-pointer"
                >
                  <CheckBox checked={allSelected} />
                  <span>
                    Pilih Semua
                    <span className="font-normal text-ink-400 dark:text-ink-300">
                      {' '}
                      ({selectedCount}/{cart.length})
                    </span>
                  </span>
                </button>
                <button
                  onClick={onClearCart}
                  className="min-h-[44px] px-1 text-ink-400 dark:text-ink-300 hover:text-rose-500 text-[11px] sm:text-xs font-semibold cursor-pointer"
                >
                  Kosongkan Semua
                </button>
              </div>

              {cart.map((product) => {
                const isSelected = !deselectedIds.has(product.id);
                return (
                  <div
                    key={product.id}
                    className={`p-3 rounded-2xl border bg-white dark:bg-ink-800 flex items-center gap-1 shadow-xs transition-colors ${
                      isSelected
                        ? 'border-brand-500 dark:border-brand-400/60'
                        : 'border-surface-300 dark:border-ink-700 opacity-80'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(product.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      aria-label={`Pilih ${product.title} untuk checkout`}
                      className="flex-1 min-w-0 flex items-center gap-3 text-left cursor-pointer"
                    >
                      <CheckBox checked={isSelected} />
                      <img
                        src={product.thumbnail}
                        alt=""
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover ring-1 ring-brand-400 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] text-ink-700 dark:text-ink-200 font-semibold block uppercase">
                          {product.category}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-ink-900 dark:text-white break-words">
                          {product.title}
                        </h4>
                        <span className="font-black text-xs sm:text-sm text-ink-700 dark:text-brand-500">
                          {product.formattedPrice}
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() => onRemoveFromCart(product.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg text-ink-400 dark:text-ink-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors shrink-0 cursor-pointer"
                      title="Hapus item"
                      aria-label={`Hapus ${product.title} dari keranjang`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}

              {/* Tambah produk lain -> Katalog */}
              <button
                onClick={handleBrowseCatalog}
                className="w-full min-h-[48px] px-4 py-3 rounded-2xl border border-dashed border-ink-200 dark:border-ink-600 text-ink-700 dark:text-brand-500 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 hover:bg-surface-100 dark:hover:bg-ink-800 transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                Tambah Produk Lain dari Katalog
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 space-y-3 shrink-0">
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between text-ink-400 dark:text-ink-300">
                <span>Subtotal ({selectedCount} Item dipilih):</span>
                <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-ink-400 dark:text-ink-300">
                <span>Biaya Layanan &amp; Pajak:</span>
                <span className="text-emerald-700 font-bold">Rp 0 (Gratis)</span>
              </div>
              <div className="flex justify-between font-black text-sm sm:text-base text-ink-900 dark:text-white pt-2 border-t border-dashed border-ink-200 dark:border-ink-700">
                <span>Total Pembayaran:</span>
                <span className="text-ink-700 dark:text-brand-500">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (selectedCount === 0) return;
                onClose();
                onProceedCheckout(selectedItems);
              }}
              disabled={selectedCount === 0}
              className="w-full min-h-[48px] py-3 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:bg-ink-200 disabled:text-ink-400 dark:disabled:bg-ink-700 dark:disabled:text-ink-400 disabled:cursor-not-allowed text-ink-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              {selectedCount === 0 ? (
                <span>Pilih minimal 1 produk untuk checkout</span>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 text-brand-500" />
                  <span>Lanjut ke Pembayaran Cepat</span>
                  <ArrowRight className="w-4 h-4 text-brand-500" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
