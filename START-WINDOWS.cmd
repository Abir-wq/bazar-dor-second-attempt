@echo off
cd /d "%~dp0"
echo BazarDor - Windows setup and start
where node >nul 2>nul
if errorlevel 1 goto missingnode
call npm.cmd ci
if errorlevel 1 goto failed
call npm.cmd run setup
if errorlevel 1 goto failed
call npm.cmd run db:migrate
if errorlevel 1 goto failed
echo Open http://localhost:3000 after the server says Ready.
call npm.cmd run dev
exit /b
:missingnode
echo Install Node.js 24 LTS, then run this file again.
pause
exit /b 1
:failed
echo Setup stopped. Read the error above and START-HERE.md.
pause
exit /b 1
