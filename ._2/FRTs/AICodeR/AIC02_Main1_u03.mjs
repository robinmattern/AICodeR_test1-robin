
    import  AIC_Data from './AIC03_Data_u03.mjs'

            AIC_Data.Model( 'gpt-4o' )
//          AIC_Data.addMessage( )

       var  nVer         =  AIC_Data.NextVerNo()

            console.log( AIC_Data );
            process.exit()

//     var  mSystMessages       =
       var aSystemPrompt = `You are a web developer with expertise in JavaScript and Lit Components. \n`
                         + `When writing JavaScript modules, please use ES6 import statements and an .mjs extension. \n`
                         + `Use file names with words starting with a capital Letter separated with underscores.`

       var  mUserMessages       = [ ]
       var  mAsstMessages       = [ ]

//          mUserMessages[  0 ] =  AIC_Data.UserMessage( 0 )
//          mUserMessages[  1 ] =  AIC_Data.UserMessage( 1 )

            mUserMessages[  0 ] = "I have a challenging project using lit components. Are you up for it?"

            mUserMessages[  1 ] = `
            I would like to create a reusable component that lives in a parent container that fills the entire page
            (or that fills the entire section between a header and a footer, but that's later).

            For now I'd like this parent container to hold multiple instances of a resuable components that
            we'll name Floating_Box that lives in index.html.  Can you write this using these file names, index.html,
            Parent_Container.mjs and Floating_Box.mjs?

            Here is the challenging part.  I'd like this Floating_Box component and its custom HTML tag to have
            an attribute of \`draggable\` and \`resizeable\`. Furthermore, Pleased create global property, \`dndEnabled\`,
            that will allow me to turn on and off the user's ability to drag and resize the floating boxes.
            `
            mAsstMessages[  1 ] =  AIC_Data.AsstMessage( 1 )

            mUserMessages[  2 ] = { Message: `
            Pretty good. But there are three problems you need to fix.
            1. The floating boxes don't move. The \`dndEnabled\` property needs to be initialized to true.
               I have fixed this for you.
            2. The cursor for the second floating box doest stay in the center of the box when dragging.
               I'll leave this to you to fix.
            3. The floating boxes don't resize. Even though \`resizable\` property is initialized to false,
               it should be set to true if the custom HTML element has an attribute of \`resizeable\`.
               There may beother problems, but these are the ones I see.
            Here is the Floating_Box.mjs script with the first problem fixed.
            `
          , Scripts: [ { Floating_Box: `_u${nVer}` } ] }

//     var  pUserMessage        =  mUserMessages[  nVer ]
//                                 AIC_Data.UserMessage(  nVer, pUserMessage       )  // Should be the same as mUserMessages[ nVer ]
                                   AIC_Data.UserMessage(  nVer, mUserMessages[ 2 ] )  // Should be the same as mUserMessages[ nVer ]
            mUserMessages[nVer] =  AIC_Data.UserMessage(  nVer )

//                           await  AIC_Data.SendMessages( nVer )

            mAsstMessages[nVer] =  AIC_Data.AsstMessage(  nVer )

                                   console.log( mAsstMessages[nVer].Message )
                                   console.log( mAsstMessages[nVer].Scripts )



