const Velocity = require('../models/velocity');
const model_rhythm = require('../models/rhythm');
const Rendition = require('../models/rendition');
const Distance = require('../models/distance');
const Repetition = require('../models/repetition');
const User = require('../models/user');
// TODO:    REPORTES


// ============================================= REPORTE 1
var entrenamientos = [];


const reporte1 = async (req, res) => { // parte 1
    const { username } = req.params;
    entrenamientos = [];
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

// ============================================= REPORTE 2 Velocidad alcanzada:
var entrenamientos2 = [];

const velocidad_alcanzada = async (req, res) => {
    const { username } = req.params;
    try {
        const resultado = await User
        .aggregate(
        [ // EN ESTE VECTOR SE PONEN LOS STATES
            {
                $lookup:
                {
                    from: "velocities" , // hijo
                    localField: "username", // hablamos del padre
                    foreignField: "username", // que coindica con el atributo del hijo
                    as: "UserVelocities" // le doy un alias
                }
            },{$unwind: "$UserVelocities",},// COMO ESTA AL MISMO NIVEL DE ESTA CAPA PUEDO HACER REFERENCIA A TODO LO DE DISTANCIA
            {
            $lookup:
            {
                from: "repetitions" , // hijo
                localField: "username", // hablamos del padre
                foreignField: "username", // que coindica con el atributo del hijo
                as: "UserRepetitions" // le doy un alias
            }
        }, {$unwind: "$UserRepetitions"},
        {$match: {"UserRepetitions.fecha": {"$exists": true},"UserVelocities.fecha": {"$exists": true}, $and: [  {"UserVelocities.velocity": {$gte: 0.001 } }, { "UserRepetitions.repetition": {$gte: 1} } , { "UserRepetitions.repetition": {$lt: 21} } , {username: username}]  }}, // ACA VA EL USUARIO
        { $project : { _id: 0 , username : 1 , UserVelocities : { velocity : 1  , fecha : 1 } , UserRepetitions: { repetition: 1 , fecha : 1} , "dateComp": {"$cmp":["$UserRepetitions.fecha","$UserVelocities.fecha"]} }}, // 1 para incluir  , 0 para excluir
        {"$match":{"dateComp": 0 }},
        { $sort : { "UserVelocities.fecha" : 1 } }
        ]
        );
        res.send(resultado);
       // console.log(resultado);
    } catch (error) {
        console.log(":(" , error);
    }
}





// ============================================= REPORTE 3 Distancia medida por repetición:
const distancia_alcanzada = async (req, res) => {

    const { username } = req.params;
    try {
        const resultado = await User
        .aggregate(
        [ // EN ESTE VECTOR SE PONEN LOS STATES
            {
                $lookup:
                {
                    from: "distances" , // hijo
                    localField: "username", // hablamos del padre
                    foreignField: "username", // que coindica con el atributo del hijo
                    as: "UserDistances" // le doy un alias
                }
            },{$unwind: "$UserDistances",},// COMO ESTA AL MISMO NIVEL DE ESTA CAPA PUEDO HACER REFERENCIA A TODO LO DE DISTANCIA
            {
            $lookup:
            {
                from: "repetitions" , // hijo
                localField: "username", // hablamos del padre
                foreignField: "username", // que coindica con el atributo del hijo
                as: "UserRepetitions" // le doy un alias
            }
        }, {$unwind: "$UserRepetitions"},
        {$match: {"UserRepetitions.fecha": {"$exists": true},"UserDistances.fecha": {"$exists": true}, $and: [  {"UserDistances.distance": {$gte: 11} }, { "UserRepetitions.repetition": {$gte: 1} } , { "UserRepetitions.repetition": {$lt: 21} } , { "UserDistances.distance": {$lt: 23} } , {username: username} ] }}, // ACA VA EL USUARIO
        { $project : { _id: 0 , username : 1 , UserDistances : { distance : 1  , fecha : 1 } , UserRepetitions: { repetition: 1 , fecha : 1} , "dateComp": {"$cmp":["$UserRepetitions.fecha","$UserDistances.fecha"]} }}, // 1 para incluir  , 0 para excluir
        {"$match":{"dateComp": 0 }},
        { $sort : { "UserDistances.fecha" : 1 } }
        ]
        );
        res.send(resultado);
        //console.log(resultado);
    } catch (error) {
        console.log(":(" , error);
    }

// lookup es para filtrar documents como que si fuera join
// unwind ayuda a que sea un solo objeto
// project es un GROUP BY
// MATCH es un WHERE para condicionales

}





// ============================================= REPORTE 4 Conteo de veces que el atleta ha fallado:
var entrenamientos4 = [];


const fallos_total = async (req, res) => {
    const {username} = req.params;
    entrenamientos4 = [];
    const repeticiones4 = await Repetition.find({ "username": username }).sort({ fecha: 1 });
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
    
    res.send(resultado);


}



// ============================================= REPORTE 5 Conteo de veces que el atleta se ha rendido:
const rendido_total = async (req, res) => {
    const {username} = req.params;
    const repeticiones5 = await Rendition.find({ "username": username }).sort({ fecha: 1 });
    res.send(repeticiones5);
}




module.exports = {
    reporte1,
    fallos_total,
    rendido_total,
    distancia_alcanzada,
    velocidad_alcanzada
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
