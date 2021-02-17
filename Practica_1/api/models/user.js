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
    isCoach: {
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
    },
    edad:{
        type: String
    },
    estatura:{
        type: String
    },
    peso:{
        type: String
    },
    coach: {
        type: String,
        required: false,
        defaltValue: "none"
    }
});

module.exports = model('User', userSchema);
