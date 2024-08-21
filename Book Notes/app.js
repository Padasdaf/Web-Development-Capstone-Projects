import express from 'express';
import bodyParser from 'body-parser';
import booksRouter from './routes/books.js';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Use the books router for all /books routes
app.use('/books', booksRouter);

// Handle the root URL / and redirect to /books
app.get('/', (req, res) => {
    res.redirect('/books');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
