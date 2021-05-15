const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: String
    },
    height: {
        type: String
    },
    weight: {
        type: String
    }
});

module.exports = model('User', userSchema);
