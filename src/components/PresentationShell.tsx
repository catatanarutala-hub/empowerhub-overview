import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, ChevronDown, Presentation, RotateCcw } from 'lucide-react';
import App from '../App';

type Device = 'mobile' | 'tablet' | 'desktop';

const DEVICES: { id: Device; label: string; size: string; width: number; height: number; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'mobile', label: 'Mobile', size: '390 px', width: 390, height: 844, Icon: Smartphone },
  { id: 'tablet', label: 'Tablet', size: '820 px', width: 820, height: 1180, Icon: Tablet },
  { id: 'desktop', label: 'Desktop', size: 'Penuh', width: 0, height: 0, Icon: Monitor },
];

/**
 * Pembungkus mode presentasi (khusus prototipe).
 * - Desktop: aplikasi tampil penuh seperti biasa.
 * - Mobile / Tablet: aplikasi yang sama dimuat di dalam iframe selebar perangkat,
 *   sehingga breakpoint Tailwind (sm, md, lg) bekerja seperti di perangkat sungguhan.
 * Aplikasi desktop tetap terpasang (disembunyikan) agar statusnya tidak hilang saat berpindah.
 */
export const PresentationShell: React.FC = () => {
  const [device, setDevice] = useState<Device>('desktop');
  const [collapsed, setCollapsed] = useState(false);
  const current = DEVICES.find((d) => d.id === device)!;
  const framed = device !== 'desktop';

  const embedUrl = `${window.location.origin}${window.location.pathname}?embed=1`;

  return (
    <>
      <div className={framed ? 'hidden' : undefined}>
        <App />
      </div>

      {framed && (
        <div className="fixed inset-0 z-[150] overflow-auto bg-surface-300 dark:bg-ink-900 flex items-start justify-center px-3 pt-4 pb-24">
          <div
            className="relative shrink-0 rounded-[2.25rem] border-[10px] border-ink-900 bg-ink-900 shadow-2xl overflow-hidden"
            style={{ width: `min(${current.width}px, calc(100vw - 24px))`, height: `min(${current.height}px, calc(100vh - 110px))` }}
          >
            <iframe
              key={device}
              src={embedUrl}
              title={`Pratinjau EmpowerHub, tampilan ${current.label}`}
              className="w-full h-full rounded-[1.5rem] bg-white border-0"
            />
          </div>
        </div>
      )}

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[200] hidden md:block">
        {collapsed ? (
          <button
            onClick={() => setCollapsed(false)}
            aria-label="Buka kontrol mode presentasi"
            className="w-11 h-11 rounded-full bg-brand-500 text-ink-900 shadow-lg flex items-center justify-center hover:bg-brand-400 cursor-pointer"
          >
            <Presentation className="w-5 h-5" />
          </button>
        ) : (
          <div
            role="group"
            aria-label="Pilih tampilan perangkat untuk presentasi"
            className="flex items-center gap-1 p-1.5 rounded-full bg-ink-900/95 text-white shadow-xl border border-white/10 backdrop-blur"
          >
            {DEVICES.map(({ id, label, size, Icon }) => {
              const active = device === id;
              return (
                <button
                  key={id}
                  onClick={() => setDevice(id)}
                  aria-pressed={active}
                  title={`${label} (${size})`}
                  className={`min-h-[40px] px-3.5 rounded-full text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                    active ? 'bg-brand-400 text-ink-900' : 'text-white/85 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                try { localStorage.removeItem('empowerhub-demo-state-v1'); } catch { /* abaikan */ }
                window.location.reload();
              }}
              title="Reset data demo (kelas, keranjang, peran) ke awal"
              aria-label="Reset data demo"
              className="min-h-[40px] px-3 rounded-full text-sm font-semibold text-white/85 hover:bg-white/10 flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={() => setCollapsed(true)}
              aria-label="Sembunyikan kontrol mode presentasi"
              className="w-9 h-9 rounded-full text-white/70 hover:bg-white/10 flex items-center justify-center cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
