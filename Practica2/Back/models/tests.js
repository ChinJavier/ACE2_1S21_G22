const {Schema , model } = require('mongoose');

const TestSchema = new Schema(
    {
        test: {
            type: Number,
            require: true
        },
        username: { // key
            type: String,
            require: true
        },
        peso:{
            type: Number,
            require: true
        },
        volEmin: {
            type: Number,
            require: true
        },
        volEmax: {
            type: Number,
            require: true
        },
        volImin: {
            type: Number,
            require: true
        },
        volImax: {
            type: Number,
            require: true
        },
        promE:{
            type: Number,
            require: true
        },
        promI:{
            type: Number,
            required: true
        },
        vo2:{
            type: Number,
            required: true
        }
    }
);
/*
  promE: number =0;
  promI: number =0;
  vo2: number=0;

*/
module.exports = model('tests' , TestSchema);// en plural por buena practica
