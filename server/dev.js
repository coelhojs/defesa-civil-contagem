const express = require('express');
const moment = require('moment');
const router = express.Router();

const tempoInicial = moment().format();

router.get('/status', (req, res) => {
	res.status(200).json({
		'Status': 'online',
		'Versão': 'v2.0',
		'Online Desde': tempoInicial,
	});
});

module.exports = router;
