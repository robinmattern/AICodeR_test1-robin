import fetch from 'node-fetch';

// Replace with your actual OpenAI API key
const API_KEY = 'your_openai_api_key_here';
const API_URL = 'https://api.openai.com/v1/completions'; // Replace 'completions' with the desired actual endpoint

const messageObject = {
    model: "text-davinci-003", // Example model
    prompt: "Translate the following English text to French: 'Hello World'",
    max_tokens: 60,
    temperature: 0.7
};

async function fetchFromOpenAI() {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(messageObject)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Response:', responseData);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

fetchFromOpenAI();
