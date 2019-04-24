const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    // avatar: {
    //     type: String,
    //     required: true,
    // },
    role: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('user', user);