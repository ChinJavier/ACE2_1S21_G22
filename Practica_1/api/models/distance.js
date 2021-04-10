const { Schema, model } = require('mongoose');

const distanceSchema = new Schema({
    distance: {
        type: Number,
        required: true
    },
    username: {
        type: String,
    }
},
    { timestamps: true }
);

module.exports = model('Distance', distanceSchema);
