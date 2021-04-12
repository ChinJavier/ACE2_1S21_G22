const Distance = require('../models/distance');
const User = require('../models/user');
const createDistance = async ( req, res ) => {
    try {
        const { username } = req.body;

        const dbUser = await User.findOne( {username} );

        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe',
            });
        }

        const dbDistance = new Distance(req.body);

        await dbDistance.save();

        return res.status(200).json({
            ok: true,
            msg: '¡Se ha guardado el valor de la distancia exitosamente!'
        });


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Contacte al administrador.'
        });
    }
}

const getDistanceByUser = async( req, res ) => {
    try {

        const { username } = req.params;

        const dbUser = await User.findOne( {username} );

        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe',
            });
        }

        const dbDistance = await Distance.find({username});

        if(dbDistance.length === 0) {
            return res.status(400).json({
                ok: true,
                msg: 'El usuario aún no tiene medidas de velocidad.'
            });
        }

        return res.status(200).json( {
            ok: true,
            values: dbDistance
        } )


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Contacte al administrador.'
        });
    }
}


module.exports = {
    getDistanceByUser,
    createDistance
}
