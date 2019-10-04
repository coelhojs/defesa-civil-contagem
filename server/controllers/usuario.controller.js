const Usuario = require('../models/usuario.modelo');
const { AppError } = require('../models/error');

// Cria um novo usuário:
exports.criar_usuario = async (req, res, next) => {
	let user = req.body;
	let novoUsuario = new Usuario(user);
	await novoUsuario.save();
	res.status(200).json(novoUsuario);
}

// Modificar as informações do usuário atual:
exports.modificar_usuario = async (req, res, next) => {
	let novoUsuario = await Usuario.find({ _id: req.user.id }).update(req.body);
	res.status(200).json(novoUsuario);
}

// Remover o usuário atual:
exports.remover_usuario = async (req, res, next) => {
	let user = await Usuario.findOne({ _id: req.user.id });
	await user.remove();
	res.status(200).json(user);
}

// Obtém informações do usuário atual:
exports.get_account_info = async (req, res, next) => {
	let user = await Usuario.findOne({ _id: req.user.id });
	await user.remove();
	res.status(200).json(user);
}

module.exports = router;