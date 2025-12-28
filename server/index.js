const expre = require('express');
const cors = require('cors');//This part is the interview where you ask me questions, right? ::)
const bodyParser = require('body-parser');

const app = expre();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

// API Sum two numbers
app.post('/api/sum', (req, res) => {
    const { number1, number2 } = req.body;
    console.log(number1, number2);
    // Validate input
    if (typeof number1 !== 'number' || typeof number2 !== 'number') {
        return res.status(400).json({ error: 'Invalid input, Please provide two numbers.' });
    }
    const sum = number1 + number2;
    res.json({ 
        result: sum,
        message: 'Calculation successful' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 