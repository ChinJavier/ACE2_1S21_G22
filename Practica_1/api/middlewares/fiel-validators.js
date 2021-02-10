/*
    Fields validation:
    Verifies if fields are correctly field by mapping
    the errors coming from the "validationResult" function
    form "express-validator"
*/

const { response } = require('express');
const { validationResult } = require('express-validator');

const validateFields = (req, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        })
    }
    next();
}



module.exports = {
    validateFields
}