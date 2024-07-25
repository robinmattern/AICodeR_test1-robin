#!/bin/bash

# cd ._2/FRTs/AICodeR

            AIC98_Tables="AIC98_Apps-n-Models_u02.mjs"
            AIC05_Schema="AIC05_Schema-IO_u09.mjs"
            AIC91_Folders="AIC91_AppFolders_u03.mjs"
            AIC97_KillPort="AIC97_KillPort"                                                         # .(40724.01.1 RAM Move script to AICodeR)

            aPath=$(readlink -f "$0")
            __filename="${aPath##*/}"
            __dirname="${aPath%/*}";

#           echo "__dirname: ${__dirname}"; exit
#           ThePath='E:/Repos/Robin/AIObjs_/dev03-robin/docs/c35_calendar1-app/GPT-4o_OpenAI-curl'
#           ThePath="${__dirname}/docs/c35_calendar1-app/GPT-4o_OpenAI-curl"
#           aDir="E:/Repos/Robin/AIObjs_/dev03-robin/._2/FRTs/AICodeR/"
            aDir="${__dirname}/._2/FRTs/AICodeR/"    # with trailing slash

#           Node ._2/FRTs/AICodeR/AIC98_Apps-n-Models_u02.mjs set app c35
#           node        "${aDir}/AIC98_Apps-n-Models_u02.mjs" set app c35
#           exit
#   -------------------------------------------------------------------------------

  function  set_coder() {                                                                           # .(40722.01.2 Beg)
            echo -e "\n  Copying command, aicoder, to /usr/bin/aicoder"
            echo      "----------------------------------------------------------------"
            aAll="\\\"\$@\\\""
#           aAWKpgm="/{AICodeR}/ { print \"${__dirname}/run-aicoder.sh \\"\$@\\""; next }; { print }"
            aAWKpgm="/{AICodeR}/ { print \"${__dirname}/run-aicoder.sh ${aAll}\"; next }; { print }"
#           echo "  aAWKpgm: '${aAWKpgm}'"; exut 
            cat "${aDir}/AIC88_Run-CodeR.sh" | awk "${aAWKpgm}" >aicoder
#           cat set-aicoder.sh; exit

#           cp   set-aicoder.sh  /usr/bin/coder
#           cp   set-aicoder.sh  "C:/Program Files/Git/usr/bin/coder"
            runas /user:Administrator "cmd /c copy  aicoder  \"C:\\Program Files\\Git\\usr\\bin\\coder\""

 #          echo ""
            cd ${aDir}
            echo -e "\n  Running, npm install, in server folder"
            echo      "----------------------------------------------------------------"
            npm install
            cd "${__dirname}"
            pwd
            echo -e "\n  Opening VSCode, AICodeR.code-workspace"
            echo      "----------------------------------------------------------------"
#           mv *.code-workspace  AICodeR.code-workspace
            mv *.code-workspace  AICodeR.code-workspace
            read -n1 -p "  Press any key to continue..."
            code *code*
            }                                                                            # .(40722.01.2 End)
#   -------------------------------------------------------------------------------

  function  run_node() {
            aStep=$2
            
#           aSteps=",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,"

            aSteps3=",1,2,3,4,5,6,7,8,10,13,14,15," # Display AIC05_Schema command
            aSteps3_="$( echo "${aSteps3}" | awk '{ sub( /,'${aStep},'/, "" ); print }' )"

            aSteps1=",5,6,13,14,18,"                # Run AIC05_Schema command
#           aSteps_="$( echo "${aSteps}" | sed "s/${aStep}//g" )"
            aSteps1_="$( echo "${aSteps1}" | awk '{ sub( /',${aStep},'/, "" ); print }' )"

            aSteps2=",0,9,11,12,"                   # Run and Display AIC98_Tables command
            aSteps2_="$( echo "${aSteps2}" | awk '{ sub( /,'${aStep},'/, "" ); print }' )"

#           echo "aSteps1 '${aSteps1_}' != '${aSteps1}'"; # exit
#           echo "aSteps2 '${aSteps2_}' != '${aSteps2}'"; # exit
#           echo "aSteps3 '${aSteps3_}' != '${aSteps3}'"; # exit

    if [ "${aSteps3_}" != "${aSteps3}" ]; then

            echo -e "  Running Node $1 $2 $3 $4 $5 $6 $7 $8 $9"
    if [ "${aSteps1_}"  != "${aSteps1}" ]; then
            node           "${aDir}$1" $2 $3 $4 $5 $6 $7 $8 $9
            exit
            fi;
            exit; fi

    if [ "${aSteps2_}" != "${aSteps2}" ]; then
    if [ "${aStep}" == "9" ]; then
            echo -e "  Running Node $1 $4 $5 $6 $7 $8 $9"
            node           "${aDir}$1" $4 $5 $6 $7 $8 $9; exit; fi

            echo -e "  Running Node $1 $3 $4 $5 $6 $7 $8 $9"
            node           "${aDir}$1" $3 $4 $5 $6 $7 $8 $9
            exit
            fi
            }
# ------------------------------------------------------------------------------------
           
            aArg1=$1;       aCmd="";       aArg2=$2
#   if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" != "app" ] && [ "{aArg2:0:3}" != "mod" ]; then aCmd="set  app"; shift; fi
    if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="set  app";      aArg1=""; shift; shift; fi   #  0
    if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "mod" ]; then aCmd="set  model";    aArg1=""; shift; shift; fi   #  0
    if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "cod" ]; then aCmd="set  coder";    aArg1=""; shift; shift; fi   #  0    // .(40722.01.1 RAM Add Setup Coder)
    if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "aic" ]; then aCmd="set  coder";    aArg1=""; shift; shift; fi   #  0    // .(40722.01.x)
    if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "sho" ]; then aCmd="set  show";     aArg1=""; shift; shift; fi   #  0
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "set" ]; then aCmd="set  show";     aArg1=""; shift; shift; fi   #  0
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "var" ]; then aCmd="set  show";     aArg1=""; shift; shift; fi   #  0

    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "con" ]; then aCmd="save continue"; aArg1=""; shift; shift; fi   #  1
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "frt" ]; then aCmd="save frtable";  aArg1=""; shift; shift; fi   #  2
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="show sessions"; aArg1=""; shift; shift; fi   #  3
    if [ "${aArg1:0:3}" == "get" ] && [ "${aArg2:0:3}" == "mar" ]; then aCmd="get  markdown"; aArg1=""; shift; shift; fi   #  4
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "scr" ]; then aCmd="list scripts";  aArg1=""; shift; shift; fi   #  5
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "scr" ]; then aCmd="save scripts";  aArg1=""; shift; shift; fi   #  6
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "con" ]; then aCmd="list continue"; aArg1=""; shift; shift; fi   #  7
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "frt" ]; then aCmd="list frtables"; aArg1=""; shift; shift; fi   #  8

    if [ "${aArg1:0:3}" == "mak" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="make app";      aArg1=""; shift; shift; fi   #  9
    if [ "${aArg1:0:3}" == "mak" ] && [ "${aArg2:0:3}" != "app" ]; then aCmd="make app";      aArg1=""; shift;        fi   #  9

    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "mar" ]; then aCmd="save markdown"; aArg1=""; shift; shift; fi   # 10
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="list apps";     aArg1=""; shift; shift; fi   # 11
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "mod" ]; then aCmd="list models";   aArg1=""; shift; shift; fi   # 12
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="show apps";     aArg1=""; shift; shift; fi   # 13                 # .(40711.03.x)
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="list sessions"; aArg1=""; shift; shift; fi   # 14                 # .(40711.04.x)

#   if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="save session";  aArg1=""; shift; shift; fi   # 16                 # .(40711.04.x)
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "pro" ]; then aCmd="save prompt";   aArg1=""; shift; shift; fi   # 16                 # .(40711.04.x)

#   if [ "${aArg1:0:3}" == "run" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="run  session";  aArg1=""; shift; shift; fi   # 15                 # .(40711.04.x)
    if [ "${aArg1:0:3}" == "run" ] && [ "${aArg2:0:3}" == "pro" ]; then aCmd="run  prompt";   aArg1=""; shift; shift; fi   # 15                 # .(40711.04.x)
#   if [ "${aArg1:0:3}" == "run" ] && [ "${aArg2:0:3}" != "ses" ]; then aCmd="run  session";  aArg1=""; shift; fi          # 15
    if [ "${aArg1:0:3}" == "run" ] && [ "${aArg2:0:3}" != "pro" ]; then aCmd="run  prompt";   aArg1=""; shift; fi          # 15

    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" != "ses" ]; then aCmd="save session";  aArg1=""; shift; fi          # 17
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" != "mar" ]; then aCmd="show markdown"; aArg1=""; shift; fi          # 18                 # .(40717.02.1)
    if [ "${aArg1:0:3}" == "kil" ] && [ "${aArg2:0:3}" == "por" ]; then aCmd="kill port";     aArg1=""; shift; shift; fi   # 19                 # .(40724.01.2)

#   echo -e "\n[1]  \$1: '$1', \$2: '$2', aArg1: '${aArg1}', aCmd: '${aCmd}'"; exit

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
    if [ "$1" == "13" ]; then aCmd="show apps";     shift; fi     # .(40711.03.x)
    if [ "$1" == "14" ]; then aCmd="list sessions"; shift; fi     # .(40711.04.x)
    if [ "$1" == "16" ]; then aCmd="save prompt";   shift; fi     # .(40711.04.x)
#   if [ "$1" == "15" ]; then aCmd="run  session";  shift; fi     # .(40711.04.x)
    if [ "$1" == "15" ]; then aCmd="run  prompt";   shift; fi     # .(40711.04.x)
    if [ "$1" == "17" ]; then aCmd="save session";  shift; fi     # .(40711.04.x)
    if [ "$1" == "18" ]; then aCmd="show markdown"; shift; fi     # .(40717.02.2)
    if [ "$1" == "19" ]; then aCmd="kill portshow markdown"; shift; fi     # .(40717.02.2)

#   echo -e "\n[2]  \$1: '$1', \$2: '$2', aArg1: '${aArg1}', aCmd: '${aCmd}'"; exit

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
    if [ "${aCmd}" == "save prompt"   ]; then run_node "${AIC05_Schema}" "16" "$@"; exit; fi
#   if [ "${aCmd}" == "run  session"  ]; then run_node "${AIC05_Schema}" "15" "$@"; exit; fi
    if [ "${aCmd}" == "run  prompt"   ]; then run_node "${AIC05_Schema}" "15" "$@"; exit; fi
    if [ "${aCmd}" == "save session"  ]; then run_node "${AIC05_Schema}" "17" "$@"; exit; fi
    if [ "${aCmd}" == "show markdown" ]; then run_node "${AIC05_Schema}" "18" "$@"; exit; fi                            # .(40717.01.2)
    if [ "${aCmd}" == "kill port"     ]; then run_node "${AIC05_Schema}" "19" "$@"; exit; fi                            # .(40724.01.2)

    if [ "${aCmd}" == "set  vars"     ]; then aCmd="set  show"; fi

    export CALL_IT=0;
#   if [ "${aCmd}" == "make app"      ]; then echo node "../../../.vscode/task-createAppFolders_u02.mjs" $@; exit; fi
    if [ "${aCmd}" == "make app"      ]; then run_node "${AIC91_Folders}"  "9" "app"       $@; exit; fi  #  9           # .(40714.01.x)
    if [ "${aCmd}" == "list apps"     ]; then run_node "${AIC98_Tables}"  "11" "apps"      $@; exit; fi  # 11           # .(40711.01.4)
    if [ "${aCmd}" == "list models"   ]; then run_node "${AIC98_Tables}"  "12" "models"    $@; exit; fi  # 12           # .(40711.01.5)
    if [ "${aCmd}" == "set  app"      ]; then run_node "${AIC98_Tables}"   "0" "set app"   $@; exit; fi  #  0           # .(40716.01.2)
    if [ "${aCmd}" == "set  model"    ]; then run_node "${AIC98_Tables}"   "0" "set model" $@; exit; fi  #  0           # .(40716.01.3)
    if [ "${aCmd}" == "set  show"     ]; then run_node "${AIC98_Tables}"   "0" "set show"  $@; exit; fi  #  0           # .(40717.02.2)
    if [ "${aCmd}" == "set  coder"    ]; then set_coder                                      ; exit; fi  #  0           # .(40722.01.3)
#   if [ "${aCmd}" == "run  prompt"   ]; then echo "${ThePath}/c35_t021.00.0.40710.1754_request_curl.sh" $@; exit; fi   # .(40711.04.x)
#   if [ "${aCmd}" == "run  prompt"   ]; then echo "${ThePath}/c35_t021.00.0.40710.1754_request_curl.sh" $@; exit; fi   # .(40711.04.x)

    echo ""
    echo "  AICoder Commands (v1.05 7/24/24 ${aDir}):"
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
    echo "   19. kill port       {port}                       Stop port process"                                                  # .(40724.01.2)
    echo ""
    echo "   11. list apps       [App]                        List App for [App] or all Apps if 'all' or 'mt' in DB"              # .(40711.01.5)
    echo "   12. list models     [Model]                      List Model for [Model] or all Models if 'all' or 'mt' in DB"        # .(40711.01.6)
    echo "   14. list sessions   [App] [Model]                List AI Sessions for [App] in docs folder"                          # .(40711.01.6)
    echo "   17. save session    [S] [App] [Model]            Save all Messages for Sessios into Single Markdown File "
    echo "   10. save markdown   [App] [Model]                Save a last Message Markdown File for [App] [Model]"
    echo "   18. show markdown   [S[.M]] [App] [Model]        Open Markdown file in browser for Session / Message "               # .(40717.02.1)
    echo ""

    echo "    9. make [app]      {App} {Model}                Create a Folder for [App] (c##_name-of-app or s##_name-of-api)"
    echo "   13. show apps                                    List Apps that have an AI Session in docs folder"                   # .(40711.01.6)
    echo "   16. save prompt     [S[.M[.TS]]] [App] [Model]   Save a Prompt fpr [next] UsrMessage file for [App] [Model]"
#   echo "   15. run  [session]  [App} [Model]                Run an AI Session for [last] UsrMessage file"
    echo "   15. run  [model]    [App} [Model]                Run an AI Session Prompt for [last] UsrMessage file for [Model]"
#   echo "   10. save markdown   [App] [Model]                Save a last Message Markdown File for [App] [Model]"
#   echo "   15. run  [prompt]   [App} [Model]                Run an AI Session Prompt for [last] UsrMessage file"
    echo ""
    echo "    5. list scripts    [S[.M[.TS]]] [App] [Model]   Show App scripts for [last] Message Markdown File for [App] [Model]"
    echo "    6. save scripts    [S[.M[.TS]]] [App] [Model]   Save App scripts for [last] Message Markdown File for [App] [Model]"
#   echo ""
