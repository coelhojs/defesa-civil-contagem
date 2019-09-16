const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Chamado';

const schema = new Schema({
    tipo: { type: String },
    dataHora: { type: Date },
    descricao: { type: String },
    foto: { type: String },
    vistoriador: { type: String },
    cidadao: { type: String },
    local: { type: String },

}, { strict: false });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);