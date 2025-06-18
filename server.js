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
        { role: 'user', content: `Generate a short and funny mad-libs style story based on this theme: "${theme}". You could use placeholders like {noun}, {plural noun}, {verb}, {adverb}, {verb ending with -ing}, {verb ending with -ed}, {adjective}, {time of day}, {emotion}, {animal}, etc. (pretty much anything that makes sense for a mad-libs story), making sure the placeholders are in curly brackets (braces). I would suggest creating the complete story, THEN replacing the correct words with their parts of speech. Remember, you don't have to include all of these placeholders in the story. Also, Do not start with "Once upon a..." for that is too cliche. Also, please include a lot of placeholders, with at least one or two every sentence.` }
      ],
      max_tokens: 500
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