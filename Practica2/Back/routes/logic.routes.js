const { Router } = require('express');
const {saveMedition ,realtime , getRelatime, getAllTest} = require('./../controllers/Usertest');

const router = Router();



router.post('/saveMedition',saveMedition);
router.post('/mobile/:aire/:letra', realtime); //  /logic/mobile/<valor>
router.get('/getRelatime',getRelatime);
router.get('/getAllTest/:username',getAllTest);




module.exports = router;