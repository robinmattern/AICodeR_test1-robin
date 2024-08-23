   import   FRT          from './AIC90_FileFns_u03.mjs'
//    let   FRT       = (await import( './AIC90_FileFns_u03.mjs' )).default            // .(.40810.01.1 RAM Allow use in CommonJS)
   import   dotenv       from 'dotenv';
//    let   dotenv    =  await import( 'dotenv' );                                     // .(.40810.01.2) 

            dotenv.config( { path: FRT.path( __basedir, '.env' ) } )                   // .(40725.03.1 RA< Added { path: '...' } )
//          console.log( " ", FRT.path( __basedir, '.env' ) )
       var  mEnvs       =   Object.entries( process.env ).filter( mEnv => mEnv[0].slice(0,4) == 'FRT_' )
//          console.log( "${__basedir}/.env:       ", `${__basedir}/.env` );
//          console.log( "process.env['FRT_APP']:  ", process.env['FRT_APP'  ] );
//          console.log( "process.env['FRT_MODEL']:", process.env['FRT_MODEL'] );
//          console.log( "  mEnvs:" ); console.log( " ", mEnvs.join( "\n  " ) )
//          process.exit()

       var  Apps =                                                                      // .(40711.01.3 RAM Add Apps table)
             [ [ ' 1.', 'c01', 'c01_calendar-app         ' ] //                         // .(40719.01.1 RAM Add C01 App)
             , [ ' 2.', 'c35', 'c35_calendar1-app        ' ] //
             , [ ' 3.', 'c36', 'c36_hawaii-contracts-app ' ] //
             , [ ' 4.', 'c37', 'c37_aicoder-sessions-app ' ] //
             , [ ' 5.', 'c38', 'c38_login-app            ' ] //
             , [ ' 6.', 'c42', 'c42_whatever-app         ' ] //
             , [ ' 7.', 'c43', 'c43_chrome-extension-app ' ] //
             , [ ' 8.', 'c44', 'c44_a-dancers-dream-app  ' ] //
             , [ ' 9.', 's35', 's35_calendar-app         ' ] //
               ]
// ----------------------------------------------------------------------------------

       var  pTemplates =
             { 'c35sanm': { 'usermsg_.txt' : ['.TXTs/', 'c35sanm_Claude-35s_Anthropic','_usermsg__u01.1_template.txt' ]  // Claude-35s_Anthropic-maxi
            ///           , 'request_.json': ['.JSONs/','c35sann_Claude-35s_Anthropic  '_request__u01.1_template.json']
            ///           , 'messages.json : ['.JSONs/','c35sanm_Claude-35s_Anthropic','_messages_u01.1_template.json']
                          , 'markdown.md'  : ['.MDs/',  'anymowa_AnyModel_Owner',      '_markdown_u01.1_template.md'  ]  // .(40821.02.1).(40801.02.7)
                             }
             , 'c35sann': { 'usermsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_usermsg__u01.1_template.txt' ]  // Claude-35s_Anthropic-node
                          , 'systmsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_systmsg__u01.1_template.txt' ]  // .(40821.02.1).(40801.03.5)
            //            , 'request_.json': ['.JSONs/','c35sann_Claude-35s_Anthropic','_request__u01.1_template.json`]  //#.(40801.02.6)
            //            , 'messages.json': ['.JSONs/','c35sann_Claude-35s_Anthropic','_messages_u01.1_template.json`]  //#.(40801.02.6)
                          , 'request_.mjs' : ['.MJSs/', 'c35sann_Claude-35s_Anthropic','_node-req_u01.1_template.mjs' ]  // .(40821.02.1)
                          , 'markdown.md'  : ['.MDs/',  'anymowa_AnyModel_Owner',      '_markdown_u01.1_template.md'  ]  // .(40821.02.1).(40801.02.7)
                             }
             , 'c35sanu': { 'usermsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_usermsg__u01.1_template.txt' ]  // Claude-35s_Anthropic-curl
                          , 'systmsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_systmsg__u01.1_template.txt' ]  // .(40821.02.1).(40801.03.4)
            //            , 'request_.json': ['.JSONs/','c35sanu_Claude-35s_Anthropic','_request__u01.1_template.json`]  //#.(40801.02.6)
            ///           , 'messages.json': ['.JSONs/','c35sanu_Claude-35s_Anthropic','_messages_u01.1_template.json']
                          , 'request_.sh'  : ['.SHs/',  'c35sanu_Claude-35s_Anthropic','_curl-req_u01.1_template.sh'  ]  // .(40821.02.1)
                          , 'markdown.md'  : ['.MDs/',  'anymowa_AnyModel_Owner',      '_markdown_u01.1_template.md'  ]  // .(40821.02.1).(40801.02.7)
                             }
             , 'c35sanw': { 'usermsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_usermsg__u01.1_template.txt' ]  // Claude-35s_Anthropic-chat
                          , 'systmsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_systmsg__u01.1_template.txt' ]  // .(40821.02.1).(40801.03.4)
            ///           , 'messages.json': ['.JSONs/','c35sanw_Claude-35s_Anthropic','_messages_u01.1_template.json']
                          , 'markdown.md'  : ['.MDs/',  'anymowa_AnyModel_Owner',      '_markdown_u01.1_template.md'  ]  // .(40821.02.1).(40801.02.7)
                             }
             , 'c35sgou': { 'usermsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_usermsg__u01.1_template.txt' ]  // Claude-35s_Anthropic-chat
                          , 'systmsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_systmsg__u01.1_template.txt' ]  // .(40821.02.1).(40801.03.4)
            ///           , 'request_.json': ['.JSONs/','c35sgou_Claude-35s_Google     '_request__u01.1_template.json']
            ///           , 'messages.json': ['.JSONs/','c35sgou_Claude-35s_Google',   '_messages_u01.1_template-wImage.json']
                          , 'messages.json': ['.JSONs/','c35sgou_Claude-35s_Google',   '_messages_u01.1_template-wImage.json']
                          , 'markdown.md'  : ['.MDs/',  'anymowa_AnyModel_Owner',      '_markdown_u01.1_template.md'  ]  // .(40821.02.1).(40801.02.7)
                             }
             , 'gp35opn': { 'usermsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_usermsg__u01.1_template.txt' ]  // GPT-35_OpenAI-node
                          , 'systmsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_systmsg__u01.1_template.txt' ]  // .(40821.02.1).(40801.03.5)
                          , 'request_.json': ['.JSONs/','gp35opn_GPT-35_OpenAI',       '_request__u01.1_template.json']  // .(40801.02.6)
            ///           , 'messages.json': ['.JSONs/','gp35opn_GPT-35_OpenAI',       '_messages_u01.1_template.json']
                          , 'request_.mjs' : ['.MJSs/', 'gp35opn_GPT-35_OpenAI',       '_node-req_u01.1_template.mjs' ]  // .(40821.02.1)
                          , 'markdown.md'  : ['.MDs/',  'anymowa_AnyModel_Owner',      '_markdown_u01.1_template.md'  ]  // .(40821.02.1).(40801.02.7)
                             }
             , 'gp4oopm': { 'usermsg_.txt' : ['.TXTs/', 'gp4oopm_GPT-4o_OpenAI',       '_usermsg__u01.1_template.txt' ]  // GPT-4o_OpenAI-maxi
            ///           , 'messages.json': ['.JSONs/','gp4oopm_GPT-4o_OpenAI',       '_messages_u01.1_template.json']
                          , 'markdown.md'  : ['.MDs/',  'anymowa_AnyModel_Owner',      '_markdown_u01.1_template.md'  ]  // .(40821.02.1).(40801.02.7)
                             }
             , 'gp4oopn': { 'usermsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_usermsg__u01.1_template.txt' ]  // GPT-4o_OpenAI-node
                          , 'systmsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_systmsg__u01.1_template.txt' ]  // .(40821.02.1).(40801.03.5)
                          , 'request_.mjs' : ['.MJSs/', 'gp4oopn_GPT-4o_OpenAI',       '_node-req_u01.1_template.mjs' ]  // .(40821.02.1)
                          , 'markdown.md'  : ['.MDs/',  'anymowa_AnyModel_Owner',      '_markdown_u01.1_template.md'  ]  // .(40821.02.1).(40801.02.7)
                             }
             , 'gp4oopu': { 'usermsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_usermsg__u01.1_template.txt' ]  // GPT-4o_OpenAI-curl
                          , 'systmsg_.txt' : ['.TXTs/', 'anymowa_AnyModel_Owner',      '_systmsg__u01.1_template.txt' ]  // .(40821.02.1).(40801.03.5)
            ///           , 'request_.json': ['.JSONs/','gp4oopu_GPT-4o_OpenAI         '_request__u01.1_template.json']
            ///           , 'request_.json': ['.JSONs/','gp4oopu_GPT-4o_OpenAI         '_request__u02.1_template.json']
            ///           , 'messages.json': ['.JSONs/','gp4oopu_GPT-4o_OpenAI',       '_messages_u01.1_template.json']
                          , 'request_.sh'  : ['.SHs/',  'gp4oopu_GPT-4o_OpenAI',       '_curl-req_u01.1_template.sh'  ]  // .(40821.02.1)
                          , 'markdown.md'  : ['.MDs/',  'anymowa_AnyModel_Owner',      '_markdown_u01.1_template.md'  ]  // .(40821.02.1).(40801.02.7)
                             }
            }              
// ----------------------------------------------------------------------
            
       var  Model_Templates = {}
            Object.entries( pTemplates         ).forEach( mMod_Templates => { var aMod = mMod_Templates[0]; Model_Templates[ aMod ] = {} 
            Object.entries( pTemplates[ aMod ] ).forEach( m => { var aTyp = m[0]; chkTemplate( m[1].join( '' ) ) 
                                                                     Model_Templates[ aMod ][ aTyp ] = m[1].join( '' ) } ) } )

//          console.log( fmtTemplates( pTemplates, 'all' ).sort( (a,b) => (a > b) ? 1 : -1 ).join( '\n' ) ); process.exit()  // .(40821.02.1)

  function  chkTemplate( aFile ) {  return  
      var   aFound     =  FRT.checkFileSync( `${__basedir}/._2/FRTs/AICodeR/templates/${aFile}` ).exists ? 'Found' : 'Not Found'      
            console.log( ` ${ aFile.padEnd(70) } ${aFound}` )   
            }
  function  fmtTemplates(   pTemplates, aSelectTyp ) {           var mTemplates = []
            Object.entries( pTemplates        ).forEach( mMod_Templates => { var aMod = mMod_Templates[0]
            Object.entries( mMod_Templates[1] ).forEach( m => {  var aTyp = m[0]; m = m[1] 
                                                     if (aTyp   ==   aSelectTyp || aSelectTyp == 'all') {
                                                                     mTemplates.push( `${aTyp.padEnd(14)} ${m[0].padEnd(7)} ${aMod}  ${m[1].padEnd(29)} ${m[2]}` ) } } ) } )
    return  mTemplates                                                                         
            }  // eof fmtTemplates 
//          process.exit() 
// -----------------------------------------------------------------------------------

       var  Models2 =
             [ [ ' 0.', 'anymowa', 'AnyModel_Owner-all      '  ] // internal remove 
             , [ ' 1.', 'gp35opw', 'GPT-35_OpenAI-web       '  ] // on (playground)

             , [ ' 1.', 'gp4oopw', 'GPT-4o_OpenAI-web       '  ] // 
             , [ ' 2.', 'gp4oopu', 'GPT-4o_OpenAI-curl      '  ] // 
             , [ ' 3.', 'gp4oopn', 'GPT-4o_OpenAI-node      '  ] // 
             , [ ' 4.', 'gp4oopm', 'GPT-4o_OpenAI-maxi      '  ] //                                 // .(40702.06.1 RAM New Models)
             , [ ' 5.', 'gp4oopf', 'GPT-4o_OpenAI-fetch     '  ] // 
             , [ ' 6.', 'gp4oopc', 'GPT-4o_OpenAI-cont      '  ] // 

             , [ ' 7.', 'qw7bolu', 'Qwen2-7b_Ollama-curl    '  ]
             , [ ' 8.', 'qw7boln', 'Qwen2-7b_Ollama-node    '  ]
             , [ ' 9.', 'qw7bolc', 'Qwen2-7b_Ollama-cont    '  ] // ##

             , [ '10.', 'cg2bolu', 'CodeGemma-2b_Ollama-curl'  ]
             , [ '11.', 'cg2boln', 'CodeGemma-7b_Ollama-node'  ]
             , [ '12.', 'cg2bolc', 'CodeGemma-7b_Ollama-cont'  ]

             , [ '13.', 'c2q5lmn', 'Claude2-Q5_LMStudio-node'  ]
             , [ '14.', 'c2q3lmn', 'Claude2-Q3_LMStudio-node'  ]
//           , [ '14.', 'c3q3lmn', 'Claude3-Q3_LMStudio-node'  ]
             , [ '15.', 'c35sanm', 'Claude-35s_Anthropic-maxi' ]                                  // .(40702.06.2)
             , [ '16.', 'c35sanu', 'Claude-35s_Anthropic-curl' ]                                  // .(40704.01.1)
             , [ '17.', 'c35sann', 'Claude-35s_Anthropic-node' ]                                  // .(40704.01.2)
//           , [ '18.', 'c35sanw', 'Claude-35s_Anthropic-web'  ]                                  // .(40704.01.3)
//           , [ '18.', 'c35sanw', 'Claude-35s_Anthropic-chatgpt' ]
             , [ '18.', 'c35sanw', 'Claude-35s_Anthropic-chat' ]                                  // .(40724.01.1 RAM Add)
             , [ '19.', 'c35sgou', 'Claude-35s_Google-curl'    ]                                  // .(40801.01.1 RAM Add)

             , [ '20.', 'st20lmn', 'StarCoder2_LMStudio-node'  ]

             , [ '21.', 'cllalmn', 'CodeLlama_LMStudio-node '  ]

             , [ '22.', 'gp4ovcp', 'CodeParrot_VSCode-copy  '  ]

             , [ '23.', 'ge15ggw', 'Gemini-15_Google-chat   '  ]                                  // .(40724.01.2 RAM Was -web)
             , [ '24.', 'ge15gvw', 'Gemini-15_Vertex-web    '  ]
                ]

            Models2   =  Models2.map( (mRec,i) => [ i + 0, ...mRec.slice(-2) ] ).slice(1)

// ----------------------------------------------------------------------------------
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
  function  getDocsPath( aApp, aMod, aCR) {                                                         // .(40729.03.x).(40715.04.4 Add function getDocsPath Beg)
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
       var  aErrMsg        =  aAppName && aModel_ != '' ?  `AppName/Model folder, ./${aDocs_Dir}` : `AppName/Model, ''`
//          console.log(       `* ${aErrMsg}, does not exist.` ); aCR = ''                          // .(40729.03.x)
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
       //      if (typeof(nFld) == 'undefined' ||  `${ typeof(nFld) || '' }` == '') { return mRows }       	//#.(40721.01.1)
               if (typeof(nFld) == 'undefined' ||  nFld === ''  ) { return mRows }                         	// .(40725.02.1 RAM Wow this is true: 0 == '' ).(40721.01.1 RAM S.B. this)
       //      if (typeof(nFld) == 'undefined'                  ) { return mRows }                         	//#.(40721.01.1 RAM )
               if (typeof(nFld) == 'string'    ) { aVal = nFld; nFld  =  2 - (1 - nOrigin) }
               if (typeof(aVal) == 'undefined' ) { return mRows.map( mRow => mRow[ nFld - nOrigin ] ) }
               if ( aVal  == '' ) { return ''}
       //      if (isNaN(aVal)) { var nVal = 0 } else {var nVal = `{aVal * 1}.`.padStart(3) }              	// .(40719.02.1 RAM Find ' 1.' )
               if (isNaN(aVal)) { var nVal = 0 } else  var nVal =   aVal * 1                               	// .(40719.02.1 RAM Find ' 1.' )

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
//            var  rVal   =  new RegExp( `^${aVal.replace( /-/, '' ).toLowerCase()}.*`, 'i' )
              var  rVal   =  new RegExp( `${nFld < 2 ? '^' : '' }${aVal.toLowerCase()}.*`, 'i' )
              var  mRows2 =  mRows.filter( ( mRow, i ) => {
                    var aFld    =  mRow[ nFld - nOrigin ].replace( /[- ]/, '' ).toLowerCase();
                    var bFound  =  aFld.match( rVal )
 //                 console.log(   aFld, `${aVal}: ${ bFound ? "found" : "not found" }` )
                 return bFound
                        } )
           return  mRows2
              }  // eof selectModels                                                    // .(40727.03.2 End)
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
       var  bIsNotCalled    =  FRT.isCalled( import.meta.url, process.argv[1]);
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
//          mArgs       =   mArgs.slice( 2 )                                                          //#.(40721.03.1 RAM ??)
//          mArgs       =   mArgs.slice( 2 + (    isNaN( mArgs[3] || '') ? 0 : 1 ) )                  //#.(40721.03.1 ??)
//          console.log( `  isNaN( mArgs[2]: : '${isNaN( mArgs[2])}'`  )
            mArgs       =   mArgs.slice( 2 + (    isNaN( mArgs[2]      ) ? 0 : 1 ) )                  // .(40721.03.1 Remove Step No  or from CLI)
            mArgs       =  (mArgs[0] == 'prompt') ? mArgs.slice(1) : mArgs                            // .(40820.04.x RAM Kloodgy)
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

  function  getEnv( aVar, aDefVal, aPreFix ) {
//          console.log(`  getEnv[1]  aVar: '${aVar}'`)
            aPreFix   =   aPreFix ? `${aPreFix}` : "FRT"
            aVar      =   aVar.match( '^FRT_' ) ? aVar.slice(4) : aVar                              // .(40804.06.1 RAM Remove Leading 'FRT_' )
       var  aEnvVar   =`${aPreFix}_${aVar.toUpperCase()}`
       var  aVal      =   aDefVal ? aDefVal : process.env[ aEnvVar ] || ''
        if (aVal == '') {
            console.log( `* The environment variable, '${aEnvVar}', is not defined` )
        } else {
//          console.log( `  getenv[2]  Got default ${ `${aEnvVar}:`.padEnd(10) } '${aVal}'` )
            }
    return  aVal
            }
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
//          mParms[3] = /^\*/.test(  mParms[3] ) ? mParms[3] : (getApp(   1, mParms[3] )[1] || '').trim()     //#.(40718.09.15 ) // origin 0
//          mParms[3] = /^\*/.test(  mParms[3] ) ? mParms[3] : (getApp(   1, mParms[3] )                      //#.(40718.xx.x  RAM Keep leading '*')
            mParms[3] = /^\*/.test(  mParms[3] ) ? mParms[3] :  getApp(   1, mParms[3] )                      // .(40718.09.15 RAM New getApp)
            mParms[3] =  mParms[3] ? mParms[3] : `* App alias not found: '${mArgs[0]}'`
            mArgs.shift()
            }
        if (mArgs.length == 2) { var n = 1 } else { var n = 0 }                                               // .(40718.xx.x RAM ??)
        if (mArgs[n]  && mArgs[n].length == 7) {    // Check Model alias
            mParms[4] = /[a-z0-9]{7}/.test(  mArgs[n] || '') ?  mArgs[n] : `* Invalid Model alias: '${mArgs[0]}'`
//          mParms[4] = /^\*/.test(  mParms[4] ) ? mParms[4] : (getModel( 1, mParms[4] )[1] || '').trim()     //#.(40718.09.16)
            mParms[4] = /^\*/.test(  mParms[4] ) ? mParms[4] :  getModel( 1, mParms[4] )                      // .(40718.09.16 RAM New getApp)
            mParms[4] =  mParms[4] ? mParms[4] : `* Model alias not found: '${mArgs[n]}'`
            mArgs.splice(-1)
            }
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
//     var  aAppName       = (getApp(   1, aItem )[2] || '').trim()                                 //#.(40718.09.17)
       var  aAppName       = (getApp(   1, aItem,  2 ))         // (()[2] || '').trim()             // .(40718.09.17)
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
       var  aModel         = (getModel( 1, aItem,  2 ))         // (()[2] || '').trim()             // .(40718.09.18)
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

       if ("test2" == "text2") {
       var  aTable         = 'apps'
       var  aTable         = 'models'
       var  aRow           = 'c35sann'
       var  aRow           = ''
            }
// ---------------------------------------------------------------------------------------------------

//     var  aRow           = '' // 'gp4oopm'
//     var  aRow           =  process.argv.length > 3 ? process.argv[3] : ''

            console.log(   `  aTable:   '${aTable}', aRow: '${aRow}'` )
//     var  xTable         = (aTable.slice(0,3) == 'mod') ? getModel : getApp
       var  xTable         = (aTable.slice(0,3) == 'app') ? getApp   : getModel                                              // .(40821.01.1 RAM Reverse App and Model)  
//          console.log(      getModel( aRow ).map( m => '  ' + m.join( '  ' )).join( '\n' ) );
       var  mRows          =  aRow ? [ xTable( aRow ) || [ `* ${aTable.slice(0,-1)} not found: '${aRow}'` ] ] : xTable( aRow );
//          console.dir(      mRows, { depth: 9} )
            console.log("")
//          console.log(      mRows.map( m => '  ' + m.join( '  ' )).join( '\n' ) );                                         //#.(40821.01.2)
            console.log(      mRows.map( m => { m[0] = `${m[0]}`.padStart(4); return m.join( '  ' ) } ).join( '\n' ) );      // .(40821.01.2 RAM Format No.)
            }
// ---------------------------------------------------------------------------------------------------

