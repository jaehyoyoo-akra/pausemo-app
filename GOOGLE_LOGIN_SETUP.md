# 구글 로그인 설정 가이드

## 1. Google Cloud Console 설정

### 1.1 프로젝트 생성
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택

### 1.2 Google Sign-In API 활성화
1. "API 및 서비스" > "라이브러리"로 이동
2. "Google Sign-In API" 검색 후 활성화

### 1.3 OAuth 2.0 클라이언트 ID 생성
1. "API 및 서비스" > "사용자 인증 정보"로 이동
2. "사용자 인증 정보 만들기" > "OAuth 2.0 클라이언트 ID" 선택

#### Android 클라이언트 ID
- 애플리케이션 유형: Android
- 패키지 이름: `com.akra.pausemo`
- SHA-1 인증서 지문: 개발용 키스토어의 SHA-1 값

#### iOS 클라이언트 ID
- 애플리케이션 유형: iOS
- 번들 ID: `com.akra.pausemo`
- App Store ID: (선택사항)

#### 웹 클라이언트 ID (백엔드 검증용)
- 애플리케이션 유형: 웹 애플리케이션
- 승인된 JavaScript 원본: `http://localhost:3000`

### 1.4 SHA-1 인증서 지문 확인
```bash
# Windows (PowerShell)
keytool -list -v -keystore "C:\Users\[USERNAME]\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android

# macOS/Linux
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

## 2. 설정 파일 업데이트

### 2.1 Android 설정 파일
1. Google Cloud Console에서 `google-services.json` 다운로드
2. `Frontend/android/app/` 폴더에 복사
3. 파일 내용의 `YOUR_*` 부분을 실제 값으로 교체

### 2.2 iOS 설정 파일
1. Google Cloud Console에서 `GoogleService-Info.plist` 다운로드
2. `Frontend/ios/` 폴더에 복사
3. Xcode에서 프로젝트에 파일 추가 (Add Files to Project)
4. 파일 내용의 `YOUR_*` 부분을 실제 값으로 교체

### 2.3 백엔드 환경 변수
`Backend/routes/auth.js`에서 다음 값들을 실제 값으로 교체:
```javascript
const GOOGLE_CLIENT_ID = '실제_웹_클라이언트_ID.apps.googleusercontent.com';
```

### 2.4 프론트엔드 설정
`Frontend/App.tsx`에서 다음 값들을 실제 값으로 교체:
```javascript
const GOOGLE_CLIENT_IDS = {
  android: '실제_안드로이드_클라이언트_ID.apps.googleusercontent.com',
  ios: '실제_iOS_클라이언트_ID.apps.googleusercontent.com',
  web: '실제_웹_클라이언트_ID.apps.googleusercontent.com',
};
```

## 3. 플랫폼별 설정

### 3.1 Android 설정
- `Frontend/android/app/build.gradle`에 `apply plugin: 'com.google.gms.google-services'` 추가됨
- `Frontend/android/build.gradle`에 Google Services 클래스패스 추가됨
- `google-services.json` 파일이 `Frontend/android/app/` 폴더에 위치해야 함

### 3.2 iOS 설정
- `Frontend/ios/Podfile`에 Google Sign-In 설정 추가됨
- `GoogleService-Info.plist` 파일을 Xcode 프로젝트에 추가해야 함
- iOS 13.0 이상 지원 설정 추가됨

## 4. 테스트

### 4.1 백엔드 서버 실행
```bash
cd Backend
npm install
node server.js
```

### 4.2 프론트엔드 실행

#### Android
```bash
cd Frontend
npm install
npx react-native run-android
```

#### iOS
```bash
cd Frontend
npm install
cd ios && pod install && cd ..
npx react-native run-ios
```

### 4.3 구글 로그인 테스트
1. 앱 실행
2. "구글 로그인" 버튼 클릭
3. 구글 계정 선택 및 권한 승인
4. 로그인 성공 확인

## 5. 문제 해결

### 5.1 일반적인 오류
- **SHA-1 불일치**: 키스토어의 SHA-1 값이 Google Cloud Console에 등록된 값과 일치하는지 확인
- **패키지 이름 불일치**: `google-services.json`의 패키지 이름이 `build.gradle`의 `applicationId`와 일치하는지 확인
- **API 키 누락**: `google-services.json`에 모든 필요한 키가 포함되어 있는지 확인

### 5.2 디버깅
- Android Studio의 Logcat에서 오류 메시지 확인
- React Native 디버거에서 콘솔 로그 확인
- 백엔드 서버 로그 확인

## 6. 보안 고려사항

1. **JWT_SECRET**: 프로덕션에서는 강력한 비밀키 사용
2. **클라이언트 ID**: 프론트엔드 코드에 노출되어도 안전 (공개 정보)
3. **API 키**: `google-services.json`의 API 키는 제한된 사용만 허용
4. **HTTPS**: 프로덕션에서는 HTTPS 사용 필수

## 7. 프로덕션 배포

### 7.1 릴리즈 키스토어
- 프로덕션용 키스토어 생성
- 릴리즈 빌드에 사용할 SHA-1 값 Google Cloud Console에 등록
- `google-services.json` 업데이트

### 7.2 환경 변수
- 백엔드의 JWT_SECRET을 환경 변수로 관리
- 데이터베이스 연결 정보를 환경 변수로 관리
