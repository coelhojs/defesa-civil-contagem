const Usuario = require('./modelos/usuario.modelo');
const Chamado = require('./modelos/chamado.modelo');

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

// Obtem usuarios (pode filtrar pela URL) com seus ids e api_keys
router.post('/usuarios', async (req, res, next) => {
	let user = new Usuario(req.body);
	user.save();
	let obj = user.toJSON();
	obj.id = user.id;
	obj.api_key = auth.gerarApiKey(user.id);
	res.status(200).json(obj);
});

// Obtem chamados (pode filtrar pela URL)
router.get('/chamados', (req, res, next) => {
	Chamado.find(req.query)
		.then(results => {
			res.status(200).json(results.map(r => r.toJSON()));
		}).catch(error => {
			next(new AppError({
				http_cod: 500,
				mensagem: error.message,
				mensagem_amigavel: 'Erro ao recuperar informações de chamados',
			}));
		});
});

module.exports = router;
