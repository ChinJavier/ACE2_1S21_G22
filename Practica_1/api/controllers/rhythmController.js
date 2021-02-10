const rhythmCtrl= {};
const  model_rhythm = require('../models/rhythm');


rhythmCtrl.createRhythm = async (req,res)=>{
    const nuevo = new model_rhythm(req.body);
    await nuevo.save();

    console.log(nuevo);
    res.send('RITMO REGISTRADA');
}


rhythmCtrl.getAll_rythem = async(req,res) =>{
    try {
        const registros =  await model_rhythm.find(); // se tiene que hacer un filtro donde coincida el id
        res.send(registros);
    } catch (error) {
        console.log('error al recuperar todos los registros de oxigeno');
    }
}


rhythmCtrl.delete =  async (req,res)=> {
    await model_rhythm.findByIdAndDelete(req.params.id);
    res.json({message:"eliminacion realizada con exito"}) ;
}


rhythmCtrl.getRhythm = async (req,res) => {
    console.log(req.params.id);// extrae el id  por medio de req
    const get_object = await  model_rhythm.findById(req.params.id);
    console.log(get_object);
    res.json({message:"get rhythm"}) ;
}

module.exports = rhythmCtrl;