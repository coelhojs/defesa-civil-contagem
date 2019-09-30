require('dotenv').config({ path: '.env' });
const http = require('http');
const app = require('./app');
const db = require('./database');

const PORTA = process.env.PORT || 3001;

console.log('[%s] Estabelecendo conexão com o banco de dados...', (new Date).toLocaleString());
db.init(() => {
    console.log('[%s] Conexão com o banco de dados estabelecida. [%s]', (new Date).toLocaleString(), db.isLocal() ? 'LOCAL' : 'REMOTO');
    http.createServer(app).listen(PORTA, () => {
        console.log(`[%s] Servidor escutando na porta ${PORTA}...`, (new Date).toLocaleString());
    });
});