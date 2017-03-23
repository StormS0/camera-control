@echo off
Y
cd bin

echo Stopping web server ...
taskkill /im nginx.exe /f

echo Starting web server ...

start nginx.exe -p ..

echo Starting ping service loop ...

:loop
  date /t > ../logs/status.log
  time /t >> ../logs/status.log
  rem       count ICMP pool timeout file_with_hosts
  fping.exe -n1   -i   -p   -w4000  -H "../conf/hosts.txt">> ../logs/status.log
  cd ../logs && type status.log > ../temp/status.txt
  sleep 5 > nul
  cd ../bin
goto loop
