const bodyparser = require('body-parser');
const request = require('request');
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


// Rotas

// Verificação de sessão:
app.use((req, res, next) => {
    let token = req.body.token;
    request.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`, (err, res, body) => {
        if (err) {
            res.json(err);
        } else {
            req.user = {
                id: req.user_id,
            };
            next();
        }
    });
});

// Entidades Fisicas:
app.use('/usuarios', require('./rotas/usuario.rotas'));
app.use('/chamados', require('./rotas/chamado.rotas'));

// Blog e informativos:
app.use('/informativos', require('./rotas/informativo.rotas'));
app.use('/noticias', require('./rotas/noticia.rotas'));

// Tratamento de rotas inválidas:
app.use((req, res, next) => res.status(404).send('Rota Inválida'));

module.exports = app;