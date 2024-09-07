#!/bin/bash
### File: {App}_{Ver}_request.sh for gp4oopu_GPT-4o-OpenAI_curl-req_u01.3

   aSession=20
   aMessage=2
   export OPENAI_API_KEY="openai_api_key"

#  -----------------------------------------------------------------------------

   aPath=$(readlink -f "$0")
 __filename="${aPath##*/}"
 __dirname="${aPath%/*}"; aPath="${aPath%/*}"
   aModel="${aPath##*/}"; aPath="${aPath%/*}"
   aAppNm="${aPath##*/}"; aPath="${aPath%/*}"
   aStage="${aPath##*/}";

   echo "aStage: '${aStage}', aAppNm: '${aAppNm}', aModel: '${aModel}'";

 if [ "${aStage}" != "docs" ]; then
    echo -e "\n* You are not running this script is an {AppName}/{Model} folder."
    exit
    fi

#   echo "  __filename: ${__filename}"; # exit   #  c01_t001.01.1.40826.1048_request_.sh

    aSession="${__filename:5:3}"
    aMessage="${__filename:9:2}"
    aTS_last="${__filename:14:10}"
    echo "aSession: '${aSession}', aMessage: '${aMessage}', aTS_last: '${aTS_last}'"; # exit

    aStag1="${aStage}"
if [ ""c" == ${aAppNm:0:1}" ]; then aStage="client${aAppNm:1:1}"; fi
if [ ""s" == ${aAppNm:0:1}" ]; then aStage="server${aAppNm:1:1}"; fi

#  nMsg1=$1; if [ "${nMsg1}" != "" ]; then aMessage=${nMsg1%.*}; aSession=${nMsg1##*.}; fi
   nMsg1=$1; if [ "${nMsg1}" != "" ]; then aMessage=${nMsg1##*.}; aSession=${nMsg1%.*}; fi
   nMsg2=$2; if [ "${nMsg2}" != "" ]; then aMessage=${nMsg2}; fi
if [ "${nMsg1/./}" == "${nMsg1}" ] && [ "$2" == "" ]; then aMessage=1; fi

   aTS=$(date +'%y%m%d.%H%M'); aTS=${aTS:1}
if [ "${#aSession}" == "1" ]; then aSession="00${aSession}"; fi
if [ "${#aSession}" == "2" ]; then aSession="0${aSession}";  fi
if [ "${#aMessage}" == "1" ]; then aMessage="0${aMessage}";  fi

   aApp="${aAppNm:0:3}"
   aVer2="u${aSession}.${aMessage}.${aTS}"

   aPath="."
   aVer0="${aApp}_u${aSession}.${aMessage}"; if [ "$3" != "" ]; then aVer0="${aVer0}.$3"; fi
   aType="_messages.json"
#  aPattern="^${aVer0}.*${aType}$"
   aPattern="${aVer0}.*${aType}"
   aFoundFile=""

for aFile in "${aPath}"/*; do aFilename="${aFile:2}" # "${aFile#./}"
# Check if filename starts with the start string and ends with the end string
# if [[ ${aFile} == "$startString"* && ${aFile} == *"$endString" ]]; then
# echo " ${aVer0}     =~  '${aFile}'"
# echo " ${aPattern}  =~  ${aFile}"
  echo " ${aFilename} =~  ${aPattern}"
# if [[  ${aFile}     ==  "${aVer0}"*   && ${aFile} == *"${aType}"   ]]; then
# if [[ "${aFilename}"=~ "${aPattern}" ]]; then
  if [[  ${aFilename} =~  ${aPattern}  ]]; then
# if [[  ${aFile:2}   =~  ${aPattern}  ]]; then
# if [[  ${aPattern}  =~  ${aFile}     ]]; then
    aFoundFile="${aFile}"
  fi
done

   aApp_Dir="${aStage}/${aAppNm}/${aModel}"
   aDoc_Dir="${aStag1}/${aAppNm}/${aModel}"

if [ "${aFoundFile}" != "" ]; then
   aVer1="${aFoundFile:4:20}"
   echo -e "\n  Found File: ${aFoundFile}"; exit
 else
#  echo -e "\n* No file found for '${aVer0}*${aType}' in '${aDoc_Dir}'"
   echo -e "\n* No file found for '${aPattern}' in '${aDoc_Dir}'"
   exit
   fi

   echo " aVer1: '${aVer1}'";  exit
   echo " aVer2: '${aVer2}'"; # exit

#  aMessages_File="c35_u020.01.40703.1805_messages.json"
#  aRequest__File="c35_u020.01.40703.1805_request_.curl.sh"
#  aResponse_File="c35_u020.01.40703.1805_response.json"
#  aMarkdown_File="c35_u020.01.40703.1805_markdown.md"

   aMessages_File="${aApp}_${aVer1}_messages.json"
   aResponse_File="${aApp}_${aVer2}_response.json"
   aMarkdown_File="${aApp}_${aVer2}_markdown.md"

   echo "  aMessages_File: ${aMessages_File}"; exit

if [ ! -f "${aMessages_File}" ]; then
   echo -e "\n* The file '${aMessages_File}' doesn't exist in '${aDoc_Dir}'"
   exit
   fi

#  bash ${aRequest__File}
   bash ${aRequest__File} >${aResponse_File}

   aResult="$( curl -s ${aAPI_URL} \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${aAPI_KEY}" \
    -d @${aMessages_File} )"


 jq '.choices[0].message.content' ${aResponse_File} >${aMarkdown_File}
#jq '.choices[0].message.content' c35_u020.01.40703.1805_response.json >${aMarkdown_File}
#jq '.choices[0].message.content' c35_u020.01.40703.1805_response.json

cat ${aMarkdown_File}

#!/bin/bash

# Define the folder path (replace with your actual path)
folderPath="/path/to/your/folder"

# Define the starting string and ending string
startString="c35_u002.06"
endString="_request.json"

# Initialize a variable to hold the last matching file
lastMatchingFile=""

# Loop through all files in the folder
for file in "$folderPath"/*; do
  # Check if filename starts with the start string and ends with the end string
  if [[ $file == "$startString"* && $file == *"$endString" ]]; then
    # Update the last matching file
    lastMatchingFile="$file"
  fi
done

# Check if a matching file was found
if [[ -z "$lastMatchingFile" ]]; then
  echo "No matching file found."
else
  echo "Last matching file: $lastMatchingFile"
fi

