const Usuario = require('../models/usuario');
const Aviso = require('../models/aviso');

const auth = require('../auth/authorization');
const ps = require('child_process');
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
	await Aviso.find({}).remove();
	res.status(200).send('ok');
});

// Mostra o log
router.get('/log/8jahg8j3n8af9jf7hasfn93j8fan39gjkhnksjdf98h3fa', async (req, res, next) => {
	res.setHeader('Content-Type', 'text/plain');
	ps.exec('journalctl -u defesa-civil-contagem -n50', (err, stdout, stderr) => {
		if (err) res.status(500).json(err);
		else res.status(200).send(stdout.toString());
	})
});

module.exports = router;
