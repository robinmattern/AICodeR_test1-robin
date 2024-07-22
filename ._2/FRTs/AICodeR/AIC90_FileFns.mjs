   import   fs               from 'fs/promises'
// import { promises as fs } from 'fs';
//    var   fs          = require('fs').promises 
   import   fsync            from 'fs'
   import   path             from 'path'
   import   dotenv           from 'dotenv';

//  --------------------------------------------------------------

  function  setPaths( aAppName ) {  
        var   aLibFile  =  new URL( import.meta.url ).pathname  // this script's file name 
     global.__libpath   =  path.dirname( aLibFile )             // this script's folder name
     global.__dirname   =  path.dirname( process.argv[1] )      // calling folder name 
     global.__basedir   =  aLibFile.replace( /[\\\/]\._2.+/, ''   ) 
     global.__appname   =  getAppName( __dirname, aAppName  )
        var   aCS       = (__appname.match( /^c/ ) ?  'client' : 'server') + __appname.substring( 1, 2 )
     global.__apppath   =  path.join(  __basedir, `${aCS}/${ __appname }` )  
     global._TS         =  getDate( )
     return   global.__appname
        }   // eof getAppName()
//  --------------------------------------------------------------

  function  isCalled(a,b) { 
        var aScript1 = a.split( /[\\\/]/ ).slice(-1)[0] // Calling script 
        var aScript2 = b.split( /[\\\/]/ ).slice(-1)[0] // Called script
//          console.log( `${aScript1}\n${aScript2}`)
            return aScript1 == aScript2
            }
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
        console.log(    `  Directory, '${aDirName}', created successfully!` );
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
        console.log(    `  Directory, '${aDirName}', created successfully!` );
        }  
    } catch(pError) {
        console.error(  `* Error checking directory: ${pError}` );
        aDirPath        = ''
        }
return  aDirPath;   //  return  aDirPath  to  callers
    }   // eof makDir    
// --------------------------------------------------------------

async function  checkFileASync(  aFilePath  ) {
//      aFilePath        =  aFilePath.match(/^\./) ? path.join( __dirname, aFilePath ) : aFilePath; // .(40527.01.2 CoPilot Only paths starting with '.' are relative) 
//      aFilePath        =  path.resolve( aFilePath.replace( /^\/[A-Z]/, '' ) )                     // .(40721.08.1).(40618.01.1 RA< if path starts with a drive letter, remove the first '/' )
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
//      pStats.isHidden  =  aStats.isHidden == true 
        pStats.isNotDir  =  aStats.isDirectory() == false 
        pStats.isDir     =  aStats.isDirectory() == true
    } catch(pError) { }
return  pStats
    }   // eof checkFileSync                           
// --------------------------------------------------------------

//   lastFile( 'E:\Repos\Robin\AIObjs_\._\DOCs\Code-Sessions', /Continue-sessions_u40624\.[0-9]{4}\.json/ )
//   lastFile( 'E:/Repos/Robin/AIObjs_/._/DOCs/Code-Sessions', /Continue-sessions_u30624\.[0-9]{4}\.json/ )

function  lastFile( aPath, reFind ) {
//        reFind  = typeof(reFind) == 'string' ? new RegExp( reFind.replace( /\\/g, "\\" ) ) : reFind
          reFind  = typeof(reFind) == 'string' ? new RegExp( reFind.replace( /\\/g, "\\" ) ) : reFind
     var  mFiles1 = listFiles( aPath )
//   var  mFiles2 = mFiles1.filter( mFile => gte( mFile[2] ) )
     var  mFiles2 = mFiles1.filter( mFile => reFind.test( mFile[2] ) ) 
          mFiles2 = mFiles2.sort( (a,b) => a[2] < b[2] ? 1 : -1 )
   return mFiles2[0] ? mFiles2[0][2]: ''        
 function gte( aFile ) {
     var  bFind = reFind.test( aFile )    
//        console.log( bFind, aFile )
   return bFind      
          }
      }
// --------------------------------------------------------------
//  listFiles( '/c/users/robin/.continue/sessions' )
//  listFiles( 'E:\\Repos\\Robin\\AIObjs_\\._\\DOCs\\Code-Sessions' )
//  listFiles( '~/.continue/sessions' )
// --------------------------------------------------------------

function  listFiles( aPath ) { 
          aPath   =  path.join( cleanPath( aPath ) ) 
      var mFiles1 =  fsync.readdirSync( aPath );
      var mFiles2 = [ ];
        for (var aFile of mFiles1) {
             var aFilePath = path.join( aPath, aFile); // Join path with filename
//           var pStats    = checkFileSync( aFilePath);
             var pStats    = fsync.statSync( aFilePath);
          mFiles2.push(
              [  pStats.size.toLocaleString('en-US').padStart(10) // File size in bytes
              ,  getDate( pStats.mtime, -1 ) // Last modification time as a Date object
              ,  aFile
              ,  aPath    
                 ] );
              } // eol aFile in mFiles1  
   return mFiles2 
      }
// -------------------------------------------------------------- 

    function  myPath(  ...args ) { return cleanPath( path.join(...args ) ) }

    function  cleanPath( aPath ) {      
        aPath            =  aPath.replace( /^~/, `${process.env['SystemDrive']}/${process.env['HOMEPATH']}` )                                                    
        aPath            =  aPath.match( /^\./ ) ? path.join( __dirname, aPath ) : aPath;   // .(40527.01.1 CoP Only paths starting with '.' are relative) 
//      aPath            =  path.resolve( aPath.replace( /^[\\\/]([A-Za-z])/, '$1:' ) )            // .(40618.01.1 RAM if path starts with a drive letter, replace with '[A=Z]:' )
        aPath            =  path.resolve( aPath.replace( /^[\\\/]([A-Za-z]):*/, '$1:' ) )            // .(40618.01.1 RAM if path starts with a drive letter, replace with '[A=Z]:' )
        return  aPath
        }    // eof cleanPath
// --------------------------------------------------------------

 async function  writeFileASync( aFilePath, aData, pOptions = { encoding: 'utf8' } ) {
//      pOptions         =  pOptions ? pOptions : { encoding: 'utf8' } 
        aFilePath        =  cleanPath( aFilePath );                                         // .(40618.01.3) 
try {
    if (typeof( aData ) == 'object') { aData = JSON.stringify( aData, null, 2 ); }
//                          await fsync.writeFile( aFilePath, aData, pOptions);
                                   fsync.writeFileSync( aFilePath, aData, pOptions);
//      console.log(`File '${aFilePath}' written successfully!`);
//turn  Promise.resolve();
    } catch(pError) {
        console.error(   `* Error writing file: ${pError}` );
        aFilePath       = '' 
//turn  Promise.reject(error);
        }
return  aFilePath         
    }   // eof writeFile
// --------------------------------------------------------------

async function  writeFileSync( aFilePath, aData, pOptions = { encoding: 'utf8' } ) {
    //      pOptions         =  pOptions ? pOptions : { encoding: 'utf8' } 
            aFilePath        =  cleanPath( aFilePath );                                         // .(40618.01.3) 
    try {
        if (typeof( aData ) == 'object') { aData = JSON.stringify( aData, null, 2 ); }
    //                          await fsync.writeFile( aFilePath, aData, pOptions);
                                       fsync.writeFileSync( aFilePath, aData, pOptions);
    //      console.log(`File '${aFilePath}' written successfully!`);
    //turn  Promise.resolve();
        } catch(pError) {
            console.error(   `* Error writing file: ${pError}` );
            aFilePath       = '' 
    //turn  Promise.reject(error);
            }
    return  aFilePath         
        }   // eof writeFile
    // --------------------------------------------------------------
    
async function  readFileASync(   aFilePath, pOptions ) {
        pOptions         =  pOptions  ? pOptions : { encoding: 'utf8' } 
        aFilePath        =  cleanPath(  aFilePath );                                         // .(40618.01.5) 
  try { aData            = ''
// if ((await checkFileAsync(    aFilePath ) ).exists) {  
   var  bOK              = (await checkFileASync( aFilePath )).exists && (await checkFileASync( aFilePath )).isNotDir
    if (bOK == true) {
   var  aData            =  await fs.readFile( aFilePath, pOptions ); 
// var  aData = Promise.resolve( ); // Resolve on success
//turn  aData  
    } else {
        console.error(   `* Error file not found: ${aFilePath}` );
        }
    } catch(pError) {
        if (pError.code === 'ENOENT') {            
            console.error(`* Error file not found: ${aFilePath}` );
        } else {
            console.error(`* Error reading file: ${pError}` );
        }   }   
return  aData
    }   // eof readFile
// --------------------------------------------------------------
    
function readFileSync(   aFilePath, pOptions ) {
        pOptions         =  pOptions ? pOptions : { encoding: 'utf8' } 
        aFilePath        =  cleanPath( aFilePath );                                         // .(40618.01.6) 
  try { aData            = ''
// var  bOK              =  fsync.existsSync( aFilePath )
   var  bOK              =  checkFileSync( aFilePath ).exists && checkFileSync( aFilePath ).isNotDir
    if (bOK == true) {
   var  aData            =  fsync.readFileSync( aFilePath, pOptions ); 
    } else {
        console.error(   `* Error file not found: ${aFilePath}` );
        }
} catch(pError) {
    if (pError.code  ===   'ENOENT') {            
        console.error(   `* Error file not found: ${aFilePath}` );
    } else {
        console.error(   `* Error reading file: ${pError}` );
    }   }   
return  aData
        }
// ---------------------------------------------------------------------------------

 async  function fetchFromOpenAI( aAPI_URL, pMessageObject, aAPI_KEY ) {                            // .(40701.06.1 RAM Add API_URL and API_KEY)
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

// var  pFileFns = { setPaths, readFile, readFile2, writeFile, getDate }
        setPaths( ) 

        dotenv.config( { path: path.join( __basedir, '.env' ) } );              // .(40607.02.1 RAM Load environment variables from .env file in script's folder)

 export default { setPaths,  isCalled, listFiles, lastFile, getAPI: fetchFromOpenAI
                , getDate,  join: path.join, path: myPath, _TS 
                , checkFileSync, checkFileASync, checkFile: checkFileASync 
                , writeFileSync, writeFileASync, writeFile: writeFileASync
                , readFileSync,  readFileASync,  readFile:  readFileASync
                , makDirSync,    makDirASync,    makDir:    makDirASync 
                  } 

