const { AppError } = require('./models/error');
const fileupload = require('express-fileupload');
const auth = require('./auth/authorization');
const bodyparser = require('body-parser');
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
app.use('/auth/google', require('./auth/google'));

// Controle de todas as rotas de acesso:
app.use('/acesso/*', auth.acesso);

// Rotas de DESENVOLVIMENTO (Apenas no modo development)
if (process.env.NODE_ENV.toLowerCase() === 'development') {
	app.use('/dev', require('./dev/dev'));
	app.use('/dev/usuarios', require('./dev/usuarios.dev'));
	app.use('/dev/avisos', require('./dev/avisos.dev'));
}

// Rotas de acesso:
app.use('/acesso/', require('./routes/usuario.rotas'));
app.use('/acesso/avisos', require('./routes/aviso.rotas'));

// Tratamento de rotas inválidas:
app.use((req, res, next) => {
	next(new AppError({
		http_cod: 404,
		mensagem: 'Rota Inválida',
		mensagem_amigavel: 'Rota Inválida'
	}));
});

// Tratamento de erros:
app.use(require('./models/error').error_route);

module.exports = app;