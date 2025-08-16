@echo off
chcp 65001 >nul
cls

echo 🧹 깊은 캐시 정리를 시작합니다...
echo.

REM Metro 서버 종료
echo 🚇 Metro 서버 종료 중...
taskkill /f /im node.exe 2>nul
taskkill /f /im java.exe 2>nul

REM node_modules 삭제
echo 📦 node_modules 삭제 중...
if exist "node_modules" (
    rmdir /s /q node_modules
    echo ✅ node_modules 삭제 완료
)

REM package-lock.json 삭제
if exist "package-lock.json" (
    del package-lock.json
    echo ✅ package-lock.json 삭제 완료
)

REM Android 빌드 파일들 삭제
echo 🤖 Android 빌드 캐시 정리 중...
cd android

if exist "build" (
    rmdir /s /q build
    echo ✅ android/build 삭제 완료
)

if exist "app\build" (
    rmdir /s /q app\build
    echo ✅ android/app/build 삭제 완료
)

if exist ".gradle" (
    rmdir /s /q .gradle
    echo ✅ android/.gradle 삭제 완료
)

REM Gradle wrapper 캐시 정리
gradlew clean 2>nul

cd ..

REM 전역 캐시 정리
echo 🗂️ 전역 캐시 정리 중...
npm cache clean --force 2>nul

REM React Native 캐시 정리
npx react-native clean-project-auto 2>nul

echo.
echo 📦 의존성 재설치 중...
npm install

echo.
echo 🎉 깊은 정리 완료!
echo.
echo 📱 이제 앱을 빌드해보세요:
echo    npm run android
echo.

pause

