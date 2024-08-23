#!/bin/bash

# cd ._2/FRTs/AICodeR

#           aVer="v1.07 7/29/24"
#           aVer="v1.09 8/01/24"
#           aVer="v1.10 8/04/24"
#           aVer="v1.11 8/14/24"
            aVer="v1.12 8/20/24"

#           aExtVer="u02.5.40805.1700"                                                  # .(40806.03.1 RAM Default .vsix version)
#           aExtVer="u02.5"                                                             # .(40806.03.1 RAM Workie)
#           aExtVer="u02.5"                                                             # .(40806.03.1 RAM Workie)
#           aExtVer="u02.6"                                                             # .(40805.01.1 RAM Not implemented)
#           aExtVer="u02.7"                                                             # .(40814.03.1 RAM Workie ??)
#           aExtVer="v02.6`40815.1942"                                                  # .(40815.01.1 RAM Workie)
#           aExtVer="u02.8`40819.1530"                                                  # .(40819.01.1 RAM Workie)
            aExtVer="u02.8"                                                             # .(40820.03.1 RAM Workie)
#           "E:\Repos\Robin\AIObjs_\test1-robin\._2\FRTs\AICodeR\extensions\e05-open-files-ext_u02.7.vsix"

#           aExtId="e05-open-files-ext_u01.3.vsix"                                      ##.(40804.02.1)
#           aExtId="e05-open-files-ext_u02.2.vsix"                                      ##.(40804.02.1)
#           aExtId="e05-open-files-ext_u02.3.vsix"                                      ##.(40804.02.1)
#           aExtId="e05-open-files-ext_u02.4.vsix"                                      ##.(40804.02.1)
#           aExtId="e05-open-files-ext_u02.5.vsix"                                      ##.(40804.02.1)
#           aExtId="e05-open-files-ext_u02.5.40805.1700.vsix"                           ##.(40804.02.1)
#           aExtId="e05-open-files-ext_u02.5.40805.1900.vsix"                           ##.(40804.02.1)
#           aExtId="e05-open-files-ext_u02.6.vsix"                                      # .(40804.02.1 RAM Add install extension)
            aExtId="e05-open-files-ext_#Ver#.vsix"                                      # .(40806.03.2 RAM Use setup $2 arg)

            AIC98_Tables="AIC98_Apps-n-Models_u02.mjs"
            AIC05_Schema="AIC05_Schema-IO_u09.mjs"
            AIC91_Folders="AIC91_AppFolders_u03.mjs"
            AIC97_Ports="AIC87_Ports.sh"                                                # .(40724.01.1 RAM Move script to AICodeR)

            aPath=$(readlink -f "$0")
            __filename="${aPath##*/}"
            __dirname="${aPath%/*}";

            bDebug=0; if [ "$1" == "debug" ]; then bDebug=1; shift; fi;            		# .(40727.01.1 RAM Add bDebug switch)
            bNoisy=0; if [ "$1" == "noisy" ]; then bNoisy=1; shift; fi;            		# .(40724.01.1 RAM Add bNoisy switch)
            bDoit=1

#           echo "__dirname: ${__dirname}"; exit
#           ThePath='E:/Repos/Robin/AIObjs_/dev03-robin/docs/c35_calendar1-app/GPT-4o_OpenAI-curl'
#           ThePath="${__dirname}/docs/c35_calendar1-app/GPT-4o_OpenAI-curl"
#           aDir="E:/Repos/Robin/AIObjs_/dev03-robin/._2/FRTs/AICodeR/"
            aAICodeR_Dir="${__dirname}/._2/FRTs/AICodeR/"    # with trailing slash      # ./(40804.01 RAM Was aDir)

#           Node ._2/FRTs/AICodeR/AIC98_Apps-n-Models_u02.mjs set app c35
#           node        "${aAICodeR_Dir}/AIC98_Apps-n-Models_u02.mjs" set app c35
#           exit
#   -------------------------------------------------------------------------------

  function  set_coder() {                                                               # .(40722.01.2 Beg)
            echo -e "\n  Copying command, aicoder, to /usr/bin/aicoder"
            echo      "----------------------------------------------------------------"
            aAll="\\\"\$@\\\""
#           aAWKpgm="/{AICodeR}/ { print \"${__dirname}/run-aicoder.sh \\"\$@\\""; next }; { print }"
            aAWKpgm="/{AICodeR}/ { print \"${__dirname}/run-aicoder.sh ${aAll}\"; next }; { print }"
#           echo "  aAWKpgm: '${aAWKpgm}'"; exut
            cat "${aAICodeR_Dir}/AIC88_Run-CodeR.sh" | awk "${aAWKpgm}" >aicoder
#           cat set-aicoder.sh; exit
            aBasedir="${__dirname:1:1}:/${__dirname:3}"; aBasedir="${aBasedir//\//\\\\}";

#           cp   set-aicoder.sh  /usr/bin/coder
#           cp   set-aicoder.sh  "C:/Program Files/Git/usr/bin/coder"
#           runas /user:Administrator "cmd /c copy  aicoder  \"C:\\Program Files\\Git\\usr\\bin\\aicoder\""
#           runas /user:${USERNAME}   "cmd /c copy  aicoder  \"C:\\Program Files\\Git\\usr\\bin\\aicoder\""
#     echo "runas /user:${USERNAME}  \"cmd /c copy  \"\"${aBasedir}\\\\aicoder\"\"  \"\"C:\\\\Program Files\\\\Git\\\\usr\\\\bin\\\\aicoder\"\""
            runas /user:${USERNAME}   "cmd /c copy   \"${aBasedir}\\\\aicoder\"       \"C:\\Program Files\\Git\\usr\\bin\\aicoder\""
       if [ ! -f "C:/Program Files/Git/usr/bin/aicoder" ]; then
            echo -e "\n* The command, aicoder, didn't get copied to the Git/usr/bin directory.  Please copy it using Windows Explorer."
            fi

            echo -e "\n\n  Running, npm install, in server folder"
            echo      "----------------------------------------------------------------"
            cd ${aAICodeR_Dir}
            npm install
            cd "${__dirname}"
#           pwd

            echo -e "\n\n  Installing AICodeR extension"                                # .(40804.02.2 RAM Beg)
            echo      "----------------------------------------------------------------"
            aVSixVer="$1"; if [ "$1" == "" ]; then aVSixVer="${aExtVer}"; fi            # .(40807.07.1 RAM Use aArg1, e.g. u02.7)
#           aExtId="'${aExtId/{Ver}/${aVSixVer}}'"
#           echo "  aExtId: '${aExtId//#Ver#/}'  '${aExtId%%#Ver#*}'"
    if [ "${aExtId//#Ver#/}" != "${aExtId}" ]; then aExtId="${aExtId%%#Ver#*}${aVSixVer}.vsix"; fi
            aVSixFile="${aAICodeR_Dir}Extensions/${aExtId}"
#           echo "  aVSixFile:  '${aVSixFile}'"; exit
#           echo "  aExtId:0:18:'aicoder.${aExtId:0:18} will be uninstalled"            # .(40806.02.x RAM Uninstall)
#           echo "  aVSixVer:   '${aVSixVer}'"
            code --uninstall-extension "aicoder.${aExtId:0:18}" 2>/dev/null
            code --install-extension "${aVSixFile}" --force                             # .(40804.02.2 End)

            echo -e "\n\n  Opening VSCode, AICodeR.code-workspace"
            echo      "----------------------------------------------------------------"
    if [ -f AICodeR_*.code-workspace ]; then
#           echo "  Creating AICodeR.code-workspace"
    if [ -f AICodeR.code-workspace   ]; then rm AICodeR.code-workspace; fi
            mv AICodeR_*.code-workspace AICodeR.code-workspace
            fi
            read -n1 -p "  Press any key to continue..."
#           code *code*
            code AICodeR.code-workspace
            }                                                                           # .(40722.01.2 End)
#   -------------------------------------------------------------------------------

  function  run_node() {
            aStep=$2
            aDebug=""; if [ "${bDebug}" == "1" ]; then aDebug=" --inspect-brk"; fi      # .(40727.01.2)

#           aSteps=",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,"

#           aSteps3=",1,2,3,4,5,6,7,8,10,13,14,15,16,"    # Display AIC05_Schema command  ##.(40802.02.15 RAM 15 S.B. here).(40823.01.1)
            aSteps3=",1,2,3,4,5,6,7,8,10,13,14,15,16,25," # Display AIC05_Schema command  # .(40823.01.1  RAM Add 25).(40802.02.15 RAM 15 S.B. here)
            aSteps3_="$( echo "${aSteps3}" | awk '{ sub( /,'${aStep},'/, "" ); print }' )"

#           aSteps1=",5,6,13,14,18,"                      # Run AIC05_Schema command      ##.(40802.02.16)
            aSteps1=",5,6,13,14,15,16,"                   # Run AIC05_Schema command      ##.(40802.02.16 RAM 15 S.B. here).(40823.01.2)
            aSteps1=",5,6,13,14,15,16,25,"                # Run AIC05_Schema command      # .(40823.01.2).(40802.02.16 RAM 15 S.B. here)
#           aSteps_="$( echo "${aSteps}" | sed "s/${aStep}//g" )"
            aSteps1_="$( echo "${aSteps1}" | awk '{ sub( /',${aStep},'/, "" ); print }' )"

#           aSteps2=",0,9,11,12,19,"            # Run and Display AIC98_Tables  command ##.(40728.02.4).(40724.01.9 RAM Add 19)
#           aSteps2=",0,9,11,12,16,19,20,21"    # Run and Display AIC91_Folders command ##.(40802.02.17).(40728.02.4 RAM Add 16, 20 and 21)
            aSteps2=",0,9,11,12,19,20,21"       # Run and Display AIC91_Folders command # .(40802.02.17 RAM Not here).(40728.02.4 RAM Add 16, 20 and 21)

            aSteps2_="$( echo "${aSteps2}" | awk '{ sub( /,'${aStep},'/, "" ); print }' )"

      if [ "${bNoisy}" == "1" ]; then
            echo -e "aSteps1 '${aSteps1_}' in aStep: ${aStep} (Run  AIC05_Schema)\n     != '${aSteps1}'";   # exit
            echo -e "aSteps2 '${aSteps2_}' in aStep: ${aStep} (Run  AIC**_Other) \n     != '${aSteps2}'";   # exit
            echo -e "aSteps3 '${aSteps3_}' in aStep: ${aStep} (Show AIC05_Schema)\n     != '${aSteps3}'";   # exit
            fi

      if [ "${bNoisy}" == "1" ]; then echo ""; fi

      if [ "${aSteps3_}" != "${aSteps3}" ]; then  #

            echo -e    "  Running Node $1 $2 $3 $4 $5 $6 $7 $8 $9"
      if [ "${aSteps1_}" != "${aSteps1}" ]; then
      if [ "${bNoisy}" == "1" ]; then
       echo "  node" ${aDebug} "${aAICodeR_Dir}$1" $2 $3 $4 $5 $6 $7 $8 $9                          # .(40727.01.3)
            fi
      if [ "${bDoit}" == "1" ]; then
            node     ${aDebug} "${aAICodeR_Dir}$1" $2 $3 $4 $5 $6 $7 $8 $9                          # .(40727.01.4)
            fi

            exit; fi
            exit; fi

      if [ "${aSteps2_}" != "${aSteps2}" ]; then
      if [ "${aStep}" == "9" ]; then
            echo -e     "  Running Node $1 $3 $4 $5 $6 $7 $8 $9"
      if [ "${bNoisy}" == "1" ]; then
#      echo "  node" ${aDebug} "${aAICodeR_Dir}$1" $4 $5 $6 $7 $8 $9                          		# .(40727.01.5)
       echo "  node" ${aDebug} "${aAICodeR_Dir}$1" $3 $4 $5 $6 $7 $8 $9                       		# .(40728.02.x).(40727.01.5)
            fi
      if [ "${bDoit}" == "1" ]; then
            node     ${aDebug} "${aAICodeR_Dir}$1" $3 $4 $5 $6 $7 $8 $9                          	# .(40727.01.6)
            fi
            exit; fi

            echo -e     "  Running Node $1 $3 $4 $5 $6 $7 $8 $9"
      if [ "${bNoisy}" == "1" ]; then
       echo "  node" ${aDebug} "${aAICodeR_Dir}$1" $3 $4 $5 $6 $7 $8 $9                          	# .(40727.01.7)
            fi
      if [ "${bDoit}" == "1" ]; then
            node     ${aDebug} "${aAICodeR_Dir}$1" $3 $4 $5 $6 $7 $8 $9                          	# .(40727.01.8)
            fi
            exit; fi
            }
# ------------------------------------------------------------------------------------

            aArg1=$1;       aCmd="";       aArg2=$2

    if [ "${aArg1}"   == "setup" ] && [ "${aArg2}" == ""        ]; then aCmd="set  coder";    aArg1=""; shift; shift; fi   #  0   # .(40729.01.1 RAM Add Setup)
    if [ "${aArg1}"   == "setup" ] && [ "${aArg2}" != ""        ]; then aCmd="set  coder";    aArg1=""; shift; shift; fi   #  0   # .(40806.02.3)
#   if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" != "app" ] && [ "{aArg2:0:3}" != "mod" ]; then aCmd="set  app"; shift; f
    if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="set  app";      aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "mod" ]; then aCmd="set  model";    aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "cod" ]; then aCmd="set  coder";    aArg1=""; shift; shift; fi   #  0   # .(40722.01.1 RAM Add Setup Coder)
    if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "aic" ]; then aCmd="set  coder";    aArg1=""; shift; shift; fi   #  0   # .(40722.01.x)
    if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "sho" ]; then aCmd="set  show";     aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "set" ]; then aCmd="set  show";     aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "var" ]; then aCmd="set  show";     aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "con" ]; then aCmd="save continue"; aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "frt" ]; then aCmd="save frtable";  aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="show sessions"; aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "get" ] && [ "${aArg2:0:3}" == "mar" ]; then aCmd="get  markdown"; aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "add" ] && [ "${aArg2:0:3}" == "scr" ]; then aCmd="add  script";   aArg1=""; shift; shift; fi   # 22   # .(40802.02.1)
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "scr" ]; then aCmd="list scripts";  aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "scr" ]; then aCmd="save scripts";  aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "con" ]; then aCmd="list continue"; aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "frt" ]; then aCmd="list frtables"; aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "new" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="make app";      aArg1=""; shift; shift; fi   #  9   # .(40728.02.5)
    if [ "${aArg1:0:3}" == "mak" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="make app";      aArg1=""; shift; shift; fi   #
    if [ "${aArg1:0:3}" == "mak" ] && [ "${aArg2:0:3}" != "app" ]; then aCmd="make app";      aArg1=""; shift;        fi   #
    if [ "${aArg1:0:3}" == "new" ] && [ "${aArg2:0:3}" == "res" ]; then aCmd="new  markdown"; aArg1=""; shift; shift; fi   #  9   # .(40728.02.5)
    if [ "${aArg1:0:3}" == "new" ] && [ "${aArg2:0:3}" == "mar" ]; then aCmd="new  markdown"; aArg1=""; shift; shift; fi   #  9   # .(40728.02.5)
    if [ "${aArg1:0:3}" == "ope" ] && [ "${aArg2:0:3}" == "res" ]; then aCmd="open markdown"; aArg1=""; shift; shift; fi   #  9   # .(40731.02.1)
    if [ "${aArg1:0:3}" == "ope" ] && [ "${aArg2:0:3}" == "mar" ]; then aCmd="open markdown"; aArg1=""; shift; shift; fi   #  9   # .(40731.02.2)
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "mar" ]; then aCmd="save markdown"; aArg1=""; shift; shift; fi   # 1
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="list apps";     aArg1=""; shift; shift; fi   # 1
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "mod" ]; then aCmd="list models";   aArg1=""; shift; shift; fi   # 1
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="show apps";     aArg1=""; shift; shift; fi   # 13   # .(40711.03.x)
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="list sessions"; aArg1=""; shift; shift; fi   # 14   # .(40711.04.x)
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "fil" ]; then aCmd="list files";    aArg1=""; shift; shift; fi   # 14   # .(40823.01.3)
    if [ "${aArg1:0:3}" == "edi" ] && [ "${aArg2:0:3}" == "sys" ]; then aCmd="edit sys msg";  aArg1=""; shift; shift; fi   #  9   # .(40820.04.1)
    if [ "${aArg1:0:3}" == "new" ] && [ "${aArg2:0:3}" == "pro" ]; then aCmd="new  prompt";   aArg1=""; shift; shift; fi   #  9   # .(40728.02.6)
    if [ "${aArg1:0:3}" == "ope" ] && [ "${aArg2:0:3}" == "pro" ]; then aCmd="open prompt";   aArg1=""; shift; shift; fi   #  9   # .(40731.02.3)
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "pro" ]; then aCmd="save prompt";   aArg1=""; shift; shift; fi   # 15   # .(40711.04.x)
    if [ "${aArg1:0:3}" == "add" ] && [ "${aArg2:0:3}" == "scr" ]; then aCmd="save prompt";   aArg1=""; shift; shift; fi   # 15   # .(40802.02.2)
    if [ "${aArg1:0:3}" == "run" ] && [ "${aArg2:0:3}" == "pro" ]; then aCmd="run  prompt";   aArg1=""; shift; shift; fi   # 16   # .(40711.04.x)
    if [ "${aArg1:0:3}" == "run" ] && [ "${aArg2:0:3}" != "pro" ]; then aCmd="run  prompt";   aArg1=""; shift; fi          # 1
    if [ "${aArg1:0:3}" == "kil" ] && [ "${aArg2:0:3}" == "por" ]; then aCmd="kill port";     aArg1=""; shift; shift; fi   # 19   # .(40724.01.2)
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "por" ]; then aCmd="show port";     aArg1=""; shift; shift; fi   # 19   # .(40724.01.5)
#   if [ "${aArg1:0:3}" == "run" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="run  session";  aArg1=""; shift; shift; fi   # 15   # .(40711.04.x)
#   if [ "${aArg1:0:3}" == "run" ] && [ "${aArg2:0:3}" != "ses" ]; then aCmd="run  session";  aArg1=""; shift; fi          # 1
    if [ "${aArg1:0:3}" == "new" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="new  session";  aArg1=""; shift; shift; fi   #  9   # .(40728.02.7)
#   if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="save session";  aArg1=""; shift; shift; fi   # 16   # .(40711.04.x)
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" != "ses" ]; then aCmd="save session";  aArg1=""; shift; fi          # 1
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" != "mar" ]; then aCmd="show markdown"; aArg1=""; shift; fi          # 18   # .(40717.02.1)
    if [ "${aArg1:0:3}" == "dro" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="drop session";  aArg1=""; shift; shift; fi   #  9   # .(40801.07.1)
    if [ "${aArg1:0:3}" == "del" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="drop session";  aArg1=""; shift; shift; fi   #  9   # .(40801.07.2)

if [ "${bNoisy}" == "1" ]; then
    echo -e "\n[1]  \$1: '$1', \$2: '$2', aArg1: '${aArg1}', aCmd: '${aCmd}'"; # exit
    fi
if [ "${aCmd}" == '' ]; then                                                                        # .(40822.01.1 RAM Set number commands if aCmd not set yet)
    if [ "$1" ==  "0" ]; then aCmd="set  $2"; shift; shift; fi
#   if [ "${aCmd}" == "set  model"    ]; then run_node "${AIC98_Tables}"   "0" "set model" $@; exit; fi  #  0           # .(40716.01.1)
    if [ "$1" ==  "1" ]; then aCmd="save continue"; shift; fi
    if [ "$1" ==  "2" ]; then aCmd="save frtable";  shift; fi
    if [ "$1" ==  "3" ]; then aCmd="show sessions"; shift; fi
    if [ "$1" ==  "4" ]; then aCmd="get  markdown"; shift; fi
    if [ "$1" ==  "5" ]; then aCmd="list scripts";  shift; fi
    if [ "$1" ==  "6" ]; then aCmd="save scripts";  shift; fi
    if [ "$1" ==  "7" ]; then aCmd="list continue"; shift; fi
    if [ "$1" ==  "8" ]; then aCmd="list frtables"; shift; fi
    if [ "$1" ==  "9" ]; then aCmd="make app";      shift; fi
    if [ "$1" == "10" ]; then aCmd="save markdown"; shift; fi
    if [ "$1" == "11" ]; then aCmd="list apps";     shift; fi
    if [ "$1" == "12" ]; then aCmd="list models";   shift; fi
    if [ "$1" == "13" ]; then aCmd="show apps";     shift; fi                                       # .(40711.03.x)
    if [ "$1" == "14" ]; then aCmd="list sessions"; shift; fi                                       # .(40711.04.x)

    if [ "$1" == "15" ]; then aCmd="add  script";   shift; fi                                       # .(40802.02.3 RAM Added).(40711.04.x)
    if [ "$1" == "15" ]; then aCmd="save prompt";   shift; fi                                       # .(40802.02.4 RAM Was 15).(40711.04.x)
#   if [ "$1" == "16" ]; then aCmd="run  session";  shift; fi                                       # .(40802.02.5 RAM Was 15).(40711.04.x)
    if [ "$1" == "16" ]; then aCmd="run  prompt";   shift; fi                                       # .(40802.02.6 RAM Was 15).(40711.04.x).(40802.02.x)

    if [ "$1" == "17" ]; then aCmd="save session";  shift; fi                                       # .(40711.04.x)
    if [ "$1" == "18" ]; then aCmd="show markdown"; shift; fi                                       # .(40717.02.2)
    if [ "$1" == "19" ]; then aCmd="kill port";     shift; fi                                       # .(40724.02.2)

#   if [ "$1" ==  "9" ]; then aCmd="drop session";  shift; fi                                       ##.(40801.07.3)
    if [ "$1" == "25" ]; then aCmd="list files";    shift; fi                                       # .(40823.01.4)
#   if [ "$1" ==  "9" ]; then aCmd="new  session";  shift; fi                                       ##.(40728.02.8)
#   if [ "$1" ==  "9" ]; then aCmd="new  prompt";   shift; fi                                       ##.(40728.02.9)
#   if [ "$1" ==  "9" ]; then aCmd="new  markdown"; shift; fi                                       ##.(40728.02.10)
#   if [ "$1" ==  "9" ]; then aCmd="erase session"; shift; fi                                       ##.(40801.07.4)

#   if [ "$1" == "16" ]; then aCmd="new  session";  shift; fi                                       ##.(40728.02.8)
#   if [ "$1" == "19" ]; then aCmd="new  prompt";   shift; fi                                       ##.(40728.02.9)
#   if [ "$1" == "20" ]; then aCmd="new  markdown"; shift; fi                                       ##.(40728.02.10)
#   if [ "$1" == "23" ]; then aCmd="open prompt";   shift; fi                                       # .(40731.02.x)
#   if [ "$1" == "20" ]; then aCmd="open markdown"; shift; fi                                       # .(40731.02.x)
#   if [ "$1" == " 9" ]; then aCmd="drop session"; shift; fi                                        ##.(40801.07.5)
    fi                                                                                              # .(40822.01.2)

if [ "${bNoisy}" == "1" ]; then
    echo  "[2]  \$1: '$1', \$2: '$2', aArg1: '${aArg1}', aCmd: '${aCmd}'"; # exit
    fi
    export CALL_IT=1;
#   if [ "${aCmd}" == "set  app"      ]; then run_node "${AIC05_Schema}"  "0" "$@"; exit; fi
    if [ "${aCmd}" == "save continue" ]; then run_node "${AIC05_Schema}"  "1" "$@"; exit; fi
    if [ "${aCmd}" == "save frtable"  ]; then run_node "${AIC05_Schema}"  "2" "$@"; exit; fi
    if [ "${aCmd}" == "show sessions" ]; then run_node "${AIC05_Schema}"  "3" "$@"; exit; fi
    if [ "${aCmd}" == "get  frtable"  ]; then run_node "${AIC05_Schema}"  "4" "$@"; exit; fi
    if [ "${aCmd}" == "list scripts"  ]; then run_node "${AIC05_Schema}"  "5" "$@"; exit; fi
    if [ "${aCmd}" == "save scripts"  ]; then run_node "${AIC05_Schema}"  "6" "$@"; exit; fi
    if [ "${aCmd}" == "list continue" ]; then run_node "${AIC05_Schema}"  "7" "$@"; exit; fi
    if [ "${aCmd}" == "list frtables" ]; then run_node "${AIC05_Schema}"  "8" "$@"; exit; fi
#   if [ "${aCmd}" == "make app"      ]; then run_node "${AIC05_Schema}"  "9" "$@"; exit; fi
    if [ "${aCmd}" == "save markdown" ]; then run_node "${AIC05_Schema}" "10" "$@"; exit; fi
    if [ "${aCmd}" == "show apps"     ]; then run_node "${AIC05_Schema}" "13" "$@"; exit; fi
    if [ "${aCmd}" == "list sessions" ]; then run_node "${AIC05_Schema}" "14" "$@"; exit; fi
#   if [ "${aCmd}" == "drop session"  ]; then run_node "${AIC05_Schema}"  "9" "$@"; exit; fi        ##.(40801.07.6)
    if [ "${aCmd}" == "list files"    ]; then run_node "${AIC05_Schema}" "25" "$@"; exit; fi        # .(40823.01.5)

    if [ "${aCmd}" == "save prompt"   ]; then run_node "${AIC05_Schema}" "15" "$@"; exit; fi        # .(40802.02.7 RAM Was 16)
    if [ "${aCmd}" == "add  script"   ]; then run_node "${AIC05_Schema}" "15" "$@"; exit; fi        # .(40802.02.8 RAM Added)

#   if [ "${aCmd}" == "run  session"  ]; then run_node "${AIC05_Schema}" "16" "$@"; exit; fi
    if [ "${aCmd}" == "run  prompt"   ]; then run_node "${AIC05_Schema}" "16" "$@"; exit; fi        # .(40802.02.9 RAM Was 15)

    if [ "${aCmd}" == "save session"  ]; then run_node "${AIC05_Schema}" "17" "$@"; exit; fi
    if [ "${aCmd}" == "show markdown" ]; then run_node "${AIC05_Schema}" "18" "$@"; exit; fi        # .(40717.01.2)
#   if [ "${aCmd}" == "kill port"     ]; then run_node "${AIC97_Ports}"  "19" "$@"; exit; fi        # .(40724.01.3)

    if [ "${aCmd}" == "set  vars"     ]; then aCmd="set  show"; fi

    export CALL_IT=0;
#   if [ "${aCmd}" == "make app"      ]; then echo node "../../../.vscode/task-createAppFolders_u02.mjs" $@; exit; fi
    if [ "${aCmd}" == "list apps"     ]; then run_node "${AIC98_Tables}"  "11" "apps"        $@; exit; fi  # 11         # .(40711.01.4)
    if [ "${aCmd}" == "list models"   ]; then run_node "${AIC98_Tables}"  "12" "models"      $@; exit; fi  # 12         # .(40711.01.5)
    if [ "${aCmd}" == "set  app"      ]; then run_node "${AIC98_Tables}"   "0" "set app"     $@; exit; fi  #  0         # .(40716.01.2)
    if [ "${aCmd}" == "set  model"    ]; then run_node "${AIC98_Tables}"   "0" "set model"   $@; exit; fi  #  0         # .(40716.01.3)
    if [ "${aCmd}" == "set  show"     ]; then run_node "${AIC98_Tables}"   "0" "set show"    $@; exit; fi  #  0         # .(40717.02.2)
    if [ "${aCmd}" == "kill port"     ]; then  "${aAICodeR_Dir}/${AIC97_Ports}"              $@; exit; fi  #  0         # .(40724.01.7)
    if [ "${aCmd}" == "show port"     ]; then  "${aAICodeR_Dir}/${AIC97_Ports}" "show"       $@; exit; fi  #  0         # .(40724.01.8)
    if [ "${aCmd}" == "set  coder"    ]; then set_coder  ${aArg2}                              ; exit; fi  #  0         # .(40806.02.4 RAM Added ${aArg2}).(40722.01.3)

#   if [ "${aCmd}" == "run  prompt"   ]; then echo "${ThePath}/c35_t021.00.0.40710.1754_request_curl.sh" $@; exit; fi   # .(40711.04.x)
#   if [ "${aCmd}" == "run  prompt"   ]; then echo "${ThePath}/c35_t021.00.0.40710.1754_request_curl.sh" $@; exit; fi   # .(40711.04.x)

    if [ "${aCmd}" == "new  session"  ]; then run_node "${AIC91_Folders}"  "9" "newSession"  $@; exit; fi               # .(40728.02.11)
    if [ "${aCmd}" == "edit sys msg"  ]; then run_node "${AIC91_Folders}"  "9" "edtSysMsg"   $@; exit; fi               # .(40820.04.2)
    if [ "${aCmd}" == "new  prompt"   ]; then run_node "${AIC91_Folders}"  "9" "newPrompt"   $@; exit; fi               # .(40728.02.12)
    if [ "${aCmd}" == "open prompt"   ]; then run_node "${AIC91_Folders}"  "9" "opnPrompt"   $@; exit; fi               # .(40731.02.4)
    if [ "${aCmd}" == "new  markdown" ]; then run_node "${AIC91_Folders}"  "9" "newMarkdown" $@; exit; fi               # .(40728.02.13)
    if [ "${aCmd}" == "open markdown" ]; then run_node "${AIC91_Folders}"  "9" "opnMarkdown" $@; exit; fi               # .(40731.02.5)
    if [ "${aCmd}" == "make app"      ]; then run_node "${AIC91_Folders}"  "9" "newApp"      $@; exit; fi  #  9         # .(40728.02.14 RAM Was app).(40714.01.x)
    if [ "${aCmd}" == "drop session"  ]; then run_node "${AIC91_Folders}"  "9" "delSession"  $@; exit; fi  #  9         # .(40801.07.7)

    echo ""
    echo "  AICoder Commands (${aVer} ${aAICodeR_Dir}):"
    echo ""
    echo "       [TS]            =>                  Optional Day and Optional Time (YMMDD[.HH[MM]])"
    echo "       [App] [Model]   =>                  Optional AppName ([cs]##) and Model (Alias for Model-Owner-interface)"
    echo "       {App} {Model}   =>                  Required AppName ([cs]##) and Model (Alias for Model_Owner-interface)"
    echo "       {Date}          => YMMDD.HHMM       Required Year Month Day and Time that file is saved"
    echo "       [Date.Time]     => YMMDD[.HH[MM]]   Optional Day and Optional Time that file(s) were saved"
    echo "       [S[.M[.TS]]]    =>                  Optional Session, Message Number and Optional Date and Time"
    echo "       {S.M.[.TS]}     =>                  Required Session, Message Number and Optional Date and Time"
    echo ""
#   echo "    6. list continue   [App] [Model] [Date.Time]    List Continue Sessions in a Continue JSON File for [App] [Model]"
    echo "    7. list continue                                List Continue Sessions JSON Files"
    echo "    1. save continue   {S.M[.TS]} [App] [Model]     save frtable Sessions JSON Fles into a Continue JSON File "
    echo "    3. show sessions   [Date.Time]                  Format Sessions from FRTables JSON .db File"
    echo "    8. list frtables                                List Continue Sessions in a FRTables JSON .db File"
#   echo "    5. save frtable    [App] [Model] [Date.Time]    Save a Session into a Continue JSON File for [App] [Model]"
    echo "    2. save frtable    {Date}                       Save a FRTables JSON .db File from a Continue JSON File for [Date]"
    echo "    4. get  markdown   {S.M} [TS] [App] [Model]     Get a Message Markdown file from FRTables JSON File for [App] [Model]"
    echo ""
    echo "    0. set app         {App}                        Set App for AICodeR Commands in .env"
    echo "    0. set model       {Model}                      Set Model for AICodeR commands in .env"
    echo "    0. show vars                                    Show FRT Environment Variables"                                     # .(40717.01.1)
    echo "    0. setup coder                                  Initialize AICodeR Environment"                                     # .(40722.01.1 RAM Create)
    echo "   19. show ports                                   Show all running ports"                                             # .(40724.01.6)
    echo "   19. show port       {port}                       Show if port is running"                                            # .(40724.01.7)
    echo "   19. kill port       {port}                       Stop port process"                                                  # .(40724.01.2)
    echo ""
    echo "   11. list apps       [App]                        List App for [App] or all Apps if 'all' or 'mt' in DB"              # .(40711.01.5)
    echo "   12. list models     [Model]                      List Model for [Model] or all Models if 'all' or 'mt' in DB"        # .(40711.01.6)

    echo "   16. new  session    [S] [App] [Model]            Create a new Session for [App] [Model] in docs folder"              # .(40728.02.15)
    echo "   17. save session    [S] [App] [Model]            Save all Messages for Sessios into Single Markdown File "
    echo "   14. list sessions   [App] [Model]                List Session markdown files for [App] in docs folder"               # .(40711.01.6)
#   echo "   15. run  [session]  [App} [Model]                Run an AI Session for [last] UsrMessage file"
    echo "   24. drop session    [S[.M]] [App] [Model]        Delete Sessions files for [App] [Model] in docs folder"             # .(40801.07.8)
    echo "   25. list files      [S[.M]] [App] [Model]        List Sessions files for [App] [Model] in docs folder"               # .(40822.01.x)

    echo "   21. new  markdown   [S[.M]] [App] [Model]        Create a new Session Response File for [App] [Model]"               # .(40728.02.16)
    echo "   22. open markdown   [S[.M]] [App] [Model]        Open a Session Response File for [App] [Model]"                     # .(40731.02.6)
    echo "   10. save markdown   [S[.M]] [App] [Model]        Save a last Message Markdown File for [App] [Model]"
    echo "   18. show markdown   [S[.M]] [App] [Model]        Open Markdown file in browser for Session / Message "               # .(40717.02.1)
    echo ""
    echo "    9. make [app]      {App} {Model}                Create a Folder for [App] (c##_name-of-app or s##_name-of-api)"
#   echo "   13. show apps                                    List Apps that have an AI Session in docs folder"                   # .(40711.01.6)
    echo "   26. edit sys msg    [S] [App] [Model]            Edit system prompt for Session"                                     # .(40820.04.3)

#   echo "   16. save prompt     [S[.M[.TS]]] [App] [Model]   Save a Prompt for [next] UsrMessage file for [App] [Model]"
    echo "   20. new  prompt     [S[.M]] [App] [Model]        Create a new Session Prompt File for [App] [Model]"                 # .(40728.02.17)
    echo "   23. open prompt     [S[.M]] [App] [Model]        Open a Session Prompt File for [App] [Model]"                       # .(40731.02.7)

    echo "   15. run  [model]    [App} [Model]                Run an AI Session Prompt for [last] UsrMessage file for [Model]"
#   echo "   15. run  [prompt]   [App} [Model]                Run an AI Session Prompt for [last] UsrMessage file"
    echo ""
    echo "    5. list scripts    [S[.M[.TS]]] [App] [Model]   Show App scripts for [last] Message Markdown File for [App] [Model]"
    echo "    6. save scripts    [S[.M[.TS]]] [App] [Model]   Save App scripts for [last] Message Markdown File for [App] [Model]"
#   echo ""
