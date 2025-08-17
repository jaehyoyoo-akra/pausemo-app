This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# Pausemo - 패턴을 멈추는 결정적 순간

## 📱 앱 소개

**Pausemo**는 "Pause(멈춤) + Moment(순간)"의 합성어로, **"패턴을 멈추는 결정적 순간"**을 의미합니다.

### 🎯 핵심 철학
- **"간단해 보이는 3초가 인생을 바꾼다"**
- 자동운전을 3초간 멈추고 의식적 선택을 하는 moment
- 표면적 단순함(3초, Y/N) 속에 깊은 신경과학적 원리를 담은 친근한 브랜드

### 🧠 작동 원리
1. **관찰** - 패턴을 포착하고 미묘한 감정 암시
2. **틈** - 3초간 가치문장으로 회로 차단 + 감정 완충
3. **강화** - 미세한 약속으로 행동-신념 상호 강화

## 🚀 주요 기능

### ✨ 온보딩 시스템
- **카테고리 선택**: 6개 영역 중 최대 3개 선택
- **패턴 진단**: 12-18개 Y/N 질문으로 8-16개 유형 분류
- **개입 설정**: 피로도 레벨(L1~L4) 및 선호 시간대 설정

### 🎮 카드 시스템
- **관찰 카드**: 패턴 포착 + 감정 암시 (Lv.0-3)
- **틈 카드**: 3초 가치문장 + 감정 완충
- **강화 카드**: 미세 약속 + 감정 확인

### 📊 대시보드
- **활성 퀘스트**: 진행 중인 퀘스트들의 실시간 상태
- **능력치 시각화**: 6개 핵심 능력치의 육각형 레이더 차트
- **오늘의 요약**: 응답률, 연속일, 획득 포인트 등

### 💎 가치문장 보관함
- **개인화된 문장**: 사용자 유형별 맞춤 가치문장
- **보조 문장**: 감각형 + 행동형 선택적 노출
- **사용 통계**: 사용 횟수, 저장일, 카테고리별 분류

## 🏗️ 기술 스택

### Frontend
- **React Native 0.81.0** - 크로스 플랫폼 모바일 앱
- **TypeScript** - 타입 안전성 및 개발 생산성
- **React Native Reanimated** - 부드러운 애니메이션
- **React Native Gesture Handler** - 제스처 처리

### Backend Integration
- **RESTful API** - 백엔드 서비스와의 통신
- **JWT 인증** - 보안된 사용자 인증
- **실시간 데이터 동기화** - 사용자 진행 상황 추적

### UI/UX
- **Material Design** - 일관된 디자인 시스템
- **Haptic Feedback** - 햅틱 피드백으로 몰입감 향상
- **Responsive Design** - 다양한 화면 크기 대응

## 📱 화면 구성

### 1. 온보딩 화면
```
Step 1: 카테고리 선택 (업무/성과, 관계/소통, 감정/스트레스 등)
Step 2: 패턴 진단 (8개 사용자 유형 중 선택)
Step 3: 개입 설정 (빈도, 시간대 설정)
Step 4: 완료 및 요약
```

### 2. 메인 대시보드
```
- 상단: 사용자 인사말 및 진행 중 퀘스트
- 중앙: 능력치 시각화 (육각형 레이더 차트)
- 하단: 오늘의 요약 및 빠른 액션 버튼
```

### 3. 카드 세션
```
- 관찰: Y/N 질문으로 패턴 확인
- 틈: 3초 타이머와 가치문장 읽기
- 강화: 작은 약속으로 패턴 강화
```

### 4. 가치문장 보관함
```
- 카테고리별 필터링
- 즐겨찾기 및 사용 통계
- 보조 문장 표시/숨김 토글
```

## 🎯 사용자 유형

### 8가지 기본 유형
1. **성과-증명형**: 끊임없이 성취로 가치 증명
2. **관계-의존형**: 타인의 반응으로 자기 확인
3. **완벽-가면형**: 완벽한 모습만 보여주려 함
4. **희생-헌신형**: 남을 위해 자신을 소진
5. **반항-차별형**: 독특함으로 인정받으려 함
6. **침묵-관찰형**: 인정받지 못할까봐 숨음
7. **과시-표현형**: 끊임없이 자신을 어필
8. **변동-불안형**: 인정 신호에 극도로 민감

## 🔧 개발 환경 설정

### 필수 요구사항
- Node.js >= 18
- React Native CLI
- Xcode (iOS) / Android Studio (Android)

### 설치 및 실행
```bash
# 의존성 설치
npm install

# iOS 실행
npm run ios

# Android 실행
npm run android

# Metro 서버 시작
npm start
```

### 환경 변수 설정

1. **`.env` 파일 생성**: 프론트엔드 루트 디렉토리에 `.env` 파일 생성

```bash
# API 설정
API_BASE_URL=http://localhost:3000/api

# Google OAuth 설정
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# 환경 설정
NODE_ENV=development

# 앱 설정
APP_NAME=Pausemo
APP_VERSION=1.0.0
```

2. **Google OAuth 설정**: 백엔드와 동일한 클라이언트 ID 사용
3. **iOS 전용 설정**: `GoogleService-Info.plist` 파일 생성
4. **환경변수 로드**: `react-native-dotenv`를 통해 자동 로드

### iOS 구글 로그인 설정

1. **Google Cloud Console**에서 iOS 플랫폼 추가
2. **Bundle ID** 입력 (예: `com.yourname.pausemo`)
3. **GoogleService-Info.plist** 다운로드
4. **iOS 프로젝트**에 파일 추가
5. **Podfile**에 GoogleSignIn 의존성 추가
6. **CocoaPods** 재설치: `cd ios && pod install`

## 📊 성공 지표

### 핵심 KPI
- **D7 리텐션**: ≥40%
- **D30 리텐션**: ≥20%
- **일일 응답률**: ≥70%
- **평균 개입 시간**: ≤10초

### 품질 지표
- **유형 분류 정확도**: ≥80%
- **카드 적중률**: ≥60%
- **패턴 개선 체감**: ≥50%

## 🚀 로드맵

### Phase 1: MVP (현재)
- 기본 온보딩 및 카드 시스템
- 단일 카테고리, 3개 퀘스트
- 핵심 기능 구현

### Phase 2: 개인화 (3-6개월)
- AI 기반 개인화 알고리즘
- 감정 요소 동적 조정
- 생활 컨텍스트 인식

### Phase 3: 확장 (6-12개월)
- 6개 카테고리 전체 오픈
- B2B 기업 웰니스 프로그램
- 글로벌 서비스 확장

## 🤝 기여하기

### 개발 가이드라인
1. **TypeScript** 사용 필수
2. **컴포넌트 기반** 아키텍처
3. **접근성** 고려한 UI/UX
4. **테스트 코드** 작성 권장

### 코드 스타일
- **ESLint** + **Prettier** 설정 준수
- **함수형 컴포넌트** 사용
- **Hooks** 기반 상태 관리

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

- **이메일**: support@pausemo.com
- **웹사이트**: https://pausemo.com
- **GitHub**: https://github.com/pausemo/pausemo-app

---

**Pausemo**와 함께 당신만의 패턴을 발견하고 변화를 시작해보세요! 🚀
