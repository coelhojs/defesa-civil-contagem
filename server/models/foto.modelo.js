const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const moment = require('moment');
const fs = require('fs-extra');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Foto';

const schema = new Schema({
	filename: { type: String },
	url: { type: String },
	horario: { type: String },
	user_id: { type: String },
	aviso_id: { type: String },

}, { strict: false });

schema.plugin(muv);

// Retorna apenas os atributos visíveis do modelo:
schema.methods.toJSON = function () {
	return {
		id: this.id,
		filename: this.filename,
		url: this.url,
		horario: moment().unix(this.horario),
		aviso_id: this.aviso_id,
	}
}

schema.pre('save', function (next) {
	const Aviso = require('./aviso.modelo');
	this.horario = moment().valueOf();
	this.url = `/acesso/avisos/${this.aviso_id}/fotos/${this.id}`;
	Aviso.findById(this.aviso_id)
		.then(aviso => {
			aviso.fotos.push(this.id);
			aviso.save().then(result => { next() });
		}).catch(erro => {
			next(erro);
		});
});

schema.pre('remove', function (next) {
	fs.removeSync(`./files/${this.user_id}/${this.aviso_id}/${this.filename}`);
	next();
});

module.exports = mongoose.model(NOME_MODELO, schema);
