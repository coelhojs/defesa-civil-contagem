const Usuario = require('./modelos/usuario.modelo');
const auth = require('./auth/authorization');
const express = require('express');
const moment = require('moment');
const router = express.Router();

const tempoInicial = moment().format();

// Status geral do servidor 
router.get('/status', (req, res) => {
	res.status(200).json({
		'Status': 'online',
		'Versão': 'v2.0',
		'Online Desde': tempoInicial,
	});
});

// Obtem usuarios (pode filtrar pela URL) com seus ids e api_keys
router.get('/usuarios', (req, res, next) => {
	Usuario.find(req.query)
		.then(results => {
			res.status(200).json(results.map(u => {
				return {
					...u.toJSON(),
					id: u.id,
					api_key: auth.gerarApiKey(u.id),
				};
			}));
		}).catch(error => {
			next(new AppError({
				http_cod: 500,
				mensagem: error.message,
				mensagem_amigavel: 'Erro ao recuperar informações de usuários',
			}));
		});
});

module.exports = router;
