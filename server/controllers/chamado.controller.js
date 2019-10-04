const Chamado = require('../models/chamado.modelo');
const Foto = require('../models/foto.modelo');

const { AppError } = require('../models/error');
const fs = require('fs-extra');

exports.criar_chamado = async (req, res, next) => {
	try {
		// Obtem o id do usuário atual:
		let user_id = req.user.id;
		// Cria novo chamado:
		let chamado = new Chamado(req.body);
		// Atrela o ID do usuário ao chamado:
		chamado.user_id = user_id;
		// Salva o chamado
		await chamado.save();
		console.log(chamado);
		res.status(200).json(chamado);

	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: ''
		}));
	}
}

// Pesquisar chamado(s) do usuário atual:
exports.obter_chamados = async (req, res, next) => {
	try {
		// Restringe os chamados para os do usuário atual:
		req.query.user_id = req.user.id;
		let chamados = await Chamado.find(req.query).populate('fotos');
		chamados = chamados.map(c => c.toJSON());
		res.status(200).json(chamados);

	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao recuperar informações do chamado'
		}));
	}
}

exports.deletar_chamados = async (req, res, next) => {
	try {
		req.params.user_id = req.user.id;
		let chamados = await Chamado.find(req.params);
		chamados.forEach(c => {
			await c.remove();
		});
		res.status(200).json(chamados);

	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: ''
		}));
	}
}

exports.modificar_chamados = async (req, res, next) => {
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