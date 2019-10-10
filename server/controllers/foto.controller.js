const Foto = require('../models/foto.modelo');
const { AppError } = require('../models/error');
const moment = require('moment');
const path = require('path');

const Aviso = require('../models/aviso.modelo');

// Buscar fotos (pode filtrar pela URL) do usuário atual
exports.buscar_fotos = async (req, res, next) => {
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

// Obtem a foto de um aviso
exports.obter_foto = async (req, res, next) => {
	try {
		// Diretório do usuário:
		let user_dir = path.join(__dirname, `../files/${req.user.id}`);
		// Diretório do aviso:
		let files_dir = `${user_dir}/${req.aviso.id}`;
		// Caminho do arquivo de imagem:
		let img = `${files_dir}/${req.params.arquivo}.jpg`;
		res.status(200).sendFile(img);
	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Erro ao enviar foto do aviso',
		}));
	}
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
