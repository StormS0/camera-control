@echo off

echo Starting web server

cd nginx
mkdir temp
mkdir logs

start nginx.exe

echo ... Ok

cd ../fping

echo Starting ping service

:loop
  date /T > status.log
  time /T >> status.log
  fping -T -n1 -i -p -H hosts.txt >> status.log
  type status.log > status.txt
  sleep 5 > nul
goto loop
