const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Chamado';

const schema = new Schema({
    // 

}, { strict: true });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);