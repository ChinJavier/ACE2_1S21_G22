const { Schema, model } = require('mongoose');

const velocitySchema = new Schema({
    velocity: {
        type: Number,
        required: true
    },
    username: {
        type: String,
    },
    fecha:{
        type: String,
        required: true
    }
},
    { timestamps: false }
);

module.exports = model('Velocity', velocitySchema);
