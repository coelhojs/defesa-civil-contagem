const path = require('path');
const axios = require('axios').default;
const cheerio = require('cheerio');
const { AppError } = require('../models/error');

/* Cria o mapa geojson a partir de um arquivo kml */
exports.set_mapa = async (req, res, next) => {
    try {
        res.status(500).send('Ainda não implementado');
    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao gerar o mapa',
        }));
    }
}

/* Obtem o arquivo geojson do mapa (inteiro) */
exports.get_mapa = async (req, res, next) => {
    try {

        // Obtem o caminho do arquivo geojson
        let caminho = path.join(__dirname, `../mapa/riscos.json`);
        // Envia o arquivo
        res.status(200).sendFile(caminho);

    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao recuperar mapa',
        }));
    }
}
