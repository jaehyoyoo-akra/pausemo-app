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
```

## 🔑 OpenAI API 키 설정

1. [OpenAI Platform](https://platform.openai.com/)에 로그인
2. API Keys 섹션에서 새 키 생성
3. 생성된 키를 `.env` 파일의 `OPENAI_API_KEY`에 설정

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
