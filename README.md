# Pausemo - 신경과학 기반 마음챙김 앱

## 📱 프로젝트 소개

Pausemo는 "3초의 멈춤이 만드는 평생의 변화"라는 철학을 바탕으로 한 신경과학 기반 마음챙김 앱입니다. 나선형 성장을 통한 의식적 선택 확장을 목표로 합니다.

## 🏗️ 프로젝트 구조

```
src/
├── components/      # 재사용 가능한 UI 컴포넌트
│   ├── ShadowWrapper.tsx
│   ├── Collapsible.tsx
│   ├── ExternalLink.tsx
│   ├── HapticTab.tsx
│   ├── HelloWave.tsx
│   ├── ParallaxScrollView.tsx
│   ├── ThemedText.tsx
│   ├── ThemedView.tsx
│   ├── PressButton.tsx
│   ├── PremiumCard.tsx
│   ├── InterestAreaButton.tsx
│   ├── IconContainer.tsx
│   ├── PrimaryButton.tsx
│   ├── ScreenLayout.tsx
│   ├── IconSymbol.tsx
│   └── TabBarBackground.tsx
├── screens/         # 화면 단위 컴포넌트
│   ├── PausemoSplash.tsx
│   ├── BrainIntro.tsx
│   ├── OnboardingGuide.tsx
│   ├── OnboardingFirstCheckIn.tsx
│   ├── OnboardingComplete.tsx
│   ├── DiagnosticTest.tsx
│   ├── PatternAnalysis.tsx
│   ├── PersonalityResult.tsx
│   └── OnboardingFlow.tsx
├── contexts/        # React Context API
│   └── OnboardingContext.tsx
├── constants/       # 상수 및 테마
│   ├── Colors.ts
│   ├── Theme.ts
│   └── TailwindClasses.ts
├── types/           # TypeScript 타입 정의
│   └── onboarding.ts
├── App.tsx          # 메인 앱 컴포넌트
└── index.ts         # 주요 export 관리
```

## 🚀 주요 기능

### 온보딩 플로우 (8단계)
- **A0**: PausemoSplash - 앱 시작 화면
- **A1**: BrainIntro - 뇌 과학 소개
- **A2**: OnboardingGuide - 온보딩 가이드
- **A3**: OnboardingFirstCheckIn - 첫 체크인
- **A4**: OnboardingComplete - 온보딩 완료
- **A5**: DiagnosticTest - 진단 테스트
- **A6**: PatternAnalysis - 패턴 분석
- **A7**: PersonalityResult - 성격 결과

### 핵심 철학
- **3초 룰**: 갭 생성 시간 3초
- **10초 룰**: 최대 상호작용 시간 10초
- **Y/N 선택**: 이진 선택만 허용
- **비경쟁적 성장**: 개인 발전 중심

## 🛠️ 기술 스택

- **React Native** + **Expo**
- **TypeScript**
- **Tailwind CSS**
- **React Context API**
- **Expo Router**

## 📱 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# iOS 시뮬레이터 실행
npm run ios

# Android 에뮬레이터 실행
npm run android
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: #6366f1 (인디고)
- **Secondary**: #8b5cf6 (바이올렛)
- **Background**: #0f172a (다크 슬레이트)
- **Surface**: #1e293b (라이트 슬레이트)

### 성장 단계별 색상
- **Awakening**: #f59e0b (주황)
- **Emerging**: #10b981 (에메랄드)
- **Mastering**: #3b82f6 (블루)
- **Harmonizing**: #8b5cf6 (바이올렛)

## 🔄 개발 가이드라인

### 컴포넌트 설계 원칙
1. **단일 책임**: 하나의 컴포넌트는 하나의 역할만
2. **재사용성**: UI 컴포넌트는 재사용 가능하게 설계
3. **접근성**: VoiceOver, TalkBack 지원
4. **반응형**: 다양한 화면 크기와 방향 지원

### 상태 관리
- **OnboardingContext**: 온보딩 상태 관리
- **로컬 스토리지**: AsyncStorage 활용
- **서버 의존성 최소화**: 로컬 우선 처리

## 📚 문서 참조

- `통합이론_v1.7`: 앱의 철학적 기반
- `UX설계안_기준`: 사용자 경험 설계 가이드
- `컨텍스트_연동_가이드라인`: 컴포넌트 간 연동 방법

## 🤝 기여 방법

1. 이슈 생성 또는 기존 이슈 확인
2. 기능 브랜치 생성 (`feature/기능명`)
3. 코드 작성 및 테스트
4. Pull Request 생성
5. 코드 리뷰 및 머지

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
