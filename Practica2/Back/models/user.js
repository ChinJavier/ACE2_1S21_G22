const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    username: { // key
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    testsPerformed: { // contador que va en incremento para saber cuantos test lleva realizados ;)
        type: Number,
        default: 0,
        require: true
    }
});

module.exports = model('User', userSchema);
