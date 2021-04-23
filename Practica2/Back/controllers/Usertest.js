// imports de los modelos y cosas necesarias 
const TestModel = require('./../models/tests');
const controller = {}
const saveMedition = async (req,res) =>{
    try {
        console.log(req.body)
        const newMedition = new TestModel(req.body);
        newMedition.save();
        res.send({'ok': ':)'});
    } catch (error) {
        console.log("Error in SaveMedition");
        res.send({'Err': 'Error in SaveMedition'});
    }
}




var AIRE = 0;
var LETRA= 'p';



const realtime = async (req,res) =>{
    const {aire , letra} = req.params; // ML / min
    try {
            AIRE = aire;
            LETRA = letra;

        res.status(200).json({msg: 'ok LLego: '+AIRE , 'ok': true});
    } catch (error) {
        res.status(450).json({msg: 'ÑO' });
    }

}

const getRelatime = async(req,res) =>{
    try {
            let respuesta = [AIRE , LETRA];
            res.send(respuesta);
    } catch (error) {
        console.log("!!!!!!!!!!!!!!!!!!!!!***************")
        res.status(500).json({msj:'error recuperando el realtime'});
    }
}



const getAllTest = async(req,res) =>{
    const {username} = req.params;
    try {
        const allTest = await TestModel.find({username: username}).sort({test:1}); // LOS DEVUELVE DESCENDENTE
        console.log(allTest);
        res.send(allTest);// devuelve todos los mensajes
    } catch (error) {
        console.log(error);
    }
}







module.exports={
    saveMedition,
    getRelatime,
    realtime,
    getAllTest
}