const Usuario = require('../modelos/usuario.modelo');
const Chamado = require('../modelos/chamado.modelo');
const faker = require('faker');

faker.locale = 'pt_BR';

// Gera um usuário FAKE
function gerarUsuario(tipo) {
	let fname = faker.name.firstName();
	let lname = faker.name.lastName();
	return new Usuario({
		google_id: faker.random.uuid(),
		tipo: tipo,
		nome: fname + ' ' + lname,
		telefone: faker.phone.phoneNumber(),
		cpf: faker.random.uuid(),
		email: faker.internet.email(fname, lname),
		nascimento: faker.date.past(80),
		endereco: faker.address.streetAddress(true),
	});
}

function gerarChamado() {
	let tipos = ['Tornado', 'Terremoto', 'Invasão alienígena'];
	return new Chamado({
		tipo: tipos[Math.floor(Math.random() * tipos.length)],
		dataHora: new Date(),
		descricao: 'Ocorreu uma catástrofe',
		vistoriador: faker.name.firstName(),
		cidadao: faker.name.firstName(),
		local: faker.address.city(),
	});
}

module.exports = {
	gerarUsuario: gerarUsuario,
	gerarChamado: gerarChamado,
};