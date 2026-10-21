import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Apakah kelas di EmpowerHub benar-benar ramah untuk pemula tanpa latar belakang teknis?',
      answer:
        'Ya, seluruh materi dikurasi agar menggunakan bahasa sehari-hari tanpa istilah membingungkan. Setiap istilah penting selalu dilengkapi dengan penjelasan sederhana dan contoh langsung yang aplikatif.',
    },
    {
      question: 'Apakah saya harus membuat akun untuk mencoba asesmen belajar?',
      answer:
        'Tidak perlu! Kamu bisa langsung mengisi asesmen 5 menit untuk mendapatkan rekomendasi kelas yang selaras dengan minat dan waktumu. Akun baru diperlukan saat kamu ingin menyimpan histori sertifikat atau membeli kelas berbayar.',
    },
    {
      question: 'Bagaimana cara mengakses materi atau kelas yang berlabel GRATIS?',
      answer:
        'Materi gratis bisa langsung kamu tonton atau unduh tanpa harus memasukkan kartu pembayaran maupun login terlebih dahulu. Kami ingin memastikan akses ilmu terbuka lebar untuk semua orang.',
    },
    {
      question: 'Saya punya keahlian dan ingin jadi mentor, bagaimana alurnya?',
      answer:
        'Kamu bisa membeli akses mentor melalui mitra kami di Pasar Daya, lalu mengunggah materi di dasbor EmpowerHub untuk melewati proses kurasi ramah pengajar dari tim kami.',
    },
    {
      question: 'Bagaimana jika jadwal harian saya sangat padat?',
      answer:
        'Sebagian besar format kami adalah micro-learning (video 5-15 menit) dan produk unduhan mandiri yang bisa kamu pelajari kapan saja di sela waktu luangmu tanpa takut tertinggal jadwal live.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide mb-3 bg-brand-100 text-ink-800 dark:bg-ink-700 dark:text-brand-500">
          <HelpCircle className="w-3.5 h-3.5 text-ink-800 dark:text-brand-500" />
          <span>Pertanyaan Umum</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink-900 dark:text-surface-50 tracking-tight">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-200">
          Temukan jawaban atas hal-hal penting seputar proses belajar, materi, dan kemitraan mentor di EmpowerHub.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="max-w-3xl mx-auto space-y-3.5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-300 overflow-hidden shadow-[0_4px_20px_-4px_rgba(25,25,25,0.08)] ${
                isOpen
                  ? 'border-2 border-brand-500 dark:border-brand-400 bg-surface-100 dark:bg-ink-800 shadow-[0_8px_25px_-4px_rgba(25,25,25,0.14)]'
                  : 'border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 hover:border-brand-400'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
                className="w-full text-left px-5 sm:px-6 py-4.5 sm:py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
              >
                <span className="font-bold text-xs sm:text-sm text-ink-900 dark:text-surface-50 leading-snug">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? 'rotate-180 bg-brand-500 text-ink-900 shadow-xs'
                      : 'bg-surface-300 dark:bg-ink-700 text-ink-700 dark:text-brand-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-ink-600 dark:text-ink-200 leading-relaxed border-t border-surface-300/60 dark:border-ink-700/80 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
