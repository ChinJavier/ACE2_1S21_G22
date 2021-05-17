const { Router } = require('express');
const routerMux = Router();

var OXYGEN =0 , TEMPERATURE = 0 , RHYTHM= 0;

// SUPONGO QUE ESTE USAREMOS
routerMux.route('/sensores/:temperatura/:oxigeno/:ritmo').post(
    async(req,res) => {
    const {ritmo , temperatura , oxigeno} = req.params;
    RHYTHM = ritmo;
    TEMPERATURE = temperatura;
    if (oxigeno != 0 ){
        OXYGEN = oxigeno;
    }
    console.log("POST 3 parametros" , '->' , req.params);
    res.send({text:'PETICION DE TEST DE SENSORES REALIZADA'});
});

// para probar la conexion
routerMux.route('/sensores/').get(
    async(req,res) => {
        res.send({text:'EL SERVER PARA LOS SENSORES ESTA A LA ESCUCHA'});
});


routerMux.route('/sensores/datos').get(
    async(req, res) => {
        try {
            // filtros desde el front
            res.status(200).send({temperature: TEMPERATURE , rhythm:  RHYTHM , oxygen: OXYGEN});
        } catch (error) {
            res.status(500).json({error : "FALLO EN OBTENER TODOS LOS DATOS"});
        }
    }
);


// DEVOLUCION DE DATOS
routerMux.route('/sensores/oxygen').get(
    async(req, res) => {
        try {
            if (OXYGEN > 0 ){
                res.status(200).send(OXYGEN);
            }
        } catch (error) {
            res.status(500).json({error : "FALLO EN OBTENER LA OXIGENO"});
        }
    }
);

routerMux.route('/sensores/temperature').get(
    async(req, res) => {
            try {
                res.status(200).send(TEMPERATURE);
            } catch (error) {
                res.status(500).json({error : "FALLO EN OBTENER LA TEMPERATURA"});
            }
        }
);

routerMux.route('/sensores/rhythm').get(
    async(req, res) => {
        try {
            if(RHYTHM >= 0 ){
                res.status(200).send(RHYTHM);
            }
        } catch (error) {
            res.status(500).json({error : "FALLO EN OBTENER LA OXIGENO"});
        }
    }
);


module.exports = {
    routerMux,
};