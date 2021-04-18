const userCtrl = {}
const model_user = require('../models/user');

/*
    CRUD de los usuarios
    el crear usuario y traer usuario estan en el archivo auth.js
*/
userCtrl.getUsersAvailable = async(req,res) =>{
    try {
        const u =  await model_user.find({isCoach: false , coach: "SIN_ASIGNAR" });
        res.send(u);
        console.log(u);
    } catch (error) {
        console.log('error al recuperar todos los registros de oxigeno');
        res.send('ID INCORRECTO');
    }
}

userCtrl.getMyUsers = async(req,res) =>{
    console.log("usuarios pertenecientes a " , req.params.user)
    try {
        const u =  await model_user.find({isCoach:false , coach:req.params.user});
        res.send(u);
    } catch (error) {
        console.log('error al recuperar todos los registros de oxigeno');
        res.send('ID INCORRECTO');
    }
}

userCtrl.getUSER = async(req,res) =>{
    console.log('BUSCANDO A  ' , req.params.user);
    try {
        const u =  await model_user.findOne({username: req.params.user});
        res.send(u);
    } catch (error) {
        console.log('error al recuperar todos los registros de oxigeno');
        res.send('ID INCORRECTO');
    }
}

userCtrl.asignarUser = async (req,res)=> { // NO FUNCIONA HAY QUE USAR OTRA 
    console.log(req.params.user);
    console.log(req.body);
    try {
        const cuerpo = {coach} = req.body;
        console.log(req.body);
        await model_user.findByIdAndUpdate( { _id: req.params.user }, {$set: cuerpo});
        res.status(200).json({message:"TODO BIEN" , USUARIO: req.body.user , coach : cuerpo.coach }) ;
    } catch (error) {
        console.log('error' , error);
        res.status(500).json({message: error }) ;
    }
}

userCtrl.deleteUser =  async (req,res)=> {
    await modelo_user.findByIdAndDelete(req.params.id);
    res.json({message:"Del. user"}) ;
}
// SOLO PARA TEST
userCtrl.createUserTest = async (req,res)=>{
    const nuevo = new model_user(req.body);
    await nuevo.save();
    console.log("NEW USER: ", nuevo);
    res.send('ok')
}



module.exports = userCtrl;