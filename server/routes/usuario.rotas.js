const controller = require('../controllers/usuario.controller');
const router = require('express').Router();

// Obtém informações do usuário atual:
router.get('/account', controller.get_account_info);

// Modificar as informações do usuário atual:
router.put('/edit', controller.modificar_usuario);

// Remover o usuário atual:
router.delete('/remove', controller.remover_usuario);

module.exports = router;