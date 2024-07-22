                                                           if [ "${aCmd}" == "set  app"      ]; then echo node "${AIC05_Schema_IO}"  0 $@; exit; fi
    if [ "$1" ==  "0" ]; then                                           aCmd="set  app";      shift; fi
    if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "mod" ]; then aCmd="set  app";      shift; shift; fi   #  0
    if [ "${aArg1:0:3}" == "set" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="set  app";      shift; shift; fi   #  0
                                                                 echo "    0. set [app]       {App}                        Set App for AICodeR Commands"
                                                                 echo "    0. set [model]     {Model}                      Set Model for AICodeR commands"

                                                                 echo "    1. save session                                 Save Continue Sessions JSON Fles into a Continue JSON File "
                                                           if [ "${aCmd}" == "save session"  ]; then echo node "${AIC05_Schema_IO}"  1 $@; exit; fi
    if [ "$1" ==  "1" ]; then                                           aCmd="save session";  shift; fi
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="save session";  shift; shift; fi	 #  1

                                                                 echo "    2. save continue   [Date]                       Save a FRTables JSON .db File from a Continue JSON File for [Date]"
                                                           if [ "${aCmd}" == "save continue" ]; then echo node "${AIC05_Schema_IO}"  2 $@; exit; fi
    if [ "$1" ==  "2" ]; then                                           aCmd="save continue"; shift; fi
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "frt" ]; then aCmd="save continue"; shift; shift; fi	 #  2

                                                                 echo "    3. list sessions   [Date.Time]                  Format Sessions from FRTables JSON .db File"
                                                           if [ "${aCmd}" == "list sessions" ]; then echo node "${AIC05_Schema_IO}"  3 $@; exit; fi
    if [ "$1" ==  "3" ]; then                                           aCmd="list sessions"; shift; fi
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="list sessions"; shift; shift; fi	 #  3

                                                                 echo "    4. save frtable    S.M [TS]  [App] [Model]      Save a Message Markdown file from FRTables JSON File for [App] [Model]"
                                                           if [ "${aCmd}" == "save frtable"  ]; then echo node "${AIC05_Schema_IO}"  4 $@; exit; fi
    if [ "$1" ==  "4" ]; then                                           aCmd="save frtable";  shift; fi
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "mar" ]; then aCmd="save frtable";  shift; shift; fi	 #  4

#                                                                echo "    5. save continue   [App] [Model] [Date] [Time]  Save a Session into a Continue JSON File for [App] [Model]"
#                                                                echo "    6. list continue   [App] [Model] [Date] [Time]  List Sessions in a Continue JSON File for [App] [Model]"

                                                                 echo "    5. list scripts    [S[.M.TS]] [App] [Model]     Show App scripts for [last] Message Markdown File for [App] [Model]"
                                                           if [ "${aCmd}" == "list scripts"  ]; then echo node "${AIC05_Schema_IO}"  5 $@; exit; fi
    if [ "$1" ==  "5" ]; then                                           aCmd="list scripts";  shift; fi
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "scr" ]; then aCmd="list scripts";  shift; shift; fi	 #  5

                                                                 echo "    6. save scripts    [S[.M.TS]] [App] [Model]     Save App scripts for [last] Message Markdown File for [App] [Model]"
                                                           if [ "${aCmd}" == "save scripts"  ]; then echo node "${AIC05_Schema_IO}"  6 $@; exit; fi
    if [ "$1" ==  "6" ]; then                                           aCmd="save scripts";  shift; fi
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "scr" ]; then aCmd="save scripts";  shift; shift; fi	 #  6

                                                                 echo "    7. list continue                                List Continue Sessions JSON Files"
                                                           if [ "${aCmd}" == "list continue" ]; then echo node "${AIC05_Schema_IO}"  7 $@; exit; fi
    if [ "$1" ==  "7" ]; then                                           aCmd="list continue"; shift; fi
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="list continue"; shift; shift; fi	 #  7

                                                                 echo "    8. list frtables                                List Continue Sessions in a FRTables JSON .db File"
                                                           if [ "${aCmd}" == "list frtables" ]; then echo node "${AIC05_Schema_IO}"  8 $@; exit; fi
    if [ "$1" ==  "8" ]; then                                           aCmd="list frtables"; shift; fi
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "frt" ]; then aCmd="list frtables"; shift; shift; fi	 #  8

                                                                 echo "    9. make [app]      {App}  {Model}               Create a Folder for [App] (c##_name-of-app or s##_name-of-api)"
                                                           if [ "${aCmd}" == "make app"      ]; then echo node "${AIC05_Schema_IO}"  9 $@; exit; fi
#                                                          if [ "${aCmd}" == "make app"      ]; then echo node "../../../.vscode/task-createAppFolders_u02.mjs" $@; exit; fi
    if [ "${aArg1:0:3}" == "mak" ] && [ "${aArg2:0:3}" != "app" ]; then aCmd="make app";      shift; fi
    if [ "$1" ==  "9" ]; then                                           aCmd="make app";      shift; fi
    if [ "${aArg1:0:3}" == "mak" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="make app";      shift; shift; fi	 #  9

                                                                 echo "   10. save markdown   [App] [Model]                Save a Message Markdown File for [App] [Model]"
                                                           if [ "${aCmd}" == "save markdown" ]; then echo node "${AIC05_Schema_IO}" 10 $@; exit; fi
    if [ "$1" == "10" ]; then                                           aCmd="save markdown"; shift; fi
    if [ "${aArg1:0:3}" == "sav" ] && [ "${aArg2:0:3}" == "mar" ]; then aCmd="save markdown"; shift; shift; fi	 # 10

                                                                 echo "   11. list apps       [App]                        List App for [App] or all Apps if 'all' or 'mt' in DB"                 # .(40711.01.5)
                                                           if [ "${aCmd}" == "list apps"     ]; then      node "${AIC98_Tables}" "apps"   $@; exit; fi                         # .(40711.01.4)
    if [ "$1" == "11" ]; then                                           aCmd="list apps";     shift; fi
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="list apps";     shift; shift; fi	 # 11

                                                                 echo "   12. list models     [Model]                      List Model for [Model] or all Models if 'all' or 'mt' in DB"           # .(40711.01.6)
                                                           if [ "${aCmd}" == "list models"   ]; then      node "${AIC98_Tables}" "models" $@; exit; fi                         # .(40711.01.5)
    if [ "$1" == "12" ]; then                                           aCmd="list models";   shift; fi
    if [ "${aArg1:0:3}" == "sho" ] && [ "${aArg2:0:3}" == "mod" ]; then aCmd="list models";   shift; shift; fi	 # 12

                                                                 echo "   13. show apps                                    List Apps that have an AI Session in docs folder"                      # .(40711.01.6)
                                                           if [ "${aCmd}" == "show apps"     ]; then echo node "${AIC05_Schema_IO}" 13 $@; exit; fi
    if [ "$1" == "13" ]; then                                           aCmd="show apps";     shift; fi     # .(40711.03.x)
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "app" ]; then aCmd="show apps";     shift; shift; fi   # 13                 # .(40711.03.x)

                                                                 echo "   14. show sessions   [App] [Model]                List AI Sessions for [App] in docs folder"                             # .(40711.01.6)
                                                           if [ "${aCmd}" == "show sessions" ]; then echo node "${AIC05_Schema_IO}" 14 $@; exit; fi
    if [ "$1" == "14" ]; then                                           aCmd="show sessions"; shift; fi     # .(40711.04.x)
    if [ "${aArg1:0:3}" == "lis" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="show sessions"; shift; shift; fi   # 14                 # .(40711.04.x)

                                                                 echo "   15. run [session]   [App} [Model]                Run an AI Session"
                                                           if [ "${aCmd}" == "run  session"  ]; then echo node "${AIC05_Schema_IO}" 15 $@; exit; fi
    if [ "${aArg1:0:3}" == "run" ] && [ "${aArg2:0:3}" != "ses" ]; then aCmd="run  session";  shift; fi
    if [ "$1" == "15" ]; then                                           aCmd="run  session";  shift; fi     # .(40711.04.x)
    if [ "${aArg1:0:3}" == "run" ] && [ "${aArg2:0:3}" == "ses" ]; then aCmd="run  session";  shift; shift; fi   # 15                 # .(40711.04.x)
#                                                          if [ "${aCmd}" == "run session"   ]; then echo "${ThePath}/c35_t021.00.0.40710.1754_request_curl.sh" $@; exit; fi   # .(40711.04.x)
#                                                          if [ "${aCmd}" == "run session"   ]; then echo "${ThePath}/c35_t021.00.0.40710.1754_request_curl.sh" $@; exit; fi   # .(40711.04.x)
