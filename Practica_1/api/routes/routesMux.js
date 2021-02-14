const { Router } = require('express');
const routerTest = Router();
routerTest.route('/sensores/').post(
    async(req,res) => {
    console.log(req.body);
    console.log("PETICION DE TEST DE SENSORES REALIZADA")
    res.send({text:'PETICION DE TEST DE SENSORES REALIZADA'});
});
module.exports = {
    routerTest,
};