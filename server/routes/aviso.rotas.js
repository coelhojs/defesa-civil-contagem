const express = require('express');
const router = express.Router();

const controller = require('../controllers/aviso.controller');

// Rota de fotos de avisos
router.use('/:id/*', (req, res, next) => {
	req.aviso = { id: req.params.id }
	next()
});
router.use('/:id/fotos', require('./foto.rotas'));

// Pesquisar aviso(s) do usuário atual:
router.get('/', controller.obter_avisos);

// Adiciona um aviso para o usuário atual (sem a foto):
router.post('/', controller.criar_aviso);

// Deleta aviso(s) do usuário atual:
router.delete('/', controller.deletar_avisos);

// Modifica um aviso do usuário atual:
router.put('/', controller.modificar_avisos);

module.exports = router;