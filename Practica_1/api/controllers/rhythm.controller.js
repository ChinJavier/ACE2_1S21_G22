const rhythmCtrl = {};
const model_rhythm = require('../models/rhythm');

/*
rhythmCtrl.createRhythm = async (req, res) => {
    const nuevo = new model_rhythm(req.body);
    try {
        await nuevo.save();
        res.status(200).json({ text: 'RITMO REGISTRADO' });
    } catch (error) {
        res.status(500).json({ text: 'CHIPILIN' });
    }
}*/
/*
rhythmCtrl.delete = async (req, res) => {
    await model_rhythm.findByIdAndDelete(req.params.id);
    res.json({ message: "eliminacion realizada con exito" });
}*/

rhythmCtrl.getAll_rythem = async (req, res) => {
    try {
        const registros = await model_rhythm.find({ user: req.params.id });
        //console.log('devuelve', registros)
        res.send(registros);
    } catch (error) {
        console.log('error al recuperar todos los registros de oxigeno');
        res.send('ID INCORRECTO');
    }
}




rhythmCtrl.getRhythm = async (req, res) => {
    //console.log(req.params.id);// extrae el id  por medio de req
    const get_object = await model_rhythm.findById(req.params.id);
    //console.log(get_object);
    res.json({ message: "get rhythm" });
}

rhythmCtrl.getRhythmForProyecto1 = async (req, res) => {
    try {
        const { username } = req.params;

        const registrosRitmo = await model_rhythm.find({ username: username });
        //console.log('devuelve', registrosRitmo)
        res.status(200).json({
            ok: true,
            registrosRitmo
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Este usuario no tiene mediciones de RITMO.'
        })
    }
}


module.exports = rhythmCtrl;