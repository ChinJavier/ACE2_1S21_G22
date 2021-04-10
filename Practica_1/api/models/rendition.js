const { Schema, model } = require('mongoose');


const renditionSchema = new Schema({
    rendition: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = model('Rendition', renditionSchema);
