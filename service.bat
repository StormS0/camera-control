@echo off

echo Stopping web server ...
c:\windows\system32\taskkill /im nginx.exe /f
c:\windows\system32\taskkill /im CanonProxy.exe /f
echo Starting web server ...
mkdir temp > nul 2> nul
mkdir logs > nul 2> nul
cd bin
start nginx.exe -p ..
start CanonProxy/CanonProxy.exe
echo Starting ping service loop ...
set STATUS=../logs/status.log
:loop
  date /t > %STATUS%
  time /t >> %STATUS%
  rem       count ICMP pool timeout file_with_hosts
  fping.exe -n1   -i   -p   -w4000  -H "../conf/hosts.list">> %STATUS%
  cd ../logs && type status.log > ../temp/status.txt
  timeout 5 > nul
  cd ../bin
goto loop
