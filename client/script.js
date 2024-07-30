File: server/server.mjs
import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

let icsContent = '';

app.post('/upload', upload.single('icsFile'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }

        icsContent = await fs.readFile(file.path, 'utf-8');
        await fs.unlink(file.path);

        res.status(200).send('File uploaded successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred during file upload');
    }
});

app.post('/query', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).send('No query provided');
        }

        const prompt = `ICS file content:\n${icsContent}\n\nUser query: ${query}\n\nResponse:`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API responded with status ${response.status}`);
        }

        const data = await response.json();
        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred during query processing');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

Explanation: This server-side script sets up an Express server to handle file uploads and queries. It uses multer for file handling, stores the ICS file content in memory, and processes queries using the OpenAI API.