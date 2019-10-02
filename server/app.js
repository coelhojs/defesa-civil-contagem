const { AppError } = require('./handlers/error');
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
app.use(fileupload({
	createParentPath: true,
	debug: process.env.NODE_ENV.toLowerCase() == 'development',
}));
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
	app.use('/dev/chamados', require('./dev/chamados.dev'));
}

// Rotas de acesso:
app.use('/acesso/usuarios', require('./rotas/usuario.rotas'));
app.use('/acesso/chamados', require('./rotas/chamado.rotas'));
app.use('/acesso/chamados/foto', require('./rotas/foto.rotas'));
app.use('/acesso/noticias', require('./rotas/noticia.rotas'));
app.use('/acesso/informativos', require('./rotas/informativo.rotas'));

// Tratamento de rotas inválidas:
app.use((req, res, next) => {
	next(new AppError({
		http_cod: 404,
		mensagem: 'Rota Inválida',
		mensagem_amigavel: 'Rota Inválida'
	}));
});

// Tratamento de erros:
app.use(require('./handlers/error').error_route);

module.exports = app;