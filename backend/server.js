const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB, sequelize } = require('./db');
const Bug = require('./models/Bug');
const Comment = require('./models/Comment');
const Verifier = require('./models/Verifier');
const Programmer = require('./models/Programmer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to database
connectDB();

// Sync models and add example data
sequelize.sync({ force: true }).then(async () => {
    console.log("Database & tables created!");

    // Add example verifiers
    await Verifier.bulkCreate([
        { name: 'Verifier One', email: 'verifier1@example.com' },
        { name: 'Verifier Two', email: 'verifier2@example.com' },
        { name: 'Verifier Three', email: 'verifier3@example.com' },
        { name: 'Verifier Four', email: 'verifier4@example.com' },
        { name: 'Verifier Five', email: 'verifier5@example.com' },
    ]);

    // Add example programmers
    await Programmer.bulkCreate([
        { name: 'Programmer One', email: 'programmer1@example.com' },
        { name: 'Programmer Two', email: 'programmer2@example.com' },
        { name: 'Programmer Three', email: 'programmer3@example.com' },
        { name: 'Programmer Four', email: 'programmer4@example.com' },
        { name: 'Programmer Five', email: 'programmer5@example.com' },
    ]);

    // Add example bugs
    await Bug.bulkCreate([
        { name: 'Bug One', description: 'Description for bug one' },
        { name: 'Bug Two', description: 'Description for bug two' },
        { name: 'Bug Three', description: 'Description for bug three' },
        { name: 'Bug Four', description: 'Description for bug four' },
        { name: 'Bug Five', description: 'Description for bug five' },
    ]);
});

// Bug routes
app.get('/api/bugs', async (req, res) => {
    const bugs = await Bug.findAll();
    res.json(bugs);
});

app.post('/api/bugs', async (req, res) => {
    const { name, description } = req.body;
    const bug = await Bug.create({ name, description });
    res.status(201).json(bug);
});

app.get('/api/bugs/:bugId', async (req, res) => {
    const bugId = parseInt(req.params.bugId);
    const bug = await Bug.findByPk(bugId);
    res.json(bug);
});

app.delete('/api/bugs/:bugId', async (req, res) => {
    const bugId = parseInt(req.params.bugId);
    await Bug.destroy({ where: { id: bugId } });
    res.status(204).end();
});

// Comment routes
app.get('/api/bugs/:bugId/comments', async (req, res) => {
    const bugId = parseInt(req.params.bugId);
    const comments = await Comment.findAll({ where: { bugId } });
    res.json(comments);
});

app.post('/api/bugs/:bugId/comments', async (req, res) => {
    const bugId = parseInt(req.params.bugId);
    const { text, username } = req.body;
    const comment = await Comment.create({ bugId, text, username });
    res.status(201).json(comment);
});

// Verifier routes
app.post('/api/verifiers', async (req, res) => {
    const { name, email } = req.body;
    const verifier = await Verifier.create({ name, email });
    res.status(201).json(verifier);
});

app.get('/api/verifiers', async (req, res) => {
    const verifiers = await Verifier.findAll();
    res.json(verifiers);
});

// Programmer routes
app.post('/api/programmers', async (req, res) => {
    const { name, email } = req.body;
    const programmer = await Programmer.create({ name, email });
    res.status(201).json(programmer);
});

app.get('/api/programmers', async (req, res) => {
    const programmers = await Programmer.findAll();
    res.json(programmers);
});

// Login routes
app.post('/api/login/verifier', async (req, res) => {
    const { email } = req.body;
    const verifier = await Verifier.findOne({ where: { email } });
    if (verifier) {
        res.status(200).json(verifier);
    } else {
        res.status(401).json({ error: 'Verifier not found' });
    }
});

app.post('/api/login/programmer', async (req, res) => {
    const { email } = req.body;
    const programmer = await Programmer.findOne({ where: { email } });
    if (programmer) {
        res.status(200).json(programmer);
    } else {
        res.status(401).json({ error: 'Programmer not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
