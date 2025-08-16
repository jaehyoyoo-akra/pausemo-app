export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  loginType: 'email' | 'google';
  userType?: {
    primary?: string;
    secondary?: string;
  };
  fatigueLevel: number;
  preferredTime: string[];
  stats: {
    selfControl: number;
    independence: number;
    resilience: number;
    selfEsteem: number;
    consistency: number;
    relationship: number;
  };
}

export interface Quest {
  _id: string;
  userId: string;
  category: string;
  name: string;
  state: 'active' | 'completed' | 'locked';
  progress: number;
  daysActive: number;
  todayResponse: boolean;
  startDate: string;
  lastResponseDate: string;
  consecutiveDays: number;
  totalResponses: number;
}

export interface Card {
  _id: string;
  questId: string;
  userId: string;
  type: 'observation' | 'gap' | 'reinforcement';
  difficulty: number;
  text: string;
  category: string;
  userType?: {
    primary?: string;
    secondary?: string;
  };
  isActive: boolean;
}

export interface Response {
  _id?: string;
  userId: string;
  cardId: string;
  questId: string;
  answer: 'Y' | 'N';
  responseTime: number;
  completed: boolean;
  timestamp?: string;
  context?: {
    timeOfDay?: string;
    location?: string;
    mood?: string;
  };
}

export interface Feedback {
  _id?: string;
  user: string;
  title: string;
  content: string;
  createdAt?: string;
}

export type CategoryType = '업무/성과' | '관계/소통' | '감정/스트레스' | '습관/중독' | '자기인식' | '성장/변화';

export type UserTypeEnum = 
  | '성과-증명형'
  | '관계-의존형'
  | '완벽-가면형'
  | '희생-헌신형'
  | '반항-차별형'
  | '침묵-관찰형'
  | '과시-표현형'
  | '변동-불안형';

