const Velocity = require('../models/velocity');

const addVelocity = (req, res) => {
    try {
        const dbVelocity = new Velocity(req.body);
        dbVelocity.save();

        res.status(200).json({
            ok: true,
            dbVelocity: dbVelocity
        })

    } catch (error) {
        console.log(erro);
        res.status(400).json({
            ok: false,
            msg: 'No se ha podido guardar el dato.'
        })
    }
}

const getVelocitiesByUser = async (req, res) => {
    try {
        const { username } = req.params;
        const velocities = await Velocity.find({ username: username });

        res.status(200).json({
            ok: true,
            velocities
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Este usuario no tiene mediciones de velocidad.'
        })
    }
}

module.exports = {
    addVelocity,
    getVelocitiesByUser
}
