const { AppError } = require('../handlers/error');
const express = require('express');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

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
router.get('/foto/:id/:arquivo', (req, res, next) => {
	try {
		let id = req.params.id;
		let user_dir = path.join(__dirname, `../imagens/${req.user.id}`);
		let files_dir = `${user_dir}/${req.params.id}`;
		res.status(200).sendFile(`${files_dir}/${req.params.arquivo}.jpg`);
	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao enviar foto do chamado',
		}));
	}
});

// Recebe a foto de um chamado
router.post('/foto/:id', async (req, res, next) => {
	try {
		let id = req.params.id;
		let chamado = await Chamado.findById(id);
		if (!chamado) throw new AppError({
			http_cod: 401,
			mensagem: 'Chamado Inexistente',
			mensagem_amigavel: this.mensagem,
		});
		let user_dir = path.join(__dirname, `../imagens/${req.user.id}`);
		let files_dir = `${user_dir}/${req.params.id}`;
		if (!fs.existsSync(user_dir)) { fs.mkdirSync(user_dir); }
		if (!fs.existsSync(files_dir)) { fs.mkdirSync(files_dir); }
		//let filename = fs.readdirSync(files_dir).length;
		let filename = moment().valueOf();
		await req.files.foto.mv(`${files_dir}/${filename}.jpg`);
		let url = `/acesso/chamados/foto/${id}/${filename}`;
		chamado.fotos.push({
			url: url,
			horario: filename,
		});
		chamado.save();
		res.status(200).json({
			url: url,
			horario: filename,
		});
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