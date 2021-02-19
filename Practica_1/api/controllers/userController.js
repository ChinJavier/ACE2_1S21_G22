const userCtrl = {}
const model_user = require('../models/user');

/*
    CRUD de los usuarios
    el crear usuario y traer usuario estan en el archivo auth.js
*/
userCtrl.getUsersAvailable = async(req,res) =>{
    try {
        const users = await model_user.find({isCoach: false, coach: "none"});
        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({text: 'error'});
    }
}

userCtrl.getMyUsers = async(req,res) =>{
    try {
        const users = await model_user.find({isCoach: false, coach: req.param.coach});
        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({text: 'error'});
    }
}

userCtrl.getUsersAvible = async(req,res) =>{
    try {
        const users =  await model_user.find({isCoach: false, coach: "none"});
        res.send(users);
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

userCtrl.updateUser = async (req,res)=> {
    const u = {username} = req.body;
    console.log(req.body);
    modelo_user.findOneAndUpdate(req.params.id,u);
    res.json({message:"UP user  "}) ;
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

userCtrl.asignarUser = async(req, res) =>{
    try {
        const actualizaciones = {author} = req.body;
        console.log(req.body);
        await user_model.findByIdAndUpdate(req.params.username, actualizaciones);
        res.status(200).json({text: 'OK todo bien'});
    } catch (error) {
        res.status(500).json({text: 'error'});
    }
}

module.exports = userCtrl;