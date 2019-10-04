require('dotenv').config({ path: '.env' });
process.env.NODE_ENV = 'development';
process.env.DB_HOST = 'Local';

const db = require('../database');
const app = require('../app');
const request = require('supertest');
const server = require('../server');

const Usuario = require('../modelos/usuario.modelo');

describe('Setup inicial', () => {

    beforeAll(async (done) => {
        await db.init();
        await db.mongoose.connection.dropDatabase();
        server.listen(process.env.PORTA || 3001, done);
    });

    it('deve adicionar um usuário ao banco', async (done) => {

        let res = await request(app)
            .post('/dev/usuarios')
            .send({
                nome: 'Lucas',
                email: 'lucas.laborne@gmail.com',
            });
        expect(res.statusCode).toEqual(200);

        done();

    });

    afterAll((done) => {
        mongoose.connection.close(done);
        server.close(done);
    });

});