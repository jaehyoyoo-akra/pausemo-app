@echo off
chcp 65001 >nul
cls

echo 🔍 시스템에서 Java JDK 경로 찾는 중...
echo.

REM Eclipse Adoptium JDK 경로들 확인
echo 📁 Eclipse Adoptium JDK 경로 확인:
for /d %%i in ("C:\Program Files\Eclipse Adoptium\*") do (
    if exist "%%i\bin\java.exe" (
        echo ✅ 발견: %%i
        "%%i\bin\java.exe" -version 2>&1 | findstr "version"
        echo.
    )
)

REM 다른 일반적인 JDK 경로들 확인
echo 📁 기타 JDK 경로 확인:
for /d %%i in ("C:\Program Files\Java\*") do (
    if exist "%%i\bin\java.exe" (
        echo ✅ 발견: %%i
        "%%i\bin\java.exe" -version 2>&1 | findstr "version"
        echo.
    )
)

REM Android Studio JDK 경로 확인
echo 📁 Android Studio JDK 경로 확인:
if exist "C:\Program Files\Android\Android Studio\jbr\bin\java.exe" (
    echo ✅ 발견: C:\Program Files\Android\Android Studio\jbr
    "C:\Program Files\Android\Android Studio\jbr\bin\java.exe" -version 2>&1 | findstr "version"
    echo.
)

if exist "C:\Users\%USERNAME%\AppData\Local\Programs\Android Studio\jbr\bin\java.exe" (
    echo ✅ 발견: C:\Users\%USERNAME%\AppData\Local\Programs\Android Studio\jbr
    "C:\Users\%USERNAME%\AppData\Local\Programs\Android Studio\jbr\bin\java.exe" -version 2>&1 | findstr "version"
    echo.
)

REM JAVA_HOME 환경변수 확인
echo 📁 JAVA_HOME 환경변수:
if defined JAVA_HOME (
    echo %JAVA_HOME%
    if exist "%JAVA_HOME%\bin\java.exe" (
        echo ✅ 유효한 경로
        "%JAVA_HOME%\bin\java.exe" -version 2>&1 | findstr "version"
    ) else (
        echo ❌ 유효하지 않은 경로
    )
) else (
    echo ⚠️  설정되지 않음
)
echo.

echo 💡 위 결과를 보고 gradle.properties에 올바른 경로를 설정하세요.
echo.

pause

