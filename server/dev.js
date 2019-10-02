const Usuario = require('./modelos/usuario.modelo');
const Chamado = require('./modelos/chamado.modelo');

const auth = require('./auth/authorization');
const express = require('express');
const moment = require('moment');
const fs = require('fs');

const router = express.Router();

const tempoInicial = moment().format();

// Status geral do servidor 
router.get('/status', (req, res) => {
	res.status(200).json({
		'Status': 'online',
		'Versão': 'v2.1',
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

// Cadastra um novo usuário
router.post('/usuarios', async (req, res, next) => {
	try {
		let user = new Usuario(req.body);
		user.save();
		let obj = user.toJSON();
		obj.id = user.id;
		obj.api_key = auth.gerarApiKey(user.id);
		res.status(200).json(obj);
	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao cadastrar usuário',
		}));
	}
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


// CUIDADO: Remove TODOS os chamados que não possuem usuário atrelado e (opcionalmente) que não possuem imagens
router.get('/chamados/sync', async (req, res, next) => {
	try {
		let chamados = await Chamado.find({});
		for (let i = 0; i < chamados.length; i++) {
			let c = chamados[i];
			let user = await Usuario.findById(c.user_id);
			if (!user || (req.query.nodir && !(fs.existsSync(`./imagens/${user.id}/${c.id}`)))) {
				c.remove();
			}
		}
		res.status(200).send('ok');
	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao sincronizar chamados'
		}));
	}
});

module.exports = router;
