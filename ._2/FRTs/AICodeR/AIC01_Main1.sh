#!/bin/sh
#   AIC Launcher (Prod Copy)

        AIC_Scr=AIC02_Main1.mjs

#       AIC_Dir=$( dirname "$0" )
        AIC_Dir=$( realpath "$0" ); AIC_Dir=$( dirname "${AIC_Dir}" )
        AIC02_Main1=$AIC_Dir/$AIC_Scr

#echo "$AIC02_Main1" "$@"; exit
 node "$AIC02_Main1" "$@"

