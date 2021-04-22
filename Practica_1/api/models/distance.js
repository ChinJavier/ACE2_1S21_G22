const { Schema, model } = require('mongoose');

const distanceSchema = new Schema({
    distance: {
        type: Number,
        required: true
    },
    username: {
        type: String,
    },
    fecha:{
        type: String,
        required: true,
        default: Date.now()
    }
},
    { timestamps: false }
);

module.exports = model('Distance', distanceSchema);
