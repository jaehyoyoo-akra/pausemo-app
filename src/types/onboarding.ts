// 온보딩 단계 정의
export type OnboardingStep = 
  | 'A0' // Splash 화면 (시작 화면)
  | 'A1' // 앱 소개
  | 'A2' // 사용법 안내
  | 'A3' // 첫 체크인
  | 'A4' // 완료 화면
  | 'A5' // 진단 테스트
  | 'A6'
  | 'A7';

// 온보딩 상태
export interface OnboardingState {
  currentStep: OnboardingStep;
  isCompleted: boolean;
  startTime: number;
}

// 온보딩 네비게이션 함수
export interface OnboardingNavigation {
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: OnboardingStep) => void;
  completeOnboarding: () => void;
}
