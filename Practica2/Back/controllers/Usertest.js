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













module.exports={
    saveMedition
}