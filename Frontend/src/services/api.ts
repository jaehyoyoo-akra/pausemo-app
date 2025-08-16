import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Quest, Card, Response, Feedback } from '../types';

// 개발 환경에서는 로컬 IP를 사용하세요. 실제 환경에 맞게 수정 필요
const BASE_URL = 'http://10.0.2.2:3000'; // Android 에뮬레이터용
// const BASE_URL = 'http://localhost:3000'; // iOS 시뮬레이터용
// const BASE_URL = 'https://your-api-domain.com'; // 프로덕션용

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 인터셉터로 토큰 자동 추가
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Token 가져오기 실패:', error);
  }
  return config;
});

// 응답 인터셉터로 토큰 만료 처리
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 또는 유효하지 않음
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      // 로그인 화면으로 리디렉션 로직 필요
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // 구글 로그인
  googleLogin: async (idToken: string) => {
    const response = await api.post('/auth/google', { idToken });
    return response.data;
  },

  // 이메일 로그인
  emailLogin: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // 회원가입
  register: async (email: string, password: string) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },
};

// Quest API
export const questAPI = {
  // 사용자의 활성 퀘스트 조회
  getActiveQuests: async (): Promise<Quest[]> => {
    const response = await api.get('/api/quests');
    return response.data;
  },

  // 새 퀘스트 생성
  createQuest: async (category: string, name: string): Promise<Quest> => {
    const response = await api.post('/api/quests', { category, name });
    return response.data;
  },

  // 퀘스트 진행률 업데이트
  updateProgress: async (questId: string, progress: number, todayResponse: boolean): Promise<Quest> => {
    const response = await api.patch(`/api/quests/${questId}/progress`, {
      progress,
      todayResponse,
    });
    return response.data;
  },

  // 퀘스트 완료
  completeQuest: async (questId: string): Promise<Quest> => {
    const response = await api.patch(`/api/quests/${questId}/complete`);
    return response.data;
  },
};

// Card API
export const cardAPI = {
  // 사용자에게 맞는 카드 조회
  getCards: async (questId: string): Promise<Card[]> => {
    const response = await api.get(`/api/cards?questId=${questId}`);
    return response.data;
  },

  // 랜덤 카드 가져오기
  getRandomCard: async (questId: string, type?: string): Promise<Card> => {
    const response = await api.get(`/api/cards/random?questId=${questId}&type=${type || ''}`);
    return response.data;
  },
};

// Response API
export const responseAPI = {
  // 응답 저장
  saveResponse: async (responseData: Omit<Response, '_id'>): Promise<Response> => {
    const response = await api.post('/api/responses', responseData);
    return response.data;
  },

  // 사용자 응답 히스토리 조회
  getResponseHistory: async (questId?: string): Promise<Response[]> => {
    const url = questId ? `/api/responses?questId=${questId}` : '/api/responses';
    const response = await api.get(url);
    return response.data;
  },

  // 오늘의 응답률 조회
  getTodayStats: async () => {
    const response = await api.get('/api/responses/today');
    return response.data;
  },
};

// Feedback API
export const feedbackAPI = {
  // 피드백 전송
  sendFeedback: async (title: string, content: string): Promise<void> => {
    await api.post('/api/feedback', { title, content });
  },
};

// User API
export const userAPI = {
  // 사용자 프로필 조회
  getProfile: async (): Promise<User> => {
    const response = await api.get('/api/users/profile');
    return response.data;
  },

  // 사용자 타입 업데이트
  updateUserType: async (primary: string, secondary?: string): Promise<User> => {
    const response = await api.patch('/api/users/type', {
      userType: { primary, secondary },
    });
    return response.data;
  },

  // 피로도 레벨 업데이트
  updateFatigueLevel: async (level: number): Promise<User> => {
    const response = await api.patch('/api/users/fatigue', { fatigueLevel: level });
    return response.data;
  },

  // 선호 시간대 업데이트
  updatePreferredTime: async (times: string[]): Promise<User> => {
    const response = await api.patch('/api/users/time', { preferredTime: times });
    return response.data;
  },
};

export default api;

