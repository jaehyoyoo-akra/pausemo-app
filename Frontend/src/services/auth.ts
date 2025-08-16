import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { authAPI } from './api';
import { User } from '../types';

// 구글 로그인 설정
const GOOGLE_CLIENT_IDS = {
  android: '472208960312-YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  ios: '472208960312-YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  web: '472208960312-865rbp1eo9vg76v2822cbecuc5pgtfml.apps.googleusercontent.com',
};

export class AuthService {
  static async initialize() {
    try {
      GoogleSignin.configure({
        webClientId: GOOGLE_CLIENT_IDS.web,
        offlineAccess: false,
        hostedDomain: '',
        forceCodeForRefreshToken: true,
      });
    } catch (error) {
      console.error('Google SignIn 초기화 실패:', error);
    }
  }

  static async signInWithGoogle(): Promise<{ user: User; token: string }> {
    try {
      // Google 계정이 로그인되어 있는지 확인
      await GoogleSignin.hasPlayServices();
      
      // 로그인 시도
      const userInfo = await GoogleSignin.signIn();
      
      if (!userInfo.idToken) {
        throw new Error('ID Token을 가져올 수 없습니다');
      }

      // 백엔드에 토큰 전송하여 검증 및 사용자 정보 저장
      const result = await authAPI.googleLogin(userInfo.idToken);
      
      // 토큰과 사용자 정보를 로컬 스토리지에 저장
      await AsyncStorage.setItem('token', result.token);
      await AsyncStorage.setItem('user', JSON.stringify(result.user));
      
      return result;
    } catch (error: any) {
      console.error('Google 로그인 에러:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('로그인이 취소되었습니다');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error('로그인이 진행 중입니다');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error('Google Play Services를 사용할 수 없습니다');
      } else {
        throw new Error('로그인에 실패했습니다: ' + error.message);
      }
    }
  }

  static async signInWithEmail(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const result = await authAPI.emailLogin(email, password);
      
      await AsyncStorage.setItem('token', result.token);
      if (result.user) {
        await AsyncStorage.setItem('user', JSON.stringify(result.user));
      }
      
      return result;
    } catch (error: any) {
      console.error('이메일 로그인 에러:', error);
      throw new Error(error.response?.data?.error || '로그인에 실패했습니다');
    }
  }

  static async register(email: string, password: string): Promise<void> {
    try {
      await authAPI.register(email, password);
    } catch (error: any) {
      console.error('회원가입 에러:', error);
      throw new Error(error.response?.data?.error || '회원가입에 실패했습니다');
    }
  }

  static async signOut(): Promise<void> {
    try {
      // Google Sign-In에서 로그아웃
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }
      
      // 로컬 저장소에서 데이터 제거
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('로그아웃 에러:', error);
      // 로그아웃 에러가 있어도 로컬 데이터는 삭제
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        return JSON.parse(userString);
      }
      return null;
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
      return null;
    }
  }

  static async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('token');
    } catch (error) {
      console.error('토큰 가져오기 실패:', error);
      return null;
    }
  }

  static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getToken();
      const user = await this.getCurrentUser();
      return !!(token && user);
    } catch (error) {
      return false;
    }
  }
}

