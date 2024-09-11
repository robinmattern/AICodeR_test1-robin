// import   vscode           from 'vscode'                                              // .(40819.10.4 RAM Yuk!}
   import   fs               from 'fs/promises'                                         // .(40827.01.1 RAM Needed for ASync fns)
   import   fsync            from 'fs'
   import   path             from 'path'
   import   dotenv           from 'dotenv';
   import   os               from 'os'                                                  // .(40910.03.1)

//  --------------------------------------------------------------

       var  __basedir                                                                   // .(40828.02.1)
       var  __dirname                                                                   //#.(40828.02.2 RAM Assigned in CommonJS)
       var  _debug      =  false                                                        // .(40829.01.3 RAM Debug dotenv)  
       var  _TS                                                                         // .(40908.02.x RAM Need this too) 
       var  _OS         =  os.platform                                                  // .(40910.03.2)  

 if (typeof(vscode) == 'object')  {                                                     // .(40819.10.5 RAM Need to reassign __basedir Beg)
        var workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
        var   aAppName  =   'AICodeR_VSCodeExt'                                         // .(40828.02.3) 
        var __dirname   =   workspaceFolders[0].uri.fsPath;
        var __basedir   = __dirname.replace( /[\\\/]\._2.+/, '' ).replace( /^\/([A-Z]):/, '$1:' )
        var  _TS        =   getDate()
            console.log( `  FRT[1]: __basedir: '${__basedir}'`)
            }
          } else {  // eif typeof(vscode) == 'object'                                   // .(40828.02.4)
       var  aAppName    =   setPaths( )                                                 // .(40828.02.5 RAM Will it set the global vars? No) 
            }       // eif typeof(vscode) != 'object'                                   // .(40819.10.5 End)
//  --------------------------------------------------------------

  function  setPaths( aAppName ) {
        var   aLibFile  =  new URL( import.meta.url ).pathname  // .(40819.03.1 RAM ES6 Module, this script's file name)
//      var   aLibFile  =  __filename                           // .(40819.03.1 RAM CommonJS Module)
   if (typeof(vscode) != 'object')  {                           // .(40819.10.6 RAM Don't assign __basedir if in extensionBeg)

     global.__libpath   =  path.dirname( aLibFile )             // this script's folder name
     global.__dirname   =  path.dirname( process.argv[1] )      // calling folder name
            __dirname   =  global.__dirname                     // .(40828.02.6 RAM It's not defined in "this" closure???)
     global.__basedir   =  aLibFile.replace( /[\\\/]\._2.+/, '' ).replace( /^\/([A-Z]):/, '$1:' )   // .40815.02.1 RAM Remove leading '/C:/)
            __basedir   =  global.__basedir                     // .(40828.02.6 RAM It's not defined in "this" closure???)
     global._TS         =  getDate( )
            _TS         =  global._TS                           // .(40828.02.6) 
     global.__appname   =  getAppName( __dirname, aAppName  )
        var   aCS       = (__appname.match( /^c/ ) ?  'client' : 'server') + __appname.substring( 1, 2 )
//            aCS       =  aCS.match( /[0-9]$/ ) ? aCS : '._2/FRTs/AICodeR'             //#.(40819.03.x RAM ?? )
              aCS       =  aCS.match( /[0-9]$/ ) ? aCS : '._2/FRTs'                     // .(40819.03.x RAM ?? )
     global.__apppath   =  path.join(  __basedir, `${aCS}/${ __appname }` )
//            console.log(`  FRT[2]: __basedir:  '${ __basedir }'`  )                   // .(40908.01.1 RAM setPath is called 4 times)
     return global.__appname
              }
              }   // eof setPaths()
//  --------------------------------------------------------------

  function  isCalled( aImportMetaURL, aProcessArgv1 ) {                                 // .(40802.03.1 RAM Add var names)
            aImportMetaURL = aImportMetaURL ? `${aImportMetaURL}` : import.meta.url     // .(40802.03.2 RAM Will be for this script, not calling script)
//          aImportMetaURL = aImportMetaURL ? `${aImportMetaURL}` : __filename          // .(40819.03.2 RAM CommonJS).(40802.03.2 RAM Will be for this script, not calling script)
            aProcessArgv1  = aProcessArgv1  ? `${aProcessArgv1}`  : process.argv[1]     // .(40802.03.3 RAM Ok for Calling script)
        var aScript1 = aImportMetaURL.split( /[\\\/]/ ).slice(-1)[0]                    // Called script
        var aScript2 = aProcessArgv1.split( /[\\\/]/ ).slice(-1)[0]                     // Calling script
//          console.log( `${aScript1}\n${aScript2}`)
            return aScript1 == aScript2                                                 // Script is not called
            }  // eof isCalled
//  --------------------------------------------------------------

  function  getAppName( __dirname, aName ) {
    return  aName ? aName : __dirname.split( /[\\\/]/ ).pop()
            }   // eof getAppName()
//  --------------------------------------------------------------

       if ('test' == 'text' )  {   
            console.log( `getDate(       ): ${ getDate(       )}` )  // YMMDD.HHMM
            console.log( `getDate(  0, 0 ): ${ getDate(  0, 0 )}` )  // YYYYMMDD 
            console.log( `getDate(  0, 3 ): ${ getDate(  0, 3 )}` )  // YYYYMMDD.HH 
            console.log( `getDate(  0    ): ${ getDate(  0    )}` )  // YYYYMMDD.HHMM 
            console.log( `getDate(  2, 7 ): ${ getDate(  2, 7 )}` )  // YYMMDD.HHMMSS 
            console.log( `getDate(  8, 11): ${ getDate(  8, 11)}` )  // .HHMMSSSSS  
            console.log( `getDate( -1, 0 ): ${ getDate( -1, 0 )}` )  // YYYY-MM-DD 
            console.log( `getDate( -1    ): ${ getDate( -1    )}` )  // YYYY-MM-DD HH:MM
            console.log( `getDate( -1, 8 ): ${ getDate( -1, 8 )}` )  // YYYY-MM-DD HH:MM.SS
            console.log( `getDate( -1, 12): ${ getDate( -1, 12)}` )  // YYYY-MM-DD HH:MM.SSSSS
            debugger 
            }
  function  getDate( nDate, nDateStart, nMinLength, nHrs ) {
        var nHrs        =  nHrs ? ((nHrs == -1) ? new Date().getTimezoneOffset() / 60 : nHrs) : 0
        var nOffset     = (nHrs * 60) * 60 * 1000
        var bDate       = (typeof(nDate) == 'number') && nDate < 15
        if (bDate) {       nHrs = nMinLength; nMinLength = nDateStart; nDateStart = nDate; nDate = null}
        var bFmtDate    =  nDateStart == -1               // nMinLength:  -1)yyyy-mm-dd, 8)hh:mm:ss, 9)hh:mm:sss, 11)hh:mm:sssss
            nDateStart  =  typeof(nDateStart) != 'undefined' ? nDateStart : 3
            nMinLength  =  typeof(nMinLength) != 'undefined' ? nMinLength : ( bFmtDate ? 5 : 5 )
//          aDate       =  aDate ? new Date( isNaN(aDate) ? aDate : (+aDate)           ) : new Date( )
        var dDate       =  nDate ? new Date( isNaN(nDate) ? nDate : (+nDate) - nOffset ) : new Date( )
//          aGTM_Date   =  dDate.toISOString().split( /[-:Z.]/).join( "" ).replace( /T/, "." )
        var aDate       =  `${ `${dDate.getFullYear(     )}` }-`                      // `-`  or ``
                        +  `${ `${dDate.getMonth(   ) + 1 }`.padStart( 2, '0' )}-`   // `-`  or ``
                        +  `${ `${dDate.getDate(         )}`.padStart( 2, '0' )} `   // ` `  or `.`
                        +  `${ `${dDate.getHours(        )}`.padStart( 2, '0' )}:`   // `:`  or ``
                        +  `${ `${dDate.getMinutes(      )}`.padStart( 2, '0' )}.`   // `.`  or ``
                        +  `${ `${dDate.getSeconds(      )}`.padStart( 2, '0' )}`    //
                        +  `${ `${dDate.getMilliseconds( )}`.padStart( 3, '0' )}`    //
        if (bFmtDate) {
//  return `${aDate.substring(0,4)}-${aDate.substring(4,6)}-${aDate.substring(6,8)} ${aDate.substring(9,11)}:${aDate.substring(11,13)}.${aDate.substring(13)}`.substring(0, 11 + nMinLength)
    return  aDate.substring(0, 11 + nMinLength)
       } else {
    return  aDate.replace( /[-:.]/g, "").replace( / /, ".").substring( nDateStart, 8 + nMinLength )
       }    }  // eof getDate()
// --------------------------------------------------------------

     async  function  checkFileASync(  aFilePath  ) {
//          aFilePath        =  aFilePath.match(/^\./) ? path.join( __dirname, aFilePath ) : aFilePath; // .(40527.01.2 CoPilot Only paths starting with '.' are relative)
//          aFilePath        =  path.resolve( aFilePath.replace( /^\/[A-Z]/, '' ) )                     // .(40721.08.1).(40618.01.1 RA< if path starts with a drive letter, remove the first '/' )
            aFilePath        =  cleanPath( aFilePath );                                                 // .(40721.08.1 RAM Make it the same as checkFileASync).(40618.01.4)
       var  pStats           ={ path: aFilePath.split( /[\\\/]/ ).slice(-1)[0]
                             ,  name: aFilePath.split( /[\\\/]/ ).slice(-1).join()
                             ,  size: 0
                             ,  exists: false
                             ,  updatedOn: ''
                             ,  isNotDir: true
                             ,  isDir: false }
     try {
       var  aStats           =  await fs.stat( aFilePath );
            pStats.size      =  aStats.size
            pStats.updatedOn =  aStats.mtime.toISOString()
            pStats.exists    =  pStats.updatedOn > ""
            pStats.isNotDir  =  aStats.isDirectory() == false
            pStats.isDir     =  aStats.isDirectory() == true
        } catch(pError) { }
    return  pStats
            }   // eof checkFileAsync
// --------------------------------------------------------------

  function  checkFileSync( aFilePath  ) {
            aFilePath       =  cleanPath( aFilePath );                                         // .(40618.01.4)
       var  pStats          ={ path: aFilePath.split( /[\\\/]/ ).slice(-1)[0]
                            ,  name: aFilePath.split( /[\\\/]/ ).slice(-1).join()
                            ,  size: 0
                            ,  exists: false
                            ,  updatedOn: ''
                            ,  isNotDir: true
                            ,  isDir: false }
     try {
      var  aStats           =  fsync.statSync( aFilePath );
           pStats.size      =  aStats.size
           pStats.updatedOn =  aStats.mtime.toISOString()
           pStats.exists    =  pStats.updatedOn > ""
//         pStats.isHidden  =  aStats.isHidden == true
           pStats.isNotDir  =  aStats.isDirectory() == false
           pStats.isDir     =  aStats.isDirectory() == true
       } catch(pError) { }
   return  pStats
           }   // eof checkFileSync
// --------------------------------------------------------------

async function  makDirASync(    aDirName  ) { aDirName = `${aDirName || ''}`
   var  aDirPath        =  aDirName.match( /^\./ ) ? path.join( __dirname, aDirName ) : aDirName;  // .(40527.01.2 CoPilot Only paths starting with '.' are relative) 
//      aDirPath        =  path.resolve( aDirPath.replace( /^\/[A-Z]/, '' ) )                         // .(40618.01.1 RA< if path starts with a drive letter, remove the first '/' )
        aDirPath        =  cleanPath( aDirPath )                         // .(40618.01.1 RA< if path starts with a drive letter, remove the first '/' )
// var  pStat           =  await checkFileASync( aDirPath )
 try {
// var  pOK             =  await fs.access(  aDirPath, fs.constants.F_OK )
// var  pOK             =  await fs.access(  aDirPath )
// var  bOK             =  await fs.exists(  aDirPath )
   var  pStats          =  await checkFileASync( aDirPath ); 
//      console.log(  `  pStats.exists: ${pStats.exists}, ${aDirPath}` )
   var  bOK             =  pStats.exists // && pStats.isNotDir
    if (bOK == false) {  
                           await fs.mkdir(   aDirPath, { recursive: true } );
//                         fsync.mkdirSync(  aDirPath, { recursive: true } );
        console.log(    `  Created directory,  "${aDirName}", successfully!` );
        }  
    } catch(pError) {
        console.error(  `* Error checking directory: ${pError}` );
        aDirPath        = ''
        }
return  aDirPath;   //  return  aDirPath  to  callers
    }   // eof makDir    
// --------------------------------------------------------------

function  makDirSync(      aDirName  ) { aDirName = `${aDirName || ''}`
   var  aDirPath        =  aDirName.match( /^\./ ) ? path.join( __dirname, aDirName ) : aDirName;  // .(40527.01.2 CoPilot Only paths starting with '.' are relative) 
//      aDirPath        =  path.resolve( aDirPath.replace( /^\/[A-Z]/, '' ) )                         // .(40618.01.1 RA< if path starts with a drive letter, remove the first '/' )
        aDirPath        =  cleanPath( aDirPath )                         // .(40618.01.1 RA< if path starts with a drive letter, remove the first '/' )
// var  pStat           =  await checkFileASync(  aDirPath )
 try {
// var  pOK             =  await fs.access(  aDirPath, fs.constants.F_OK )
// var  pOK             =  await fs.access(  aDirPath )
// var  bOK             =  fsync.existsSync( aDirPath )
   var  pStats          =  checkFileSync( aDirPath )
   var  bOK             =  pStats.exists // && pStats.isDir == false
    if (bOK == false) {  
                           fsync.mkdirSync(      aDirPath, { recursive: true } );
//                         fsync.mkdirSync(  aDirPath, { recursive: true } );
        console.log(    `  Created directory,  "${aDirName}", successfully!` );
        }  
    } catch(pError) {
        console.error(  `* Error checking directory: ${pError}` );
        aDirPath        = ''
        }
return  aDirPath;   //  return  aDirPath  to  callers
    }   // eof makDir    
// --------------------------------------------------------------



//   lastFile( 'E:\Repos\Robin\AIObjs_\._\DOCs\Code-Sessions', /Continue-sessions_u40624\.[0-9]{4}\.json/ )
//   lastFile( 'E:/Repos/Robin/AIObjs_/._/DOCs/Code-Sessions', /Continue-sessions_u30624\.[0-9]{4}\.json/ )

  function  lastFile( aPath, reFind ) {
            reFind    =  typeof(reFind) == 'string' ? new RegExp( reFind.replace( /\\/g, "\\" ) ) : reFind
       var  mFiles1   =  listFiles( aPath )
       var  mFiles2   =  mFiles1.filter( mFile => reFind.test( mFile[2] ) )
            mFiles2   =  mFiles2.sort( (a,b) => a[2] < b[2] ? 1 : -1 )
     return mFiles2[0] ? mFiles2[0][2]: ''
            }  // eof lastFile
// --------------------------------------------------------------

  function  firstFile( aPath, reFind ) {                                                // .(40827.05.1 RAM Write firstFile)
            reFind  = typeof(reFind) == 'string' ? new RegExp( reFind.replace( /\\/g, "\\" ) ) : reFind
       var  mFiles1 = listFiles( aPath )
       var  mFiles2 = mFiles1.filter( mFile => reFind.test( mFile[2] ) ) 
            mFiles2 = mFiles2.sort( (a,b) => a[2] < b[2] ? -1 : 1 )                     // .(40827.05.2 RAM Reverse)
     return mFiles2[0] ? mFiles2[0][2]: ''        
            }  // eof firstFile
// --------------------------------------------------------------

//  listFiles( '/c/users/robin/.continue/sessions' )
//  listFiles( 'E:\\Repos\\Robin\\AIObjs_\\._\\DOCs\\Code-Sessions' )
//  listFiles( '~/.continue/sessions' )

  function  listFiles( aPath ) {
            aPath     =  FRT_path( aPath )                                              // .(40829.03.1 RAM Was: path.join( cleanpath() ))
        var mFiles1   =  fsync.readdirSync( aPath );
        var mFiles2   = [ ];
   for (var aFile of mFiles1) {
        var aFilePath =  FRT_path( aPath, aFile ); // Join path with filename           // .(40829.03.2)
//      var pStats    =  checkFileSync( aFilePath);
        var pStats    =  fsync.statSync( aFilePath);
            mFiles2.push(
             [  pStats.size.toLocaleString('en-US').padStart(10) // File size in bytes
             ,  getDate( pStats.mtime, -1 ) // Last modification time as a Date object
             ,  aFile
             ,  aPath
                ] );
             } // eol aFile in mFiles1
    return  mFiles2
            }  // eof listFiles
// --------------------------------------------------------------

  function  FRT_path( ...args ) { return cleanPath( path.join( ...args ) ) }                        // .(40829.03.3 RAM Was: myPath)

  function  cleanPath( aPath ) {
       var  aHome            =  _OS != 'darwin' ? 'HOMEPATH' : 'HOME'                               // .(40910.03.3 RAM Beg)
       var  aRootDir         =  os.homedir().split('/')[0]
//          aPath            =  aPath.replace( /^~/, `${process.env['SystemDrive']}/${process.env['HOMEPATH']}` )  //#.(40910.03.4)
            aPath            =  aPath.replace( /^~/, os.homedir() )                             // .(40910.03.3 End)
            aPath            =  aPath.match( /^\./ ) ? path.join( __dirname, aPath ) : aPath;       // .(40527.01.1 CoP Only paths starting with '.' are relative)
//          aPath            =  path.resolve( aPath.replace( /^[\\\/]([A-Za-z])/, '$1:' ) )         // .(40618.01.1 RAM if path starts with a drive letter, replace with '[A=Z]:' )
//          aPath            =  path.resolve( aPath.replace( /^[\\\/]([A-Za-z]):*/, '$1:' ) )       //#.(40618.01.1 RAM if path starts with a drive letter, replace with '[A=Z]:' )// .(40910.03.4)
            aPath            =  path.resolve( aPath.replace( /^[\\\/]([A-Za-z]):+/, '$1:' ) )       // .(40910.03.4).(40618.01.1 RAM if path starts with a drive letter, replace with '[A=Z]:' )
    return  aPath
            }  // eof cleanPath
// --------------------------------------------------------------

     async  function  writeFileASync( aFilePath, aData, pOptions = { encoding: 'utf8' } ) {
//          pOptions         =  pOptions ? pOptions : { encoding: 'utf8' }
            aFilePath        =  cleanPath( aFilePath );                                             // .(40618.01.3)
      try {
        if (typeof( aData ) == 'object') { aData = JSON.stringify( aData, null, 2 ); }
//                          await fsync.writeFile( aFilePath, aData, pOptions);
                                   fsync.writeFileSync( aFilePath, aData, pOptions);
//          console.log(`File '${aFilePath}' written successfully!`);
//turn  Promise.resolve();
        } catch(pError) {
            console.error(   `* Error: Writing file:    "${aFilePath}"` );
            aFilePath       = ''
//turn  Promise.reject(error);
            }
    return  aFilePath
            }  // eof writeFileAsync
// --------------------------------------------------------------

     async  function  writeFileSync( aFilePath, aData, pOptions = { encoding: 'utf8' } ) {
    //      pOptions         =  pOptions ? pOptions : { encoding: 'utf8' }
            aFilePath        =  cleanPath( aFilePath );                                             // .(40618.01.3)
    try {
        if (typeof( aData ) == 'object') { aData = JSON.stringify( aData, null, 2 ); }
    //                          await fsync.writeFile( aFilePath, aData, pOptions);
                                       fsync.writeFileSync( aFilePath, aData, pOptions);
    //      console.log(`File '${aFilePath}' written successfully!`);
    //turn  Promise.resolve();
        } catch(pError) {
            console.error(   `* Error: Writing file:    "${aFilePath}"` );
            aFilePath       = ''
    //turn  Promise.reject(error);
            }
    return  aFilePath
        }   // eof writeFileSync
    // --------------------------------------------------------------

     async  function  readFileASync(   aFilePath, pOptions ) {
            pOptions         =  pOptions  ? pOptions : { encoding: 'utf8' }
            aFilePath        =  cleanPath(  aFilePath );                                            // .(40618.01.5)
      try { aData            = ''
//     if ((await checkFileAsync(    aFilePath ) ).exists) {
       var  bOK              = (await checkFileASync( aFilePath )).exists && (await checkFileASync( aFilePath )).isNotDir
        if (bOK == true) {
       var  aData            =  await fs.readFile( aFilePath, pOptions );
    // var  aData = Promise.resolve( ); // Resolve on success
    //turn  aData
        } else {
            console.error(   `* Error: File not found:  "${aFilePath}"` );
            }
        } catch(pError) {
        if (pError.code === 'ENOENT') {
            console.error(   `* Error: File not found:  "${aFilePath}"` );
        } else {
            console.error(   `* Error: Reading file:    "${pError}"` );
        }   }
    return  aData
            }   // eof readFileAsync
// --------------------------------------------------------------

  function  readFileSync(   aFilePath, pOptions ) {
            pOptions         =  pOptions ? pOptions : { encoding: 'utf8' }
            aFilePath        =  cleanPath( aFilePath );                                             // .(40618.01.6)
      try { aData            = ''
    // var  bOK              =  fsync.existsSync( aFilePath )
       var  bOK              =  checkFileSync( aFilePath ).exists && checkFileSync( aFilePath ).isNotDir
        if (bOK == true) {
       var  aData            =  fsync.readFileSync( aFilePath, pOptions );
        } else {
            console.error(   `* Error: File not found:  "${aFilePath}"` );
            }
    } catch(pError) {
        if (pError.code  ===   'ENOENT') {
            console.error(   `* Error: File not found:  "${aFilePath}"` );
        } else {
            console.error(   `* Error: Reading file:    "${pError}"` );
        }   }
    return  aData
            }  // readFileSync
    // ---------------------------------------------------------------------------------

     async  function  deleteFileASync( aFilePath ) {                                                // .(40801.10.1 RAM Write deleteFileASync Beg) 
            aFilePath        =  cleanPath(  aFilePath );                                            // .(40618.01.5) 
      try { 
       var  bOK              = (await checkFileASync( aFilePath )).exists && (await checkFileASync( aFilePath )).isNotDir
//     var  bOK              =  true                                                                // .(40801.10.9 RAM ???)
        if (bOK == true) {      await fs.unlink( aFilePath ); 
//      } else {
//          console.error(   `* Error file not found: ${aFilePath}` );
            }
        } catch(pError) {
//      if (pError.code === 'ENOENT') {            
//          console.error(   `* Error file not found: ${aFilePath}` );
//      } else {
            console.error(   `* Error deleting file: ${pError}` );
            }   // }   
//  return  aData
            }   // eof deleteFileAsync                                                              // .(40801.10.1 End) 
    // --------------------------------------------------------------
        
  function  deleteFileSync( aFilePath ) {                                                           // .(40801.10.2 RAM Write deleteFileSync Beg) 
            aFilePath        =  cleanPath( aFilePath );                                             // .(40618.01.6) 
      try { 
       var  bOK              =  checkFileSync( aFilePath ).exists && checkFileSync( aFilePath ).isNotDir
        if (bOK == true) {      fsync.unlinkSync( aFilePath ); 
//      } else {
//          console.error(   `* Error file not found: ${aFilePath}` );
            }
    } catch(pError) {
//      if (pError.code  ===   'ENOENT') {            
//          console.error(   `* Error file not found: ${aFilePath}` );
//      } else {
            console.error(   `* Error reading file: ${pError}` );
        }   // }   
//  return  aData
            }   // eof deleteFileSync                                                               // .(40801.10.2 End) 
// ---------------------------------------------------------------------------------

async  function fetchFromOpenAI( aAPI_URL, pMessageObject, aAPI_KEY ) {                             // .(40701.06.1 RAM Add API_URL and API_KEY)
    try {
//          ---------------------------------------------------------

     const  pResponse       =   await fetch( aAPI_URL, 
             {  method : 'POST'
             ,  headers: 
                 { 'Content-Type' : 'application/json'
                 , 'Authorization': `Bearer ${aAPI_KEY}`
                    }
             ,  body   :  JSON.stringify( pMessageObject )
                } );
//          ---------------------------------------------------------

       if (!pResponse.ok) {
       var  pResponse_err   = { Error: `HTTP Status: ${pResponse.status}, URL: ${aAPI_URL}` }
//          throw new Error(   `Error: ${ pResponse_err.Error }` );
            console.error( `\n* Error: ${ pResponse_err.Error }` );
    return  pResponse_err                   
            }
//          ---------------------------------------------------------

     const  pResponse_data  =   await pResponse.json();
//          console.log('Response:', pResponse_data);

//          ---------------------------------------------------------

        if (pResponse_data.error) {
       var  pResponse_err   = { Error: `OpenAI API Data message: ${response_data.error.message}, URL: ${aAPI_URL}` }
//          throw new Error(   `Error: ${ pResponse_err.Error }` );
            console.error( `\n* Error: ${ pResponse_err.Error }` );
    return  pResponse_err                   
            }
//          ---------------------------------------------------------

    return  pResponse_data

//          ---------------------------------------------------------

   } catch( pError) {
       var  pResponse_err   = { Error: `Fetch Message: ${pError.message}, URL: ${aAPI_URL}` }
            console.error( `\n* Error: ${ pResponse_err.Error }` );
    return  pResponse_err   
            }
//          ---------------------------------------------------------
  } // eof fetchFromOpenAI
// ---------------------------------------------------------------------------------

  try {
//     var  aAppName    =   setPaths( )                                                 //#.(40828.02.7 RAM Will it set the global vars? No) 
//          dotenv.config({ path: FRT.path( __basedir, '.env' ), override: true, debug: _debug } ); //#.(40829.01.4).(40607.02.1 RAM Load environment variables from .env file in script's folder).(40829.03.15)
            dotenv.config({ path: FRT_path( __basedir, '.env' ), override: true, debug: _debug } ); // .(40829.03.15 RAM Was FRT.path).(40829.01.4).(40607.02.1 RAM Load environment variables from .env file in script's folder)
            console.log( `  FRT[3]: __basedir:  '${ __basedir }'` )
            console.log( `  FRT[4]:   FRT_.ENV: '${ process.env['FRT_.ENV'] }'` )                  // .(40908.06.1 RAM Must be quoted name)
//          console.log( `  FRT[5]:  .env:      '${ cleanPath( path.join( __basedir, '.env' ) ) }'`)//#.(40829.03.9)
            console.log( `  FRT[5]:  .env:      '${ FRT_path( __basedir, '.env' ) }'` )             // .(40829.03.16 RAM Was FRT.path).(40829.03.4)
//          console.log( `  FRT[6]:   aAppName: '${ aAppName }'` )
//          console.log( '' )
       } catch(error) {
            console.log( "  FRT[7]: * An error has occured in the imported module" )
            }
// ---------------------------------------------------------------------------------

//          dotenv.config( { path: path.join( __basedir, '.env' ) } );                              //#.(40607.02.1 RAM Load environment variables from .env file in script's folder)
//  export  default { getDate, _TS, checkFileASync }
//     var  pFileFns = { setPaths, readFile, readFile2, writeFile, getDate }

       var  pFRT =                                                                                  // .(40819.03.3 RAM Use for both types of exports)
         {  setPaths, isCalled, firstFile, lastFile, listFiles, getAPI: fetchFromOpenAI
         ,  getDate,  join: path.join,  path: FRT_path,  _TS                                        // .(40829.03.4).(40827.05.3 RAM Add)
         ,  __basedir: __basedir, __dirname: __dirname,  AppName: aAppName                          // .(40827.06.x ??).(40819.10.x RAM Add them to FRT)
         ,  checkFileSync,  checkFileASync,  checkFile:  checkFileASync
         ,  writeFileSync,  writeFileASync,  writeFile:  writeFileASync
         ,  readFileSync,   readFileASync,   readFile:   readFileASync
         ,  makDirSync,     makDirASync,     makDir:     makDirASync 
         ,  deleteFileSync, deleteFileASync, deleteFile: deleteFileASync                            // .(40801.10.3) 
            }

    export  default pFRT                                                                            // .(40819.03.5)

// ---------------------------------------------------------------------------------
