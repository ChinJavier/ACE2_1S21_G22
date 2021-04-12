const Medition = require('../models/medition');

const createMedition = async (req, res) => {
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
    return res.status(201).json({
        ok: true,
        medition,
    });
}

const getMeditionsByUsername = async (req, res) => {
    const { username } = req.body;
    let medition = await Medition.findOne({ username: username });
    if (!medition) {
        return res.status(400).json({
            ok: false,
            msg: "There are no meditions for this user yet.",
        });
    };
    return res.status(200).json({
        type: medition.type,
        timestamsp: timestamps
    });
}


module.exports = {
    createMedition,
    getMeditionsByUsername,
}