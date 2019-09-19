const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Noticia';

const schema = new Schema({
    titulo: { type: String },
    dataHora: { type: Date },
    foto: { type: String, required: true },

}, { strict: false });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);