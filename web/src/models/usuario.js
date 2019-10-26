const endereco = require('./endereco');

export const usuario = {
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    dataNasc: "",
    ...endereco
};

// export const usuario = {
//     email: "",
//     apiKey: "Chave da API",
//     apiToken: "Chave do Firebase"
// };