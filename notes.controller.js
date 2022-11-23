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
    console.log(chalk.magenta('  ID      TITLE   '));
    console.log(chalk.magenta('------ -----------'));
    notes.forEach((note) => {
        console.log(chalk.magenta(note.id), chalk.magenta(note.title));
    });
};

const removeNote = async (id) => {
    const notes = await getNotes();
    const isNoteFound = notes.filter((note) => note.id === id);
    if (isNoteFound.length !== 0) {
        const newNotes = notes.filter((note) => note.id !== id);
        await fs.writeFile(notesPath, JSON.stringify(newNotes));
        console.log(chalk.bgGreen('Note removed'));
    } else {
        console.log(chalk.bgRed(`Note with ID ${id} not found`));
    }
};

const updateNote = async (note) => {
    const notes = await getNotes();
    const noteIndex = notes.findIndex((n) => n.id.trim() === note.id.trim());
    notes[noteIndex].title = note.title;

    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgGreen('Note updated'));
};

module.exports = {
    addNote,
    getNotes,
    removeNote,
    updateNote
};
