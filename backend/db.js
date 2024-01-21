const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://harshitamore16:Harshita16@cluster0.p1hfn8w.mongodb.net/todo")

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos',todoSchema);

module.exports = {
    todo
}