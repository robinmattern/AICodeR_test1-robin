#!/bin/bash

#  bQuiet=0; bDoit=0
   bDoCurlHere=0;

   nMsg1=$1; if [ "${nMsg1}" != "" ]; then nMessage=${nMsg1##*.}; nSession=${nMsg1%.*};  fi
   nMsg2=$2; if [ "${nMsg2}" != "" ]; then nMessage=${nMsg2}; shift
if [ "${nMsg1/./}" == "${nMsg1}" ] && [ "$1" == "" ]; then nMessage=1; fi; fi
   aDoit=$2; if [ "${aDoit:0:6}" == "-doit=" ]; then bDoit=${aDoit:6}; fi

   export AICodeR_Title="Assistant Response Message No. ${nSession}.${nMessage}"

#  -----------------------------------------------------------------------------

   aUV="t"
   aPath=$(readlink -f "$0");
 __filename="${aPath##*/}"
 __dirname="${aPath%/*}"; aPath="${aPath%/*}"   # remove everything after /
 __basedir="${aPath%\/._2/*}";
   aRequestScript="${__basedir}/._2/FRTs/AICodeR/AIC04_Curl-Request2_u01.sh"

   echo ""
#  echo "__basedir:  ${__basedir}"
   echo "  aAppNm:   ${aAppNm}, aModel: ${aModel}"
   echo "  bQuiet:${bQuiet}, bDoit:${bDoit}"

#  echo -e "\n  aStage:   ${aStage}, aAppNm: ${aAppNm}, aModel: ${aModel}";
#  echo -e "\n  aStage:   ${aStage}, aAppNm: ${aAppNm}, aModel: ${aModel}";
   echo -e   "__dirname: '${__dirname}'\n__baseDir: '${__basedir}'"; exit

#  exit
#  -----------------------------------------------------------------------------

function findLast( ) {
   bFindQuiet=1

   aPath="$1" # "."
   aType="$2" # "_request_.json"
   aTS_="$3"

   aVer0="${aUV}${aSession}.${aMessage}.1"; if [ "$3" != "" ]; then aVer0="${aVer0}.${aTS_}"; fi
#  echo "  aVer0: '${aVer0}.${aTS}', aApp: ${aApp}, aSession: '${aUV}${aSession}', aMessage: '${aMessage}'"

#  aPattern="^${aVer0}.*${aType}$"
   aPattern="${aApp}_${aVer0}.*${aType}\$"
   aFoundFile=""

   echo -e "\n  aPattern:/${aPattern}/ in './${aPath}'"
   echo "  aVer0:   '${aVer0}.${aTS}', aApp: ${aApp}, aSession: '${aUV}${aSession}', aMessage: '${aMessage}'"
   if [  "${bQuiet}" == "0" ]; then echo ""; fi

   cd "${__basedir}/${aPath}"
   aPath="."

for aFile in  "${aPath}"/*; do aFilename="${aFile:2}" # "${aFile#./}"
#  Check if filename starts with the start string and ends with the end string
#  if [[ ${aFile} == "$startString"* && ${aFile} == *"$endString" ]]; then

   if [  "${bFindQuiet}" == "0" ]; then echo "  ${aFilename} =~  ${aPattern}"; fi
#  if [[  ${aFile}     == "${aVer0}"*   && ${aFile} == *"${aType}"   ]]; then
#  if [[ "${aFilename}"=~ "${aPattern}" ]]; then
#  if [[  ${aFile:2}   =~  ${aPattern}  ]]; then
#  if [[  ${aPattern}  =~  ${aFile}     ]]; then

   if [[  ${aFilename} =~  ${aPattern}  ]]; then
     aFoundFile="${aFile}"
     fi
   done
   if [  "${bFindQuiet}" == "0" ]; then echo -e "    Found:\n  ${aFoundFile:2} =~  ${aPattern}\n"; fi
   }
#  -----------------------------------------------------------------------------

#if [ "${aStage}" != "docs" ]; then
#   echo -e "\n* You are not running this script in an {AppName}/{Model} folder."
#   exit
#   fi
#  -----------------------------------------------------------------------------

#                                   aStag1="docs"  # ${aStage}"
if [ ""c" == ${aAppNm:0:1}" ]; then aStage="client${aAppNm:1:1}"; fi
if [ ""s" == ${aAppNm:0:1}" ]; then aStage="server${aAppNm:1:1}"; fi

   aTS=$(date +'%y%m%d.%H%M'); aTS=${aTS:1}

if [ "${#nSession}" == "1" ]; then aSession="00${nSession}"; fi
if [ "${#nSession}" == "2" ]; then aSession="0${nSession}";  fi
if [ "${#nMessage}" == "1" ]; then aMessage="0${nMessage}";  fi

   aApp="${aAppNm:0:3}"

   aVer1="${aUV}${aSession}.${aMessage}.1.40707.1155"
   aVer2="${aUV}${aSession}.${aMessage}.2.${aTS}"

   aStag1="docs"  # ${aStage}"

   aApp_Dir="${aStage}/${aAppNm}/${aModel}"
   aDoc_Dir="${aStag1}/${aAppNm}/${aModel}"

#  -------------------------------------------------------------------------------------------
#  Get JSON Request File
#  ---------------------------------------------------------------------------

if [ "${TheRequest_File}" == "" ]; then  # not given, find the latest one

#  findLast "." "_messages.json" $3
#  findLast "." "_request_.json" $3
#  findLast "docs/${aAppNm}/$aModel}" "_request_.json" $3
   findLast "${aDoc_Dir}" "_request_.json" $3

#  --------------------------------------------------------

if [ "${aFoundFile}" != "" ]; then
   aVer1="${aFoundFile:6:20}"
   echo "  aVer1:   '${aVer1}'"; # exit
   echo "  aVer2:   '${aVer2}'"; # exit
#  echo "  aRequest File:         ${aFoundFile:2}"; # exit
 else
   echo -e "\n* No file found for '${aPattern}' in '${aDoc_Dir}'"
   exit
   fi
#  --------------------------------------------------------

   echo "  aFound:  '${aFoundFile:2}'"; # exit

   aMessages_File="${aApp}_${aVer1}_messages.json";
   aPrompt_File="${aFoundFile:2}"; aPrompt_File="${aPrompt_File/_request_.json/_usermsg_.txt}";
   aRequest__File="${aFoundFile:2}";
   aResponse_File="${aApp}_${aVer2}_response.json";
   aMarkdown_File="${aApp}_${aVer2}_markdown.md";

#  -----------------------------------------------------------------------

 else   # Use the given Request File: TheRequest_File

   aMessages_File="${TheRequest_File/_request_.json/_messages_.json}";
   aPrompt_File="${TheRequest_File/_request_.json/_usermsg_.txt}";
   aRequest__File="${TheRequest_File}";
   aResponse_File="${aApp}_${aVer2}_response.json";
   aMarkdown_File="${aApp}_${aVer2}_markdown.md";

   fi
#  -------------------------------------------------------------------------------------------
#  Add User Msg Txt to JSON Request file, if present
#  ---------------------------------------------------------------------------

#  echo ""
#  echo "  aMessages_File:         ${aMessages_File}";          # exit
#  echo "  aPrompt_File:           ${aPrompt_File}";            # exit

#  -------------------------------------------------------------------

 if [ "${TheUser_Message}" != "" ]; then
    aPrompt_Path="${__basedir}/${aDoc_Dir}/${aPrompt_File}.@tmp";
    echo "${TheUser_Message}" >"${aPrompt_Path}";
  else
    aPrompt_Path="${__basedir}/${aDoc_Dir}/${aPrompt_File}"
    fi
#  -------------------------------------------------------------------

 if [ -s "${aPrompt_Path}"  ]; then             # Always replace aRequest__File if aPrompt_File: exists

 if [    "${bQuiet}" == "0" ]; then
     echo -e "\n  UserMsg does    exist: '${aPrompt_Path}'"; fi

     aTemplate_File="${__basedir}/._2/FRTs/AICodeR/templates/${aModel}_template.json"
     echo "  aTemplate_File:         ${aTemplate_File}";
#    aPrompt="$( cat "${__basedir}/${aDoc_Dir}/${aPrompt_File}" )"
#    aPrompt="$( cat "${aPrompt_Path}" )"; aPrompt="${aPrompt//"\n"/"\\n"}"
#    aPrompt="$( cat "${aPrompt_Path}" | sed 's/\n/\\n/g' )"
#    aPrompt="$( cat "${aPrompt_Path}" | sed 's/\n/<br>/g' )"
#    aPrompt="$( cat "${aPrompt_Path}" | sed 's/\r\n\|\n/\\n/g')"
#    aPrompt="$( cat "${aPrompt_Path}" | sed 's/\r\n|\n/\n/g' )"
#    aPrompt="$( cat "${aPrompt_Path}" | sed 's/\r\n|\n/\\n/g' )"
#    aPrompt="$( cat "${aPrompt_Path}" | sed 's/\r\n|\n/<br>/g' )"
#    aPrompt="$( cat "${aPrompt_Path}" | awk 'BEGIN { a="" }; { a = a "<br>" $0 }; END { print a }' )"
#    aPrompt="$( cat "${aPrompt_Path}" | awk 'BEGIN { a="" }; { a = a "\\n" $0 }; END { print a }' )"
     aPrompt="$( cat "${aPrompt_Path}" | awk 'BEGIN { a="" }; { gsub( /"/, "\\\\\"" ); a = a "\\\\n" $0 }; END { print a }' )"

     aPrompt_Line="          \"text\": \"${aPrompt:3}\""
     echo "  aPromptLine: ${aPrompt_Line}"

#    cat "${aTemplate_File}" | awk '/{Prompt}/ { print "'"Yah hoo"'"; next; }; { print }'
#    cat "${aTemplate_File}" | awk '/{Prompt}/ { print "'${aPrompt_Line}'"; next; }; { print }'
#    cat "${aTemplate_File}" | awk -v aPrompt_Line="${aPrompt_Line}" '/{Prompt}/ { print aPrompt_Line; next } { print }'
     cat "${aTemplate_File}" | awk -v aPrompt_Line="${aPrompt_Line}" '/{Prompt}/ { print aPrompt_Line; next } { print }' >"${aRequest__File}"

   else
 if [ "${bQuiet}" == "0" ]; then
     echo -e "\n* UserMsg doesn't exist: '${aPrompt_Path}'"; fi

     fi
#  -------------------------------------------------------------------

if [ ! -f "${aRequest__File}" ]; then
   echo -e "* The file '${aRequest__File}' doesn't exist in '${aDoc_Dir}'"
   exit
   fi
#  -----------------------------------------------------------------------------

#  echo "  aRequest__File:         ${aRequest__File}";
#  echo "  aResponse_File:         ${aResponse_File}";
#  echo "  aMarkdown_File:         ${aMarkdown_File}";

#  exit
#  -----------------------------------------------------------------------------------------------------------

   if [ "${bQuiet}" == "0" ]; then

   echo ""
   echo "-----------------------------------------------------------------------------------------------------------------------"
   echo "  ${aRequest__File}"; # exit
   echo "  ${__basedir}/${aDoc_Dir}/${aRequest__File}"; # exit
   echo "-----------------------------------------------------------------------------------------------------------------------"
   echo "  curl -s  ${aAPI_URL}"
   echo "       -H \"Content-Type:  application/json\""
   echo "       -H \"Authorization: Bearer ${aAPI_KEY}\""
#  echo "       -d  @${aRequest__File}"
    cat "${__basedir}/${aDoc_Dir}/${aRequest__File}" | awk 'NR == 1 { print "       -d  @" $0; next }; { print "            " $0 }'; #exit
   echo "-----------------------------------------------------------------------------------------------------------------------"
   echo ""

   echo "  aMessages_File: ${aMessages_File}"
   echo "  aPrompt_File:   ${aPrompt_File}"
   echo "  aRequest__File: ${aRequest__File}"
   echo "  aResponse_File: ${aResponse_File}"
   echo "  aMarkdown_File: ${aMarkdown_File}"
#  echo "  aRequestScript: ${aRequestScript}"
   fi

#  ---------------------------------------------------------------------------
#  Execute Curl Script ${aRequestScript} if bDoit=1
#  ---------------------------------------------------------------------------

#  export  aMessages_File="${__dirname}/${aMessages_File}"
#  export  aPrompt_File="${__dirname}/${aPrompt_File}"
#  export  aRequest__File="${__dirname}/${aRequest__File}"
#  export  aResponse_File="${__dirname}/${aResponse_File}"
#  export  aMarkdown_File="${__dirname}/${aMarkdown_File}"

   export  aMessages_File="${__basedir}/${aDoc_Dir}/${aMessages_File}"
   export  aPrompt_File="${__basedir}/${aDoc_Dir}/${aPrompt_File}"
   export  aRequest__File="${__basedir}/${aDoc_Dir}/${aRequest__File}"
   export  aResponse_File="${__basedir}/${aDoc_Dir}/${aResponse_File}"
   export  aMarkdown_File="${__basedir}/${aDoc_Dir}/${aMarkdown_File}"

   if [ "${bDoCurlHere}" == "0" ]; then

   echo -e "\n  Executing Curl Script: '${aRequestScript}'"

   if [ "${bDoit}" == "1" ]; then

           bash "${aRequestScript}"

   exit; fi
   exit; fi

#  -----------------------------------------------------------------------------------------------------------
#  Execute Curl here bDoCurlHere
#  ---------------------------------------------------------------------------

if [ "${bQuiet}" == "1" ] && [ "${bDoCurlHere}" == "1" ]; then

   aResult="$( curl -s ${aAPI_URL} \
    -H "Content-Type:  application/json"   \
    -H "Authorization: Bearer ${aAPI_KEY}" \
    -d  @${aRequest__File} )"

#  aResult="$( curl -s ${aAPI_URL} \
#   -H "Content-Type: application/json" \
#   -H "Authorization: Bearer ${aAPI_KEY}" \
#   -d @${__dirname}/${aRequest__File} )"

#  aResult="$( curl -s ${aAPI_URL} -H "Content-Type: application/json" -H "Authorization: Bearer ${aAPI_KEY}" -d @${aRequest__File} )"

#  -------------------------------------------------------------------
     else
     if [ "${bDoCurlHere}" == "1" ]; then

               curl -s ${aAPI_URL} \
    -H "Content-Type:  application/json"   \
    -H "Authorization: Bearer ${aAPI_KEY}" \
    -d  @${aRequest__File}

#              curl -s ${aAPI_URL} -H "Content-Type: application/json" -H "Authorization: Bearer ${aAPI_KEY}" -d @${aRequest__File}

#              curl    https://api.openai.com/v1/chat/completions \
#   -H "Content-Type: application/json" \
#   -H "Authorization: Bearer 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" \
#   -d  @${aRequest__File}

        fi; fi
#  -----------------------------------------------------------------------------

   echo "${aResult}"          >"${__dirname}/${aResponse_File}"

   aMarkdown="$( jq '.choices[0].message.content' "${aResponse_File}" )"
   aMarkdown="$( echo -e "${aMarkdown}" | sed 's/\\n/\
/g' )"

   echo -e "${aMarkdown//\"/}"

#  -----------------------------------------------------------------------------------------------------------

