     const  vscode      =  require( 'vscode' );
     const  fs          =  require( 'fs' )
       var  FRT         =  require( './._2/FRTs/AICodeR_VSCodeExt/AIC90_FileFns_u03.js' );          // .(40825.02.1 RAM Add -test).(40820.02.1)
       var  AIM         =  require( './._2/FRTs/AICodeR_VSCodeExt/AIC98_Apps-n-Models_u03.js')      // .(40907.01.5 RAM New Version).(40825.02.2).(40819.02.2)
       var  AIF         =  require( './._2/FRTs/AICodeR_VSCodeExt/AIC91_AppFolders_u03.js')         // .(40825.02.3).(40819.02.2 RAM Was: AIC91_ExtensionLib_u04.js)

//     var  __basedir   =  __dirname.replace( /[\\\/]\._2.+/, '' )
       var  __basedir   =  FRT.__basedir                                                            // .(40820.02.2)
       var  __dirname   =  FRT.__dirname                                                            // .(40820.02.3)

       var  bTest1      =  false  // not valid, but must have a value
//     var  bTest1      =  true   // not valid
       var  bTest2      =  false
//     var  bTest2      =  true; if (bTest2) { bTest1 = false }

 //  -----------------------------------------------------------------------------------------

 function  deactivate() {  // This method is called when your extension is deactivated                // .(40825.04.3 RAM Move to here)
       if (typeof(vscode) != 'undefined') { console.log( "  deactivating extension" ); return }       // .(40825.04.4)
//     if (bTest1 || bTest2) { process.exit() }                                                       //#.(40825.04.5).(40819.09.1 RAM Move it here)
           process.exit()                                                                             // .(40825.04.5 RAM We know it is in test)
        }  //  eof deactivate
// -----------------------------------------------------------------------------------------

        if (bTest1 || bTest2) {
            activate( )
            }
/**
 * @param { vscode.ExtensionContext } context
 */
// -----------------------------------------------------------------------------------------

     async  function  activate( context ) {

       var  getFilePath =  AIF.getFilePath                                                          // .(40819.04.x)
/*                                                                                                  //#.(40820.02.4 Beg)
        if (typeof(vscode) == 'object')  {                                                          //#.(40819.10.1 RAM Need to reassign __basedir Beg)
            var workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders && workspaceFolders.length > 0) {
                __dirname =   workspaceFolders[0].uri.fsPath;
                __basedir = __dirname.replace( /[\\\/]\._2.+/, '' ).replace( /^\/([A-Z]):/, '$1:' )
                console.log( `  __basedir is: '${__basedir}'`  )
            }   }                                                                                   //#.(40819.10.1 End)
*/                                                                                                  //#.(40820.02.5 End)
        if (bTest1) {  // Now you can use FRT, AIM, and AIF directly
            console.log(`  TS:        ${FRT._TS}`);
            console.log(`  setPaths:  ${await FRT.setPaths()}`);
            console.log(`  __basedir: ${__basedir}`);
            console.log(`  checkFile: ${ (await FRT.checkFile('E:\\Repos\\Robin\\FRExts\\extensions\\e07_aicoder-test\\.env')).exists }`);
            console.log(`  getEnv('Var'): ${await AIM.getEnv('Var')}`);
            console.log(`  getDocsPath('c01', 'c35sanu'): ${await AIM.getDocsPath('c01', 'c35sanu')}`);
            console.log(`  getFilePath('usermsg_'): ${await AIF.getFilePath('usermsg_')}`);
            return
            }

        if (bTest2) {
//          console.log( `  __basedir: '${__basedir}'` )
            extension_editSystemPrompt()                        // .(40819.01.1 RAM These get called by extension.  See package.json)
            extension_newUserPrompt()
            extension_openUserPrompt()
            extension_openRequest()
            extension_runRequest()
            extension_openResponse()
            extension_listScripts()
            extension_saveScripts()
            return
            }
//      --------------------------------------------------------------------

// AICodeR: 1. Edit System Prompt
       var  disposable = vscode.commands.registerCommand(      'extension.editSystemPrompt', extension_editSystemPrompt )
            console.log('  Congratulations, your extension,    "AICodeR: 1. Edit System Prompt", is now active!');
            context.subscriptions.push( disposable );
  function  extension_editSystemPrompt() {  openFile_inVSCode( 'systmsg_.txt', 0 ) }
        //  eof registerCommand( 'extension.editSystemPrompt',  extension_editSystemPrompt )
//      --------------------------------------------------------------------

// AICodeR: 2. New User Prompt 'usermsg_.txt', 1
       var  disposable = vscode.commands.registerCommand(      'extension.newUserPrompt',    extension_newUserPrompt )
            console.log('  Congratulations, your extension,    "AICodeR: 2. New User Prompt", is now active!');
            context.subscriptions.push( disposable );
  function  extension_newUserPrompt() {     openFile_inVSCode( 'usermsg_.txt', 1 ) }
        //  eof registerCommand( 'extension.newUserPrompt',     extension_newUserPrompt )
//      --------------------------------------------------------------------

// AICodeR: 3. Open User Prompt 'usermsg_.txt', 0
       var  disposable = vscode.commands.registerCommand(      'extension.openUserPrompt',   extension_openUserPrompt )
            console.log('  Congratulations, your extension,    "AICodeR: 3. Open User Prompt", is now active!');
            context.subscriptions.push( disposable );
  function  extension_openUserPrompt() {    openFile_inVSCode( 'usermsg_.txt', 0 ) }
        //  eof registerCommand( 'extension.openUserPrompt',    extension_openUserPrompt )
//      --------------------------------------------------------------------

// AICodeR: 4. Open Request 'request_.sh', 0
       var  disposable = vscode.commands.registerCommand(      'extension.openRequest',      extension_openRequest )
            console.log('  Congratulations, your extension,    "AICodeR: 4. Open Request", is now active!');
            context.subscriptions.push( disposable );
  function  extension_openRequest() {      openFile_inVSCode(  'request_.sh', 0 ) }
        //  eof registerCommand( 'extension.openRequest',       extension_openRequest )
//      --------------------------------------------------------------------

// AICodeR: 5. Run Request 'request_.sh', 1
       var  disposable = vscode.commands.registerCommand(      'extension.runRequest',       extension_runRequest )
            console.log('  Congratulations, your extension,    "AICodeR: 5. Run Request", is now active!');
            context.subscriptions.push( disposable );
  function  extension_runRequest() {      runRequest_inVSCode( 'request_.sh', 0) }
        //  eof registerCommand( 'extension.runRequest',        extension_runRequest )
//      --------------------------------------------------------------------

// AICodeR: 6. New Response 'markdown.md', 1
       var  disposable = vscode.commands.registerCommand(      'extension.newResponse',     extension_openResponse )
            console.log('  Congratulations, your extension,    "AICodeR: 6. New Response", is now active!');
            context.subscriptions.push( disposable );
  function  extension_openResponse() {      openFile_inVSCode( 'markdown.md', 1 ) }
        //  eof registerCommand( 'extension.newResponse',      extension_newResponse )
//      --------------------------------------------------------------------

// AICodeR: 7. Open Response 'markdown.md', 0
       var  disposable = vscode.commands.registerCommand(      'extension.openResponse',     extension_openResponse )
            console.log('  Congratulations, your extension,    "AICodeR: 7. Open Response", is now active!');
            context.subscriptions.push( disposable );
  function  extension_openResponse() {      openFile_inVSCode( 'markdown.md', 0, 'saved') }  // .(40827.12.1)
        //  eof registerCommand( 'extension.openResponse',      extension_openResponse )
//      --------------------------------------------------------------------

// AICodeR: 8. List Scripts 'markdown.md', 'list'
       var  disposable = vscode.commands.registerCommand(      'extension.listScripts',      extension_listScripts )
            console.log('  Congratulations, your extension,    "AICodeR: 8. List Scripts", is now active!');
            context.subscriptions.push( disposable );
  function  extension_listScripts() {      doScripts_inVSCode( 'markdown.md', 'list' ) }
        //  eof registerCommand( 'extension.listScripts',       extension_listScripts )
//      --------------------------------------------------------------------

// AICodeR: 9. Save Scripts 'markdown.md', 'save'
       var  disposable = vscode.commands.registerCommand(      'extension.saveScripts',      extension_saveScripts )
            console.log('  Congratulations, your extension,    "AICodeR: 9. Save Scripts", is now active!');
            context.subscriptions.push( disposable );
  function  extension_saveScripts() {      doScripts_inVSCode( 'markdown.md', 'save' ) }
        //  eof registerCommand( 'extension.saveScripts',       extension_saveScripts )
//      --------------------------------------------------------------------

// { }  //  eof activate
//  -----------------------------------------------------------------------------------------

  function  openFile_inVSCode( aType, nNew, aWhat ) {                                               // .(40827.12.2 RAM Add aWhat) 
//          console.log( "  getFilePath: ", String( getFilePath ) )
      var [ aFile, aFilePath ] =  getFilePath( aType, nNew, 'quiet' )                               // .(40819.06.1 RAM Add 'quiet').(40819.08.1 RAM if async, Error: Identifier 'aFile' cannot be declared with 'var' in current evaluation scope, consider trying 'let' instead)
      var   aFound  = (fs_exists( aFilePath )) ? 'found' : 'not found'
      var   aDocsPath                  =  aFilePath.replace( /.+docs[\\\/]/, '.\\docs\\' )          // .(40906.01.1 RAM Not really necessary cuz aFilePath starts with docs)
//          console.log( `  aFilePath: ${ aFilePath.replace( /.+docs[\\\/]/, '.\\docs\\' ) }, nNew: ${nNew}, ${aFound}` ); //#.(40905.02.1 RAM Add trailing \\).(40906.01.2)
//          console.log( `  aFilePath:   ${ aFilePath }` )
      var   aFilename    =  aType.match( /\.(sh|mjs)/ ) ? 'aReqFile: ' : 'aDocsPath:'               // .(40908.08.x)
      var   aFilename    =  aType.match( /\.(md)/     ) ? 'aRespFile:' : aFilename                  // .(40908.08.x)
            console.log( `  ${aFilename} ./${ aDocsPath }, nNew: ${nNew}, ${aFound}` );             // .(40908.08.x).(40906.01.2)
        if (bTest2) {  return }
        if (aFound == 'found') {
            vscode.workspace.openTextDocument( vscode.Uri.file( `${__basedir}/${aDocsPath}` )).then( doc => { // .(40906.01.3)
            vscode.window.showTextDocument( doc );
            });
            aFile = aFile.replace( /[0-9]\.[0-9]{5}\.[0-9]{4}/, '..' )
            vscode.window.showInformationMessage( `  The file, '${aFile}', is ready to be ${ aWhat ? aWhat : 'edited' }!` );      // .(40827.12.3)
        } else {
            vscode.window.showInformationMessage( `* The ${aType} file not found, './${aDocsPath}!`); // .(40906.01.4 RAM Was: aFilePath)
            }
        };  // eof openFile_inVSCode
// -----------------------------------------------------------------------------------------

  function  runRequest_inVSCode( aType, nNew ) {
      var [ aFile, aFilePath ] =  getFilePath( aType, nNew, 'quiet' )
      var   aFound  = (fs_exists( aFilePath )) ? 'found' : 'not found'
      var   aDocsPath                  =  aFilePath.replace( /.+docs[\\\/]/, '.\\docs\\' )          // .(40906.01.5)
//          console.log( `  aFilePath: ${ aFilePath.replace( /.+docs[\\\/]/, '.\\docs\\' ) }, nNew: ${nNew}, ${aFound}` );        //#.(40905.02.2).(40906.01.6)
            console.log( `  aReqFile:  ./${ aDocsPath }, nNew: ${nNew}, ${aFound}` );               // .(40906.01.6)
            if (bTest2) {  return }
            aFile = aFile.replace( /[0-9]\.[0-9]{5}\.[0-9]{4}/, '..' )
        if (aFound == 'found' ) {
            vscode.window.showInformationMessage( `  Use the command, aicoder run prompt, to send it.` );                         // .(40820.03.1)
            vscode.window.showInformationMessage( `  The request file, '${aFile}', will send the latest prompt to the AI model!` );
        } else {
            vscode.window.showInformationMessage( `* Request file not found, './${aDocsPath}!` );     // .(40906.01.7 RAM Was: aFilePath)
            }
        }  // eof runRequest_inVSCode
// -----------------------------------------------------------------------------------------

  function  doScripts_inVSCode( aType, aWhat ) {
      var [ aFile, aFilePath ] =  getFilePath( aType, 0, 'quiet' )
      var   aFound  = (fs_exists( aFilePath )) ? 'found' : 'not found'
      var   aDocsPath                  =  aFilePath.replace( /.+docs[\\\/]/, '.\\docs\\' )            // .(40906.01.8 RAM Not really necessary cuz aFilePath starts with docs)
//          console.log( `  aFilePath: ${ aFilePath.replace( /.+docs[\\\/]/, '.\\docs\\' ) }, aWhat: ${aWhat}, ${aFound}` );        //#.(40905.02.2).(40906.01.9)
            console.log( `  aRespFile: ./${ aDocsPath }, aWhat: ${aWhat}, ${aFound}` );               // .(40906.01.9)
        if (bTest2) {  return }
            aFile   =  aFile.replace( /[0-9]\.[0-9]{5}\.[0-9]{4}/, '..' )
        if (aFound == 'found' ) {
            vscode.window.showInformationMessage( `  Use the command, aicoder list scripts or save scripts, to see them.` );      // .(40820.03.2)
            vscode.window.showInformationMessage( `  The response, '${aFile}', has generated new scripts for your app!` );
        } else {
            vscode.window.showInformationMessage( `* Response file not found, './${aDocsPath}!` );     // .(40906.01.10 RAM Was: aFilePath)
            }
        }  // eof doScripts_inVSCode
// -----------------------------------------------------------------------------------------

  function  getFilePath_v02_3( aType, bNew ) {
       var  __basedir = `E:\\Repos\\Robin\\FRExts`
       var  __docsdir = `${__basedir}\\docs\\c01_calendar-app\\Claude-35s_Anthropic-curl`
       var  aFile     = `c01_t000.01.1.40801.1635_usermsg_.txt`
       var  aFilePath = `${__docsdir}\\c01_t000.01.1.40801.1635_usermsg_.txt`
   return [ aFile, aFilePath ]
            }  // eof getFilePath_v02_3
   // -----------------------------------------------------------------------------------------

  function  getFilePath_v02_6( aType, nNew ) {
     var  [ aSession, aMsg, aTS, aAppName, aModel ] =  getFile( 0 )                     // .(40807.03.1 RAM Was: getFile( nNew ) )
       var  aApp      =  aAppName.slice( 0, 3 )
       var  __basedir = `E:\\Repos\\Robin\\AICodeR`
       var  __docsdir = `${__basedir}\\docs\\${aAppName}\\${aModel}`
       var  aMsg      = `${ (aMsg * 1) + (nNew == true ? 1 : nNew) }`.padStart( 2, '0' )
       var  aFile     =  aType == `systmsg_.txt` ? `${aApp}_${aSession}.00.0.${aTS}_systmsg_.txt` : ''
       var  aFile     =  aType == `usermsg_.txt` ? `${aApp}_${aSession}.${aMsg}.1.${aTS}_usermsg_.txt` : aFile
       var  aFile     =  aType == `request_.sh`  ? `${aApp}_${aSession}.${aMsg}.1.${aTS}_request_.sh`  : aFile
       var  aFile     =  aType == `markdown.md`  ? `${aApp}_${aSession}.${aMsg}.1.${aTS}_markdown.md`  : aFile
       var  aFilePath = `${__docsdir}\\${aFile}`
   return [ aFile, aFilePath ]
          }  // eof getFilePath_v02_6
   // -----------------------------------------------------------------------------------------

     async  function  getFilePath_v02_8( aType, bNew ) {                                //#.(40819.02.1 RAM Rewrite).(40813.01.x).(40804.05.1 RAM Write getFilePath )
       var  aAppName    =  AIM.getEnv( 'FRT_APP' )
       var  aModel      =  AIM.getEnv( 'FRT_MODEL' )
        if (aAppName == "") {
//          console.log( `* A default app is not set.` )
            deactivate() //  process_.exit()                                            // .(40819.09.x)
            }
        if (aModel == "") {
//          console.log( `* A default model is not set.` )
            deactivate() //  process_.exit()                                            // .(40819.09.x)
            }
       var  mFile       =   AIF.getLastFile2( aAppName, aModel, '', aType, '', false )  // .(40819.04.1 RAM Use from AIF)
            mFile[2]    =  (aType == 'systmsg_') ? setVer( mFile[2], 4, '00' ) : nextMsg( mFile[2], bNew )
            mFile[2]    =  (aType == 'systmsg_') ? setVer( mFile[2], 7,  '0' ) : mFile[2]
       var  aApp        =   mFile[0].slice(0,3)
       var  aPath       =  `docs/${mFile[0]}/${mFile[1]}/${aApp}_${mFile[2]}_${mFile[3]}`
//  return  aPath                                                                       //#.(40815.01.1 RAM ??)
    return  [ `${mFile[2]}_${mFile[3]}`, aPath ]                                        // .(40815.01.1 RAM ?Return both aFile and aPath)

   function setVer(  aVer, nPos, aVal ) {
     return `${ mFile[2].slice( 0, nPos ) }.${aVal}.${ mFile[2].slice( nPos + aVal.length + 2 ) }`
            }
   function nextMsg( aVer, nNew ) {
       if (!nNew) { return aVer }
       var  mVer    =  aVer.split( '.' )
            mVer[1] = `${ (mVer[1] * 1) + (nNew == true ? 1 : nNew ) }`.padStart( 2, '0' )
    return  mVer.join( '.' )
            }
            }  // eof getFilePath_v02_8
// --------------------------------------------------------------

  function  getFile( nNew ) {
       var  aSession   = 't029'
       var  aAppName   = 'c01_calendar-app'
       var  aModel     = 'Claude-35s_Anthropic-curl'
       var  aSession   = 't029'
       var  aMsg       = `${ 1 + nNew }`.padStart( 2, '0' )
       var  aTS        = '40731.0746'
   return [ aSession, aMsg, aTS, aAppName, aModel ]
            }
// --------------------------------------------------------------

  function  fs_exists( aPath ) {
            aPath = `${__basedir}/${aPath}`
//          console.log( `  Checking aPath: ${aPath}` )
    return  fs.existsSync( aPath );
            }
// --------------------------------------------------------------
// -----------------------------------------------------------------------------------------
     }  //  eof activate
//  -----------------------------------------------------------------------------------------

//      if (bTest1 || bTest2) { process_.exit() }                                            // .(40819.09.1 RAM Move it here)

     module.exports = {
            activate,
            deactivate
            }
// -----------------------------------------------------------------------------------------


