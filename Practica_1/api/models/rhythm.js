const { Schema, model } = require('mongoose');


const rhythmSchema = new Schema({
    rhythm:{
        type: Number,
        required: true
    },
    username: {
        type: String,
    },
    fecha_:{
        type: String,
        required: true,
        default: Date.now()
    }
} ,
{ timestamps: false }
);
module.exports = model('Rhythm',rhythmSchema);

