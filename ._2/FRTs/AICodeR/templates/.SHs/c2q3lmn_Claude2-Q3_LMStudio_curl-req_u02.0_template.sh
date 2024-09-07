#!/bin/bash
### File: {App}_{Ver}_request.sh for c2q3lmn_Claude2-Q3-LMStudio_curl-req_u02.0

 aVer="u02"
 aRequestName="LMStudio-Test"
 aProvider="LMStudio for running model"

# ---------------------------------------------------------------------

 nVer=$1; if [ "${nVer}" == "" ]; then nVer=0; fi
 aVer="${aVer}.${nVer}"

 export aInfile="${aRequestName}_${aVer}-messages.json"
 export aOufile="${aRequestName}_${aVer}-response.md"

 export aTitle="## Result of ${aRequestName/-/ } Request to ${aProvider}"

 export aAPI_URL="http://localhost:1234/v1/chat/completions"

#export aAPI_KEY="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"
 export aAPI_KEY=
# ---------------------------------------------------------------------

echo '{
  "messages": [
      { "role": "system", "content": "Always answer in rhymes." },
      { "role": "user",   "content": "Introduce yourself." }
      ],
  "temperature":  0.7,
  "max_tokens" : -1,
  "stream"     :  false

}' >"${aInfile}"
# ---------------------------------------------------------------------

aFRTdir="/E/Repos/Robin/AIObjs_/test1-robin/._2/FRTs"
aScript="AICodeR/AIC04_Curl-Request1_u01.sh"

#     ../AIR04_Curl-Request_u01.sh
      ${aFRTdir}/${aScript}




