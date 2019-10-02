const { OAuth2Client } = require('google-auth-library');
const { AppError } = require('../handlers/error');
const Usuario = require('../modelos/usuario.modelo');
const auth = require('./authorization');
const express = require('express');
const axios = require('axios').default;

const CLIENT_IDs = [process.env.CLIENT_ID_WEB, /**process.env.CLIENT_ID_APP */];

const client = new OAuth2Client(CLIENT_IDs);

const router = express.Router();

async function verificar_nivel1(token) {
	try {
		console.log('Verificando token [Nivel 1]');
		const ticket = await client.verifyIdToken({ idToken: token, audience: CLIENT_IDs, });
		const payload = ticket.getPayload();
		const userid = payload['sub'];
		return userid;
	} catch (ex) {
		return await verificar_nivel2(token);
	}
}

async function verificar_nivel2(token) {
	try {
		console.log('Verificando token [Nivel 2]');
		let res = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
		return res.data.sub;
	} catch (ex) {
		throw new AppError({
			http_cod: 401,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao verificar id_token',
		});
	}
}

// Login
router.post('/login', async (req, res, next) => {
	try {
		// Obtem o sub (google_id) a partir do cabeçalho:
		let sub = await verificar_nivel1(req.headers.authorization.split(' ')[1].trim());
		// Procura um usuário com o google_id correspondente:
		let user = await Usuario.findOne({ google_id: sub });
		// Se não encontrar, lança um erro:
		if (!user) throw new AppError({
			http_cod: 500,
			mensagem: 'Usuário não cadastrado',
			mensagem_amigavel: 'Impossível fazer o login',
		});
		// Gera e retorna uma api_key com o id do usuário:
		let api_key = auth.gerarApiKey(user.id);
		res.status(200).json({ api_key: api_key, usuario: user });

	} catch (ex) {
		if (ex instanceof AppError) next(ex);
		else next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao realizar o login',
		}));
	}
});

// Cadastro
router.post('/cadastro', async (req, res, next) => {
	try {
		// Obtem o sub (google_id) a partir do cabeçalho:
		let sub = await verificar_nivel1(req.headers.authorization.split(' ')[1].trim());
		// Procura um usuário com o google_id correspondente:
		let user = await Usuario.findOne({ google_id: sub });
		// Se encontrar, lança um erro:
		if (user) throw new AppError({
			http_cod: 500,
			mensagem: 'Usuário já cadastrado',
			mensagem_amigavel: 'Impossível fazer o cadastro',
		});
		// Cria um novo usuário:
		user = new Usuario(req.body);
		// Salva o google_id no usuario:
		user.google_id = sub;
		await user.save();
		// Gera e retorna uma api_key com o id do usuário:
		let api_key = auth.gerarApiKey(user.id);
		res.status(200).json({ api_key: api_key });

	} catch (ex) {
		if (ex instanceof AppError) next(ex);
		else next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao realizar o cadastro',
		}));
	}
});

module.exports = router;