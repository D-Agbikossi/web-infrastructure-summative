const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'supersecurekey'; // Replace with an environment variable in production //

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend'))); // Serve static files from the frontend folder

// In-memory user store (for simplicity; replace with a database in production)
const usersFile = path.join(__dirname, 'users.json');
const articlesFile = path.join(__dirname, 'articles.json');

// Helper functions to load and save data
const loadUsers = () => JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
const saveUsers = (users) => fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');

const loadArticles = () => JSON.parse(fs.readFileSync(articlesFile, 'utf-8'));
const saveArticles = (articles) => fs.writeFileSync(articlesFile, JSON.stringify(articles, null, 2), 'utf-8');

// Routes
// User Signup
app.post(
    '/api/auth/signup',
    [
        body('username').isAlphanumeric().withMessage('Username must be alphanumeric'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { username, password } = req.body;
        const users = loadUsers();
        if (users.find(user => user.username === username)) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });
        saveUsers(users);

        res.status(201).send('User registered successfully');
    }
    );

// User Login
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();
    const user = users.find(user => user.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token }); });

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Access denied');

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user;
        next();
    });
};

// Get All Articles
app.get('/api/articles', (req, res) => {
    const articles = loadArticles();
    res.json(articles);
});

// Submit a New Article (Authenticated)
app.post('/api/articles', authenticateToken, (req, res) => {
    const { title, content, reference } = req.body;
    if (!title || !content || !reference) {
        return res.status(400).send('All fields are required');
    }

    const articles = loadArticles();
    const newArticle = {
        id: articles.length + 1, title,
        author: req.user.username, content, reference,
    };

    articles.push(newArticle);
    saveArticles(articles);

    res.status(201).send('Article submitted successfully');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Cardio Blog server is running on http://localhost:${PORT}`);
});
