# Pausemo 백엔드 환경 변수 설정 가이드

## 📁 .env 파일 생성

백엔드 루트 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# MongoDB 연결
MONGODB_URI=mongodb://localhost:27017/pausemo

# JWT 시크릿 키
JWT_SECRET=pausemo_jwt_secret_key_2024

# API 암호화 키
API_ENCRYPTION_KEY=pausemo_api_secret_key_2024

# OpenAI API 키 (실제 키로 변경)
OPENAI_API_KEY=sk-your-actual-openai-api-key-here

# 서버 포트
PORT=3000

# 환경 설정
NODE_ENV=development

# Google OAuth 설정 (플랫폼별)
GOOGLE_ANDROID_CLIENT_ID=472208960312-d53rb3rujt4m166mdmilu6urf8ck9o1k.apps.googleusercontent.com
GOOGLE_IOS_CLIENT_ID=472208960312-cli1qspacvdhpdmlu1pim7k39h3flhe8.apps.googleusercontent.com
GOOGLE_WEB_CLIENT_ID=472208960312-web_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# CORS 설정
CORS_ORIGIN=http://localhost:3000,http://localhost:8081
```

## 🔑 OpenAI API 키 설정

1. [OpenAI Platform](https://platform.openai.com/)에 로그인
2. API Keys 섹션에서 새 키 생성
3. 생성된 키를 `.env` 파일의 `OPENAI_API_KEY`에 설정

## 🔑 Google OAuth 설정 (플랫폼별)

### Android OAuth 클라이언트
1. [Google Cloud Console](https://console.cloud.google.com/)에 로그인
2. "API 및 서비스" > "사용자 인증 정보" 메뉴로 이동
3. "사용자 인증 정보 만들기" > "OAuth 2.0 클라이언트 ID" 선택
4. 애플리케이션 유형을 "Android"로 설정
5. 패키지명: `com.akra.pausemo`
6. SHA1 인증서 지문 입력 (debug/release)
7. 생성된 클라이언트 ID를 `GOOGLE_ANDROID_CLIENT_ID`에 설정

### iOS OAuth 클라이언트
1. 동일한 Google Cloud Console에서
2. "사용자 인증 정보 만들기" > "OAuth 2.0 클라이언트 ID" 선택
3. 애플리케이션 유형을 "iOS"로 설정
4. Bundle ID: `com.akra.pausemo`
5. 생성된 클라이언트 ID를 `GOOGLE_IOS_CLIENT_ID`에 설정

### Web OAuth 클라이언트 (백엔드용)
1. 동일한 Google Cloud Console에서
2. "사용자 인증 정보 만들기" > "OAuth 2.0 클라이언트 ID" 선택
3. 애플리케이션 유형을 "웹 애플리케이션"으로 설정
4. 승인된 리디렉션 URI에 다음 추가:
   - `http://localhost:3000/auth/google/callback`
   - `http://localhost:8081/auth/google/callback` (React Native)
5. 생성된 클라이언트 ID와 시크릿을 각각 설정

## 🚨 보안 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- `.gitignore`에 `.env`가 포함되어 있는지 확인
- 프로덕션 환경에서는 더 강력한 시크릿 키 사용

## ✅ 설정 확인

서버 실행 후 다음 엔드포인트로 확인:

```bash
GET /api/ai/status
```

응답 예시:
```json
{
  "success": true,
  "data": {
    "hasKey": true,
    "keyLength": 51,
    "maskedKey": "sk-************************************abcd",
    "isValid": true,
    "message": "API 키가 유효합니다."
  }
}
```

## 🔧 문제 해결

### API 키가 유효하지 않은 경우
1. `.env` 파일이 올바른 위치에 있는지 확인
2. API 키가 정확히 복사되었는지 확인
3. OpenAI 계정에 충분한 크레딧이 있는지 확인

### 서버 연결 실패
1. MongoDB가 실행 중인지 확인
2. 포트 3000이 사용 가능한지 확인
3. 환경 변수가 올바르게 로드되었는지 확인
