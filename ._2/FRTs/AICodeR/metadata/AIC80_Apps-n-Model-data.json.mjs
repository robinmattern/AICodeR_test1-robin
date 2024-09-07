console.dir( 
{
        "Apps" :                                                                        

             [ [ " 1.", "c01", "c01_calendar-app         " ] 
             , [ " 2.", "c02", "c02_Ask-AI-about-PDF-app " ] 
             , [ " 2.", "c35", "c35_calendar1-app        " ] 
             , [ " 3.", "c36", "c36_hawaii-contracts-app " ] 
             , [ " 4.", "c37", "c37_aicoder-sessions-app " ] 
             , [ " 5.", "c38", "c38_login-app            " ] 
             , [ " 6.", "c42", "c42_whatever-app         " ] 
             , [ " 7.", "c43", "c43_chrome-extension-app " ] 
             , [ " 8.", "c44", "c44_a-dancers-dream-app  " ] 
             , [ " 9.", "s35", "s35_calendar-app         " ] 
               ]


      , "Model_Templates" :

         { "gp4oopu": { "usermsg_.txt" : ".TXTs/AnyModel_Prompt-uesrmsg__template.txt"          
                      , "systmsg_.txt" : ".TXTs/AnyModel_Prompt-systmsg__template.txt"          
                      , "request_.json": ".JSONs/GPT-4o_OpenAI-request__template.json"          

                      , "request_.sh"  : ".SHs/GPT-4o_OpenAI-curl_u02_template.sh"              
                      , "markdown.md"  : ".MDs/AnyModel_Response-markdown_template.md"          
                         }
         , "gp4oopu": { "usermsg_.txt" : ".TXTs/AnyModel_Prompt-uesrmsg__template.txt"          
                      , "systmsg_.txt" : ".TXTs/AnyModel_Prompt-systmsg__template.txt"          
                      , "request_.json": ".JSONs/GPT-4o_OpenAI-request__template.json"          

                      , "request_.mjs" : ".SHs/GPT-4o_OpenAI-curl_u01_template.sh"
                      , "markdown.md"  : ".MDs/AnyModel_Response-markdown_template.md"          
                         }
         , "gp35opn": { "usermsg_.txt" : ".TXTs/AnyModel_Prompt-usrmsg__template.txt"           
                      , "systmsg_.txt" : ".TXTs/AnyModel_Prompt-systmsg__template.txt"          
                      , "request_.json": ".JSONs/GPT-35_OpenAI-request__template.json"          

                      , "request_.mjs" : ".SHs/GPT-35_OpenAI-node_u01_template.mjs"
                      , "markdown.md"  : ".MDs/AnyModel_Response-markdown_template.md"          
                         }
         , "gp4oopm": { "usermsg_.txt" : ".TXTs/AnyModel_Prompt-usrmsg__template.txt"           
                      , "markdown.md"  : ".MDs/AnyModel_Response-markdown_template.md"          
                         }
         , "c35sanm": { "usermsg_.txt" : ".TXTs/AnyModel_Prompt-usrmsg__template.txt"           
                      , "markdown.md"  : ".MDs/AnyModel_Response-markdown_template.md"          
                         }
         , "c35sanw": { "usermsg_.txt" : ".TXTs/AnyModel_Prompt-usrmsg__template.txt"           
                      , "markdown.md"  : ".MDs/AnyModel_Response-markdown_template.mjs"         
                         }
         , "c35sanu": { "usermsg_.txt" : ".TXTs/AnyModel_Prompt-usermsg__template.txt"          
                      , "systmsg_.txt" : ".TXTs/AnyModel_Prompt-systmsg__template.txt"          
                      , "request_.json": ".JSONs/Claude-35s_Anthropic-request__template.json"   

                      , "request_.sh"  : ".SHs/Claude-35s_Anthropic-curl_u02_template.sh"
                      , "markdown.md"  : ".MDs/AnyModel_Response-markdown_template.md"          
                         }
         , "c35sann": { "usermsg_.txt" : ".TXTs/AnyModel_Prompt-usrmsg_template.txt"            
                      , "systmsg_.txt" : ".TXTs/AnyModel_Prompt-systmsg_template.txt"           
                      , "request_.json": ".JSONs/Claude-35s_Anthropic-request__template.json"   

                      , "request_.mjs" : ".SHs/Claude-35s_Anthropic-node_u01_template.mjs"
                      , "markdown.md"  : ".MDs/AnyModel_Response-markdown_template.md"          
                         }
            }


      , "Models" :

             [ [ " 1.", "gp4oopw", "GPT-4o_OpenAI-web       "  ] 
             , [ " 2.", "gp4oopu", "GPT-4o_OpenAI-curl      "  ] 
             , [ " 3.", "gp4oopn", "GPT-4o_OpenAI-node      "  ] 
             , [ " 4.", "gp4oopm", "GPT-4o_OpenAI-maxi      "  ] 
             , [ " 5.", "gp4oopf", "GPT-4o_OpenAI-fetch     "  ] 
             , [ " 6.", "gp4oopc", "GPT-4o_OpenAI-cont      "  ] 

             , [ " 7.", "qw7bolu", "Qwen2-7b_Ollama-curl    "  ]
             , [ " 8.", "qw7boln", "Qwen2-7b_Ollama-node    "  ]
             , [ " 9.", "qw7bolc", "Qwen2-7b_Ollama-cont    "  ] 

             , [ "10.", "cg2bolu", "CodeGemma-2b_Ollama-curl"  ]
             , [ "11.", "cg2boln", "CodeGemma-7b_Ollama-node"  ]
             , [ "12.", "cg2bolc", "CodeGemma-7b_Ollama-cont"  ]

             , [ "13.", "c2q5lmn", "Claude2-Q5_LMStudio-node"  ]
             , [ "14.", "c2q3lmn", "Claude2-Q3_LMStudio-node"  ]

             , [ "15.", "c35sanm", "Claude-35s_Anthropic-maxi" ]                                  
             , [ "16.", "c35sanu", "Claude-35s_Anthropic-curl" ]                                  
             , [ "17.", "c35sann", "Claude-35s_Anthropic-node" ]                                  


             , [ "18.", "c35sanw", "Claude-35s_Anthropic-chat" ]                                  
             , [ "19.", "c35sgou", "Claude-35s_Google-curl"    ]                                  

             , [ "20.", "st20lmn", "StarCoder2_LMStudio-node"  ]

             , [ "21.", "cllalmn", "CodeLlama_LMStudio-node "  ]

             , [ "22.", "gp4ovcp", "CodeParrot_VSCode-copy  "  ]

             , [ "23.", "ge15ggw", "Gemini-15_Google-chat   "  ]                                  
             , [ "24.", "ge15gvw", "Gemini-15_Vertex-web    "  ]
                  ]


        }
 
)