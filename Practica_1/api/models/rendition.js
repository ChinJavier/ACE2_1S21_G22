const { Schema, model } = require('mongoose');


const renditionSchema = new Schema({
    repeticion: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    fecha:{
        type: String,
        required: true,
        default: Date.now()
    }
}, {
    timestamps: false
});

module.exports = model('Rendition', renditionSchema);
