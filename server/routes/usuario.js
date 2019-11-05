const controller = require('../controllers/usuario');
const router = require('express').Router();

// Obtém informações do usuário atual:
router.get('/account', controller.get_usuario);

// Modificar as informações do usuário atual:
router.put('/edit', controller.edit_usuario);

// Deletar o usuário atual (e os seus avisos/fotos):
router.delete('/delete', controller.delete_usuario);

module.exports = router;