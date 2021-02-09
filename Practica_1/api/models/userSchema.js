const { Schema , model } = require('mongoose');


const userSchema = new Schema({
    username : String,
    password : String,
    usertype :{
        type: Number,
        default: 0
    }
});
 // EL SCHEMA es para mongoose

 // el model es para la base de datos
module.exports =  model('user',userSchema);
// https://www.youtube.com/watch?v=gfP3aqV38q4 minuto 30