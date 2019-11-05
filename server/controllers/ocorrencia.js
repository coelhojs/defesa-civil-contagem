const Ocorrencia = require('../models/ocorrencia');

const { AppError } = require('../models/error');
const fs = require('fs-extra');


/* Obtem uma ocorrencia pelo seu ID */
exports.get_ocorrencia_by_id = async (req, res, next) => {
    try {

        let ocorrencia = await Ocorrencia.findById(req.params.id)
            .populate({
                path: 'aviso',
                populate: [
                    {
                        path: 'fotos',
                        model: 'Foto'
                    },
                    {
                        path: 'user_id',
                        model: 'Usuario'
                    }
                ]
            });

        res.status(200).json(ocorrencia);

    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao recuperar ocorrencias'
        }));
    }
}


/* Obtem uma ou mais ocorrencias (podendo filtrar pela URL) */
exports.get_ocorrencias = async (req, res, next) => {
    try {

        let ocorrencias = await Ocorrencia.find(req.query).populate({
            path: 'aviso',
            populate: [
                {
                    path: 'fotos',
                    model: 'Foto'
                },
                {
                    path: 'user_id',
                    model: 'Usuario'
                }
            ]
        });
        res.status(200).json(ocorrencias.map(o => o.toJSON()));

    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao recuperar ocorrencias'
        }));
    }
}

/* Adiciona uma ocorrencia para um aviso */
exports.add_ocorrencia = async (req, res, next) => {
    try {

        let ocorrencia = await new Ocorrencia(req.body).save();
        res.status(200).json(ocorrencia);

    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao adicionar ocorrencia'
        }));
    }
}

/* Atualiza uma ocorrencia */
exports.update_ocorrencia = async (req, res, next) => {
    try {

        let nova = await Ocorrencia.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(nova);

    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao atualizar aviso'
        }));
    }
}
