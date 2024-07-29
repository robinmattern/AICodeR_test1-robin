// const inquirer = require('inquirer'); // Dependency for prompts
// const    fs           = require 'fs/promises';       // Dependency for file system operations
// import { promises as fs  } from 'fs';
// import { create          } from 'domain';
   import { spawn }           from 'child_process';
   import { createInterface } from 'node:readline/promises';
// import   AIM               from './AIC98_Models_u01.mjs'                             // not ../._2/FRTs/AICodeR/AIC98_Models_u01.mjs';
   import   AIM               from './AIC98_Apps-n-Models_u02.mjs'                      // .(40719.01.x RAM Change file name)
   import   FRT               from './AIC90_FileFns.mjs'

       var  readline        =  createInterface( { input: process.stdin, output: process.stdout } );
       var  getModels       =  AIM.getModels                                            // .(40727.03.4)
       var  getModel        =  AIM.getModel
       var  getApp          =  AIM.getApp                                               // .(40718.01.2)
       var  setArgs         =  AIM.setArgs                                              // .(40728.01.3)
       var  getDocsPath     =  AIM.getDocsPath                                          // .(40728.01.3)
  
//   ----------------------------------------------------------------------

//          main( 'c42_whatever' )
//          main( 'c42_whatever', 17 )
//          main( 'c01_Calendar-app',  )

//          createAppFolders( 'c01', ' gp4oopu')
//          createAppFolders( 'c01', ' gp4oopx')
//          createAppFolders( 'c01', ' gp4oopm')

            process.argv = process.argv.slice(1)
       var  aCmd  = (process.argv[1] == 'newSession'  ) ? 'newSession'  : ''                              
            aCmd  = (process.argv[1] == 'newPrompt'   ) ? 'newPrompt'   : aCmd
            aCmd  = (process.argv[1] == 'newMarkdown' ) ? 'newMarkdown' : aCmd
            aCmd  = (process.argv[1] == 'newApp'      ) ? 'newApp'      : aCmd

        if (aCmd == "") { 
            console.log( "\n* Missing command: new session, prompt or response" ) 
            process.exit() 
            }
        if (aCmd == 'newSession'   ) { await makNewSession( ) }                                 
        if (aCmd == 'newPrompt'    ) { await makNewPrompt(  ) }
        if (aCmd == 'newMarkdown'  ) { await makNewResponse( ) }
        if (aCmd == 'newApp'       ) { await createAppFolders( ) }                            // .(40728.02.18 End)

// ---------------------------------------------------------------------------

     async  function ask4Model( aMod ) {
        var aModel  =  aMod
        var aCR     = "\n"
        var aMod1   = (aMod === undefined || aMod == null) ? "" : aMod
        if (aMod1 == "") { aCR = ""
            aMod1   =  await readline.question('  Enter a Model to use for this app (or help): ' )
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
        var mModels2  = (mModels2.length == 0) ?   getModels( 2, aMod1 ) : mModels2 
            mModels2  = (mModels2.length == 0) ? getModels( 1, aMod1 ) : mModels2
            mModels2  = (mModels2.length == 0) ? getModel( ) : mModels2
            console.log( mModels2.map( aRec => "  " + aRec.join( "  " ) ).join ( "\n" ) )
            }
        if (!aModel) {
        if (aMod == 'help') {
            console.log( "\n* You must enter a Model.") }
            }
//          console.log( "aMod, aMod1, aModel, aModel1", aMod, aMod1, aModel, aModel1)
        if (aModel1 == '' || aMod1 == 'help') {
            aModel1 = await ask4Model()                                                 // .(40727.02.1 RAM Opps)
            }  return  aModel1
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

    async  function chkApp( aApp ) {                                                    // .(40719.01.x RAM Write chkApp Beg)

        var aCR     = "\n"
            aApp    = (aApp === undefined || aApp == null) ? "" : aApp
        if (aApp == "") {  aCR = ""
            aApp    =  await readline.question( '\n  Enter an App to use for this app (or help): ' )
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
            }   }
//      -----------------------------------------------------

            mApp      =  mApp[0] ? mApp : ['','','']
        var aAppName1 =  mApp[2] ? mApp[2].trim() : ''
        if (aAppName1 == "") {
        if (aAppName) {
            console.log( aCR + `* Invalid App alias, ${aAppName}`) }
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

     async  function  makNewSession( nSession ) {                                                           // .(40728.01.1 RAM Write makNewSession)
       var  mFile      =  getLastFile( 'markdown' )
       if (!nSession) { 
            nSession   =  await readline.question( '\n  Enter a session number: ' )
            }
        if (nSession.match( /[0-9]{1,3}/ ) == null) {
            console.log( "* You must enter a session number.")
            process.exit(1)
            }
       var  aSession   = `${nSession * 1}`.padStart(3,'0')
       var  aVer       = `t${aSession}.01.2.${FRT._TS}`
       var  aDir       = `${__basedir }/docs/${mFile[0]}/${mFile[1]}`
       var  aNewFile   = `${mFile[0].slice(0,3)}_${aVer}_markdown.md`      
            FRT.writeFileSync( FRT.path( aDir, aNewFile ), '')
    return  aSession          
            }                                                                           // .(40728.01.1 End)
// --------------------------------------------------------------

     async  function  makNewPrompt() {                                                            // .(40728.01.2 RAM Write makNewPrompt)
       var  mFile      =  getLastFile( 'markdown' )
       var  aSession   =  mFile[2].slice(1,4)
        if (aSession == '000') { aSession = await makNewSession() }
       var  aVer       = `t${aSession}.01.1.${FRT._TS}`
       var  aDir       = `${__basedir }/docs/${mFile[0]}/${mFile[1]}`
       var  aNewFile   = `${mFile[0].slice(0,3)}_${aVer}_usermsg.txt`      
            FRT.writeFileSync( FRT.path( aDir, aNewFile ), '' )
            openCodeEditor( `${aDir}/${aNewFile}` )
            }                                                                           // .(40728.01.2 End)
// --------------------------------------------------------------

     async  function  makNewResponse() {                                                          // .(40728.01.3 RAM Write makNewResponse)
       var  mFile      =  getLastFile( 'markdown' )
       var  aSession   =  mFile[2].slice(1,4)
       var  aMsg       =  `${ (mFile[2].slice(5,7) * 1) + 1 }`.padStart( 2, '0' ) 
       var  aTS        =  mFile[2].slice(-10)
        if (aSession == '000') { 
            aSession = await makNewSession(); 
            aMsg       = '01'  
            aTS        = FRT._TS 
            }
       var  aVer       = `t${aSession}.${aMsg}.2.${aTS}`
       var  aDir       = `${__basedir }/docs/${mFile[0]}/${mFile[1]}`
       var  aNewFile   = `${mFile[0].slice(0,3)}_${aVer}_markdown.md`      
            FRT.writeFileSync( FRT.path( aDir, aNewFile ), '' )
            openCodeEditor( `${aDir}/${aNewFile}` )
            }                                                                           // .(40728.01.4 End)
// --------------------------------------------------------------

  function  openCodeEditor( aFile ) {
       var  aCodePath = FRT.path( '/C/Program Files/Microsoft VS Code/bin/code' )
            console.log( `\n  code "${aFile.replace( /.+docs/, 'docs') }"` )
            // Replace with the correct path to your 'code' executable from step 1

//   const  child = spawn( aCodePath, [ FRT.path( aFile ) ] );
//          child.on( 'error', ( err ) => {         console.error('Error opening file in VS Code:', err); } );
//          child.on( 'exit',  ( code ) => {        console.log(`VS Code exited with code: ${code}`);     } );
//          child.stdout.on( 'data',  ( data ) => { console.log(  `  stdout: ${data}` ); } );
//          child.stderr.on( 'data',  ( data ) => { console.error(`  stderr: ${data}` ); } );

//  try {           spawn( aCodePath, [ FRT.path( aFile ) ] ) 
//   } catch( pErr ) { }   
          }

function getLastFile( aType, aExt ) {                                                   // .(40728.01.4 RAM Write getLastFile)
       var  aExt            =  aExt ? aExt : (aType == 'markdown' ?  'md' :  'txt')     // .(40728.01.x
       var  mArgs           =  setArgs( process.argv, 'get', 'quit' )
//          console.log(    `  mArgs:  '${mArgs.join("', '")}`)
        if (mArgs.join("', '").match( /'\*/ ) ) { console.log( "  process.exit()" ) }

       var  aApp            =  mArgs[3]
       var  aMod            =  mArgs[4]
//     var  aDayTS          = `${ mArgs[0]}.${ mArgs[1] == '00' ? ''   : mArgs[0] }.${ mArgs[2] }`  //#.(40721.04.1 RAM When only session is in mArgs[1])
       var  aDayTS          = `${ mArgs[0]}.${ mArgs[1] == '00' ? '01' : mArgs[1] }.${ mArgs[2] }`  // .(40721.04.1 RAM S.B. this)
//     var  aDayTS          = `${ mArgs[0]}.${mArgs[1]}.${ mArgs[2] }`                              //#.(40721.04.1 RAM not this)
        if (aApp == '') { console.log( "* No App found. Please try again"   ) }
        if (aMod == '') { console.log( "* No Model found. Please try again" ) }

       var  nFld            = (aMod.length == 7) ? 1 : 2; aApp = aApp.slice(0,3)
       var  aAppName        = (getApp(    2,   aApp    , 2 )) // (().slice(2,3)[0] || '').trim()    // .(40718.09.5).(40715.01.3 RAM Was 2, aApp)
       var  aModel          = (getModel( nFld, aMod    , 2 )) // (().slice(2,3)[0] || '').trim()    // .(40718.09.6).(40715.01.4 RAM Was 2, aMod)

       var  aSessions_Dir   =  getDocsPath( aAppName, aModel )                                      // .(40715.03.1 Add chk fundtion)
//     var  aMarkdown_File  = `${aApp.slice(0,3)}_{ver}_markdown`                                   // .(40711.04.3 RAM File is now markdown.md)
       var  aLastFile2Find  = `${aApp.slice(0,3)}_{ver}_${aType}`                                   // .(40728.01.4 RAM Add aType)
//          console.log(    `  aLastFile2Find: '${aLastFile2Find}'` )

//     var  aMarkdown_Saved =  getLastVer_Saved(  aSessions_Dir,   aLastFile2Find, 'md', aDayTS)    // .(40702.05.3 RAM Use new function)
//function  getLastVer_Saved( aSessions_Dir, aLastFile2Find, aExt, aToday ) {

       var  aToday          =  aToday ? aToday : '' // FRT.getDate( ).substring( 0, 4 )  // YMMD
//          console.log(    "  aToday:", aToday )
       var  aToday          =  aToday.match( /^[1-9]{1}\./  ) ? `00${aToday}` : aToday              // .(40717.03.1 RAM Add leading 00s if not there ) 
//          console.log(    "  aToday:", aToday )
       var  aToday          =  aToday.match( /^[1-9]{2}\./ )  ? `0${aToday}` : aToday               // .(40717.03.2 RAM Add leading 0 if not there ) 
//          console.log(    "  aToday:", aToday )
//     var  aLastFile_regEx = `${aLastFile2Find}_u${aToday}\\.[0-9]*\\.${aExt}`
//     var  aLastFile_regEx = `${aLastFile2Find}_t0${aToday}[0-9.]+\\.${aExt}`                      // .(40711.04.x RAM Change 'u'to 't' )
       var  aLastFile_regEx    = `${aLastFile2Find}_t${aToday}[0-9.]+\\.${aExt}`                    // .(40717.03.3 RAM Remove leading 0)
        if (aLastFile2Find.match( /_{ver}/)) {
            aLastFile_regEx    =  aLastFile2Find.replace( /_{ver}/, `_t${aToday}[0-9.]*` ) + `.${aExt}`       // .(40717.03.3).(40711.04.x)
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
    return  [ aAppName, aModel, aVer, aLastFile.replace( /.+_/, '' ) ] 
            }                                                                           // .(40728.01.2 End)
// --- ---  --------------  =  -------------------------------------------------------------

     async  function createAppFolders( aAppName, aModel ) {

       var  aAppName        = (aAppName ? aAppName : process.argv[2] || '').trim()              //#.(40728.04.1 RAM Was [2], still is after .slice(1) )
       var  aModel          = (aModel   ? aModel   : process.argv[2] || '').trim()              //#.(40728.04.1 RAM Was [3])
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
            aAppName         =  await chkApp( aAppName  )                                           // .(40719.01.x Use chkApp)
            aModel           =  await ask4Model( aModel )                                           // .(40719.01.x Use chkApp)
//          console.log( `  aAppName: '${aAppName}', aModel: '${aModel}'` ); process.exit()

        if (aAppName == "" || aModel == "") { console.log( "  Try again"); process.exit(1) }

            console.log( `  Creating app folders for: "${aAppName}/${aModel}"` )

            await createAppFolders_( aAppName, aModel );

            AIM.setEnv( "App",    aAppName )                                                        // .(40722.04.1 Set App & Model after making App)
            AIM.setEnv( "Model",  aModel )                                                          // .(40722.04.2)

            process.exit(0)
         } // eof createAppFolders
// --------------------------------------------------------------

     async  function createAppFolders_( aAppDir, aModel ) {

       var  bDoApps         =  aAppDir.slice(1,2) != '0'                                            // .(40722.06.1)
       var  aStage          = (aAppDir.slice(0,1) == 'c' ? 'client' : 'server') + (bDoApps ? aAppDir.slice(1,2) : '' )   // .(40722.06.2)
       var  aFolderName     =  FRT.path( __basedir, `${aStage}/${aAppDir}` )
       try {
        if (bDoApps) {                                                                              // .(40722.06.3)
            console.log(    `  Creating App Folder,      "${aFolderName}"`);
//          await fs.mkdir(    aFolderName, { recursive: true } ); // Use promises for cleaner async handling
            await FRT.makDir(  aFolderName, { recursive: true } ); // Use promises for cleaner async handling
//          console.log(    `  Created App Folder, "${aFolderName}", successfully!`);
            } // eif bDoApps                                                                        // .(40722.06.4)
       var  aAppName        =  aAppDir.replace(     /(client[0-9]*|server[0-9]*)[\\\/]/, '' )       // .(40719.01.2 RAM Change + to *)

//     var  aDocsFolderName =  aFolderName.replace( /(client[0-9]+|server[0-9]+)[\\\/]/, 'docs/' )
       var  aDocsFolderName =  aFolderName.replace( /(client[0-9]*|server[0-9]*)[\\\/]/, 'docs/' )
            console.log(    `  Creating docs App Folder, "${aDocsFolderName}/${aModel}"`);
//          await fs.makdir(  `${aDocsFolderName}/${aModel}`, { recursive: true } );
            await FRT.makDir( FRT.path( aDocsFolderName, aModel ), { recursive: true } );           // .(40721.02.1 RAM Add FRT.path)

        } catch (error) {
            console.error(  `* Error creating app folders: ${error.message}`);
            }

// ----------------------------------------------------------------------------------------------------

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

        if (aAppDir.slice(0,2) == 'c0' && bDoApps) {                                                // (40722.06.6)
            aAppDir         =  aAppDir.replace(     /c0/, 's0' )
            aFolderName     =  FRT.path( aFolderName.replace( /client[\\\/]c0/, 'server/s0' ) )
            console.log(    `  Creating App Folder,      "${aFolderName}"` );
                               await FRT.makDir(  aFolderName, { recursive: true } ); // Use promises for cleaner async handling
            } // eif create server dir
// ----------------------------------------------------------------------------------------------------

        if (aAppDir.slice(0,1) == 's' && bDoApps) {                                                // (40722.06.7)

       var  aServer_File    = `server.mjs`
        if ((await FRT.checkFile( `${aFolderName}/${aServer_File}`)).exists == false ) {
       var  aServer_Content =  await FRT.readFile( FRT.path( __dirname, `./templates/${aServer_File}` ) );
 //      'E:\\Repos\\Robin\\AIObjs_\\dev03-robin\\._2\\FRTs\\AICodeR\\templates\\server.mjs'
 //       E:\\Repos\\Robin\\AIObjs_\\dev03-robin\\._2\\FRTs\\AICodeR\\templates\\server.mjs
                               await FRT.writeFile( `${aFolderName}/${aServer_File}`, aServer_Content);
            console.log(    `  Creating an initial file, "${aServer_File}", inside the server api folder.`);
            }
            } // eif server files
// ----------------------------------------------------------------------------------------------------

       var  aApp            =  aAppName.slice(0,3)
       var  aVer            = 't000.01.{n}.' + FRT._TS

                               await savDocsFile(  aApp, aVer, aModel, 'usermsg_.txt'  )
                               await savDocsFile(  aApp, aVer, aModel, 'messages.json' )
                               await savDocsFile(  aApp, aVer, aModel, 'markdown.md'   )

     async  function savDocsFile( aApp, aVer, aModel, aFile ) {
        if (aModel.match(/maxi/) != null && aFile.match( /\.json/ )) { return }
            aVer            = `${aVer.replace( /{n}/, aFile.match( /^markdown/) ? 2 : 1 ) }`
       var  aDocs_File      = `${aDocsFolderName}/${aModel}/${aApp}_${aVer}_${aFile}`
       var  aModel1         =  aFile.match( /^usermsg/) ? 'AnyModel_Prompt' : aModel
       var  aTemplate_File  = `./templates/${aModel1}-${ aFile.replace(/\./, '_template.' ) }`
       var  aContent        =  await FRT.readFile( FRT.path( __dirname, aTemplate_File ) );
                               await FRT.writeFile( FRT.path( aDocs_File ), aContent );
            console.log(    `  Creating an initial file, "${aApp}_${aVer}_${aFile}", inside the docs app model folder.`);
            }
          // eOf docs files
// ----------------------------------------------------------------------------------------------------

        }  // eof createFolders_( aAppName )
// --------------------------------------------------------------

export default createAppFolders

