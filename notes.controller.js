const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');
const crypto = require('crypto');

const notesPath = path.join(__dirname, 'db.json');

const getId = (text) => {
    return crypto.createHash('shake256', { outputLength: 3 }).update(text).digest('hex');
};

const getNotes = async () => {
    const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
};

const addNote = async (title) => {
    const notes = await getNotes();

    const note = {
        title,
        id: getId(title)
    };
    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgGreen('Note saved to file'));
};

const printNotes = async () => {
    const notes = await getNotes();
    console.log(chalk.bgMagenta('List of notes'));
    notes.forEach((note) => {
        console.log(chalk.magenta(note.title));
    });
};

module.exports = {
    addNote,
    printNotes
};
