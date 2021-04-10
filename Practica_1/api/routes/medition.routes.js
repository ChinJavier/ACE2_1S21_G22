const { Router } = require('express');
const { createOxygen, getAll_oxygen, getOxygen } = require('../controllers/oxygen.controller');
const { createTemperature, getAll_temperature, getTemperature } = require('../controllers/temperature.controller');
const {/* createRhythm,*/ getRhythm,/* getAll_rythem ,*/getRhythmForProyecto1} = require('../controllers/rhythm.controller');
const { createUserTest } = require('../controllers/user.controller');
const { addVelocity,getVelocitiesByUser } = require('../controllers/velocity.controller');
const { createDistance, getDistanceByUser } = require('../controllers/distance.controller');
const { createRepetition, getRepetitionByUser } = require('../controllers/repetition.controller');
const { getRenditionsByUser, addRendition } = require('../controllers/rendition.controller');
const { getData , fallos} = require('../controllers/mux.controller');

const router = Router();

//  http://9cf6e2da88d1.ngrok.io/api/v1/meditions/sender/v2/data
//http://localhost:3000/api/v1/meditions/all/velocity/paola funciona




// create , temperature , oxygen , rhythm
router.route('/oxygen').post(createOxygen);
router.route('/temperature').post(createTemperature);
//router.route('/rhythm').post(createRhythm);

router.route('/sender/v2/data/:_id/:velocidad/:distancia/:ritmo/:repeticion').post(getData);
router.route('/test').post(createUserTest);

// Proyecto 1
router.post('/all/distance/new', createDistance);
router.get('/all/distance/:username', getDistanceByUser);

router.post('/all/repetition/new', createRepetition);
router.get('/all/repetition/:username', getRepetitionByUser);

router.post('/all/velocity/new', addVelocity);
router.get('/all/velocity/:username', getVelocitiesByUser);

router.post('/all/velocity/new', addRendition);
router.get('/all/velocity/:username', getRenditionsByUser);

// getAll
router.route('/all/oxygen/:id').get(getAll_oxygen);
router.route('/all/temperature/:id').get(getAll_temperature);
router.route('/all/rhythm/:username').get(getRhythmForProyecto1); // AHORA CON USERNAME EN PROYECTO 1    
// getOnlyOne
router.route('/oxygen/:id').get(getOxygen);
router.route('/temperature/:id').get(getTemperature);
router.route('/rhythm/:id').get(getRhythm);

// TODO: Distance, velocity

router.post('/mobile/fallos/:_id' , fallos);


module.exports = router;
