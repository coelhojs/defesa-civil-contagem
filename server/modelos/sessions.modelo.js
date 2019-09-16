const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Sessao';

const schema = new Schema({
    user_id: { type: String },

}, { strict: false });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);