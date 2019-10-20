const path = require('path');
const axios = require('axios').default;
const cheerio = require('cheerio');
const { AppError } = require('../models/error');

// Obtem o mapa
exports.get_mapa = async (req, res, next) => {
    try {
        let caminho = path.join(__dirname, `../mapa/riscos.json`);
        res.status(200).sendFile(caminho);
    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao recuperar mapa',
        }));
    }
}
