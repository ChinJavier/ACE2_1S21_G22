const bandejaCtrl = {}
const model_bandeja = require('../models/bandeja');

bandejaCtrl.getMyMails = async(req,res) =>{
    console.log("El id del usuario de los mails es ", req.params.id)
    try {
        const mails =  await model_bandeja.find({user: req.params.id});
        res.send(mails);
    } catch (error) {
        console.log('error al recuperar todos los registros de oxigeno');
        res.send('ID INCORRECTO');
    }
}


bandejaCtrl.createMail = async (req,res)=>{
    const mail = new model_bandeja(req.body);
    try {
        await mail.save();
        console.log("NEW USER: ", mail);
        res.send('ok')
    } catch (error) {
        console.log(error);
        res.send('algo ocurrió mal')
    }

    
}





module.exports = bandejaCtrl;