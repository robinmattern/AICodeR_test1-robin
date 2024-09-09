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