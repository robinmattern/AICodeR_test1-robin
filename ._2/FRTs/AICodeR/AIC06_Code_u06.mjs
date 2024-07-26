   import   FRT               from './AIC90_FileFns.mjs'
   import   AIM               from './AIC98_Apps-n-Models_u02.mjs'                                  // .(40722.03.x)
   import { getNextCommitNo } from './AIC89_Commit.mjs'
   import { doCommitAll     } from './AIC89_Commit.mjs'                                             // .(40718.04.5)

       var  bIsNotCalled    =  FRT.isCalled( import.meta.url, process.argv[1]);
//          console.log( bIsNotCalled ? 'not called' : 'called'    )
//          console.log( `Called: ${bIsNotCalled ? 'NO' : 'YES' }` )

      var   aModel          = 'gp4oopw GPT-4o_OpenAI-web'
//                             MCode   model engine method api              response message
       var  Models1         =
                            [ 'gp4oopw GPT-4o_OpenAI-web'          // ##    markdown, text, json (playground)
                            , 'gp4oopu GPT-4o_OpenAI-curl'         // ##    json text
                            , 'gp4oopm GPT-4o_OpenAI-node'         //       json object
                            , 'gp4oopf GPT-4o_OpenAI-fetch'        //       json object
                            , 'gp4oopc GPT-4o_OpenAI-cont'         //       markdown /share
                            , 'qw7bolu Qwen2-7b_Ollama-curl'
                            , 'qw7bolu Qwen2-7b_Ollama-node'
                            , 'qw7bolu Qwen2-7b_Ollama-cont'       // ##
                            , 'cg2bolu CodeGemma-2b_Ollama-curl'
                            , 'cg2boln CodeGemma-7b_Ollama-node'
                            , 'cg2bolc CodeGemma-7b_Ollama-cont'
                            , 'c2q5lmn Claude2-Q5_LMStudio-node'
                            , 'c2q3lmn Claude2-Q3_LMStudio-node'
                            , 'st20lmn StarCoder2_LMStudio-node'
                            , 'cl00lmn CodeLlama_LMStudio-node'
                            , 'gp4ovcp CodeParrot_VSCode-copy'
                            , 'ge15gvw Gemini1.5_Vertex-web'
                               ]

       var  aAppName        =  FRT.setPaths(       'c39_login-app' )
       var  aSessionDir     =  FRT.join(__basedir, `docs/${aAppName}/${aModel}` )
       var  aSessionsFile   =  FRT.join(__basedir, `../._/DOCs/code-sessions/Continue.dev-sessions_v${FRT._TS}.txt` )
      var __ContinueDir     =                      '/C/Users/Robin/.continue/sessions'
/*
       var  aUseContinueDir = 'get'       // save {aSessionsFile} and use last session messages markdown
       var  aUseContinueDir = 'use'       // use session messages markdown from  __ContinueDir
//     var  aUseContinueDir = 'no'        // use saved   messages markdown file in aSessionDir
        if (aUseContinueDir =='get') {
       var  mSessonMessage  =  await shoMessages_forContinue( __ContinueDir, aSessionsFile )
       var  mSessonMessage  =  [ 13, 4 ]  // returns last session number, and 0 for last message number
            }
        if (aUseContinueDir =='use') {
       var  mSessonMessage  =  [ 13, 4 ]  // message [nSession.nMessage] markdown text is in session file located in {__ContinueDir}.
            }
        if (aUseContinueDir =='no' ) {
       var  mSessonMessage  =  [  3, 1 ]  // message _u{nSession.nMessage}.md markdown file is saved in {aSessionDir}.
            }

       var  aMarkdown_File  =  await getMarkdownFile( aSessionDir, aUseContinueDir, mSessonMessage )
*/
//          getScripts( 'c23_ChatGPT-4o-session_u01.40611.151206.md' )
//          getScripts( 'Curl-ask-openap-4-lofinapp.response_v3.02.md', 'c18_login' )
//          getScripts( 'Curl-ask-openap-4-lofinapp.response_v3.02.md', 'OpenAI_API', 'c38_login-app' )
//          getScripts( 'docs/c38_App-AISessions/OpenAI_API/Session-Response-curl_u03.md', 'OpenAI_API', 'c38_login-app' )

//          savScripts( 'Session-Response-curl_u03.md', aModel, aAppName )

        if (bIsNotCalled) {
//          saveScripts(  aMarkdown_File )
//          listScripts( "E:/Repos/Robin/AIObjs_/._/DOCs/code-sessions/FRTables-markdown_u13.4.40625.1409.md" )
//          listScripts( "E:/Repos/Robin/AIObjs_/._/DOCs/code-sessions/FRTables-markdown_u13.8.40625.1452.md" )
            }

// ------------------------------------------------------------------------------------------------------------------
/*
async function getMarkdownFile( aSessionDir, aUseContinueDir, mSessionMessage ) {
       var  [ nSession, nMessage ] =  mSessionMessage
       var  aDirPath        =  await FRT.makDir( `${aSessionDir}` )                               // contains: `docs/${aAppName}/${aModel}`
       var  aApp            =  aSessionDir.match( /([cs][0-9]{2})/ ); aApp = aApp ? aApp[1] : 'c00'

//      if (typeof(mUseContinue) != 'object' ) {
        if (aUseContinueDir.match( /get|use/ )) {
       var  mSessions       =  await getContinueSessions(  __ContinueDir )

       var  nSession        =  nSession ? nSession : mSessions.length                                              // last session origin one
       var  pSession        =  await getContinueSession(   __ContinueDir, nSession )

       var  nMessage        =  nMessage ? nMessage : (pSession.history.length) - 2                               // assistent message with markdown, origin 1
       var  aVer            = `u${`${nSession}`.padStart ( 2, '0' )}.${nMessage}`, nVer = +aVer.substring(1)

       if (!pSession.history[  nMessage - 1 ]) {
            console.log(    `* Opps: Nessage No. ${nMessage} is not in Continue.dev's Session No. ${nSession}.` )
            process.exit()
            }
//     var  aMarkdown_File  =  FRT.join( aSessionDir, `${aAppName}_${aVer}\`${pSession.dateCreated}.message.md` )
//     var  aMarkdown_File  =  FRT.join( aSessionDir, `${aVer}\`${pSession.dateCreated}.message.md` )   // aka request or response
       var  aMarkdown_File  =  FRT.join( aSessionDir, `${aApp}_messages_${aVer}\`${pSession.dateCreated}.md` )      // aka request or response
       var  aMarkdown       =  pSession.history[ nMessage - 1 ].message.content
                               await FRT.writeFile(  aMarkdown_File, aMarkdown )
            console.log(    `  Saved Messages Markdown file: ${aMarkdown_File}` )
        } else {
 //    var  nVer            =  mUseContinue[0]
//     var  nMessage        =  mUseContinue[1]
       var  aVer            = `u${`${nSession}`.padStart ( 2, '0' )}.${nMessage}`, nVer = +aVer.substring(1)
//     var  aMarkdown_File  =  FRT.join( `${aSessionDir}/${aVer}\`${_TS }.message.md` )
       var  aMarkdown_File  =  FRT.join( aSessionDir, `${aApp}_messages_${aVer}\`{ymmdd.hhmm}.md` )
            }
            console.log(    `  Using Messages Markdown file: ${aMarkdown_File}` )
    return  aMarkdown_File
        }
// ------------------------------------------------------------------------------------------------------------------
*/
//    var   aScrptName      =  aMarkdown.split( "\n" )[169].match( /^.*file:* `(.+)`:/ )[1]
     async  function  listScripts(    aMarkdown_File, aModel, aAppName ) {                      // Step 5

            console.log(  `\n  Parsing aMarkdown_File: .${ aMarkdown_File.replace( /[\\\/]/g, '/' ). replace( __basedir, '' ) }` );
//     var  aMarkdown =  await FRT.readFileSync( FRT.join( aMarkdown_File ), 'utf8' );
//     var  aMarkdown =  await FRT.readFileASync( FRT.path( aMarkdown_File ), 'utf8' );
       var  aMarkdown       =  FRT.readFileSync( FRT.path( aMarkdown_File ), 'utf8' );

       var  mCodes          =  aMarkdown.split( /```|### / )
//          console.log( mCodes )
       var  mScriptNames    =  mCodes.map( (aCode, i) => {
//                         if (aCode.match( /^((File: *|`).+)\.(js|mjs|html)/ )) {
//     var  mMatch          = aCode.match(  /((File: *|`).+)\.(json|js|mjs|html)/ )                 //#.(40721.06.1)
//     var  mMatch          = aCode.match(  /((File: *|`).+)\.(json|js|mjs|html|gitgnore|env)/ )    // .(40721.06.1 RAM Add .env & .gitgnore)
       var  mMatch          = aCode.match(  /((File: *).+)\.(json|js|mjs|html|gitgnore|env)/ )      // .(40725.03.1 RAM /File: */ only)
                           if (mMatch && mMatch[1]) {
//                         var aScript = aCode.replace( /(File: *|`)/, '' ).replace( /[\n\r`]+/g, '' ).trim()
                           var aScript = mMatch[0].replace( /(File: *|`)/, '' ).replace( /[\n\r`]+/g, '' ).trim()
//                             aScript = aScript.slice(0, `${aScript} `.indexOf( ' ' )).trim()      //#.(40702.01.1 RAM No spaces in script name)
                               aScript = (aScript.indexOf( ' ' ) == -1) ? aScript : ''              // .(40702.01.1)
                           if (aScript.match(/\.(json|js|mjs|html|gitgnore|env)/)) {                // .(40721.06.2) 
                   return [ i, aScript ] } }
                               } )
            mScriptNames    =  mScriptNames.filter( a => a )    //  remove MT (undefined) rows

            mScriptNames.forEach( m => console.log( `${ `${m[0]}`.padStart(4) }. ${m[1]}` ))
     return mScriptNames
            }
// ------------------------------------------------------------------------------------------------------------------

  function  fixMarkdown( aUser, aMarkdown ) {
       var  mCodes       =  aMarkdown.split( /```|### / )
        if (aUser.match( /assistant/i)) {
//          console.log( mCodes)
            }
    return  aMarkdown
            }
// ------------------------------------------------------------------------------------------------------------------
            
     async  function  saveScripts( aMarkdown_File, aAppName, aModel, aMod ) {                      // Step 6
            aModel          =  aModel    ? aModel  :   aModel
            aAppName        = (aAppName  ? aAppName : __appname).split( /[\\\/]/ ).splice( -1 )[0]

       var  aUV             =  '_t', aTS                                                            // .(40717.05.3 RAM Always _v ??)
       var  aApp            =  aAppName.slice(0,3)                                                  // .(40718.03.1 RAM)
//     var  aUV             =  aMarkdown_File.match( /_([uv])/ ), aTS                               // .(40717.05.2)
//     var  aVersion        =  aMarkdown_File.match( /_([vu][\d.`]+)\.md/   )[1]
//     var  aVersion        =  aMarkdown_File.match( /_([vu][\d.`]+).*\.md/ )[1]                    // .(40702.05.4 RAM Adjust for new pattern)
       var  aVersion        =  aMarkdown_File.match( /_([vut][\d.`]+).*\.md/ )[1]                   // .(40717.05.3).(40702.05.4 RAM Adjust for new pattern)
            aVersion        =  aVersion.match( /`/ ) ?  aVersion.replace( /.+`/, '.') : aVersion
       var  mVersion        =  aVersion.split( "." )

        if (mVersion[1]) {                                                                         //   Has nMessage    
       var  aTS             =  mVersion.slice(3).join(".")                                          // .(40718.04.1 RAM was slice(2)).(40703.03.2 RAM Was slice(1))
//     var  aVer            =  mVersion.slice(0,2).join(".").slice(1)                               //#.(40718.04.2)
       var  aVer            =  mVersion.slice(0,3).join(".").slice(1)                               // .(40718.04.2).(40717.05.4).(40703.03.3 RAM Added)
        } else {
       var  aTS             =  FRT._TS                                                              // .(40717.05.5 RAM Not sure this is necesssary)
//     var  aVer            =  aUV + (+mVersion[0].slice(1)).toFixed( 2 ).padStart( 4, '0' );
//     var  aVer            =  aUV + (+mVersion[0].slice(1)).toFixed( 2 ).padStart( 6, '0' );
       var  aVer            = `${ +mVersion[0].slice(1)}`.padStart( 3, '0' ) + '.01.2';             // .(40718.04.3 RAM hardcode nMessage).(40717.05.6 RAM Remove aUV)
            }
            aVersion        =  aUV + aVer + '.' + aTS; mVersion = aVersion.split( "." )             // .(40717.05.7).(40703.03.4 RAM Reassigned mVersion)

       var  aStage0         =  aApp.slice(1,2) == "0" ? "" :  aApp.slice(1,2);                      // .(40721.06.1 RAM No client# is app c0#)   
       var  aClientDir      = (aApp.slice(0,1) == 'c' ? 'client' : 'server') + aStage0              // .(40721.06.1      // .(40718.03.2 RAM Use aApp)

       var  aAppDir         =  FRT.join( __basedir, aClientDir, aAppName )
//     var  aFileName       = `${aMarkdown_File.replace( /_[uv].+/, '' )}_${aVersion}.md`           // uNN.YMMDD.HHMM is now uNN.0.YMMDD.HHMM
//     var  aFileName       = `${aMarkdown_File.replace( /_[tuv].+/, '' )}_${aVersion}.md`          // tNNN.NN.N.YMMDD.HHMM is now uNN.0.YMMDD.HHMM
       var  mParts          =  aMarkdown_File.split( /[\\\/]/ ).slice(-1)[0].split( '_' )           // .(40717.05.8 RAM )
            mParts[2]       =  mParts[2].replace( /.md$/, '' );                                     // .(40717.05.9)
       var  aFileName       = `${mParts[0]}_${aMod}-${mParts[2]}_${mParts[1]}.md`                   // .(40717.05.10 RAM 'c35_ChatGPT-4o-session_u1.03`40611.1512.md'  <- c35_t020.03.1.40717.1053_markdown.md')
//     var  aAppName        =  aAppName ? aAppName : aFileName.replace( /_.+/, '' )                 // ??
//     var  aFilePath       =  FRT.join(  aAppDir,   aFileName )                                    //'c23_ChatGPT-4o-session_u1.03`40611.1512.md'
       var  aFilePath       =  FRT.join(  aAppDir,   aFileName )                                    //'c35_gp4oopm-markdown_t020.03.1.40717.1053.md'  <- c35_t020.03.1.40717.1053_markdown.md'

//     var  aVersion2       =  `_v${aVersion.slice(1)}-${aMod}`                                     //#.(40717.05.11)
       var  aVersion2       =  `_${aVersion.slice(1)}-${aMod}`                                      // .(40717.05.11 RAM Remove v)
//     var  aBackDir        = `!_${aAppName.substr(0,3)}_App-Changes`                               //#.(40718.02.1)
       var  aBackDir        = `._3/CHGs/_v${FRT._TS.slice(0,5)}/${aApp}`                            // .(40718.02.1 RAM New Backdir)
//     var  aBackPath       =  FRT.join(  aAppDir, `!_${aAppName.substr(0,3)}_App-Changes/${aModel}` )   //#.(40703.03.5)
//     var  aBackPath       =  FRT.join(  aAppDir, `!_${aAppName.substr(0,3)}_App-Changes/${aVersion2}`) //#.(40703.03.5 Was aModel)
       var  aBackPath       =  FRT.join(  aAppDir, `${aBackDir}${aVersion2}` )                      // .(40703.03.5 Was aModel)

//    ----- ----------------------------------------------------------------------

       var  mScriptNames    =  await listScripts( aMarkdown_File )
//          console.log(   "" )

       var  aMarkdown       =  await FRT.readFileSync( FRT.join( aMarkdown_File ), 'utf8' );
       var  mCodes          =  aMarkdown.split( /```|### / )

//                             mScriptNames.forEach( async (mScript, i) => savScript( mScript, aBackPath, aVer, __basedir ) )  //#.(40702.03.1 RAM Ignores awaits)
/*          await Promise.all( mScriptNames.forEach( async (mScript, i) => {                        //#.(40702.03.2 RAM Gets error: TypeError: undefined is not iterable)
                        return await savScript( mScript, aBackPath, aVer, __basedir )
                               } ) );
*/
//     var  writePromises   =  mScriptNames.forEach( async (mScript, i) => savScript( mScript, aBackPath, aVer, __basedir ) )
       var  writePromises   =  mScriptNames.map(     async (mScript, i) => {                        // .(40702.03.3 Bard Suggests this Beg)
//                        try { await savScript( mScript, aBackPath, aVer,    __basedir );          // .(40721.07.x aVer not used)
                          try { await savScript( mScript, aBackPath, aAppDir, __basedir );          // .(40721.07.x aAppDir is needed)
                                   return  Promise.resolve( );                                                  // .(40702.03.4 Bard Explicitly resolve with undefined (optional)
                           } catch ( error ) {
                       return  Promise.reject(  error ); }                                          // .(40702.03.5 Bard Reject with the error
                               } );  // eol mScriptNames.map
            await Promise.all( writePromises );                                                     // .(40702.03.3 Bard Wait for all writes to finish End)

//    ----- ----------------------------------------------------------------------

            console.log( "" )
//     var  aCommit         = `c${aVersion.substring(6,11)}.${aVer}`
//     var  aCommit         = `c${aVersion.substring(6,11)}.${aVer.substring( 1 ).replace( /[.0]+$/, '' )}`  //#4.(0703.04.1)
//     var  aCommit         = `c${mVersion[2]}.${mVersion[1]}`
       var  aCommit         =  await getNextCommitNo( )                                             // .(40703.04.1 RAM mVersion[1] S.B. Next version of the day)

//     var  aMsg            =  aMsg ? aMsg : `Update ${aAppName} to ${aVersion}`
//     var  aMsg1           = `Update ${aAppName} (${aVersion})`
//     var  aMsg2           = `Update ${aAppName.slice(0,3)} App (${aVersion2} ${aMod})`
//     var  aMsg3           = `Update re ${aMod} (${aVersion})`
       var  aMsg            = `Update ${aAppName.slice(0,3)} App (${aVersion2.slice(1)})`           // .(40718.04.4).(40703.04.2 RAM Use aVersion2)

//          console.log(  `\n  aMarkdown_File: ${aMarkdown_File}`);
//          console.log(    `  Saving commit1:  ${aCommit}_${aMsg1}` )
//          console.log(    `  Saving commit2:  ${aCommit}_${aMsg2}` )
//          console.log(    `  Saving commit3:  ${aAppName.slice(0,3)}.${aCommit.slice(1)}_${aMsg3}` )
            console.log(    `  Saving commit: "${aCommit}_${aMsg}"` )                                 // .(40703.04.3 RAM Backto aMsg )
//                             await doCommitAll( `${aCommit}_${aMsg}` )                            //#.(40718.04.7 RAM Do commit 'em)

            await doCommitAll( `${aCommit}_${aMsg}` )                                               // .(40718.04.7 RAM Do commit 'em here after changes)

//    ----- ----------------------------------------------------------------------

//    async function savScript( mScript, aBackPath_, aVer,     aBaseDir ) {                         //#.(40721.07.2)
      async function savScript( mScript, aBackPath_, aAppDir_, aBaseDir ) {                         // .(40721.07.2)
              //          console.log(    `  Saving script ${mScript[0]}: ${mScript[1]} `)
        var aScript         =  mScript[1]                                                           // .(40725.04.1)      
        var aScriptName     =  mScript[1].split(/[\\\/]/).slice(-1)[0]                              // .match( /^`(.+\.(js|mjs|html))/ )[1]
        var aScriptDir      =  mScript[1].split(/[\\\/]/).slice(0,-1).join('/')                     // .match( /^`(.+\.(js|mjs|html))/ )[1]
            aScriptDir      =  aScriptDir ? aScriptDir + '/' : ''

      if ( !mCodes[ mScript[0] + 1 ] ) {
            console.log( `\n  Saving script ${mScript[0]}: No code for script file: ${mScript[1]}.` );
            return
            }
        var aAppName        =  aAppDir_.match( /[\\\/][cs][0-9]{2}_.+/ )[0]                         // .(40721.07.3 RAM Has leaading /)
        var bStage0         =  aAppName.slice(2,3) == '0'                                           // .(40721.07.4)
        var aBackPath       =  bStage0 ? aBackPath_.replace( aAppName, '') : aBackPath              // .(40721.07.5)
        var aAppDir         =  bStage0 ? aAppDir_.replace(   aAppName, '') : aAppDir                // .(40721.07.6 RAM Remove stage for c0# apps)
        var aBakPath        =  aBackPath
        var aAppPath        =  aAppDir
        var bSaveIt         =  true                                                                 // .(40703.05.1 RAM Don't save some files)
        var aVerb           =  " Keeping"                                                           // .(40722.10.1 RAM)

//      if (aScriptName.match( /^client\/package.json/)) {                                          //#.(40725.04.x).(40723.02.1 RAM Beg)    
        if (aScript.match( /^client\/package.json/)) {                                              // .(40725.04.x) 
        var aBakPath        =  aBackPath
        var aAppPath        =  aAppDir
        var pStats          =  await FRT.checkFile( `${aAppPath}/${aScriptName}` )                  
        var bSaveIt         =  pStats.exists == false                                               
            }
//      if (aScriptName.match( /^server\/package.json/)) {                                          //#.(40725.04.x).(40723.02.1 RAM Beg)      
        if (aScript.match( /^server\/package.json/)) {                                              // .(40725.04.x) 
        var aBakPath        =  aBackPath.replace( /client/, 'server' ).replace( /c([0-9]{2})/g, 's$1' )
        var aAppPath        =  aAppDir.replace(   /client/, 'server' ).replace( /c([0-9]{2})/g, 's$1' )
//      var pStats          =  await FRT.checkFile( `${aAppPath}/${aScriptName}` )                  //#.(40721.07.x)
        var pStats          =        FRT.checkFileSync( `${aAppPath}/${aScriptName}` )                // .(40721.07.x)
        var bSaveIt         =  pStats.exists == false                                               
            }                                                                                       // .(40723.02.1 End)
//      if (aScriptName.match( /^package.json/)) {                                                  //#.(40725.04.x).(40723.02.1 RAM Beg)      
        if (aScript.match( /^package.json/)) {   // should be ok to leave this alone                //#.(40725.04.x).(40723.02.1 RAM Beg)      
        var aBakPath        =  ''
        var aAppPath        =  __basedir
//      var pStats          =  await FRT.checkFile( `${aAppPath}/${aScriptName}` )                  //#.(40721.07.x)
        var pStats          =        FRT.checkFileSync( `${aAppPath}/${aScriptName}` )              // .(40721.07.x)
        var bSaveIt         =  pStats.exists == false                                             // .(40721.07.x).(40703.05.5)
            }
        if (aScriptName.match( /^\.gitignore/)) {
        var aBakPath        =  ''                                                                   // .(40721.07.x RAM Was .vscode)  
        var aAppPath        =  __basedir
//      var pStats          =  await FRT.checkFile( `${aAppPath}/${aScriptName}` )                  // .(40721.07.x) 
        var pStats          =        FRT.checkFile( `${aAppPath}/${aScriptName}` )                  // .(40721.07.x) 
        var bSaveIt         =  pStats.exists == false                                               // .(40721.07.x).(40703.05.5)
            }
//      if (aScriptName.match( /^\.env/)) {                                                         //#.(40725.04.2) 
        if (aScript.match( /^\.env/)) {                                                             // .(40725.04.2) 
//      var aBakPath        =  aBackPath.replace( /client/, 'server' ).replace( /c([0-9]{2})/g, 's$1' )  //#.(40721.07.x)  
//      var aAppPath        =  aAppDir.replace(   /client/, 'server' ).replace( /c([0-9]{2})/g, 's$1' )  //#.(40721.07.x)  
        var aBakPath        =  ''                                                                   // .(40721.07.x)  
        var aAppPath        =  __basedir                                                            // .(40721.07.x) 
        var pStats          =  await FRT.checkFile( `${aAppPath}/${aScriptName}` )                  // .(40721.07.x) 
        var bSaveIt         =  false
        var aVerb           =  "Updating"                                                           // .(40722.10.2)
        if (pStats.exists) {                                                                        // .(40722.03.1 RAM Update .env Beg)
//      var mEnvs           =  FRT.readFileSync( `${aAppPath}/${aScriptName}` ).split( "\n" ) 
        var mEnvs           =  mCodes[ mScript[0] + 1 ].split( /[\n\r]+/).filter( a => a )
            AIM.add2Env(      `${__basedir}/.env`, mEnvs )      
            }   }                                                                                   // .(40722.03.1 End).(40721.07.x).(40703.05.5)

        if (aScript.match( /^server\/\.env/)) {                                                     // .(40725.04.3 RAM Check aScriptDir and aScriptName)
        var aBakPath        =  aBackPath.replace( /client/, 'server' ).replace( /c([0-9]{2})/g, 's$1' )  //.(40725.04.x).(40721.07.x RAM Remove)  
        var aAppPath        =  aAppDir.replace(   /client/, 'server' ).replace( /c([0-9]{2})/g, 's$1' )  //.(40725.04.x).(40721.07.x)  
//      var aBakPath        =  ''                                                                   //#.(40725.04.x).(40721.07.x)  
//      var aAppPath        =  __basedir                                                            //#.(40725.04.x).(40721.07.x) 
            aScriptDir      =  ''                                                                   //.(40725.04.x RAM Check aScriptDir and aScriptName)
//      var pStats          =  await FRT.checkFile( `${aAppPath}/${aScriptName}` )                  //#.(40721.07.x) 
        var pStats          =  FRT.checkFileSync( `${aAppPath}/${aScriptName}` )                     // .(40721.07.x) 
        var bSaveIt         =  pStats.exists == false // false                                      // .(40725.04.x RAM true if file doesn not exist)
        var aVerb           =  bSaveIt ? "Saving" : "Updating"                                      // .(40725.04.x).(40722.10.2)
//      var aVerb           =  bSaveIt ? "Keep"   : "Updating"                                      // .(40725.04.x).(40722.10.2)
        if (pStats.exists) {                                                                        // .(40722.03.1 RAM Update .env Beg)
//      var mEnvs           =  FRT.readFileSync( `${aAppPath}/${aScriptName}` ).split( "\n" ) 
        var mEnvs           =  mCodes[ mScript[0] + 1 ].split( /[\n\r]+/).filter( a => a )
            AIM.add2Env(      `${__basedir}/.env`, mEnvs )      
            }   }                                                                                   // .(40722.03.1 End).(40721.07.x).(40703.05.5)
/*      if (aScriptName.match( /^\.vscode/launch.json)) {                                           // .(40721.07.x RAM Add launcj.json Beg)
        var aBakPath        =  '.vscode'                                                            
        var aAppPath        = `{__baseDir}/.vscode`                                                            
        var pStats          =  await FRT.checkFile( `${aAppPath}/${aScriptName}` )                   
        var bSaveIt         =  pStats.exists == false                                               
            } */                                                                                    // .(40721.07.x End)
        if (aScriptDir.match( /^\.vscode/) && aBakPath != '.vscode') {                              // .(40721.07.x RAM Is any file in .vscode ok to save if it doesn't exist)
        var aBakPath        =  ''                                                            
//      var aAppPath        =  `${__basedir}/.vscode`                                               //#.(40723.03.1).(40721.07.x RAM was aBackpath)             
        var aAppPath        =  __basedir                                                            // .(40723.03.1).(40721.07.x RAM was aBackpath)             
//      var pStats          =  await FRT.checkFile( `${aAppPath}/${aScriptName}` )                  //#.(40723.03.2)     
        var pStats          =  await FRT.checkFile( `${aAppPath}/${aScriptDir}/${aScriptName}` )    // .(40723.03.2 RAM How about this)                    
        var bSaveIt         =  pStats.exists == false                                               // .(40703.05.7 RAM Was just false) 
            }
        if (aScriptDir.match( /^client/) && bSaveIt == false) {                                     // .(40725.04.x RAM Don't doit it)  
            aScriptDir      =  aScriptDir.replace(/client\//,'')   // subfolder, if any 
        var aBakPath        =  aBackPath
        var aAppPath        =  aAppDir
            }
        if (aScriptDir.match( /^server/) && bSaveIt == false) {                                     // .(40725.04.x RAM Don't doit it)  ) {
            aScriptDir      =  aScriptDir.replace(/server\//,'')   // subfolder, if any 
        var aBakPath        =  aBackPath.replace( /client/, 'server' ).replace( /c([0-9]{2})/g, 's$1' )
        var aAppPath        =  aAppDir.replace(   /client/, 'server' ).replace( /c([0-9]{2})/g, 's$1' )
            }
//         console.log(    `  Saving script ${mScript[0]}: ${ aAppPath.replace( /[\\\/]/g, '/' ).replace( aBaseDir, '' ).replace( /[\\\/]/g, "/" )}/${ aScriptDir }${ aScriptName } (${ aScriptType }):` )
//         return
//                       await FRT.makDir(     FRT.join( aAppPath,  aScriptDir ) )                          //#.(40702.02.1 RAM was aAppDir) { recursive: true } ) )  create parent directories
//                       await FRT.makDir(     FRT.join( aAppPath,  aScriptDir ) )                          //#.(40702.02.1 RAM was aAppDir) { recursive: true } ) )  create parent directories
           console.log( "" )
//                             FRT.makDirSync( FRT.path( aBakPath,  aScriptDir ) )                          //#.(40722.08.1).(40702.02.2 RAM was aBackPath)
               if (aBakPath) { FRT.makDirSync( FRT.path( aBakPath,  aScriptDir ) ) }                        // .(40722.08.1).(40702.02.2 RAM was aBackPath)
               if (bSaveIt ) { FRT.makDirSync( FRT.path( aAppPath,  aScriptDir ) ) }                        // .(40722.08.2).(40702.02.3 RAM was aAppDir) { recursive: true } ) )  create parent directories
//                             fsync.mkdirSync( FRT.join( __appname, aScriptDir ) )                         //#, { recursive: true } ) )  create parent directories
//                             fsync.mkdirSync( FRT.join( aBackPath, aScriptDir ) )
//                             fs.mkdir(        FRT.join( aBackPath.replace( /!/, "^!" ), aScriptDir ) )
//                             fs.mkdir(        FRT.join( aBackPath.replace( /!/, "_" ), aScriptDir ) )

//      var aScriptVer      =  aScriptName.replace( /\./, `_${aVersion}.` )                                 //#.(40703.01.1)
//      var aScriptVeer     =  aScriptName                                                                  // .(40703.01.1 RAM No version, it's part of folder name)

        var aScriptCode     =  mCodes[ mScript[0] + 1 ]
        var aScriptType     =  aScriptCode.substring( 0, aScriptCode.match( /[\r\n]+/ ).index )     //   indexOf( '\n' ) )
//          aScriptCode     =  aScriptCode.replace( /.+[\n\r]+/, '' )   //   indexOf( '\n' ) + 1 )  //#.(40725.05.1 RAM Opps)    
            aScriptCode     =  aScriptCode.replace( /^[\n\r]+/, '' ).replace( /[\n\r]+$/, '' )      // .(40725.05.1 RAM Opps)    
//          aScriptCode     =  aScriptCode.replace( /\/\/.+[\n\r]+/, '' )   //  filename comment

//          console.log(    `  --------------------------------------------------------------------------------------------------------------` )

        if (aBakPath) {                                                                                     // .(40722.08.3)
//                       await  fs.writeFile(  FRT.join( aBackPath, aScriptDir, aScriptVer  ), aScriptCode) //#.(40702.02.3) 
//                       await FRT.writeFile(  FRT.join( aBackPath, aScriptDir, aScriptVer  ), aScriptCode) //#.(40703.01.2).(40702.02.3) 
                               FRT.writeFile(  FRT.join( aBakPath,  aScriptDir, aScriptName ), aScriptCode) // .(40703.01.2 RAM Was aScriptVer).(40702.02.3)
//          console.log(  `\n  Saving backup ${mScript[0]}: .${ aBakPath.replace( /[\\\/]/g, '/' ).replace( aBaseDir, '' ).replace( /[\\\/]/g, "/" )}/${ aScriptDir }${ aScriptVer}` )  //#.(40703.01.3)
//          console.log(  `\n  Saving backup ${mScript[0]}: .${ aBakPath.replace( /[\\\/]/g, '/' ).replace( aBaseDir, '' ).replace( /[\\\/]/g, "/" )}/${ aScriptDir }${ aScriptName}` ) // .(40703.01.3)
            console.log(    `  Saving backup ${mScript[0]}: .${ aBakPath.replace( /[\\\/]/g, '/' ).replace( aBaseDir, '' ).replace( /[\\\/]/g, "/" )}/${ aScriptDir }${ aScriptName}` ) // .(40703.01.3)
//          console.log(    `  Saving backup: ${ aBackPath }/${ aScriptDir }/${ aScriptVer }` )
            }                                                                                               // .(40722.08.3)
        if (bSaveIt) {                                                                                      // .(40703.05.9 )
//                       await  fs.writeFile(  FRT.join( __appname, aScriptDir, aScriptVer ), aScriptCode ) //#.(40702.02.4)
//                       await FRT.writeFile(  FRT.join( __appname, aScriptDir, aScriptVer ), aScriptCode ) //#.(40703.01.4).(40702.02.4)
                               FRT.writeFile(  FRT.join( aAppPath,  aScriptDir, aScriptName), aScriptCode ) // .(40703.01.4).(40702.02.4)
//          console.log(    `                 ${ FRT.join( __appname, aScriptDir, aScriptName) }` )
            console.log(    `  Saving script ${mScript[0]}: .${ aAppPath.replace( /[\\\/]/g, '/' ).replace( aBaseDir, '' ).replace( /[\\\/]/g, "/" )}/${ aScriptDir }${ aScriptName } (${ aScriptType }):` )  // .(40703.01.5)
        } else {                                                                                            // .(40703.05.10 Beg)
//                              FRT.writeFile( FRT.join( aAppPath,  aScriptDir, aScriptName), aScriptCode ) //# .(40725.04.x RAM Updated above, not here)
//          console.log(    `   Keeping file ${mScript[0]}: .${ aAppPath.replace( /[\\\/]/g, '/' ).replace( aBaseDir, '' ).replace( /[\\\/]/g, "/" )}/${ aScriptDir }${ aScriptName } (${ aScriptType }):` )  //#.(40722.10.3).(40703.01.6)
            console.log(    `  ${aVerb} file ${mScript[0]}: .${ aAppPath.replace( /[\\\/]/g, '/' ).replace( aBaseDir, '' ).replace( /[\\\/]/g, "/" )}/${ aScriptDir }${ aScriptName } (${ aScriptType }):` )  // .(40722.10.3).(40703.01.6)
                               }                                                                            // .(40703.05.11 End)
//          console.log(    `  --------------------------------------------------------------------------------------------------------------` )
//          console.log(    `    ${ aScriptCode.replace( /[\r\n]+/g, "\n    " ) }` )
            } // eof savScript()
//      ----------------------------------------------------------------------------------------------
        } // eof getScripts()
// ------------------------------------------------------------------------------------------------------------------

function  fmtCurlScript( pContent, i, aMessageId )  {
    var  aCurlRequest_File =  aRequest_File.replace( /.mjs/, 'sh' )
    var  aScript           =  FRT.readFileSync( aCurl_Template )

       }   //
// --- ---  --------------  =  -------------------------------------------------------------

export default { saveScripts, listScripts, fixMarkdown }
