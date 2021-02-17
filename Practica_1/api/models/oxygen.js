const { Schema, model } = require('mongoose');


const oxygenSchema = new Schema({
    oxygen: {
        type: Number,
        required: true
    },

    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    }
},
    { timestamps: true });
module.exports = model('Oxygen', oxygenSchema);