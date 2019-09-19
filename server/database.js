const mongoose = require('mongoose');

// Usar com o MongoDB Atlas
const USUARIO = 'round';
const SENHA = 'robin9090';
const STRING = `mongodb+srv://${USUARIO}:${SENHA}@cluster0-u2o3w.mongodb.net/defesa-civil?retryWrites=true&w=majority`;

// Usar com o MongoDB Local
// const STRING = 'mongodb://localhost/defesacivil';

module.exports = {
    init: function (callback) {
        mongoose.connection.once('open', callback);
        mongoose.connect(STRING, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    },
    isLocal: function () {
        return STRING.indexOf('localhost') != -1;
    }
};