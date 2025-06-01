export type DecisionMode = 'analytical' | 'emotional' | 'creative';

export type Locale = 'en' | 'tr' | 'es' | 'ru';

export type DecisionCategory = 
  | 'career'
  | 'relationship' 
  | 'relocation'
  | 'education'
  | 'entrepreneurship'
  | 'investment'
  | 'family'
  | 'personal_growth'
  | 'lifestyle_health'
  | 'travel'
  | 'work_life_balance'
  | 'social_circle'
  | 'retirement_planning'
  | 'parenting'
  | 'technology_adoption'
  | 'housing_decision'
  | 'mental_wellbeing'
  | 'career_pivot'
  | 'partnership_cofounder'
  | 'legal_bureaucratic'
  | 'general';

// Yeni: Kullanıcı profili ve kişiselleştirme tipleri
export interface UserProfile {
  id: string;
  age?: number;
  profession?: string;
  location?: string;
  interests?: string[];
  preferredMode?: DecisionMode;
  riskTolerance?: 'low' | 'medium' | 'high';
  decisionStyle?: 'quick' | 'thorough' | 'collaborative';
  lifeStage?: 'student' | 'early_career' | 'mid_career' | 'senior' | 'retired';
  familyStatus?: 'single' | 'relationship' | 'married' | 'parent' | 'caregiver';
  financialSituation?: 'tight' | 'comfortable' | 'wealthy';
  personalityTraits?: string[];
  goals?: string[];
  values?: string[];
  previousDecisions?: DecisionHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DecisionHistory {
  id: string;
  question: string;
  category: DecisionCategory;
  mode: DecisionMode;
  analysis: DecisionAnalysis;
  userFeedback?: {
    helpful: boolean;
    rating: number; // 1-5
    comments?: string;
    followUp?: string; // Kararın sonucu nasıl oldu
  };
  timestamp: Date;
}

export interface PersonalizationContext {
  userProfile?: UserProfile;
  recentDecisions?: DecisionHistory[];
  sessionContext?: {
    currentMood?: 'stressed' | 'confident' | 'uncertain' | 'excited';
    timeConstraint?: 'urgent' | 'moderate' | 'flexible';
    stakeholders?: string[]; // Karardan etkilenecek kişiler
    budget?: 'limited' | 'moderate' | 'flexible';
  };
  culturalContext?: {
    country: string;
    culturalValues?: string[];
    localFactors?: string[];
  };
}

export interface DecisionCategoryInfo {
  key: DecisionCategory;
  name: {
    en: string;
    tr: string;
    es: string;
    ru: string;
  };
  description: {
    en: string;
    tr: string;
    es: string;
    ru: string;
  };
  keywords: {
    en: string[];
    tr: string[];
    es: string[];
    ru: string[];
  };
}

export interface DecisionAnalysis {
  pros: string[];
  cons: string[];
  emotional_reasoning: string;
  logical_reasoning: string;
  suggestion: string;
  summary: string;
  detected_category?: DecisionCategory;
  personalization_score?: number; // 0-100 kişiselleştirme skoru
  confidence_level?: number; // 0-100 güven seviyesi
  follow_up_questions?: string[]; // Daha iyi analiz için sorular
}

export interface AnalyzeRequest {
  question: string;
  mode: DecisionMode;
  locale: Locale;
  category?: DecisionCategory;
  personalizationContext?: PersonalizationContext;
} 