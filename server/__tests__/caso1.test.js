/**
 * DESCRIÇÃO:
 * Este teste simula o fluxo de uso de um cidadão a partir
 * do aplicativo (Mobile). É feito o cadastro do usuário,
 * de um aviso, a adição de uma foto ao aviso, e a visualização
 * das entidades criadas. Depois é feita a remoção dos itens criados.
 * 
 * SUMÁRIO:
 * Cadastro e login de usuário
 * 		- deve cadastrar um usuário
 * 		- deve fazer login do usuário e obter a api_key
 * 		- deve buscar o usuário no banco
 * 
 * Criação de um aviso
 * 		- deve criar um aviso
 *		- deve enviar uma foto para o último aviso criado
 * 		
 * Visualização de avisos e fotos de avisos
 * 		- deve recuperar o último aviso do usuário
 * 		- deve visualizar a foto do último aviso criado
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
var api_key, usuario, aviso, foto;

beforeAll(async done => {
	await db.init();
	await db.mongoose.connection.dropDatabase();
	fs.removeSync('./files');
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

describe('Criação de um aviso', () => {

	it('deve criar um aviso', async done => {
		let res = await request(app)
			.post('/acesso/avisos/')
			.auth(api_key, { type: 'bearer' })
			.send(Util.gerarAviso());
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('fotos');
		aviso = res.body;
		done();
	});

	it('deve enviar uma foto para o último aviso criado', async done => {
		let res = await request(app)
			.post('/acesso/avisos/' + aviso.id + '/fotos')
			.attach('foto', './__tests__/teste.jpg')
			.auth(api_key, { type: 'bearer' });
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('horario');
		foto = res.body;
		done();
	});

});

// ========================================================================

describe('Visualização de avisos e fotos de avisos', () => {

	it('deve recuperar o último aviso do usuário', async done => {
		let res = await request(app)
			.get('/acesso/avisos')
			.auth(api_key, { type: 'bearer' });
		expect(res.statusCode).toEqual(200);
		expect(res.body[0]).toHaveProperty('descricao');
		aviso = res.body[0];
		expect(aviso).toBeDefined();
		done();
	});

	it('deve visualizar a foto do último aviso criado', async done => {
		let res = await request(app)
			.get(foto.url)
			.auth(api_key, { type: 'bearer' });
		expect(res.statusCode).toEqual(200);
		expect(res.body).toBeDefined();
		done();
	});

});

// ========================================================================

describe('Exclusão de avisos e fotos de avisos', () => {

	it('deve deletar o último aviso do usuário', async done => {
		let res = await request(app)
			.delete('/acesso/avisos/' + aviso.id)
			.auth(api_key, { type: 'bearer' });
		expect(res.statusCode).toEqual(200);
		expect(res.body).toBeDefined();
		expect(fs.existsSync(`./files/${usuario.id}/${aviso.id}`)).toBeFalsy();
		done();
	});

});
