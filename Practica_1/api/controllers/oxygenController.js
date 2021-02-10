const oxygenCtrl= {};
const  modelo_oxygen = require('../models/oxygen');


oxygenCtrl.createOxygen = async (req,res)=>{
    const nuevo = new modelo_oxygen(req.body);
    await nuevo.save();

    console.log(nuevo);
    res.send('OXIGENO REGISTRADO');
}


oxygenCtrl.getAll_oxygen = async(req,res) =>{
    try {
        const registro_oxigenos =  await modelo_oxygen.find();
        res.send(registro_oxigenos);
    } catch (error) {
        console.log('error al recuperar todos los registros de oxigeno');
    }
}


oxygenCtrl.delete =  async (req,res)=> {
    await modelo_oxygen.findByIdAndDelete(req.params.id);
    res.json({message:"eliminacion realizada con exito"}) ;
}


oxygenCtrl.getOxygen = async (req,res) => {
    console.log(req.params.id);// extrae el id  por medio de req
    const get_object = await  modelo_oxygen.findById(req.params.id);
    console.log(get_object);
    res.json({message:"get oxygen"}) ;
}

module.exports = oxygenCtrl;