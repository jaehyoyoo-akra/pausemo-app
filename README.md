# 🛑 Pausemo - 패턴을 멈추는 결정적 순간

> "패턴을 멈추는 결정적 순간"을 제공하는 AI 기반 개인화 웰니스 앱

Pausemo는 간단한 3초 개입을 통해 일상의 부정적 패턴을 인식하고 긍정적으로 바꿔나가는 모바일 앱입니다. React Native + Express.js 기반으로 개발되었습니다.

## 📱 주요 기능

- **🔐 구글 로그인**: 간편한 소셜 로그인 시스템
- **🧩 패턴 진단**: 개인화된 8가지 유형 분석
- **🃏 Y/N 카드 시스템**: 관찰 → 틈 → 강화의 3단계 개입
- **📊 스마트 대시보드**: 진행률 및 능력치 시각화
- **🔔 맞춤형 알림**: 사용자 패턴 기반 스마트 알림
- **💬 피드백 시스템**: 상담/문의/버그리포트 기능

## 🏗️ 프로젝트 구조

```
app_test/
├── Backend/                    # Express.js API 서버
│   ├── middleware/            # 인증 미들웨어
│   ├── models/               # MongoDB 스키마
│   ├── routes/               # API 엔드포인트
│   ├── services/             # 비즈니스 로직
│   └── server.js             # 서버 진입점
├── Frontend/                  # React Native 모바일 앱
│   ├── src/
│   │   ├── components/       # 재사용 가능한 UI 컴포넌트
│   │   ├── screens/          # 화면 컴포넌트
│   │   ├── services/         # API 및 외부 서비스
│   │   ├── styles/           # 디자인 시스템
│   │   └── types/            # TypeScript 타입
│   ├── android/              # Android 네이티브 설정
│   └── ios/                  # iOS 네이티브 설정
└── GOOGLE_LOGIN_SETUP.md     # Google 로그인 설정 가이드
```

## 🚀 빠른 시작

### 1. 사전 요구사항

#### 공통
- **Node.js** 18+ ([다운로드](https://nodejs.org/))
- **Git** ([다운로드](https://git-scm.com/))

#### Windows
- **Android Studio** ([다운로드](https://developer.android.com/studio))
- **JDK 17+** (Android Studio와 함께 설치됨)

#### macOS
- **Xcode** 14+ (App Store에서 설치)
- **CocoaPods** (`sudo gem install cocoapods`)
- **Android Studio** (Android 개발용)

#### Linux
- **Android Studio** ([다운로드](https://developer.android.com/studio))
- **JDK 17+** (`sudo apt install openjdk-17-jdk`)

### 2. 프로젝트 클론 및 설치

```bash
# 저장소 클론
git clone <repository-url>
cd app_test

# 백엔드 의존성 설치
cd Backend
npm install
cd ..

# 프론트엔드 의존성 설치
cd Frontend
npm install
```

#### macOS 추가 설정
```bash
# iOS 의존성 설치
cd Frontend/ios
pod install
cd ../..
```

### 3. 환경 설정

#### 백엔드 환경 변수
`Backend/.env` 파일 생성:
```bash
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/pausemo
JWT_SECRET=your_jwt_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
```

#### 구글 로그인 설정
1. `GOOGLE_LOGIN_SETUP.md` 참고하여 Google Cloud Console 설정
2. 클라이언트 ID를 `Frontend/src/services/auth.ts`에 업데이트
3. `android/app/google-services.json` 파일 업데이트 (Android용)
4. `ios/GoogleService-Info.plist` 파일 업데이트 (iOS용)

### 4. 개발 서버 실행

#### 터미널 1: 백엔드 서버
```bash
cd Backend
npm run dev
```

#### 터미널 2: React Native 메트로 서버
```bash
cd Frontend
npm start
```

#### 터미널 3: 앱 실행
```bash
cd Frontend

# Android
npm run android

# iOS (macOS만)
npm run ios
```

## 🖥️ 플랫폼별 상세 가이드

### Windows 개발 환경

#### 자동 설정 (권장)
```batch
cd Frontend
setup.bat
```

#### 수동 설정
1. **Android Studio 설치 및 설정**
   - Android SDK, Android Virtual Device 설정
   - 환경 변수 `ANDROID_HOME` 설정

2. **JDK 버전 문제 해결**
   ```batch
   # Java 오류 시 실행
   fix-java.bat
   ```

3. **깨끗한 빌드**
   ```batch
   # 빌드 캐시 정리
   clean-build.bat
   ```

### macOS 개발 환경

#### 필수 설치
```bash
# Homebrew (없는 경우)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js 및 Watchman
brew install node watchman

# CocoaPods
sudo gem install cocoapods

# React Native CLI
npm install -g react-native-cli
```

#### iOS 시뮬레이터 설정
```bash
# Xcode 명령줄 도구 설치
xcode-select --install

# iOS 시뮬레이터 실행
open -a Simulator
```

### Linux 개발 환경

#### Ubuntu/Debian
```bash
# Node.js 18+ 설치
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# JDK 17 설치
sudo apt install openjdk-17-jdk

# Android Studio 설치 (수동 다운로드 필요)
# https://developer.android.com/studio
```

## 🔧 API 서버 설정

### MongoDB 설치 및 실행

#### Windows
```bash
# MongoDB Community Server 설치 후
mongod --dbpath C:\data\db
```

#### macOS
```bash
# Homebrew로 설치
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt install mongodb
sudo systemctl start mongodb
```

### API 엔드포인트

| 메서드 | 엔드포인트 | 설명 |
|--------|------------|------|
| POST | `/api/auth/google` | Google 로그인 |
| GET | `/api/auth/me` | 사용자 정보 조회 |
| GET | `/api/cards` | 카드 목록 조회 |
| POST | `/api/cards/response` | 카드 응답 저장 |
| GET | `/api/quests` | 퀘스트 목록 조회 |
| POST | `/api/feedback` | 피드백 전송 |

## 📱 앱 빌드 및 배포

### Android 빌드

#### 개발용 APK
```bash
cd Frontend/android
./gradlew assembleDebug
```

#### 릴리즈용 APK (서명 필요)
```bash
# 키스토어 생성 (최초 1회)
keytool -genkey -v -keystore pausemo-key.keystore -alias pausemo -keyalg RSA -keysize 2048 -validity 10000

# 릴리즈 빌드
cd android
./gradlew assembleRelease
```

### iOS 빌드 (macOS만)

#### 개발용
```bash
cd Frontend
npx react-native run-ios --configuration Release
```

#### App Store 배포
1. Xcode에서 `ios/Frontend.xcworkspace` 열기
2. Product → Archive
3. App Store Connect로 업로드

## 🎨 디자인 시스템

### 컬러 팔레트
```typescript
// src/styles/colors.ts
export const colors = {
  primary: '#4A90E2',     // 신뢰감 있는 블루
  secondary: '#6B7280',   // 차분한 그레이
  accent: '#10B981',      // 성취감을 주는 그린
  pause: '#8B5CF6',       // 멈춤을 의미하는 보라
  moment: '#06B6D4',      // 순간을 의미하는 청록
  danger: '#EF4444',      // 경고/오류
  warning: '#F59E0B',     // 주의
  success: '#10B981',     // 성공
};
```

### 타이포그래피
- 한글 친화적 폰트 시스템
- 계층적 텍스트 스타일 (heading1~6, body1~2, caption)
- 가독성 중심의 라인 하이트

### 간격 시스템
- 8px 기반 일관된 간격 (`xs: 4, sm: 8, md: 16, lg: 24, xl: 32`)

## 🧪 테스트

### 단위 테스트
```bash
cd Frontend
npm test
```

### E2E 테스트 (향후 추가 예정)
```bash
# Detox 또는 Appium 사용 예정
```

## 🚨 문제 해결

### 일반적인 오류

#### 1. Java 버전 오류
```bash
# Windows
fix-java.bat

# macOS/Linux
export JAVA_HOME=/path/to/java17
```

#### 2. Metro 서버 오류
```bash
cd Frontend
npx react-native start --reset-cache
```

#### 3. Android 빌드 오류
```bash
cd Frontend/android
./gradlew clean
cd ..
npx react-native run-android
```

#### 4. iOS 빌드 오류 (macOS)
```bash
cd Frontend/ios
rm -rf Pods
pod install
cd ..
npx react-native run-ios
```

#### 5. 네트워크 연결 오류
- API 서버 실행 상태 확인
- 방화벽 설정 확인
- `src/services/api.ts`의 BASE_URL 확인

### 디버깅 도구

#### React Native Debugger
```bash
# Chrome DevTools
npx react-native start
# 개발자 메뉴에서 "Debug JS Remotely" 선택
```

#### Flipper (권장)
1. [Flipper 다운로드](https://fbflipper.com/)
2. 디바이스 연결 후 네트워크, 로그, 레이아웃 디버깅

## 📊 성능 최적화

### 번들 크기 분석
```bash
cd Frontend
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --analyze
```

### 메모리 사용량 모니터링
- Flipper의 Memory Inspector 사용
- Android Studio의 Profiler 활용

## 🔐 보안 고려사항

### API 키 관리
- 환경 변수 사용 (`.env` 파일)
- 프로덕션에서는 secure storage 활용

### 데이터 암호화
- 로컬 저장소: AsyncStorage + 암호화
- 네트워크 통신: HTTPS only

### 권한 관리
- 최소 권한 원칙
- 런타임 권한 요청

## 📈 모니터링 및 분석

### 크래시 리포팅 (향후 추가)
- Crashlytics 연동 예정
- Sentry 연동 예정

### 사용자 분석 (향후 추가)
- Firebase Analytics
- 사용자 행동 패턴 분석

## 🚀 배포 전략

### 개발 → 스테이징 → 프로덕션
1. **개발**: 로컬 환경
2. **스테이징**: 테스트 서버 + TestFlight/내부 테스트
3. **프로덕션**: App Store + Google Play

### CI/CD 파이프라인 (향후 구축)
- GitHub Actions
- 자동 테스트 및 빌드
- 코드 품질 검사

## 🤝 기여 가이드

### 개발 워크플로우
1. **이슈 생성**: 버그 리포트 또는 기능 요청
2. **브랜치 생성**: `feature/기능명` 또는 `bugfix/이슈번호`
3. **개발 및 테스트**: 코드 작성 및 테스트
4. **Pull Request**: 코드 리뷰 요청
5. **머지**: 승인 후 main 브랜치에 병합

### 코딩 스타일
- **TypeScript** 강제 사용
- **ESLint + Prettier** 설정 준수
- **커밋 메시지**: [Conventional Commits](https://www.conventionalcommits.org/) 규칙

### 브랜치 전략
- `main`: 프로덕션 배포 브랜치
- `develop`: 개발 통합 브랜치
- `feature/*`: 기능 개발 브랜치
- `bugfix/*`: 버그 수정 브랜치
- `hotfix/*`: 긴급 수정 브랜치

## 📋 로드맵

### Phase 1: MVP (현재)
- [x] 기본 인증 시스템
- [x] 패턴 진단 및 카드 시스템
- [x] 대시보드 및 통계
- [x] 푸시 알림

### Phase 2: 고도화 (MVP + 1개월)
- [ ] 시간대 자동 학습
- [ ] 14/30일 마일스톤
- [ ] 생활 리듬 매칭
- [ ] 주간 리포트

### Phase 3: 확장 (MVP + 3개월)
- [ ] 3개 카테고리로 확장
- [ ] 8개 유형 분류 시스템
- [ ] 집중 모드
- [ ] 성장 궤적 시각화

### Phase 4: 스케일링 (MVP + 6개월)
- [ ] 소셜 기능 (친구, 그룹)
- [ ] 전문가 상담 연결
- [ ] 웨어러블 디바이스 연동
- [ ] 다국어 지원

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일 참조

## 📞 지원 및 문의

- **이메일**: support@pausemo.com
- **앱 내 피드백**: 설정 → 피드백 기능 이용
- **버그 리포트**: GitHub Issues 생성
- **개발 문의**: 프로젝트 메인테이너에게 연락

---

**Pausemo** - "Pattern + Stop + Moment"의 결합으로, 패턴을 멈추는 결정적 순간을 제공합니다. 🛑✨
