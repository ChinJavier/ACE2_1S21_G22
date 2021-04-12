const { Schema, model } = require('mongoose');


const meditionSchema = new Schema({
    type: {
        type: String,
        required: false
    },
    username: {
        type: String,
    }
},
    { timestamps: true }
);
module.exports = model('Medition', meditionSchema);