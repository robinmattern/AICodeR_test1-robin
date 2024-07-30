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

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json());

let icsContent = '';

app.post('/upload', upload.single('icsFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        icsContent = await fs.readFile(req.file.path, 'utf8');
        await fs.unlink(req.file.path);
        res.send('File uploaded successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while processing the file');
    }
});

app.post('/query', async (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'No query provided' });
    }

    if (!icsContent) {
        return res.status(400).json({ error: 'No ICS file uploaded' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant that answers questions about ICS file content.' },
                    { role: 'user', content: `ICS file content:\n${icsContent}\n\nQuery: ${query}` }
                ]
            })
        });

        const data = await response.json();
        res.json(data.choices[0].message);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the query' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));