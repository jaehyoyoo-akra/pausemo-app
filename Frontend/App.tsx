import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Providers
import { AppProvider, useApp } from './src/context/AppContext';

// Services
import { AuthService } from './src/services/auth';
import { NotificationService } from './src/services/notifications';

// Screens
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { CategorySelectionScreen } from './src/screens/onboarding/CategorySelectionScreen';
import { PatternDiagnosisScreen } from './src/screens/onboarding/PatternDiagnosisScreen';
import { DiagnosisResultScreen } from './src/screens/onboarding/DiagnosisResultScreen';
import { DashboardScreen } from './src/screens/main/DashboardScreen';
import { DailyInterventionScreen } from './src/screens/main/DailyInterventionScreen';
import { SettingsScreen } from './src/screens/settings/SettingsScreen';
import { FeedbackScreen } from './src/screens/settings/FeedbackScreen';

// Types
import { CategoryType, UserTypeEnum } from './src/types';

// Styles
import { colors } from './src/styles/colors';

const Stack = createStackNavigator();

// 앱의 주요 플로우를 관리하는 내부 컴포넌트
const AppNavigator: React.FC = () => {
  const { state, login, logout, completeOnboarding } = useApp();
  const [currentScreen, setCurrentScreen] = useState<string>('loading');
  const [onboardingData, setOnboardingData] = useState<{
    category?: CategoryType;
    userType?: { primary: UserTypeEnum; secondary?: UserTypeEnum };
  }>({});
  const [interventionQuestId, setInterventionQuestId] = useState<string | null>(null);

  useEffect(() => {
    // 앱 상태에 따라 현재 화면 결정
    if (state.loading) {
      setCurrentScreen('loading');
    } else if (!state.isAuthenticated) {
      setCurrentScreen('login');
    } else if (!state.isOnboarded) {
      setCurrentScreen('onboarding');
    } else {
      setCurrentScreen('main');
    }
  }, [state.loading, state.isAuthenticated, state.isOnboarded]);

  const handleLoginSuccess = () => {
    // 로그인 성공 후 상태는 useApp에서 자동으로 관리됨
  };

  const handleCategorySelect = (category: CategoryType) => {
    setOnboardingData({ ...onboardingData, category });
    setCurrentScreen('diagnosis');
  };

  const handleDiagnosisComplete = (userType: { primary: UserTypeEnum; secondary?: UserTypeEnum }) => {
    setOnboardingData({ ...onboardingData, userType });
    setCurrentScreen('result');
  };

  const handleStartJourney = () => {
    if (onboardingData.userType) {
      completeOnboarding(onboardingData.userType);
      
      // 알림 설정
      NotificationService.scheduleDailyReminders();
      NotificationService.scheduleSmartInterventions(onboardingData.userType.primary);
      
      // 온보딩 완료 후 메인 화면으로 자동 이동 (useEffect에서 처리)
    }
  };

  const handleStartIntervention = (questId: string) => {
    setInterventionQuestId(questId);
    setCurrentScreen('intervention');
  };

  const handleInterventionComplete = () => {
    // 성취 알림 표시
    NotificationService.showAchievementNotification(
      '패턴 개입 완료! 🎉',
      '3초의 멈춤이 새로운 선택을 만들었습니다.'
    );
    
    // 다음 개입 알림 스케줄 (30분-2시간 후)
    const nextInterventionMinutes = 30 + Math.random() * 90;
    NotificationService.scheduleInterventionNotification(
      '패턴 체크',
      '다시 한번 확인해볼까요?',
      nextInterventionMinutes
    );
    
    setInterventionQuestId(null);
    setCurrentScreen('main');
  };

  const handleInterventionSkip = () => {
    setInterventionQuestId(null);
    setCurrentScreen('main');
  };

  const handleOpenSettings = () => {
    setCurrentScreen('settings');
  };

  const handleCloseSettings = () => {
    setCurrentScreen('main');
  };

  const handleOpenFeedback = () => {
    setCurrentScreen('feedback');
  };

  const handleCloseFeedback = () => {
    setCurrentScreen('settings');
  };

  const handleLogout = () => {
    logout();
    setCurrentScreen('login');
    setOnboardingData({});
  };

  // 로딩 화면
  if (currentScreen === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        {/* 로딩 스피너나 스플래시 화면 */}
      </View>
    );
  }

  // 로그인 화면
  if (currentScreen === 'login') {
    return (
      <LoginScreen onLoginSuccess={handleLoginSuccess} />
    );
  }

  // 온보딩 플로우
  if (currentScreen === 'onboarding') {
    return (
      <CategorySelectionScreen onCategorySelect={handleCategorySelect} />
    );
  }

  if (currentScreen === 'diagnosis') {
    return (
      <PatternDiagnosisScreen
        category={onboardingData.category!}
        onDiagnosisComplete={handleDiagnosisComplete}
      />
    );
  }

  if (currentScreen === 'result') {
    return (
      <DiagnosisResultScreen
        userType={onboardingData.userType!}
        onStartJourney={handleStartJourney}
      />
    );
  }

  // 메인 화면
  if (currentScreen === 'main') {
    return (
      <DashboardScreen
        onStartIntervention={handleStartIntervention}
        onOpenSettings={handleOpenSettings}
      />
    );
  }

  // 일상 개입 화면
  if (currentScreen === 'intervention' && interventionQuestId) {
    return (
      <DailyInterventionScreen
        questId={interventionQuestId}
        onComplete={handleInterventionComplete}
        onSkip={handleInterventionSkip}
      />
    );
  }

  // 설정 화면
  if (currentScreen === 'settings') {
    return (
      <SettingsScreen
        onLogout={handleLogout}
        onOpenFeedback={handleOpenFeedback}
        onClose={handleCloseSettings}
      />
    );
  }

  // 피드백 화면
  if (currentScreen === 'feedback') {
    return (
      <FeedbackScreen onClose={handleCloseFeedback} />
    );
  }

  // 기본값 (혹시 모를 에러 상황)
  return (
    <LoginScreen onLoginSuccess={handleLoginSuccess} />
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // 구글 로그인 초기화
    AuthService.initialize().catch(error => {
      console.error('Auth 서비스 초기화 실패:', error);
    });

    // 알림 서비스 초기화
    NotificationService.initialize().catch(error => {
      console.error('알림 서비스 초기화 실패:', error);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle=\"dark-content\"
        backgroundColor={colors.background}
        translucent={false}
      />
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

export default App;