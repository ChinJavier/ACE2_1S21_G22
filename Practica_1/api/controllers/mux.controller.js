const Distance = require('../models/distance');
const Velocity = require('../models/velocity');
const Rhythm = require('../models/rhythm');
const User = require('../models/user');
const Repetition = require('../models/repetition');
const Rendition = require('../models/rendition');
const { findOneAndDelete } = require('../models/distance');



const getData = async (req, res) => {
    const { distancia, velocidad, ritmo, repeticion, _id } = req.params;
    console.log("PARAMETROS: " , req.params);

    const dbUser = await User.findById({ _id });
    if(!dbUser) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe',
        });
    }
    var f = new Date();
    //"%Y-%m-%d-%H-%M-%S"
    let fechaFormateada = f.getFullYear()+"-"+f.getMonth()+"-"+f.getDate()+"-"+f.getHours()+"-"+f.getMinutes()+"-"+f.getSeconds();
    console.log(fechaFormateada)
    const username = dbUser.username;
    const dbDistance = new Distance({ distance: distancia, username: username , fecha: fechaFormateada});
    const dbVelocity = new Velocity({ velocity: velocidad, username: username , fecha: fechaFormateada });
    const dbRhythm = new Rhythm({ rhythm: ritmo , username: username , fecha_: fechaFormateada });
    const dbRepetition = new Repetition( { repetition: repeticion, username: username  , fecha: fechaFormateada } );
    try {
        await dbDistance.save();
        await dbVelocity.save();
        await dbRhythm.save();
        await dbRepetition.save();    
    } catch (error) {
        console.log("error Guardando")
    }


    return res.status(200).json({
        ok: true,
        msg: 'Datos almacenados exitosamente.',
        distancia: dbDistance,
        velocidad: dbVelocity,
        repeticion: dbRepetition,
        ritmo: dbRhythm,
        _id
    })

}

const fallos = async (req, res) =>{
    const { _id , repeticion } = req.params;

    try {
      /*  const dbUser = await User.findById({ _id});
        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe',
            });
        }
        
        }*/

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getData,
    fallos
}
