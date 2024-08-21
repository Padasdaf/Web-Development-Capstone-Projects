import { Router } from 'express';
import posts from '../app.js';

const router = Router();

// Route to display form for creating a new post
router.get('/new', (req, res) => {
    res.render('new');
});

// Route to handle form submission for creating a new post
router.post('/', (req, res) => {
    const post = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    req.flash('success_msg', 'Post created successfully!');
    res.redirect('/');
});

// Route to display a single post
router.get('/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    res.render('show', { post: post });
});

// Route to display form for editing an existing post
router.get('/:id/edit', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    res.render('edit', { post: post });
});

// Route to handle form submission for editing a post
router.post('/:id/edit', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    req.flash('success_msg', 'Post updated successfully!');
    res.redirect('/');
});

// Route to handle deleting a post
router.post('/:id/delete', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    posts.splice(postIndex, 1);
    req.flash('success_msg', 'Post deleted successfully!');
    res.redirect('/');
});

export default router;
