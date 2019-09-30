const { OAuth2Client } = require('google-auth-library');
const { AppError } = require('../handlers/error');
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
		let sub = req.headers.sub || await verificar_nivel1(req.headers.authorization.split(' ')[1]);
		let user = undefined; // await Usuario.findOne({ user_id: sub });
		if (!user) throw new Error('Usuário não cadastrado');

		res.status(200).send(sub);


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
		/**
		 * Obter ID_Token
		 * Obter sub
		 * Criar usuário
		 * Salvar usuário
		 * Salvar sub no request
		 * Fazer login
		 */

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