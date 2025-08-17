/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/LoginScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import CardSessionScreen from './src/screens/CardSessionScreen';
import ValueArchiveScreen from './src/screens/ValueArchiveScreen';

type Screen = 'login' | 'onboarding' | 'dashboard' | 'cardSession' | 'valueArchive';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // 앱 시작 시 로그인 상태와 온보딩 완료 여부 확인
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userDataStr = await AsyncStorage.getItem('userData');
      const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
      
      if (token && userDataStr) {
        setIsLoggedIn(true);
        setUserData(JSON.parse(userDataStr));
        
        if (onboardingCompleted === 'true') {
          setHasCompletedOnboarding(true);
          setCurrentScreen('dashboard');
        } else {
          setCurrentScreen('onboarding');
        }
      } else {
        setCurrentScreen('login');
      }
    } catch (error) {
      console.error('Auth status check error:', error);
      setCurrentScreen('login');
    }
  };

  const handleLoginSuccess = (userData: any) => {
    console.log('로그인 성공:', userData);
    setIsLoggedIn(true);
    setUserData(userData);
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = async (onboardingData: any) => {
    console.log('온보딩 완료:', onboardingData);
    setHasCompletedOnboarding(true);
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    setCurrentScreen('dashboard');
  };

  const handleStartCardSession = (quest: any) => {
    setSelectedQuest(quest);
    setCurrentScreen('cardSession');
  };

  const handleCardSessionComplete = (sessionData: any) => {
    console.log('카드 세션 완료:', sessionData);
    setCurrentScreen('dashboard');
    setSelectedQuest(null);
    
    // 성공 메시지
    Alert.alert(
      '회로 개입 완료!',
      `+2P 획득!\n총 소요시간: ${sessionData.responseTime}초`,
      [{ text: '확인' }]
    );
  };

  const handleCloseCardSession = () => {
    setCurrentScreen('dashboard');
    setSelectedQuest(null);
  };

  const handleOpenValueArchive = () => {
    setCurrentScreen('valueArchive');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        );
      
      case 'onboarding':
        return (
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        );
      
      case 'dashboard':
        return (
          <DashboardScreen 
            onStartSession={handleStartCardSession}
            onOpenValueArchive={handleOpenValueArchive}
          />
        );
      
      case 'cardSession':
        return selectedQuest ? (
          <CardSessionScreen
            quest={selectedQuest}
            onComplete={handleCardSessionComplete}
            onClose={handleCloseCardSession}
          />
        ) : null;
      
      case 'valueArchive':
        return (
          <ValueArchiveScreen />
        );
      
      default:
        return null;
    }
  };

  // 개발용 네비게이션 바 (나중에 제거)
  const renderDevNavigation = () => {
    if (__DEV__) {
      return (
        <View style={styles.devNavigation}>
          <TouchableOpacity 
            style={styles.devButton} 
            onPress={() => setCurrentScreen('login')}
          >
            <Text style={styles.devButtonText}>로그인</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.devButton} 
            onPress={() => setCurrentScreen('onboarding')}
          >
            <Text style={styles.devButtonText}>온보딩</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.devButton} 
            onPress={() => setCurrentScreen('dashboard')}
          >
            <Text style={styles.devButtonText}>대시보드</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.devButton} 
            onPress={() => setCurrentScreen('valueArchive')}
          >
            <Text style={styles.devButtonText}>가치문장</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {renderCurrentScreen()}
        {renderDevNavigation()}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  devNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  devButton: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  devButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default App;
