//const required = value => (value ? undefined : " Campo obrigatório");

const defLength = (value, length) =>
  value && value.length !==  length
    ? ` Este campo deve ter ${length} digitos ${value.length}`
    : undefined;
// const maxLength = (value, max) =>
//   value && value.length > max ? ` Máximo de ${max} digitos` : undefined;
const minLength = (value, min) =>
  value && value.length < min ? ` Mínimo de ${min} digitos` : undefined;

const Limite = (value, min, max) =>
  value && (value < min || value > max) ? ` Deve estar entre ${min} e ${max}` : undefined;

const nameText = value =>
  value && !/[a-zA-ZÀ-ÿ] +[a-zA-ZÀ-ÿ]/.test(value)
    ? " Deve digitar o nome completo"
    : undefined;
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Endereço de e-mail inválido"
    : undefined;
const cpf = value => {
  let Soma;
  let Resto;
  let i;
  Soma = 0;

  for (i = 1; i <= 9; i++)
    Soma = Soma + parseInt(value.substring(i - 1, i)) * (11 - i);

  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !==  parseInt(value.substring(9, 10))) return "CPF invalido";

  Soma = 0;
  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(value.substring(i - 1, i)) * (12 - i);

  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !==  parseInt(value.substring(10, 11))) return "CPF invalido";

  return undefined;
};

export function validarNome(value) {
  let resp;

  // resp = required(value);
  // if (resp) return resp;

  resp = minLength(value, 8);
  if (resp) return resp;

  resp = nameText(value);
  if (resp) return resp;
}

export function validarEmail(value) {
  let resp;

  // resp = required(value);
  // if (resp) return resp;

  resp = email(value);
  if (resp) return resp;
}

export function validarTelefone(value) {
  let resp;
  value = value.replace(/\D/g, "");

  // resp = required(value);
  // if (resp) return resp;

  resp = minLength(value, 10);
  if (resp) return resp;
}

export function validarCPF(value) {
  let resp;
  value = value.replace(/\D/g, "");

  // resp = required(value);
  // if (resp) return resp;

  resp = defLength(value, 11);
  if (resp) return resp;

  resp = cpf(value);
  if (resp) return resp;
}

export function validarNumero(value) {
    let resp;
    value = value.replace(/\D/g, "");
  
  // resp = required(value);
  // if (resp) return resp;
  
    resp = Limite(value, 1, 9999);
    if (resp) return resp;
  }

export function buscaCEP(cep) {
  let endereco = { logradouro: "", bairro: "", cidade: "", estado: "" };
  let error = '';
  return new Promise((resolve, reject) => {
    fetch("https://viacep.com.br/ws/" + cep + "/json/")
      .then(resp => resp.json())
      .then(function(data) {
        if (Object.keys(data).length > 1) {
          endereco.logradouro = data.logradouro;
          endereco.bairro = data.bairro;
          endereco.cidade = data.localidade;
          endereco.estado = data.uf;
        }
        else
            error = 'CEP invalido';
        resolve({ error: error, endereco });
      })
      .catch(error => {
        reject(error);
        return;
      });
  });
  /**/
}

export function validarCEP(value) {
  let resp;
  value = value.replace(/\D/g, "");

  // resp = required(value);
  // if (resp) return resp;

  resp = defLength(value, 8);
  if (resp)
    return resp;
}
/*
function VerificaCEP(value) {
  //let endereco = {logradouro:'', bairro: '', cidade: '', estado: ''};
  let cepValue = value.replace(/\D/g, "");

  if (cepValue.length === 8) {
    const https = require("https");

    https
      .get("https://viacep.com.br/ws/" + cepValue + "/json/", resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          data = JSON.parse(data);
          console.log(data);
          if (Object.keys(data).length > 1) {
            /*endereco.logradouro = data.logradouro;
                    endereco.bairro = data.bairro;
                    endereco.cidade = data.localidade;
                    endereco.estado = data.uf;
                    return {erro:'a', endereco};/
            document.getElementById("logradouro").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;
            return "";
          } else {
            /*endereco.logradouro = "";
                    endereco.bairro = "";
                    endereco.cidade = "";
                    endereco.estado = "";
                    return {erro:'CEP invalido', endereco};/
            document.getElementById("logradouro").value = "";
            document.getElementById("bairro").value = "";
            document.getElementById("cidade").value = "";
            document.getElementById("estado").value = "";
            return "CEP invalido";
          }
        });
      })
      .on("error", err => {
        console.log("Error: " + err.message);
      });
  } else {
    /*endereco.logradouro = "";
        endereco.bairro = "";
        endereco.cidade = "";
        endereco.estado = "";
        return {erro:'a', endereco};/
    document.getElementById("logradouro").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    return "";
  }
}
*/
/*import { api } from "../controllers/index";
//import { FETCH_ALL_USUARIOS } from '../actions/types';

const maxLength = (value, max) =>
    value && value.length > max ? `O tamanho máximo para este campo é ${max}` : undefined;
const minLength = (value, min) =>
    value && value.length < min ? `O tamanho mínimo para este campo é ${min}` : undefined;

const required = value => value ? undefined : 'Campo obrigatório';

const cnpj = value => {
    if (value && value.length === 18) {
        return undefined;
    }
    else {
        return "O CNPJ deve ter 14 dígitos ";
    }
}
const cpf = value => value && value.length === 14 ? undefined : "O CPF deve ter 11 dígitos ";
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const letters = value => value && !isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined;
const minValue18 = minValue(18);
const unique = value => {
    if (value && value.length >= 18) {
        console.log(value);
        return checkOnServer(value);
    }
}

const checkOnServer = value => api.get(`/Cabeleireiros?cnpj=${value}`).then(response => response.erro) ? undefined : `Este CNPJ já está cadastrado`;

// export const unique = value => api.get(`/Cabeleireiros?cnpj=${value}`).then(response => response.data.dados).then(console.log);

// export async const unique = value => async dispatch => {
//     console.log("12");
//     const response = await api.get('/Usuarios', { value });
//     console.log(response);
//     dispatch({ type: FETCH_ALL_USUARIOS, payload: response.mensagem });
// }

function exemploValidacao(value) {
    return "Mensagem de erro de validação exemplo";
}


export const validarNomes = (value) => {
    let errors = [];

    let tamanhoError = minLength(value, 8);
    if (tamanhoError) {
        errors.push(tamanhoError);
    }

    let exemploError = exemploValidacao(value);
    if (exemploError) {
        errors.push(exemploError);
    }

    return errors.toString();
}



export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Endereço de e-mail inválido' : undefined;
export const tooYoung = value => {
    let idade;
    if (value) {
        value = value.split("-");
        if (value[0]) {
            idade = 2019 - value[0];
        }
    }

    if (value && idade < 18) {
        return 'Para ser usuário, você precisa ter mais de 18 anos';
    } else {
        return undefined;
    }
}
export const tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined;
export const aol = value =>
    value && /.+@aol\.com/.test(value) ?
        'Really? You still use AOL for your email?' : undefined;*/
