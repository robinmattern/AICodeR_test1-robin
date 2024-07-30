#!/bin/bash
#   echo "1. aOufile: ${aOufile}, aMDfile: ${aMDfile}";

#   aInfile="OpenAI-image6_u02.1-messages1.json"
#   aOufile="OpenAI-image6_u02.1-response.log"
    aMDfile="${aOufile}"
#   aOufile="${aOufile:0:(-3)}.log"
    aOufile="${aOufile/.md/.log}"
#   aTitle="### Result using 31 video frames created with python"
#   aAPI_URL="https://api.openai.com/v1/chat/completions"
#   aAPI_KEY="openai_api_key"

#   echo "4. aOufile: ${aOufile}, aMDfile: ${aMDfile}"; exit

    dStartTime=$(date +%s.%N)
    nMilliseconds1=$(echo "${dStartTime}" | awk -F '.' '{ printf( "%d", ($1 * 1000) + ($2 / 1000000) ) }' )

  echo ""
  echo "  cd $(pwd)"

# -------------------------------------------------

if [ "${API_KEY}" != "" ]; then

  echo "  curl ${aAPI_URL}" \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer ${aAPI_KEY}" \
   -d  @${aInfile}
  echo ""

  aResult="$( curl -s ${aAPI_URL} \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer ${aAPI_KEY}" \
     -d @${aInfile} )"

  else  # -------------------------------------

  echo "  curl ${aAPI_URL}" \
   -H "Content-Type: application/json" \
   -d  @${aInfile}
  echo ""

  aResult="$( curl -s ${aAPI_URL} \
     -H "Content-Type: application/json" \
     -d @${aInfile} )"
   fi
# -------------------------------------------------

# --------------------------------------------------------------------------

if [ $? -ne 0 ]; then
   echo "* Error: curl failed to execute!"
   exit 1  # Exit script with an error code
   fi
# --------------------------------------------------------------------------

   echo -e "-------------------------------------------------------------------\n" >"${aOufile}"
   echo -e "${aTitle}\n"   >>"${aOufile}"

   echo "${aResult}"       >>"${aOufile}"

   nErr="$( echo "${aResult}" | awk '/"error":/ { print 1 }' )"
   if [ "${nErr}" == "1" ]; then
#  echo "${aResult}";   exit
   echo -e "\n* Curl command failed"    >>"${aOufile}"
   cat   "${aOufile}";  exit
   fi
# --------------------------------------------------------------------------

#  echo "$( echo "${aResult}" | jq '.created | strftime("%Y-%m-%d %H:%M:%S") , .choices[0].message.content , .usage | .prompt_tokens, .completion_tokens, .total_tokens' )"

        aContent="$( echo "${aResult}" | jq '.choices[0].message.content' )"
        aContent="$( echo -e "${aContent}" | sed 's/\\n/\
/g' )"

   echo -e "${aContent//\"/}"
   echo -e "\nStats:\n"
        aModelNm="$( echo "${aResult}" | jq '.model' )"
        aCreated="$( echo "${aResult}" | jq '.created | strftime("%Y-%m-%d %H:%M:%S")' )"
   echo "Created: ${aCreated//\"/}, Model: ${aModelNm}"

        dEndTime=$(date +%s.%N)
        nMilliseconds2=$(echo "${dEndTime}" | awk -F '.' '{ printf( "%d", ($1 * 1000) + ($2 / 1000000) ) }' )

        nSecs=$( echo "${nMilliseconds1} ${nMilliseconds2}" | awk '{ printf "%.3f", ( $2 - $1 ) / 1000 }' )

        aUsage="$( echo "${aResult}" | jq -r '.usage | "\(.prompt_tokens) \(.completion_tokens) \(.total_tokens)"' )"
   echo "Usage:   ${aUsage}, Secs: ${nSecs}";  # input prompt, output completion, total

#  exit

# --------------------------------------------------------------------------

   echo "${aTitle}"                                              >${aMDfile}
   echo ""                                                      >>${aMDfile}
   echo "${aContent//\"/}"                                      >>${aMDfile}
   echo ""                                                      >>${aMDfile}
   echo "### Stats"                                             >>${aMDfile}
#  echo ""                                                      >>${aMDfile}
   echo "- **Created**: ${aCreated//\"/}, Model: ${aModelNm}  " >>${aMDfile}
   echo "- **Usage**:   ${aUsage}, Secs: ${nSecs}             " >>${aMDfile}

# --------------------------------------------------------------------------



