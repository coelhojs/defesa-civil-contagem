const Chamado = require('./chamado.modelo');
const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Foto';

const schema = new Schema({
	filename: String,
	url: String,
	horario: String,
	user_id: { type: String },

}, { strict: false });

schema.plugin(muv);

// Retorna apenas os atributos visíveis do modelo:
schema.methods.toJSON = function () {
	return {
		filename: this.filename,
		url: this.url,
		horario: moment().unix(this.horario),
	}
}

module.exports = mongoose.model(NOME_MODELO, schema);
