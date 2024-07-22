import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

app.post('/upload', upload.single('icsFile'), async (req, res) => {
  try {
    const icsContent = await fs.readFile(req.file.path, 'utf-8');
    await fs.writeFile(path.join(__dirname, 'icsData.txt'), icsContent);
    res.json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading file' });
  }
});

app.post('/query', async (req, res) => {
  try {
    const icsContent = await fs.readFile(path.join(__dirname, 'icsData.txt'), 'utf-8');
    const query = req.body.query;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that can answer questions about the provided ICS file content.' },
          { role: 'user', content: `ICS file content:\n${icsContent}\n\nQuestion: ${query}` }
        ]
      })
    });

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Error processing query' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
