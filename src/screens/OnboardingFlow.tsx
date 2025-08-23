import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboardingState } from '../contexts/OnboardingContext';
import PausemoSplash from './PausemoSplash';
import BrainIntro from './BrainIntro';
import OnboardingGuide from './OnboardingGuide';
import OnboardingFirstCheckIn from './OnboardingFirstCheckIn';
import OnboardingComplete from './OnboardingComplete';
import DiagnosticTest from './DiagnosticTest';
import PatternAnalysis from './PatternAnalysis';
import PersonalityResult from './PersonalityResult';

export default function OnboardingFlow() {
  const { currentStep, isCompleted } = useOnboardingState();
  const router = useRouter();
  
  console.log('OnboardingFlow 렌더링 - 현재 단계:', currentStep, '완료 여부:', isCompleted);

  useEffect(() => {
    if (isCompleted) {
      console.log('온보딩 완료 - 메인 앱으로 이동');
      router.replace('/(tabs)');
    }
  }, [isCompleted, router]);

  const renderCurrentStep = () => {
    console.log('🔍 현재 단계:', currentStep);
    
    switch (currentStep) {
      case 'A0':
        console.log('🔍 A0: PausemoSplash 렌더링');
        return <PausemoSplash />;
      case 'A1':
        console.log('🔍 A1: BrainIntro 렌더링');
        return <BrainIntro />;
      case 'A2':
        console.log('🔍 A2: OnboardingGuide 렌더링');
        return <OnboardingGuide />;
      case 'A3':
        console.log('🔍 A3: OnboardingFirstCheckIn 렌더링');
        return <OnboardingFirstCheckIn />;
      case 'A4':
        console.log('🔍 A4: OnboardingComplete 렌더링');
        return <OnboardingComplete />;
      case 'A5':
        console.log('🔍 A5: DiagnosticTest 렌더링');
        return <DiagnosticTest />;
      case 'A6':
        console.log('🔍 A6: PatternAnalysis 렌더링');
        return <PatternAnalysis />;
      case 'A7':
        console.log('🔍 A7: PersonalityResult 렌더링');
        return <PersonalityResult />;
      default:
        console.log('🔍 기본: PausemoSplash 렌더링');
        return <PausemoSplash />;
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentStep()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
