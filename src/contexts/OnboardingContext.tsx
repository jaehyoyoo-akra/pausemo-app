import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OnboardingStep, OnboardingState, OnboardingNavigation } from '../types/onboarding';

// 온보딩 단계 순서
export const ONBOARDING_STEPS: OnboardingStep[] = [
  'A0',
  'A1', 
  'A2',
  'A3',
  'A4',
  'A5',
  'A6',
  'A7'
];

// 온보딩 컨텍스트 타입 (상태 + 네비게이션)
interface OnboardingContextType extends OnboardingNavigation {
  currentStep: OnboardingStep;
  isCompleted: boolean;
  startTime: number;
}

// 온보딩 컨텍스트 생성
const OnboardingContext = createContext<OnboardingContextType | null>(null);

// 온보딩 프로바이더 컴포넌트
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    currentStep: 'A0',
    isCompleted: false,
    startTime: Date.now(),
  });

  // 앱을 시작할 때마다 온보딩을 처음부터 시작
  useEffect(() => {
    // 앱 시작 시 항상 A0 단계로 리셋
    setOnboardingState({
      currentStep: 'A0',
      isCompleted: false,
      startTime: Date.now(),
    });
  }, []);

  const nextStep = () => {
    console.log('nextStep 호출됨');
    setOnboardingState(prev => {
      const currentIndex = ONBOARDING_STEPS.indexOf(prev.currentStep);
      const nextIndex = currentIndex + 1;
      
      console.log(`현재 단계: ${prev.currentStep}, 다음 단계 인덱스: ${nextIndex}`);
      
      if (nextIndex >= ONBOARDING_STEPS.length) {
        // 마지막 단계면 온보딩 완료
        console.log('마지막 단계 도달 - 온보딩 완료');
        return {
          ...prev,
          currentStep: 'A4',
          isCompleted: true,
        };
      }
      
      const nextStep = ONBOARDING_STEPS[nextIndex];
      console.log(`다음 단계로 이동: ${nextStep}`);
      
      return {
        ...prev,
        currentStep: nextStep,
      };
    });
  };

  const previousStep = () => {
    setOnboardingState(prev => {
      const currentIndex = ONBOARDING_STEPS.indexOf(prev.currentStep);
      const previousIndex = currentIndex - 1;
      
      if (previousIndex < 0) {
        return prev; // 첫 단계에서는 이전으로 이동 불가
      }
      
      return {
        ...prev,
        currentStep: ONBOARDING_STEPS[previousIndex],
      };
    });
  };

  const goToStep = (step: OnboardingStep) => {
    setOnboardingState(prev => ({
      ...prev,
      currentStep: step,
    }));
  };

  const completeOnboarding = () => {
    setOnboardingState(prev => ({
      ...prev,
      isCompleted: true,
    }));
  };

  const contextValue: OnboardingContextType = {
    currentStep: onboardingState.currentStep,
    isCompleted: onboardingState.isCompleted,
    startTime: onboardingState.startTime,
    nextStep,
    previousStep,
    goToStep,
    completeOnboarding,
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
}

// 온보딩 컨텍스트 사용 훅
export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}

// 온보딩 상태를 가져오는 훅 (컨텍스트 사용)
export function useOnboardingState() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboardingState must be used within an OnboardingProvider');
  }
  return {
    currentStep: context.currentStep,
    isCompleted: context.isCompleted,
    startTime: context.startTime,
  };
}
