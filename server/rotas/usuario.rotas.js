const express = require('express');
const router = express.Router();

const Usuario = require('../modelos/usuario.modelo');

// Obtém informações do usuário atual:
router.get('/get', (req, res) => {
    Usuario.findById(req.userId)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err));
});

// Cadastro de novo usuário:
router.post('/cadastro', (req, res) => {

});

// Login:
router.post('/login', (req, res) => {

});

// Modificar as informações do usuário atual:
router.put('/update', (req, res) => {

});

module.exports = router;