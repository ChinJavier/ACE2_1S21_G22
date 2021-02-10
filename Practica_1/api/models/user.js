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
    tipo: {
        type: Boolean,
        required: true
    }
});

module.exports = model('User', userSchema);
