const Usuario = require('../modelos/usuario.modelo');
const Chamado = require('../modelos/chamado.modelo');

const auth = require('../auth/authorization');
const express = require('express');
const moment = require('moment');
const fs = require('fs');

const router = express.Router();

const tempoInicial = moment().format();

// Status geral do servidor 
router.get('/status', (req, res) => {
	res.status(200).json({
		'Status': 'online',
		'Versão': 'v3.0',
		'Online Desde': tempoInicial,
	});
});

// CUIDADO: Apaga TUDO do banco
router.get('/wipeAll', async (req, res, next) => {
	await Usuario.find({}).remove();
	await Chamado.find({}).remove();
	res.status(200).send('ok');
});

module.exports = router;
