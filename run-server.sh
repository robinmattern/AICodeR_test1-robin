#!/bin/bash
    SERVER_PORT=61323;  ./killport.sh ${SERVER_PORT} >/dev/null

    cd "server2/s23_summarize-video-api"
      ./run-server.sh 
