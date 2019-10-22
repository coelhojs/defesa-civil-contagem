const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'RO';

const schema = new Schema({
	ID_RO: { type: String }, // ex: 0001/19
	status: ['Em Aberto', 'Pendente', 'Vistoriado', 'Monitorado', 'Concluido'],
	aviso: { type: mongoose.Schema.Types.ObjectId, ref: 'Aviso' },
	discriminacao: Number,
	dataVistoria: Date,
	pessoasEnvolvidas: [{ type: Number }],
	equipeDeVistoria: [{ type: String }],
	ROSAnteriores: [{ type: Number }],
	numOficio: Number,
	destinoOficio: { type: String },
	doacao: { type: String },
	vitimaParcial: Number,
	vitimaFatal: Number,
	interdicao: Boolean,
	dataMonitoramento: Boolean,
	solucaoAtual: String,
	retornoVistoria: String,

}, { strict: false });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);

