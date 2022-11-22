const express = require('express');
const chalk = require('chalk');
const path = require('path');
const { addNote, getNotes, removeNote, updateNote } = require('./notes.controller');

const app = express();
const port = 3000;
const static = path.resolve(__dirname, 'public');

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(static));
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.get('/', async (req, res) => {
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    });
});

app.post('/', async (req, res) => {
    await addNote(req.body.title);
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: true
    });
});

app.delete('/:id', async (req, res) => {
    await removeNote(req.params.id);
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    });
});

app.put('/:note', async (req, res) => {
    const payload = JSON.parse(req.params.note);
    await updateNote(payload);
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    });
});

app.listen(port, () => {
    console.log(chalk.green(`Server strted on port ${port}`));
});
