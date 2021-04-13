const Velocity = require('../models/velocity');
const model_rhythm = require('../models/rhythm');
const Rendition = require('../models/rendition');
const Distance = require('../models/distance');
const Repetition = require('../models/repetition');

// TODO:    REPORTES


// ============================================= REPORTE 1
const entrenamientos = [];


const reporte1 = async (req, res) => {
    const { username } = req.params;
    console.log("USUARIO: ", username);
    const repeticiones = await Repetition.find({ "username": username }).sort({ fecha: 1 });
    let objEntrenamiento = {
        "cantidadRepeticiones": 0,
        "logrado": true,
        "fecha": undefined
    }
    let flag = false;
    for (let i = 0; i < repeticiones.length; i++) {
        try {

            if (repeticiones[i + 1] != undefined) {
                if (repeticiones[i].repetition != 0 && repeticiones[i + 1].repetition == 0 && repeticiones[i].repetition > 0 && repeticiones[i].repetition < 22 && Number.isInteger(repeticiones[i].repetition)) {
                    objEntrenamiento.cantidadRepeticiones = repeticiones[i].repetition;
                    objEntrenamiento.fecha = repeticiones[i].fecha;
                    if (repeticiones[i].repetition < 21) {
                        objEntrenamiento.logrado = false;
                    }
                    entrenamientos.push({
                        "cantidadRepeticiones": objEntrenamiento.cantidadRepeticiones,
                        "logrado": objEntrenamiento.logrado,
                        "fecha": objEntrenamiento.fecha
                    });
                    objEntrenamiento.cantidadRepeticiones = 0;
                    objEntrenamiento.logrado = true;
                    flag = true;
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
    if (!flag) {
        objEntrenamiento.cantidadRepeticiones = repeticiones[repeticiones.length - 1].repetition;
        objEntrenamiento.fecha = repeticiones[repeticiones.length - 1].fecha;
        if (repeticiones[repeticiones.length - 1].repetition < 21) {
            objEntrenamiento.logrado = false;
        }
        entrenamientos.push(objEntrenamiento)
    }

    var mes = " ";
    var anio = " ";
    var dia = " ";
    var fecha = " ";
    var fechaAux = " ";
    for (let i = 0; i < entrenamientos.length; i++) {
        anio = entrenamientos[i].fecha.split("-")[0]
        mes = getMes(entrenamientos[i].fecha.split("-")[1])
        dia = entrenamientos[i].fecha.split("-")[2]
        fecha = mes + " " + dia + ", " + anio;
        fechaAux = new Date(Date.parse(fecha));
        fecha = new Date(Date.parse(fecha));
        fechaAux.setHours(0, 0, 0, 0);
        fechaAux.setDate(fechaAux.getDate() + 4 - (fechaAux.getDay() || 7));
        entrenamientos[i].semana = Math.ceil((((fechaAux - new Date(fechaAux.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7)
    }
    res.send(entrenamientos);
}

//}

function getMes(mesNumber) {

    switch (Number(mesNumber)) {
        case 01:
            return 'Jan'
        case 02:
            return 'Feb'
        case 03:
            return 'Mar'
        case 04:
            return 'Apr'
        case 05:
            return 'May'
        case 06:
            return 'Jun'
        case 07:
            return 'Jul'
        case 08:
            return 'Aug'
        case 09:
            return 'Sep'
        case 10:
            return 'Oct'
        case 11:
            return 'Nov'
        case 12:
            return 'Dec'

    }
}

// ============================================= REPORTE 2
const entrenamientos2 = [];

const velocidad_alcanzada = async (req, res) => {
    //const {username} = req.params;
    //console.log("USUARIO: " ,username);
    const repeticiones2 = await Repetition.find({ "username": "abcprueba" }).sort({ fecha: 1 });

    let objEntrenamiento2 = {
        "repeticiones": []
    }

    let objRepeticiones2 = {
        "numeroRepeticion": 0,
        "instanciasRepeticiones": []
    }

    let flag2 = false;
    let repeticionActual = 0;

    for (let i = 0; i < repeticiones2.length; i++) {
        try {
            if (i == 0) {
                repeticionActual = repeticiones2[i].repetition;
                objRepeticiones2.numeroRepeticion = repeticionActual;
            }
            if (repeticionActual != repeticiones2[i].repetition) {
                objEntrenamiento2.repeticiones.push(objRepeticiones2)
                repeticionActual++;
                objRepeticiones2.numeroRepeticion = repeticionActual;
                objRepeticiones2.instanciasRepeticiones = [];
            }

            objRepeticiones2.instanciasRepeticiones.push(repeticion2[i]);

            if (repeticiones2[i + 1] != undefined) {
                if (repeticiones2[i].repetition != 0 && repeticiones2[i + 1].repetition == 0 && repeticiones2[i].repetition > 0 && repeticiones2[i].repetition < 22 && Number.isInteger(repeticiones2[i].repetition)) {
                    objEntrenamiento2.cantidadRepeticiones = repeticiones2[i].repetition;
                    objEntrenamiento2.fecha = repeticiones2[i].fecha;
                    if (repeticiones2[i].repetition < 21) {
                        objEntrenamiento2.logrado = false;
                    }
                    entrenamientos2.push({
                        "cantidadRepeticiones": objEntrenamiento2.cantidadRepeticiones,
                        "logrado": objEntrenamiento2.logrado,
                        "fecha": objEntrenamiento2.fecha
                    });
                    objEntrenamiento2.cantidadRepeticiones = 0;
                    objEntrenamiento2.logrado = true;
                    flag2 = true;
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
    if (!flag2) {
        objEntrenamiento2.cantidadRepeticiones = repeticiones2[repeticiones2.length - 1].repetition;
        objEntrenamiento2.fecha = repeticiones2[repeticiones2.length - 1].fecha;
        if (repeticiones2[repeticiones2.length - 1].repetition < 21) {
            objEntrenamient2.logrado = false;
        }
        entrenamientos2.push(objEntrenamiento2)
    }

    res.send(entrenamientos2);
}



// ============================================= REPORTE 3
const distancia_alcanzada = async (req, res) => {

}



// ============================================= REPORTE 4
const entrenamientos4 = [];


const fallos_total = async (req, res) => {
    console.log(res);
    /*
    const repeticiones4 = await Repetition.find({ "username": "abcprueba" }).sort({ fecha: 1 });
    //console.log(repeticiones);
    let objEntrenamiento4 = {
        "cantidadRepeticiones": 0,
        "logrado": true,
        "fecha": undefined
    }
    let flag4 = false;
    for (let i = 0; i < repeticiones4.length; i++) {
        try {

            if (repeticiones4[i + 1] != undefined) {
                if (repeticiones4[i].repetition != 0 && repeticiones4[i + 1].repetition == 0 && repeticiones4[i].repetition > 0 && repeticiones4[i].repetition < 22 && Number.isInteger(repeticiones4[i].repetition)) {
                    objEntrenamiento4.cantidadRepeticiones = repeticiones4[i].repetition;
                    objEntrenamiento4.fecha = repeticiones4[i].fecha;
                    if (repeticiones4[i].repetition < 21) {
                        objEntrenamiento4.logrado = false;
                    }
                    entrenamientos4.push({
                        "cantidadRepeticiones": objEntrenamiento4.cantidadRepeticiones,
                        "logrado": objEntrenamiento4.logrado,
                        "fecha": objEntrenamiento4.fecha
                    });
                    objEntrenamiento4.cantidadRepeticiones = 0;
                    objEntrenamiento4.logrado = true;
                    flag4 = true;
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
    if (!flag4) {
        objEntrenamiento4.cantidadRepeticiones = repeticiones4[repeticiones4.length - 1].repetition;
        objEntrenamiento4.fecha = repeticiones4[repeticiones4.length - 1].fecha;
        if (repeticiones4[repeticiones4.length - 1].repetition < 21) {
            objEntrenamiento4.logrado = false;
        }
        entrenamientos4.push(objEntrenamiento4)
    }

    let resultado = (entrenamientos4.filter(objAux => {
        return objAux.logrado == false;
    }));
    */


}



// ============================================= REPORTE 5
const rendido_total = async (req, res) => {
    const repeticiones5 = await Rendition.find({ "username": "abcprueba" }).sort({ fecha: 1 });
}


fallos_total();

module.exports = {
    reporte1,
    fallos_total
}


/*
    try {
        repeticiones = await Rendition.aggregate(
            [
              {
                $project: {
                    fecha : { $dateToString: { format: "%Y-%m-%d-%H-%M-%S", date: "$createdAt" } },
                    username  : "$username",
                    rendition : "$rendition"
                }
              }
            ]
         );
            console.log(repeticiones[0]);
        for (let i = 0 ; i < repeticiones.length; i++){
            try{
                const  {fecha , username , rendition} = repeticiones[i];
                const rep = new Rendition({fecha: fecha , username: username , rendition : rendition});
                rep.save();
            }catch(error){
                console.log(error);
            }
        }

    } catch (error) {
        console.log(error);
    }

*/

/* console.log(hola);
for(let i = 0; i < hola.length; i++){
     const {_id} = hola[i];
     await Rendition.findByIdAndDelete({_id: _id});
 }*/
