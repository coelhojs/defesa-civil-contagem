const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Chamado';

const schema = new Schema({
    id: { type: string },
    cidadao: { type: Schema.Types.ObjectId, Ref: "Usuario", required: true },
    dataHora: { type: Date },
    foto: { type: String, required: true },

}, { strict: false });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);