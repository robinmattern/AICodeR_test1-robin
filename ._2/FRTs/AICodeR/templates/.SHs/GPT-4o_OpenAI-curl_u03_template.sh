#!/bin/bash
#E:\Repos\Robin\AIObjs_\dev03-robin\docs\c35_calendar1-app\GPT-4o_OpenAI-curl

   nSession=21
   nMessage=1


   TheRequest_File="c36_t026.04.1.40707.1940_request_.json";
   TheRequest_File="c35_t021.01.1.40709.1732_request_.json";
   TheRequest_File=""

   bQuiet=1; bDoit=0
   bQuiet=0; bDoit=1
#  bQuiet=1; bDoit=1

   aAppNm=c35_calendar1-app
   aModel=GPT-4o_OpenAI-curl  # gp4oopu

#  -----------------------------------------------------------------------------

#  export aAPI_KEY=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
   export aAPI_KEY=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

   export aAPI_URL=https://api.openai.com/v1/chat/completions

#  -----------------------------------------------------------------------------

#  echo ""

   aPath=$(readlink -f "$0");
 __basedir="${aPath%\/docs/*}";

#  aModel="${aPath##*/}"; aPath="${aPath%/*}";  # Model    is determined by current folder path
#  aAppNm="${aPath##*/}"; aPath="${aPath%/*}";  # App Name is determined by current folder path
#  aStage="${aPath##*/}";                       # remove everything before /

   aRequestScript="${__basedir}/._2/FRTs/AICodeR/AIC04_Curl-Request1_u01.sh"

   export TheRequest_File
   export bQuiet
   export aModel
   export aAppNm
   export bDoit

   "${aRequestScript}" ${nSession} ${nMessage}