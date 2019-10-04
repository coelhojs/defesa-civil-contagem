const express = require('express');
const router = express.Router();

const controller = require('../controllers/chamado.controller');

// Rota de fotos de chamados
router.use('/:id/*', (req, res, next) => {
	req.chamado = { id: req.params.id }
	next()
});
router.use('/:id/fotos', require('./foto.rotas'));

// Pesquisar chamado(s) do usuário atual:
router.get('/', controller.obter_chamados);

// Adiciona um chamado para o usuário atual (sem a foto):
router.post('/', controller.criar_chamado);

// Deleta chamado(s) do usuário atual:
router.delete('/', controller.deletar_chamados);

// Modifica um chamado do usuário atual:
router.put('/', controller.modificar_chamados);

module.exports = router;