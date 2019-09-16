const bodyparser = require('body-parser');
const sessoes = require('./sessoes');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.static('./public'));

// Middlewares:
app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Login e Cadastro:
app.use('/api', require('./rotas/api.rotas'));

// Controle de todas as rotas de acesso:
app.use('/acesso/*', (req, res, next) => {
    let api_token = req.headers.authorization.split(' ')[1];
    let user_id = sessoes.getUserId(api_token);
    if (!user_id) {
        res.status(500).send('Usuário não logado');
    } else {
        req.user = { user_id: user_id };
        next();
    }
});

// Entidades Fisicas:
app.use('/acesso/usuarios', require('./rotas/usuario.rotas'));
app.use('/acesso/chamados', require('./rotas/chamado.rotas'));

// Blog e informativos:
app.use('/acesso/informativos', require('./rotas/informativo.rotas'));
app.use('/acesso/noticias', require('./rotas/noticia.rotas'));

// Tratamento de rotas inválidas:
app.use((req, res, next) => res.status(404).send('Rota Inválida'));

module.exports = app;