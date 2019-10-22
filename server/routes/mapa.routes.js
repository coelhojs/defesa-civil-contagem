const controller = require('../controllers/mapa.controller');
const fileupload = require('express-fileupload');
const express = require('express');

const router = express.Router();

// Obtem o mapa
router.get('/', controller.get_mapa);

module.exports = router;