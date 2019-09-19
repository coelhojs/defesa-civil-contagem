const express = require('express');
const router = express.Router();

const Chamado = require('../modelos/chamado.modelo');

// Pesquisar chamado(s) do usuário atual:
router.get('/', (req, res) => {
    req.query.user_id = req.user.user_id;
    Chamado.find(req.query)
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json(error);
        });
});

// Adiciona um chamado para o usuário atual:
router.post('/', (req, res) => {
    let user_id = req.user.user_id;
    let chamado = new Chamado(req.body);
    chamado.user_id = user_id;
    chamado.save()
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json(error);
        });
});

// Deleta chamado(s) do usuário atual:
router.delete('/', (req, res) => {
    let user_id = req.user.user_id;
    Chamado.findOneAndRemove(req.body)
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json(error);
        });
});

// Modifica um chamado do usuário atual:
router.put('/', (req, res) => {

});


module.exports = router;