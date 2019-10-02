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
	fotos: [{
		url: String,
		horario: String,
	}],

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
		fotos: this.fotos.map(f => {
			return {
				url: f.url,
				horario: moment.unix(f.horario).toString()
			}
		}),
	}
}

module.exports = mongoose.model(NOME_MODELO, schema);