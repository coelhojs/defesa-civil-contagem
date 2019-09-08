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

// Rotas
app.get('/', (req, res, next) => res.status(200).redirect('/index.html'));

// Entidades Fisicas:
app.use('/usuarios', require('./rotas/usuario/usuario.rotas'));
app.use('/chamados', require('./rotas/chamado/chamado.rotas'));

// Blog e informativos:
app.use('/informativos', require('./rotas/informativo/informativo.rotas'));
app.use('/noticias', require('./rotas/noticia/noticia.rotas'));

// Tratamento de rotas inválidas:
app.use((req, res, next) => res.status(404).redirect('/notfound.html'));

module.exports = app;