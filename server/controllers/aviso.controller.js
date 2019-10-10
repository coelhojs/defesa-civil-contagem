const Aviso = require('../models/aviso.modelo');
const Foto = require('../models/foto.modelo');

const { AppError } = require('../models/error');
const fs = require('fs-extra');

exports.criar_aviso = async (req, res, next) => {
	try {
		// Obtem o id do usuário atual:
		let user_id = req.user.id;
		// Cria novo aviso:
		let aviso = new Aviso(req.body);
		// Atrela o ID do usuário ao aviso:
		aviso.user_id = user_id;
		// Salva o aviso
		await aviso.save();
		res.status(200).json(aviso);

	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao criar aviso'
		}));
	}
}

// Pesquisar aviso(s) do usuário atual:
exports.obter_avisos = async (req, res, next) => {
	try {
		// Restringe os avisos para os do usuário atual:
		req.query.user_id = req.user.id;
		let avisos = await Aviso.find(req.query).populate('fotos');
		avisos = avisos.map(c => c.toJSON());
		res.status(200).json(avisos);

	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao recuperar informações do aviso'
		}));
	}
}

// Pesquisar aviso do usuário atual:
exports.obter_aviso = async (req, res, next) => {
	try {
		let id = req.params.id;
		let aviso = await Aviso.findById(id).populate('fotos');
		res.status(200).json(aviso);

	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao recuperar informações do aviso'
		}));
	}
}

exports.deletar_avisos = async (req, res, next) => {
	try {
		req.params.user_id = req.user.id;
		let avisos = await Aviso.find(req.params);
		avisos.forEach(async c => {
			await c.remove();
		});
		res.status(200).json(avisos);

	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: ''
		}));
	}
}

exports.modificar_avisos = async (req, res, next) => {
	try {
		res.status(500).send('Not yet implemented');
	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: ''
		}));
	}
}