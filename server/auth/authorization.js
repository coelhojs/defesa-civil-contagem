const Usuario = require('../models/usuario.modelo');
const { AppError } = require('../models/error');
const JWT = require('jsonwebtoken');

// Senha para codificar/decodificar o id de usuários:
const SECRET = 'roundrobin1234';

function gerarApiKey(user_id) {
	return JWT.sign(user_id, SECRET);
}

// Controla todas as rotas de acesso
async function acesso(req, res, next) {
	try {
		// Decodifica a api_key recebida no cabeçalho e obtem o user_id:
		let user_id = JWT.verify(req.headers.authorization.split(' ')[1].trim(), SECRET);
		// Procura um usuário com o user_id correspondente:
		let user = await Usuario.findById(user_id);
		// Se não encontrado, retorna um erro:
		if (!user) throw new AppError({
			http_cod: 401,
			mensagem: 'Usuário não identificado',
			mensagem_amigavel: 'Acesso não autorizado',
		});
		// Acopla o user_id e prossegue com a requisição:
		req.user = {
			id: user_id,
		}
		next();

	} catch (ex) {
		if (ex instanceof AppError) next(ex);
		else {
			next(new AppError({
				http_cod: 401,
				mensagem: ex.message,
				mensagem_amigavel: 'Acesso não autorizado',
			}));
		}
	}
}

module.exports = {
	gerarApiKey: gerarApiKey,
	acesso: acesso,
};