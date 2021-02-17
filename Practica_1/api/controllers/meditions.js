const { Medition } = require('../models/medition');

const createMedition = (req, res) => {
    let medition = "Medition";
    try {
        medition = new Medition(req.body);
        await user.save();
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            medition,
        });
    }
    res.status(201).json({
        ok: true,
        medition,
    });
}

const getMeditionsByUser = (req, res) => {

}


module.exports = {
    createMedition,
    getMeditionsByUser
}