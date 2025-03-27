const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());
const words = ['APPLE', 'TIGER', 'HOUSE', 'PLANE', 'MANGO', 'CHAIR', 'ZEBRA'];
let currentWord = '';
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];


app.get('/word', (req, res) => {
    currentWord = getRandomWord();
    console.log('Chosen word:', currentWord);
    res.json({ word: currentWord });
});


app.post('/check', (req, res) => {
    const { letter, word } = req.body;
    const indices = [];
    let updatedWord = word.split('');
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter.toUpperCase()) {
            indices.push(i);
            updatedWord[i] = currentWord[i];
        }
    }
    res.json({ indices, hiddenWord: updatedWord.join('') });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));