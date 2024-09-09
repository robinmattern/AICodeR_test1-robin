//   const  spawn         =  require( 'child_process');
     const  FRT           =  require( './AIC90_FileFns_u03.js' );                       // .(40825.02.4)
     const  AIM           =  require( './AIC98_Apps-n-Models_u03.js');                  // .(40907.01.5 RAM New Version).(40825.02.5)

       var  __basedir      =  FRT.__basedir                                             // .(40819.10.8)
       var  __dirname      =  FRT.__dirname                                             // .(40819.10.9)


//     var  Apps           =  AIM.Apps                                                  //#.(40907.01.7)
//     var  Models         =  AIM.Models                                                //#.(40907.01.7)
//     var  getModels      =  AIM.getModels                                             //#.(40819.05.1 RAM Do we need these? No, not in extension).(40727.03.4)
//     var  setArgs        =  AIM.setArgs                                               //#.(40819.05.2).(40728.01.3)
       var  getModel       =  AIM.getModel                                              // .(40718.01.2)                                               
       var  getApp         =  AIM.getApp                                                // .(40718.01.3)
       var  getDocsPath    =  AIM.getDocsPath                                           // .(40819.05.1 End).(40728.01.3)

// --- ---  -------------  =  -------------------------------------------------------------

  function  getFilePath( aType, bNew, aQuiet   ) {                                                  // .(40819.08.1 Can't be async ).(40819.06.2 RAM Added aQuiet).(40804.05.1 RAM Write getFilePath )
       var  bQuiet      = (aQuiet ? aQuiet : '') == 'quiet'                                         // .(40819.06.x)

       var  aAppName    =  AIM.getENV( 'FRT_APP' )                                                  // .(40829.02.4 RAM Gotta do it every time)
       var  aModel      =  AIM.getENV( 'FRT_MODEL' )                                                // .(40829.02.5 RAM Gotta do it every time)
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
       var  aLastFile       =  FRT_lastFile( aSessions_Dir, aLastFile_regEx )                       // .(40827.05.6 RAM Could be first file)
//          console.log( `aLastFile: ${aLastFile}` ); deactivate() //  process_.exit()              // .(40819.09.x)

       var  aVer            =  aLastFile.match( /t[0-9.]+/ ); aVer = aVer ? aVer[0].replace( /\.$/, '' ) : '' // .(40711.04.x)
        if (aVer == "" && (bQuiet ? bQuiet : 0) == 0 ) {                                                      // .(40801.11.1 RAM Add bQuiet )
            console.log(  `\n* Can't find file matching, '${aLastFile_regEx}', since ver.date: ${aVer}*` )    // .(40828.01.7)
            console.log(    `    in folder: ${aSessions_Dir}` )
            deactivate() //  process_.exit()                                                        // .(40819.09.x)
            }
       var  aFileType       =  aLastFile.slice(3).replace(/^.+?_/,'');                              // .(40731.09.1 RAM Uses "not greedy" +?)
  return  [ aAppName, aModel, aVer, aFileType ]
            }  // eof  getLastFile2                                                                 // .(40728.01.2 End)
// --- ---  --------------  =  -------------------------------------------------------------

     module.exports = { getFilePath, getLastFile2 }                                                 // .(40809.01.1)

//  -----------------------------------------------------------------------------------------

  function  deactivate() {  // This method is called when your extension is deactivated
        if (typeof(vscode) != 'undefined') { console.log( "  deactivating extension" ); return }    // .(40825.04.1)
//      if (bTest1 || bTest2) { process.exit() }                                                    //#.(40825.04.2).(40819.09.1 RAM Move it here)
            process.exit()                                                                          // .(40825.04.2 RAM We know it is in test)
            }  //  eof deactivate
// -----------------------------------------------------------------------------------------
