   import { spawn }      from 'child_process';

   import   FRT          from './AIC90_FileFns.mjs'
   import   AIC          from './AIC06_Code_u06.mjs'                                                // .(40703.03.1 RAM New Version)
   import   AIM          from './AIC98_Apps-n-Models_u02.mjs'                                       // .(40711.01.7 RAM Changed file name)

     const  saveScripts     =  AIC.saveScripts
     const  listScripts     =  AIC.listScripts
     const  selectRow       =  AIM.selectRow
     const  getDocsPath     =  AIM.getDocsPath
     const  getModel        =  AIM.getModel
     const  getApp          =  AIM.getApp
     const  setArgs         =  AIM.setArgs                                                           // .(40711.01.8)

       var  Tables
//     var  aModel          =  getModel( 'gp4oopw' )[2]; console.log( `aModel: ${aModel}`); process.exit()

//   const  getSession_Row  =      getSessions
//   const  getMessage_Row  =      getMessages
//   const  getContent_Row  =      getContents
     global.getSession_Row  = function( nFld, aVal ) { return selectRow( Tables.Sessions, nFld, aVal ) }
     global.getMessage_Row  = function( nFld, aVal ) { return selectRow( Tables.Messages, nFld, aVal ) }
     global.getContent_Row  = function( nFld, aVal ) { return selectRow( Tables.Contents, nFld, aVal ) }

       var  bIsNotCalled    =  FRT.isCalled( import.meta.url, process.argv[1]);
       var  bRun            =  bIsNotCalled && `${ process.env['CALL_IT'] }`.match( /true|1/ ) == null;

//     var  aAppName        = 'c39_login-app'
//     var  aModel          = 'GPT-4o_OpenAI-cont'         //       markdown /share

       var  aAppName        =  FRT.setPaths( aAppName )
       var  aSession_Dir    =  FRT.join( __basedir, `docs/${aAppName}/${aModel}` )
       var  aSessions_Dir   =  FRT.join( __basedir, `../._/DOCs/code-sessions` )
       var _FRTables_Dir    =  aSessions_Dir                                                        // .(40701.05.1 RAM Add Global)
       var _Continue_Dir    =                       '/C/Users/Robin/.continue/sessions'

       var  aTS             = `${FRT._TS}`
       var  aTS             = '40621.2207'
       var  aVer            = `u03.${aTS}`
//     var  aVer            =  getVer(   aSession_Dir, 'v40611.*' )

//     var  aSessions_File  =  FRT.join( aSessions_Dir,   `AICodeR-sessions_${aVer}.json` )

       var  pFmters =
         { "savSessions_forContinue_fromContinue"         : savSessions_forContinue_fromContinue
         , "fmtSessions_forContinue_fromContinue"         : fmtSessions_forContinue_fromContinue
         , "getSessions_forContinue_fromContinue"         : getSessions_forContinue_fromContinue
         , "getSession_forContinue_fromContinue"          : getSession_forContinue_fromContinue
         , "getMessage_forContinue_fromContinue"          : getMessage_forContinue_fromContinue                                 // Step 1
         , "getContent_forContinue_fromContinue"          : getContent_forContinue_fromContinue

//       , "savSessions_forContinue" 			        : savSessions_forContinue
//       , "savSession_forContinue"  			        : savSession_forContinue
         , "fmtSessions_forContinue" 			        : fmtSessions_forContinue
         , "getSessions_forContinue" 			        : getSessions_forContinue
         , "getSession_forContinue"  			        : getSession_forContinue
         , "fmtSession_forContinue_SessionsOnly"        : fmtSession_forContinue_SessionsOnly                                 // Step 8, part 2
         , "fmtSession_forContinue"  			        : fmtSession_forContinue
         , "fmtMessage_forContinue"  			        : fmtMessage_forContinue
         , "fmtContent_forContinue"  			        : fmtContent_forContinue

         , "getSessions_fromContinue_forFRTables"       : getSessions_fromContinue_forFRTables

         , "savSessions_forFRTables2_fromContinue"      : savSessions_forFRTables2_fromContinue                               // Step 2 nope
         , "fmtSessions_forFRTables2_fromContinue"      : fmtSessions_forFRTables2_fromContinue                               // Step   none
         , "getSessions_forFRTables2_fromContinue"      : getSessions_forFRTables2_fromContinue
         , "getSession_forFRTables2_fromContinue"       : getSession_forFRTables2_fromContinue
         , "getMessage_forFRTables2_fromContinue"       : getMessage_forFRTables2_fromContinue
         , "getContent_forFRTables2_fromContinue"       : getContent_forFRTables2_fromContinue

//       , "savSessions_forFRTables2"                   : fmtSessions_forFRTables2_fromFRTables2
//       , "savSession_forFRTables2"  			        : savSession_forFRTables2
//       , "fmtSessions_forFRTables2_fromFRTables2"     : fmtSessions_forFRTables2_fromFRTables2
         , "getMarkdowns_fromFRTables2"			        : getMarkdowns_fromFRTables2                                          // Step 4
         , "getMarkdown_fromFRTables2"			        : getMarkdown_fromFRTables2
//       , "getSessions_forFRTables2" 			        : getSessions_forFRTables2
//       , "getSession_forFRTables2"  			        : getSession_forFRTables2
         , "fmtSession_forFRTables2" 			        : fmtSession_forFRTables2
         , "fmtMessage_forFRTables2" 			        : fmtMessage_forFRTables2
         , "fmtContent_forFRTables2" 			        : fmtContent_forFRTables2

         , "fmtSessions_asTable1"     			        : fmtSessions_asTable1
//       , "fmtSession_asTable1"     			        : fmtSession_asTable1
//       , "fmtMessage_asTable1"     			        : fmtMessage_asTable1
//       , "fmtContent_asTable1"     			        : fmtContent_asTable1
            }
        var pConstants =
             {  App            : "c39_login-app"
             ,  Model   	   : "Qwen2-7b_Ollama-cont"    // used for building FRTables
             ,  Method  	   : "cont"
             ,  Tab1Cnt 	   :  1
             ,  Tab2Cnt 	   :  1
             ,  No_Wdt   	   :  6
             ,  ID_Wdt   	   :  4
             ,  ContinueHrs    :  4
                }

// --- ---  --------------  =  -------------------------------------------------------------
       var  nSession        =  null
       var  aAppName        =  ''
       var  aModel          =  ''

//     var  aSteps =  "1"             // Save Sessions from Original Continue JSON files to Continue JSON file
//     var  aSteps =  "2"             // Save Continue Sessions from Continue JSON files          to FRTables JSON file
//     var  aSteps =  "3"             // List Sessions from Original Continue JSON files to .txt file
//     var  aSteps =  "4" S.M[].TS]   // Get  FRTable  from FRTables JSON file           to .md  file for nSession, nMessage
//     var  aSteps =  "5" S[.M.TS]    // List Scripts  from FRTables JSON file                        for nSession, nMessage
//     var  aSteps =  "6" S[.M.TS]    // Save Scripts  from FRTables JSON file
//     var  aSteps =  "7"             // List Continue Sessions JSON files
//     var  aSteps =  "8"             // List FRTables from FRTables JSON file
//     var  aSteps =  "9"             // Make App"
//     var  aSteps = "10"             // Save Markdown
//     var  aSteps = "11"             // List Models
//     var  aSteps = "12"             // List Apps
//     var  aSteps = "13"             // Show Apps
//     var  aSteps = "14"             // Show Sessions
//     var  aSteps = "16"             // Save Prompt
//     var  aSteps = "15"             // Run  Prompt
//     var  aSteps = "17"             // Save Session
//     var  aSteps = "18"             // Show Markdown                                              // .(40717.02.3)

        if (process.argv.length > 2 ) {  // Process command line arguments
       var  aSteps = process.argv[2]
            }
            aSteps = `,${aSteps},`
// --- ---  --------------  =  -------------------------------------------------------------

//     var  aSteps = bRun ? `,1,` : aSteps
//      if (aSteps.match(   /,1,/  )) { // Run save Sessions as FRTables
        if (aSteps.match(   /,1,/  )) { // Save Sessions   from Original Continue JSON files to Continue JSON file

//     var  aSessions_File  =  FRT.join( aSessions_Dir, `Continue-sessions_u${FRT._TS}.json` )

       var  nRecs           =  await savSessions_forContinue_fromContinue( _Continue_Dir, aSessions_Dir )
            console.log(    `  The last Continue Session, Message is ${nRecs.join( ".") }.` )
            }
//     ---  --------------  =  -----------------------------------------------

//     var  aSteps = bRun ? `,2,` : aSteps;   // console.log( `aSteps: ${aSteps} - bRun: ${bRun}` ); process.exit()
        if (aSteps.match(   /,2,/  )) { // Save Sessions   from Continue JSON files          to FRTables JSON file

//     var  aAppName        = 'c39_login-app'
//     var  aModel          = 'GPT-4o_OpenAI-cont'         //       markdown /share

       var  aDayTS          =  process.argv.length > 3 ? process.argv[3] : null
       var  aVer            =  getLastVer( 'Continue-sessions', 'json', aDayTS )
        if (aVer == "") {      process.exit()}
       var  aVer_bkup       = `v${aDayTS}`

//     var  aSessions_Save  =  FRT.join( aSessions_Dir, `AICodeR-sessions_${aVer}.txt`   )
       var  aSessions_File  =  FRT.join( aSessions_Dir, `Continue-sessions_${aVer}.json` )

//     var  aFRTables_File  =  FRT.join( aSessions_Dir, `FRTables-sessions_${aVer}.db`   )
       var  aFRTables_Bkup  =  FRT.join( aSessions_Dir, `FRTables-sessions_${aVer_bkup}.db`   )
       var  aFRTables_File  =  FRT.join( aSessions_Dir, `FRTables-sessions.db`   )

//     var  pTables         ={"Sessions": [], "Messages": [], "Contents": []  }
//     var  pTables         =  getFRTables( aDayTS)

//                             await fmtSessions(                          "asTable1", aSessions_File )
//     var  pTables         =  await getSessions_fromContinue_forFRTables( "asTable1", aSessions_File )
       if (!FRT.checkFile(     aFRTables_File).updatedOn) {
       var  pTables         =  await getSessions_fromContinue_forFRTables(  aSessions_File )
       } else {
       var  pTables         =  await updSessions_fromContinue_forFRTables( aSessions_File, aFRTables_File  )
            }
            pTables.Sessions=  pTables.Sessions.sort( (a,b) => a.slice(68,76) > b.slice(68,76) ? 1 : -1 )
            console.log(  `\n 2. Session Tables in JSON .db file:` )
            console.log(       pTables.Sessions.join( "\n") )

//          console.log(  `\n  Session Tables:` )
//          console.log(       JSON.stringify( pTables1, null, 2 ) )
                               await FRT.writeFile( aFRTables_File , JSON.stringify( pTables, null, 2 ) )
                               await FRT.writeFile( aFRTables_Back , JSON.stringify( pTables, null, 2 ) )
                               console.log(  `\n  Saved Session Tables in file: ${aFRTables_File}` )
            }
//     ---  --------------  =  -----------------------------------------------

//     var  aSteps = bRun ? `,3,` : aSteps
        if (aSteps.match(   /,3,/  )) { // Format Sessions from Original Continue JSON files to .txt file

       var  aVer            =  getLastVer( 'Continue-sessions', 'json' )
//     var  aSessions_File  =  FRT.join( aSessions_Dir, `Continue-sessions_u40623.2230.json` )
//     var  aSessions_File  =  FRT.join( aSessions_Dir, `Continue-sessions_${FRT._TS}.txt` )
       var  aSessions_File  =  FRT.join( aSessions_Dir, `Continue-sessions_${aVer}.txt` )

       var  aSessions       =  await fmtSessions( "forContinue", `${_Continue_Dir}/sessions.json` )
//                             await getSessions_forFRTables2_fromContinue( )
//                             await fmtSessions_forContinue_fromContinue( )  // <===
                               await FRT.writeFile( aSessions_File, aSessions )
            console.log(  `\n  Saved Formatted Continue Sessions in file: ${aSessions_File}` )
            }
//     ---  --------------  =  -----------------------------------------------

//     var  aSteps = bRun ? `,4,` : aSteps
//     var  aAppName        = 'c39_login-app'
//     var  aModel          = 'GPT-4o_OpenAI-cont'
        if (aSteps.match(   /,4,/  )) { // Save Sessions from FRTables JSON file             to .md  file for nSession, nMessage

       var  nRecs  =  [ 13, 4 ]
       var  nRecs  =  [ 14,   ]
       var  nRecs  =  [ 15, 4 ]
       var  nRecs  =  process.argv.length > 3 ? process.argv[3].split( /[,.]/ ) : nRecs; // console.log( "nRecs: ", nRecs )
       var  aDayTS =  process.argv.length > 4 ? process.argv[4] : ''            ;        // console.log( "aDayTS:", aDayTS )
       var  aApp   =  process.argv.length > 5 ? process.argv[5] : aAppName
       var  aModel =  process.argv.length > 6 ? process.argv[6] : aModel
        if (aDayTS.match( /^[cs][0-9]/) ) {  // console.log( `aDayTS: ${aDayTS}, aApp: '${aApp}', aModel: '${aModel}'` )
            aApp   =  aDayTS; aDayTS = ''
            aModel =  process.argv.length > 5 ? process.argv[5] : aModel
            }
//     var  aApp            =  getApp( aApp );
//      if (aApp == "") {      process.exit() }
//          console.log( `aApp: '${aApp}', aModel: '${aModel}', aDayTS: '${aDayTS}', nRecs: '${nRecs.join('.')}` ); process.exit()

//     var  aMsg            =  nRecs[1] ? `.${nRecs[1]}` : ``  // or '.0'
       var  aVer1           =  getLastVer( 'FRTables-sessions', 'db', aDayTS )
        if (aVer1 == "") {     process.exit() }
       var  aFRTables_File  =  FRT.join( aSessions_Dir, `FRTables-sessions_${aVer1}.db` )
//     var  aVer2           = `u${ `${nRecs[0]}`.padStart( 2, '0') }${aMsg}.${FRT.getDate( )}`; // console.log( `aVer2: ${aVer2}` ); process.exit()

//     var  aMarkdown_File  = `docs/${aApp}/${aModel}/markdown_${aVer2}.md`
//     var  aMarkdown_Save  =  FRT.join( __basedir,  aMarkdown_File )
//          console.log(  `\n  Saving Markdown File: ${      aMarkdown_File.split( /[\\\/]/ ).slice(   -2) .join( '/' )}
//                from: FRTables-sessions_${aVer1}.db into ${aMarkdown_File.split( /[\\\/]/ ).slice( 0,-2 ).join( '/' )}` )
//          process.exit()
//                             await getMarkdowns_fromFRTables2(  aFRTables_File, aMarkdown_Save, nRecs )
                               await getMarkdowns_fromFRTables2(  aFRTables_File, aApp, aModel, nRecs )
//                                   fmtSessions_forFRTables2(    aFRTables_File, aSessions_Save )
//                                   savSessions( "forFRTables2", aFRTables_File_File, aSessions_Save )
            }
//     ---  --------------  =  -----------------------------------------------

//     var  aModel          = 'OpenAI-GPT-4o-maxi'
//     var  aModel          = 'GPT-4o_OpenAI-curl'
//     var  aModel          = 'GPT-4o_OpenAI-curl'
       var  aModel          = 'GPT-4o_OpenAI-maxi'
//     var  aModel          = 'Claude3-So_Anthropic-chatgpt'

//     var  aModel          = 'Claude3-So_Anthropic-maxi'
       var  aAppName        = 'c01_calendar-app'
//     var  aAppName        = 'c35_calendar1-app'
//     var  aAppName        = 'c37_aicoder-sessions-app'

       var  aApp            = (getApp(    2,   aAppName, 1 )) // (().slice(1,2)[0] || '').trim()    // .(40718.09.3).(40715.01.1 RAM Change nFld Origin, was 3)
       var  aMod            = (getModel(  2,   aModel  , 1 )) // (().slice(1,2)[0] || '').trim()    // .(40718.09.4).(40715.01.2)

//     ---  --------------  =  -----------------------------------------------

//     var  aSteps = bRun ? `,5,` : aSteps, nSession = 16
        if (aSteps.match(   /,5,/  )) { // List Scripts  from FRTables JSON file                    //  Step 5 listScripts
//         console.log(    "  process.argv:", process.argv.slice(2).join( ", ") )
//          aApp            = 'c35'                                                                 // .(40711.04.1 Need to set via args)
//          aMod            = 'gp4oopu'                                                             // .(40711.04.2)

//     var  mArgs           =  setArgs( ['', '', 5, 1, 'xx'             ], 'get', 'puit' )
//     var  mArgs           =  setArgs( ['', '', 5, 1, '',    'gp4oopu' ], 'get', 'puit' )
//     var  mArgs           =  setArgs( ['', '', 5, 1, 'xx',  'mod'     ], 'get', 'puit' )
//     var  mArgs           =  setArgs( ['', '', 5, 1, 'c35', 'mod'     ], 'get', 'puit' )
//     var  mArgs           =  setArgs( ['', '', 5, 1, 'xx',  'gp4oopu' ], 'get', 'puit' )
//     var  mArgs           =  setArgs( ['', '', 5, 1                   ], 'get', 'puit' )
//     var  mArgs           =  setArgs( ['', ''                         ], 'get', 'puit' )
/*
        if (bIsNotCalled) {
       var  mArgs           =  setArgs( ['', '', 5, 20, 5               ], 'get', 'puit' )
        } else { 
            console.log( `  process.argv:  '${ process.argv.join( "'\n                 '" ) }'` )
       var  mArgs           =  setArgs( process.argv, 'get', 'quit' )
            }
*/       
       var  mArgs           =  setArgs( process.argv, 'get', 'quit' )
            console.log(    `  mArgs:  '${mArgs.join("', '")}`)
        if (mArgs.join("', '").match( /'\*/ ) ) { console.log( "  process.exit()" ) }

            aApp            =  mArgs[3]
            aMod            =  mArgs[4]
//     var  aDayTS          = `${ mArgs[0]}.${ mArgs[1] == '00' ? ''   : mArgs[0] }.${ mArgs[2] }`  //#.(40721.04.1 RAM When only session is in mArgs[1])
       var  aDayTS          = `${ mArgs[0]}.${ mArgs[1] == '00' ? '01' : mArgs[1] }.${ mArgs[2] }`  // .(40721.04.1 RAM S.B. this)
//     var  aDayTS          = `${ mArgs[0]}.${mArgs[1]}.${ mArgs[2] }`                              //#.(40721.04.1 RAM not this)
        if (aApp == '') { console.log( "* No App found. Please try again"   ) }
        if (aMod == '') { console.log( "* No Model found. Please try again" ) }
//      if (aApp == '' || aMod == '') { process.exit() }

//     var  aDayTS          =  process.argv.length > 3 ? process.argv[3] : nVer // nSession         //#.(40702.04.1 RAM Find 'em all)
//     var  aApp            =  process.argv.length > 4 ? process.argv[4] : aApp                     //#.(40711.04.2)
//     var  aMod            =  process.argv.length > 5 ? process.argv[5] : aMod                     //#.(40711.04.3)
            console.log(    `  aDayTS: '${aDayTS}', aApp: '${aApp}',  aMod: '${aMod}'`)

//          aApp            =  aApp              ? aApp : process.env["FRT_APP"]                    //#.(40716.02.2)
//          aMod            =  aMod              ? aMod : process.env["FRT_MODEL"]                  //#.(40716.02.3)
        var nFld            = (aMod.length == 7) ? 1 : 2; aApp = aApp.slice(0,3)
            aAppName        = (getApp(    2,   aApp    , 2 )) // (().slice(2,3)[0] || '').trim()    // .(40718.09.5).(40715.01.3 RAM Was 2, aApp)
            aModel          = (getModel( nFld, aMod    , 2 )) // (().slice(2,3)[0] || '').trim()    // .(40718.09.6).(40715.01.4 RAM Was 2, aMod)
            console.log(    `  aDayTS: '${aDayTS}', aApp: '${aApp}', aAppName: '${aAppName}',  aMod: '${aMod}', aModel: '${aModel}'`)
//      if (!aModel) {
//          console.log(  `\n* Invalid Model, ${aMod}` ); process.exit() }
//      if (!aModel) {
//          consolr.log(  `\n* Invalid App, ${aApp}`   ); process.exit() }

       var  aSessions_Dir   =  getDocsPath( aAppName, aModel )                                      // .(40715.03.1 Add chk fundtion)
//     var  aSessions_Dir   = '\E:\\Repos\\Robin\\AIObjs_\\._\\DOCs\\code-sessions'
//     var  aSessions_Dir   =  FRT.join( __basedir, `docs/${aAppName}/${aModel}` )                  //#.(40715.03.1)

//     var  aMarkdown_File  = `${aApp.slice(0,3)}_markdown`                                         //#.(40702.05.2 RAM New pattern)
//     var  aMarkdown_File  = `${aApp.slice(0,3)}_markdown_{ver}`                                   //#.(40702.05.2 RAM New pattern)
//     var  aMarkdown_File  = `${aApp.slice(0,3)}_{ver}_session`                                    // .(40702.05.2 RAM New pattern)
       var  aMarkdown_File  = `${aApp.slice(0,3)}_{ver}_markdown`                                   // .(40711.04.3 RAM File is now markdown.md)
//          console.log(    `  aMarkdown_File: '${aMarkdown_File}'` )

       var  aMarkdown_Saved =  getLastVer_Saved(  aSessions_Dir,   aMarkdown_File, 'md', aDayTS)    // .(40702.05.3 RAM Use new function)

                               await listScripts( aMarkdown_Saved )    // <===  Step 5
            }
//     ---  --------------  =  -----------------------------------------------

       var  aSteps = bRun ? `,6,` : aSteps, nSession = 16
        if (aSteps.match(   /,6,/  )) { // Save Scripts  from FRTables JSON file                    //  Step 6 saveScripts

//     var  aDayTS          =  process.argv.length > 3 ? process.argv[3] : '' // nSession           //#.(40702.04.2 RAM Find 'em all)
//     var [aDayTS, aApp, aMod ] = AIM.setArgs( process.argv  )                                     //#.(40711.04.x RAM Set Args)
//     var  aAppCD          =  AIM.getApp(   process.argv[4], aApp )
//     var  aModCD          =  AIM.getModel( process.argv[5], aMod )
/*
       var  aApp            =  process.argv.length > 3 ? process.argv[3] : aApp                     //#.(40711.04.x RAM )
       var  aMod            =  process.argv.length > 4 ? process.argv[4] : aMod                     //#.(40711.04.x)
//     var  aDayTS          =  process.argv.length > 5 ? process.argv[5] : '' // nSession           //#.(40702.04.1 RAM Find 'em all)
//          aModel          = (getModel(  2,   aMod                ).slice(2,3)[0] || '').trim()    //#.(40718.09.7)
        if (aModel == "") {
            console.log(  `\n* Invalid Model, ${aMod}` ); process.exit() }
        if (aModel == "") {
            consolr.log(  `\n* Invalid App, ${aApp}`   ); process.exit() }                          //#.(40711.04.x End)
*/
//     var  aAppName        = (getApp(    2,   aApp                ).slice(2,3)[0] || '').trim()    //#.(40718.09.8)
//     var  aModel          = (getModel(  2,   aApp                ).slice(2,3)[0] || '').trim()    //#.(40718.09.9)

       var  mArgs           =  setArgs( ['', '', 5, 20, 5 ], 'get', 'puit' )
//     var  mArgs           =  setArgs( process.argv       , 'get', 'quit' )
            console.log(    `  mArgs:  '${mArgs.join("', '")}`)
        if (mArgs.join("', '").match( /'\*/ ) ) { console.log( "  process.exit()" ) }

            aApp            =  mArgs[3]
            aMod            =  mArgs[4]
       var  aDayTS          = `${ mArgs[0]}.${ mArgs[1] == '00' ? '01' : mArgs[1] }.${ mArgs[2] }`  // .(40721.04.2)
        if (aApp == '') { console.log( "* No App found. Please try again"   ) }
        if (aMod == '') { console.log( "* No Model found. Please try again" ) }
//      if (aApp == '' || aMod == '') { process.exit() }

//     var  aDayTS          =  process.argv.length > 3 ? process.argv[3] : nVer // nSession         // .(40702.04.1 RAM Find 'em all)
//     var  aApp            =  process.argv.length > 4 ? process.argv[4] : aApp                     // .(40711.04.x)
//     var  aMod            =  process.argv.length > 5 ? process.argv[5] : aMod                     // .(40711.04.x)
            console.log(    `  aDayTS: '${aDayTS}', aApp: '${aApp}',  aMod: '${aMod}'`)

//          aApp            =  aApp              ? aApp : process.env["FRT_APP"]                    //#.(40716.02.4)
//          aMod            =  aMod              ? aMod : process.env["FRT_MODEL"]                  //#.(40716.02.5)
        var nFld            = (aMod.length == 7) ? 1 : 2; aApp = aApp.slice(0,3)
            aAppName        = (getApp(    1,   aApp    , 2 )) // (().slice(2,3)[0] || '').trim()    // .(40718.09.10).(40715.01.3 RAM Was 2, aApp)
            aModel          = (getModel( nFld, aMod    , 2 )) // (().slice(2,3)[0] || '').trim()    // .(40718.09.11).(40715.01.4 RAM Was 2, aMod)
            aMod            = (getModel( nFld, aMod    , 1 )) // (().slice(1,2)[0] || '').trim()    // .(40718.09.12).(40717.05.x RAM Need the alias) 
            console.log(    `  aDayTS: '${aDayTS}', aApp: '${aApp}', aAppName: '${aAppName}',  aMod: '${aMod}', aModel: '${aModel}'`)

       var  aSessions_Dir   =  getDocsPath( aAppName, aModel )                                      // .(40715.03.2)
//     var  aSessions_Dir   =  FRT.join( __basedir, `docs/${aAppName}/${aModel}` )                  //#.(40711.04.x RAM was aApp).(40715.03.2)

//     var  aMarkdown_File  = `${aApp.slice(0,3)}_{ver}_session`                                    // .(40702.05.2 RAM New pattern)
       var  aMarkdown_File  = `${aApp.slice(0,3)}_{ver}_markdown`                                   // .(40702.05.2 RAM New pattern)

       var  aMarkdown_Saved =  getLastVer_Saved(  aSessions_Dir,   aMarkdown_File, 'md', aDayTS )   // .(40702.05.3 RAM Use new function)

                               await saveScripts( aMarkdown_Saved, aAppName, aModel, aMod )         // .(40717.05.x RAM Pass aAppName not aApp) <===  Step 6
            }
//     ---  --------------  =  -----------------------------------------------

//     var  aSteps = bRun ? `,7,` : aSteps
        if (aSteps.match(   /,7,/  )) { // List Continue Session files

       var  aSessions_File  = `${_Continue_Dir}/sessions.json`
       if ('both' == 'bosh') {
            console.log( "\n 7a. Continue JSON files listing")
       var  mFiles          =  await FRT.listFiles( _Continue_Dir )                                                             // Step 8, part 1
//          mFiles          =  mFiles.sort( (a,b) => a[1] > b[1] ? 1 : -1 ).sort( (a,b) => a[2] == 'sessions.json' ? 1 : -1 )
            mFiles          =  mFiles.sort( (a,b) => a[2] == 'sessions.json' ? 1 : ( a[1] > b[1] ? 1 : -1 ) )
//          mFiles          =  mFiles.map( mFile => mFile.slice(0,-1).join("  ") )
//          mFiles          =  mFiles.map(  ( mFile, i) =>   [ `${i+1}.`.padStart(4),   mFile[1],    mFile[0],              mFile[2] ].join("  ") )
//          mFiles          =  mFiles.map(  ( mFile, i) => `${ `${i+1}.`.padStart(4)} ${mFile[1]}  ${mFile[0].slice(1)}   ${mFile[2]}` )
            mFiles          =  mFiles.filter( mFile => mFile[2].match( /_v[0-9]/ ) == null )
            mFiles          =  mFiles.map(  ( mFile, i) => `${ `${i+1}.`.padStart(pConstants.No_Wdt)} ${mFile[1]}  ${mFile[2].padEnd(41)} ${mFile[0].slice(1)}  ` )
            console.log( "",   mFiles.join( "\n" ).slice(1) )
            }
            console.log(  "\n 7b. Continue JSON file contents")
       var  aSessions       =  await fmtSessions( "forContinue_SessionsOnly", aSessions_File )                                  // Step 8, part 2
            console.log( "",   aSessions.slice(1) )

       var  pStats          =  FRT.checkFile( aSessions_File )
       var  aTS             =  FRT.getDate( +new Date( pStats.updatedOn ), -1 )
            console.log(       `${ ''.padEnd(pConstants.No_Wdt) } ${aTS}  ${aSessions_File}` )
            }
//     ---  --------------  =  -----------------------------------------------

//     var  aSteps = bRun ? `,8,` : aSteps
        if (aSteps.match(   /,8,/  )) { // Show Sessions from FRTables JSON .db file
     /*
       var  aSessions_File  =  FRT.join( _Continue_Dir, `sessions.json` )
       var  mSessions       =  JSON.parse( await FRT.readFileSync( aSessions_File ) )
       var  aSessions       =  mSessions.map( getSession_fromContinue ).join( "\n" )   // <===  Step 7
            console.log(       aSessions )
     */
       var  aDayTS          =  process.argv.length > 3 ? process.argv[3] : nSession
       var  pTables         =  getFRTables( aDayTS )
            console.log ( "\n  8. FRTables Sessions JSON db file")
//     var  mSessions       =  pTables.Sessions.map( fmtFRTables_Sessions ).sort( (a,b) => a.slice(62,70) > b.slice(62,70) ? 1 : -1 )
            console.log(       pTables.Sessions.join( "\n") )          // not mSession from line above
       var  pStats          =  FRT.checkFile( aFRTables_File )
       var  aTS             =  FRT.getDate( +new Date( pStats.updatedOn ), -1 )
            console.log( `${ ''.padEnd(pConstants.No_Wdt) } ${aTS}  ${aFRTables_File}` )

  function  fmtFRTables_Sessions( aSession, i )  {
       var  aNo             = `${i+1}.`.padStart( 4   )   //  0 +  4
       var  aCreatedOn      =  aSession.slice( 17, 33 )   //  6 + 16
       var  aGUID           =  aSession.slice( 34, 71 )   // 24 + 36
       var  aID             =  aSession.slice(  7, 15 )   // 62 +  8
       var  aTitle          =  aSession.slice( 73     )   // 72
    return `${aNo} ${aCreatedOn} ${aGUID}  ${aID}  ${aTitle}`
            }
        }
//     ---  --------------  =  -----------------------------------------------

//     var  aSteps = bRun ? `,9,` : aSteps
        if (aSteps.match(   /,9,/  )) { // Show Session  from FRTables JSON file

       var  aSessions_File  =  FRT.join( aSessions_Dir, `Continue-sessions_${aVer}.txt` )
       var  aSessions       = (await mSessions.forEach( fmtSession)).join( "\n" )
       var  pSessions       =  await getSessions( "forContinue", _Continue_Dir )
            console.log(       JSON.stringify( aSessions, null, 2 ) )
            console.log( `\n   Saved Session Tables file: ${aSessions_File}` )
            }
//     ---  --------------  =  -----------------------------------------------

//     var  aSteps = bRun ? `,13,` : aSteps                                             // .(40711.02.1 RAM Added Step 13 Beg)
        if (aSteps.match(   /,13,/  )) { // Show Apps

       var  mFiles          =  FRT.listFiles( FRT.path( __basedir, 'docs' ) )
       var  mApps           =  mFiles.filter( mFile => mFile[2].match( /^[cs]/) )
                                     .sort( (a,b) => a[2] > b[2] ? 1 : -1 )
//     var  aApps           =  mApps.map( (mApp,i) => fmtApp( mApp, i ) ).join( "\n" )
       var  aApps           =  mApps.map( fmtApp ).join( "\n" )
            console.log( "" )
            console.log( "  Current apps in docs folder" )
            console.log( "  ---------------------------------------" )
            console.log(       aApps )

  function  fmtApp( mApp, i )  {
       return `${ `${i+1}.`.padStart(5)}  ${mApp[2]}` }
            }                                                                           // .(40711.02.1 End)
// --- ---  --------------  =  -------------------------------------------------------------

//     var  aSteps = bRun ? `,14,` : aSteps                                             // .(40711.02.1 RAM Added Step 13 Beg)
        if (aSteps.match(   /,14,/  )) { // List Sessions
/*
       var  aApp            =  process.argv.length > 3 ? process.argv[3] : aApp
       var  aMod            =  process.argv.length > 4 ? process.argv[4] : aMod

        if (aApp == 'set') {
       var  aApp_           =  process.argv.length > 4 ? process.argv[4] : ''
       var  aMod_           =  process.argv.length > 5 ? process.argv[5] : ''
            aApp            = (getApp(   1, aApp_ )[1] || '' ).trim()
            aMod            = (getModel( 1, aMod_ )[1] || '' ).trim()
       if (!aApp) {
            console.log( '\n* Please enter a valid App alias.'   + (aApp_ ? ` You entered ${aApp_}` : '' ) ); process.exit() }
       if (!aMod) {
            console.log( '\n* Please enter a valid Model alias.' + (aMod_ ? ` You entered ${aMod_}` : '' ) ); process.exit() }
            process.env['FRT_APP'  ] = aApp
            process.env['FRT_MODEL'] = aMod
            } // eif set
*/
//          aApp            =  aApp ? aApp : process.env['FRT_APP'  ]                               //#.(40717.04.1 RAM Beg)
//          aMod            =  aMod ? aMod : process.env['FRT_MODEL']

//          aAppName        = (getApp(   1, aApp )[2] || '').tri 
//          aModel          = (getModel( 1, aMod )[2] || '').trim()                                 // .(40715.03.4)

       var  mArgs           =  setArgs( process.argv, 'get', 'quit' )
       var  aAppName        = (mArgs[3].length == 3) ? (getApp(   1, mArgs[3] )[2] || '').trim() : mArgs[3] 
       var  aModel          = (mArgs[4].length == 7) ? (getModel( 1, mArgs[4] )[2] || '').trim() : mArgs[4]   // .(40717.04.1 RAM End)
     
            aModel          =  undefined
       var  aAppPath        =  getDocsPath( aAppName, aModel )                                      // .(40715.03.5 Add chk function)
            //     if (!aAppName) {
//          console.log( '\n* Invalid App: ${aApp}. ' )
//          process.exit()
//          }
            console.log( "" )
            console.log(    `  Session / Messaage files in ${aAppPath}` )
            console.log(    "  ---------------------------------------------------------------------------------------------------------------------" )
        var mSessions       =  shoSessions( aAppPath, aModel )                                      // .(40615.03.x RAM Can contain Model path)
            console.log(       mSessions.join( "\n" ).slice(2) )
            process.exit()
//function  shoSessions( aAppName ) {
  function  shoSessions( aAppPath, aModel ) {                                                       // .(40715.03.6 RAM Use aAppPath)
        if (!aModel) {
//     var  mFiles          =  FRT.listFiles( FRT.path( __basedir, `docs/${aAppName}` ) )           // All models for app
       var  mFiles          =  FRT.listFiles( aAppPath )                                            // .(40715.03.7 RAM All models for app, or just one)
       var  mFolders        =  mFiles.filter( mFile => mFile[0].match( /^ +0/ ) )                   // .(40715.05.1 RAM Opps was: /^[ 0]+/ )
//     var  mModels         =  mFolders.map(  mDir  => mDir[2] )                                    //#.(40715.05.1)
       var  mModels         =  mFolders.map(  mDir  => getModel( 2, mDir[2] )[2] )                  // .(40715.05.1 RAM Check it)
                                       .sort( (a,b) => a[2] > b[2] ? 1 : -1 )
                                       .filter( aDir => aDir )
        } else {
            mModels         = [ aModel ]
            }
       var  mSessions  = [ ];  mModels.forEach( fmtSessions )
//          mSessions       =  mSessions.filter
//          console.log(       mSessions.join( "\n" ) )
            return mSessions

  function  fmtSessions( aModel, i )  {
       var  aMod            =  getModel( 2, aModel )[1]
       var  aModelPath      = `docs/${aAppName}/${aModel.trim()}`
       var  mFiles          =  FRT.listFiles(  FRT.path( __basedir, aModelPath ) )
       var  mResponses      =  mFiles.filter(  mFile  => mFile[2].match( /markdown.md|response.md/ ) )
       var  mResponses      =  mResponses.map( mFile  => mFile[2] )
                                         .sort( (a,b) => a > b ? 1 : -1 )
//          mSessions.push(    mResponses.map( fmtSession ) )
//          mSessions.push([...mResponses.map( fmtSession ) ])
       if ((mSessions.slice(-1)[0] || '').slice(25,28) != (mResponses[0] || '').slice(0,3)) {
            mSessions.push( ' ' ) }
            mSessions       =  mSessions.concat( mResponses.map( fmtSession ));
//          mSessions.push( ' ' )

  function  fmtSession( aFile, i )  {
//     var  j = mSessions.length + ( aModel == '' ? i : i + 1 )
       var  j = mSessions.length + i + ( mSessions.slice(-1)[0].trim() > "" ? 1 : 0)
return `${ `${j+0}.`.padStart(5)}  ${aMod}  ${aModel.padEnd(30)}  ${aFile}`
            }  }
        }   }  // eif Step 14                                                            		  // .(40711.02.1 End)
// --- ---  --------------  =  -------------------------------------------------------------

//     var  aSteps = bRun ? `,15,` : aSteps                                             		  /#.(40715.02.1 RAM Added Step 15 Beg)
        if (aSteps.match(   /,15,/  )) { // Run Prompt, i.e. Session, Message

//          "${ThePath}/c35_t021.00.0.40710.1754_request_curl.sh" $@; exit; fi   # .(40711.04.x)

            } // eif Step 15                                                                        // .(40715.02.1 End)
// --- ---  --------------  =  -------------------------------------------------------------

//     var  aSteps = bRun ? `,16,` : aSteps                                             	           //#.(40716.02.1 RAM Added Step 16 Beg)
        if (aSteps.match(   /,16,/  )) { // Save Prompt


            } // eif Step 16                                                                        // .(40716.02.1 End)
// --- ---  --------------  =  -------------------------------------------------------------

//     var  aSteps = bRun ? `,17,` : aSteps                                             		  //#.(40715.04.1 RAM Added Step 17 Beg)
        if (aSteps.match(   /,17,/  )) { // Save Session ??


            } // eif Step 17                                                                        // .(40715.04.1 End)
// --- ---  --------------  =  -------------------------------------------------------------

//     var  aSteps = bRun ? `,18,` : aSteps                                             		    //#.(40717.02.6 RAM Added Step 18 Beg)
        if (aSteps.match(   /,18,/  )) { // Open Session or Message Markdown file in browsewr
 
       var  mArgs           =  setArgs( process.argv, 'get', 'quit' )
       var  aAppName        = (mArgs[3].length == 3) ? (getApp(   1, mArgs[3] )[2] || '').trim() : mArgs[3] 
       var  aModel          = (mArgs[4].length == 7) ? (getModel( 1, mArgs[4] )[2] || '').trim() : mArgs[4] 
       var  aDayTS          = `${mArgs[0]}.${mArgs[1]}.${mArgs[2]}`     

        if (aDayTS == "..") { 
            console.log(  `\n* Please enter a session / message number, e.g. 20.2`)   
            process.exit() 
            }
            console.log(    `  mArgs:    '${mArgs.join("', '")}`)
        if (mArgs.join("', '").match( /'\*/ ) ) { console.log( "  process.exit()" ) }

            console.log(    `  aAppName: '${aAppName}', aModel: '${aModel}', aDayTS: '${aDayTS}` )
       var  aAppPath        =  getDocsPath( aAppName, aModel )                                      // .(40715.03.5 Add chk function)
            console.log(    `  aAppPath: '${aAppPath}'`)

       var  aMarkdown_File  = `${aAppName.slice(0,3)}_{ver}_markdown`                               // .(40702.05.2 RAM New pattern)
     
            console.log(    "  aMarkdown_File: ", aMarkdown_File)
       var  aMarkdown_Saved =  getLastVer_Saved(  aAppPath,        aMarkdown_File, 'md', aDayTS )   // .(40702.05.3 RAM Use new function)
            console.log(    "  aMarkdown_Saved:", aMarkdown_Saved)

//     var  openChrome = spawn(  'cmd.exe', ['/c', 'start chrome', '--profile-directory="Profile 1"', aMarkdown_Saved ]);
//     var  openChrome = spawn(  'cmd.exe', ['/c', 'start chrome', '--profile-directory="Profile 1"', aMarkdown_Saved ]);
       var  openChrome = spawn(  'cmd.exe', ['/c', 'start chrome', aMarkdown_Saved ]);
            
            openChrome.stdout.on('data',  (data) => { console.log(  `  stdout: ${data}` ); } );
            openChrome.stderr.on('data',  (data) => { console.error(`  stderr: ${data}` ); } );
//          openChrome.on(       'close', (code) => { console.log(  `  child process exited with code ${code}`); });
            
            } // eif Step 18                                                                        // .(40717.02.6 End)
// --- ---  --------------  =  -------------------------------------------------------------



     async  function  fmtSessions( aFmter, aSessions_File_toGet) {                                                              // Step 3  fmtSession_forContinue

     const  fmtSession      =  pFmters[ `fmtSession_${aFmter}` ]     //  'fmtSession_forContinue', "fmtSession_forContinue_SessionsOnly"
//     var  aSessions       =  await fmtSession( mSessions )         //   ???
       var  mSessions       =  JSON.parse( await FRT.readFileSync( aSessions_File_toGet ) )
//          mSessions       =  mSessions.sort( (a,b) => a.CreatedOn > b.CreatedOn ? 1 : -1 )
            mSessions       =  mSessions.sort( (a,b) => a.dateCreated > b.dateCreated ? 1 : -1 )
//     var  aSessions       = (await mSessions.forEach( fmtSession )).join( "\n" )
//     var  aSessions       =                   ( mSessions.map(                              fmtSession                ) ).  join( "\n" )  // no workie
       var  aSessions       = (await Promise.all( mSessions.map(                              fmtSession                ) ) ).join( "\n" )
//     var  aSessions       = (await Promise.all( mSessions.map( async (pSession, i) => await fmtSession( pSession, i ) ) ) ).join( "\n" )
//          console.log(      JSON.stringify( aSessions, null, 2 ) )
    return  aSessions
        }   // eof fmtSessions
//     ---  --------------  =  -----------------------------------------------

     async  function  getSessions_fromContinue_forFRTables( aSessions_File_toGet ) {                                            // Step 2

//   const  getSessions     =  pFmters[ `fmtSessions_${aFmter}` ]
     const  getSessions     =  pFmters[ `fmtSessions_asTable1` ]
       var  mSessions       =  JSON.parse( await FRT.readFileSync( aSessions_File_toGet ) )
            mSessions       =  mSessions.sort( (a,b) => a.CreatedOn > b.CreatedOn ? 1 : -1 )
//     var  pTables2        =  mSessions.map( fmtSession )
       var  pTables         =  getSessions( mSessions )    // fmtSessions_asTable1
//     var  aSessions       =  pTables.join( "\n" )
//          console.log(       JSON.stringify( aSessions, null, 2 ) )
    return  pTables

            }   // eof fmtSessions_fromContinue_toFRTables
// --- ---  --------------  =  -------------------------------------------------------------

     async  function  updSessions_fromContinue_forFRTables( aSessions_File_toGet, aFRTables_File_toGet ) {                      // Step 2

//   const  getSessions     =  pFmters[ `fmtSessions_${aFmter}` ]
     const  getSessions     =  pFmters[ `fmtSessions_asTable1` ]
       var  mSessions2      =  JSON.parse( await FRT.readFileSync( aSessions_File_toGet ) )           // New and/or Old Continue Sessions JSON objects
//          mSessions2      =  mSessions2.sort( (a,b) => a.CreatedOn > b.CreatedOn ? 1 : -1 )
       var  pTables1        =  JSON.parse( await FRT.readFileSync( aFRTables_File_toGet ) )           // Old existing Sessions, Messages and  Contents in FRTables
                               getFRTables( aFRTables_File_toGet, aDayTS )                        // Old existing Sessions, Messages and  Contents in FRTables: global Tables

//     var  pTables2        =  mSessions.map( fmtSession )
//     var  pTables2        =  getSessions( mSessions2 )                                          // New and/or Old fmtSessions_asTable1 as String
//     var  aSessions       =  pTables.join( "\n" )
//          console.log(       JSON.stringify( aSessions, null, 2 ) )
//          pTables2.Sessions.forEach( pSession2  => {

            mSessions2.forEach( pSession2  => {

//           var  aOldValue =  pTables1.Sessions.find(      pSession1 => pSession1.SessionId === pSession2.SessionId )
//           var  nOldIdx   =  pTables1.Sessions.findIndex( pSession1 => pSession1.GUID === pSession2.GUID )
/*           var  nOldIdx   =  pTables1.Sessions.indexOf( aSession1 => {                          // each old record in pTables1.Sessons is a string
                          var  pSession1_GUID =  aSession1.slice(25,61)
                               pSession1_GUID == pSession2.GUID } )
*/
             var  nOldIdx = 0; pTables1.Sessions.forEach( (aSession1,i) => {                      // each o;d record in pTables1.Sessons is a string
                          var  pSession1_GUID =  `${aSession1}`.slice(25,61)
                  nOldIdx =   (pSession1_GUID == pSession2.GUID) ? i+1 : nOldIdx
//            if (nOldIdx) {   return }
                               } ) // eol for Old pTables1.Sessions

             if (!nOldIdx) {   console.log( `    Inserting New Session Object: ${pSession2.CreatedOn} ${pSession2.GUID}` )
//                             pTables1.Sessions.push( fmtSession(  pSession2) )
//                             pTables1.Messages.push( fmtMessages( pSession2.Messages ) )
//                             pTables1.Contents.push( fmtContents( pSession2.Messages.contents ) )
             } else {
             var bChanged   =  pTables1.Sessions[ nOldIdx-1 ].slice(7,23) != pSession2.CreatedOn
             if (bChanged) {   console.log( `    Updating  Old Session Object: ${pSession2.CreatedOn} ${pSession2.GUID}` )
                               fmtSessions_asTable1 ( [ pSession2 ] )
                               pTables1.Sessions[ nOldIdx-1 ] =  pSession2
//                             pTables1.Messages.filter() = pSession2.Messages
//                             pTables1.Contents.filter() = pSession2.Messages.Contents
                               }  // eif changed
                 } } ) // eol for New and/or Old mSessions2
    return  pTables1
            }   // eof updSessions_fromContinue_toFRTables
// --- ---  --------------  =  -------------------------------------------------------------

     async  function  savSessions( aFmter, aSessions_File_toGet, aSessions_File_toPut) {

     const  fmtSession      =  pFmters[ `fmtSession_${aFmter}` ]
       var  mSessions       =  JSON.parse( await FRT.readFileSync( aSessions_File_toGet ) )
            mSessions       =  mSessions.sort( (a,b) => a.CreatedOn > b.CreatedOn ? 1 : -1 )
       var  aSessions       =  ''
  for (var  i = 0; i < mSessions.length; i++) {
            aSessions      +=  await fmtSession( mSessions[i], i ) + "\n"
            }
            aSessions       =  aSessions.replace( /[\r\n]+$/, '')
                               await FRT.writeFile( aSessions_File_toPut, aSessions )
            console.log(    `  Sessions:\n`, aSessions );
            console.log(  `\n  Saved Continue Sessions file: ${aSessions_File_toPut}` )
   return [ mSessions.length, 0 ]   // [ nSession, nMessage ]

        }   // eof savSessions
// --- ---  --------------  =  -------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------

//   async  function  savSessions_forContinue( aFmter, aSessions_File_toGet, aSessions_File_toPut) {
//   async  function  savSessions_forContinue_fromContinue( aContinue_Dir, aContinue_JSONfile_toPut ) {                         // Step 1
     async  function  savSessions_forContinue_fromContinue( aContinue_Dir, aSessions_File ) {                                   // Step 1

     const  getSession      =  pFmters[ "getSession_forContinue_fromContinue" ]
       var  aFromFile       =  FRT.join( aContinue_Dir + '/sessions.json' )

       var  pStats          =  FRT.checkFile( aFromFile )
       var  aTS             =  FRT.getDate( +new Date( pStats.updatedOn ) )
//     var  aToFile         =  aContinue_JSONfile_toPut
       var  aToFile         =  FRT.join( aSessions_Dir, `Continue-sessions_u${aTS}.json` )

       var  mSessions       =  JSON.parse(       FRT.readFileSync(  aFromFile ) )
/*     var  mRecs           =  [ ]
  for (var  i = 0; i < mSessions.length; i++ ) {
       var  pSession        =                                                                     await getSession( aContinue_Dir, mSessions[i], i )
      mRecs.push( pSession )
            }  // eol  for mSessions
*/
//     var  mRecs           =                     mSessions.map(               (pSession, i) =>         getSession( aContinue_Dir, pSession, i ) )
//     var  mRecs           =  await              mSessions.map(               (pSession, i) =>         getSession( aContinue_Dir, pSession, i ) )
//     var  mRecs           =                     mSessions.map( async function(pSession, i)    { await getSession( aContinue_Dir, pSession, i } } )
//     var  mRecs           =  await              mSessions.map( async         (pSession, i) => { await getSession( aContinue_Dir, pSession, i ) } )
       var  mRecs           =  await Promise.all( mSessions.map( async         (pSession, i) =>   await getSession( aContinue_Dir, pSession, i )   ) )

                               await FRT.writeFile( aToFile, mRecs )
            console.log(  `\n  Saved Continue Sessions JSON file: ${aToFile}` )
   return [ mRecs.length, mRecs.slice(-1)[0].Messages.length ] // [ nSession, nMessage ]

        }   // eof savSessions_forAICodeR_fromContinue
// --- ---  --------------  =  -------------------------------------------------------------

     async  function  fmtSessions_forContinue_fromContinue( aContinue_Dir, aAICodeR_JSONfile_toPut ) {
            debugger
        }
// --- ---  --------------  =  -------------------------------------------------------------

     async  function  getSessions_forContinue_fromContinue( aFmter, aSessions_File_toGet, aSessions_File_toPut) {
            debugger
        }   // eof getSessions_forContinue_fromContinue
// --- ---  --------------  =  -------------------------------------------------------------

            function  getSession_fromContinue( pSession, i ) {                                                                  // Step 7
       var  aNo             = `${ i + 1 }`.padStart(3)
       var  aTitle          = `${ pSession.title }`
       var  aDateCreated    = `${ FRT.getDate( pSession.dateCreated, -1 ) }`
       var  aGUID           = `${ pSession.sessionId }`
//          aGUID           = `...${ aGUID.slice(-5) }`
            aGUID           = `${ aGUID.slice( 0, 8 )}...`
    return `${aNo}. ${aDateCreated}  ${aGUID} "${aTitle}"`
            }   // eof getSessions_forContinue_fromContinue
// --- ---  --------------  =  -------------------------------------------------------------


//   async  function  getSession_forFRTables2_fromContinue( aContinue_Dir, pSessionId, i ) {
     async  function  getSession_forContinue_fromContinue(  aContinue_Dir, pSessionId, i ) {                                    // Step 1

//   const  getMessage      =  pFmters[ "getMessage_forFRTables2_fromContinue" ]
     const  getMessage      =  pFmters[ "getMessage_forContinue_fromContinue"  ]
       var  aSession_File   = `${aContinue_Dir}/${pSessionId.sessionId}.json`
//     var  pSession        =  JSON.parse( await FRT.readFileASync( aSession_File ) )
       var  pSession        =  JSON.parse( FRT.readFileSync( aSession_File ) )
//     var  pSession        =  JSON.parse(       FRT.readFileSync(  aSession_File ) )
       var  pRec            =  { }
       pRec.No              =  i + 1
       pRec.Title           =  pSession.title
//     pRec.CreatedOn       =  FRT.getDate( pSessionId.dateCreated, -1, 5, -1 )  // 5 -> HH:MM, -1 -> convert GMT to Local
       pRec.CreatedOn       =  FRT.getDate( pSessionId.dateCreated, -1)          //-1 -> YYY-MM-DD HH:MM.SS
       pRec.GUID            =  pSessionId.sessionId
       pRec.Messages        =  pSession.history.map( ( pMessage, i ) => getMessage( pSessionId, pMessage, i ) )
    return  pRec

        }   // eof getSession_forContinue_fromContinue
// --- ---  --------------  =  -------------------------------------------------------------

//function  getMessage_forFRTables2_fromContinue( pSessionId, pMessage, i ) {
  function  getMessage_forContinue_fromContinue( pSessionId, pMessage, i ) {                                                    // Step 1

     const  getContent      =  pFmters[ "getContent_forContinue_fromContinue" ]
       var  pMessage        =  pMessage.message
       var  mContents       = (typeof(pMessage.content) == 'string') ? [ { type: 'text', content: pMessage.content } ] : pMessage.content
       var  aDayCreated     =  FRT.getDate( pSessionId.dateCreated, 3, 1 )
       var  pRec            =  { }
       pRec.No              =  i + 1
       pRec.MsgNo           =  Math.ceil( ( i + 1 ) / 2 )
//     pRec.Role            = (pMessage.role ? `${pMessage.role}:` : 'unknown:').padEnd( 9 )   // assistant
       pRec.Role            = (pMessage.role ? `${pMessage.role}`  : 'unknown')                 // assistant
       pRec.Ver             = (pRec.Role == 'system') ? 0 : ( pRec.Role == 'assistant' ? 2 : 1 )
       pRec.Commit          = 'c' +  aDayCreated + `${ pRec.MsgNo }`.padStart( 2,'0') + `.${pRec.Ver}`
       pRec.Contents        =  mContents.map( getContent )
    return  pRec

        }   // eof getMessage_forContinue_fromContinue
// --- ---  --------------  =  -------------------------------------------------------------

//function  getContent_forFRTables2_fromContinue ( pContent, i  )  {
  function  getContent_forContinue_fromContinue (  pContent, i  )  {                                                            // Step 1

       var  pRec            =  { }
            pRec.Type       =  pContent.type
//     var  aContent        =  pContent[ aType ] ? pContent[ aType ].replace( /\n/, '\\n' )  : 'no content'
       var  aContent        =  pContent[ pRec.Type ] ? pContent[ pRec.Type ] : pContent[ 'content' ]
       pRec.Content         =  aContent
    return  pRec

        }   // eof getContent_forContinue_fromContinue
// --- ---  --------------  =  -------------------------------------------------------------

     async  function fmtSession_forContinue_SessionsOnly ( pSessionId, i )   {   // Step 8, part 2

       var  aSessionFile    = `${_Continue_Dir}/${pSessionId.sessionId}.json`
//     var  pSession        =  JSON.parse( await readFile2(    aSessionFile ) )
//     var  pSession        =  JSON.parse( await FRT.readFileSync( aSessionFile ) )
       var  pSession        =  JSON.parse( FRT.readFileSync( aSessionFile ) )
       var  pStats          =  FRT.checkFile( aSessionFile )
       var  aNo             = `${ i + 1 }.`.padStart( pConstants.No_Wdt )
       var  aTitle          = `${ pSession.title }`
       var  aDateCreated    = `${ FRT.getDate( pSessionId.dateCreated, -1 ) }`
       var  aSessionId      = `${ pSession.sessionId }`
       var  nMessages       = `${ pSession.history.length }`.padStart(4)
       var  aSize           = `${ pStats.size }`.toLocaleString('en-US').padStart(9)
       var  aSession        = `${ aNo } ${ aDateCreated }  ${ aSessionId } ${ nMessages } ${aSize}  "${ aTitle }"`
    return  aSession
            }
// --- ---  --------------  =  -------------------------------------------------------------

     async  function fmtSession_forContinue( pSessionId, i ) {   // Step 3

       var  fmtMessage      =  pFmters[ 'fmtMessage_forContinue' ]
       var  aSessionFile    = `${_Continue_Dir}/${pSessionId.sessionId}.json`
//     var  pSession        =  JSON.parse( await readFileASync(    aSessionFile ) )
//     var  pSession        =  JSON.parse( await FRT.readFileSync( aSessionFile ) )
       var  pSession        =  JSON.parse(       FRT.readFileSync( aSessionFile ) )
       var  aNo             = `${ i + 1 }`.padStart(3)
       var  aTitle          = `${ pSessionId.title}`
       var  aDateCreated    = `${ FRT.getDate( pSessionId.dateCreated, -1 )}`
       var  aSession        = `${ aNo }. ${ aDateCreated }, ${ aTitle }`
//     var  aMessages       =  pSession.history.map(                  fmtMessage                            ).join( "\n" )
       var  aMessages       =  pSession.history.map( (pMessage, i) => fmtMessage( pMessage, i, pSessionId ) ).join( "\n" )
    return  aSession + '\n' +  aMessages + "\n"

        }   // eof fmtSession_forContinue
// --- ---  --------------  =  -------------------------------------------------------------

  function  fmtMessage_forContinue( pContinueMessage, i, pSessionId ) {    // Step 3

       var  fmtContent      =  pFmters[ 'fmtContent_forContinue' ]
       var  pMessage        =  pContinueMessage.message
       var  mContents       = (typeof(pMessage.content) == 'string') ? [ { type: 'text', content: pMessage.content } ] : pMessage.content
       var  aMsgNo          = `${ i + 1 }`.padStart(3)
//     var  aRole           = (pMessage.role ? `${pMessage.role}:` : 'unknown:').padEnd( 9 )   // assistant
       var  aRole           = (pMessage.role ? `${pMessage.role}`  : 'unknown')                 // assistant
//     var  aDateCreated    =  FRT.getDate( pSessionId.dateCreated )
       var  aDateCreated    =  FRT.getDate( pSessionId.dateCreated, 3, 1 )
       var  nVer            = `${ Math.ceil( ( i + 1 ) / 2 ) }`.padStart( 2, '0' )
            nVer            = `${nVer}.${(aRole == 'system') ? 0 : ( aRole == 'assistant' ? 2 : 1 )}`
       var  aCommit         = `c${aDateCreated}${nVer}`
       var  aContents       =  mContents.map( fmtContent ).join( "\n" )
       var  aMessage        = `    ${aMsgNo}. ${aCommit}_${aRole} message:\n${aContents}`
    return  aMessage

        }   // eof fmtMessage_forContinue
// --- ---  --------------  =  -------------------------------------------------------------

  function  fmtContent_forContinue ( pContent, i  )  {  // Step 3

       var  aType           =  pContent.type
       var  aContent        =  pContent[ aType ] ? pContent[ aType ] : pContent[ 'content' ]
//     var  aContent        =  pContent[ aType ] ? pContent[ aType ].replace( /\n/, '\\n' )  : 'no content'
       var  aContent        =  aContent ? aContent.replace( /[\n\r]/g, '\\n' ) : "no content"
            aContent        = (aContent.length > 92) ? wrap( aContent, 92, " ..." ) : aContent
            aContent        = `         ${ `${aType},`.padEnd(6) } ${ aContent }`
    return  aContent
//function  wrap( a, w ) { var p = a.slice( 0, w ).slice( 0, w ).split( /[ ;:>]/ ).slice(0,-1).join( ' ');
//function  wrap( a, w ) { var p = a.slice( 0, w ).lastIndexOf( " " );
  function  wrap( a, w, s ) { var p = a.slice( 0, w ).match( /([ \\\/>])(?!.*[ \\\/>])/ ).index; p = p ? p : w
//          console.log( `p: ${ p + ( w - 6 ) }  len: ${a.length} (${(((p + ( w - 6 )) < a.length) ? s : "" )})` )
    return `${ a.slice( 0, p + 1 ) }\n                ${ a.slice( p + 1, p + ( w - 6 ) ) + (((p + ( w - 6 )) < a.length) ? s : "" ) }` }

        }   // eof fmtContent_forContinue
// --- ---  --------------  =  -------------------------------------------------------------

//          // eog savSessions_forContinue_fromContinue
//          //     fmtSessions_forContinue_fromContinue
//          //     getSessions_forContinue_fromContinue
//          //     getSession_forContinue_fromContinue
//          //     getMassage_forContinue_fromContinue
//          //     getContent_forContinue_fromContinue
//          //     fmtSession_forContinue
//          //     fmtMessage_forContinue
//          //     fmtContent_forContinue
// ------------------------------------------------------------------------------------------------------------------------

     async  function  savSessions_forFRTables2_fromContinue( aContinue_Dir, aAICodeR_JSONfile_toPut ) {           // Step 2 nope

     const  getSession      =  pFmters[ "getSession_forFRTables2_fromContinue" ]
       var  aFromFile       =  aContinue_Dir + '/sessions.json'
       var  aToFile         =  aAICodeR_JSONfile_toPut
       var  mSessions       =  JSON.parse(       FRT.readFileSync(  aFromFile ) )

/*     var  mRecs           =  [ ]
  for (var  i = 0; i < mSessions.length; i++ ) {
       var  pSession        =                                                                     await getSession( aContinue_Dir, mSessions[i], i )
      mRecs.push( pSession )
            }  // eol  for mSessions
*/
//     var  mRecs           =                     mSessions.map(               (pSession, i) =>         getSession( aContinue_Dir, pSession, i ) )
//     var  mRecs           =  await              mSessions.map(               (pSession, i) =>         getSession( aContinue_Dir, pSession, i ) )
//     var  mRecs           =                     mSessions.map( async function(pSession, i)    { await getSession( aContinue_Dir, pSession, i } } )
//     var  mRecs           =  await              mSessions.map( async         (pSession, i) => { await getSession( aContinue_Dir, pSession, i ) } )
       var  mRecs           =  await Promise.all( mSessions.map( async         (pSession, i) =>   await getSession( aContinue_Dir, pSession, i )   ) )

                               await FRT.writeFile( aToFile, mRecs )
            console.log(   `   Saved Continue Sessions json file: ${aToFile}` )
   return [ mRecs.length, 0 ]  // [ nSession, nMessage ]

        }   // eof savSessions_forFRTables2_fromContinue
// --- ---  --------------  =  -------------------------------------------------------------

//   async  function  fmtSessions_forFRTables2_fromFRTables2( )
//   async  function  fmtSessions_forAICodeR(                aSessions_File_toGet, aSessions_File_toPut ) {
//   async  function  fmtSessions_forFRTables2(              aSessions_File_toGet, aSessions_File_toPut ) {
     async  function  fmtSessions_forFRTables2_fromContinue( aSessions_File_toGet, aSessions_File_toPut ) {                     // Step   none

     const  fmtSession      =  pFmters[ `fmtSession_forFRTables2` ]  // fmtSession_forAICodeR
       var  mSessions       =  JSON.parse( await FRT.readFileSync( aSessions_File_toGet ) )
       var  aSessions       =  ''
  for (var  i = 0; i < mSessions.length; i++) {
            aSessions      +=  await fmtSession( mSessions[i], i ) + "\n"
            }
            aSessions        =  aSessions.replace( /[\r\n]+$/, '')
                                await FRT.writeFile( aSessions_File_toPut, aSessions )
            console.log(     `  Sessions:\n`, aSessions );
            console.log(   `\n  Saved FRTables2 Sessions file: ${aSessions_File_toPut}` )
// return [ mSessions.length, 0 ]   // [ nSession, nMessage ]
   return [ mSessions.length,   mSessions.slice(-1)[0].Messages.length ]   // [ nSession, nMessage ]

        }   // eof fmtSessions_forFRTables2_fromContinue
// --- ---  --------------  =  -------------------------------------------------------------

//   async  function  fmtSessions_forFRTables2(   aFmter, aSessions_File_toGet, aSessions_File_toPut, nRecs) {
//   async  function  getMarkdowns_fromFRTables2(         aSessions_File_toGet, aMarkdown_File_toPut, nRecs) {  // for Step 4
     async  function  getMarkdowns_fromFRTables2(         aFRTables_File_toGet, aApp, aModel,         nRecs) {  // for Step 4

//     var  aMarkdown_File  = `docs/${aApp}/${aModel}/markdown_${aVer2}.md`
//     var  aMarkdown_Save  =  FRT.join( __basedir,  aMarkdown_File )
//     var  aMarkdown_File_toPut = aMarkdown_File_toPut.replace( __basedir )

       var  pTables         =  JSON.parse( FRT.readFileSync( aFRTables_File_toGet ) )

       var [nSession, nMsg] =  nRecs, nMsg = nMsg ? nMsg : 1    // search for message 1 if not given
       var  aMsg            =  nRecs[1] ? `.${nRecs[1]}` : ``      // or '.0'
       var  aVer2           = `u${ `${nRecs[0]}`.padStart( 2, '0') }${aMsg}.${FRT.getDate( )}`;     // console.log( `aVer2: ${aVer2}` ); process.exit()

       var  aRecs           = `${nSession},`.padStart(5) + `${nMsg}`.padStart(4)
       var  aMessage        =  pTables.Messages.filter( aMessage => aMessage.substring( 6, 15 ) == aRecs ).join( '\n' )
        if (aMessage == '') {
            console.log(  `\n* There is no ${ aMsg ? `Message No. ${nMsg} for ` : '' }Session No. ${nSession}.` )
            return ''
            }
       var  aAppName        =  aAppName ? aAppName : aMessage.slice(37, 57).replace( /[, ]/g , '')
       var  aModel          =  aModel   ? aModel   : aMessage.slice(17, 37).replace( /[, ]+/ , '')
       var  aAppName        =  chkAppDir( aAppName );                                               // .(40715.04.1 RAM )
        if (aAppName == "") {  process.exit() }

       var  aMarkdown_File  = `docs/${aAppName}/${aModel}/${aAppName.slice(0,3)}_Markdown_${aVer2}.md`
       var  aMarkdown_Save  =  FRT.join( __basedir,  aMarkdown_File ), aMarkdown_File_toPut = aMarkdown_Save

            console.log(  `\n  Saving Markdown File: ${ aMarkdown_File.split( /[\\\/]/ ).slice(   -2) .join( '/' )}
             from: FRTables-sessions_${aVer1}.db into ${aMarkdown_File.split( /[\\\/]/ ).slice( 0,-2 ).join( '/' )}` )

                               FRT.makDir( aMarkdown_File_toPut.split( /[\\\/]/ ).slice(0,-1).join( '/' ) )

        if (nRecs.length == 2) {   // for one Session, Message
//     var [nSession, nMsg] =  nRecs;
       var [aMessage, aContents, aMarkdown] =  getMarkdown_fromFRTables2( pTables, nRecs )

            console.log(  `\n  Session[${nSession}], Message[${nMsg}]:\n  ${aMessage}\n  ${aContents}` )
//     var  aRole           =  aMessage.slice(77).trim();
//          aMarkdown       =  AIC.fixMarkdown( aRole, aMarkdown )
//          console.log   `\n  Markdown Response:\n  ${aMarkdown}` )
//                             await FRT.writeFile( aMarkdown_File_toPut,,`${aMessage}\n${aContents}\n${aMarkdown}` )
//                             await FRT.writeFile(    aMarkdown_File_toPut, aMarkdown )
                               FRT.writeFile( aMarkdown_File_toPut, aMarkdown )
            console.log(  `\n  Saved Message ${nSession}.${nMsg} to Markdown File: ${aMarkdown_File_toPut}` )

       } else {                    // for all Session Messages
       var  aMarkdowns      =  "", nMsg, nSession = nRecs[0]
       var  nMessages       =  getMessages_forSession( pTables.Messages, nSession ).length
       for (nMsg = 1;  nMsg <= nMessages; ++nMsg ) {
       var [aMessage, aContents, aMarkdown] =  getMarkdown_fromFRTables2( pTables, [ nSession, nMsg ] )
            console.log(  `\n  Session[${nSession}], Message[${nMsg}]:\n   ${aMessage}\n   ${aContents} ` )
       var  aRole           =  aMessage.slice(77).trim(); aRole = `${aRole.slice(0,1).toUpperCase()}${aRole.slice(1)}`
       var  aMsgHeader      = `# ${aRole} Message ${nMsg} for Session ${nSession}:`
            aMarkdown       = (aRole == 'User') ? aMarkdown.replace( /\n/g,'   \n' ) : aMarkdown
//          aMarkdown       =  AIC.fixMarkdown( aRole, aMarkdown )
            aMarkdowns     += `\n\n<hr>\n\n${aMsgHeader}\n\n<hr>\n\n${aMarkdown}`
            }  // eol  Messages
                               await FRT.writeFile( aMarkdown_File_toPut, aMarkdowns )
            console.log(  `\n  Saved ${nMessages} Messages to Markdowns File: ${aMarkdown_File_toPut}` )
            }   }
// --- ---  --------------  =  -------------------------------------------------------------

            function  getMessages_forSession( mMessages_Table, nSession ) {
       var  aSession        = `${nSession},`.padStart(5)
       var  mMessages       =  mMessages_Table.filter( aMessage => aMessage.substring( 6, 11 ) == aSession )
     return mMessages
        }   // eof getMarkdowns_fromFRTables2
// --- ---  --------------  =  -------------------------------------------------------------

            function  getMarkdown_fromFRTables2( pTables, nRecs) {  // for Step 4

       var [nSession, nMsg] = [nRecs[0], nRecs[1]];
            nMsg            =  nMsg ? nMsg : getMessages_forSession( pTables.Messages, nSession ).length
       var  aRecs           = `${nSession},`.padStart(5) + `${nMsg}`.padStart(4)
//     var  pMessage        =  pTables.Sessions[ nSession ].Messages[ nMsg ]
//                              pTables.Messages.map( aMessage => aMessage.substring(6,15) ).join( '\n')
       var  aMessage        =  pTables.Messages.filter( aMessage => aMessage.substring( 6, 15 ) == aRecs ).join( '\n' )
       var  mContents       =  pTables.Contents.filter( aContent => aContent.substring( 6, 15 ) == aRecs )
       var  aContents       =  mContents.map( aContent => aContent.length > 95 ? `${aContent.substring(0,92)} ...` : aContent ).join( '\n' )
       var  aMarkdown       =  mContents[0] ? mContents[0].slice(38,-1).replace( /\\n/g, '\n') : ''
  return  [ aMessage, aContents, aMarkdown ]
        }   // eof getMarkdown_fromFRTables2
// --- ---  --------------  =  -------------------------------------------------------------

     async  function  getSessions_forFRTables2_fromContinue( aFmter, aSessions_File_toGet) {
            debugger
        }   // eof getSessions_forFRTables2_fromContinue
// --- ---  --------------  =  -------------------------------------------------------------

     async  function  getSession_forFRTables2_fromContinue( aFmter, aSessions_File_toGet) {
            debugger
        }   // eof getSession_forFRTables2_fromContinue
// --- ---  --------------  =  -------------------------------------------------------------

     async  function  getMessage_forFRTables2_fromContinue( aFmter, aSessions_File_toGet) {
            debugger
        }   // eof getMessage_forFRTables2_fromContinue
// --- ---  --------------  =  -------------------------------------------------------------

     async  function  getContent_forFRTables2_fromContinue( aFmter, aSessions_File_toGet) {
            debugger
        }   // eof getContent_forFRTables2_fromContinue
// --- ---  --------------  =  -------------------------------------------------------------

     async  function  fmtSession_forFRTables2( pSession, i ) {

     const  fmtMessage      =  pFmters[ `fmtMessage_forFRTables2` ]
       var  aCreatedOn      =  FRT.getDate( pSession.CreatedOn, -1 )
       var  aNo             = `${ pSession.No }`.padStart(3)
       var  aSession        = `${ aNo }. ${ aCreatedOn }, ${pSession.Title}`
       var  aMessages       =  pSession.Messages.map( fmtMessage ).join( "\n" )
    return  aSession + '\n' +  aMessages + "\n"

        }   // eof fmtSession_forFRTables2(
// --- ---  --------------  =  -------------------------------------------------------------

  function  fmtMessage_forFRTables2( pMessage, i ) {

     const  fmtContent      =  pFmters[ `fmtContent_forFRTables2` ]
       var  aNo             = `${ pMessage.No }`.padStart(4)
//     var  aRole           = (pMessage.Role ? `${pMessage.Role}:` : 'unknown:').padEnd( 9 )   // assistant
       var  aRole           =  pMessage.Role.padStart(10)
       var  nVer            =  pMessage.Ver
       var  aCommit         =  pMessage.Commit
       var  aContents       =  pMessage.Contents.map( fmtContent ).join( "\n" )
       var  aMessage        = `    ${aNo}. ${aCommit},${aRole} ${aContents}`
    return  aMessage

        }   // eof fmtMessage_forFRTables2
// --- ---  --------------  =  -------------------------------------------------------------

  function  fmtContent_forFRTables2( pContent, i )  {

       var  nWdt            =  58
       var  aType           =  pContent.Type
       var  aSize           = `${pContent.Content.length}`.padStart(9)
       var  aContent        =  pContent.Content.replace( /[\n\r]/g,'\\n' )
            aContent        = (aContent.length > nWdt) ? wrap( aContent, nWdt, " ..." ) : aContent
            aContent        = `${ `${aType},`.padEnd(6) } ${aSize}, ${ aContent }`
    return  aContent
  function  wrap( a, w, s ) {
    return `${ a.substring( 0, w ) + ( ( w < a.length ) ? s : "" ) }` }

        }   // eof fmtContent_forFRTables2
// --- ---  --------------  =  -------------------------------------------------------------
//
//          // eog savSessions_forFRTables2_fromContinue    // Step 2 nope
//          //     fmtSessions_forFRTables2_fromContinue    // Step   none
//          //     getSessions_forFRTables2_fromContinue
//          //     getSession_forFRTables2_fromContinue
//          //     getMessage_forFRTables2_fromContinue
//          //     getContent_forFRTables2_fromContinue
//          //     fmtSession_forFRTables2
//          //     fmtMessage_forFRTables2
//          //     fmtContent_forFRTables2
// ------------------------------------------------------------------------------------------------------------------------

  function  fmtSessions_asTable1( mSessions ) {                                                                                 // Step 2

//   const  fmtSession      =  pFmters[ "fmtSession_asTable1" ]
     const  fmtSession      =            fmtSession_asTable1
       var  pTables         ={"Sessions": [], "Messages": [], "Contents": []}
//                          =  await Promise.all( mSessions.map( async (pSession, i) =>   await fmtSession( aContinue_Dir, pSession, i )   ) )
                               mSessions.map( fmtSession )
    return  pTables

//     ---  --------------  =  ----------------------------------

  function  fmtSession_asTable1( pSession, i ) {                                                                                // Step 2

//   const  fmtMessage      =  pFmters[ `fmtMessage_asTable1` ]
     const  fmtMessage      =            fmtMessage_asTable1
       var  aNo             = `${ i + 1 },`.padStart( pConstants.No_Wdt )
       var  aID             = `${ pSession.No },`.padStart( pConstants.ID_Wdt, "0" )
       var  nMsgs           = `${ pSession.Messages.length },`.padStart( 4 )
       var  aGUID           = `${ pSession.GUID },`
       var  aMethod         = `${ pConstants.Method }`.padStart(4)
       var  aCreatedOn      = `${ FRT.getDate( pSession.CreatedOn, -1 ) },`.padEnd(17)  // was 19
       var  aSessionId      = `${ pSession.No },`.padStart( 4 )
//     var  aSession        = `${ aID } ${ aMethod }_${ aNo } ${ aCreatedOn } ${nMsgs} ${ aGUID } "${pSession.Title}"`
       var  aSession        = `${ aNo } ${ aCreatedOn } ${ aGUID } ${ nMsgs } ${ aMethod }_${ aID } "${pSession.Title}"`
            pTables.Sessions. push(  aSession )
            pSession.Messages. map( (pMessage, i) => fmtMessage( pMessage, i, aSessionId ) )

            }   // eof fmtSession_asTable1
//     ---  --------------  =  ----------------------------------

  function  fmtMessage_asTable1( pMessage, i, aSessionId ) {

//   const  fmtContent      =  pFmters[ `fmtContent_asTable1` ]
     const  fmtContent      =            fmtContent_asTable1
       var  aNo             = `${ pConstants.Tab1Cnt++ },`.padStart( pConstants.No_Wdt )
       var  aID             = `${ pMessage.No     },`.padStart( pConstants.ID_Wdt )
//     var  aRole           = (pMessage.Role ? `${pMessage.Role}:` : 'unknown:').padEnd( 9 )   // assistant
       var  aRole           = `${ pMessage.Role   }`.padStart(9)
       var  nVer            = `${ pMessage.Ver    },`
       var  aCommit         = `${ pMessage.Commit },`.padEnd(14)
       var  aApp            = `${ pConstants.App  },`.padEnd(24)
       var  aModel          = `${ pConstants.Model.trim() },`.padEnd(19)
       var  aMessageId      = `${ aSessionId} ${aNo}`
       var  aMessage        = `${ aNo } ${aSessionId} ${aID} ${aModel} ${aApp} ${aCommit} ${aRole} `
            pTables.Messages. push( aMessage )
            pMessage.Contents. map( (pContent, i) => fmtContent( pContent, i, aMessageId ) )

            }   // eof fmtMessage_asTable1
//     ---  --------------  =  --------------------------------------------------

  function  fmtContent_asTable1( pContent, i, aMessageId )  {

       var  nWdt            =  58
       var  aNo             = `${ pConstants.Tab2Cnt++ },`.padStart( pConstants.No_Wdt )
       var  aID             = `${ i + 1 },`.padStart( pConstants.ID_Wdt - 1)
       var  aType           = `${ pContent.Type},`.padEnd(6)
       var  aSize           = `${ pContent.Content.length},`.padStart(7).padEnd(8)
       var  aContent        =     pContent.Content.replace( /[\n\r]/g,'\\n' )
//          aContent        = (aContent.length > nWdt) ? wrap( aContent, nWdt, " ..." ) : aContent
            aContent        = `${ aNo } ${aMessageId} ${aID} ${aType} ${aSize} "${aContent}"`
            pTables.Contents. push( aContent )
  function  wrap( a, w, s ) {
    return `${ a.substring( 0, w ) + ( ( w < a.length ) ? s : "" ) }` }

            }   // eof fmtContent_asTable1
//     ---  --------------  =  --------------------------------------------------
        }   // eof getSessions_asTable1
// --- ---  --------------  =  -------------------------------------------------------------
//
//          // eog fmtSession_asTable1
//          //     fmtMessage_asTable1
//          //     fmtContent_asTable1
// ------------------------------------------------------------------------------------------------------------------------

     async  function savSession_forContinue( __sessionDir ) {

       var  mSessions       =  JSON.parse( await FRT.readFileSync( __sessionDir + '/sessions.json' ) )
    return  mSessions

        }   // eof savSession_forContinue
// --- ---  --------------  =  -------------------------------------------------------------

     async  function getSessions_forContinue( __sessionDir ) {

       var  mSessions       =  JSON.parse( await FRT.readFileSync( __sessionDir + '/sessions.json' ) )
    return  mSessions

        }   // eof getSessions_forContinue
// --- ---  --------------  =  -------------------------------------------------------------

//   async  function showSession_forContinue(  __sessionDir, aSessionsFile ) {
     async  function fmtSessions_forContinue(  __sessionDir, aSessionsFile ) {

       var  fmtSession      =  pFmters[ 'fmtSession _forContiue' ]
       var  mSessions       =  JSON.parse( await FRT.readFileSync( __sessionDir + '/sessions.json' ) )
//     var  aSessions       =  mSessions.map( await fmtSession ).join( "\n" )   // no workie
       var  aSessions       =  ''
       for (var i = 0; i < mSessions.length; i++ ) {
            aSessions      +=  await fmtSession( mSessions[i], i ) + "\n"
            }
            aSessions       =  aSessions.replace( /[\r\n]+$/, '')
                               await FRT.writeFile( aSessionsFile, aSessions )
            console.log( aSessions ); console.log( `\n  Saved Continue Sessions file: ${aSessionsFile}` )
   return [ mSessions.length, 0 ]   // [ nSession, nMessage ]

        }   // eof fmtSessions_forContinue
// --- ---  --------------  =  -------------------------------------------------------------

     async  function  getSession_forContinue( __sessionDir, nVer ) {

       var  i               = +`${nVer - 1}`.substring( 0, 2 )
//     var  aTS2            = (new Date).toISOString().replace( /[-:.]/g, '').substr(0,15)
       var  mSessions       =  JSON.parse( await FRT.readFileSync( __sessionDir + '/sessions.json') )
       var  aDayCreated     =  FRT.getDate( mSessions[i].dateCreated_session ).substr(3,11)
//     var  aMarkdownFile   = `${__sessionDir}/../${aAppName}_${aVer}\`${aDayCreated}.session.md`
       var  aSessionFile    = `${__sessionDir}/${mSessions[i].sessionId}.json`
       var  pSession        =  JSON.parse( await FRT.readFileSync( aSessionFile ))
            pSession        = { ...pSession, dateCreated : FRT.getDate( mSessions[i].dateCreated ) }
    return  pSession

        }   // eof getSession_forContinue
// --- ---  --------------  =  -------------------------------------------------------------

//          // eog savSession_forContinue
//          //     getSessions_forContinue
//          //     fmtSessions_forContinue
//          //     getSession_forContinue
// ------------------------------------------------------------------------------------------------------------------------

            function  getLastVer_Saved( aSessions_Dir, aFile_Pattern, aExt, aDayTS ) {              // .(40702.05.1 RAM Write function Beg)
//     var  aMarkdown_File  =  `${aApp.slice(0,3)}_markdown`
//     var  aMarkdown_File  =  `${aApp.slice(0,3)}_markdown_{ver}`
//     var  aMarkdown_File  =  `${aApp.slice(0,3)}_{ver}_session`

//     var  aVer2           =  getLastVer(                'FRTables-markdown', 'md', aDayTS ); // console.log( `aVer2: ${aVer2}` ); process.exit()
//     var  aVer2           =  getLastVer(                 aMarkdown_File,     'md', aDayTS ); // console.log( `aVer2: ${aVer2}` ); process.exit()
//     var  aVer2           =  getLastVer(                 aFile_Pattern,      aExt, aDayTS ); // console.log( `aVer2: ${aVer2}` ); process.exit()
       var  aVer2           =  getLastVer2( aSessions_Dir, aFile_Pattern,      aExt, aDayTS );      // .(40703.02.1 RAM Pass folder to look in)
//      if (aVer2 == "") {     process.exit() }

//     var  aMarkdown_Saved =  FRT.join( aSessions_Dir, `FRTables-markdown_${aVer2}.md` )
//     var  aMarkdown_Saved =  FRT.join( aSessions_Dir, `${aMarkdown_File}_${aVer2}.md` )
       var  aFile_SavedLast =  FRT.join( aSessions_Dir, aMarkdown_File.replace( /_{ver}/, `_${aVer2}`) + `.${aExt}` )
    return  aFile_SavedLast
            }                                                                                       // .(40702.05.1 End)
// --- ---  --------------  =  -------------------------------------------------------------

       function  getLastVer2( aSessions_Dir, aLastFile_toFind, aExt, aToday ) {                     // .(40703.02.2)
         return  getLastVer(                 aLastFile_toFind, aExt, aToday )                       // .(40703.02.3)
       function  getLastVer(                 aLastFile_toFind, aExt, aToday ) {
       var  aToday          =  aToday ? aToday : '' // FRT.getDate( ).substring( 0, 4 )  // YMMD
//          console.log(    "  aToday:", aToday )
       var  aToday          =  aToday.match( /^[1-9]{1}\./  ) ? `00${aToday}` : aToday              // .(40717.03.1 RAM Add leading 00s if not there ) 
//          console.log(    "  aToday:", aToday )
       var  aToday          =  aToday.match( /^[1-9]{2}\./ )  ? `0${aToday}` : aToday               // .(40717.03.2 RAM Add leading 0 if not there ) 
//          console.log(    "  aToday:", aToday )
       //     var  aLastFile_regEx = `${aLastFile_toFind}_u${aToday}\\.[0-9]*\\.${aExt}`
//     var  aLastFile_regEx = `${aLastFile_toFind}_t0${aToday}[0-9.]+\\.${aExt}`                    // .(40711.04.x RAM Change 'u'to 't' )
       var  aLastFile_regEx = `${aLastFile_toFind}_t${aToday}[0-9.]+\\.${aExt}`                     // .(40717.03.3 RAM Remove leading 0)
        if (aLastFile_toFind.match( /_{ver}/)) {
            aLastFile_regEx =  aLastFile_toFind.replace( /_{ver}/, `_t${aToday}[0-9.]*` ) + `.${aExt}`        // .(40717.03.3).(40711.04.x)
            }
//          console.log( `aLastFile: ${aLastFile}` )
       var  aLastFile       =  FRT.lastFile( aSessions_Dir, aLastFile_regEx )
//          console.log( `aLastFile: ${aLastFile}` ); process.exit()
       var  aVer            =  aLastFile.match( /t[0-9.]+/ ); aVer = aVer ? aVer[0].replace( /\.$/, '' ) : '' // .(40711.04.x)
        if (aVer == "" ) {
            console.log( `\n* Can't find file matching, /${aLastFile_regEx}/, since ver.date: ${aToday}*` )
            console.log(   `    in folder: ${aSessions_Dir}` )
            process.exit()
            }
    return  aVer
            }  }                                                                                    // .(40703.02.4)
// --- ---  --------------  =  -------------------------------------------------------------

            function  chkAppDir( aApp ) {                                                           // .(40715.04.2 RAM Chg name, was getApp)
            aApp            =  aApp.slice(0,3)                                                      // .(40715.04.3 RAM Pass either aApp or aAppName)
       var  aAppDir         = ''
       var  aStage          = `${ aApp.slice(0,1) == 'c' ? 'client' : 'server' }${aApp.slice(1,2)}`
            aStage          =  aApp.slice(0,1) == 'd' ? 'docs' : aStage
        if (aApp.match( /[csd]/ ) != null) {
       var  aAppDir         =  FRT.lastFile( `${__basedir}/${aStage}`, `${aApp}.*` )
//          console.log( `aAppDir: ${aAppDir}` ); process.exit()
            }
        if (aAppDir == "" ) {
            console.log(  `\n* Can't find an App Folder for ${aApp}*` )
            process.exit()
            }
    return  aAppDir
            }
// --- ---  --------------  =  -------------------------------------------------------------

            function  getFRTables( aFRTables_Dir, aDayTS ) {                                        // .(40701.05.2 RAM Was aSessions_Dir)
    if (!`${aSessions_Dir}`.match( /\.db$/)) {
       if (!aDayTS) {          aDayTS = aFRTables_Dir; aFRTables_Dir = _FRTables_Dir  }             // .(40701.05.3 RAM Check if MT)
       var  aVer2           =  getLastVer( 'FRTables-sessions', 'db', aDayTS ); // console.log( `aVer2: ${aVer2}` ); process.exit()
        if (aVer2 == "") {     process.exit() }
       var  aFRTables_File  =  FRT.join( aFRTables_Dir, `FRTables-sessions_${aVer2}.db` )           // .(40701.05.4)
        } else {
            aFRTables_File  =  aSessions_Dir
            }
//     var  aFRTables_File_toGet = aFRTables_File

       var  pTables         =  JSON.parse( FRT.readFileSync( aFRTables_File) )
            Tables =
             {  Sessions    :  pTables.Sessions.map( a => a.split( ',' ))
             ,  Messages    :  pTables.Messages.map( a => a.split( ',' ))
             ,  Contents    :  pTables.Contents.map( a => a.split( ',' ))
                }
    return  pTables
            }
// --- ---  --------------  =  -------------------------------------------------------------

