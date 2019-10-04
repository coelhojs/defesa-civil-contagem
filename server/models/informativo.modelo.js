const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Informativo';

const schema = new Schema({
    dataHora: { type: Date },
    cabecalho: { type: String },
    corpo: { type: String },
    foto: { type: String, required: true },

}, { strict: false });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);