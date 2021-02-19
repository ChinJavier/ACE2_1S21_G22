const { Router } = require('express'); // ** estrenando router :v
const routerQueries = Router();
const { getUSER , getUsersAvailable , getMyUsers,asignarUser } = require('../controllers/userController');



routerQueries.route('/:user').get(getUSER);
routerQueries.route('/getUsersAvailable').get(getUsersAvailable);
routerQueries.route('/getMyUsers').get(getMyUsers);


module.exports = {
    routerQueries,
};