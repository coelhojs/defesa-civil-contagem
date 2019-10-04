require('dotenv').config({ path: '.env' });

const server = require('./server');
const moment = require('moment');
const db = require('./database');

const PORTA = process.env.PORTA || 3001;

function now() {
    return moment().format();
}

console.log('[%s] Estabelecendo conexão com o banco de dados...', now());
db.init().then(() => {
    console.log('[%s] Conexão com o banco de dados estabelecida. [%s]', now(), process.env.DB_HOST);
    server.listen(PORTA, () => { console.log(`[%s] Servidor escutando na porta ${PORTA}...`, now()); });

}).catch(error => {
    console.log('[%s] Houve um erro ao iniciar o banco de dados. [%s]', now(), error);
});