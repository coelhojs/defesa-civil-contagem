const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Usuario';

const schema = new Schema({
	google_id: { type: String, unique: true },
	tipo: { type: String },
	nome: { type: String },
	telefone: { type: String },
	cpf: { type: String },
	email: { type: String },
	nascimento: { type: Date },
	endereco: { type: String },

}, { strict: false });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);