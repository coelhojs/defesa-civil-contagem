const { AppError } = require('./models/error.model');
const fileupload = require('express-fileupload');
const auth = require('./auth/authorization');
const bodyparser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const rotasMapa = require('./routes/mapa.routes.js');

const cors = require('cors');

const app = express();
app.use(express.static('./public'));

// Middlewares:
app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Notícias:
app.use('/noticias', require('./routes/noticias.routes'));

// Rotas de acesso de ADMIN
app.use('/admin/', require('./routes/admin.routes'));

// Login e Cadastro:
app.use('/auth/google', require('./auth/google'));

// Controle de todas as rotas de acesso do app:
app.use('/app/*', auth.app);

// Rotas de DESENVOLVIMENTO (Apenas no modo development)
if (process.env.NODE_ENV.toLowerCase() === 'development') {
	app.use('/dev', require('./dev/dev'));
	app.use('/dev/usuarios', require('./dev/usuarios.dev'));
	app.use('/dev/avisos', require('./dev/avisos.dev'));
}

// Rotas de acesso do APP:
app.use('/app/', require('./routes/usuario.routes'));
app.use('/app/avisos', require('./routes/aviso.routes'));
app.use('/app/mapa', rotasMapa);


// Tratamento de rotas inválidas:
app.use((req, res, next) => {
	next(new AppError({
		http_cod: 404,
		mensagem: 'Rota Inválida',
		mensagem_amigavel: 'Rota Inválida'
	}));
});

// Tratamento de erros:
app.use(require('./models/error.model').error_route);

module.exports = app;