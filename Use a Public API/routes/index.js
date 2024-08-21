import express from 'express';
import fetch from 'node-fetch'; 

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await fetch('https://programming-quotesapi.vercel.app/api/random');
        const quoteData = await response.json();

        console.log("Quote fetched:", quoteData);

        // Pass the correct properties to the EJS template
        res.render('index', { quoteText: quoteData.quote, quoteAuthor: quoteData.author });
    } catch (error) {
        console.error('Error fetching the quote:', error.message);
        res.render('error', { error: 'Failed to fetch quote. Please try again later.' });
    }
});

export default router;
