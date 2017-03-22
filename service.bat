@echo off

echo Stopping web server ...
taskkill /im %nginx.exe /f

echo Starting web server ...
cd nginx
mkdir temp > nul 2> nul
mkdir logs > nul 2> nul
start nginx.exe

echo Starting ping service loop ...
cd ../fping
:loop
  date /t > status.log
  time /t >> status.log
  rem       count ICMP pool timeout file_with_hosts
  fping.exe -n1   -i   -p   -w4000  -H hosts.txt >> status.log
  type status.log > status.txt
  sleep 5 > nul
goto loop
