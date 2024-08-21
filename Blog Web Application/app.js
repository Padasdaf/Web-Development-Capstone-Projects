import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'connect-flash';
import postRoutes from './routes/posts.js';

const app = express();

// Set up view engine and middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Placeholder array to store posts
const posts = [];

app.get('/', (req, res) => {
    const POSTS_PER_PAGE = 5;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = page * POSTS_PER_PAGE;
    const paginatedPosts = posts.slice(startIndex, endIndex);
    res.render('index', {
        posts: paginatedPosts,
        currentPage: page,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE)
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.use('/posts', postRoutes);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

export default posts;
