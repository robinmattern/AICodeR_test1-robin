   import   FRT          from './AIC90_FileFns_u03.mjs'
//    let   FRT       = (await import( './AIC90_FileFns_u03.mjs' )).default             // .(.40810.01.1 RAM Allow use in CommonJS)
//    var   JC_parse  =  require( 'jsonc-parser' )                                      //#.(40907.01.x)
//    var   JC_parse  =  require( 'comment-json' )                                      //#.(40907.01.x)
// import   fs           from 'fs'                                                      // .(40907.01.x)

      var   __basedir =  FRT.__basedir                                                  // .(40819.10.7)
      var   __dirname =  FRT.__dirname                                                  // .(40819.10.7)
      var   _debug    =  false                                                          // .(40829.02.4 RAM dotenv for extension)

   import   dotenv       from 'dotenv';
//    let   dotenv    =  await import( 'dotenv' );                                      // .(.40810.01.2) 
//          dotenv.config( { path: FRT.path( __basedir, '.env' ) } )                    //#.(40829.02.5).(40725.03.1 RAM Added { path: '...' } )
            dotenv.config( { path: FRT.path( __basedir, '.env' ), override: true } )    // .(40829.01.2).(40725.03.1 RA< Added { path: '...' } )
//            
//          console.log( " ", FRT.path( __basedir, '.env' ) )
//     var  mEnvs     =  Object.entries( process.env ).filter( mEnv => mEnv[0].slice(0,4) == 'FRT_' )
//          console.log( "${__basedir}/.env:       ", `${__basedir}/.env` );
//          console.log( "process.env['FRT_APP']:  ", process.env['FRT_APP'  ] );
//          console.log( "process.env['FRT_MODEL']:", process.env['FRT_MODEL'] );
//          console.log( "  mEnvs:" ); console.log( " ", mEnvs.join( "\n  " ) )
//          process.exit()

      var   Apps                                                                        // .(40907.01.1 Beg)
      var   Models2
      var   Model_Templates
            getApps_n_Models()                                                          // .(40907.01.2 RAM Read vars from file) 
//          process.exit() 
                                                                                        // .(40907.01.1 End)  
// ----------------------------------------------------------------------------------
/*
            console.log( `  AIM[1]:  .env:      '${ FRT.path( __basedir, '.env' ) }'`)
            console.log( `  AIM[2]:   aApp:      ${ process.env.FRT_APP }` )
            console.log( `  AIM[3]:   aModel:    ${ process.env.FRT_MODEL }` )
            console.log( `  AIM[4]:   aAppName:  ${ FRT.AppName }\n` )
            console.log( `  AIM[5]:   FRT_APP:  '${ getEnv( 'App'   ) }'` )
            console.log( `  AIM[6]:   FRT_MODEL:'${ getEnv( 'Model' ) }'` )

            console.log( '' )
*/  
// ----------------------------------------------------------------------------------
       
  function  getApps_n_Models( ) {                                                                   // .(40907.01.3 Write getApps_n_Models Beg)
       var  aJSONc_file     =    FRT.path( __basedir, '._2/FRTs/AICodeR/metadata/AIC80_Apps-n-Model-data.jsonc' )
       var  mJSONc          =    FRT.readFileSync( aJSONc_file ).split( /\r?\n/ )
       var  aJSON           = mJSONc.map( aLine => aLine.replace( /\/\/.*/, '' ).replace( /'/g, '"' ) ).join('\n')  // .(40907.01.4 RAM Could fail with embedded ' in string)  
//                               FRT.writeFileSync( aJSONc_file.replace(/\.jsonc/, '.json.mjs' ), `console.dir( \n${aJSON} \n)` )
       var  pJSON           =   JSON.parse( aJSON )
            Apps            =  pJSON.Apps
            Models2         =  pJSON.Models
            Apps            =   Apps.map(   (mRec,i) => [ `${i * 1}.`.padStart(4), ...mRec.slice(-2) ] ).slice(1)
            Models2         =  Models2.map( (mRec,i) => [ `${i * 1}.`.padStart(4), ...mRec.slice(-2) ] ).slice(0)  // .(40908.05.3 RAM Don't remove default model here)
            Model_Templates =  pJSON.Model_Templates

            }  // getApps_n_Models                                                                  // .(40907.01.3 End)
// ----------------------------------------------------------------------------------

       var  pTemplates      =  Model_Templates; Model_Templates = {}                                // .(40907.04.1 RAM Opps_ ?? What is this for?) 
            Object.entries( pTemplates         ).forEach( mMod_Templates => { var aMod = mMod_Templates[0]; Model_Templates[ aMod ] = {} 
            Object.entries( pTemplates[ aMod ] ).forEach( m => { var aTyp = m[0], aFile = m[1].join( '' );  
                                     if (chkTemplate( aFile )) { Model_Templates[ aMod ][ aTyp ] = aFile } } )  
                                                 } )  // eol pTemplates
//     var  mTemplates      =  fmtTemplates( pTemplates, 'all' ).sort( (a,b) => (a > b) ? 1 : -1 )  
//          console.log( "\n ", mTemplates.join( "\n  " ) ); process.exit()                         // .(40821.02.1 RAM To view only)

  function  chkTemplate( aFile ) {                                                                  // .(40830.09.1 RAM Check if template exists )
            return true                                                                             // .(40830.09.2 RAM Don't check 
      var   aFound     =  FRT.checkFileSync( `${__basedir}/._2/FRTs/AICodeR/templates/${aFile}` ).exists ? 'Found' : 'Not Found'      
            console.log( ` ${ aFile.padEnd(70) } ${aFound}` ) 
            return aFound == 'Found'   
            }
  function  fmtTemplates(   pTemplates, aSelectTyp ) { var mTemplates = []
            Object.entries( pTemplates        ).forEach( mMod_Templates => { var aMod = mMod_Templates[0]
            Object.entries( mMod_Templates[1] ).forEach( m => {  var aTyp = m[0]; m = m[1] 
                                                   if (aSelectTyp == aTyp || aSelectTyp == 'all') {
            mTemplates.push( `${aTyp.padEnd(14)} ${m[0].padEnd(7)} ${aMod}  ${m[1].padEnd(29)} ${m[2]}` ) } } ) } )
    return  mTemplates                                                                         
            }  // eof fmtTemplates 
//          process.exit() 
// -----------------------------------------------------------------------------------
/*
            console.log( ` 'c37','...':`, getDocsPath( getApp( 2, 'c37' )[2], 'Claude3-So_Anthropic-chatgpt' ) )
            console.log( "  c35:       ", getDocsPath( getApp( 2, 'c35' )[2] ) )
            console.log( "  c88:       ", getDocsPath( getApp( 2, 'c88' )[2] ) )
            console.log( "  c35,  sdf :", getDocsPath( getApp( 2, 'c35' )[2], getModel( 2, 'sdf' ) ) )
            console.log( `  c35, 'sdf':`, getDocsPath( getApp( 2, 'c35' )[2], 'sdf' ) )
            console.log( ` 'sdf'      :`, getDocsPath( 'sdf' ) )
            console.log( ` 'appx','aa':`, getDocsPath( 'appx', 'aa' ) )
            console.log( ` 'appx',sdf :`, getDocsPath( 'appx', getModel( 2, 'sdf' )  ) )
            process.exit()
*/
//function  getDocsPath( aApp, aMod, aCR) {                                                         // .(40729.03.x).(40715.04.4 Add function getDocsPath Beg)
  function  getDocsPath( aApp, aMod, aCR, bQuiet) {                                                 // .(40907.03.4).(40729.03.x).(40715.04.4 Add function getDocsPath Beg)
//     var  aAppName   = (AIM.getApp(                            2, aApp, 2 ))                      //#.(40814.02.1)
//     var  aModel_    = (AIM.getModel( (aMod.length == 7) ? 1 : 2, aMod, 2 ))                      //#.(40814.02.2)
       var  aAppName       =  getApp(                            2, aApp, 2 )                       // .(40814.02.1)
//     var  aModel_        =  getModel( (aMod.length == 7) ? 1 : 2, aMod, 2 )                       //#.(40821.05.1).(40814.02.2)
       var  aModel_        =  aMod ? getModel( (aMod.length == 7) ? 1 : 2, aMod, 2 ) : ''           // .(40821.05.1 RAM aMod is MT for list sessions)
       var  aModel         = (aModel_  || '').trim()
       var  aDocs_Dir      =  aModel ? `docs/${aAppName}/${aModel}` : `docs/${aAppName}`
       var  aSessions_Dir  =  FRT.path( __basedir, aDocs_Dir )
       var  pStat          =  FRT.checkFileSync( aSessions_Dir )
       if (!pStat.isDir   ||  aAppName == '' || (aModel == '' && aModel_ != '')) {                   // .(40821.05.1 RAM aModel_ is not MT is aMod is passed)
//     var  aErrMsg        =  aAppName && aModel_ != '' ?  `AppName/Model folder, ./${aDocs_Dir}` : ( aModel_ ? `AppName, ''` : `aModel, ''` )
//     var  aErrMsg        =  aAppName && aModel_ != '' ?  `AppName/Model folder, ./${aDocs_Dir}` : `AppName/Model, ''`        //#.(40826.13.1)
       var  aErrMsg        =  aAppName && aModel_ != '' ?  `The AppName/Model folder, ./${aDocs_Dir}` : `The AppName, '${aAppName}'`   // .(40826.13.1 RAm Show aAppName)
//          console.log(       `* ${aErrMsg}, does not exist.` ); aCR = ''                          // .(40729.03.x)
        if (bQuiet) {                                                                               // .(40907.03.5 Beg)
    return `* ${aErrMsg}, does not exist.`
            }                                                                                       // .(40907.03.5 End)
            console.log( `${ aCR ? aCR : '' }* ${aErrMsg}, does not exist.` ); aCR = ''             //#.(40729.03.x)
            process.exit()
//   return `* ${aErrMsg}, does not exist.`
            }  // eif !pStat.isDir 
     return aSessions_Dir
            }                                                                                       // .(40715.04.4 End)
// ----------------------------------------------------------------------------------

//          console.log( "getApp:", getApp() )
//          console.log( "getApp( 0, 'c35' ):",    getApp( 0, 'c35' )    )  // same as no args
//          console.log( "getApp( 0, 2 ):",        getApp( 0,  2    )    )  // whole row
//          console.log( "getApp( 1, 2, 3 ):",     getApp( 1,  2, 3 )    )  // Just Appname, no workie
//          console.log( "getApp( 3, 'c35' ):",    getApp( 3, 'c35' )    )  //
//          console.log( "getApp( 2, 'c35' ):",    getApp( 2, 'c35' )    )
//          console.log( "getApp( 2, 'c35' )[2]:", getApp( 2, 'c35' )[2] )
//          console.log( "getApp( 2, 'c35' )[2]:", getApp( 2, 'c35' )[2] || '')
//          console.log( "getApp( 2, 'c88' ):",    getApp( 2, 'c88' )    )  // ''
//          console.log( "getApp( 2, 'c88' )[2]:", getApp( 2, 'c88' )[2] )  // undefined
//          console.log( "getApp( 2, 'c88' )[2]:", getApp( 2, 'c88' )[2] || '' )  // ''
//          process.exit()

//function  getApp(   nFld, aVal ) { return selectRow( Apps,    nFld, aVal ) }          //#.(40718.09.1).(40711.01.1 RAM Added)
  function  getApp(   nFld, aMod, aSub ) {                                              // .(40718.09.1 RAM Enhance getApp )
            aSub = typeof(aSub) != 'undefined' ? aSub : nFld
       if (!aMod     ) { return  selectRow( Apps, nFld ) }
        if (nFld == 0) { return  selectRow( Apps, nFld, aMod ) }
        if (nFld <= 2) { return (selectRow( Apps, nFld, aMod )[aSub] || '').trim() }
    return ''
            } // eof getApp
// ------------------------------------------------------------------------------

//          console.log( "getModel( 1, 'c35sanm', 2 ):", getModel( 1, 'c35sanm', 2 ) )
//          console.log( "getModel( 2, 'c35sanm', 2 ):", getModel( 2, 'c35sanm', 2 ) )
//          console.log( "getModel(                 ):", getModel(                 ) )   // all models
//          console.log( "getModel( 0               ):", getModel( 0               ) )   // all row numbers
//          console.log( "getModel( 0, 4            ):", getModel( 0, 4            ) )   // whole row 
//          console.log( "getModel( 0, 4, 0         ):", getModel( 0, 4, 0         ) )   // whole row 
//          console.log( "getModel( 0, 4, 0         ):", getModel( 0, 4, 0         ) )   // awhole row ??
//          console.log( "getModel( 0, 4, 2         ):", getModel( 0, 4, 2         ) )   // awhole row ??
//          console.log( "getModel( 1               ):", getModel( 1               ) )   // all alaases
//          console.log( "getModel( 2               ):", getModel( 2               ) )   // all names
//          console.log( "getModel( 0, 'c35sanm'    ):", getModel( 0, 'c35sanm'    ) )
//          console.log( "getModel( 1, 'c35sanm'    ):", getModel( 1, 'c35sanm'    ) )
//          console.log( "getModel( 2, 'c35sanm'    ):", getModel( 2, 'c35sanm'    ) )
//          console.log( "getModel( 1, 'c35sanm', 0 ):", getModel( 1, 'c35sanm', 0 ) )
//          console.log( "getModel( 1, 'c35sanm', 2 ):", getModel( 1, 'c35sanm', 2 ) )
//          console.log( "getModel( 2, 'xxxxxxx', 1 ):", getModel( 2, 'xxxxxxx', 1 ) )

//          console.log( "getModel(    'c35sanm'    ):", getModel(    'c35sanm'    ) )
//          console.log( "getModel( 3 ,'c35sanm', 'usermsg_.txt' ):", getModel( 3, 'c35sanm', 'usermsg_.txt' ) )
//          console.log( "getModel( 3 ,'gp4oopu', 'request_.sh'  ):", getModel( 3, 'gp4oopu', 'request_.sh'  ) )

//          console.log( "getModel( 3 ,'xxxxxxx', 'usermsg_.txt' ):", getModel( 3, 'xxxxxxx', 'usermsg_.txt' ) )
//          console.log( "getModel( 3 ,'xxxxxxx', 'xxxxxxx_.txt' ):", getModel( 3, 'c35sanm', 'xxxxxxx_.txt' ) )

//          console.log( "getModel( 4 ,'GPT-4o_OpenAI-curl', 'systmsg_.txt' ):", getModel( 4, 'GPT-4o_OpenAI-curl', 'systmsg_.txt' ) )
//          console.log( "getModel( 4 ,'GPT-4o_OpenAI-xxxx', 'usermsg_.txt' ):", getModel( 4, 'GPT-4o_OpenAI-xxxx', 'usermsg_.txt' ) )
//          console.log( "getModel( 4 ,'GPT-4o_OpenAI-curl', 'xxxxxxx_.txt' ):", getModel( 4, 'GPT-4o_OpenAI-curl', 'xxxxxxx_.txt' ) )

//          console.log( "getModel(                 ):", getModel() )

//          console.log( "getModels(               ):", getModels(              ) )  // all models
//          console.log( "getModels( 0             ):", getModels( 0            ) )
//          console.log( "getModels( 0,   4        ):", getModels( 0,   4       ) )
//          console.log( "getModels( 0,  14        ):", getModels( 0,  14       ) )
//          console.log( "getModels( 1,  'bo'      ):", getModels( 1,  'bo'     ) )
//          console.log( "getModels( 1,  'gp'      ):", getModels( 1,  'gp'     ) )
//          console.log( "getModels( 2,  'vertex'  ):", getModels( 2,  'vertex' ) )
//          console.log( "getModels( 0,  '4'       ):", getModels( 0,  '4'      ) )
//          console.log( "getModels( 0,  '4.'      ):", getModels( 0,  '4.'     ) )
//          console.log( "getModels( 1 ,'gp4oopu'  ):", getModels( 1, 'gp4oopu' ) )
//          console.log( "getModels( 1 ,'gp4o'     ):", getModels( 1, 'gp4o'    ) )
//          console.log( "getModels( 2 ,'gpt4o'    ):", getModels( 2, 'gpt4o'   ) )
//          console.log( "getModels( 2 ,'claude'   ):", getModels( 2, 'claude'  ) )
//          console.log( "getModels( 2 ,'openai'   ):\n", getModels( 2, 'openai'  ).map( aRow => aRow.join( " " ) ).join( "\n " ) )
//          console.log( "getModels( 2 ,'-web'     ):\n", getModels( 2, '-web'    ).map( aRow => aRow.join( " " ) ).join( "\n " ) )
//          console.log( "getModels( 1 ,'xx'       ):", getModels( 1, 'xx'      ) )
//          process.exit()

//function  getModel( nFld, aVal ) { return selectRow( Apps,    nFld, aVal ) }          //#.(40718.09.2).(40711.01.1 RAM Added)
  function  getModel( nFld, aMod, aSub ) {                                              // .(40718.09.2 RAM Enhanced getModel )
            aSub = typeof(aSub) != 'undefined' ? aSub : nFld
       if (!aMod     ) { return  selectRow( Models2, nFld ) }                           //                  return 1 or 0 rows for alias, or all rows if no field
        if (nFld == 0) { return  selectRow( Models2, nFld, aMod ) }                     //                  return 1 or 0 rows for row number,
        if (nFld <= 2) { return (selectRow( Models2, nFld, aMod )[aSub] || '').trim() } //                  return 1 or 0 rows for field
//      if (nFld == 3) { return (Model_Templates[ aMod ][ aSub ] || '').trim() }        //#.(40801.06.1 RAM return 1 or 0 rows for model templates)
        if (nFld == 3) { var mTemplates =  Model_Templates[ aMod ]                      // .(40801.06.2)
                         if (mTemplates) { return (mTemplates[ aSub ] || '').trim() } } // .(40801.06.3 RAM return 1 or 0 rows for aMod template file: aSub)
//      if (nFld == 4) { aMod =  getModel( 2, aMod, 1 )                                 //#.(40801.06.4).(40827.03.1)
//           if (aMod) { return (Model_Templates[ aMod ][ aSub ] || '').trim() } }      //#.(40801.06.5 RAM return 1 or 0 rows for aModel template file: aSub).(40827.03.2)
        if (nFld == 4) { var mTemplates = Model_Templates[ getModel( 2, aMod, 1 ) ]     // .(40827.03.1 RAM Does it have a valid template).(40801.06.4)
                         if (mTemplates) { return (mTemplates[ aSub ] || '').trim() } } // .(40827.03.2).(40801.06.5 RAM return 1 or 0 rows for aModel template file: aSub)
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
//      if (typeof(nFld) == 'undefined' ||  `${ typeof(nFld) || '' }` == '') { return mRows }       //#.(40721.01.1)
//      if (typeof(nFld) == 'undefined' ||  nFld === ''  ) { return mRows }                         //#.(40725.02.1 RAM Wow this is true: 0 == '' ).(40721.01.1 RAM S.B. this)
//      if (typeof(nFld) == 'undefined' ||  nFld === ''  ) { return mRows }                         //#.(40725.02.1 RAM Wow this is true: 0 == '' ).(40721.01.1 RAM S.B. this).(40908.05.5)
        if (typeof(nFld) == 'undefined' ||  nFld === ''  ) { return mRows.slice(1) }                // .(40908.05.5)(40725.02.1 RAM Wow this is true: 0 == '' ).(40721.01.1 RAM S.B. this)
//      if (typeof(nFld) == 'undefined'                  ) { return mRows }                         //#.(40721.01.1 RAM )
        if (typeof(nFld) == 'string'    ) { aVal = nFld; nFld  =  2 - (1 - nOrigin) }
        if (typeof(aVal) == 'undefined' ) { return mRows.slice(1).map( mRow => mRow[ nFld - nOrigin ] ) }  // .(40908.05.6 RAM Do Remove first row)
        if ( aVal  == '' ) { return ''}
//      if (isNaN(aVal)) { var nVal = 0 } else {var nVal = `{aVal * 1}.`.padStart(3) }              // .(40719.02.1 RAM Find ' 1.' )
        if (isNaN(aVal)) { var nVal = 0 } else  var nVal =   aVal * 1                               // .(40719.02.1 RAM Find ' 1.' )

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

  function  selectRows( mRows, nFld, aVal ) {  var nOrigin = 0                                      // .(40727.03.2 RAM Write selectRows)
        if (typeof(nFld) == 'undefined' ||  nFld === ''  ) { return mRows }                         // .(40725.02.2 RAM Wow this is true: 0 == '' ).(40721.01.1 RAM S.B. this)
        if (typeof(nFld) == 'string'    ) { aVal = nFld; nFld  =  2 - (1 - nOrigin) }
        if (typeof(aVal) == 'undefined' ) { return mRows.slice(1).map( mRow => mRow[ nFld - nOrigin ] ) }  // .(40908.05.6 RAM Remove first row)
        if ( aVal  == '' ) { return ''}
//      if (isNaN(aVal)) {   var nVal = 0 } else  var nVal =   aVal * 1                             //#.(40727.06.1)
        if (isNaN(aVal)) {   aVal = aVal  } else  var aVal =   `${aVal  * 1}.`                      // .(40727.06.1 RAM fmt numeric id)
        if (nFld > mRows[0].length - (1 - nOrigin)) {
            console.log( `\n* Invalid field No ${nFld}. (Origin is now ${nOrigin})`); return ''
            }
//     var  rVal   =  new RegExp( `^${aVal.replace( /-/, '' ).toLowerCase()}.*`, 'i' )
//     var  rVal   =  new RegExp( `${nFld < 2 ? '^'   : '' }${aVal.toLowerCase()}.*`, 'i' )         //#.(40826.10.1 RAM Why isn't this working)
//     var  rVal   =  new RegExp( `${nFld < 2 ? '^ *' : '' }${aVal.toLowerCase()}*`,  'i' )         // .(40826.10.1 RAM Will this work, perhaps)
       var  rVal   =  new RegExp( `${nFld < 2 ? '^ *' : '' }${aVal.toLowerCase()}.*`, 'i' )         //#.(40826.10.1 RAM Will this work)

       var  mRows2 =  mRows.filter( ( mRow, i ) => {
//          var  aFld   =    mRow[ nFld - nOrigin   ].replace( /[- ]/, '' ).toLowerCase();          // .(40826.10.2 RAM Why isn't this working)
            var  aFld   = `${mRow[ nFld - nOrigin ]}`.replace( /[- ]/, '' ).toLowerCase();          // .(40826.10.2 RAM Make fld 0 a string)
//               console.log( `aFld: '${aFld}'.match( ${rVal} ) = ${ aFld.match( rVal ) ? 'T' : 'F' }` ) // .(40826.10.3 RAM Show all potential matches)
            var  bFound =    aFld.match( rVal )
//               console.log(   aFld, `${aVal}: ${ bFound ? "found" : "not found" }` )
         return  bFound != null
                 } )  // eol mRows.filter 
    return  mRows2
            }  // eof selectModels                                                                  // .(40727.03.2 End)
       // ----------------------------------------------------------------------------------
/*
//          chkArgs( [] )
//          chkArgs( [''] )
            chkArgs( ['c35'  ] )
//          chkArgs( ['c21'  ] )
            chkArgs( ['a21'  ] )
            chkArgs( ['c99'  ] )
//          chkArgs( [ 1,2,5 ] )
//          chkArgs( [ 1,2,    'c21'] )
            chkArgs( [ 1.2,    'c35'] )
            chkArgs( [ 1.2,5,  'c35', 'dfg'     ] )
            chkArgs( [ 1.2,5,  'c35', 'aaaaaaa' ] )
            chkArgs( ['1.2.5', 'c99', 'c35sann'  ] )
            chkArgs( ['1.2.40711.1304', 'c35', 'c35sann' ] )
*/
       var  bTesting_Args   =  false
//     var  bTesting_Args   =  true
       var  bIsNotCalled    =  FRT.isCalled( import.meta.url, process.argv[1]);                     // .(40819.03.x)
        if (bIsNotCalled && bTesting_Args) {
//          setArgs( [ 'c55'        ] )   //  ** App alias not found: 'c55'  (if not in mApps)
//          setArgs( [ 'get', 'c55' ] )   //  ** App alias not found: 'c55'  (if not in mApps)
//          setArgs( [ 'set', 'c55' ] )   //  ** App alias not found: 'c55'  (if not in mApps)
//          setArgs( [ 'c37'        ] )   // nThread: '', nMsg: '',  aTS: '', aApp: 'c37', aMod: ''
//          setArgs( [ 'get', 'c37' ] )   // nThread: '', nMsg: '',  aTS: '', aApp: 'c37', aMod: ''
//          setArgs( [ 'set', 'foo'     ] )   // nThread: '', nMsg: '',  aTS: '', aApp: 'c37', aMod: ''
//     var  mParms = setArgs( [ 'set', 'fooey'       ] )   // nThread: '', nMsg: '',  aTS: '', aApp: 'c37', aMod: ''
//     var  mParms = setArgs( [ 'get', 'app',  'c37' ] )   // nThread: '', nMsg: '',  aTS: '', aApp: 'c37', aMod: ''
//     var  mParms = setArgs( [ 'get', 'model', ''   ] )   // nThread: '', nMsg: '',  aTS: '', aApp: 'c37', aMod: ''
//     var  mParms = setArgs( [ 'set', 'gp4oopu'     ] )   // nThread: '', nMsg: '',  aTS: '', aApp: 'c37', aMod: ''
//     var  mParms = setArgs( [ 'set', 'c35'         ] )   // nThread: '', nMsg: '',  aTS: '', aApp: 'c37', aMod: ''
//          mParms = setArgs(    process.argv          )   // nThread: '', nMsg: '',  aTS: '', aApp: 'c37', aMod: ''

//     var  mParms = setArgs( [ '', '', 'c37'                 ], 'get' )   // nThread: '',    nMsg: '',    aTS: '', aApp: 'c37', aMod: ''
//     var  mParms = setArgs( [ '', '', '20.2', '', 'gp4oopm' ], 'get' )   // nThread: '020', nMsg: '02',  aTS: '', aApp: '',    aMod: 'gp4oopm'
       var  mParms = setArgs( [ '', '', '20', '2' ], 'get' )               // nThread: '020', nMsg: '02',  aTS: '', aApp: '',    aMod: ''

            console.log( `nThread: '${mParms[0]}', nMsg: '${mParms[1]}',  aTS: '${mParms[2]}', aApp: '${mParms[3]}', aMod: '${mParms[4]}' ` )

//          setArgs( [ '1.2.40711.1304' ] )
//          setArgs( [ 'c35', ] )
//          setArgs( [ 'set', '1.2.40711.1304', 'c35', 'c35sann' ] )
//          setArgs( [ 'get', '1.2.40711.1304', 'c35' ] )
            process.exit()
           }
// ------------------------------------------------------------------------------

  function  setArgs( mArgs, aGetSet, aQuit ) {
//     var  bSet  = 0,  bGet = 0, aVar;
//          console.log( `  setArgs[1]  mArgs:  '${ mArgs.join( "'\n                      '" ) }'` )
//          mArgs       =   mArgs.slice( 2 )                                                        //#.(40721.03.1 RAM ??)
//          mArgs       =   mArgs.slice( 2 + (    isNaN( mArgs[3] || '') ? 0 : 1 ) )                //#.(40721.03.1 ??)
//          console.log( `  isNaN( mArgs[2]: : '${isNaN( mArgs[2])}'`  )
//          mArgs       =   mArgs.slice( 2 )                                                        //#.(40827.08.3 RAM Always remove first two rows
//      if (mArgs[0].match( /AIC05_/ )) {                                                           //#.(40827.08.3 RAM Only if AIC05_Schema-IO script)
//          mArgs       =   mArgs.slice( 2 + (    isNaN( mArgs[2]      ) ? 0 : 1 ) )                //#.(40721.03.1 RAM Remove Step No or from CLI)
//          }                                                                                       //#.(40827.08.4)
            mArgs       =  (/AIC05_/.test( mArgs[1] )) ? mArgs.slice(1) : mArgs                     // .(40827.08.4 Remove Step No or from CLI Only if AIC05_Schema-IO script)
            mArgs       =  (mArgs[0] == 'prompt'     ) ? mArgs.slice(1) : mArgs                     // .(40820.04.x RAM Kloodgy)
            mArgs       =   mArgs.slice( 2 )                                                        // .(40827.08.3 RAM Always remove first two rows
//          console.log( `  setArgs[2]  mArgs:  '${ mArgs.join( "', '" ) }'` )
//      if (aGetSet    ==  'get') {  aVar = mArgs[0].slice(0,3).toLowerCase(); mArgs.shift(); bGet = 1 }
       var  mParms      =   chkArgs( mArgs, `${aGetSet}${aQuit}`.match(/quit/) ? 'quit' : '' )      // not 'quit'
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

  function  getEnv( aVar, aDefVal, aPreFix ) {
//          console.log( `  getEnv[1] aVar: '${aVar}'. Looking in '${ process.env[ 'FRT_ENV' ] }'`)
            aPreFix     =   aPreFix ? `${aPreFix}` : "FRT"
            aVar        =   aVar.match( '^FRT_' ) ? aVar.slice(4) : aVar                            // .(40804.06.1 RAM Remove Leading 'FRT_' )
       var  aEnvVar     =  `${aPreFix}_${aVar.toUpperCase()}`
       var  aVal        =   aDefVal ? aDefVal : process.env[ aEnvVar ] || ''
        if (aVal == '') {
            console.log( `* The environment variable, '${aEnvVar}', is not defined` )
        } else {
//          console.log( `  getenv[2]  Got default ${ `${aEnvVar}:`.padEnd(10) } '${aVal}'` )
            }
    return  aVal
            }  // eof getEnv
// ------------------------------------------------------------------------------
  function  add2Env( aEnvFile, mNewEnvs ) {                                                         // .(40722.03.x RAM Add vars Beg)
       var  mOldEnvs = FRT.readFileSync(  aEnvFile ).split( "\n" )
            mNewEnvs.forEach(  aEnv  =>   mOldEnvs.push( fmtVar( aEnv ) ) )
            mOldEnvs = Array.from(new Set( mOldEnvs ))
                       FRT.writeFileSync( aEnvFile, mOldEnvs.join( "\n") )
    function fmtVar( a ) { var m = a.split("="); return `${m[0].trim().padEnd(15)} = "${m[1].trim()}"` }
            }  // eof add2Env                                                                       // .(40722.03.x End)
//     ---  ------------------------------------------

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

  function  chkArgs( mArgs, aQuit ) {
//          mArgs     =  mArgs.slice(2)
     //     mArgs[0]
       var  aSM = '', mParms = ['','','', '', '', ''], rNums = /^[0-9.]+/
        if (rNums.test(mArgs[0])) { aSM +=        mArgs[0]; mArgs.shift() }   // nThread (aka Session): 001
        if (rNums.test(mArgs[0])) { aSM += '.' +  mArgs[0]; mArgs.shift() }   // nMsg: 01
        if (rNums.test(mArgs[0])) { aSM += '.' +  mArgs[0]; mArgs.shift() }   // aDayTS: 40711.1301
        if (aSM != '') {
       var  mSM = aSM.split( '.' )
            mParms[0] = (mSM[0] || '').padStart( 3, '0' )
            mParms[1] = (mSM[1] || '').padStart( 2, '0' )
            mParms[2] =  mSM[3] ? `${mSM[2]}.${mSM[3]}` : (mSM[2] || '')
            }
        if (mArgs[0]  && mArgs[0].length == 3) {   // Check App alias
            mParms[3] = /[cs][0-9]{2}/.test( mArgs[0] || '') ?  mArgs[0] : `* Invalid App alias: '${mArgs[0]}'`
//          mParms[3] = /^\*/.test(  mParms[3] ) ? mParms[3] : (getApp(   1, mParms[3] )[1] || '').trim()     //#.(40718.09.19) // origin 0
//          mParms[3] = /^\*/.test(  mParms[3] ) ? mParms[3] : (getApp(   1, mParms[3] )                      //#.(40718.09.19 RAM Keep leading '*')
            mParms[3] = /^\*/.test(  mParms[3] ) ? mParms[3] :  getApp(   1, mParms[3] )                      // .(40718.09.19 RAM New getApp)
            mParms[3] =  mParms[3] ? mParms[3] : `* The App alias not found: '${mArgs[0]}'`
            mArgs.shift()
            }
        if (mArgs.length == 2) { var n = 1 } else { var n = 0 }                                               // .(40718.09.20 RAM ??)

        if (rNums.test(mArgs[n])) {                                                                           // .(40827.08.1 RAM Special case for Session No. Beg)  
            mParms[0] = (mArgs[n] || '').padStart( 3, '0' )                                                   // nThread (aka Session): 001
        if (n == 1) { mArgs.splice(-1); n = 0 } else { mArgs.shift() }
            }                                                                                                 // .(40827.08.1 End)
        if (mArgs[n]  && mArgs[n].length == 7) {    // Check Model alias
            mParms[4] = /[a-z0-9]{7}/.test(  mArgs[n] || '') ?  mArgs[n] : `* Invalid Model alias: '${mArgs[0]}'`
//          mParms[4] = /^\*/.test(  mParms[4] ) ? mParms[4] : (getModel( 1, mParms[4] )[1] || '').trim()     //#.(40718.09.21)
            mParms[4] = /^\*/.test(  mParms[4] ) ? mParms[4] :  getModel( 1, mParms[4] )                      // .(40718.09.21 RAM New getApp)
            mParms[4] =  mParms[4] ? mParms[4] : `* The Model alias not found: '${mArgs[n]}'`
            mArgs.splice(-1)
            }
        if (rNums.test(mArgs[0])) {                                                                           // .(40827.08.2 RAM Special case for Session No. Beg)  
            mParms[0] = (mArgs[0] || '').padStart( 3, '0' )                                                   // nThread (aka Session): 001
            mArgs.shift()
            }                                                                                                 // .(40827.08.2 End)
        if (mArgs[0]) {
            n = mArgs.length == 1 ? "" : "s"
            mParms[5] =  `* Invalid argument${n}: '${ mArgs.join("', '") }'`
            }
//      if (aQuit == 'quit') {
        var aCR="\n"; // aQuit = ''
            if (mParms[3].match( /^\*/)) { console.log( aCR + mParms[3] ); aCR = '' } // aQuit = 'quit' }
            if (mParms[4].match( /^\*/)) { console.log( aCR + mParms[4] ); aCR = '' } // aQuit = 'quit' }
            if (mParms[5].match( /^\*/)) { console.log( aCR + mParms[5] ); aCR = '' } // aQuit = 'quit' }
            if (aQuit == 'quit' && aCR == '') { process.exit() }
//          }
//          console.log( `  nThread: '${mParms[0]}', nMsg: '${mParms[1]}',  aTS: '${mParms[2]}', aApp: '${mParms[3]}', aMod: '${mParms[4]}' ` )
    return  mParms
            }
// ----------------------------------------------------------------------------------

            export default { setArgs, getApp, getModel, selectRow                       // .(40711.01.2 RAM Add getApp).(40711.04.x RAM Add setArgs)
                           , getDocsPath, getModels, setEnv, add2Env                    // .(40727.03.3).(40722.04.x).(40715.04.5)
                           , getEnv }                                                   // .(40804.05.2)

// ------------------------------------------------------------------------------

       var  bIsNotCalled    =  FRT.isCalled( import.meta.url, process.argv[1]);
       var  bIsCalled       = `${ process.env['CALL_IT'] }`.match( /true|1/ ) != null;

       var  bRunHere        =  bIsNotCalled && `${ process.env['CALL_IT'] }`.match( /true|1/ ) == null;
//          console.log( `bRun: ${ bRun },  bIsNotCalled :${ bIsNotCalled }, CALL_IT: ${ process.env['CALL_IT'] }` );
//          process.exit()
// ---------------------------------------------------------------------------------------------------

        if (bRunHere) {

       var  aTable         =  process.argv.length > 2 ? process.argv[2] : ''
       var  aRow           =  process.argv.length > 3 ? process.argv[3] : ''
       var  aItem          =  process.argv.length > 4 ? process.argv[4] : ''

       if ("test1" == "text1") {
       var  aTable         = 'set'
       var  aRow           = 'model'
       var  aItem          = 'c35sann'
       var  aRow           = 'app'
       var  aItem          = 'c01'
            }
// ---------------------------------------------------------------------------------------------------

//          console.log( `aTable: '${aTable}', aRow: '${aRow}', aItem: '${aItem}'` )
//          process.exit()

//          setVars( aTable, aRow, aItem )                                                          //#.(40826.09.10 Call here) 
/*                                                                                                  //#.(40826.09.10 Move to AIC91 Beg)                        
       var  aTable         =  process.argv.length > 2 ? process.argv[2] : ''
       var  aRow           =  process.argv.length > 3 ? process.argv[3] : ''
       var  aItem          =  process.argv.length > 4 ? process.argv[4] : ''

  function  setVars( aTable, aRow, aItem ) {                                                         

        if (aTable == 'set' && aRow.slice(0,3) == 'sho' ) {                                         // .(40717.01.3 RAM Add set show)
       var  mEnvs1        =   Object.entries( process.env ).filter( mEnv => mEnv[0].slice(0,4) == `FRT_` )
       var  mEnvs1        =   mEnvs1.map( mEnv => `${ mEnv[0].padEnd(12) } = "${mEnv[1]}"` )
            console.log( "" )
            console.log(   `  ${mEnvs1.join("\n  ") }`)
            process.exit()
            }
// ---------------------------------------------------------------------------------------------------

       if (aTable == 'set' && aRow.slice(0,3) == 'app' ) {
//     var  aRow           =  process.argv.length > 4 ? process.argv[4] : aRow
//     var  aAppName       = (getApp(   1, aItem )[2] || '').trim()                                 //#.(40718.09.22)
            aItem          =  aItem ? aItem : chkApp( )                                              
       var  aAppName       = (getApp(   1, aItem,  2 ))         // (()[2] || '').trim()             // .(40718.09.22)
        if (aAppName == "") {
            console.log( `\n* Invalid app: '${aItem}'` )
            process.exit()
            }
//          console.log( `\n  Setting app to: '${aAppName}'` )
//          process.env[     "FRT_APP"] = aAppName
                              setEnv( "App", aAppName )
            process.exit()
            }
// ---------------------------------------------------------------------------------------------------

        if (aTable == 'set' && aRow.slice(0,3) == 'mod' ) {
//     var  aRow           =  process.argv.length > 4 ? process.argv[4] : aRow
            aItem          =  aItem ? aItem : ask4Model( )                                           
       var  aModel         = (getModel( 1, aItem,  2 ))         // (()[2] || '').trim()             // .(40718.09.23)
        if (aModel == "") {
            console.log( `\n* Invalid model: '${aItem}'` )
            process.exit()
            }
//          console.log( `\n  Setting model to: ${aItem}  ${aModel}' ` )
//          process.env[     "FRT_MODEL"] = aModel
                              setEnv( "Model",  aModel )
            process.exit()
            }
// ---------------------------------------------------------------------------------------------------
       }  // eof setVars
// ---------------------------------------------------------------------------------------------------
*/                                                                                                  //#.(40826.09.10 END)                        
       if ("test2" == "text2") {
       var  aTable         = 'apps'
       var  aTable         = 'models'
       var  aRow           = 'c35sann'
       var  aRow           = ''
            }
//   -----------------------------------

//     var  aRow           = '' // 'gp4oopm'
//     var  aRow           =  process.argv.length > 3 ? process.argv[3] : ''

            console.log(   `  aTable:   '${aTable}', aRow: '${aRow}'` )                                                      // .(40826.09.11 RAM What is this for? List Apps/Models)
//     var  xTable         = (aTable.slice(0,3) == 'mod') ? getModel : getApp
       var  xTable         = (aTable.slice(0,3) == 'app') ? getApp   : getModel                                              // .(40821.01.1 RAM Reverse App and Model)  
//          console.log(      getModel( aRow ).map( m => '  ' + m.join( '  ' )).join( '\n' ) );
       var  mRows          =  aRow ? [ xTable( aRow ) || [ `* The ${aTable.slice(0,-1)} not found: '${aRow}'` ] ] : xTable( aRow );
//          console.dir(      mRows, { depth: 9} )
            console.log("")
//          console.log(      mRows.map( m => '  ' + m.join( '  ' )).join( '\n' ) );                                         //#.(40821.01.2)
            console.log(      mRows.map( m => { m[0] = `${m[0]}`.padStart(4); return m.join( '  ' ) } ).join( '\n' ) );      // .(40821.01.2 RAM Format No.)
            } // eif runhere 
// ---------------------------------------------------------------------------------------------------

