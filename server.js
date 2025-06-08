// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Route to generate story prompt
app.post('/api/generate-story', async (req, res) => {
  const { theme } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a creative story generator for a Mad Libs-style game.' },
        { role: 'user', content: `Generate a 8-12 line, funny or exciting mad-libs style story based on this theme: "${theme}". Use placeholders like {noun}, {verb}, {adverb}, {adjective}, etc., making sure the placeholders are in curly brackets (braces).` }
      ],
      max_tokens: 300
    });

    const story = completion.choices[0].message.content;
    res.json({ story });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate story' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});