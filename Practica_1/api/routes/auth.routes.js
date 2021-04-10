const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fiel-validators');
const { logUser, createUser, revalidateToken, loginMobile } = require('../controllers/auth.controller');
const { validateJWT } = require('../middlewares/jwt-valiadtion');
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

router.post('/mobile/:username/:password', loginMobile);

router.post('/renew', validateJWT, revalidateToken);


// recovery


module.exports = router;
