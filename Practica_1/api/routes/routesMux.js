const { Router } = require('express');
const routerTest = Router();

var OXYGEN =0 , TEMPERATURE = 0 , RHYTHM= 0;

// routerTest.route('/sensores/:valor').post(
//     async(req,res) => {
//     console.log("post 1 parametros" , '->' , req.params);
//     res.send({text:'1 parametros enviado'});
// });

// routerTest.route('/sensores/:valor/:valor2').post(
//     async(req,res) => {
//     console.log("POST 2 parametros" , '->' , req.params);
//     res.send({text:'PETICION DE TEST DE SENSORES REALIZADA'});
// });


// SUPONGO QUE ESTE USAREMOS
routerTest.route('/sensores/:oxigeno/:temperatura/:ritmo').post(
    async(req,res) => {
    const {ritmo , temperatura , oxigeno} = req.params;
    RHYTHM = ritmo;
    TEMPERATURE = temperatura;
    OXYGEN = oxigeno;
    console.log("POST 3 parametros" , '->' , req.params);
    res.send({text:'PETICION DE TEST DE SENSORES REALIZADA'});
});

// para probar la conexion
routerTest.route('/sensores/').get(
    async(req,res) => {
        res.send({text:'EL SERVER PARA LOS SENSORES ESTA A LA ESCUCHA'});
});


// DEVOLUCION DE DATOS
routerTest.route('/sensores/oxygen').get(
    async(req, res) => {
        try {
            res.status(200).send(OXYGEN);
        } catch (error) {
            res.status(500).json({error : "FALLO EN OBTENER LA OXIGENO"});
        }
    }
);

routerTest.route('/sensores/temperature').get(
    async(req, res) => {
            try {
                res.status(200).send(TEMPERATURE);
            } catch (error) {
                res.status(500).json({error : "FALLO EN OBTENER LA TEMPERATURA"});
            }
        }
);

routerTest.route('/sensores/rhythm').get(
    async(req, res) => {
        try {
            res.status(200).send(RHYTHM);
        } catch (error) {
            res.status(500).json({error : "FALLO EN OBTENER LA OXIGENO"});
        }
    }
);


module.exports = {
    routerTest,
};