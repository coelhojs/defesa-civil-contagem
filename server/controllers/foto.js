const Foto = require('../models/foto');
const Aviso = require('../models/aviso');
const path = require('path');
const moment = require('moment');
const { AppError } = require('../models/error');

/* Obtem uma foto por id */
exports.get_foto_by_id = async (req, res, next) => {
    try {

        let id_foto = req.params.id;
        let foto = await Foto.findById(id_foto);
        if (!foto)
            throw new Error();
        let user_id = foto.user_id;
        let p = path.join(__dirname, `/../files/${user_id}/${foto.aviso_id}/${foto.filename}`);
        res.status(200).sendFile(p);

    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao recuperar foto',
        }));
    }
}

/* Buscar fotos (pode filtrar pela URL) do usuário atual */
exports.buscar_fotos_user = async (req, res, next) => {
    Foto.find({ ...req.body, user_id: req.user.id })
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            next(new AppError({
                http_cod: 500,
                mensagem: error.message,
                mensagem_amigavel: 'Erro ao recuperar fotos do usuário',
            }));
        });
}

/* Buscar fotos de um aviso (pode filtrar pela URL) */
exports.get_fotos_admin = async (req, res, next) => {
    Foto.find({ ...req.body, aviso_id: req.params.id })
        .then(result => {
            result.forEach(f => {
                f.url = f.url.replace('/app/', '/admin/');
            })
            res.status(200).json(result);
        }).catch(error => {
            next(new AppError({
                http_cod: 500,
                mensagem: error.message,
                mensagem_amigavel: 'Erro ao recuperar fotos do aviso',
            }));
        });
}

exports.salvar_foto = async (req, res, next) => {
    try {
        // Obtem o aviso correspondente:
        let aviso = await Aviso.findById(req.aviso.id);
        if (!aviso) throw new AppError({
            http_cod: 401,
            mensagem: 'Aviso Inexistente',
            mensagem_amigavel: this.mensagem,
        });
        // Cria o objeto modelo da foto:
        let filename = moment().valueOf() + '.jpg';
        let foto = new Foto({
            filename: filename,
            user_id: req.user.id,
            aviso_id: req.aviso.id,
        });
        // Salva o modelo
        foto = await foto.save();
        // Move o arquivo recebido para o diretório do aviso:
        await req.files.foto.mv(`./files/${req.user.id}/${req.aviso.id}/${filename}`);

        res.status(200).json(foto.toJSON());

    } catch (ex) {
        next(new AppError({
            http_cod: 500,
            mensagem: ex.message,
            mensagem_amigavel: 'Erro ao salvar foto do aviso',
        }));
    }
}