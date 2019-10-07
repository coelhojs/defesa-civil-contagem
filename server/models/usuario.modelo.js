const Chamado = require('./chamado.modelo');
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
	endereco: { type: String },

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
	Chamado.find({ user_id: this._id })
		.then(async chamados => {
			chamados.forEach(async c => c.remove());
		});
	fs.removeSync(`./files/${this._id}`);
	next();
});

module.exports = mongoose.model(NOME_MODELO, schema);