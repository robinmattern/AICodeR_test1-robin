#!/bin/bash

# if [ "${OS:0:7}" == "Windows" ]; then cmd /c run-app.cmd; exit; fi

#   DIR="$( dirname $0 )";   cd "${DIR}"
    DIR="$( dirname $0 )"; if [ "${DIR}" == "." ] || [ "${DIR}" == "" ]; then DIR="$( pwd )"; fi

           PORT=$1;          cd "${DIR}"

    UPLOAD_PORT=61314;  ${DIR}/killport.sh ${UPLOAD_PORT} >/dev/null
    CLIENT_PORT=61324;  ${DIR}/killport.sh ${CLIENT_PORT} >/dev/null
    SERVER_PORT=61323;  ${DIR}/killport.sh ${SERVER_PORT} >/dev/null

### --------------------------------------------------------------

                            cd ${DIR}/server1/s14_python-uploader-api
               ./run-server.sh      ${UPLOAD_PORT} &
    sleep 5; 
                            cd ${DIR}/client2/c24_floating-boxes-app
               ./run-client.sh      ${CLIENT_PORT} &
    sleep 5; 
                            cd ${DIR}/server2/s23_summarize-video-api
               ./run-server.sh      ${SERVER_PORT} &
                            cd  ../../
         explorer  http://localhost:${CLIENT_PORT}

### --------------------------------------------------------------

