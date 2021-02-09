const { Router } = require('express');
const { check } = require('express-validator');
const validateFields = require('../middlewares/fiel-validators');
const { logUser, createUser } = require('../controllers/auth');
const router = Router();

// Sign Up
router.post('/new', [
    check('user', 'User is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password should be at least 6 characters long').isLength({ min: 6 }),
    validateFields
], createUser);


// Log in
router.post('/', [
    check('user', 'User is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], logUser);

module.exports = {
    router,
};