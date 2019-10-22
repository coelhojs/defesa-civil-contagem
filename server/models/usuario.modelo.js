const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const moment = require('moment');
const fs = require('fs-extra');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Usuario';

const schema = new Schema({
	google_id: { type: String },
	imagem: { type: String },
	nome: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	telefone: {
		type: String,
		required: true,
		match: /^\(([1-9][0-9])\)\s(9\d|[2-9])\d{3}\-\d{4}$/,
	},
	cpf: {
		type: String,
		required: true,
		unique: true,
		match: /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/
	},
	email: {
		type: String,
		match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	},
	nascimento: {
		type: String,
		match: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)19[0-9][0-9]$/,
	},
	endereco: {
		uf: {
			type: String,
			required: true,
			enum: [
				'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF',
				'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA',
				'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO',
				'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
			]
		},
		cep: {
			type: String,
			required: true,
			match: /^[0-9]{5}\-[0-9]{3}$/,
		},
		numero: { type: Number, required: true, min: [0, 'O número do endereço deve ser positivo'] },
		bairro: { type: String, required: true, maxlength: 25 },
		cidade: { type: String, required: true, maxlength: 30 },
		logradouro: { type: String, required: true, minlength: 3, maxlength: 50 },
		complemento: { type: String, maxlength: 20 },
	},

}, { strict: true });

schema.plugin(muv);

// Retorna apenas os atributos visíveis do modelo:
schema.methods.toJSON = function () {
	return {
		tipo: this.tipo,
		nome: this.nome,
		telefone: this.telefone,
		cpf: this.cpf,
		email: this.email,
		nascimento: this.nascimento,
		endereco: this.endereco,
		imagem: this.imagem
	}
}
schema.post('save', function (doc) {
	// Cria o diretório do usuário:
	let path = `./files/${doc._id}/.info`;
	fs.createFileSync(path);
	fs.writeFileSync(path, moment().format());
});

schema.pre('remove', function (next) {
	const Aviso = require('./aviso.modelo');
	Aviso.find({ user_id: this._id })
		.then(async avisos => {
			avisos.forEach(async c => c.remove());
		}).catch(ex => {
			next(ex);
		});
	fs.removeSync(`./files/${this._id}`);
	next();
});

module.exports = mongoose.model(NOME_MODELO, schema);