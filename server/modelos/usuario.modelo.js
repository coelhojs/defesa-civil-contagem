const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Usuario';

const schema = new Schema({
    nome: { type: String, required: true, unique: true },
    cpf: { type: String, unique: true },
    telefone: { type: String, unique: false },
    nascimento: { type: Date },
    alergias: { type: Boolean },
    sexo: { type: String },
    token: { type: Schema.Types.ObjectId, required: true }

}, { strict: true });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);