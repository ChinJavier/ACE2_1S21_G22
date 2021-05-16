const { Schema, model } = require('mongoose');


const meditionSchema = new Schema({
    oxygen: {
        type: Number,
        required: true
    },
    rhythm:{
        type: Number,
        required: true
    },
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
        required: true
    }
},
    { timestamps: true }
);
module.exports = model('Medition', meditionSchema);