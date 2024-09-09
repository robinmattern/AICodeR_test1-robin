import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const API_ENDPOINT = "http://localhost:11434/api/generate";
const MODEL = "llama2:13b-chat";

app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "../client")));

let pdfContent = '';

app.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const pdfFile = req.files.pdfFile;
  pdfContent = pdfFile.data.toString('utf8');
  res.send('File uploaded successfully');
});

app.post('/query', async (req, res) => {
  const { query } = req.body;
  
  const prompt = `Based on the following PDF content: "${pdfContent}", please answer this question: ${query}`;

  const startTime = Date.now();
  
  try {
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
    const executionTime = endTime - startTime;

    res.json({
      answer: data.response,
      executionTime: executionTime,
      tokensGenerated: data.total_tokens
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

app.listen(PORT, () => console.log(`Client is running at http://localhost:${PORT}`));