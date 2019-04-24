const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const article = new Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    text: {
        type: String,
        required: true,
    },
    createDate: Date,
    author: String,
    username: String    
});

module.exports = mongoose.model('article', article);