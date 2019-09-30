const { AppError } = require('../handlers/error');
const express = require('express');
const router = express.Router();

const Chamado = require('../modelos/chamado.modelo');

// Pesquisar chamado(s) do usuário atual:
router.get('/', (req, res, next) => {
	req.query.user_id = req.user.id;
	Chamado.find(req.query)
		.then(result => {
			res.status(200).json(result.map(e => e.toJSON()));
		}).catch(error => {
			next(new AppError({
				http_cod: 500,
				mensagem: error.message,
				mensagem_amigavel: 'Erro ao recuperar informações do chamado'
			}));
		});
});

// Adiciona um chamado para o usuário atual:
router.post('/', (req, res, next) => {
	let user_id = req.user.id;
	let chamado = new Chamado(req.body);
	chamado.user_id = user_id;
	chamado.save()
		.then(result => {
			res.status(200).json(result.toJSON());
		}).catch(error => {
			next(new AppError({
				http_cod: 500,
				mensagem: error.message,
				mensagem_amigavel: 'Erro ao salvar novo chamado'
			}));
		});
});


// Deleta chamado(s) do usuário atual:
router.delete('/', (req, res, next) => {
	let user_id = req.user.id;
	Chamado.findOneAndRemove(req.body)
		.then(result => {
			res.status(200).json(result.toJSON());
		}).catch(error => {
			next(new AppError({
				http_cod: 500,
				mensagem: error.message,
				mensagem_amigavel: 'Erro ao apagar o chamado'
			}));
		});
});

// Modifica um chamado do usuário atual:
router.put('/', (req, res, next) => {

});


module.exports = router;