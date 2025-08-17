import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../services/api';

interface LoginScreenProps {
  onLoginSuccess: (userData: any) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
        // Google Sign-In 초기화
    GoogleSignin.configure({
      // iOS용 설정
      iosClientId: '472208960312-cli1qspacvdhpdmlu1pim7k39h3flhe8.apps.googleusercontent.com',
      // offlineAccess 제거 - webClientId 없이도 로그인 가능
    });

    // 이미 로그인되어 있는지 확인
    checkSignInStatus();
  }, []);

  const checkSignInStatus = async () => {
    try {
      // getCurrentUser로 로그인 상태 확인
      const userInfo = await GoogleSignin.getCurrentUser();
      const isSignedIn = !!userInfo;
      setIsSignedIn(isSignedIn);
      
      if (isSignedIn && userInfo) {
        handleGoogleSignIn(userInfo);
      }
    } catch (error) {
      console.log('Sign-in status check error:', error);
      setIsSignedIn(false);
    }
  };

  const handleGoogleSignIn = async (userInfo?: any) => {
    try {
      setIsLoading(true);
      
      let idToken: string;
      let signInResult: any;
      
      if (userInfo) {
        // 이미 로그인된 사용자
        console.log('🔍 기존 로그인 사용자 정보:', JSON.stringify(userInfo, null, 2));
        idToken = (userInfo as any).data?.idToken || 
                  (userInfo as any).idToken || 
                  (userInfo as any).user?.idToken;
      } else {
        // 새로 로그인
        await GoogleSignin.hasPlayServices();
        signInResult = await GoogleSignin.signIn();
        console.log('🔍 새 로그인 결과:', JSON.stringify(signInResult, null, 2));
        
        // 다양한 가능한 위치에서 ID Token 찾기
        idToken = (signInResult as any).data?.idToken || 
                  (signInResult as any).idToken || 
                  (signInResult as any).user?.idToken || 
                  (signInResult as any).authentication?.idToken ||
                  (signInResult as any).serverAuthCode;
      }

      console.log('🔑 추출된 ID Token:', idToken);

      if (!idToken) {
        console.error('❌ ID Token을 찾을 수 없습니다. 응답 구조:', JSON.stringify(userInfo || signInResult, null, 2));
        throw new Error('ID Token을 가져올 수 없습니다.');
      }

      // 백엔드로 Google 로그인 요청
      const platform = Platform.OS;
      const response = await ApiService.googleLogin(idToken, platform);
      
      if (response.success) {
        // 로그인 성공
        const { token, user } = response.data;
        
        // 토큰을 AsyncStorage에 저장
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        
        // 로그인 성공 콜백 호출
        onLoginSuccess(user);
        
        Alert.alert('로그인 성공', '환영합니다!');
      } else {
        throw new Error(response.message || '로그인에 실패했습니다.');
      }
      
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      
      if (error.code === 'SIGN_IN_CANCELLED') {
        Alert.alert('로그인 취소', '로그인이 취소되었습니다.');
      } else if (error.code === 'SIGN_IN_REQUIRED') {
        Alert.alert('로그인 필요', '다시 로그인해주세요.');
      } else {
        Alert.alert('로그인 실패', error.message || '로그인 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      setIsSignedIn(false);
      Alert.alert('로그아웃', '로그아웃되었습니다.');
    } catch (error) {
      console.error('Sign-out error:', error);
      Alert.alert('오류', '로그아웃 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pausemo</Text>
        <Text style={styles.subtitle}>일상의 순간을 잠시 멈추고</Text>
        <Text style={styles.subtitle}>가치를 발견하는 시간</Text>
      </View>

      <View style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4285F4" />
            <Text style={styles.loadingText}>로그인 중...</Text>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            {!isSignedIn ? (
              <GoogleSigninButton
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => handleGoogleSignIn()}
                disabled={isLoading}
              />
            ) : (
              <TouchableOpacity
                style={styles.signOutButton}
                onPress={handleSignOut}
                disabled={isLoading}
              >
                <Text style={styles.signOutButtonText}>로그아웃</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Google 계정으로 간편하게 로그인하세요
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  googleButton: {
    width: 240,
    height: 48,
  },
  signOutButton: {
    backgroundColor: '#DC3545',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  signOutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
});

export default LoginScreen;
