const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Usuario';

const schema = new Schema({
    id: { type: String, required: true, unique: true },
    nome: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true },
    telefone: { type: String, required: true, unique: false },
    nascimento: { type: Date, required: true, },

}, { strict: false });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);