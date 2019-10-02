const Usuario = require('../modelos/usuario.modelo');
const { AppError } = require('../handlers/error');
const auth = require('../auth/authorization');
const express = require('express');

const router = express.Router();

// Obtem usuarios (pode filtrar pela URL) com seus ids e api_keys
router.get('/', (req, res, next) => {
    Usuario.find(req.query)
        .then(results => {
            res.status(200).json(results.map(u => {
                return {
                    ...u.toJSON(),
                    id: u.id,
                    api_key: auth.gerarApiKey(u.id),
                };
            }));
        }).catch(error => {
            next(new AppError({
                http_cod: 500,
                mensagem: error.message,
                mensagem_amigavel: 'Erro ao recuperar informações de usuários',
            }));
        });
});

// Cadastra um novo usuário
router.post('/', async (req, res, next) => {
    try {
        let user = new Usuario(req.body);
        user.save();
        let obj = user.toJSON();
        obj.id = user.id;
        obj.api_key = auth.gerarApiKey(user.id);
        res.status(200).json(obj);
    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao cadastrar usuário',
        }));
    }
});


module.exports = router;