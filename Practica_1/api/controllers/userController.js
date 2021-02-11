const userCtrl = {}
const model_user = require('../models/user');

/*
    CRUD de los usuarios
    el crear usuario y traer usuario estan en el archivo auth.js
*/
userCtrl.getUsers = async(req,res) =>{
    try {
        const users = await model_user.find();
        res.send(users);
    } catch (error) {
        console.log(error);
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

module.exports = userCtrl;