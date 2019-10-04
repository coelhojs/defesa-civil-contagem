/**
 * DESCRIÇÃO:
 * Este teste simula o fluxo de uso de um cidadão a partir
 * do aplicativo (Mobile). É feito o cadastro do usuário,
 * de um chamado, a adição de uma foto ao chamado, e a visualização
 * das entidades criadas. Depois é feita a remoção dos itens criados.
 * 
 * SUMÁRIO:
 * Cadastro e login de usuário
 * 		- deve cadastrar um usuário
 * 		- deve fazer login do usuário e obter a api_key
 * 		- deve buscar o usuário no banco
 * 
 * Criação de um chamado
 * 		- deve criar um chamado
 *		- deve enviar uma foto para o último chamado criado
 * 		
 * Visualização de chamados e fotos de chamados
 * 		- deve recuperar o último chamado do usuário
 * 		- deve visualizar a foto do último chamado criado
 * 
 */

require('dotenv').config({ path: '.env' });

// Configurações de ambiente:
process.env.NODE_ENV = 'development';
process.env.DB_HOST = 'Local';


const app = require('../app');
const fs = require('fs-extra');
const db = require('../database');
const server = require('../server');
const request = require('supertest');

const Util = require('../dev/util');

// Objetos dos modelos
var api_key, usuario, chamado, foto;

beforeAll(async done => {
	await db.init();
	await db.mongoose.connection.dropDatabase();
	fs.removeSync('./imagens');
	server.listen(process.env.PORTA || 3001, done);
});

afterAll(async done => {
	await server.close();
	await db.mongoose.disconnect();
	done();
});


describe('Cadastro e login de usuário', () => {

	it('deve cadastrar um usuário', async done => {
		let user = Util.gerarUsuario('Cidadão');
		let res = await request(app)
			.post('/dev/usuarios')
			.send(user);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('api_key');
		api_key = res.body.api_key;
		done();
	});

	it('deve fazer login do usuário e obter a api_key', async done => {
		done();
	});

	it('deve buscar o usuário no banco', async done => {
		let res = await request(app)
			.get('/acesso/usuarios/account')
			.auth(api_key, { type: 'bearer' });
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('nome');
		usuario = res.body;
		done();
	});

});

// ========================================================================

describe('Criação de um chamado', () => {

	it('deve criar um chamado', async done => {
		let res = await request(app)
			.post('/acesso/chamados/')
			.auth(api_key, { type: 'bearer' })
			.send(Util.gerarChamado());
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('fotos');
		chamado = res.body;
		done();
	});

	it('deve enviar uma foto para o último chamado criado', async done => {
		let res = await request(app)
			.post('/acesso/chamados/' + chamado.id + '/fotos')
			.attach('foto', './__tests__/teste.jpg')
			.auth(api_key, { type: 'bearer' });
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('horario');
		foto = res.body;
		done();
	});

});

// ========================================================================

describe('Visualização de chamados e fotos de chamados', () => {

	it('deve recuperar o último chamado do usuário', async done => {
		let res = await request(app)
			.get('/acesso/chamados')
			.auth(api_key, { type: 'bearer' });
		expect(res.statusCode).toEqual(200);
		expect(res.body[0]).toHaveProperty('descricao');
		chamado = res.body[0];
		expect(chamado).toBeDefined();
		done();
	});

	it('deve visualizar a foto do último chamado criado', async done => {
		let res = await request(app)
			.get(foto.url)
			.auth(api_key, { type: 'bearer' });
		expect(res.statusCode).toEqual(200);
		expect(res.body).toBeDefined();
		done();
	});

});

// ========================================================================

describe('Exclusão de chamados e fotos de chamados', () => {

	it('deve deletar o último chamado do usuário', async done => {
		let res = await request(app)
			.delete('/acesso/chamados/' + chamado.id)
			.auth(api_key, { type: 'bearer' });
		expect(res.statusCode).toEqual(200);
		expect(res.body).toBeDefined();
		expect(fs.existsSync(`./imagens/${usuario.id}/${chamado.id}`)).toBeFalsy();
		done();
	});

});
