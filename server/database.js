const mongoose = require('mongoose');

// Usar com o MongoDB Atlas
// const URI = process.env.MONGODB_URI;
// const URI = process.env.MONGODB_URI_LOCAL;

// Usar com o MongoDB Local
const STRING = 'mongodb://localhost/defesacivil';

module.exports = {
    init: function (callback) {
        mongoose.connection.once('open', callback);
        mongoose.connect(URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    },
    isLocal: function () {
        return URI.indexOf('localhost') != -1;
    }
};