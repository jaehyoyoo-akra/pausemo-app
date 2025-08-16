@echo off
chcp 65001 >nul
cls

echo 🔧 Java 버전 문제 해결 중...
echo.

REM 현재 Java 버전 확인
echo 📋 현재 Java 버전:
java -version
echo.

REM JAVA_HOME 확인
echo 📂 현재 JAVA_HOME:
if defined JAVA_HOME (
    echo %JAVA_HOME%
) else (
    echo (설정되지 않음)
)
echo.

echo 🎯 해결 방법 안내:
echo.
echo 방법 1: Android Studio 내장 JDK 사용 (권장)
echo ================================================
echo 1. Android Studio를 엽니다
echo 2. File ^> Settings (또는 Ctrl+Alt+S)
echo 3. Build, Execution, Deployment ^> Build Tools ^> Gradle
echo 4. "Gradle JDK"에서 JDK 17 이상 선택
echo    (보통 "Embedded JDK"가 17 이상임)
echo.

REM Android Studio 내장 JDK 경로 찾기
echo 🔍 Android Studio 내장 JDK 찾는 중...
set "STUDIO_JDK="

REM 일반적인 Android Studio JDK 경로들 확인
for %%d in (
    "%ProgramFiles%\Android\Android Studio\jbr"
    "%LOCALAPPDATA%\Programs\Android Studio\jbr"
    "%ProgramFiles%\Android\Android Studio\jre"
    "%LOCALAPPDATA%\Programs\Android Studio\jre"
) do (
    if exist "%%~d\bin\java.exe" (
        set "STUDIO_JDK=%%~d"
        echo ✅ 발견됨: %%~d
        
        REM JDK 버전 확인
        "%%~d\bin\java.exe" -version 2^>^&1 | findstr "version" | head -1
        goto :found_jdk
    )
)

:found_jdk
echo.

if defined STUDIO_JDK (
    echo 방법 2: 환경변수로 JDK 설정 (자동)
    echo =======================================
    set /p AUTO_SET="발견된 JDK를 JAVA_HOME으로 설정하시겠습니까? (y/N): "
    
    if /i "!AUTO_SET!"=="y" (
        echo.
        echo 🔧 JAVA_HOME 설정 중...
        setx JAVA_HOME "%STUDIO_JDK%"
        if !errorlevel! equ 0 (
            echo ✅ JAVA_HOME이 %STUDIO_JDK%로 설정되었습니다
            echo.
            echo ⚠️  새 터미널을 열어야 변경사항이 적용됩니다.
            echo     이 창을 닫고 새 터미널에서 npm run android를 실행해주세요.
        ) else (
            echo ❌ JAVA_HOME 설정 실패
        )
    ) else (
        goto :manual_setup
    )
) else (
    :manual_setup
    echo 방법 2: 수동으로 JAVA_HOME 설정
    echo ================================
    echo 1. Java 17 이상을 다운로드하세요:
    echo    - Oracle JDK: https://www.oracle.com/java/technologies/downloads/
    echo    - OpenJDK: https://adoptium.net/
    echo    - Microsoft OpenJDK: https://www.microsoft.com/openjdk
    echo.
    echo 2. 시스템 환경변수에 JAVA_HOME 추가:
    echo    - 시스템 속성 ^> 고급 ^> 환경 변수
    echo    - 시스템 변수에 JAVA_HOME 추가
    echo    - 값: Java 설치 경로 (예: C:\Program Files\Java\jdk-17)
    echo.
    echo 3. PATH에 %%JAVA_HOME%%\bin 추가
    echo.
)

echo 방법 3: gradle.properties에서 JDK 지정
echo ========================================
echo Frontend\android\gradle.properties 파일에 다음 줄 추가:
if defined STUDIO_JDK (
    echo org.gradle.java.home=%STUDIO_JDK%
) else (
    echo org.gradle.java.home=C:\path\to\your\jdk17
)
echo.

echo 🔄 설정 후 다음 명령어로 테스트:
echo    cd Frontend
echo    clean-build.bat
echo    npm run android
echo.

pause

