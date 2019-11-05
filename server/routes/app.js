const express = require('express');
const router = express.Router();

const controller = require('../controllers/aviso');


router.use('/*', require('../auth/authorization').app);

router.use('/', require('./usuario'));
router.use('/avisos', require('./aviso'));


module.exports = router;