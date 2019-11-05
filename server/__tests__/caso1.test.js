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
 * Modificação dos dados do usuário:
 * 		- deve mudar o telefone do usuario
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

const HOST = 'http://localhost:' + process.env.PORTA;

const faker = require('faker');
const fs = require('fs-extra');
const db = require('../database');
const server = require('../server');
const FormData = require('form-data');
const axios = require('axios').default;
const randexp = require('randexp').randexp;

faker.locale = 'pt_BR';

function gerarUsuario() {
	let fname = faker.name.firstName(), lname = faker.name.lastName();
	return {
		"nome": "Joao Luis",
		"telefone": "(11)96184-6158",
		"cpf": "114.415.446-40",
		"email": "Joao.luis@gmail.com",
		"endereco": {
			"cep": "30310-081",
			"logradouro": "Rua ABV",
			"bairro": "Atletico",
			"cidade": "SP",
			"uf": "MG",
			"numero": 123,
			"complemento": "22"
		},
		"imagem": "https://lh6.googleusercontent.com/-U08MbMJTU54/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3re0eyK28qshJDDHS8Ozxf0nmzFucw/s96-c/photo.jpg",
		"id": "5db35bd4dfb0ae04ed0db2b1",
		"api_key": "eyJhbGciOiJIUzI1NiJ9.NWRiMzViZDRkZmIwYWUwNGVkMGRiMmIx.3dubC_w9qL-myE5AbW-saW1fphpMIiv1hEIkXlxxVSY"
	}
}

function gerarAviso() {
	return {
		"tipo": "Desabamento",
		"descricao": "Desabamento grave",
		"coordenadas": { // Coordenada do cidadão
			"latitude": faker.address.latitude(),
			"longitude": faker.address.longitude(),
		},
		"endereco": {
			"rua": "R. do amendoim",
			"numero": "351",
			"bairro": "America"
		},
	}
}

// Objetos dos modelos
var usuario, aviso, fotos = [];
var reqConfig; // Configuração da request (com o header e authorization)

beforeAll(async done => {
	await db.init();
	//await db.mongoose.connection.dropDatabase();
	//fs.removeSync('./files');
	server.listen(process.env.PORTA, done);
});

afterAll(async done => {
	await server.close();
	await db.mongoose.disconnect();
	//fs.removeSync('./files');
	done();
});

// Via rota /dev
describe('Cadastro e login de usuário [DEV]', () => {

	it('deve cadastrar um usuário e obter a api_key', async done => {
		let user = gerarUsuario();
		axios.post(HOST + '/dev/usuarios', user)
			.then(res => {
				expect(res.status).toBe(200);
				// Atributos required:
				expect(res.data).toBeDefined();
				expect(res.data).toHaveProperty('nome');
				expect(res.data).toHaveProperty('telefone');
				expect(res.data).toHaveProperty('cpf');
				expect(res.data).toHaveProperty('endereco');
				expect(res.data).toHaveProperty('api_key');
				usuario = res.data;
				reqConfig = { headers: { authorization: 'Bearer ' + usuario.api_key } };
				done();
			}).catch(error => {
				console.log(error);
				done(error);
			});
	});

	it('deve buscar o usuário no banco', async done => {
		let res = await axios.get(HOST + '/app/account', reqConfig);
		expect(res.status).toBe(200);
		// Atributos required:
		expect(res.data).toBeDefined();
		expect(res.data).toHaveProperty('nome');
		expect(res.data).toHaveProperty('telefone');
		expect(res.data).toHaveProperty('cpf');
		expect(res.data).toHaveProperty('endereco');
		done();
	});

});

// ========================================================================

describe('Criação de um aviso', () => {

	it('deve criar um aviso', async done => {
		let av = gerarAviso();
		let res = await axios.post(HOST + '/app/avisos', av, reqConfig);
		expect(res.status).toBe(200);
		expect(res.data).toBeDefined();
		expect(res.data).toHaveProperty('tipo');
		expect(res.data).toHaveProperty('coordenadas');
		expect(res.data).toHaveProperty('url');
		aviso = res.data;
		console.log(aviso);
		done();
	});

	

});

describe('Modificação dos dados do usuario', () => {

	it('deve mudar o telefone do usuario', (done) => {
		done();
	});

});

// ========================================================================

describe('Visualização de avisos e fotos de avisos', () => {

	it('deve recuperar o último aviso do usuário', async done => {
		let res = await axios.get(HOST + aviso.url, reqConfig);
		expect(res.status).toBe(200);
		// Atributos required:
		expect(res.data).toBeDefined();
		expect(res.data).toHaveProperty('tipo');
		expect(res.data).toHaveProperty('coordenadas');
		expect(res.data).toHaveProperty('url');
		done();
	});


});

// ========================================================================

describe('Exclusão de usuário', () => {

	it('deve deletar o usuário, seus avisos e as fotos', async done => {
		let res = await axios.delete(HOST + '/app/delete', reqConfig);
		expect(res.data).toBeDefined();
		expect(fs.pathExistsSync('./files/' + usuario.id)).toBeFalsy();
		done();
	});

});
