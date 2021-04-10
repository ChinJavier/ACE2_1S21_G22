const Rendition = require('../models/rendition');
const User = require('../models/user');



const  addRendition = async ( req, res ) => {
    const { username } = req.body;
    try {

        const dbUser = await User.findOne({username});

        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe.'
            });
        }

        const dbRendition = new Rendition(req.body);

        const dbRenditions = await Rendition.find();
        if (dbRenditions.length > 0) {
            dbRendition.rendition += dbRenditions[-1]
        } else {
            dbRendition.rendition = 1;
        }


        await dbRendition.save();

        res.status(200).json({
            ok: true,
            msg: 'La rendición se ha guardado exitosamente.'
        });

    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: 'Contacte al administrador.'
        });

    }

}

const getRenditionsByUser = async ( req, res ) => {
    try {

        const dbUser = await User.findOne({username});

        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe.'
            });
        }

        const dbRenditions = await Rendition.find();

        return res.status(200).json({
            ok: true,
            renditions: dbRenditions
        })


    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Contacte al administrador.'
        });
    }
}


module.exports = {
    addRendition,
    getRenditionsByUser
}
