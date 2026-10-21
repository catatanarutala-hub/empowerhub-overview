import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  RotateCcw, 
  ShoppingCart, 
  PlayCircle, 
  ExternalLink,
  Star,
  Check,
  HeartHandshake
} from 'lucide-react';
import { Product, AssessmentQuestion } from '../types';
import { ASSESSMENT_QUESTIONS, calculateAssessmentResult } from '../data/assessmentQuestions';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onOpenLearningPlayer: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  products,
  onOpenLearningPlayer,
  onAddToCart,
  onBuyNow,
}) => {
  if (!isOpen) return null;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Compute active question list based on conditions (e.g. Q2-alt only if 'belum_tahu' chosen in Q1)
  const activeQuestions: AssessmentQuestion[] = ASSESSMENT_QUESTIONS.filter((q) => {
    if (!q.conditionalOn) return true;
    const parentAnswer = answers[q.conditionalOn.questionId];
    if (Array.isArray(parentAnswer)) {
      return parentAnswer.includes(q.conditionalOn.optionId);
    }
    return parentAnswer === q.conditionalOn.optionId;
  });

  const currentQuestion = activeQuestions[currentStepIndex] || activeQuestions[0];
  const totalSteps = activeQuestions.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const currentAnswer = answers[currentQuestion.id];

  // Option click handlers
  const handleOptionSelect = (optionId: string) => {
    if (currentQuestion.isMultiSelect) {
      const selected = (Array.isArray(currentAnswer) ? currentAnswer : []) as string[];
      let updated: string[];

      if (selected.includes(optionId)) {
        updated = selected.filter((id) => id !== optionId);
      } else {
        // If selecting "belum_tahu", unselect others; if selecting other, remove "belum_tahu"
        if (optionId === 'belum_tahu') {
          updated = ['belum_tahu'];
        } else {
          const withoutBelumTahu = selected.filter((id) => id !== 'belum_tahu');
          const max = currentQuestion.maxSelect || 3;
          if (withoutBelumTahu.length >= max) {
            return; // limit reached
          }
          updated = [...withoutBelumTahu, optionId];
        }
      }

      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: updated,
      }));
    } else {
      // Single select
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionId,
      }));

      // Automatically advance after brief feedback
      setTimeout(() => {
        if (currentStepIndex < totalSteps - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsCompleted(true);
        }
      }, 180);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  // Calculate assessment result
  const result = calculateAssessmentResult(answers, products);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl my-auto rounded-3xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-800 dark:text-surface-50 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header & Progress */}
        <div className="px-5 py-4 border-b border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center text-ink-900">
              <Sparkles className="w-4 h-4 text-brand-500" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-ink-900 dark:text-white">
                {isCompleted ? 'Hasil Diagnosa Asesmen Belajar' : 'Asesmen Belajar Terpersonalisasi'}
              </h2>
              <span className="text-[10px] text-ink-400 dark:text-ink-300">
                {isCompleted ? 'Rekomendasi kurikulum paling pas untuk Anda' : `Langkah ${currentStepIndex + 1} dari ${totalSteps}`}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-400 dark:text-ink-300 hover:text-ink-700 dark:hover:text-white transition-colors"
            aria-label="Tutup Asesmen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (Visible during questions) */}
        {!isCompleted && (
          <div className="w-full bg-brand-100 dark:bg-ink-700 h-1.5 overflow-hidden">
            <div 
              className="bg-brand-500 dark:bg-brand-400 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-7 flex-1">
          {!isCompleted ? (
            /* 1 PERTANYAAN PER LAYAR VIEW */
            <div className="space-y-6">
              
              {/* Question Header */}
              <div className="space-y-1.5">
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-ink-700 dark:text-brand-500">
                  Pertanyaan {currentStepIndex + 1} / {totalSteps}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-ink-900 dark:text-surface-50 leading-snug">
                  {currentQuestion.title}
                </h3>
                {currentQuestion.subtitle && (
                  <p className="text-xs text-ink-400 dark:text-ink-300">
                    {currentQuestion.subtitle}
                  </p>
                )}
              </div>

              {/* Options list */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((option) => {
                  const isSelected = currentQuestion.isMultiSelect
                    ? Array.isArray(currentAnswer) && currentAnswer.includes(option.id)
                    : currentAnswer === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleOptionSelect(option.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-brand-500 bg-brand-100/50 dark:border-brand-400 dark:bg-ink-700 shadow-xs'
                          : 'border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 hover:border-brand-400 dark:hover:border-brand-400'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-xs sm:text-sm ${
                            isSelected ? 'text-ink-700 dark:text-brand-500' : 'text-ink-800 dark:text-surface-300'
                          }`}>
                            {option.label}
                          </span>
                        </div>
                        {option.description && (
                          <p className="text-[11px] text-ink-400 dark:text-ink-300 leading-relaxed">
                            {option.description}
                          </p>
                        )}
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? 'bg-brand-500 border-brand-500 text-ink-900 dark:bg-brand-400 dark:border-brand-400 dark:text-ink-900'
                          : 'border-ink-200 dark:border-ink-600'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Multi-select indicator & Next button */}
              {currentQuestion.isMultiSelect && (
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-ink-400 dark:text-ink-300 text-[11px]">
                    Dipilih: {(Array.isArray(currentAnswer) ? currentAnswer.length : 0)} / {currentQuestion.maxSelect || 3}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
                    className="px-5 py-2 text-xs font-bold rounded-xl bg-brand-500 text-ink-900 hover:bg-brand-400 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Lanjutkan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* HALAMAN HASIL ASESMEN VIEW */
            <div className="space-y-6">
              
              {/* Top Banner Recommendation */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-brand-400 text-ink-900 shadow-sm">
                  <Award className="w-4 h-4 text-ink-700" />
                  <span>Kecocokan {result.matchScore}% · Sangat Cocok</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-ink-900 dark:text-white">
                  Rekomendasi Utama Pembelajaran Anda
                </h3>
                <p className="text-xs text-ink-600 dark:text-ink-300 max-w-md mx-auto">
                  Dihitung secara personal dari 16 preferensi Anda terkait waktu, format, dan bahasa tanpa istilah teknis.
                </p>
              </div>

              {/* Primary Card */}
              <div className="rounded-3xl border-2 border-brand-500 dark:border-brand-400 bg-white dark:bg-ink-800 shadow-xl overflow-hidden p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={result.primaryProduct.thumbnail}
                      alt={result.primaryProduct.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-brand-500"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-400 text-ink-900">
                          {result.primaryProduct.price === 0 ? 'GRATIS' : result.primaryProduct.formattedPrice}
                        </span>
                        <span className="text-[10px] text-ink-400 dark:text-ink-300 font-medium">
                          {result.primaryProduct.category} · {result.primaryProduct.typeLabel}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-ink-900 dark:text-white leading-tight">
                        {result.primaryProduct.title}
                      </h4>
                      <p className="text-xs text-ink-600 dark:text-ink-200 mt-0.5">
                        Instruktur: {result.primaryProduct.mentorName}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right w-full sm:w-auto">
                    <div className="flex items-center sm:justify-end gap-1 text-brand-500 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
                      <span className="text-ink-800 dark:text-surface-300">{result.primaryProduct.rating}</span>
                      <span className="text-ink-400 dark:text-ink-300">({result.primaryProduct.studentCount} peserta)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-ink-600 dark:text-ink-200 leading-relaxed pt-1">
                  {result.primaryProduct.description}
                </p>

                {/* Personal Reason Box */}
                <div className="p-3.5 rounded-2xl bg-surface-100 dark:bg-ink-900 border border-surface-300 dark:border-ink-700 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-ink-700 dark:text-brand-500 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Mengapa kurikulum ini sangat tepat untuk Anda:</span>
                  </div>
                  <ul className="space-y-1 text-ink-700 dark:text-ink-200 text-[11px] pl-1">
                    {result.personalReasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-ink-400 dark:text-ink-300 text-center sm:text-left">
                    <span>Durasi / Format: <strong>{result.primaryProduct.durationOrSpecs.split('·')[0]}</strong></span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {result.primaryProduct.price === 0 ? (
                      /* Free course action: Directly opens learning space without forced login */
                      <button
                        onClick={() => {
                          onClose();
                          onOpenLearningPlayer(result.primaryProduct);
                        }}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center justify-center gap-2 shadow-md transition-all"
                      >
                        <PlayCircle className="w-4 h-4 text-brand-500" />
                        <span>Akses Sekarang (Langsung Belajar)</span>
                      </button>
                    ) : (
                      /* Paid course action: Add to cart or Buy now */
                      <>
                        <button
                          onClick={() => {
                            onAddToCart(result.primaryProduct);
                          }}
                          className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold text-xs border border-brand-500 dark:border-brand-400 text-ink-700 dark:text-brand-500 hover:bg-brand-100/50 flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>+ Keranjang</span>
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onBuyNow(result.primaryProduct);
                          }}
                          className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-xs bg-brand-500 hover:bg-brand-400 text-ink-900 flex items-center justify-center gap-1.5 shadow-md transition-all"
                        >
                          <span>Beli Sekarang</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* 2-3 Alternative Cards in Different Formats */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-ink-300">
                  Alternatif Format Pembelajaran Lainnya:
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.alternativeProducts.map(({ product, formatDifferenceNote }) => (
                    <div
                      key={product.id}
                      className="p-4 rounded-2xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 flex flex-col justify-between space-y-3 hover:border-brand-400 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-ink-400 dark:text-ink-300 mb-1">
                          <span className="font-bold text-ink-700 dark:text-brand-500">
                            {formatDifferenceNote}
                          </span>
                          <span className="font-extrabold text-ink-800 dark:text-surface-300">
                            {product.formattedPrice}
                          </span>
                        </div>
                        <h5 className="font-bold text-xs text-ink-900 dark:text-white break-words">
                          {product.title}
                        </h5>
                        <p className="text-[11px] text-ink-400 dark:text-ink-300 line-clamp-2 mt-0.5">
                          {product.tagline}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-surface-200 dark:border-ink-700">
                        <span className="text-[10px] text-ink-400 dark:text-ink-300">
                          {product.mentorName}
                        </span>
                        {product.price === 0 ? (
                          <button
                            onClick={() => {
                              onClose();
                              onOpenLearningPlayer(product);
                            }}
                            className="px-3 py-1 rounded-lg text-xs font-bold bg-brand-500 text-ink-900 hover:bg-brand-400"
                          >
                            Akses Gratis
                          </button>
                        ) : product.isAffiliate ? (
                          <a
                            href={product.affiliateUrl || 'https://pasardaya.vercel.app'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded-lg text-xs font-bold bg-brand-400 text-ink-900 flex items-center gap-1"
                          >
                            <span>Pasar Daya</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <button
                            onClick={() => onAddToCart(product)}
                            className="px-3 py-1 rounded-lg text-xs font-bold border border-surface-300 dark:border-ink-700 hover:bg-surface-100 text-ink-700 dark:text-brand-500"
                          >
                            + Keranjang
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset / Retake Button */}
              <div className="text-center pt-2">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-400 dark:text-ink-300 hover:text-ink-700 dark:hover:text-brand-500 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Asesmen dari Awal</span>
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Modal Bottom Navigation Bar (When on questions) */}
        {!isCompleted && (
          <div className="p-4 border-t border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-900 flex items-center justify-between text-xs">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="px-3.5 py-2 rounded-xl font-semibold text-ink-600 dark:text-ink-200 hover:bg-surface-100 dark:hover:bg-ink-800 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <span className="text-[11px] text-ink-400 dark:text-ink-300">
              {currentStepIndex + 1} dari {totalSteps}
            </span>

            {!currentQuestion.isMultiSelect && (
              <button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="px-4 py-2 rounded-xl font-bold bg-brand-500 text-ink-900 hover:bg-brand-400 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 shadow-xs"
              >
                <span>Lewati / Lanjut</span>
                <ArrowRight className="w-4 h-4 text-brand-500" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
