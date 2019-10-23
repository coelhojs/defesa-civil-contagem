const axios = require('axios').default;
const cheerio = require('cheerio');
const { AppError } = require('../models/error');

// Obtem as ultimas noticias
exports.get_noticias = async (req, res, next) => {
    try {
        const URL = 'http://www.contagem.mg.gov.br/?og=977285&op=noticias';
        let response = await axios.get(URL);
        let $ = cheerio.load(response.data);

        $('a').each((i, el) => {
            console.log($(el).text());
        });

        res.send('ok');


    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao recuperar notícias',
        }));
    }
}
