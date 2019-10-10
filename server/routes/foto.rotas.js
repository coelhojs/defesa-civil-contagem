const controller = require('../controllers/foto.controller');
const fileupload = require('express-fileupload');
const express = require('express');

const router = express.Router();


// Buscar fotos (pode filtrar pela URL) do usuário atual
router.get('/', controller.buscar_fotos);

// Obtem a foto de um aviso a partir do nome do arquivo
router.get('/:arquivo', controller.obter_foto);

// Envia a foto de um aviso
router.post('/', fileupload({
    createParentPath: true,
    // debug: process.env.NODE_ENV.toLowerCase() == 'development',
}), controller.salvar_foto);


module.exports = router;