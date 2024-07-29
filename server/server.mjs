import express from 'express';
import multer from 'multer';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

app.post('/upload', upload.single('icsFile'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const fileContent = await fs.readFile(file.path, 'utf-8');
    res.json({ message: 'File uploaded successfully', content: fileContent });
  } catch (error) {
    res.status(500).send('Error processing file');
  }
});

app.post('/query', async (req, res) => {
  const { prompt } = req.body;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
//  res.json(data);
    res.json( { answer: data.choices[0].message.content });
  } catch (error) {
    res.status(500).send('Error querying OpenAI');
  }
});

app.listen(PORT, () => console.log(`Client is running at http://localhost:${PORT}`));