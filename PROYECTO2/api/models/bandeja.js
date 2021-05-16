const { Schema, model } = require('mongoose');


const bandejaSchema = new Schema({
    mensaje: {
        type: String,
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
module.exports = model('bandejas', bandejaSchema);