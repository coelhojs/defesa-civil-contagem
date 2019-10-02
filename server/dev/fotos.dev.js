const Chamado = require('../modelos/chamado.modelo');
const Foto = require('../modelos/foto.modelo');
const { AppError } = require('../handlers/error');
const express = require('express');
const fs = require('fs');

const router = express.Router();

// Obtem fotos (pode filtrar pela URL)
router.get('/', (req, res, next) => {

});


// CUIDADO: Remove TODAS as fotos que não possuem chamado atrelado e (opcionalmente) não possuem arquivo fisico
router.get('/sync', async (req, res, next) => {

});


module.exports = router;