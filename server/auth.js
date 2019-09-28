const { OAuth2Client } = require('google-auth-library');
const TokenGenerator = require('uuid-token-generator');
const Usuario = require('./modelos/usuario.modelo');
const express = require('express');
const request = require('request');

const router = express.Router();

// Client_id para testes:
const CLIENT_ID = [
	'651305936833-sov6dac5o5v1d3a91mgb0u6t9o3fkduv.apps.googleusercontent.com', // WEB
	'651305936833-qpt762o2f5669pu9v2de2229jhpc5l05.apps.googleusercontent.com' // ANDROID
]


const client = new OAuth2Client(CLIENT_ID);

// Controle de sessões:
var sessoes = {
	// user_id: api_token
};

// Obtem o ID de usuário a partir de um api_token
function getUserId(api_token) {
	let user_id = undefined;
	for (let user_id_prop in sessoes) {
		if (sessoes[user_id_prop] === api_token) {
			user_id = user_id_prop;
			break;
		}
	}
	return user_id;
}

// Obtem o api_token atual de um usuário pelo seu user_id
function getApiToken(user_id) {
	return sessoes[user_id];
}

// Seta uma sessão:
function set(userid, apitoken) {
	sessoes[userid] = apitoken;
}

// Login
router.post('/login', async (req, res) => {
	try {
		let token = req.headers.authorization.split(' ')[1];
		let user_id = await getSubject(token);
		let user_db = await Usuario.findOne({ user_id: user_id });
		if (!user_db) {
			// Usuário não existe
			res.status(500).send('Usuário não cadastrado');
		} else {
			let api_token = gerarToken();
			set(user_id, api_token);
			res.status(200).json(new Resposta(true, 'Usuário logado com sucesso', api_token));
		}
	} catch (ex) {
		res.status(500).json(new Resposta(false, 'Erro ao fazer login', ex));
	}
});

// Cadastro
router.post('/cadastro', async (req, res) => {
	try {
		let token = req.headers.authorization.split(' ')[1];
		let user_id = await getSubject(token);
		if (await Usuario.findOne({ user_id: user_id })) {
			// Usuário já existe
			res.status(500).json('O usuário já está cadastrado');
		} else {
			let req_user = req.body;
			req_user.user_id = user_id;
			let user_db = new Usuario(req_user);
			user_db.save().then(result => {
				let api_token = gerarToken();
				set(user_id, api_token);
				res.status(200).json({ api_token: api_token });
			}).catch(err => res.status(500).send('Erro: ' + err));
		}
	} catch (ex) {
		res.status(500).send('Erro: ' + ex);
	}
});

// Gera um token de acesso à API:
function gerarToken() {
	let tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
	let token = tokgen.generate();
	return token;
}

// Decodifica o token do Google e retorna o campo 'sub' (subject)
async function getSubject(token) {
	return new Promise((resolve, reject) => {
		const ticket = client.verifyIdToken({
			idToken: token,
			audience: CLIENT_ID,
		}).then(result => {
			const payload = result.getPayload();
			const sub = payload['sub'];
			return resolve(sub);
		}).catch(err => {
			requestSubject(token).then(resolve).catch(reject);
		});
	});
}

async function requestSubject(token) {
	const URL = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
	return new Promise((resolve, reject) => {
		request.get(URL, (err, res, body) => {
			if (err) return reject(err);
			let bodyObj = JSON.parse(body);
			if (bodyObj.sub)
				return resolve(bodyObj.sub);
			else if (bodyObj.error_description)
				return reject(bodyObj.error_description);
			else
				return reject('Token inválido');
		});
	});
}

// Exportações
module.exports = {
	rotas: router,
	getUserId: getUserId,
	getApiToken: getApiToken,
	set: set,
};