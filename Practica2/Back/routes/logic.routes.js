const { Router } = require('express');
const {saveMedition} = require('./../controllers/Usertest');

const router = Router();



router.post('/saveMedition',saveMedition);




module.exports = router;