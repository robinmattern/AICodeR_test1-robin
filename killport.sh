#!/bin/bash

   aShow=$2; if [ "${aShow}" == "show" ]; then aShow="show"; fi

   nPort=$1
#  nPort=50133

if [ "${nPort}" == "" ]; then
   echo -e "\n  * Please provide a port number."
   exit
   fi

if [ "${OSTYPE:0:6}" == "darwin" ]; then

   nPID=$( lsof -i tcp:${nPort} ); if [ "${aShow}" == "show" ]; then echo -e "\n    lsof -i tcp:${nPort}"; fi
   if [ "${nPID}" == "" ]; then echo -e "\n* Port ${nPort} is not running (nPID: '${nPID}')."; exit; fi

 else  # if git-bash or linux

   nWID=$( netstat -ano | awk '/TCP.+:'${nPort}'/ { print $5; exit }' ); if [ "${aShow}" == "show" ]; then echo ""
 echo "    netstat -ano | awk '/TCP.+:'${nPort}'/"; echo "    ps -W | awk '/ '${nWID}' /' ";
   fi

   if [ "${nWID}" == "" ]; then echo -e "\n  * Port ${nPort} is not running."; exit; fi
#  if [ "${nWID}" != "" ]; then echo -e "\n    Port ${nPort} is running as PID ${nWID}."; fi
   if [ "${nWID}" != "" ]; then echo -e "\n    Port ${nPort} is running as WID ${nWID}."; fi

   nPID=$( ps -W | awk '/ '${nWID}' / { print $1; exit }' )

   if [ "${nPID}" == "" ]; then echo -e "\n  * Port ${nPort} is not running.')"; exit; fi
#  if [ "${nPID}" != "" ]; then echo -e   "    Port ${nPort} is running as WID ${nPID}."; fi
   if [ "${nPID}" != "" ]; then echo -e   "    Port ${nPort} is running as PID ${nPID}."; fi
   fi

if [ "${aShow}" == "show" ]; then exit; fi

#  echo "\${OSTYPE:0:4}: ${OSTYPE:0:4}, \${OS:0:7}: '${OS:0:7}'"; exit

if [ "${OSTYPE:0:4}" == "msys" ] || [ "${OS:0:7}" == "Windows" ]; then

   aErr=$( cmd "/C taskkill /F /PID ${nWID}" 2>&1 ); if [ "${aErr:0:5}" == "ERROR" ]; then aErr=" failed! Try to end process manually in DOS. taskkill /F /PID ${nWID}";  else aErr="."; fi
#  aErr=$(        taskkill /F /PID ${nPID} 2>&1 ); if [ "${aErr:0:5}" == "ERROR" ]; then aErr=" failed! Try to end process manually. taskkill /F /PID ${nPID}";  else aErr="."; fi
  else
   aErr=$(     kill ${nPID} 2>&1 ); if [ "${aErr}" != ""          ]; then aErr=" failed! Try to end process manually. kill -s 9 ${nPID}"; else aErr="."; fi
   fi

   echo " ** Killing Port ${nPort}${aErr}"; # if [ "${aErr}" != "." ]; then read -p ""; exit; fi

#   `$ netstat -ano | awk '/TCP.+:50133/' `
#       TCP    0.0.0.0:50133          0.0.0.0:0              LISTENING       44916
#       TCP    [::]:50133             [::]:0                 LISTENING       44916
#
#   `$ ps -W | awk /110452/ `
#       110452       0       0      44916  ?              0 09:19:23 C:\Users\robin\AppData\Local\nvs\default\node.exe
#
#   `$ kill -s 9 44916`
#       bash: kill: (44916) - No such process
#
#   `$ kill -s 9 110452`
#       bash: kill: (110452) - No such process
#
#   `$ which kill`
#       /usr/bin/kill
#


#   ` > netstat -ano | awk '/TCP.+:50133/' `
#       TCP    0.0.0.0:50133          0.0.0.0:0              LISTENING       44916
#       TCP    [::]:50133             [::]:0                 LISTENING       44916
#
#   ` > ps -W | awk /110452/ `
#           110452       0       0      44916  ?              0 09:19:23 C:\Users\robin\AppData\Local\nvs\default\node.exe
#
#   ` > ps -W | awk /44916/ `
#           110452       0       0      44916  ?              0 09:19:23 C:\Users\robin\AppData\Local\nvs\default\node.exe
#
#   ` > kill -s 9 110452 `
#       kill: 110452: No such process
#
#   ` > kill -s 9 44916 `
#       kill: 44916: No such process
#
#   ` > where kill `
#       C:\Program Files\Git\usr\bin\kill.exe



