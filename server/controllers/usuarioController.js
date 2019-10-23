const Usuario = require('../models/usuario.model');
const { AppError } = require('../models/error');


/* 
 * Sumário:
 * 
 * add_usuario:.......................Cria um usuário
 * edit_usuario:......................Edita informações do usuário atual
 * get_usuario:.......................Obtem o usuário atual
 * delete_usuario:....................Deleta o usuário atual (exclusão de conta)
 * get_usuarios:......................Obtem todos os usuários
 * 
 */

/* Cria um usuário */
exports.add_usuario = async (req, res, next) => {

	// Cria e salva o usuario a partir do corpo da requisição:
	let novoUsuario = new Usuario(req.body);
	await novoUsuario.save();
	// Envia a resposta:
	res.status(200).json(novoUsuario);

}

/* Edita informações do usuário atual */
exports.edit_usuario = async (req, res, next) => {

	// Obtem o usuario antigo (e atualiza para o novo):
	let antigo = await Usuario.findByIdAndUpdate(req.user.id, req.body);
	// Obtem o usuario novo (com o id):
	let novo = await Usuario.findById(req.user.id);
	// Envia a resposta:
	res.status(200).json({
		antigo: antigo,
		novo: novo
	});

}

/* Obtem o usuário atual */
exports.get_usuario = async (req, res, next) => {

	let user = await Usuario.findOne({ _id: req.user.id });
	res.status(200).json(user);

}

/* Deleta o usuário atual (exclusão de conta) */
exports.delete_usuario = async (req, res, next) => {

	// Obtem o usuario atual:
	let user = await Usuario.findOne({ _id: req.user.id });
	// Remove o usuario:
	user = await user.remove();
	// Retorna a resposta:
	res.status(200).json(user);

}

/* Obtem todos os usuários */
exports.get_usuarios = async (req, res, next) => {

	let users = await Usuario.find({});
	res.status(200).json(users);

}