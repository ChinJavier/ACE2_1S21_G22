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
    const username = dbUser.username;
    const dbDistance = new Distance({ distance: distancia, username: username });
    const dbVelocity = new Velocity({ velocity: velocidad, username: username });
    const dbRhythm = new Rhythm({ rhythm: ritmo , username: username });
    const dbRepetition = new Repetition( { repetition: repeticion, username: username } );
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
    const {_id} = req.params;
    console.log("incrementando: ", _id );
    try {
        const dbUser = await User.findById({ _id});
        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe',
            });
        }
        let objeto = await Rendition.findOne({ username: dbUser.username });
        if (objeto == undefined){
            const o = new Rendition({ username: dbUser.username , rendition: 1});
            await o.save(); 
            return res.status(200).json({
                ok: true,
                msg: 'ok primera rendicion',
            });
        }else{
            const valorAnterior = objeto.rendition;
            await Rendition.findOneAndDelete({username: dbUser.username});
            const nuevo = new Rendition({ username: dbUser.username , rendition: valorAnterior+1});
            await nuevo.save();
          //  console.log("OK............." , nuevo)
            return res.status(200).json({
                ok: true,
                msg: 'ok-INCREMENTANDO',
            });
        }

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getData,
    fallos
}
