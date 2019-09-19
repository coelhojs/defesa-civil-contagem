const { OAuth2Client } = require('google-auth-library');
const TokenGenerator = require('uuid-token-generator');
const Usuario = require('./modelos/usuario.modelo');
const express = require('express');

const router = express.Router();

// Nosso Client_id do projeto:
//const CLIENT_ID = '651305936833-2o57lou1jo7bmpb9fnt8oemigibg6dgp.apps.googleusercontent.com'; 

// Client_id para testes:
const CLIENT_ID = '407408718192.apps.googleusercontent.com'; // Client_id apenas para testes

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
            res.status(200).json({ api_token: api_token });
        }
    } catch (ex) {
        res.status(500).send('Erro: ' + ex);
    }
});

// Cadastro
router.post('/cadastro', async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let user_id = await getSubject(token);
        if (await Usuario.findOne({ user_id: user_id })) {
            // Usuário já existe
            res.status(500).send('O usuário já está cadastrado');
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
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const sub = payload['sub'];
    return sub;
}

// Exportações
module.exports = {
    rotas: router,
    getUserId: getUserId,
    getApiToken: getApiToken,
    set: set,
};