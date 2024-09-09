   import { spawn }           from 'child_process';
   import { exec  }           from 'child_process';                                     // .(40815.03.x RAM Import it)
   import { createInterface } from 'node:readline/promises';

   import   FRT               from './AIC90_FileFns_u03.mjs'
// import   AIM               from './AIC98_Models_u01.mjs'                             // not ../._2/FRTs/AICodeR/AIC98_Models_u01.mjs';
   import   AIM               from './AIC98_Apps-n-Models_u03.mjs'                      // .(40907.01.5 RAM New Version).(40719.01.x RAM Change file name)

//     var  __basedir      =  FRT.__basedir                                             // .(40819.10.8)
//     var  __dirname      =  FRT.__dirname                                             // .(40819.10.9)

       var  readline       =  createInterface( { input: process.stdin, output: process.stdout } );
//     var  Apps           =  AIM.Apps                                                  //#.(40907.01.7)
//     var  Models         =  AIM.Models                                                //#.(40907.01.7)
       var  getModels      =  AIM.getModels                                             //#.(40819.05.1 RAM Do we need these? Yes).(40727.03.4)
       var  setArgs        =  AIM.setArgs                                               //#.(40819.05.2).(40728.01.3)
       var  getModel       =  AIM.getModel                                              // .(40718.01.2)
       var  getApp         =  AIM.getApp                                                // .(40718.01.3)
       var  getDocsPath    =  AIM.getDocsPath                                           // .(40819.05.1 End).(40728.01.3)

// --- ---  -------------  =  -------------------------------------------------------------

//          main( 'c42_whatever' )
//          main( 'c42_whatever', 17 )
//          main( 'c01_Calendar-app',  )

//          createAppFolders( 'c01', ' gp4oopu')
//          createAppFolders( 'c01', ' gp4oopx')
//          createAppFolders( 'c01', ' gp4oopm')
       var  bIsNotCalled    =  FRT.isCalled(import.meta.url) == true
//          console.log( `  bIsNotCalled: ${bIsNotCalled}, process.argv[2]: '${process.argv[2]}'` )

        if (bIsNotCalled && process.argv[2]) {                                                      // .(40731.03.x RAM if bCalled)
            process.argv =  process.argv.slice(1)
       var  aCmd  = (process.argv[1] == 'newSession'  ) ? 'newSession'  : ''
            aCmd  = (process.argv[1] == 'delSession'  ) ? 'delSession'  : aCmd                      // .(40801.07.9)
            aCmd  = (process.argv[1] == 'edtSysMsg'   ) ? 'edtSysMsg'   : aCmd                      // .(40820.04.5)
            aCmd  = (process.argv[1] == 'newPrompt'   ) ? 'newPrompt'   : aCmd
            aCmd  = (process.argv[1] == 'opnPrompt'   ) ? 'opnPrompt'   : aCmd                      // .(40731.02.8)
            aCmd  = (process.argv[1] == 'newMarkdown' ) ? 'newMarkdown' : aCmd
            aCmd  = (process.argv[1] == 'opnMarkdown' ) ? 'opnMarkdown' : aCmd                      // .(40731.02.9)
            aCmd  = (process.argv[1] == 'newApp'      ) ? 'newApp'      : aCmd

            aCmd  = (process.argv[1] == 'setApp'      ) ? 'setApp'      : aCmd                      // .(40826.09.14)
            aCmd  = (process.argv[1] == 'setModel'    ) ? 'setModel'    : aCmd                      // .(40826.09.15)
            aCmd  = (process.argv[1] == 'shoVars'     ) ? 'shoVars'     : aCmd                      // .(40826.09.16)

//          aCmd  = 'newSession'
//          aCmd  = 'newMarkdown'

        if (aCmd == "") {
            console.log( "\n* Missing command. Did you  mean: edit system prompt, open prompt" )
            console.log( "                                or: new session, new prompt or open response" )
            process.exit()
        } else {
//         console.log( `\n  Running command: ${aCmd}`)
            }

        var aCR   = "\n"                                                                            // .(40729.03.1 RAM Will this work)
        if (aCmd == 'newSession'   ) { await makNewSession( ) }
        if (aCmd == 'delSession'   ) { await delSession( ) }                                        // .(40801.07.10)
        if (aCmd == 'edtSysMsg'    ) { await opnFile( 'systmsg_', 'txt' ) }                         // .(40820.04.5)
        if (aCmd == 'newPrompt'    ) { await makPrompt( 'new' ) }                                   // .(40730.02.1)
        if (aCmd == 'opnPrompt'    ) { await makPrompt( 'open' ) }                                  // .(40730.02.2)
        if (aCmd == 'newMarkdown'  ) { await makResponse( 'new' ) }                                 // .(40730.02.3)
        if (aCmd == 'opnMarkdown'  ) { await makResponse( 'open' ) }                                // .(40730.02.4)
        if (aCmd == 'newApp'       ) { await createAppFolders( ) }                                  // .(40728.02.18 End)

        if (aCmd == 'shoVars'      ) { await setVars( 'set', 'sho' ) }                              // .(40826.09.17)
        if (aCmd == 'setApp'       ) { await setVars( 'set', 'app' ) }                              // .(40826.09.18)
        if (aCmd == 'setModel'     ) { await setVars( 'set', 'model' ) }                            // .(40826.09.19)

            process.exit()                                                                          // .(40730.03.1 RAM Seems to be needed)
            }  // eof process.argv[2]                                                               // (40731.03.x
// ---------------------------------------------------------------------------

     async  function  setVars( aTable, aRow, aItem ) {                                              // .(40826.09.1 RAM Create setVars Beg)

//     var  aTable         =  process.argv.length > 2 ? process.argv[2] : ''
//     var  aRow           =  process.argv.length > 3 ? process.argv[3] : ''
       var  aItem          =  aItem ? aItem  : (process.argv.length > 2 ? process.argv[2] : '')     // .(40826.09.2 RAM Was [4])

// -------------------------------------------------------------

  function  shoVars( ) {                                                                            // .(40826.12.1 RAM Write shoVars)
       var  mEnvs1        =   Object.entries( process.env ).filter( mEnv => mEnv[0].slice(0,4) == `FRT_` )
       var  mEnvs1        =   mEnvs1.map( mEnv => `${ mEnv[0].padEnd(12) } = "${mEnv[1]}"` )
            console.log( "" )
            console.log(   `  ${mEnvs1.join("\n  ") }`)
            }  // eof shoVars
// -------------------------------------------------------------

        if (aTable == 'set' && aRow.slice(0,3) == 'sho' ) {                                         // .(40717.01.3 RAM Add set show)
            shoVars()
            process.exit()
            }  // eof setVars( 'set', 'sho' )
// -------------------------------------------------------------

   if (aTable == 'set' && aRow.slice(0,3) == 'app' ) {
//     var  aRow            =  process.argv.length > 4 ? process.argv[4] : aRow
//     var  aAppName        = (getApp(   1, aItem )[2] || '').trim()                                //#.(40718.09.15)
            aItem           =  aItem ? aItem : await chkApp( )                                      // .(40826.09.3 RAM Ask if not given)
       var  aAppName        = (getApp(   1, aItem,  2 ))         // (()[2] || '').trim()            // .(40718.09.15)
        if (aAppName == "") {
            console.log( `\n* Invalid app: '${aItem}'` )
            process.exit()
            }
//          console.log( `\n  Setting app to: '${aAppName}'` )
//          process.env[     "FRT_APP"] = aAppName
                              AIM.setEnv( "App", aAppName )                                         // .(40826.09.4)
                              shoVars()                                                             // .(40826.12.2)
            process.exit()
            }  // eof setVars( 'set', 'app' )
// -------------------------------------------------------------

    if (aTable == 'set' && aRow.slice(0,3) == 'mod' ) {
//     var  aRow            =  process.argv.length > 4 ? process.argv[4] : aRow
            aItem           =  aItem ? aItem : await ask4Model( )                                   // .(40826.09.5 RAM Ask if not given)
       var  nFld            =  aItem.length > 7 ? 2 : (isNaN(aItem) ? 1 : 0)                        // .(40826.09.6 RAM What to look for)
//          console.log( `  nFld: ${nFld} `)
       var  aModel          = (getModel( nFld, aItem,  2 ))         // (()[2] || '').trim()         // .(40826.09.7 RAM Was: nFld = 1).(40718.09.16)
            aModel          =  (nFld == 0) ? aModel[2].trim() : aModel                              // .(40906.03.1 RAM Add trim()).(40826.09.8 RAM nFld = 0 return whole row)
        if (aModel == "") {
            console.log( `\n* Invalid model: '${aItem}'` )
            process.exit()
            }
//          console.log( `\n  Setting model to: ${aItem}  ${aModel}' ` )
//          process.env[     "FRT_MODEL"] = aModel
                              AIM.setEnv( "Model",  aModel )                                        // .(40826.09.9)
                              shoVars()                                                             // .(40826.12.3)
            process.exit()
            }  // eof setVars( 'set', 'model' )
// -------------------------------------------------------------
        }  // eof setVars                                                                           // .(40826.09.1 End)
// --- ---  -------------  =  -------------------------------------------------------------

     async  function chkApp( aApp ) {                                                   // .(40719.01.x RAM Write chkApp Beg)
//      var aCR     = "\n"                                                              // .(40729.03.x)
            aApp    = (aApp === undefined || aApp == null) ? "" : aApp
        if (aApp == "") {  aCR = ""
            aApp    =  await readline.question( '\n  Enter an App to use for this App/Model (or help): ' )
            }
        if (aApp   == "") {
            console.log( "* You must enter an app alias, e.g. c11")
            process.exit(1)
            }
            var  aAppName    = (aApp == 'help') ? "" : aApp
        if (isNaN(aApp) == false) {
        var mApp    =  getApp( 0, aApp )               // returns whole row for app number or ''
        } else {
        if (aApp > "") {
        if (aApp.length > 3 && aApp != 'help' ) {                                       // .(40725.02.1 RAM Add help check)
            aApp    =  getApp( 1, aApp.slice(0,3).toLowerCase())
            }
//      var mApp    =  getApp( 1, aApp.toLowerCase() )
        var mApp    =  getApp( aApp.toLowerCase() )   // returns whole row for app alias, or ''
            } }  // eif (isNaN(aApp) != false)
//      -----------------------------------------------------

            mApp      =  mApp[0] ? mApp : ['','','']                                    // .(40827.07.1 RAM Was: ? mApp. Shouldn't contain all apps)
        var aAppName1 =  mApp[2] ? mApp[2].trim() : ''
        if (aAppName1 == "") {
        if (aAppName) {
            console.log( aCR + `* Invalid App alias, ${aAppName}`); aCR = "" }          // .(40729.03.4)
            console.log(    "  Here is a list of App you can choose from:")
            console.log(       getApp( ).map( aRec => "  " + aRec.join( "  " ) ).join ( "\n" ) )
        if (!aAppName) {
        if (aApp != 'help') {
            console.log( "\n* You must enter an App alias.") } }
            }
//          console.log( "  aApp: ask again", aApp)
//          console.log( "  aAppName1:", aAppName1)

        if (aAppName1 == '' ) {
            aAppName1 = await chkApp()                                                  // .(40727.02.1 RAM Opps)
            }
//          console.log( aCR )
    return  aAppName1
            }  // eof chkApp                                                            // .(40719.01.x End)
// --------------------------------------------------------------

     async  function ask4Model( aMod ) {
        var aModel  =  aMod
 //     var aCR     = "\n"                                                              // .(40729.03.2)
        var aMod1   = (aMod === undefined || aMod == null) ? "" : aMod
        if (aMod1 == "") { // aCR = ""                                                                    // .(40826.11.1)
            aMod1   =  await readline.question( `${aCR}  Enter a Model to use for this App/Model (or help): ` ) // .(40826.11.2 RAM Use aCR)
            aCR     = "\n"                                                                                // .(40826.11.3)
            }
        if (aMod1 == "") {
            console.log( "* You must enter a Model alias, e.g. gp4oopu. ")
            process.exit(1)
            }
            aMod    =  aMod1 == 'help' ? "" : aMod1                                     // .(40727.05.1 RAM Could remove this)
        if (isNaN(aMod1) == false) {
//      var mModel  =  getModel( 0, aMod )  // returns whole row for model number or '' //#.(40727.04.1)
        var mModels =  getModels(0, aMod1 ) // returns whole row for model number or '' // .(40727.04.1 Use getModels)
        } else {
        if (aMod  > "") {
//          console.log( "aMod, aMod1", aMod, aMod1)
        if (aMod1.length > 7 && aMod1 != 'help' ) {                                     // .(40725.02.2 RAM Add help check)
//      var aMod1   =  getModel(  2, aMod1, 1)
        var mMods1  =  getModels( 2, aMod1 )                                            // .(40727.04.2 Use getModels)
            }
        if (aMod1.length < 8 && aMod1 != 'help' ) {                                     // .(40727.04.3 Check model aliases)
        var mMods1  =  getModels( 1, aMod1 )                                            // .(40727.04.4)
            }
//      var mModel  =  getModel( aMod1 )    // returns whole row for app alias, or ''   //#.(40727.04.5)
        var mModels =  mMods1               // returns multiple rows, or no rows        // .(40727.04.5)
            }   }
            mModels =  aMod1 == 'help' ? [] : mModels                                   //  .(40727.04.6)
//      -----------------------------------------------------
//          console.log( "  mModels.lenght:", mModels.length )
//          mModels =  mModels[0] ? mModels : ['','','']                                //#.(40727.04.6)
        if (mModels.length == 1) {                                                      // .(40727.04.7 RAM Assume array Beg)
        var aModel1 =  mModels[0][2] ? mModels[0][2].trim() : ''
        } else {
            aModel1 =  ''
            }                                                                           // .(40727.04.7 End)
        if (aModel1 == "" || aMod1 == 'help') {
//      if (aMod1) {                                                                    //#.(40727.04.8)
        if (mModels.length == 0 && aMod1 != 'help' ) {                                  // .(40727.04.8)
            console.log( aCR + `* Invalid Model Alias, ${aMod1}`)
            }
            console.log(    "  Here is a list of Models you can choose from:")
//          console.log(       getModel( ).map( aRec => "  " + aRec.join( "  " ) ).join ( "\n" ) )
        var mModels2  =        mModels
        var mModels2  = (mModels2.length == 0) ? getModels( 2, aMod1 ) : mModels2
            mModels2  = (mModels2.length == 0) ? getModels( 1, aMod1 ) : mModels2
            mModels2  = (mModels2.length == 0) ? getModel( ) : mModels2
//          console.log( mModels2.map( aRec => "  " + aRec.join( "  " ) ).join ( "\n" ) )
            console.log( mModels2.map( m => { m[0] = `${m[0]}`.padStart(4); return m.join( '  ' ) } ).join( '\n' ) );      // .(40821.01.2 RAM Format No.)
            }
        if (!aModel) {
        if (aMod == 'help') {
            console.log( "\n* You must enter a Model.") }
            }
//          console.log( "aMod, aMod1, aModel, aModel1", aMod, aMod1, aModel, aModel1)
        if (aModel1 == '' || aMod1 == 'help') {
            aModel1   =  await ask4Model()                                              // .(40727.02.1 RAM Opps)
            }
    return  aModel1
            console.log( "  aModel1:", aModel1)
            process.exit()
            }  // eof ask4Model
// --------------------------------------------------------------
/*
//          console.log( `chkApp( "c88"             ): '${await chkApp( "c88"              )}'` )  // returns '' (not found)
            console.log( `chkApp( "c01"             ): '${await chkApp( "c01"              )}'` )  // returns name
            console.log( `chkApp( "c01_calendar-app"): '${await chkApp( "c01_calendar-app" )}'` )  // returns name
//          console.log( `ask4Model( "gp4oopx"           ): '${await ask4Model( "gp4oopx"            )}'` )  // returns '' (not found)
            console.log( `ask4Model( "gp4oopu"           ): '${await ask4Model( "gp4oopu"            )}'` )  // returns name
            console.log( `ask4Model( "GPT-4o_OpenAI-curl"): '${await ask4Model( "GPT-4o_OpenAI-curl" )}'` )  // returns name
            console.log( `ask4Model( "GPT-4o_OpenAI-xxxx"): '${await ask4Model( "GPT-4o_OpenAI-xxxx" )}'` )  // returns '' (not found)
            process.exit()
            console.log( `getApp(    "c88"    ): '${getApp(    "c88"    )}'` )  // returns '' (not found)
            console.log( `getApp( 0, "c88"    ): '${getApp( 0, "c88"    )}'` )  // returns '' (not found)
            console.log( `getApp( 0,  99      ): '${getApp( 0,  99      )}'` )  // returns '' (not found)
            console.log( `getApp(    "c01"    ): '${getApp(    "c01"    )}'` )  // returns whole row
            console.log( `getApp( 0,  1       ): '${getApp( 0,  1       )}'` )  // returns whole row
            console.log( `getApp( 0, '1.'     ): '${getApp( 0, "1."     )}'` )  // returns whole row
            console.log( `getApp( 2, "c01"    ): '${getApp( 2, "c01"    )}'` )  // returns trimmed( value ) or '', not whole row as before
            console.log( `getApp( 1, "c01", 0 ): '${getApp( 1, "c01", 0 )}'` )  // returns row number
            console.log( `getApp( 1, "c01", 2 ): '${getApp( 1, "c01", 2 )}'` )  // returns name
            console.log( `getApp( 1, "c01_calendar-app" ): '${getApp( 1, "c01_calendar-app" )}'` )  // returns '' (not found)
            console.log( `getApp( 2, "c01_calendar-app" ): '${getApp( 2, "c01_calendar-app" )}'` )  // returns name
            console.log( `getApp( 2, "c01"              ): '${getApp( 2, "c01"              )}'` )  // returns name
            process.exit()
*/
// --------------------------------------------------------------

     async  function  makNewSession( nSession, bCalled ) {                              // .(40730.07.1 RAM Add bCalled).(40728.01.1 RAM Write makNewSession)
//     var  mFile     =  getLastFile( 'markdown' )                                      //#.(40827.11.1 RAM Tries to find nSession in mArgs, not quietly)
       var  mFile     =  getLastFile( 'markdown', 'md', '000', true )                   // .(40827.11.1)
            nSession  =  process.argv[2] ? process.argv[2] : nSession                   // .(40827.11.2 RAM seems to be there).(40730.01.1 RAM Use Argv if exists)
            nSession  =  bCalled ? undefined : nSession                                 // .(40730.07.2)

       if (!nSession) {  aCR ? console.log( "" ): ''; aCR = ""                          // .(40729.03.5)
       var  nSession1 = (mFile[2].slice( 1, 4 ) * 1 ) + 1                               // .(40822.02.1 RAM Beg)
       var  aSession  =  await readline.question( `  Enter a new session number: ${nSession1}: ` )
            nSession  = `${ aSession ? aSession : nSession1 }`                          // .(40822.02.1 End)
            }
        if (nSession.match( /[0-9]{1,3}/ ) == null) {
            console.log( "* You must enter a valid number for the session.")
            process.exit(1)
            }
//          console.log( `  nSession: ${nSession}`); process.exit()
       var  aSession  = `${nSession * 1}`.padStart(3,'0')
       var  aVer1     = `t${aSession}.01.1.${FRT._TS}`
       var  aVer2     = `t${aSession}.01.2.${FRT._TS}`
       var  aVer3     = `t${aSession}.01.3.${FRT._TS}`                                  // .(40826.03.1 RAM Change nTyp to 1,2,3)
//     var  aDir      = `${__basedir }/docs/${mFile[0]}/${mFile[1]}`
//     var  aNewFile  = `${mFile[0].slice(0,3)}_${aVer}_markdown.md`
//                       FRT.writeFileSync( FRT.path( aDir, aNewFile ), '')
       var  aNewFile  =  copyLastFile( 'markdown', 'md',   aVer3 )                      // .(40826.03.6).(40822.02.2)
        if (!aNewFile) {                                                                // .(40908.03.1 RAM Beg)
            console.log( '* Please make an App/Model for this session')
            process.exit()
            }                                                                           // .(40908.03.1 End)
                         copyLastFile( 'systmsg_', 'txt',  aVer1 )                      // .(40822.02.3)
                         copyLastFile( 'usermsg_', 'txt',  aVer1 )                      // .(40822.02.4)
                         copyLastFile( 'messages', 'json', aVer2 )                      // .(40826.03.2).(40823.03.1)
                         copyLastFile( 'request_', 'json', aVer2 )                      // .(40826.03.3).(40823.02.2)
                         copyLastFile( 'request_', 'sh',   aVer2 )                      // .(40826.03.4).(40823.02.3)
                         copyLastFile( 'request_', 'mjs',  aVer2 )                      // .(40826.03.5).(40823.02.4)

        if (bCalled != "1") {                                                           // .(40731.03.1)
            console.log( "\n  Creating new Session (markdown.md) file: ")                // .(40730.08.1)
            console.log(   `    code "docs/${mFile[0]}/${mFile[1]}/${aNewFile}"`)       // .(40730.08.2)
            }                                                                           // .(40731.03.2 )
    return  aSession
            }  // eof makNewSession                                                     // .(40728.01.1 End)
// --------------------------------------------------------------
/*
            console.log( `  getSessionMsg(   ): ${ await getSessionMsg(   ) }` )
            console.log( `  getSessionMsg( 1 ): ${ await getSessionMsg( 1 ) }` )
            console.log( `  getSessionMsg( 0 ): ${ await getSessionMsg( 0 ) }` )
            process.argv[2] = 4523
            console.log( `  getSessionMsg(   ): ${ await getSessionMsg(   ) }` )
            process.argv[2] = 23
            console.log( `  getSessionMsg(   ): ${ await getSessionMsg(   ) }` )
            console.log( `  getSessionMsg( 1 ): ${ await getSessionMsg( 1 ) }` )
            process.argv[3] = 523
            console.log( `  getSessionMsg(   ): ${ await getSessionMsg(   ) }` )
            process.argv[3] = 2
            console.log( `  getSessionMsg(   ): ${ await getSessionMsg(   ) }` )
            console.log( `  getSessionMsg( 1 ): ${ await getSessionMsg( 1 ) }` )
*//*
            process.argv[2] = 40
//          console.log( `  getSessionMsg( 0, 'usermsg' ): ${ await getSessionMsg( 0, 'usermsg' ) }` )
            console.log( `  getSessionMsg( 1, 'usermsg' ): ${ await getSessionMsg( 1, 'usermsg' ) }` )
            process.argv[2] = 33
            console.log( `  getSessionMsg( 0, 'usermsg' ): ${ await getSessionMsg( 0, 'usermsg' ) }` )
            console.log( `  getSessionMsg( 1, 'usermsg' ): ${ await getSessionMsg( 1, 'usermsg' ) }` )
            process.argv[3] = 5
//          console.log( `  getSessionMsg( 0, 'usermsg' ): ${ await getSessionMsg( 0, 'usermsg' ) }` )
            console.log( `  getSessionMsg( 1, 'usermsg' ): ${ await getSessionMsg( 1, 'usermsg' ) }` )
*//*
            process.argv[2] = 40
            console.log( `  getSessionMsg( 0, 'usermsg' ): ${ await getSessionMsg( 0, 'usermsg' ) }` )
            console.log( `  getSessionMsg( 1, 'usermsg' ): ${ await getSessionMsg( 1, 'usermsg' ) }` )
            process.argv[2] = 23
            console.log( `  getSessionMsg( 0, 'usermsg' ): ${ await getSessionMsg( 0, 'usermsg' ) }` )
            console.log( `  getSessionMsg( 1, 'usermsg' ): ${ await getSessionMsg( 1, 'usermsg' ) }` )
            process.argv[3] = 5
            console.log( `  getSessionMsg( 0, 'usermsg' ): ${ await getSessionMsg( 0, 'usermsg' ) }` )
            console.log( `  getSessionMsg( 1, 'usermsg' ): ${ await getSessionMsg( 1, 'usermsg' ) }` )
            process.argv[3] = 2
            console.log( `  getSessionMsg( 0, 'usermsg' ): ${ await getSessionMsg( 0, 'usermsg' ) }` )
            console.log( `  getSessionMsg( 1, 'usermsg' ): ${ await getSessionMsg( 1, 'usermsg' ) }` )
*/
//          process.exit()

// ---------------------------------------------------------------------------------

     async  function  getSessionMsg( nNew, aType ) {                                    // .(40730.01.1 RAM Write getSessionMsg Beg)
            nNew      =  nNew  ? nNew  :  0
            aType     =  aType ? aType : 'markdown'
            aType     =  aType == 'usermsg'  ? 'usermsg_' : aType
            aType     =  aType == 'usermsg_' ? 'markdown' : aType                       // .(40730.02.x )

       var  mFile     =  getLastFile(  aType )
       var  nSession  =  mFile[2].slice(1,4) * 1
            nSession  =  process.argv[2] ? process.argv[2] : nSession                   // .(40730.01.1 RAM Use Argv if exists)
       var  aSession  = `${nSession}`.padStart( 3,'0' )
        if (aSession.match( /^[0-9]{3}$/ ) == null) {
            console.log( `${aCR}* Invalid Session number` )
            return ''
            }
        if (aSession == '000') {
            aSession  =  await makNewSession( '', 1 )                                   // .(40730.07.3 RAM Okay here??)
//          mFile[2]  =  FRT._TS
            mFile[2]  = `t${aSession}.01.2.${FRT._TS}`                                  // .(40731.01.1 RAM Opps)
       var  nMsg      =  1
        } else {
       var  nMsg      = (mFile[2].slice(5,7) * 1) + nNew                                // .(40730.01.x RAM Add nNew)
            }
       var  nMsg      =  process.argv[3] ? process.argv[3] : nMsg                       // .(40730.01.1 RAM Use Argv if exists)
//     var  aMsg      = `${ nMsg + nNew }`.padStart( 2,'0' )                            //#.(40730.02.x )
       var  aMsg      = `${ nMsg }`.padStart( 2,'0' )                                   // .(40730.02.x RAM nNew already added)
        if (aMsg.match( /^[0-9]{2}$/ ) == null) {
            console.log( `${aCR}* Invalid Message number` )
            return ''
           }
       if (!nNew) {
       var  mFile2    =  getLastFile(  aType, '', `${aSession}.${aMsg}` )
        if (mFile2 == '') { return '' }
            }
   return [ aSession, aMsg, mFile[2].slice(10) ]
            }  // eof getSessionMsg                                                     // .(40730.01.1 End)
// -----------------------------------------------------

     async  function  opnFile( aType, aExt ) {                                          // .(40820.04.x RAM Write openFile Beg)
       var  mFile     =  getLastFile( aType )
//    var [ nSession, aMsg, aTS ] = await getSessionMsg( 0, aType )                     //#.(40820.04.x)
//    var [ nSession, aMsg, aTS ] = [ mFile[2].slice(1,4), mFile[2].slice(5,9), mFile[2].slice(10) ]    // .(40820.04.x)
//     var  aVer      = `t${nSession}.${aMsg}.${aTS}`                                   //#.(40820.04.x)
       var  aVer      =   mFile[2]                                                      // .(40820.04.x)
       var  aDir      = `${__basedir }/docs/${mFile[0]}/${mFile[1]}`
       var  aOldFile  = `${mFile[0].slice(0,3)}_${aVer}_${aType}_.${aExt}`
//     var  aOpnMsg   = `Open Session Prompt into ${aType}.${aExt} file: `
       var  aOpnMsg   = `Open file, ${aType}.${aExt}, with command, AICodeR: 1. Edit System Prompt, or`
       var  aOpnFile  = `docs/${mFile[0]}/${mFile[1]}/${aOldFile}`

            opnCodeEditor( `${aDir}/${aOldFile}`, aOpnMsg, aOpnFile )
//          console.log( `\n  ${aOpnMsg}`)
//          console.log(   `    code "$aOpnFile"` )
            }  // eof opnFile                                                         // .(40820.04.x End)
// -------------------------------------------------------

     async  function  makPrompt( aCmd ) {                                               // .(40730.02.2 RAM Write makPrompt Beg)
            if (aCmd == 'new' ) {  await makNewPrompt() }
            if (aCmd == 'open') {  await opnPrompt() }
            }  // eof makPrompt                                                         // .(40730.02.2 End)
// -------------------------------------------------------

     async  function  opnPrompt( ) {                                                    // .(40730.02.4 RAM Write openPrompt Beg)
       var  mFile     =  getLastFile( 'usermsg_' )                                      // .(40804.04.1)
      var [ aSession, aMsg, aTS ] = await getSessionMsg( 0, 'usermsg_' )                // .(40804.04.2).(40730.02.x)
       var  aVer      = `t${aSession}.${aMsg}.2.${aTS}`
       var  aDir      = `${__basedir }/docs/${mFile[0]}/${mFile[1]}`
       var  aOldFile  = `${mFile[0].slice(0,3)}_${aVer}_usermsg_.txt`                   // .(40804.04.3 Was usermsg.sh)
       var  aOpnFile  = `docs/${mFile[0]}/${mFile[1]}/${aOldFile}`                      // .(40730.08.x)
//     var  aOpnMsg   = `Open Session Prompt into usermsg_.txt file: `                  // .(40730.08.x)
//     var  aOpnMsg   = `Opening Session Prompt file: usermsg_.txt`                     // .(40730.08.x)
       var  aOpnMsg   = `Open Session Prompt file, usermsg_.txt, with command, AICodeR: 3. Open User Prompt, or`      // .(40820.08.x)
            opnCodeEditor( `${aDir}/${aOldFile}`, aOpnMsg, aOpnFile )                   // .(40815.03.1)
//          console.log( `\n  ${aOpnMsg}`)                                              // .(40804.04.4).(40730.08.3)
//          console.log(   `    code "$aOpnFile"` )                                     // .(40730.08.4)
            }  // eof opnPrompt                                                         // .(40730.02.4 End)
// -------------------------------------------------------

     async  function  makNewPrompt() {                                                  // .(40728.01.2 RAM Write makNewPrompt)
       var  mFile     =  getLastFile( 'markdown' )
      var [ aSession, aMsg, aTS ] = await getSessionMsg( 1, 'usermsg_' )                // .(40730.02.x)
//      if (aSession == '000') {                                                        //#.(40730.02.x Beg)
//          aSession  =  await makNewSession( '', 1 );                                  // .(40730.07.4)
//          aMsg      = '01'
//          aTS       =  FRT._TS
//          }                                                                           //#.(40730.02.x End)
            aMsg      =  aMsg == '00' ? '01' : aMsg                                     // .(40730.02.x)
//     var  aVer      = `t${aSession}.01.1.${FRT._TS}`                                  //#.(40730.01.x)
       var  aVer      = `t${aSession}.${aMsg}.1.${FRT._TS}`                             // .(40730.01.x)
       var  aDir      = `${__basedir }/docs/${mFile[0]}/${mFile[1]}`
       var  aNewFile  = `${mFile[0].slice(0,3)}_${aVer}_usermsg_.txt`
            FRT.writeFileSync( FRT.path( aDir, aNewFile ), '' )
//          opnCodeEditor(   `${aDir}/${aNewFile}` )                                    //#.(40730.08.3)
//          console.log( "\n  Enter new Session Prompt into file: usermsg_.txt" )       // .(40730.08.3)
            console.log( "\n  Open new Session Prompt file, usermsg_.txt, with command, AICodeR: 2. New User Prompt, or" )       // .(40820.08.3)
            console.log(   `    code "docs/${mFile[0]}/${mFile[1]}/${aNewFile}"`)       // .(40730.08.4)
            opnCodeEditor( `${aDir}/${aNewFile}`, 'quiet' )                             //#.(40820.05.1)
//          process.exit()                                                              // .(40729.04.1 RAM Revent hang)
            }  // eof makNewPrompt                                                      // .(40728.01.2 End)
// --------------------------------------------------------------

     async  function  makResponse( aCmd ) {                                             // .(40730.02.3 RAM Write makResponse Beg)
        if (aCmd == 'open') {  await opnResponse() }
        if (aCmd == 'new' ) {  await makNewResponse() }
            }  // eof makResponse                                                       // .(40730.02.3 End)
// -------------------------------------------------------

     async  function  opnResponse( ) {                                                  // .(40730.02.4 RAM Write openResponse Beg)
       var  mFile     =  getLastFile( 'markdown' )
      var [ aSession, aMsg, aTS ] = await getSessionMsg( 0, 'markdown' )                // .(40730.02.x)
       var  aVer      = `t${aSession}.${aMsg}.2.${aTS}`
       var  aDir      = `${__basedir }/docs/${mFile[0]}/${mFile[1]}`
       var  aOldFile  = `${mFile[0].slice(0,3)}_${aVer}_markdown.md`
//          opnCodeEditor(   `${aDir}/${aOldFile}` )
//          console.log( "\n  Open Session Response into usermsg_.txt file: ")          // .(40804.04.5).(40730.08.3)
//          console.log( "\n  Opening Session Response file: markdown_.md" )            // .(40804.04.5).(40730.08.3)
            console.log( "\n  Open Session Response file: markdown.md, with command, AICodeR: 7. Open Response, or" )            // .(40804.04.5).(40730.08.3)
            console.log(   `    code "docs/${mFile[0]}/${mFile[1]}/${aOldFile}"`)       // .(40730.08.4)
            opnCodeEditor( `${aDir}/${aOldFile}`, 'quiet' )                             //#.(40820.05.2)
            } // eof opnResponse                                                        // .(40730.02.4 End)
// -------------------------------------------------------

     async  function  makNewResponse() {                                                // .(40728.01.3 RAM Write makNewResponse)
       var  mFile     =  getLastFile( 'markdown' )
//     var  aSession  =  mFile[2].slice(1,4)
//     var  aMsg      =  `${ (mFile[2].slice(5,7) * 1) + 1 }`.padStart( 2, '0' )
//     var  aTS       =  mFile[2].slice(-10)
      var [ aSession, aMsg, aTS ] = await getSessionMsg( 1, 'markdown' )                // .(40730.02.x)
//      if (aSession == '000') {                                                        //#.(40730.02.x Beg)
//          aSession  =  await makNewSession( '', 1 );                                  // .(40730.07.5 RAM Added args: '', 1 )
//          aMsg      = '01'
//          aTS       =  FRT._TS
//          }                                                                           //#.(40730.02.x End)
            aMsg      =  aMsg == '00' ? '01' : aMsg                                     // .(40730.02.x)
       var  aVer      = `t${aSession}.${aMsg}.2.${aTS}`
       var  aDir      = `${__basedir }/docs/${mFile[0]}/${mFile[1]}`
       var  aNewFile  = `${mFile[0].slice(0,3)}_${aVer}_markdown.md`
            FRT.writeFileSync( FRT.path( aDir, aNewFile ), '' )
//          opnCodeEditor(     `${aDir}/${aNewFile}` )                                  //#.(40730.08.5)
//          console.log( "\n  Paste new Session Response into file: markdown.md")       // .(40730.08.5)
            console.log( "\n  Paste new Session Response into file, markdown.md, with command, AICodeR: 6. New Response, or" )            // .(40804.04.5).(40730.08.3)
            console.log(   `    code "docs/${mFile[0]}/${mFile[1]}/${aNewFile}"`)       // .(40730.08.6)
            opnCodeEditor( `${aDir}/${aNewFile}`, 'quiet' )                             //#.(40820.05.3)
//          process.exit()                                                              // .(40729.04.2)
            } // eof makNewResponse                                                     // .(40728.01.4 End)
// --------------------------------------------------------------

//          console.log( 'getLastFile(): ', getLastFile( 'markdown', '.md' ) )
//          console.log( 'getLastFile(): ', getLastFile( 'usermsg_', 'txt' ) )
//          console.log( 'copyLastFile(): ', copyLastFile( 'usermsg_', 'txt', 't005.01.1.40822.1209' ) )
//          console.log( 'copyLastFile(): ', copyLastFile( 'markdown', 'md',  't005.02.1.40822.1209' ) )
//          process.exit()

  function  copyLastFile( aType, aExt, aVer) {                                          // .(40822.04.4 RAM Write copyLastFile Beg, aVer: 't005.01.1.40822.1209')
       var  mFile1          =  getLastFile( aType, aExt, '', true )
       var  mFile           =  getLastFile2( mFile1[0], mFile1[1], '000', aType, aExt, true )
       if (!mFile[2]) { return }                                                        // .(.40908.03.x RAM Has error msgs in [0,1])
       var  aDir            = `${__basedir }/docs/${mFile[0]}/${mFile[1]}`
       var  aApp            =  mFile[0].slice(0,3)
       var  aOldFile        = `${aApp}_${mFile[2]}_${aType}.${aExt}`
       var  aNewFile        = `${aApp}_${aVer}_${aType}.${aExt}`
       var  mText           =  FRT.readFileSync( FRT.path( aDir, aOldFile )).split( '\n' )
//      if (mText[0].match( /^### File: /) == null) {                                   //#.(40826.07.1 RAM Revise Comment)
//          mText         = [ "### File: {App}_{Ver}_${aType]}.${aExt}", "", ...mText ] //#.(40826.07.2)
//          }                                                                           //#.(40826.07.3)
//          mText[0]        = `### File: ${aNewFile}`                                   //#.(40826.07.4)
   if (mText[0]) { mText[0] =  setComment( mText[0], mFile[0], aVer ) }                 // .(40826.07.5)
   if (mText[1]) { mText[1] =  setComment( mText[1], mFile[0], aVer ) }                 // .(40826.07.6)
                               FRT.writeFileSync( FRT.path( aDir, aNewFile ), mText.join( '\n' ) )
    return  aNewFile
// -------- -------------------------------------------
   function setComment( aLine, aApp, aVer ) {                                           // .(40826.07.7 Beg)
        if (aLine.match( /### File: /)) {
            aLine.replace( /{App}/, aApp )
            aLine.replace( /{Ver}/, aVer )
            }
     return aLine
            }  // eof setComment                                                        // .(40826.07.7 End)
// -------- -------------------------------------------
            }  // eof copyLastFile                                                      // .(40822.04.4 End)
// -------  -----------------------------------------------------

//  function  getLastFile( aType, aExt, aToday ) {                                                  //#.(40822.04.x).(40730.04.1 RAM aToday can be any leading nSession, nMsg, TS).40728.01.4 RAM Write getLastFile)
    function  getLastFile( aType, aExt, aVer, bQuiet ) {                                          // .(40822.04.x RAM add bQuiet).(40730.04.1 RAM aToday can be any leading nSession, nMsg, TS).40728.01.4 RAM Write getLastFile)
        //          console.log( "")
//     var  aExt            =  aExt ? aExt : (aType == 'markdown' ?  'md' : 'txt' ) )                                                  //#(40728.01.x).(40801.08.1)
       var  aExt            =  aExt ? aExt : (aType == 'markdown' ?  'md' :  (aType.match(/request_|messages/) ? 'json' : 'txt' ) )    // .(40801.08.1).(40728.01.x)
       var  mArgs           =  setArgs( process.argv, 'get', 'quit' )                               // ,(40827.10.1 RAM This should not be here!)
//          console.log(    `  mArgs:  '${mArgs.join("', '")}`)
        if (mArgs.join("', '").match( /'\*/ ) ) { console.log( "  process.exit()" ) }

       var  aApp            =  mArgs[3]
       var  aMod            =  mArgs[4]
//     var  aDayTS          = `${ mArgs[0]}.${ mArgs[1] == '00' ? ''   : mArgs[0] }.${ mArgs[2] }`  //#.(40721.04.1 RAM When only session is in mArgs[1])
       var  aDayTS          = `${ mArgs[0]}.${ mArgs[1] == '00' ? '01' : mArgs[1] }.${ mArgs[2] }`  // .(40721.04.1 RAM S.B. this).(40801.09.1 RAM But is it used?)
//     var  aDayTS          = `${ mArgs[0]}.${mArgs[1]}.${ mArgs[2] }`                              //#.(40721.04.1 RAM not this)
        if (aApp == '') { console.log( `${aCR}* No App found. Please try again`  ); aCR = "" }      // .(40729.03.6)
        if (aMod == '') { console.log( `${aCR}* No Model found. Please try again`); aCR = "" }      // .(40729.03.7)
        if (!(aApp || aMod)) { process.exit() }                                                     // .(40729.02.1 RAM Abort if not set)
            aVer            =  aVer ? aVer : aDayTS                                                 // .(40822.04.x)
        if (bQuiet && aVer.match( /000|\.\./ )) {                                                   // .(40908.02.1 RAM if newSession or copyLastFile, i.e. aVer = '')
    return [ aApp, aMod, `t000.00.0`, `${aType}.${aExt}` ] }                                        // .(40908.02.2)
       var  mFile           =  getLastFile2( aApp, aMod, aVer, aType, aExt, bQuiet )                // .(40822.04.x).(40801.09.2 RAM Split function)
    return  mFile                                                                                   // .(40801.09.3)
            }  // eof getLastFile                                                                   // .(40801.09.4)
// --------------------------------------------------------------

//          console.log( "  aPath:", getFilePath( 'systmsg_', 0 ) )
//          console.log( "  aPath:", getFilePath( 'usermsg_', 0 ) )
//          console.log( "  aPath:", getFilePath( 'usermsg_', 1 ) )
//          console.log( "  aPath:", getFilePath( 'request_', 1 ) )
//          process.exit()

  function  getFilePath( aType, bNew, aQuiet   ) {                                                  // .(40819.08.1 Can't be async ).(40819.06.2 RAM Added aQuiet).(40804.05.1 RAM Write getFilePath )
       var  bQuiet      = (aQuiet ? aQuiet : '') == 'quiet'                                         // .(40819.06.x)

       var  aAppName    =  AIM.getEnv( 'FRT_APP' )                                                  //#.(40829.02.4 RAM Gotta do it every time)
       var  aModel      =  AIM.getEnv( 'FRT_MODEL' )                                                //#.(40829.02.5 RAM Gotta do it every time)
        if (aAppName == "") {
//          console.log( `* A default app is not set.` )
            deactivate() //  process_.exit()                                            // .(40819.09.x)
            }
        if (aModel == "") {
//          console.log( `* A default model is not set.` )
            deactivate() //  process_.exit()                                            // .(40819.09.x)
            }
       var  mFile       =   getLastFile2( aAppName, aModel, '', aType, '', bQuiet )     // .(40819.06.x RAM Was: false)
        if (mFile[0].match( /^\* / )) { return [ mFile[0], mFile[1] ] }                 // .(40905.01.x RAM App and/or Model may not be found)
        if (mFile[2]) {                                                                 // .(40825.05.1)
            mFile[2]    =  (aType == 'systmsg_') ? setVer( mFile[2], 4, '00' ) : nextMsg( mFile[2], bNew )
            mFile[2]    =  (aType == 'systmsg_') ? setVer( mFile[2], 7,  '0' ) : mFile[2]
            }                                                                           // .(40825.05.2)
       var  aApp        =   mFile[0].slice(0,3)
       var  aFile       =   mFile[2] ? `${aApp}_${mFile[2]}_${mFile[3]}` : 'no files'   // .(40825.05.3 RAM Check if none found)
       var  aPath       =  `docs/${mFile[0]}/${mFile[1]}/${mFile[2] ? aFile : '*' }`    // .(40825.05.4 RAM Was: ${aApp}_${mFile[2]}_${mFile[3])
//     var  aPath       =  `docs/${mFile[0]}/${mFile[1]}/${aApp}_${mFile[2]}_${mFile[3]}`
//  return  aPath                                                                       //#.(40815.01.1 RAM ??)
//  return  [ `${mFile[2]}_${mFile[3]}`, aPath ]                                        //#.(40815.01.1 RAM ?Return both aFile and aPath).(40825.05.5)
    return  [ `${aFile}`,                aPath ]                                        // .(40825.05.5).(40815.01.1 RAM ?Return both aFile and aPath)

//  --------------------------------------------------------------
   function setVer(  aVer, nPos, aVal ) {
     return `${ mFile[2].slice( 0, nPos ) }.${aVal}.${ mFile[2].slice( nPos + aVal.length + 2 ) }`
            }  // eof setVer
//  --------------------------------------------------------------
   function nextMsg( aVer, nNew ) {
       if (!nNew) { return aVer }
       var  mVer        =  aVer.split( '.' )
            mVer[1]     = `${ (mVer[1] * 1) + (nNew == true ? 1 : nNew ) }`.padStart( 2, '0' )
    return  mVer.join( '.' )
            }  // eof nextMsg
//  --------------------------------------------------------------
         }  // eof getFilePath
// --- ---  --------------  =  -------------------------------------------------------------

  function  getLastFile2( aApp_, aMod_, aVer, aType, aExt, bQuiet, bFirstFile ) {                   // .(40905.01.1).(40828.01.1 RAM aVer Was: aToday).(40827.05.4 RAM Add bFirstFile).(40801.09.5)
       var  FRT_lastFile    =  bFirstFile ? FRT.firstFile : FRT.lastFile                            // .(40827.05.5)
       var  aErrFile        = `docs/${aApp_}/${aMod_}/c${aApp_.slice(0,2)}_t###.##.#.#####.####_${aType}`

       var  nFld            = (aMod_.length == 7) ? 1 : 2; var aApp = aApp_.slice(0,3)              // .(40905.01.2 RAM Save passed Appname amd Model)
       var  aAppName        = (getApp(    2,   aApp    , 2 ) ) // (().slice(2,3)[0] || '').trim()   // .(40718.09.5).(40715.01.3 RAM Was 2, aApp)
        if (aAppName == '') {  return [ `* The App, '${  aApp_}', not found`, `${aErrFile}.${aExt}` ] } // .(40905.01.3 RAM if not in Apps list)
       var  aModel          = (getModel( nFld, aMod_   , 2 )) // (().slice(2,3)[0] || '').trim()    // .(40718.09.6).(40715.01.4 RAM Was 2, aMod)
        if (aModel   == '') {  return [ `* The Model, '${aMod_}', not found`, `${aErrFile}.${aExt}` ] } // .(40905.01.4 RAM if not in Models list)
//     var  aAppName        = (AIM.getApp(    2,   aApp    , 2 ))                                   //#.(40814.01.x).(40718.09.5).(40715.01.3 RAM Was 2, aApp)
//     var  aModel          = (AIM.getModel( nFld, aMod    , 2 ))                                   //#.(40814.01.x).(40718.09.6).(40715.01.4 RAM Was 2, aMod)

//     var  aSessions_Dir   =  getDocsPath( aAppName, aModel, aCR )                                 // .(40819.05.3).(40729.03.8).(40715.03.1 Add chk fundtion)
       var  aSessions_Dir   =  getDocsPath( aAppName, aModel, '\n', bQuiet )                        // .(40907.03.1 RAM Don't abort on error).(40819.05.3 RAM Was: aCR).(40729.03.8).(40715.03.1 Add chk fundtion)
//     var  aSessions_Dir   =  await AIM.getDocsPath( aAppName, aModel, '' )                        //#.(40814.01.x).(40729.03.8).(40715.03.1 Add chk fundtion)
//     var  aSessions_Dir   =  AIM.getDocsPath( aAppName, aModel, '' )                              //#.(40814.01.x).(40729.03.8).(40715.03.1 Add chk fundtion)
        if (aSessions_Dir.match( /\* / )) {                                                         // .(40907.03.2 Beg)
//  return [ `* The AppName/Model folder, ./${docs/${aApp_}/${aMod_}}`, `docs/${aApp_}/${aMod_}/c##_t###.##.#.#####.####_${aType}.${aExt}`] }  //#.(40907.03.3 RAM Same error as above)
    return [ aSessions_Dir, `${aErrFile}.${aExt}` ]                                                 // .(40907.03.3 RAM Similar error as created in getDocsPath)
           }                                                                                        // .(40907.03.2 End)
       var  mExt            =  aType.split( '.' )                                                   // .(40815.01.1)
        if (mExt.length > 1) { aType = mExt[0]; aExt =  aExt ? aExt : mExt[1] }                     // .(40815.01.2 RAM Use aExt if not empty Beg)
        if (aExt == '') {
            console.log(    "* aExt is missing" );
            deactivate() //  process_.exit()                                                        // .(40819.09.x)
            }                                                                                       // .(40815.01.2 End)
//     var  aMarkdown_File  = `${aApp.slice(0,3)}_{ver}_markdown`                                   // .(40711.04.3 RAM File is now markdown.md)
       var  aLastFile2Find  = `${aApp.slice(0,3)}_{ver}_${aType}`                                   // .(40728.01.4 RAM Add aType)
//          console.log(    `  aLastFile2Find: '${aLastFile2Find}'` )

//          console.log(    `  aLastFile: ${aLastFile}` )
       var  aLastFile       =  FRT_lastFile( aSessions_Dir, aLastFile_regEx )                       // .(40827.05.6)
//          console.log(    `  aLastFile: ${aLastFile}` ); process.exit()

       var  aVer            =  aVer ? aVer     : '' // FRT.getDate( ).substring( 0, 4 )  // YMMD    // .(40828.01.2)

       var  aVer            =  aVer.match(   /^[1-9]{1}\./  ) ? `00${aVer}` :   aVer                // .(40828.01.3).(40717.03.1 RAM Add leading 00s if not there )

       var  aVer            =  aVer.match(   /^[1-9]{2}\./ )  ? `0${aVer}`  :   aVer                // .(40828.01.4).(40717.03.2 RAM Add leading 0 if not there )
//          console.log(    "  aVer:", aVer )

//     var  aLastFile_regEx = `${aLastFile2Find}_u${aVer}\\.[0-9]*\\.${aExt}`
//     var  aLastFile_regEx = `${aLastFile2Find}_t0${aVer}[0-9.]+\\.${aExt}`                        // .(40711.04.x RAM Change 'u'to 't' )
       var  aLastFile_regEx = `${aLastFile2Find}_t${aVer}[0-9.]+\\.${aExt}`                         // .(40828.01.5).(40717.03.3 RAM Remove leading 0)
        if (aLastFile2Find.match( /_{ver}/)) {
            aLastFile_regEx =  aLastFile2Find.replace( /_{ver}/, `_t${aVer}[0-9.]*` ) + `.${aExt}`  // .(40828.01.6).(40717.03.3).(40711.04.x)
            }
//          console.log( `aLastFile: ${aLastFile}` )
       var  aLastFile       =  FRT.lastFile( aSessions_Dir, aLastFile_regEx )                       // .(40827.05.6 RAM Could be aFirst file)
//          console.log( `aLastFile: ${aLastFile}` ); process_.exit()              

       var  aVer            =  aLastFile.match( /t[0-9.]+/ ); aVer = aVer ? aVer[0].replace( /\.$/, '' ) : '' // .(40711.04.x)
        if (aVer == "" && (bQuiet ? bQuiet : 0) == 0 ) {                                                      // .(40801.11.1 RAM Add bQuiet )
            console.log(  `\n* Can't find file matching, '${aLastFile_regEx}', since ver.date: ${aVer}*` )    // .(40828.01.7)
            console.log(    `    in folder: ${aSessions_Dir}` )
            process_.exit()                                                      
            }
       var  aFileType       =  aLastFile.slice(3).replace(/^.+?_/,'');                              // .(40731.09.1 RAM Uses "not greedy" +?)
  return  [ aAppName, aModel, aVer, aFileType ]
            }  // eof  getLastFile2                                                                 // .(40728.01.2 End)
// --- ---  --------------  =  -------------------------------------------------------------

     async  function  createAppFolders( aAppName, aModel ) {
       if ('chkArgs' == 'setArgs') {                                                                // .(40827.07.3 Beg)
       var  mArgs           =  setArgs( process.argv, 'get', 'quit' )                               // .(40827.07.4 RAM Use existing App/Model to create new session)
//          console.log( `  aAppName: ${mArgs[3]}, aModel: ${mArgs[4]}, nSession: ${mArgs[0]}\n` ); process.exit()
            mArgs[4]        =  (mArgs[4].length > 7) ?  getModel( 2, mArgs[4], 1 ) : mArgs[4]
            process.argv    = [ '', '', mArgs[3], mArgs[4], mArgs[0] ]                              // .(40827.07.5 RAM Use result of setArgs)
            }                                                                                       // .(40827.07.3 End)
       var  nSession        =                        process.argv[4]                                // .(40827.07.7)

       var  aAppName        = (aAppName ? aAppName : process.argv[2] || '').trim()                  // .(40728.04.1 RAM Was [2], still is after .slice(1) )
       var  aModel          = (aModel   ? aModel   : process.argv[3] || '').trim()                  // .(40728.04.1 RAM Was [3])
//          aAppName        = "c36_calendar-app"
/*
        if (aAppName === undefined || aAppName == null) {
            aAppName        =  await readline.question('  Enter the name of the app folder to create: '  )
        if (aAppName == "") {
            console.log(    "* You must enter an app folder name." )
            process.exit(1);
            }  }
        if (aAppName.match(/[cs][0-9]{2}_[a-z-]+/)) {
       var  aStage          = `${ aAppName.slice(0,1) == 'c' ? 'client' : 'server' }${aAppName.slice(1,2)}`
            aAppName        = `${ aStage }/${ aAppName }`.toLowerCase()
        if (aAppName.slice(0,1) == "c" &&  aAppName.match( /-app$/ ) == null ) { aAppName = `${aAppName}-app` }
        if (aAppName.slice(0,1) == "s" &&  aAppName.match( /-api$/ ) == null ) { aAppName = `${aAppName}-api` }
        } else {
            console.log(    "* You must enter an app folder name as c##_name-of-app, or s##_name-of-api.")
            process.exit(1);
            }
            aModel                    =  await ask4Model( aModel )
        if (aModel == "") { aModel    =  await ask4Model( aModel ) }
*/
//          console.log( `aAppName: '${aAppName}', aModel: '${aModel}'` )
            aCR              = '\n'                                                                 // .(40826.11.4)
            aAppName         =  await chkApp( aAppName  )                                           // .(40719.01.x Use chkApp)
            aModel           =  await ask4Model( aModel )                                           // .(40719.01.x Use chkApp)
//          console.log( `  aAppName: '${aAppName}', aModel: '${aModel}'` ); process.exit()

        if (aAppName == "" || aModel == "") { console.log( "  Try again"); process.exit(1) }

            console.log( `\n  Creating app folders for: "${aAppName}/${aModel}"` )

            await createAppFolders_( aAppName, aModel, nSession );                                  // .(40827.07.8 RAM Add nSession)

            AIM.setEnv( "App",    aAppName )                                                        // .(40722.04.1 Set App & Model after making App)
            AIM.setEnv( "Model",  aModel )                                                          // .(40722.04.2)
            console.log( `  Setting default App and Model in .env file to:` )                       // .(40729.05.1)
            console.log( `    FRT_APP         = "${aAppName}"` )                                    // .(40729.05.4)
            console.log( `    FRT_MODEL       = "${aModel}"`   )                                    // .(40729.05.5)

            process.exit(0)
            }  // eof createAppFolders
// --------------------------------------------------------------

     async  function  createAppFolders_( aAppDir, aModel, nSession ) {                              // .(40827.07.9)
       var  bDoApps         =  aAppDir.slice(1,2) != '0'                                            // .(40722.06.1)
       var  aStage          = (aAppDir.slice(0,1) == 'c' ? 'client' : 'server') + (bDoApps ? aAppDir.slice(1,2) : '' )   // .(40722.06.2)
       var  aFolderName     =  FRT.path( __basedir, `${aStage}/${aAppDir}` )
       try {
        if (bDoApps) {                                                                              // .(40722.06.3 RAM Create client or server app folder)
            console.log(    `  Creating App Folder,      "${aFolderName}"`);
//          await fs.mkdir(    aFolderName, { recursive: true } ); // Use promises for cleaner async handling
            await FRT.makDir(  aFolderName, { recursive: true } ); // Use promises for cleaner async handling
//          console.log(    `  Created App Folder, "${aFolderName}", successfully!`);
            } // eif bDoApps                                                                        // .(40722.06.4)
       var  aAppName        =  aAppDir.replace(     /(client[0-9]*|server[0-9]*)[\\\/]/, '' )       // .(40719.01.2 RAM Change + to *)

//     var  aDocsFolderName =  aFolderName.replace( /(client[0-9]+|server[0-9]+)[\\\/]/, 'docs/' )
       var  aDocsFolderName =  aFolderName.replace( /(client[0-9]*|server[0-9]*)[\\\/]/, 'docs/' )
//          console.log(    `  Creating docs App Folder, "${aDocsFolderName}/${aModel}"`);          //#.(40801.04.1)
//          console.log(    `  Creating docs App Folder, "${aDocsFolderName.replace( /.+docs[\\\/]/, 'docs/' )}/${aModel}"`);  // .(40801.04.1 RAM Just docs/...)
            console.log(    `  Creating App/Model dir,   "${aDocsFolderName.replace( /.+docs[\\\/]/, 'docs/' )}/${aModel}"`);  // .(40801.04.1 RAM Just docs/...)
//          await fs.makdir(  `${aDocsFolderName}/${aModel}`, { recursive: true } );
       var  aNewDir         =  await FRT.makDir( FRT.path( aDocsFolderName, aModel ), { recursive: true } );  // .(40827.02.1).(40721.02.1 RAM Add FRT.path)

        } catch (error) {
            console.error(  `* Error creating App/Model folder: ${error.message}`);
       var  aNewDir         =  ''                                                                   // .(40827.02.2)
            }
// ----------------------------------------------------------------------------------------------------
        if (aNewDir == "" ) {                                                                       // .(40827.02.3 Beg)
            console.log(    `  Failed to created directory, '${ FRT.path( aDocsFolderName, aModel ) }'.` );
            process.exit()
            }                                                                                       // .(40827.02.3 End)

        if (aAppDir.slice(0,1) === 'c' && bDoApps) {                                                // (40722.06.5)

//          console.log(    `  Created docs App Folder, "${aDocsFolderName}/${aModel}", successfully!`);
       var  aHTML_Content   = `<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>New Project</title>
</head>
<body>
 <h1>Welcome to your new project!</h1>
</body>
</html>`;
//          await fs.writeFile(  `${aFolderName}/index.html`, htmlContent);
       if ((await FRT.checkFile( `${aFolderName}/index.html`)).exists == false ) {
            await FRT.writeFile( `${aFolderName}/index.html`, aHTML_Content);
            console.log(    `  Creating an initial file, "index.html", inside the client app folder.`);
            }
            } // eif client files
// ----------------------------------------------------------------------------------------------------

        if (aAppDir.slice(0,2) == 'c0' && bDoApps) {                                                // (40722.06.6 RAM Create client app folder)
            aAppDir         =  aAppDir.replace(     /c0/, 's0' )
            aFolderName     =  FRT.path( aFolderName.replace( /client[\\\/]c0/, 'server/s0' ) )
            console.log(    `  Creating App Folder,      "${aFolderName}"` );
                               await FRT.makDir(  aFolderName, { recursive: true } ); // Use promises for cleaner async handling
            } // eif create server dir
// ----------------------------------------------------------------------------------------------------

        if (aAppDir.slice(0,1) == 's' && bDoApps) {                                                // (40722.06.7 RAM Create server app file)
       var  aServer_File    = `server.mjs`
       if ((await FRT.checkFile( `${aFolderName}/${aServer_File}`)).exists == false ) {
       var  aServer_Content =  await FRT.readFile( FRT.path( __dirname, `./templates/${aServer_File}` ) );
//         'E:\\Repos\\Robin\\AIObjs_\\dev03-robin\\._2\\FRTs\\AICodeR\\templates\\server.mjs'
//          E:\\Repos\\Robin\\AIObjs_\\dev03-robin\\._2\\FRTs\\AICodeR\\templates\\server.mjs
                               await FRT.writeFile( `${aFolderName}/${aServer_File}`, aServer_Content);
            console.log(    `  Creating an initial file, "${aServer_File}", inside the server api folder.`);
            }
            }  // eif server files
// ----------------------------------------------------------------------------------------------------

       var  aApp            =  aAppName.slice(0,3)
       var  aVer            = 't000.01.{n}.' + FRT._TS
//          aVer            =  nSession ? `${nSession}`.padStart( 3, '0' ) : aVer                   //#.(40827.07.10 RAM Use nSession if given)
//          aVer            =  nSession ? `t${ `${nSession}`.padStart( 3, '0' ) }.01.{n}.${FRT._TS}` : aVer  //#.(40827.07.10 RAM Use nSession if given)
        if (nSession) {
            aVer            =  aVer.replace( /000/, `${nSession}`.padStart( 3, '0' ) )              // .(40827.07.10 RAM Use nSession if given)
            }
//                                   delDocsFiles( aApp, aModel, '000', 0, true )                   //#.(40802.04.7 bQuiet).(40826.03.1)
                               await delDocsFiles( aApp, aModel, '000', 1, false )                  // .(40826.03.7 RAM Was , 0 nMsg)
       var bSaved           =  false                                                                // .(40827.04.1)
                               await savDocsFile(  aApp, aVer, aModel, 'systmsg_.txt'  )            // .(40801.02.7 RAM Copy this too)
                               await savDocsFile(  aApp, aVer, aModel, 'usermsg_.txt'  )
                               await savDocsFile(  aApp, aVer, aModel, 'request_.json' )            // .(40801.02.8 RAM Used by Step 15, run prompt creates it)
//                             await savDocsFile(  aApp, aVer, aModel, 'messages.json' )            //#.(40801.02.8 RAM Don't copy messages.json, Step 15, run prompt creates it).(40826.01.1)
                               await savDocsFile(  aApp, aVer, aModel, 'messages.json' )            // .(40826.01.1 RAM Maybe it should just update it)
                               await savDocsFile(  aApp, aVer, aModel, 'request_.sh'   )
                               await savDocsFile(  aApp, aVer, aModel, 'markdown.md'   )

        if (bSaved == false) {                                                                      // .(40827.04.2)
            console.log( "  No template files were saved to the docs/app/model folder")             // .(40827.04.3)
            }                                                                                       // .(40827.04.4)
            console.log( '' )
// --------------------------------------------------------------

     async  function savDocsFile( aApp, aVer, aModel, aFile ) {
//      if (aModel.match(/maxi/       ) != null && aFile.match( /\.json/ )) { return }              //#.(40801.05.1)
        if (aModel.match(/-maxi|-chat/) != null && aFile.match( /\.json/ )) { return }              // .(40801.05.1 RAM No .json for -maxi or -chat)
       var  nTyp            =  aFile.match( /^markdown/) ? 3 : (aFile.match( /^request_|^messages/) ? 2 : 1 )  // .(40826.03.8)
            aVer            =  aVer.replace( /{n}/, nTyp )                                                     // .(40826.03.9 RAM Change nMsg no)
       var  aDocs_File      = `${aDocsFolderName}/${aModel}/${aApp}_${aVer}_${aFile}`
       var  aModel1         =  aFile.match( /^usermsg_/) ? 'AnyModel_Prompt' : aModel               // .(40804.04.6
//     var  aEXTs           = `.${aFile.replace( /^.+\./, '' ).toUpperCase()}s`                     // .(40801.03.7)
//     var  aTemplate_File  =  getModel( 3, getModel( 2, aModel, 1 ), aFile )                       // .(40801.03.8 RAM Look up template name)
       var  aTemplate_File  =  getModel( 4, aModel, aFile )                                         // .(40801.06.6 RAM Updated getModel)
//     var  aTemplate_File  = `./templates/${aEXTs}/${aModel1}-${ aFile.replace(/\./, '_template.' ) }`
//     var  aTemplate_File  = `./templates/${aTemplate_File}`
        if (aTemplate_File == '') {                                                                 // .(40908.05.2)
       var  aTemplate_File  =  getModel( 4, 'Any Model', aFile )                                    // .(40908.05.3 RAM Use Default Templates Beg)
            }                                                                                       // .(40908.05.4)
        if (aTemplate_File) {                                                                       // .(40801.03.9 RAM Don't create template file if not in Models_Templates
       var  aType           =  aFile.replace( /\..+$/, '' ).padStart(8)                             // .(40826.02.1 RAM)
            console.log(    `  Creating ${aType} file, "${aApp}_${aVer}_${aFile}", in the docs App/Model folder.`);  // .(40826.02.2)
            console.log(    `     using template file, "${aTemplate_File}.` );
       var  aContent        =  await FRT.readFile(  FRT.path( __dirname, 'templates', aTemplate_File ) );
        if (aContent)       {  await FRT.writeFile( FRT.path( aDocs_File ), aContent ) };
            bSaved          =  true                                                                 // .(40827.04.5)
            } }  // eof savDocsFile                                                                 // .(40801.03.10)
// --------------------------------------------------------------
                 // eOf docs files
// ----------------------------------------------------------------------------------
            }    // eof createFolders_
// ----------------------------------------------------------------------------------------------------

//          delDocsFiles( 'c01', 'Claude-35s_Anthropic-curl' )
//          delDocsFiles( 'c01', 'Claude-35s_Anthropic-curl',   0 )
//          delDocsFiles( 'c01', 'Claude-35s_Anthropic-curl',   0,    0 )
//          delDocsFiles( 'c01', 'Claude-35s_Anthropic-curl', '00', '00' )  // nope
//          delDocsFiles( 'c01', 'Claude-35s_Anthropic-curl', '00', '01' )  // yup
//          delDocsFiles( 'c01', 'Claude-35s_Anthropic-curl', '02', '01' )  // may not exist
//          process.exit()

     async  function  delSession( ) {
//          process.argv.unshift( '' ); process.argv[2] = '0';                                   //#.(40827.07.x RAM Let's not).(40826.08.x RAM Put '' into new 1st row, '0' into cmd row)
//          console.log(    `  process.argv: '${process.argv.join("', '")}'` )
       var  mArgs           =  setArgs( process.argv, 'get', 'quit' )
//          console.log(    `\n  delSession[1]  mArgs:  '${mArgs.join("', '")}`)
        if (mArgs.join("', '").match( /'\*/ ) ) { console.log( "  process.exit()" ) }
       var  nSession        =  mArgs[0] == '000' ? '000' : (mArgs[0] ? mArgs[0] : '000')
       var  nMsg            =  mArgs[1] == '00'  ?  '01' : (mArgs[1] ? mArgs[1] :  '01')
       var  aApp            =  mArgs[3]
       var  aMod            =  mArgs[4]
 //         console.log( `  delDocsFiles( '${aApp}', '${aMod}', '${nSession}', '${nMsg}' )` )
                               await delDocsFiles( aApp, aMod, nSession, nMsg, true )                     // .(40826.08.1 RAM Must await if asking about deletes)
            process.exit()
            }  // eof delSession
// --------------------------------------------------------------

     async  function delDocsFiles( aAppName, aModel, nSession_, nMsg, bQuiet ) {                    // .(40802.04.x).(40801.07.11 RAM Write delDocFiles)
       var  bUV             = `${ nSession_ }`.match( '^t' ) != null;
       var  nSession        =  bUV ? nSession_.slice(1) : nSession_
       var  aVer            = `${ nSession || '' }`.padStart(3,'0') + '.' + `${ nMsg || '' }`.padStart(2,'0')
//         console.log(     `  delDocsFiles( ${nSession_}, ${nMsg} ) == 't${aToday}'` ); return

//                             FRT.setPaths( aAppName )                                             //#.(40801.07.12 Not needed for global __baseDir)
/*
//                             await delDocFile( 'userm  `${aVer}` )                                //#.(40801.07.13 RAM not leading t)
                               await delDocFile( 'systmsg_', 'txt',  `${aVer}` )
                               await delDocFile( 'request_', 'json', `${aVer}` )
                               await delDocFile( 'request_', 'sh',   `${aVer}` )
                               await delDocFile( 'messages', 'json', `${aVer}` )
                               await delDocFile( 'markdown', 'md',   `${aVer}` )
*/
       var  bDeletes = false,  mDeletes = [], bDefer = true                                         // .(40826.08.1 RAM Defer deletes).(40802.03.1)
            console.log( '' ); delDocFile( 'usermsg_', 'txt',  `${aVer}` )
                               delDocFile( 'systmsg_', 'txt',  `${aVer}` )
                               delDocFile( 'messages', 'json', `${aVer}` )
                               delDocFile( 'request_', 'json', `${aVer}` )
                               delDocFile( 'request_', 'sh',   `${aVer}` )
                               delDocFile( 'request_', 'mjs',  `${aVer}` )
                               delDocFile( 'markdown', 'md',   `${aVer}` )

//      if (bDeletes == false && (bQuiet ? bQuiet : '0') == '0') {
        if (bDeletes == false) {
            console.log( `  No session files were deleted`)
            }
        if (bDefer == true &&  bDeletes == true) {                                                   // .(40826.08.2 RAM Ask if OK Beg)
        var aFiles          = (mDeletes.length == 1) ? 'this file' : 'these files'
        var aOK             =  await readline.question(`  Ok to delete ${aFiles}? [Y or N]: ` )
//          console.log( `  Delete: '${aOK}' (${aOK.match( /^[yY]/ ) ? 'yes' : 'no' })` ); process.exit()
        if (aOK.match( /^[yY]/ )) {  mDeletes.map( aDoc_File => FRT.deleteFileSync( aDoc_File ) ); }
       if ((bQuiet ? bQuiet : '0') == '0') { console.log( '' ) }
            }  // eif bDefer == true && bDeleted                                                                                       // .(40826.08.2 End)
//          -------------------------------------------------------

//   async  function  delDocFile( aType, aExt, aVer ) { ... }
  function  delDocFile( aType, aExt, aVer ) {
       var  mFile           =  getLastFile2( aAppName, aModel, aVer, aType, aExt, true, true )      // .(40827.05.7 RAM getFirstFiles).(40801.09.6)
       var  aDoc_File       = `docs/${mFile[0]}/${mFile[1]}/${aAppName.slice(0,3)}_${mFile[2]}_${mFile[3]}`
//          ---------------------------------------
        if (mFile[3]) {        console.log( `  Deleting ${aDoc_File}` );
//      if (aDoc_File) {       await FRT.deleteFile(     FRT.path( __basedir, aDoc_File ) ) }
        if (aDoc_File) {       bDeletes = true                                                      // .(40826.08.3)
        if (bDefer == true) {                                                                       // .(40826.08.3)
            mDeletes.push(     FRT.path( __basedir, aDoc_File) )                                    // .(40826.08.4)
        } else {               FRT.deleteFileSync( FRT.path( __basedir, aDoc_File ) );  }           // .(40826.08.5).(40802.03.4)
            } }
//          ---------------------------------------
            }  // eof delDocFile
//          -------------------------------------------------------
        }  // eof delDocsFiles                                                                      // .(40801.07.11 End)
// ----------------------------------------------------------------

  function  opnCodeEditor_x( aFile ) {
       var  aCodePath = FRT.path( '/C/Program Files/Microsoft VS Code/bin/code' )
            console.log( `\n  code "${aFile.replace( /.+docs/, 'docs') }"` )
         // Replace with the correct path to your 'code' executable from step 1

//   const  child = spawn( aCodePath, [ FRT.path( aFile ) ] );
//          child.on( 'error', ( err ) => {         console.error('Error opening file in VS Code:', err); } );
//          child.on( 'exit',  ( code ) => {        console.log(`VS Code exited with code: ${code}`);     } );
//          child.stdout.on( 'data',  ( data ) => { console.log(  `  stdout: ${data}` ); } );
//          child.stderr.on( 'data',  ( data ) => { console.error(`  stderr: ${data}` ); } );

//    try { spawn( aCodePath, [ FRT.path( aFile ) ] )
//      } catch( pErr ) { }
            }  // eof opnCodeEditor_x
// --------------------------------------------------------------

     async  function  opnCodeEditor( aFilePath, aOpnMsg, aOpnFile ) {                               // .(40815.03.x RAM Write again)
        if (aOpnMsg != 'quiet') {                                                                   // .(40820.05.x)
            console.log( `\n  ${aOpnMsg}`)                                                          // .(40804.04.4).(40730.08.3)
            console.log(   `    code "${aOpnFile}"` )                                               // .(40730.08.4)
            }                                                                                       // .(40820.05.x)
//     var  aCmd  = `code -g "${aFilePath}"`
       var  aCmd  = `code -g "${aFilePath}:1"`
//          console.log(   `    exec( ${aCmd} )` )
//          exec('tasks.run Open File', (error, stdout, stderr) => { ... }
     await  exec( aCmd, (error, stdout, stderr) => {
        if (error) {
            console.error( `exec error: ${error}`); return; }
            console.log(   `stdout: ${stdout}`);
            console.log(   `stderr: ${stderr}`);
            } );
        }   // eof opnCodeEditor                                                                    // .(40815.03.x End)
// ---- --- --------------------------------------------------------------


     export default   { createAppFolders, getLastFile, getFilePath }                                // .(40804.04.7).(40731.06.x)

