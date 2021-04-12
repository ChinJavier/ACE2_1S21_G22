const { Schema, model } = require('mongoose');


const rhythmSchema = new Schema({
    rhythm:{
        type: Number,
        required: true
    },
    username: {
        type: String,
    },
    fecha:{ // para saber cual fue la ultima medicion tomada
        type: Date,
        default : Date.now,

    },
});
module.exports = model('Rhythm',rhythmSchema);
