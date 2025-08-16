import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User,
  Quest,
  Card,
  Response,
  Feedback,
  OnboardingData,
  QuestCategory,
  CardType,
  UserType
} from '../types';

const API_BASE_URL = 'http://localhost:3000/api'; // 개발 환경

class ApiService {
  private token: string | null = null;

  constructor() {
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 요청 인터셉터 - 토큰 추가
    axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        if (!this.token) {
          this.token = await AsyncStorage.getItem('authToken');
        }
        if (this.token && config.headers) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // 응답 인터셉터 - 토큰 만료 처리
    axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          await AsyncStorage.removeItem('authToken');
          this.token = null;
          // 로그인 화면으로 리다이렉트 로직 필요
        }
        return Promise.reject(error);
      }
    );
  }

  // 인증 관련
  async setToken(token: string) {
    this.token = token;
    await AsyncStorage.setItem('authToken', token);
  }

  async clearToken() {
    this.token = null;
    await AsyncStorage.removeItem('authToken');
  }

  // 사용자 관련
  async getCurrentUser(): Promise<User> {
    const response = await axios.get(`${API_BASE_URL}/auth/me`);
    return response.data;
  }

  async updateUserProfile(updates: Partial<User>): Promise<User> {
    const response = await axios.patch(`${API_BASE_URL}/auth/profile`, updates);
    return response.data;
  }

  // 퀘스트 관련
  async getActiveQuests(): Promise<Quest[]> {
    const response = await axios.get(`${API_BASE_URL}/quests`);
    return response.data;
  }

  async createQuest(category: QuestCategory, name: string): Promise<Quest> {
    const response = await axios.post(`${API_BASE_URL}/quests`, { category, name });
    return response.data;
  }

  async updateQuestProgress(questId: string, progress: number, todayResponse: boolean): Promise<Quest> {
    const response = await axios.patch(`${API_BASE_URL}/quests/${questId}/progress`, {
      progress,
      todayResponse
    });
    return response.data;
  }

  async completeQuest(questId: string): Promise<Quest> {
    const response = await axios.patch(`${API_BASE_URL}/quests/${questId}/complete`);
    return response.data;
  }

  // 카드 관련
  async getCardsForQuest(questId: string, type?: CardType, difficulty?: number): Promise<Card[]> {
    let url = `${API_BASE_URL}/cards/${questId}`;
    const params = new URLSearchParams();
    
    if (type) params.append('type', type);
    if (difficulty) params.append('difficulty', difficulty.toString());
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get(url);
    return response.data;
  }

  async respondToCard(cardId: string, answer: 'Y' | 'N', responseTime: number, context?: any): Promise<any> {
    const response = await axios.post(`${API_BASE_URL}/cards/${cardId}/respond`, {
      answer,
      responseTime,
      context
    });
    return response.data;
  }

  async updateCardEfficiency(cardId: string, responseRate: number, completionRate: number): Promise<Card> {
    const response = await axios.patch(`${API_BASE_URL}/cards/${cardId}/efficiency`, {
      responseRate,
      completionRate
    });
    return response.data;
  }

  // 응답 관련
  async getResponses(questId?: string, startDate?: string, endDate?: string): Promise<Response[]> {
    let url = `${API_BASE_URL}/responses`;
    const params = new URLSearchParams();
    
    if (questId) params.append('questId', questId);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get(url);
    return response.data;
  }

  // 피드백 관련
  async submitFeedback(title: string, content: string): Promise<Feedback> {
    const response = await axios.post(`${API_BASE_URL}/feedback`, { title, content });
    return response.data;
  }

  // 온보딩 관련
  async submitOnboarding(data: OnboardingData): Promise<User> {
    const response = await axios.post(`${API_BASE_URL}/onboarding`, data);
    return response.data;
  }

  // 통계 관련
  async getUserStats(startDate?: string, endDate?: string): Promise<any> {
    let url = `${API_BASE_URL}/stats`;
    const params = new URLSearchParams();
    
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get(url);
    return response.data;
  }

  // AI 서비스 관련
  async getPersonalizedCards(questId: string, userType: UserType[]): Promise<Card[]> {
    const response = await axios.post(`${API_BASE_URL}/ai/personalize`, {
      questId,
      userType
    });
    return response.data;
  }

  async analyzePattern(responses: Response[]): Promise<any> {
    const response = await axios.post(`${API_BASE_URL}/ai/analyze`, { responses });
    return response.data;
  }
}

export default new ApiService();
