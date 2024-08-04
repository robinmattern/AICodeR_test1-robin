#!/bin/bash

   PROJECT_ID=aiapps-dev01-suzee-c63b
   MODEL=claude-3-5-sonnet@20240620
#  LOCATION=europe-west1
#  LOCATION=us-east5
#  LOCATION=us-east4-c
   LOCATION=us-east4

   aAppNm=c35_calendar1-app
   aModel=Claude3-So_Google-curl

   nSession=27;   aThread="t027"
   nMessage=1;    aMsg="01"
   aTS=40709.1732

   bQuiet=0; bDoit=0
#  bQuiet=1; bDoit=0
   bQuiet=0; bDoit=1
#  bQuiet=1; bDoit=1

   aProject_ID=aiapps-dev01-suzee-c63b
   aAPI_KEY=$(gcloud auth print-access-token)
#  aAPI_URL="https://$LOCATION-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/anthropic/models/${MODEL}:streamRawPredict"
   aAPI_URL="https://$LOCATION-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/anthropic/models/${MODEL}:predict"

#  TheRequest_File="c35_t027.01.1.40709.1732_request_.json";
#  TheRequest_File="${aAppNm:0:3}_${aThread}.${aMsg}.1.${aTS}_request_.json";
   TheRequest_File=""

#  TheUserMsg_File="c35_t021.01.1.40709.1732_usermsg_.txt"
   TheUser_Message="What do you see in this image?"

#  bWithImg=c35_t027.01.1.40712.1450_robin_328x328.jpg
   bWithImg=${aAppNm:0:3}_${aThread}.${aMsg}.1.${aTS}_robin_328x328.jpg

#  -----------------------------------------------------------------------------

#  echo ""

   aPath=$(readlink -f "$0");
 __basedir="${aPath%\/docs/*}";

#  aModel="${aPath##*/}"; aPath="${aPath%/*}";  # Model    is determined by current folder path
#  aAppNm="${aPath##*/}"; aPath="${aPath%/*}";  # App Name is determined by current folder path
#  aStage="${aPath##*/}";                       # remove everything before /

   aRequestScript="${__basedir}/._2/FRTs/AICodeR/AIC04_Curl-Request1_u01.sh"

   export TheRequest_File
   export TheUser_Message
   export aProject_ID
   export bWithImg
   export aAPI_KEY
   export aAPI_URL
   export bQuiet
   export aModel
   export aAppNm
   export bDoit

   "${aRequestScript}" ${nSession} ${nMessage} -doit=${bDoit}


