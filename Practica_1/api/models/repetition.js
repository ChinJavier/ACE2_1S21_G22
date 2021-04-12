const { Schema, model } = require('mongoose');

const repetitionSchema = new Schema({
    repetition: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    fecha:{
        type: String,
        required: true,
        default: Date.now()
    }
},
{ timestamps: false }
);

module.exports = model('Repetition', repetitionSchema);
