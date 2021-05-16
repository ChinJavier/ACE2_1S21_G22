const Medition = require('../models/medition');

const ctrl= {};


ctrl.save_medition = async (req,res)=>{ //------------------------------ no cambia pero le dejo la misma estructura que el medition
    const nuevo = new Medition(req.body);
    try {
        await nuevo.save();
        res.status(200).json({text: 'REGISTER OK'});
    } catch (error) {
        res.status(500).json({text: 'ERROR IN SAVE THE DATA'});
    }
}


ctrl.get_all_meditions = async(req,res) =>{
    try {
        const registros =  await Medition.find({id_user: req.params.id});// id de mongo del usuario
        res.send(registros);
    } catch (error) {
        res.send('error al recuperar todos los registros de las mediciones');
    }
}

ctrl.get_num_test = async(req,res) =>{//----------------------------------- va cambiar
    try {// le sumo +1 en el front
        const ultimoTest = await Medition.find({id_user: req.params.id}).sort({test:-1}).limit(1); // LOS DEVUELVE DESCENDENTE
        if (ultimoTest.length ==  0){
            res.send({num: 0});
        }else{
            res.send({num: ultimoTest[0].test});
        }
    } catch (error) {
        console.log(error);
    }
}



// ctrl.delete =  async (req,res)=> {
//     await model_rhythm.findByIdAndDelete(req.params.id);
//     res.json({message:"eliminacion realizada con exito"}) ;
// }



module.exports = ctrl;