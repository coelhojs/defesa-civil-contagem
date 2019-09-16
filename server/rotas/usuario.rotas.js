const Usuario = require('../modelos/usuario.modelo');
const express = require('express');
const request = require('request');

const router = express.Router();

// Obtém informações do usuário atual:
router.get('/account', (req, res) => {
    Usuario.findOne({ user_id: req.user.user_id })
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json(error);
        });
});

// Modificar as informações do usuário atual:
router.put('/update', (req, res) => {

});

module.exports = router;