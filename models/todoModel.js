const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    item: { type: String, required: true },
    userId: { type: String, required: true }
});

module.exports = Todo = mongoose.model('todo', todoSchema);