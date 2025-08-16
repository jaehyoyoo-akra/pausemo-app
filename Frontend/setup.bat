@echo off
chcp 65001 >nul
cls

echo 🚀 Pausemo Frontend 설정을 시작합니다...
echo.

REM Node.js 버전 확인
echo 📦 Node.js 버전 확인 중...
node -v >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo ✅ Node.js %NODE_VERSION% 확인됨
) else (
    echo ❌ Node.js가 설치되지 않았습니다. Node.js 18+ 버전을 설치해주세요.
    echo    다운로드: https://nodejs.org
    pause
    exit /b 1
)

REM npm 의존성 설치
echo.
echo 📦 npm 의존성 설치 중...
npm install
if %errorlevel% equ 0 (
    echo ✅ npm 의존성 설치 완료
) else (
    echo ❌ npm 의존성 설치 실패
    pause
    exit /b 1
)

REM Android 설정 확인
echo.
echo 🤖 Android 설정 확인 중...
if defined ANDROID_HOME (
    echo ✅ ANDROID_HOME: %ANDROID_HOME%
) else (
    echo ⚠️  ANDROID_HOME 환경변수가 설정되지 않았습니다.
    echo     Android Studio SDK 경로를 ANDROID_HOME에 설정해주세요.
    echo     예시: C:\Users\사용자명\AppData\Local\Android\Sdk
)

REM 구글 서비스 설정 파일 확인
echo.
echo 🔐 구글 서비스 설정 확인 중...

if exist "android\app\google-services.json" (
    findstr /C:"YOUR_" "android\app\google-services.json" >nul
    if %errorlevel% equ 0 (
        echo ⚠️  android\app\google-services.json 파일이 템플릿 상태입니다.
        echo     Google Cloud Console에서 실제 파일을 다운로드하여 교체해주세요.
    ) else (
        echo ✅ Android 구글 서비스 설정 완료
    )
) else (
    echo ❌ android\app\google-services.json 파일이 없습니다.
)

REM iOS 설정 (Windows에서는 불가)
echo.
echo 🍎 iOS 설정 확인 중...
echo ℹ️  Windows 환경이므로 iOS 개발은 불가능합니다.
echo     macOS 환경에서 iOS 앱을 빌드해주세요.

REM 백엔드 서버 확인
echo.
echo 🌐 백엔드 서버 확인 중...
curl -s -o nul -w "%%{http_code}" http://localhost:3000 > temp_status.txt 2>nul
set /p SERVER_STATUS=<temp_status.txt
del temp_status.txt 2>nul

if "%SERVER_STATUS%"=="200" (
    echo ✅ 백엔드 서버가 실행 중입니다.
) else (
    echo ⚠️  백엔드 서버가 실행되지 않았습니다.
    echo     ..\Backend 폴더에서 'npm run dev' 명령어로 서버를 시작해주세요.
)

REM Java 확인
echo.
echo ☕ Java 설정 확인 중...
java -version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Java가 설치되어 있습니다.
) else (
    echo ⚠️  Java가 설치되지 않았거나 PATH에 설정되지 않았습니다.
    echo     Android Studio 설치 시 Java가 함께 설치됩니다.
)

REM Android Studio 확인
echo.
echo 🎯 Android Studio 확인 중...
if exist "%ProgramFiles%\Android\Android Studio\bin\studio64.exe" (
    echo ✅ Android Studio 발견됨
) else if exist "%LOCALAPPDATA%\Programs\Android Studio\bin\studio64.exe" (
    echo ✅ Android Studio 발견됨
) else (
    echo ⚠️  Android Studio가 설치되지 않았습니다.
    echo     다운로드: https://developer.android.com/studio
)

echo.
echo 🎉 설정 확인이 완료되었습니다!
echo.
echo 📱 다음 단계:
echo    1. 백엔드 서버 실행:
echo       cd ..\Backend
echo       npm install
echo       npm run dev
echo.
echo    2. Android 앱 실행:
echo       npm run android
echo.
echo 📚 문제 해결:
echo    - README.md 파일을 참조해주세요
echo    - GOOGLE_LOGIN_SETUP.md에서 구글 로그인 설정 방법 확인
echo.
echo ⚠️  주의사항:
echo    1. 구글 로그인을 위해 실제 google-services.json 파일이 필요합니다
echo    2. Android 에뮬레이터 또는 실제 디바이스가 연결되어야 합니다
echo    3. 백엔드 서버가 먼저 실행되어야 합니다
echo.
echo 🔧 유용한 명령어:
echo    - Android 에뮬레이터 실행: emulator -avd [AVD이름]
echo    - 연결된 디바이스 확인: adb devices
echo    - 앱 로그 확인: npx react-native log-android
echo.

pause

