const Repetition = require('../models/repetition');
const User = require('../models/user');

const createRepetition = async ( req, res ) => {
    try {
        const { username } = req.body;

        const dbUser = await User.findOne( { username } );

        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe',
            });
        }

        const dbRepetition = new Repetition( req.body );

        await dbRepetition.save();

        return res.status(200).json({
            ok: true,
            msg: '¡Se ha guardado la repetición exitosamente!'
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Contacte al administrador.'
        });
    }
}

const getRepetitionByUser = async ( req, res ) => {
    try {

        const { username } = req.params;

        const dbUser = await User.findOne( {username} );

        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe',
            });
        }

        const dbRepetitions = await Repetition.find({username});
        if(dbRepetitions.length === 0) {
            return res.status(200).json({
                ok: true,
                msg: 'El usuario aún no tiene repeticiones.'
            });
        }
        return res.status(200).json({
            ok: true,
            repeticiones: dbRepetitions
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Contacte al administrador.'
        });
    }
}


module.exports = {
    createRepetition,
    getRepetitionByUser
}
