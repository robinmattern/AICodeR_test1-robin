
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

       var  Model_Templates =
         { 'gp4oopu': { 'usermsg_.txt' : '.TXTs/AnyModel_Prompt-uesrmsg__template.txt'          // GPT-4o_OpenAI-curl
                      , 'systmsg_.txt' : '.TXTs/AnyModel_Prompt-systmsg__template.txt'          // .(40801.03.1 RAM Added systmsg file)
                      , 'request_.json': '.JSONs/GPT-4o_OpenAI-request__template.json'          // .(40801.02.1)
//                    , 'messages.json': '.JSONs/GPT-4o_OpenAI-messages_template.json'          //#.(40801.02.1 RAM Created by run prompt Step 15)
                      , 'request_.sh'  : '.SHs/GPT-4o_OpenAI-curl_u02_template.sh'              // .(40801.02.2 RAM Includes request.json -- Nope!)
                      , 'markdown.md'  : '.MDs/AnyModel_Response-markdown_template.md'          // .(40801.02.7)
                         }
         , 'gp4oopu': { 'usermsg_.txt' : '.TXTs/AnyModel_Prompt-uesrmsg__template.txt'          // GPT-4o_OpenAI-curl
                      , 'systmsg_.txt' : '.TXTs/AnyModel_Prompt-systmsg__template.txt'          // .(40801.03.2)
                      , 'request_.json': '.JSONs/GPT-4o_OpenAI-request__template.json'          // .(40801.02.3)
//                    , 'messages.json': '.JSONs/GPT-4o_OpenAI-messages_template.json'          //#.(40801.02.3)
                      , 'request_.mjs' : '.SHs/GPT-4o_OpenAI-curl_u01_template.sh'
                      , 'markdown.md'  : '.MDs/AnyModel_Response-markdown_template.md'          // .(40801.02.7)
                         }
         , 'gp35opn': { 'usermsg_.txt' : '.TXTs/AnyModel_Prompt-usrmsg__template.txt'           // GPT-35_OpenAI-node
                      , 'systmsg_.txt' : '.TXTs/AnyModel_Prompt-systmsg__template.txt'          // .(40801.03.3)
                      , 'request_.json': '.JSONs/GPT-35_OpenAI-request__template.json'          // .(40801.02.4)
//                    , 'messages.json': '.JSONs/GPT-35_OpenAI-messages_template.json'          //#.(40801.02.4)
                      , 'request_.mjs' : '.SHs/GPT-35_OpenAI-node_u01_template.mjs'
                      , 'markdown.md'  : '.MDs/AnyModel_Response-markdown_template.md'          // .(40801.02.7)
                         }
         , 'gp4oopm': { 'usermsg_.txt' : '.TXTs/AnyModel_Prompt-usrmsg__template.txt'           // GPT-4o_OpenAI-maxi
                      , 'markdown.md'  : '.MDs/AnyModel_Response-markdown_template.md'          // .(40801.02.7)
                         }
         , 'c35sanm': { 'usermsg_.txt' : '.TXTs/AnyModel_Prompt-usrmsg__template.txt'           // Claude-35s_Anthropic-maxi
                      , 'markdown.md'  : '.MDs/AnyModel_Response-markdown_template.md'          // .(40801.02.7)
                         }
         , 'c35sanw': { 'usermsg_.txt' : '.TXTs/AnyModel_Prompt-usrmsg__template.txt'           // Claude-35s_Anthropic-chat
                      , 'markdown.md'  : '.MDs/AnyModel_Response-markdown_template.mjs'         // .(40801.02.7)
                         }
         , 'c35sanu': { 'usermsg_.txt' : '.TXTs/AnyModel_Prompt-usermsg__template.txt'          // Claude-35s_Anthropic-curl
                      , 'systmsg_.txt' : '.TXTs/AnyModel_Prompt-systmsg__template.txt'          // .(40801.03.4)
                      , 'request_.json': '.JSONs/Claude-35s_Anthropic-request__template.json'   // .(40801.02.5)
//                    , 'messages.json': '.JSONs/Claude-35s_Anthropic-messages_template.json'   //#.(40801.02.5)
                      , 'request_.sh'  : '.SHs/Claude-35s_Anthropic-curl_u02_template.sh'
                      , 'markdown.md'  : '.MDs/AnyModel_Response-markdown_template.md'          // .(40801.02.7)
                         }
         , 'c35sann': { 'usermsg_.txt' : '.TXTs/AnyModel_Prompt-usrmsg_template.txt'            // Claude-35s_Anthropic-node
                      , 'systmsg_.txt' : '.TXTs/AnyModel_Prompt-systmsg_template.txt'           // .(40801.03.5)
                      , 'request_.json': '.JSONs/Claude-35s_Anthropic-request__template.json'   // .(40801.02.6)
//                    , 'messages.json': '.JSONs/Claude-35s_Anthropic-messages_template.json'   //#.(40801.02.6)
                      , 'request_.mjs' : '.SHs/Claude-35s_Anthropic-node_u01_template.mjs'
                      , 'markdown.md'  : '.MDs/AnyModel_Response-markdown_template.md'          // .(40801.02.7)
                         }
            }
// ----------------------------------------------------------------------------------

       var  Models2 =
             [ [ ' 1.', 'gp4oopw', 'GPT-4o_OpenAI-web       '  ] // ##    markdown, text, json (playground)
             , [ ' 2.', 'gp4oopu', 'GPT-4o_OpenAI-curl      '  ] // ##    json text
             , [ ' 3.', 'gp4oopn', 'GPT-4o_OpenAI-node      '  ] //       json object
             , [ ' 4.', 'gp4oopm', 'GPT-4o_OpenAI-maxi      '  ] //       json object             // .(40702.06.1 RAM New Models)
             , [ ' 5.', 'gp4oopf', 'GPT-4o_OpenAI-fetch     '  ] //       json object
             , [ ' 6.', 'gp4oopc', 'GPT-4o_OpenAI-cont      '  ] //       markdown /share

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
// ----------------------------------------------------------------------------------
