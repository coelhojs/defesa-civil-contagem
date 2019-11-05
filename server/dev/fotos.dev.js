const Aviso = require('../models/avisoo');
const Foto = require('../models/fotoo');
const { AppError } = require('../models/error');
const express = require('express');
const fs = require('fs');

const router = express.Router();

// Obtem fotos (pode filtrar pela URL)
router.get('/', (req, res, next) => {

});


// CUIDADO: Remove TODAS as fotos que não possuem aviso atrelado e (opcionalmente) não possuem arquivo fisico
router.get('/sync', async (req, res, next) => {

});


module.exports = router;