const { Router } = require('express');
const {saveMedition ,realtime , getRelatime} = require('./../controllers/Usertest');

const router = Router();



router.post('/saveMedition',saveMedition);
router.post('/mobile/:aire/:letra', realtime); //  /logic/mobile/<valor>
router.get('/getRelatime',getRelatime);




module.exports = router;