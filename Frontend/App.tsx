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
import OnboardingScreen from './src/screens/OnboardingScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import CardSessionScreen from './src/screens/CardSessionScreen';
import ValueArchiveScreen from './src/screens/ValueArchiveScreen';

type Screen = 'onboarding' | 'dashboard' | 'cardSession' | 'valueArchive';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<any>(null);

  useEffect(() => {
    // 온보딩 완료 여부 확인 (나중에 AsyncStorage로 교체)
    // setHasCompletedOnboarding(true);
    // setCurrentScreen('dashboard');
  }, []);

  const handleOnboardingComplete = (onboardingData: any) => {
    console.log('온보딩 완료:', onboardingData);
    setHasCompletedOnboarding(true);
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
      case 'onboarding':
        return (
          <OnboardingScreen />
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
