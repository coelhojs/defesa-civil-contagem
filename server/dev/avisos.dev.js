const Aviso = require('../models/aviso.modelo');
const { AppError } = require('../models/error');
const express = require('express');
const fs = require('fs');

const router = express.Router();

// Obtem avisos (pode filtrar pela URL)
router.get('/', (req, res, next) => {
	Aviso.find(req.query)
		.populate('fotos')
		.then(results => {
			res.status(200).json(results.map(r => r.toJSON()));
		}).catch(error => {
			next(new AppError({
				http_cod: 500,
				mensagem: error.message,
				mensagem_amigavel: 'Erro ao recuperar informações de avisos',
			}));
		});
});


// CUIDADO: Remove TODOS os avisos que não possuem usuário atrelado e (opcionalmente) que não possuem files
router.get('/sync', async (req, res, next) => {
	try {
		let avisos = await Aviso.find({});
		for (let i = 0; i < avisos.length; i++) {
			let c = avisos[i];
			let user = await Usuario.findById(c.user_id);
			if (!user || (req.query.nodir && !(fs.existsSync(`./files/${user.id}/${c.id}`)))) {
				c.remove();
			}
		}
		res.status(200).send('ok');
	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao sincronizar avisos'
		}));
	}
});


module.exports = router;