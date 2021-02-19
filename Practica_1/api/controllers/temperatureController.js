const temperatureCtrl= {};
// const  model_temperature = require('../models/temperature');

const model_temperature = require('../models/temperature')
temperatureCtrl.createTemperature = async (req,res)=>{
    const nuevo = new model_temperature(req.body);
    try {
        await nuevo.save();
        res.status(200).json({text: 'TEMPERATURA REGISTRADO'});
    } catch (error) {
        res.status(500).json({text: 'CHIPILIN'});
    }
}


temperatureCtrl.getAll_temperature = async(req,res) =>{
    try {
        const registros =  await model_temperature.find({user: req.params.id});
        console.log('devuelve' , registros)
        res.send(registros);
    } catch (error) {
        console.log('error al recuperar todos los registros de oxigeno');
        res.send('ID INCORRECTO');
    }
}


temperatureCtrl.delete =  async (req,res)=> {
    await model_temperature.findByIdAndDelete(req.params.id);
    res.json({message:"eliminacion realizada con exito"}) ;
}


temperatureCtrl.getTemperature = async (req,res) => {
    console.log(req.params.id);// extrae el id  por medio de req
    const get_object = await  model_temperature.findById(req.params.id);
    console.log(get_object);
    res.json({message:"get temperature"}) ;
}

module.exports = temperatureCtrl;