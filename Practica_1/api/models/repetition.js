const { Schema, model } = require('mongoose');

const repetitionSchema = new Schema({
    repetition: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = model('Repetition', repetitionSchema);
