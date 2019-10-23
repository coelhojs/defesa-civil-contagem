const Aviso = require('../models/aviso');

const { AppError } = require('../models/error');
const fs = require('fs-extra');

/* Obtem avisos do usuário atual (podendo filtrar pela URL) */
exports.get_avisos_user = async (req, res, next) => {
    try {

        // Restringe os avisos para os do usuário atual:
        req.query.user_id = req.user.id;
        // Popula os avisos com as fotos:
        let avisos = await Aviso.find(req.query).populate('fotos');
        // Retorna os avisos:
        res.status(200).json(avisos.map(c => c.toJSON()));

    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao recuperar avisos do usuário'
        }));
    }
}

/* Adiciona um aviso para o usuario atual */
exports.add_aviso_user = async (req, res, next) => {
    try {

        // Obtem o id do usuário atual:
        let user_id = req.user.id;
        // Cria novo aviso:
        let aviso = new Aviso(req.body);
        // Atrela o ID do usuário ao aviso:
        aviso.user_id = user_id;
        // Salva e retorna o aviso:
        aviso = await aviso.save();
        res.status(200).json(aviso);

    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao adicionar aviso'
        }));
    }
}

/* Deleta um aviso (especificado pelo id, na URL) */
exports.delete_aviso_user = async (req, res, next) => {
    try {

        // Obtem o id do usuario:
        let user_id = req.user.id;
        // Obtem o id do aviso a ser deletado:
        let aviso_id = req.query.id;
        // Obtem o aviso (se existir) e compara o user_id
        let aviso = await Aviso.findById(aviso_id);
        if (!aviso || aviso.user_id != user_id)
            throw new Error;
        // Remove o aviso e retorna a resposta
        aviso = await aviso.remove();
        res.status(200).json(aviso);

    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao deletar aviso'
        }));
    }
}

/* Obtem avisos de todos os usuários (podendo filtrar pela URL) */
exports.get_avisos = async (req, res, next) => {
    try {

        // Obtem todos os avisos
        let avisos = await Aviso.find(req.params).populate();
        // Envia a resposta
        res.status(200).json(avisos.map(e => e.toJSON()));

    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao recuperar avisos'
        }));
    }
}

