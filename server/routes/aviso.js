const express = require('express');
const router = express.Router();

const controller = require('../controllers/aviso');

// Rota de fotos de avisos
router.use('/:id/*', (req, res, next) => {
	req.aviso = { id: req.params.id }
	next()
});
router.use('/:id/fotos', require('./foto'));

// Pesquisar aviso(s) do usuário atual:
router.get('/:id', controller.get_aviso_by_id);

// Pesquisar aviso(s) do usuário atual:
router.get('/', controller.get_avisos_user);

// Adiciona um aviso para o usuário atual (sem a foto):
router.post('/', controller.add_aviso_user);

// Deleta aviso(s) do usuário atual:
router.delete('/', controller.delete_aviso_user);

module.exports = router;