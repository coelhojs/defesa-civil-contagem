const express = require('express');
const router = express.Router();

const controller = require('../controllers/noticias');

// Obter ultimas noticias
router.get('/', controller.get_noticias);

module.exports = router;