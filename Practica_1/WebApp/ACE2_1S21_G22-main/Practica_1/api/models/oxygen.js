const { Schema, model } = require('mongoose');


const oxygenSchema = new Schema({
    oxygen: {
        type: Number,
        required: true
    },
    fecha: { // para saber cual fue la ultima medicion tomada
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = model('Oxygen', oxygenSchema);