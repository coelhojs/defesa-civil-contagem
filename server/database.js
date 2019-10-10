const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
    init: function (uri) {
        let mongoUri;
        if (uri) {
            mongoUri = uri;
        } else {
            mongoUri = (process.env.DB_HOST.toLowerCase() == 'local')
                ? process.env.MONGODB_URI_LOCAL
                : process.env.MONGODB_URI_REMOTO;
        }
        return new Promise((resolve, reject) => {
            mongoose.connect(mongoUri, {
                useCreateIndex: true,
                useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
            }).then(resolve).catch(reject);
        });
    },
    mongoose: mongoose,
};