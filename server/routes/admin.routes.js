const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const mapaController = require('../controllers/mapa.controller');
const avisoController = require('../controllers/aviso.controller');
const roController = require('../controllers/mapa.controller');

/* Obter Avisos */
router.get('/avisos', avisoController.obter_todos_os_avisos);

/* Mapa */
router.get('/mapa', mapaController.get_mapa);

/* ROs */
// router.get('/ro', roController.get_ro);
// router.post('/ro', roController.adicionar_ro);
// router.put('/ro', roController.modificar_ro);
// router.delete('/ro', roController.remover_ro);

module.exports = router;