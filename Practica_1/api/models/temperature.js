const { Schema, model } = require('mongoose');


const temperatureSchema = new Schema({
    temperature:{
        type: Number,
        required: true
    },
    fecha:{ // para saber cual fue la ultima medicion tomada
        type: Date,
        default : Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: "User",
        require: true
    }
});
module.exports = model('Temperature',temperatureSchema);