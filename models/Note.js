const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    note: String,
    author: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', NoteSchema);