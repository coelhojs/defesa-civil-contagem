const controller = require('../controllers/foto');
const fileupload = require('express-fileupload');
const express = require('express');

const router = express.Router();


// Buscar fotos (pode filtrar pela URL) do usuário atual
router.get('/', controller.buscar_fotos_user);

// Obtem a foto de um aviso a partir do nome do arquivo
router.get('/:id', controller.get_foto_by_id);

// Envia a foto de um aviso
router.post('/', fileupload({
    createParentPath: true,
    // debug: process.env.NODE_ENV.toLowerCase() == 'dev',
}), controller.salvar_foto);


module.exports = router;