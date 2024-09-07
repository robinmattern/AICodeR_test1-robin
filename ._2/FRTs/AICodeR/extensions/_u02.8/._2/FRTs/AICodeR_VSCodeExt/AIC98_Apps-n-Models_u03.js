      var   dotenv    =  require( 'dotenv' )                                            // .(40829.02.3)
      var   FRT       =  require( './AIC90_FileFns_u03.js' )                            // .(40825.02.6).(40819.02.3)
//    var   JC_parse  =  require( 'jsonc-parser' )                                      //#.(40907.01.x)
//    var   JC_parse  =  require( 'comment-json' )                                      //#.(40907.01.x)
      var   fs        =  require( 'fs' )                                                // .(40907.01.x)

      var   __basedir =  FRT.__basedir                                                  // .(40819.10.7)
      var   __dirname =  FRT.__dirname                                                  // .(40819.10.7)
      var   _debug    =  false                                                          // .(40829.02.4 RAM dotenv for extension)

      var   Apps                                                                        // .(40907.01.1 Beg)
      var   Models2
      var   Model_Templates
            getApps_n_Models()                                                          // .(40907.01.2 RAM Read vars from file) 
//          process.exit() 
                                                                                        // .(40907.01.1 End)  
// ----------------------------------------------------------------------------------

//    var   dotenv    =  require( 'dotenv' )                                            //#.(40829.02.3)
//          dotenv.config( { path: FRT.path( __basedir, '.env' ) } )                    //#.(40829.02.5).(40725.03.1 RAM Added { path: '...' } )
            console.log( `  AIM[1]:  .env:      '${ FRT.path( __basedir, '.env' ) }'`)
            console.log( `  AIM[2]:   aApp:      ${ process.env.FRT_APP }` )
            console.log( `  AIM[3]:   aModel:    ${ process.env.FRT_MODEL }` )
            console.log( `  AIM[4]:   aAppName:  ${ FRT.AppName }\n` )
            console.log( `  AIM[5]:   FRT_APP:  '${ getEnv( 'App'   ) }'` )
            console.log( `  AIM[6]:   FRT_MODEL:'${ getEnv( 'Model' ) }'` )

            console.log( '' )
  
// ----------------------------------------------------------------------------------
       
  function  getApps_n_Models( ) {                                                                   // .(40907.01.3 Write getApps_n_Models Beg)
       var  aJSONc_file     =    FRT.path( __basedir, '._2/FRTs/AICodeR/metadata/AIC80_Apps-n-Model-data.jsonc' )
       var  mJSONc          =    FRT.readFileSync( aJSONc_file ).split( /\r?\n/ )
       var  aJSON           = mJSONc.map( aLine => aLine.replace( /\/\/.*/, '' ).replace( /'/g, '"' ) ).join('\n')  // .(40907.01.4 RAM Could fail with embedded ' in string)  
                                 FRT.writeFileSync( aJSONc_file.replace(/\.jsonc/, '.json.mjs' ), `console.dir( \n${aJSON} \n)` )
       var  pJSON           =   JSON.parse( aJSON )
            Apps            =  pJSON.Apps
            Models2         =  pJSON.Models
            Apps            =   Apps.map(   (mRec,i) => [ `${i * 1}.`.padStart(4), ...mRec.slice(-2) ] ).slice(1)
            Models2         =  Models2.map( (mRec,i) => [ `${i * 1}.`.padStart(4), ...mRec.slice(-2) ] ).slice(1)
            Model_Templates =  pJSON.Model_Templates

            }                                                                                       // .(40907.01.3 End)
// ----------------------------------------------------------------------------------

//function  getDocsPath( aApp, aMod, aCR) {                                                         //#.(40729.03.x).(40715.04.4 Add function getDocsPath Beg).(40907.03.4)
  function  getDocsPath( aApp, aMod, aCR, bQuiet) {                                                 // .(40907.03.4).(40729.03.x).(40715.04.4 Add function getDocsPath Beg)
//     var  aAppName   = (AIM.getApp(                            2, aApp, 2 ))                      //#.(40814.02.1)
//     var  aModel_    = (AIM.getModel( (aMod.length == 7) ? 1 : 2, aMod, 2 ))                      //#.(40814.02.2)
       var  aAppName       =  getApp(                            2, aApp, 2 )                       // .(40814.02.1)
       var  aModel_        =  getModel( (aMod.length == 7) ? 1 : 2, aMod, 2 )                       // .(40814.02.2)
       var  aModel         = (aModel_  || '').trim()
       var  aDocs_Dir      =  aModel ? `docs/${aAppName}/${aModel}` : `docs/${aAppName}`
       var  aSessions_Dir  =  FRT.path( __basedir, aDocs_Dir )
       var  pStat          =  FRT.checkFileSync( aSessions_Dir )
       if (!pStat.isDir   ||  aAppName == '' || (aModel == '' && aModel_ == '')) {
//     var  aErrMsg        =  aAppName && aModel_ != '' ?  `AppName/Model folder, ./${aDocs_Dir}` : ( aModel_ ? `AppName, ''` : `aModel, ''` )
       var  aErrMsg        =  aAppName && aModel_ != '' ?  `AppName/Model folder, ./${aDocs_Dir}` : `AppName/Model, ''`
//          console.log(       `* ${aErrMsg}, does not exist.` ); aCR = ''                          // .(40729.03.x)
        if (bQuiet) {                                                                               // .(40907.03.5 Beg)
    return `* ${aErrMsg}, does not exist.`
            }                                                                                       // .(40907.03.5 End)
            console.log( `${ aCR ? aCR : '' }* ${aErrMsg}, does not exist.` ); aCR = ''             //#.(40729.03.x)
            deactivate() //  process_.exit()                                                        // .(40819.09.x)
            }
     return aSessions_Dir
            }                                                                                       // .(40715.04.4 End)
// ----------------------------------------------------------------------------------

  function  getApp(   nFld, aMod, aSub ) {                                              // .(40718.09.1 RAM Enhance getApp )
            aSub = typeof(aSub) != 'undefined' ? aSub : nFld
       if (!aMod     ) { return  selectRow( Apps, nFld ) }
        if (nFld == 0) { return  selectRow( Apps, nFld, aMod ) }
        if (nFld <= 2) { return (selectRow( Apps, nFld, aMod )[aSub] || '').trim() }
    return ''
            } // eof getApp
// ------------------------------------------------------------------------------

  function  getModel( nFld, aMod, aSub ) {                                              // .(40718.09.2 RAM Enhanced getModel )
            aSub = typeof(aSub) != 'undefined' ? aSub : nFld
       if (!aMod     ) { return  selectRow( Models2, nFld ) }                           //                  return 1 or 0 rows for alias, or all rows if no field
        if (nFld == 0) { return  selectRow( Models2, nFld, aMod ) }                     //                  return 1 or 0 rows for row number,
        if (nFld <= 2) { return (selectRow( Models2, nFld, aMod )[aSub] || '').trim() } //                  return 1 or 0 rows for field
//      if (nFld == 3) { return (Model_Templates[ aMod ][ aSub ] || '').trim() }        //#.(40801.06.1 RAM return 1 or 0 rows for template)
        if (nFld == 3) { aMod =  Model_Templates[ aMod ]                                // .(40801.06.2)
             if (aMod) { return (aMod[ aSub ] || '').trim() } }                         // .(40801.06.3 RAM return 1 or 0 rows for template)
        if (nFld == 4) { aMod =  getModel( 2, aMod, 1 )                                 // .(40801.06.4)
             if (aMod) { return (Model_Templates[ aMod ][ aSub ] || '').trim() } }      // .(40801.06.5 RAM return 1 or 0 rows for template)
    return ''
            }  // eof getModel
// ------------------------------------------------------------------------------

    function  getModels( nFld, aMod, aSub ) {                                           // .(40727.03.1 RAM Write getModels )
              aSub = typeof(aSub) != 'undefined' ? aSub : nFld
         if (!aMod     ) { return  selectRows( Models2, nFld ) }                        // return n or 0 rows for alias, or all rows if no field
          if (nFld == 0) { return  selectRows( Models2, nFld, aMod ) }                  // return n or 0 rows for row number,
          if (nFld <= 2) { return (selectRows( Models2, nFld, aMod ) ) }                // return n or 0 rows for field
      return ['','','']
              }  // eof getModels                                                       // .(40727.03.1 End)
// ------------------------------------------------------------------------------

function  selectRow( mRows, nFld, aVal ) {  var nOrigin = 0
       //      if (typeof(nFld) == 'undefined' ||  `${ typeof(nFld) || '' }` == '') { return mRows }        //#.(40721.01.1)
               if (typeof(nFld) == 'undefined' ||  nFld === ''  ) { return mRows }                          // .(40725.02.1 RAM Wow this is true: 0 == '' ).(40721.01.1 RAM S.B. this)
       //      if (typeof(nFld) == 'undefined'                  ) { return mRows }                          //#.(40721.01.1 RAM )
               if (typeof(nFld) == 'string'    ) { aVal = nFld; nFld  =  2 - (1 - nOrigin) }
               if (typeof(aVal) == 'undefined' ) { return mRows.map( mRow => mRow[ nFld - nOrigin ] ) }
               if ( aVal  == '' ) { return ''}
       //      if (isNaN(aVal)) { var nVal = 0 } else {var nVal = `{aVal * 1}.`.padStart(3) }               // .(40719.02.1 RAM Find ' 1.' )
               if (isNaN(aVal)) { var nVal = 0 } else  var nVal =   aVal * 1                                // .(40719.02.1 RAM Find ' 1.' )

               if (nFld > mRows[0].length - (1 - nOrigin)) {
                   console.log( `\n* Invalid field No ${nFld}. (Origin is now ${nOrigin})`); return ''
                   }
              var  nRow = mRows.findIndex( ( mRow, i ) => {
                      var  aFld  =  mRow[ nFld - nOrigin ];
       //          console.log(  aFld.slice( 0, aVal.length ), aVal )
                   return  nVal  ? (mRow[ nFld - nOrigin ] * 1) == nVal : aFld.slice( 0, aVal.length ) == aVal
                          } )
           return (nRow  != -1)  ?  mRows[ nRow ] : ''
              }
       // ----------------------------------------------------------------------------------

function  selectRows( mRows, nFld, aVal ) {  var nOrigin = 0                            // .(40727.03.2 RAM Write selectRows)
               if (typeof(nFld) == 'undefined' ||  nFld === ''  ) { return mRows }      // .(40725.02.2 RAM Wow this is true: 0 == '' ).(40721.01.1 RAM S.B. this)
               if (typeof(nFld) == 'string'    ) { aVal = nFld; nFld  =  2 - (1 - nOrigin) }
               if (typeof(aVal) == 'undefined' ) { return mRows.map( mRow => mRow[ nFld - nOrigin ] ) }
               if ( aVal  == '' ) { return ''}
//             if (isNaN(aVal)) {   var nVal = 0 } else  var nVal =   aVal * 1          //#.(40727.06.1)
               if (isNaN(aVal)) {   aVal = aVal  } else  var aVal =   `${aVal  * 1}.`   // .(40727.06.1 RAM fmt numeric id)
               if (nFld > mRows[0].length - (1 - nOrigin)) {
                   console.log( `\n* Invalid field No ${nFld}. (Origin is now ${nOrigin})`); return ''
                   }
//            var  rVal   = new RegExp( `^${aVal.replace( /-/, '' ).toLowerCase()}.*`, 'i' )
              var  rVal   = new RegExp( `${nFld < 2 ? '^' : '' }${aVal.toLowerCase()}.*`, 'i' )
              var  mRows2 = mRows.filter( ( mRow, i ) => {
                    var aFld    =  mRow[ nFld - nOrigin ].replace( /[- ]/, '' ).toLowerCase();
                    var bFound  =  aFld.match( rVal )
 //                 console.log(   aFld, `${aVal}: ${ bFound ? "found" : "not found" }` )
                 return bFound
                        } )
           return  mRows2
              }  // eof selectModels                                                    // .(40727.03.2 End)
       // ----------------------------------------------------------------------------------
       var  bTesting_Args   =  false
       var  bIsNotCalled    =  FRT.isCalled( __filename, process.argv[1]);               // .(40819.03.x)
        if (bIsNotCalled && bTesting_Args) {
       var  mParms = setArgs( [ '', '', '20', '2' ], 'get' )               // nThread: '020', nMsg: '02',  aTS: '', aApp: '',    aMod: ''
            console.log( `nThread: '${mParms[0]}', nMsg: '${mParms[1]}',  aTS: '${mParms[2]}', aApp: '${mParms[3]}', aMod: '${mParms[4]}' ` )
            deactivate() //  process_.exit()                                            // .(40819.09.x)
           }
// ------------------------------------------------------------------------------

  function  setArgs( mArgs, aGetSet, aQuit ) {
//     var  bSet  = 0,  bGet = 0, aVar;
//          console.log( `  setArgs[1]  mArgs:  '${ mArgs.join( "'\n                      '" ) }'` )
//          mArgs       =   mArgs.slice( 2 )                                                          //#.(40721.03.1 RAM ??)
//          mArgs       =   mArgs.slice( 2 + (    isNaN( mArgs[3] || '') ? 0 : 1 ) )                  //#.(40721.03.1 ??)
//          console.log( `  isNaN( mArgs[2]: : '${isNaN( mArgs[2])}'`  )
            mArgs       =   mArgs.slice( 2 + (    isNaN( mArgs[2]      ) ? 0 : 1 ) )                  // .(40721.03.1 Remove Step No from CLI)
//          console.log( `  setArgs[2]  mArgs:  '${ mArgs.join( "', '" ) }'` )
//      if (aGetSet    ==  'get') {  aVar = mArgs[0].slice(0,3).toLowerCase(); mArgs.shift(); bGet = 1 }
       var  mParms      =   chkArgs( mArgs, `${aGetSet}${aQuit}`.match(/quit/) ? 'quit' : '' )        // not 'quit'
//      if (mParms[3]  == '' && bGet && aVar == 'app') { mParms[3] = getEnv( 'APP');                    return mParms }
//      if (mParms[4]  == '' && bGet && aVar == 'mod') { mParms[4] = getEnv( 'Model');                  return mParms }
       var  bGet        =  (aGetSet == 'get' && mParms[5] == '') ? 1 : 0
       var  bSet        =  (aGetSet == 'set' && mParms[5] == '') ? 1 : 0
        if (mParms[3]  == '' && bGet                 ) { mParms[3] = getEnv( 'APP') || '';          } // return mParms }
        if (mParms[4]  == '' && bGet                 ) { mParms[4] = getEnv( 'MODEL') || '';        } // return mParms }
        if (mParms[3]  != '' && bSet                 ) {             setEnv( 'APP',    mParms[3] ); } // return mParms }
        if (mParms[4]  != '' && bSet                 ) {             setEnv( 'MODEL',  mParms[4] ); } // return mParms }
//          console.log( `  setArgs[3]  mParms: '${ mParms.join( "', '" ) }'` )
//          console.log( `* Invalid app or model alias: '${ mArgs.join( `','` ) }'` )
    return  mParms
            }
// ------------------------------------------------------------------------------

  function  getENV( aVar, aDefVal, aPreFix ) {                                          // .(40829.02.1 RAM Get from current .env Beg) 
//  delete  process.env.FRT_APP  
//  delete  process.env.FRT_MODEL  
//          process.env.FRT_APP  = "" 
//          process.env.FRT_MODEL  = ""  

            dotenv.config( { path: FRT.path( __basedir, '.env' ), override: true, debug: _debug } ); // .(40829.02.5)
     return getEnv( aVar, aDefVal, aPreFix ) 
            }  // eof getENV                                                            // .(40829.02.1 End)
// --------------------------------------------------------------

  function  getEnv( aVar, aDefVal, aPreFix ) {
//          console.log( `  getEnv[1] aVar: '${aVar}'. Looking in '${ process.env[ 'FRT_ENV' ] }'`)
            aPreFix     =   aPreFix ? `${aPreFix}` : "FRT"
            aVar        =   aVar.match( '^FRT_' ) ? aVar.slice(4) : aVar                            // .(40804.06.1 RAM Remove Leading 'FRT_' )
       var  aEnvVar     =  `${aPreFix}_${aVar.toUpperCase()}`
       var  aVal        =   aDefVal ? aDefVal : process.env[ aEnvVar ] || ''
        if (aVal == '') {
            console.log( `* The environment variable, '${aEnvVar}', is not defined` )
        } else {
//          console.log( `  getenv[2] Got default ${ `${aEnvVar}:`.padEnd(10) } '${aVal}'` )
            }
    return  aVal
            }  // eof getEnv
// ------------------------------------------------------------------------------
/*
  function  add2Env( aEnvFile, mNewEnvs ) {                                                         // .(40722.03.x RAM Add vars Beg)
       var  mOldEnvs    =  FRT.readFileSync(  aEnvFile ).split( "\n" )
            mNewEnvs.forEach(  aEnv  =>   mOldEnvs.push( fmtVar( aEnv ) ) )
            mOldEnvs    =  Array.from(new Set( mOldEnvs ))
                           FRT.writeFileSync( aEnvFile, mOldEnvs.join( "\n") )
    function fmtVar( a ) { var m = a.split("="); return `${m[0].trim().padEnd(15)} = "${m[1].trim()}"` }
            }  // eof add2Env                                                                       // .(40722.03.x End)
//     ---  ------------------------------------------
*/
  function  setEnv( aVar, aVal, aPreFix ) {
            aPreFix     =   aPreFix ? `${aPreFix}` : "FRT"
       var  aEnvVar     =`${aPreFix}_${ aVar.toUpperCase().replace( `${aPreFix}_`, '' ) }`
            process.env[    aEnvVar ] = aVal
       var  mEnvs       =   Object.entries( process.env ).filter( mEnv => mEnv[0].slice(0,4) == `${aPreFix}_` )
       var  mMyEnvs     =   mEnvs.map( mEnv => `${ mEnv[0].padEnd(15) } = "${mEnv[1]}"` )
//          console.log( `  Setting default ${ aEnvVar } to: '${ aVal }' in .env file` )             //#.(40729.05.2)
//          console.log( `  mMyEnvs:\n    ${   mMyEnvs.join( "\n    " ) }` )                         //#.(40729.05.3)
            FRT.writeFileSync( FRT.path( __basedir, '.env' ), mMyEnvs.join( "\n" ) )
            }
// ------------------------------------------------------------------------------

       var pAIM =  { setArgs, getApp, getModel                                          // .(40819.04.x RAM).(40711.01.2 RAM Add getApp).(40711.04.x RAM Add setArgs)
                   , getDocsPath, getModels, setEnv, getEnv, getENV }                   // .(40829.02.2).(40804.05.2).(40727.03.3).(40722.04.x).(40715.04.5)
                   
            module.exports = pAIM                                                       // .(40819.04.x RAM)

// ------------------------------------------------------------------------------

       var  bIsNotCalled    =  FRT.isCalled( __filename, process.argv[1]);              // .(40819.03.x)
       var  bIsCalled       = `${ process.env['CALL_IT'] }`.match( /true|1/ ) != null;

       var  bRunHere        =  bIsNotCalled && `${ process.env['CALL_IT'] }`.match( /true|1/ ) == null;
//          console.log( `bRun: ${ bRun },  bIsNotCalled :${ bIsNotCalled }, CALL_IT: ${ process.env['CALL_IT'] }` );
//          deactivate() //  process_.exit()                                            // .(40819.09.x)
// ---------------------------------------------------------------------------------------------------

        if (bRunHere) {

       if ("test1" == "text1") {
       var  aTable         = 'set'
       var  aRow           = 'model'
       var  aItem          = 'c35sann'
       var  aRow           = 'app'
       var  aItem          = 'c01'
            }
// ---------------------------------------------------------------------------------------------------

       if ("test2" == "text2") {
       var  aTable         = 'apps'
       var  aTable         = 'models'
       var  aRow           = 'c35sann'
       var  aRow           = ''
            }
// ---------------------------------------------------------------------------------------------------
/*
       var  aTable         =  process.argv.length > 2 ? process.argv[2] : ''
       var  aRow           =  process.argv.length > 3 ? process.argv[3] : ''
       var  aItem          =  process.argv.length > 4 ? process.argv[4] : ''

            console.log(   `  aTable: ${aTable}, aRow: '${aRow}'` )
       var  xTable         = (aTable.slice(0,3) == 'mod') ? getModel : getApp
//          console.log(      getModel( aRow ).map( m => '  ' + m.join( '  ' )).join( '\n' ) );
       var  mRows          =  aRow ? [ xTable( aRow ) || [ `* ${aTable.slice(0,-1)} not found: '${aRow}'` ] ] : xTable( aRow );
//          console.dir(      mRows, { depth: 9} )
            console.log("")
            console.log(      mRows.map( m => '  ' + m.join( '  ' )).join( '\n' ) );
*/            
            } // eif runhere 
// ---------------------------------------------------------------------------------------------------

function  deactivate() {  // This method is called when your extension is deactivated                // .(40825.04.3 RAM Move to here)
       if (typeof(vscode) != 'undefined') { console.log( "  deactivating extension" ); return }       // .(40825.04.4)
//     if (bTest1 || bTest2) { process.exit() }                                                       //#.(40825.04.5).(40819.09.1 RAM Move it here)
           process.exit()                                                                             // .(40825.04.5 RAM We know it is in test)
        }  //  eof deactivate
// -----------------------------------------------------------------------------------------
