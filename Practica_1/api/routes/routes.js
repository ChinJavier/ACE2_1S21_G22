const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fiel-validators');
const { logUser, createUser, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/jwt-valiadtion');
const {createOxygen , getAll_oxygen , getOxygen} = require('../controllers/oxygenController');
const {createTemperature , getAll_temperature, getTemperature} = require('../controllers/temperatureController');
const {createRhythm , getRhythm , getAll_rythem} = require('../controllers/rhythmController');
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


router.post('/renew', validateJWT, revalidateToken);



// create , temperature , oxygen , rhythm
router.route('/oxygen').post(createOxygen).get(getAll_oxygen);
router.route('/temperature').post(createTemperature).get(getAll_temperature);
router.route('/rhythm').post(createRhythm).get(getAll_rythem);

// getOnlyOne
router.route('/oxygen/:id').get(getOxygen);
router.route('/temperature/:id').get(getTemperature);
router.route('/rhythm/:id').get(getRhythm);

module.exports = {
    router,
};