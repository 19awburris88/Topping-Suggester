require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/suggest-toppings', async (req, res) => {
    try {
        const { foodPreferences, drinkPreferences } = req.body;
        const prompt = `Based on my favorite foods: ${foodPreferences} and drinks: ${drinkPreferences}, suggest a unique hot dog topping combination.`;

        const response = await axios.post(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`, {
            prompt
        });

        res.json({ suggestion: response.data.candidates[0].output });
    } catch (error) {
        console.error('Error fetching data from Gemini API:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini API' });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
