@echo off
chcp 65001 >nul
cls

echo 🧹 Pausemo 빌드 캐시 정리 중...
echo.

REM React Native 캐시 정리
echo 📦 React Native 캐시 정리 중...
npx react-native clean 2>nul
if %errorlevel% equ 0 (
    echo ✅ React Native 캐시 정리 완료
) else (
    echo ⚠️  React Native clean 명령어를 사용할 수 없습니다
)

REM Metro 캐시 정리
echo 🚇 Metro 캐시 정리 중...
npx react-native start --reset-cache &
timeout /t 3 >nul
taskkill /f /im node.exe 2>nul
echo ✅ Metro 캐시 정리 완료

REM Android 빌드 캐시 정리
echo 🤖 Android 빌드 캐시 정리 중...
cd android
if exist "build" (
    rmdir /s /q build
    echo ✅ Android build 폴더 삭제 완료
)

if exist "app\build" (
    rmdir /s /q app\build
    echo ✅ Android app\build 폴더 삭제 완료
)

REM Gradle 캐시 정리
gradlew clean 2>nul
if %errorlevel% equ 0 (
    echo ✅ Gradle 캐시 정리 완료
) else (
    echo ⚠️  Gradle 정리 실패 (정상적일 수 있음)
)

cd ..

REM node_modules 재설치 (선택사항)
echo.
set /p REINSTALL="node_modules를 다시 설치하시겠습니까? (y/N): "
if /i "%REINSTALL%"=="y" (
    echo 📦 node_modules 재설치 중...
    rmdir /s /q node_modules 2>nul
    npm install
    echo ✅ node_modules 재설치 완료
)

echo.
echo 🎉 빌드 캐시 정리가 완료되었습니다!
echo.
echo 📱 이제 앱을 다시 빌드해보세요:
echo    npm run android
echo.
echo ℹ️  패키지명 변경으로 인해 기존 앱이 디바이스에 남아있을 수 있습니다.
echo     디바이스에서 기존 앱을 삭제한 후 새로 설치하는 것을 권장합니다.
echo.

pause

