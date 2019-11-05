const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const mapaController = require('../controllers/mapa');
const avisoController = require('../controllers/aviso');
const fotoController = require('../controllers/foto');
const ocorrController = require('../controllers/ocorrencia');

/* Obter Avisos */
router.get('/avisos', avisoController.get_avisos);

/* Foto */
router.get('/avisos/:id/fotos', fotoController.get_fotos_admin);
router.get('/avisos/:id/fotos/:id', fotoController.get_foto_by_id);

/* Mapa */
router.get('/mapa', mapaController.get_mapa);

/* Ocorrencias */
router.route('/ocorrencias')
    .get(ocorrController.get_ocorrencias)
    .post(ocorrController.add_ocorrencia);

router.route('/ocorrencias/:id')
    .get(ocorrController.get_ocorrencia_by_id)
    .put(ocorrController.update_ocorrencia);

module.exports = router;