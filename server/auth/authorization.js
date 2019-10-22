const Usuario = require('../models/usuario.model');
const Admin = require('../models/admin.model');
const { AppError } = require('../models/error.model');
const JWT = require('jsonwebtoken');

// Senha para codificar/decodificar o id de usuários:
const SECRET = 'roundrobin1234';


function gerarApiKey(user_id) {
	return JWT.sign(user_id, SECRET);
}

// Controla todas as rotas de acesso ao app
async function app(req, res, next) {
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

// Controla todas as rotas de acesso de admin
async function admin(req, res, next) {
	try {
		// Decodifica a api_key recebida no cabeçalho e obtem o admin_id:
		let admin_id = JWT.verify(req.headers.authorization.split(' ')[1].trim(), SECRET);
		// Busca o admin cadastrado:
		let admin = await Admin.findById(admin_id);
		// Se não encontrado, retorna um erro:
		if (!admin) throw new AppError({
			http_cod: 401,
			mensagem: 'Acesso não autorizado',
			mensagem_amigavel: 'Acesso não autorizado',
		});
		// Acopla o user_id e prossegue com a requisição:
		req.admin = {
			id: admin_id,
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
	admin: admin,
	app: app,
};