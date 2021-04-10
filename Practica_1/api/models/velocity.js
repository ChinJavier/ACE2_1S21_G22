const { Schema, model } = require('mongoose');

const velocitySchema = new Schema({
    velocity: {
        type: Number,
        required: true
    },
    username: {
        type: String,
    }
},
    { timestamps: true }
);

module.exports = model('Velocity', velocitySchema);
