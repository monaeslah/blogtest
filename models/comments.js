const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comment = new Schema({
    text: {
        type: String,
        required: true,
    },
    createDate: Date,
    username: String,
    articleID: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'article'
    }
});

module.exports = mongoose.model('comment', comment);