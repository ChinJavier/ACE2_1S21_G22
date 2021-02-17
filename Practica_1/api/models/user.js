const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    coach: {
        type: Boolean,
        required: true,
        defaultValue: false,
    },
    nombre:{
        type: String
    },
    apellido:{
        type: String
    },
    sexo:{
        type: String
    }
});

module.exports = model('User', userSchema);
