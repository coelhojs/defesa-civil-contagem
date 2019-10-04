const Chamado = require('../models/chamado.modelo');
const { AppError } = require('../models/error');
const express = require('express');
const fs = require('fs');

const router = express.Router();

// Obtem chamados (pode filtrar pela URL)
router.get('/', (req, res, next) => {
	Chamado.find(req.query)
		.populate('fotos')
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
router.get('/sync', async (req, res, next) => {
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