const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const moment = require('moment');
const fs = require('fs-extra');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Aviso';

const schema = new Schema({
	user_id: { type: String },
	status: ['Pendente', 'Atendido', 'Cancelado'],
	tipo: { type: String, required: true },
	dataHora: { type: Date },
	descricao: { type: String },
	coordenadas: { // Coordenada do cidadão
		latitude: { type: String, required: true },
		longitude: { type: String, required: true },
	},
	endereco: {
		rua: { type: String },
		numero: { type: String },
		bairro: { type: String }
	},
	url: { type: String },
	fotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Foto' }], // required

}, { strict: false });

schema.plugin(muv);

// Retorna apenas os atributos visíveis do modelo:
schema.methods.toJSON = function () {
	return {
		id: this.id,
		url: this.url,
		tipo: this.tipo,
		fotos: this.fotos,
		user_id: this.user_id,
		dataHora: this.dataHora,
		endereco: this.endereco,
		descricao: this.descricao,
		coordenadas: this.coordenadas,
	}
}

// Cria o diretório de fotos:
schema.pre('save', function (next) {
	let usid = this.user_id;
	let id = this._id.toString();
	fs.createFileSync(`./files/${usid}/${id}/.gitkeep`);
	this.url = '/app/avisos/' + id; // URL do aviso
	this.status = 'Pendente';
	this.dataHora = new Date();
	next();
});

// Remove o diretório de fotos:
schema.pre('remove', function (next) {
	const Foto = require('./foto.model');
	Foto.find({ aviso_id: this._id }).then(async fotos => {
		fotos.forEach(async f => await f.remove());
	});
	fs.removeSync(`./files/${this.user_id}/${this._id}`);
	next();
});

module.exports = mongoose.model(NOME_MODELO, schema);