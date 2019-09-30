const Usuario = require('../modelos/usuario.modelo');
const { AppError } = require('../handlers/error');
const express = require('express');

const router = express.Router();

// Obtém informações do usuário atual:
router.get('/account', (req, res, next) => {
	Usuario.findById(req.user.id)
		.then(result => {
			res.status(200).json(result.toJSON());
		}).catch(error => {
			next(new AppError({
				http_cod: 500,
				mensagem: error.message,
				mensagem_amigavel: 'Erro ao recuperar informações do usuário',
			}));
		});
});

// Modificar as informações do usuário atual:
router.put('/update', (req, res) => {

});

module.exports = router;