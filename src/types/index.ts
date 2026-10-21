export type Role = 'guest' | 'mentee' | 'mentor' | 'admin';

export type ProductCategory = 
  | 'Semua'
  | 'Teknologi & Digital'
  | 'Produktivitas'
  | 'Wellness & Self-Growth'
  | 'Karir & Mentoring';

export type ProductType = 
  | 'video' 
  | 'mooc' 
  | 'tool' 
  | 'pdf' 
  | 'affiliate' 
  | 'mentoring' 
  | 'template';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'worksheet' | 'interactive';
  summary: string;
  completed?: boolean;
}

export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  formattedPrice: string;
  category: 'Teknologi & Digital' | 'Produktivitas' | 'Wellness & Self-Growth' | 'Karir & Mentoring';
  type: ProductType;
  typeLabel: string;
  mentorName: string;
  mentorRole: string;
  mentorAvatar: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  durationOrSpecs: string;
  thumbnail: string;
  isAffiliate?: boolean;
  affiliateBadge?: string;
  affiliateUrl?: string;
  isFeatured?: boolean;
  badgeHighlight?: string; // Butter yellow badge text
  lessons: Lesson[];
  resources?: { title: string; type: string; downloadUrl?: string }[];
  keyTakeaways: string[];
  status?: 'published' | 'pending' | 'revision';
}

export interface EnrolledCourse {
  productId: string;
  enrolledAt: string;
  progressPercent: number;
  lastLessonId?: string;
  completedLessonIds: string[];
  certificateIssued?: boolean;
  notes?: string;
}

export interface MentoredCourse {
  productId: string;
  createdAt: string;
  activeStudents: number;
  totalRevenue: number;
  averageRating: number;
  status: 'published' | 'pending' | 'revision' | 'draft';
  adminFeedback?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  headline: string;
  bio: string;
  enrolledCourses: EnrolledCourse[];
  mentoredCourses: MentoredCourse[];
}

export interface AssessmentOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  scoreTags?: string[];
}

export interface AssessmentQuestion {
  id: string;
  title: string;
  subtitle?: string;
  isMultiSelect?: boolean;
  maxSelect?: number;
  options: AssessmentOption[];
  conditionalOn?: {
    questionId: string;
    optionId: string;
  };
}

export interface AssessmentResult {
  primaryProduct: Product;
  matchScore: number;
  personalReasons: string[];
  alternativeProducts: {
    product: Product;
    formatDifferenceNote: string;
  }[];
}
