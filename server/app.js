const { AppError } = require('./models/error');
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

app.use('/auth/google', require('./auth/google'));

// Notícias:
app.use('/noticias', require('./routes/noticias'));

// Rotas do painel de ADMIN
app.use('/admin/', require('./routes/admin'));

// Rotas do APP
app.use('/app/', require('./routes/app'));

// Rotas de DESENVOLVIMENTO (Apenas no modo dev)
if (process.env.NODE_ENV.toLowerCase() === 'dev') {
	app.use('/dev', require('./dev/dev'));
	app.use('/dev/usuarios', require('./dev/usuarios.dev'));
	app.use('/dev/avisos', require('./dev/avisos.dev'));
}

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
