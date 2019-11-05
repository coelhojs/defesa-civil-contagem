const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Ocorrencia';

const schema = new Schema({
	"ID_Ocorrencia": { type: String }, // ex: 0001/19
	"aviso": { type: mongoose.Schema.Types.ObjectId, ref: 'Aviso' },
	"status": {
		type: String,
		enum: ['Em Aberto', 'Em Análise', 'Vistoriado', 'Monitorado', 'Concluido'],
		default: 'Em Aberto',
	},
	"discriminacao": Number,
	"dataVistoria": Date,
	"pessoasEnvolvidas": [{ type: Number }],
	"equipeDeVistoria": [{ type: String }],
	"ROSAnteriores": [{ type: Number }],
	"numOficio": Number,
	"destinoOficio": { type: String },
	"doacao": { type: String },
	"vitimaParcial": Number,
	"vitimaFatal": Number,
	"interdicao": Boolean,
	"dataMonitoramento": Boolean,
	"solucaoAtual": String,
	"retornoVistoria": String,
	"url": String,

}, { strict: false });

schema.plugin(muv);

schema.pre('save', function (next) {
	this.url = '/admin/ocorrencias/' + this._id; // URL da ocorrencia
	this.status = 'Em Aberto';
	next();
});

module.exports = mongoose.model(NOME_MODELO, schema);

