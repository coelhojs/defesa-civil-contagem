const Foto = require('./foto.modelo');
const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const moment = require('moment');
const fs = require('fs-extra');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Chamado';

const schema = new Schema({
	user_id: { type: String },
	tipo: { type: String, required: true },
	dataHora: { type: Date },
	descricao: { type: String, required: true },
	vistoriador: { type: String },
	cidadao: { type: String },
	local: { type: String },
	url: { type: String },
	fotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Foto' }],

}, { strict: false });

schema.plugin(muv);

// Retorna apenas os atributos visíveis do modelo:
schema.methods.toJSON = function () {
	return {
		id: this.id,
		tipo: this.tipo,
		dataHora: this.dataHora,
		descricao: this.descricao,
		foto: this.foto,
		vistoriador: this.vistoriador,
		cidadao: this.cidadao,
		local: this.local,
		url: this.url,
		fotos: this.fotos,
	}
}

// Cria o diretório de fotos:
schema.post('save', function (next) {
	fs.mkdirpSync(`./imagens/${this.user_id}/${this._id}`);
	this.url = '/acesso/chamados/' + this._id;
	next();
});

// Remove o diretório de fotos:
schema.pre('remove', function (next) {
	Foto.find({ chamado_id: this._id }).then(async fotos => {
		fotos.forEach(async f => await f.remove());
	});
	fs.removeSync(`./imagens/${this.user_id}/${this._id}`);
	next();
});

module.exports = mongoose.model(NOME_MODELO, schema);