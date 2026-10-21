import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  CheckCircle2, 
  Circle, 
  FileText, 
  Download, 
  Award, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  BookOpen,
  Volume2,
  Share2,
  Printer
} from 'lucide-react';
import { Product, EnrolledCourse, Lesson } from '../types';

interface LearningPlayerModalProps {
  product: Product | null;
  enrolledData?: EnrolledCourse;
  onClose: () => void;
  onToggleLessonCompletion: (productId: string, lessonId: string) => void;
  /** Tandai modul selesai (tidak membatalkan) lalu pindah ke modul berikutnya. */
  onCompleteAndContinue: (productId: string, lessonId: string, nextLessonId?: string) => void;
  onUpdateNotes: (productId: string, notes: string) => void;
}

export const LearningPlayerModal: React.FC<LearningPlayerModalProps> = ({
  product,
  enrolledData,
  onClose,
  onToggleLessonCompletion,
  onCompleteAndContinue,
  onUpdateNotes,
}) => {
  const [activeLessonId, setActiveLessonId] = useState<string>(
    enrolledData?.lastLessonId || product?.lessons[0]?.id || ''
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'syllabus' | 'notes' | 'resources'>('syllabus');
  const [currentNote, setCurrentNote] = useState(enrolledData?.notes || '');
  const [showCertificate, setShowCertificate] = useState(false);

  // Sync state whenever product or enrolledData changes
  React.useEffect(() => {
    if (product && enrolledData) {
      setActiveLessonId(enrolledData.lastLessonId || product.lessons[0]?.id || '');
      setCurrentNote(enrolledData.notes || '');
      setIsPlaying(false);
    }
  }, [product?.id, enrolledData?.lastLessonId, enrolledData?.notes]);

  if (!product || !enrolledData) return null;

  const activeLesson: Lesson = 
    product.lessons.find((l) => l.id === activeLessonId) || product.lessons[0];

  const completedCount = enrolledData.completedLessonIds.length;
  const totalLessons = product.lessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);
  const isAllCompleted = progressPercent === 100;
  // Sertifikat hanya untuk kelas MOOC Terstruktur
  const hasCertificate = product.type === 'mooc';

  const handleLessonSelect = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setIsPlaying(true);
  };

  // --- Tombol "Selesai & Lanjut ke Modul Berikutnya" ---
  const activeIndex = Math.max(0, product.lessons.findIndex((l) => l.id === activeLesson.id));
  const isActiveCompleted = enrolledData.completedLessonIds.includes(activeLesson.id);
  const incompleteLessons = product.lessons.filter(
    (l) => !enrolledData.completedLessonIds.includes(l.id)
  );
  const isLastRemaining = incompleteLessons.length === 1 && !isActiveCompleted;

  // Modul berikutnya: yang belum selesai setelah modul aktif, jika tidak ada
  // kembali ke modul belum selesai paling awal (selain modul aktif).
  const nextLesson: Lesson | undefined =
    product.lessons.slice(activeIndex + 1).find(
      (l) => !enrolledData.completedLessonIds.includes(l.id)
    ) ||
    product.lessons.find(
      (l) => l.id !== activeLesson.id && !enrolledData.completedLessonIds.includes(l.id)
    );

  const handleCompleteAndContinue = () => {
    if (isAllCompleted) {
      if (hasCertificate) setShowCertificate(true);
      else onClose();
      return;
    }
    onCompleteAndContinue(product.id, activeLesson.id, nextLesson?.id);
    if (nextLesson) {
      setActiveLessonId(nextLesson.id);
      setIsPlaying(true);
    }
  };

  const handleSaveNotes = () => {
    onUpdateNotes(product.id, currentNote);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl h-[94vh] rounded-2xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-2xl flex flex-col overflow-hidden text-ink-800 dark:text-surface-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-4 py-3 border-b border-surface-300 dark:border-ink-700 bg-surface-100 dark:bg-ink-800 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-ink-900 shrink-0">
              <BookOpen className="w-4 h-4 text-brand-500" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold truncate text-ink-900 dark:text-surface-200">
                {product.title}
              </h3>
              <p className="text-[10px] text-ink-400 dark:text-ink-300 truncate">
                Instruktur: {product.mentorName} · Modul Aktif: {activeLesson?.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAllCompleted && hasCertificate && (
              <button
                onClick={() => setShowCertificate(true)}
                className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-brand-400 text-ink-900 flex items-center gap-1.5 shadow-sm hover:bg-brand-300 transition-colors"
              >
                <Award className="w-3.5 h-3.5 text-ink-700" />
                <span className="hidden sm:inline">Sertifikat Resmi</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-ink-400 dark:text-ink-300 hover:text-ink-700 dark:hover:text-white hover:bg-surface-300 dark:hover:bg-ink-700 transition-colors"
              aria-label="Tutup Ruang Belajar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Modal Overlay */}
        {showCertificate && hasCertificate && (
          <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-xl w-full rounded-2xl border-4 border-brand-400 bg-white dark:bg-ink-800 p-6 text-center shadow-2xl relative">
              <button
                onClick={() => setShowCertificate(false)}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-ink-400 dark:text-ink-300 hover:text-ink-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 mx-auto rounded-full bg-brand-100 dark:bg-ink-700 flex items-center justify-center text-ink-700 dark:text-brand-500 mb-3">
                <Award className="w-8 h-8" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest text-ink-700 dark:text-brand-500">
                EmpowerHub Official Certificate of Completion
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold mt-1 text-ink-900 dark:text-white">
                Sertifikat Kelulusan
              </h2>
              <p className="text-xs text-ink-400 dark:text-ink-300 mt-1">Diberikan dengan bangga kepada:</p>

              <div className="my-4 py-2 border-y border-surface-300 dark:border-ink-700">
                <p className="font-heading text-lg font-black text-ink-700 dark:text-brand-500">
                  Dewi Sartika
                </p>
                <p className="text-xs text-ink-600 dark:text-ink-200 mt-0.5">
                  Telah berhasil menyelesaikan seluruh kurikulum:
                </p>
                <p className="font-bold text-sm text-ink-800 dark:text-surface-200 mt-1">
                  "{product.title}"
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-ink-400 dark:text-ink-300 px-4 mb-4">
                <span>Instruktur: <strong>{product.mentorName}</strong></span>
                <span>No. Seri: <strong>EPH-2026-{product.id.slice(-4).toUpperCase()}</strong></span>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => alert('Sertifikat berformat PDF siap diunduh!')}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-brand-500 text-ink-900 flex items-center gap-1.5 hover:bg-brand-400"
                >
                  <Download className="w-3.5 h-3.5 text-brand-500" />
                  <span>Unduh PDF</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-surface-300 dark:border-ink-700 flex items-center gap-1.5 hover:bg-surface-100"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Body: Two Columns (Left Player/Content, Right Modules & Notes) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto lg:overflow-hidden">
          
          {/* Left Column: Interactive Simulation Player */}
          <div className="lg:col-span-8 flex flex-col border-b lg:border-b-0 lg:border-r border-surface-300 dark:border-ink-700 bg-black">
            
            {/* Screen Mock Player */}
            <div className="relative flex-1 min-h-[260px] bg-ink-900 flex flex-col items-center justify-center text-center p-6 select-none overflow-hidden group">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-xs"
              />

              <div className="relative z-10 max-w-md space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-brand-500/80 hover:bg-brand-500 border border-brand-400/40 flex items-center justify-center text-ink-900 mx-auto shadow-2xl cursor-pointer transition-transform hover:scale-110"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-brand-500" />
                  ) : (
                    <Play className="w-8 h-8 text-brand-500 ml-1 fill-brand-500" />
                  )}
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500">
                    {activeLesson?.type.toUpperCase()} · {activeLesson?.duration}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white mt-1">
                    {activeLesson?.title}
                  </h4>
                  <p className="text-xs text-ink-200 mt-1 max-w-sm mx-auto">
                    {activeLesson?.summary}
                  </p>
                </div>
              </div>

              {/* Player Bottom Control Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-3 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-brand-500">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <span className="text-[11px] text-ink-400 dark:text-ink-300">03:45 / {activeLesson?.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-ink-400 dark:text-ink-300">
                  <Volume2 className="w-4 h-4 hover:text-white cursor-pointer" />
                  <span className="text-[11px] bg-ink-800 px-2 py-0.5 rounded text-white font-mono">1080p HD</span>
                </div>
              </div>
            </div>

            {/* Lesson Quick Actions bar */}
            <div className="p-3 bg-white dark:bg-ink-900 border-t border-surface-300 dark:border-ink-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-ink-400 dark:text-ink-300 text-[11px]">Progres Pembelajaran:</span>
                <span className="font-extrabold text-ink-700 dark:text-brand-500">
                  {progressPercent}% ({completedCount}/{totalLessons} Selesai)
                </span>
              </div>

              <div className="w-40 sm:w-56 bg-brand-100 dark:bg-ink-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-brand-500 dark:bg-brand-400 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Modules & Student Notes */}
          <div className="lg:col-span-4 flex flex-col bg-surface-100 dark:bg-ink-900 lg:overflow-hidden">
            
            {/* Tabs Selector */}
            <div className="p-2 border-b border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 flex items-center gap-1">
              <button
                onClick={() => setActiveTab('syllabus')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeTab === 'syllabus'
                    ? 'bg-brand-500 text-ink-900 shadow-sm'
                    : 'text-ink-600 dark:text-ink-200 hover:bg-surface-100 dark:hover:bg-ink-700'
                }`}
              >
                Kurikulum
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeTab === 'notes'
                    ? 'bg-brand-500 text-ink-900 shadow-sm'
                    : 'text-ink-600 dark:text-ink-200 hover:bg-surface-100 dark:hover:bg-ink-700'
                }`}
              >
                Catatan Saya
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeTab === 'resources'
                    ? 'bg-brand-500 text-ink-900 shadow-sm'
                    : 'text-ink-600 dark:text-ink-200 hover:bg-surface-100 dark:hover:bg-ink-700'
                }`}
              >
                Materi/File
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              
              {/* Syllabus List */}
              {activeTab === 'syllabus' && (
                <div className="space-y-1.5">
                  {product.lessons.map((lesson, idx) => {
                    const isCompleted = enrolledData.completedLessonIds.includes(lesson.id);
                    const isActive = lesson.id === activeLessonId;

                    return (
                      <div
                        key={lesson.id}
                        className={`p-2.5 rounded-xl border text-xs transition-all ${
                          isActive
                            ? 'border-brand-500 bg-brand-100/60 dark:bg-ink-700 dark:border-brand-400'
                            : 'border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <button
                            onClick={() => onToggleLessonCompletion(product.id, lesson.id)}
                            className="mt-0.5 text-ink-400 dark:text-ink-300 hover:text-emerald-500 transition-colors"
                            title={isCompleted ? "Tandai belum selesai" : "Tandai selesai"}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>

                          <div 
                            className="flex-1 min-w-0 cursor-pointer"
                            onClick={() => handleLessonSelect(lesson.id)}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`font-semibold line-clamp-1 text-[11.5px] ${
                                isActive ? 'text-ink-700 dark:text-brand-500 font-bold' : 'text-ink-800 dark:text-surface-300'
                              }`}>
                                {lesson.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-[10px] text-ink-400 dark:text-ink-300">
                              <span>{lesson.duration}</span>
                              <span>·</span>
                              <span className="capitalize">{lesson.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Notes Editor */}
              {activeTab === 'notes' && (
                <div className="h-full flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-ink-700 dark:text-ink-200 text-[11px]">
                      Catatan Pribadi untuk Kelas Ini:
                    </span>
                  </div>
                  <textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Tulis poin-poin penting, pertanyaan untuk mentor, atau rangkuman ide di sini..."
                    className="w-full flex-1 min-h-[220px] p-3 text-xs rounded-xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 text-ink-800 dark:text-surface-200 placeholder-ink-400 dark:placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button
                    onClick={handleSaveNotes}
                    className="w-full py-2 text-xs font-bold rounded-lg bg-brand-500 text-ink-900 hover:bg-brand-400 transition-colors shadow-sm"
                  >
                    Simpan Catatan
                  </button>
                </div>
              )}

              {/* Resources Tab */}
              {activeTab === 'resources' && (
                <div className="space-y-2">
                  <p className="text-[11px] text-ink-400 dark:text-ink-300">
                    Unduh lembar kerja, template, dan materi pendukung yang disediakan instruktur:
                  </p>
                  {product.resources && product.resources.length > 0 ? (
                    product.resources.map((res, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl border border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="w-4 h-4 text-ink-700 dark:text-brand-500 shrink-0" />
                          <div className="min-w-0">
                            <p className="font-semibold text-ink-800 dark:text-surface-300 truncate text-[11.5px]">
                              {res.title}
                            </p>
                            <span className="text-[10px] text-ink-400 dark:text-ink-300">{res.type} Format</span>
                          </div>
                        </div>

                        <button
                          onClick={() => alert(`Simulasi unduhan berkas: ${res.title}`)}
                          className="p-1.5 rounded-lg border border-surface-300 dark:border-ink-700 hover:bg-surface-100 text-ink-700 dark:text-brand-500"
                          title="Unduh Berkas"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-ink-400 dark:text-ink-300">
                      Materi terintegrasi langsung dalam tayangan video.
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Tombol lanjut modul — tepat di bawah checklist kurikulum */}
            {activeTab === 'syllabus' && (
              <div className="p-3 border-t border-surface-300 dark:border-ink-700 bg-white dark:bg-ink-800 space-y-1.5 shrink-0">
                <button
                  onClick={handleCompleteAndContinue}
                  className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold leading-tight flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer ${
                    isAllCompleted
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      : 'bg-brand-500 hover:bg-brand-400 text-ink-900'
                  }`}
                >
                  {isAllCompleted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Selesai</span>
                    </>
                  ) : isLastRemaining ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                      <span>Selesai &amp; Tuntaskan Kelas</span>
                    </>
                  ) : (
                    <>
                      <span>Selesai &amp; Lanjut ke Modul Berikutnya</span>
                      <ArrowRight className="w-4 h-4 text-brand-500 shrink-0" />
                    </>
                  )}
                </button>
                <p className="text-[10px] sm:text-[11px] text-center text-ink-400 dark:text-ink-300 truncate">
                  {isAllCompleted
                    ? (hasCertificate ? 'Semua modul tuntas. Ketuk untuk melihat sertifikatmu.' : 'Semua modul tuntas. Selamat, kelas ini selesai!')
                    : nextLesson
                      ? `Berikutnya: ${nextLesson.title}`
                      : 'Ini modul terakhir yang tersisa.'}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
