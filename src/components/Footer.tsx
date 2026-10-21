import React from 'react';
import { Sparkles, MessageCircle, ExternalLink, Globe, Shield, Lock } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenAdminPin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenAdminPin }) => {
  const whatsappUrl =
    'https://wa.me/628123456789?text=Halo%20Admin%20EmpowerHub,%20saya%20butuh%20bantuan';

  return (
    <footer className="mt-0 border-t border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-900 transition-colors duration-300">
      
      {/* Help / WhatsApp Direct CS Card inside Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="p-6 sm:p-8 rounded-3xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-[0_4px_20px_-4px_rgba(25,25,25,0.08)]">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-ink-900 dark:text-surface-50">
                Masih Punya Pertanyaan Lain?
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-200">
                Tim kurator kami siap membantu kendala akses, saran materi, maupun pertanyaan seputar kelas.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-2 shadow-sm transition-all shrink-0"
          >
            <span>Hubungi Tim Admin / CS via WhatsApp</span>
            <ExternalLink className="w-4 h-4 text-emerald-200" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-ink-900">
                <Sparkles className="w-4 h-4 text-brand-500" />
              </div>
              <span className="font-heading text-lg font-extrabold text-ink-700 dark:text-surface-50">
                Empower<span className="text-brand-500">Hub</span>
              </span>
            </div>
            <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed max-w-sm">
              Platform modern pemberdayaan keterampilan digital, kurikulum vibe coding terapan, serta kurasi produk solopreneur bersama mitra strategis <strong>Pasar Daya</strong>.
            </p>
            <div className="pt-1 flex items-center gap-3 text-xs text-ink-400 dark:text-ink-300">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                Terverifikasi Aman
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-ink-700 dark:text-brand-500" />
                Indonesia &amp; Global
              </span>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="md:col-span-3 space-y-2.5 text-xs">
            <h4 className="font-bold text-ink-900 dark:text-white uppercase tracking-wider text-[11px]">
              Kurikulum Populer
            </h4>
            <ul className="space-y-1.5 text-ink-600 dark:text-ink-300">
              <li>
                <button onClick={() => onNavigateTab('katalog')} className="hover:text-ink-700 dark:hover:text-brand-500 text-left">
                  Pengenalan Vibe Coding (Gratis)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('katalog')} className="hover:text-ink-700 dark:hover:text-brand-500 text-left">
                  Kelas Google Workspace Pemula
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('katalog')} className="hover:text-ink-700 dark:hover:text-brand-500 text-left">
                  Skill to Income Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('katalog')} className="hover:text-ink-700 dark:hover:text-brand-500 text-left">
                  Emotional Healing Worksheet
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="md:col-span-4 space-y-2.5 text-xs">
            <h4 className="font-bold text-ink-900 dark:text-white uppercase tracking-wider text-[11px]">
              Kemitraan &amp; Ekosistem
            </h4>
            <div className="p-3 rounded-2xl border border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-ink-700 dark:text-brand-500">
                  Mitra Pasar Daya
                </span>
                <span className="text-[10px] bg-brand-400 text-ink-900 font-bold px-1.5 py-0.2 rounded">
                  Official Partner
                </span>
              </div>
              <p className="text-[11px] text-ink-600 dark:text-ink-200 mt-1">
                Jelajahi produk fisik &amp; digital solopreneur terkurasi di website mitra kami.
              </p>
              <div className="pt-2 flex items-center gap-3 text-[11px] font-bold">
                <button
                  onClick={() => onNavigateTab('partner')}
                  className="text-ink-700 dark:text-brand-500 hover:underline text-left"
                >
                  Jadi Partner →
                </button>
                <span>·</span>
                <button
                  onClick={() => onNavigateTab('jadi-mentor')}
                  className="text-ink-700 dark:text-brand-500 hover:underline text-left"
                >
                  Jadi Mentor →
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with discrete Portal Pengelola */}
        <div className="mt-8 pt-6 border-t border-surface-300 dark:border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-400 dark:text-ink-300">
          <p>© 2026 EmpowerHub. Seluruh hak cipta dilindungi.</p>
          
          <div className="flex items-center gap-4">
            <span>Dibuat dengan dedikasi untuk pemberdayaan ekonomi talenta</span>
            <span>·</span>
            <button
              onClick={() => onNavigateTab('panduan')}
              className="text-[11px] text-ink-400 dark:text-ink-300 hover:text-ink-700 dark:hover:text-brand-500 transition-colors cursor-pointer"
            >
              Dokumen Panduan
            </button>
            <span>·</span>
            {/* Tautan diskret Portal Pengelola */}
            <button
              onClick={onOpenAdminPin}
              className="inline-flex items-center gap-1 text-[11px] text-ink-400 dark:text-ink-400 hover:text-ink-700 dark:hover:text-brand-500 transition-colors cursor-pointer"
              title="Akses terbatas pengelola"
            >
              <Lock className="w-3 h-3" />
              <span>Portal Pengelola</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
