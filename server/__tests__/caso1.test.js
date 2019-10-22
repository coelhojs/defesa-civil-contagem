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
		"nome": faker.name.findName(),
		"telefone": randexp(/^\(([1-9][0-9])\)\s(9\d|[2-9])\d{3}\-\d{4}$/),
		"cpf": randexp(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/),
		"email": faker.internet.email(fname, lname),
		"nascimento": randexp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)19[0-9][0-9]$/),
		"endereco": {
			"uf": randexp(/(AC|AL|AM|AP|BA|CE|DF|ES|GO|MA|MG|MS|MT|PA|PB|PE|PI|PR|RJ|RN|RO|RR|RS|SC|SE|SP|TO)/),
			"cep": randexp(/^[0-9]{5}\-[0-9]{3}$/),
			"numero": randexp(/[0-9]{2,5}/),
			"bairro": randexp(/\w{25}/),
			"cidade": randexp(/\w{30}/),
			"logradouro": randexp(/\w{3,25}/),
			"complemento": randexp(/\w{20}/)
		}
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
	await db.mongoose.connection.dropDatabase();
	fs.removeSync('./files');
	server.listen(process.env.PORTA, done);
});

afterAll(async done => {
	//await server.close();
	//await db.mongoose.disconnect();
	//fs.removeSync('./files');
	//done();
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
		let res = await axios.get(HOST + '/acesso/account', reqConfig);
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
		let res = await axios.post(HOST + '/acesso/avisos', av, reqConfig);
		expect(res.status).toBe(200);
		expect(res.data).toBeDefined();
		expect(res.data).toHaveProperty('tipo');
		expect(res.data).toHaveProperty('coordenadas');
		expect(res.data).toHaveProperty('url');
		aviso = res.data;
		done();
	});

	it('deve enviar 3 fotos para o último aviso criado', async done => {
		for (let i = 0; i < 3; i++) {
			const filePath = __dirname + '/teste.jpg';
			let imageData = fs.readFileSync(filePath);
			expect(imageData).toBeDefined();
			const form = new FormData();
			form.append('foto', imageData, {
				filepath: filePath,
				contentType: 'image/jpeg',
			});
			let headers = form.getHeaders();
			headers.authorization = reqConfig.headers.authorization;
			let res = await axios.post(HOST + aviso.url + '/fotos', form, { headers: headers });
			expect(res.status).toBe(200);
			expect(res.data).toHaveProperty('id');
			expect(res.data).toHaveProperty('filename');
			expect(res.data).toHaveProperty('url');
			expect(res.data).toHaveProperty('horario');
			expect(res.data).toHaveProperty('aviso_id');
			expect(fs.existsSync('./files/' + usuario.id + '/' + aviso.id + '/' + res.data.filename)).toBeTruthy();
			fotos.push(res.data);
		}
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

	it('deve visualizar as fotos do último aviso criado', async done => {
		let res = await axios.get(HOST + aviso.url + '/fotos', reqConfig);
		expect(res.status).toBe(200);
		expect(res.data).toBeDefined();
		expect(res.data).toHaveLength(3);
		done();
	});

	it('deve visualizar a última foto do último aviso criado', async done => {
		let ultimaFoto = fotos[fotos.length - 1];
		let res = await axios.get(HOST + ultimaFoto.url, reqConfig);
		expect(res.status).toBe(200);
		done();
	});

});

// ========================================================================

describe('Exclusão de usuário', () => {

	it('deve deletar o usuário, seus avisos e as fotos', async done => {
		let res = await axios.delete(HOST + '/acesso/delete', reqConfig);
		expect(res.data).toBeDefined();
		expect(fs.pathExistsSync('./files/' + usuario.id)).toBeFalsy();
		done();
	});

});
