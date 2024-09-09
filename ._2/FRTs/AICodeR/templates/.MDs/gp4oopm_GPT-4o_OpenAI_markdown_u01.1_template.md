## Title: {Title}
### Response File: {App}_{Ver}_markdown.md 
#### (gp4oopm_GPT-4o_OpenAI_markdown_u01.1.template.md)

### File: server/package.json
```json
{
  "name": "ics-gpt-server",
  "version": "1.0.0",
  "type": "module",
  "main": "server.mjs",
  "scripts": {
    "start": "node server.mjs"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1",
    "node-fetch": "^3.3.1"
  }
}
```
This package.json file defines the project dependencies and scripts for the server.

### File: server/.env
```
OPENAI_API_KEY=your_openai_api_key_here
```
This .env file stores the OpenAI API key.

### File: server/server.mjs
```javascript
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileContent = req.file.buffer.toString('utf-8');
    res.json({ success: true, content: fileContent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/query', async (req, res) => {
  try {
    const { prompt, query } = req.body;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: query }
        ]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`Client is running at http://localhost:${PORT}`));
```
This server script handles file uploads, processes queries using the OpenAI API, and serves the client application.

### File: client/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ICS GPT Query</title>
</head>
<body>
    <h1>ICS GPT Query</h1>
    <input type="file" id="fileInput" accept=".ics">
    <button id="uploadButton">Upload</button>
    <br><br>
    <textarea id="queryInput" rows="4" cols="50" placeholder="Enter your query here"></textarea>
    <br>
    <button id="queryButton">Query</button>
    <br><br>
    <div id="result"></div>

    <script type="module" src="app.mjs"></script>
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

let fileContent = '';

uploadButton.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      fileContent = data.content;
      alert('File uploaded successfully');
    } else {
      alert('Error uploading file');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error uploading file');
  }
});

queryButton.addEventListener('click', async () => {
  if (!fileContent) {
    alert('Please upload a file first');
    return;
  }

  const query = queryInput.value;
  if (!query) {
    alert('Please enter a query');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: fileContent, query })
    });

    const data = await response.json();
    resultDiv.textContent = data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    alert('Error querying GPT');
  }
});
```
This client-side script handles file uploads and queries to the server.

### Instructions: 
1. Install Node.js version 20 or higher.
2. Open a terminal and navigate to the server folder.
3. Run `npm install` to install the required dependencies.
4. Create a `.env` file in the server folder and add your OpenAI API key.
5. To start the server, run `node server.mjs` in the server folder.
6. To debug the server in VSCode:
   - Open the server folder in VSCode.
   - Click on the "Run and Debug" icon in the sidebar.
   - Click "Create a launch.json file" and select "Node.js".
   - Replace the contents of the launch.json file with:
     ```json
     {
       "version": "0.2.0",
       "configurations": [
         {
           "type": "node",
           "request": "launch",
           "name": "Launch Server",
           "program": "${workspaceFolder}/server.mjs"
         }
       ]
     }
     ```
   - Press F5 or click the "Start Debugging" button to debug the server.
7. To run the client:
   - Open the client folder in a new VSCode window.
   - Install the "Live Server" extension in VSCode.
   - Right-click on `index.html` and select "Open with Live Server".
8. The client app will be available at `http://127.0.0.1:5500/client/index.html`.

To use the application:
1. Upload a .ics file (up to 10MB) using the file input.
2. Enter your query in the textarea.
3. Click the "Query" button to send the query to GPT-3.5-turbo.
4. The response will be displayed in the result div.
