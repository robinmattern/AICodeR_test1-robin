
# AICodeR Workflow


## Various Workflows
   - Platform's chat website 
     - https://chatgpt.com
     - https://gemini.google.com/app
     - https://claude.ai
     - https:/bing.com 
   - Custom chat website / app 
     - https://useanything.com 
     - https:/aidocs-review.com 
     - https:/maxai.me (Chrome extension)
     - https:/myaidocs.me (Chrome extension)
   - IDE Extension 
     - CoPilot
     - CodeParrot 
     - Continue 
     - Codiumate
     - Pieces for Developers 
   - Command Line Interface (CLI)
     - openai
     - vertex 
     - AICodeR 
   - Curl
   - Node module
   - Python Module
   
## Code-Gen Interface: AICodeR CLI

### Initial Setup   

   - Clone Repository   
      `# cd ./Repos`     
      `# clone https://github.com/robinmattern/AICodeR_dev03-robin.git AICodeR`   
   - Open VSCode      
      `# cd AICodeR`   
      `# code *.code-workspace`   
      
### Getting Started

   - View AICodeR Commands    
      `New Terminal (Bash)`     
      `# ./run-aicoder.sh`    
      `# ./run-aicoder.sh list apps`    
      `# ./run-aicoder.sh list models`    
      `# ./run-aicoder.sh set app c35`    
      `# ./run-aicoder.sh list sessions`    
      `# ./run-aicoder.sh list sessions c37`    
      `# ./run-aicoder.sh set model gp4oopm`    
      `# ./run-aicoder.sh show vars`    
     
### MaxAI Model Code-Gen Workflow 

   - Open the MaxAI Chrome extension
   - Select a new or extenstion session
   - Enter a new prompt (aka message) 
   - Note the Session number (e.g. 020) and the next Message Number (e.g. 06)
   - Save a markdown file for the Session / Message     
      `- Open folder: ./docs/c35_calendar1-app/GPT-4o_OpenAI-maxi`  
      `- New File: c35_t020.06.2.40718.1026_markdown.md`     
      `- Go to MaxAI session / last message: ` [www.maxai.me](https://www.maxai.me/share/?id=5d3cc16d474835143166cc68a2390ad83b7ed94981868023c785e5ba)   
      `- Copy last message: (click on bottom left icon, and select Copy as plain text)`        
      `- Paste markdown for the las message into the new file`     

   - Save a scripts markdown files   
      `- New Terminal (Bash)`     
      `# ./run-aicoder.sh set app c35`    
      `# ./run-aicoder.sh list scripts`        
      `# ./run-aicoder.sh save scripts`         
      
   - Follow the model's instructions if this is the first prompt (i.e. message)
      `# cd server`
      `# npm install ...'
      `# node server.mjs`

   - Test the app   
      `Open browser: localhost: 3000` 
      
       
### Curl API Code-Gen Workflow  
   

     
   
     