@echo off
title=Portfolio CLI
::setup
set origin="%CD%"

::pathwork
set t=%origin%\..
cd %t%

::logic
echo Restarting console..
echo.
cmd \k