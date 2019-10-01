const { AppError } = require('../handlers/error');
const express = require('express');
const path = require('path');
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

// Obtem a foto de um chamado
router.get('/foto/:id', (req, res, next) => {
	try {
		res.status(200).sendFile(path.join(__dirname, '../imagens/', req.params.id + '.jpg'));
	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao enviar foto do chamado',
		}));
	}
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


// Adiciona um chamado para o usuário atual (COM IMAGEM):
router.post('/novo', (req, res, next) => {
	let user_id = req.user.id;
	let chamado = new Chamado(req.body);
	chamado.user_id = user_id;
	chamado.save()
		.then(chamado => {
			req.files.foto.mv('./imagens/' + chamado.id + '.jpg')
				.then(foto => {
					res.status(200).json(chamado.toJSON());
				}).catch(error => {
					next(new AppError({
						http_cod: 500,
						mensagem: error.message,
						mensagem_amigavel: 'Erro ao salvar arquivo',
					}));
				});
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