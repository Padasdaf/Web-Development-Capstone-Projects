import pkg from 'pg';
const { Pool } = pkg;
import express from 'express';
import axios from 'axios';

const router = express.Router();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'book_notes',
    password: 'password',
    port: 5432,
});

// Route to display all books
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books ORDER BY date_read DESC');
        res.render('index', { books: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route to add a new book
router.post('/add', async (req, res) => {
    const { title, author, rating, date_read, notes } = req.body;
    const cover_url = await fetchCoverUrl(title);
    try {
        await pool.query(
            'INSERT INTO books (title, author, cover_url, rating, date_read, notes) VALUES ($1, $2, $3, $4, $5, $6)',
            [title, author, cover_url, rating, date_read, notes]
        );
        res.redirect('/books');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Function to fetch book cover URL from Open Library API
async function fetchCoverUrl(title) {
    try {
        const response = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
        if (response.data.docs.length > 0) {
            const coverId = response.data.docs[0].cover_i;
            return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : '';
        }
        return '';
    } catch (error) {
        console.error('Error fetching book cover:', error);
        return '';
    }
}

export default router;
