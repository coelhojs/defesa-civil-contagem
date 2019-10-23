const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const mapaController = require('../controllers/mapa');
const avisoController = require('../controllers/aviso');
const roController = require('../controllers/mapa');

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