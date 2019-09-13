const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Usuario';

const schema = new Schema({
    cpf: { type: String, unique: true },
    nome: { type: String, required: true, unique: true },
    telefone: { type: String, unique: false },
    nascimento: { type: Date },

    token: { type: Schema.Types.ObjectId, required: true, unique: true }

}, { strict: false });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);