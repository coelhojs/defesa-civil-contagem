const Foto = require('../models/foto.modelo');
const { AppError } = require('../models/error');
const fileupload = require('express-fileupload');
const express = require('express');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const Aviso = require('../models/aviso.modelo');

// Buscar fotos (pode filtrar pela URL) do usuário atual
router.get('/', (req, res, next) => {
	Foto.find({ ...req.body, user_id: req.user.id })
		.then(result => {
			res.status(200).json(result);
		}).catch(error => {
			next(new AppError({
				http_cod: 500,
				mensagem: error.message,
				mensagem_amigavel: 'Erro ao recuperar fotos do usuário',
			}));
		});
});

// Obtem a foto de um aviso
router.get('/:arquivo', (req, res, next) => {
	try {
		// Diretório do usuário:
		let user_dir = path.join(__dirname, `../files/${req.user.id}`);
		// Diretório do aviso:
		let files_dir = `${user_dir}/${req.aviso.id}`;
		// Caminho do arquivo de imagem:
		let img = `${files_dir}/${req.params.arquivo}.jpg`;
		res.status(200).sendFile(img);
	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao enviar foto do aviso',
		}));
	}
});

// Recebe a foto de um aviso
router.post('/', fileupload({
	createParentPath: true,
	// debug: process.env.NODE_ENV.toLowerCase() == 'development',
}), async (req, res, next) => {
	try {
		// Obtem o aviso correspondente:
		let aviso = await Aviso.findById(req.aviso.id);
		if (!aviso) throw new AppError({
			http_cod: 401,
			mensagem: 'Aviso Inexistente',
			mensagem_amigavel: this.mensagem,
		});
		// Diretorio do usuario e do aviso:
		let user_dir = path.join(__dirname, `../files/${req.user.id}`);
		let files_dir = `${user_dir}/${req.aviso.id}`;
		// Cria o objeto modelo da foto:
		let horario = moment().valueOf();
		let filename = horario;
		let fileExt = 'jpg';
		let url = `${req.baseUrl}/${filename}`;
		let foto = new Foto({ horario: horario, filename: `${filename}.${fileExt}`, url: url, user_id: req.user.id });
		// Move o arquivo recebido para o diretório do aviso:
		await req.files.foto.mv(`${files_dir}/${filename}.${fileExt}`);
		// Salva o modelo e adiciona foto ao aviso:
		foto.save().then(resultfoto => {
			aviso.fotos.push(resultfoto);
			aviso.save().then(resultaviso => {
				res.status(200).json(resultfoto.toJSON());
			}).catch(erroaviso => {
				// Erro ao atualizar aviso
				next(new AppError({
					http_cod: 500,
					mensagem: erroaviso.message,
					mensagem_amigavel: 'Erro ao atualizar aviso',
				}));
			});
		}).catch(errofoto => {
			// Erro ao armazenar foto
			next(new AppError({
				http_cod: 500,
				mensagem: errofoto.message,
				mensagem_amigavel: 'Erro ao armazenar foto',
			}));
		});

	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao salvar foto do aviso',
		}));
	}
});


module.exports = router;