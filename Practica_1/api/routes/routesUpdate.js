const { Router } = require('express');
const routerUpdate = Router();
const user_model = require('../models/user');
let funcion  = async(req,res)=>{
    try {
        const actualizaciones = {author} = req.body;
        console.log(req.body);
        await user_model.findByIdAndUpdate(req.params.username, actualizaciones);
        res.status(200).send("ok");
    } catch (error) {
        res.status(500).json({text: 'error'});
    }

}

routerUpdate.route('/:username').put(funcion);
module.exports = {
    routerUpdate,
};