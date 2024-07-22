   import   FRT          from './AIC90_FileFns.mjs'

//    var __dirname         =  path.dirname( process.argv[1] )
//    var __basedir         =  __dirname.replace( /\._2.+/, '' )
      var __docsdir         =  FRT.join(__basedir , 'docs')
      var   aAppName        =  FRT.setPaths( 'c39_login-app' )

            console.log( "_basedir:", __basedir );
            console.log( "_docsdir:", __docsdir );
            console.log( "_dirname:", __dirname );
            console.log( "_apppath:", __apppath );
            console.log( "_appname:", __appname );
//          process.exit()

       var  AIC_Data = { }

//          ATI_Data.set( 'gpt-4o', 0, 'c14_openai-floating-boxes-app', 'OpenAI_API' )
            ATI_Data.set( 'gpt-4o' )

            AIC_Data.AppDir( 'c14_openai-floating-boxes-app' )
            AIC_Data.AIName( 'OpenAI_API' )
            AIC_Data.VerNo(   0 )

//     var  pAIR  = new AIC_Data

       var  mMessages =  [ { "role": "user", "content": [ { "type": "text", "text": "" } ] } ]
            mMessages.push( { "role": "assistant", "content": [ { "type": "text", "text": "Sure, let's break this down into the necessary components and file structure. We'll use the provided imports and create the components as specified. \n\n### Step 1: Create the ParentContainer Component\n\n**Parent_Container.mjs**\n```javascript\nimport { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';\nimport './Floating_Box.mjs';\n\nexport let dndEnabled = true;\n\nclass ParentContainer extends LitElement {\n    static styles = css`\n        :host {\n            display: block;\n            width: 100vw;\n            height: 100vh;\n        }\n\n        .container {\n            display: flex;\n            flex-wrap: wrap;\n            width: 100%;\n            height: 100%;\n        }\n    `;\n\n    render() {\n        return html`\n            <div class=\"container\">\n                <floating-box draggable resizable></floating-box>\n                <floating-box draggable resizable></floating-box>\n                <floating-box draggable resizable></floating-box>\n            </div>\n        `;\n    }\n}\n\ncustomElements.define('parent-container', ParentContainer);\n```\n\n### Step 2: Create the FloatingBox Component\n\n**Floating_Box.mjs**\n```javascript\nimport { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';\nimport { dndEnabled } from './Parent_Container.mjs';\n\nclass FloatingBox extends LitElement {\n    constructor() {\n        super();\n        this.isDragging = false;\n        this.isResizing = false;\n    }\n\n    static styles = css`\n        :host {\n            display: block;\n            width: 200px;\n            height: 200px;\n            margin: 10px;\n            background-color: lightgray;\n            position: relative;\n            border: solid 1px black;\n        }\n\n        .resizer {\n            width: 10px;\n            height: 10px;\n            background: darkgray;\n            position: absolute;\n            right: 0;\n            bottom: 0;\n            cursor: se-resize;\n        }\n    `;\n\n    firstUpdated() {\n        if (this.hasAttribute('draggable')) {\n            this.draggable = true;\n        }\n\n        if (this.hasAttribute('resizable')) {\n            this.resizable = true;\n        }\n\n        if (this.draggable) {\n            this.addEventListener('mousedown', this.startDrag.bind(this));\n        }\n\n        if (this.resizable) {\n            this.shadowRoot.querySelector('.resizer').addEventListener('mousedown', this.startResize.bind(this));\n        }\n    }\n\n    startDrag(event) {\n        if (!dndEnabled) return;\n\n        this.isDragging = true;\n        this.initialX = event.clientX;\n        this.initialY = event.clientY;\n        this.startX = this.offsetLeft;\n        this.startY = this.offsetTop;\n\n        window.addEventListener('mousemove', this.onDrag.bind(this));\n        window.addEventListener('mouseup', this.stopDrag.bind(this));\n    }\n\n    onDrag(event) {\n        if (this.isDragging) {\n            const dx = event.clientX - this.initialX;\n            const dy = event.clientY - this.initialY;\n            this.style.left = `${this.startX + dx}px`;\n            this.style.top = `${this.startY + dy}px`;\n        }\n    }\n\n    stopDrag() {\n        this.isDragging = false;\n        window.removeEventListener('mousemove', this.onDrag.bind(this));\n        window.removeEventListener('mouseup', this.stopDrag.bind(this));\n    }\n\n    startResize(event) {\n        if (!dndEnabled) return;\n\n        this.isResizing = true;\n        this.initialX = event.clientX;\n        this.initialY = event.clientY;\n        this.startWidth = this.offsetWidth;\n        this.startHeight = this.offsetHeight;\n\n        window.addEventListener('mousemove', this.onResize.bind(this));\n        window.addEventListener('mouseup', this.stopResize.bind(this));\n    }\n\n    onResize(event) {\n        if (this.isResizing) {\n            const dx = event.clientX - this.initialX;\n            const dy = event.clientY - this.initialY;\n            this.style.width = `${this.startWidth + dx}px`;\n            this.style.height = `${this.startHeight + dy}px`;\n        }\n    }\n\n    stopResize() {\n        this.isResizing = false;\n        window.removeEventListener('mousemove', this.onResize.bind(this));\n        window.removeEventListener('mouseup', this.stopResize.bind(this));\n    }\n\n    render() {\n        return html`\n            <div class=\"resizer\"></div>\n        `;\n    }\n}\n\ncustomElements.define('floating-box', FloatingBox);\n```\n\n### Step 3: Create the Main HTML File\n\n**index.html**\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Lit Components Project</title>\n</head>\n<body>\n    <parent-container></parent-container>\n    \n    <script type=\"module\">\n        import './Parent_Container.mjs';\n\n        // Example of how to toggle dndEnabled\n        window.dndEnabled = true;\n        setTimeout(() => {\n            window.dndEnabled = false;\n        }, 10000); // Disable drag and resize after 10 seconds\n    </script>\n</body>\n</html>\n```\n\n### Explanation:\n\n1. **index.html**: This file initializes the `ParentContainer` component, which will hold multiple instances of the `FloatingBox` component.\n\n2. **Parent_Container.mjs**: This module defines the `ParentContainer` component, styles it, and renders several `FloatingBox` components inside it. It imports the `FloatingBox` definition from the `Floating_Box.mjs` file.\n\n3. **Floating_Box.mjs**: This module defines the `FloatingBox` component, which can be dragged and resized if the `draggable` and `resizable` attributes are set. Global property `dndEnabled` is used to toggle the drag-and-resize functionality on and off.\n\nPlease note that in a real-world application, you might want to manage component states more robustly and avoid listeners being constantly added/removed. This example primarily shows the concept and approach based on your requirements." } ] } )


//     var  pData             =  JSON.parse( await fs.readFile( aSessionData_File, 'utf8' ) )
       var  pData =              await getSessionData( )
            console.log(  "SessionDataFile:", AIC_Data.SessionDataFile );

            AIC_Data.Model( 'gpt-3.5 Turbo' )
            console.dir( "Model: ", AIC_Data.Model() )

            console.dir( pData )

// ------------------------------------------------------------------------------------
       var  aVer               = `u` + AIC_Data.VerNo();         console.log( "1 aVer:", aVer )
       var  aVer               = 'v' + AIC_Data.VerNo( 2 );      console.log( "2 aVer:", aVer )
       var  aVer               = 'v' + AIC_Data.NextVerNo( );    console.log( "3 aVer:", aVer )
       var  aVer               = 'v' + AIC_Data.NextVerNo( 4 );  console.log( "4 aVer:", aVer )

process.exit()

//     var  aVer               = `u${AIC_Data.verno}`
//     var  aSampleScript_File = `docs/c22_app/OpenAI_GPT/Sample_{aVer="u00"}.code`
//     var  aSessionData_File  = `docs/c22_app/OpenAI_GPT/Session_${aVer="u00"}.json`
//     var  aSessionMD_File    = `docs/c22_app/OpenAI_GPT/Session_${aVer="u02"}.md`
//     var  aPromptScript_File = `docs/c22_app/OpenAI_GPT/Prompt_${aVer="u01"}.mjs`

       var  aSampleScript_File =  setDocsFilename( 'Sample',  '.code', nVer )
       var  aSessionData_File  =  setDataFilename(  aVer )
       var  aSessionMD_File    =  setDocsFilename( 'Sample',  '.md',   aVer )
       var  aPromptScript_File =  setDocsFilename( 'Sample',  '.mjs',  aVer )

//     var  aSampleScript      =  readFile(            aSampleScript_File )

       var  aSessionMarkDown   =  fmtMarkdown( aVer, aSessionMD_File, aSessionData_File )
/*
            newSession( "u00",    aSampleScript,       aSessionData_File  )
            updSession( "u00",    aSystemPrompt,       aSessionData_File  )

       var  pData              =  getSession(  "u00",  aSessionData_File  )
       var  aSessionMarkDown   =  fmtMarkdown( "u00",  aSessionMD_File, aSessionData_File )
       var  aPromptScript      =  fmtPrompt(   "u01",  aUserPrompt, aPromptScript_File, aSessionData_File )
       var  aModelResponse     =  await runPrompt(     aPromptScript_File )

            updSession( "u02",    aModelResponse,      aSessionData_File  )
            savScripts( "u02",    aSessionData_File )
            gitCommit(  "u02",    aSessionData_File )
            updScripts( "u03",    mChgdScript_Files,    aSessionData_File )
            gitCommit(  "u03",    aSessionData_File )
*/
// ------------------------------------------------------------------------------------

  function  ATI_Data.set( aModel, nVer, aAppDir, aAIName) {

       var  pAIC_Data = { }; this = pAPI_Data
//           AIC_Data =
            pAIC_Data =
             {  model             :  aModel
             ,  appdir            :  aAppDir
             ,  apiname           :  aAIName
             ,  verno             :  nVer
             ,  messages          :  getMessages()
             ,  temperature       :  1
             ,  max_tokens        :  4095
             ,  top_p             :  1
             ,  frequency_penalty :  0
             ,  presence_penalty  :  0
                }
//    ---------------------------------------------------

      pAIC_Data.UserMessage       =  function( nVer, pMessage ) {
            if (mMessages) {         putMessage( 'User', nVer, pMessage ) }
                      return         getMessage( 'User', nVer )
                }
//    ---------------------------------------------------

      pAIC_Data.AsstMessage =      ( nVer, pMessage  ) => {
            if (mMessages) {         putMessage( 'Asst', nVer, pMessage ) }
                return               getMessage( 'Asst', nVer )
                }
//    ---------------------------------------------------
//              setGet( 'AppDir',   'appdir', aAppDir  )
//              setGet( 'AIName',   'ainame', aAIName  )
//              setGet( 'Model',    'model',  aModel   )

      pAIC_Data.AppDir           = ( aAppDir ) => getSet( 'appdir', aAppDir )
      pAIC_Data.AIName           = ( aAIName ) => getSet( 'ainame', aAIName )
      pAIC_Data.Model            = ( aModel  ) => getSet( 'model',  aModel  )

      pAIC_Data.VerNo    = function( nVer    )     { nVer = nVer ? nVer : AIC_Data.verno; return getSet( 'verno', `${ nVer     }`.padStart(2,'0') ) }
//    pAIC_Data.NextVerNo        = ( nVer    )  => { nVer = nVer ? nVer : AIC_Data.verno; return getSet( 'verno', `${ nVer + 1 }`.padStart(2,'0') ) }
      pAIC_Data.NextVerNo        = ( nVer    )  =>   AIC_Data.VerNo( nVer ) + 1

      pAIC_Data.DataTemplate =
                 { "AppName"     :  "App Name"
                 , "Session"     :  "Session Name"
                 , "ID"          :  "XX"
                 , "Messages"    :
                    [ { "Message":{ "Role"    : "syst", "nVer": "00",  "CommitID": "",  "CommitMsg": "", "CommitCode": ""
                                  , "Contents": [ { "Type": "text", "Name": "welcome",    "Content": "How can I help you" }
                                                , { "Type": "text", "Name": "system",     "Content": "System Guidance"    } ]
                                     } } ]
                  "SessionStats":
                    { "Total_frames": ""
                    , "Total_Tokens": ""
                       }
                   }
                }  // eof AIC_Data.set
// ------------------------------------------------------------------------------------

  function  fmtMarkdown( aText ) {
                }
// ------------------------------------------------------------------------------------

  function  getDocsFilename( aName, aExt, aVer ) {
       var  aVerNo            =  aVer ? aVer : AIC_Data.verno
            aVerNo            = `${aVerNo}`.padStart( 2, '0' )
       var  aAppCd            =  aAppDir.substring(0,3) + '_app'
       var  aAIname           =  AIC_Data.ainame
    return  FRT.join( __docsdir, `${aAppCd}/${aAIname}/${aName}_u${aVerNo}.${aExt}` )
            }  // eof setDocsFilename
// ------------------------------------------------------------------------------------

  function  getDataFilename( aVer ) {
       var  aVerNo            =  aVer ? aVer : AIC_Data.VerNo()
            aVerNo            = `${aVerNo}`.padStart( 2, '0' )
       var  aAIname           =  AIC_Data.ainame
       var  aAppDir           =  AIC_Data.appdir
       var  aAppId            =  aAppDir.substring(0,3)
       var  aClientDir        = (aAppId.substring(0,1) == 'c' ? 'client' : 'server') + aAppId.substring(1,2)
       var  aChgsDir          =  FRT.join(__basedir,  aClientDir, aAppDir, `!_${aAppId}_App-Changes`, aAIname )
       var  aData_File        =  FRT.join( aChgsDir, `Session_u${ aVerNo }.json` )
    return  aData_File
            }  // eof getDataFilename
// ------------------------------------------------------------------------------------

async function  putSessionData( pData, nVer ) {
       var  aSessionData_File =  getDataFilename( nVer  )
       var  aJSON_Data        =  JSON.stringify(  pData )
            await fs.writeFile(  aSessionData_File, aJSON_Data, 'utf8'  )
            }  // eof putSessionData
// ------------------------------------------------------------------------------------

async function  getSessionData( nVer ) {
      var   aSessionData_File =  getDataFilename( nVer )
//     if ((await checkFile( aSessionData_File )).exists) {
        var aData               =  await FRT.readFileSync( aSessionData_File )
       if (!aData) {
            pData             =  AIC_Data.DataTemplate
        } else {
      try {
            pData             =  JSON.parse( aData )
        } catch(e) {
            pData             =  AIC_Data.DataTemplate
            console.log(    '\n* Invalid JSON is aSessionData_File:', aSessionData_File )
        }   }
            AIC_Data.SessionDataFile =  aSessionData_File
    return  AIC_Data.Data            =  pData
            }
// ------------------------------------------------------------------------------------

  function  setGet( aKEY, aKey, aValue ) {
                      AIC_Data[aKEY] = (aValue) => { return ( aKey, aValue ) => {
        if (aValue) { AIC_Data[aKey] =  aValue }
               return AIC_Data[aKey] ?  AIC_Data[aKey] : ''
            }  }  }
// ------------------------------------------------------------------------------------

  function  getSet( aKey, aValue ) {
        if (aValue) { AIC_Data[aKey] =  aValue }
               return AIC_Data[aKey] ?  AIC_Data[aKey] : ''
            }
// ------------------------------------------------------------------------------------

  function  getMessages( ) { return mMessages }

// ------------------------------------------------------------------------------------

  function  getMessageNo( aRole, nVer ) {
    return  mMessages.findIndex( (pMessage) => pMessage.role === aRole && pMessage.content[0].text === nVer )
            }
// ------------------------------------------------------------------------------------

  function  getMessage( aRole, nVer ) {
        var nMsg = getMessageNo( aRole, nVer)
            if (nMsg >= 0) { return { message: mMessages[nMsg].content[0].text, scripts: [ '' ]  }
        } else {         return { message: '', scripts: [ '' ]  } }
            }
// ------------------------------------------------------------------------------------

  function  putMessage( aRole, nVer,pMessage ) {
        var nMsg      =  getMessageNo( aRole, nVer)
            if (nMsg >= 0) { mMessages[nMsg].content[0].text = pMessage.message }
            }
// ------------------------------------------------------------------------------------

export default AIC_Data
