import express from 'express';
import multer from 'multer';
import fetch from 'node-fetch';
import fs from 'fs/promises';

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = 3000;

app.use(express.json());
app.use(express.static('../client'));

app.post('/upload', upload.single('icsFile'), async (req, res) => {
  try {
    const { email, apiKey } = req.body;
    const file = await fs.readFile(req.file.path, 'utf8');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Analyze this calendar data: ${file}` }]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Client is running at http://localhost:${PORT}`));
