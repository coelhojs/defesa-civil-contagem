const express = require('express');
const router = express.Router();
const request = require('request');

const Sessao = require('../modelos/sessions.modelo');
const Usuario = require('../modelos/usuario.modelo');

// Obtém informações do usuário atual:
router.get('/account', (req, res) => {
    Sessao.findOne({ user_id: req.user.id })
        .then(result => {
            Usuario.findOne({ user_id: req.user.id })
                .then(result => res.status(200).json(result))
                .catch(err => res.status(500).json(err));
        }).catch(err => {
            res.status(500).json(err);
        });
});

// Cadastro de novo usuário:
router.post('/cadastro', (req, res) => {
    let usuario = new Usuario({
        user_id: req.user.id,
        tipo: req.user.tipo,
        nome: req.user.nome,
        telefone: req.user.telefone,
        cpf: req.user.cpf,
        email: req.user.email,
        nascimento: req.user.nascimento,
        endereco: req.user.endereco,
    });
    usuario.save().then(result => {
        res.json(res);
    });
});

// Login:
router.post('/login', (req, res) => {
    let s = new Sessao({
        user_id: req.user.id,
    });
    s.save().then(result => {
        res.json(res);
    });
});

// Modificar as informações do usuário atual:
router.put('/update', (req, res) => {

});

module.exports = router;