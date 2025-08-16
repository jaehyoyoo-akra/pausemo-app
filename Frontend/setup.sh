#!/bin/bash

echo "🚀 Pausemo Frontend 설정을 시작합니다..."

# Node.js 버전 확인
echo "📦 Node.js 버전 확인 중..."
node_version=$(node -v 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Node.js $node_version 확인됨"
else
    echo "❌ Node.js가 설치되지 않았습니다. Node.js 18+ 버전을 설치해주세요."
    exit 1
fi

# npm 의존성 설치
echo "📦 npm 의존성 설치 중..."
npm install
if [ $? -eq 0 ]; then
    echo "✅ npm 의존성 설치 완료"
else
    echo "❌ npm 의존성 설치 실패"
    exit 1
fi

# 플랫폼별 설정
echo "🔧 플랫폼별 설정을 진행합니다..."

# iOS 설정 (macOS에서만)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 iOS 설정 중..."
    cd ios
    if command -v pod &> /dev/null; then
        pod install
        if [ $? -eq 0 ]; then
            echo "✅ iOS CocoaPods 설치 완료"
        else
            echo "❌ iOS CocoaPods 설치 실패"
        fi
    else
        echo "⚠️  CocoaPods가 설치되지 않았습니다. 'sudo gem install cocoapods' 명령어로 설치해주세요."
    fi
    cd ..
else
    echo "ℹ️  macOS가 아니므로 iOS 설정을 건너뜁니다."
fi

# Android 설정 확인
echo "🤖 Android 설정 확인 중..."
if [ -z "$ANDROID_HOME" ]; then
    echo "⚠️  ANDROID_HOME 환경변수가 설정되지 않았습니다."
    echo "    Android Studio SDK 경로를 ANDROID_HOME에 설정해주세요."
else
    echo "✅ ANDROID_HOME: $ANDROID_HOME"
fi

# 구글 서비스 설정 파일 확인
echo "🔐 구글 서비스 설정 확인 중..."

# Android
if [ -f "android/app/google-services.json" ]; then
    if grep -q "YOUR_" "android/app/google-services.json"; then
        echo "⚠️  android/app/google-services.json 파일이 템플릿 상태입니다."
        echo "    Google Cloud Console에서 실제 파일을 다운로드하여 교체해주세요."
    else
        echo "✅ Android 구글 서비스 설정 완료"
    fi
else
    echo "❌ android/app/google-services.json 파일이 없습니다."
fi

# iOS
if [ -f "ios/GoogleService-Info.plist" ]; then
    if grep -q "YOUR_" "ios/GoogleService-Info.plist"; then
        echo "⚠️  ios/GoogleService-Info.plist 파일이 템플릿 상태입니다."
        echo "    Google Cloud Console에서 실제 파일을 다운로드하여 교체해주세요."
    else
        echo "✅ iOS 구글 서비스 설정 완료"
    fi
else
    echo "❌ ios/GoogleService-Info.plist 파일이 없습니다."
fi

# 백엔드 서버 확인
echo "🌐 백엔드 서버 확인 중..."
backend_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null)
if [ "$backend_status" == "200" ]; then
    echo "✅ 백엔드 서버가 실행 중입니다."
else
    echo "⚠️  백엔드 서버가 실행되지 않았습니다."
    echo "    ../Backend 폴더에서 'npm run dev' 명령어로 서버를 시작해주세요."
fi

echo ""
echo "🎉 설정이 완료되었습니다!"
echo ""
echo "📱 앱 실행 방법:"
echo "   Android: npm run android"
echo "   iOS:     npm run ios"
echo ""
echo "📚 자세한 내용은 README.md를 참조해주세요."
echo ""
echo "⚠️  주의사항:"
echo "   1. 구글 로그인을 위해 실제 google-services.json 파일이 필요합니다."
echo "   2. 백엔드 서버가 실행 중이어야 합니다."
echo "   3. 실제 디바이스에서 테스트할 때는 네트워크 설정을 확인해주세요."

