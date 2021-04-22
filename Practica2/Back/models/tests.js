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
        fechaHoraInicio: { // solo lo tendra 1 por test
            type: String,
            require: false
        },
        medicion: {// deberia de ser otra colleccion pero en este caso para hacerlo mas facil estara unido al test
            type: Number,
            require: true
        },
        inhalado:{
            type: Number,
            require: true
        },
        exhalado:{
            type: Number,
            required: true
        }
    }
);

module.exports = model('tests' , TestSchema);// en plural por buena practica
