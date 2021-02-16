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
    coach: {
        type: Boolean,
        required: true,
        defaultValue: false,
    },
    coach: {
        type: String,
        required: false,
        defaltValue: "none"
    }
});

module.exports = model('User', userSchema);
