const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    // id will be added automatically!
    name: String,
    age: Number
});

module.exports = mongoose.model('Author', authorSchema);