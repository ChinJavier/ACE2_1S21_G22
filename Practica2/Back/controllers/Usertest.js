// imports de los modelos y cosas necesarias 
const TestModel = require('./../models/tests');
const controller = {}
const saveMedition = async (req,res) =>{
        /*
        expected object:

        test , 
        username , 
        fechaHoraInicio , 
        medicion ,
        inhalado ,
        exhalado 
        
        */ 
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




const realtime = async (req,res) =>{
    const {aire} = req.params; // ML / min
    try {
        AIRE = aire;
        console.log(AIRE)
        res.send('ok LLego: '+aire);
    } catch (error) {
        res.send('NO LLEGO')
    }

}

const getRelatime = async(req,res) =>{
    try {
        if(AIRE != undefined){
            res.send(AIRE);
        }
    } catch (error) {
        console.log("error recuperando el realtime")
        res.json({msj:'error recuperando el realtime'});
    }
}






module.exports={
    saveMedition,
    getRelatime,
    realtime
}