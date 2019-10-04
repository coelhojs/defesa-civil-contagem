const Foto = require('../models/foto.modelo');
const { AppError } = require('../models/error');
const fileupload = require('express-fileupload');
const express = require('express');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const Chamado = require('../models/chamado.modelo');

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

// Obtem a foto de um chamado
router.get('/:arquivo', (req, res, next) => {
	try {
		// Diretório do usuário:
		let user_dir = path.join(__dirname, `../imagens/${req.user.id}`);
		// Diretório do chamado:
		let files_dir = `${user_dir}/${req.chamado.id}`;
		// Caminho do arquivo de imagem:
		let img = `${files_dir}/${req.params.arquivo}.jpg`;
		res.status(200).sendFile(img);
	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao enviar foto do chamado',
		}));
	}
});

// Recebe a foto de um chamado
router.post('/', fileupload({
	createParentPath: true,
	// debug: process.env.NODE_ENV.toLowerCase() == 'development',
}), async (req, res, next) => {
	try {
		// Obtem o chamado correspondente:
		let chamado = await Chamado.findById(req.chamado.id);
		if (!chamado) throw new AppError({
			http_cod: 401,
			mensagem: 'Chamado Inexistente',
			mensagem_amigavel: this.mensagem,
		});
		// Diretorio do usuario e do chamado:
		let user_dir = path.join(__dirname, `../imagens/${req.user.id}`);
		let files_dir = `${user_dir}/${req.chamado.id}`;
		// Cria o objeto modelo da foto:
		let horario = moment().valueOf();
		let filename = horario;
		let fileExt = 'jpg';
		let url = `${req.baseUrl}/${filename}`;
		let foto = new Foto({ horario: horario, filename: `${filename}.${fileExt}`, url: url, user_id: req.user.id });
		// Move o arquivo recebido para o diretório do chamado:
		await req.files.foto.mv(`${files_dir}/${filename}.${fileExt}`);
		// Salva o modelo e adiciona foto ao chamado:
		foto.save().then(resultfoto => {
			chamado.fotos.push(resultfoto);
			chamado.save().then(resultchamado => {
				res.status(200).json(resultfoto.toJSON());
			}).catch(errochamado => {
				// Erro ao atualizar chamado
				next(new AppError({
					http_cod: 500,
					mensagem: errochamado.message,
					mensagem_amigavel: 'Erro ao atualizar chamado',
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
			mensagem_amigavel: 'Erro ao salvar foto do chamado',
		}));
	}
});


module.exports = router;