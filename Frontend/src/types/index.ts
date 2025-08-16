// 사용자 관련 타입
export interface User {
  _id: string;
  email: string;
  name?: string;
  picture?: string;
  userType: {
    primary?: UserType;
    secondary?: UserType;
  };
  fatigueLevel: 1 | 2 | 3 | 4;
  preferredTime: string[];
  stats: UserStats;
  createdAt: string;
  lastActive: string;
}

export type UserType = 
  | '성과-증명형' | '관계-의존형' | '완벽-가면형' | '희생-헌신형'
  | '반항-차별형' | '침묵-관찰형' | '과시-표현형' | '변동-불안형';

export interface UserStats {
  selfControl: number;
  independence: number;
  resilience: number;
  selfEsteem: number;
  consistency: number;
  relationship: number;
}

// 퀘스트 관련 타입
export interface Quest {
  _id: string;
  userId: string;
  category: QuestCategory;
  name: string;
  state: 'active' | 'completed' | 'locked';
  progress: number;
  daysActive: number;
  todayResponse: boolean;
  startDate: string;
  lastResponseDate: string;
  consecutiveDays: number;
  totalResponses: number;
  createdAt: string;
}

export type QuestCategory = 
  | '업무/성과' | '관계/소통' | '감정/스트레스' 
  | '습관/중독' | '자기인식' | '성장/변화';

// 카드 관련 타입
export interface Card {
  _id: string;
  questId: string;
  userId: string;
  type: CardType;
  difficulty: 1 | 2 | 3 | 4;
  text: string;
  category: QuestCategory;
  userType: {
    primary?: string;
    secondary?: string;
  };
  isActive: boolean;
  efficiency: CardEfficiency;
  createdAt: string;
}

export type CardType = 'observation' | 'gap' | 'reinforcement';

export interface CardEfficiency {
  responseRate: number;
  completionRate: number;
  lastUpdated: string;
}

// 응답 관련 타입
export interface Response {
  _id: string;
  userId: string;
  cardId: string;
  questId: string;
  answer: 'Y' | 'N';
  responseTime: number;
  completed: boolean;
  timestamp: string;
  context: ResponseContext;
}

export interface ResponseContext {
  timeOfDay?: string;
  location?: string;
  mood?: string;
}

// 피드백 관련 타입
export interface Feedback {
  _id: string;
  user: string;
  title: string;
  content: string;
  createdAt: string;
}

// 온보딩 관련 타입
export interface OnboardingData {
  selectedCategories: QuestCategory[];
  selectedQuests: string[];
  userType: UserType[];
  fatigueLevel: 1 | 2 | 3 | 4;
  preferredTime: string[];
}

// 카드 플로우 관련 타입
export interface CardFlow {
  observation: Card;
  gap: Card;
  reinforcement: Card;
}

export interface CardSession {
  questId: string;
  cards: CardFlow;
  startTime: Date;
  responses: {
    observation?: 'Y' | 'N';
    gap?: boolean;
    reinforcement?: 'Y' | 'N';
  };
}

// 통계 관련 타입
export interface DailyStats {
  date: string;
  responseRate: number;
  totalResponses: number;
  completedSessions: number;
  points: number;
  consecutiveDays: number;
}

export interface WeeklyStats {
  weekStart: string;
  dailyStats: DailyStats[];
  totalPoints: number;
  averageResponseRate: number;
  patternChanges: number;
}

// 설정 관련 타입
export interface AppSettings {
  notifications: {
    enabled: boolean;
    frequency: 1 | 2 | 3 | 4;
    preferredTime: string[];
  };
  display: {
    showSecondaryText: boolean;
    sentenceVariation: 'none' | 'daily' | 'every3';
    soundReadingBadge: 'always_hide' | 'manual' | 'when_alone';
  };
  privacy: {
    dataCollection: boolean;
    analytics: boolean;
  };
}
