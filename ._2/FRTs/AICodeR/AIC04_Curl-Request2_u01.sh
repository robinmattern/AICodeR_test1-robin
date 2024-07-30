#!/bin/bash
#   echo "1. aOufile: ${aOufile}, aMDfile: ${aMDfile}";

#   aInfile="OpenAI-image6_u02.1-messages1.json"
    aInfile="${aRequest__File}"

#   aOufile="OpenAI-image6_u02.1-response.log"
#   aMDfile="${aOufile}"
    aMDfile="${aMarkdown_File}"

#   aOufile="${aOufile:0:(-3)}.log"
#   aOufile="${aOufile/.md/.log}"
    aOufile="${aResponse_File}"

    aTitle="${AICodeR_Title}"
#   aTitle="### Result using 31 video frames created with python"

#   aAPI_URL="https://api.openai.com/v1/chat/completions"
#   aAPI_KEY="openai_api_key"

    echo ""
    echo -e "3.aAPI_URL: ${aAPI_URL}\n  aAPI_KEY: ${aAPI_KEY}";
    echo -e "4.aInfile: ./docs${aInfile##*docs}\n  aOufile: ./docs${aOufile##*docs}\n  aMDfile: ./docs${aMDfile##*docs}"; # exit

    dStartTime=$(date +%s.%N)
    nMilliseconds1=$(echo "${dStartTime}" | awk -F '.' '{ printf( "%d", ($1 * 1000) + ($2 / 1000000) ) }' )

    echo ""
    echo "  cd $(pwd)"

# -------------------------------------------------

if [ "${aAPI_KEY}" != "" ]; then

  echo "  curl ${aAPI_URL}" \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer ${aAPI_KEY}" \
   -d  @${aInfile}

  aResult="$( curl -s ${aAPI_URL} \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer ${aAPI_KEY}" \
     -d @${aInfile} )"

  else  # -------------------------------------

  echo "  curl ${aAPI_URL}" \
   -H "Content-Type: application/json" \
   -d  @${aInfile}

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

   echo -e "\n-----------------------------------------------------------------------------------------------------------------------\n"
   echo -e "\n-------------------------------------------------------------------\n"  >"${aMDfile}"  # was aOuFile
   echo -e "## ${aTitle}\n"
   echo -e "## ${aTitle}\n"   >>"${aMDfile}"

   echo "${aResult}"          >>"${aOufile}"                                                         # out to Response.json file
 # echo "${aResult}"          >>"${aMDfile}"

   nErr="$( echo "${aResult}" | awk '/"error":/ { print 1 }' )"

   if [ "${nErr}" == "1" ]; then
   echo "${aResult}"                                                      # out to console
   echo -e "\n* Curl command failed"                                      # out to console
   echo -e "\n**Curl command failed**"  >>"${aMDfile}"                    # send error notice to markdown file
#  cat   "${aOufile}";  exit
   exit
   fi
# --------------------------------------------------------------------------

#  echo "$( echo "${aResult}" | jq '.created | strftime("%Y-%m-%d %H:%M:%S") , .choices[0].message.content , .usage | .prompt_tokens, .completion_tokens, .total_tokens' )"

        aContent="$( echo "${aResult}" | jq '.choices[0].message.content' )"
        aContent="$( echo -e "${aContent}" | sed 's/\\n/\
/g' )"

   echo -e "${aContent//\"/}\n"

   echo -e "\n### Stats:\n"
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

#  echo "## ${aTitle}"                                           >${aMDfile}
   echo ""                                                      >>${aMDfile}
   echo "${aContent//\"/}"                                      >>${aMDfile}
   echo ""                                                      >>${aMDfile}
   echo "### Stats"                                             >>${aMDfile}
#  echo ""                                                      >>${aMDfile}
   echo "- **Created**: ${aCreated//\"/}, Model: ${aModelNm}  " >>${aMDfile}
   echo "- **Usage**:   ${aUsage}, Secs: ${nSecs}             " >>${aMDfile}

# --------------------------------------------------------------------------



