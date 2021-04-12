const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fiel-validators');
const { logUser, createUser, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/jwt-valiadtion');
const { createOxygen, getAll_oxygen, getOxygen } = require('../controllers/oxygenController');
const { createTemperature, getAll_temperature, getTemperature } = require('../controllers/temperatureController');
const { createRhythm, getRhythm, getAll_rythem } = require('../controllers/rhythmController');
const { createUserTest } = require('../controllers/userController');
const { createMedition, getMeditionsByUsername } = require('../controllers/meditions');
const router = Router();

// Log in
router.post('/', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], logUser);

// Sign Up
router.post('/new', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password should be at least 6 characters long').isLength({ min: 6 }),
    validateFields
], createUser);

router.post('/meditions', [
    check('type', 'Type is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    validateFields
], createMedition);
router.get('/meditions', getMeditionsByUsername);


//router.post();




// create , temperature , oxygen , rhythm
router.route('/oxygen').post(createOxygen);
router.route('/temperature').post(createTemperature);
router.route('/rhythm').post(createRhythm);
router.route('/test').post(createUserTest);

// getAll
router.route('/all/oxygen/:id').get(getAll_oxygen);
router.route('/all/temperature/:id').get(getAll_temperature);
router.route('/all/rhythm/:id').get(getAll_rythem);
// getOnlyOne
router.route('/oxygen/:id').get(getOxygen);
router.route('/temperature/:id').get(getTemperature);
router.route('/rhythm/:id').get(getRhythm);

router.post('/renew', validateJWT, revalidateToken);


// recovery


module.exports = {
    router,
};