// const inquirer = require('inquirer'); // Dependency for prompts
// const    fs           = require 'fs/promises';       // Dependency for file system operations
// import { promises as fs  } from 'fs';
// import { create          } from 'domain';
   import { createInterface } from 'node:readline/promises';
// import   AIM               from './AIC98_Models_u01.mjs'          // not ../._2/FRTs/AICodeR/AIC98_Models_u01.mjs';
   import   AIM               from './AIC98_Apps-n-Models_u02.mjs'   // .(40719.01.x RAM Change file name)
   import   FRT               from './AIC90_FileFns.mjs'

       var  readline        =  createInterface( { input: process.stdin, output: process.stdout } );
       var  getModel        =  AIM.getModel
       var  getApp          =  AIM.getApp                            // .(40718.01.2)

// ---------------------------------------------------------------------------

     async  function ask4Model( aMod ) {
        var aModel  =  aMod
        var aCR     = "\n"
            aMod1   = (aMod === undefined || aMod == null) ? "" : aMod
        if (aMod1 == "") { aCR = ""
            aMod1   =  await readline.question('  Enter a Model to use for this app (or help): ' )
            }
        if (aMod1 == "") {
            console.log( "* You must enter a Model alias, e.g. gp4oopu. ")
            process.exit(1)
            }
            aMod    =  aMod1 == 'help' ? "" : aMod1
        if (isNaN(aMod) == false) {
        var mModel  =  getModel( 0, aMod )           // returns whole row for model number or ''
        } else {
        if (aMod  > "") {
//          console.log( "aMod, aMod1", aMod, aMod1)
        if (aMod1.length > 7 && aMod1 != 'help' ) {                            // .(40725.02.2 RAM Add help check)
        var aMod1   =  getModel( 2, aMod1, 1) 
            }
        var mModel  =  getModel( aMod1 )                // returns whole row for app alias, or ''
            }   }
//      -----------------------------------------------------
//          console.log( "  mModel:", mModel )
            mModel  =  mModel[0] ? mModel : ['','','']
        var aModel1 =  mModel[2] ? mModel[2].trim() : ''
        if (aModel1 == "" || aMod1 == 'help') {
        if (aMod1) {
            console.log( aCR + `* Invalid Model Alias, ${aMod1}`) 
            }
            console.log(    "  Here is a list of Models you can choose from:")
            console.log(       getModel( ).map( aRec => "  " + aRec.join( "  " ) ).join ( "\n" ) )
            }
        if (!aModel) {
        if (aMod == 'help') {
            console.log( "\n* You must enter a Model.") }
            }
//          console.log( "aMod, aMod1, aModel, aModel1", aMod, aMod1, aModel, aModel1)            
        if (aModel1 == '' || aMod1 == 'help') {
            await ask4Model()
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

    async  function chkApp( aApp ) {                                                               // .(40719.01.x RAM Write chkApp Beg)

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
        if (aApp.length > 3 && aApp != 'help' ) {                               // .(40725.02.1 RAM Add help check)
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
            await chkApp()
            }
//          console.log( aCR )
    return  aAppName1
            }  // eof chkApp                                                                        // .(40719.01.x End)
// --------------------------------------------------------------

//          main( 'c42_whatever' )
//          main( 'c42_whatever', 17 )
//          main( 'c01_Calendar-app',  )
//              createAppFolders( 'c01', ' gp4oopu')
//              createAppFolders( 'c01', ' gp4oopx')
//              createAppFolders( 'c01', ' gp4oopm')
                createAppFolders( )

     async  function createAppFolders( aAppName, aModel ) {

       var  aAppName        = (aAppName ? aAppName : process.argv[2] || '').trim()
       var  aModel          = (aModel   ? aModel   : process.argv[3] || '').trim()
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

