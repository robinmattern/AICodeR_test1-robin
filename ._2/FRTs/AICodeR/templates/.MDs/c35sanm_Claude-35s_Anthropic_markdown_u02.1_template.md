## Title: {Title}
### Response File: {App}_{Ver}_markdown.md 
#### (c35sanm_Claude-35s_Anthropic_markdown_u02.1.template.md)

---------------------------------------------------------
Ask AI anything powered by MaxAI.me
---------------------------------------------------------

User: LANGUAGE: Create an app that uses javascript ES6, import not require, fetch and node scripts in .mjs. 
When importing javascript files use the filename and extension. We are  using node version 20+. 

SCRIPTS: Create client scripts in a client folder e.g. client/index.html and server scripts and package.json 
in a server folder e.g. server/server.mjs. For each script provide the filename preceded by "### File: ". 
On the next line show the code. On the next line show the explanation of what the code does. Include in 
server.mjs "app.use( express.static( path.join(__dirname, "../client" ) ) )" Also include in server.mjs 
"app.listen(PORT, () => console.log(Client is running at http://localhost:${PORT}));". W

INSTRUCTIONS: Please provide instructions for installing node modules and for execution and debugging for 
client and server in VSCode. Provide the URL for starting the client app. For these instructions provide a 
heading of "### Instructions: ". 

APPLICATION: Create an application that allows the upload of one .txt file then use it as a prompt and let me query
it using ollama with  API_ENDPOINT = "http://localhost:11434/api/generate" and MODEL = "llama3.1:8b-instruct-q8_0". 
The app root folder is lclAI-pdf-claude. Display the query statistics after each query. Use express-fileupload. 
Do not use pdf-parse.


AI: Here's an app that meets your requirements:

### File: server/package.json
```json
{
  "name": "lclai-pdf-claude",
  "version": "1.0.0",
  "type": "module",
  "main": "server.mjs",
  "scripts": {
    "start": "node server.mjs"
  },
  "dependencies": {
    "express": "^4.18.2",
    "express-fileupload": "^1.4.0",
    "node-fetch": "^3.3.1"
  }
}
```
This package.json file defines the project dependencies and scripts.

### File: server/server.mjs
```javascript
import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const API_ENDPOINT = "http://localhost:11434/api/generate";
const MODEL = "llama3.1:8b-instruct-q8_0";

app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "../client")));

let uploadedContent = '';

app.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    uploadedContent = file.data.toString('utf8');
    res.send('File uploaded successfully');
});

app.post('/query', async (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).send('No query provided');
    }

    const prompt = `${uploadedContent}\n\nHuman: ${query}\n\nAssistant:`;

    try {
        const startTime = Date.now();
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: MODEL,
                prompt: prompt,
                stream: false
            })
        });

        const data = await response.json();
        const endTime = Date.now();
        const duration = endTime - startTime;

        res.json({
            response: data.response,
            duration: duration/1000
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while processing your request');
    }
});

app.listen(PORT, () => console.log(`Client is running at http://localhost:${PORT}`));
```
This server script sets up an Express server with file upload and query handling capabilities. It uses the Ollama API to generate responses based on the uploaded content and user queries.

### File: client/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Local AI Query App</title>
    <script src="app.mjs" type="module"></script>
</head>
<body>
    <h1>Local AI Query App</h1>
    <input type="file" id="fileInput" accept=".txt">
    <button id="uploadButton">Upload</button>
    <br><br>
    <textarea id="queryInput" rows="4" cols="50" placeholder="Enter your query here"></textarea>
    <br>
    <button id="queryButton">Submit Query</button>
    <div id="result"></div>
    <div id="stats"></div>
</body>
</html>
```
This HTML file provides the structure for the client-side application.

### File: client/app.mjs
```javascript
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const queryInput = document.getElementById('queryInput');
const queryButton = document.getElementById('queryButton');
const resultDiv = document.getElementById('result');
const statsDiv = document.getElementById('stats');

uploadButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.text();
        alert(result);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading the file');
    }
});

queryButton.addEventListener('click', async () => {
    const query = queryInput.value.trim();
    if (!query) {
        alert('Please enter a query');
        return;
    }

    try {
        const response = await fetch('/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });
        const data = await response.json();
        resultDiv.textContent = data.response;
        statsDiv.textContent = `query duration: ${data.duration}secs`;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your query');
    }
});
```
This client-side script handles file uploads and query submissions, updating the UI with the results.

### Instructions:
1. Install Node.js version 20 or higher if not already installed.
2. Open a terminal and navigate to the `server` folder.
3. Run `npm install` to install the required dependencies.
4. To start the server, run `npm start` in the `server` folder.
5. Open a web browser and go to `http://localhost:3000` to access the application.

To debug in VSCode:
1. Open the project folder in VSCode.
2. Create a `.vscode/launch.json` file with the following content:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug Server",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/server/server.mjs"
        }
    ]
}
```
3. Set breakpoints in your server code as needed.
4. Press F5 or go to Run > Start Debugging to start debugging the server.

For client-side debugging:
1. Use the browser's developer tools (F12 in most browsers).
2. Set breakpoints in the Sources tab of the developer tools.

Remember to have Ollama running locally with the specified model before using the application.