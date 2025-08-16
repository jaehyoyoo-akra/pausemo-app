# Pausemo Frontend

React Native 0.81 기반 Pausemo 모바일 앱

## 🚀 개요

Pausemo는 "패턴을 멈추는 결정적 순간"이라는 뜻으로, 간단한 3초 개입을 통해 일상의 패턴을 바꿔나가는 앱입니다.

### 주요 기능

- **구글 로그인**: 간편한 소셜 로그인
- **패턴 진단**: 개인화된 유형 분석 (8가지 유형)
- **Y/N 카드 시스템**: 관찰 → 틈 → 강화의 3단계 개입
- **대시보드**: 진행률 및 능력치 시각화
- **피드백 시스템**: 상담/문의/버그리포트 기능
- **스마트 알림**: 사용자 패턴 기반 맞춤 알림

## 📦 설치 및 실행

### 1. 사전 요구사항

- Node.js 18+
- React Native CLI
- Android Studio (Android 개발용)
- Xcode (iOS 개발용, macOS만)

### 2. 자동 설정 (권장)

#### Windows
```batch
cd Frontend
setup.bat
```

또는 PowerShell:
```powershell
cd Frontend
.\setup.ps1
```

#### macOS/Linux
```bash
cd Frontend
./setup.sh
```

### 3. 수동 설정

#### 의존성 설치
```bash
npm install
```

#### iOS 설정 (macOS만)
```bash
cd ios
pod install
cd ..
```

#### Android 설정

1. `android/app/google-services.json` 파일 업데이트
   - Google Cloud Console에서 실제 파일 다운로드 필요
   - 현재는 템플릿 파일이므로 실제 값으로 교체 필요

2. Android SDK 및 에뮬레이터 설정
   - Android Studio에서 AVD Manager로 에뮬레이터 생성

### 5. 백엔드 서버 실행

```bash
cd ../Backend
npm install
npm run dev
```

### 6. 앱 실행

#### 간편 실행 (Windows)
```batch
start-dev.bat
```

#### 수동 실행
##### Android
```bash
npm run android
```

##### iOS (macOS만)
```bash
npm run ios
```

## 🔧 환경 설정

### API 서버 URL 변경

`src/services/api.ts` 파일에서 BASE_URL 수정:

```typescript
// 개발 환경
const BASE_URL = 'http://10.0.2.2:3000'; // Android 에뮬레이터
// const BASE_URL = 'http://localhost:3000'; // iOS 시뮬레이터

// 프로덕션 환경
// const BASE_URL = 'https://your-api-domain.com';
```

### 구글 로그인 설정

1. `GOOGLE_LOGIN_SETUP.md` 파일 참조
2. `src/services/auth.ts`에서 클라이언트 ID 업데이트:

```typescript
const GOOGLE_CLIENT_IDS = {
  android: '실제_안드로이드_클라이언트_ID',
  ios: '실제_iOS_클라이언트_ID', 
  web: '실제_웹_클라이언트_ID',
};
```

## 🏗️ 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── common/         # 공통 컴포넌트 (Button, Card 등)
│   └── cards/          # 카드 관련 컴포넌트
├── context/            # React Context (상태 관리)
├── screens/            # 화면 컴포넌트
│   ├── auth/          # 로그인 관련
│   ├── onboarding/    # 온보딩 플로우
│   ├── main/          # 메인 앱 화면
│   └── settings/      # 설정 및 피드백
├── services/           # API 및 외부 서비스
├── styles/            # 디자인 시스템
└── types/             # TypeScript 타입 정의
```

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: `#4A90E2` (신뢰감 있는 블루)
- **Secondary**: `#6B7280` (차분한 그레이)
- **Accent**: `#10B981` (성취감을 주는 그린)
- **Pause**: `#8B5CF6` (멈춤을 의미하는 보라)
- **Moment**: `#06B6D4` (순간을 의미하는 청록)

### 타이포그래피
- 한글 친화적 폰트 설정
- 가독성 중심의 라인 하이트
- 계층적 텍스트 스타일

### 간격 시스템
- 8px 기반 일관된 간격
- 컴포넌트별 표준화된 패딩/마진

## 📱 주요 플로우

### 1. 온보딩
1. **카테고리 선택**: 6개 영역 중 1개 선택
2. **패턴 진단**: 6-18개 Y/N 질문으로 유형 분석
3. **결과 확인**: 개인화된 접근법 제시
4. **여정 시작**: 알림 설정 및 메인 화면 이동

### 2. 일상 개입
1. **관찰**: "지금 상황 확인" Y/N 질문
2. **틈**: 3초간 가치문장 표시 및 멈춤
3. **강화**: 작은 약속으로 새로운 선택 강화

### 3. 대시보드
- 오늘의 응답률, 연속 기록, 포인트
- 진행 중인 퀘스트 현황
- 6가지 능력치 시각화

## 🔔 알림 시스템

### 스마트 알림
- 사용자 유형별 맞춤 메시지
- 랜덤 시간 간격 (2-4시간)
- 일일 리마인더 (아침/오후/저녁)

### 성취 알림
- 개입 완료시 즉시 피드백
- 연속 기록 달성시 축하 메시지

## 🛠️ 개발 가이드

### 새로운 화면 추가
1. `src/screens/` 하위에 컴포넌트 생성
2. `App.tsx`에서 라우팅 로직 추가
3. 필요시 타입 정의 업데이트

### 새로운 API 추가
1. `src/services/api.ts`에 함수 추가
2. 타입 정의 업데이트
3. 에러 핸들링 추가

### 스타일 가이드
- 컬러는 `src/styles/colors.ts` 사용
- 타이포그래피는 `src/styles/typography.ts` 사용
- 간격은 `src/styles/spacing.ts` 사용

## 🚨 문제 해결

### 일반적인 오류

1. **Java 버전 오류 (Android Gradle plugin requires Java 17)**
   ```
   fix-java.bat
   ```
   또는 수동으로:
   - Android Studio에서 File > Settings > Build Tools > Gradle
   - "Gradle JDK"를 JDK 17 이상으로 변경
   - 또는 `android/gradle.properties`에 JDK 경로 설정

2. **구글 로그인 실패**
   - SHA-1 인증서 지문 확인
   - 패키지명 일치 여부 확인
   - 클라이언트 ID 설정 확인

3. **API 연결 실패**
   - 백엔드 서버 실행 상태 확인
   - BASE_URL 설정 확인
   - 네트워크 권한 확인

4. **알림 권한 거부**
   - 디바이스 설정에서 수동 허용
   - 앱 재설치 후 다시 시도

5. **패키지명 변경 후 빌드 오류**
   ```
   clean-build.bat
   ```

### 디버깅 팁

#### Windows
```batch
# React Native 로그 확인
npx react-native log-android

# 연결된 디바이스 확인
adb devices

# 개발자 메뉴 열기
# Android: Ctrl+M (에뮬레이터) 또는 디바이스 흔들기
```

#### macOS/Linux
```bash
# React Native 로그 확인
npx react-native log-android  # Android
npx react-native log-ios      # iOS

# 개발자 메뉴 열기
# Android: Ctrl+M (에뮬레이터) 또는 디바이스 흔들기
# iOS: Cmd+D (시뮬레이터) 또는 디바이스 흔들기
```

## 📋 MVP 체크리스트

- [x] 구글 로그인 시스템
- [x] 온보딩 플로우 (카테고리 선택, 패턴 진단, 결과)
- [x] Y/N 카드 시스템 (관찰→틈→강화)
- [x] 대시보드 (통계, 퀘스트, 능력치)
- [x] 설정 화면 (로그아웃, 피드백)
- [x] 푸시 알림 시스템
- [x] 피드백 시스템 (상담/문의/버그리포트)

## 🔮 향후 계획

### Phase 2 (MVP+1개월)
- [ ] 시간대 자동 학습
- [ ] 14/30일 마일스톤
- [ ] 생활 리듬 매칭
- [ ] 주간 리포트

### Phase 3 (MVP+3개월)
- [ ] 3개 카테고리로 확장
- [ ] 8개 유형 분류 시스템
- [ ] 집중 모드
- [ ] 성장 궤적 시각화

## 📄 라이선스

MIT License

## 🤝 기여하기

1. 이슈 등록
2. 브랜치 생성
3. 커밋 및 푸시
4. Pull Request 생성

## 📞 문의

- 이메일: support@pausemo.com
- 앱 내 피드백 기능 이용