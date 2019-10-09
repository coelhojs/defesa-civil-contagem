const Aviso = require('./aviso.modelo');
const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs-extra');

const NOME_MODELO = 'Usuario';

const schema = new Schema({
	google_id: { type: String },
	tipo: { type: String },
	nome: { type: String },
	telefone: { type: String },
	cpf: { type: String },
	email: { type: String },
	nascimento: { type: Date },
	endereco: {
		uf: { type: String, required: true },
		cep: { type: String, required: true },
		numero: { type: Number, required: true },
		bairro: { type: String, required: true },
		cidade: { type: String, required: true },
		logradouro: { type: String, required: true },
		complemento: { type: String },
	},

}, { strict: false });

schema.plugin(muv);

// Retorna apenas os atributos visíveis do modelo:
schema.methods.toJSON = function () {
	return {
		cpf: this.cpf,
		tipo: this.tipo,
		nome: this.nome,
		email: this.email,
		endereco: this.endereco,
		telefone: this.telefone,
		nascimento: this.nascimento,
	}
}

schema.pre('save', function (next) {
	fs.createFileSync(`./files/${this._id}/.gitkeep`);
	next();
});

schema.pre('remove', function (next) {
	Aviso.find({ user_id: this._id })
		.then(async avisos => {
			avisos.forEach(async c => c.remove());
		});
	fs.removeSync(`./files/${this._id}`);
	next();
});

module.exports = mongoose.model(NOME_MODELO, schema);