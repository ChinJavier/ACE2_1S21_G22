const { Router } = require('express'); // ** estrenando router :v
const routerQueries = Router();
const { getUSER , getUsersAvailable , getMyUsers,asignarUser } = require('../controllers/user.controller');
const { reporte1 , velocidad_alcanzada , fallos_total , rendido_total  , distancia_alcanzada} = require('../controllers/reportes');// del proyecto 1


routerQueries.route('/:user').get(getUSER).put(asignarUser);
routerQueries.route('/search/getUsersAvailable').get(getUsersAvailable);
routerQueries.route('/search/getMyUsers/:user').get(getMyUsers);

// http://localhost:3000/logic/rep/1/proyecto1/:username
routerQueries.route('/rep/1/proyecto1/:username').get(reporte1);
routerQueries.route('/rep/2/proyecto1/:username').get(velocidad_alcanzada);
routerQueries.route('/rep/3/proyecto1/:username').get(distancia_alcanzada);
routerQueries.route('/rep/4/proyecto1/:username').get(fallos_total);
routerQueries.route('/rep/5/proyecto1/:username').get(rendido_total);

module.exports = {
    routerQueries,
};
