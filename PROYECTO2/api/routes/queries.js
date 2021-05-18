const { Router } = require('express'); // ** estrenando router :v
const routerQueries = Router();
const { getUSER , getUsersAvailable , getMyUsers,asignarUser } = require('../controllers/userController');
const { save_medition , get_all_meditions , get_num_test , get_all_meditions_of_test } = require('../controllers/meditions');

const { createMail, getMyMails, sendMail } = require('../controllers/bandeja')

// http://localhost:3000/logic

// GET USER SIRVE PARA EL PERFIL

routerQueries.route('/:user').get(getUSER).put(asignarUser);
routerQueries.route('/search/getUsersAvailable').get(getUsersAvailable);
routerQueries.route('/search/getMyUsers/:user').get(getMyUsers);


// GUARDADO DE DATOS Y RECUPERACION DE LOS MISMOS PARA LOS REPORTES
routerQueries.get('/allMeditions/:id',get_all_meditions); // http://localhost:3000/logic/allMeditions/id_mongo
routerQueries.get('/getTest/:id/:test',get_all_meditions_of_test); // http://localhost:3000/logic/allMeditions/id_mongo
routerQueries.post('/saveMedition',save_medition); // http://localhost:3000/logic/saveMedition
routerQueries.get('/getNumTest/:id',get_num_test); // http://localhost:3000/logic/getNumTest/id_mongo


// ==========================================================================
// =============================================================      CORREOS
routerQueries.post('/saveCorreo', createMail) // http://localhost:3000/logic/saveCorreo
routerQueries.get('/getCorreos/:id', getMyMails) // http://localhost:3000/logic/getCorreos
routerQueries.post('/sendEmail', sendMail) // http://localhost:3000/logic/sendEmail



module.exports = {
    routerQueries,
};