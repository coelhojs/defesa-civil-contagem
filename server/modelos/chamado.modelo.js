const Foto = require('./foto.modelo');
const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const moment = require('moment');
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

schema.pre('remove', function (next) {
	console.log('removendo chamado');
	Foto.deleteMany({ chamado: this._id }, next);
});

module.exports = mongoose.model(NOME_MODELO, schema);